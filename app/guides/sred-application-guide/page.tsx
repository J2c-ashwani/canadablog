import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Calculator, Shield, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SR&ED Tax Credits 2026: Application, Rates & Eligibility",
  description: "Complete guide to claiming SR&ED tax credits. Learn how to get up to 65% of your R&D costs refunded by the CRA.",
  keywords: "SR&ED tax credits, SRED application, R&D tax incentives canada, T661 form, scientific research experimental development",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/sred-application-guide",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the SR&ED approval rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The CRA approves over 20,000 SR&ED claims annually. Properly documented claims with clear technical uncertainty have a high success rate, though audits can occur."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to get the SR&ED refund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For refundable claims (CCPCs), the CRA's service standard is to process them within 60 days of receipt. Non-refundable claims may take up to 365 days."
      }
    },
    {
      "@type": "Question",
      "name": "Can I claim SR&ED if the project failed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! In fact, failure often proves technical uncertainty, which is a key requirement for eligibility. You are claiming for the *effort* to solve the problem, not the success."
      }
    },
    {
      "@type": "Question",
      "name": "How far back can I claim SR&ED?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You must file your SR&ED claim within 18 months of the end of the tax year in which you incurred the expenses. If you miss this deadline, the credits are lost forever."
      }
    }
  ]
}

