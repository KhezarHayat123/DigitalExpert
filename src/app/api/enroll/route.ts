import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createEnrollment, getPrivateUploadsPath } from "@/lib/db";
import { sendEmail, buildEnrollmentNotificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const studentName = formData.get("studentName") as string;
    const email = (formData.get("email") as string) || "";
    const whatsapp = formData.get("whatsapp") as string;
    const city = (formData.get("city") as string) || "Bahawalpur";
    const courseSlug = formData.get("courseSlug") as string;
    const courseTitle = formData.get("courseTitle") as string;
    const feeAtTime = parseInt(formData.get("feeAtTime") as string, 10) || 0;
    const paymentMethod = formData.get("paymentMethod") as string;
    const transactionId = (formData.get("transactionId") as string) || "";
    const notes = (formData.get("notes") as string) || "";
    const screenshot = formData.get("screenshot") as File | null;

    if (!studentName || !whatsapp || !courseSlug) {
      return NextResponse.json(
        { error: "Student Name, WhatsApp number, and Course selection are required." },
        { status: 400 }
      );
    }

    if (!screenshot || !(screenshot instanceof File)) {
      return NextResponse.json(
        { error: "A clear payment screenshot (receipt) is strictly required to submit your enrollment." },
        { status: 400 }
      );
    }

    // Validate size (max 5 MB)
    if (screenshot.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "The uploaded file exceeds the 5 MB size limit." },
        { status: 400 }
      );
    }

    // Validate type (JPG, PNG, PDF)
    const allowedMime = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedMime.includes(screenshot.type)) {
      return NextResponse.json(
        { error: "Invalid file format. Please upload JPG, PNG, WebP or PDF." },
        { status: 400 }
      );
    }

    // Save screenshot to private storage directory (NOT in public/ folder)
    const privateDir = getPrivateUploadsPath();
    const ext = screenshot.name.split(".").pop() || "png";
    const safeFileName = `receipt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
    const destinationPath = path.join(privateDir, safeFileName);

    const arrayBuffer = await screenshot.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destinationPath, buffer);

    // Save Enrollment to DB
    const enrollment = createEnrollment({
      studentName: studentName.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      city: city.trim(),
      courseSlug,
      courseTitle,
      feeAtTime,
      paymentMethod,
      transactionId: transactionId.trim(),
      screenshotPath: safeFileName,
      notes: notes.trim(),
    });

    // Send email alert to info@digitalexpert.pk
    const adminEmail = process.env.MAIL_TO || "info@digitalexpert.pk";
    const emailHtml = buildEnrollmentNotificationEmail({
      studentName: enrollment.studentName,
      email: enrollment.email,
      whatsapp: enrollment.whatsapp,
      city: enrollment.city,
      courseTitle: enrollment.courseTitle,
      fee: enrollment.feeAtTime,
      paymentMethod: enrollment.paymentMethod,
      enrollmentId: enrollment.id,
    });

    await sendEmail({
      to: adminEmail,
      subject: `New Enrollment: ${enrollment.studentName} for ${enrollment.courseTitle}`,
      html: emailHtml,
    });

    // Send receipt email to student if email provided
    if (enrollment.email) {
      await sendEmail({
        to: enrollment.email,
        subject: `Enrollment Request Received - ${enrollment.courseTitle}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #14140F;">
            <h2>Dear ${enrollment.studentName},</h2>
            <p>We have successfully received your enrollment form and payment receipt for <strong>${enrollment.courseTitle}</strong> (${enrollment.feeAtTime.toLocaleString()} PKR).</p>
            <p style="background: #F7F5EF; padding: 12px; border-left: 4px solid #6A9A00; font-weight: bold;">
              Important: Your admission will be officially confirmed after our administration verifies your payment screenshot.
            </p>
            <p>You will receive an official confirmation on WhatsApp (${enrollment.whatsapp}) and email once verification is completed.</p>
            <br/>
            <p>Sincerely,<br/><strong>DigitalExpert Administration Desk</strong><br/>University Chowk, Bahawalpur</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, enrollmentId: enrollment.id });
  } catch (err: any) {
    console.error("Enrollment API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process enrollment." },
      { status: 500 }
    );
  }
}
