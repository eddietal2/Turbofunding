import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA] text-[#0D1B2A]">
      <main className="flex-1">
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
    </div>
  )
}
