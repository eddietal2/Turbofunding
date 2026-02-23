"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Alert Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-full p-6">
                <AlertTriangle className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* 500 Error Code */}
          <div className="space-y-2">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              500
            </h1>
            <p className="text-xl text-gray-400">Something went wrong</p>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Oops! Internal Server Error
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              We encountered an unexpected error. Our team has been notified and is working to fix it. Please try again
              in a moment.
            </p>
          </div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === "development" && error && (
            <div className="bg-gray-900 border border-red-500/30 rounded-lg p-4 text-left">
              <p className="text-xs font-mono text-red-400 mb-2">Error Details:</p>
              <div className="bg-black/50 rounded p-3 overflow-auto max-h-48">
                <p className="text-xs font-mono text-gray-300 whitespace-pre-wrap break-words">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs font-mono text-gray-400 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center pt-6">
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-base h-12 px-8 inline-flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-700 mt-8">
            <Link
              href="/"
              className="text-gray-400 hover:text-red-400 transition-colors py-4"
            >
              <div className="font-semibold text-white mb-1">Home</div>
              <div className="text-sm">Return to homepage</div>
            </Link>
            <Link
              href="/products"
              className="text-gray-400 hover:text-red-400 transition-colors py-4"
            >
              <div className="font-semibold text-white mb-1">Products</div>
              <div className="text-sm">Explore funding products</div>
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-red-400 transition-colors py-4"
            >
              <div className="font-semibold text-white mb-1">Contact Us</div>
              <div className="text-sm">Get help from our team</div>
            </Link>
          </div>

          {/* Support Message */}
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
