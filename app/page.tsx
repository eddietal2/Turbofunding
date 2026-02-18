'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotatingText } from "@/components/rotating-text"
import { LoanCalculator } from "@/components/loan-calculator"
import { useEffect, useState } from "react"

// Mapping of hero images to dynamic light gradients for better text readability
const heroImageGradients: Record<string, string> = {
  '/images/hero-bg-01.jpg': 'linear-gradient(to right, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.3))',
  '/images/hero-bg-02.jpg': 'linear-gradient(to right, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.3))',
  '/images/hero-bg-03.jpg': 'linear-gradient(to right, rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.70), rgba(255, 255, 255, 0.3))',
  '/images/hero-bg-04.jpg': 'linear-gradient(to right, rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.70), rgba(255, 255, 255, 0.3))',
  '/images/hero-bg-05.jpg': 'linear-gradient(to right, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.3))',
  '/images/hero-bg-06.jpg': 'linear-gradient(to right, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.3))',
  '/images/hero-bg-07.jpg': 'linear-gradient(to right, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.70), rgba(255, 255, 255, 0.3))',
}

// Weighted random selection for hero background images
const getRandomHeroImage = () => {
  const topPhotos = [
    '/images/hero-bg-07.jpg',
    '/images/hero-bg-06.jpg',
    '/images/hero-bg-05.jpg',
  ]
  const otherPhotos = [
    '/images/hero-bg-01.jpg',
    '/images/hero-bg-02.jpg',
    '/images/hero-bg-03.jpg',
    '/images/hero-bg-04.jpg',
  ]

  const random = Math.random()
  // 60% probability for top 3 performing images
  if (random < 0.6) {
    return topPhotos[Math.floor(Math.random() * topPhotos.length)]
  } else {
    return otherPhotos[Math.floor(Math.random() * otherPhotos.length)]
  }
}

