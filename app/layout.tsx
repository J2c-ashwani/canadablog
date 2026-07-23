import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ClientOverlays } from "@/components/ClientOverlays"
import GlobalWikipediaLinker from "@/components/seo/GlobalWikipediaLinker"
import { AdSensePageTracker } from "@/components/AdSensePageTracker"
import { AdSenseLoader } from "@/components/AdSenseLoader"
import { FunnelTelemetryTracker } from "@/components/FunnelTelemetryTracker"
import { TrackingConsentGate } from "@/components/TrackingConsentGate"

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-DZ55NMNLYM"
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "FSI Digital | Government Grants for Startups & Businesses",
  description:
    "Find government grants for startups and small businesses in USA and Canada. Free grant finder tool, application guides, and funding opportunities.",
  keywords: "FSI, FSI Digital, FSIDigital, FSI Grants, government grants, startup funding, small business grants, USA grants, Canada grants, business funding, business investment, angel investors, venture capital alternatives, startup investment, non-dilutive funding",
  authors: [{ name: "FSI Digital" }],
  creator: "FSI Digital",
  publisher: "FSI Digital",
  robots: "index, follow",
  metadataBase: new URL("https://www.fsidigital.ca"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon.png",
    },
  },
  manifest: "/site.webmanifest",
  // viewport moved to separate export
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fsidigital.ca",
    siteName: "FSI Digital",
    title: "Government Grants for Startups & Businesses | USA & Canada",
    description:
      "Find government grants for startups and small businesses in USA and Canada. Free grant finder tool, application guides, and funding opportunities.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Government Grants for Startups and Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Government Grants for Startups & Businesses | USA & Canada",
    description: "Find government grants for startups and small businesses in USA and Canada.",
    images: ["/og-image.png"],
  },
  generator: 'FSI Digital'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Preconnect to critical third-party origins for CWV */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="alternate" type="application/rss+xml" title="FSI Digital grant funding updates" href="/feed.xml" />
        <AdSenseLoader />
        <TrackingConsentGate
          gaMeasurementId={GA_MEASUREMENT_ID}
          clarityId={CLARITY_ID}
          metaPixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID}
          googleAdsId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}
          linkedinInsightId={process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_ID}
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        {children}
        <ClientOverlays />
        <GlobalWikipediaLinker />
        <AdSensePageTracker />
        <FunnelTelemetryTracker />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "FSI Digital",
                  "alternateName": ["FSI", "FSIDigital", "FSI Grants"],
                  "url": "https://www.fsidigital.ca",
                  "logo": "https://www.fsidigital.ca/logo.png",
                  "description": "Find government grants for startups and small businesses in USA and Canada",
                  "sameAs": [
                    "https://twitter.com/fsidigital",
                    "https://linkedin.com/company/fsidigital"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer support",
                    "email": "hello@fsidigital.ca"
                  },
                  "areaServed": ["US", "CA", "MX"]
                },
                {
                  "@type": "WebSite",
                  "name": "FSI Digital Government Grants",
                  "url": "https://www.fsidigital.ca",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://www.fsidigital.ca/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            }),
          }}
        />
      </body>
    </html>
  )
}
