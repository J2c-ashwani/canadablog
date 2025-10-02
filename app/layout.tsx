import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { CookieConsent } from "@/components/cookie-consent"
import { LeadMagnetPopup } from "@/components/lead-magnet-popup"

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

export const metadata: Metadata = {
  title: "Government Grants for Startups & Businesses | USA & Canada Funding",
  description:
    "Find government grants for startups and small businesses in USA and Canada. Free grant finder tool, application guides, and funding opportunities.",
  keywords: "government grants, startup funding, small business grants, USA grants, Canada grants, business funding",
  authors: [{ name: "Grant Finder Pro" }],
  creator: "Grant Finder Pro",
  publisher: "Grant Finder Pro",
  robots: "index, follow",
  metadataBase: new URL("https://grantfinder.pro"),
  alternates: {
    canonical: "https://grantfinder.pro",
  },
  viewport: "width=device-width, initial-scale=1",
  verification: {
    google: "your-google-verification-code",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://grantfinder.pro",
    siteName: "Grant Finder Pro",
    title: "Government Grants for Startups & Businesses | USA & Canada",
    description:
      "Find government grants for startups and small businesses in USA and Canada. Free grant finder tool, application guides, and funding opportunities.",
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
  generator: 'Grant Finder Pro'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
      </head>
      <body className="font-sans">
        {children}
        <CookieConsent />
        <LeadMagnetPopup />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Grant Finder Pro",
              url: "https://grantfinder.pro",
              logo: "https://grantfinder.pro/logo.png",
              description: "Find government grants for startups and small businesses in USA and Canada",
              sameAs: [
                "https://twitter.com/grantfinderpro", 
                "https://linkedin.com/company/grantfinderpro"
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