export default function Home() {
  const productNames = ["Working Capital", "Merchant Cash Advance", "SBA Loans", "Business Lines of Credit"]
  const [heroImage, setHeroImage] = useState('/images/hero-bg-07.jpg')
  
  useEffect(() => {
    const topPhotos = [
      '/images/hero-bg-07.jpg',
      '/images/hero-bg-06.jpg',
      '/images/hero-bg-05.jpg',
    ]
    const otherPhotos = [
      '/images/hero-bg-01.jpg',
      '/images/hero-bg-02.jpg',
      '/images/hero-bg-03.jpg',
      '/images/hero-bg-04.jpg',
    ]

    const random = Math.random()
    // 60% probability for top 3 performing images
    if (random < 0.6) {
      setHeroImage(topPhotos[Math.floor(Math.random() * topPhotos.length)])
    } else {
      setHeroImage(otherPhotos[Math.floor(Math.random() * otherPhotos.length)])
    }
  }, [])
  
  const heroGradient = heroImageGradients[heroImage]

  // Setup Intersection Observer for scroll animations
  useEffect(() => {
    const setupObserver = () => {
      const qualifyCards = document.querySelectorAll('.qualify-card');
      const fsCards = document.querySelectorAll('.fs-card');
      const fsHeader = document.querySelectorAll('.fs-header');
      
      const allCards = [...Array.from(qualifyCards), ...Array.from(fsCards), ...Array.from(fsHeader)];
      
      if (allCards.length === 0) {
        // Retry if cards not found yet
        setTimeout(setupObserver, 100);
        return;
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      allCards.forEach((card) => {
        observer.observe(card);
      });
    };
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupObserver);
      return () => document.removeEventListener('DOMContentLoaded', setupObserver);
    } else {
      setupObserver();
    }
  }, []);

  return (
    <>
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TurboFunding.com",
            url: "https://turbofunding.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://turbofunding.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Financial Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: "TurboFunding.com",
            description:
              "Fast, secure business funding solutions including working capital, SBA loans, equipment financing, and merchant cash advances.",
            url: "https://turbofunding.com",
            telephone: "+1-800-555-8872",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Finance Street, Suite 500",
              addressLocality: "New York",
              addressRegion: "NY",
              postalCode: "10001",
              addressCountry: "US",
            },
            openingHours: "Mo-Fr 09:00-18:00",
            priceRange: "$10,000 - $5,000,000",
            serviceType: "Business Funding",
            areaServed: "United States",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Business Funding Solutions",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Working Capital Loans",
                    description: "Quick access to working capital for day-to-day operations",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Merchant Cash Advance",
                    description: "Fast funding based on future sales with flexible repayment",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "SBA Loans",
                    description: "Government-backed loans with favorable terms",
                  },
                },
              ],
            },
          }),
        }}
      />

      <style>{`
        /* Swap image URLs based on viewport - mobile gets -xs version */
        @media (max-width: 768px) {
          .hero-bg-responsive {
            background-image: var(--hero-image-mobile) !important;
            background-attachment: scroll !important;
            background-size: 120% auto !important;
            background-position: center center !important;
          }
        }
      `}</style>

      <div className="flex flex-col">
        {/* Hero Section */}
      <section 
        className="hero-bg-responsive relative w-full md:h-screen md:flex md:items-center overflow-hidden"
        style={{
          backgroundImage: `url('${heroImage}')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "auto",
          "--hero-image-mobile": `url('${heroImage.replace("/images/hero-bg-", "/images/hero-bg-xs-").replace(".jpg", ".png")}')`,
        } as any}
      >
        {/* Background Filter/Blur Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            filter: "blur(2px) brightness(0.8)",
            animation: "slideHorizontal 20s linear infinite",
            pointerEvents: "none"
          }}
        >
          <style>{`
            @keyframes slideHorizontal {
              0% { transform: translateX(0); }
              50% { transform: translateX(20px); }
              100% { transform: translateX(0); }
            }
          `}</style>
        </div>

        {/* Dynamic Gradient Overlay - Adapts to background image */}
        <div 
          className="absolute inset-0 z-[1] pointer-events-none hero-gradient-overlay"
          style={{
            background: heroGradient
          }}
        />
        <style>{`
          @media (max-width: 768px) {
            .hero-gradient-overlay {
              background: linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.5)) !important;
            }
          }
        `}</style>
        
        {/* Subtle Animated Overlay Elements */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          {/* Rising data particles */}
          <style>{`
            @keyframes floatUp {
              0% { transform: translateY(100vh) scale(0); opacity: 0; }
              10% { opacity: 0.3; }
              90% { opacity: 0.3; }
              100% { transform: translateY(-10vh) scale(1); opacity: 0; }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.05; }
              50% { opacity: 0.12; }
            }
          `}</style>
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${4 + (i % 3) * 3}px`,
                height: `${4 + (i % 3) * 3}px`,
                left: `${10 + i * 11}%`,
                background: i % 2 === 0 ? "#F97316" : "#2460e3",
                animation: `floatUp ${8 + i * 1.5}s ease-in-out ${i * 1.2}s infinite`,
                opacity: 0,
              }}
            />
          ))}
          {/* Subtle grid overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(36,96,227,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(36,96,227,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "pulse 6s ease-in-out infinite",
          }} />
        </div>

        {/* Content Container */}
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-8 md:py-0">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest leading-tight" 
                  style={{ 
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    letterSpacing: "-0.02em"
                  }}
                >
                  <span 
                    style={{ 
                      color: "#D97706", 
                      whiteSpace: "nowrap",
                      textShadow: "none"
                    }}
                  >
                    Turbo
                  </span>
                  <span style={{ color: "#1D4ED8", display: "block", marginTop: "0.2em" }}>Charge your</span>
                  <span style={{ color: "#1D4ED8", display: "block" }}>Business with</span>
                  <RotatingText
                    words={productNames}
                    className="font-bold"
                    style={{
                      color: "#D97706",
                      background: "linear-gradient(135deg, #2460e3 0%, #1947b8 100%)",
                      display: "inline-block",
                      paddingTop: "0.4em",
                      paddingBottom: "0.4em",
                      paddingLeft: "0.3em",
                      paddingRight: "0.3em",
                      marginTop: "0.2em",
                      fontSize: "inherit",
                      lineHeight: "1.2",
                      textShadow: "none",
                      fontFamily: "var(--font-space-grotesk), sans-serif"
                    }}
                  />
                </h1>
                <p 
                  className="text-base md:text-lg font-medium tracking-wide" 
                  style={{ 
                    color: "#1F2937", 
                    marginTop: "1em",
                    fontFamily: "var(--font-space-grotesk), sans-serif"
                  }}
                >
                  The place that helps businesses scale through <span style={{ color: "#D97706", fontWeight: "600" }}>secure</span>, <span style={{ color: "#1D4ED8", fontWeight: "600" }}>fast</span>, and <span style={{ color: "#059669", fontWeight: "600" }}>transparent</span> funding.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row pt-4">
                <Button 
                  asChild 
                  className="btn-blue-elite text-base px-6 py-5 w-fit font-semibold tracking-wide text-white"
                >
                  <Link href="/apply">See Your Loan Options</Link>
                </Button>
              </div>
              <p 
                className="text-[0.6em] md:text-sm font-medium tracking-wider" 
                style={{ 
                  color: "#4B5563", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.1em",
                  fontFamily: "var(--font-space-grotesk), sans-serif"
                }}
              >
                ✓ Applying will not impact your credit score
              </p>
            </div>

            {/* Right Column - iPhone Frame Illustration */}
            <div className="flex items-center justify-center hidden md:flex -mt-16" style={{
              animation: "fadeInUp 0.8s ease-out 1s forwards",
              opacity: 0
            }}>
              <style>{`
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(200px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
              <div className="relative" style={{ width: "280px", height: "560px" }}>
                {/* iPhone Body */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl" style={{ borderRadius: "40px" }} />
                
                {/* Screen Bezel/Frame */}
                <div className="absolute inset-0 rounded-3xl border-[12px] border-black" style={{ borderRadius: "40px" }} />
                
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20" style={{
                  width: "150px",
                  height: "28px",
                  backgroundColor: "#000",
                  borderRadius: "0 0 24px 24px",
                  marginTop: "10px"
                }} />
                
                {/* Screen Content Area */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col" style={{
                  left: "12px",
                  right: "12px",
                  top: "12px",
                  bottom: "12px",
                  borderRadius: "32px"
                }}>
                  {/* Status Bar Area (top) */}
                  <div className="h-7 bg-gradient-to-b from-gray-950 to-transparent" />
                  
                  {/* Main Screen Content - Video */}
                  <div className="flex-1 relative overflow-hidden bg-black">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src="/videos/hero-phone-video-01.mp4" type="video/mp4" />
                    </video>
                  </div>
                  
                  {/* Home Indicator (bottom) */}
                  <div className="h-6 bg-black flex items-center justify-center">
                    <div className="w-32 h-1 bg-white rounded-full opacity-80" />
                  </div>
                </div>
                
                {/* Subtle reflection/shine */}
                <div className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none" style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
                  borderRadius: "40px"
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* How To Qualify Section */}
        {/* Changed section background from gray-800 to bg-[#F5F7FA] with updated text colors */}
        <section className="w-full py-16 md:py-0 md:h-screen md:flex md:flex-col md:justify-center lg:py-0 bg-[#F5F7FA] relative overflow-hidden" id="qualify">
          <style>{`
            @keyframes cardHoverGlow {
              0%, 100% {
                box-shadow: 0 4px 15px rgba(36, 96, 227, 0.1);
              }
              50% {
                box-shadow: 0 8px 30px rgba(36, 96, 227, 0.25);
              }
            }
            
            @keyframes spinBadge {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes fadeUpIn {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes fadeLeftToRightIn {
              from {
                opacity: 0;
                transform: translateX(-30px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            @keyframes floatPulse {
              0%, 100% {
                transform: translateY(0px);
                opacity: 1;
              }
              50% {
                transform: translateY(-8px);
                opacity: 0.85;
              }
            }
            
            .qualify-card {
              background: linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%);
              border: 1px solid rgba(36, 96, 227, 0.15);
              transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
              backdrop-filter: blur(10px);
              opacity: 0;
            }
            
            .qualify-card.scroll-visible {
              animation: fadeUpIn 0.6s ease-out forwards;
            }
            
            .qualify-card:nth-child(1).scroll-visible {
              animation-delay: 0s;
            }
            
            .qualify-card:nth-child(2).scroll-visible {
              animation-delay: 0.1s;
            }
            
            .qualify-card:nth-child(3).scroll-visible {
              animation-delay: 0.2s;
            }
            
            .qualify-card:nth-child(4).scroll-visible {
              animation-delay: 0.3s;
            }
            
            .qualify-card:hover {
              transform: translateY(-12px) scale(1.02);
              box-shadow: 0 16px 40px rgba(36, 96, 227, 0.2);
              border: 1px solid rgba(36, 96, 227, 0.3);
              background: linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%);
            }
            
            .qualify-badge {
              width: 56px;
              height: 56px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
              box-shadow: 0 4px 15px rgba(36, 96, 227, 0.3);
            }
            
            .qualify-card:hover .qualify-badge {
              animation: spinBadge 0.8s ease-in-out forwards;
              box-shadow: 0 8px 25px rgba(217, 119, 6, 0.5);
              background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
            }
            
            .qualify-title {
              transition: color 0.4s ease;
            }
            
            .qualify-card:hover .qualify-title {
              color: #2460e3;
            }
            
            @media (max-width: 768px) {
              .qualify-card.scroll-visible {
                animation: fadeLeftToRightIn 0.6s ease-out forwards;
              }
              
              .qualify-card:nth-child(1).scroll-visible {
                animation-delay: 0s;
              }
              
              .qualify-card:nth-child(2).scroll-visible {
                animation-delay: 0.1s;
              }
              
              .qualify-card:nth-child(3).scroll-visible {
                animation-delay: 0.2s;
              }
              
              .qualify-card:nth-child(4).scroll-visible {
                animation-delay: 0.3s;
              }
              
              .qualify-card:hover {
                transform: none;
                box-shadow: 0 4px 15px rgba(36, 96, 227, 0.1);
                border: 1px solid rgba(36, 96, 227, 0.15);
                background: linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%);
              }
              
              .qualify-card:hover .qualify-badge {
                animation: none;
                box-shadow: 0 4px 15px rgba(36, 96, 227, 0.3);
                background: linear-gradient(135deg, #2460e3 0%, #1947b8 100%);
                transform: none;
              }
              
              .qualify-card:hover .qualify-title {
                color: #0D1B2A;
              }
            }
          `}</style>
          {/* Grid SVG Background */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.08 }}
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2460e3" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto"
                  style={{ animation: "floatPulse 3s ease-in-out infinite" }}
                >
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                  How To Qualify
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple requirements to get your business funded quickly and efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Cool animated cards with hover effects */}
              <Card className="qualify-card" style={{ color: "#0D1B2A" }}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="qualify-badge rounded-full bg-blue-600" aria-hidden="true">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                  </div>
                  <h3 className="qualify-title text-lg font-bold mb-1" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>6+ Months in Business</h3>
                  {/* Changed card text from gray-300 to gray-600 */}
                  <p className="text-gray-600 text-sm text-left">
                    Your business must be operational for at least 6 months with consistent activity.
                  </p>
                </CardContent>
              </Card>
              <Card className="qualify-card" style={{ color: "#0D1B2A" }}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="qualify-badge rounded-full bg-blue-600" aria-hidden="true">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                  </div>
                  <h3 className="qualify-title text-lg font-bold mb-1" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>$10K+ Monthly Revenue</h3>
                  <p className="text-gray-600 text-sm text-left">
                    Demonstrate consistent monthly revenue of at least $10,000 to qualify for funding.
                  </p>
                </CardContent>
              </Card>
              <Card className="qualify-card" style={{ color: "#0D1B2A" }}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="qualify-badge rounded-full bg-blue-600" aria-hidden="true">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                  </div>
                  <h3 className="qualify-title text-lg font-bold mb-1" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>550+ Credit Score</h3>
                  <p className="text-gray-600 text-sm text-left">
                    Personal credit score of 550 or higher helps secure better funding terms.
                  </p>
                </CardContent>
              </Card>
              <Card className="qualify-card" style={{ color: "#0D1B2A" }}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="qualify-badge rounded-full bg-blue-600" aria-hidden="true">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                  </div>
                  <h3 className="qualify-title text-lg font-bold mb-1" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>Basic Documentation</h3>
                  <p className="text-gray-600 text-sm text-left">
                    Bank statements, tax returns, and business registration documents required.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center mt-6">
              <Button asChild className="btn-blue-elite text-white">
                <Link href="/apply">Check Your Eligibility</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {/* CHANGE> Changed Funding Solutions section from dark gray (bg-gray-900) to white background with #0D1B2A text */}
        <section className="w-full py-16 md:py-24 lg:py-32 relative min-h-screen fs-section" id="features" style={{
          backgroundImage: "url('/images/fs-image-01.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "80% center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}>
          <style dangerouslySetInnerHTML={{__html: `
            @media (max-width: 768px) {
              .fs-section {
                background-image: none !important;
                background-size: cover !important;
                background-position: center center !important;
                padding: 2em 0em;
              }
            }
          `}} />
          <style>{`
            .fs-card {
              transition: all 0.3s ease;
              cursor: pointer;
              opacity: 0;
            }
            
            .fs-card.scroll-visible {
              animation: fadeUpIn 0.6s ease-out forwards;
            }
            
            .fs-card:nth-child(1).scroll-visible {
              animation-delay: 0s;
            }
            
            .fs-card:nth-child(2).scroll-visible {
              animation-delay: 0.1s;
            }
            
            .fs-card:nth-child(3).scroll-visible {
              animation-delay: 0.2s;
            }
            
            .fs-card:nth-child(4).scroll-visible {
              animation-delay: 0.3s;
            }
            
            .fs-card:nth-child(5).scroll-visible {
              animation-delay: 0.4s;
            }
            
            .fs-card:nth-child(6).scroll-visible {
              animation-delay: 0.5s;
            }
            
            .fs-card:hover {
              transform: translateY(-8px) scale(1.02);
              box-shadow: 0 20px 40px rgba(36, 96, 227, 0.3);
            }
            
            .fs-card:hover h3 {
              color: #2460e3 !important;
            }
            
            @media (max-width: 768px) {
              .fs-card:hover {
                transform: none;
                box-shadow: none;
              }
              
              .fs-card:hover h3 {
                color: #0D1B2A !important;
              }
            }
            
            .fs-header {
              opacity: 0;
            }
            
            .fs-header.scroll-visible {
              animation: fadeUpIn 0.8s ease-out forwards;
            }
            
            @keyframes fadeUpIn {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
          {/* Light gradient overlay for visual polish */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.4) 100%)"
            }}
          />
          
          <div className="container px-4 md:px-6 relative z-10 max-w-6xl mx-auto">
            <div className="flex flex-col items-center">
              {/* FS Header - Centered */}
              <div className="w-full max-w-2xl mb-6">
                <div className="flex flex-col items-center justify-center fs-header">
                  <div className="space-y-4 p-4 rounded-lg text-center w-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(10px)" }}>
                    <div className="flex justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        stroke="#2460e3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* Grand Pediment Roof */}
                        <path d="M 8 20 L 24 4 L 40 20" fill="#D97706" stroke="#D97706" strokeWidth="1.5" />
                        
                        {/* Main building body */}
                        <rect x="8" y="20" width="32" height="20" fill="none" stroke="#2460e3" strokeWidth="1.5" />
                        
                        {/* Left Entrance Column */}
                        <rect x="12" y="20" width="3" height="20" fill="#2460e3" />
                        {/* Right Entrance Column */}
                        <rect x="33" y="20" width="3" height="20" fill="#2460e3" />
                        
                        {/* Central Door with surround */}
                        <rect x="19" y="28" width="10" height="12" fill="none" stroke="#D97706" strokeWidth="1.5" />
                        <line x1="24" y1="28" x2="24" y2="40" stroke="#D97706" strokeWidth="1" />
                        {/* Door Handle */}
                        <circle cx="28" cy="34" r="1" fill="#D97706" />
                        
                        {/* Upper facade trim */}
                        <line x1="8" y1="20" x2="40" y2="20" stroke="#D97706" strokeWidth="2" />
                        
                        {/* Left section windows */}
                        <rect x="10" y="24" width="2.5" height="2.5" fill="#D97706" />
                        <rect x="10" y="30" width="2.5" height="2.5" fill="#D97706" />
                        <rect x="10" y="36" width="2.5" height="2.5" fill="#D97706" />
                        
                        {/* Right section windows */}
                        <rect x="37.5" y="24" width="2.5" height="2.5" fill="#D97706" />
                        <rect x="37.5" y="30" width="2.5" height="2.5" fill="#D97706" />
                        <rect x="37.5" y="36" width="2.5" height="2.5" fill="#D97706" />
                        
                        {/* Foundation/Base with steps */}
                        <rect x="8" y="39.5" width="32" height="2.5" fill="#2460e3" />
                        <line x1="12" y1="42" x2="36" y2="42" stroke="#D97706" strokeWidth="1" />
                        <line x1="14" y1="44" x2="34" y2="44" stroke="#D97706" strokeWidth="1" />
                        
                        {/* Small roof detail/cornice */}
                        <path d="M 8 20 Q 24 18 40 20" fill="none" stroke="#D97706" strokeWidth="1" />
                      </svg>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-3xl font-bold tracking-tight text-orange-500" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                      Funding Solutions
                    </h2>
                    <p className="max-w-[500px] mx-auto md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed" style={{ color: "#000000", textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                      We offer a variety of funding options to help your business grow and succeed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cards Grid - Centered 2x3 on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                  <Card className="bg-white border-gray-200 fs-card">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-blue-600"
                          >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                          Working Capital
                        </h3>
                      </div>
                      <p className="mt-1 text-gray-600">
                        Access the working capital your business needs to manage cash flow and day-to-day operations.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-gray-200 fs-card">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-blue-600"
                          >
                            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                          Bridge Loan
                        </h3>
                      </div>
                      <p className="mt-1 text-gray-600">
                        Get quick access to capital with flexible repayment based on your future sales and daily revenue.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-gray-200 fs-card">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-blue-600"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                          Business Line of Credit
                        </h3>
                      </div>
                      <p className="mt-1 text-gray-600">
                        Flexible funding that allows you to draw funds as needed and only pay interest on what you use.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-gray-200 fs-card">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-blue-600"
                          >
                            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                            <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                            <path d="M16 11h0" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                          SBA 7a Loans
                        </h3>
                      </div>
                      <p className="mt-1 text-gray-600">
                        Government-backed loans with favorable terms for small businesses that meet SBA eligibility
                        requirements.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-gray-200 fs-card">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-blue-600"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                          SBA 504
                        </h3>
                      </div>
                      <p className="mt-1 text-gray-600">
                        Long-term, fixed-rate financing for major assets like real estate and equipment to help your
                        business expand.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-gray-200 fs-card">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-blue-600"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                          Equipment Financing
                        </h3>
                      </div>
                      <p className="mt-1 text-gray-600">
                        Financing specifically for purchasing or leasing equipment, with flexible terms based on the
                        value of the equipment being financed.
                      </p>
                    </CardContent>
                  </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-16 lg:py-20 bg-[#F5F7FA]" id="testimonials">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: "#0D1B2A" }}>
                  Trusted by Businesses Nationwide
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our clients have to say about their experience with TurboFunding.com.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-[#F5F7FA] border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: "#0D1B2A" }}>
                        John Anderson
                      </h3>
                      <p className="text-gray-600">CEO, Tech Innovations</p>
                    </div>
                  </div>
                  <p style={{ color: "#0D1B2A" }}>
                    &quot;TurboFunding.com made it incredibly easy to get the capital we needed to expand our
                    operations. Highly recommended!&quot;
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#F5F7FA] border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: "#0D1B2A" }}>
                        Sarah Johnson
                      </h3>
                      <p className="text-gray-600">Owner, Boutique Retail</p>
                    </div>
                  </div>
                  <p style={{ color: "#0D1B2A" }}>
                    &quot;Fast, simple, and transparent. I got approved within 24 hours and had funds in my account
                    shortly after.&quot;
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#F5F7FA] border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-blue-100 p-2" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: "#0D1B2A" }}>
                        Mike Davis
                      </h3>
                      <p className="text-gray-600">Construction</p>
                    </div>
                  </div>
                  <p style={{ color: "#0D1B2A" }}>
                    &quot;The team at TurboFunding.com was professional and helpful throughout the entire process. Great
                    experience!&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Loan Calculator Section */}
        <LoanCalculator />

        {/* CTA Section */}
        <section className="w-full py-8 md:py-16 lg:py-20 bg-gray-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-3 text-center max-w-3xl mx-auto">
              <div className="space-y-2 w-full">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-orange-500">
                  Ready to Transform Your Business Finances? Get Turbo Funded
                </h2>
                <p className="md:text-xl mx-auto text-orange-400">Apply now and get a decision within 24 hours.</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
                  <Link href="/apply">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
