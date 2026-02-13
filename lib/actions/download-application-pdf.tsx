"use server"

import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import * as fs from "fs/promises"
import * as path from "path"

export async function downloadApplicationPDF(formData: any) {
  try {
    console.log("[PDF] Generating PDF for download...")

    const pdfDoc = await PDFDocument.create()
    pdfDoc.registerFontkit(fontkit)
    
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // Use standard fonts only - no custom fonts to avoid buffer issues
    const headerFont = helveticaBold
    const cursiveFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)

    console.log("[PDF] Using standard fonts only (Helvetica, HelveticaBold, HelveticaOblique)")

    // TurboFunding brand colors
    const brandBlue = rgb(30 / 255, 64 / 255, 175 / 255) // Deep blue for headers
    const brandOrange = rgb(249 / 255, 115 / 255, 22 / 255) // TurboFunding orange accent
    const darkGray = rgb(75 / 255, 85 / 255, 99 / 255)
    const lightGray = rgb(107 / 255, 114 / 255, 128 / 255)
    const black = rgb(0, 0, 0)
    const lineGray = rgb(209 / 255, 213 / 255, 219 / 255)
    const accentOrange = rgb(251 / 255, 146 / 255, 60 / 255) // Lighter orange for accents

    const page = pdfDoc.addPage([612, 792]) // Letter size
    const pageWidth = 612
    const margin = 50
    let yPosition = 760

    // ========== TOP ACCENT BAR ==========
    page.drawRectangle({
      x: 0,
      y: 792 - 4,
      width: pageWidth,
      height: 4,
      color: brandBlue,
    })

    // ========== HEADER SECTION ==========
    // Logo only on left (larger size, no text)
    const logoHeight = 50
    const logoWidth = 75
    try {
      const logoPath = path.join(process.cwd(), "public", "images", "tf-logo.png")
      console.log("[PDF] Attempting to load logo from:", logoPath)
      
      const logoBuffer = await fs.readFile(logoPath)
      console.log("[PDF] Logo file read, size:", logoBuffer.length, "bytes")
      
      if (logoBuffer.length === 0) {
        throw new Error("Logo file is empty")
      }
      
      // Properly convert Buffer to Uint8Array
      const logoUint8Array = new Uint8Array(logoBuffer.buffer, logoBuffer.byteOffset, logoBuffer.length)
      const logoImage = await pdfDoc.embedPng(logoUint8Array)
      page.drawImage(logoImage, {
        x: margin,
        y: yPosition - logoHeight + 10,
        width: logoWidth,
        height: logoHeight,
      })
      console.log("[PDF] Logo embedded successfully")
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error)
      console.warn("[PDF] Logo load failed:", errorMsg)
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
    yPosition -= 35
    page.drawLine({
      start: { x: margin, y: yPosition },
      end: { x: pageWidth - margin, y: yPosition },
      thickness: 0.75,
      color: lineGray,
    })

    // ========== LOAN APPLICATION TITLE ==========
    yPosition -= 30
    page.drawText("TurboFunding Loan Application", {
      x: margin,
      y: yPosition,
      size: 16,
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
        color: lineGray,
      })
      // Draw label below
      page.drawText(label.toUpperCase(), {
        x: x,
        y: y - 12,
        size: 6,
        font: helveticaFont,
        color: lightGray,
      })
    }

    // Helper function to draw section header with accent
    const drawSectionHeader = (title: string, x: number, y: number) => {
      page.drawText(title, {
        x: x,
        y: y,
        size: 12,
        font: headerFont,
        color: brandBlue,
      })
      // Small accent line under header
      page.drawLine({
        start: { x: x, y: y - 4 },
        end: { x: x + 60, y: y - 4 },
        thickness: 1.5,
        color: accentOrange,
      })
    }

    // Helper function to draw modern checkbox
    const drawCheckbox = (label: string, checked: boolean, x: number, y: number) => {
      if (checked) {
        // Filled checkbox for checked state
        page.drawRectangle({
          x: x,
          y: y - 2,
          width: 11,
          height: 11,
          color: brandBlue,
        })
        // Draw checkmark with lines
        const white = rgb(1, 1, 1)
        page.drawLine({
          start: { x: x + 2, y: y + 3 },
          end: { x: x + 4.5, y: y },
          thickness: 1.5,
          color: white,
        })
        page.drawLine({
          start: { x: x + 4.5, y: y },
          end: { x: x + 9, y: y + 7 },
          thickness: 1.5,
          color: white,
        })
      } else {
        // Empty checkbox
        page.drawRectangle({
          x: x,
          y: y - 2,
          width: 11,
          height: 11,
          borderColor: lineGray,
          borderWidth: 1,
        })
      }
      // Draw label
      page.drawText(label, {
        x: x + 15,
        y: y + 1,
        size: 8,
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

    yPosition -= 35

    // Row 2: DBA Name | Email
    drawUnderlinedField("DBA Name", formData.dba || formData.dbaName || "", leftColX, yPosition, colWidth)
    drawUnderlinedField("Email", formData.businessEmail || formData.email || "", rightColX, yPosition, colWidth)

    yPosition -= 35

    // Row 3: Federal Tax ID (left) | Entity type checkboxes (right - 3 rows)
    const entityType = (formData.entityType || formData.businessType || "").toLowerCase()
    
    drawUnderlinedField("Federal Tax ID", formData.federalTaxId || "", leftColX, yPosition, colWidth)
    
    // Entity type checkboxes - right column, arranged in grid like Clarify Capital
    drawCheckbox("LLC", entityType.includes("llc"), rightColX, yPosition + 5)
    drawCheckbox("CORPORATION", entityType.includes("corp"), rightColX + 70, yPosition + 5)
    
    yPosition -= 22
    drawCheckbox("PARTNERSHIP", entityType.includes("partner"), rightColX, yPosition + 5)
    drawCheckbox("SOLE PROP", entityType.includes("sole"), rightColX + 100, yPosition + 5)
    
    yPosition -= 22
    drawCheckbox("NON-PROFIT", entityType.includes("non") || entityType.includes("501"), rightColX, yPosition + 5)

    yPosition -= 28

    // Row 4: Business Start Date | Website
    drawUnderlinedField("Business Start Date", formData.businessStartDate || "", leftColX, yPosition, colWidth)
    drawUnderlinedField("Website", formData.website || "", rightColX, yPosition, colWidth)

    yPosition -= 35

    // Row 5: Industry & State Inc | Business Address
    const halfWidth = (colWidth - 20) / 2
    drawUnderlinedField("Industry", formData.industry || "", leftColX, yPosition, halfWidth)
    drawUnderlinedField("State Incorporated", formData.stateIncorporated || formData.businessState || "", leftColX + halfWidth + 20, yPosition, halfWidth)
    drawUnderlinedField("Business Address", formData.businessAddress || "", rightColX, yPosition, colWidth)

    yPosition -= 35

    // Row 6: City, State, ZIP (right column only)
    const thirdWidth = (colWidth - 30) / 3
    drawUnderlinedField("City", formData.businessCity || "", rightColX, yPosition, thirdWidth + 30)
    drawUnderlinedField("State", formData.businessState || "", rightColX + thirdWidth + 40, yPosition, 50)
    drawUnderlinedField("ZIP", formData.businessZip || formData.businessZipCode || "", rightColX + thirdWidth + 100, yPosition, 50)

    yPosition -= 40

    // ========== PRIMARY OWNER SECTION ==========
    drawSectionHeader("Primary Owner", leftColX, yPosition)

    yPosition -= 30

    // Row 1: First Name | Last Name
    drawUnderlinedField("First Name", formData.firstName || "", leftColX, yPosition, halfWidth + 30)
    drawUnderlinedField("Last Name", formData.lastName || "", leftColX + halfWidth + 50, yPosition, halfWidth + 30)

    yPosition -= 30

    // Row 2: Phone | Email
    drawUnderlinedField("Phone", formData.phone || "", leftColX, yPosition, halfWidth + 30)
    drawUnderlinedField("Email", formData.email || "", leftColX + halfWidth + 50, yPosition, halfWidth + 30)

    yPosition -= 30

    // Row 3: DOB | SSN | % Ownership
    const thirdWidthFull = (pageWidth - margin * 2 - 40) / 3
    drawUnderlinedField("Date of Birth", formData.dateOfBirth || "", leftColX, yPosition, thirdWidthFull)
    // Mask SSN for security
    const maskedSSN = formData.ssn ? "XXX-XX-" + formData.ssn.slice(-4) : ""
    drawUnderlinedField("SSN", maskedSSN, leftColX + thirdWidthFull + 20, yPosition, thirdWidthFull)
    drawUnderlinedField("% Ownership", (formData.ownershipPercentage || formData.percentageOwnership || "") + "%", leftColX + thirdWidthFull * 2 + 40, yPosition, thirdWidthFull - 40)

    yPosition -= 30

    // Row 4: Home Address
    drawUnderlinedField("Home Address", formData.homeAddress || "", leftColX, yPosition, pageWidth - margin * 2)

    yPosition -= 30

    // Row 5: City | State | ZIP
    drawUnderlinedField("City", formData.city || "", leftColX, yPosition, 200)
    drawUnderlinedField("State", formData.state || "", leftColX + 220, yPosition, 120)
    drawUnderlinedField("ZIP", formData.zip || formData.zipCode || "", leftColX + 360, yPosition, 100)

    yPosition -= 35

    // ========== SIGNATURE SECTION ==========
    // Draw signature image or text
    const signatureDataUrl = formData.signatureImage || formData.signature
    if (signatureDataUrl && typeof signatureDataUrl === 'string' && signatureDataUrl.startsWith("data:image")) {
      try {
        console.log("[PDF] Processing signature image...")
        const base64Data = signatureDataUrl.split(",")[1]
        
        if (!base64Data) {
          throw new Error("Invalid data URL format: No base64 data found")
        }
        
        const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))
        console.log("[PDF] Decoded signature image, size:", imageBytes.length, "bytes")
        
        if (imageBytes.length === 0) {
          throw new Error("Signature image data is empty")
        }
        
        const signatureImage = await pdfDoc.embedPng(imageBytes)
        
        page.drawImage(signatureImage, {
          x: leftColX,
          y: yPosition - 40,
          width: 180,
          height: 50,
        })
        console.log("[PDF] Signature image embedded successfully")
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error)
        console.warn("[PDF] Error embedding signature image:", errorMsg)
        // Fall back to text signature
        page.drawText(formData.signature || "Signature", {
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
      thickness: 0.75,
      color: lineGray,
    })
    page.drawText("SIGNATURE", {
      x: leftColX,
      y: yPosition - 57,
      size: 6,
      font: helveticaFont,
      color: lightGray,
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
      thickness: 0.75,
      color: lineGray,
    })
    page.drawText("DATE", {
      x: leftColX + 250,
      y: yPosition - 57,
      size: 6,
      font: helveticaFont,
      color: lightGray,
    })

    yPosition -= 70

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
    page.drawLine({
      start: { x: margin, y: yPosition + 8 },
      end: { x: pageWidth - margin, y: yPosition + 8 },
      thickness: 0.5,
      color: lineGray,
    })
    
    page.drawText("TurboFunding Advisor:", {
      x: leftColX,
      y: yPosition - 5,
      size: 9,
      font: helveticaBold,
      color: brandBlue,
    })
    
    page.drawLine({
      start: { x: leftColX + 110, y: yPosition - 8 },
      end: { x: leftColX + 280, y: yPosition - 8 },
      thickness: 0.5,
      color: lineGray,
    })

    // ========== ELECTRONIC SIGNATURE CERTIFICATE (DocuSign-style) ==========
    const cert = formData.signingCertificate
    if (cert) {
      // Check if we have enough space on the current page, otherwise add a new page
      const certHeight = 120 // approximate height needed for certificate
      let certPage = page
      let certY = yPosition - 30

      if (certY - certHeight < 30) {
        // Add a new page for the certificate
        certPage = pdfDoc.addPage([612, 792])
        certY = 750

        // Top accent bar on new page
        certPage.drawRectangle({
          x: 0,
          y: 792 - 4,
          width: pageWidth,
          height: 4,
          color: brandBlue,
        })

        // Footer accent bar on new page
        certPage.drawRectangle({
          x: 0,
          y: 0,
          width: pageWidth,
          height: 4,
          color: brandBlue,
        })
      }

      // Certificate container - full width box
      const certBoxX = margin
      const certBoxWidth = pageWidth - margin * 2
      const certBoxY = certY - certHeight
      const certBoxHeight = certHeight

      // Certificate background
      certPage.drawRectangle({
        x: certBoxX,
        y: certBoxY,
        width: certBoxWidth,
        height: certBoxHeight,
        color: rgb(248 / 255, 250 / 255, 252 / 255), // Very light gray-blue
        borderColor: rgb(203 / 255, 213 / 255, 225 / 255),
        borderWidth: 0.75,
      })

      // Certificate header bar
      certPage.drawRectangle({
        x: certBoxX,
        y: certBoxY + certBoxHeight - 22,
        width: certBoxWidth,
        height: 22,
        color: brandBlue,
      })

      // Lock icon text and title
      certPage.drawText("ELECTRONIC SIGNATURE CERTIFICATE", {
        x: certBoxX + 12,
        y: certBoxY + certBoxHeight - 16,
        size: 8,
        font: helveticaBold,
        color: rgb(1, 1, 1),
      })

      // Certificate ID on right side of header
      const certIdText = `ID: ${cert.signingId || "N/A"}`
      const certIdWidth = helveticaFont.widthOfTextAtSize(certIdText, 7)
      certPage.drawText(certIdText, {
        x: certBoxX + certBoxWidth - certIdWidth - 12,
        y: certBoxY + certBoxHeight - 15,
        size: 7,
        font: helveticaFont,
        color: rgb(200 / 255, 220 / 255, 255 / 255),
      })

      // Certificate content
      const certContentX = certBoxX + 15
      let certContentY = certBoxY + certBoxHeight - 40

      // Row 1: Signer Name and Signing Status
      const signerFullName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim() || "N/A"
      certPage.drawText("Signer:", {
        x: certContentX,
        y: certContentY,
        size: 7,
        font: helveticaBold,
        color: darkGray,
      })
      certPage.drawText(signerFullName, {
        x: certContentX + 40,
        y: certContentY,
        size: 7,
        font: helveticaFont,
        color: black,
      })

      certPage.drawText("Status:", {
        x: certContentX + 250,
        y: certContentY,
        size: 7,
        font: helveticaBold,
        color: darkGray,
      })
      certPage.drawText("COMPLETED", {
        x: certContentX + 290,
        y: certContentY,
        size: 7,
        font: helveticaBold,
        color: rgb(22 / 255, 163 / 255, 74 / 255), // Green
      })

      certContentY -= 14

      // Row 2: Email
      certPage.drawText("Email:", {
        x: certContentX,
        y: certContentY,
        size: 7,
        font: helveticaBold,
        color: darkGray,
      })
      certPage.drawText(formData.email || "N/A", {
        x: certContentX + 40,
        y: certContentY,
        size: 7,
        font: helveticaFont,
        color: black,
      })

      certContentY -= 14

      // Row 3: IP Address and User Agent
      certPage.drawText("IP Address:", {
        x: certContentX,
        y: certContentY,
        size: 7,
        font: helveticaBold,
        color: darkGray,
      })
      certPage.drawText(cert.ipAddress || "Unavailable", {
        x: certContentX + 55,
        y: certContentY,
        size: 7,
        font: helveticaFont,
        color: black,
      })

      certContentY -= 14

      // Row 4: Signed Date/Time
      const signedDate = cert.signedAt ? new Date(cert.signedAt) : new Date()
      const formattedDate = signedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      const formattedTime = signedDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      })

      certPage.drawText("Signed:", {
        x: certContentX,
        y: certContentY,
        size: 7,
        font: helveticaBold,
        color: darkGray,
      })
      certPage.drawText(`${formattedDate} at ${formattedTime}`, {
        x: certContentX + 40,
        y: certContentY,
        size: 7,
        font: helveticaFont,
        color: black,
      })

      certContentY -= 14

      // Row 5: Browser / User Agent (truncated)
      const userAgentDisplay = cert.userAgent
        ? cert.userAgent.length > 90
          ? cert.userAgent.substring(0, 90) + "..."
          : cert.userAgent
        : "Unknown"

      certPage.drawText("Browser:", {
        x: certContentX,
        y: certContentY,
        size: 7,
        font: helveticaBold,
        color: darkGray,
      })
      certPage.drawText(userAgentDisplay, {
        x: certContentX + 45,
        y: certContentY,
        size: 6,
        font: helveticaFont,
        color: lightGray,
      })

      certContentY -= 16

      // Disclaimer
      certPage.drawText(
        "This electronic signature is legally binding under the ESIGN Act (15 U.S.C. §7001) and UETA. This certificate verifies the identity and intent of the signer.",
        {
          x: certContentX,
          y: certContentY,
          size: 6,
          font: helveticaFont,
          color: lightGray,
        }
      )
    }

    // ========== FOOTER ACCENT BAR ==========
    page.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: 4,
      color: brandBlue,
    })

    // Serialize the PDF to bytes
    console.log("[PDF] Serializing PDF document...")
    const pdfBytes = await pdfDoc.save()
    console.log("[PDF] PDF serialized successfully, size:", pdfBytes.length, "bytes")

    if (pdfBytes.length === 0) {
      throw new Error("PDF serialization resulted in empty document")
    }

    console.log("[PDF] PDF generated successfully")

    return {
      success: true,
      pdfBytes: Array.from(pdfBytes),
      blobUrl: null,
    }
  } catch (error: any) {
    console.error("[PDF] ❌ Error generating PDF:")
    console.error("[PDF] Error type:", error.constructor.name)
    console.error("[PDF] Error message:", error.message)
    console.error("[PDF] Error stack:", error.stack)
    
    // Provide more specific error messages
    let userMessage = error.message
    
    if (error.message?.includes("buffer")) {
      userMessage = "Buffer error during PDF generation. This usually means a font file is corrupted. Try clearing browser cache and resubmitting."
    } else if (error.message?.includes("font")) {
      userMessage = "Font embedding error. The PDF will be generated with fallback fonts."
    } else if (error.message?.includes("image")) {
      userMessage = "Image embedding error. The PDF will be generated without images."
    } else if (error.message?.includes("timeout")) {
      userMessage = "PDF generation timed out. Please try again."
    }
    
    return {
      success: false,
      error: userMessage,
      pdfBytes: null,
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
