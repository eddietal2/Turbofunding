"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckIcon, DollarSignIcon, ClockIcon, PercentIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

const products = [
  { id: "working-capital", name: "Term Loan" },
  { id: "line-of-credit", name: "Business Line of Credit" },
  { id: "sba-7a", name: "SBA 7a Loans" },
  { id: "sba-504", name: "SBA 504" },
  { id: "bridge-loan", name: "Bridge Loan" },
  { id: "merchant-cash", name: "Merchant Cash Advances" },
  { id: "equipment-financing", name: "Equipment Financing" },
]

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState("working-capital")

  // Map navbar product slugs to component product IDs
  const productSlugMap: { [key: string]: string } = {
    "working-capital": "working-capital",
    "merchant-cash-advance": "merchant-cash",
    "business-line-of-credit": "line-of-credit",
    "sba-7a-loans": "sba-7a",
    "sba-504": "sba-504",
    "bridge-loan": "bridge-loan",
    "equipment-financing": "equipment-financing",
  }

  useEffect(() => {
    const productParam = searchParams.get("product")
    if (productParam && productSlugMap[productParam]) {
      setSelectedProduct(productSlugMap[productParam])
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
      <main className="flex-1 flex">
        {/* Left Sidebar Navigation */}
        <aside className="hidden lg:flex lg:w-64 flex-col border-r border-gray-300 bg-white sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-1">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                    selectedProduct === product.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Mobile Dropdown */}
        <div className="lg:hidden w-full bg-white border-b border-gray-300">
          <div className="container px-4 md:px-6 py-4">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
              style={{ color: "#0D1B2A" }}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {selectedProduct === "working-capital" && (
            <section className="w-full py-8 md:py-12 bg-[#F5F7FA]">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">Term Loans</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      Term loans provide the financial resources your business needs to cover operational
                      expenses, manage cash flow gaps, and take advantage of growth opportunities without disrupting
                      your daily operations.
                    </p>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-orange-500">Key Benefits</h3>
                      <ul className="space-y-1" style={{ color: "#0D1B2A" }} role="list">
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Quick access to funds for immediate business needs</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Flexible repayment terms aligned with your cash flow</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Use funds for inventory, payroll, marketing, or unexpected expenses</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>No collateral required for qualified businesses</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3">
                      <Button asChild className="btn-blue-elite text-white text-lg font-semibold">
                        <Link href="/apply">Apply for Financing</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Term Loan Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Amount</div>
                          <div className="text-lg font-medium text-white">$10,000 - $500,000</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Term Length</div>
                          <div className="text-lg font-medium text-white">6 Months to 5 Years</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Funding Speed</div>
                          <div className="text-lg font-medium text-white">As fast as 24 hours</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Interest Rate</div>
                          <div className="text-lg font-medium text-white">Starting at 8%</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Eligibility Requirements</h3>
                      <ul className="space-y-1" role="list">
                        <li className="flex items-start">
                          <DollarSignIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Minimum Revenue:</span>
                            <p className="text-gray-300">$100,000+ annual revenue</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ClockIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Time in Business:</span>
                            <p className="text-gray-300">6+ months</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <PercentIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Credit Score:</span>
                            <p className="text-gray-300">550+ for owners</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-orange-500 mb-2">Best For:</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>Businesses needing to cover short-term operating expenses</li>
                        <li>Managing seasonal cash flow fluctuations</li>
                        <li>Purchasing inventory or supplies</li>
                        <li>Handling unexpected costs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {selectedProduct === "merchant-cash" && (
            <section className="w-full py-8 md:py-12 bg-[#F5F7FA]">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">Merchant Cash Advances</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      Provide immediate funding in exchange for a percentage of your future receivables. Perfect for businesses with recurring revenue.
                    </p>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-orange-500">Key Benefits</h3>
                      <ul className="space-y-1" style={{ color: "#0D1B2A" }} role="list">
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Fast approval and funding, often within 24 hours</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Repayment automatically adjusts with your sales volume</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>No fixed monthly payments - pay as you earn</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Minimal paperwork and quick application process</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Pre-Payment Discount</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3">
                      <Button asChild className="btn-blue-elite text-white text-lg font-semibold">
                        <Link href="/apply">Apply for Financing</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">MCA Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Amount</div>
                          <div className="text-lg font-medium text-white">$5,000 - $500,000</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Repayment</div>
                          <div className="text-lg font-medium text-white">6-36 months</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Funding Speed</div>
                          <div className="text-lg font-medium text-white">24-48 hours</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Rate</div>
                          <div className="text-lg font-medium text-white">1%-3% per month</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Eligibility</h3>
                      <ul className="space-y-1" role="list">
                        <li className="flex items-start">
                          <DollarSignIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Monthly Card Sales:</span>
                            <p className="text-gray-300">$10,000+ monthly</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ClockIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Time in Business:</span>
                            <p className="text-gray-300">6+ months</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <PercentIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Credit Score:</span>
                            <p className="text-gray-300">500+</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-orange-500 mb-2">Best For:</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>General Working Capital</li>
                        <li>Fast-Growing Businesses</li>
                        <li>Bridge Financing</li>
                        <li>Same Day Funding</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {selectedProduct === "line-of-credit" && (
            <section className="w-full py-8 md:py-12 bg-[#F5F7FA]">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">Business Line of Credit</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      Revolving credit facility perfect for managing cash flow fluctuations and unexpected expenses.
                    </p>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-orange-500">Key Benefits</h3>
                      <ul className="space-y-1" style={{ color: "#0D1B2A" }} role="list">
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Access funds instantly when opportunities arise</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Only pay interest on the amount you draw</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Revolving credit - repay and reuse</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Perfect for seasonal businesses</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3">
                      <Button asChild className="btn-blue-elite text-white text-lg font-semibold">
                        <Link href="/apply">Apply for Financing</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">LOC Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Credit Limit</div>
                          <div className="text-lg font-medium text-white">$10K - $250K</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Draw Period</div>
                          <div className="text-lg font-medium text-white">12-24 months</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Access Speed</div>
                          <div className="text-lg font-medium text-white">Same day</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Interest Rate</div>
                          <div className="text-lg font-medium text-white">As low as 1% per month</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Eligibility</h3>
                      <ul className="space-y-1" role="list">
                        <li className="flex items-start">
                          <DollarSignIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Annual Revenue:</span>
                            <p className="text-gray-300">$150K+</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ClockIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Time in Business:</span>
                            <p className="text-gray-300">12+ months</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <PercentIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Credit Score:</span>
                            <p className="text-gray-300">600+</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-orange-500 mb-2">Best For:</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>Seasonal cash flow management</li>
                        <li>Short-term working capital</li>
                        <li>Unexpected opportunities</li>
                        <li>Receivables/payables gaps</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {selectedProduct === "sba-7a" && (
            <section className="w-full py-8 md:py-12 bg-[#F5F7FA]">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">SBA 7a Loans</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      Most popular SBA program for long-term financing with competitive rates and flexible terms.
                    </p>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-orange-500">Key Benefits</h3>
                      <ul className="space-y-1" style={{ color: "#0D1B2A" }} role="list">
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Lower down payments (as low as 10%)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Competitive rates backed by SBA</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Terms up to 25 years</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Multiple business uses</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3">
                      <Button asChild className="btn-blue-elite text-white text-lg font-semibold">
                        <Link href="/apply">Apply for Financing</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">SBA 7a Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Loan Amount</div>
                          <div className="text-lg font-medium text-white">Up to $5M</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Terms</div>
                          <div className="text-lg font-medium text-white">Up to 25 years</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Processing Time</div>
                          <div className="text-lg font-medium text-white">30-90 days</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Interest Rate</div>
                          <div className="text-lg font-medium text-white">Prime + 2.75-4.75%</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Eligibility</h3>
                      <ul className="space-y-1" role="list">
                        <li className="flex items-start">
                          <DollarSignIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Business Size:</span>
                            <p className="text-gray-300">Meet SBA standards</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ClockIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Time in Business:</span>
                            <p className="text-gray-300">2+ years</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <PercentIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Credit Score:</span>
                            <p className="text-gray-300">600+</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-orange-500 mb-2">Best For:</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>Business acquisitions</li>
                        <li>Real estate purchases</li>
                        <li>Long-term working capital</li>
                        <li>Equipment purchases</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {selectedProduct === "sba-504" && (
            <section className="w-full py-8 md:py-12 bg-[#F5F7FA]">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">SBA 504 Loans</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      Long-term, fixed-rate financing for major fixed assets like real estate and heavy equipment.
                    </p>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-orange-500">Key Benefits</h3>
                      <ul className="space-y-1" style={{ color: "#0D1B2A" }} role="list">
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Fixed rates for life of loan</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Low down payment (typically 10%)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Terms up to 25 years</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Below-market rates</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3">
                      <Button asChild className="btn-blue-elite text-white text-lg font-semibold">
                        <Link href="/apply">Apply for Financing</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">SBA 504 Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Loan Amount</div>
                          <div className="text-lg font-medium text-white">Up to $5.5M</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Terms</div>
                          <div className="text-lg font-medium text-white">10, 20, 25 years</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Processing Time</div>
                          <div className="text-lg font-medium text-white">45-90 days</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Interest Rate</div>
                          <div className="text-lg font-medium text-white">Fixed below market</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Eligibility</h3>
                      <ul className="space-y-1" role="list">
                        <li className="flex items-start">
                          <DollarSignIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Use of Funds:</span>
                            <p className="text-gray-300">Real estate, equipment</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ClockIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Job Creation:</span>
                            <p className="text-gray-300">Must create/retain jobs</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <PercentIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Owner Occupancy:</span>
                            <p className="text-gray-300">51% requirement</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-orange-500 mb-2">Best For:</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>Commercial real estate</li>
                        <li>Facility building/renovation</li>
                        <li>Heavy machinery</li>
                        <li>Long-term investments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {selectedProduct === "bridge-loan" && (
            <section className="w-full py-8 md:py-12 bg-[#F5F7FA]">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">Bridge Loans</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      Short-term financing to bridge gaps between purchasing new property and securing permanent funding.
                    </p>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-orange-500">Key Benefits</h3>
                      <ul className="space-y-1" style={{ color: "#0D1B2A" }} role="list">
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Quick funding to close deals</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Immediate capital available</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Simple qualification process</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>No prepayment penalties</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3">
                      <Button asChild className="btn-blue-elite text-white text-lg font-semibold">
                        <Link href="/apply">Apply for Financing</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Bridge Loan Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Loan Amount</div>
                          <div className="text-lg font-medium text-white">$50K - $5M</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Term Length</div>
                          <div className="text-lg font-medium text-white">3 - 12 months</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Funding Speed</div>
                          <div className="text-lg font-medium text-white">5-10 business days</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Interest Rate</div>
                          <div className="text-lg font-medium text-white">7% - 12%</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Eligibility</h3>
                      <ul className="space-y-1" role="list">
                        <li className="flex items-start">
                          <DollarSignIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Asset Value:</span>
                            <p className="text-gray-300">Sufficient collateral</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ClockIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Exit Strategy:</span>
                            <p className="text-gray-300">Clear repayment plan</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <PercentIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Credit Score:</span>
                            <p className="text-gray-300">600+</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-orange-500 mb-2">Best For:</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>Real estate deals</li>
                        <li>Business acquisitions</li>
                        <li>Time-sensitive deals</li>
                        <li>Financing gaps</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {selectedProduct === "equipment-financing" && (
            <section className="w-full py-8 md:py-12 bg-[#F5F7FA]">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">Equipment Financing</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      Capital for purchasing or leasing machinery, vehicles, technology, and business equipment.
                    </p>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-orange-500">Key Benefits</h3>
                      <ul className="space-y-1" style={{ color: "#0D1B2A" }} role="list">
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Lower rates - equipment is collateral</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Flexible terms aligned with lifespan</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Finance 100% with minimal down</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Preserve working capital</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3">
                      <Button asChild className="btn-blue-elite text-white text-lg font-semibold">
                        <Link href="/apply">Apply for Financing</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Equipment Financing Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Amount</div>
                          <div className="text-lg font-medium text-white">$2.5K - $2M</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Loan Term</div>
                          <div className="text-lg font-medium text-white">2 - 7 years</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Funding Speed</div>
                          <div className="text-lg font-medium text-white">5-15 business days</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Interest Rate</div>
                          <div className="text-lg font-medium text-white">Starting at 6.5%</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Eligibility</h3>
                      <ul className="space-y-1" role="list">
                        <li className="flex items-start">
                          <DollarSignIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Equipment:</span>
                            <p className="text-gray-300">Commercial/industrial</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ClockIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Time in Business:</span>
                            <p className="text-gray-300">6+ months</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <PercentIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Credit Score:</span>
                            <p className="text-gray-300">550+</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-orange-500 mb-2">Best For:</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>Machinery & industrial equipment</li>
                        <li>Fleet vehicles</li>
                        <li>IT infrastructure</li>
                        <li>Construction equipment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
