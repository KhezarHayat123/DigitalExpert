import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { findStudentById, updateStudent, approveStudent, deleteStudent } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const student = findStudentById(params.id);
    if (!student) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    if (body.action === "approve") {
      const updated = approveStudent(student.id, body.courseSlug, admin.email);

      // Optionally send approval email to student
      try {
        await sendEmail({
          to: student.email,
          subject: "🎉 Admission Approved! Access Your DigitalExpert LMS Classroom",
          html: `
            <div style="font-family: sans-serif; padding: 24px; border: 2px solid #0B0B09; border-radius: 12px; max-width: 600px;">
              <h2 style="color: #6A9A00;">Welcome to DigitalExpert Academy!</h2>
              <p>Hi <strong>${student.name}</strong>,</p>
              <p>Your student account has been <strong>APPROVED</strong> by the administration!</p>
              <p>You now have full access to your classroom video recordings, live lectures, and practical assignments.</p>
              <div style="margin: 20px 0;">
                <a href="https://digitalexpert.pk/lms/login" style="background: #0B0B09; color: #FFAA1D; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                  Sign In to Your Classroom &rarr;
                </a>
              </div>
              <p style="font-size: 12px; color: #666;">
                Campus Address: University Chowk, Bahawalpur &bull; Support WhatsApp: 0312-4051296
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send approval email:", emailErr);
      }

      return NextResponse.json({ success: true, student: updated });
    }

    if (body.action === "updateCourses") {
      student.enrolledCourses = body.enrolledCourses || [];
      updateStudent(student, admin.email);
      return NextResponse.json({ success: true, student });
    }

    if (body.action === "changeStatus") {
      student.status = body.status;
      updateStudent(student, admin.email);
      return NextResponse.json({ success: true, student });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  deleteStudent(params.id, admin.email);
  return NextResponse.json({ success: true });
}
