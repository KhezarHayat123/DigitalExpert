import { NextResponse } from "next/server";
import { findStudentByEmail } from "@/lib/db";
import { verifyStudentPassword, signStudentToken, STUDENT_COOKIE_NAME } from "@/lib/studentAuth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const student = findStudentByEmail(cleanEmail);

    if (!student) {
      return NextResponse.json(
        { error: "Invalid email or password. Please check your credentials." },
        { status: 401 }
      );
    }

    const isValid = await verifyStudentPassword(password, student.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password. Please check your credentials." },
        { status: 401 }
      );
    }

    // STRICT APPROVAL CHECK:
    // If student has not been approved by admin yet
    if (student.status === "pending") {
      return NextResponse.json(
        {
          error:
            "Your student account is currently PENDING approval by DigitalExpert administration. Once your payment / admission is verified, you will be able to log in. Please contact WhatsApp 0312-4051296 if you recently submitted your fee.",
          isPending: true,
        },
        { status: 403 }
      );
    }

    if (student.status === "rejected") {
      return NextResponse.json(
        { error: "Your account registration was not approved. Please contact campus administration." },
        { status: 403 }
      );
    }

    // Student is APPROVED: Sign JWT & set cookie
    const token = await signStudentToken(student);

    const response = NextResponse.json({
      success: true,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        enrolledCourses: student.enrolledCourses,
      },
    });

    response.cookies.set({
      name: STUDENT_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("LMS Login Error:", error);
    return NextResponse.json({ error: error.message || "Failed to log in." }, { status: 500 });
  }
}
