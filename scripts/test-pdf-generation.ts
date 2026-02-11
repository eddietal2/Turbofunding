/**
 * PDF Generation Test Script
 * 
 * Run with: npx tsx scripts/test-pdf-generation.ts
 * 
 * This generates a sample PDF with test data and saves it locally for quick review.
 */

import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import * as fs from "fs"
import * as path from "path"

// Sample form data for testing
const sampleFormData = {
  // Business Info
  businessName: "Acme Industries LLC",
  legalBusinessName: "Acme Industries LLC", 
  dba: "Acme Solutions",
  dbaName: "Acme Solutions",
  federalTaxId: "12-3456789",
  entityType: "LLC",
  businessType: "LLC",
  businessStartDate: "01/15/2018",
  industry: "Technology",
  stateIncorporated: "California",
  
  // Business Contact
  businessPhone: "(555) 123-4567",
  businessEmail: "contact@acmeindustries.com",
  businessAddress: "123 Main Street, Suite 400",
  businessCity: "Los Angeles",
  businessState: "CA",
  businessZip: "90001",
  businessZipCode: "90001",
  
  // Primary Owner
  firstName: "John",
  lastName: "Smith",
  phone: "(555) 987-6543",
  email: "john.smith@email.com",
  dateOfBirth: "03/15/1985",
  ssn: "123-45-6789",
  ownershipPercentage: "75",
  percentageOwnership: "75",
  homeAddress: "456 Oak Avenue",
  city: "Santa Monica",
  state: "CA",
  zip: "90401",
  zipCode: "90401",
  
  // Signature
  signature: "John Smith",
  signatureDate: new Date().toLocaleDateString(),
}

