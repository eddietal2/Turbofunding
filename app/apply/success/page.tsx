"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircleIcon, ArrowLeftIcon } from "lucide-react"
import { ConversionTracking } from "@/components/conversion-tracking"

export default function ApplicationSuccessPage() {
  return (
    <>
      {/* Track page view */}
      <ConversionTracking eventName="ViewContent" eventData={{ content_type: "application_success_page" }} />

      <div className="flex min-h-screen flex-col bg-[#F5F7FA] text-white">
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-8 md:py-16 bg-gray-100 text-black">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center text-center space-y-3 mb-6">
                <nav aria-label="Breadcrumb">
                  <Link href="/apply" className="flex items-center text-orange-400 hover:text-orange-300 mb-2">
                    <ArrowLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                    Back to Application
                  </Link>
                </nav>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-500">
                  Documents Submitted!
                </h1>
                <p className="max-w-[700px] text-gray-700 md:text-xl">
                  Your application is now complete with supporting documents.
                </p>
              </div>
            </div>
          </section>

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
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.766-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.072 1.646.072 4.947s-.015 3.585-.072 4.85c-.061 1.17-.256 1.805-.421 2.227-.562.224-.96.479-1.382.896-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.382-.899-.419-.42-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
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
