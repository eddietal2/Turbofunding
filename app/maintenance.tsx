import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

export const metadata = {
  title: "Maintenance in Progress",
  description: "We're performing scheduled maintenance. We'll be back soon!",
}

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Maintenance Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full p-6 animate-bounce">
                <Zap className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Scheduled Maintenance
            </h1>
            <p className="text-xl text-gray-400">We'll be back soon!</p>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <p className="text-lg text-gray-300 leading-relaxed">
              We're currently performing scheduled maintenance to improve your experience. Our team is working hard to
              get everything back online as quickly as possible.
            </p>

            {/* Timeline */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white mb-4">Estimated Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-white">Expected Duration:</span> 2-4 hours
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-white">Expected Return:</span> Check back soon!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-base h-12 px-8"
            >
              <a href="/" className="inline-block">
                Check Status
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-900 text-base h-12 px-8"
            >
              <a href="mailto:support@turbofunding.com" className="inline-block">
                Notify Me
              </a>
            </Button>
          </div>

          {/* Info Box */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">What's Being Improved?</h3>
            <ul className="text-left text-gray-300 space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Performance optimization and speed improvements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Security updates and enhancements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>New features and improvements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Better user experience</span>
              </li>
            </ul>
          </div>

          {/* Support Message */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-300">
              Need immediate assistance? Contact our support team at{" "}
              <a href="mailto:support@turbofunding.com" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                support@turbofunding.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
