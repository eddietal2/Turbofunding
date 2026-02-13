"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CountUp from "react-countup"

export function LoanCalculator() {
  const [paymentFrequency, setPaymentFrequency] = useState<"monthly" | "biweekly">("monthly")
  const [drawAmount, setDrawAmount] = useState(100000)
  const [paymentsMade, setPaymentsMade] = useState(0)

  // Constants
  const N = paymentFrequency === "monthly" ? 12 : 26
  
  // Calculations
  const naturalMax = drawAmount * (1 + 0.01 * 12)
  const payment = naturalMax / N
  const monthsElapsed = paymentFrequency === "monthly" ? paymentsMade : paymentsMade * (12 / 26)
  const payoffBeforeNext = drawAmount * (1 + 0.01 * monthsElapsed)
  const earlyPay = payoffBeforeNext - payment * paymentsMade
  const paidSoFar = payment * paymentsMade
  const savings = naturalMax - (paidSoFar + earlyPay)

  const handleDrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value)) {
      setDrawAmount(value)
    }
  }

  const handlePaymentsIncrease = () => {
    const maxPayments = N
    if (paymentsMade < maxPayments) {
      setPaymentsMade(paymentsMade + 1)
    }
  }

  const handlePaymentsDecrease = () => {
    if (paymentsMade > 0) {
      setPaymentsMade(paymentsMade - 1)
    }
  }

  const handlePaymentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    const maxPayments = N
    setPaymentsMade(Math.min(Math.max(value, 0), maxPayments))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const drawProgress = (drawAmount / 1000000) * 100
  const paymentProgress = (paymentsMade / N) * 100

  return (
    <section className="w-full py-2 md:py-3 bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-full md:max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-2 md:mb-2.5">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              TurboFunding Platinum Calculator
            </h2>
            <p className="text-gray-600 text-xs md:text-sm">
              Enter an amount to see your savings potential
            </p>
          </div>

          {/* Payment Frequency Toggle */}
          <div className="flex justify-center gap-1.5 mb-3">
            <button
              onClick={() => setPaymentFrequency("monthly")}
              className={`px-3 md:px-4 py-1 text-xs md:text-sm rounded-full font-semibold transition-all ${
                paymentFrequency === "monthly"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Monthly (12)
            </button>
            <button
              onClick={() => setPaymentFrequency("biweekly")}
              className={`px-3 md:px-4 py-1 text-xs md:text-sm rounded-full font-semibold transition-all ${
                paymentFrequency === "biweekly"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Bi-Weekly (26)
            </button>
          </div>

          <Card className="border-2 border-orange-200 shadow-lg">
            <CardContent className="p-3 md:p-3.5">
              {/* Funding Amount Section */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm md:text-base font-semibold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    Funding Amount: $<CountUp end={drawAmount} duration={0.3} preserveValue={true} useEasing={true} />
                  </label>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="1000000"
                  step="1000"
                  value={drawAmount}
                  onChange={handleDrawChange}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${drawProgress}%, #d1d5db ${drawProgress}%, #d1d5db 100%)`,
                  }}
                />
                <div className="flex justify-between items-start mt-0.5">
                  <p className="text-xs text-gray-600">
                    Request additional funding anytime
                  </p>
                  <p className="text-xs text-orange-600 font-semibold">
                    Minimum: $1,000
                  </p>
                </div>
              </div>

              {/* Payments Made Section */}
              <div className="mb-3 pb-3 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm md:text-base font-semibold text-gray-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Payments: {paymentsMade}</label>
                  <div className="flex gap-1">
                    <button
                      onClick={handlePaymentsDecrease}
                      className="px-2 md:px-2.5 py-0.5 md:py-1 text-xs bg-orange-100 hover:bg-orange-200 text-orange-600 font-semibold rounded-lg transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="0"
                      max={N}
                      value={paymentsMade}
                      onChange={handlePaymentsChange}
                      className="w-10 md:w-12 px-1.5 md:px-2 py-0.5 md:py-1 border border-orange-300 rounded-lg text-center text-xs font-medium text-orange-600"
                    />
                    <button
                      onClick={handlePaymentsIncrease}
                      className="px-2 md:px-2.5 py-0.5 md:py-1 text-xs bg-orange-100 hover:bg-orange-200 text-orange-600 font-semibold rounded-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mb-1.5">
                  <div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 transition-all duration-300"
                      style={{ width: `${paymentProgress}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-600">0 of {N}</p>
              </div>

              {/* Months Elapsed - Hidden on Desktop */}
              <div className="mb-3 hidden md:block">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-600">Months: {monthsElapsed.toFixed(2)}</p>
                </div>
              </div>

              {/* Grid of Metrics */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {/* Natural Max */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-0.5">Natural Max</p>
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    $<CountUp end={naturalMax} duration={0.3} decimals={2} preserveValue={true} useEasing={true} />
                  </p>
                </div>

                {/* Scheduled Payment */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-0.5">Payment ({N}x)</p>
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    $<CountUp end={payment} duration={0.3} decimals={2} preserveValue={true} useEasing={true} />
                  </p>
                </div>

                {/* Paid So Far */}
                <div className="bg-white border border-gray-300 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-0.5">Paid So Far</p>
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    $<CountUp end={paidSoFar} duration={0.3} decimals={2} preserveValue={true} useEasing={true} />
                  </p>
                </div>

                {/* Payoff Before Next Payment */}
                <div className="bg-white border border-gray-300 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-0.5">Payoff Next</p>
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    $<CountUp end={payoffBeforeNext} duration={0.3} decimals={2} preserveValue={true} useEasing={true} />
                  </p>
                </div>
              </div>

              {/* Highlighted Benefits */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-0.5">Early Payoff</p>
                  <p className="text-base md:text-lg font-bold text-blue-700">
                    $<CountUp end={earlyPay} duration={0.3} decimals={2} preserveValue={true} useEasing={true} />
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                  <p className="text-xs text-gray-600 mb-0.5">Your Savings</p>
                  <p className="text-base md:text-lg font-bold text-blue-700">
                    $<CountUp end={Math.max(savings, 0)} duration={0.3} decimals={2} preserveValue={true} useEasing={true} />
                  </p>
                </div>
              </div>

              {/* Formula Reference - Minimal on Desktop */}
              <div className="mt-2 pt-2 border-t border-gray-200 hidden md:block">
                <p className="text-xs text-gray-500 font-mono leading-none">
                  Formula: Max = Draw × 1.12 | Payment = Max ÷ N | Payoff = Draw × (1 + 0.01M) | Savings = Max − (Paid + Early)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-2.5">
            <Button asChild size="sm" className="bg-orange-500 text-white hover:bg-orange-600 text-xs md:text-sm px-4 md:px-6 py-1.5 md:py-2">
              <a href="/apply">Get Funded</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
