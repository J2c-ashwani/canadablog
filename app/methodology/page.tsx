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

              {/* 1. Opportunity Discovery Framework */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Compass className="w-6 h-6 text-emerald-600 shrink-0" /> Opportunity Discovery Framework
                </h2>
                <div className="prose text-slate-655 leading-relaxed max-w-none text-base space-y-4">
                  <p>
                    Identifying viable public funding is not just about running web searches. FSI Digital utilizes a hybrid discovery framework that combines:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Automated Data Scrapers:</strong> We run daily crawlers across 120+ federal, provincial, and territorial directories (e.g., NRC, BDC, FedDev, provincial finance portals) to flag new program launches, changes in criteria, or window closures.</li>
                    <li><strong>Manual Analyst Curation:</strong> Scraped data is reviewed by our research analysts to verify details such as active budget allocations, intake caps, and actual application instructions before being committed to our database.</li>
                    <li><strong>Primary Source Linkage:</strong> We strictly link every program in our database to its official administrative guidelines, preventing the propagation of outdated third-party descriptions.</li>
                  </ul>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* 2. The Matching Engine & Scoring Metrics */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-emerald-600 shrink-0" /> Matching Engine &amp; Scoring Metrics
                </h2>
                <div className="prose text-slate-655 leading-relaxed max-w-none text-base space-y-4">
                  <p>
                    Our matching engine maps a company's profile across six core dimensions to compute eligibility:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Geographic Match:</strong> Regional alignment (province, territory, or national scope).</li>
                    <li><strong>Sector Match:</strong> Alignment with industry vertical exclusions/priorities (e.g., Software, Clean-tech, Food manufacturing).</li>
                    <li><strong>Growth Stage & Employees:</strong> Verification against headcount (FTE) caps or corporate age requirements (e.g. CDAP requires at least 1 employee, IRAP targets under 500).</li>
                    <li><strong>Financial Baseline:</strong> Checks annual revenues and matching capital capability, ensuring you possess the working capital to fund the 20-50% matching requirements.</li>
                    <li><strong>Expense Alignment:</strong> Evaluates if your planned spends match the program's eligible expenses (e.g. technical wages, export travel, software seats, factory equipment).</li>
                  </ul>
                  
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 mt-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Scoring Strength Categorization</h3>
                    <div className="grid gap-4 sm:grid-cols-3 pt-2">
                      <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 mb-2">
                          High Fit (80%+)
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Company fits all criteria. Clear expense alignment, no disqualifying elements, and active funding allocations.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 mb-2">
                          Strong Fit (60%–79%)
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Meets core criteria, but has minor compliance barriers or requires specific partner certifications.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 mb-2">
                          Moderate Fit (40%–59%)
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Eligible, but program is highly competitive or has complex co-investment rules that impact overall yield.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* 3. Exclusion Criteria */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" /> Database Exclusion Criteria
                </h2>
                <div className="prose text-slate-655 leading-relaxed max-w-none text-base space-y-4">
                  <p>
                    To keep matching results highly actionable, FSI Digital filters out low-value or obsolete funding options. Programs are excluded from database matching if they meet any of the following:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Legacy or Sunset Programs:</strong> Programs with closed intakes and no legislative budget allocation for the current fiscal year are excluded (e.g., sunset COVID-era relief grants).</li>
                    <li><strong>Prohibitive Compliance Overhead:</strong> Programs where the compliance cost (e.g., audit fees, reporting requirements) exceeds 30% of the maximum grant value.</li>
                    <li><strong>High Rejection/Default Rates:</strong> Programs with a history of arbitrary approvals, high default rates, or extreme audit clawback histories.</li>
                    <li><strong>Unviable Stacking Restrictions:</strong> Programs that forbid stacking with major federal programs and offer less than 15% of the value of those programs.</li>
                  </ul>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* 4. Stacking Sequence Priority Logic */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-indigo-600 shrink-0" /> Stacking Sequence Priority Logic
                </h2>
                <div className="prose text-slate-655 leading-relaxed max-w-none text-base space-y-4">
                  <p>
                    Maximizing public funding requires an optimized stacking strategy. You cannot simply apply to every program simultaneously. FSI Digital applies a prioritization sequence to prevent "double dipping" rejections and maximize cash flow:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2.5">
                    <li>
                      <strong>Priority 1: Wage Grants &amp; Subsidies (e.g., IRAP, CSJ, Co-op Vouchers)</strong>
                      <p className="text-xs text-slate-500 mt-0.5">Wage subsidies must be secured before work begins. They provide front-loaded cash flow to offset developers' or interns' salaries (covering up to 50-80% of wages).</p>
                    </li>
                    <li>
                      <strong>Priority 2: Retroactive Tax Credits (e.g., SR&ED)</strong>
                      <p className="text-xs text-slate-500 mt-0.5">At the end of your fiscal year, you claim tax credits on the remaining out-of-pocket development expenses. The matching engine automatically calculates the government &ldquo;grind&rdquo; (deducting Priority 1 subsidies from the R&D pool) so you claim only eligible net expenses, keeping claims fully compliant.</p>
                    </li>
                    <li>
                      <strong>Priority 3: Market Expansion &amp; Export Grants (e.g., CanExport)</strong>
                      <p className="text-xs text-slate-500 mt-0.5">Once product development is subsidized, we apply marketing/export grants to co-fund foreign market entry (covering 50% of travel, translations, and advertising costs).</p>
                    </li>
                    <li>
                      <strong>Priority 4: Government-Backed Debt &amp; Loans (e.g., CSBFP, BDC)</strong>
                      <p className="text-xs text-slate-500 mt-0.5">Low-interest or guaranteed debt is structured last to finance capital purchases (equipment, property, facility expansions) that are not covered by Priority 1 or 2 grants.</p>
                    </li>
                  </ol>
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
