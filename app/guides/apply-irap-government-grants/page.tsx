import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp, MessageCircle, HelpCircle, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EEATBadge from '@/components/blog/EEATBadge';
import EligibleCheck from '@/components/blog/EligibleCheck';
import StickyTOC from '@/components/blog/StickyTOC';
import InlineCTA from '@/components/blog/InlineCTA';

export const metadata: Metadata = {
  title: "IRAP Government Grants Application Guide 2026 | Federal R&D Funding",
  description: "Complete guide to applying for IRAP government grants. Learn federal compliance requirements, Treasury Board reporting standards, and how to secure federal R&D funding.",
  keywords: "IRAP government grants, federal R&D funding Canada, government grant application guide, NRC IRAP compliance, federal innovation grants",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-irap-government-grants",
  },
  openGraph: {
    title: "IRAP Government Grants Application Guide 2026 | Federal R&D Funding",
    description: "Step-by-step guide with federal compliance templates and strategies for successful IRAP government grant applications.",
    url: "https://www.fsidigital.ca/guides/apply-irap-government-grants",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is IRAP a federal government grant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, IRAP (Industrial Research Assistance Program) is a federal grant program administered by the National Research Council of Canada (NRC). It uses federal tax dollars to support innovation in Canadian SMEs."
      }
    },
    {
      "@type": "Question",
      "name": "What are the federal compliance requirements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recipients must adhere to the Financial Administration Act, maintain auditable records for at least 6 years, and may be subject to federal audits. You must also comply with the Federal Contractors Program if applicable."
      }
    },
    {
      "@type": "Question",
      "name": "How does the government decide who gets funding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Decisions are based on three pillars: Technical Merit (feasible innovation), Business Potential (economic benefit to Canada), and Management Capability (ability to deliver). Regional priorities also play a role."
      }
    },
    {
      "@type": "Question",
      "name": "Is the money taxable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Government grants are considered taxable income. However, the expenses you pay with the grant are deductible, neutralizing the tax impact in the year incurred. You must also account for it in your SR&ED calculations."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Treasury Board limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While IRAP has its own budgets, usually capped around $10M for large projects (rare), most standard Contribution Agreements are under $500,000 to avoid complex Treasury Board submissions."
      }
    }
  ]
}

export default function IRAPGovernmentGrantsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏛️ Federal R&D Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                IRAP Government Grants Application Guide
              </h1>
              
              <div className="text-left mb-6 max-w-4xl mx-auto shadow-sm mt-6 relative z-20">
                 <ShortAnswerBox content="IRAP Government Grants Application Process — Detailed walkthrough of applying for IRAP government funding for innovation projects." />
              </div>
              <div className="flex justify-center mb-8 relative z-20">
                 <div className="inline-block text-left bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl overflow-hidden">
                    <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-02-25" />
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="#requirements">
                    View Requirements
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-green-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/irap-industrial-research-assistance-program-government-grants">
                    Back to Overview
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 max-w-4xl my-8"><EligibleCheck /></div>

        <StickyTOC links={[
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ]} />


        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm/50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
              <span className="font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-green-700" />
                Quick Links:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#requirements" className="hover:text-green-700 transition-colors">Federal Requirements</Link>
                <Link href="#process" className="hover:text-green-700 transition-colors">Grant Process</Link>
                <Link href="#compliance" className="hover:text-green-700 transition-colors">Compliance</Link>
                <Link href="#mistakes" className="hover:text-green-700 transition-colors">Common Mistakes</Link>
                <Link href="#faq" className="hover:text-green-700 transition-colors">FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-700 mb-2">Federal</div>
                  <div className="text-gray-600">Funding Source</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Monthly</div>
                  <div className="text-gray-600">Reimbursement Cycle</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">Strict</div>
                  <div className="text-gray-600">Audit Requirements</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                  <div className="text-gray-600">Taxable Benefit</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Eligibility Requirements */}
        <section id="requirements" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Federal Eligibility & Identification</h2>

              <div className="space-y-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">Can You Apply?</CardTitle>
                      <Badge className="bg-green-100 text-green-800">Basic Criteria</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">Corporate Status:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span><strong>Incorporated:</strong> Must be a for-profit corporation in Canada.</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span><strong>SME Definition:</strong> Fewer than 500 employees.</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span><strong>Location:</strong> Operations and R&D must happen in Canada.</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h5 className="font-bold text-green-800 mb-2">The "Government Benefit" Test:</h5>
                          <p className="text-sm text-green-700 mb-2">
                            The government invests tax dollars to generate a return for taxpayers. Your application must prove:
                          </p>
                          <ul className="list-disc list-inside text-sm text-green-700">
                            <li>New Canadian jobs created</li>
                            <li>Increased Canadian export revenue</li>
                            <li>Supply chain spillover effects</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Government Application Process Timeline */}
        <section id="process" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
        <div className="container mx-auto px-4 max-w-4xl my-12"><InlineCTA {...{
      description: "Need help with your IRAP application? Our specialists connect you with the right ITA and prepare your proposal.",
    }} /></div>
