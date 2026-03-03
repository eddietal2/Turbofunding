import { Metadata } from "next"
import { LoanCalculator } from "@/components/loan-calculator"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Resources | TurboFunding.com",
  description: "Access powerful tools to help you make informed business funding decisions. Use our loan calculator and other resources to understand your funding options.",
  keywords: [
    "loan calculator",
    "business funding tools",
    "financial resources",
    "loan estimation",
  ],
  openGraph: {
    title: "Resources | TurboFunding.com",
    description: "Access powerful tools to help you make informed business funding decisions.",
    type: "website",
  },
}

export default function ResourcesPage() {
  return (
    <main className="w-full">
      {/* Loan Calculator Section */}
      <section 
        className="w-full pt-32 pb-16 md:pt-36 md:pb-16 lg:pt-40 lg:pb-32 bg-gradient-to-b from-[#F5F7FA] to-white" 
        id="calculator"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <LoanCalculator />
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="w-full py-16 md:py-16 lg:py-32 bg-[#F5F7FA]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <h2 
                className="text-3xl md:text-4xl font-bold tracking-tight" 
                style={{ 
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  color: "#0D1B2A"
                }}
              >
                More Resources Coming Soon
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're continuously adding new tools and resources to help you succeed. Check back soon for guides, calculators, and expert advice on business financing.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
              <Button asChild className="btn-blue-elite text-base md:text-lg px-8 py-6 font-semibold text-white">
                <Link href="/apply">Get Started Today</Link>
              </Button>
              <Button asChild variant="outline" className="text-base md:text-lg px-8 py-6 font-semibold border-2">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
