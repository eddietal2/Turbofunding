import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="flex min-h-screen flex-col" style={{ color: "#0D1B2A" }}>
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="container px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Skeleton className="h-6 w-52 mx-auto rounded-full bg-white/10" />
              <Skeleton className="h-12 w-72 mx-auto bg-white/10" />
              <Skeleton className="h-5 w-80 mx-auto bg-white/10" />
            </div>
          </div>
        </section>

        {/* Stats Skeleton */}
        <section className="w-full bg-white border-b border-gray-100">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto py-7"></div>
        </section>

        {/* Content Skeleton */}
        <section className="w-full py-14 md:py-20 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-10 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <Skeleton className="h-[440px] rounded-2xl" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
