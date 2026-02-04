import type { Metadata } from "next"
import ProductsClient from "./products-client"

export const metadata: Metadata = {
  title: "Business Funding Products - Working Capital, SBA Loans, Equipment Financing",
  description:
    "Explore our comprehensive business funding solutions: Working Capital, SBA 7a & 504 loans, Equipment Financing, Merchant Cash Advances, and Business Lines of Credit. Compare rates and terms.",
  keywords: [
    "business funding products",
    "working capital loans",
    "SBA 7a loans",
    "SBA 504 loans",
    "equipment financing",
    "merchant cash advance",
    "business line of credit",
    "long term business loans",
    "commercial financing options",
  ],
  openGraph: {
    title: "Business Funding Products - Working Capital, SBA Loans, Equipment Financing",
    description:
      "Explore our comprehensive business funding solutions: Working Capital, SBA 7a & 504 loans, Equipment Financing, Merchant Cash Advances, and Business Lines of Credit. Compare rates and terms.",
    url: "https://turbofunding.com/products",
    images: [
      {
        url: "/images/turbofunding-products-og.jpg",
        width: 1200,
        height: 630,
        alt: "TurboFunding Business Funding Products",
      },
      {
        url: "/images/turbofunding-products-square.jpg",
        width: 1080,
        height: 1080,
        alt: "TurboFunding Business Funding Products",
      },
    ],
  },
  twitter: {
    title: "Business Funding Products - Working Capital, SBA Loans, Equipment Financing",
    description:
      "Explore our comprehensive business funding solutions: Working Capital, SBA 7a & 504 loans, Equipment Financing, Merchant Cash Advances, and Business Lines of Credit.",
    images: ["/images/turbofunding-products-twitter.jpg"],
  },
  alternates: {
    canonical: "https://turbofunding.com/products",
  },
  other: {
    // TikTok specific tags for products page
    "tiktok:title": "All Business Funding Products Explained! 📊💰",
    "tiktok:description":
      "Working Capital vs SBA Loans vs Equipment Financing! Which is best for your business? 🤔 #BusinessFunding #SBALoans #WorkingCapital",
    "tiktok:image": "https://turbofunding.com/images/turbofunding-products-tiktok.jpg",

    // Instagram specific tags for products page
    "instagram:title": "Complete Guide to Business Funding Products 📋✨",
    "instagram:description":
      "Discover all funding options for your business! Working capital, SBA loans, equipment financing & more 💼 Compare rates & terms 📊 #BusinessFunding",
    "instagram:image": "https://turbofunding.com/images/turbofunding-products-instagram.jpg",

    // LinkedIn specific tags for products page
    "linkedin:title": "Comprehensive Business Funding Solutions | Product Overview",
    "linkedin:description":
      "Compare our full range of business funding products. From working capital to SBA loans, find the right financing solution for your business needs.",
    "linkedin:image": "https://turbofunding.com/images/turbofunding-products-linkedin.jpg",

    // Pinterest specific tags for products page
    "pinterest:title": "Business Funding Products Guide 📊💡",
    "pinterest:description":
      "Complete guide to business funding options! Working capital, SBA loans, equipment financing comparison chart. Save for your business! 📌 #BusinessFunding",
    "pinterest:image": "https://turbofunding.com/images/turbofunding-products-pinterest.jpg",

    // WhatsApp specific tags for products page
    "whatsapp:title": "Business Funding Products - TurboFunding",
    "whatsapp:description":
      "Compare all our business funding products: Working Capital, SBA Loans, Equipment Financing & more. Find the right solution for your business!",
    "whatsapp:image": "https://turbofunding.com/images/turbofunding-products-whatsapp.jpg",
  },
}

export default function ProductsPage() {
  return (
    <>
      {/* Structured Data for Products */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Business Funding Products",
            provider: {
              "@type": "Organization",
              name: "TurboFunding.com",
            },
            description:
              "Comprehensive business funding solutions including working capital, SBA loans, equipment financing, and merchant cash advances.",
            serviceType: "Financial Services",
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
                    description: "Quick access to funds for immediate business needs with flexible repayment terms.",
                  },
                  priceRange: "$10,000 - $500,000",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "SBA 7a Loans",
                    description: "Government-backed loans with favorable terms for small businesses.",
                  },
                  priceRange: "Up to $5,000,000",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Equipment Financing",
                    description: "Finance new equipment purchases with competitive rates and flexible terms.",
                  },
                  priceRange: "$5,000 - $1,000,000",
                },
              ],
            },
          }),
        }}
      />
      <ProductsClient />
    </>
  )
}
