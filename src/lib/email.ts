interface EmailPayload {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, replyTo, subject, html }: EmailPayload): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || "DigitalExpert <noreply@digitalexpert.pk>";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: replyTo,
          subject,
          html,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend API error:", err);
        return { success: false, error: err };
      }
      return { success: true };
    } catch (e: any) {
      console.error("Email send failed:", e);
      return { success: false, error: e.message };
    }
  }

  // Fallback logger for local dev or when keys are pending setup
  console.log("==========================================");
  console.log(`[EMAIL DISPATCH] To: ${to}`);
  if (replyTo) console.log(`[EMAIL DISPATCH] Reply-To: ${replyTo}`);
  console.log(`[EMAIL DISPATCH] Subject: ${subject}`);
  console.log(`[EMAIL DISPATCH] Preview Content:\n`, html.substring(0, 300) + "...");
  console.log("==========================================");

  return { success: true };
}

export function buildContactNotificationEmail(data: { name: string; email: string; phone: string; interestedIn: string; message: string; date: string }) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E5E0D2; border-radius: 12px; background: #FFFFFF;">
      <div style="background: #0B0B09; padding: 20px; border-radius: 8px; text-align: center;">
        <h2 style="color: #FFAA1D; margin: 0; font-size: 22px;">DigitalExpert</h2>
        <p style="color: #FFFFFF; margin: 5px 0 0; font-size: 14px;">New Contact Form Enquiry</p>
      </div>
      <div style="padding: 20px 0; color: #14140F; line-height: 1.6;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
        <p><strong>WhatsApp / Phone:</strong> <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}">${data.phone}</a></p>
        <p><strong>Interested In:</strong> <span style="background: #F7F5EF; padding: 4px 10px; border-radius: 6px; font-weight: bold; color: #6A9A00;">${data.interestedIn}</span></p>
        <p><strong>Message:</strong></p>
        <div style="background: #F7F5EF; padding: 15px; border-left: 4px solid #FFAA1D; border-radius: 4px; margin-top: 8px;">
          ${data.message.replace(/\n/g, "<br/>")}
        </div>
        <p style="font-size: 12px; color: #5A5850; margin-top: 25px;">Received on: ${new Date(data.date).toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} PKT</p>
      </div>
    </div>
  `;
}

export function buildEnrollmentNotificationEmail(data: { studentName: string; email: string; whatsapp: string; city: string; courseTitle: string; fee: number; paymentMethod: string; enrollmentId: string }) {
  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://digitalexpert.pk"}/admin/enrollments`;
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E5E0D2; border-radius: 12px; background: #FFFFFF;">
      <div style="background: #6A9A00; padding: 20px; border-radius: 8px; text-align: center;">
        <h2 style="color: #FFFFFF; margin: 0; font-size: 24px;">New Student Enrollment</h2>
        <p style="color: #F7F5EF; margin: 5px 0 0; font-size: 14px;">Payment verification required in Admin Panel</p>
      </div>
      <div style="padding: 20px 0; color: #14140F; line-height: 1.6;">
        <p><strong>Student Name:</strong> ${data.studentName}</p>
        <p><strong>Course:</strong> <strong style="color: #6A9A00;">${data.courseTitle}</strong></p>
        <p><strong>Fee:</strong> ${data.fee.toLocaleString()} PKR</p>
        <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        <p><strong>WhatsApp Number:</strong> <a href="https://wa.me/${data.whatsapp.replace(/[^0-9]/g, "")}">${data.whatsapp}</a></p>
        <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
        <p><strong>City:</strong> ${data.city || "Bahawalpur"}</p>
        <div style="margin: 25px 0; text-align: center;">
          <a href="${adminUrl}" style="background: #0B0B09; color: #FFFFFF; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            Open Admin & Verify Payment Screenshot &rarr;
          </a>
        </div>
      </div>
    </div>
  `;
}
