import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, Building, Users, Zap,
  Clock, AlertTriangle, FileText, HelpCircle, MapPin, Briefcase, ChevronRight,
  ExternalLink, BookOpen, TrendingUp, Leaf
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quebec Small Business Grants 2026 | $1.8B+ Complete Funding Guide",
  description: "Complete guide to Quebec small business grants. Access Investissement Québec SME Fund, Quebec Startup Fund, R&D Tax Credits up to 37.5%, and francophone business support. Expert tips in French & English.",
  keywords: "Quebec small business grants, Investissement Quebec SME fund, Quebec startup funding, Quebec R&D tax credits, francophone business grants Quebec, Montreal business grants, subventions PME Quebec",
}

export default function QuebecSmallBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏢 Quebec Business Funding Guide / Guide de financement
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Quebec Small Business Grants 2026
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access $1.8B+ in Quebec government funding. Complete guide to Investissement Québec,
                R&D tax credits up to 37.5%, startup funds, and 50+ active business support programs.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=quebec-business-grants-expert-help">
                  Get Expert Help with Quebec Grants
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
                Service en français disponible • 91% success rate • R&D specialists
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide / Dans ce guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. Quebec Funding Overview</a></li>
                  <li><a href="#programs" className="text-blue-700 hover:underline">2. Major Grant Programs</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">3. Who is Eligible?</a></li>
                  <li><a href="#how-much" className="text-blue-700 hover:underline">4. How Much Funding?</a></li>
                  <li><a href="#how-to-apply" className="text-blue-700 hover:underline">5. How to Apply</a></li>
                  <li><a href="#documents" className="text-blue-700 hover:underline">6. Required Documents</a></li>
                  <li><a href="#timeline" className="text-blue-700 hover:underline">7. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-blue-700 hover:underline">8. Common Mistakes</a></li>
                  <li><a href="#industries" className="text-blue-700 hover:underline">9. Industry-Specific Grants</a></li>
                  <li><a href="#cities" className="text-blue-700 hover:underline">10. Montreal & Quebec City Programs</a></li>
                  <li><a href="#alternatives" className="text-blue-700 hover:underline">11. Alternatives to Grants</a></li>
                  <li><a href="#faqs" className="text-blue-700 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$1.8B+</div>
                  <div className="text-gray-600">Annual Quebec SME Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">37.5%</div>
                  <div className="text-gray-600">Max R&D Tax Credit Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-gray-600">Active Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">45-90</div>
                  <div className="text-gray-600">Days Processing Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Quebec Business Funding Overview</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Quebec operates one of Canada&apos;s most comprehensive and generous business funding
                  ecosystems with over $1.8 billion available annually. The province&apos;s unique economic
                  development approach combines substantial direct grants, world-leading R&D tax credits,
                  and strategic sector investments through Investissement Québec.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Quebec&apos;s R&D tax credit system is particularly notable, offering combined federal-provincial
                  credits that can exceed 55% of eligible expenditures—among the highest in North America.
                  The province also maintains strong support for francophone businesses, cultural industries,
                  and companies contributing to Quebec&apos;s economic sovereignty.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Insight:</strong> Quebec&apos;s funding programs strongly favor businesses that
                    contribute to the provincial economy through job creation, technology development, or
                    export activities. French-language applications are processed in the same manner as
                    English, and bilingual support is widely available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Programs Section */}
        <section id="programs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Major Quebec Small Business Grant Programs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Investissement Quebec SME Fund */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Investissement Québec SME Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Growth Capital</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Quebec&apos;s primary economic development agency offers comprehensive financing
                      solutions including loans, loan guarantees, and equity investments for SMEs.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Flexible loan structures</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Equity investment options</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Strategic advisory services</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quebec R&D Tax Credits */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Quebec R&D Tax Credits (37.5%)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>37.5% Credit</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Refundable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      One of North America&apos;s most generous R&D incentives. Quebec&apos;s refundable
                      tax credit can return up to 37.5% of eligible R&D salary expenditures.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Fully refundable for CCPCs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Stacks with federal SR&ED</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Combined rate can exceed 55%</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quebec Startup Fund */}
                <Card className="border-2 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Quebec Startup Fund (Fonds de démarrage)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$50K - $200K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-indigo-600 mr-2" />
                        <span><strong>Venture Capital</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Early-stage venture capital for innovative Quebec startups with high
                      growth potential. Includes mentorship and network access.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Seed and pre-seed funding</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Mentorship programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Follow-on investment options</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* PME MTL */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">PME MTL (Montreal Economic Development)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$5K - $50K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Montreal</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Montreal&apos;s network of economic development agencies offers grants,
                      technical assistance, and business support across all 19 boroughs.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Startup grants</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technical assistance</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Interest-free loans</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for Quebec Business Grants?</h2>

              <p className="text-gray-700 mb-6">
                Quebec business grants are available to for-profit enterprises operating within Quebec.
                Most programs require Quebec incorporation or significant provincial operations. R&D
                tax credits are available to any corporation conducting eligible R&D activities in Quebec.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Generally Eligible
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Incorporated in Quebec (provincially or federally registered)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>SMEs with significant Quebec operations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Businesses creating Quebec jobs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Companies with growth or export plans</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Good standing with Revenu Québec</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-700">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Generally Ineligible
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses without Quebec presence</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Projects completed before application</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses in tax arrears with Revenu Québec</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Real estate speculation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Retail without innovation component</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How Much Funding Section */}
        <section id="how-much" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Much Grant Funding Can Quebec Businesses Get?</h2>

              <p className="text-gray-700 mb-6">
                Quebec offers some of Canada&apos;s most generous funding levels. Grant amounts
                vary by program, but the province&apos;s R&D tax credits provide ongoing,
                substantial returns on innovation investments.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Typical Range</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">R&D Tax Credits</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">Up to 37.5%</td>
                      <td className="border border-gray-200 px-4 py-3">Of eligible salaries</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Investissement Québec</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$100K - $10M</td>
                      <td className="border border-gray-200 px-4 py-3">Loans/equity</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Startup Programs</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$50K - $200K</td>
                      <td className="border border-gray-200 px-4 py-3">Equity investment</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Municipal Programs (PME MTL)</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$5K - $50K</td>
                      <td className="border border-gray-200 px-4 py-3">Grants/loans</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> Quebec&apos;s R&D tax credit combined with federal SR&ED can
                  return over 55% of eligible R&D expenditures. This makes Quebec one of the most
                  attractive jurisdictions in North America for R&D-intensive companies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for Quebec Business Grants - Step by Step</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Research Programs (1-2 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Visit Investissement Québec&apos;s website, Quebec.ca business portal, and
                      municipal economic development offices. Many programs require pre-approval
                      before starting your project.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Initial Consultation</h3>
                    <p className="text-gray-600 mt-1">
                      Investissement Québec offers free business consultations. For R&D credits,
                      consult with a SR&ED specialist before year-end to ensure proper documentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Application (2-4 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Quebec applications typically require business plans, financial projections,
                      project descriptions, and impact assessments. French and English are accepted.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit & Due Diligence</h3>
                    <p className="text-gray-600 mt-1">
                      Submit applications through official portals. Larger projects undergo
                      financial and technical due diligence. Processing typically takes 45-90 days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="font-bold text-lg">Agreement & Disbursement</h3>
                    <p className="text-gray-600 mt-1">
                      Upon approval, sign a contribution agreement. Quebec typically uses
                      milestone-based or reimbursement funding models with regular reporting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section id="documents" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required for Quebec Grant Applications?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-2" />
                    Core Business Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>NEQ (Numéro d&apos;entreprise du Québec)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>2-3 years of audited financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Current year-to-date financials</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Shareholder/ownership documentation</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 text-indigo-600 mr-2" />
                    Project-Specific Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Detailed project plan with milestones</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Budget with vendor quotes</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Job creation projections</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Market analysis (for startups)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Long Does Quebec Grant Approval Take?</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Review Timeline</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">First Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">R&D Tax Credits</td>
                      <td className="border border-gray-200 px-4 py-3">60-90 days after filing</td>
                      <td className="border border-gray-200 px-4 py-3">With tax refund</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Investissement Québec</td>
                      <td className="border border-gray-200 px-4 py-3">45-90 days</td>
                      <td className="border border-gray-200 px-4 py-3">Upon closing</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Municipal Programs</td>
                      <td className="border border-gray-200 px-4 py-3">30-60 days</td>
                      <td className="border border-gray-200 px-4 py-3">Milestone basis</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> R&D tax credits are claimed with your annual corporate tax
                  return. To receive credits faster, plan your tax filing strategically and ensure
                  all documentation is complete.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid with Quebec Grant Applications</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Missing R&D Documentation</h3>
                        <p className="text-gray-600 mt-1">
                          Quebec&apos;s R&D credits require contemporaneous documentation of
                          technological uncertainties and systematic investigation. Retroactive
                          documentation often results in reduced claims or audits.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Starting Projects Before Approval</h3>
                        <p className="text-gray-600 mt-1">
                          Many Quebec grant programs require pre-approval before project
                          commencement. Costs incurred before approval are typically ineligible.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Underestimating Quebec Job Impact</h3>
                        <p className="text-gray-600 mt-1">
                          Quebec programs strongly favor job creation within the province.
                          Applications should clearly demonstrate how funding will lead to
                          high-quality Quebec employment.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Focus Section */}
        <section id="industries" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Industry-Specific Grants in Quebec</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Zap className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold mb-2">AI & Technology</h3>
                  <p className="text-sm text-gray-600">Montreal AI ecosystem, Scale AI, MILA partnerships</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Leaf className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold mb-2">Clean Technology</h3>
                  <p className="text-sm text-gray-600">Hydroelectricity, batteries, sustainable tech</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Building className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold mb-2">Aerospace</h3>
                  <p className="text-sm text-gray-600">Third-largest aerospace hub globally</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <TrendingUp className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-bold mb-2">Life Sciences</h3>
                  <p className="text-sm text-gray-600">Pharma, biotech, medical devices</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Users className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold mb-2">Video Games & VFX</h3>
                  <p className="text-sm text-gray-600">Major studios, strong tax credits</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Target className="w-8 h-8 text-cyan-600 mb-3" />
                  <h3 className="font-bold mb-2">Cultural Industries</h3>
                  <p className="text-sm text-gray-600">Film, music, publishing, media</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City-Specific Section */}
        <section id="cities" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Montreal & Quebec City Business Programs</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Montreal / Montréal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>PME MTL – 19 borough offices</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Montréal International – FDI support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Centech, District 3 – Accelerators</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>MILA – AI research partnerships</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quebec City / Ville de Québec</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Québec International – Regional development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>CDEC programs – Local grants</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Laval Technopole – Tech hub support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Alternatives Section */}
        <section id="alternatives" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Alternatives to Quebec Business Grants</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">Federal SR&ED</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Federal R&D tax credits stack with Quebec credits for combined returns
                    exceeding 55% of eligible expenditures.
                  </p>
                  <Link href="/blog/sred-scientific-research-experimental-development" className="text-blue-700 hover:underline text-sm">
                    Learn about SR&ED →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">CED-Q (Federal)</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Canada Economic Development for Quebec Regions offers federal funding
                    that complements provincial programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      Do I need to apply in French?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      No. Quebec government programs accept applications in both French and
                      English. However, some regional programs may have French preferences.
                      Bilingual support is widely available.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      How do Quebec R&D credits compare to other provinces?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Quebec offers some of Canada&apos;s highest R&D incentives. The 37.5%
                      provincial credit combines with federal SR&ED for returns exceeding
                      55%—significantly higher than most provinces.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                      Can startups from outside Quebec access these programs?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Most programs require Quebec incorporation or significant operations.
                      Relocating or establishing a Quebec presence can unlock these
                      incentives—consult with advisors about optimal structuring.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Resources</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">Federal Grants for Canadian Businesses</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">SR&ED Tax Credit Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/ontario-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">Ontario Business Grants</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600">All Grant Application Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Maximize Your Quebec Business Funding Success
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Our bilingual Quebec specialists have secured over $12M for local businesses.
                Get expert guidance on R&D credits, Investissement Québec, and startup funding.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Quebec Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Service en français et anglais</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>R&D tax credit optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Investissement Québec relationships</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Montreal & Quebec City offices</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>91% success rate for Quebec businesses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>SR&ED + provincial credit expertise</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=quebec-grants-expert-help">
                  Get Expert Help with Quebec Grants
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
                Consultation gratuite • Service en français • Spécialistes des subventions québécoises
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
