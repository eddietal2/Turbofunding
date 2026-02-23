"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
          {/* Background decorative elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-full p-6">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Something Critical Happened
              </h1>
              <p className="text-lg text-gray-400">
                We're experiencing a critical error. Our team has been notified and is working to restore the service.
              </p>
            </div>

            {/* Error Details */}
            {error && (
              <div className="bg-gray-900 border border-red-500/30 rounded-lg p-4 text-left max-w-md mx-auto">
                <p className="text-xs font-mono text-red-400 mb-2">Error Message:</p>
                <p className="text-xs font-mono text-gray-300">{error.message}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                onClick={reset}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all"
              >
                Try Again
              </button>
              <a
                href="/"
                className="px-8 py-3 border border-gray-600 text-white hover:bg-gray-900 font-semibold rounded-lg transition-all"
              >
                Go Home
              </a>
            </div>

            {/* Contact Info */}
            <p className="text-gray-400 text-sm">
              If the problem persists, please contact{" "}
              <a href="mailto:support@turbofunding.com" className="text-red-400 hover:text-red-300 font-semibold">
                support@turbofunding.com
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
