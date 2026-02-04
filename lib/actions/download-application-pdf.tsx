"use server"

import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import { put } from "@vercel/blob"

export async function downloadApplicationPDF(formData: any) {
  try {
    console.log("[v0] Generating PDF for download...")

    const pdfDoc = await PDFDocument.create()
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

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
      console.log("[v0] Cursive font loaded successfully for download")
    } catch (error) {
      console.log("[v0] Could not load cursive font, using italic fallback:", error)
      cursiveFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)
    }

    const brandBlue = rgb(37 / 255, 99 / 255, 235 / 255)
    const brandOrange = rgb(249 / 255, 115 / 255, 22 / 255)
    const darkGray = rgb(55 / 255, 65 / 255, 81 / 255)
    const lightGray = rgb(229 / 255, 231 / 255, 235 / 255)

    let page = pdfDoc.addPage([612, 792])
    let yPosition = 720

    const checkAndAddPage = (requiredSpace: number) => {
      if (yPosition - requiredSpace < 50) {
        page = pdfDoc.addPage([612, 792])
        yPosition = 720
        page.drawText("TurboFunding.com Application", {
          x: 50,
          y: 30,
          size: 8,
          font: helveticaFont,
          color: darkGray,
        })
        page.drawText(`Page ${pdfDoc.getPageCount()}`, {
          x: 550,
          y: 30,
          size: 8,
          font: helveticaFont,
          color: darkGray,
        })
        return true
      }
      return false
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
        page.drawImage(logoImage, {
          x: 50,
          y: 792 - 65,
          width: logoWidth,
          height: logoHeight,
        })
        console.log("[v0] Logo embedded successfully in download PDF")
      }
    } catch (error) {
      console.log("[v0] Could not load logo:", error)
    }

    const turbofundingText = "TurboFunding.com"
    const turbofundingWidth = helveticaBold.widthOfTextAtSize(turbofundingText, 18)
    page.drawText(turbofundingText, {
      x: (612 - turbofundingWidth) / 2,
      y: yPosition + 40,
      size: 18,
      font: helveticaBold,
      color: brandBlue,
    })

    const turbochargeText = "TURBOCHARGE YOUR BUSINESS"
    const turbochargeWidth = helveticaBold.widthOfTextAtSize(turbochargeText, 14)
    page.drawText(turbochargeText, {
      x: (612 - turbochargeWidth) / 2,
      y: yPosition + 22,
      size: 14,
      font: helveticaBold,
      color: brandOrange,
    })

    const fundingAppText = "Funding Application"
    const fundingAppWidth = helveticaBold.widthOfTextAtSize(fundingAppText, 14)
    page.drawText(fundingAppText, {
      x: (612 - fundingAppWidth) / 2,
      y: yPosition + 4,
      size: 14,
      font: helveticaBold,
      color: brandBlue,
    })

    const contactX = 612 - 150
    page.drawText("Email: help@turbofunding.com", {
      x: contactX,
      y: yPosition + 40,
      size: 9,
      font: helveticaFont,
      color: darkGray,
    })
    page.drawText("Phone: xxx-xxx-xxxx", {
      x: contactX,
      y: yPosition + 25,
      size: 9,
      font: helveticaFont,
      color: darkGray,
    })
    page.drawText("Fax: xxx-xxx-xxxx", {
      x: contactX,
      y: yPosition + 10,
      size: 9,
      font: helveticaFont,
      color: darkGray,
    })

    yPosition -= 60

    // Helper function to draw section header
    const drawSectionHeader = (title: string) => {
      checkAndAddPage(40)
      page.drawRectangle({
        x: 40,
        y: yPosition - 5,
        width: 532,
        height: 22,
        color: lightGray,
      })
      page.drawText(title, {
        x: 50,
        y: yPosition,
        size: 11,
        font: helveticaBold,
        color: brandBlue,
      })
      yPosition -= 35
    }

    // Helper function to draw field in two-column layout
    const drawField = (label: string, value: string, isLeft = true) => {
      checkAndAddPage(25)
      const xPos = isLeft ? 50 : 320
      const maxWidth = 250

      page.drawText(label + ":", {
        x: xPos,
        y: yPosition,
        size: 9,
        font: helveticaBold,
        color: darkGray,
      })

      const displayValue = value || "N/A"
      page.drawText(displayValue, {
        x: xPos,
        y: yPosition - 12,
        size: 9,
        font: helveticaFont,
        color: rgb(0, 0, 0),
        maxWidth: maxWidth,
      })

      if (!isLeft) {
        yPosition -= 30
      }
    }

    // Business Information Section
    drawSectionHeader("BUSINESS INFORMATION")

    drawField("Legal Business Name", formData.businessName || formData.legalBusinessName, true)
    drawField("DBA Name", formData.dba || formData.dbaName, false)

    drawField("Federal Tax ID", formData.federalTaxId, true)
    drawField("Entity Type", formData.entityType || formData.businessType, false)

    drawField("Business Start Date", formData.businessStartDate, true)
    drawField("Annual Revenue", formData.annualRevenue, false)

    drawField("Years in Business", formData.yearsInBusiness, true)
    drawField("Industry", formData.industry, false)

    yPosition -= 18
    checkAndAddPage(25)
    page.drawText("Business Address:", {
      x: 50,
      y: yPosition,
      size: 9,
      font: helveticaBold,
      color: darkGray,
    })
    yPosition -= 12
    const businessAddress = `${formData.businessAddress || ""}, ${formData.businessCity || ""}, ${formData.businessState || ""} ${formData.businessZip || formData.businessZipCode || ""}`
    page.drawText(businessAddress, {
      x: 50,
      y: yPosition,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      maxWidth: 500,
    })
    yPosition -= 15

    drawField("Business Phone", formData.businessPhone, true)
    drawField("Business Email", formData.businessEmail || formData.email, false)

    // Owner Information Section
    drawSectionHeader("PRIMARY OWNER INFORMATION")

    drawField("Name", `${formData.firstName} ${formData.lastName}`, true)
    drawField("Phone", formData.phone, false)

    drawField("Date of Birth", formData.dateOfBirth, true)
    drawField("Social Security Number", "***-**-" + (formData.ssn?.slice(-4) || "****"), false)

    drawField("Credit Score", formData.creditScore, true)
    drawField("Percentage Ownership", formData.ownershipPercentage || formData.percentageOwnership ? `${formData.ownershipPercentage || formData.percentageOwnership}%` : "N/A", false)

    yPosition -= 18
    checkAndAddPage(25)
    page.drawText("Home Address:", {
      x: 50,
      y: yPosition,
      size: 9,
      font: helveticaBold,
      color: darkGray,
    })
    yPosition -= 12
    const homeAddress = `${formData.homeAddress || ""}, ${formData.city || ""}, ${formData.state || ""} ${formData.zip || formData.zipCode || ""}`
    page.drawText(homeAddress, {
      x: 50,
      y: yPosition,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      maxWidth: 500,
    })
    yPosition -= 30

    // Second Owner Information (if provided)
    if (formData.secondOwnerFirstName || formData.secondOwnerLastName) {
      drawSectionHeader("SECOND OWNER INFORMATION")

      drawField("Name", `${formData.secondOwnerFirstName} ${formData.secondOwnerLastName}`, true)
      drawField("Phone", formData.secondOwnerPhone, false)

      drawField("Date of Birth", formData.secondOwnerDateOfBirth, true)
      drawField("Social Security Number", "***-**-" + (formData.secondOwnerSsn?.slice(-4) || "****"), false)

      drawField("Credit Score", formData.secondOwnerCreditScore, true)
      drawField(
        "Percentage Ownership",
        formData.secondOwnerPercentageOwnership ? `${formData.secondOwnerPercentageOwnership}%` : "N/A",
        false,
      )

      yPosition -= 18
      checkAndAddPage(25)
      page.drawText("Home Address:", {
        x: 50,
        y: yPosition,
        size: 9,
        font: helveticaBold,
        color: darkGray,
      })
      yPosition -= 12
      const secondOwnerAddress = `${formData.secondOwnerHomeAddress}, ${formData.secondOwnerCity}, ${formData.secondOwnerState} ${formData.secondOwnerZipCode}`
      page.drawText(secondOwnerAddress, {
        x: 50,
        y: yPosition,
        size: 9,
        font: helveticaFont,
        color: rgb(0, 0, 0),
        maxWidth: 500,
      })
      yPosition -= 30
    }

    // Funding Information Section
    drawSectionHeader("FUNDING INFORMATION")

    drawField("Funding Amount", formData.amountRequested ? `$${Number(formData.amountRequested).toLocaleString()}` : formData.fundingAmount, true)
    drawField("Purpose", formData.useOfFunds || formData.fundingPurpose, false)

    if (formData.additionalInfo) {
      yPosition -= 15
      checkAndAddPage(60)
      page.drawText("Additional Information:", {
        x: 50,
        y: yPosition,
        size: 9,
        font: helveticaBold,
        color: darkGray,
      })
      yPosition -= 12

      const lines = formData.additionalInfo.split("\n")
      for (const line of lines) {
        checkAndAddPage(15)
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: 9,
          font: helveticaFont,
          color: rgb(0, 0, 0),
          maxWidth: 500,
        })
        yPosition -= 12
      }
      yPosition -= 18
    }

    // Signature Section
    drawSectionHeader("SIGNATURE")

    checkAndAddPage(100)

    // Check if signature is an image (data URL) or text
    if (formData.signature && formData.signature.startsWith("data:image")) {
      try {
        const base64Data = formData.signature.split(",")[1]
        const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))
        const signatureImage = await pdfDoc.embedPng(imageBytes)

        const signatureWidth = 200
        const signatureHeight = 60

        page.drawImage(signatureImage, {
          x: 50,
          y: yPosition - signatureHeight,
          width: signatureWidth,
          height: signatureHeight,
        })

        yPosition -= signatureHeight + 10
      } catch (error) {
        console.error("[v0] Error embedding signature image:", error)
        page.drawText(formData.signature || "N/A", {
          x: 50,
          y: yPosition,
          size: 24,
          font: cursiveFont,
          color: brandBlue,
        })
        yPosition -= 30
      }
    } else {
      page.drawText(formData.signature || "N/A", {
        x: 50,
        y: yPosition,
        size: 24,
        font: cursiveFont,
        color: brandBlue,
      })
      yPosition -= 30
    }

    page.drawText("Printed Name:", {
      x: 50,
      y: yPosition,
      size: 9,
      font: helveticaBold,
      color: darkGray,
    })
    yPosition -= 12
    const printedName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim()
    page.drawText(printedName || "N/A", {
      x: 50,
      y: yPosition,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= 20

    page.drawText(`Date: ${formData.signatureDate || new Date().toLocaleDateString()}`, {
      x: 50,
      y: yPosition,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    })

    // Add footer to first page
    page.drawText("TurboFunding.com Application", {
      x: 50,
      y: 30,
      size: 8,
      font: helveticaFont,
      color: darkGray,
    })
    page.drawText("Page 1", {
      x: 550,
      y: 30,
      size: 8,
      font: helveticaFont,
      color: darkGray,
    })

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save()

    console.log("[v0] PDF generated successfully for download")

    // Upload to Vercel Blob
    let blobUrl: string | null = null
    try {
      const businessName = (formData.businessName || formData.legalBusinessName || "application")
        .replace(/[^a-zA-Z0-9]/g, "_")
        .substring(0, 30)
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
      const filename = `applications/${businessName}_${timestamp}.pdf`

      console.log("[v0] Uploading PDF to Vercel Blob...")
      const blob = await put(filename, Buffer.from(pdfBytes), {
        access: "public",
        contentType: "application/pdf",
      })
      blobUrl = blob.url
      console.log("[v0] PDF uploaded to Vercel Blob:", blobUrl)
    } catch (blobError: any) {
      console.error("[v0] Error uploading to Vercel Blob:", blobError.message)
      // Continue without blob upload - still return PDF for download
    }

    return {
      success: true,
      pdfBytes: Array.from(pdfBytes),
      blobUrl,
    }
  } catch (error: any) {
    console.error("[v0] Error generating PDF for download:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}
