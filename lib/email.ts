"use server"

import nodemailer from "nodemailer"

// Logo hosted on Vercel Blob CDN
const LOGO_URL = "https://yeixnyce3to9ontr.public.blob.vercel-storage.com/logos/turbofunding-logo.png"
const WEBSITE_URL = "https://turbofunding.com"

const transporter = nodemailer.createTransport({
  host: "mail.spacemail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
})

// Shared email template wrapper - logo served from Vercel Blob CDN
function getEmailTemplate(content: string, recipientEmail: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TurboFunding.com</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; max-width: 100%;">
              
              <!-- Header with Logo -->
              <tr>
                <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px 40px; text-align: center;">
                  <img src="${LOGO_URL}" alt="TurboFunding.com" width="150" style="max-width: 100%; height: auto;" />
                  <p style="color: #f97316; font-weight: 700; font-size: 14px; margin: 10px 0 0 0; letter-spacing: 2px;">TURBOCHARGE YOUR BUSINESS</p>
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td style="padding: 40px;">
                  ${content}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #1e293b; padding: 30px 40px; text-align: center;">
                  <p style="margin: 0 0 15px 0;">
                    <a href="${WEBSITE_URL}" style="color: #60a5fa; text-decoration: none; font-weight: 600;">Visit Our Website</a>
                    <span style="color: #475569; margin: 0 10px;">|</span>
                    <a href="mailto:help@turbofunding.com" style="color: #60a5fa; text-decoration: none; font-weight: 600;">Contact Support</a>
                  </p>
                  <p style="color: #94a3b8; font-size: 13px; margin: 0 0 10px 0;">
                    <strong style="color: #f1f5f9;">TurboFunding.com</strong><br>
                    Funding Solutions for Growing Businesses
                  </p>
                  <p style="color: #64748b; font-size: 11px; margin: 15px 0 0 0;">
                    This email was sent to ${recipientEmail}.<br>
                    © ${new Date().getFullYear()} TurboFunding.com. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

interface ApplicationEmailData {
  recipientEmail: string
  recipientName: string
  businessName: string
  amountRequested: string
  pdfUrl?: string | null
}

export async function sendApplicationConfirmationEmail(data: ApplicationEmailData) {
  const { recipientEmail, recipientName, businessName, amountRequested, pdfUrl } = data

  const formattedAmount = amountRequested
    ? `$${Number(amountRequested).toLocaleString()}`
    : "N/A"

  const content = `
    <!-- Success Banner -->
    <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
      <div style="background-color: rgba(255,255,255,0.2); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 32px;">✓</span>
      </div>
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Application Received!</h1>
    </div>

    <!-- Greeting -->
    <p style="color: #334155; font-size: 16px; margin: 0 0 20px 0;">
      Dear <strong>${recipientName}</strong>,
    </p>
    <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
      Thank you for choosing TurboFunding.com! We've successfully received your funding application and our team is excited to help accelerate your business growth.
    </p>

    <!-- Application Summary Card -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h2 style="color: #1e3a8a; margin: 0 0 16px 0; font-size: 18px; font-weight: 700; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
        📋 Application Summary
      </h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <span style="color: #64748b; font-size: 13px;">Business Name</span><br>
            <strong style="color: #1e293b; font-size: 15px;">${businessName}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <span style="color: #64748b; font-size: 13px;">Amount Requested</span><br>
            <strong style="color: #16a34a; font-size: 20px;">${formattedAmount}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <span style="color: #64748b; font-size: 13px;">Submission Date</span><br>
            <strong style="color: #1e293b; font-size: 15px;">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong>
          </td>
        </tr>
      </table>
    </div>

    <!-- What's Next Timeline -->
    <div style="margin-bottom: 24px;">
      <h2 style="color: #1e3a8a; margin: 0 0 16px 0; font-size: 18px; font-weight: 700;">
        🚀 What Happens Next?
      </h2>
      
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="padding: 12px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align: top; padding-right: 15px;">
                  <div style="background-color: #3b82f6; color: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">1</div>
                </td>
                <td style="vertical-align: top;">
                  <strong style="color: #1e293b;">Application Review</strong>
                  <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Our team reviews within <strong style="color: #f97316;">1 business day</strong></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align: top; padding-right: 15px;">
                  <div style="background-color: #3b82f6; color: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">2</div>
                </td>
                <td style="vertical-align: top;">
                  <strong style="color: #1e293b;">Personal Consultation</strong>
                  <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">A funding specialist will contact you directly</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align: top; padding-right: 15px;">
                  <div style="background-color: #3b82f6; color: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">3</div>
                </td>
                <td style="vertical-align: top;">
                  <strong style="color: #1e293b;">Tailored Solutions</strong>
                  <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">We'll present funding options customized for your business</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align: top; padding-right: 15px;">
                  <div style="background-color: #22c55e; color: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">✓</div>
                </td>
                <td style="vertical-align: top;">
                  <strong style="color: #1e293b;">Fast Funding</strong>
                  <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Receive funds in as little as <strong style="color: #f97316;">24-48 hours</strong></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    ${pdfUrl ? `
    <!-- View Application Button -->
    <div style="text-align: center; margin-bottom: 24px;">
      <a href="${pdfUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);">
        📄 View Application
      </a>
    </div>
    ` : ""}

    <!-- Pro Tip -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">
        <strong>💡 Pro Tip:</strong> To expedite your application, make sure to upload your recent bank statements through our portal.
      </p>
    </div>
  `

  const htmlContent = getEmailTemplate(content, recipientEmail)

  const textContent = `
TurboFunding.com - Application Received!

Dear ${recipientName},

Thank you for choosing TurboFunding.com! We've successfully received your funding application and our team is excited to help accelerate your business growth.

APPLICATION SUMMARY
-------------------
Business Name: ${businessName}
Amount Requested: ${formattedAmount}
Submission Date: ${new Date().toLocaleDateString()}

WHAT HAPPENS NEXT?
------------------
1. Application Review - Our team reviews within 1 business day
2. Personal Consultation - A funding specialist will contact you directly
3. Tailored Solutions - We'll present funding options customized for your business
4. Fast Funding - Receive funds in as little as 24-48 hours

${pdfUrl ? `Download your application PDF: ${pdfUrl}` : ""}

Pro Tip: To expedite your application, make sure to upload your recent bank statements through our portal.

Questions? Contact us at help@turbofunding.com

TurboFunding.com
Funding Solutions for Growing Businesses
© ${new Date().getFullYear()} TurboFunding.com. All rights reserved.
  `

  try {
    const info = await transporter.sendMail({
      from: `"TurboFunding.com" <${process.env.NODEMAILER_EMAIL}>`,
      to: recipientEmail,
      subject: `✓ Application Received - ${businessName} | TurboFunding.com`,
      text: textContent,
      html: htmlContent,
    })

    console.log("[Email] Confirmation email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("[Email] Error sending confirmation email:", error)
    return { success: false, error: errorMessage }
  }
}

// Send notification to admin about new application
export async function sendAdminNotificationEmail(formData: Record<string, unknown>, pdfUrl?: string | null) {
  const content = `
    <h2 style="color: #1e3a8a; margin: 0 0 20px 0; font-size: 22px;">🆕 New Application Received</h2>
    
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <h3 style="color: #1e3a8a; margin: 0 0 12px 0; font-size: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">🏢 Business Information</h3>
      <p style="margin: 8px 0; color: #334155;"><strong>Business Name:</strong> ${formData.businessName || formData.legalBusinessName || "N/A"}</p>
      <p style="margin: 8px 0; color: #334155;"><strong>DBA:</strong> ${formData.dba || formData.dbaName || "N/A"}</p>
      <p style="margin: 8px 0; color: #334155;"><strong>Industry:</strong> ${formData.industry || "N/A"}</p>
      <p style="margin: 8px 0; color: #334155;"><strong>Annual Revenue:</strong> ${formData.annualRevenue || "N/A"}</p>
      <p style="margin: 8px 0; color: #334155;"><strong>Years in Business:</strong> ${formData.yearsInBusiness || "N/A"}</p>
    </div>

    <div style="background-color: #f0fdf4; border: 1px solid #22c55e; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <h3 style="color: #16a34a; margin: 0 0 12px 0; font-size: 16px; border-bottom: 2px solid #22c55e; padding-bottom: 8px;">💰 Funding Request</h3>
      <p style="margin: 8px 0; color: #334155;"><strong>Amount Requested:</strong> <span style="color: #16a34a; font-size: 20px; font-weight: bold;">$${Number(formData.amountRequested || 0).toLocaleString()}</span></p>
      <p style="margin: 8px 0; color: #334155;"><strong>Purpose:</strong> ${formData.useOfFunds || formData.fundingPurpose || "N/A"}</p>
    </div>

    <div style="background-color: #eff6ff; border: 1px solid #3b82f6; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <h3 style="color: #1e3a8a; margin: 0 0 12px 0; font-size: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">👤 Contact Information</h3>
      <p style="margin: 8px 0; color: #334155;"><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p style="margin: 8px 0; color: #334155;"><strong>Owner Email:</strong> <a href="mailto:${formData.email}" style="color: #3b82f6;">${formData.email}</a></p>
      <p style="margin: 8px 0; color: #334155;"><strong>Business Email:</strong> <a href="mailto:${formData.businessEmail}" style="color: #3b82f6;">${formData.businessEmail}</a></p>
      <p style="margin: 8px 0; color: #334155;"><strong>Phone:</strong> ${formData.phone || formData.businessPhone}</p>
    </div>

    ${pdfUrl ? `
    <div style="text-align: center; margin-bottom: 20px;">
      <a href="${pdfUrl}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
        📄 View Application PDF
      </a>
    </div>
    ` : ""}

    <p style="color: #64748b; font-size: 12px; text-align: center;">Submitted on ${new Date().toLocaleString()}</p>
  `

  const htmlContent = getEmailTemplate(content, process.env.NODEMAILER_EMAIL || "admin")

  try {
    const info = await transporter.sendMail({
      from: `"TurboFunding.com" <${process.env.NODEMAILER_EMAIL}>`,
      to: process.env.NODEMAILER_EMAIL,
      subject: `🆕 New Application: ${formData.businessName || formData.legalBusinessName} - $${Number(formData.amountRequested || 0).toLocaleString()}`,
      html: htmlContent,
    })

    console.log("[Email] Admin notification sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("[Email] Error sending admin notification:", error)
    return { success: false, error: errorMessage }
  }
}

// ============================================
// SIGN UP EMAIL - Welcome new users
// ============================================

interface SignUpEmailData {
  recipientEmail: string
  recipientName: string
}

export async function sendSignUpEmail(data: SignUpEmailData) {
  const { recipientEmail, recipientName } = data

  const content = `
    <!-- Welcome Banner -->
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Welcome to TurboFunding!</h1>
    </div>

    <!-- Greeting -->
    <p style="color: #334155; font-size: 16px; margin: 0 0 20px 0;">
      Hi <strong>${recipientName}</strong>,
    </p>
    <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
      Thank you for creating an account with TurboFunding.com! You've taken the first step towards turbocharging your business growth.
    </p>

    <!-- Benefits Card -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h2 style="color: #1e3a8a; margin: 0 0 16px 0; font-size: 18px; font-weight: 700; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
        🚀 What You Can Do Now
      </h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align: top; padding-right: 12px;">
                  <span style="color: #22c55e; font-size: 18px;">✓</span>
                </td>
                <td>
                  <strong style="color: #1e293b;">Apply for Funding</strong>
                  <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Get up to $2M in business funding</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align: top; padding-right: 12px;">
                  <span style="color: #22c55e; font-size: 18px;">✓</span>
                </td>
                <td>
                  <strong style="color: #1e293b;">Track Applications</strong>
                  <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Monitor your funding applications in real-time</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align: top; padding-right: 12px;">
                  <span style="color: #22c55e; font-size: 18px;">✓</span>
                </td>
                <td>
                  <strong style="color: #1e293b;">Fast Approval</strong>
                  <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Get funded in as little as 24-48 hours</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin-bottom: 24px;">
      <a href="${WEBSITE_URL}/apply" style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);">
        🚀 Start Your Application
      </a>
    </div>

    <!-- Info Box -->
    <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
      <p style="margin: 0; color: #1e40af; font-size: 14px;">
        <strong>Need help?</strong> Our funding specialists are standing by to answer your questions and guide you through the process.
      </p>
    </div>
  `

  const htmlContent = getEmailTemplate(content, recipientEmail)

  const textContent = `
Welcome to TurboFunding.com!

Hi ${recipientName},

Thank you for creating an account with TurboFunding.com! You've taken the first step towards turbocharging your business growth.

WHAT YOU CAN DO NOW:
- Apply for Funding - Get up to $2M in business funding
- Track Applications - Monitor your funding applications in real-time  
- Fast Approval - Get funded in as little as 24-48 hours

Start your application: ${WEBSITE_URL}/apply

Need help? Our funding specialists are standing by to answer your questions.

TurboFunding.com
Funding Solutions for Growing Businesses
  `

  try {
    const info = await transporter.sendMail({
      from: `"TurboFunding.com" <${process.env.NODEMAILER_EMAIL}>`,
      to: recipientEmail,
      subject: `🎉 Welcome to TurboFunding.com, ${recipientName}!`,
      text: textContent,
      html: htmlContent,
    })

    console.log("[Email] Sign up email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("[Email] Error sending sign up email:", error)
    return { success: false, error: errorMessage }
  }
}

// ============================================
// LOGIN EMAIL - Magic link or login notification
// ============================================

interface LoginEmailData {
  recipientEmail: string
  recipientName: string
  loginLink?: string
  ipAddress?: string
  device?: string
}

export async function sendLoginEmail(data: LoginEmailData) {
  const { recipientEmail, recipientName, loginLink, ipAddress, device } = data

  const isLoginNotification = !loginLink
  const currentTime = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  })

  const content = isLoginNotification ? `
    <!-- Login Alert Banner -->
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 10px;">🔐</div>
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">New Login Detected</h1>
    </div>

    <!-- Greeting -->
    <p style="color: #334155; font-size: 16px; margin: 0 0 20px 0;">
      Hi <strong>${recipientName}</strong>,
    </p>
    <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
      We detected a new login to your TurboFunding.com account. If this was you, no action is needed.
    </p>

    <!-- Login Details Card -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h2 style="color: #1e3a8a; margin: 0 0 16px 0; font-size: 18px; font-weight: 700; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
        📋 Login Details
      </h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
            <span style="color: #64748b; font-size: 13px;">Time</span><br>
            <strong style="color: #1e293b; font-size: 15px;">${currentTime}</strong>
          </td>
        </tr>
        ${ipAddress ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
            <span style="color: #64748b; font-size: 13px;">IP Address</span><br>
            <strong style="color: #1e293b; font-size: 15px;">${ipAddress}</strong>
          </td>
        </tr>
        ` : ""}
        ${device ? `
        <tr>
          <td style="padding: 10px 0;">
            <span style="color: #64748b; font-size: 13px;">Device</span><br>
            <strong style="color: #1e293b; font-size: 15px;">${device}</strong>
          </td>
        </tr>
        ` : ""}
      </table>
    </div>

    <!-- Warning Box -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b; margin-bottom: 24px;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">
        <strong>⚠️ Wasn't you?</strong> If you didn't log in, please secure your account immediately by resetting your password.
      </p>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center;">
      <a href="${WEBSITE_URL}/reset-password" style="display: inline-block; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px;">
        🔒 Secure My Account
      </a>
    </div>
  ` : `
    <!-- Magic Link Banner -->
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 10px;">🔑</div>
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Your Login Link</h1>
    </div>

    <!-- Greeting -->
    <p style="color: #334155; font-size: 16px; margin: 0 0 20px 0;">
      Hi <strong>${recipientName}</strong>,
    </p>
    <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
      Click the button below to securely log in to your TurboFunding.com account. This link will expire in 15 minutes.
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin-bottom: 24px;">
      <a href="${loginLink}" style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);">
        🔐 Log In to TurboFunding
      </a>
    </div>

    <!-- Security Info -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <p style="margin: 0; color: #64748b; font-size: 13px; text-align: center;">
        <strong>Link not working?</strong> Copy and paste this URL into your browser:<br>
        <span style="color: #3b82f6; word-break: break-all;">${loginLink}</span>
      </p>
    </div>

    <!-- Warning Box -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">
        <strong>⚠️ Didn't request this?</strong> If you didn't request a login link, you can safely ignore this email.
      </p>
    </div>
  `

  const htmlContent = getEmailTemplate(content, recipientEmail)

  const subject = isLoginNotification 
    ? `🔐 New Login to Your TurboFunding Account`
    : `🔑 Your TurboFunding Login Link`

  const textContent = isLoginNotification ? `
New Login Detected - TurboFunding.com

Hi ${recipientName},

We detected a new login to your TurboFunding.com account.

LOGIN DETAILS:
Time: ${currentTime}
${ipAddress ? `IP Address: ${ipAddress}` : ""}
${device ? `Device: ${device}` : ""}

If this was you, no action is needed.

Wasn't you? Secure your account: ${WEBSITE_URL}/reset-password

TurboFunding.com
  ` : `
Your Login Link - TurboFunding.com

Hi ${recipientName},

Click here to log in: ${loginLink}

This link will expire in 15 minutes.

Didn't request this? You can safely ignore this email.

TurboFunding.com
  `

  try {
    const info = await transporter.sendMail({
      from: `"TurboFunding.com" <${process.env.NODEMAILER_EMAIL}>`,
      to: recipientEmail,
      subject,
      text: textContent,
      html: htmlContent,
    })

    console.log("[Email] Login email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("[Email] Error sending login email:", error)
    return { success: false, error: errorMessage }
  }
}

// ============================================
// TEST EMAIL FUNCTION - Run from command line
// ============================================
// Usage: npx tsx lib/email.ts
// Or:    pnpm tsx lib/email.ts
// ============================================

export async function sendTestEmail(toEmail?: string) {
  const testEmail = toEmail || process.env.NODEMAILER_EMAIL

  if (!testEmail) {
    console.error("❌ No email address provided. Set NODEMAILER_EMAIL in .env or pass an email.")
    return { success: false, error: "No email address" }
  }

  console.log(`📧 Sending test email to: ${testEmail}`)

  const result = await sendApplicationConfirmationEmail({
    recipientEmail: testEmail,
    recipientName: "Test User",
    businessName: "Acme Corporation",
    amountRequested: "150000",
    // pdfUrl is omitted - in real submissions, this comes from Vercel Blob upload
  })

  if (result.success) {
    console.log(`✅ Test email sent successfully! Message ID: ${result.messageId}`)
  } else {
    console.error(`❌ Failed to send test email: ${result.error}`)
  }

  return result
}

// Run test if this file is executed directly
// Check if running as main module (not imported)
const isMainModule = typeof require !== "undefined" && require.main === module

if (isMainModule) {
  // Load dotenv for CLI execution
  require("dotenv").config()
  
  const targetEmail = process.argv[2] // Optional: pass email as argument
  sendTestEmail(targetEmail).then(() => process.exit(0))
}
