"use server"

import { Resend } from "resend"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

export async function submitApplication(formData: any) {
  try {
    console.log("[v0] Starting application submission...")
    console.log("[v0] Form data received:", JSON.stringify(formData, null, 2))

    const resendApiKey = "re_TexwzWqH_9DgGnyBEPLxB5ZsppsHnmX5m"
    const recipientEmail = "vivsin1995@gmail.com"

    console.log("[v0] Using recipient email:", recipientEmail)

    if (!resendApiKey) {
      console.error("[v0] Missing Resend API key")
      return { success: false, error: "Email service not configured. Please contact support." }
    }

    console.log("[v0] Generating PDF...")
    const pdfDoc = await PDFDocument.create()
    let currentPage = pdfDoc.addPage([612, 792])
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    let cursiveFont
    try {
      const fontResponse = await fetch(
        "https://cdn.jsdelivr.net/npm/@fontsource/dancing-script@5.0.18/files/dancing-script-latin-400-normal.woff",
        { cache: "force-cache" },
      )

      if (!fontResponse.ok) {
        throw new Error("Font fetch failed")
      }

      const fontBytes = await fontResponse.arrayBuffer()
      cursiveFont = await pdfDoc.embedFont(new Uint8Array(fontBytes))
      console.log("[v0] Cursive font loaded successfully")
    } catch (error) {
      console.log("[v0] Could not load cursive font, using italic fallback:", error)
      cursiveFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)
    }

    const pageWidth = 612
    const pageHeight = 792
    const margin = 50
    const contentWidth = pageWidth - 2 * margin

    const brandOrange = rgb(249 / 255, 115 / 255, 22 / 255)
    const brandBlue = rgb(37 / 255, 99 / 255, 235 / 255)
    const lightGray = rgb(0.96, 0.96, 0.96)
    const darkGray = rgb(0.3, 0.3, 0.3)

    let yPosition = pageHeight - 70

    const checkPageSpace = (requiredSpace: number) => {
      if (yPosition < margin + requiredSpace) {
        currentPage = pdfDoc.addPage([612, 792])
        yPosition = pageHeight - 70
        return true
      }
      return false
    }

    const drawSectionHeader = (text: string, y: number) => {
      checkPageSpace(40)
      currentPage.drawRectangle({
        x: margin - 5,
        y: y - 6,
        width: contentWidth + 10,
        height: 24,
        color: lightGray,
      })
      currentPage.drawText(text, {
        x: margin + 5,
        y: y,
        size: 13,
        font: boldFont,
        color: brandBlue,
      })
      return y - 35
    }

    const drawField = (label: string, value: string, y: number, isLeftColumn = true) => {
      const xPos = isLeftColumn ? margin : margin + contentWidth / 2 + 15
      const maxWidth = contentWidth / 2 - 20

      currentPage.drawText(`${label}:`, {
        x: xPos,
        y,
        size: 9,
        font: boldFont,
        color: darkGray,
      })

      let displayValue = value || "N/A"
      if (displayValue.length > 40) {
        displayValue = displayValue.substring(0, 37) + "..."
      }

      currentPage.drawText(displayValue, {
        x: xPos,
        y: y - 13,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      })

      return y - 30
    }

    let logoImage
    try {
      const logoResponse = await fetch(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/144E647D-16BC-4CBB-8973-E51AB393F84A-fb9Q6gUvW9WyoIQnA0Nwfv2Z0ps4TU.png",
      )
      if (logoResponse.ok) {
        const logoBytes = await logoResponse.arrayBuffer()
        logoImage = await pdfDoc.embedPng(new Uint8Array(logoBytes))

        const logoWidth = 80
        const logoHeight = 53
        currentPage.drawImage(logoImage, {
          x: margin,
          y: pageHeight - 65,
          width: logoWidth,
          height: logoHeight,
        })
        console.log("[v0] Logo embedded successfully")
      }
    } catch (error) {
      console.log("[v0] Could not load logo:", error)
    }

    const turbofundingText = "TurboFunding.com"
    const turbofundingWidth = boldFont.widthOfTextAtSize(turbofundingText, 18)
    currentPage.drawText(turbofundingText, {
      x: (pageWidth - turbofundingWidth) / 2,
      y: pageHeight - 20,
      size: 18,
      font: boldFont,
      color: brandBlue,
    })

    const turbochargeText = "TURBOCHARGE YOUR BUSINESS"
    const turbochargeWidth = boldFont.widthOfTextAtSize(turbochargeText, 14)
    currentPage.drawText(turbochargeText, {
      x: (pageWidth - turbochargeWidth) / 2,
      y: pageHeight - 38,
      size: 14,
      font: boldFont,
      color: brandOrange,
    })

    const fundingAppText = "Funding Application"
    const fundingAppWidth = boldFont.widthOfTextAtSize(fundingAppText, 14)
    currentPage.drawText(fundingAppText, {
      x: (pageWidth - fundingAppWidth) / 2,
      y: pageHeight - 58,
      size: 14,
      font: boldFont,
      color: brandBlue,
    })

    const contactX = pageWidth - 150
    currentPage.drawText("Email: help@turbofunding.com", {
      x: contactX,
      y: pageHeight - 20,
      size: 9,
      font,
      color: darkGray,
    })
    currentPage.drawText("Phone: xxx-xxx-xxxx", {
      x: contactX,
      y: pageHeight - 35,
      size: 9,
      font,
      color: darkGray,
    })
    currentPage.drawText("Fax: xxx-xxx-xxxx", {
      x: contactX,
      y: pageHeight - 50,
      size: 9,
      font,
      color: darkGray,
    })

    yPosition = pageHeight - 80

    yPosition = drawSectionHeader("Business Information", yPosition)

    let leftY = yPosition
    leftY = drawField("Legal Business Name", formData.legalBusinessName, leftY, true)
    leftY = drawField("DBA Name", formData.dbaName, leftY, true)
    leftY = drawField("Federal Tax ID", formData.federalTaxId, leftY, true)
    leftY = drawField("Business Type", formData.businessType, leftY, true)

    let rightY = yPosition
    rightY = drawField("Business Start Date", formData.businessStartDate, rightY, false)
    rightY = drawField("Annual Revenue", formData.annualRevenue, rightY, false)
    rightY = drawField("State Incorporated", formData.stateIncorporated, rightY, false)
    rightY = drawField("Industry", formData.industry, rightY, false)

    yPosition = Math.min(leftY, rightY) - 20

    yPosition = drawSectionHeader("Business Address", yPosition)

    leftY = yPosition
    leftY = drawField("Street Address", formData.businessAddress, leftY, true)
    leftY = drawField("City", formData.businessCity, leftY, true)

    rightY = yPosition
    rightY = drawField("State", formData.businessState, rightY, false)
    rightY = drawField("Zip Code", formData.businessZipCode, rightY, false)

    yPosition = Math.min(leftY, rightY) - 20

    yPosition = drawSectionHeader("Primary Owner Information", yPosition)

    leftY = yPosition
    leftY = drawField("First Name", formData.firstName, leftY, true)
    leftY = drawField("Last Name", formData.lastName, leftY, true)
    leftY = drawField("Phone", formData.phone, leftY, true)
    leftY = drawField("Date of Birth", formData.dateOfBirth, leftY, true)
    leftY = drawField("Social Security Number", formData.ssn || "", leftY, true)

    rightY = yPosition
    rightY = drawField("Home Address", formData.homeAddress, rightY, false)
    rightY = drawField("City", formData.city, rightY, false)
    rightY = drawField("State", formData.state, rightY, false)
    rightY = drawField("Zip Code", formData.zipCode, rightY, false)
    rightY = drawField("Credit Score", formData.creditScore, rightY, false)
    rightY = drawField(
      "Ownership %",
      formData.percentageOwnership ? `${formData.percentageOwnership}%` : "",
      rightY,
      false,
    )

    yPosition = Math.min(leftY, rightY) - 20

    if (formData.secondOwnerFirstName || formData.secondOwnerLastName) {
      checkPageSpace(200)
      yPosition = drawSectionHeader("Second Owner Information", yPosition)

      leftY = yPosition
      leftY = drawField("First Name", formData.secondOwnerFirstName, leftY, true)
      leftY = drawField("Last Name", formData.secondOwnerLastName, leftY, true)
      leftY = drawField("Phone", formData.secondOwnerPhone, leftY, true)
      leftY = drawField("Date of Birth", formData.secondOwnerDateOfBirth, leftY, true)
      leftY = drawField("Social Security Number", formData.secondOwnerSsn || "", leftY, true)

      rightY = yPosition
      rightY = drawField("Home Address", formData.secondOwnerHomeAddress, rightY, false)
      rightY = drawField("City", formData.secondOwnerCity, rightY, false)
      rightY = drawField("State", formData.secondOwnerState, rightY, false)
      rightY = drawField("Zip Code", formData.secondOwnerZipCode, rightY, false)
      rightY = drawField("Credit Score", formData.secondOwnerCreditScore, rightY, false)
      rightY = drawField(
        "Ownership %",
        formData.secondOwnerPercentageOwnership ? `${formData.secondOwnerPercentageOwnership}%` : "",
        rightY,
        false,
      )

      yPosition = Math.min(leftY, rightY) - 20
    }

    checkPageSpace(120)
    yPosition = drawSectionHeader("Funding Information", yPosition)

    leftY = yPosition
    leftY = drawField("Funding Amount", formData.fundingAmount, leftY, true)
    leftY = drawField("Purpose", formData.fundingPurpose, leftY, true)

    yPosition = leftY - 15

    if (formData.additionalInfo) {
      currentPage.drawText("Additional Information:", {
        x: margin,
        y: yPosition,
        size: 9,
        font: boldFont,
        color: darkGray,
      })

      const additionalInfoLines = formData.additionalInfo.match(/.{1,80}/g) || [formData.additionalInfo]
      yPosition -= 13

      additionalInfoLines.slice(0, 3).forEach((line: string) => {
        currentPage.drawText(line, {
          x: margin,
          y: yPosition,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        })
        yPosition -= 13
      })

      yPosition -= 15
    }

    checkPageSpace(100)
    yPosition = drawSectionHeader("Authorization & Signature", yPosition)

    currentPage.drawText("Owner Signature:", {
      x: margin,
      y: yPosition,
      size: 9,
      font: boldFont,
      color: darkGray,
    })

    if (formData.signature && formData.signature.startsWith("data:image/png;base64,")) {
      try {
        const base64Data = formData.signature.split(",")[1]
        const imageBytes = Buffer.from(base64Data, "base64")
        const signatureImage = await pdfDoc.embedPng(imageBytes)
        const signatureDims = signatureImage.scale(0.25)

        currentPage.drawImage(signatureImage, {
          x: margin,
          y: yPosition - 45,
          width: signatureDims.width,
          height: signatureDims.height,
        })

        yPosition = yPosition - 55
      } catch (error) {
        console.error("[v0] Error embedding signature image:", error)
        currentPage.drawText("Signature (image failed to load)", {
          x: margin,
          y: yPosition - 12,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        })
        yPosition = yPosition - 30
      }
    } else {
      currentPage.drawText(formData.signature || "Not signed", {
        x: margin,
        y: yPosition - 12,
        size: 24,
        font: cursiveFont,
        color: brandBlue,
      })
      yPosition = yPosition - 30
    }

    currentPage.drawText("Printed Name:", {
      x: margin,
      y: yPosition,
      size: 9,
      font: boldFont,
      color: darkGray,
    })
    const printedName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim()
    currentPage.drawText(printedName || "N/A", {
      x: margin,
      y: yPosition - 12,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    })
    yPosition = yPosition - 30

    currentPage.drawText("Date Signed:", {
      x: margin + 280,
      y: yPosition + 42,
      size: 9,
      font: boldFont,
      color: darkGray,
    })
    currentPage.drawText(formData.signatureDate || "", {
      x: margin + 280,
      y: yPosition + 29,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    })

    const pages = pdfDoc.getPages()
    pages.forEach((page) => {
      page.drawText("TurboFunding.com | Phone: xxx-xxx-xxxx | Email: email@turbofunding.com", {
        x: margin,
        y: 25,
        size: 8,
        font,
        color: rgb(0.5, 0.5, 0.5),
      })
    })

    const pdfBytes = await pdfDoc.save()
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64")
    console.log("[v0] PDF generated successfully")

    const resend = new Resend(resendApiKey)
    console.log("[v0] Attempting to send email with PDF attachment...")

    const emailContent = `
      <h1>New TurboFunding Application</h1>
      <p>A new application has been submitted. Please see the attached PDF for complete details.</p>
      <h2>Quick Summary</h2>
      <p><strong>Business:</strong> ${formData.legalBusinessName || "N/A"}</p>
      <p><strong>Owner:</strong> ${formData.firstName || ""} ${formData.lastName || ""}</p>
      <p><strong>Funding Amount:</strong> ${formData.fundingAmount || "N/A"}</p>
      ${formData.secondOwnerFirstName || formData.secondOwnerLastName ? `<p><strong>Second Owner:</strong> ${formData.secondOwnerFirstName || ""} ${formData.secondOwnerLastName || ""}</p>` : ""}
    `

    const { data, error } = await resend.emails.send({
      from: "TurboFunding <onboarding@resend.dev>",
      to: recipientEmail,
      subject: `New Application: ${formData.legalBusinessName || "Unknown Business"}`,
      html: emailContent,
      attachments: [
        {
          filename: `TurboFunding_Application_${formData.legalBusinessName?.replace(/[^a-z0-9]/gi, "_") || "Application"}.pdf`,
          content: pdfBase64,
        },
      ],
    })

    if (error) {
      console.error("[v0] Resend API error:", JSON.stringify(error, null, 2))
      return {
        success: false,
        error: `Email sending failed: ${error.message || "Unknown error"}. Please try again or contact support.`,
      }
    }

    console.log("[v0] Email with PDF sent successfully!")
    console.log("[v0] Email data:", JSON.stringify(data, null, 2))
    return { success: true, data }
  } catch (error: any) {
    console.error("[v0] Unexpected error in submitApplication:", error)
    console.error("[v0] Error stack:", error.stack)
    return {
      success: false,
      error: `Application submission failed: ${error.message || "Unknown error"}. Please contact support at vivsin1995@gmail.com`,
    }
  }
}
