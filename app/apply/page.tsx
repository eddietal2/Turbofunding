"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, UploadIcon, XIcon, ChevronDownIcon } from "lucide-react"
import { ConversionTracking } from "@/components/conversion-tracking"
import { SignatureModal } from "@/components/signature-modal"
import { submitApplication } from "@/lib/actions/submit-application"
import { downloadApplicationPDF } from "@/lib/actions/download-application-pdf"
import { uploadApplicationDocuments, ApplicationFolder } from "@/lib/actions/upload-application-documents"

const DRAFT_STORAGE_KEY = "turbo_funding_application_draft"
const DRAFT_STEP_KEY = "turbo_funding_application_step"

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

// DEV MODE: Set to true to pre-fill all required fields for quick testing
const DEV_MODE = true

const devFormData = {
  // Step 1: Funding Information
  amountRequested: "50000",
  useOfFunds: "expansion",
  fundingAmount: "$50,000",
  fundingPurpose: "Business Expansion",
  // Step 2: Business Information
  businessName: "Test Business LLC",
  legalBusinessName: "Test Business LLC",
  dba: "Test DBA",
  dbaName: "Test DBA",
  federalTaxId: "12-3456789",
  entityType: "LLC",
  businessType: "LLC",
  businessStartDate: "2020-01-15",
  yearsInBusiness: "5",
  annualRevenue: "250001-500000",
  stateIncorporated: "California",
  industry: "Retail",
  businessAddress: "123 Business St",
  businessCity: "Los Angeles",
  businessState: "California",
  businessZip: "90001",
  businessZipCode: "90001",
  businessPhone: "(555) 123-4567",
  businessEmail: "contact@testbusiness.com",
  email: "john@testbusiness.com",
  // Step 3: Owner Information
  firstName: "John",
  lastName: "Doe",
  phone: "(555) 987-6543",
  dateOfBirth: "1985-06-15",
  ssn: "123-45-6789",
  homeAddress: "456 Home Ave",
  city: "Los Angeles",
  state: "California",
  zip: "90002",
  zipCode: "90002",
  creditScore: "good",
  ownershipPercentage: "100",
  percentageOwnership: "100",
  // Step 4: Signature
  signature: "John Doe",
  signatureDate: new Date().toISOString().split("T")[0],
  additionalInfo: "",
}

const getInitialFormData = () => ({
  // Business Information
  legalBusinessName: DEV_MODE ? devFormData.legalBusinessName : "",
  dbaName: DEV_MODE ? devFormData.dbaName : "",
  federalTaxId: DEV_MODE ? devFormData.federalTaxId : "",
  businessType: DEV_MODE ? devFormData.businessType : "",
  yearsInBusiness: DEV_MODE ? devFormData.yearsInBusiness : "",
  annualRevenue: DEV_MODE ? devFormData.annualRevenue : "",
  stateIncorporated: DEV_MODE ? devFormData.stateIncorporated : "",
  industry: DEV_MODE ? devFormData.industry : "",
  businessAddress: DEV_MODE ? devFormData.businessAddress : "",
  businessCity: DEV_MODE ? devFormData.businessCity : "",
  businessState: DEV_MODE ? devFormData.businessState : "",
  businessZipCode: DEV_MODE ? devFormData.businessZipCode : "",
  // Personal Owner Information
  firstName: DEV_MODE ? devFormData.firstName : "",
  lastName: DEV_MODE ? devFormData.lastName : "",
  phone: DEV_MODE ? devFormData.phone : "",
  dateOfBirth: DEV_MODE ? devFormData.dateOfBirth : "",
  ssn: DEV_MODE ? devFormData.ssn : "",
  homeAddress: DEV_MODE ? devFormData.homeAddress : "",
  city: DEV_MODE ? devFormData.city : "",
  state: DEV_MODE ? devFormData.state : "",
  zipCode: DEV_MODE ? devFormData.zipCode : "",
  creditScore: DEV_MODE ? devFormData.creditScore : "",
  percentageOwnership: DEV_MODE ? devFormData.percentageOwnership : "",
  secondOwnerFirstName: "",
  secondOwnerLastName: "",
  secondOwnerPhone: "",
  secondOwnerDateOfBirth: "",
  secondOwnerSsn: "",
  secondOwnerHomeAddress: "",
  secondOwnerCity: "",
  secondOwnerState: "",
  secondOwnerZipCode: "",
  secondOwnerCreditScore: "",
  secondOwnerPercentageOwnership: "",
  fundingAmount: DEV_MODE ? devFormData.fundingAmount : "",
  fundingPurpose: DEV_MODE ? devFormData.fundingPurpose : "",
  additionalInfo: DEV_MODE ? devFormData.additionalInfo : "",
  signature: DEV_MODE ? devFormData.signature : "",
  signatureImage: "", // Canvas signature data URL
  secondOwnerSignature: "",
  signatureDate: DEV_MODE ? devFormData.signatureDate : "",
  agreeToTerms: false,
  secondOwnerAgreeToTerms: false,
  bankStatements: null as File | null,
  otherDocuments: null as File | null,
  // Updates from new code
  amountRequested: DEV_MODE ? devFormData.amountRequested : "",
  useOfFunds: DEV_MODE ? devFormData.useOfFunds : "",
  businessName: DEV_MODE ? devFormData.businessName : "",
  dba: DEV_MODE ? devFormData.dba : "",
  businessPhone: DEV_MODE ? devFormData.businessPhone : "",
  businessEmail: DEV_MODE ? devFormData.businessEmail : "",
  businessStartDate: DEV_MODE ? devFormData.businessStartDate : "",
  entityType: DEV_MODE ? devFormData.entityType : "",
  businessZip: DEV_MODE ? devFormData.businessZip : "",
  email: DEV_MODE ? devFormData.email : "",
  zip: DEV_MODE ? devFormData.zip : "",
  ownershipPercentage: DEV_MODE ? devFormData.ownershipPercentage : "",
})

