import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeftIcon,
  ShoppingBagIcon,
  TruckIcon,
  HeartPulseIcon,
  UtensilsIcon,
  ConstructionIcon,
  WrenchIcon,
} from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"

export default function IndustriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA] text-[#0D1B2A]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0D1B2A]">
        <div className="container flex h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-1 text-xl font-bold tracking-tighter">
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
          <nav className="hidden md:flex gap-6 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-sm font-medium text-white hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium text-white hover:text-orange-500 transition-colors">
              Products
            </Link>
            <Link href="/industries" className="text-sm font-medium text-orange-500 transition-colors">
              Industries
            </Link>
            <Link href="/team" className="text-sm font-medium text-white hover:text-orange-500 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium text-white hover:text-orange-500 transition-colors">
              Contact
            </Link>
            <Link href="/apply" className="text-sm font-medium text-white hover:text-orange-500 transition-colors">
              Apply
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
          <MobileNav currentPage="/industries" />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-4 md:py-8 bg-gray-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mt-2">
              <Link href="/" className="flex items-center text-orange-400 hover:text-orange-300">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-500 mt-2">
                Industry-Specific Funding Solutions
              </h1>
              <p className="max-w-[700px] text-orange-400 md:text-xl mt-2">
                Discover tailored financial solutions designed for the unique challenges and opportunities in your
                industry.
              </p>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="w-full py-8 md:py-16 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Retail */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <ShoppingBagIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Retail</CardTitle>
                  <CardDescription className="text-gray-300">Inventory & expansion financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Specialized funding solutions for retailers to manage inventory, expand locations, and upgrade
                      technology.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Seasonal inventory financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Store expansion funding</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>POS system upgrades</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>E-commerce integration</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Manufacturing */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <WrenchIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Manufacturing</CardTitle>
                  <CardDescription className="text-gray-300">Equipment & production financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Funding solutions for manufacturers to upgrade equipment, expand production, and optimize
                      operations.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Equipment financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Facility expansion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Technology upgrades</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Working capital for materials</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Transportation & Logistics */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <TruckIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Transportation & Logistics</CardTitle>
                  <CardDescription className="text-gray-300">Fleet & operations financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Specialized funding for transportation companies to maintain and expand fleets, optimize logistics
                      operations.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Vehicle financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Fleet expansion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Logistics technology</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Fuel & maintenance funding</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Healthcare */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <HeartPulseIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Healthcare</CardTitle>
                  <CardDescription className="text-gray-300">Medical equipment & practice financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Funding solutions for healthcare providers to upgrade equipment, expand facilities, and improve
                      patient care.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Medical equipment financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Practice expansion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Electronic health records systems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Working capital for staffing</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Hospitality & Food Service */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <UtensilsIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Hospitality & Food Service</CardTitle>
                  <CardDescription className="text-gray-300">Restaurant & hotel financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Specialized funding for restaurants, hotels, and hospitality businesses to renovate, expand, and
                      improve operations.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Kitchen equipment financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Renovation funding</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Franchise expansion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Seasonal working capital</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Construction */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <ConstructionIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Construction</CardTitle>
                  <CardDescription className="text-gray-300">Project & equipment financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Funding solutions for construction companies to finance projects, purchase equipment, and manage
                      cash flow.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Heavy equipment financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Project bridge loans</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Materials financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Contractor lines of credit</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* And more... section */}
            <div className="text-center mt-8">
              <p className="text-2xl font-bold text-orange-500">And more...</p>
              <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
                Our funding solutions extend beyond these industries. Whether you're in agriculture, education,
                professional services, or any other field, TurboFunding.com has tailored financing options to meet your
                specific business needs.
              </p>
              <div className="mt-6">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/contact">Discuss Your Industry Needs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 md:py-16 bg-gray-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-3 text-center max-w-3xl mx-auto">
              <div className="space-y-2 w-full">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-orange-500">
                  Need Funding for Your Industry?
                </h2>
                <p className="md:text-xl mx-auto text-orange-400">
                  Our industry experts understand your unique challenges and opportunities.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
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
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.585-.072-4.85c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.38-.896C21.319 1.347 20.651.935 19.86.63c-.766-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.072 1.646.072 4.947s-.015 3.585-.072 4.85c-.061 1.17-.256 1.805-.421 2.227-.562.224-.96.479-1.382.896C21.319 1.347 20.651.935 19.86.63c-.766-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
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
