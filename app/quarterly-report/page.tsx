import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileDown, Calendar, TrendingUp, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import EEATBadge from "@/components/blog/EEATBadge"

export const metadata: Metadata = {
  title: "Q2 2026 Small Business Funding Opportunities Report | FSI Digital",
  description: "Comprehensive research report analyzing government spending allocations, R&D tax credit audit trends, and active grant program lifecycles across North America.",
  alternates: {
    canonical: "https://www.fsidigital.ca/quarterly-report",
  },
  robots: { index: true, follow: true },
}

export default function QuarterlyReportPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200">Research & Intelligence</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Q2 2026 Small Business Funding Report
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              An analytical breakdown of public sector capital allocations, R&D tax credit audits, and lifecycle intake trends in Canada and the United States.
            </p>
          </div>

          {/* E-E-A-T Review Badge */}
          <div className="flex justify-center mb-10">
            <EEATBadge authorName="Ashwani Kumar" authorImage="/author-ashwani.jpg" date="2026-06-09" />
          </div>

          <div className="space-y-8">
            {/* PR Hero Download Card */}
            <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30 rounded-3xl overflow-hidden shadow-md p-8 sm:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-4 max-w-xl">
                <Badge className="bg-emerald-600 text-white font-bold uppercase tracking-wider text-[9px] border-none">
                  PDF Research Report
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
                  Download the Full Q2 2026 Data Set
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Includes complete spreadsheet indices of 500+ regional programs, average audit durations, and program success matrices.
                </p>
              </div>
              <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md shrink-0 py-6 rounded-xl flex items-center gap-2 self-start md:self-center">
                <Link href="/get-started?report=q2-2026" className="flex items-center gap-2">
                  <FileDown className="w-5 h-5" /> Download PDF Report
                </Link>
              </Button>
            </Card>

            {/* Report Content */}
            <Card className="border border-slate-200 bg-white p-8 sm:p-12 rounded-3xl space-y-10">
              
              {/* Executive Summary */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-emerald-600" /> 1. Executive Summary
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base">
                  <p>
                    The second quarter of 2026 has introduced noticeable shifts in non-dilutive capital availability. As governments adjust fiscal policies, direct grant programs are transitioning from wide-open intakes to highly targeted sectoral pipelines. 
                  </p>
                  <p>
                    Meanwhile, tax credit programs (such as the Canada Revenue Agency's SR&ED) remain stable but are experiencing heightened documentation audit rates to prevent baseline compliance errors.
                  </p>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Key Highlights */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" /> 2. Core Sector Highlights
                </h2>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                    <h3 className="font-bold text-slate-900">Advanced Manufacturing</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Provincial training streams (like Ontario's Skills Development Fund Round 5) have received refreshed funding allotments to subsidize manufacturing robotics training.
                    </p>
                  </div>
                  <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                    <h3 className="font-bold text-slate-900">Biotech & Life Sciences</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      U.S. NIH SBIR Phase I parameters adjusted to cover up to $275,000 for biomedical research projects, while scientific commercialization potential remains the primary grading factor.
                    </p>
                  </div>
                  <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                    <h3 className="font-bold text-slate-900">Digital Adoption Changes</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      With federal CDAP advisory programs pausing direct intakes, regional enterprise networks are taking over digital voucher offerings on municipal scales.
                    </p>
                  </div>
                  <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                    <h3 className="font-bold text-slate-900">Clean Tech Incentives</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      USDA REAP cost-shares remain at up to 50% for rural solar and energy efficiency projects, supported by $145 million in new regional capital reallocations.
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Data Transparency */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-emerald-600" /> 3. Data Auditing & Scope
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-xs sm:text-sm">
                  <p>
                    Data compiled in this report was sourced from active listings in the FSI Digital Funding Database. A total of 30 pillar programs, 80 programmatic subpaths, and 2,612 regional cities were monitored to track intake timelines, average review periods, and matching thresholds.
                  </p>
                  <p>
                    For detailed references to primary legislative resources and agency portals, consult our official {" "}
                    <Link href="/data-sources" className="text-emerald-700 font-bold hover:underline">
                      Government Data Sources Hub
                    </Link>
                    .
                  </p>
                </div>
              </div>

            </Card>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
