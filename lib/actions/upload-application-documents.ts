"use server"

import { put } from "@vercel/blob"

export interface ApplicationFolder {
  folderPath: string
  applicationPdfUrl: string | null
  bankStatementsUrl: string | null
  otherDocumentsUrl: string | null
  createdAt: string
}

export interface UploadDocumentsResult {
  success: boolean
  folder?: ApplicationFolder
  error?: string
}

/**
 * Generate a unique folder path for an application
 */
function generateFolderPath(businessName: string): string {
  const sanitizedBusinessName = (businessName || "Unknown_Business")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_+/g, "_")
    .substring(0, 50)
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  
  return `applications/${sanitizedBusinessName}/${timestamp}`
}

/**
 * Upload all application documents to an organized folder structure
 * Folder structure:
 *   applications/{businessName}/{timestamp}/
 *     - application.pdf
 *     - bank-statements.pdf (or original extension)
 *     - other-documents.pdf (or original extension)
 * 
 * @param existingFolderPath - Optional: Use an existing folder path instead of generating a new one
 */
export async function uploadApplicationDocuments(
  businessName: string,
  pdfBytes?: number[],
  bankStatementsBase64?: string,
  bankStatementsFilename?: string,
  otherDocumentsBase64?: string,
  otherDocumentsFilename?: string,
  existingFolderPath?: string
): Promise<UploadDocumentsResult> {
  try {
    console.log("[UploadDocs] Starting organized document upload...")
    console.log("[UploadDocs] businessName:", businessName)
    console.log("[UploadDocs] existingFolderPath:", existingFolderPath || "none (will generate new)")
    console.log("[UploadDocs] pdfBytes length:", pdfBytes?.length || 0)
    console.log("[UploadDocs] bankStatementsBase64 length:", bankStatementsBase64?.length || 0)
    console.log("[UploadDocs] bankStatementsFilename:", bankStatementsFilename || "none")
    console.log("[UploadDocs] otherDocumentsBase64 length:", otherDocumentsBase64?.length || 0)
    console.log("[UploadDocs] otherDocumentsFilename:", otherDocumentsFilename || "none")
    
    // Use existing folder path or generate a new one
    const folderPath = existingFolderPath || generateFolderPath(businessName)
    console.log("[UploadDocs] Using folder path:", folderPath)
    
    const folder: ApplicationFolder = {
      folderPath,
      applicationPdfUrl: null,
      bankStatementsUrl: null,
      otherDocumentsUrl: null,
      createdAt: new Date().toISOString(),
    }

    // Upload Application PDF
    if (pdfBytes && pdfBytes.length > 0) {
      console.log("[UploadDocs] Uploading application PDF...")
      const pdfBuffer = Buffer.from(pdfBytes)
      const pdfPath = `${folderPath}/application.pdf`
      
      const pdfBlob = await put(pdfPath, pdfBuffer, {
        access: "public",
        contentType: "application/pdf",
        addRandomSuffix: false,
      })
      
      folder.applicationPdfUrl = pdfBlob.url
      console.log("[UploadDocs] Application PDF uploaded:", pdfBlob.url)
    }

    // Upload Bank Statements
    if (bankStatementsBase64 && bankStatementsFilename) {
      console.log("[UploadDocs] Uploading bank statements...")
      console.log("[UploadDocs] Bank statements base64 length:", bankStatementsBase64.length)
      const extension = bankStatementsFilename.split(".").pop() || "pdf"
      const bankStatementsPath = `${folderPath}/bank-statements.${extension}`
      console.log("[UploadDocs] Bank statements path:", bankStatementsPath)
      
      // Decode base64 to buffer
      const bankStatementsBuffer = Buffer.from(bankStatementsBase64, "base64")
      console.log("[UploadDocs] Bank statements buffer size:", bankStatementsBuffer.length)
      
      // Determine content type
      const contentType = getContentType(extension)
      console.log("[UploadDocs] Bank statements content type:", contentType)
      
      const bankBlob = await put(bankStatementsPath, bankStatementsBuffer, {
        access: "public",
        contentType,
        addRandomSuffix: false,
      })
      
      folder.bankStatementsUrl = bankBlob.url
      console.log("[UploadDocs] Bank statements uploaded:", bankBlob.url)
    } else {
      console.log("[UploadDocs] No bank statements to upload (base64:", !!bankStatementsBase64, "filename:", !!bankStatementsFilename, ")")
    }

    // Upload Other Documents
    if (otherDocumentsBase64 && otherDocumentsFilename) {
      console.log("[UploadDocs] Uploading other documents...")
      console.log("[UploadDocs] Other documents base64 length:", otherDocumentsBase64.length)
      const extension = otherDocumentsFilename.split(".").pop() || "pdf"
      const otherDocumentsPath = `${folderPath}/other-documents.${extension}`
      console.log("[UploadDocs] Other documents path:", otherDocumentsPath)
      
      // Decode base64 to buffer
      const otherDocumentsBuffer = Buffer.from(otherDocumentsBase64, "base64")
      console.log("[UploadDocs] Other documents buffer size:", otherDocumentsBuffer.length)
      
      // Determine content type
      const contentType = getContentType(extension)
      console.log("[UploadDocs] Other documents content type:", contentType)
      
      const otherBlob = await put(otherDocumentsPath, otherDocumentsBuffer, {
        access: "public",
        contentType,
        addRandomSuffix: false,
      })
      
      folder.otherDocumentsUrl = otherBlob.url
      console.log("[UploadDocs] Other documents uploaded:", otherBlob.url)
    } else {
      console.log("[UploadDocs] No other documents to upload (base64:", !!otherDocumentsBase64, "filename:", !!otherDocumentsFilename, ")")
    }

    console.log("[UploadDocs] All documents uploaded successfully!")
    console.log("[UploadDocs] Folder structure:", folder)
    
    return {
      success: true,
      folder,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("[UploadDocs] Error uploading documents:", errorMessage)
    return {
      success: false,
      error: errorMessage,
    }
  }
}

/**
 * Get content type based on file extension
 */
function getContentType(extension: string): string {
  const contentTypes: Record<string, string> = {
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    csv: "text/csv",
    txt: "text/plain",
  }
  
  return contentTypes[extension.toLowerCase()] || "application/octet-stream"
}
