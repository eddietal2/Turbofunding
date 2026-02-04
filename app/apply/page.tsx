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
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, UploadIcon, XIcon } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { ConversionTracking } from "@/components/conversion-tracking"
import { submitApplication } from "@/lib/actions/submit-application"
import { downloadApplicationPDF } from "@/lib/actions/download-application-pdf"

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
const DEV_MODE = false

const devFormData = {
  // Step 1: Funding Information
  amountRequested: "50000",
  useOfFunds: "expansion",
  // Step 2: Business Information
  businessName: "Test Business LLC",
  dba: "Test DBA",
  federalTaxId: "12-3456789",
  entityType: "LLC",
  businessStartDate: "2020-01-15",
  yearsInBusiness: "5",
  annualRevenue: "250001-500000",
  industry: "Retail",
  businessAddress: "123 Business St",
  businessCity: "Los Angeles",
  businessState: "California",
  businessZip: "90001",
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
  creditScore: "good",
  ownershipPercentage: "100",
}

const getInitialFormData = () => ({
  // Business Information
  legalBusinessName: "",
  dbaName: "",
  federalTaxId: DEV_MODE ? devFormData.federalTaxId : "",
  businessType: "",
  yearsInBusiness: DEV_MODE ? devFormData.yearsInBusiness : "",
  annualRevenue: DEV_MODE ? devFormData.annualRevenue : "",
  stateIncorporated: "",
  industry: DEV_MODE ? devFormData.industry : "",
  businessAddress: DEV_MODE ? devFormData.businessAddress : "",
  businessCity: DEV_MODE ? devFormData.businessCity : "",
  businessState: DEV_MODE ? devFormData.businessState : "",
  businessZipCode: "",
  // Personal Owner Information
  firstName: DEV_MODE ? devFormData.firstName : "",
  lastName: DEV_MODE ? devFormData.lastName : "",
  phone: DEV_MODE ? devFormData.phone : "",
  dateOfBirth: DEV_MODE ? devFormData.dateOfBirth : "",
  ssn: DEV_MODE ? devFormData.ssn : "",
  homeAddress: DEV_MODE ? devFormData.homeAddress : "",
  city: DEV_MODE ? devFormData.city : "",
  state: DEV_MODE ? devFormData.state : "",
  zipCode: "",
  creditScore: DEV_MODE ? devFormData.creditScore : "",
  percentageOwnership: "",
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
  fundingAmount: "",
  fundingPurpose: "",
  additionalInfo: "",
  signature: "",
  secondOwnerSignature: "",
  signatureDate: "",
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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showDraftModal, setShowDraftModal] = useState(false)
  const [draftLoaded, setDraftLoaded] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [formData, setFormData] = useState(getInitialFormData())

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
    setFormData((prev) => ({ ...prev, [name]: files?.[0] ?? null }))
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
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault()
    console.log("[v0] Form submission started")
    console.log("[v0] Submitting application with data:", formData)

    try {
      console.log("[v0] Calling submitApplication...")
      const result = await submitApplication(formData)
      console.log("[v0] Submit result:", result)

      if (result.success) {
        console.log("[v0] Application submitted successfully!")
        clearDraft() // Clear draft after successful submission
        nextStep()
      } else {
        console.error("[v0] Application submission failed:", result.error)
        alert(
          `Application submission failed:\n\n${result.error}\n\nPlease try again or contact support at vivsin1995@gmail.com`,
        )
      }
    } catch (error: any) {
      console.error("[v0] Error in handleSubmit:", error)
      console.error("[v0] Error details:", error.message, error.stack)
      alert(
        `An unexpected error occurred:\n\n${error.message}\n\nPlease contact support at vivsin1995@gmail.com with this error message.`,
      )
    }
  }

  const handleDocumentUpload = () => {
    router.push("/apply/success")
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
        link.download = `TurboFunding_Application_${formData.legalBusinessName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
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
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <CheckCircleIcon className="h-6 w-6 text-orange-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Welcome Back!</h2>
            </div>
            <p className="text-gray-600 mb-6">
              We found a saved draft of your funding application. Would you like to continue where you left off or start a new application?
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

      <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0D1B2A]">
          <div className="container flex h-16 items-center">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center gap-1 text-xl font-bold tracking-tighter"
                aria-label="TurboFunding.com Home"
              >
                <Image
                  src="/images/turbofunding-logo.png"
                  alt="TurboFunding Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
                <span className="text-orange-500">Turbo</span>
                <span className="text-blue-600">Funding</span>
                <span className="text-white">.com</span>
              </Link>
            </div>
            {/* Desktop Navigation - Centered */}
            <nav
              className="hidden md:flex gap-6 absolute left-1/2 transform -translate-x-1/2"
              role="navigation"
              aria-label="Main navigation"
            >
              <Link href="/" className="text-sm font-medium text-white hover:text-orange-500 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-sm font-medium text-white hover:text-orange-500 transition-colors">
                Products
              </Link>
              <Link
                href="/industries"
                className="text-sm font-medium text-white hover:text-orange-500 transition-colors"
              >
                Industries
              </Link>
              <Link href="/team" className="text-sm font-medium text-white hover:text-orange-500 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-sm font-medium text-white hover:text-orange-500 transition-colors">
                Contact
              </Link>
              <Link href="/apply" className="text-sm font-medium text-orange-500 transition-colors">
                Apply
              </Link>
            </nav>
            <div className="hidden md:flex items-center gap-4 ml-auto">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/apply">Apply Now</Link>
              </Button>
            </div>
            <MobileNav currentPage="/apply" />
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-4 md:py-8 bg-gray-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center text-center mt-2">
                <Link href="/" className="flex items-center text-orange-400 hover:text-orange-300 mb-2">
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-500 mt-2">
                  Business Funding Application
                </h1>
                <p className="max-w-[700px] text-orange-400 md:text-xl mt-2">
                  Complete the application below to get started with your business funding solution.
                </p>
              </div>
            </div>
          </section>

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
                  <div className="flex justify-between">
                    <div className={`text-center ${step >= 1 ? "text-orange-500" : "text-gray-500"}`}>
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-orange-500 bg-orange-500/20" : "border-gray-300"}`}
                      >
                        {step > 1 ? <CheckCircleIcon className="h-5 w-5" /> : 1}
                      </div>
                      <p className="mt-2 text-xs md:text-sm text-gray-700">Funding Info</p>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className={`h-1 w-full ${step >= 2 ? "bg-orange-500" : "bg-gray-300"}`}></div>
                    </div>
                    <div className={`text-center ${step >= 2 ? "text-orange-500" : "text-gray-500"}`}>
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-orange-500 bg-orange-500/20" : "border-gray-300"}`}
                      >
                        {step > 2 ? <CheckCircleIcon className="h-5 w-5" /> : 2}
                      </div>
                      <p className="mt-2 text-xs md:text-sm text-gray-700">Business Info</p>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className={`h-1 w-full ${step >= 3 ? "bg-orange-500" : "bg-gray-300"}`}></div>
                    </div>
                    <div className={`text-center ${step >= 3 ? "text-orange-500" : "text-gray-500"}`}>
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-orange-500 bg-orange-500/20" : "border-gray-300"}`}
                      >
                        {step > 3 ? <CheckCircleIcon className="h-5 w-5" /> : 3}
                      </div>
                      <p className="mt-2 text-xs md:text-sm text-gray-700">Owner Info</p>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className={`h-1 w-full ${step >= 4 ? "bg-orange-500" : "bg-gray-300"}`}></div>
                    </div>
                    <div className={`text-center ${step >= 4 ? "text-orange-500" : "text-gray-500"}`}>
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${step >= 4 ? "border-orange-500 bg-orange-500/20" : "border-gray-300"}`}
                      >
                        {step > 4 ? <CheckCircleIcon className="h-5 w-5" /> : 4}
                      </div>
                      <p className="mt-2 text-xs md:text-sm text-gray-700">Signature</p>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className={`h-1 w-full ${step >= 5 ? "bg-orange-500" : "bg-gray-300"}`}></div>
                    </div>
                    <div className={`text-center ${step >= 5 ? "text-orange-500" : "text-gray-500"}`}>
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${step >= 5 ? "border-orange-500 bg-orange-500/20" : "border-gray-300"}`}
                      >
                        {step > 5 ? <CheckCircleIcon className="h-5 w-5" /> : 5}
                      </div>
                      <p className="mt-2 text-xs md:text-sm text-gray-700">Confirmation</p>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className={`h-1 w-full ${step >= 6 ? "bg-orange-500" : "bg-gray-300"}`}></div>
                    </div>
                    <div className={`text-center ${step >= 6 ? "text-orange-500" : "text-gray-500"}`}>
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${step >= 6 ? "border-orange-500 bg-orange-500/20" : "border-gray-300"}`}
                      >
                        {step > 6 ? <CheckCircleIcon className="h-5 w-5" /> : 6}
                      </div>
                      <p className="mt-2 text-xs md:text-sm text-gray-700">Documents</p>
                    </div>
                  </div>
                </div>

                {/* Step 1: Funding Information */}
                {step === 1 && (
                  <>
                    <ConversionTracking eventName="AddPaymentInfo" eventData={{ content_type: "application_step_1" }} />
                    <Card className="bg-white border-gray-200">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl text-orange-500">Funding Information</CardTitle>
                        <CardDescription className="text-gray-600">Tell us about your funding needs.</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
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
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl text-orange-500">Business Information</CardTitle>
                        <CardDescription className="text-gray-600">
                          Tell us about your business to help us find the right funding solution.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
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
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl text-orange-500">Owner Information</CardTitle>
                        <CardDescription className="text-gray-600">Please provide owner information.</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
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
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
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
                                  onChange={handleChange}
                                  placeholder="Enter SSN"
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
                                    onChange={handleChange}
                                    placeholder="Enter zip code"
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
                    <Card className="bg-white border-gray-200">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl text-orange-500">Review & Submit</CardTitle>
                        <CardDescription className="text-gray-600">
                          Please review your information before submitting.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-semibold mb-2 text-orange-400">Funding Information</h3>
                            <dl className="space-y-1 text-sm text-gray-700">
                              <div className="flex justify-between">
                                <dt className="font-medium">Amount Requested:</dt>
                                <dd>${Number(formData.amountRequested).toLocaleString()}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Use of Funds:</dt>
                                <dd className="text-right max-w-xs">{formData.useOfFunds}</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2 text-orange-400">Business Information</h3>
                            <dl className="space-y-1 text-sm text-gray-700">
                              <div className="flex justify-between">
                                <dt className="font-medium">Legal Business Name:</dt>
                                <dd>{formData.businessName}</dd>
                              </div>
                              {formData.dba && (
                                <div className="flex justify-between">
                                  <dt className="font-medium">DBA:</dt>
                                  <dd>{formData.dba}</dd>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <dt className="font-medium">Federal Tax ID (EIN):</dt>
                                <dd>{formData.federalTaxId}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Business Address:</dt>
                                <dd>{formData.businessAddress}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">City:</dt>
                                <dd>{formData.businessCity}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">State:</dt>
                                <dd>{formData.businessState}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Zip Code:</dt>
                                <dd>{formData.businessZip}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Business Phone:</dt>
                                <dd>{formData.businessPhone}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Business Email:</dt>
                                <dd>{formData.businessEmail}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Industry:</dt>
                                <dd>{formData.industry}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Business Start Date:</dt>
                                <dd>{formData.businessStartDate}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Entity Type:</dt>
                                <dd>{formData.entityType}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Years in Business:</dt>
                                <dd>{formData.yearsInBusiness}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Annual Revenue:</dt>
                                <dd>{formData.annualRevenue}</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2 text-orange-400">Primary Owner Information</h3>
                            <dl className="space-y-1 text-sm text-gray-700">
                              <div className="flex justify-between">
                                <dt className="font-medium">First Name:</dt>
                                <dd>{formData.firstName}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Last Name:</dt>
                                <dd>{formData.lastName}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Phone:</dt>
                                <dd>{formData.phone}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Date of Birth:</dt>
                                <dd>{formData.dateOfBirth}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Social Security Number:</dt>
                                <dd>****-**-{formData.ssn.slice(-4)}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Home Street Address:</dt>
                                <dd>{formData.homeAddress}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">City:</dt>
                                <dd>{formData.city}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">State:</dt>
                                <dd>{formData.state}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Zip Code:</dt>
                                <dd>{formData.zip}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Credit Score Range:</dt>
                                <dd>{formData.creditScore}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Percentage Ownership:</dt>
                                <dd>{formData.ownershipPercentage}%</dd>
                              </div>
                            </dl>
                          </div>

                          {showSecondOwner && (
                            <div className="border-t pt-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold mb-2 text-orange-400">Second Owner Information</h3>
                              </div>
                              <dl className="space-y-1 text-sm text-gray-700">
                                <div className="flex justify-between">
                                  <dt className="font-medium">First Name:</dt>
                                  <dd>{formData.secondOwnerFirstName}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="font-medium">Last Name:</dt>
                                  <dd>{formData.secondOwnerLastName}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="font-medium">Phone:</dt>
                                  <dd>{formData.secondOwnerPhone}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="font-medium">Date of Birth:</dt>
                                  <dd>{formData.secondOwnerDateOfBirth}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="font-medium">Social Security Number:</dt>
                                  <dd>****-**-{formData.secondOwnerSsn.slice(-4)}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="font-medium">Home Street Address:</dt>
                                  <dd>{formData.secondOwnerHomeAddress}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="font-medium">City:</dt>
                                  <dd>{formData.secondOwnerCity}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="font-medium">State:</dt>
                                  <dd>{formData.secondOwnerState}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="font-medium">Zip Code:</dt>
                                  <dd>{formData.secondOwnerZipCode}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="font-medium">Credit Score Range:</dt>
                                  <dd>{formData.secondOwnerCreditScore}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="font-medium">Percentage Ownership:</dt>
                                  <dd>{formData.secondOwnerPercentageOwnership}%</dd>
                                </div>
                              </dl>
                            </div>
                          )}
                        </div>
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
                          onClick={handleSubmit}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          Submit Application
                        </Button>
                      </CardFooter>
                    </Card>
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
                    {/* Changed card background from bg-white to bg-[#F5F7FA] */}
                    <Card className="bg-[#F5F7FA] border-gray-200">
                      <CardHeader className="text-center pb-3">
                        <div className="mx-auto w-14 h-14 rounded-full bg-green-900/20 flex items-center justify-center mb-3">
                          <CheckCircleIcon className="h-8 w-8 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl text-orange-500">Application Submitted!</CardTitle>
                        <CardDescription className="text-gray-600">
                          Thank you for applying for funding with TurboFunding.com.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center pt-0">
                        <div className="space-y-3">
                          <p className="text-gray-700">
                            We've received your application and our team will review it promptly. You can expect to hear
                            from one of our funding specialists within 1 business day.
                          </p>
                          <p className="text-gray-700">
                            A confirmation email has been sent to{" "}
                            <span className="font-semibold text-gray-800">{formData.email}</span> with details about
                            your application.
                          </p>
                          <div className="bg-gray-100 rounded-lg p-3 mt-4">
                            <h3 className="text-lg font-medium text-orange-400 mb-2">What happens next?</h3>
                            <ol className="text-left space-y-1 text-gray-700">
                              <li className="flex items-start">
                                <span className="mr-2">1.</span>
                                <span>Our team will review your application</span>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">2.</span>
                                <span>A funding specialist will contact you to discuss options</span>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">3.</span>
                                <span>We'll present you with tailored funding solutions</span>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">4.</span>
                                <span>Once approved, funding can be available in as little as 24-48 hours</span>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-3 pt-3">
                        <Button
                          onClick={handleDownloadPDF}
                          disabled={isDownloadingPDF}
                          className="w-full bg-orange-600 hover:bg-orange-700"
                        >
                          {isDownloadingPDF ? "Generating PDF..." : "Download Application PDF"}
                        </Button>
                        <div className="flex gap-3 w-full">
                          <Button onClick={() => setStep(6)} className="flex-1 bg-blue-600 hover:bg-blue-700">
                            Upload Documents
                          </Button>
                          <Button
                            onClick={() => {
                              setStep(1)
                              router.push("/")
                            }}
                            variant="outline"
                            className="flex-1 border-blue-600 text-blue-400 hover:bg-blue-700 hover:text-gray-200 font-semibold"
                          >
                            Return to Home
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </>
                )}

                {/* Step 6: Documents */}
                {step === 6 && (
                  <>
                    <ConversionTracking eventName="AddPaymentInfo" eventData={{ content_type: "application_step_6" }} />
                    {/* Changed card background from bg-white to bg-[#F5F7FA] */}
                    <Card className="bg-[#F5F7FA] border-gray-200">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl text-orange-500">Document Upload</CardTitle>
                        <CardDescription className="text-gray-600">
                          Upload supporting documents to expedite your application review process.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <form className="space-y-4">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="bankStatements">
                                Bank Statements - 3 Months (Most Recent) (California: Last 4 months)
                              </Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
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
                                  className="cursor-pointer flex flex-col items-center space-y-2"
                                >
                                  <UploadIcon className="h-8 w-8 text-gray-400" />
                                  <span className="text-sm text-gray-500">
                                    {formData.bankStatements
                                      ? formData.bankStatements.name
                                      : "Click to upload or drag and drop"}
                                  </span>
                                  <span className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</span>
                                </Label>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="otherDocuments">Other Supporting Documents (Optional)</Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
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
                                  className="cursor-pointer flex flex-col items-center space-y-2"
                                >
                                  <UploadIcon className="h-8 w-8 text-gray-400" />
                                  <span className="text-sm text-gray-500">
                                    {formData.otherDocuments
                                      ? formData.otherDocuments.name
                                      : "Click to upload or drag and drop"}
                                  </span>
                                  <span className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</span>
                                </Label>
                              </div>
                            </div>

                            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-blue-700 mb-2">Document Guidelines:</h4>
                              <ul className="text-xs text-gray-700 space-y-1">
                                <li>• All documents should be clear and legible</li>
                                <li>• Bank statements must show business name and account activity</li>
                                <li>• Documents can be uploaded later if not available now</li>
                                <li>• Depending on the product, additional documentation may be required</li>
                              </ul>
                              <div className="mt-3 pt-3 border-t border-blue-300">
                                <Button
                                  size="sm"
                                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs"
                                  onClick={() => window.open("/documents-needed", "_blank")}
                                >
                                  Documents Needed for Different Products
                                </Button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setStep(5)}
                          className="border-blue-600 text-blue-400 hover:bg-blue-700 hover:text-gray-200 bg-transparent font-semibold"
                        >
                          <ArrowLeftIcon className="mr-2 h-4 w-4" />
                          Back to Confirmation
                        </Button>
                        <Button onClick={handleDocumentUpload} className="bg-blue-600 hover:bg-blue-700">
                          Complete Upload
                        </Button>
                      </CardFooter>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 md:py-8 bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="space-y-3 text-center">
                <h3 className="text-sm font-semibold text-white mb-3">About Us</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/team" className="hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="tel:8778383919" className="hover:text-white transition-colors">
                      (877) 838-3919
                    </Link>
                  </li>
                  <li>
                    <Link href="mailto:inquiries@turbofunding.com" className="hover:text-white transition-colors">
                      inquiries@turbofunding.com
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4 pt-2">
                <Link href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.766-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.072 1.646.072 4.947s-.015 3.585-.072 4.85c-.061 1.17-.256 1.805-.421 2.227-.562.224-.96.479-1.382.896-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.382-.899-.419-.42-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235.045-.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs">© {new Date().getFullYear()} TurboFunding.com. All rights reserved.</p>
              <div className="flex gap-4 text-xs">
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
                <span>·</span>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <span>·</span>
                <Link href="#" className="hover:text-white transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
