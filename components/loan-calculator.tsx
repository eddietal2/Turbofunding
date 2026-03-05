"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const TIERS = [
  { label: "Not Open Yet", multiplier: null, term: null },
  { label: "3 – 9 Months", multiplier: 1.49, term: 12 },
  { label: "10 – 24 Months", multiplier: 1.79, term: 18 },
  { label: "2 – 5 Years", multiplier: 1.99, term: 24 },
  { label: "5 Years+", multiplier: 2.4, term: 36 },
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
  const monthlyPayment = qualified && fundingAmount
    ? round10(fundingAmount / tier.term)
    : null

  const sliderPct = ((annualSales - MIN_SALES) / (MAX_SALES - MIN_SALES)) * 100

  return (
    <div className="w-full">
      <div
        className="bg-white rounded-2xl md:rounded-3xl shadow-xl max-w-[960px] w-full mx-auto p-6 sm:p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
        style={{ border: "1px solid rgba(36, 96, 227, 0.08)" }}
      >
        {/* LEFT SIDE — Inputs */}
        <div>
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div
              className="text-[11px] font-bold tracking-[0.12em] uppercase mb-2"
              style={{ color: "#2460e3", fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Business Loan Calculator
            </div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold leading-tight"
              style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              See how much<br />you qualify for
            </h2>
          </div>

          {/* Time in Business */}
          <div className="mb-6 md:mb-8">
            <label
              className="block text-sm font-semibold mb-3"
              style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Time in Business
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {TIERS.map((t) => {
                const active = selectedTier === t.label
                const colSpan =
                  t.label === "2 – 5 Years" ? "col-span-2" : ""
                return (
                  <button
                    key={t.label}
                    onClick={() => setSelectedTier(t.label)}
                    className={`px-3 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 ${colSpan} ${
                      active
                        ? "bg-[#2460e3] text-white border-2 border-[#2460e3] shadow-md"
                        : "bg-white text-[#0D1B2A] border-2 border-gray-200 hover:border-[#2460e3]/40"
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sales Slider */}
          <div>
            <label
              className="block text-sm font-semibold mb-3"
              style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              My annual sales volume is around...
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={(e) => {
                let value = e.target.value
                // Remove $ and any non-digits
                let numericOnly = value.replace(/[^\d]/g, "")
                
                // Add commas
                let withCommas = numericOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                
                // Add $ prefix
                let formatted = withCommas ? `$${withCommas}` : "$"
                setInputValue(formatted)
                
                // Update annualSales with numeric value only
                if (numericOnly === "") return
                setAnnualSales(Number(numericOnly))
              }}
              onBlur={(e) => {
                const rawValue = e.target.value.replace(/[^\d]/g, "")
                const numValue = rawValue === "" ? MIN_SALES : Math.min(Math.max(Number(rawValue) || MIN_SALES, MIN_SALES), MAX_SALES)
                setAnnualSales(numValue)
                setInputValue(`$${numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
                e.target.style.borderColor = "#d6dfff"
              }}
              className="w-full rounded-xl p-5 text-center mb-4 text-3xl sm:text-4xl font-extrabold tracking-tight border-2 outline-none transition-all"
              style={{
                color: "#0D1B2A",
                background: "#f0f4ff",
                borderColor: "#d6dfff",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2460e3"
              }}
            />

            <div className="relative py-1.5">
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
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none calc-slider"
                style={{
                  background: `linear-gradient(to right, #FF9500 ${sliderPct}%, #d0d7e8 ${sliderPct}%)`,
                }}
              />
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
                }
              `}</style>
            </div>

            <div className="flex justify-between mt-2 text-xs font-semibold text-gray-400">
              <span>{formatCurrency(MIN_SALES)}</span>
              <span>{formatCurrency(MAX_SALES)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Results */}
        <div className="flex flex-col gap-4">
          {/* Funding Amount Card */}
          <div
            className="rounded-2xl p-6 md:p-7 transition-all duration-300"
            style={{
              background: fundingAmount ? "#f0f4ff" : "#fafafa",
              border: `1px solid ${fundingAmount ? "#c7d4ff" : "#e8ecf2"}`,
            }}
          >
            <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-2.5">
              * Estimated Funding Amount
            </div>
            <div
              className={`font-extrabold tracking-tight leading-none transition-all duration-300 ${
                fundingAmount ? "text-4xl sm:text-[44px]" : "text-3xl"
              }`}
              style={{ color: fundingAmount ? "#0D1B2A" : "#c0c8d8" }}
            >
              {fundingAmount ? formatCurrency(fundingAmount) : "—"}
            </div>
          </div>

          {/* Monthly Payment Card */}
          <div
            className="rounded-2xl p-6 md:p-7 transition-all duration-300"
            style={{
              background: monthlyPayment ? "#f0f4ff" : "#fafafa",
              border: `1px solid ${monthlyPayment ? "#c7d4ff" : "#e8ecf2"}`,
            }}
          >
            <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-2.5">
              * Estimated Monthly Payment
            </div>
            <div
              className={`font-extrabold tracking-tight leading-none transition-all duration-300 ${
                monthlyPayment ? "text-4xl sm:text-[44px]" : "text-3xl"
              }`}
              style={{ color: monthlyPayment ? "#0D1B2A" : "#c0c8d8" }}
            >
              {monthlyPayment ? formatCurrency(monthlyPayment) : "—"}
            </div>
          </div>

          {/* Not qualified message */}
          {selectedTier === "Not Open Yet" && (
            <div
              className="rounded-xl p-4 text-sm font-semibold leading-relaxed"
              style={{ color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca" }}
            >
              Sorry, you currently do not qualify for a loan at this time. The minimum time in business is 6+ months.
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-[11px] text-gray-400 leading-relaxed m-0">
            * Results shown are estimates based on user-provided information and do not constitute a loan offer. Final loan amount and monthly payment are contingent upon credit approval and verification of financial documentation          </p>

          {/* CTA */}
          <Button
            asChild
            className="btn-gold-elite text-white text-base font-bold tracking-wide rounded-full py-5 px-8 shadow-lg mt-1"
          >
            <Link href="/apply">Get Funded Today!</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
