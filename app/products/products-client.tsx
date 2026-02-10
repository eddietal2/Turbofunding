"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftIcon, CheckIcon, DollarSignIcon, ClockIcon, PercentIcon } from "lucide-react"
import { useState } from "react"

export default function ProductsClient() {
  const [selectedProduct, setSelectedProduct] = useState("working-capital")

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-4 md:py-8 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <nav aria-label="Breadcrumb">
                <Link href="/" className="flex items-center text-orange-400 hover:text-orange-300">
                  <ArrowLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  Back to Home
                </Link>
              </nav>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-500 mt-2">
                Business Funding Products
              </h1>
              <p className="max-w-[700px] text-orange-400 md:text-xl mt-2">
                Explore our range of flexible funding options designed to help your business grow and succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="w-full py-2 md:py-4 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6">
            <Tabs value={selectedProduct} onValueChange={setSelectedProduct} className="w-full">
              {/* Mobile Dropdown - visible only on small screens */}
              <div className="flex justify-center mb-6">
                <div className="md:hidden w-full max-w-md">
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full bg-[#F5F7FA] border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
                    style={{ color: "#0D1B2A" }}
                  >
                    <option value="working-capital">Working Capital</option>
                    <option value="merchant-cash">Merchant Cash Advances</option>
                    <option value="line-of-credit">Business Line of Credit</option>
                    <option value="sba-7a">SBA 7a Loans</option>
                    <option value="sba-504">SBA 504</option>
                  </select>
                </div>

                {/* Desktop Tabs - hidden on small screens */}
                <TabsList
                  className="hidden md:flex bg-gray-100 p-1 overflow-x-auto max-w-full flex-wrap justify-center"
                  role="tablist"
                >
                  <TabsTrigger
                    value="working-capital"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Working Capital
                  </TabsTrigger>
                  <TabsTrigger
                    value="merchant-cash"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Merchant Cash Advances
                  </TabsTrigger>
                  <TabsTrigger
                    value="line-of-credit"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Business Line of Credit
                  </TabsTrigger>
                  <TabsTrigger
                    value="sba-7a"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    SBA 7a Loans
                  </TabsTrigger>
                  <TabsTrigger
                    value="sba-504"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    SBA 504
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Working Capital Loans */}
              <TabsContent value="working-capital" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">Working Capital Loans</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      Working capital provides the financial resources your business needs to cover operational
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
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/apply">Apply for Working Capital</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Working Capital Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Amount</div>
                          <div className="text-lg font-medium text-white">$10,000 - $500,000</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Term Length</div>
                          <div className="text-lg font-medium text-white">3 - 18 months</div>
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
                          <DollarSignIcon
                            className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
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
                          <PercentIcon
                            className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
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
              </TabsContent>

              {/* Merchant Cash Advances */}
              <TabsContent value="merchant-cash" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">Merchant Cash Advances</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      Merchant Cash Advances provide immediate funding in exchange for a percentage of your future
                      credit card sales. This flexible solution is perfect for businesses with consistent card
                      transactions who need quick access to capital.
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
                      </ul>
                    </div>
                    <div className="pt-3">
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/apply">Apply for Merchant Cash Advance</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Merchant Cash Advance Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Amount</div>
                          <div className="text-lg font-medium text-white">$5,000 - $500,000</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Repayment</div>
                          <div className="text-lg font-medium text-white">% of daily sales</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Funding Speed</div>
                          <div className="text-lg font-medium text-white">24-48 hours</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Interest Rate</div>
                          <div className="text-lg font-medium text-white">1.1 - 1.5</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Eligibility Requirements</h3>
                      <ul className="space-y-1" role="list">
                        <li className="flex items-start">
                          <DollarSignIcon
                            className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-medium text-white">Monthly Card Sales:</span>
                            <p className="text-gray-300">$10,000+ in monthly credit card processing</p>
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
                          <PercentIcon
                            className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-medium text-white">Credit Score:</span>
                            <p className="text-gray-300">500+ for owners</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-orange-500 mb-2">Best For:</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>Retail and restaurant businesses with high card volume</li>
                        <li>Businesses needing immediate funding</li>
                        <li>Companies with fluctuating seasonal sales</li>
                        <li>Fast-growing businesses</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Business Line of Credit */}
              <TabsContent value="line-of-credit" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">Business Line of Credit</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      A Business Line of Credit provides you with a revolving credit facility that you can draw from as
                      needed. Only pay interest on what you use, making it perfect for managing cash flow fluctuations
                      and unexpected expenses.
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
                          <span>Revolving credit - repay and reuse your credit line</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Perfect for seasonal businesses and cash flow management</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3">
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/apply">Apply for Line of Credit</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Line of Credit Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Credit Limit</div>
                          <div className="text-lg font-medium text-white">$10,000 - $250,000</div>
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
                          <div className="text-lg font-medium text-white">Starting at 12%</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Eligibility Requirements</h3>
                      <ul className="space-y-1" role="list">
                        <li className="flex items-start">
                          <DollarSignIcon
                            className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-medium text-white">Annual Revenue:</span>
                            <p className="text-gray-300">$150,000+ annual revenue</p>
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
                          <PercentIcon
                            className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-medium text-white">Credit Score:</span>
                            <p className="text-gray-300">650+ for owners</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-orange-500 mb-2">Best For:</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>Managing seasonal cash flow fluctuations</li>
                        <li>Covering short-term working capital needs</li>
                        <li>Taking advantage of unexpected opportunities</li>
                        <li>Bridging gaps between receivables and payables</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* SBA 7a Loans */}
              <TabsContent value="sba-7a" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">SBA 7a Loans</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      SBA 7a loans are the most popular SBA loan program, offering long-term financing with competitive
                      rates and flexible terms. These government-backed loans are ideal for working capital, equipment
                      purchases, real estate, and business acquisitions.
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
                          <span>Competitive interest rates backed by SBA guarantee</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Longer repayment terms up to 25 years</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Can be used for multiple business purposes</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3">
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/apply">Apply for SBA 7a Loan</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">SBA 7a Loan Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Loan Amount</div>
                          <div className="text-lg font-medium text-white">Up to $5,000,000</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Repayment Terms</div>
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
                      <h3 className="text-xl font-semibold text-orange-500">Eligibility Requirements</h3>
                      <ul className="space-y-1" role="list">
                        <li className="flex items-start">
                          <DollarSignIcon
                            className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-medium text-white">Business Size:</span>
                            <p className="text-gray-300">Must meet SBA size standards</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ClockIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Time in Business:</span>
                            <p className="text-gray-300">2+ years preferred</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <PercentIcon
                            className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-medium text-white">Credit Score:</span>
                            <p className="text-gray-300">680+ for owners</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-orange-500 mb-2">Best For:</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>Business acquisitions and expansions</li>
                        <li>Real estate purchases for business use</li>
                        <li>Long-term working capital needs</li>
                        <li>Equipment and machinery purchases</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* SBA 504 */}
              <TabsContent value="sba-504" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-orange-500">SBA 504 Loans</h3>
                    <p style={{ color: "#0D1B2A" }}>
                      SBA 504 loans provide long-term, fixed-rate financing for major fixed assets like real estate and
                      heavy equipment. This program promotes business growth and job creation with attractive terms and
                      low down payments.
                    </p>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-orange-500">Key Benefits</h3>
                      <ul className="space-y-1" style={{ color: "#0D1B2A" }} role="list">
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Fixed interest rates for the life of the loan</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Low down payment (typically 10%)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Long repayment terms up to 20-25 years</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>Below-market interest rates</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3">
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/apply">Apply for SBA 504 Loan</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">SBA 504 Loan Details</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Loan Amount</div>
                          <div className="text-lg font-medium text-white">Up to $5,500,000</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Repayment Terms</div>
                          <div className="text-lg font-medium text-white">10, 20, or 25 years</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Processing Time</div>
                          <div className="text-lg font-medium text-white">45-90 days</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Interest Rate</div>
                          <div className="text-lg font-medium text-white">Fixed rates below market</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-500">Eligibility Requirements</h3>
                      <ul className="space-y-1" role="list">
                        <li className="flex items-start">
                          <DollarSignIcon
                            className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-medium text-white">Use of Funds:</span>
                            <p className="text-gray-300">Real estate, equipment, or improvements</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <ClockIcon className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-white">Job Creation:</span>
                            <p className="text-gray-300">Must create or retain jobs</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <PercentIcon
                            className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-medium text-white">Owner Occupancy:</span>
                            <p className="text-gray-300">51% owner-occupied requirement</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-orange-500 mb-2">Best For:</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>Purchasing commercial real estate</li>
                        <li>Building new facilities or renovating existing ones</li>
                        <li>Acquiring heavy machinery or equipment</li>
                        <li>Long-term capital investments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913C12.385.012 12.792 0 13.58.072c1.277.06 2.148.262 2.913.558.788.306 1.459.718 2.126 1.384.667.666 1.079 1.335 1.384 2.126.296.766.499 1.636.558 2.913.06 1.28.072 1.687.072 4.947s-.015 3.667-.072 4.947c-.06 1.277-.261 2.148-.558 2.913-.306.788-.717 1.459-1.384 2.126C21.319 1.347 20.651.935 19.86.63c-.766-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.072 1.646.072 4.947s-.015 3.585-.072 4.85c-.061 1.17-.256 1.805-.421 2.227-.562.224-.96.479-1.382.896-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42 2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.421-.42.824-.679 1.38-.896.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
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
