"use server"

import { put } from "@vercel/blob"

const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15 MB

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
 * Get actual file size from base64 string or byte array
 */
function getFileSizeInBytes(base64String?: string, byteArray?: number[]): number {
  if (byteArray) {
    return byteArray.length
  }
  if (base64String) {
    // Base64 encoded size is roughly (length * 3) / 4 bytes
    return Math.ceil((base64String.length * 3) / 4)
  }
  return 0
}

/**
 * Format bytes to human readable size
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
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
 * Size Limit: All documents must be under 15 MB
 * 
 * @param existingFolderPath - Optional: Use an existing folder path instead of generating a new one
 * @throws Error if any document exceeds 15 MB size limit
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
    
    // Validate file sizes (15 MB limit)
    console.log("[UploadDocs] Validating file sizes (Max: 15 MB)...")
    
    const applicationPdfSize = getFileSizeInBytes(undefined, pdfBytes)
    if (applicationPdfSize > MAX_FILE_SIZE) {
      const sizeStr = formatFileSize(applicationPdfSize)
      const limitStr = formatFileSize(MAX_FILE_SIZE)
      const errorMsg = `Application PDF exceeds size limit: ${sizeStr} > ${limitStr}`
      console.error("[UploadDocs]", errorMsg)
      return {
        success: false,
        error: errorMsg,
      }
    }
    if (applicationPdfSize > 0) {
      console.log("[UploadDocs] Application PDF size:", formatFileSize(applicationPdfSize))
    }
    
    const bankStatementsSize = getFileSizeInBytes(bankStatementsBase64)
    if (bankStatementsSize > MAX_FILE_SIZE) {
      const sizeStr = formatFileSize(bankStatementsSize)
      const limitStr = formatFileSize(MAX_FILE_SIZE)
      const errorMsg = `Bank statements exceed size limit: ${sizeStr} > ${limitStr}`
      console.error("[UploadDocs]", errorMsg)
      return {
        success: false,
        error: errorMsg,
      }
    }
    if (bankStatementsSize > 0) {
      console.log("[UploadDocs] Bank statements size:", formatFileSize(bankStatementsSize))
    }
    
    const otherDocumentsSize = getFileSizeInBytes(otherDocumentsBase64)
    if (otherDocumentsSize > MAX_FILE_SIZE) {
      const sizeStr = formatFileSize(otherDocumentsSize)
      const limitStr = formatFileSize(MAX_FILE_SIZE)
      const errorMsg = `Other documents exceed size limit: ${sizeStr} > ${limitStr}`
      console.error("[UploadDocs]", errorMsg)
      return {
        success: false,
        error: errorMsg,
      }
    }
    if (otherDocumentsSize > 0) {
      console.log("[UploadDocs] Other documents size:", formatFileSize(otherDocumentsSize))
    }
    
    console.log("[UploadDocs] All files passed size validation ✓")
    
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
      const pdfPath = `${folderPath}/application`
      
      const pdfBlob = await put(pdfPath, pdfBuffer, {
        access: "public",
        contentType: "application/octet-stream",
        addRandomSuffix: false,
      })
      
      folder.applicationPdfUrl = pdfBlob.url
      console.log("[UploadDocs] Application PDF uploaded:", pdfBlob.url)
    }

    // Upload Bank Statements
    if (bankStatementsBase64 && bankStatementsFilename) {
      console.log("[UploadDocs] Uploading bank statements...")
      console.log("[UploadDocs] Bank statements base64 length:", bankStatementsBase64.length)
      const bankStatementsPath = `${folderPath}/bank-statements`
      console.log("[UploadDocs] Bank statements path:", bankStatementsPath)
      
      // Decode base64 to buffer
      const bankStatementsBuffer = Buffer.from(bankStatementsBase64, "base64")
      console.log("[UploadDocs] Bank statements buffer size:", bankStatementsBuffer.length)
      
      // Use generic binary content type for security
      const contentType = "application/octet-stream"
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
      const otherDocumentsPath = `${folderPath}/other-documents`
      console.log("[UploadDocs] Other documents path:", otherDocumentsPath)
      
      // Decode base64 to buffer
      const otherDocumentsBuffer = Buffer.from(otherDocumentsBase64, "base64")
      console.log("[UploadDocs] Other documents buffer size:", otherDocumentsBuffer.length)
      
      // Use generic binary content type for security
      const contentType = "application/octet-stream"
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
