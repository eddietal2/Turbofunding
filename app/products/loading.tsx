import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsLoading() {
  return (
    <div className="flex min-h-screen flex-col" style={{ color: "#0D1B2A" }}>
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="container px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Skeleton className="h-6 w-48 mx-auto rounded-full bg-white/10" />
              <Skeleton className="h-12 w-96 mx-auto bg-white/10" />
              <Skeleton className="h-5 w-80 mx-auto bg-white/10" />
            </div>
          </div>
        </section>

        {/* Tab Bar Skeleton */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex gap-2 py-3 overflow-hidden">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-32 rounded-xl flex-shrink-0" />
              ))}
            </div>
          </div>
        </div>

        {/* Product Content Skeleton */}
        <section className="w-full py-10 md:py-16 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              {/* Left Column */}
              <div className="md:col-span-3 space-y-6">
                <div className="bg-white rounded-2xl p-6 md:p-8 space-y-4">
                  <Skeleton className="h-6 w-32 rounded-full" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="space-y-3 pt-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl p-6 md:p-8 space-y-4">
                  <Skeleton className="h-6 w-40" />
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-12 w-full rounded-xl mt-4" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
