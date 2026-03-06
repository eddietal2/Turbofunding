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
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, CheckCircleIcon, CalendarIcon, ArrowRightIcon, SendIcon, BuildingIcon, SparklesIcon } from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    setFormSubmitted(true)
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

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="bg-gray-50 border-gray-200 rounded-xl h-11 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                            style={{ color: "#0D1B2A" }}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className="bg-gray-50 border-gray-200 rounded-xl h-11 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                            style={{ color: "#0D1B2A" }}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 000-0000"
                            className="bg-gray-50 border-gray-200 rounded-xl h-11 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                            style={{ color: "#0D1B2A" }}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</Label>
                          <Select
                            onValueChange={(value) => handleSelectChange("subject", value)}
                            value={formData.subject}
                          >
                            <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl h-11 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all">
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
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          className="bg-gray-50 border-gray-200 rounded-xl min-h-[140px] focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all resize-none"
                          style={{ color: "#0D1B2A" }}
                          required
                        />
                      </div>

                      <Button type="submit" className="btn-blue-elite w-full text-white font-semibold rounded-xl h-12 text-base group">
                        <SendIcon className="h-4 w-4 mr-2" />
                        Send Message
                        <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
