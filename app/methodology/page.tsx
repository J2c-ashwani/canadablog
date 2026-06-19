import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Compass, BarChart3, ShieldCheck, Zap, AlertTriangle, Layers, HelpCircle } from "lucide-react"

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
            <CardContent className="p-8 sm:p-12 space-y-12">
              
              {/* Introduction */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-emerald-600 shrink-0" /> Evaluating Funding Moats
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base space-y-4">
                  <p>
                    With thousands of public programs across federal, provincial, and state departments, comparing funding options can be challenging. FSI Digital applies a standard, quantitative evaluation index to every cataloged program to assist companies in prioritizing non-dilutive resources.
                  </p>
                  <p>
                    Our scoring system translates complex bureaucratic guidelines, funding structures, and audit histories into standardized, actionable scores. This allows founders and financial officers to make objective decisions about which programs are worth the time and capital investment.
                  </p>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Matching Engine Algorithm */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-emerald-600 shrink-0" /> The Matching Engine Algorithm
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base space-y-4">
                  <p>
                    Our matching algorithm computes eligibility by comparing a company's profile against the criteria of each cataloged funding program. We process six primary dimensions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Geographic Match:</strong> Focuses on corporate registration and operating province/state.</li>
                    <li><strong>Sector Match:</strong> Evaluates target vertical (e.g., Software, Biotech, Advanced Manufacturing, Agriculture).</li>
                    <li><strong>Growth Stage & Employees:</strong> Analyzes headcounts (FTEs) and corporate age, as many grants target SMEs with specific size ranges (e.g., under 50 FTEs).</li>
                    <li><strong>Financial Baseline:</strong> Checks annual revenues and cash-matching capability to satisfy co-investment requirements.</li>
                    <li><strong>Expense Types:</strong> Identifies if planned spending aligns with program funding rules (e.g., R&D salaries, hiring, equipment acquisition, export marketing).</li>
                  </ul>
                  
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 mt-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">How Match Strength is Categorized</h3>
                    <div className="grid gap-4 sm:grid-cols-3 pt-2">
                      <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 mb-2">
                          Excellent Match (80%+)
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Company fits all criteria. High alignment on expense types and zero disqualifying factors. Recommended for immediate application.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 mb-2">
                          Strong Match (60%–79%)
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Company meets core criteria, but minor alignment gaps exist (e.g., tight timelines, limited regional allocations, or partial expense matching).
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 mb-2">
                          Moderate Match (40%–59%)
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Eligible, but program has historically low approval rates, extreme competition, or high compliance overhead that may dilute overall ROI.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Evaluation Criteria */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-emerald-600 shrink-0" /> Core Rating Dimensions
                </h2>
                <div className="space-y-6">
                  
                  {/* Difficulty Ratings */}
                  <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-4">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-slate-950">1. Application Difficulty Rating</h3>
                      <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">Metric: Estimated Hours</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      We evaluate the operational friction and resources required to prepare, submit, and manage the program throughout its life cycle:
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4 pt-2">
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700">
                          Simple (&lt;10 hours)
                        </span>
                        <p className="font-bold text-slate-900 text-xs">Low Barrier</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Requires basic corporate details, online form submission, and minimal supporting uploads. High approval speed (e.g. CDAP, hiring vouchers).
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700">
                          Moderate (10–40 hours)
                        </span>
                        <p className="font-bold text-slate-900 text-xs">Structured Plan</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Requires a detailed project timeline, budget breakdown, proof of matching co-investment, and historical financial statements (e.g. CanExport).
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700">
                          Complex (40+ hours)
                        </span>
                        <p className="font-bold text-slate-900 text-xs">High Compliance</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Requires academic/commercial peer review, extensive technical proposals, audited statements, and quarterly milestone progress reviews (e.g. IRAP, SIF).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Financial Utility Index */}
                  <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-slate-950">2. Financial Utility Scoring</h3>
                      <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">Formulaic Scoring</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      We assess the quality of the financial benefit. Non-repayable grants receive the highest weight, followed by refundable tax credits, non-refundable credits, and interest-free loans.
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      The Financial Utility Score ({"\\(FUS\\)"}) is modeled using a combination of funding type weights and matching ratios:
                    </p>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 text-center font-mono text-sm my-2">
                      {"\\[FUS = \\text{Funding Amount Score} \\times \\text{Funding Type Weight} \\times \\text{Match Ratio}\\]"}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                      <div className="bg-white p-2 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block">Grants</span>
                        <span className="text-emerald-700 font-semibold">Weight: 1.0</span>
                      </div>
                      <div className="bg-white p-2 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block">Refundable Credits</span>
                        <span className="text-emerald-700 font-semibold">Weight: 0.9</span>
                      </div>
                      <div className="bg-white p-2 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block">Non-Refundable Credits</span>
                        <span className="text-emerald-700 font-semibold">Weight: 0.7</span>
                      </div>
                      <div className="bg-white p-2 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block">Loans & Debt</span>
                        <span className="text-emerald-700 font-semibold">Weight: 0.4</span>
                      </div>
                    </div>
                  </div>

                  {/* Compliance & Audit Pitfalls */}
                  <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-slate-950">3. Compliance & Retrospective Audit Risks</h3>
                      <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">Risk Metric</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      For retroactive incentives (such as Canada's SR&ED), we rate programs based on retrospective claims windows and historical audit frequencies. Programs that require ongoing timesheet tracking and strict scientific proof carry a higher audit risk score. Our checklists provide standard thresholds to ensure claims remain defensible under CRA or departmental audits.
                    </p>
                  </div>

                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Data Verification */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" /> Review Cadence & Editorial Standards
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base space-y-4">
                  <p>
                    Government funding parameters are highly dynamic. We follow strict standards to keep our database fresh:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Weekly Monitoring:</strong> Automated scrapers and analyst alerts flag changes in intake status, deadline schedules, and budget allocations. You can view our latest changes in the <a href="/program-updates" className="text-emerald-700 font-semibold hover:underline">Program Updates Log</a>.
                    </li>
                    <li>
                      <strong>Quarterly Reconciliation:</strong> Active programs are reviewed end-to-end to verify that contact details, funding limits, and application templates match current ministerial guidance.
                    </li>
                    <li>
                      <strong>Primary-Source-Only Policy:</strong> No data point is cataloged from secondary media. We only publish details verified by legislative announcements or direct program guides from administering ministries.
                    </li>
                  </ul>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Limitations & Disclaimers */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" /> Limitations & Disclaimers
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base space-y-4">
                  <p>
                    FSI Digital provides research, matching, and application templates to streamline the funding process. However, users must note the following:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>No Approval Guarantees:</strong> Funding agencies retain absolute discretion. Matching score does not guarantee acceptance.</li>
                    <li><strong>Allocation Caps:</strong> Many public grants operate on first-come, first-served structures. A program may close early if regional funding limits are hit, regardless of eligibility.</li>
                    <li><strong>Not an Agency:</strong> FSI Digital is an independent technology platform and is not affiliated with the Government of Canada, Canada Revenue Agency, or any other department.</li>
                    <li><strong>No Legal or Tax Advice:</strong> All checklists and templates are provided for informational and planning purposes only. Formal tax filings (like SR&ED schedules) should be reviewed with qualified accounting practitioners.</li>
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
