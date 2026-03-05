import { Skeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Skeleton */}
      <section className="relative w-full h-[50vh] md:h-[55vh] lg:h-[65vh]">
        <Skeleton className="absolute inset-0 rounded-none" />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="container px-4 md:px-6 space-y-4">
            <Skeleton className="h-10 md:h-14 w-3/4 max-w-lg" />
            <Skeleton className="h-5 w-2/3 max-w-md" />
            <Skeleton className="h-12 w-48 rounded-xl mt-4" />
          </div>
        </div>
      </section>

      {/* Stats Bar Skeleton */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto py-7">
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="w-12 h-12 rounded-2xl" />
            <Skeleton className="h-7 w-80" />
          </div>
        </div>
      </section>

      {/* Qualify Section Skeleton */}
      <section className="w-full py-16 bg-[#F5F7FA]">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-5 w-96 mx-auto" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 space-y-4">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="w-full py-16">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <Skeleton className="h-8 w-72 mx-auto" />
            <Skeleton className="h-5 w-80 mx-auto" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
