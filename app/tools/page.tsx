import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import ToolsClient from "./ToolsClient"

export const metadata: Metadata = {
  title: "Government Funding & R&D Tax Credit Calculators | FSI Digital",
  description: "Calculate your potential SR&ED tax credit refunds, hiring wage subsidy matching values, and co-op internship offsets with our interactive tools.",
  alternates: {
    canonical: "https://www.fsidigital.ca/tools",
  },
  robots: { index: true, follow: true },
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200">Interactive Estimations</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Funding & Tax Credit Calculators
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Estimate your potential grants and tax refunds before applying. Adjust payroll, contractor, and intern values in real-time.
            </p>
          </div>

          {/* Interactive Calculator Tabs Client Component */}
          <ToolsClient />

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 text-center">
            <a href="/calculator" className="inline-flex justify-center items-center px-6 py-3 rounded-full text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
              Not sure which funding fits? Try the free Grant Calculator →
            </a>
            <a href="/products/funding-match-report" className="inline-flex justify-center items-center px-6 py-3 rounded-full text-sm font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors">
              Get your personalized $19 Funding Match Report
            </a>
          </div>

        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SR&ED Tax Credit & Wage Subsidy Estimators",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "CAD"
            }
          })
        }}
      />
      <Footer />
    </div>
  )
}

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${className}`}>
      {children}
    </span>
  )
}
