import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { updateEnrollmentStatus, getEnrollmentById } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { status, rejectReason, internalNotes } = await req.json();
    const existing = getEnrollmentById(params.id);

    if (!existing) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }

    const updated = updateEnrollmentStatus(
      params.id,
      status,
      rejectReason,
      internalNotes,
      admin.email
    );

    if (!updated) {
      return NextResponse.json({ error: "Failed to update enrollment" }, { status: 500 });
    }

    // If status changed to "Admission confirmed", send confirmation email to student
    if (status === "Admission confirmed" && updated.email) {
      await sendEmail({
        to: updated.email,
        subject: `Admission Confirmed! Welcome to ${updated.courseTitle} - DigitalExpert`,
        html: `
          <div style="font-family: sans-serif; padding: 25px; max-width: 600px; margin: 0 auto; border: 2px solid #6A9A00; border-radius: 12px; background: #FFFFFF;">
            <div style="background: #6A9A00; padding: 20px; border-radius: 8px; text-align: center; color: #FFFFFF;">
              <h1 style="margin: 0; font-size: 24px;">🎉 Admission Confirmed!</h1>
              <p style="margin: 5px 0 0; font-size: 14px;">Welcome to DigitalExpert Academy</p>
            </div>
            <div style="padding: 20px 0; color: #14140F; line-height: 1.6;">
              <p>Dear <strong>${updated.studentName}</strong>,</p>
              <p>Congratulations! Your payment has been successfully verified, and your seat for <strong>${updated.courseTitle}</strong> is now officially confirmed.</p>
              <div style="background: #F7F5EF; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Course:</strong> ${updated.courseTitle}</p>
                <p style="margin: 5px 0 0;"><strong>Verified Fee:</strong> ${updated.feeAtTime.toLocaleString()} PKR</p>
                <p style="margin: 5px 0 0;"><strong>Campus:</strong> University Chowk, Bahawalpur</p>
              </div>
              <p>Our team will add you to the official batch WhatsApp group within 24 hours. If you have any immediate questions, reply to this email or message us directly on WhatsApp at <strong>03124051296</strong>.</p>
              <br/>
              <p>Warm regards,<br/><strong>Khezar Hayat</strong><br/>Founder, DigitalExpert</p>
            </div>
          </div>
        `,
      });
    }

    // If status changed to "Rejected", send notification email to student
    if (status === "Rejected" && updated.email) {
      await sendEmail({
        to: updated.email,
        subject: `Update regarding your enrollment application - DigitalExpert`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #14140F;">
            <h2>Dear ${updated.studentName},</h2>
            <p>Your enrollment application for <strong>${updated.courseTitle}</strong> could not be approved at this time.</p>
            <p><strong>Reason provided:</strong> ${rejectReason || "Payment receipt could not be validated."}</p>
            <p>If you believe this is an error or would like to re-submit your receipt, please message our accounts desk directly on WhatsApp at <strong>03124051296</strong>.</p>
            <br/>
            <p>DigitalExpert Admissions Office<br/>University Chowk, Bahawalpur</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, enrollment: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
