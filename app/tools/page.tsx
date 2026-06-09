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

        </div>
      </main>

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
