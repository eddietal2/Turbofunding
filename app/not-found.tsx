import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, Home, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Alert Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-6">
                <AlertCircle className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* 404 Number */}
          <div className="space-y-2">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              404
            </h1>
            <p className="text-xl text-gray-400">Page Not Found</p>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Oops! We Couldn't Find That Page
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              The page you're looking for doesn't exist or may have been moved. Don't worry, we can help you
              get back on track!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              asChild
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-base h-12 px-8 inline-flex items-center justify-center gap-2"
            >
              <Link href="/">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-base h-12 px-8 inline-flex items-center justify-center gap-2"
            >
              <Link href="/products">
                View Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Support Message */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mt-12">
            <p className="text-gray-300">
              Still need help? Contact our support team at{" "}
              <a href="mailto:support@turbofunding.com" className="text-orange-400 hover:text-orange-300 font-semibold">
                support@turbofunding.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
