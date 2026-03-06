import nodemailer from "nodemailer"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("\n\n========== EMAIL SERVICE TEST ==========")
  console.log("Testing Nodemailer configuration...")

  const email = process.env.NODEMAILER_EMAIL
  const password = process.env.NODEMAILER_PASSWORD

  console.log("Environment Variables:")
  console.log("- NODEMAILER_EMAIL:", email ? "✓ SET" : "✗ NOT SET")
  console.log("- NODEMAILER_PASSWORD:", password ? "✓ SET" : "✗ NOT SET")

  if (!email || !password) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing email credentials in environment variables",
        details: {
          emailSet: !!email,
          passwordSet: !!password,
        },
      },
      { status: 500 }
    )
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.spacemail.com",
      port: 465,
      secure: true,
      auth: {
        user: email,
        pass: password,
      },
    })

    console.log("\nAttempting SMTP connection verification...")
    
    const verified = await transporter.verify()
    
    if (verified) {
      console.log("✅ SMTP connection verified successfully!")
      
      // Try sending a test email
      console.log("\nAttempting to send test email...")
      const info = await transporter.sendMail({
        from: `"TurboFunding Test" <${email}>`,
        to: email,
        subject: "Test Email - TurboFunding Contact Form",
        text: "If you received this, your email configuration is working!",
        html: "<h1>Test Email</h1><p>If you received this, your email configuration is working!</p>",
      })
      
      console.log("✅ Test email sent successfully!")
      console.log("Message ID:", info.messageId)
      console.log("Response:", info.response)
      
      return NextResponse.json({
        success: true,
        message: "Email service is working correctly!",
        details: {
          smtpVerified: true,
          testEmailSent: true,
          messageId: info.messageId,
        },
      })
    } else {
      console.log("✗ SMTP verification failed")
      return NextResponse.json(
        {
          success: false,
          error: "SMTP verification failed - credentials may be incorrect",
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("✗ Error testing email service:", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("Full error:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        fullError: error instanceof Error ? error.stack : String(error),
      },
      { status: 500 }
    )
  }
}
