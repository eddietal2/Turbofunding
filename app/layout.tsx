import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { TrackingPixels } from "@/components/tracking-pixels"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://turbofunding.com"),
  title: {
    default: "TurboFunding.com - Fast Business Funding Solutions",
    template: "%s | TurboFunding.com",
  },
  description:
    "Get fast, secure business funding with TurboFunding.com. Working capital, SBA loans, equipment financing, and more. Apply now and get approved in 24 hours.",
  keywords: [
    "business funding",
    "small business loans",
    "working capital",
    "SBA loans",
    "equipment financing",
    "merchant cash advance",
    "business line of credit",
    "fast funding",
    "business financing",
    "commercial loans",
  ],
  authors: [{ name: "TurboFunding.com" }],
  creator: "TurboFunding.com",
  publisher: "TurboFunding.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://turbofunding.com",
    title: "TurboFunding.com - Fast Business Funding Solutions",
    description:
      "Get fast, secure business funding with TurboFunding.com. Working capital, SBA loans, equipment financing, and more. Apply now and get approved in 24 hours.",
    siteName: "TurboFunding.com",
    images: [
      {
        url: "/images/turbofunding-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TurboFunding.com - Fast Business Funding Solutions",
      },
      {
        url: "/images/turbofunding-square.jpg",
        width: 1080,
        height: 1080,
        alt: "TurboFunding.com - Fast Business Funding Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TurboFunding.com - Fast Business Funding Solutions",
    description:
      "Get fast, secure business funding with TurboFunding.com. Working capital, SBA loans, equipment financing, and more. Apply now and get approved in 24 hours.",
    images: ["/images/turbofunding-twitter-card.jpg"],
    creator: "@turbofunding",
    site: "@turbofunding",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://turbofunding.com",
  },
  other: {
    // TikTok specific tags
    "tiktok:app_id": "your-tiktok-app-id",
    "tiktok:title": "TurboFunding.com - Fast Business Funding Solutions",
    "tiktok:description":
      "Get fast, secure business funding. Apply now and get approved in 24 hours! 💰🚀 #BusinessFunding #SmallBusiness #Entrepreneur",
    "tiktok:image": "https://turbofunding.com/images/turbofunding-tiktok.jpg",

    // Instagram specific tags
    "instagram:title": "TurboFunding.com - Fast Business Funding Solutions",
    "instagram:description":
      "Get fast, secure business funding with TurboFunding.com. Working capital, SBA loans, equipment financing, and more. Apply now! 💼✨",
    "instagram:image": "https://turbofunding.com/images/turbofunding-instagram.jpg",

    // LinkedIn specific tags
    "linkedin:owner": "turbofunding-company",
    "linkedin:title": "TurboFunding.com - Fast Business Funding Solutions",
    "linkedin:description":
      "Professional business funding solutions for growing companies. Get working capital, SBA loans, and equipment financing with competitive rates.",
    "linkedin:image": "https://turbofunding.com/images/turbofunding-linkedin.jpg",

    // Pinterest specific tags
    "pinterest:title": "TurboFunding.com - Fast Business Funding Solutions",
    "pinterest:description":
      "Discover fast business funding solutions! Working capital, SBA loans, equipment financing & more. Help your business grow today! 📈💰",
    "pinterest:image": "https://turbofunding.com/images/turbofunding-pinterest.jpg",

    // WhatsApp specific tags
    "whatsapp:title": "TurboFunding.com - Fast Business Funding Solutions",
    "whatsapp:description":
      "Get fast, secure business funding with TurboFunding.com. Apply now and get approved in 24 hours!",
    "whatsapp:image": "https://turbofunding.com/images/turbofunding-whatsapp.jpg",

    // Telegram specific tags
    "telegram:title": "TurboFunding.com - Fast Business Funding Solutions",
    "telegram:description":
      "Fast, secure business funding solutions. Working capital, SBA loans, equipment financing & more. Apply today!",
    "telegram:image": "https://turbofunding.com/images/turbofunding-telegram.jpg",

    // YouTube specific tags (for video content)
    "youtube:title": "TurboFunding.com - Fast Business Funding Solutions",
    "youtube:description":
      "Learn about fast business funding solutions from TurboFunding.com. Get working capital, SBA loans, and equipment financing.",
    "youtube:image": "https://turbofunding.com/images/turbofunding-youtube.jpg",

    // Snapchat specific tags
    "snapchat:title": "TurboFunding.com - Fast Business Funding",
    "snapchat:description": "Fast business funding solutions! 💰 Apply now for working capital, SBA loans & more! 🚀",
    "snapchat:image": "https://turbofunding.com/images/turbofunding-snapchat.jpg",

    // Discord specific tags
    "discord:title": "TurboFunding.com - Fast Business Funding Solutions",
    "discord:description":
      "Professional business funding solutions for entrepreneurs and growing companies. Get approved in 24 hours!",
    "discord:image": "https://turbofunding.com/images/turbofunding-discord.jpg",

    // Reddit specific tags
    "reddit:title": "TurboFunding.com - Fast Business Funding Solutions",
    "reddit:description":
      "Legitimate business funding solutions with fast approval. Working capital, SBA loans, equipment financing available.",
    "reddit:image": "https://turbofunding.com/images/turbofunding-reddit.jpg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/tf-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/tf-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Additional Social Media Meta Tags */}
        <meta property="fb:app_id" content="your-facebook-app-id" />
        <meta property="fb:pages" content="your-facebook-page-id" />
        <meta property="business:contact_data:street_address" content="123 Finance Street, Suite 500" />
        <meta property="business:contact_data:locality" content="New York" />
        <meta property="business:contact_data:region" content="NY" />
        <meta property="business:contact_data:postal_code" content="10001" />
        <meta property="business:contact_data:country_name" content="United States" />
        <meta property="business:contact_data:phone_number" content="+1-800-555-8872" />
        <meta property="business:contact_data:website" content="https://turbofunding.com" />

        {/* TikTok Meta Tags */}
        <meta name="tiktok-for-business-verify" content="your-tiktok-verification-code" />

        {/* Instagram Meta Tags */}
        <meta property="instapp:owner_user_id" content="your-instagram-user-id" />

        {/* LinkedIn Meta Tags */}
        <meta property="linkedin:owner" content="turbofunding-company" />

        {/* Pinterest Meta Tags */}
        <meta name="pinterest-rich-pin" content="true" />
        <meta property="pinterest:app_id" content="your-pinterest-app-id" />

        {/* Additional Twitter Meta Tags */}
        <meta name="twitter:app:name:iphone" content="TurboFunding" />
        <meta name="twitter:app:id:iphone" content="your-ios-app-id" />
        <meta name="twitter:app:name:googleplay" content="TurboFunding" />
        <meta name="twitter:app:id:googleplay" content="your-android-app-id" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TurboFunding.com",
              url: "https://turbofunding.com",
              logo: "https://turbofunding.com/images/turbofunding-logo.png",
              description:
                "Fast, secure business funding solutions including working capital, SBA loans, equipment financing, and merchant cash advances.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Finance Street, Suite 500",
                addressLocality: "New York",
                addressRegion: "NY",
                postalCode: "10001",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-800-555-8872",
                contactType: "customer service",
                availableLanguage: "English",
              },
              sameAs: [
                "https://www.linkedin.com/company/turbofunding",
                "https://twitter.com/turbofunding",
                "https://www.facebook.com/turbofunding",
                "https://www.instagram.com/turbofunding",
                "https://www.tiktok.com/@turbofunding",
                "https://www.youtube.com/@turbofunding",
                "https://www.pinterest.com/turbofunding",
              ],
              founder: [
                {
                  "@type": "Person",
                  name: "Matthew Rogove",
                  jobTitle: "Co-Founder",
                },
                {
                  "@type": "Person",
                  name: "Vivek Singh",
                  jobTitle: "Co-Founder",
                },
              ],
              foundingDate: "2018",
              numberOfEmployees: "10-50",
              industry: "Financial Services",
            }),
          }}
        />

        {/* Tracking Pixels */}
        <TrackingPixels
          facebookPixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}
          linkedInPartnerId={process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}
          googleAnalyticsId={process.env.NEXT_PUBLIC_GA_ID}
          googleAdsId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}
          tiktokPixelId={process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID}
          twitterPixelId={process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID}
          snapchatPixelId={process.env.NEXT_PUBLIC_SNAPCHAT_PIXEL_ID}
          pinterestTagId={process.env.NEXT_PUBLIC_PINTEREST_TAG_ID}
          microsoftUetId={process.env.NEXT_PUBLIC_MICROSOFT_UET_ID}
          redditPixelId={process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID}
        />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable}`}>
        {/* ScrollToTop component to reset scroll position on navigation */}
        <ScrollToTop />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
