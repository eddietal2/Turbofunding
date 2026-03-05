import { Skeleton } from "@/components/ui/skeleton"

export default function TeamLoading() {
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
          <div className="container px-4 md:px-6 max-w-5xl mx-auto py-7">
            <div className="flex items-center justify-center gap-4">
              <Skeleton className="w-12 h-12 rounded-2xl" />
              <Skeleton className="h-7 w-80" />
            </div>
          </div>
        </section>

        {/* Our Story Skeleton */}
        <section className="w-full py-14 md:py-20 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
              <div className="space-y-5">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-[360px] md:h-[440px] w-full rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Values Skeleton */}
        <section className="w-full py-14 md:py-20 bg-white">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="text-center mb-10 space-y-3">
              <Skeleton className="h-6 w-24 mx-auto rounded-full" />
              <Skeleton className="h-9 w-48 mx-auto" />
              <Skeleton className="h-5 w-72 mx-auto" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-7 space-y-4 flex flex-col items-center">
                  <Skeleton className="w-14 h-14 rounded-2xl" />
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
