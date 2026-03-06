import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import QuickFacts from "@/components/quick-facts"
import {
  ShieldCheckIcon,
  ZapIcon,
  UsersIcon,
  ArrowRightIcon,
  AwardIcon,
} from "lucide-react"



const values = [
  {
    icon: ShieldCheckIcon,
    color: "blue",
    title: "Trust & Transparency",
    subtitle: "Your success is our priority",
    description:
      "We believe in complete transparency in our funding process. No hidden fees, no surprise termsâ€”just straightforward solutions that you can trust.",
  },
  {
    icon: ZapIcon,
    color: "orange",
    title: "Speed & Efficiency",
    subtitle: "Time is of the essence",
    description:
      "We understand that time is critical in business. Our streamlined process ensures you get the funding you need when you need it, without unnecessary delays.",
  },
  {
    icon: UsersIcon,
    color: "emerald",
    title: "Client-Centered Approach",
    subtitle: "Your success is our success",
    description:
      "Your success is our success. We take the time to understand your business needs and provide personalized funding solutions that help you achieve your goals.",
  },
]

const colorMap: Record<string, { iconBg: string; iconText: string; accent: string; border: string }> = {
  blue:    { iconBg: "bg-blue-100",    iconText: "text-blue-600",    accent: "text-blue-600",    border: "border-blue-100" },
  orange:  { iconBg: "bg-orange-100",  iconText: "text-orange-600",  accent: "text-orange-600",  border: "border-orange-100" },
  emerald: { iconBg: "bg-emerald-100", iconText: "text-emerald-600", accent: "text-emerald-600", border: "border-emerald-100" },
}

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ color: "#0D1B2A" }}>
      <main className="flex-1">

        {/* ===== HERO ===== */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />
          </div>

          <div className="relative container px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-5">
                <ZapIcon className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-gray-300 font-medium">Driven by Speed. Built on Trust.</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-space-grotesk">
                About{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  TurboFunding
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
                We believe small businesses deserve fast, reliable access to capital. Meet the team that&apos;s leveling the
                playing field.
              </p>
            </div>
          </div>
        </section>

        {/* ===== QUICK FACTS ===== */}
        <QuickFacts />

        {/* ===== OUR STORY ===== */}
        <section className="w-full py-14 md:py-20 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">

              {/* Text */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1">
                  <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Our Story</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-space-grotesk">
                  Financing at the{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                    Speed of Opportunity
                  </span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    At TurboFunding, we believe small businesses deserve fast, reliable access to the capital they need
                    to grow. Founded by entrepreneurs who know the challenges of building a company from the ground up,
                    our mission is simple: provide streamlined financing and help businesses move at the speed of
                    opportunity.
                  </p>
                  <p>
                    As a direct lender with deep industry experience across business lending, private capital, and SBA
                    partnerships, we&apos;ve built strong relationships with a wide network of funding sources. Our main
                    goal is to deliver cheaper financing at turbo speeds â€” helping you save capital while accessing the
                    capital you need. We match each client with the right funding solution â€” from merchant cash advances
                    and business lines of credit to SBA loans â€” and educate you throughout the process to help
                    consolidate and optimize your financing strategy.
                  </p>
                  <p>
                    TurboFunding is more than just financing. We&apos;re partners in growth. Whether you&apos;re starting a new
                    venture, expanding to new locations, or weathering unexpected challenges, our team is here to guide
                    you every step of the way.
                  </p>
                </div>
              </div>

              {/* Race Car Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="relative h-[360px] md:h-[440px] w-full">
                  <Image
                    src="/images/about-us-image.png"
                    alt="TurboFunding - Speed and precision in business funding"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===== COMPANY VALUES ===== */}
        <section className="w-full py-14 md:py-20 bg-white">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">

            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-4">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Our Values</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-space-grotesk mb-3">
                What{" "}
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Drives Us
                </span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Our core values shape everything we do at TurboFunding.com
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon
                const colors = colorMap[value.color]
                return (
                  <div
                    key={value.title}
                    className={`bg-white rounded-2xl border ${colors.border} shadow-sm p-7 flex flex-col items-center text-center hover:shadow-md transition-shadow`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-4`}>
                      <Icon className={`h-7 w-7 ${colors.iconText}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 font-space-grotesk">{value.title}</h3>
                    <p className={`text-xs font-semibold uppercase tracking-wide mb-3 ${colors.accent}`}>{value.subtitle}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative container px-4 md:px-6 py-14 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 font-space-grotesk">
                Ready to Work With{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Our Team?
                </span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                Our experts are ready to help you find the perfect funding solution for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="btn-gold-elite text-white font-semibold rounded-xl h-12 px-8 text-base group">
                  <Link href="/apply">
                    Apply Now
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild className="bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold rounded-xl h-12 px-8 text-base">
                  <Link href="/contact">Talk to an Expert</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
