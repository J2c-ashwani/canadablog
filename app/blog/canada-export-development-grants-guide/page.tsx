import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Globe, Plane, Building, Users, TrendingUp, FileText, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Export Development Grants 2026 | CanExport SMEs $50K & EDC Funding Guide",
  description: "Complete 2026 guide to Canada export grants. New CanExport SMEs rules (Deadline May 29), EDC Trade Impact $5B capacity, and Creative Export Canada $2.5M funding.",
  keywords: "CanExport SMEs 2026, Canada export grants, EDC Trade Impact Program, Creative Export Canada, international business development funding, export market access, trade mission grants Canada",
}

export default function CanadaExportDevelopmentGrantsGuide() {
  const faqData = [
    {
      question: "What is the deadline for CanExport SMEs 2026?",
      answer: "The application period for CanExport SMEs 2026-2027 runs from February 4, 2026, to May 29, 2026 (12:00 PM ET). Funding is awarded on a first-come, first-served competitive basis, so applying early is critical."
    },
    {
      question: "Did CanExport eligibility rules change in 2026?",
      answer: "Yes, significantly. You now need a minimum of 3 full-time employees (up from 1) and between $300,000 and $100M in annual revenue (up from $100k). Agriculture and agri-food sectors are no longer eligible (unless they are ag-tech)."
    },
    {
      question: "What does the EDC Trade Impact Program cover?",
      answer: "EDC's program doesn't typically give 'free money' grants but provides working capital guarantees, trade credit insurance (protecting against non-payment), and foreign exchange risk mitigation to helping you fulfill large international contracts."
    },
    {
      question: "Can I use CanExport funding for travel to the US?",
      answer: "Yes, but with strict conditions. The US is now treated as a single target market. You cannot apply for multiple US states as separate markets. You must demonstrate that the US is a 'new' market for your business (less than 10% of total sales or less than $100k in sales)."
    },
    {
      question: "Is there funding for creative industries exporting content?",
      answer: "Yes, Creative Export Canada offers an 'Export-Ready Stream' with up to $2.5 million in funding for projects generating export revenues. There is also an Export Development Stream for earlier-stage companies."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-100 border-emerald-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🌍 2026 Export Funding Update
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Canada Export Development Grants 2026: <span className="text-emerald-400">CanExport SMEs $50K</span>, Creative Export & EDC Financing
              </h1>
              <p className="text-xl text-emerald-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                The complete guide to securing international market expansion funding. Updated with <span className="font-semibold text-white">new 2026 CanExport eligibility rules</span> (3+ Employees, $300k+ Revenue), deadlines, and expert application strategies for Canadian businesses going global.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#canexport-deep-dive">
                    See CanExport 2026 Requirements
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-emerald-400/50 text-white hover:bg-emerald-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="/contact?service=export-strategy">
                    Get Application Help
                  </Link>
                </Button>
              </div>
              <p className="text-emerald-200/80 text-sm mt-6 font-medium">
                Next Deadline: May 29, 2026 (CanExport SMEs) • $680M+ Available Funding
              </p>
            </div>
          </div>
        </section>

        {/* Critical Updates Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <AlertTriangle className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">Major Changes to CanExport SMEs for 2026-2027</h3>
                    <p className="text-red-700 mb-4">
                      The government has significantly tightened eligibility for the 2026 fiscal year. Unlike previous years where 1 FTE and $100k revenue was sufficient, you now strictly need:
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm font-semibold text-red-900">
                      <div className="bg-white/50 p-3 rounded border border-red-200">
                        📉 Min Revenue: $300,000 (Last Tax Year)
                      </div>
                      <div className="bg-white/50 p-3 rounded border border-red-200">
                        👥 Min Staff: 3 Full-Time Employees
                      </div>
                      <div className="bg-white/50 p-3 rounded border border-red-200">
                        ❌ No Agri-Food (Consult Ag-Canada instead)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Program Deep Dive */}
        <section id="canexport-deep-dive" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Flagship Export Grant Programs Analyzed</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Canada's export funding landscape is vast. We've broken down the "Big 3" programs that provide the most substantial funding for SMEs, Creative Industries, and Innovation partners.
                </p>
              </div>

              {/* Program 1: CanExport SMEs */}
              <div className="mb-20">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <Globe className="w-8 h-8 text-emerald-600 mr-3" />
                      <h3 className="text-3xl font-bold text-gray-900">1. CanExport SMEs</h3>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 mb-6 px-3 py-1">Most Popular</Badge>
                    <p className="text-lg text-gray-700 mb-6">
                      The <strong>CanExport SMEs program</strong> is the primary vehicle for Canadian businesses looking to break into new international markets. It effectively de-risks your expansion by covering 50% of the costs associated with business development.
                    </p>

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-emerald-600" />
                        The Hard Numbers
                      </h4>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                        <div>
                          <p className="text-gray-500">Max Funding</p>
                          <p className="font-bold text-xl text-gray-900">$50,000 Grant</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Cost Sharing</p>
                          <p className="font-bold text-xl text-gray-900">50% Gov / 50% You</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Project Budget</p>
                          <p className="font-semibold text-gray-900">$20,000 - $100,000</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Application Deadline</p>
                          <p className="font-semibold text-red-600">May 29, 2026</p>
                        </div>
                      </div>
                    </div>

                    <h4 className="font-bold text-gray-900 mb-3">What It Covers (Eligible Expenses)</h4>
                    <ul className="space-y-3 mb-6">
                      {[
                        "Travel costs for meetings/trade shows (Economy airfare + $400/day per diem)",
                        "Trade show registration and booth fees",
                        "Marketing material translation and adaptation",
                        "Search Engine Optimization (SEO) for target markets",
                        "Legal advice on IP protection or certification in new markets"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: CanExport Sidebar */}
                  <div className="w-full md:w-1/3">
                    <Card className="border-2 border-emerald-100 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        CRITICAL 2026 INFO
                      </div>
                      <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                        <CardTitle className="text-lg text-emerald-900">Eligibility Checklist</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs mr-3 mt-0.5">1</div>
                            <p className="text-sm text-gray-600"><strong>Incorporated</strong> federally or provincially (for-profit).</p>
                          </div>
                          <div className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs mr-3 mt-0.5">2</div>
                            <p className="text-sm text-gray-600"><strong>$300k - $100M revenue</strong> declared in last tax year.</p>
                          </div>
                          <div className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs mr-3 mt-0.5">3</div>
                            <p className="text-sm text-gray-600"><strong>1 to 500</strong> full-time equivalent employees.</p>
                          </div>
                          <div className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs mr-3 mt-0.5">4</div>
                            <p className="text-sm text-gray-600">Project targets a <strong>NEW market</strong> (or one with &lt; 10% sales).</p>
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500 italic pb-2">"Is the US considered one market?"</p>
                          <p className="text-sm font-semibold text-gray-900">Yes. In 2026, the entire USA is treated as a single market. You cannot apply for "California" if you already export heavily to New York.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 w-full mb-20"></div>

              {/* Program 2: Creative Export Canada */}
              <div className="mb-20">
                <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <Award className="w-8 h-8 text-purple-600 mr-3" />
                      <h3 className="text-3xl font-bold text-gray-900">2. Creative Export Canada</h3>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 mb-6 px-3 py-1">Best for Media & Design</Badge>
                    <p className="text-lg text-gray-700 mb-6">
                      For businesses in film, music, design, publishing, and interactive media, generic export grants often fall short. <strong>Creative Export Canada (CEC)</strong> fills this gap with substantial funding for projects that generate immediate export revenue.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <Card className="border-purple-200 bg-purple-50/50">
                        <CardHeader>
                          <CardTitle className="text-lg text-purple-900">Export-Ready Stream</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-purple-700 mb-2">Up to $2.5M</div>
                          <p className="text-sm text-gray-600 mb-4">For large-scale projects aiming to generate significant export revenues.</p>
                          <ul className="text-sm space-y-2">
                            <li className="flex items-center"><CheckCircle className="w-3 h-3 text-purple-600 mr-2" /> Min Project Cost: $300k</li>
                            <li className="flex items-center"><CheckCircle className="w-3 h-3 text-purple-600 mr-2" /> Coverage: Up to 75%</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-blue-200 bg-blue-50/50">
                        <CardHeader>
                          <CardTitle className="text-lg text-blue-900">Export Development Stream</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-blue-700 mb-2">Build Capacity</div>
                          <p className="text-sm text-gray-600 mb-4">For earlier-stage companies needing to enter their first international market.</p>
                          <ul className="text-sm space-y-2">
                            <li className="flex items-center"><CheckCircle className="w-3 h-3 text-blue-600 mr-2" /> For firms &lt; $500M rev</li>
                            <li className="flex items-center"><CheckCircle className="w-3 h-3 text-blue-600 mr-2" /> Mentorship & Training</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <p className="text-sm text-gray-500 italic">
                      <strong>Note:</strong> 2025-2026 intake is currently closed. Watch for the Winter 2026 announcement for the next funding round.
                    </p>
                  </div>

                  {/* Left Column: Creative Sidebar */}
                  <div className="w-full md:w-1/3">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
                      <h4 className="font-bold text-gray-900 mb-4">Eligible Industries</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Audiovisual", "Music", "Performing Arts", "Publishing", "Visual Arts", "Design", "Interactive Digital Media"].map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6">
                        <h4 className="font-bold text-gray-900 mb-2">Key Criteria</h4>
                        <p className="text-sm text-gray-600">Must be Canadian-owned and controlled. Projects must focus on the commercial exploitation of creative content abroad.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Program 3: EDC Trade Impact */}
              <div className="mb-12">
                <div className="bg-blue-900 text-white rounded-2xl p-8 md:p-12">
                  <div className="flex items-center mb-6">
                    <Shield className="w-10 h-10 text-blue-300 mr-4" />
                    <h3 className="text-3xl font-bold">3. EDC Trade Impact Program</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <p className="text-blue-100 text-lg mb-6">
                        Export Development Canada (EDC) is not a grant agency—it's a financial powerhouse. Their Trade Impact Program provides the <strong>working capital and insurance</strong> that makes large export deals possible.
                      </p>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0" />
                          <div>
                            <strong className="block text-white">Credit Insurance</strong>
                            <span className="text-blue-200 text-sm">Validates your foreign customer's credit and insures up to 90% of your invoice if they don't pay.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0" />
                          <div>
                            <strong className="block text-white">Export Guarantee Program</strong>
                            <span className="text-blue-200 text-sm">EDC guarantees your bank loan, encouraging your local bank to lend you more working capital for export orders.</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                      <h4 className="font-bold text-xl mb-4">The "Risk Mitigation" Value</h4>
                      <p className="text-blue-100 mb-4 text-sm">
                        Banks often refuse to count foreign receivables as collateral. EDC fixes this. By insuring your foreign invoices, you can often borrow against them, unlocking cash flow to fulfill the order.
                      </p>
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">Capacity</span>
                          <span className="text-2xl font-bold text-yellow-400">$5 Billion+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Insider Strategy Section */}
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-10">
                <Lightbulb className="w-8 h-8 text-yellow-500 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Why 80% of Applications Fail (And How to Win)</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">❌ Mistake 1: "The US is one big market"</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>Old Rule:</strong> Applying for New York, then California, then Texas separately.
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>2026 Reality:</strong> The CanExport program now views the entire US as a single market. If you have significant sales in <em>any</em> state, you may be ineligible for funding to enter <em>another</em> state unless you can prove the new region is distinct and your total US sales are low (&lt; $100k).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-emerald-500">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">✅ Win Strategy: Detailed Tech Stack</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>Weak Application:</strong> "We will use funds for digital marketing."
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Winning Application:</strong> "We will allocate $12,000 to a localized Google Ads Search campaign targeting German-speaking industrial buyers in the DACH region, utilizing German landing pages translated by a certified agency."
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">❌ Mistake 2: Missing the "Incremental" Rule</h3>
                  <p className="text-gray-600 text-sm">
                    CanExport does not fund ongoing operations. If you attend CES every year, you cannot get funding for it this year. The activity must be <strong>new or expanded</strong>. For example, upgrading from a 10x10 booth to a 20x20 island booth to launch a new product line <em>might</em> be eligible, but simply attending again is not.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-emerald-500">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">✅ Win Strategy: The '3 FTE' Proof</h3>
                  <p className="text-gray-600 text-sm">
                    With the rigorous new "3 Full-Time Employees" rule, ensure your T4 summary clearly reflects this. Contractors and fractional staff do <strong>not</strong> count. If you are borderline, ensure you have hired your 3rd employee <em>before</em> submitting the application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Program Comparison Matrix</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-200 p-4 text-left font-bold text-gray-900">Program</th>
                      <th className="border border-gray-200 p-4 text-left font-bold text-gray-900">Funding Type</th>
                      <th className="border border-gray-200 p-4 text-left font-bold text-gray-900">Max Amount</th>
                      <th className="border border-gray-200 p-4 text-left font-bold text-gray-900">Best For...</th>
                      <th className="border border-gray-200 p-4 text-left font-bold text-gray-900">Key Restriction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4 font-semibold text-emerald-700">CanExport SMEs</td>
                      <td className="border border-gray-200 p-4 text-sm">Grant (50% Cost Share)</td>
                      <td className="border border-gray-200 p-4 text-sm">$50,000</td>
                      <td className="border border-gray-200 p-4 text-sm">First-time market entry</td>
                      <td className="border border-gray-200 p-4 text-sm text-red-600">Min $300k Rev / 3 FTEs</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4 font-semibold text-blue-700">CanExport Innovation</td>
                      <td className="border border-gray-200 p-4 text-sm">Grant (75% Cost Share)</td>
                      <td className="border border-gray-200 p-4 text-sm">$75,000</td>
                      <td className="border border-gray-200 p-4 text-sm">R&D Partnerships</td>
                      <td className="border border-gray-200 p-4 text-sm">Must involve tech validation</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4 font-semibold text-purple-700">Creative Export Canada</td>
                      <td className="border border-gray-200 p-4 text-sm">Funding Contribution</td>
                      <td className="border border-gray-200 p-4 text-sm">$2.5 Million</td>
                      <td className="border border-gray-200 p-4 text-sm">Media/Culture Scaling</td>
                      <td className="border border-gray-200 p-4 text-sm">Annual Intake Windows</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-4 font-semibold text-gray-800">EDC Credit Insurance</td>
                      <td className="border border-gray-200 p-4 text-sm">Insurance</td>
                      <td className="border border-gray-200 p-4 text-sm">Unlimited (Coverage)</td>
                      <td className="border border-gray-200 p-4 text-sm">Protecting receivables</td>
                      <td className="border border-gray-200 p-4 text-sm">Premium costs apply</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Official Resources */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Official Application Portals</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-emerald-600" />
                    Direct Application Links
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://www.tradecommissioner.gc.ca/funding-financement/canexport/sme-pme/index.aspx?lang=eng" target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-600 hover:text-emerald-800 font-medium">
                        CanExport SMEs Official Portal <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.edc.ca/en/solutions.html" target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-600 hover:text-emerald-800 font-medium">
                        EDC Solutions Hub <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.canada.ca/en/canadian-heritage/services/funding/creative-export-canada.html" target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-600 hover:text-emerald-800 font-medium">
                        Creative Export Canada Program <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                    Application Guides
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/manuals/canexport-applicant-guide-2026.pdf" className="flex items-center text-gray-600 hover:text-emerald-600 group">
                        <ArrowRight className="w-4 h-4 mr-2 text-gray-400 group-hover:text-emerald-600" />
                        CanExport Applicant Guide 2026 (PDF)
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/canada-startup-funding-grants-guide" className="flex items-center text-gray-600 hover:text-emerald-600 group">
                        <ArrowRight className="w-4 h-4 mr-2 text-gray-400 group-hover:text-emerald-600" />
                        Related: Startup Funding Guide
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Don't Miss the May 29, 2026 Deadline</h2>
              <p className="text-xl text-gray-300 mb-10">
                CanExport funding is competitive and the budget runs out fast. Our team specializes in crafting approved export strategies that meet the new 2026 strict eligibility criteria.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/contact?service=export-grant-review">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Review My Eligibility Free
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/state-local-business-grants-guide">
                    Explore Provincial Export Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
