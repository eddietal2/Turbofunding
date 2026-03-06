import { Metadata } from "next"
import { LoanCalculator } from "@/components/loan-calculator"
import { FaqSection } from "@/components/faq-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources | TurboFunding.com",
  description: "Access powerful tools to help you make informed business funding decisions. Use our loan calculator, browse FAQs, and explore resources to understand your funding options.",
  keywords: [
    "loan calculator",
    "business funding tools",
    "financial resources",
    "loan estimation",
    "FAQ",
    "frequently asked questions",
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
        className="w-full pt-12 pb-16 md:pt-16 md:pb-16 lg:pt-16 lg:pb-32 bg-gradient-to-b from-[#F5F7FA] to-white" 
        id="calculator"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <LoanCalculator />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        className="w-full pt-12 pb-16 md:pt-16 md:pb-16 lg:pt-16 lg:pb-32 bg-gradient-to-b from-white to-[#F5F7FA]"
        id="faqs"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <FaqSection />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative container px-4 md:px-6 py-14 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 font-space-grotesk">
              Ready to Get <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Funded?</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Our funding specialists are ready to help you find the perfect solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="btn-gold-elite text-white font-semibold rounded-xl h-12 px-8 text-base group">
                <Link href="/apply">
                  Apply Now
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild className="bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold rounded-xl h-12 px-8 text-base">
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
