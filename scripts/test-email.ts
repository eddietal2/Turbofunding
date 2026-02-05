/**
 * Test Email Script - TurboFunding.com
 * 
 * Usage:
 *   pnpm test:email [type] [email]
 * 
 * Email Types:
 *   application  - Application success confirmation (default)
 *   signup       - Welcome email for new users
 *   login        - Login notification / magic link
 * 
 * Examples:
 *   pnpm test:email                                   # Application email to default
 *   pnpm test:email application                       # Application email to default
 *   pnpm test:email signup                            # Sign up email to default
 *   pnpm test:email login                             # Login email to default
 *   pnpm test:email application eddie@finalbossxr.com # Application to Eddie
 *   pnpm test:email signup vivsin1995@gmail.com       # Sign up to Vivek
 *   pnpm test:email login eddie@finalbossxr.com       # Login to Eddie
 */

import * as dotenv from "dotenv"
import nodemailer from "nodemailer"

// Load environment variables
dotenv.config()

const LOGO_URL = "https://turbofunding.com/images/turbofunding-logo.png"
const WEBSITE_URL = "https://turbofunding.com"

type EmailType = "application" | "signup" | "login"

const EMAIL_TYPES: EmailType[] = ["application", "signup", "login"]

function getEmailTemplate(content: string, recipientEmail: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; max-width: 100%;">
              
              <!-- Header with Logo -->
              <tr>
                <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px 40px; text-align: center;">
                  <img src="${LOGO_URL}" alt="TurboFunding.com" width="220" style="max-width: 100%; height: auto;" />
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
                    This is a test email sent to ${recipientEmail}.<br>
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

function getApplicationEmailContent() {
  return `
    <!-- Success Banner -->
    <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">✓ Application Received!</h1>
    </div>

    <p style="color: #334155; font-size: 16px; margin: 0 0 20px 0;">
      Dear <strong>Test User</strong>,
    </p>
    <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
      Thank you for choosing TurboFunding.com! We've successfully received your funding application.
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
            <strong style="color: #1e293b; font-size: 15px;">Acme Corporation</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <span style="color: #64748b; font-size: 13px;">Amount Requested</span><br>
            <strong style="color: #16a34a; font-size: 20px;">$150,000</strong>
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

    <!-- Download Button -->
    <div style="text-align: center; margin-bottom: 24px;">
      <a href="https://turbofunding.com" style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);">
        📄 Download Your Application PDF
      </a>
    </div>

    <!-- Pro Tip -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">
        <strong>💡 Pro Tip:</strong> To expedite your application, upload your recent bank statements.
      </p>
    </div>
  `
}

function getSignUpEmailContent() {
  return `
    <!-- Welcome Banner -->
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Welcome to TurboFunding!</h1>
    </div>

    <p style="color: #334155; font-size: 16px; margin: 0 0 20px 0;">
      Hi <strong>Test User</strong>,
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
        <strong>Need help?</strong> Our funding specialists are standing by to answer your questions.
      </p>
    </div>
  `
}

function getLoginEmailContent() {
  const currentTime = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  })

  return `
    <!-- Login Alert Banner -->
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 10px;">🔐</div>
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">New Login Detected</h1>
    </div>

    <p style="color: #334155; font-size: 16px; margin: 0 0 20px 0;">
      Hi <strong>Test User</strong>,
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
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
            <span style="color: #64748b; font-size: 13px;">IP Address</span><br>
            <strong style="color: #1e293b; font-size: 15px;">192.168.1.1 (Test)</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0;">
            <span style="color: #64748b; font-size: 13px;">Device</span><br>
            <strong style="color: #1e293b; font-size: 15px;">Chrome on Windows</strong>
          </td>
        </tr>
      </table>
    </div>

    <!-- Warning Box -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b; margin-bottom: 24px;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">
        <strong>⚠️ Wasn't you?</strong> If you didn't log in, please secure your account immediately.
      </p>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center;">
      <a href="${WEBSITE_URL}/reset-password" style="display: inline-block; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px;">
        🔒 Secure My Account
      </a>
    </div>
  `
}

async function sendTestEmail(emailType: EmailType, toEmail?: string) {
  const testEmail = toEmail || process.env.NODEMAILER_EMAIL

  if (!testEmail) {
    console.error("❌ No email address provided.")
    console.error("   Set NODEMAILER_EMAIL in .env or pass an email as argument.")
    process.exit(1)
  }

  if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
    console.error("❌ Missing NODEMAILER_EMAIL or NODEMAILER_PASSWORD in .env file")
    process.exit(1)
  }

  const typeLabels = {
    application: "📋 Application Success",
    signup: "🎉 Sign Up Welcome",
    login: "🔐 Login Notification"
  }

  console.log("📧 TurboFunding Email Test")
  console.log("==========================")
  console.log(`Type: ${typeLabels[emailType]}`)
  console.log(`From: ${process.env.NODEMAILER_EMAIL}`)
  console.log(`To: ${testEmail}`)
  console.log(`SMTP: mail.spacemail.com:465 (SSL)`)
  console.log("")

  const transporter = nodemailer.createTransport({
    host: "mail.spacemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  // Verify connection
  console.log("🔌 Verifying SMTP connection...")
  try {
    await transporter.verify()
    console.log("✅ SMTP connection verified!\n")
  } catch (error) {
    console.error("❌ SMTP connection failed:", error)
    process.exit(1)
  }

  // Get content based on email type
  let content: string
  let subject: string

  switch (emailType) {
    case "signup":
      content = getSignUpEmailContent()
      subject = `🎉 Welcome to TurboFunding.com, Test User!`
      break
    case "login":
      content = getLoginEmailContent()
      subject = `🔐 New Login to Your TurboFunding Account`
      break
    case "application":
    default:
      content = getApplicationEmailContent()
      subject = `✓ Application Received - Acme Corporation | TurboFunding.com`
      break
  }

  const htmlContent = getEmailTemplate(content, testEmail)

  console.log("📤 Sending test email...")

  try {
    const info = await transporter.sendMail({
      from: `"TurboFunding.com" <${process.env.NODEMAILER_EMAIL}>`,
      to: testEmail,
      subject: `[TEST] ${subject}`,
      html: htmlContent,
      text: `TurboFunding.com Test Email (${emailType})\n\nThis is a test email.\n\nTest Date: ${new Date().toLocaleString()}`,
    })

    console.log("✅ Test email sent successfully!")
    console.log(`   Type: ${typeLabels[emailType]}`)
    console.log(`   Message ID: ${info.messageId}`)
    console.log(`   Response: ${info.response}`)
  } catch (error) {
    console.error("❌ Failed to send email:", error)
    process.exit(1)
  }
}

// Parse command line arguments
const args = process.argv.slice(2)
let emailType: EmailType = "application"
let targetEmail: string | undefined

// Check if first argument is an email type or an email address
if (args[0]) {
  if (EMAIL_TYPES.includes(args[0] as EmailType)) {
    emailType = args[0] as EmailType
    targetEmail = args[1]
  } else if (args[0].includes("@")) {
    // First arg is an email address
    targetEmail = args[0]
  } else {
    console.error(`❌ Unknown email type: ${args[0]}`)
    console.error(`   Valid types: ${EMAIL_TYPES.join(", ")}`)
    process.exit(1)
  }
}

sendTestEmail(emailType, targetEmail)