export default function SREDApplicationGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/10 text-green-100 border-green-200/20 backdrop-blur-sm px-4 py-1.5 text-sm">
                💰 Top Business Tax Incentive
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                How to Apply for <br className="hidden md:block" />SR&ED Tax Credits
              </h1>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Get up to <strong>65% of your R&D costs refunded</strong>. The complete guide to eligibility, Form T661, and maximizing your claim.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 font-bold" asChild>
                  <Link href="#eligibility">Check Eligibility</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                  <Link href="#official-resources">Download T661</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 1. QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm/50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
              <span className="font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
                Common Questions:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#eligibility" className="hover:text-green-600 transition-colors">Who qualifies?</Link>
                <Link href="#rates" className="hover:text-green-600 transition-colors">How much can I get?</Link>
                <Link href="#process" className="hover:text-green-600 transition-colors">How to file?</Link>
                <Link href="#audit" className="hover:text-green-600 transition-colors">Audit risks?</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Overview */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">35%</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Federal Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">Refundable</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Cash Back</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">18 Mos</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Deadline</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-1">$4B+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Annual Claims</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* 2. STRUCTURE SCAN: Question-based Headings */}
              <div id="process" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How does the SR&ED application process work?</h2>

                <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-8">
                  <div className="flex items-start">
                    <Shield className="w-8 h-8 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-green-900 mb-2">It's 2026: Rates have Improved</h4>
                      <p className="text-green-800 leading-relaxed">
                        Recent changes have expanded eligibility for some public corporations and restored capital expenditure credits.
                        <strong> Always use the latest T661 form</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative border-l-2 border-green-100 pl-8 ml-4 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-green-600 border-4 border-white shadow-sm"></div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">1. The "Why" (Technical Uncertainty)</h4>
                    <p className="text-gray-600">You must prove you faced a technical problem that could not be solved by standard practice. This is the heart of your claim.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-green-600 border-4 border-white shadow-sm"></div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">2. The "How" (Systematic Investigation)</h4>
                    <p className="text-gray-600">You must show the steps you took—experiments, analysis, testing. Keep your lab notes, emails, and commit logs!</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-green-600 border-4 border-white shadow-sm"></div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">3. The Calculation</h4>
                    <p className="text-gray-600">Sum up eligible salaries, materials, and sub-contractors. Apply the "Proxy Method" (usually best) to cover overheads.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-green-600 border-4 border-white shadow-sm"></div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">4. File T661</h4>
                    <p className="text-gray-600">Submit Form T661 and Schedule T2SCH31 with your corporate tax return (T2).</p>
                  </div>
                </div>
              </div>

              <div id="eligibility" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What activities are actually eligible?</h2>

                <p className="text-gray-600 mb-6 text-lg">
                  SR&ED is not just for scientists in lab coats. It applies to software developers, manufacturers, and engineers solving hard problems.
                </p>

                <Card className="border-green-200 bg-green-50/50 mb-8">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      The "Three Criteria" Test
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-800">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span><strong>Technological Uncertainty:</strong> You didn't know *if* or *how* to achieve the result.</span>
                      </li>
                      <li className="flex items-center text-gray-800">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span><strong>Technical Content:</strong> You formulated a hypothesis and tested it.</span>
                      </li>
                      <li className="flex items-center text-gray-800">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span><strong>Advancement:</strong> You generated new knowledge (even if the project failed).</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div id="rates" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How much money can I get back?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-green-100 rounded-lg p-5 hover:border-green-300 transition-colors">
                    <div className="flex items-center mb-3 text-green-700">
                      <Calculator className="w-5 h-5 mr-2" />
                      <h3 className="font-bold">CCPC (Canadian Private)</h3>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Federal:</strong> 35% refundable</li>
                      <li><strong>Provincial:</strong> 10-30% extra</li>
                      <li><strong>Total:</strong> Up to 65% (Quebec) or 45% (Ontario/BC)</li>
                    </ul>
                  </div>
                  <div className="border border-blue-100 rounded-lg p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-center mb-3 text-blue-700">
                      <Users className="w-5 h-5 mr-2" />
                      <h3 className="font-bold">Foreign / Public Corp</h3>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Federal:</strong> 15% non-refundable</li>
                      <li><strong>Provincial:</strong> Varies</li>
                      <li><strong>Note:</strong> Used to reduce taxes owed, not cash back.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="audit" className="bg-red-50 rounded-xl p-8 mb-8 border border-red-100">
                <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Avoiding the Audit Trigger
                </h2>
                <p className="text-red-800 mb-4">
                  The #1 reason claims are rejected is <strong>"Lack of Substantiation"</strong>. You cannot recreate documentation at year-end.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-1">Do:</h4>
                    <p className="text-sm text-gray-600">Save dated screenshots, git commit hashes, meeting minutes, and test logs.</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-1">Don't:</h4>
                    <p className="text-sm text-gray-600">Estimate time percentages (e.g., "I spent roughly 50% on R&D"). Use time sheets!</p>
                  </div>
                </div>
              </div>

              {/* 3. FAQ ANCHOR: Dedicated Block */}
              <div id="faq" className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-green-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Is the refund taxable?</h3>
                    <p className="text-gray-600">Yes. The federal ITC (Investment Tax Credit) reduces your expenditure pool for the next year, or is included in income.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Can I file myself?</h3>
                    <p className="text-gray-600">Yes, the T661 is available online. However, the technical narrative is tricky. Many companies use a consultant who charges a contingency fee (15-25% of the refund).</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Does SEO or marketing count?</h3>
                    <p className="text-gray-600">No. Social science, marketing, routine data collection, and style changes are specifically excluded.</p>
                  </div>
                </div>
              </div>

              {/* Common Questions Section */}
              <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About SR&ED</h2>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">1. Is there a deadline?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Yes: <strong>18 months</strong> after your fiscal year end. This is a hard deadline. If you miss it, the credits for that year are lost forever.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">2. How much do SR&ED consultants charge?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Most firms work on a contingency fee model, charging between <strong>15% and 25%</strong> of the refund amount. You generally should not pay upfront fees for SR&ED preparation.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">3. What if I fail?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Failure is good! In the eyes of the CRA, technical failure proves there was "technological uncertainty," which is a core requirement. You can claim the costs of failed experiments.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">4. Do I need timesheets?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          The CRA <strong>strongly</strong> prefers them. If you are audited, "estimated" time allocations are often rejected. Implement a simple time-tracking code for "R&D" in your payroll system.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">5. Can I claim the CEO's salary?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Only for the time they spent <em>directly</em> engaged in the technical work or directly supervising it. You cannot claim time spent on sales, marketing, or general administration.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">6. What is the Proxy Method?</h3>
                        <p className="text-slate-600 leading-relaxed">
                          The Proxy Method simplifies overhead calculations. Instead of itemizing every pen and paper, you claim a flat <strong>55%</strong> of eligible salaries as overhead. This is the method chosen by 90% of claimants.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. NEURAL NETWORK: Related Guides */}
              <div className="border-t border-gray-200 pt-12 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/guides/irap-innovation-application-guide" className="group block">
                    <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-blue-600 font-semibold mb-2">Companion</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">IRAP Grant Guide</h4>
                      <p className="text-sm text-gray-500">Get funding *before* you spend (Grant vs Tax Credit).</p>
                    </div>
                  </Link>
                  <Link href="/blog/canada-startup-funding-grants-guide" className="group block">
                    <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-purple-600 font-semibold mb-2">Hub</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">Startup Grants Hub</h4>
                      <p className="text-sm text-gray-500">The master list of all 50+ Canadian grants.</p>
                    </div>
                  </Link>
                  <Link href="/usa/technology-startup-grants" className="group block">
                    <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-green-600 font-semibold mb-2">Sector</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">Tech Startup Grants</h4>
                      <p className="text-sm text-gray-500">More funding options for tech companies.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Official Resources */}
              <div id="official-resources" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official CRA Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-lg">CRA Forms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">Download the official T661 and T2SCH31 forms.</p>

                      <Button size="sm" variant="outline" className="w-full justify-between" asChild>
                        <Link href="https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t661.html" target="_blank" rel="noopener noreferrer">
                          Download Form T661 <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-lg">Professional Review</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">Don't risk an audit. Get your technical narrative reviewed.</p>
                      <Button size="sm" className="w-full justify-between bg-green-600 hover:bg-green-700 text-white" asChild>
                        <Link href="/contact?service=sred-expert-help">
                          Get Expert Review <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
