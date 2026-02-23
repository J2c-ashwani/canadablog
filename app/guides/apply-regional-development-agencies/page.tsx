import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp, MapPin, MessageCircle, HelpCircle, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Regional Development Agencies Application Guide 2026 | Step-by-Step RDA Funding",
  description: "Complete step-by-step guide to applying for Regional Development Agency (RDA) funding. Get templates, regional strategies, and proven application frameworks for ACOA, FedDev, Ced, and more.",
  keywords: "Regional Development Agencies application guide, RDA funding application process, ACOA application guide, FedDev Ontario application, PacifiCan funding application, Canada regional grants",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-regional-development-agencies",
  },
  openGraph: {
    title: "Regional Development Agencies Application Guide 2026 | RDA Funding Process",
    description: "Step-by-step guide with templates and strategies for successful RDA federal funding applications across all 7 Canadian regional agencies.",
    url: "https://www.fsidigital.ca/guides/apply-regional-development-agencies",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many Regional Development Agencies (RDAs) are there?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There are 7 Regional Development Agencies in Canada: ACOA (Atlantic), CED (Quebec), FedDev Ontario (Southern Ontario), FedNor (Northern Ontario), PrairiesCan (Prairies), PacifiCan (BC), and CanNor (North)."
      }
    },
    {
      "@type": "Question",
      "name": "Is RDA funding repayable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends. RDA funding typically comes as interest-free repayable contributions (loans) for commercial projects, and non-repayable contributions (grants) for non-profit or community projects. Terms vary by specific program."
      }
    },
    {
      "@type": "Question",
      "name": "How much funding can I get from an RDA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Funding amounts vary by program and agency, but typical commercial projects can receive from $100,000 up to $10 million. Most contributions cover up to 50% of eligible project costs."
      }
    },
    {
      "@type": "Question",
      "name": "Can I apply to multiple RDAs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generally, no. You must apply to the RDA responsible for the region where your project will take place and where the economic benefits will be realized. If you have projects in multiple regions, consult with the RDAs first."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the RDA application process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process typically takes 3-6 months from initial inquiry to funding approval. This includes consultation, full application submission, due diligence, and final approval."
      }
    }
  ]
}

