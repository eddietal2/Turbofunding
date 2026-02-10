import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotatingText } from "@/components/rotating-text"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fast Business Funding Solutions - Working Capital, SBA Loans & More",
  description:
    "TurboCharge your business with fast, secure funding. Get working capital, SBA loans, equipment financing, and merchant cash advances. Apply now for 24-hour approval.",
  keywords: [
    "business funding",
    "working capital loans",
    "SBA loans",
    "equipment financing",
    "merchant cash advance",
    "business line of credit",
    "fast business loans",
    "small business financing",
  ],
  openGraph: {
    title: "Fast Business Funding Solutions - Working Capital, SBA Loans & More",
    description:
      "TurboCharge your business with fast, secure funding. Get working capital, SBA loans, equipment financing, and merchant cash advances. Apply now for 24-hour approval.",
    url: "https://turbofunding.com",
    images: [
      {
        url: "/images/turbofunding-home-og.jpg",
        width: 1200,
        height: 630,
        alt: "TurboFunding.com - Fast Business Funding Solutions",
      },
      {
        url: "/images/turbofunding-home-square.jpg",
        width: 1080,
        height: 1080,
        alt: "TurboFunding.com - Fast Business Funding Solutions",
      },
    ],
  },
  twitter: {
    title: "Fast Business Funding Solutions - Working Capital, SBA Loans & More",
    description:
      "TurboCharge your business with fast, secure funding. Get working capital, SBA loans & more. Apply now for 24-hour approval.",
    images: ["/images/turbofunding-home-twitter.jpg"],
  },
  alternates: {
    canonical: "https://turbofunding.com",
  },
  other: {
    // TikTok specific tags for homepage
    "tiktok:title": "TurboCharge Your Business with Fast Funding! 🚀💰",
    "tiktok:description":
      "Get approved in 24 hours! Working capital, SBA loans & more. Apply now! #BusinessFunding #SmallBusiness #Entrepreneur #FastFunding",
    "tiktok:image": "https://turbofunding.com/images/turbofunding-home-tiktok.jpg",

    // Instagram specific tags for homepage
    "instagram:title": "TurboCharge Your Business with Fast Funding ⚡",
    "instagram:description":
      "Fast, secure business funding solutions 💼 Get working capital, SBA loans & equipment financing. Apply today! ✨ #BusinessGrowth #Funding",
    "instagram:image": "https://turbofunding.com/images/turbofunding-home-instagram.jpg",

    // LinkedIn specific tags for homepage
    "linkedin:title": "Professional Business Funding Solutions | TurboFunding.com",
    "linkedin:description":
      "Accelerate your business growth with our comprehensive funding solutions. Working capital, SBA loans, and equipment financing with competitive rates and fast approval.",
    "linkedin:image": "https://turbofunding.com/images/turbofunding-home-linkedin.jpg",

    // Pinterest specific tags for homepage
    "pinterest:title": "Fast Business Funding Ideas & Solutions 💡💰",
    "pinterest:description":
      "Discover the best business funding options! Working capital, SBA loans, equipment financing & more. Get your business funded fast! 📈 #BusinessFunding #SmallBusiness",
    "pinterest:image": "https://turbofunding.com/images/turbofunding-home-pinterest.jpg",

    // WhatsApp specific tags for homepage
    "whatsapp:title": "TurboFunding - Fast Business Funding Solutions",
    "whatsapp:description":
      "Get your business funded in 24 hours! Working capital, SBA loans & equipment financing available. Apply now!",
    "whatsapp:image": "https://turbofunding.com/images/turbofunding-home-whatsapp.jpg",

    // YouTube specific tags for homepage
    "youtube:title": "How to Get Fast Business Funding | TurboFunding.com",
    "youtube:description":
      "Learn about the fastest ways to get business funding. Working capital, SBA loans, equipment financing and more explained.",
    "youtube:image": "https://turbofunding.com/images/turbofunding-home-youtube.jpg",

    // Snapchat specific tags for homepage
    "snapchat:title": "Fast Business Funding! 💰⚡",
    "snapchat:description": "Get funded in 24hrs! Working capital, SBA loans & more! Apply now! 🚀 #BusinessFunding",
    "snapchat:image": "https://turbofunding.com/images/turbofunding-home-snapchat.jpg",
  },
}

