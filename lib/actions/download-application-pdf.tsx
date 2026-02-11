"use server"

import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import * as fs from "fs/promises"
import * as path from "path"

export async function downloadApplicationPDF(formData: any) {
  try {
    console.log("[v0] Generating PDF for download...")

    const pdfDoc = await PDFDocument.create()
    pdfDoc.registerFontkit(fontkit)
    
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // Load Space Grotesk for headers from local file
    let headerFont = helveticaBold
    try {
      const fontPath = path.join(process.cwd(), "public", "fonts", "SpaceGrotesk-Bold.ttf")
      const fontBytes = await fs.readFile(fontPath)
      headerFont = await pdfDoc.embedFont(new Uint8Array(fontBytes))
      console.log("[v0] Space Grotesk font loaded successfully from local file")
    } catch (error) {
      console.log("[v0] Could not load Space Grotesk, using Helvetica Bold fallback:", error)
    }

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

    // TurboFunding brand colors
    const brandBlue = rgb(30 / 255, 64 / 255, 175 / 255) // Deep blue for headers
    const brandOrange = rgb(249 / 255, 115 / 255, 22 / 255) // TurboFunding orange accent
    const darkGray = rgb(75 / 255, 85 / 255, 99 / 255)
    const lightGray = rgb(107 / 255, 114 / 255, 128 / 255)
    const black = rgb(0, 0, 0)
    const lineGray = rgb(209 / 255, 213 / 255, 219 / 255)

    const page = pdfDoc.addPage([612, 792]) // Letter size
    const pageWidth = 612
    const margin = 50
    let yPosition = 760

    // ========== HEADER SECTION ==========
    // Logo only on left (larger size, no text)
    const logoHeight = 50
    const logoWidth = 75
    try {
      const logoPath = path.join(process.cwd(), "public", "images", "tf-logo.png")
      const logoBytes = await fs.readFile(logoPath)
      const logoImage = await pdfDoc.embedPng(new Uint8Array(logoBytes))
      page.drawImage(logoImage, {
        x: margin,
        y: yPosition - logoHeight + 10,
        width: logoWidth,
        height: logoHeight,
      })
    } catch (error) {
      console.log("[v0] Could not load logo:", error)
    }

    // Contact info on right - single line like Clarify Capital
    const contactY = yPosition - 15
    
    // Right-align contact info
    const contactText = "help@turbofunding.com    877.838.3919    646.695.6767"
    page.drawText(contactText, {
      x: pageWidth - margin - helveticaFont.widthOfTextAtSize(contactText, 9),
      y: contactY,
      size: 9,
      font: helveticaFont,
      color: darkGray,
    })

    // Draw header line
    yPosition -= 55
    page.drawLine({
      start: { x: margin, y: yPosition },
      end: { x: pageWidth - margin, y: yPosition },
      thickness: 1,
      color: lineGray,
    })

    // ========== LOAN APPLICATION TITLE ==========
    yPosition -= 40
    page.drawText("TurboFunding Loan Application", {
      x: margin,
      y: yPosition,
      size: 24,
      font: headerFont,
      color: black,
    })

    yPosition -= 45

    // ========== TWO COLUMN LAYOUT ==========
    const leftColX = margin
    const columnGap = 40 // Gap between left and right columns
    const rightColX = pageWidth / 2 + columnGap / 2
    const colWidth = (pageWidth - margin * 2 - columnGap) / 2

    // Helper function to draw underlined field
    const drawUnderlinedField = (label: string, value: string, x: number, y: number, width: number) => {
      // Draw the value (or empty if none)
      const displayValue = value || ""
      page.drawText(displayValue, {
        x: x,
        y: y + 5,
        size: 10,
        font: helveticaFont,
        color: black,
      })
      // Draw underline
      page.drawLine({
        start: { x: x, y: y },
        end: { x: x + width, y: y },
        thickness: 0.5,
        color: black,
      })
      // Draw label below
      page.drawText(label.toUpperCase(), {
        x: x,
        y: y - 12,
        size: 7,
        font: helveticaFont,
        color: lightGray,
      })
    }

    // Helper function to draw section header (Space Grotesk style)
    const drawSectionHeader = (title: string, x: number, y: number) => {
      page.drawText(title, {
        x: x,
        y: y,
        size: 14,
        font: headerFont,
        color: brandBlue,
      })
    }

    // Helper function to draw checkbox (Clarify Capital style)
    const drawCheckbox = (label: string, checked: boolean, x: number, y: number) => {
      // Draw checkbox box
      page.drawRectangle({
        x: x,
        y: y - 2,
        width: 12,
        height: 12,
        borderColor: darkGray,
        borderWidth: 0.75,
      })
      // Draw checkmark if checked
      if (checked) {
        page.drawText("X", {
          x: x + 2.5,
          y: y,
          size: 9,
          font: helveticaBold,
          color: black,
        })
      }
      // Draw label
      page.drawText(label, {
        x: x + 16,
        y: y + 1,
        size: 9,
        font: helveticaFont,
        color: darkGray,
      })
    }

    // ========== BUSINESS DETAILS (LEFT COLUMN) ==========
    drawSectionHeader("Business Details", leftColX, yPosition)
    
    // ========== BUSINESS CONTACT INFO (RIGHT COLUMN) ==========
    drawSectionHeader("Business Contact Info", rightColX, yPosition)

    yPosition -= 35

    // Row 1: Legal Business Name | Phone & Mobile
    drawUnderlinedField("Legal Business Name", formData.businessName || formData.legalBusinessName || "", leftColX, yPosition, colWidth)
    
    const phoneHalfWidth = (colWidth - 20) / 2
    drawUnderlinedField("Phone", formData.businessPhone || "", rightColX, yPosition, phoneHalfWidth)
    drawUnderlinedField("Mobile", formData.phone || "", rightColX + phoneHalfWidth + 20, yPosition, phoneHalfWidth)

    yPosition -= 40

    // Row 2: DBA Name | Email
    drawUnderlinedField("DBA Name", formData.dba || formData.dbaName || "", leftColX, yPosition, colWidth)
    drawUnderlinedField("Email", formData.businessEmail || formData.email || "", rightColX, yPosition, colWidth)

    yPosition -= 40

    // Row 3: Federal Tax ID with entity type checkboxes (full width)
    const entityType = (formData.entityType || formData.businessType || "").toLowerCase()
    
    // Federal Tax ID field
    drawUnderlinedField("Federal Tax ID", formData.federalTaxId || "", leftColX, yPosition, 110)
    
    // Entity type checkboxes - same row as Tax ID
    const checkboxStartX = leftColX + 130
    drawCheckbox("LLC", entityType.includes("llc"), checkboxStartX, yPosition + 5)
    drawCheckbox("CORP", entityType.includes("corp"), checkboxStartX + 50, yPosition + 5)
    drawCheckbox("PARTNERSHIP", entityType.includes("partner"), checkboxStartX + 110, yPosition + 5)
    drawCheckbox("SOLE PROP", entityType.includes("sole"), checkboxStartX + 195, yPosition + 5)
    drawCheckbox("NON-PROFIT", entityType.includes("non") || entityType.includes("501"), checkboxStartX + 275, yPosition + 5)

    yPosition -= 40

    // Row 4: Website (new row to avoid overlap)
    drawUnderlinedField("Website", formData.website || "", leftColX, yPosition, colWidth)

    yPosition -= 40

    // Row 5: Business Start Date | Business Address
    drawUnderlinedField("Business Start Date", formData.businessStartDate || "", leftColX, yPosition, colWidth)
    drawUnderlinedField("Business Address", formData.businessAddress || "", rightColX, yPosition, colWidth)

    yPosition -= 40

    // Row 6: Industry & State Incorporated | City, State, ZIP
    const halfWidth = (colWidth - 20) / 2
    drawUnderlinedField("Industry", formData.industry || "", leftColX, yPosition, halfWidth)
    drawUnderlinedField("State Incorporated", formData.stateIncorporated || formData.businessState || "", leftColX + halfWidth + 20, yPosition, halfWidth)
    
    const thirdWidth = (colWidth - 30) / 3
    drawUnderlinedField("City", formData.businessCity || "", rightColX, yPosition, thirdWidth + 30)
    drawUnderlinedField("State", formData.businessState || "", rightColX + thirdWidth + 40, yPosition, 50)
    drawUnderlinedField("ZIP", formData.businessZip || formData.businessZipCode || "", rightColX + thirdWidth + 100, yPosition, 50)

    yPosition -= 60

    // ========== PRIMARY OWNER SECTION ==========
    drawSectionHeader("Primary Owner", leftColX, yPosition)

    yPosition -= 35

    // Row 1: First Name | Last Name
    drawUnderlinedField("First Name", formData.firstName || "", leftColX, yPosition, halfWidth + 30)
    drawUnderlinedField("Last Name", formData.lastName || "", leftColX + halfWidth + 50, yPosition, halfWidth + 30)

    yPosition -= 40

    // Row 2: Phone | Email
    drawUnderlinedField("Phone", formData.phone || "", leftColX, yPosition, halfWidth + 30)
    drawUnderlinedField("Email", formData.email || "", leftColX + halfWidth + 50, yPosition, halfWidth + 30)

    yPosition -= 40

    // Row 3: DOB | SSN | % Ownership
    const thirdWidthFull = (pageWidth - margin * 2 - 40) / 3
    drawUnderlinedField("Date of Birth", formData.dateOfBirth || "", leftColX, yPosition, thirdWidthFull)
    // Mask SSN for security
    const maskedSSN = formData.ssn ? "XXX-XX-" + formData.ssn.slice(-4) : ""
    drawUnderlinedField("SSN", maskedSSN, leftColX + thirdWidthFull + 20, yPosition, thirdWidthFull)
    drawUnderlinedField("% Ownership", (formData.ownershipPercentage || formData.percentageOwnership || "") + "%", leftColX + thirdWidthFull * 2 + 40, yPosition, thirdWidthFull - 40)

    yPosition -= 40

    // Row 4: Home Address
    drawUnderlinedField("Home Address", formData.homeAddress || "", leftColX, yPosition, pageWidth - margin * 2)

    yPosition -= 40

    // Row 5: City | State | ZIP
    drawUnderlinedField("City", formData.city || "", leftColX, yPosition, 200)
    drawUnderlinedField("State", formData.state || "", leftColX + 220, yPosition, 120)
    drawUnderlinedField("ZIP", formData.zip || formData.zipCode || "", leftColX + 360, yPosition, 100)

    yPosition -= 50

    // ========== SIGNATURE SECTION ==========
    // Draw signature image or text
    const signatureDataUrl = formData.signatureImage || formData.signature
    if (signatureDataUrl && typeof signatureDataUrl === 'string' && signatureDataUrl.startsWith("data:image")) {
      try {
        const base64Data = signatureDataUrl.split(",")[1]
        const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))
        const signatureImage = await pdfDoc.embedPng(imageBytes)
        
        page.drawImage(signatureImage, {
          x: leftColX,
          y: yPosition - 40,
          width: 180,
          height: 50,
        })
      } catch (error) {
        console.error("[v0] Error embedding signature image:", error)
        page.drawText(formData.signature || "", {
          x: leftColX,
          y: yPosition - 20,
          size: 20,
          font: cursiveFont,
          color: brandBlue,
        })
      }
    } else if (formData.signature) {
      page.drawText(formData.signature, {
        x: leftColX,
        y: yPosition - 20,
        size: 20,
        font: cursiveFont,
        color: brandBlue,
      })
    }

    // Signature line
    page.drawLine({
      start: { x: leftColX, y: yPosition - 45 },
      end: { x: leftColX + 200, y: yPosition - 45 },
      thickness: 0.5,
      color: black,
    })
    page.drawText("SIGNATURE", {
      x: leftColX,
      y: yPosition - 57,
      size: 7,
      font: helveticaFont,
      color: darkGray,
    })

    // Date field
    page.drawText(formData.signatureDate || new Date().toLocaleDateString(), {
      x: leftColX + 250,
      y: yPosition - 40,
      size: 10,
      font: helveticaFont,
      color: black,
    })
    page.drawLine({
      start: { x: leftColX + 250, y: yPosition - 45 },
      end: { x: leftColX + 400, y: yPosition - 45 },
      thickness: 0.5,
      color: black,
    })
    page.drawText("DATE", {
      x: leftColX + 250,
      y: yPosition - 57,
      size: 7,
      font: helveticaFont,
      color: darkGray,
    })

    yPosition -= 80

    // ========== LEGAL DISCLAIMER ==========
    const disclaimer = `By signing above, each of the above listed business and business owners/officers/members (individually and collectively, "you") authorize TurboFunding LLC ("TF") and each of its representatives, successors, assignees, affiliates and designees (collectively "Recipients") that may be involved with the acquiring of commercial loans and/or other products that have daily repayment features for the purchase of future receivables, including Merchant Cash Advance transactions, including without limitation the application therefore (collectively, "Transactions") to obtain consumer or personal business and investigative reports and other information about you, including without limitation credit card processor statements and bank statements, from one or more consumer reporting agencies, such as TransUnion, Experian and Equifax, and from other credit bureaus, banks, creditors and other third parties. You also authorize TF to transmit this application form, along with any of the foregoing information obtained in connection with this application, to any or all of the Recipients for the foregoing purposes; however TF shall not disclose information in your credit report to third parties. You also consent to the release, by any credit or financial institution, of any information relating to you, to TF and to each of the Recipients, on its own behalf.`
    
    const disclaimerLines = wrapText(disclaimer, helveticaFont, 7, pageWidth - margin * 2)
    for (const line of disclaimerLines) {
      if (yPosition < 60) break
      page.drawText(line, {
        x: leftColX,
        y: yPosition,
        size: 7,
        font: helveticaFont,
        color: darkGray,
      })
      yPosition -= 9
    }

    yPosition -= 15

    // ========== ADVISOR FIELD ==========
    page.drawText("TurboFunding Advisor:", {
      x: leftColX,
      y: yPosition,
      size: 9,
      font: helveticaBold,
      color: black,
    })

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save()

    console.log("[v0] PDF generated successfully for download")

    return {
      success: true,
      pdfBytes: Array.from(pdfBytes),
      blobUrl: null,
    }
  } catch (error: any) {
    console.error("[v0] Error generating PDF for download:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Helper function to wrap text
function wrapText(text: string, font: any, fontSize: number, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const width = font.widthOfTextAtSize(testLine, fontSize)
    
    if (width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  
  if (currentLine) {
    lines.push(currentLine)
  }
  
  return lines
}
