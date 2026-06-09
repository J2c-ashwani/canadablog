import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import PortfolioClient from "./PortfolioClient"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Interactive Funding Portfolio Builder | FSI Digital",
  description: "Evaluate your business funding readiness, stack active federal and regional programs, and compile your custom pre-qualification report.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.fsidigital.ca/portfolio",
  },
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <PortfolioClient />
      </main>
      <Footer />
    </div>
  )
}
