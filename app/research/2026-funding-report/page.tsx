import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, BookOpen, Calendar, Clock, User, Shield, 
  Award, CheckCircle, FileText, Download, Target, 
  BarChart, PieChart, TrendingUp, AlertTriangle, Info, History
} from 'lucide-react';

export const metadata: Metadata = {
  title: "FSI Digital Funding Intelligence Report: Canadian Government Funding Outlook 2026",
  description: "Read FSI Digital's Q2 2026 Canadian Government Funding Outlook. Analysis of an estimated $6.2B in public allocations, provincial distribution ratios, and 2027 program forecasts.",
  keywords: "Canadian government funding report 2026, grant distribution trends, provincial funding allocations Canada, average grant sizes Canada, new grants Canada 2026",
  openGraph: {
    title: "FSI Digital Funding Intelligence Report: Canadian Government Funding Outlook 2026",
    description: "Read FSI Digital's Q2 2026 Canadian Government Funding Outlook. Analysis of an estimated $6.2B in public allocations, provincial distribution ratios, and 2027 program forecasts.",
    images: [{ url: "/images/blog/tech-innovation-theme.png", width: 1200, height: 630, alt: "Funding Intelligence Report" }],
    type: "article"
  }
};

export default function ResearchReportPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      
      <main className="py-12 bg-slate-50/50 dark:bg-neutral-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Funding Hub
              </Link>
            </Button>
          </div>

          {/* Hero Header Section */}
          <div className="bg-slate-900 dark:bg-neutral-950 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
              <FileText className="w-48 h-48" />
            </div>
            
            <div className="max-w-4xl relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-indigo-650 hover:bg-indigo-700 text-white border-none text-xs font-semibold px-3 py-1">
                  💡 FSI Funding Intelligence
                </Badge>
                <Badge variant="outline" className="border-slate-700 text-slate-300 text-xs">
                  Published: June 2026
                </Badge>
                <Badge variant="outline" className="border-slate-700 text-slate-300 text-xs">
                  FSI Digital Research Estimates
                </Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                FSI Digital Funding Intelligence Report: Canadian Government Funding Outlook & Allocations 2026
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                A data-driven review mapping an estimated $6.2 Billion in federal and provincial corporate allocations, provincial distribution ratios, average program award metrics, and the 2027 program forecast.
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Research Lead: <strong>Ashwani K.</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>15 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300">Methodology & Source Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Layout: TOC / Meta on left, Main content on right */}
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* PDF Lead Magnet */}
                <div className="bg-indigo-900 text-white rounded-xl p-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Download className="w-5 h-5 text-indigo-300" />
                    <h4 className="font-bold text-sm">Download Report PDF</h4>
                  </div>
                  <p className="text-xs text-indigo-200 mb-4 leading-relaxed">
                    Get the complete 38-page report, including raw dataset appendices and provincial contact lists.
                  </p>
                  <Button className="w-full bg-white text-indigo-900 hover:bg-slate-100 font-bold text-xs" asChild>
                    <Link href="/download/ontario-business-grants-kit">
                      Download Full PDF (Free)
                    </Link>
                  </Button>
                </div>

                {/* Navigation / Jump Links */}
                <div className="bg-white dark:bg-neutral-950 rounded-xl p-5 border border-slate-200 dark:border-neutral-800 shadow-sm">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3 border-b pb-2">
                    Report Structure
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <li><a href="#about-report" className="hover:text-indigo-600 block py-1">1. About this Report</a></li>
                    <li><a href="#key-findings" className="hover:text-indigo-600 block py-1">2. Key Findings Summary</a></li>
                    <li><a href="#methodology" className="hover:text-indigo-600 block py-1">3. Research Methodology</a></li>
                    <li><a href="#provincial" className="hover:text-indigo-600 block py-1">4. Provincial Share Analysis</a></li>
                    <li><a href="#industry" className="hover:text-indigo-600 block py-1">5. Top Funded Industries</a></li>
                    <li><a href="#averages" className="hover:text-indigo-600 block py-1">6. Program Award Sizes</a></li>
                    <li><a href="#gainers-losers" className="hover:text-indigo-600 block py-1">7. Sector Updates</a></li>
                    <li><a href="#forecast" className="hover:text-indigo-600 block py-1">8. 2027 Outlook & Forecast</a></li>
                    <li><a href="#version-history" className="hover:text-indigo-600 block py-1">9. Version History</a></li>
                  </ul>
                </div>

                {/* Live Database CTA */}
                <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm text-center">
                  <h4 className="font-bold text-sm mb-2">Identify Your Matches</h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Instantly screen all 250+ active grants in our database against your business profile.
                  </p>
                  <Button variant="outline" className="w-full text-white border-slate-700 hover:bg-slate-800 text-xs font-bold" asChild>
                    <Link href="/calculator">
                      Launch Matching Calculator
                    </Link>
                  </Button>
                </div>

              </div>
            </div>

            {/* Right Main Content */}
            <div className="lg:col-span-3 bg-white dark:bg-neutral-950 rounded-2xl shadow-sm border border-slate-200 dark:border-neutral-800 p-6 md:p-8 space-y-10">
              
              {/* Section 1: About this Report */}
              <section id="about-report" className="scroll-mt-6">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-indigo-700" />
                  1. About this Report
                </h2>
                <div className="grid md:grid-cols-2 gap-6 bg-slate-50 dark:bg-neutral-900/50 p-6 rounded-xl border border-slate-200 dark:border-neutral-850">
                  <div className="space-y-2 text-xs text-slate-700 dark:text-slate-350">
                    <div><strong>Publication Date:</strong> June 28, 2026</div>
                    <div><strong>Update Cadence:</strong> Monthly Review</div>
                    <div><strong>Next Planned Update:</strong> July 28, 2026</div>
                    <div><strong>Research Scope:</strong> 250+ Federal & Provincial Programs</div>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700 dark:text-slate-350">
                    <div><strong>Version:</strong> 1.0 (Initial Release)</div>
                    <div><strong>Coverage Period:</strong> FY 2025 - Q2 2026</div>
                    <div><strong>Research Team:</strong> FSI Funding Intelligence Committee</div>
                    <div><strong>Database Status:</strong> Verified Active</div>
                  </div>
                </div>
              </section>

              {/* Section 2: Key Findings */}
              <section id="key-findings" className="scroll-mt-6">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-indigo-700" />
                  2. Executive Summary & Key Findings
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  Canadian small businesses navigated a rapidly shifting public capital landscape in the past fiscal cycle. As governments re-aligned budgets post-pandemic, capital allocations consolidated around climate transition and advanced manufacturing, while general digital adoption grants were phased out.
                </p>
                <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-6">
                  <h4 className="font-bold text-indigo-950 text-sm mb-3">Key Report Indicators:</h4>
                  <ul className="space-y-3.5 text-xs text-indigo-950">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-indigo-700 flex-shrink-0 mt-0.5" />
                      <span><strong>Total Estimated Allocations:</strong> FSI Digital tracked approximately <strong>$6.2 Billion</strong> in active federal and provincial funding streams.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-indigo-700 flex-shrink-0 mt-0.5" />
                      <span><strong>Ontario & Quebec Dominance:</strong> Together, these two central provinces represented an estimated <strong>63%</strong> of total tracked program access points.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-indigo-700 flex-shrink-0 mt-0.5" />
                      <span><strong>Clean Technology Surge:</strong> Clean Tech and Green Infrastructure captured an estimated <strong>$1.5 Billion</strong>, making it the fastest-growing category.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-indigo-700 flex-shrink-0 mt-0.5" />
                      <span><strong>Digital Adoption Sunset:</strong> CDAP digital planning grants closed, shifting digitizing support entirely to 0% BDC loan mechanisms.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3: Methodology */}
              <section id="methodology" className="scroll-mt-6 border-t pt-8">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-indigo-700" />
                  3. Research & Estimates Methodology
                </h2>
                <div className="border border-slate-200 bg-slate-50/50 rounded-xl p-5 text-slate-700 dark:text-slate-300 text-xs space-y-3.5 leading-relaxed">
                  <p>
                    <strong>Data Scope & Collection:</strong> The FSI Digital Research Team analyzed 252 active government business programs. Data points were collected from official public registries (including buyandsell.gc.ca), regional development agency budgets, provincial ministry financial plans, and CRA/NRC annual reports.
                  </p>
                  <p>
                    <strong>Estimates and Modeling:</strong> Because exact annual grant payout values are not reported concurrently by every provincial agency, financial allocations in this report represent FSI Digital modeling estimates. We combine published program budgets with historic award distributions and average participant thresholds.
                  </p>
                  <p>
                    <strong>Credibility Disclaimer:</strong> This intelligence document is intended for general planning and research purposes. Actual individual program availability, approval rates, and payout timelines vary based on business profile, intake windows, and audit verification. FSI Digital is not affiliated with any government agency.
                  </p>
                  <div className="text-center pt-2">
                    <Link href="/methodology" className="text-xs font-bold text-indigo-700 hover:underline">
                      Read Our Complete Editorial & Research Methodology Page →
                    </Link>
                  </div>
                </div>
              </section>

              {/* Section 4: Provincial Share */}
              <section id="provincial" className="scroll-mt-6 border-t pt-8">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart className="w-6 h-6 text-indigo-700" />
                  4. Estimated Share of Tracked Funding Opportunities
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  Central Canada dominates the funding pool, driven by dense industrial hubs and larger provincial budgets. Below is the modeled provincial distribution of public incentive allocations:
                </p>

                {/* SVG Visual Chart - Provinces */}
                <div className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-250">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-4">Estimated Share of Tracked Funding Opportunities (%)</h4>
                  <div className="w-full overflow-hidden">
                    <svg viewBox="0 0 500 240" className="w-full h-auto text-slate-800 dark:text-slate-200">
                      {/* Grid lines */}
                      <line x1="120" y1="20" x2="480" y2="20" stroke="#e2e8f0" strokeDasharray="3" />
                      <line x1="120" y1="60" x2="480" y2="60" stroke="#e2e8f0" strokeDasharray="3" />
                      <line x1="120" y1="100" x2="480" y2="100" stroke="#e2e8f0" strokeDasharray="3" />
                      <line x1="120" y1="140" x2="480" y2="140" stroke="#e2e8f0" strokeDasharray="3" />
                      <line x1="120" y1="180" x2="480" y2="180" stroke="#e2e8f0" strokeDasharray="3" />
                      
                      {/* Bars & Labels */}
                      {/* Ontario */}
                      <text x="10" y="34" className="text-xs font-bold fill-slate-700">Ontario (34%)</text>
                      <rect x="120" y="20" width="122.4" height="20" rx="3" className="fill-indigo-650" />
                      <text x="250" y="34" className="text-xxs font-semibold fill-indigo-900">$2.11B</text>

                      {/* Quebec */}
                      <text x="10" y="74" className="text-xs font-bold fill-slate-700">Quebec (29%)</text>
                      <rect x="120" y="60" width="104.4" height="20" rx="3" className="fill-indigo-600" />
                      <text x="232" y="74" className="text-xxs font-semibold fill-indigo-900">$1.80B</text>

                      {/* BC */}
                      <text x="10" y="114" className="text-xs font-bold fill-slate-700">BC (14%)</text>
                      <rect x="120" y="100" width="50.4" height="20" rx="3" className="fill-indigo-500" />
                      <text x="178" y="114" className="text-xxs font-semibold fill-indigo-900">$0.87B</text>

                      {/* Alberta */}
                      <text x="10" y="154" className="text-xs font-bold fill-slate-700">Alberta (13%)</text>
                      <rect x="120" y="140" width="46.8" height="20" rx="3" className="fill-indigo-400" />
                      <text x="174" y="154" className="text-xxs font-semibold fill-indigo-900">$0.81B</text>

                      {/* Atlantic & Terr */}
                      <text x="10" y="194" className="text-xs font-bold fill-slate-700">Atlantic (10%)</text>
                      <rect x="120" y="180" width="36.0" height="20" rx="3" className="fill-indigo-300" />
                      <text x="162" y="194" className="text-xxs font-semibold fill-indigo-900">$0.61B</text>
                      
                      {/* X-axis */}
                      <line x1="120" y1="210" x2="480" y2="210" stroke="#94a3b8" />
                      <text x="120" y="225" className="text-xxs fill-slate-500">0%</text>
                      <text x="210" y="225" className="text-xxs fill-slate-500">10%</text>
                      <text x="300" y="225" className="text-xxs fill-slate-500">20%</text>
                      <text x="390" y="225" className="text-xxs fill-slate-500">30%</text>
                      <text x="470" y="225" className="text-xxs fill-slate-500">40%</text>
                    </svg>
                  </div>
                </div>
              </section>

              {/* Section 5: Industry Share */}
              <section id="industry" className="scroll-mt-6 border-t pt-8">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                  <PieChart className="w-6 h-6 text-indigo-700" />
                  5. Top Funded Industries & Sectors
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  Allocations represent a strategic emphasis on green technology transitions and retaining high-value manufacturing roles:
                </p>

                {/* SVG Visual Chart - Industries */}
                <div className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-250">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-4">Industry Share Breakdown (%)</h4>
                  <div className="w-full overflow-hidden">
                    <svg viewBox="0 0 500 240" className="w-full h-auto text-slate-800 dark:text-slate-200">
                      {/* Grid lines */}
                      <line x1="140" y1="20" x2="480" y2="20" stroke="#e2e8f0" strokeDasharray="3" />
                      <line x1="140" y1="60" x2="480" y2="60" stroke="#e2e8f0" strokeDasharray="3" />
                      <line x1="140" y1="100" x2="480" y2="100" stroke="#e2e8f0" strokeDasharray="3" />
                      <line x1="140" y1="140" x2="480" y2="140" stroke="#e2e8f0" strokeDasharray="3" />
                      <line x1="140" y1="180" x2="480" y2="180" stroke="#e2e8f0" strokeDasharray="3" />

                      {/* Clean Tech */}
                      <text x="10" y="34" className="text-xs font-bold fill-slate-700">Clean Tech (24%)</text>
                      <rect x="140" y="20" width="81.6" height="20" rx="3" className="fill-emerald-600" />
                      <text x="230" y="34" className="text-xxs font-semibold fill-emerald-950">$1.50B</text>

                      {/* Tech & SaaS */}
                      <text x="10" y="74" className="text-xs font-bold fill-slate-700">Tech & Software (23%)</text>
                      <rect x="140" y="60" width="78.2" height="20" rx="3" className="fill-blue-600" />
                      <text x="226" y="74" className="text-xxs font-semibold fill-blue-950">$1.40B</text>

                      {/* Manufacturing */}
                      <text x="10" y="114" className="text-xs font-bold fill-slate-700">Manufacturing (19%)</text>
                      <rect x="140" y="100" width="64.6" height="20" rx="3" className="fill-indigo-650" />
                      <text x="212" y="114" className="text-xxs font-semibold fill-indigo-950">$1.20B</text>

                      {/* Agriculture */}
                      <text x="10" y="154" className="text-xs font-bold fill-slate-700">Agriculture (15%)</text>
                      <rect x="140" y="140" width="51.0" height="20" rx="3" className="fill-amber-600" />
                      <text x="198" y="154" className="text-xxs font-semibold fill-amber-950">$0.90B</text>

                      {/* Life Sciences */}
                      <text x="10" y="194" className="text-xs font-bold fill-slate-700">Life Sciences (11%)</text>
                      <rect x="140" y="180" width="37.4" height="20" rx="3" className="fill-pink-600" />
                      <text x="184" y="194" className="text-xxs font-semibold fill-pink-950">$0.70B</text>

                      {/* X-axis */}
                      <line x1="140" y1="210" x2="480" y2="210" stroke="#94a3b8" />
                      <text x="140" y="225" className="text-xxs fill-slate-500">0%</text>
                      <text x="225" y="225" className="text-xxs fill-slate-500">10%</text>
                      <text x="310" y="225" className="text-xxs fill-slate-500">20%</text>
                      <text x="395" y="225" className="text-xxs fill-slate-500">30%</text>
                      <text x="470" y="225" className="text-xxs fill-slate-500">40%</text>
                    </svg>
                  </div>
                </div>
              </section>

              {/* Section 6: Averages */}
              <section id="averages" className="scroll-mt-6 border-t pt-8">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-indigo-700" />
                  6. Average Payout Sizes (SME Class)
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                  For businesses designing matching strategy pathways, we compiled typical award distributions for small businesses under 100 staff:
                </p>
                
                <table className="min-w-full border-collapse border border-slate-200 my-4 text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-200 p-2 text-left font-bold">Program</th>
                      <th className="border border-slate-200 p-2 text-left font-bold">Type</th>
                      <th className="border border-slate-200 p-2 text-left font-bold">Average SME Award</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 p-2 font-semibold">
                        <Link href="/topics/sred-tax-credit-eligibility" className="text-indigo-650 hover:underline">
                          CRA SR&ED Tax Claim
                        </Link>
                      </td>
                      <td className="border border-slate-200 p-2">Refundable Tax Credit</td>
                      <td className="border border-slate-200 p-2 font-bold text-green-700">$185,000 / year</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 p-2 font-semibold">
                        <Link href="/topics/irap-funding-eligibility" className="text-indigo-650 hover:underline">
                          NRC IRAP Grant
                        </Link>
                      </td>
                      <td className="border border-slate-200 p-2">Discretionary Wage Subsidy</td>
                      <td className="border border-slate-200 p-2 font-bold text-green-700">$120,000 / project</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 p-2 font-semibold">
                        <Link href="/topics/csbfp-loans-canada" className="text-indigo-650 hover:underline">
                          CSBFP Loan
                        </Link>
                      </td>
                      <td className="border border-slate-200 p-2">Government-Guaranteed Loan</td>
                      <td className="border border-slate-200 p-2 font-bold text-green-700">$240,000 / loan</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 p-2 font-semibold">
                        <Link href="/programs/canexport" className="text-indigo-650 hover:underline">
                          CanExport SMEs
                        </Link>
                      </td>
                      <td className="border border-slate-200 p-2">Non-Repayable Grant</td>
                      <td className="border border-slate-200 p-2 font-bold text-green-700">$35,000 / project</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* Section 7: Gainers and Losers */}
              <section id="gainers-losers" className="scroll-mt-6 border-t pt-8">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-indigo-700" />
                  7. Sector Shifts: Gainers vs. Losers
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 bg-green-50/50 border border-green-200 rounded-xl">
                    <h3 className="font-bold text-sm text-green-950 mb-2 flex items-center gap-1.5">
                      📈 Funding Gainers
                    </h3>
                    <ul className="space-y-2 text-xs text-green-900">
                      <li>• <strong>Advanced Manufacturing:</strong> Retooling and CNC machine automation grants expanded to counter supply chain deficits.</li>
                      <li>• <strong>Agricultural Clean Tech:</strong> Funding for farm electrification and soil monitoring increased by an estimated $120M.</li>
                      <li>• <strong>Wage Subsidies for Tech:</strong> Mitacs Accelerate and co-op matching pools saw expanded intake budgets.</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-red-50/50 border border-red-200 rounded-xl">
                    <h3 className="font-bold text-sm text-red-950 mb-2 flex items-center gap-1.5">
                      📉 Funding Losers
                    </h3>
                    <ul className="space-y-2 text-xs text-red-900">
                      <li>• <strong>General Digital Adoption:</strong> The <Link href="/topics/canada-digital-adoption-program-grant" className="underline hover:text-red-700">CDAP</Link> $15,000 roadmap grants ended, reducing raw grant options for basic SaaS purchases.</li>
                      <li>• <strong>COVID-era Business Support:</strong> Legacy post-pandemic cash-flow recovery models have completely sunsetted.</li>
                      <li>• <strong>Real Estate & Property Development:</strong> Direct grants contracted, replaced strictly by housing construction loans.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 8: Forecast */}
              <section id="forecast" className="scroll-mt-6 border-t pt-8">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-indigo-700" />
                  8. What We Expect in 2027
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  Based on recent ministerial mandate letters and upcoming provincial budget proposals, our research leads predict the following shifts:
                </p>
                <ul className="space-y-4 text-xs text-slate-700 dark:text-slate-350">
                  <li className="flex gap-2">
                    <span className="font-bold text-indigo-700">A. AI & Automation Specialization:</span>
                    <span>General software grants are shrinking, but programs targeting commercialization of machine learning and domestic AI models will see budget boosts.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-indigo-700">B. Shift Toward Repayable Models:</span>
                    <span>Governments are prioritizing interest-free and low-interest loans (<Link href="/topics/bdc-small-business-loans" className="text-indigo-650 hover:underline">BDC</Link>, CSBFP) over non-repayable grants to make public capital self-sustaining.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-indigo-700">C. Stricter Documentation Audits:</span>
                    <span>Both CRA (for SR&ED) and NRC (for IRAP) have increased verification scrutiny. Keeping contemporaneous project documentation is non-negotiable.</span>
                  </li>
                </ul>
              </section>

              {/* Section 9: Version History */}
              <section id="version-history" className="scroll-mt-6 border-t pt-8">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                  <History className="w-6 h-6 text-indigo-700" />
                  9. Report Version History
                </h2>
                <div className="space-y-4 text-xs text-slate-700 dark:text-slate-350">
                  <div className="p-4 bg-slate-50 dark:bg-neutral-900/50 rounded-lg border border-slate-200">
                    <div className="flex justify-between font-bold text-slate-900 dark:text-white mb-2">
                      <span>Version 1.0 (Initial Release)</span>
                      <span>June 28, 2026</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Launched the Canadian Government Funding Outlook & Allocations Report.</li>
                      <li>Published initial provincial share models and industry sector breakdowns.</li>
                      <li>Completed baseline averages analysis for SME program payouts.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Bottom CTA Block */}
              <div className="border-t pt-8 mt-10 text-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Find the Programs That Match Your SME Today
                </h3>
                <p className="text-xs text-slate-500 mb-4 max-w-lg mx-auto">
                  Cross-reference these national trends with your specific industry, province, and project expenses to see what you qualify for.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-indigo-750 hover:bg-indigo-850 text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-md" asChild>
                    <Link href="/calculator">
                      Run Funding Calculator
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold px-6 py-2.5 rounded-lg" asChild>
                    <Link href="/grants">
                      Search Grants Database
                    </Link>
                  </Button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