export default function RDARegionalGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🌍 Federal Regional Development Application Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Regional Development Agencies Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for RDA federal funding across all 7 Regional Development Agencies.
                Complete with regional-specific templates, federal compliance strategies, and proven application frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="#process">
                    View Process
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-purple-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/regional-development-agencies-government-grants">
                    Back to RDA Guide
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
                <MessageCircle className="w-4 h-4 mr-2 text-purple-600" />
                Quick Links:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#agencies" className="hover:text-purple-600 transition-colors">Find Your RDA</Link>
                <Link href="#process" className="hover:text-purple-600 transition-colors">Timeline</Link>
                <Link href="#strategies" className="hover:text-purple-600 transition-colors">Regional Strategies</Link>
                <Link href="#mistakes" className="hover:text-purple-600 transition-colors">Common Mistakes</Link>
                <Link href="#faq" className="hover:text-purple-600 transition-colors">FAQs</Link>
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
                  <div className="text-3xl font-bold text-purple-600 mb-2">3-6 Months</div>
                  <div className="text-gray-600">Average Application Timeline</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">7 Agencies</div>
                  <div className="text-gray-600">Covering All Canada</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">0% Interest</div>
                  <div className="text-gray-600">On Repayable Contributions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$10M</div>
                  <div className="text-gray-600">Max Typical Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* What is RDA */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are Regional Development Agencies?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Regional Development Agencies (RDAs) are federal government organizations dedicated to economic growth
                  in specific regions of Canada. They provide funding, advice, and services to businesses and communities
                  to promote innovation, diversification, and job creation.
                </p>

                <div className="bg-purple-50 border border-purple-100 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <MapPin className="w-8 h-8 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-purple-900 mb-2">The "Place-Based" Approach</h4>
                      <p className="text-purple-800 leading-relaxed">
                        RDAs use a "place-based" approach, meaning programs are tailored to the unique economic realities
                        of each region. An application to ACOA (Atlantic) will look different from one to WD/PrairiesCan
                        because the regional priorities (e.g., ocean tech vs. agriculture) differ.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Find Your Agency */}
              <div id="agencies" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Which RDA should I apply to?</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-blue-100 hover:border-blue-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-700">ACOA</CardTitle>
                      <p className="text-xs text-gray-500">Atlantic Canada Opportunities Agency</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">NB, NS, PEI, NL</p>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-100 hover:border-blue-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-700">CED (DEC)</CardTitle>
                      <p className="text-xs text-gray-500">Canada Economic Development for Quebec Regions</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Quebec</p>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-100 hover:border-blue-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-700">FedDev Ontario</CardTitle>
                      <p className="text-xs text-gray-500">Federal Economic Development Agency for Southern Ontario</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Southern Ontario</p>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-100 hover:border-blue-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-700">FedNor</CardTitle>
                      <p className="text-xs text-gray-500">Federal Economic Development Initiative for Northern Ontario</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Northern Ontario</p>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-100 hover:border-blue-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-700">PrairiesCan</CardTitle>
                      <p className="text-xs text-gray-500">Economic Development Canada for the Prairies</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Alberta, Saskatchewan, Manitoba</p>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-100 hover:border-blue-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-700">PacifiCan</CardTitle>
                      <p className="text-xs text-gray-500">Pacific Economic Development Canada</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">British Columbia</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-4">
                  <Card className="border-blue-100 hover:border-blue-300 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-700">CanNor</CardTitle>
                      <p className="text-xs text-gray-500">Canadian Northern Economic Development Agency</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Yukon, Northwest Territories, Nunavut</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* RDA Regional Application Timeline */}
              <div id="process" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">RDA Application Timeline</h2>

                <div className="space-y-8">
                  {/* Phase 1 */}
                  <Card className="border-purple-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-purple-700">Phase 1: Engagement & Concept</CardTitle>
                        <Badge className="bg-purple-100 text-purple-800">Month 1</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-1" />
                          <span><strong>Identify Agency:</strong> Confirm which RDA covers your region.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-1" />
                          <span><strong>Project Concept:</strong> Develop a 1-2 page summary of your project, costs, and benefits.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-1" />
                          <span><strong>Initial Meeting:</strong> Contact an RDA Program Officer. This is critical. They act as "gatekeepers" and advisors.</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Phase 2 */}
                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-blue-700">Phase 2: Formal Application</CardTitle>
                        <Badge className="bg-blue-100 text-blue-800">Month 2-3</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                          <span><strong>Submit Application:</strong> Complete the specific RDA's online application form.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                          <span><strong>Attach Documents:</strong> Include business plan, financial statements, project timeline, and budget.</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Phase 3 */}
                  <Card className="border-green-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-green-700">Phase 3: Due Diligence</CardTitle>
                        <Badge className="bg-green-100 text-green-800">Month 3-5</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                          <span><strong>Q&A:</strong> The officer will ask detailed questions about market validity, management team, and financial capacity.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                          <span><strong>Site Visit:</strong> Potential visit to your facility (virtual or in-person).</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Phase 4 */}
                  <Card className="border-orange-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-orange-700">Phase 4: Approval & Contribution Agreement</CardTitle>
                        <Badge className="bg-orange-100 text-orange-800">Month 5-6</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-1" />
                          <span><strong>Ministerial Approval:</strong> Larger projects may require Minister sign-off.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-1" />
                          <span><strong>Sign Agreement:</strong> Execute the Contribution Agreement (the contract).</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-1" />
                          <span><strong>Press Release:</strong> Often a public announcement follows.</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Regional Strategies */}
              <div id="strategies" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Regional Success Strategies</h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                        <CardTitle>Atlantic Canada (ACOA)</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm mb-3"><strong>Focus:</strong> Ocean tech, tourism, food processing, advanced manufacturing.</p>
                      <p className="text-gray-700 text-sm"><strong>Strategy:</strong> Emphasize export potential and extending the season for tourism projects. Highlight rural job creation.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <Building className="w-6 h-6 text-red-600 mr-3" />
                        <CardTitle>Ontario (FedDev / FedNor)</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm mb-3"><strong>Focus:</strong> Auto/EV supply chain, life sciences, digital tech, mining (North).</p>
                      <p className="text-gray-700 text-sm"><strong>Strategy:</strong> For FedDev, focus on scaling up and global competitiveness. For FedNor, focus on community capacity and resource innovation.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <Target className="w-6 h-6 text-yellow-600 mr-3" />
                        <CardTitle>Western Canada (PrairiesCan / PacifiCan)</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm mb-3"><strong>Focus:</strong> Energy transition, cleantech, ag-tech, life sciences (BC).</p>
                      <p className="text-gray-700 text-sm"><strong>Strategy:</strong> Align with economic diversification away from pure oil & gas extraction towards value-added processing and tech.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Common Mistakes */}
              <div id="mistakes" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Common RDA Application Mistakes</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Application Killers:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Ignoring Regional Priorities:</strong>
                          <p className="text-sm text-gray-600">Pitching a generic project that doesn't advance the specific region's economic goals.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Financials:</strong>
                          <p className="text-sm text-gray-600">Failing to show how you will repay the contribution (loan). RDAs need to see repayment capacity.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Process Errors:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Skipping the Officer Meeting:</strong>
                          <p className="text-sm text-gray-600">Applying "cold" without talking to an officer first greatly reduces success assurance.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Lack of "Incremental" Benefits:</strong>
                          <p className="text-sm text-gray-600">Not showing that the federal funding allows the project to happen faster or bigger than it would have otherwise.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div id="faq" className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-purple-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">1. Can I stack RDA funding with other grants?</h3>
                    <p className="text-gray-600 text-sm">Yes, "stacking" is allowed, but there is usually a cap (often 75% or 90% of total project costs depending on the program). You must declare all other funding sources, such as <Link href="/guides/apply-irap-grants" className="text-purple-600 hover:underline">IRAP</Link> or provincial grants.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">2. What costs are eligible?</h3>
                    <p className="text-gray-600 text-sm">Eligible costs typically include capital equipment, technology adoption, marketing/export development, and specialized labour. General operating costs and land purchase are usually ineligible.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">3. How does repayment work?</h3>
                    <p className="text-gray-600 text-sm">Repayment usually begins 1 year after the project is completed. It is typically a monthly payment schedule over 3-5 years, interest-free. See specific <Link href="https://bwl-lsf.isc-isde.gc.ca/s/en" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">RDA guidelines</Link> for details.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">4. Do RDAs take equity?</h3>
                    <p className="text-gray-600 text-sm">No, RDAs do not take equity in your company. They provide non-dilutive financing, meaning you retain full ownership and control.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">5. What is the difference between a grant and a contribution?</h3>
                    <p className="text-gray-600 text-sm">A <strong>grant</strong> is unconditional funding aimed at support. A <strong>contribution</strong> (repayable or non-repayable) comes with a contract specifying performance conditions and reporting requirements.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">6. How long does the approval process take?</h3>
                    <p className="text-gray-600 text-sm">RDA approval times vary, but typically range from 3 to 6 months. Engaging with a program officer early can help streamline the process.</p>
                  </div>
                </div>
              </div>

              {/* Neural Network: Related Guides */}
              <div className="border-t border-gray-200 pt-12 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding Guides</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/guides/apply-strategic-innovation-fund" className="group block">
                    <div className="bg-white border hover:border-red-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-red-600 font-semibold mb-2">Large Projects</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">Strategic Innovation Fund</h4>
                      <p className="text-sm text-gray-500">For projects &gt;$10M with national impact expectations.</p>
                    </div>
                  </Link>
                  <Link href="/guides/apply-small-business-grants" className="group block">
                    <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-green-600 font-semibold mb-2">Small Projects</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">Small Business Grants</h4>
                      <p className="text-sm text-gray-500">For smaller projects like digital adoption and hiring.</p>
                    </div>
                  </Link>
                  <Link href="/guides/apply-csbfp-loans" className="group block">
                    <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-blue-600 font-semibold mb-2">Bank Loans</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">CSBFP Loan Guide</h4>
                      <p className="text-sm text-gray-500">Government-guaranteed loans up to $1.15M.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Official RDA Resources</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <h5 className="font-semibold">Find Your RDA</h5>
                        <p className="text-sm text-gray-600">Official Gov of Canada Tool</p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href="https://bwl-lsf.isc-isde.gc.ca/s/en" target="_blank" rel="noopener noreferrer">
                          Visit <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help Navigating RDA Funding?</h3>
                <p className="text-purple-100 mb-6 max-w-xl mx-auto">
                  Our funding specialists have experience with every RDA in Canada. We can help you identify the
                  right program and craft a winning application.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-purple-800 hover:bg-purple-50 font-semibold" asChild>
                    <Link href="/contact?service=rda-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                    <Link href="/grant-finder">
                      Browse All Programs
                    </Link>
                  </Button>
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
