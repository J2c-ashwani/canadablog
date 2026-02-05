import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, Zap, Building, Users, Leaf,
  Clock, AlertTriangle, FileText, HelpCircle, TrendingUp, MapPin,
  Briefcase, ChevronRight, ExternalLink, BookOpen
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alberta Small Business Grants 2026 | $980M+ Complete Funding Guide",
  description: "Complete guide to Alberta small business grants and funding programs. Access Alberta Innovates, Technology Innovation Fund, Rural Economic Development, and Energy Diversification grants. Expert tips for successful applications.",
  keywords: "Alberta small business grants, Alberta business funding, Alberta Innovates grants, Technology Innovation Fund Alberta, Rural Economic Development Alberta, Energy Diversification Program, Calgary business grants, Edmonton business grants",
}

export default function AlbertaSmallBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏔️ Alberta Business Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Alberta Small Business Grants 2026
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Access $980M+ in Alberta government funding. Complete guide covering Technology Innovation,
                Energy Diversification, Rural Development, and 35+ active programs for Alberta businesses.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=alberta-business-grants-expert-help">
                  Get Expert Help with Alberta Grants
                </Link>
              </Button>
              <p className="text-orange-200 text-sm mt-4">
                Free consultation • 85% success rate • Energy sector specialists
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-orange-600 hover:underline">1. Alberta Funding Overview</a></li>
                  <li><a href="#programs" className="text-orange-600 hover:underline">2. Major Grant Programs</a></li>
                  <li><a href="#eligibility" className="text-orange-600 hover:underline">3. Who is Eligible?</a></li>
                  <li><a href="#how-much" className="text-orange-600 hover:underline">4. How Much Funding?</a></li>
                  <li><a href="#how-to-apply" className="text-orange-600 hover:underline">5. How to Apply</a></li>
                  <li><a href="#documents" className="text-orange-600 hover:underline">6. Required Documents</a></li>
                  <li><a href="#timeline" className="text-orange-600 hover:underline">7. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-orange-600 hover:underline">8. Common Mistakes</a></li>
                  <li><a href="#industries" className="text-orange-600 hover:underline">9. Industry-Specific Grants</a></li>
                  <li><a href="#cities" className="text-orange-600 hover:underline">10. Calgary & Edmonton Programs</a></li>
                  <li><a href="#alternatives" className="text-orange-600 hover:underline">11. Alternatives to Grants</a></li>
                  <li><a href="#faqs" className="text-orange-600 hover:underline">12. FAQs</a></li>
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
                  <div className="text-3xl font-bold text-orange-600 mb-2">$980M+</div>
                  <div className="text-gray-600">Annual Alberta SME Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">35+</div>
                  <div className="text-gray-600">Active Provincial Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">22%</div>
                  <div className="text-gray-600">Average Approval Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">60-120</div>
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
              <h2 className="text-3xl font-bold mb-6">Alberta Business Funding Overview</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Alberta operates one of Canada&apos;s most robust business funding ecosystems, with over $980 million available annually
                  through provincial programs. The province&apos;s economic development strategy emphasizes diversification beyond
                  traditional energy sectors, creating unique opportunities for businesses in technology, clean energy, agriculture,
                  and advanced manufacturing.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Alberta Innovates serves as the primary gateway for innovation-focused funding, while Alberta Enterprise Corporation
                  manages venture capital and growth equity investments. Regional agencies including Community Futures and various
                  municipal economic development offices provide additional funding streams, particularly for rural and Indigenous
                  businesses.
                </p>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Insight:</strong> Alberta&apos;s grant programs heavily favor projects that contribute to economic
                    diversification, particularly those that leverage the province&apos;s existing energy expertise for clean
                    technology applications. Businesses with energy transition or carbon reduction components often receive
                    priority consideration.
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
              <h2 className="text-3xl font-bold text-center mb-12">Major Alberta Small Business Grant Programs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Alberta Innovates */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Alberta Innovates Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$5K - $2M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Innovation Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Alberta Innovates is the province&apos;s primary innovation agency, offering multiple funding streams
                      from early-stage R&D to commercialization. Programs include Innovate Canada partnerships, Voucher
                      Programs for SMEs, and specialized sector-specific initiatives.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Voucher Program: $10K-$100K for SME innovation projects</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Product Development: $50K-$500K for prototypes</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Commercialization: Up to $2M for market-ready products</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Technology Innovation Fund */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Technology Innovation Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $2M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Tech Scale-up</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Designed for Alberta technology companies ready to scale, this fund supports commercialization
                      activities including product development, market expansion, and IP protection. The fund favors
                      businesses with demonstrated market traction.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology development and R&D enhancement</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Market commercialization support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Intellectual property development</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Rural Economic Development */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Rural Economic Development Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Rural Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      This program supports businesses in Alberta communities outside Calgary and Edmonton. Eligible
                      projects include agricultural value-added processing, tourism development, and community
                      economic diversification initiatives.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Rural community business expansion</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Agricultural processing facilities</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Tourism and hospitality development</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Energy Diversification */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Energy Diversification Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Leaf className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Energy Transition</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Major funding for projects that diversify Alberta&apos;s energy sector. Priority given to clean
                      technology, hydrogen development, carbon capture, and petrochemical value-added projects.
                      This is one of Canada&apos;s largest provincial clean energy funds.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Clean energy technology commercialization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Hydrogen and carbon capture projects</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Petrochemical diversification</span>
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
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for Alberta Business Grants?</h2>

              <p className="text-gray-700 mb-6">
                Alberta business grants are available to for-profit businesses that operate and create economic benefit
                within the province. Eligibility varies by program, but most share common requirements centered on
                Alberta residency, business registration, and demonstrated capacity to execute proposed projects.
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
                        <span>Incorporated in Alberta or with significant Alberta operations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Small and medium enterprises (typically under 500 employees)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Businesses with clear growth or innovation plans</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Good standing with provincial and federal tax authorities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Projects with demonstrable economic impact for Alberta</span>
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
                        <span>Businesses without Alberta incorporation or significant operations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Projects already completed before application</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses in arrears with government obligations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Real estate development or speculation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Franchise fees and licensing costs</span>
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
              <h2 className="text-3xl font-bold mb-6">How Much Grant Funding Can Alberta Businesses Get?</h2>

              <p className="text-gray-700 mb-6">
                Alberta grant amounts vary widely depending on program type, business size, and project scope.
                Most programs use a cost-sharing model where grants cover 25-75% of eligible project costs,
                with the business contributing the remainder.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Typical Range</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Cost Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Voucher Programs</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$10K - $100K</td>
                      <td className="border border-gray-200 px-4 py-3">50-75%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Innovation Grants</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$50K - $500K</td>
                      <td className="border border-gray-200 px-4 py-3">33-50%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Commercialization Funds</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$100K - $2M</td>
                      <td className="border border-gray-200 px-4 py-3">25-50%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Energy Diversification</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$500K - $10M+</td>
                      <td className="border border-gray-200 px-4 py-3">25-40%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> Many Alberta businesses successfully stack provincial grants with federal
                  programs like SR&ED, IRAP, and SDTC. This approach can cover 60-80% of eligible project costs
                  when strategically combined.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for Alberta Business Grants - Step by Step</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Research & Program Selection (1-2 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Identify programs aligned with your project. Alberta Innovates website lists all active programs
                      with eligibility criteria. Consider consulting with Alberta&apos;s Business Link or regional
                      economic development offices for program matching.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Expression of Interest (if required)</h3>
                    <p className="text-gray-600 mt-1">
                      Many Alberta programs require an initial Expression of Interest (EOI) before full application.
                      This brief submission (typically 2-3 pages) outlines your project concept and business background.
                      EOI review takes approximately 2-4 weeks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Full Application (2-4 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Develop comprehensive application including business plan, project description, timeline,
                      budget with quotes, and impact projections. Most applications require 15-30 pages plus
                      supporting documents.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit & Interview Process</h3>
                    <p className="text-gray-600 mt-1">
                      Submit through the designated portal (usually Alberta Innovates online system).
                      Larger grants typically require an in-person or virtual presentation to the review committee.
                      Prepare for technical and business model questions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="font-bold text-lg">Award & Contribution Agreement</h3>
                    <p className="text-gray-600 mt-1">
                      If approved, you&apos;ll receive a contribution agreement outlining funding terms, milestones,
                      reporting requirements, and eligible expenses. Review carefully before signing—terms are
                      legally binding. Funds typically flow on a reimbursement or milestone basis.
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
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required for Alberta Grant Applications?</h2>

              <p className="text-gray-700 mb-6">
                Alberta grant applications require comprehensive documentation. Preparing these materials in advance
                significantly speeds up the application process and improves your chances of success.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-orange-600 mr-2" />
                    Core Business Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Alberta corporate registration documents</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Most recent 2-3 years of financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Current year-to-date financials</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Bank statements (last 6 months)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Shareholder agreement (if applicable)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                    Project-Specific Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Detailed project plan with milestones</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Itemized budget with vendor quotes</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Technical specifications (for R&D projects)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Market analysis and competitive assessment</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Letters of support from partners/customers</span>
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
              <h2 className="text-3xl font-bold mb-6">How Long Does Alberta Grant Approval Take?</h2>

              <p className="text-gray-700 mb-6">
                Alberta grant processing times vary by program complexity and funding amount. Most programs
                operate on continuous intake rather than fixed deadlines, though some have specific competition periods.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Review Timeline</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">First Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Voucher Programs</td>
                      <td className="border border-gray-200 px-4 py-3">2-4 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Upon milestone completion</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Standard Grants</td>
                      <td className="border border-gray-200 px-4 py-3">60-90 days</td>
                      <td className="border border-gray-200 px-4 py-3">30 days after agreement</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Large-Scale Programs</td>
                      <td className="border border-gray-200 px-4 py-3">90-180 days</td>
                      <td className="border border-gray-200 px-4 py-3">Project commencement</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Important:</strong> Alberta programs typically operate on continuous intake throughout the year.
                  Check the official Alberta Innovates website for current program status and any temporary closures
                  or funding cycle updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid with Alberta Grant Applications</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Weak Economic Impact Narrative</h3>
                        <p className="text-gray-600 mt-1">
                          Alberta reviewers heavily weight economic benefit to the province. Vague statements like
                          &quot;we&apos;ll create jobs&quot; aren&apos;t sufficient. Quantify Alberta jobs created, tax
                          revenue generated, and local supply chain benefits.
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
                        <h3 className="font-bold text-lg">Starting Work Before Approval</h3>
                        <p className="text-gray-600 mt-1">
                          Expenses incurred before your contribution agreement is signed are almost never eligible.
                          Wait for formal approval before purchasing equipment, hiring, or contracting services.
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
                        <h3 className="font-bold text-lg">Ignoring the Energy Transition Angle</h3>
                        <p className="text-gray-600 mt-1">
                          Alberta prioritizes economic diversification. Even if your business isn&apos;t directly
                          in clean energy, highlighting how your project contributes to diversification,
                          reduces emissions, or leverages energy sector expertise can strengthen your application.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Not Demonstrating Matching Funds</h3>
                        <p className="text-gray-600 mt-1">
                          Most Alberta grants require you to co-invest 25-75% of project costs. Applications
                          without clear evidence of matching funds (bank statements, investor letters, or
                          credit facilities) are typically rejected.
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
              <h2 className="text-3xl font-bold mb-6">Industry-Specific Grants in Alberta</h2>

              <p className="text-gray-700 mb-6">
                Alberta offers specialized funding streams for priority sectors. These industry-specific
                programs often have higher approval rates because they attract fewer, more targeted applicants.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Leaf className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold mb-2">Clean Technology</h3>
                  <p className="text-sm text-gray-600">$200M+ annual funding for clean energy, carbon capture, and hydrogen projects</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Building className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold mb-2">Advanced Manufacturing</h3>
                  <p className="text-sm text-gray-600">Automation, Industry 4.0, and petrochemical value-add projects</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold mb-2">Digital Technology</h3>
                  <p className="text-sm text-gray-600">AI, fintech, and digital transformation initiatives</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Users className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold mb-2">Agriculture & Agri-Food</h3>
                  <p className="text-sm text-gray-600">Value-added processing, precision agriculture, food innovation</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Zap className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="font-bold mb-2">Life Sciences</h3>
                  <p className="text-sm text-gray-600">Biotech, medical devices, and health innovation</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <MapPin className="w-8 h-8 text-cyan-600 mb-3" />
                  <h3 className="font-bold mb-2">Tourism & Hospitality</h3>
                  <p className="text-sm text-gray-600">Rural tourism development and experience economy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City-Specific Section */}
        <section id="cities" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Calgary & Edmonton Business Grant Programs</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Calgary Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Calgary Economic Development – Business expansion support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Platform Calgary – Startup accelerator programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Innovate Calgary – Technology commercialization</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Community Futures – Small business loans and support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Edmonton Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Edmonton Global – International business development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Startup Edmonton – Tech ecosystem programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>TEC Edmonton – University-industry collaboration</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Edmonton Chamber – Business development resources</span>
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
              <h2 className="text-3xl font-bold mb-6">Alternatives to Alberta Business Grants</h2>

              <p className="text-gray-700 mb-6">
                If grant programs don&apos;t align with your business needs or timeline, Alberta offers
                several alternative funding mechanisms that may be more appropriate.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">SR&ED Tax Credits</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Federal Scientific Research and Experimental Development credits provide 35-64%
                    return on R&D expenditures. Alberta has no provincial SR&ED match, but federal
                    credits are substantial.
                  </p>
                  <Link href="/blog/sred-scientific-research-experimental-development" className="text-orange-600 hover:underline text-sm">
                    Learn about SR&ED →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">Federal IRAP Program</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    NRC-IRAP provides non-repayable contributions for R&D, technical advisory services,
                    and connections to innovation partners. Often stackable with provincial funding.
                  </p>
                  <Link href="/blog/irap-industrial-research-assistance-program" className="text-orange-600 hover:underline text-sm">
                    Learn about IRAP →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">Alberta Enterprise Corporation</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    AEC invests in venture capital funds that support Alberta technology companies.
                    Less direct than grants but provides access to patient capital.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">Community Futures Loans</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Low-interest loans for rural Alberta businesses, often with flexible terms.
                    More accessible than grants with faster approval timelines.
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
                      <HelpCircle className="w-5 h-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                      Are Alberta business grants taxable?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Yes, most Alberta business grants are considered taxable income by the CRA. However,
                      if grant funds are used for depreciable assets or deductible expenses, the net tax
                      impact may be minimal. Consult with a tax professional familiar with Alberta
                      business incentives.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                      Can startups with no revenue apply for Alberta grants?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Yes, several Alberta programs specifically target pre-revenue startups, particularly
                      Alberta Innovates Voucher programs and accelerator-linked funding. However, you&apos;ll
                      need to demonstrate technical capability, market opportunity, and a clear path to revenue.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                      How competitive are Alberta business grants?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Competition varies by program. Voucher programs have 30-50% approval rates for
                      well-prepared applications. Larger innovation grants are more competitive at
                      15-25% approval rates. Energy diversification programs are highly competitive
                      but offer larger awards.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                      Can I apply for multiple Alberta grants simultaneously?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Yes, but you must disclose all applications and cannot receive duplicate funding
                      for the same expense. Many businesses successfully combine multiple Alberta programs
                      or stack provincial with federal funding (IRAP, SR&ED). Program officers can advise
                      on complementary funding strategies.
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
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-orange-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-orange-600">Federal Grants for Canadian Businesses</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center p-4 bg-white rounded-lg border hover:border-orange-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-orange-600">SR&ED Tax Credit Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-orange-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-orange-600">IRAP Program Overview</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-orange-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-orange-600">All Grant Application Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Access Alberta's $980M+ in Business Funding?
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Our Alberta specialists have secured over $7M for local businesses. Get expert guidance
                on navigating Alberta Innovates, energy diversification programs, and rural development funding.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Alberta Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Free eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Program matching service</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Application preparation support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Energy sector expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Calgary and Edmonton local teams</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>85% success rate for Alberta businesses</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=alberta-grants-expert-help">
                  Get Expert Help with Alberta Grants
                </Link>
              </Button>
              <p className="text-orange-200 text-sm mt-4">
                Free consultation • Energy sector specialists • Local Alberta expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
