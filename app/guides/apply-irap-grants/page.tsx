import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Lightbulb, Code, Zap, MessageCircle, HelpCircle, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Complete IRAP Application Guide 2025 | Step-by-Step R&D Grant Process",
  description: "Step-by-step guide to applying for NRC IRAP grants. Get templates, R&D project frameworks, and expert tips for successful innovation funding.",
  keywords: "IRAP application guide, how to apply IRAP, NRC IRAP process, R&D grant application, industrial research funding, Canada innovation grants",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-irap-grants",
  },
  openGraph: {
    title: "Complete IRAP Application Guide 2025 | Step-by-Step R&D Grant Process",
    description: "Step-by-step guide to applying for NRC IRAP grants. Get templates, R&D project frameworks, and expert tips for successful innovation funding.",
    url: "https://www.fsidigital.ca/guides/apply-irap-grants",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What qualifies for IRAP funding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IRAP funds technical R&D projects that involve uncertainty and risk. The project must aim to develop a new or significantly improved product, process, or service. Routine engineering or maintenance does not qualify."
      }
    },
    {
      "@type": "Question",
      "name": "How much does IRAP pay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IRAP typically covers up to 80% of internal technical salary costs and up to 50% of contractor costs for the project duration. Total contribution amounts vary but often range from $50,000 to $500,000+ for larger projects."
      }
    },
    {
      "@type": "Question",
      "name": "Is IRAP funding repayable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, standard IRAP contributions are non-repayable grants. They are not loans. However, you must meet the project milestones and reporting requirements to receive the reimbursements."
      }
    },
    {
      "@type": "Question",
      "name": "How long does approval take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process is relatively fast compared to other government programs. Once a full proposal is invited, approval can take 4-8 weeks. The initial engagement with an ITA can add 1-2 months prior to that."
      }
    },
    {
      "@type": "Question",
      "name": "Can I claim SR&ED and IRAP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but you cannot 'double dip'. You must deduct the IRAP grant amount from your SR&ED eligible expenditures. Essentially, you can't get a tax credit on the portion of salary that the government already paid for."
      }
    }
  ]
}

