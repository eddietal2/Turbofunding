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
    </div>
  )
}
