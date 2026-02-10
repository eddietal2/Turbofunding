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
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, CheckCircleIcon } from "lucide-react"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    setFormSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA]" style={{ color: "#0D1B2A" }}>
      <main className="flex-1">
        {/* Contact Form and Info Section */}
        <section className="w-full py-8 md:py-16 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                {!formSubmitted ? (
                  <Card className="bg-[#F5F7FA] border-gray-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl text-orange-500">Send Us a Message</CardTitle>
                      <CardDescription className="text-gray-600">
                        Fill out the form below and we'll get back to you as soon as possible.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="bg-[#F5F7FA] border-gray-300"
                                style={{ color: "#0D1B2A" }}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="bg-[#F5F7FA] border-gray-300"
                                style={{ color: "#0D1B2A" }}
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className="bg-[#F5F7FA] border-gray-300"
                                style={{ color: "#0D1B2A" }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="subject">Subject</Label>
                              <Select
                                onValueChange={(value) => handleSelectChange("subject", value)}
                                value={formData.subject}
                              >
                                <SelectTrigger className="bg-[#F5F7FA] border-gray-300">
                                  <SelectValue placeholder="Select subject" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#F5F7FA] border-gray-200">
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

                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="How can we help you?"
                              className="bg-[#F5F7FA] border-gray-300 min-h-[120px]"
                              style={{ color: "#0D1B2A" }}
                              required
                            />
                          </div>
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-[#F5F7FA] border-gray-200">
                    <CardHeader className="text-center pb-3">
                      <div className="mx-auto w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-3">
                        <CheckCircleIcon className="h-8 w-8 text-green-600" />
                      </div>
                      <CardTitle className="text-2xl text-orange-500">Message Sent!</CardTitle>
                      <CardDescription className="text-gray-600">
                        Thank you for reaching out to TurboFunding.com.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center pt-0">
                      <p className="text-gray-700" style={{ color: "#0D1B2A" }}>
                        We've received your message and will get back to you as soon as possible, usually within 1
                        business day.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-center pt-3">
                      <Button
                        onClick={() => setFormSubmitted(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Send Another Message
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h2 className="text-2xl font-bold tracking-tighter mb-3 text-orange-500">Contact Information</h2>
                  <p className="text-gray-300 mb-4">
                    Our team is available Monday through Friday, 9am to 6pm EST to assist you with any questions about
                    our funding solutions.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-900 mr-3">
                        <MapPinIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Main Office</h3>
                        <p className="text-gray-300">
                          123 Finance Street, Suite 500
                          <br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-900 mr-3">
                        <PhoneIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Phone</h3>
                        <p className="text-gray-300">(800) 555-TURBO</p>
                        <p className="text-gray-300">(800) 555-8872</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-900 mr-3">
                        <MailIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Email</h3>
                        <p className="text-gray-300">info@turbofunding.com</p>
                        <p className="text-gray-300">support@turbofunding.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-900 mr-3">
                        <ClockIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Business Hours</h3>
                        <p className="text-gray-300">Monday - Friday: 9am - 6pm EST</p>
                        <p className="text-gray-300">Saturday - Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-6 bg-gray-800 border border-gray-700">
                  <h3 className="text-xl font-bold text-orange-500 mb-3">Need Funding Fast?</h3>
                  <p className="text-white mb-3">
                    If you need immediate assistance or want to fast-track your funding application, call our dedicated
                    funding hotline.
                  </p>
                  <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-300">Funding Hotline</p>
                      <p className="text-xl font-bold text-white">(800) 789-FUND</p>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">Call Now</Button>
                  </div>
                </div>
              </div>
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
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C15.667 23.988 15.26 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.38-.896C21.319 1.347 20.651.935 19.86.63c-.766-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
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
            <p className="text-xs" style={{ color: "#0D1B2A" }}>
              © {new Date().getFullYear()} TurboFunding.com. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              <Link href="#" className="hover:text-white transition-colors" style={{ color: "#0D1B2A" }}>
                Terms of Use
              </Link>
              <span style={{ color: "#0D1B2A" }}>·</span>
              <Link href="#" className="hover:text-white transition-colors" style={{ color: "#0D1B2A" }}>
                Privacy Policy
              </Link>
              <span style={{ color: "#0D1B2A" }}>·</span>
              <Link href="#" className="hover:text-white transition-colors" style={{ color: "#0D1B2A" }}>
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
