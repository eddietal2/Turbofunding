import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="flex min-h-screen flex-col" style={{ color: "#0D1B2A" }}>
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="container px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Skeleton className="h-6 w-40 mx-auto rounded-full bg-white/10" />
              <Skeleton className="h-12 w-64 mx-auto bg-white/10" />
              <Skeleton className="h-5 w-80 mx-auto bg-white/10" />
            </div>
          </div>
        </section>

        {/* Contact Form + Info Skeleton */}
        <section className="w-full py-10 md:py-16 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-5">
                <Skeleton className="h-7 w-36" />
                <div className="grid gap-4 md:grid-cols-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-28 w-full rounded-lg" />
                </div>
                <Skeleton className="h-11 w-36 rounded-xl" />
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-4">
                    <Skeleton className="w-12 h-12 rounded-2xl flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-28" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
