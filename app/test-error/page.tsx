"use client"

import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Suspense } from "react"

function TestErrorContent() {
  const searchParams = useSearchParams()
  const showError = searchParams.get("error") === "true"

  if (showError) {
    // Display the same error page UI
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-20 relative z-10">
          <div className="max-w-2xl w-full text-center space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-full p-6">
                  <AlertTriangle className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-9xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                500
              </h1>
              <p className="text-xl text-gray-400">Something went wrong</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Oops! Internal Server Error
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                We encountered an unexpected error. Our team has been notified and is working to fix it. Please try again
                in a moment.
              </p>
            </div>

            <div className="flex justify-center pt-6">
              <Button
                onClick={() => window.location.href = "/test-error"}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-base h-12 px-8 inline-flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </Button>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mt-12">
              <p className="text-gray-300">
                Need immediate assistance? Contact our support team at{" "}
                <a href="mailto:support@turbofunding.com" className="text-red-400 hover:text-red-300 font-semibold">
                  support@turbofunding.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">Error Testing Page</h1>
        <p className="text-lg text-gray-400">Choose an option below to test error pages</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.location.href = "/test-error?error=true"}
            className="bg-red-600 hover:bg-red-700 text-white text-lg h-12 px-8"
          >
            View Error 500 Page (Dev &amp; Prod)
          </Button>
          <Button
            onClick={() => {
              throw new Error("Test 500 error - this is intentional for testing the error page UI")
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white text-lg h-12 px-8"
          >
            Trigger Dev Overlay (Prod Only)
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-8">This page will be deleted after testing</p>
      </div>
    </div>
  )
}

export default function TestErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestErrorContent />
    </Suspense>
  )
}
