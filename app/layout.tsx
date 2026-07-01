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
        {/* Google Analytics GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `}
        </Script>

        {/* Microsoft Clarity */}
        {CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              if (typeof window !== 'undefined' && (window.location.hostname === 'www.fsidigital.ca' || window.location.hostname === 'fsidigital.ca')) {
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window,document,"clarity","script","${CLARITY_ID}");
              }
            `}
          </Script>
        )}

        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {/* Google Ads Remarketing Tag */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-remarketing" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
              `}
            </Script>
          </>
        )}

        {/* LinkedIn Insight Tag */}
        {process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_ID && (
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_ID}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `}
          </Script>
        )}
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
