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
  viewport: "width=device-width, initial-scale=1",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1200907614877581"
          strategy="lazyOnload"
        />
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DZ55NMNLYM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-DZ55NMNLYM');
          `}
        </Script>

      </head>
      <body className="font-sans" suppressHydrationWarning>
        {children}
        <CookieConsent />
        <LeadMagnetPopup />

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
                    "email": "support@fsidigital.ca"
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