export default function ApplyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showSecondOwner, setShowSecondOwner] = useState(false)
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showDraftModal, setShowDraftModal] = useState(false)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [draftLoaded, setDraftLoaded] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [formData, setFormData] = useState(getInitialFormData())
  const [applicationFolderPath, setApplicationFolderPath] = useState<string | null>(null)
  const [isUploadingDocs, setIsUploadingDocs] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    funding: true,
    business: true,
    primaryOwner: true,
    secondOwner: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  // Clear draft from localStorage
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY)
      localStorage.removeItem(DRAFT_STEP_KEY)
    } catch (error) {
      console.error("Error clearing draft:", error)
    }
  }, [])

  // Load draft from localStorage on mount
  useEffect(() => {
    if (DEV_MODE) {
      setDraftLoaded(true)
      return
    }

    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY)
      const savedStep = localStorage.getItem(DRAFT_STEP_KEY)

      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft)
        // Check if draft has any meaningful data
        const hasData = Object.entries(parsedDraft).some(([key, value]) => {
          if (key === "bankStatements" || key === "otherDocuments") return false
          if (typeof value === "boolean") return value
          if (typeof value === "string") return value.trim() !== ""
          return false
        })

        if (hasData) {
          // Store draft temporarily
          sessionStorage.setItem("temp_draft", savedDraft)
          sessionStorage.setItem("temp_step", savedStep || "1")
          setShowDraftModal(true)
        }
      }
    } catch (error) {
      console.error("Error loading draft:", error)
    }
    setDraftLoaded(true)
  }, [])

  // Auto-save draft when form data changes (debounced)
  useEffect(() => {
    if (!draftLoaded || DEV_MODE || step >= 5) return

    const timeoutId = setTimeout(() => {
      try {
        // Don't save file objects to localStorage
        const dataToSave = { ...formData }
        delete (dataToSave as any).bankStatements
        delete (dataToSave as any).otherDocuments

        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(dataToSave))
        localStorage.setItem(DRAFT_STEP_KEY, String(step))
        setLastSaved(new Date())
      } catch (error) {
        console.error("Error saving draft:", error)
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [formData, step, draftLoaded])

  // Restore draft from session storage
  const restoreDraft = useCallback(() => {
    try {
      const savedDraft = sessionStorage.getItem("temp_draft")
      const savedStep = sessionStorage.getItem("temp_step")

      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft)
        setFormData((prev) => ({ ...prev, ...parsedDraft }))
        if (savedStep) {
          setStep(parseInt(savedStep, 10))
        }
        // Check if second owner has data
        if (parsedDraft.secondOwnerFirstName || parsedDraft.secondOwnerLastName) {
          setShowSecondOwner(true)
        }
      }
    } catch (error) {
      console.error("Error restoring draft:", error)
    }
    setShowDraftModal(false)
  }, [])

  // Start fresh - clear draft
  const startFresh = useCallback(() => {
    clearDraft()
    sessionStorage.removeItem("temp_draft")
    sessionStorage.removeItem("temp_step")
    setFormData(getInitialFormData())
    setStep(1)
    setShowDraftModal(false)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [clearDraft])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const handleSecondOwnerCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, secondOwnerAgreeToTerms: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    const file = files?.[0] ?? null
    console.log("[FileChange] File selected:", name, file?.name, file?.size, "bytes")
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: file }
      console.log("[FileChange] Updated formData:", name, "=", newFormData[name as keyof typeof newFormData])
      return newFormData
    })
  }

  // Format EIN as XX-XXXXXXX
  const formatEIN = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 9)
    if (digits.length <= 2) return digits
    return `${digits.slice(0, 2)}-${digits.slice(2)}`
  }

  // Format phone as (XXX) XXX-XXXX
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10)
    if (digits.length === 0) return ""
    if (digits.length <= 3) return `(${digits}`
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  // Format zip code as XXXXX or XXXXX-XXXX
  const formatZipCode = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 9)
    if (digits.length <= 5) return digits
    return `${digits.slice(0, 5)}-${digits.slice(5)}`
  }

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.amountRequested || formData.amountRequested.trim() === "") {
      newErrors.amountRequested = "Amount requested is required"
    } else if (isNaN(Number(formData.amountRequested)) || Number(formData.amountRequested) <= 0) {
      newErrors.amountRequested = "Please enter a valid amount greater than 0"
    }
    
    if (!formData.useOfFunds || formData.useOfFunds.trim() === "") {
      newErrors.useOfFunds = "Please describe how you plan to use the funds"
    } else if (formData.useOfFunds.trim().length < 10) {
      newErrors.useOfFunds = "Please provide more detail (at least 10 characters)"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Check if step 1 fields are valid (without setting errors)
  const isStep1Valid = 
    formData.amountRequested.trim() !== "" &&
    !isNaN(Number(formData.amountRequested)) &&
    Number(formData.amountRequested) > 0 &&
    formData.useOfFunds.trim().length >= 10

  // Email validation helper
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  
  // Phone validation helper (at least 10 digits)
  const isValidPhone = (phone: string) => phone.replace(/\D/g, "").length >= 10

  // Zip code validation helper (5 digits)
  const isValidZip = (zip: string) => /^\d{5}(-\d{4})?$/.test(zip)

  // EIN validation helper (XX-XXXXXXX format)
  const isValidEIN = (ein: string) => /^\d{2}-?\d{7}$/.test(ein.replace(/\s/g, ""))

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Legal business name is required"
    }
    
    if (!formData.federalTaxId.trim()) {
      newErrors.federalTaxId = "Federal Tax ID is required"
    } else if (!isValidEIN(formData.federalTaxId)) {
      newErrors.federalTaxId = "Please enter a valid EIN (XX-XXXXXXX)"
    }
    
    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = "Business address is required"
    }
    
    if (!formData.businessCity.trim()) {
      newErrors.businessCity = "City is required"
    }
    
    if (!formData.businessState) {
      newErrors.businessState = "State is required"
    }
    
    if (!formData.businessZip.trim()) {
      newErrors.businessZip = "Zip code is required"
    } else if (!isValidZip(formData.businessZip)) {
      newErrors.businessZip = "Please enter a valid 5-digit zip code"
    }
    
    if (!formData.businessPhone.trim()) {
      newErrors.businessPhone = "Business phone is required"
    } else if (!isValidPhone(formData.businessPhone)) {
      newErrors.businessPhone = "Please enter a valid phone number"
    }
    
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required"
    } else if (!isValidEmail(formData.businessEmail)) {
      newErrors.businessEmail = "Please enter a valid email address"
    }
    
    if (!formData.industry) {
      newErrors.industry = "Industry is required"
    }
    
    if (!formData.businessStartDate) {
      newErrors.businessStartDate = "Business start date is required"
    }
    
    if (!formData.yearsInBusiness.trim()) {
      newErrors.yearsInBusiness = "Years in business is required"
    } else if (isNaN(Number(formData.yearsInBusiness)) || Number(formData.yearsInBusiness) < 0) {
      newErrors.yearsInBusiness = "Please enter a valid number"
    }
    
    if (!formData.annualRevenue) {
      newErrors.annualRevenue = "Annual revenue is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Check if step 2 fields are valid (without setting errors)
  const isStep2Valid = 
    formData.businessName.trim() !== "" &&
    formData.federalTaxId.trim() !== "" &&
    isValidEIN(formData.federalTaxId) &&
    formData.businessAddress.trim() !== "" &&
    formData.businessCity.trim() !== "" &&
    formData.businessState !== "" &&
    formData.businessZip.trim() !== "" &&
    isValidZip(formData.businessZip) &&
    formData.businessPhone.trim() !== "" &&
    isValidPhone(formData.businessPhone) &&
    formData.businessEmail.trim() !== "" &&
    isValidEmail(formData.businessEmail) &&
    formData.industry !== "" &&
    formData.businessStartDate !== "" &&
    formData.yearsInBusiness.trim() !== "" &&
    !isNaN(Number(formData.yearsInBusiness)) &&
    Number(formData.yearsInBusiness) >= 0 &&
    formData.annualRevenue !== "" &&
    formData.email.trim() !== "" &&
    isValidEmail(formData.email)

  // SSN validation helper (9 digits, with or without dashes)
  const isValidSSN = (ssn: string) => {
    const digits = ssn.replace(/\D/g, "")
    return digits.length === 9
  }

  // Format SSN as XXX-XX-XXXX
  const formatSSN = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 9)
    if (digits.length <= 3) return digits
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
  }

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    // Primary Owner validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    }
    
    if (!formData.ssn.trim()) {
      newErrors.ssn = "Social Security Number is required"
    } else if (!isValidSSN(formData.ssn)) {
      newErrors.ssn = "Please enter a valid 9-digit SSN"
    }
    
    if (!formData.homeAddress.trim()) {
      newErrors.homeAddress = "Home address is required"
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }
    
    if (!formData.state) {
      newErrors.state = "State is required"
    }
    
    if (!formData.zip.trim()) {
      newErrors.zip = "Zip code is required"
    } else if (!isValidZip(formData.zip)) {
      newErrors.zip = "Please enter a valid 5-digit zip code"
    }
    
    if (!formData.creditScore) {
      newErrors.creditScore = "Please select a credit score range"
    }
    
    if (!formData.ownershipPercentage.trim()) {
      newErrors.ownershipPercentage = "Ownership percentage is required"
    } else if (isNaN(Number(formData.ownershipPercentage)) || Number(formData.ownershipPercentage) <= 0 || Number(formData.ownershipPercentage) > 100) {
      newErrors.ownershipPercentage = "Please enter a valid percentage (1-100)"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Check if step 3 fields are valid (without setting errors)
  const isStep3Valid = 
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.phone.trim() !== "" &&
    isValidPhone(formData.phone) &&
    formData.dateOfBirth !== "" &&
    formData.ssn.trim() !== "" &&
    isValidSSN(formData.ssn) &&
    formData.homeAddress.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state !== "" &&
    formData.zip.trim() !== "" &&
    isValidZip(formData.zip) &&
    formData.creditScore !== "" &&
    formData.ownershipPercentage.trim() !== "" &&
    !isNaN(Number(formData.ownershipPercentage)) &&
    Number(formData.ownershipPercentage) > 0 &&
    Number(formData.ownershipPercentage) <= 100

  const nextStep = () => {
    // Validate current step before proceeding
    if (step === 1 && !validateStep1()) {
      return
    }
    if (step === 2 && !validateStep2()) {
      return
    }
    if (step === 3 && !validateStep3()) {
      return
    }
    
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    setErrors({}) // Clear errors when moving to next step
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    setStep((prev) => prev - 1)
  }

  // Open signature modal when user clicks Submit
  const openSignatureModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowSignatureModal(true)
  }

  // Handle signature and submit
  const handleSignatureAndSubmit = async (signatureDataUrl: string) => {
    // Update formData with signature
    const updatedFormData = {
      ...formData,
      signatureImage: signatureDataUrl,
      signature: formData.signature || `${formData.firstName} ${formData.lastName}`,
      signatureDate: new Date().toISOString().split('T')[0],
    }
    setFormData(updatedFormData)
    setShowSignatureModal(false)
    setIsSubmitting(true)
    
    console.log("[Submit] Form submission started with signature")
    console.log("[Submit] Submitting application with data:", updatedFormData)

    try {
      // First, generate the PDF (still uploads to legacy location)
      console.log("[Submit] Generating PDF for email attachment...")
      let pdfBytes: number[] | null = null
      
      try {
        const pdfResult = await downloadApplicationPDF(updatedFormData)
        if (pdfResult.success && pdfResult.pdfBytes) {
          pdfBytes = pdfResult.pdfBytes
          console.log("[Submit] PDF generated successfully")
        } else {
          console.warn("[Submit] PDF generation failed, continuing without PDF")
        }
      } catch (pdfError) {
        console.warn("[Submit] PDF generation error (non-critical):", pdfError)
      }

      // Upload PDF to organized folder (documents will be uploaded later in Step 6)
      console.log("[Submit] Uploading application PDF to organized folder...")
      let applicationFolder: ApplicationFolder | null = null
      
      try {
        const uploadResult = await uploadApplicationDocuments(
          (formData.businessName || formData.legalBusinessName || "Unknown Business") as string,
          pdfBytes || undefined,
          undefined, // No bank statements yet - uploaded in Step 6
          undefined,
          undefined, // No other documents yet - uploaded in Step 6
          undefined
        )
        
        if (uploadResult.success && uploadResult.folder) {
          applicationFolder = uploadResult.folder
          setApplicationFolderPath(uploadResult.folder.folderPath)
          console.log("[Submit] PDF uploaded to folder:", applicationFolder.folderPath)
        } else {
          console.warn("[Submit] PDF upload failed:", uploadResult.error)
        }
      } catch (uploadError) {
        console.warn("[Submit] PDF upload error (non-critical):", uploadError)
      }

      console.log("[Submit] Calling submitApplication...")
      const result = await submitApplication(updatedFormData, applicationFolder)
      console.log("[Submit] Submit result:", result)

      if (result.success) {
        console.log("[Submit] Application submitted successfully!")
        if (result.emailSent) {
          console.log("[Submit] Confirmation email sent to:", formData.email)
        }
        clearDraft() // Clear draft after successful submission
        setIsSubmitting(false)
        nextStep()
      } else {
        console.error("[Submit] Application submission failed:", result.error)
        setIsSubmitting(false)
        alert(
          `Application submission failed:\n\n${result.error}\n\nPlease try again or contact support at vivsin1995@gmail.com`,
        )
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      const errorStack = error instanceof Error ? error.stack : ""
      console.error("[Submit] Error in handleSubmit:", error)
      console.error("[Submit] Error details:", errorMessage, errorStack)
      setIsSubmitting(false)
      alert(
        `An unexpected error occurred:\n\n${errorMessage}\n\nPlease contact support at vivsin1995@gmail.com with this error message.`,
      )
    }
  }

  const handleDocumentUpload = async () => {
    console.log("[Docs] handleDocumentUpload called")
    console.log("[Docs] formData.bankStatements:", formData.bankStatements)
    console.log("[Docs] formData.otherDocuments:", formData.otherDocuments)
    console.log("[Docs] formData.bankStatements type:", typeof formData.bankStatements)
    console.log("[Docs] formData.bankStatements instanceof File:", formData.bankStatements instanceof File)
    
    // Check if we have documents to upload
    if (!formData.bankStatements && !formData.otherDocuments) {
      console.log("[Docs] No documents to upload, redirecting...")
      router.push("/apply/success")
      return
    }

    setIsUploadingDocs(true)
    console.log("[Docs] Starting document upload...")

    try {
      // Helper function to convert File to base64
      const fileToBase64 = async (file: File): Promise<string> => {
        console.log("[Docs] fileToBase64 called for:", file.name, "size:", file.size)
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            const result = reader.result as string
            console.log("[Docs] FileReader result length:", result.length)
            const base64 = result.split(',')[1]
            console.log("[Docs] Base64 length after split:", base64?.length || 0)
            if (!base64) {
              reject(new Error("Failed to extract base64 from file"))
              return
            }
            resolve(base64)
          }
          reader.onerror = (error) => {
            console.error("[Docs] FileReader error:", error)
            reject(error)
          }
        })
      }

      // Convert document files to base64
      let bankStatementsBase64: string | undefined
      let bankStatementsFilename: string | undefined
      let otherDocumentsBase64: string | undefined
      let otherDocumentsFilename: string | undefined

      if (formData.bankStatements) {
        console.log("[Docs] Converting bank statements to base64...")
        console.log("[Docs] Bank statements file:", formData.bankStatements.name, formData.bankStatements.size, "bytes")
        bankStatementsBase64 = await fileToBase64(formData.bankStatements)
        bankStatementsFilename = formData.bankStatements.name
        console.log("[Docs] Bank statements converted! Base64 length:", bankStatementsBase64.length)
      }

      if (formData.otherDocuments) {
        console.log("[Docs] Converting other documents to base64...")
        console.log("[Docs] Other documents file:", formData.otherDocuments.name, formData.otherDocuments.size, "bytes")
        otherDocumentsBase64 = await fileToBase64(formData.otherDocuments)
        otherDocumentsFilename = formData.otherDocuments.name
        console.log("[Docs] Other documents converted! Base64 length:", otherDocumentsBase64.length)
      }

      // Upload documents to folder (use same folder as the PDF from Step 4)
      console.log("[Docs] Calling uploadApplicationDocuments...")
      console.log("[Docs] businessName:", formData.businessName || formData.legalBusinessName)
      console.log("[Docs] applicationFolderPath:", applicationFolderPath)
      console.log("[Docs] bankStatementsBase64 length:", bankStatementsBase64?.length || 0)
      console.log("[Docs] bankStatementsFilename:", bankStatementsFilename)
      console.log("[Docs] otherDocumentsBase64 length:", otherDocumentsBase64?.length || 0)
      console.log("[Docs] otherDocumentsFilename:", otherDocumentsFilename)
      
      const uploadResult = await uploadApplicationDocuments(
        (formData.businessName || formData.legalBusinessName || "Unknown Business") as string,
        undefined, // No PDF bytes - just uploading documents
        bankStatementsBase64,
        bankStatementsFilename,
        otherDocumentsBase64,
        otherDocumentsFilename,
        applicationFolderPath || undefined // Pass existing folder path from Step 4
      )

      console.log("[Docs] uploadApplicationDocuments returned:", JSON.stringify(uploadResult, null, 2))

      if (uploadResult.success && uploadResult.folder) {
        console.log("[Docs] Documents uploaded successfully!")
        console.log("[Docs] Bank statements URL:", uploadResult.folder.bankStatementsUrl)
        console.log("[Docs] Other documents URL:", uploadResult.folder.otherDocumentsUrl)
        alert(`Upload successful!\n\nBank Statements: ${uploadResult.folder.bankStatementsUrl || 'Not uploaded'}\n\nOther Documents: ${uploadResult.folder.otherDocumentsUrl || 'Not uploaded'}`)
      } else {
        console.error("[Docs] Document upload failed:", uploadResult.error)
        alert(`Upload failed: ${uploadResult.error}`)
      }

      setIsUploadingDocs(false)
      router.push("/apply/success")
    } catch (error) {
      console.error("[Docs] Error uploading documents:", error)
      alert(`Upload error: ${error instanceof Error ? error.message : String(error)}`)
      setIsUploadingDocs(false)
      // Don't redirect on error so user can try again
    }
  }

  const getFundingAmountValue = (range: string) => {
    const values: Record<string, number> = {
      less_than_50k: 25000,
      "50k_to_100k": 75000,
      "100k_to_250k": 175000,
      "250k_to_500k": 375000,
      "500k_to_1m": 750000,
      more_than_1m: 1500000,
    }
    return values[range] || 0
  }

  const handleDownloadPDF = async () => {
    setIsDownloadingPDF(true)
    console.log("[v0] Starting PDF download...")

    try {
      const result = await downloadApplicationPDF(formData)

      if (result.success && result.pdfBytes) {
        // Convert array back to Uint8Array
        const pdfBytes = new Uint8Array(result.pdfBytes)

        // Create a blob from the PDF bytes
        const blob = new Blob([pdfBytes], { type: "application/pdf" })

        // Create a download link
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        const businessName = (formData.businessName || formData.legalBusinessName || "Application").replace(/\s+/g, "_")
        link.download = `TurboFunding_Application_${businessName}_${new Date().toISOString().split("T")[0]}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        console.log("[v0] PDF downloaded successfully")
      } else {
        console.error("[v0] PDF download failed:", result.error)
        alert("Failed to download PDF. Please try again or contact support.")
      }
    } catch (error) {
      console.error("[v0] Error downloading PDF:", error)
      alert("An error occurred while downloading the PDF. Please try again.")
    } finally {
      setIsDownloadingPDF(false)
    }
  }

  return (
    <>
      <ConversionTracking eventName="ViewContent" eventData={{ content_type: "application_page" }} />

      {/* Draft Recovery Modal */}
      {showDraftModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={startFresh}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <XIcon className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/tf-logo.png"
                alt="TurboFunding Logo"
                width={62}
                height={62}
                className="w-18 h-18"
              />
              <h2 className="text-xl font-bold text-gray-900">Welcome Back!</h2>
            </div>
            <p className="text-gray-600 mb-6">
              We found a <b>saved draft</b> of your funding application. Would you like to continue where you left off or start a new application?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={restoreDraft}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Continue Application
              </Button>
              <Button
                onClick={startFresh}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Start Fresh
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Signature Modal */}
      <SignatureModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSign={handleSignatureAndSubmit}
        signerName={`${formData.firstName} ${formData.lastName}`.trim() || "Applicant"}
      />

      <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
        <main className="flex-1">
          {/* Application Form Section */}
          <section className="w-full py-8 md:py-16 bg-[#F5F7FA]">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                {/* Auto-save indicator */}
                {lastSaved && step < 5 && (
                  <div className="mb-4 flex items-center justify-end gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-gray-500">
                      Draft auto-saved at {lastSaved.toLocaleTimeString()}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  {/* Mobile Step Indicator - Compact & Cool */}
                  <div className="md:hidden">
                    {/* Progress Bar */}
                    <div className="relative mb-4">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden relative">
                        {/* Step markers */}
                        <div className="absolute inset-0 flex justify-between px-1 items-center">
                          {[1, 2, 3, 4, 5, 6].map((s) => (
                            <div
                              key={s}
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                s <= step ? "bg-white/80" : "bg-gray-400/50"
                              }`}
                            />
                          ))}
                        </div>
                        {/* Progress fill - minimum 8% so step 1 shows some progress */}
                        <div 
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${Math.max(8, ((step) / 6) * 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Current Step Display */}
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
                          {step > 6 ? <CheckCircleIcon className="h-5 w-5" /> : step}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 font-space-grotesk">
                            {step === 1 && "Funding Info"}
                            {step === 2 && "Business Info"}
                            {step === 3 && "Owner Info"}
                            {step === 4 && "Signature"}
                            {step === 5 && "Confirmation"}
                            {step === 6 && "Documents"}
                          </p>
                          <p className="text-xs text-gray-500 font-space-grotesk">Step {step} of 6</p>
                        </div>
                      </div>
                      
                      {/* Step Pills */}
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5, 6].map((s) => (
                          <div
                            key={s}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              s < step 
                                ? "bg-orange-500" 
                                : s === step 
                                  ? "bg-orange-500 scale-125" 
                                  : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Step Indicator - Bold & Prominent */}
                  <div className="hidden md:block">
                    {/* Progress Bar Background */}
                    <div className="relative mb-8">
                      <div className="absolute top-6 left-0 right-0 h-1.5 bg-gray-200 rounded-full" />
                      <div 
                        className="absolute top-6 left-0 h-1.5 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((step - 1) / 5) * 100}%` }}
                      />
                      
                      {/* Step Circles */}
                      <div className="relative flex justify-between">
                        {[
                          { num: 1, label: "Funding Info" },
                          { num: 2, label: "Business Info" },
                          { num: 3, label: "Owner Info" },
                          { num: 4, label: "Signature" },
                          { num: 5, label: "Confirmation" },
                          { num: 6, label: "Documents" },
                        ].map(({ num, label }) => (
                          <div key={num} className="flex flex-col items-center">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                                step > num
                                  ? "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-500/30"
                                  : step === num
                                    ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-xl shadow-orange-500/40 scale-110 ring-4 ring-orange-100"
                                    : "bg-white border-2 border-gray-300 text-gray-400"
                              }`}
                            >
                              {step > num ? <CheckCircleIcon className="h-6 w-6" /> : num}
                            </div>
                            <p className={`mt-3 text-sm font-medium transition-colors duration-300 font-space-grotesk ${
                              step >= num ? "text-gray-900" : "text-gray-400"
                            }`}>
                              {label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 1: Funding Information */}
                {step === 1 && (
                  <>
                    <ConversionTracking eventName="AddPaymentInfo" eventData={{ content_type: "application_step_1" }} />
                    <Card className="bg-white border-gray-200">
                      <CardContent className="pt-6">
                        <p className="text-gray-600 mb-6">Tell us about your funding needs.</p>
                        <form className="space-y-6">
                          <div className="space-y-3">
                            <Label htmlFor="amountRequested" className="text-gray-800">
                              Amount Requested <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="amountRequested"
                              name="amountRequested"
                              type="number"
                              value={formData.amountRequested}
                              onChange={(e) => {
                                handleChange(e)
                                if (errors.amountRequested) {
                                  setErrors((prev) => ({ ...prev, amountRequested: "" }))
                                }
                              }}
                              placeholder="Enter amount"
                              className={`bg-white border-gray-300 text-gray-900 ${errors.amountRequested ? "border-red-500 focus:ring-red-500" : ""}`}
                              required
                            />
                            {errors.amountRequested && (
                              <p className="text-red-500 text-sm">{errors.amountRequested}</p>
                            )}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="useOfFunds" className="text-gray-800">
                              Use of Funds <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="useOfFunds"
                              placeholder="Describe how you plan to use the funding..."
                              value={formData.useOfFunds}
                              onChange={(e) => {
                                setFormData({ ...formData, useOfFunds: e.target.value })
                                if (errors.useOfFunds) {
                                  setErrors((prev) => ({ ...prev, useOfFunds: "" }))
                                }
                              }}
                              className={`bg-white border-gray-300 text-gray-900 min-h-[100px] ${errors.useOfFunds ? "border-red-500 focus:ring-red-500" : ""}`}
                              required
                            />
                            {errors.useOfFunds && (
                              <p className="text-red-500 text-sm">{errors.useOfFunds}</p>
                            )}
                          </div>
                        </form>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-6 border-t border-gray-200">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => (window.location.href = "/")}
                          className="font-semibold"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!DEV_MODE && !isStep1Valid}
                          className="bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          Next Step
                        </Button>
                      </CardFooter>
                    </Card>
                  </>
                )}

                {/* Step 2: Business Information */}
                {step === 2 && (
                  <>
                    <ConversionTracking eventName="AddPaymentInfo" eventData={{ content_type: "application_step_2" }} />
                    <Card className="bg-white border-gray-200">
                      <CardContent className="pt-6">
                        <p className="text-gray-600 mb-6">Tell us about your business to help us find the right funding solution.</p>
                        <form className="space-y-6">
                          <div className="space-y-3">
                            <Label htmlFor="businessName" className="text-gray-800">
                              Legal Business Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="businessName"
                              placeholder="ABC Company LLC"
                              value={formData.businessName}
                              onChange={(e) => {
                                setFormData({ ...formData, businessName: e.target.value })
                                if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: "" }))
                              }}
                              className={`bg-white border-gray-300 text-gray-900 ${errors.businessName ? "border-red-500" : ""}`}
                              required
                            />
                            {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="dba" className="text-gray-800">
                              DBA (if applicable)
                            </Label>
                            <Input
                              id="dba"
                              placeholder="Doing Business As"
                              value={formData.dba}
                              onChange={(e) => setFormData({ ...formData, dba: e.target.value })}
                              className="bg-white border-gray-300 text-gray-900"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="federalTaxId" className="text-gray-800">
                              Federal Tax ID (EIN) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="federalTaxId"
                              placeholder="XX-XXXXXXX"
                              value={formData.federalTaxId}
                              maxLength={10}
                              onChange={(e) => {
                                const formatted = formatEIN(e.target.value)
                                setFormData({ ...formData, federalTaxId: formatted })
                                if (errors.federalTaxId) setErrors((prev) => ({ ...prev, federalTaxId: "" }))
                              }}
                              className={`bg-white border-gray-300 text-gray-900 ${errors.federalTaxId ? "border-red-500" : ""}`}
                              required
                            />
                            {errors.federalTaxId && <p className="text-red-500 text-sm">{errors.federalTaxId}</p>}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="businessAddress" className="text-gray-800">
                              Business Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="businessAddress"
                              placeholder="123 Main St"
                              value={formData.businessAddress}
                              onChange={(e) => {
                                setFormData({ ...formData, businessAddress: e.target.value })
                                if (errors.businessAddress) setErrors((prev) => ({ ...prev, businessAddress: "" }))
                              }}
                              className={`bg-white border-gray-300 text-gray-900 ${errors.businessAddress ? "border-red-500" : ""}`}
                              required
                            />
                            {errors.businessAddress && <p className="text-red-500 text-sm">{errors.businessAddress}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-3">
                              <Label htmlFor="city" className="text-gray-800">
                                City <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="businessCity"
                                placeholder="Enter city"
                                value={formData.businessCity}
                                onChange={(e) => {
                                  setFormData({ ...formData, businessCity: e.target.value })
                                  if (errors.businessCity) setErrors((prev) => ({ ...prev, businessCity: "" }))
                                }}
                                className={`bg-white border-gray-300 text-gray-900 ${errors.businessCity ? "border-red-500" : ""}`}
                                required
                              />
                              {errors.businessCity && <p className="text-red-500 text-sm">{errors.businessCity}</p>}
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="state" className="text-gray-800">
                                State <span className="text-red-500">*</span>
                              </Label>
                              <Select
                                value={formData.businessState}
                                onValueChange={(value) => {
                                  setFormData({ ...formData, businessState: value })
                                  if (errors.businessState) setErrors((prev) => ({ ...prev, businessState: "" }))
                                }}
                                required
                              >
                                <SelectTrigger className={`bg-white border-gray-300 text-gray-900 ${errors.businessState ? "border-red-500" : ""}`}>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300 text-gray-900 max-h-[300px]">
                                  {US_STATES.map((state) => (
                                    <SelectItem key={state} value={state}>
                                      {state}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.businessState && <p className="text-red-500 text-sm">{errors.businessState}</p>}
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="zipCode" className="text-gray-800">
                                Zip Code <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="businessZip"
                                placeholder="XXXXX"
                                value={formData.businessZip}
                                maxLength={10}
                                onChange={(e) => {
                                  const formatted = formatZipCode(e.target.value)
                                  setFormData({ ...formData, businessZip: formatted })
                                  if (errors.businessZip) setErrors((prev) => ({ ...prev, businessZip: "" }))
                                }}
                                className={`bg-white border-gray-300 text-gray-900 ${errors.businessZip ? "border-red-500" : ""}`}
                                required
                              />
                              {errors.businessZip && <p className="text-red-500 text-sm">{errors.businessZip}</p>}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="businessPhone" className="text-gray-800">
                              Business Phone <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="businessPhone"
                              type="tel"
                              placeholder="(XXX) XXX-XXXX"
                              value={formData.businessPhone}
                              maxLength={14}
                              onChange={(e) => {
                                const formatted = formatPhone(e.target.value)
                                setFormData({ ...formData, businessPhone: formatted })
                                if (errors.businessPhone) setErrors((prev) => ({ ...prev, businessPhone: "" }))
                              }}
                              className={`bg-white border-gray-300 text-gray-900 ${errors.businessPhone ? "border-red-500" : ""}`}
                              required
                            />
                            {errors.businessPhone && <p className="text-red-500 text-sm">{errors.businessPhone}</p>}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="businessEmail" className="text-gray-800">
                              Business Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="businessEmail"
                              type="email"
                              placeholder="contact@business.com"
                              value={formData.businessEmail}
                              onChange={(e) => {
                                setFormData({ ...formData, businessEmail: e.target.value })
                                if (errors.businessEmail) setErrors((prev) => ({ ...prev, businessEmail: "" }))
                              }}
                              className={`bg-[#F5F7FA] border-gray-300 text-gray-900 ${errors.businessEmail ? "border-red-500" : ""}`}
                              required
                            />
                            {errors.businessEmail && <p className="text-red-500 text-sm">{errors.businessEmail}</p>}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="industry" className="text-gray-800">
                              Industry <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={formData.industry}
                              onValueChange={(value) => {
                                setFormData({ ...formData, industry: value })
                                if (errors.industry) setErrors((prev) => ({ ...prev, industry: "" }))
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-white border-gray-300 text-gray-900 ${errors.industry ? "border-red-500" : ""}`}>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-gray-300 text-gray-900 max-h-[300px]">
                                <SelectItem value="Retail">Retail</SelectItem>
                                <SelectItem value="Healthcare">Healthcare</SelectItem>
                                <SelectItem value="Technology">Technology</SelectItem>
                                <SelectItem value="Hospitality">Hospitality</SelectItem>
                                <SelectItem value="Construction">Construction</SelectItem>
                                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="businessStartDate" className="text-gray-800">
                              Business Start Date <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="businessStartDate"
                              type="date"
                              value={formData.businessStartDate}
                              onChange={(e) => {
                                setFormData({ ...formData, businessStartDate: e.target.value })
                                if (errors.businessStartDate) setErrors((prev) => ({ ...prev, businessStartDate: "" }))
                              }}
                              className={`bg-[#F5F7FA] border-gray-300 text-gray-900 ${errors.businessStartDate ? "border-red-500" : ""}`}
                              required
                            />
                            {errors.businessStartDate && <p className="text-red-500 text-sm">{errors.businessStartDate}</p>}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="entityType" className="text-gray-800">
                              Entity Type
                            </Label>
                            <Select
                              value={formData.entityType}
                              onValueChange={(value) => setFormData({ ...formData, entityType: value })}
                            >
                              <SelectTrigger className="bg-[#F5F7FA] border-gray-300 text-gray-900">
                                <SelectValue placeholder="Select entity type" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#F5F7FA] border-gray-300 text-gray-900">
                                <SelectItem value="LLC">LLC</SelectItem>
                                <SelectItem value="Corporation">Corporation</SelectItem>
                                <SelectItem value="Partnership">Partnership</SelectItem>
                                <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="yearsInBusiness" className="text-gray-800">
                              Years in Business <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="yearsInBusiness"
                              type="number"
                              placeholder="Enter years in business"
                              value={formData.yearsInBusiness}
                              onChange={(e) => {
                                setFormData({ ...formData, yearsInBusiness: e.target.value })
                                if (errors.yearsInBusiness) setErrors((prev) => ({ ...prev, yearsInBusiness: "" }))
                              }}
                              className={`bg-white border-gray-300 text-gray-900 ${errors.yearsInBusiness ? "border-red-500" : ""}`}
                              required
                            />
                            {errors.yearsInBusiness && <p className="text-red-500 text-sm">{errors.yearsInBusiness}</p>}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="annualRevenue" className="text-gray-800">
                              Annual Revenue <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={formData.annualRevenue}
                              onValueChange={(value) => {
                                setFormData({ ...formData, annualRevenue: value })
                                if (errors.annualRevenue) setErrors((prev) => ({ ...prev, annualRevenue: "" }))
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-white border-gray-300 text-gray-900 ${errors.annualRevenue ? "border-red-500" : ""}`}>
                                <SelectValue placeholder="Select revenue range" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-gray-300 text-gray-900 max-h-[300px]">
                                <SelectItem value="10000-50000">$10,000 - $50,000</SelectItem>
                                <SelectItem value="50001-100000">$50,001 - $100,000</SelectItem>
                                <SelectItem value="100001-250000">$100,001 - $250,000</SelectItem>
                                <SelectItem value="250001-500000">$250,001 - $500,000</SelectItem>
                                <SelectItem value="500001-1000000">$500,001 - $1,000,000</SelectItem>
                                <SelectItem value="1000001+">Over $1,000,000</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.annualRevenue && <p className="text-red-500 text-sm">{errors.annualRevenue}</p>}
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-gray-800">
                              Email Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value })
                                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }))
                              }}
                              className={`bg-white border-gray-300 text-gray-900 ${errors.email ? "border-red-500" : ""}`}
                              required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                          </div>
                        </form>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-6 border-t border-gray-200">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="font-semibold bg-transparent"
                        >
                          Previous
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!DEV_MODE && !isStep2Valid}
                          className="bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          Next Step
                        </Button>
                      </CardFooter>
                    </Card>
                  </>
                )}

                {/* Step 3: Owner Information */}
                {step === 3 && (
                  <>
                    <ConversionTracking eventName="AddPaymentInfo" eventData={{ content_type: "application_step_3" }} />
                    <Card className="bg-white border-gray-200">
                      <CardContent className="pt-6">
                        <p className="text-gray-600 mb-6">Please provide owner information.</p>
                        <form className="space-y-6">
                          <div className="space-y-3">
                            <h3 className="text-lg font-medium text-orange-400">Primary Owner Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={(e) => {
                                    handleChange(e)
                                    if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }))
                                  }}
                                  placeholder="Enter your first name"
                                  className={`bg-white border-gray-300 text-gray-900 ${errors.firstName ? "border-red-500" : ""}`}
                                  required
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                                <Input
                                  id="lastName"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={(e) => {
                                    handleChange(e)
                                    if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }))
                                  }}
                                  placeholder="Enter your last name"
                                  className={`bg-white border-gray-300 text-gray-900 ${errors.lastName ? "border-red-500" : ""}`}
                                  required
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  type="tel"
                                  value={formData.phone}
                                  maxLength={14}
                                  onChange={(e) => {
                                    const formatted = formatPhone(e.target.value)
                                    setFormData({ ...formData, phone: formatted })
                                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }))
                                  }}
                                  placeholder="(XXX) XXX-XXXX"
                                  className={`bg-white border-gray-300 text-gray-900 ${errors.phone ? "border-red-500" : ""}`}
                                  required
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth <span className="text-red-500">*</span></Label>
                                <Input
                                  id="dateOfBirth"
                                  name="dateOfBirth"
                                  type="date"
                                  value={formData.dateOfBirth}
                                  onChange={(e) => {
                                    handleChange(e)
                                    if (errors.dateOfBirth) setErrors((prev) => ({ ...prev, dateOfBirth: "" }))
                                  }}
                                  className={`bg-white border-gray-300 text-gray-900 ${errors.dateOfBirth ? "border-red-500" : ""}`}
                                  required
                                />
                                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="ssn">Social Security Number <span className="text-red-500">*</span></Label>
                              <Input
                                id="ssn"
                                name="ssn"
                                type="password"
                                value={formData.ssn}
                                maxLength={11}
                                onChange={(e) => {
                                  const formatted = formatSSN(e.target.value)
                                  setFormData({ ...formData, ssn: formatted })
                                  if (errors.ssn) setErrors((prev) => ({ ...prev, ssn: "" }))
                                }}
                                placeholder="XXX-XX-XXXX"
                                className={`bg-white border-gray-300 text-gray-900 ${errors.ssn ? "border-red-500" : ""}`}
                                required
                              />
                              {errors.ssn && <p className="text-red-500 text-sm">{errors.ssn}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="homeAddress">Home Street Address <span className="text-red-500">*</span></Label>
                              <Input
                                id="homeAddress"
                                name="homeAddress"
                                value={formData.homeAddress}
                                onChange={(e) => {
                                  handleChange(e)
                                  if (errors.homeAddress) setErrors((prev) => ({ ...prev, homeAddress: "" }))
                                }}
                                placeholder="Enter your home address"
                                className={`bg-white border-gray-300 text-gray-900 ${errors.homeAddress ? "border-red-500" : ""}`}
                                required
                              />
                              {errors.homeAddress && <p className="text-red-500 text-sm">{errors.homeAddress}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="space-y-2">
                                <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                                <Input
                                  id="city"
                                  name="city"
                                  value={formData.city}
                                  onChange={(e) => {
                                    handleChange(e)
                                    if (errors.city) setErrors((prev) => ({ ...prev, city: "" }))
                                  }}
                                  placeholder="Enter city"
                                  className={`bg-white border-gray-300 text-gray-900 ${errors.city ? "border-red-500" : ""}`}
                                  required
                                />
                                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                                <Select
                                  value={formData.state}
                                  onValueChange={(value) => {
                                    setFormData({ ...formData, state: value })
                                    if (errors.state) setErrors((prev) => ({ ...prev, state: "" }))
                                  }}
                                  required
                                >
                                  <SelectTrigger className={`bg-white border-gray-300 text-gray-900 ${errors.state ? "border-red-500" : ""}`}>
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white border-gray-300 text-gray-900 max-h-[300px]">
                                    {US_STATES.map((state) => (
                                      <SelectItem key={state} value={state}>
                                        {state}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="zip">Zip Code <span className="text-red-500">*</span></Label>
                                <Input
                                  id="zip"
                                  name="zip"
                                  value={formData.zip}
                                  maxLength={10}
                                  onChange={(e) => {
                                    const formatted = formatZipCode(e.target.value)
                                    setFormData({ ...formData, zip: formatted })
                                    if (errors.zip) setErrors((prev) => ({ ...prev, zip: "" }))
                                  }}
                                  placeholder="XXXXX"
                                  className={`bg-white border-gray-300 text-gray-900 ${errors.zip ? "border-red-500" : ""}`}
                                  required
                                />
                                {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Credit Score Range <span className="text-red-500">*</span></Label>
                              <RadioGroup
                                value={formData.creditScore}
                                onValueChange={(value) => {
                                  handleSelectChange("creditScore", value)
                                  if (errors.creditScore) setErrors((prev) => ({ ...prev, creditScore: "" }))
                                }}
                                className={`grid grid-cols-1 md:grid-cols-3 gap-2 ${errors.creditScore ? "border border-red-500 rounded-md p-2" : ""}`}
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="excellent"
                                    id="excellent"
                                    className="border-orange-500 text-orange-500"
                                  />
                                  <Label htmlFor="excellent" className="cursor-pointer text-base">
                                    Excellent (720+)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="good"
                                    id="good"
                                    className="border-orange-500 text-orange-500"
                                  />
                                  <Label htmlFor="good" className="cursor-pointer text-base">
                                    Good (680-719)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="fair"
                                    id="fair"
                                    className="border-orange-500 text-orange-500"
                                  />
                                  <Label htmlFor="fair" className="cursor-pointer text-base">
                                    Fair (640-679)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="poor"
                                    id="poor"
                                    className="border-orange-500 text-orange-500"
                                  />
                                  <Label htmlFor="poor" className="cursor-pointer text-base">
                                    Poor (580-639)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="bad" id="bad" className="border-orange-500 text-orange-500" />
                                  <Label htmlFor="bad" className="cursor-pointer text-base">
                                    Bad (below 580)
                                  </Label>
                                </div>
                              </RadioGroup>
                              {errors.creditScore && <p className="text-red-500 text-sm">{errors.creditScore}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="ownershipPercentage">Ownership Percentage <span className="text-red-500">*</span></Label>
                              <Input
                                id="ownershipPercentage"
                                name="ownershipPercentage"
                                type="number"
                                min="1"
                                max="100"
                                value={formData.ownershipPercentage}
                                onChange={(e) => {
                                  handleChange(e)
                                  if (errors.ownershipPercentage) setErrors((prev) => ({ ...prev, ownershipPercentage: "" }))
                                }}
                                placeholder="Enter percentage (1-100)"
                                className={`bg-white border-gray-300 text-gray-900 ${errors.ownershipPercentage ? "border-red-500" : ""}`}
                                required
                              />
                              {errors.ownershipPercentage && <p className="text-red-500 text-sm">{errors.ownershipPercentage}</p>}
                            </div>
                          </div>
                          {!showSecondOwner && (
                            <div className="pt-4">
                              <Button
                                type="button"
                                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => setShowSecondOwner(true)}
                              >
                                + Add Second Owner
                              </Button>
                            </div>
                          )}

                          {showSecondOwner && (
                            <div className="space-y-3 pt-6 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-orange-400">Second Owner Information</h3>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowSecondOwner(false)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  Remove
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label htmlFor="secondOwnerFirstName">First Name</Label>
                                  <Input
                                    id="secondOwnerFirstName"
                                    name="secondOwnerFirstName"
                                    value={formData.secondOwnerFirstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    className="bg-white border-gray-300 text-gray-900"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="secondOwnerLastName">Last Name</Label>
                                  <Input
                                    id="secondOwnerLastName"
                                    name="secondOwnerLastName"
                                    value={formData.secondOwnerLastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    className="bg-white border-gray-300 text-gray-900"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label htmlFor="secondOwnerPhone">Phone</Label>
                                  <Input
                                    id="secondOwnerPhone"
                                    name="secondOwnerPhone"
                                    type="tel"
                                    value={formData.secondOwnerPhone}
                                    maxLength={14}
                                    onChange={(e) => {
                                      const formatted = formatPhone(e.target.value)
                                      setFormData({ ...formData, secondOwnerPhone: formatted })
                                    }}
                                    placeholder="(XXX) XXX-XXXX"
                                    className="bg-white border-gray-300 text-gray-900"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="secondOwnerDateOfBirth">Date of Birth</Label>
                                  <Input
                                    id="secondOwnerDateOfBirth"
                                    name="secondOwnerDateOfBirth"
                                    type="date"
                                    value={formData.secondOwnerDateOfBirth}
                                    onChange={handleChange}
                                    className="bg-white border-gray-300 text-gray-900"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="secondOwnerSsn">Social Security Number</Label>
                                <Input
                                  id="secondOwnerSsn"
                                  name="secondOwnerSsn"
                                  type="password"
                                  value={formData.secondOwnerSsn}
                                  maxLength={11}
                                  onChange={(e) => {
                                    const formatted = formatSSN(e.target.value)
                                    setFormData({ ...formData, secondOwnerSsn: formatted })
                                  }}
                                  placeholder="XXX-XX-XXXX"
                                  className="bg-white border-gray-300 text-gray-900"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="secondOwnerHomeAddress">Home Street Address</Label>
                                <Input
                                  id="secondOwnerHomeAddress"
                                  name="secondOwnerHomeAddress"
                                  value={formData.secondOwnerHomeAddress}
                                  onChange={handleChange}
                                  placeholder="Enter home address"
                                  className="bg-white border-gray-300 text-gray-900"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="space-y-2">
                                  <Label htmlFor="secondOwnerCity">City</Label>
                                  <Input
                                    id="secondOwnerCity"
                                    name="secondOwnerCity"
                                    value={formData.secondOwnerCity}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                    className="bg-white border-gray-300 text-gray-900"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="secondOwnerState">State</Label>
                                  <Select
                                    onValueChange={(value) => handleSelectChange("secondOwnerState", value)}
                                    value={formData.secondOwnerState}
                                  >
                                    <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                                      <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-300 text-gray-900 max-h-[300px]">
                                      {US_STATES.map((state) => (
                                        <SelectItem key={state} value={state}>
                                          {state}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="secondOwnerZipCode">Zip Code</Label>
                                  <Input
                                    id="secondOwnerZipCode"
                                    name="secondOwnerZipCode"
                                    value={formData.secondOwnerZipCode}
                                    maxLength={10}
                                    onChange={(e) => {
                                      const formatted = formatZipCode(e.target.value)
                                      setFormData({ ...formData, secondOwnerZipCode: formatted })
                                    }}
                                    placeholder="XXXXX"
                                    className="bg-white border-gray-300 text-gray-900"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Credit Score Range</Label>
                                <RadioGroup
                                  value={formData.secondOwnerCreditScore}
                                  onValueChange={(value) => handleSelectChange("secondOwnerCreditScore", value)}
                                  className="grid grid-cols-1 md:grid-cols-3 gap-2"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="excellent"
                                      id="secondOwnerExcellent"
                                      className="border-orange-500 text-orange-500"
                                    />
                                    <Label htmlFor="secondOwnerExcellent" className="cursor-pointer text-base">
                                      Excellent (720+)
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="good"
                                      id="secondOwnerGood"
                                      className="border-orange-500 text-orange-500"
                                    />
                                    <Label htmlFor="secondOwnerGood" className="cursor-pointer text-base">
                                      Good (680-719)
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="fair"
                                      id="secondOwnerFair"
                                      className="border-orange-500 text-orange-500"
                                    />
                                    <Label htmlFor="secondOwnerFair" className="cursor-pointer text-base">
                                      Fair (640-679)
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="poor"
                                      id="secondOwnerPoor"
                                      className="border-orange-500 text-orange-500"
                                    />
                                    <Label htmlFor="secondOwnerPoor" className="cursor-pointer text-base">
                                      Poor (580-639)
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="bad"
                                      id="secondOwnerBad"
                                      className="border-orange-500 text-orange-500"
                                    />
                                    <Label htmlFor="secondOwnerBad" className="cursor-pointer text-base">
                                      Bad (below 580)
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="secondOwnerPercentageOwnership">Percentage Ownership</Label>
                                <Input
                                  id="secondOwnerPercentageOwnership"
                                  name="secondOwnerPercentageOwnership"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={formData.secondOwnerPercentageOwnership}
                                  onChange={handleChange}
                                  placeholder="Enter ownership percentage"
                                  className="bg-white border-gray-300 text-gray-900 pr-8"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                              </div>
                            </div>
                          )}
                        </form>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="font-semibold bg-transparent"
                        >
                          Previous
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            if (DEV_MODE || validateStep3()) {
                              nextStep()
                            }
                          }}
                          disabled={!DEV_MODE && !isStep3Valid}
                          className="bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          Next Step
                        </Button>
                      </CardFooter>
                    </Card>
                  </>
                )}

                {/* Step 4: Review & Submit */}
                {step === 4 && (
                  <>
                    <ConversionTracking
                      eventName="InitiateCheckout"
                      eventData={{ content_type: "application_step_4" }}
                    />
                    
                    {/* Header Card */}
                    <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border-2 border-orange-400">
                      <div className="flex items-start gap-4">
                        {/* Animated Application Icon */}
                        <div className="flex-shrink-0">
                          <svg 
                            className="w-12 h-12 md:w-14 md:h-14" 
                            viewBox="0 0 64 64" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Document background */}
                            <rect 
                              x="12" y="4" width="40" height="56" rx="4" 
                              fill="#fed7aa"
                              className="drop-shadow-lg"
                            />
                            {/* Folded corner */}
                            <path 
                              d="M42 4L52 14H46C43.7909 14 42 12.2091 42 10V4Z" 
                              fill="#fdba74"
                            />
                            <path 
                              d="M42 4V10C42 12.2091 43.7909 14 46 14H52" 
                              stroke="#f97316" 
                              strokeWidth="1.5"
                            />
                            {/* Document lines with staggered animation */}
                            <rect x="20" y="22" width="24" height="3" rx="1.5" fill="#f97316">
                              <animate 
                                attributeName="opacity" 
                                values="0.4;1;0.4" 
                                dur="2s" 
                                repeatCount="indefinite"
                                begin="0s"
                              />
                            </rect>
                            <rect x="20" y="30" width="20" height="3" rx="1.5" fill="#fb923c">
                              <animate 
                                attributeName="opacity" 
                                values="0.4;1;0.4" 
                                dur="2s" 
                                repeatCount="indefinite"
                                begin="0.2s"
                              />
                            </rect>
                            <rect x="20" y="38" width="22" height="3" rx="1.5" fill="#f97316">
                              <animate 
                                attributeName="opacity" 
                                values="0.4;1;0.4" 
                                dur="2s" 
                                repeatCount="indefinite"
                                begin="0.4s"
                              />
                            </rect>
                            <rect x="20" y="46" width="16" height="3" rx="1.5" fill="#fb923c">
                              <animate 
                                attributeName="opacity" 
                                values="0.4;1;0.4" 
                                dur="2s" 
                                repeatCount="indefinite"
                                begin="0.6s"
                              />
                            </rect>
                            {/* Checkmark circle */}
                            <circle cx="48" cy="48" r="12" fill="#22c55e">
                              <animate 
                                attributeName="r" 
                                values="11;12;11" 
                                dur="1.5s" 
                                repeatCount="indefinite"
                              />
                            </circle>
                            {/* Checkmark */}
                            <path 
                              d="M43 48L46 51L53 44" 
                              stroke="white" 
                              strokeWidth="2.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">Review Your Application</h2>
                          <p className="text-gray-600 text-sm md:text-base">Please verify all information is correct before submitting. You can go back to edit any section.</p>
                        </div>
                      </div>
                    </div>

                    {/* Funding Information Section */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden">
                      <div 
                        className="bg-white px-4 md:px-6 py-4 border-b border-gray-200 cursor-pointer"
                        onClick={() => toggleSection('funding')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              {expandedSections.funding ? '1' : <CheckCircleIcon className="h-5 w-5" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">Funding Information</h3>
                              {!expandedSections.funding && (
                                <p className="text-sm text-gray-600">${Number(formData.amountRequested).toLocaleString()} requested</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: "smooth" }); setStep(1); }}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              Edit
                            </Button>
                            <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${expandedSections.funding ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedSections.funding ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="p-4 md:p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Amount Requested</p>
                              <p className="text-xl font-bold text-gray-900">${Number(formData.amountRequested).toLocaleString()}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Use of Funds</p>
                              <p className="text-sm text-gray-700">{formData.useOfFunds}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Business Information Section */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden">
                      <div 
                        className="bg-white px-4 md:px-6 py-4 border-b border-gray-200 cursor-pointer"
                        onClick={() => toggleSection('business')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              {expandedSections.business ? '2' : <CheckCircleIcon className="h-5 w-5" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">Business Information</h3>
                              {!expandedSections.business && (
                                <p className="text-sm text-gray-600">{formData.businessName}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: "smooth" }); setStep(2); }}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              Edit
                            </Button>
                            <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${expandedSections.business ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedSections.business ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="p-4 md:p-6">
                          {/* Business Name Highlight */}
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Legal Business Name</p>
                            <p className="text-lg font-semibold text-gray-900">{formData.businessName}</p>
                            {formData.dba && <p className="text-sm text-gray-600 mt-1">DBA: {formData.dba}</p>}
                          </div>
                          
                          {/* Grid Layout for Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Federal Tax ID (EIN)</p>
                            <p className="text-sm font-medium text-gray-900">{formData.federalTaxId}</p>
                          </div>
                          <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Industry</p>
                            <p className="text-sm font-medium text-gray-900">{formData.industry}</p>
                          </div>
                          <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Entity Type</p>
                            <p className="text-sm font-medium text-gray-900">{formData.entityType || "N/A"}</p>
                          </div>
                          <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Years in Business</p>
                            <p className="text-sm font-medium text-gray-900">{formData.yearsInBusiness} years</p>
                          </div>
                          <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Annual Revenue</p>
                            <p className="text-sm font-medium text-gray-900">{formData.annualRevenue}</p>
                          </div>
                          <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Start Date</p>
                            <p className="text-sm font-medium text-gray-900">{formData.businessStartDate}</p>
                          </div>
                        </div>

                        {/* Contact & Address */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Business Address</p>
                              <p className="text-sm text-gray-900">{formData.businessAddress}</p>
                              <p className="text-sm text-gray-900">{formData.businessCity}, {formData.businessState} {formData.businessZip}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Contact</p>
                              <p className="text-sm text-gray-900">{formData.businessPhone}</p>
                              <p className="text-sm text-gray-900">{formData.businessEmail}</p>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>

                    {/* Primary Owner Section */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden">
                      <div 
                        className="bg-white px-4 md:px-6 py-4 border-b border-gray-200 cursor-pointer"
                        onClick={() => toggleSection('primaryOwner')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              {expandedSections.primaryOwner ? '3' : <CheckCircleIcon className="h-5 w-5" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">Primary Owner</h3>
                              {!expandedSections.primaryOwner && (
                                <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName} ({formData.ownershipPercentage}%)</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: "smooth" }); setStep(3); }}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              Edit
                            </Button>
                            <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${expandedSections.primaryOwner ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedSections.primaryOwner ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="p-4 md:p-6">
                          {/* Owner Name Highlight */}
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Full Name</p>
                            <p className="text-lg font-semibold text-gray-900">{formData.firstName} {formData.lastName}</p>
                            <p className="text-sm text-gray-600 mt-1">{formData.ownershipPercentage}% Ownership</p>
                          </div>

                          {/* Owner Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Phone</p>
                            <p className="text-sm font-medium text-gray-900">{formData.phone}</p>
                          </div>
                          <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
                            <p className="text-sm font-medium text-gray-900">{formData.dateOfBirth}</p>
                          </div>
                          <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">SSN</p>
                            <p className="text-sm font-medium text-gray-900">***-**-{formData.ssn.slice(-4)}</p>
                          </div>
                          <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Credit Score</p>
                            <p className="text-sm font-medium text-gray-900 capitalize">{formData.creditScore}</p>
                          </div>
                        </div>

                        {/* Owner Address */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Home Address</p>
                          <p className="text-sm text-gray-900">{formData.homeAddress}</p>
                          <p className="text-sm text-gray-900">{formData.city}, {formData.state} {formData.zip}</p>
                        </div>
                        </div>
                      </div>
                    </div>

                    {/* Second Owner Section (if applicable) */}
                    {showSecondOwner && (
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden">
                        <div 
                          className="bg-white px-4 md:px-6 py-4 border-b border-gray-200 cursor-pointer"
                          onClick={() => toggleSection('secondOwner')}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                {expandedSections.secondOwner ? '+' : <CheckCircleIcon className="h-5 w-5" />}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Second Owner</h3>
                                {!expandedSections.secondOwner && (
                                  <p className="text-sm text-gray-600">{formData.secondOwnerFirstName} {formData.secondOwnerLastName} ({formData.secondOwnerPercentageOwnership}%)</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: "smooth" }); setStep(3); }}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                Edit
                              </Button>
                              <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${expandedSections.secondOwner ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                        </div>
                        <div className={`transition-all duration-300 ease-in-out ${expandedSections.secondOwner ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                          <div className="p-4 md:p-6">
                            {/* Second Owner Name Highlight */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Full Name</p>
                              <p className="text-lg font-semibold text-gray-900">{formData.secondOwnerFirstName} {formData.secondOwnerLastName}</p>
                              <p className="text-sm text-gray-600 mt-1">{formData.secondOwnerPercentageOwnership}% Ownership</p>
                            </div>

                            {/* Second Owner Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              <div className="p-3 border border-gray-100 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Phone</p>
                                <p className="text-sm font-medium text-gray-900">{formData.secondOwnerPhone}</p>
                              </div>
                              <div className="p-3 border border-gray-100 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
                                <p className="text-sm font-medium text-gray-900">{formData.secondOwnerDateOfBirth}</p>
                              </div>
                              <div className="p-3 border border-gray-100 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">SSN</p>
                                <p className="text-sm font-medium text-gray-900">***-**-{formData.secondOwnerSsn.slice(-4)}</p>
                              </div>
                              <div className="p-3 border border-gray-100 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Credit Score</p>
                                <p className="text-sm font-medium text-gray-900 capitalize">{formData.secondOwnerCreditScore}</p>
                              </div>
                            </div>

                            {/* Second Owner Address */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Home Address</p>
                              <p className="text-sm text-gray-900">{formData.secondOwnerHomeAddress}</p>
                              <p className="text-sm text-gray-900">{formData.secondOwnerCity}, {formData.secondOwnerState} {formData.secondOwnerZipCode}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          disabled={isSubmitting}
                          className="w-full sm:w-auto font-semibold bg-transparent order-2 sm:order-1"
                        >
                          ← Previous Step
                        </Button>
                        <div className="w-full sm:w-auto text-center order-1 sm:order-2">
                          <p className="text-xs text-gray-500 mb-2 hidden sm:block">Ready to submit?</p>
                          <Button
                            type="button"
                            onClick={openSignatureModal}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Submit Application →
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Loading Overlay */}
                    {isSubmitting && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4">
                          {/* Spinner */}
                          <div className="relative">
                            <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                          </div>
                          <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Submitting Application</h3>
                            <p className="text-sm text-gray-600">Please wait while we process your application...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Step 5: Confirmation */}
                {step === 5 && (
                  <>
                    <ConversionTracking
                      eventName="Purchase"
                      eventData={{
                        content_type: "application_submitted",
                        business_name: formData.legalBusinessName,
                        funding_purpose: formData.fundingPurpose,
                        business_type: formData.businessType,
                      }}
                      value={getFundingAmountValue(formData.fundingAmount)}
                      currency="USD"
                    />
                    
                    {/* Success Header Card */}
                    <div className="bg-white rounded-xl p-6 md:p-8 mb-6 shadow-sm border border-gray-200 text-center">
                      <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <CheckCircleIcon className="h-10 w-10 text-green-500" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                      <p className="text-gray-600 text-lg">Thank you for choosing TurboFunding.com</p>
                    </div>

                    {/* Confirmation Details */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 p-6">
                      <div className="text-center mb-6">
                        <p className="text-gray-700 leading-relaxed">
                          We've received your application and our team will review it promptly. 
                          You can expect to hear from one of our funding specialists within <span className="font-semibold text-orange-500">1 business day</span>.
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center gap-3 mb-2">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium text-gray-900">Confirmation Sent</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          A confirmation email has been sent to <span className="font-semibold text-gray-800">{formData.email}</span> with your application details.
                        </p>
                      </div>
                    </div>

                    {/* What Happens Next */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                        <h3 className="text-lg font-semibold text-white">What Happens Next?</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {[
                            { num: 1, title: "Application Review", desc: "Our team will carefully review your application and documents" },
                            { num: 2, title: "Specialist Contact", desc: "A dedicated funding specialist will reach out to discuss your options" },
                            { num: 3, title: "Tailored Solutions", desc: "We'll present you with customized funding solutions that fit your needs" },
                            { num: 4, title: "Fast Funding", desc: "Once approved, funding can be available in as little as 24-48 hours" },
                          ].map(({ num, title, desc }) => (
                            <div key={num} className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                <span className="text-sm font-bold text-orange-600">{num}</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{title}</h4>
                                <p className="text-sm text-gray-600">{desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Speed Up Your Approval - Prominent CTA */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 md:p-6 mb-6 shadow-lg shadow-blue-500/20">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-lg mb-1">Speed Up Your Approval!</h4>
                          <p className="text-blue-100 text-sm">
                            Upload your bank statements and business documents now to expedite your review and get funded faster.
                          </p>
                        </div>
                        <Button 
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" })
                            setStep(6)
                          }} 
                          className="hidden sm:flex bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2 shadow-md"
                        >
                          Upload Now →
                        </Button>
                      </div>
                      {/* Mobile Upload Button */}
                      <Button 
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" })
                          setStep(6)
                        }} 
                        className="sm:hidden w-full mt-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3"
                      >
                        Upload Documents Now →
                      </Button>
                    </div>

                    {/* Other Actions */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6">
                      <div className="space-y-3">
                        {/* Download PDF */}
                        <Button
                          onClick={handleDownloadPDF}
                          disabled={isDownloadingPDF}
                          className="w-full btn-gold-elite text-white font-semibold py-3 disabled:opacity-70"
                        >
                          {isDownloadingPDF ? (
                            <span className="flex items-center justify-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Generating PDF...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download Application PDF
                            </span>
                          )}
                        </Button>
                        
                        {/* Secondary Action */}
                        <Button
                          onClick={() => {
                            setStep(1)
                            router.push("/")
                          }}
                          variant="outline"
                          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3"
                        >
                          Return to Home
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 6: Documents */}
                {step === 6 && (
                  <>
                    <ConversionTracking eventName="AddPaymentInfo" eventData={{ content_type: "application_step_6" }} />
                    
                    {/* Header Card */}
                    <div className="bg-white rounded-xl p-6 md:p-8 mb-6 shadow-sm border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="w-7 h-7 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Upload Documents</h2>
                          <p className="text-gray-600 text-sm md:text-base">
                            Speed up your approval by uploading your business documents now. This helps us process your application faster.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Debug Info - TODO: Remove in production */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-xs font-mono">
                      <p><strong>Debug (remove later):</strong></p>
                      <p>Folder: {applicationFolderPath || "Not set"}</p>
                      <p>Bank Statements: {formData.bankStatements ? `${formData.bankStatements.name} (${formData.bankStatements.size} bytes)` : "null"}</p>
                      <p>Other Docs: {formData.otherDocuments ? `${formData.otherDocuments.name} (${formData.otherDocuments.size} bytes)` : "null"}</p>
                    </div>

                    {/* Bank Statements Upload */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 md:px-6 py-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="font-semibold text-white">Bank Statements</h3>
                          <span className="ml-auto text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">Required</span>
                        </div>
                      </div>
                      <div className="p-4 md:p-6">
                        <p className="text-sm text-gray-600 mb-4">
                          Please upload your <span className="font-semibold">last 3 months</span> of business bank statements.
                          <span className="text-orange-600 font-medium"> California applicants: Last 4 months required.</span>
                        </p>
                        <div className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-all duration-200 ${
                          formData.bankStatements 
                            ? 'border-green-400 bg-green-50' 
                            : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50/50'
                        }`}>
                          <Input
                            id="bankStatements"
                            name="bankStatements"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <Label
                            htmlFor="bankStatements"
                            className="cursor-pointer flex flex-col items-center space-y-3"
                          >
                            {formData.bankStatements ? (
                              <>
                                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                                  <CheckCircleIcon className="h-8 w-8 text-green-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-green-700">{formData.bankStatements.name}</p>
                                  <p className="text-xs text-green-600 mt-1">File uploaded successfully • Click to replace</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
                                  <UploadIcon className="h-7 w-7 text-orange-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                                </div>
                              </>
                            )}
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Other Documents Upload */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden">
                      <div className="bg-gray-100 px-4 md:px-6 py-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                          </svg>
                          <h3 className="font-semibold text-gray-700">Other Documents</h3>
                          <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Optional</span>
                        </div>
                      </div>
                      <div className="p-4 md:p-6">
                        <p className="text-sm text-gray-600 mb-4">
                          Additional documents that may help expedite your application (business licenses, tax returns, etc.)
                        </p>
                        <div className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-all duration-200 ${
                          formData.otherDocuments 
                            ? 'border-green-400 bg-green-50' 
                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
                        }`}>
                          <Input
                            id="otherDocuments"
                            name="otherDocuments"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <Label
                            htmlFor="otherDocuments"
                            className="cursor-pointer flex flex-col items-center space-y-3"
                          >
                            {formData.otherDocuments ? (
                              <>
                                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                                  <CheckCircleIcon className="h-8 w-8 text-green-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-green-700">{formData.otherDocuments.name}</p>
                                  <p className="text-xs text-green-600 mt-1">File uploaded successfully • Click to replace</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                                  <UploadIcon className="h-7 w-7 text-gray-400" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                                </div>
                              </>
                            )}
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Document Guidelines */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
                      <div className="bg-blue-50 px-4 md:px-6 py-3 border-b border-blue-100">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h3 className="font-semibold text-blue-700">Document Guidelines</h3>
                        </div>
                      </div>
                      <div className="p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "All documents should be clear and legible" },
                            { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", text: "Bank statements must show business name" },
                            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "Documents can be uploaded later if needed" },
                            { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", text: "Additional docs may be required per product" },
                          ].map(({ icon, text }, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                              <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                              </svg>
                              <span className="text-sm text-gray-700">{text}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-orange-600 border-orange-300 hover:bg-orange-50"
                            onClick={() => window.open("/documents-needed", "_blank")}
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Documents Needed for Different Products
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setStep(5); }}
                          className="w-full sm:w-auto font-semibold bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 order-2 sm:order-1"
                        >
                          <ArrowLeftIcon className="mr-2 h-4 w-4" />
                          Back to Confirmation
                        </Button>
                        <div className="w-full sm:w-auto text-center order-1 sm:order-2">
                          <Button 
                            type="button"
                            onClick={handleDocumentUpload} 
                            disabled={isUploadingDocs}
                            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 shadow-lg shadow-green-500/25 disabled:opacity-50"
                          >
                            {isUploadingDocs ? (
                              <>
                                <svg className="animate-spin mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                              </>
                            ) : (
                              <>
                                <CheckCircleIcon className="mr-2 h-5 w-5" />
                                Complete Upload
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
