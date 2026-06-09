import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Compass, BarChart3, ShieldCheck, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Funding Research Methodology | FSI Digital",
  description: "The evaluation framework and rating methodology used by FSI Digital to grade government grants, SR&ED eligibility, and application difficulty.",
  alternates: {
    canonical: "https://www.fsidigital.ca/methodology",
  },
  robots: { index: true, follow: true },
}

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex p-3 bg-emerald-50 rounded-2xl text-emerald-700 mb-2">
              <Compass className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Research & Evaluation Methodology
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              How we calculate program complexity, eligibility matching, and benefit ratings for public funding programs.
            </p>
          </div>

          <Card className="border border-slate-200 bg-white shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 sm:p-12 space-y-10">
              
              {/* Introduction */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-emerald-600 shrink-0" /> Evaluating Funding Moats
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base">
                  <p>
                    With thousands of public programs across federal, provincial, and state departments, comparing funding options can be challenging. FSI Digital applies a standard, quantitative evaluation index to every cataloged program to assist companies in prioritizing non-dilutive resources.
                  </p>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Evaluation Criteria */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-emerald-600 shrink-0" /> Core Rating Dimensions
                </h2>
                <div className="space-y-4">
                  
                  {/* Difficulty Ratings */}
                  <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-4">
                    <h3 className="text-lg font-bold text-slate-950">1. Application Difficulty Rating</h3>
                    <p className="text-sm text-slate-600">
                      We assign each program a difficulty category to indicate the operational resources required to apply and report back:
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4 pt-2">
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700">
                          Simple
                        </span>
                        <p className="font-bold text-slate-900 text-xs">Low Barrier</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Requires basic corporate data, online form-filling, and minimal supporting documentation. Typical review period &lt; 30 days (e.g. CDAP, standard hiring vouchers).
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700">
                          Moderate
                        </span>
                        <p className="font-bold text-slate-900 text-xs">Structured Plan</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Requires a detailed project outline, budget details, matching cash verification, and historical financial logs. Typical review: 30–90 days (e.g. CanExport, basic provincial grants).
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700">
                          Complex
                        </span>
                        <p className="font-bold text-slate-900 text-xs">High Compliance</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Requires deep technical proposals, academic/commercial review, audited financial declarations, and rigorous post-grant tracking. Typical review: 90+ days (e.g. IRAP, SIF, NIH).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Financial Utility Index */}
                  <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                    <h3 className="text-lg font-bold text-slate-950">2. Financial Utility Scoring</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      We assess the quality of the financial benefit. Non-repayable grants receive the highest scoring, followed by tax credits (cash refunds or offsets), and lastly low-interest loans. We also evaluate the match ratio (e.g., 50% vs 80% funding matching) to help founders calculate cash flow leverage.
                    </p>
                  </div>

                  {/* Compliance & Audit Pitfalls */}
                  <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                    <h3 className="text-lg font-bold text-slate-950">3. Compliance & Retrospective Risks</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      For tax credits (such as Canada's SR&ED), we rate programs based on retroactivity rules and audit rates. Our guides highlight standard eligibility parameters (e.g., qualifying technical advances and technological uncertainties) to help companies evaluate compliance before filing.
                    </p>
                  </div>

                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Data Verification */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" /> Review Cadence & Data Auditing
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base">
                  <p>
                    Government funding parameters are not static. Program parameters are audited and updated as follows:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Weekly Monitoring:</strong> Automated scrapers and analyst alerts flag changes in intake status, deadline schedules, and budget allocations.
                    </li>
                    <li>
                      <strong>Quarterly Reconciliation:</strong> Active programs are reviewed end-to-end to verify that contact details, funding limits, and application templates match current ministerial guidance.
                    </li>
                    <li>
                      <strong>Direct Feedback Loops:</strong> We analyze user inquiries and feedback to identify sections where eligibility rules or application interfaces have changed in practice.
                    </li>
                  </ul>
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
