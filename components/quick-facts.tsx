export default function QuickFacts() {
  return (
    <section className="w-full py-6 md:py-8 px-4 md:px-6 flex items-center justify-center">
      <div className="w-full lg:w-3/4 xl:w-2/3 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch justify-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Stat 1: Years of Experience */}
            <div className="flex items-start justify-center py-6 md:py-8 px-4 md:px-6 flex-1 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-bold text-gray-900 font-space-grotesk leading-tight">
                  25+ Years of Combined<br />
                  <span className="text-blue-600">Financial Services</span><br />
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Experience</span>
                </p>
              </div>
            </div>

            {/* Stat 2: Same-Day Approvals */}
            <div className="flex items-start justify-center py-6 md:py-8 px-4 md:px-6 flex-1 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-bold text-gray-900 font-space-grotesk leading-tight">
                  Same-Day<br />
                  <span className="text-blue-600">Approvals</span><br />
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Available</span>
                </p>
              </div>
            </div>

            {/* Stat 3: Funding up to $5M */}
            <div className="flex items-start justify-center py-6 md:py-8 px-4 md:px-6 flex-1 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-bold text-gray-900 font-space-grotesk leading-tight">
                  Funding up to<br />
                  <span className="text-blue-600">$5M</span>
                </p>
              </div>
            </div>

            {/* Stat 4: Available 7 Days */}
            <div className="flex items-start justify-center py-6 md:py-8 px-4 md:px-6 flex-1 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-bold text-gray-900 font-space-grotesk leading-tight">
                  Available<br />
                  <span className="text-blue-600">7 Days</span><br />
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">a Week</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
