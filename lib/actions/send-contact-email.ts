"use server"

import { google } from "googleapis"

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

function getGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
  )
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  })
  return google.gmail({ version: "v1", auth: oauth2Client })
}

function buildRawEmail({
  from,
  to,
  replyTo,
  subject,
  textContent,
  htmlContent,
}: {
  from: string
  to: string
  replyTo?: string
  subject: string
  textContent: string
  htmlContent: string
}): string {
  const boundary = "boundary_" + Date.now().toString(36)
  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join("\r\n")

  const body = [
    `--${boundary}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    ``,
    textContent,
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    ``,
    htmlContent,
    `--${boundary}--`,
  ].join("\r\n")

  const email = `${headers}\r\n\r\n${body}`
  return Buffer.from(email).toString("base64url")
}

/**
 * Send contact form submission to admin email
 */
export async function sendContactEmail(formData: ContactFormData): Promise<SendContactEmailResult> {
  try {
    console.log("[ContactEmail] ===== Starting Email Send =====")
    console.log("[ContactEmail] Env check - CONTACT_EMAIL:", process.env.CONTACT_EMAIL)
    console.log("[ContactEmail] Env check - GMAIL_REFRESH_TOKEN configured:", process.env.GMAIL_REFRESH_TOKEN ? "YES" : "NOT SET")
    
    console.log("[ContactEmail] Form data:", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
    })

    const adminEmail = process.env.CONTACT_EMAIL

    if (!adminEmail) {
      console.error("[ContactEmail] CONTACT_EMAIL not configured")
      return {
        success: false,
        error: "Email service not configured",
      }
    }

    if (!process.env.GMAIL_REFRESH_TOKEN || !process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET) {
      console.error("[ContactEmail] OAuth2 credentials not configured")
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

    // Send email to admin via Gmail API
    console.log("[ContactEmail] Attempting to send admin email to:", adminEmail)
    const gmail = getGmailClient()

    const adminRaw = buildRawEmail({
      from: `"TurboFunding Contact Form" <${adminEmail}>`,
      to: adminEmail,
      replyTo: formData.email,
      subject: `New Contact Form Submission: ${formData.subject}`,
      textContent,
      htmlContent,
    })

    const adminResult = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: adminRaw },
    })

    const messageId = adminResult.data.id || undefined
    console.log("[ContactEmail] Admin email sent successfully!")
    console.log("[ContactEmail] Message ID:", messageId)

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
      const confirmRaw = buildRawEmail({
        from: `"TurboFunding.com" <${adminEmail}>`,
        to: formData.email,
        subject: "We received your message - TurboFunding.com",
        htmlContent: confirmationHtml,
        textContent: `Hi ${formData.name},\n\nThank you for reaching out to TurboFunding.com! We've received your message and our team will get back to you within 1 business day.\n\nBest regards,\nThe TurboFunding Team`,
      })

      const confirmResult = await gmail.users.messages.send({
        userId: "me",
        requestBody: { raw: confirmRaw },
      })
      console.log("[ContactEmail] Confirmation email sent to user successfully!")
      console.log("[ContactEmail] Confirmation Message ID:", confirmResult.data.id)
    } catch (confirmationError) {
      console.warn("[ContactEmail] Failed to send confirmation email to user:", confirmationError)
    }

    console.log("[ContactEmail] ===== Email Send Complete =====")
    return {
      success: true,
      messageId,
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
