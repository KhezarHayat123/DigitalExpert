import { NextResponse } from "next/server";
import { findStudentByEmail, createStudent } from "@/lib/db";
import { hashStudentPassword } from "@/lib/studentAuth";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, phone, password, requestedCourse } = await req.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { error: "Full Name, Email, WhatsApp number, and Password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = findStudentByEmail(cleanEmail);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in or contact administration." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const passwordHash = await hashStudentPassword(password);

    const student = createStudent({
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      passwordHash,
      requestedCourse: requestedCourse || "wordpress",
    });

    // Notify administration via email
    await sendEmail({
      to: process.env.MAIL_TO || "info@digitalexpert.pk",
      subject: `🎓 New LMS Student Registration: ${student.name} (${student.email})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 2px solid #0B0B09; border-radius: 12px;">
          <h2 style="color: #6A9A00;">New Student Registered for LMS</h2>
          <p><strong>Student Name:</strong> ${student.name}</p>
          <p><strong>Email / Gmail:</strong> ${student.email}</p>
          <p><strong>WhatsApp:</strong> ${student.phone}</p>
          <p><strong>Requested Course:</strong> ${student.requestedCourse}</p>
          <p><strong>Status:</strong> <span style="background: #FFAA1D; padding: 3px 8px; border-radius: 4px; font-weight: bold;">Pending Admin Approval</span></p>
          <hr />
          <p>Go to your <a href="https://digitalexpert.pk/admin/lms/students">Admin Panel &gt; LMS Students</a> to approve this student's access.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message:
        "Your account registration has been submitted! Our administration will review and approve your access shortly.",
      studentId: student.id,
    });
  } catch (error: any) {
    console.error("LMS Signup Error:", error);
    return NextResponse.json({ error: error.message || "Failed to register." }, { status: 500 });
  }
}
