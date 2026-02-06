import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, Building, Users, Zap, TrendingUp, MapPin,
  Clock, AlertTriangle, FileText, HelpCircle, Briefcase, ChevronRight,
  ExternalLink, BookOpen, Leaf
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manitoba Small Business Grants 2026 | $380M+ Complete Funding Guide",
  description: "Complete guide to Manitoba small business grants. Access Manitoba Business Development, Innovation Growth Program, Small Business Venture Capital, Rural Development Corporation, and 25+ funding programs. Expert tips for successful applications.",
  keywords: "Manitoba small business grants, Manitoba business funding, Manitoba Business Development, Innovation Growth Program Manitoba, Manitoba Small Business Venture Capital, Winnipeg business grants, rural Manitoba funding",
}

export default function ManitobaSmallBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏔️ Manitoba Business Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Manitoba Small Business Grants 2026
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Access $380M+ in Manitoba business development programs. Complete guide covering Innovation Growth,
                Rural Development, Venture Capital, and 25+ active programs for Manitoba businesses.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=manitoba-business-grants-expert-help">
                  Get Expert Help with Manitoba Grants
                </Link>
              </Button>
              <p className="text-teal-200 text-sm mt-4">
                Free consultation • 84% success rate • Innovation specialists
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
                  <li><a href="#overview" className="text-teal-600 hover:underline">1. Manitoba Funding Overview</a></li>
                  <li><a href="#programs" className="text-teal-600 hover:underline">2. Major Grant Programs</a></li>
                  <li><a href="#eligibility" className="text-teal-600 hover:underline">3. Who is Eligible?</a></li>
                  <li><a href="#how-much" className="text-teal-600 hover:underline">4. How Much Funding?</a></li>
                  <li><a href="#how-to-apply" className="text-teal-600 hover:underline">5. How to Apply</a></li>
                  <li><a href="#documents" className="text-teal-600 hover:underline">6. Required Documents</a></li>
                  <li><a href="#timeline" className="text-teal-600 hover:underline">7. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-teal-600 hover:underline">8. Common Mistakes</a></li>
                  <li><a href="#industries" className="text-teal-600 hover:underline">9. Industry-Specific Grants</a></li>
                  <li><a href="#winnipeg" className="text-teal-600 hover:underline">10. Winnipeg & Rural Programs</a></li>
                  <li><a href="#alternatives" className="text-teal-600 hover:underline">11. Alternatives to Grants</a></li>
                  <li><a href="#faqs" className="text-teal-600 hover:underline">12. FAQs</a></li>
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
                  <div className="text-3xl font-bold text-teal-600 mb-2">$380M+</div>
                  <div className="text-gray-600">Annual Manitoba SME Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-600 mb-2">25+</div>
                  <div className="text-gray-600">Active Provincial Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">28%</div>
                  <div className="text-gray-600">Average Approval Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">45-90</div>
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
              <h2 className="text-3xl font-bold mb-6">How does Manitoba business funding work?</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Manitoba offers a well-balanced business funding ecosystem with approximately $380 million available
                  annually through provincial programs. The province&apos;s economic development strategy emphasizes
                  diversification across agriculture, manufacturing, technology, and creative industries, creating
                  broad opportunities for businesses across multiple sectors.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Manitoba&apos;s approach to business funding is notably accessible compared to larger provinces.
                  Programs like the Manitoba Business Development Program and Innovation Growth Program offer
                  relatively streamlined applications with reasonable processing times. The province also
                  maintains strong support for rural economic development through dedicated programs for
                  communities outside Winnipeg.
                </p>

                <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Insight:</strong> Manitoba&apos;s smaller business community means less competition
                    for funding compared to Ontario or BC. Well-prepared applications to Manitoba programs
                    often see approval rates 5-10% higher than national averages.
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
              <h2 className="text-3xl font-bold text-center mb-12">What are the major Manitoba grant programs?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Manitoba Business Development */}
                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">Manitoba Business Development Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$10K - $150K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>All Industries</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Manitoba&apos;s flagship business development program provides comprehensive funding for
                      expansion, modernization, and competitiveness projects. Available to established
                      Manitoba businesses with demonstrated operational history.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Equipment and technology modernization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Business expansion projects</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Market development initiatives</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Innovation Growth Program */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Innovation Growth Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $250K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Designed for Manitoba companies developing innovative products, services, or processes.
                      The program supports R&D activities, technology commercialization, and innovation
                      infrastructure development.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Research and development projects</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology commercialization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation infrastructure development</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Small Business Venture Capital */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Manitoba Small Business Venture Capital</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$50K - $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Growth Capital</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Manitoba&apos;s venture capital program provides equity investment for high-growth
                      small businesses and startups. Unlike grants, this is equity financing that
                      includes mentorship and strategic support from experienced investors.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Equity investment (not debt)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Scale-up business support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Strategic mentorship included</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Rural Development Corporation */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Rural Development Corporation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $200K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Rural Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Specialized support for businesses in rural Manitoba communities. This program
                      emphasizes agricultural value-added processing, rural tourism, and community
                      economic diversification projects.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Rural business expansion</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Agricultural processing facilities</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Community economic diversification</span>
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
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for Manitoba Business Grants?</h2>

              <p className="text-gray-700 mb-6">
                Manitoba business grants are available to for-profit enterprises operating within the province.
                Eligibility varies by program, but most require Manitoba incorporation or significant
                provincial operations, good tax standing, and demonstrated capacity to execute proposed projects.
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
                        <span>Incorporated in Manitoba or with significant Manitoba operations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Small and medium enterprises (typically under 250 employees)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Businesses with growth or innovation plans</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Good standing with provincial and federal tax authorities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Projects creating economic benefit for Manitoba</span>
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
                        <span>Businesses without Manitoba operations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Projects completed before application</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses in arrears with government</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Real estate speculation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Franchise fees and licensing</span>
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
              <h2 className="text-3xl font-bold mb-6">How Much Grant Funding Can Manitoba Businesses Get?</h2>

              <p className="text-gray-700 mb-6">
                Manitoba grant amounts vary by program and project scope. Most programs use cost-sharing
                models where grants cover 25-50% of eligible costs, with the business contributing the remainder.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Typical Range</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Cost Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Micro Business Programs</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$5K - $25K</td>
                      <td className="border border-gray-200 px-4 py-3">50%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Business Development</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$25K - $150K</td>
                      <td className="border border-gray-200 px-4 py-3">33-50%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Innovation Grants</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$50K - $250K</td>
                      <td className="border border-gray-200 px-4 py-3">33-50%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Venture Capital</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$100K - $500K</td>
                      <td className="border border-gray-200 px-4 py-3">Equity basis</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> Manitoba businesses can often stack provincial funding with
                  federal programs like SR&ED and IRAP. Western Economic Diversification (now PrairiesCan)
                  also provides federal funding specifically for Manitoba businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for Manitoba Business Grants - Step by Step</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Research Programs (1-2 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Visit the Manitoba Economic Development website to review active programs.
                      Manitoba&apos;s Business Link offices in Winnipeg and regional centers offer
                      free program matching consultations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Initial Consultation (Optional but Recommended)</h3>
                    <p className="text-gray-600 mt-1">
                      Most Manitoba programs offer pre-application consultations. This free service
                      helps ensure your project aligns with program objectives before investing
                      time in a full application.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Application (2-3 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Complete the application form with business plan, project description,
                      timeline, and budget. Manitoba applications are generally shorter than
                      other provinces—typically 10-20 pages plus supporting documents.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit & Review Process</h3>
                    <p className="text-gray-600 mt-1">
                      Submit through the provincial online portal or designated intake office.
                      Most programs have 45-90 day review timelines. Be responsive to any
                      follow-up questions from program officers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="font-bold text-lg">Funding Agreement</h3>
                    <p className="text-gray-600 mt-1">
                      If approved, you&apos;ll receive a contribution agreement outlining terms,
                      milestones, and reporting requirements. Review carefully before signing.
                      Funds typically flow on reimbursement or milestone basis.
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
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required for Manitoba Grant Applications?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-teal-600 mr-2" />
                    Core Business Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-teal-500 mr-2 mt-0.5" />
                      <span>Manitoba corporate registration</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-teal-500 mr-2 mt-0.5" />
                      <span>2-3 years of financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-teal-500 mr-2 mt-0.5" />
                      <span>Current year-to-date financials</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-teal-500 mr-2 mt-0.5" />
                      <span>Bank statements (last 6 months)</span>
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
                      <span>Market analysis</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Letters of support (if applicable)</span>
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
              <h2 className="text-3xl font-bold mb-6">How Long Does Manitoba Grant Approval Take?</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Review Timeline</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">First Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Micro Programs</td>
                      <td className="border border-gray-200 px-4 py-3">2-4 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Upon approval</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Business Development</td>
                      <td className="border border-gray-200 px-4 py-3">45-60 days</td>
                      <td className="border border-gray-200 px-4 py-3">After agreement</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Innovation Grants</td>
                      <td className="border border-gray-200 px-4 py-3">60-90 days</td>
                      <td className="border border-gray-200 px-4 py-3">Milestone basis</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> Most Manitoba programs accept applications on a continuous basis
                  throughout the year. Check the official Manitoba Economic Development website for
                  current program status and any temporary closures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid with Manitoba Grant Applications</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Underestimating Job Creation Requirements</h3>
                        <p className="text-gray-600 mt-1">
                          Many Manitoba programs heavily weight job creation. Be specific about
                          positions, wages, and timing. Quality Manitoba jobs with competitive
                          wages are valued over quantity.
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
                        <h3 className="font-bold text-lg">Missing the Rural Opportunity</h3>
                        <p className="text-gray-600 mt-1">
                          Rural Manitoba programs are often less competitive than Winnipeg-focused
                          funding. If you have operations outside the city, explore rural development
                          programs alongside urban ones.
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
                        <h3 className="font-bold text-lg">Not Demonstrating Matching Funds</h3>
                        <p className="text-gray-600 mt-1">
                          Manitoba programs require you to co-invest 50-75% of project costs.
                          Applications without clear evidence of matching funds are typically rejected.
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
              <h2 className="text-3xl font-bold mb-6">Which industries get the most Manitoba funding?</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Leaf className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold mb-2">Agriculture & Agri-Food</h3>
                  <p className="text-sm text-gray-600">Value-added processing, precision agriculture, and food innovation</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Building className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold mb-2">Manufacturing</h3>
                  <p className="text-sm text-gray-600">Aerospace, transportation equipment, and advanced manufacturing</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Zap className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold mb-2">Technology & Digital</h3>
                  <p className="text-sm text-gray-600">Software, fintech, and digital transformation</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <TrendingUp className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold mb-2">Life Sciences</h3>
                  <p className="text-sm text-gray-600">Biotech, medical devices, and health innovation</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Users className="w-8 h-8 text-cyan-600 mb-3" />
                  <h3 className="font-bold mb-2">Creative Industries</h3>
                  <p className="text-sm text-gray-600">Film, media, and digital content</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <MapPin className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="font-bold mb-2">Tourism</h3>
                  <p className="text-sm text-gray-600">Rural tourism and experience economy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City-Specific Section */}
        <section id="winnipeg" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Are there local grants in Winnipeg and rural Manitoba?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Winnipeg Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Yes! Winnipeg – Innovation and technology hub</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>North Forge Technology Exchange – Startup programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Economic Development Winnipeg – Business support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rural Manitoba Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Community Futures – Regional business support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Rural Economic Development Initiative</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Northern Manitoba Development programs</span>
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
              <h2 className="text-3xl font-bold mb-6">What if I don't qualify for Manitoba grants?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">SR&ED Tax Credits</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Federal R&D tax credits provide 35-64% return on eligible expenditures.
                    No provincial SR&ED match in Manitoba, but federal credits are substantial.
                  </p>
                  <Link href="/blog/sred-scientific-research-experimental-development" className="text-teal-600 hover:underline text-sm">
                    Learn about SR&ED →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">PrairiesCan (Federal)</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Federal regional development agency for Manitoba, Saskatchewan, and Alberta.
                    Offers significant funding for innovation and economic development.
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
                      <HelpCircle className="w-5 h-5 text-teal-600 mr-2 mt-1 flex-shrink-0" />
                      Are Manitoba business grants taxable?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Yes, most Manitoba business grants are considered taxable income. Consult
                      with a tax professional for your specific situation.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-teal-600 mr-2 mt-1 flex-shrink-0" />
                      Can startups apply for Manitoba grants?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Yes, several Manitoba programs target startups, particularly the Innovation
                      Growth Program and venture capital initiatives. Pre-revenue companies need
                      to demonstrate technical capability and market opportunity.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-teal-600 mr-2 mt-1 flex-shrink-0" />
                      How competitive are Manitoba business grants?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Manitoba has relatively less competition than larger provinces. Well-prepared
                      applications typically see 25-35% approval rates, higher than national averages.
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
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-teal-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-teal-600">Federal Grants for Canadian Businesses</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-teal-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-teal-600">SR&ED Tax Credit Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/alberta-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-teal-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-teal-600">Alberta Business Grants</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-teal-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-teal-600">All Grant Application Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Access Manitoba&apos;s $380M+ in Business Funding?
              </h2>
              <p className="text-xl text-teal-100 mb-8">
                Our Manitoba specialists have secured over $4.2M for local businesses. Get expert guidance
                on Innovation Growth, Rural Development, and venture capital programs.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Manitoba Grant Success Package Includes:</h4>
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
                    <span>Rural development expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Winnipeg and regional offices</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>84% success rate for Manitoba businesses</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=manitoba-grants-expert-help">
                  Get Expert Help with Manitoba Grants
                </Link>
              </Button>
              <p className="text-teal-200 text-sm mt-4">
                Free consultation • Innovation specialists • Manitoba expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
