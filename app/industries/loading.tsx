import { Skeleton } from "@/components/ui/skeleton"

export default function IndustriesLoading() {
  return (
    <div className="flex min-h-screen flex-col" style={{ color: "#0D1B2A" }}>
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="container px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Skeleton className="h-6 w-56 mx-auto rounded-full bg-white/10" />
              <Skeleton className="h-12 w-80 mx-auto bg-white/10" />
              <Skeleton className="h-5 w-96 mx-auto bg-white/10" />
            </div>
          </div>
        </section>

        {/* Industry Cards Skeleton */}
        <section className="w-full py-10 md:py-16 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="space-y-10">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    {/* Image placeholder */}
                    <Skeleton className="w-full min-h-[220px] md:min-h-[320px] rounded-none" />
                    {/* Content placeholder */}
                    <div className="p-6 md:p-8 lg:p-10 space-y-4">
                      <Skeleton className="h-6 w-28 rounded-full" />
                      <Skeleton className="h-8 w-48" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <div className="space-y-2.5 pt-2">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="flex items-center gap-2.5">
                            <Skeleton className="w-5 h-5 rounded-full" />
                            <Skeleton className="h-4 w-40" />
                          </div>
                        ))}
                      </div>
                      <Skeleton className="h-11 w-36 rounded-xl mt-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
