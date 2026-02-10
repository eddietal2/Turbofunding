import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeftIcon } from "lucide-react"

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA] text-[#0D1B2A]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-4 md:py-8 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <Link href="/" className="flex items-center text-orange-400 hover:text-orange-300">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-orange-500">About Us</h1>
              <p className="max-w-[700px] text-orange-400 md:text-xl mt-2">
                From Main Street to Wall Street, we know capital — and we make it easier to get.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-8 md:py-16 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <div className="space-y-3">
                  <div className="space-y-3 text-gray-700">
                    <p style={{ color: "#0D1B2A" }}>
                      At TurboFunding, we believe small businesses deserve fast, reliable access to the capital they
                      need to grow. Founded by entrepreneurs who know the challenges of building a company from the
                      ground up, our mission is simple: provide streamlined financing and help businesses move at the
                      speed of opportunity.
                    </p>
                    <p style={{ color: "#0D1B2A" }}>
                      As a direct lender with deep industry experience across business lending, private capital, and SBA
                      partnerships, we've built strong relationships with a wide network of funding sources. Our main
                      goal is to deliver cheaper financing at turbo speeds — helping you save capital while accessing
                      the capital you need. We match each client with the right funding solution — from merchant cash
                      advances and business lines of credit to SBA loans — and educate you throughout the process to
                      help consolidate and optimize your financing strategy.
                    </p>
                    <p style={{ color: "#0D1B2A" }}>
                      But TurboFunding is more than just financing. We're partners in growth. Whether you're starting a
                      new venture, expanding to new locations, or weathering unexpected challenges, our team is here to
                      guide you every step of the way.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/images/turbofunding-hero-bg.png"
                  fill
                  alt="TurboFunding.com - Speed and efficiency in business funding"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Company Values Section */}
        <section className="w-full py-8 md:py-16 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-orange-500">What Drives Us</h2>
                <p className="max-w-[700px] text-gray-700 md:text-xl">
                  Our core values shape everything we do at TurboFunding.com
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-[#F5F7FA] border-gray-200 overflow-hidden">
                <CardHeader className="pb-3 text-center">
                  <div className="mx-auto rounded-full bg-blue-900/20 w-14 h-14 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-7 w-7 text-blue-400"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl text-orange-500">Trust & Transparency</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">Your success is our priority</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <p className="text-gray-700 text-sm">
                    We believe in complete transparency in our funding process. No hidden fees, no surprise terms—just
                    straightforward solutions that you can trust.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#F5F7FA] border-gray-200 overflow-hidden">
                <CardHeader className="pb-3 text-center">
                  <div className="mx-auto rounded-full bg-blue-900/20 w-14 h-14 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-7 w-7 text-blue-400"
                    >
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl text-orange-500">Speed & Efficiency</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">Time is of the essence</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <p className="text-gray-700 text-sm">
                    We understand that time is critical in business. Our streamlined process ensures you get the funding
                    you need when you need it, without unnecessary delays.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#F5F7FA] border-gray-200 overflow-hidden">
                <CardHeader className="pb-3 text-center">
                  <div className="mx-auto rounded-full bg-blue-900/20 w-14 h-14 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-7 w-7 text-blue-400"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl text-orange-500">Client-Centered Approach</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">Your success is our success</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <p className="text-gray-700 text-sm">
                    Your success is our success. We take the time to understand your business needs and provide
                    personalized funding solutions that help you achieve your goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 md:py-16 bg-gray-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-3 text-center max-w-3xl mx-auto">
              <div className="space-y-2 w-full">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-orange-500">
                  Ready to Work With Our Team?
                </h2>
                <p className="md:text-xl mx-auto text-orange-400">
                  Our experts are ready to help you find the perfect funding solution for your business.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/apply">Apply Now</Link>
                </Button>
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
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.564v11.452zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.585-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.379-.896-.42-.164-1.065-.36-2.235-.413-1.274-.057-1.649-.07-4.859-.07-3.211 0-3.586-.015-4.859-.074-.061-.061-.256-.165-.42-.226-.562-.217-.96-.477-2.913-.896-.419-.419-.81-.689-1.38-.896-.419-.42-.679-.824-.9-1.38-.165-.42-.36-1.057-.413-2.227-.057 1.266.072 1.646.072 4.947s-.015 3.585-.072 4.85c-.061 1.17-.256 1.805-.421 2.227-.562.224-.96.479-1.382.896-.419.419-.824.679-.9 1.38-.165.42-.359 1.065-.42 2.235-.045-.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.585-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.38-.896-.42-.164-1.065-.36-2.235-.413-1.274-.057-1.649-.07-4.859-.07-3.211 0-3.586-.015-4.859-.074-.061-.061-.256-.165-.42-.226-.562-.217-.96-.477-2.913-.896-.419-.419-.81-.689-1.379-.898-.419-.42-.679-.824-.9-1.38-.165-.42-.36-1.057-.413-2.227-.057 1.266.072 1.646.072 4.947s-.015 3.585-.072 4.85c-.061 1.17-.256 1.805-.421 2.227-.562.224-.96.479-1.382.896-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859-.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.382-.899-.419-.42-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
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
  )
}
