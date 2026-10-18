import { NextResponse } from "next/server";
import { createMessage } from "@/lib/db";
import { sendEmail, buildContactNotificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, interestedIn, message, honeypot } = body;

    // Honeypot spam check
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and WhatsApp/Phone number are required." },
        { status: 400 }
      );
    }

    // Save to Database
    const savedMsg = createMessage({
      name: name.trim(),
      email: (email || "").trim(),
      phone: phone.trim(),
      interestedIn: interestedIn || "General Consultation",
      message: (message || "").trim(),
    });

    // Send email notification to info@digitalexpert.pk
    const adminEmail = process.env.MAIL_TO || "info@digitalexpert.pk";
    const emailHtml = buildContactNotificationEmail({
      name: savedMsg.name,
      email: savedMsg.email,
      phone: savedMsg.phone,
      interestedIn: savedMsg.interestedIn,
      message: savedMsg.message,
      date: savedMsg.createdAt,
    });

    await sendEmail({
      to: adminEmail,
      replyTo: savedMsg.email || undefined,
      subject: `New Enquiry from ${savedMsg.name} (${savedMsg.interestedIn})`,
      html: emailHtml,
    });

    // Auto-confirmation email to visitor if email was provided
    if (savedMsg.email) {
      await sendEmail({
        to: savedMsg.email,
        subject: "We received your message - DigitalExpert",
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #14140F;">
            <h2>Thank you for contacting DigitalExpert, ${savedMsg.name}!</h2>
            <p>We have received your enquiry regarding <strong>${savedMsg.interestedIn}</strong>.</p>
            <p>Our team is reviewing your message and will get back to you shortly via WhatsApp (${savedMsg.phone}) or email.</p>
            <br/>
            <p>Warm regards,<br/><strong>Khezar Hayat</strong><br/>Founder, DigitalExpert<br/>University Chowk, Bahawalpur</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, id: savedMsg.id });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process enquiry." },
      { status: 500 }
    );
  }
}