<h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">The Government Grant Process</h2>
              <div className="space-y-8">

                {/* Phase 1 */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Phase 1: Registration & Validation</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Initial Step</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <FileText className="w-5 h-5 text-blue-500 mr-2" />
                        <div>
                          <strong>NRC Portal Registration:</strong> You must call NRC to get registered in their client management system. You cannot just "sign up" online.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-2" />
                        <div>
                          <strong>Triage Assessment:</strong> A government officer will screen your company for basic financial stability and past tax compliance.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Phase 2 */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Phase 2: The Contribution Agreement</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Legal Contract</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      If approved, you sign a federal "Contribution Agreement." This is a legally binding contract with strict terms.
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h5 className="font-bold text-purple-900 mb-2">Key Contract Terms:</h5>
                      <ul className="space-y-2 text-sm text-purple-800">
                        <li>• <strong>Indemnity:</strong> You indemnify the Crown against liability.</li>
                        <li>• <strong>Termination:</strong> The government can cancel funding if milestones aren't met.</li>
                        <li>• <strong>Audit Rights:</strong> The Auditor General can review your books.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* Federal Compliance */}
        <section id="compliance" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Federal Compliance & Reporting</h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Shield className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle>Treasury Board Standards</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold mb-2">Financial Tracking:</h6>
                        <ul className="text-sm space-y-2 text-gray-600">
                          <li>• Separate GL codes for project expenses</li>
                          <li>• Timesheets signed by employees (mandatory)</li>
                          <li>• Proof of payment for all contractor invoices</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Conflict of Interest:</h6>
                        <ul className="text-sm space-y-2 text-gray-600">
                          <li>• Strict rules on hiring relatives</li>
                          <li>• Non-arms-length transaction restrictions</li>
                          <li>• Disclosure of other government lobbying</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Government Application Failures</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Technical Compliance Failures:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Missing Timesheets:</strong>
                        <p className="text-sm text-gray-600">The #1 reason claims are rejected. You must track hours daily/weekly.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Unpaid Invoices:</strong>
                        <p className="text-sm text-gray-600">You cannot claim an expense you haven't paid yet. "Accruals" are not eligible.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Strategic Failures:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Double Dipping:</strong>
                        <p className="text-sm text-gray-600">Claiming the same receipt for IRAP and another grant (e.g., CanExport) constitutes fraud.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Lobbying Disclosure:</strong>
                        <p className="text-sm text-gray-600">Failure to disclose paid lobbyists can void your agreement.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-green-700 mr-2" />
                Government Grant FAQs
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">Will the government own my invention?</h3>
                  <p className="text-gray-600">No. The federal policy for IRAP explicitly states that Intellectual Property (IP) remains with the firm. The government wants you to commercialize it.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">Can I use this grant to pay debt?</h3>
                  <p className="text-gray-600">Absolutely not. Funds are restricted to "Direct Project Costs" only (Salary, Contractor fees). Using funds for debt repayment or dividends is a breach of contract.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">What happens if the project fails?</h3>
                  <p className="text-gray-600">IRAP is "risk capital." If the technology fails despite your best efforts, you do not have to repay the grant. However, you must submit a final report explaining the failure (lessons learned).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About IRAP</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. How is IRAP different from SR&ED?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Timing:</strong> IRAP pays <em>monthly</em> (cash flow), while SR&ED pays <em>annually</em> (tax return). <br />
                    <strong>Certainty:</strong> IRAP is competitive (you must be approved <em>before</em> spending). SR&ED is an entitlement (you claim <em>after</em> spending).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Can I stack them?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes, but you can't double-dip. IRAP grants reduce your pool of eligible expenses for SR&ED. Effectivley, you get the grant cash now, and a smaller tax credit later.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. What qualifies as "Technical Uncertainty"?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    You must be trying to solve a problem where the solution is not obvious to a standard professional in the field. Routine development (e.g., building a standard website) does not qualify.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Does IRAP cover marketing salaries?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No. IRAP strictly covers <strong>R&D technical salaries</strong> and contractor fees. It does not cover sales, marketing, or administrative staff.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. Can I hire foreign contractors?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    IRAP prefers Canadian specialized contractors. However, if you can prove the expertise does not exist in Canada, they may approve a foreign contractor.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. What is the youth employment program?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The <a href="https://nrc.canada.ca/en/support-technology-innovation/nrc-irap-funding-programs" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">Youth Employment Program (YEP)</a> under IRAP pays up to $30k to hire a young graduate (under 31) for 6-12 months. It's the easiest IRAP grant to get.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Other Federal Funding</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-federal-grants" className="group block h-full">
                  <div className="bg-gray-50 border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Overview</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">Federal Grants Guide</h4>
                    <p className="text-sm text-gray-500 flex-grow">A broad look at all federal funding available for Canadian business.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-regional-development-agencies" className="group block h-full">
                  <div className="bg-gray-50 border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Regional</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">RDA Funding Guide</h4>
                    <p className="text-sm text-gray-500 flex-grow">ACOA, FedDev, and other regional federal agencies.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-ontario-business-grants" className="group block h-full">
                  <div className="bg-gray-50 border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Provincial</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">Ontario Grants</h4>
                    <p className="text-sm text-gray-500 flex-grow">Provincial funding that can sometimes be stacked with federal grants.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Get Expert Help CTA */}
        <section className="py-20 bg-gradient-to-r from-green-700 to-emerald-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ensure Federal Compliance & Success
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Don't risk audit failure or contract termination. Our experts ensure your application and reporting systems meet federal standards.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=irap-government-expert-help">
                  Get Compliance Assistance
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
