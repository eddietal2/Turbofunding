import { Skeleton } from "@/components/ui/skeleton"

export default function ApplyLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA]" style={{ color: "#0D1B2A" }}>
      <main className="flex-1">
        {/* Progress Bar Skeleton */}
        <div className="w-full bg-white border-b border-gray-100">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto py-4">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        </div>

        {/* Form Card Skeleton */}
        <div className="container px-4 md:px-6 max-w-4xl mx-auto py-8 md:py-12">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>

            {/* Form Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-4">
              <Skeleton className="h-11 w-28 rounded-xl" />
              <Skeleton className="h-11 w-28 rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
