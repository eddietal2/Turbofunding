"use server"

import nodemailer from "nodemailer"

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface SendContactEmailResult {
  success: boolean
  error?: string
  messageId?: string
}

const transporter = nodemailer.createTransport({
  host: "mail.spacemail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  logger: true,
  debug: true,
})

// Verify transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("[ContactEmail] SMTP Connection Error:", error)
  } else {
    console.log("[ContactEmail] SMTP Server ready:", success)
  }
})

/**
 * Send contact form submission to admin email
 */
export async function sendContactEmail(formData: ContactFormData): Promise<SendContactEmailResult> {
  try {
    console.log("[ContactEmail] ===== Starting Email Send =====")
    console.log("[ContactEmail] Env check - NODEMAILER_EMAIL:", process.env.NODEMAILER_EMAIL)
    console.log("[ContactEmail] Env check - NODEMAILER_PASSWORD:", process.env.NODEMAILER_PASSWORD ? "***SET***" : "NOT SET")
    
    console.log("[ContactEmail] Form data:", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
    })

    const adminEmail = process.env.NODEMAILER_EMAIL

    if (!adminEmail) {
      console.error("[ContactEmail] NODEMAILER_EMAIL not configured")
      return {
        success: false,
        error: "Email service not configured",
      }
    }

    if (!process.env.NODEMAILER_PASSWORD) {
      console.error("[ContactEmail] NODEMAILER_PASSWORD not configured")
      return {
        success: false,
        error: "Email service not properly configured",
      }
    }

    // Plain text content
    const textContent = `
Contact Form Submission
=======================

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
--------
${formData.message}

---
Submitted at: ${new Date().toISOString()}
`

    // HTML content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1E40AF 0%, #EA580C 100%); color: white; padding: 24px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 16px; }
    .label { font-weight: 600; color: #1F2937; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { color: #374151; font-size: 16px; margin-top: 4px; line-height: 1.5; }
    .message-box { background: white; border-left: 4px solid #EA580C; padding: 16px; margin-top: 16px; border-radius: 4px; }
    .footer { text-align: center; color: #6B7280; font-size: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #E5E7EB; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0; font-size: 24px;">📬 New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${formData.name}</div>
      </div>
      
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${formData.email}" style="color: #1E40AF; text-decoration: none;">${formData.email}</a></div>
      </div>
      
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value"><a href="tel:${formData.phone}" style="color: #1E40AF; text-decoration: none;">${formData.phone}</a></div>
      </div>
      
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${formData.subject}</div>
      </div>
      
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">
          ${formData.message.replace(/\n/g, "<br>")}
        </div>
      </div>
      
      <div class="footer">
        <p>Submitted on ${new Date().toLocaleDateString("en-US", { 
          year: "numeric", 
          month: "long", 
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })}</p>
      </div>
    </div>
  </div>
</body>
</html>
`

    // Send email to admin
    console.log("[ContactEmail] Attempting to send admin email to:", adminEmail)
    const info = await transporter.sendMail({
      from: `"TurboFunding Contact Form" <${process.env.NODEMAILER_EMAIL}>`,
      to: process.env.NODEMAILER_EMAIL,
      replyTo: formData.email,
      subject: `New Contact Form Submission: ${formData.subject}`,
      text: textContent,
      html: htmlContent,
    })

    console.log("[ContactEmail] ✅ Admin email sent successfully!")
    console.log("[ContactEmail] Message ID:", info.messageId)
    console.log("[ContactEmail] Response:", info.response)

    // Optionally send confirmation email to the user
    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1E40AF 0%, #EA580C 100%); color: white; padding: 24px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; }
    .message { color: #374151; font-size: 16px; line-height: 1.6; }
    .footer { text-align: center; color: #6B7280; font-size: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #E5E7EB; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0; font-size: 24px;">✅ Message Received!</h2>
    </div>
    <div class="content">
      <div class="message">
        <p>Hi ${formData.name},</p>
        <p>Thank you for reaching out to TurboFunding.com! We've received your message and our team will get back to you within 1 business day.</p>
        <p><strong>What happens next?</strong></p>
        <ul style="color: #374151; line-height: 1.8;">
          <li>Our team reviews your inquiry</li>
          <li>A funding specialist will contact you at the phone number provided</li>
          <li>We'll discuss your funding needs and next steps</li>
        </ul>
        <p>If you need immediate assistance, feel free to call us or schedule a call at: <a href="https://calendly.com/vivek-turbofunding" style="color: #1E40AF; text-decoration: none;">https://calendly.com/vivek-turbofunding</a></p>
        <p style="margin-top: 24px; color: #374151;">
          Best regards,<br>
          <strong>The TurboFunding Team</strong><br>
          Fast Business Funding Solutions
        </p>
      </div>
      <div class="footer">
        <p style="margin: 0;">© ${new Date().getFullYear()} TurboFunding.com. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`

    // Send confirmation to user
    try {
      console.log("[ContactEmail] Attempting to send confirmation email to:", formData.email)
      const confirmInfo = await transporter.sendMail({
        from: `"TurboFunding.com" <${process.env.NODEMAILER_EMAIL}>`,
        to: formData.email,
        subject: "We received your message - TurboFunding.com",
        html: confirmationHtml,
        text: `Hi ${formData.name},\n\nThank you for reaching out to TurboFunding.com! We've received your message and our team will get back to you within 1 business day.\n\nBest regards,\nThe TurboFunding Team`,
      })
      console.log("[ContactEmail] ✅ Confirmation email sent to user successfully!")
      console.log("[ContactEmail] Confirmation Message ID:", confirmInfo.messageId)
    } catch (confirmationError) {
      console.warn("[ContactEmail] ⚠️ Failed to send confirmation email to user:", confirmationError)
      // Don't fail the request if confirmation email fails
    }

    console.log("[ContactEmail] ===== Email Send Complete =====")
    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (error: unknown) {
    console.error("[ContactEmail] ===== ERROR ENCOUNTERED =====")
    console.error("[ContactEmail] Error type:", typeof error)
    console.error("[ContactEmail] Full error object:", error)
    
    if (error instanceof Error) {
      console.error("[ContactEmail] Error name:", error.name)
      console.error("[ContactEmail] Error message:", error.message)
      console.error("[ContactEmail] Error stack:", error.stack)
    }
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("[ContactEmail] Returning error to client:", errorMessage)
    
    return {
      success: false,
      error: errorMessage,
    }
  }
}
