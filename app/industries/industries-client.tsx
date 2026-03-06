"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import {
  ShoppingBagIcon,
  TruckIcon,
  HeartPulseIcon,
  UtensilsIcon,
  ConstructionIcon,
  WrenchIcon,
  CheckIcon,
  ArrowRightIcon,
  SparklesIcon,
  ImageIcon,
  BuildingIcon,
} from "lucide-react"

const industries = [
  {
    id: "retail",
    name: "Retail",
    subtitle: "Inventory & expansion financing",
    icon: ShoppingBagIcon,
    color: "blue",
    image: "/images/retail-store.jpg",
    description:
      "Specialized funding solutions for retailers to manage inventory, expand locations, and upgrade technology.",
    features: [
      "Seasonal inventory financing",
      "Store expansion funding",
      "POS system upgrades",
      "E-commerce integration",
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    subtitle: "Equipment & production financing",
    icon: WrenchIcon,
    color: "violet",
    image: "/images/manufacturing.jpg",
    description:
      "Funding solutions for manufacturers to upgrade equipment, expand production, and optimize operations.",
    features: [
      "Equipment financing",
      "Facility expansion",
      "Technology upgrades",
      "Working capital for materials",
    ],
  },
  {
    id: "transportation",
    name: "Transportation & Logistics",
    subtitle: "Fleet & operations financing",
    icon: TruckIcon,
    color: "emerald",
    image: "/images/transportation-logistics.jpg",
    description:
      "Specialized funding for transportation companies to maintain and expand fleets, optimize logistics operations.",
    features: [
      "Vehicle financing",
      "Fleet expansion",
      "Logistics technology",
      "Fuel & maintenance funding",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    subtitle: "Medical equipment & practice financing",
    icon: HeartPulseIcon,
    color: "rose",
    image: "/images/healthcare.jpg",
    description:
      "Funding solutions for healthcare providers to upgrade equipment, expand facilities, and improve patient care.",
    features: [
      "Medical equipment financing",
      "Practice expansion",
      "Electronic health records systems",
      "Working capital for staffing",
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality & Food Service",
    subtitle: "Restaurant & hotel financing",
    icon: UtensilsIcon,
    color: "amber",
    image: "/images/hospitality-food-service.jpg",
    description:
      "Specialized funding for restaurants, hotels, and hospitality businesses to renovate, expand, and improve operations.",
    features: [
      "Kitchen equipment financing",
      "Renovation funding",
      "Franchise expansion",
      "Seasonal working capital",
    ],
  },
  {
    id: "construction",
    name: "Construction",
    subtitle: "Project & equipment financing",
    icon: ConstructionIcon,
    color: "orange",
    image: "/images/construction.jpg",
    description:
      "Funding solutions for construction companies to finance projects, purchase equipment, and manage cash flow.",
    features: [
      "Heavy equipment financing",
      "Project bridge loans",
      "Materials financing",
      "Contractor lines of credit",
    ],
  },
]

const colorMap: Record<string, { iconBg: string; iconText: string; badge: string; checkBg: string; checkText: string; placeholderBg: string; placeholderIcon: string }> = {
  blue:    { iconBg: "bg-blue-100",    iconText: "text-blue-600",    badge: "bg-blue-50 text-blue-700 border-blue-100",       checkBg: "bg-blue-50",    checkText: "text-blue-600",    placeholderBg: "bg-blue-50",    placeholderIcon: "text-blue-300" },
  violet:  { iconBg: "bg-violet-100",  iconText: "text-violet-600",  badge: "bg-violet-50 text-violet-700 border-violet-100", checkBg: "bg-violet-50",  checkText: "text-violet-600",  placeholderBg: "bg-violet-50",  placeholderIcon: "text-violet-300" },
  emerald: { iconBg: "bg-emerald-100", iconText: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700 border-emerald-100", checkBg: "bg-emerald-50", checkText: "text-emerald-600", placeholderBg: "bg-emerald-50", placeholderIcon: "text-emerald-300" },
  rose:    { iconBg: "bg-rose-100",    iconText: "text-rose-600",    badge: "bg-rose-50 text-rose-700 border-rose-100",       checkBg: "bg-rose-50",    checkText: "text-rose-600",    placeholderBg: "bg-rose-50",    placeholderIcon: "text-rose-300" },
  amber:   { iconBg: "bg-amber-100",   iconText: "text-amber-600",   badge: "bg-amber-50 text-amber-700 border-amber-100",    checkBg: "bg-amber-50",   checkText: "text-amber-600",   placeholderBg: "bg-amber-50",   placeholderIcon: "text-amber-300" },
  orange:  { iconBg: "bg-orange-100",  iconText: "text-orange-600",  badge: "bg-orange-50 text-orange-700 border-orange-100", checkBg: "bg-orange-50",  checkText: "text-orange-600",  placeholderBg: "bg-orange-50",  placeholderIcon: "text-orange-300" },
}

// Custom hook for scroll fade-in animation
function useScrollFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return { ref, isVisible }
}

export default function IndustriesPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ color: "#0D1B2A" }}>
      <main className="flex-1">

        {/* ===== HERO ===== */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-3xl" />
          </div>

          <div className="relative container px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-5">
                <BuildingIcon className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300 font-medium">Tailored Solutions for Every Sector</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-space-grotesk">
                Industries <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">We Serve</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
                From retail storefronts to construction sites, we provide specialized funding that fits your industry.
              </p>
            </div>
          </div>
        </section>

        {/* ===== INDUSTRY CARDS ===== */}
        <section className="w-full py-10 md:py-16 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="space-y-10">
              {industries.map((industry, index) => {
                const Icon = industry.icon
                const colors = colorMap[industry.color]
                const isReversed = index % 2 !== 0
                const { ref, isVisible } = useScrollFadeIn()

                return (
                  <div
                    ref={ref}
                    key={industry.id}
                    className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-700 ease-out ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className={`grid md:grid-cols-2 ${isReversed ? "md:[direction:rtl]" : ""}`}>

                      {/* Image */}
                      <div className={`relative w-full min-h-[220px] md:min-h-[320px] overflow-hidden ${isReversed ? "md:[direction:ltr]" : ""}`}>
                        <Image
                          src={industry.image}
                          alt={industry.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className={`p-6 md:p-8 lg:p-10 flex flex-col justify-center ${isReversed ? "md:[direction:ltr]" : ""}`}>
                        {/* Badge */}
                        <div className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 w-fit text-xs font-semibold mb-4 ${colors.badge}`}>
                          <Icon className="h-3.5 w-3.5" />
                          {industry.subtitle}
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-space-grotesk">
                          {industry.name}
                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-5">
                          {industry.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-2.5 mb-6">
                          {industry.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2.5">
                              <div className={`w-5 h-5 rounded-full ${colors.checkBg} flex items-center justify-center flex-shrink-0`}>
                                <CheckIcon className={`h-3 w-3 ${colors.checkText}`} />
                              </div>
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div>
                          <Button asChild className="btn-blue-elite text-white font-semibold rounded-xl h-11 px-6 group">
                            <Link href="/apply">
                              Learn More
                              <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>


          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative container px-4 md:px-6 py-14 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 font-space-grotesk">
                Need Funding for <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Your Industry?</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                Our industry experts understand your unique challenges and opportunities.
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
