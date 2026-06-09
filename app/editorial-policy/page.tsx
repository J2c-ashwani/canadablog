import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, CheckCircle, RefreshCw, AlertTriangle, Scale } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Editorial Policy & Content Standards | FSI Digital",
  description: "FSI Digital's editorial policy, fact-checking processes, and content guidelines for researching government grants, loans, and tax credits.",
  alternates: {
    canonical: "https://www.fsidigital.ca/editorial-policy",
  },
  robots: { index: true, follow: true },
}

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex p-3 bg-emerald-50 rounded-2xl text-emerald-700 mb-2">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Editorial Policy & Standards
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              How we research, fact-check, and maintain our database of small business government funding and tax credit guidelines.
            </p>
          </div>

          <Card className="border border-slate-200 bg-white shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 sm:p-12 space-y-10">
              
              {/* Objective */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-emerald-600 shrink-0" /> Our Editorial Mission
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base">
                  <p>
                    FSI Digital provides small business owners, startups, and innovation-focused companies with objective, transparent, and up-to-date intelligence regarding government funding, grants, loans, and tax credits across Canada and the United States. 
                  </p>
                  <p>
                    Our platform simplifies complex regulatory and administrative guidelines, giving companies actionable insights into eligibility and compliance. We do not charge fees to access our database and are committed to presenting funding parameters without bias.
                  </p>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Core Pillars */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" /> Core Editorial Principles
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                    <h3 className="font-bold text-slate-900">1. Primary-Source Reliance</h3>
                    <p className="text-sm text-slate-600">
                      Our analysts extract program guidelines directly from legislative texts, departmental notices, and administrative manuals (e.g., CRA, NRC, SBA, and NIH publications).
                    </p>
                  </div>
                  <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                    <h3 className="font-bold text-slate-900">2. Editorial Independence</h3>
                    <p className="text-sm text-slate-600">
                      All research is compiled at arm's length. We do not accept paid placement fees from government agencies or third-party funding brokers to alter program ratings or summaries.
                    </p>
                  </div>
                  <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                    <h3 className="font-bold text-slate-900">3. Active Lifecycle Tracking</h3>
                    <p className="text-sm text-slate-600">
                      Programs are updated through a structured review matrix matching government announcements, ensuring active intake states (Open, Upcoming, Paused, Closed) are accurately maintained.
                    </p>
                  </div>
                  <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                    <h3 className="font-bold text-slate-900">4. Plain-Language Translation</h3>
                    <p className="text-sm text-slate-600">
                      We break down legalistic program guidelines into structured lists: qualifying company sizes, eligible industries, matching ratio requirements, and common compliance pitfalls.
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Editorial Oversight */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <RefreshCw className="w-6 h-6 text-emerald-600 shrink-0" /> Review & Verification Process
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base">
                  <p>
                    All guides, database pages, and comparisons undergo validation before publishing:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Review by Ashwani Kumar:</strong> Our Founder & Managing Director, who serves as the Funding Research Lead, conducts primary review on all program summaries, taxonomy classifications, and guides.
                    </li>
                    <li>
                      <strong>Fact-Checking:</strong> Parameters such as funding caps, employee thresholds, matching ratios, and geography rules are double-checked against official schedules.
                    </li>
                    <li>
                      <strong>Change Logging:</strong> Core program guides incorporate clear change widgets outlining the date and nature of recent updates.
                    </li>
                  </ul>
                  <p className="mt-4">
                    For detailed information about our scoring models, review our {" "}
                    <Link href="/methodology" className="text-emerald-700 font-bold hover:underline">
                      Research Methodology
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Non-Affiliation */}
              <div className="p-6 border border-amber-100 rounded-2xl bg-amber-50/30 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900">Government Non-Affiliation Disclosure</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    FSI Digital is an independent, private information publisher and business intelligence provider. FSI Digital is not affiliated with, authorized by, sponsored by, or in any way officially connected with the government of Canada, the United States government, or any provincial, state, or municipal agency. 
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Official applications for public funding must be submitted directly through the designated portals of the respective government bodies. For a list of official portals, please view our {" "}
                    <Link href="/data-sources" className="text-emerald-700 font-bold hover:underline">
                      Official Data Sources
                    </Link>
                    .
                  </p>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