export default function Home() {
  const productNames = ["Working Capital", "Merchant Cash Advance", "SBA Loans", "Business Lines of Credit"]

  return (
    <>
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TurboFunding.com",
            url: "https://turbofunding.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://turbofunding.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Financial Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: "TurboFunding.com",
            description:
              "Fast, secure business funding solutions including working capital, SBA loans, equipment financing, and merchant cash advances.",
            url: "https://turbofunding.com",
            telephone: "+1-800-555-8872",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Finance Street, Suite 500",
              addressLocality: "New York",
              addressRegion: "NY",
              postalCode: "10001",
              addressCountry: "US",
            },
            openingHours: "Mo-Fr 09:00-18:00",
            priceRange: "$10,000 - $5,000,000",
            serviceType: "Business Funding",
            areaServed: "United States",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Business Funding Solutions",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Working Capital Loans",
                    description: "Quick access to working capital for day-to-day operations",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Merchant Cash Advance",
                    description: "Fast funding based on future sales with flexible repayment",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "SBA Loans",
                    description: "Government-backed loans with favorable terms",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* Changed main background from bg-black to bg-[#F5F7FA] */}
      <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
        {/* Hero Section with Background Image */}
        <section className="relative w-full py-12 md:py-16 lg:py-24 xl:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/turbofunding-hero-professional.png"
              alt="Professional business funding advisor representing TurboFunding's personalized service"
              fill
              className="object-cover object-[center_15%] opacity-85"
              priority
            />
            <div className="absolute inset-0 bg-[#F5F7FA]/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
          </div>

          {/* Content */}
          <div className="container relative z-10 px-4 md:px-6">
            <div className="max-w-4xl">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  <span style={{ color: "#F97316", whiteSpace: "nowrap" }}>Turbo</span>
                  <span style={{ color: "#2460e3" }}>Charge your Business</span>
                  <br />
                  <span style={{ color: "#2460e3" }}>with </span>
                  <RotatingText
                    words={productNames}
                    className="font-bold"
                    style={{
                      color: "#F97316", // Changed from blue to orange to match "Turbo"
                      display: "inline",
                      fontSize: "inherit",
                      lineHeight: "inherit",
                    }}
                  />
                </h1>
                <p className="text-base md:text-lg font-bold" style={{ color: "#FFFFFF" }}>
                  The place that helps businesses scale through secure, fast and transparent funding.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-6">
                <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6">
                  <Link href="/apply">See Your Loan Options</Link>
                </Button>
              </div>
              <p className="text-sm text-white mt-3 drop-shadow-lg">Applying will not impact your credit score</p>
            </div>
          </div>
        </section>

        {/* How To Qualify Section */}
        {/* Changed section background from gray-800 to bg-[#F5F7FA] with updated text colors */}
        <section className="w-full py-8 md:py-16 lg:py-20 bg-[#F5F7FA]" id="qualify">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: "#0D1B2A" }}>
                  How To Qualify
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple requirements to get your business funded quickly and efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Changed cards from gray-900 to bg-[#F5F7FA] with light borders and dark text */}
              <Card className="bg-[#F5F7FA] border-gray-200" style={{ color: "#0D1B2A" }}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="rounded-full bg-blue-600 p-3 flex items-center justify-center" aria-hidden="true">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">6+ Months in Business</h3>
                  {/* Changed card text from gray-300 to gray-600 */}
                  <p className="text-gray-600 text-sm">
                    Your business must be operational for at least 6 months with consistent activity.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#F5F7FA] border-gray-200" style={{ color: "#0D1B2A" }}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="rounded-full bg-blue-600 p-3 flex items-center justify-center" aria-hidden="true">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">$10K+ Monthly Revenue</h3>
                  <p className="text-gray-600 text-sm">
                    Demonstrate consistent monthly revenue of at least $10,000 to qualify for funding.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#F5F7FA] border-gray-200" style={{ color: "#0D1B2A" }}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="rounded-full bg-blue-600 p-3 flex items-center justify-center" aria-hidden="true">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">550+ Credit Score</h3>
                  <p className="text-gray-600 text-sm">
                    Personal credit score of 550 or higher helps secure better funding terms.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#F5F7FA] border-gray-200" style={{ color: "#0D1B2A" }}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="rounded-full bg-blue-600 p-3 flex items-center justify-center" aria-hidden="true">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Basic Documentation</h3>
                  <p className="text-gray-600 text-sm">
                    Bank statements, tax returns, and business registration documents required.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center mt-6">
              <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
                <Link href="/apply">Check Your Eligibility</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {/* CHANGE> Changed Funding Solutions section from dark gray (bg-gray-900) to white background with #0D1B2A text */}
        <section className="w-full py-8 md:py-16 lg:py-20 bg-white" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-orange-500">
                  Funding Solutions
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a variety of funding options to help your business grow and succeed.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
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
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: "#0D1B2A" }}>
                      Working Capital
                    </h3>
                  </div>
                  <p className="mt-1 text-gray-600">
                    Access the working capital your business needs to manage cash flow and day-to-day operations.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
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
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: "#0D1B2A" }}>
                      Merchant Cash Advance
                    </h3>
                  </div>
                  <p className="mt-1 text-gray-600">
                    Get quick access to capital with flexible repayment based on your future sales and daily revenue.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
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
                        className="h-6 w-6 text-blue-600"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: "#0D1B2A" }}>
                      Business Line of Credit
                    </h3>
                  </div>
                  <p className="mt-1 text-gray-600">
                    Flexible funding that allows you to draw funds as needed and only pay interest on what you use.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
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
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                        <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                        <path d="M16 11h0" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: "#0D1B2A" }}>
                      SBA 7a Loans
                    </h3>
                  </div>
                  <p className="mt-1 text-gray-600">
                    Government-backed loans with favorable terms for small businesses that meet SBA eligibility
                    requirements.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
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
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: "#0D1B2A" }}>
                      SBA 504
                    </h3>
                  </div>
                  <p className="mt-1 text-gray-600">
                    Long-term, fixed-rate financing for major assets like real estate and equipment to help your
                    business expand.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-8 md:py-16 lg:py-20 bg-[#F5F7FA]" id="testimonials">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: "#0D1B2A" }}>
                  Trusted by Businesses Nationwide
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our clients have to say about their experience with TurboFunding.com.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-[#F5F7FA] border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
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
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: "#0D1B2A" }}>
                        John Anderson
                      </h3>
                      <p className="text-gray-600">CEO, Tech Innovations</p>
                    </div>
                  </div>
                  <p style={{ color: "#0D1B2A" }}>
                    &quot;TurboFunding.com made it incredibly easy to get the capital we needed to expand our
                    operations. Highly recommended!&quot;
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#F5F7FA] border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
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
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: "#0D1B2A" }}>
                        Sarah Johnson
                      </h3>
                      <p className="text-gray-600">Owner, Boutique Retail</p>
                    </div>
                  </div>
                  <p style={{ color: "#0D1B2A" }}>
                    &quot;Fast, simple, and transparent. I got approved within 24 hours and had funds in my account
                    shortly after.&quot;
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#F5F7FA] border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
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
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: "#0D1B2A" }}>
                        Mike Davis
                      </h3>
                      <p className="text-gray-600">Construction</p>
                    </div>
                  </div>
                  <p style={{ color: "#0D1B2A" }}>
                    &quot;The team at TurboFunding.com was professional and helpful throughout the entire process. Great
                    experience!&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 md:py-16 lg:py-20 bg-gray-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-3 text-center max-w-3xl mx-auto">
              <div className="space-y-2 w-full">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-orange-500">
                  Ready to Transform Your Business Finances? Get Turbo Funded
                </h2>
                <p className="md:text-xl mx-auto text-orange-400">Apply now and get a decision within 24 hours.</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
                  <Link href="/apply">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        {/* Footer gradient updated from black to white/gray tones */}
        <footer className="w-full py-6 md:py-8 bg-gradient-to-b from-gray-50 to-gray-100" style={{ color: "#0D1B2A" }}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="space-y-3 text-center">
                <h3 className="text-sm font-semibold mb-3" style={{ color: "#0D1B2A" }}>
                  About Us
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/team" className="hover:text-orange-500 transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="tel:8778383919" className="hover:text-orange-500 transition-colors">
                      (877) 838-3919
                    </Link>
                  </li>
                  <li>
                    <Link href="mailto:inquiries@turbofunding.com" className="hover:text-orange-500 transition-colors">
                      inquiries@turbofunding.com
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4 pt-2">
                <Link href="#" className="hover:text-orange-500 transition-colors" aria-label="LinkedIn">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-orange-500 transition-colors" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                    <path d="M16 11h0" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-600">
                © {new Date().getFullYear()} TurboFunding.com. All rights reserved.
              </p>
              <div className="flex gap-4 text-xs">
                <Link href="#" className="hover:text-orange-500 transition-colors">
                  Terms of Use
                </Link>
                <span>·</span>
                <Link href="#" className="hover:text-orange-500 transition-colors">
                  Privacy Policy
                </Link>
                <span>·</span>
                <Link href="#" className="hover:text-orange-500 transition-colors">
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
