"use server"

import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

export async function downloadApplicationPDF(formData: any) {
  try {
    console.log("[PDF] Generating simplified PDF for download...")

    const pdfDoc = await PDFDocument.create()
    
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const brandBlue = rgb(30 / 255, 64 / 255, 175 / 255)
    const darkGray = rgb(75 / 255, 85 / 255, 99 / 255)
    const lightGray = rgb(107 / 255, 114 / 255, 128 / 255)
    const black = rgb(0, 0, 0)

    let page = pdfDoc.addPage([612, 792])
    const pageWidth = 612
    const margin = 50
    let yPosition = 750

    // Header
    page.drawText("TurboFunding Loan Application", {
      x: margin,
      y: yPosition,
      size: 16,
      font: helveticaBold,
      color: brandBlue,
    })
    yPosition -= 40

    // Funding Information Section
    page.drawText("FUNDING INFORMATION", {
      x: margin,
      y: yPosition,
      size: 12,
      font: helveticaBold,
      color: brandBlue,
    })
    yPosition -= 25

    // Amount Requested
    page.drawText("Amount Requested: $" + (formData.amountRequested || ""), {
      x: margin,
      y: yPosition,
      size: 10,
      font: helveticaFont,
      color: black,
    })
    yPosition -= 20

    // Use of Funds
    page.drawText("Use of Funds:", {
      x: margin,
      y: yPosition,
      size: 10,
      font: helveticaBold,
      color: black,
    })
    yPosition -= 15

    const useOfFundsLines = wrapText(formData.useOfFunds || "", helveticaFont, 10, pageWidth - margin * 2)
    for (const line of useOfFundsLines) {
      if (yPosition < 100) {
        page = pdfDoc.addPage([612, 792])
        yPosition = 750
      }
      page.drawText(line, {
        x: margin + 20,
        y: yPosition,
        size: 9,
        font: helveticaFont,
        color: darkGray,
      })
      yPosition -= 15
    }

    yPosition -= 20

    // Business Information Section
    page.drawText("BUSINESS INFORMATION", {
      x: margin,
      y: yPosition,
      size: 12,
      font: helveticaBold,
      color: brandBlue,
    })
    yPosition -= 25

    const businessFields = [
      ["Business Name", formData.businessName || formData.legalBusinessName || ""],
      ["Business Type", formData.businessType || ""],
      ["Industry", formData.industry || ""],
      ["State", formData.businessState || ""],
      ["Years in Business", formData.yearsInBusiness || ""],
      ["Annual Revenue", "$" + (formData.annualRevenue || "")],
    ]

    for (const [label, value] of businessFields) {
      if (yPosition < 150) {
        page = pdfDoc.addPage([612, 792])
        yPosition = 750
      }
      page.drawText(label + ": " + value, {
        x: margin,
        y: yPosition,
        size: 10,
        font: helveticaFont,
        color: black,
      })
      yPosition -= 18
    }

    yPosition -= 15

    // Ownership Information Section
    page.drawText("OWNERSHIP INFORMATION", {
      x: margin,
      y: yPosition,
      size: 12,
      font: helveticaBold,
      color: brandBlue,
    })
    yPosition -= 25

    if (formData.firstName || formData.lastName) {
      page.drawText("Primary Owner: " + (formData.firstName || "") + " " + (formData.lastName || ""), {
        x: margin,
        y: yPosition,
        size: 10,
        font: helveticaFont,
        color: black,
      })
      yPosition -= 15
      page.drawText("Email: " + (formData.email || ""), {
        x: margin + 20,
        y: yPosition,
        size: 9,
        font: helveticaFont,
        color: darkGray,
      })
      yPosition -= 15
    }

    if (formData.secondOwnerFirstName) {
      page.drawText("Secondary Owner: " + (formData.secondOwnerFirstName || "") + " " + (formData.secondOwnerLastName || ""), {
        x: margin,
        y: yPosition,
        size: 10,
        font: helveticaFont,
        color: black,
      })
      yPosition -= 15
    }

    // Footer
    yPosition = 30
    page.drawText("Application submitted on " + new Date().toLocaleString(), {
      x: margin,
      y: yPosition,
      size: 8,
      font: helveticaFont,
      color: lightGray,
    })

    // Serialize the PDF to bytes
    console.log("[PDF] Serializing PDF document...")
    let pdfBytes: Uint8Array
    try {
      pdfBytes = await pdfDoc.save()
    } catch (saveError) {
      console.error("[PDF] PDFDocument.save() failed:", saveError)
      throw new Error("Failed to serialize PDF: " + (saveError instanceof Error ? saveError.message : String(saveError)))
    }
    
    console.log("[PDF] PDF serialized successfully, size:", pdfBytes.length, "bytes")

    if (pdfBytes.length === 0) {
      throw new Error("PDF serialization resulted in empty document")
    }

    // Convert to base64 for safe serialization through server action boundary
    const binaryString = String.fromCharCode.apply(null, Array.from(pdfBytes) as any)
    const base64String = Buffer.from(binaryString, 'binary').toString('base64')
    console.log("[PDF] Converted to base64, size:", base64String.length, "bytes")

    return {
      success: true,
      pdfBase64: base64String,
      blobUrl: null,
    }
  } catch (error: any) {
    console.error("[PDF] ❌ Error generating PDF:")
    console.error("[PDF] Error type:", error.constructor.name)
    console.error("[PDF] Error message:", error.message)
    console.error("[PDF] Error stack:", error.stack?.substring(0, 500))
    
    let userMessage = error.message
    
    if (error.message?.includes("stack")) {
      userMessage = "PDF generation encountered a complexity issue. Please try again or contact support."
    }

    return {
      success: false,
      error: userMessage,
      pdfBase64: null,
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
