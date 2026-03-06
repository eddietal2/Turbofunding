"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  CheckIcon,
  DollarSignIcon,
  ClockIcon,
  PercentIcon,
  ArrowRightIcon,
  SparklesIcon,
  BanknoteIcon,
  CreditCardIcon,
  LandmarkIcon,
  BuildingIcon,
  BriefcaseIcon,
  WrenchIcon,
  HandshakeIcon,
  ZapIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

// ===== PRODUCT DATA =====
const products = [
  {
    id: "term-loan",
    name: "Term Loan",
    icon: BanknoteIcon,
    tagline: "Fuel your growth with predictable payments",
    description: "Term loans provide the financial resources your business needs to cover operational expenses, manage cash flow gaps, and take advantage of growth opportunities without disrupting your daily operations.",
    benefits: [
      "Quick access to funds for immediate business needs",
      "Flexible repayment terms aligned with your cash flow",
      "Use funds for inventory, payroll, marketing, or unexpected expenses",
      "No collateral required for qualified businesses",
    ],
    details: {
      title: "Term Loan Details",
      stats: [
        { label: "Amount", value: "$10,000 - $500,000", icon: DollarSignIcon },
        { label: "Term Length", value: "6 Months to 5 Years", icon: ClockIcon },
        { label: "Funding Speed", value: "As fast as 24 hours", icon: ZapIcon },
        { label: "Interest Rate", value: "Starting at 8%", icon: PercentIcon },
      ],
    },
    eligibility: [
      { icon: DollarSignIcon, label: "Minimum Revenue", value: "$100,000+ annual revenue" },
      { icon: ClockIcon, label: "Time in Business", value: "6+ months" },
      { icon: PercentIcon, label: "Credit Score", value: "550+ for owners" },
    ],
    bestFor: [
      "Businesses needing to cover short-term operating expenses",
      "Managing seasonal cash flow fluctuations",
      "Purchasing inventory or supplies",
      "Handling unexpected costs",
    ],
  },
  {
    id: "line-of-credit",
    name: "Business Line of Credit",
    icon: TrendingUpIcon,
    tagline: "Draw funds on demand, pay only what you use",
    description: "Revolving credit facility perfect for managing cash flow fluctuations and unexpected expenses.",
    benefits: [
      "Access funds instantly when opportunities arise",
      "Only pay interest on the amount you draw",
      "Revolving credit - repay and reuse",
      "Perfect for seasonal businesses",
    ],
    details: {
      title: "LOC Details",
      stats: [
        { label: "Credit Limit", value: "$10K - $250K", icon: DollarSignIcon },
        { label: "Draw Period", value: "12-24 months", icon: ClockIcon },
        { label: "Access Speed", value: "Same day", icon: ZapIcon },
        { label: "Interest Rate", value: "As low as 1% per month", icon: PercentIcon },
      ],
    },
    eligibility: [
      { icon: DollarSignIcon, label: "Annual Revenue", value: "$150K+" },
      { icon: ClockIcon, label: "Time in Business", value: "12+ months" },
      { icon: PercentIcon, label: "Credit Score", value: "600+" },
    ],
    bestFor: [
      "Seasonal cash flow management",
      "Short-term working capital",
      "Unexpected opportunities",
      "Receivables/payables gaps",
    ],
  },
  {
    id: "sba-7a",
    name: "SBA 7a Loans",
    icon: LandmarkIcon,
    tagline: "Government-backed loans with the best rates",
    description: "Most popular SBA program for long-term financing with competitive rates and flexible terms.",
    benefits: [
      "Lower down payments (as low as 10%)",
      "Competitive rates backed by SBA",
      "Terms up to 25 years",
      "Multiple business uses",
    ],
    details: {
      title: "SBA 7a Details",
      stats: [
        { label: "Loan Amount", value: "Up to $5M", icon: DollarSignIcon },
        { label: "Terms", value: "Up to 25 years", icon: ClockIcon },
        { label: "Processing Time", value: "30-90 days", icon: ZapIcon },
        { label: "Interest Rate", value: "Prime + 2.75-4.75%", icon: PercentIcon },
      ],
    },
    eligibility: [
      { icon: DollarSignIcon, label: "Business Size", value: "Meet SBA standards" },
      { icon: ClockIcon, label: "Time in Business", value: "2+ years" },
      { icon: PercentIcon, label: "Credit Score", value: "600+" },
    ],
    bestFor: [
      "Business acquisitions",
      "Real estate purchases",
      "Long-term working capital",
      "Equipment purchases",
    ],
  },
  {
    id: "sba-504",
    name: "SBA 504",
    icon: BuildingIcon,
    tagline: "Fixed-rate financing for major assets",
    description: "Long-term, fixed-rate financing for major fixed assets like real estate and heavy equipment.",
    benefits: [
      "Fixed rates for life of loan",
      "Low down payment (typically 10%)",
      "Terms up to 25 years",
      "Below-market rates",
    ],
    details: {
      title: "SBA 504 Details",
      stats: [
        { label: "Loan Amount", value: "Up to $5.5M", icon: DollarSignIcon },
        { label: "Terms", value: "10, 20, 25 years", icon: ClockIcon },
        { label: "Processing Time", value: "45-90 days", icon: ZapIcon },
        { label: "Interest Rate", value: "Fixed below market", icon: PercentIcon },
      ],
    },
    eligibility: [
      { icon: DollarSignIcon, label: "Use of Funds", value: "Real estate, equipment" },
      { icon: ClockIcon, label: "Job Creation", value: "Must create/retain jobs" },
      { icon: PercentIcon, label: "Owner Occupancy", value: "51% requirement" },
    ],
    bestFor: [
      "Commercial real estate",
      "Facility building/renovation",
      "Heavy machinery",
      "Long-term investments",
    ],
  },
  {
    id: "bridge-loan",
    name: "Bridge Loan",
    icon: HandshakeIcon,
    tagline: "Short-term capital to seize opportunities",
    description: "Short-term financing to bridge gaps between purchasing new property and securing permanent funding.",
    benefits: [
      "Quick funding to close deals",
      "Immediate capital available",
      "Simple qualification process",
      "No prepayment penalties",
    ],
    details: {
      title: "Bridge Loan Details",
      stats: [
        { label: "Loan Amount", value: "$50K - $5M", icon: DollarSignIcon },
        { label: "Term Length", value: "3 - 12 months", icon: ClockIcon },
        { label: "Funding Speed", value: "5-10 business days", icon: ZapIcon },
        { label: "Interest Rate", value: "7% - 12%", icon: PercentIcon },
      ],
    },
    eligibility: [
      { icon: DollarSignIcon, label: "Asset Value", value: "Sufficient collateral" },
      { icon: ClockIcon, label: "Exit Strategy", value: "Clear repayment plan" },
      { icon: PercentIcon, label: "Credit Score", value: "600+" },
    ],
    bestFor: [
      "Real estate deals",
      "Business acquisitions",
      "Time-sensitive deals",
      "Financing gaps",
    ],
  },
  {
    id: "merchant-cash",
    name: "Merchant Cash Advances",
    icon: CreditCardIcon,
    tagline: "Revenue-based funding that flexes with your sales",
    description: "Provide immediate funding in exchange for a percentage of your future receivables. Perfect for businesses with recurring revenue.",
    benefits: [
      "Fast approval and funding, often within 24 hours",
      "Repayment automatically adjusts with your sales volume",
      "No fixed monthly payments - pay as you earn",
      "Minimal paperwork and quick application process",
      "Pre-Payment Discount",
    ],
    details: {
      title: "MCA Details",
      stats: [
        { label: "Amount", value: "$5,000 - $500,000", icon: DollarSignIcon },
        { label: "Repayment", value: "6-36 months", icon: ClockIcon },
        { label: "Funding Speed", value: "24-48 hours", icon: ZapIcon },
        { label: "Rate", value: "1%-3% per month", icon: PercentIcon },
      ],
    },
    eligibility: [
      { icon: DollarSignIcon, label: "Monthly Card Sales", value: "$10,000+ monthly" },
      { icon: ClockIcon, label: "Time in Business", value: "6+ months" },
      { icon: PercentIcon, label: "Credit Score", value: "500+" },
    ],
    bestFor: [
      "General Working Capital",
      "Fast-Growing Businesses",
      "Bridge Financing",
      "Same Day Funding",
    ],
  },
  {
    id: "equipment-financing",
    name: "Equipment Financing",
    icon: WrenchIcon,
    tagline: "Get the equipment you need, preserve your capital",
    description: "Capital for purchasing or leasing machinery, vehicles, technology, and business equipment.",
    benefits: [
      "Lower rates - equipment is collateral",
      "Flexible terms aligned with lifespan",
      "Finance 100% with minimal down",
      "Preserve working capital",
    ],
    details: {
      title: "Equipment Financing Details",
      stats: [
        { label: "Amount", value: "$2.5K - $2M", icon: DollarSignIcon },
        { label: "Loan Term", value: "2 - 7 years", icon: ClockIcon },
        { label: "Funding Speed", value: "5-15 business days", icon: ZapIcon },
        { label: "Interest Rate", value: "Starting at 6.5%", icon: PercentIcon },
      ],
    },
    eligibility: [
      { icon: DollarSignIcon, label: "Equipment", value: "Commercial/industrial" },
      { icon: ClockIcon, label: "Time in Business", value: "6+ months" },
      { icon: PercentIcon, label: "Credit Score", value: "550+" },
    ],
    bestFor: [
      "Machinery & industrial equipment",
      "Fleet vehicles",
      "IT infrastructure",
      "Construction equipment",
    ],
  },
]

