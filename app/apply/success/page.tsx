"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircleIcon } from "lucide-react"
import { ConversionTracking } from "@/components/conversion-tracking"

export default function ApplicationSuccessPage() {
  return (
    <>
      {/* Track page view */}
      <ConversionTracking eventName="ViewContent" eventData={{ content_type: "application_success_page" }} />

      <div className="flex min-h-screen flex-col bg-[#F5F7FA] text-white">
        <main className="flex-1">
          {/* Success Message Section */}
          <section className="w-full py-8 md:py-16 bg-[#F5F7FA]">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-2xl">
                <Card className="bg-[#F5F7FA] border-gray-200 text-black">
                  <CardHeader className="text-center pb-3">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                      <CheckCircleIcon className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="text-3xl text-orange-500">Documents Submitted!</CardTitle>
                    <CardDescription className="text-gray-600 text-lg">
                      Thank you for applying for funding with TurboFunding.com.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <div className="space-y-4">
                      <p className="text-gray-700 text-lg">
                        We've received your application and our team will review it promptly. You can expect to hear
                        from one of our funding specialists within 1 business day.
                      </p>
                      <p className="text-gray-700">
                        A confirmation email has been sent to your email address with details about your application.
                      </p>

                      <div className="bg-gray-50 rounded-lg p-6 mt-6">
                        <h3 className="text-xl font-medium text-orange-500 mb-4">What happens next?</h3>
                        <ol className="text-left space-y-3 text-gray-700">
                          <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                              1
                            </span>
                            <span>Our team will review your application and supporting documents</span>
                          </li>
                          <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                              2
                            </span>
                            <span>A funding specialist will contact you to discuss tailored options</span>
                          </li>
                          <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                              3
                            </span>
                            <span>We'll present you with the best funding solutions for your business</span>
                          </li>
                          <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                              4
                            </span>
                            <span>Once approved, funding can be available in as little as 24-48 hours</span>
                          </li>
                        </ol>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                        <h4 className="text-lg font-medium text-blue-600 mb-2">Need to add more documents?</h4>
                        <p className="text-sm text-gray-700 mb-3">
                          If you need to submit additional documents, please contact our team or reply to your
                          confirmation email.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center p-6 pt-3">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/">Return to Home</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
