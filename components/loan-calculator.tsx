"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const TIERS = [
  { label: "Just Starting (Under 6 months)", multiplier: null, term: null },
  { label: "6 – 12 Months", multiplier: 1.49, term: 12 },
  { label: "1 – 2 Years", multiplier: 1.79, term: 18 },
  { label: "2 – 5 Years", multiplier: 1.99, term: 24 },
  { label: "5+ Years", multiplier: 2.4, term: 36 },
] as const

const MIN_SALES = 200000
const MAX_SALES = 800000

function formatCurrency(val: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val)
}

function round100(n: number) { return Math.round(n / 100) * 100 }
function round10(n: number) { return Math.round(n / 10) * 10 }

export function LoanCalculator() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [annualSales, setAnnualSales] = useState(465000)
  const [inputValue, setInputValue] = useState("$465,000")

  const tier = TIERS.find((t) => t.label === selectedTier)
  const qualified = tier && tier.multiplier !== null

  const fundingAmount = qualified
    ? round100((annualSales / 12) * tier.multiplier)
    : null
  
  // Monthly Payment = (Funding ÷ Term) + (Funding × 6.75% ÷ 12)
  const PRIME_RATE = 0.0675
  const monthlyPayment = qualified && fundingAmount
    ? round10((fundingAmount / tier.term) + (fundingAmount * PRIME_RATE / 12))
    : null

  const sliderPct = ((annualSales - MIN_SALES) / (MAX_SALES - MIN_SALES)) * 100

  return (
    <div className="w-full">
      <style>{`
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #FF9500;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(255, 149, 0, 0.35);
          cursor: pointer;
        }
        .calc-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #FF9500;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(255, 149, 0, 0.35);
          cursor: pointer;
          border: none;
        }
      `}</style>

      {/* Header */}
      <div className="max-w-2xl mx-auto mb-4 px-4 sm:px-6">
        <h2 
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Loan Calculator
        </h2>
      </div>

      {/* Calculator Container */}
      <div className="max-w-2xl mx-auto">
        {/* Calculator Body */}
        <div 
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ background: "#ffffff" }}
        >
          {/* Input Area */}
          <div className="p-4 sm:p-6 space-y-5">
            {/* Annual Sales Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-2">
                Annual Sales Volume
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={(e) => {
                  let value = e.target.value
                  let numericOnly = value.replace(/[^\d]/g, "")
                  let withCommas = numericOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  let formatted = withCommas ? `$${withCommas}` : "$"
                  setInputValue(formatted)
                  if (numericOnly === "") return
                  setAnnualSales(Number(numericOnly))
                }}
                onBlur={(e) => {
                  const rawValue = e.target.value.replace(/[^\d]/g, "")
                  const numValue = rawValue === "" ? MIN_SALES : Math.min(Math.max(Number(rawValue) || MIN_SALES, MIN_SALES), MAX_SALES)
                  setAnnualSales(numValue)
                  setInputValue(`$${numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
                  e.currentTarget.style.borderColor = "#d6dfff"
                }}
                className="w-full rounded-lg p-3 text-center text-xl sm:text-2xl font-bold outline-none border-2 transition-all"
                style={{
                  color: "#0D1B2A",
                  background: "#f0f4ff",
                  borderColor: "#d6dfff",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2460e3"
                }}
              />
              <div className="mt-2">
                <input
                  type="range"
                  min={MIN_SALES}
                  max={MAX_SALES}
                  step={1000}
                  value={annualSales}
                  onChange={(e) => {
                    const newValue = Number(e.target.value)
                    setAnnualSales(newValue)
                    setInputValue(formatCurrency(newValue))
                  }}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer outline-none calc-slider"
                  style={{
                    background: `linear-gradient(to right, #FF9500 ${sliderPct}%, #d0d7e8 ${sliderPct}%)`,
                  }}
                />
                <div className="flex justify-between mt-1.5 text-[11px] font-semibold text-gray-500">
                  <span>{formatCurrency(MIN_SALES)}</span>
                  <span>{formatCurrency(MAX_SALES)}</span>
                </div>
              </div>
            </div>

            {/* Time in Business - Button Grid */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-2">
                Time in Business
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TIERS.map((t) => {
                  const active = selectedTier === t.label
                  return (
                    <button
                      key={t.label}
                      onClick={() => setSelectedTier(t.label)}
                      className={`py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        active
                          ? "text-white shadow-lg"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                      style={{
                        background: active ? "#D97706" : "rgba(36, 96, 227, 0.08)",
                        border: active ? "2px solid #F59E0B" : "2px solid rgba(36, 96, 227, 0.2)",
                      }}
                    >
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Display Screen */}
            <div className="p-4 sm:p-5 border-t border-gray-200 -mx-4 sm:-mx-6">
              <div className="mb-3">
                <div className="text-[11px] font-semibold text-black mb-1">Funding Estimate</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {fundingAmount ? formatCurrency(fundingAmount) : "—"}
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-600 to-transparent mb-3"></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-semibold text-black mb-0.5">Monthly Payment</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                    {monthlyPayment ? formatCurrency(monthlyPayment) : "—"}
                  </div>
                </div>
              </div>
            </div>


            {/* Not qualified message */}
            {selectedTier === "Just Starting (Under 6 months)" && (
              <div className="space-y-3">
                <div
                  className="rounded-lg p-4 text-sm font-semibold"
                  style={{ color: "#991b1b", background: "#fee2e2", border: "1px solid #fecaca" }}
                >
                  Sorry, you currently do not qualify for a loan yet. The minimum time in business is 6+ months. Please use the button below or call 937-751-6937 to schedule a follow when the time is right.
                </div>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg py-3 px-6 shadow-lg transition-all"
                >
                  <a href="https://calendly.com/turbofunding" target="_blank" rel="noopener noreferrer">
                    Schedule a Call
                  </a>
                </Button>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-[10px] text-gray-600 leading-tight m-0">
              *Results shown are estimates based on user-provided information and do not constitute a loan offer or commitment to lend. Final loan amount, term, and monthly payment are subject to credit approval, underwriting review, and verification of financial documentation. Actual rates and terms may vary. Monthly payment estimates include a variable interest component based on the current Wall Street Journal Prime Rate (6.75% as of March 2026), which represents a best-case rate for highly qualified applicants and is subject to change. Applicants who do not meet top-tier credit and financial criteria may be subject to higher rates. A change in the Prime Rate will result in a corresponding change to your estimated monthly payment.
            </p>

            {/* CTA Button */}
            <Button
              asChild
              className="w-full btn-gold-elite text-white text-sm font-bold tracking-wide rounded-lg py-3 px-6 shadow-lg mt-2"
            >
              <Link href="/apply">Get Funded Today!</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
