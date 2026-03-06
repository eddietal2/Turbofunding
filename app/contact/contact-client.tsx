"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, CheckCircleIcon, CalendarIcon, ArrowRightIcon, SendIcon, BuildingIcon, SparklesIcon, AlertCircleIcon, AlertTriangleIcon } from "lucide-react"
import { sendContactEmail } from "@/lib/actions/send-contact-email"

const MAX_MESSAGE_LENGTH = 1000
const MIN_NAME_LENGTH = 2
const MIN_MESSAGE_LENGTH = 10
const PHONE_PATTERN = /^[\d+\-().\s]*$/

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

// Format phone number as user types: (555) 000-0000
const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "")
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
  
  if (!match) return value
  const [, area, exchange, line] = match
  
  if (!exchange) return area
  if (!line) return `(${area}) ${exchange}`
  return `(${area}) ${exchange}-${line}`
}

// Validate phone number (10 digits)
const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, "")
  return cleaned.length === 10
}

// Validate email
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Handle phone formatting
    if (name === "phone") {
      const formatted = formatPhoneNumber(value)
      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }
    
    // Handle message character limit
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) {
      return
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    
    // Validate form data
    if (formData.name.trim().length < MIN_NAME_LENGTH) {
      setError("Name must be at least 2 characters long")
      return
    }
    
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address")
      return
    }
    
    if (formData.phone && !isValidPhone(formData.phone)) {
      setError("Please enter a valid 10-digit phone number")
      return
    }
    
    if (!formData.subject) {
      setError("Please select a subject")
      return
    }
    
    if (formData.message.trim().length < MIN_MESSAGE_LENGTH) {
      setError("Message must be at least 10 characters long")
      return
    }
    
    if (formData.message.length > MAX_MESSAGE_LENGTH) {
      setError("Message exceeds maximum length")
      return
    }
    
    setIsSubmitting(true)

    try {
      console.log("[Contact] ===== Starting Form Submission =====")
      console.log("[Contact] Form data:", formData)
      const result = await sendContactEmail(formData)
      console.log("[Contact] Server response:", result)

      if (result.success) {
        console.log("[Contact] ✅ Form submitted successfully!")
        console.log("[Contact] Message ID:", result.messageId)
        setFormSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        console.error("[Contact] ❌ Submission failed:", result.error)
        setError(result.error || "Failed to send message. Please try again.")
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred"
      console.error("[Contact] ❌ Error submitting form:", err)
      setError(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col" style={{ color: "#0D1B2A" }}>
      <main className="flex-1">

        {/* ===== HERO SECTION ===== */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.03]" />
          </div>

          <div className="relative container px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <SparklesIcon className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300 font-medium">We respond within 1 business day</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-space-grotesk">
                Let's Talk <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Funding</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-8">
                Schedule a personalized call with our team to discuss your funding options and accelerate your application.
              </p>
              <Link href="https://calendly.com/vivek-turbofunding" target="_blank" rel="noopener noreferrer">
                <Button className="btn-blue-elite text-white px-8 py-3 text-lg font-semibold rounded-xl hover:shadow-lg transition-all group h-auto">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Book a Call
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== CONTACT CARDS STRIP ===== */}
        <section className="relative z-10 -mt-8 pb-4">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {/* Office */}
              <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                  <MapPinIcon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 font-space-grotesk">Main Office</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  575 Lexington Ave, Fl 17,<br />New York, NY 10022
                </p>
              </div>

              {/* Phone */}
              <a href="tel:(937)-751-6937" className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all p-5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
                  <PhoneIcon className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 font-space-grotesk">Phone</h3>
                <p className="text-gray-500 text-sm group-hover:text-orange-600 transition-colors">(937) 751-6937</p>
              </a>

              {/* Email */}
              <a href="mailto:help@turbofunding.com" className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                  <MailIcon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 font-space-grotesk">Email</h3>
                <p className="text-gray-500 text-sm group-hover:text-blue-600 transition-colors">help@turbofunding.com</p>
              </a>

              {/* Hours */}
              <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                  <ClockIcon className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 font-space-grotesk">Business Hours</h3>
                <p className="text-gray-500 text-sm">Always Open</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FORM + FUNDING HOTLINE SECTION ===== */}
        <section className="w-full py-8 md:py-16 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-5 max-w-6xl mx-auto">

              {/* Contact Form — takes 3 cols */}
              <div className="lg:col-span-3">
                {!formSubmitted ? (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-1 font-space-grotesk">Send Us a Message</h2>
                      <p className="text-gray-500 text-sm">Fill out the form below and we'll get back to you as soon as possible.</p>
                    </div>

                    {error && (
                      <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3">
                        <AlertCircleIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-red-900 font-medium text-sm">Error sending message</p>
                          <p className="text-red-700 text-sm mt-0.5">{error}</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              className={`bg-gray-50 border-gray-200 rounded-xl h-11 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all ${
                                formData.name.length > 0 && formData.name.length < MIN_NAME_LENGTH ? "border-red-300" : ""
                              }`}
                              style={{ color: "#0D1B2A" }}
                              required
                            />
                            {formData.name.length > 0 && formData.name.length < MIN_NAME_LENGTH && (
                              <AlertTriangleIcon className="absolute right-3 top-3 h-5 w-5 text-red-500" />
                            )}
                          </div>
                          {formData.name.length > 0 && formData.name.length < MIN_NAME_LENGTH && (
                            <p className="text-xs text-red-600">Minimum 2 characters required</p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@company.com"
                              className={`bg-gray-50 border-gray-200 rounded-xl h-11 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all ${
                                formData.email.length > 0 && !isValidEmail(formData.email) ? "border-red-300" : ""
                              }`}
                              style={{ color: "#0D1B2A" }}
                              required
                            />
                            {formData.email.length > 0 && !isValidEmail(formData.email) && (
                              <AlertTriangleIcon className="absolute right-3 top-3 h-5 w-5 text-red-500" />
                            )}
                          </div>
                          {formData.email.length > 0 && !isValidEmail(formData.email) && (
                            <p className="text-xs text-red-600">Please enter a valid email</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="(555) 000-0000"
                              className={`bg-gray-50 border-gray-200 rounded-xl h-11 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all ${
                                formData.phone.length > 0 && !isValidPhone(formData.phone) ? "border-orange-300" : ""
                              }`}
                              style={{ color: "#0D1B2A" }}
                              maxLength={14}
                            />
                            {formData.phone.length > 0 && !isValidPhone(formData.phone) && (
                              <AlertTriangleIcon className="absolute right-3 top-3 h-5 w-5 text-orange-500" />
                            )}
                          </div>
                          {formData.phone.length > 0 && !isValidPhone(formData.phone) && (
                            <p className="text-xs text-orange-600">Enter 10 digits for a valid US number</p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                            Subject <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            onValueChange={(value) => handleSelectChange("subject", value)}
                            value={formData.subject}
                          >
                            <SelectTrigger className={`bg-gray-50 border-gray-200 rounded-xl h-11 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all ${
                              formData.subject === "" ? "" : ""
                            }`}>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-200 rounded-xl">
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="funding">Funding Options</SelectItem>
                              <SelectItem value="application">Application Status</SelectItem>
                              <SelectItem value="support">Customer Support</SelectItem>
                              <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                            Message <span className="text-red-500">*</span>
                          </Label>
                          <span className={`text-xs ${formData.message.length > MAX_MESSAGE_LENGTH * 0.9 ? "text-orange-600 font-medium" : "text-gray-500"}`}>
                            {formData.message.length} / {MAX_MESSAGE_LENGTH}
                          </span>
                        </div>
                        <div className="relative">
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="How can we help you?"
                            className={`bg-gray-50 border-gray-200 rounded-xl min-h-[140px] focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all resize-none ${
                              formData.message.length > 0 && formData.message.length < MIN_MESSAGE_LENGTH ? "border-red-300" : ""
                            }`}
                            style={{ color: "#0D1B2A" }}
                            maxLength={MAX_MESSAGE_LENGTH}
                            required
                          />
                        </div>
                        {formData.message.length > 0 && formData.message.length < MIN_MESSAGE_LENGTH && (
                          <p className="text-xs text-red-600">Message must be at least 10 characters</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        disabled={
                          isSubmitting || 
                          !formData.name || 
                          !formData.email || 
                          !formData.subject ||
                          !formData.message ||
                          formData.name.length < MIN_NAME_LENGTH ||
                          !isValidEmail(formData.email) ||
                          (formData.phone.length > 0 && !isValidPhone(formData.phone)) ||
                          formData.message.length < MIN_MESSAGE_LENGTH
                        }
                        className="btn-blue-elite w-full text-white font-semibold rounded-xl h-12 text-base group disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <SendIcon className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                        {!isSubmitting && <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12">
                    <div className="text-center">
                      <div className="mx-auto w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-5">
                        <CheckCircleIcon className="h-8 w-8 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 font-space-grotesk">Message Sent!</h2>
                      <p className="text-gray-500 mb-2">
                        Thank you for reaching out to TurboFunding.com.
                      </p>
                      <p className="text-gray-600 mb-6" style={{ color: "#0D1B2A" }}>
                        We've received your message and will get back to you as soon as possible, usually within 1 business day.
                      </p>
                      <Button
                        onClick={() => setFormSubmitted(false)}
                        className="btn-blue-elite text-white font-semibold rounded-xl h-11 px-6"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right sidebar — takes 2 cols */}
              <div className="lg:col-span-2 space-y-6">

                {/* Need Funding Fast Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-6 md:p-8">
                  {/* Decorative glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
                  
                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 mb-4">
                      <PhoneIcon className="h-3.5 w-3.5 text-orange-400" />
                      <span className="text-xs font-semibold text-orange-400 tracking-wide uppercase">Funding Hotline</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 font-space-grotesk">Need Funding Fast?</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      If you need immediate assistance or want to fast-track your funding application, call our dedicated funding hotline.
                    </p>

                    <a
                      href="tel:(937)-751-6937"
                      className="flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 rounded-xl p-4 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <PhoneIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-0.5">Call us now</p>
                        <p className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">(937) 751-6937</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