export default function IRAPApplicationGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🔬 Complete Application Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                IRAP Grant Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-emerald-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for Industrial Research Assistance Program (NRC IRAP) grants.
                Complete with templates, project frameworks, and proven R&D strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="#process">
                    View Process
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-emerald-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/irap-industrial-research-assistance-program">
                    Back to IRAP Overview
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm/50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
              <span className="font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" />
                Quick Links:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#process" className="hover:text-emerald-600 transition-colors">Process</Link>
                <Link href="#categories" className="hover:text-emerald-600 transition-colors">Project Types</Link>
                <Link href="#mistakes" className="hover:text-emerald-600 transition-colors">Common Mistakes</Link>
                <Link href="#strategies" className="hover:text-emerald-600 transition-colors">Success Strategies</Link>
                <Link href="#faq" className="hover:text-emerald-600 transition-colors">FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">6-12 Weeks</div>
                  <div className="text-gray-600">Average Approval Timeline</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">80%</div>
                  <div className="text-gray-600">Coverage of Salary Costs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">Non-Repayable</div>
                  <div className="text-gray-600">Grant (Not a Loan)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$50k - $500k</div>
                  <div className="text-gray-600">Typical Funding Range</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process Timeline */}
        <section id="process" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">IRAP Application Process</h2>

              <div className="space-y-8">
                {/* Phase 1: Pre-Application */}
                <Card className="border-emerald-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-emerald-700">Phase 1: The "ITA" Engagement</CardTitle>
                      <Badge className="bg-emerald-100 text-emerald-800">Critical First Step</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">Who is the ITA?</h5>
                        <p className="text-sm text-gray-600 mb-4">
                          The Industrial Technology Advisor (ITA) is your gateway to IRAP. You cannot apply online without an ITA invitation. They act as a consultant, coach, and gatekeeper.
                        </p>
                        <h5 className="font-semibold mb-3">Engagement Steps:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                            <span>Call 1-877-994-4727 or register online to request an ITA.</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                            <span>Prepare a "One-Pager" describing your tech and market.</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                            <span>Pitch your project to the ITA in an initial meeting.</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 h-full">
                          <h5 className="font-bold text-emerald-800 mb-2">What the ITA Looks For:</h5>
                          <ul className="space-y-3 text-sm text-emerald-700">
                            <li className="flex items-start">
                              <Target className="w-4 h-4 mr-2 mt-1" />
                              <span><strong>Technical Risk:</strong> Is it hard to do? If it's easy, they define it as "routine engineering" (not eligible).</span>
                            </li>
                            <li className="flex items-start">
                              <DollarSign className="w-4 h-4 mr-2 mt-1" />
                              <span><strong>Commercial Impact:</strong> Will this generate revenue and profits for Canada?</span>
                            </li>
                            <li className="flex items-start">
                              <Users className="w-4 h-4 mr-2 mt-1" />
                              <span><strong>Team Capacity:</strong> Can you actually pull this off?</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 2: Project Development */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Phase 2: Proposal Development</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Upon Invitation</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Once the ITA invites you to apply, you will gain access to the IRAP portal. You will need to submit a comprehensive proposal.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded">
                          <strong>Technical Proposal:</strong>
                          <ul className="text-sm mt-2 space-y-1">
                            <li>• Technical uncertainties & risks</li>
                            <li>• Objectives & Methodology</li>
                            <li>• Work Plan (Gantt Chart)</li>
                            <li>• Team bios & capabilities</li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 p-4 rounded">
                          <strong>Business Proposal:</strong>
                          <ul className="text-sm mt-2 space-y-1">
                            <li>• Market validation & size</li>
                            <li>• Competitor analysis</li>
                            <li>• Commercialization path</li>
                            <li>• Financial statements (2 years)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3: Review & Claims */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Phase 3: Monthly Claims (Post-Approval)</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Execution</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Unlike some grants that pay upfront or in lump sums, IRAP operates on a <strong>monthly reimbursement model</strong>.
                      </p>

                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h5 className="font-semibold text-purple-800 mb-2">The Monthly Cycle:</h5>
                        <ul className="space-y-2 text-sm text-purple-700">
                          <li>1. Pay your employees and contractors for the month.</li>
                          <li>2. Submit a claim form to NRC by the 5th of the following month.</li>
                          <li>3. Provide proof of payment (payroll registers, bank statements).</li>
                          <li>4. Receive reimbursement via Direct Deposit (usually within 14-30 days).</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Project Categories */}
        <section id="categories" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">IRAP Project Categories</h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Lightbulb className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle>Technology Innovation Projects (Core)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• <strong>Focus:</strong> Developing new products or significantly improving existing ones.</li>
                          <li>• <strong>Size:</strong>Typically $50k to $500k+.</li>
                          <li>• <strong>Duration:</strong> 6 to 24 months.</li>
                          <li>• <strong>Support:</strong> Up to 80% salary, 50% contractors.</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-3 rounded text-sm text-blue-700">
                        <span className="font-bold">Best For:</span> Startups and SMEs with a dedicated technical team building proprietary technology.
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Users className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle>Youth Employment Program (YEP)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• <strong>Focus:</strong> Hiring recent STEM graduates (15-30 years old).</li>
                          <li>• <strong>Size:</strong> Up to $30k-$40k (contributes to salary).</li>
                          <li>• <strong>Duration:</strong> 6 to 12 months.</li>
                          <li>• <strong>Support:</strong> Covers ~75% minimum wage or portion of salary.</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-3 rounded text-sm text-green-700">
                        <span className="font-bold">Best For:</span> Expanding your team with junior talent. Can be stacked with other IRAP projects.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section id="mistakes" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Avoid These IRAP Deal-Breakers</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Technical Failures:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>"Routine Engineering":</strong>
                        <p className="text-sm text-gray-600">Using off-the-shelf tools to build a standard website or app is not R&D. You must solve a technical uncertainty.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Lack of Technical Team:</strong>
                        <p className="text-sm text-gray-600">IRAP funds *people*. If you outsource 100% of the work, you rarely qualify. You need internal technical capacity.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Business Failures:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Financial Instability:</strong>
                        <p className="text-sm text-gray-600">IRAP reimburses you. You need 2-3 months of operating cash flow in the bank to start.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Ignoring the ITA:</strong>
                        <p className="text-sm text-gray-600">Your ITA is your champion. If you are unresponsive, argumentative, or hide info, your file will stall.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section id="strategies" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Proven Success Strategies</h2>

              <div className="space-y-6">
                <Card className="border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-700">The "Technical Obstacle" Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Frame your proposal around <strong>OBSTACLES</strong>, not features. Don't say "We will build a fast database."
                    </p>
                    <div className="bg-gray-100 p-4 rounded text-sm font-medium border-l-4 border-emerald-500">
                      Say: "We are attempting to reduce query latency by 50% in a distributed ledger environment, but current consensus algorithms introduce O(n^2) message overhead. We will investigate a novel sharding protocol to overcome this..."
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      This language proves you are doing R&D, not just development.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">The "Wealth Creation" Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      NRC's mandate is to create wealth for Canada. Connect dots clearly:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Project success = New Product X</li>
                      <li>New Product X = $5M in estimated sales by Year 3</li>
                      <li>$5M sales = Hiring 10 more Canadian engineers</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-emerald-600 mr-2" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">1. Who owns the Intellectual Property (IP)?</h3>
                  <p className="text-gray-600 text-sm">You do. The Government of Canada claims NO equity and NO intellectual property rights in IRAP projects. Your company retains full ownership of all developed technology.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">2. Can I stack IRAP with SR&ED?</h3>
                  <p className="text-gray-600 text-sm">Yes. IRAP pays for the work *now*. <Link href="https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">SR&ED</Link> is a tax credit for the work *later*. You just subtract the IRAP portion from your SR&ED claim so you don't get paid twice for the same dollar.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">3. Is there a deadline for IRAP?</h3>
                  <p className="text-gray-600 text-sm">IRAP accepts applications on a rolling basis year-round. However, funding budgets reset April 1st. It's often easier to secure funding early in the fiscal year (April-June) before budgets are exhausted.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">4. How is IRAP different from the Strategic Innovation Fund (SIF)?</h3>
                  <p className="text-gray-600 text-sm">IRAP is designed for small to medium-sized enterprises (SMEs) with projects typically under $10M. <Link href="https://ised-isde.canada.ca/site/strategic-innovation-fund/en" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">SIF</Link> is for large-scale industrial projects often exceeding $10M in total costs.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">5. Can pre-revenue startups apply?</h3>
                  <p className="text-gray-600 text-sm">Yes, but you must demonstrate financial stability. You need enough cash flow to pay your employees first, as IRAP is a reimbursement program, not an upfront grant.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">6. How do I request an ITA?</h3>
                  <p className="text-gray-600 text-sm">You can call the NRC-IRAP toll-free number at 1-877-994-4727 or complete the form on the <Link href="https://nrc.canada.ca/en/support-technology-innovation/nrc-irap" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">NRC website</Link>. Be prepared to discuss your technology and business case.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding Guides</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/sred-application-guide" className="group block h-full">
                  <div className="bg-gray-50 border hover:border-emerald-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-emerald-600 font-semibold mb-2">Tax Credits</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">SR&ED Guide</h4>
                    <p className="text-sm text-gray-500 flex-grow">Recover up to 64% of R&D costs at tax time. Complements IRAP perfectly.</p>
                    <div className="mt-3 text-xs text-emerald-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-strategic-innovation-fund" className="group block h-full">
                  <div className="bg-gray-50 border hover:border-red-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-red-600 font-semibold mb-2">Large Scale</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">SIF Application Guide</h4>
                    <p className="text-sm text-gray-500 flex-grow">For major industrial R&D projects over $10M.</p>
                    <div className="mt-3 text-xs text-red-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/startup-funding-canada" className="group block h-full">
                  <div className="bg-gray-50 border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Venture Capital</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">Startup Funding</h4>
                    <p className="text-sm text-gray-500 flex-grow">Guide to VC, Angel, and private equity landscape in Canada.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Get Expert Help CTA */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Need an R&D Funding Specialist?
              </h2>
              <p className="text-xl text-emerald-100 mb-8">
                Navigating the technical requirements of IRAP and SR&ED is complex. Our team of PhDs and engineers can handle the writing for you.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=irap-expert-help">
                  Book a Free Assessment
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
