"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckIcon, DollarSignIcon, ClockIcon, PercentIcon } from "lucide-react"
import { useState } from "react"

export default function ProductsClient() {
  const [selectedProduct, setSelectedProduct] = useState("working-capital")

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
      <main className="flex-1">
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
    </div>
  )
}
