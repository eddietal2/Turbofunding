'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { RotatingText } from "@/components/rotating-text"
import { LoanCalculator } from "@/components/loan-calculator"
import { useEffect } from "react"

export default function Home() {
  const productNames = ["Term Loans", "Bridge Loans", "SBA Loans", "Business Lines of Credit", "Equipment Financing"]
  const heroImage = '/images/hero-bg.jpg'
  const heroGradient = 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.50), rgba(255, 255, 255, 0.0))'

  // Setup Intersection Observer for scroll animations
  useEffect(() => {
    const setupObserver = () => {
      const qualifyCards = document.querySelectorAll('.qualify-card');
      const fsCards = document.querySelectorAll('.fs-card');
      const fsHeader = document.querySelectorAll('.fs-header');
      const fsAccordionItems = document.querySelectorAll('.fs-accordion-item');
      
      const allCards = [...Array.from(qualifyCards), ...Array.from(fsCards), ...Array.from(fsHeader), ...Array.from(fsAccordionItems)];
      
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
      
      // Setup carousel scroll behavior
      const carouselContainer = document.querySelector('.carousel-container');
      if (carouselContainer) {
        let scrollTimeout: NodeJS.Timeout;
        
        carouselContainer.addEventListener('scroll', () => {
          // Show scrollbar and pause animation when scrolling
          carouselContainer.classList.add('scrolling');
          
          // Clear existing timeout
          clearTimeout(scrollTimeout);
          
          // Hide scrollbar after user stops scrolling (300ms of no scroll events)
          scrollTimeout = setTimeout(() => {
            carouselContainer.classList.remove('scrolling');
          }, 300);
        });
      }
      
      // Enhanced parallax effect on hero section
      const parallaxBg = document.querySelector('.hero-parallax-bg') as HTMLElement;
      const gradientOverlay = document.querySelector('.hero-gradient-overlay') as HTMLElement;
      const heroSection = document.querySelector('.hero-bg-responsive') as HTMLElement;
      
      if (parallaxBg || gradientOverlay || heroSection) {
        let ticking = false;
        
        // Set initial background position pushed upwards 40%
        if (heroSection) {
          const heroHeight = heroSection.offsetHeight;
          const initialOffset = heroHeight * 0.4;
          heroSection.style.backgroundPositionY = `${-initialOffset}px`;
        }
        
        const updateParallax = () => {
          const scrollY = window.scrollY;
          const hero = heroSection || parallaxBg?.parentElement;
          if (!hero) return;
          
          const heroHeight = hero.offsetHeight;
          const initialOffset = heroHeight * 0.4;
          
          // Only run parallax while hero is in viewport and beyond
          if (scrollY < heroHeight * 3) {
            // Mobile parallax image at 50% scroll speed
            if (parallaxBg && parallaxBg.offsetParent !== null) {
              const bgOffset = scrollY * 0.5;
              parallaxBg.style.transform = `translate3d(0, ${bgOffset}px, 0)`;
            }
            
            // Gradient overlay parallax at 35% scroll speed (layered effect)
            if (gradientOverlay) {
              const gradientOffset = scrollY * 0.35;
              gradientOverlay.style.transform = `scaleX(-1) translate3d(0, ${gradientOffset}px, 0)`;
            }
            
            // Desktop: Hero background parallax - move background image up as user scrolls down
            if (heroSection) {
              const parallaxOffset = Math.floor(scrollY * 0.4);
              // Start from initial 40% offset + parallax effect
              heroSection.style.backgroundPositionY = `${-(initialOffset + parallaxOffset)}px`;
            }
          }
          ticking = false;
        };
        
        const onScroll = () => {
          if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
          }
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Cleanup
        return () => {
          window.removeEventListener('scroll', onScroll);
        };
      }
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
            background-image: none !important;
            background-attachment: scroll !important;
          }
          .hero-parallax-bg {
            display: block !important;
          }
        }
        .hero-parallax-bg {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 130%;
          object-fit: cover;
          object-position: center;
          will-change: transform;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>

      <div className="flex flex-col">
        {/* Hero Section */}
      <section 
        className="hero-bg-responsive relative w-full h-[50vh] md:h-[55vh] lg:h-[65vh] overflow-hidden"
        style={{
          backgroundImage: `url('${heroImage}')`,
          backgroundSize: "100%",
          backgroundPosition: "120% center",
          backgroundRepeat: "no-repeat",
          minHeight: "auto",
          "--hero-image-mobile": "url('/images/hero-bg-xs.png')",
          transform: "scaleX(-1)",
          willChange: "background-position",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        } as any}
      >
        {/* Mobile Parallax Background Image */}
        <img
          src="/images/hero-bg-xs.png"
          alt=""
          className="hero-parallax-bg"
          aria-hidden="true"
          style={{ 
            transform: "scaleX(-1)",
            willChange: "transform",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        />
        {/* Background Filter/Blur Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            filter: "blur(2px) brightness(0.8)",
            animation: "slideHorizontal 20s linear infinite",
            pointerEvents: "none",
            transform: "scaleX(-1)"
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
            background: heroGradient,
            transform: "scaleX(-1)"
          }}
        />
        <style>{`
          @media (max-width: 768px) {
            .hero-gradient-overlay {
              background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.4)) !important;
            }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .hero-gradient-overlay {
              background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.3) 70%, transparent 100%) !important;
            }
          }
        `}</style>
        
        {/* Subtle Animated Overlay Elements */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" style={{ transform: "scaleX(-1)" }}>
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
        <div className="container relative z-10 px-4 md:px-6 lg:px-8 h-full flex flex-col justify-start md:justify-center pt-0 md:pt-12 lg:pt-16 pb-16 md:pb-12 lg:pb-16" style={{ transform: "scaleX(-1)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-12 items-center h-auto py-8 md:py-0">
            {/* Left Column - Text Content */}
            <div className="flex flex-col h-full md:h-auto space-y-4 md:space-y-3 lg:space-y-6">
              {/* H1 and description - at top */}
              <div className="space-y-3 md:space-y-2 lg:space-y-4 pt-2 md:pt-0">
                <h1 
                  className="text-3xl sm:text-4xl md:text-3xl lg:text-3xl xl:text-4xl font-bold tracking-widest leading-tight" 
                  style={{ 
                    // fontFamily: "var(--font-space-grotesk), sans-serif",
                    letterSpacing: "-0.02em"
                  }}
                >
                  <span className="md:text-[1.1em] lg:text-[1.1em] xl:text-[1.2em]" style={{ color: "#1D4ED8", display: "block", marginTop: "0.1em" }}><span className="text-[#D97706]">Turbo</span>Charge your</span>
                  <span className="md:text-[1.1em] lg:text-[1.1em] xl:text-[1.2em]" style={{ color: "#1D4ED8", display: "block" }}>Business with</span>
                  <RotatingText
                    words={productNames}
                    className="font-bold md:text-[1.1em] lg:text-[1.1em] xl:text-[1.2em]"
                    style={{
                      color: "#D97706",
                      display: "inline-block",
                      paddingTop: "0.2em",
                      paddingBottom: "0.2em",
                      marginTop: "0.1em",
                      lineHeight: "1.2",
                      textShadow: "none",
                      borderRadius: "0.5em",
                      // fontFamily: "var(--font-space-grotesk), sans-serif"
                    }}
                  />
                </h1>
                <p 
                  className="text-base md:text-sm lg:text-sm xl:text-base font-medium tracking-wide" 
                  style={{ 
                    color: "#1F2937", 
                    marginTop: "0.4em",
                    // fontFamily: "var(--font-space-grotesk), sans-serif"
                  }}
                >
                  <span style={{ color: "#D97706", fontWeight: "600" }}>Fast,</span> <span style={{ color: "#2460e3", fontWeight: "600" }}>reliable</span> business funding solutions to help your company grow at the <span style={{ color: "#10b981", fontWeight: "600" }}>speed of opportunity.</span>
                </p>
              </div>

              {/* Button and disclaimer - positioned at bottom on mobile using margin-top: auto */}
              <div className="space-y-2 md:space-y-2 lg:space-y-3 mt-auto md:mt-4 lg:mt-6">
              <div className="flex flex-col gap-3 min-[400px]:flex-row pt-2 lg:pt-0">
                  <Button 
                    asChild 
                    className="btn-blue-elite text-lg md:text-base lg:text-base xl:text-lg px-8 md:px-6 lg:px-8 py-6 md:py-3 lg:py-5 w-fit font-semibold tracking-wide text-white"
                  >
                    <Link href="/apply">See Your Loan Options</Link>
                  </Button>
              </div>
                <p 
                  className="text-[0.6em] md:text-xs lg:text-sm font-medium tracking-wider" 
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
            </div>

            {/* Right Column - iPhone Frame Illustration */}
            <div className="flex items-center justify-center hidden md:flex md:ml-0 lg:ml-8 xl:ml-12" style={{
              animation: "fadeInUp 0.8s ease-out 1s forwards",
              opacity: 0
            }}>
              <style>{`
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(80px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
              <div className="relative md:scale-[0.55] lg:scale-[0.65] xl:scale-[0.75] origin-center" style={{ width: "280px", height: "560px" }}>
                {/* Phone Shadow */}
                <div className="absolute inset-0 rounded-3xl" style={{
                  background: "radial-gradient(ellipse 180% 100% at 50% 100%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.15) 40%, transparent 70%)",
                  borderRadius: "40px",
                  transform: "translateY(30px)",
                  filter: "blur(20px)",
                  zIndex: -1
                }} />
                
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
                      <source src="/videos/TF_Phone_Video.mp4" type="video/mp4" />
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
        <section className="w-full py-16 md:py-16 lg:py-40 lg:h-screen lg:flex lg:flex-col lg:justify-center bg-[#F5F7FA] relative overflow-hidden" id="qualify">
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
            
            @keyframes gridGlow {
              0% {
                opacity: 0.05;
                filter: drop-shadow(0 0 8px rgba(36, 96, 227, 0.6));
              }
              50% {
                opacity: 0.05;
                filter: drop-shadow(0 0 16px rgba(217, 119, 6, 0.8));
              }
              100% {
                opacity: 0.05;
                filter: drop-shadow(0 0 8px rgba(36, 96, 227, 0.6));
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
            style={{ animation: "gridGlow 5s ease-in-out infinite" }}
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2460e3" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-5xl" style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                  How To Qualify
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple requirements to get your business funded quickly and efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 py-2 md:grid-cols-2 lg:grid-cols-2">
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
              <Button asChild className="btn-blue-elite text-base md:text-lg px-6 md:px-8 py-4 md:py-5 font-semibold text-white">
                <Link href="/apply">Check Your Eligibility</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {/* CHANGE> Changed Funding Solutions section from dark gray (bg-gray-900) to white background with #0D1B2A text */}
        <section className="w-full py-16 md:py-16 lg:py-32 relative min-h-screen fs-section" id="features" style={{
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
          <style dangerouslySetInnerHTML={{__html: `
            .fs-accordion-item {
              border-bottom: 1px solid rgba(0, 0, 0, 0.08);
              margin-bottom: 0.5rem;
              opacity: 0;
              background: rgba(255, 255, 255, 0.8);
              padding: 0.75rem;
              border-radius: 0.5rem;
              backdrop-filter: blur(10px);
            }

            .fs-accordion-item.scroll-visible {
              animation: fadeUpIn 0.6s ease-out forwards;
            }

            .fs-accordion-item:nth-child(1).scroll-visible {
              animation-delay: 0s;
            }

            .fs-accordion-item:nth-child(2).scroll-visible {
              animation-delay: 0.1s;
            }

            .fs-accordion-item:nth-child(3).scroll-visible {
              animation-delay: 0.2s;
            }

            .fs-accordion-item:nth-child(4).scroll-visible {
              animation-delay: 0.3s;
            }

            .fs-accordion-item:nth-child(5).scroll-visible {
              animation-delay: 0.4s;
            }

            .fs-accordion-item:nth-child(6).scroll-visible {
              animation-delay: 0.5s;
            }

            .fs-accordion-item:nth-child(7).scroll-visible {
              animation-delay: 0.6s;
            }

            .fs-accordion-item:last-child {
              border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            }

            .fs-accordion-trigger {
              color: #0D1B2A;
              font-weight: 600;
              padding: 0.5rem 0;
              transition: all 0.3s ease;
              font-size: 1rem;
            }

            .fs-accordion-trigger:hover {
              color: #2460e3;
            }

            .fs-accordion-trigger[data-state="open"] {
              color: #2460e3;
            }

            .fs-accordion-content {
              border-bottom: none;
              padding: 0.5rem 0;
              background: transparent;
              color: #0D1B2A;
            }

            .fs-accordion-icon {
              transition: all 0.3s ease;
              background: #E8F1FF !important;
            }

            .fs-accordion-trigger:hover .fs-accordion-icon {
              background: #2460e3 !important;
            }

            .fs-accordion-trigger:hover .fs-accordion-icon svg {
              color: white;
              stroke: white;
            }

            .fs-accordion-trigger[data-state="open"] .fs-accordion-icon {
              background: linear-gradient(135deg, #2460e3 0%, #1947b8 100%) !important;
            }

            .fs-accordion-trigger[data-state="open"] .fs-accordion-icon svg {
              color: white;
              stroke: white;
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
          `}} />
          <style dangerouslySetInnerHTML={{__html: `
            .fs-card {
              transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
              cursor: pointer;
              opacity: 0;
              box-shadow: 0 4px 20px rgba(36, 96, 227, 0.08);
              background: rgba(255, 255, 255, 0.92);
              border: 1px solid rgba(36, 96, 227, 0.08);
              width: 280px;
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
            
            .fs-card:nth-child(7).scroll-visible {
              animation-delay: 0.6s;
            }
            
            .fs-card:hover {
              box-shadow: 0 4px 20px rgba(36, 96, 227, 0.08);
              background: #FFFFFF;
              border-color: rgba(36, 96, 227, 0.08);
            }
            
            .fs-card:hover h3 {
              color: #2460e3 !important;
            }
            
            .fs-card .fs-card-icon {
              transition: all 0.3s ease;
            }
            
            .fs-card:hover .fs-card-icon {
              background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%) !important;
              transform: scale(1.1);
              color: white !important;
            }
            
            .fs-card:hover .fs-card-icon svg {
              stroke: white !important;
              color: white !important;
            }
            
            @media (max-width: 768px) {
              .fs-card {
                background: #FFFFFF;
                border-color: rgba(36, 96, 227, 0.08);
              }
              
              .fs-card h3 {
                color: #0D1B2A !important;
              }
              
              .fs-card .fs-card-icon {
                background: #E8F1FF !important;
                color: #2460e3 !important;
              }
              
              .fs-card .fs-card-icon svg {
                stroke: #2460e3 !important;
                color: #2460e3 !important;
              }
              
              .fs-card:hover {
                transform: none;
                box-shadow: 0 4px 20px rgba(36, 96, 227, 0.08);
                background: #FFFFFF;
              }
              
              .fs-card:hover h3 {
                color: #2460e3 !important;
              }
              
              .fs-card:hover .fs-card-icon {
                background: #E8F1FF !important;
                color: #2460e3 !important;
                transform: none;
              }
            }
            
            .fs-card > div {
              padding: 1.5rem;
            }
            
            @media (max-width: 768px) {
              .fs-card > div {
                padding: 1rem;
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
          `}} />
          {/* Light gradient overlay for visual polish */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.12) 100%)"
            }}
          />
          
          <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
            <div className="w-full">
              <div className="w-full text-center mb-12 fs-header">
                <div className="rounded-lg p-8 md:p-10 lg:p-12 w-fit mx-auto" style={{ backgroundColor: "rgba(255, 255, 255, 0.92)" }}>
                  <div className="flex justify-center mb-6">
                    <div className="flex-shrink-0 p-3 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ fontFamily: "var(--font-space-grotesk), sans-serif", color: "#0D1B2A" }}>
                    Funding Solutions
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: "#0D1B2A", opacity: 0.85 }}>Explore our range of business financing options tailored to your company's unique needs</p>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="flex flex-wrap justify-center gap-4">
                {/* Working Capital */}
                <div className="fs-card">
                  <div className="flex flex-col h-full">
                    <div>
                      <div className="fs-card-icon rounded-lg bg-blue-100 p-3 flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4" style={{
                        background: "#E8F1FF",
                        color: "#2460e3"
                      }}>
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
                          className="h-6 w-6"
                        >
                          <polyline points="23 6 13.5 15.5 8 10 1 17" />
                          <polyline points="17 6 23 6 23 12" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: "#0D1B2A" }}>Working Capital</h3>
                      <p className="text-base leading-relaxed mb-6" style={{ color: "#0D1B2A", opacity: 0.85 }}>
                        Access the working capital your business needs to manage cash flow and day-to-day operations.
                      </p>
                    </div>
                    <Button asChild className="mt-auto btn-blue-elite text-sm px-4 py-2 font-semibold text-white w-full">
                      <Link href="/products?product=working-capital">Learn More</Link>
                    </Button>
                  </div>
                </div>

                {/* Bridge Loan */}
                <div className="fs-card">
                  <div className="flex flex-col h-full">
                    <div>
                      <div className="fs-card-icon rounded-lg p-3 flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4" style={{
                        background: "#E8F1FF",
                        color: "#2460e3"
                      }}>
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
                          className="h-6 w-6"
                        >
                          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: "#0D1B2A" }}>Bridge Loan</h3>
                      <p className="text-base leading-relaxed mb-6" style={{ color: "#0D1B2A", opacity: 0.85 }}>
                        Get quick access to capital with flexible repayment based on your future sales and daily revenue.
                      </p>
                    </div>
                    <Button asChild className="mt-auto btn-blue-elite text-sm px-4 py-2 font-semibold text-white w-full">
                      <Link href="/products?product=bridge-loan">Learn More</Link>
                    </Button>
                  </div>
                </div>

                {/* Business Line of Credit */}
                <div className="fs-card">
                  <div className="flex flex-col h-full">
                    <div>
                      <div className="fs-card-icon rounded-lg p-3 flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4" style={{
                        background: "#E8F1FF",
                        color: "#2460e3"
                      }}>
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
                          className="h-6 w-6"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: "#0D1B2A" }}>Business Line of Credit</h3>
                      <p className="text-base leading-relaxed mb-6" style={{ color: "#0D1B2A", opacity: 0.85 }}>
                        Flexible funding that allows you to draw funds as needed and only pay interest on what you use.
                      </p>
                    </div>
                    <Button asChild className="mt-auto btn-blue-elite text-sm px-4 py-2 font-semibold text-white w-full">
                      <Link href="/products?product=business-line-of-credit">Learn More</Link>
                    </Button>
                  </div>
                </div>

                {/* SBA 7a Loans */}
                <div className="fs-card">
                  <div className="flex flex-col h-full">
                    <div>
                      <div className="fs-card-icon rounded-lg p-3 flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4" style={{
                        background: "#E8F1FF",
                        color: "#2460e3"
                      }}>
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
                          className="h-6 w-6"
                        >
                          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: "#0D1B2A" }}>SBA 7a Loans</h3>
                      <p className="text-base leading-relaxed mb-6" style={{ color: "#0D1B2A", opacity: 0.85 }}>
                        Government-backed loans with favorable terms for small businesses that meet SBA eligibility requirements.
                      </p>
                    </div>
                    <Button asChild className="mt-auto btn-blue-elite text-sm px-4 py-2 font-semibold text-white w-full">
                      <Link href="/products?product=sba-7a-loans">Learn More</Link>
                    </Button>
                  </div>
                </div>

                {/* Equipment Financing */}
                <div className="fs-card">
                  <div className="flex flex-col h-full">
                    <div>
                      <div className="fs-card-icon rounded-lg p-3 flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4" style={{
                        background: "#E8F1FF",
                        color: "#2460e3"
                      }}>
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
                          className="h-6 w-6"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: "#0D1B2A" }}>Equipment Financing</h3>
                      <p className="text-base leading-relaxed mb-6" style={{ color: "#0D1B2A", opacity: 0.85 }}>
                        Financing specifically for purchasing or leasing equipment, with flexible terms based on the value of the equipment being financed.
                      </p>
                    </div>
                    <Button asChild className="mt-auto btn-blue-elite text-sm px-4 py-2 font-semibold text-white w-full">
                      <Link href="/products?product=equipment-financing">Learn More</Link>
                    </Button>
                  </div>
                </div>

                {/* Merchant Cash Advance */}
                <div className="fs-card">
                  <div className="flex flex-col h-full">
                    <div>
                      <div className="fs-card-icon rounded-lg p-3 flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4" style={{
                        background: "#E8F1FF",
                        color: "#2460e3"
                      }}>
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
                          className="h-6 w-6"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                          <path d="M6 16h.01M10 16h.01" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: "#0D1B2A" }}>Merchant Cash Advance</h3>
                      <p className="text-base leading-relaxed mb-6" style={{ color: "#0D1B2A", opacity: 0.85 }}>
                        Quick access to capital by selling a portion of your future daily credit card sales with transparent, simple repayment terms.
                      </p>
                    </div>
                    <Button asChild className="mt-auto btn-blue-elite text-sm px-4 py-2 font-semibold text-white w-full">
                      <Link href="/products?product=merchant-cash-advance">Learn More</Link>
                    </Button>
                  </div>
                </div>

                {/* SBA 504 */}
                <div className="fs-card">
                  <div className="flex flex-col h-full">
                    <div>
                      <div className="fs-card-icon rounded-lg p-3 flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4" style={{
                        background: "#E8F1FF",
                        color: "#2460e3"
                      }}>
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
                          className="h-6 w-6"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: "#0D1B2A" }}>SBA 504</h3>
                      <p className="text-base leading-relaxed mb-6" style={{ color: "#0D1B2A", opacity: 0.85 }}>
                        Long-term, fixed-rate financing for major assets like real estate and equipment to help your business expand.
                      </p>
                    </div>
                    <Button asChild className="mt-auto btn-blue-elite text-sm px-4 py-2 font-semibold text-white w-full">
                      <Link href="/products?product=sba-504">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="w-full text-center mt-12">
                <Button asChild className="btn-blue-elite text-base md:text-lg px-6 md:px-8 py-4 md:py-5 font-semibold text-white">
                  <Link href="/products">Get Started Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-16 lg:py-32 bg-[#F5F7FA] relative overflow-hidden" id="testimonials">
          <style>{`
            @media (max-width: 768px) {
              #testimonials {
                padding-top: 3rem;
                padding-bottom: 3rem;
              }
            }
          `}</style>
          {/* Grid SVG Background */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ animation: "gridGlow 5s ease-in-out infinite" }}
          >
            <defs>
              <pattern id="grid-testimonials" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2460e3" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-testimonials)" />
          </svg>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <div className="mb-4 flex justify-center">
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
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <circle cx="9" cy="10" r="1" fill="#2460e3" style={{ animation: "dotsAnimation 1.5s ease-in-out 0s infinite" }} />
                    <circle cx="15" cy="10" r="1" fill="#2460e3" style={{ animation: "dotsAnimation 1.5s ease-in-out 0.3s infinite" }} />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: "#0D1B2A", fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                  Trusted by Businesses Nationwide
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our clients have to say about their experience with TurboFunding.com.
                </p>
              </div>
            </div>
            <style>{`
              @keyframes dotsAnimation {
                0%, 100% {
                  opacity: 0.3;
                }
                50% {
                  opacity: 1;
                }
              }
              
              @keyframes carouselScroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              .carousel-container {
                overflow-x: auto;
                overflow-y: hidden;
                width: 100vw;
                position: relative;
                left: 50%;
                right: 50%;
                margin-left: -50vw;
                margin-right: -50vw;
                scroll-behavior: smooth;
                scrollbar-width: none;
              }
              
              .carousel-container::-webkit-scrollbar {
                display: none;
              }
              
              .carousel-container.scrolling::-webkit-scrollbar {
                display: block;
                height: 8px;
              }
              
              .carousel-container.scrolling::-webkit-scrollbar-track {
                background: transparent;
              }
              
              .carousel-container.scrolling::-webkit-scrollbar-thumb {
                background: rgba(36, 96, 227, 0.5);
                border-radius: 4px;
              }
              
              .carousel-container.scrolling::-webkit-scrollbar-thumb:hover {
                background: rgba(36, 96, 227, 0.7);
              }
              
              .carousel-track {
                display: flex;
                gap: 1rem;
                animation: carouselScroll 30s linear infinite;
                width: fit-content;
              }
              
              .carousel-track:hover {
                animation-play-state: paused;
              }
              
              .carousel-container.scrolling .carousel-track {
                animation-play-state: paused;
              }
              
              .carousel-card {
                flex: 0 0 28%;
                min-width: 200px;
              }
              
              @media (min-width: 768px) {
                .carousel-card {
                  flex: 0 0 40%;
                  min-width: 320px;
                }
              }
              
              @media (min-width: 1024px) {
                .carousel-card {
                  flex: 0 0 28%;
                  min-width: 320px;
                }
              }
            `}</style>
            <div className="py-8 carousel-container">
              <div className="carousel-track">
                {/* Original set of cards */}
                <div className="carousel-card">
                  <Card className="bg-white border-gray-200 h-full">
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
                </div>
                <div className="carousel-card">
                  <Card className="bg-white border-gray-200 h-full">
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
                </div>
                <div className="carousel-card">
                  <Card className="bg-white border-gray-200 h-full">
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
                
                {/* Duplicated set for seamless loop */}
                <div className="carousel-card">
                  <Card className="bg-white border-gray-200 h-full">
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
                </div>
                <div className="carousel-card">
                  <Card className="bg-white border-gray-200 h-full">
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
                </div>
                <div className="carousel-card">
                  <Card className="bg-white border-gray-200 h-full">
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
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-16 lg:py-32 relative overflow-hidden" style={{
          background: "linear-gradient(135deg, #0D1B2A 0%, #1a2a3a 50%, #0D1B2A 100%)",
        }}>
          <style>{`
            @keyframes floatGradient {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0px); }
            }
            
            @keyframes pulseGlow {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
            
            .cta-grid {
              position: absolute;
              inset: 0;
              opacity: 0.1;
              background-image: 
                linear-gradient(rgba(36, 96, 227, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(36, 96, 227, 0.5) 1px, transparent 1px);
              background-size: 40px 40px;
              pointer-events: none;
            }
            
            .cta-accent {
              position: absolute;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(217, 119, 6, 0.2) 0%, transparent 70%);
              pointer-events: none;
            }
            
            .cta-accent-1 {
              width: 300px;
              height: 300px;
              top: -100px;
              right: -100px;
              animation: floatGradient 6s ease-in-out infinite;
            }
            
            .cta-accent-2 {
              width: 250px;
              height: 250px;
              bottom: -75px;
              left: -75px;
              animation: floatGradient 8s ease-in-out infinite 1s;
            }
            
            .cta-content {
              position: relative;
              z-10;
            }
            
            .cta-button-group {
              animation: floatGradient 4s ease-in-out infinite;
            }
          `}</style>
          
          {/* Background Grid */}
          <div className="cta-grid" />
          
          {/* Floating Accents */}
          <div className="cta-accent cta-accent-1" />
          <div className="cta-accent cta-accent-2" />
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="cta-content flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center">
              {/* Main Heading */}
              <div className="space-y-4 max-w-4xl">
                <h2 
                  className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight" 
                  style={{ 
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    color: "#FFFFFF",
                  }}
                >
                  Ready to Transform Your <span style={{ color: "#D97706" }}>Business Finances?</span>
                </h2>
                <p 
                  className="text-lg md:text-xl leading-relaxed" 
                  style={{
                    color: "rgba(255, 255, 255, 0.85)",
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  Get approved in as little as 24 hours. No credit impact, simple process, fast funding.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="cta-button-group flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  asChild 
                  className="btn-gold-elite text-base md:text-lg px-8 md:px-12 py-4 md:py-6 font-bold tracking-wide rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
                    color: "#FFFFFF",
                  }}
                >
                  <Link href="/apply">Start Your Application</Link>
                </Button>
                <Button 
                  asChild 
                  className="btn-blue-elite text-base md:text-lg px-8 md:px-12 py-4 md:py-6 font-bold tracking-wide rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #2460e3 0%, #1947b8 100%)",
                    color: "#FFFFFF",
                  }}
                >
                  <Link href="/resources#calculator">Use Loan Calculator</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
