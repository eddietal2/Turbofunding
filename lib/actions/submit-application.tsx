"use server"

import { sendApplicationConfirmationEmail, sendAdminNotificationEmail } from "@/lib/email"
import { ApplicationFolder } from "./upload-application-documents"

interface SubmitApplicationResult {
  success: boolean
  data?: { message: string }
  error?: string
  emailSent?: boolean
}

export async function submitApplication(formData: Record<string, unknown>, applicationFolder?: ApplicationFolder | null): Promise<SubmitApplicationResult> {
  try {
    console.log("[Submit] Starting application submission...")
    console.log("[Submit] Form data received:", JSON.stringify(formData, null, 2))
    if (applicationFolder) {
      console.log("[Submit] Application folder:", JSON.stringify(applicationFolder, null, 2))
    }

    // TODO: Implement your preferred backend submission method here
    // For now, just log the data
    console.log("[Submit] Application data logged successfully")

    // Send confirmation email to applicant's personal email (formData.email)
    // NOT the business email (formData.businessEmail)
    const recipientEmail = formData.email as string
    const recipientName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim() || "Valued Customer"
    const businessName = (formData.businessName || formData.legalBusinessName || "Your Business") as string
    const amountRequested = (formData.amountRequested || "0") as string

    // Extract PDF URL from application folder
    const pdfUrl = applicationFolder?.applicationPdfUrl || null

    if (recipientEmail) {
      console.log("[Submit] Sending confirmation email to owner:", recipientEmail)
      
      const emailResult = await sendApplicationConfirmationEmail({
        recipientEmail,
        recipientName,
        businessName,
        amountRequested,
        pdfUrl,
      })

      if (emailResult.success) {
        console.log("[Submit] Confirmation email sent successfully")
      } else {
        console.error("[Submit] Failed to send confirmation email:", emailResult.error)
      }

      // Also send admin notification with all document links
      const adminResult = await sendAdminNotificationEmail(formData, applicationFolder)
      if (adminResult.success) {
        console.log("[Submit] Admin notification sent successfully")
      } else {
        console.error("[Submit] Failed to send admin notification:", adminResult.error)
      }

      return { 
        success: true, 
        data: { message: "Application received" },
        emailSent: emailResult.success
      }
    } else {
      console.warn("[Submit] No email address provided, skipping confirmation email")
      return { 
        success: true, 
        data: { message: "Application received" },
        emailSent: false
      }
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : ""
    console.error("[Submit] Unexpected error in submitApplication:", error)
    console.error("[Submit] Error stack:", errorStack)
    return {
      success: false,
      error: `Application submission failed: ${errorMessage}. Please contact support.`,
    }
  }
}