async function generateTestPDF() {
  console.log("🚀 Starting PDF generation test...")
  
  const pdfDoc = await PDFDocument.create()
  pdfDoc.registerFontkit(fontkit)
  
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const cursiveFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique) // Fallback for signature

  // Load Space Grotesk for headers from local file
  let headerFont = helveticaBold
  try {
    const fontPath = path.join(__dirname, "..", "public", "fonts", "SpaceGrotesk-Bold.ttf")
    const fontBytes = fs.readFileSync(fontPath)
    headerFont = await pdfDoc.embedFont(new Uint8Array(fontBytes))
    console.log("✓ Space Grotesk font loaded from local file")
  } catch (error) {
    console.log("Could not load Space Grotesk, using Helvetica Bold fallback")
  }

  // TurboFunding brand colors
  const brandBlue = rgb(30 / 255, 64 / 255, 175 / 255)
  const brandOrange = rgb(249 / 255, 115 / 255, 22 / 255)
  const darkGray = rgb(75 / 255, 85 / 255, 99 / 255)
  const lightGray = rgb(107 / 255, 114 / 255, 128 / 255)
  const black = rgb(0, 0, 0)
  const lineGray = rgb(209 / 255, 213 / 255, 219 / 255)

  const page = pdfDoc.addPage([612, 792]) // Letter size
  const pageWidth = 612
  const margin = 50
  let yPosition = 760

  // ========== HEADER SECTION ==========
  // Logo only (larger, no text)
  const logoHeight = 100
  const logoWidth = 150
  try {
    const logoPath = path.join(__dirname, "..", "public", "images", "tf-logo.png")
    const logoBytes = fs.readFileSync(logoPath)
    const logoImage = await pdfDoc.embedPng(new Uint8Array(logoBytes))
    page.drawImage(logoImage, {
      x: margin - 20,
      y: yPosition - logoHeight + 30,
      width: logoWidth,
      height: logoHeight,
    })
  } catch (error) {
    console.log("Could not load logo:", error)
  }

  // Contact info on right - single line like Clarify Capital
  const contactY = yPosition - 15
  const contactText = "help@turbofunding.com    877.838.3919    646.695.6767"
  page.drawText(contactText, {
    x: pageWidth - margin - helveticaFont.widthOfTextAtSize(contactText, 9),
    y: contactY,
    size: 9,
    font: helveticaFont,
    color: darkGray,
  })

  // Header line
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
    size: 14,
    font: headerFont,
    color: black,
  })

  yPosition -= 45

  // ========== TWO COLUMN LAYOUT ==========
  const leftColX = margin
  const rightColX = pageWidth / 2 + 10
  const colWidth = (pageWidth - margin * 2 - 20) / 2

  // Helper function to draw underlined field
  const drawUnderlinedField = (label: string, value: string, x: number, y: number, width: number) => {
    const displayValue = value || ""
    page.drawText(displayValue, {
      x: x,
      y: y + 5,
      size: 10,
      font: helveticaFont,
      color: black,
    })
    page.drawLine({
      start: { x: x, y: y },
      end: { x: x + width, y: y },
      thickness: 0.5,
      color: black,
    })
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
    page.drawRectangle({
      x: x,
      y: y - 2,
      width: 12,
      height: 12,
      borderColor: darkGray,
      borderWidth: 0.75,
    })
    if (checked) {
      page.drawText("X", {
        x: x + 2.5,
        y: y,
        size: 9,
        font: helveticaBold,
        color: black,
      })
    }
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
  drawUnderlinedField("Legal Business Name", sampleFormData.businessName, leftColX, yPosition, colWidth)
  
  const phoneHalfWidth = (colWidth - 20) / 2
  drawUnderlinedField("Phone", sampleFormData.businessPhone, rightColX, yPosition, phoneHalfWidth)
  drawUnderlinedField("Mobile", sampleFormData.phone, rightColX + phoneHalfWidth + 20, yPosition, phoneHalfWidth)

  yPosition -= 40

  // Row 2: DBA Name | Email
  drawUnderlinedField("DBA Name", sampleFormData.dba, leftColX, yPosition, colWidth)
  drawUnderlinedField("Email", sampleFormData.businessEmail, rightColX, yPosition, colWidth)

  yPosition -= 40

  // Row 3: Federal Tax ID with entity type checkboxes (full width)
  const entityType = sampleFormData.entityType.toLowerCase()
  
  drawUnderlinedField("Federal Tax ID", sampleFormData.federalTaxId, leftColX, yPosition, 110)
  
  // Entity type checkboxes - same row as Tax ID
  const checkboxStartX = leftColX + 130
  drawCheckbox("LLC", entityType.includes("llc"), checkboxStartX, yPosition + 5)
  drawCheckbox("CORP", entityType.includes("corp"), checkboxStartX + 50, yPosition + 5)
  drawCheckbox("PARTNERSHIP", entityType.includes("partner"), checkboxStartX + 110, yPosition + 5)
  drawCheckbox("SOLE PROP", entityType.includes("sole"), checkboxStartX + 195, yPosition + 5)
  drawCheckbox("NON-PROFIT", entityType.includes("non"), checkboxStartX + 275, yPosition + 5)

  yPosition -= 40

  // Row 4: Website (new row to avoid overlap)
  drawUnderlinedField("Website", "www.acmeindustries.com", leftColX, yPosition, colWidth)

  yPosition -= 40

  // Row 5: Business Start Date | Business Address
  drawUnderlinedField("Business Start Date", sampleFormData.businessStartDate, leftColX, yPosition, colWidth)
  drawUnderlinedField("Business Address", sampleFormData.businessAddress, rightColX, yPosition, colWidth)

  yPosition -= 40

  // Row 6: Industry & State Inc | City, State, ZIP
  const halfWidth = (colWidth - 20) / 2
  drawUnderlinedField("Industry", sampleFormData.industry, leftColX, yPosition, halfWidth)
  drawUnderlinedField("State Incorporated", sampleFormData.stateIncorporated, leftColX + halfWidth + 20, yPosition, halfWidth)
  
  const thirdWidth = (colWidth - 30) / 3
  drawUnderlinedField("City", sampleFormData.businessCity, rightColX, yPosition, thirdWidth + 30)
  drawUnderlinedField("State", sampleFormData.businessState, rightColX + thirdWidth + 40, yPosition, 50)
  drawUnderlinedField("ZIP", sampleFormData.businessZip, rightColX + thirdWidth + 100, yPosition, 50)

  yPosition -= 50

  // ========== PRIMARY OWNER SECTION ==========
  drawSectionHeader("Primary Owner", leftColX, yPosition)

  yPosition -= 35

  // Owner fields
  drawUnderlinedField("First Name", sampleFormData.firstName, leftColX, yPosition, halfWidth + 30)
  drawUnderlinedField("Last Name", sampleFormData.lastName, leftColX + halfWidth + 50, yPosition, halfWidth + 30)

  yPosition -= 40

  drawUnderlinedField("Phone", sampleFormData.phone, leftColX, yPosition, halfWidth + 30)
  drawUnderlinedField("Email", sampleFormData.email, leftColX + halfWidth + 50, yPosition, halfWidth + 30)

  yPosition -= 40

  const thirdWidthFull = (pageWidth - margin * 2 - 40) / 3
  drawUnderlinedField("Date of Birth", sampleFormData.dateOfBirth, leftColX, yPosition, thirdWidthFull)
  const maskedSSN = "XXX-XX-" + sampleFormData.ssn.slice(-4)
  drawUnderlinedField("SSN", maskedSSN, leftColX + thirdWidthFull + 20, yPosition, thirdWidthFull)
  drawUnderlinedField("% Ownership", sampleFormData.ownershipPercentage + "%", leftColX + thirdWidthFull * 2 + 40, yPosition, thirdWidthFull - 40)

  yPosition -= 40

  drawUnderlinedField("Home Address", sampleFormData.homeAddress, leftColX, yPosition, pageWidth - margin * 2)

  yPosition -= 40

  drawUnderlinedField("City", sampleFormData.city, leftColX, yPosition, 200)
  drawUnderlinedField("State", sampleFormData.state, leftColX + 220, yPosition, 120)
  drawUnderlinedField("ZIP", sampleFormData.zip, leftColX + 360, yPosition, 100)

  yPosition -= 50

  // ========== SIGNATURE SECTION ==========
  page.drawText(sampleFormData.signature, {
    x: leftColX,
    y: yPosition - 20,
    size: 20,
    font: cursiveFont,
    color: brandBlue,
  })

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

  page.drawText(sampleFormData.signatureDate, {
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
  const disclaimer = `By signing above, each of the above listed business and business owners/officers/members (individually and collectively, "you") authorize TurboFunding LLC ("TF") and each of its representatives, successors, assignees, affiliates and designees (collectively "Recipients") that may be involved with the acquiring of commercial loans and/or other products that have daily repayment features for the purchase of future receivables, including Merchant Cash Advance transactions, including without limitation the application therefore (collectively, "Transactions") to obtain consumer or personal business and investigative reports and other information about you.`
  
  const wrapText = (text: string, maxWidth: number): string[] => {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const width = helveticaFont.widthOfTextAtSize(testLine, 7)
      
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

  const disclaimerLines = wrapText(disclaimer, pageWidth - margin * 2)
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

  // Save the PDF
  const pdfBytes = await pdfDoc.save()
  
  // Write to file
  const outputDir = path.join(__dirname, "..", "output")
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const outputPath = path.join(outputDir, "test-application.pdf")
  fs.writeFileSync(outputPath, pdfBytes)
  
  console.log(`✅ PDF generated successfully!`)
  console.log(`📄 Output: ${outputPath}`)
  console.log(`📏 Size: ${(pdfBytes.length / 1024).toFixed(2)} KB`)
}

// Run the test
generateTestPDF().catch(console.error)