// ===== PRODUCT SLUG MAP =====
const productSlugMap: { [key: string]: string } = {
  "term-loan": "term-loan",
  "merchant-cash-advance": "merchant-cash",
  "business-line-of-credit": "line-of-credit",
  "sba-7a-loans": "sba-7a",
  "sba-504": "sba-504",
  "bridge-loan": "bridge-loan",
  "equipment-financing": "equipment-financing",
}

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState("term-loan")

  useEffect(() => {
    const productParam = searchParams.get("product")
    if (productParam && productSlugMap[productParam]) {
      setSelectedProduct(productSlugMap[productParam])
    }
  }, [searchParams])

  const product = products.find((p) => p.id === selectedProduct) || products[0]
  const ProductIcon = product.icon

  return (
    <div className="flex min-h-screen flex-col" style={{ color: "#0D1B2A" }}>
      <main className="flex-1">

        {/* ===== HERO HEADER ===== */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-3xl" />
          </div>

          <div className="relative container px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-5">
                <SparklesIcon className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300 font-medium">7 Funding Solutions for Every Business</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-space-grotesk">
                Business Funding <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Products</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
                Compare rates, terms, and eligibility across our full suite of financing options.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PRODUCT TABS ===== */}
        <section className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
          {/* Desktop horizontal tabs */}
          <div className="hidden lg:block container px-4 md:px-6">
            <div className="flex gap-1 overflow-x-auto py-2 -mx-1">
              {products.map((p) => {
                const Icon = p.icon
                const isActive = selectedProduct === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p.id)}
                    className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
                    {p.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mobile dropdown */}
          <div className="lg:hidden container px-4 md:px-6 py-3">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              style={{ color: "#0D1B2A" }}
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* ===== PRODUCT CONTENT ===== */}
        <section className="w-full py-8 md:py-14 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">

            {/* Product Title Row */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/20 flex-shrink-0">
                <ProductIcon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-space-grotesk">{product.name}</h2>
                <p className="text-gray-500 text-sm mt-0.5">{product.tagline}</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-5">

              {/* ===== LEFT COLUMN (3/5) ===== */}
              <div className="lg:col-span-3 space-y-6">

                {/* Description Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-space-grotesk">Key Benefits</h3>
                  <ul className="space-y-3" role="list">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckIcon className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button asChild className="btn-blue-elite text-white text-base font-semibold rounded-xl h-12 px-8 group">
                      <Link href="/apply">
                        Apply for Financing
                        <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Best For Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900 font-space-grotesk">Best For</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.bestFor.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-blue-50/60 border border-blue-100 rounded-xl px-4 py-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ===== RIGHT COLUMN (2/5) ===== */}
              <div className="lg:col-span-2 space-y-6">

                {/* Details Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-6 md:p-8">
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

                  <div className="relative">
                    <h3 className="text-lg font-bold text-white mb-5 font-space-grotesk">{product.details.title}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {product.details.stats.map((stat, i) => {
                        const StatIcon = stat.icon
                        return (
                          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <StatIcon className="h-3.5 w-3.5 text-gray-400" />
                              <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
                            </div>
                            <div className="text-white font-semibold text-sm leading-tight">{stat.value}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Eligibility Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-5 font-space-grotesk">Eligibility Requirements</h3>
                  <div className="space-y-4">
                    {product.eligibility.map((req, i) => {
                      const ReqIcon = req.icon
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                            <ReqIcon className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{req.label}</p>
                            <p className="text-sm text-gray-500">{req.value}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative container px-4 md:px-6 py-14 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 font-space-grotesk">
                Ready to Find Your Perfect{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Funding Solution?
                </span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                Our funding experts will match you with the product that fits your unique business needs.
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
    </div>
  )
}
