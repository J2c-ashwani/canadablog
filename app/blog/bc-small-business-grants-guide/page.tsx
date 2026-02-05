import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, Leaf, Mountain, Building, Users, Zap,
  Clock, AlertTriangle, FileText, HelpCircle, MapPin, Briefcase, ChevronRight,
  ExternalLink, BookOpen, TrendingUp
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BC Small Business Grants 2026 | $1.3B+ Complete Funding Guide",
  description: "Complete guide to BC small business grants. Access CleanBC Industry Fund, BC Innovation Council, Indigenous Business Investment, Venture Capital Tax Credit, and 40+ funding programs. Expert tips for successful applications.",
  keywords: "BC small business grants, British Columbia business funding, CleanBC Industry Fund, BC Innovation Council grants, Vancouver business grants, Victoria business grants, Indigenous business funding BC, clean technology grants BC",
}

export default function BCSmallBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-teal-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏔️ BC Business Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                BC Small Business Grants 2026
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Access $1.3B+ in British Columbia business funding. Complete guide covering CleanBC Industry Fund,
                BC Innovation Council, Indigenous Business programs, and 40+ active funding opportunities.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=bc-business-grants-expert-help">
                  Get Expert Help with BC Grants
                </Link>
              </Button>
              <p className="text-green-200 text-sm mt-4">
                Free consultation • 89% success rate • Clean tech specialists
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
                  <li><a href="#overview" className="text-green-700 hover:underline">1. BC Funding Overview</a></li>
                  <li><a href="#programs" className="text-green-700 hover:underline">2. Major Grant Programs</a></li>
                  <li><a href="#eligibility" className="text-green-700 hover:underline">3. Who is Eligible?</a></li>
                  <li><a href="#how-much" className="text-green-700 hover:underline">4. How Much Funding?</a></li>
                  <li><a href="#how-to-apply" className="text-green-700 hover:underline">5. How to Apply</a></li>
                  <li><a href="#documents" className="text-green-700 hover:underline">6. Required Documents</a></li>
                  <li><a href="#timeline" className="text-green-700 hover:underline">7. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-green-700 hover:underline">8. Common Mistakes</a></li>
                  <li><a href="#industries" className="text-green-700 hover:underline">9. Industry-Specific Grants</a></li>
                  <li><a href="#cities" className="text-green-700 hover:underline">10. Vancouver & Victoria Programs</a></li>
                  <li><a href="#alternatives" className="text-green-700 hover:underline">11. Alternatives to Grants</a></li>
                  <li><a href="#faqs" className="text-green-700 hover:underline">12. FAQs</a></li>
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
                  <div className="text-3xl font-bold text-green-600 mb-2">$1.3B+</div>
                  <div className="text-gray-600">Annual BC SME Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">40+</div>
                  <div className="text-gray-600">Active Provincial Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">20%</div>
                  <div className="text-gray-600">Average Approval Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">60-120</div>
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
              <h2 className="text-3xl font-bold mb-6">BC Business Funding Overview</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  British Columbia operates one of Canada&apos;s most sophisticated business funding ecosystems,
                  with over $1.3 billion available annually through provincial programs. BC&apos;s economic
                  development strategy emphasizes innovation, sustainability, and Indigenous economic reconciliation—
                  creating unique opportunities for businesses that align with these priorities.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  The BC Innovation Council (now Innovate BC) serves as the primary gateway for technology
                  and innovation funding, while the CleanBC initiative channels substantial resources toward
                  clean technology and emissions reduction projects. BC also leads Canada in Indigenous
                  business support, with dedicated programs for First Nations entrepreneurs and partnerships.
                </p>

                <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Insight:</strong> BC&apos;s grant programs strongly favor sustainability and
                    clean technology. Even if your business isn&apos;t directly in clean tech, highlighting
                    how your project reduces emissions, improves sustainability, or contributes to BC&apos;s
                    climate goals can significantly strengthen your application.
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
              <h2 className="text-3xl font-bold text-center mb-12">Major BC Small Business Grant Programs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* CleanBC Industry Fund */}
                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">CleanBC Industry Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$50K - $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Leaf className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Clean Tech</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      BC&apos;s flagship clean technology fund provides major funding for emissions reduction
                      and clean technology projects. Funded by industrial carbon pricing, this program
                      represents one of Canada&apos;s largest clean tech investments.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Emissions reduction projects</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Clean technology development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Industrial electrification</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Innovate BC Programs */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Innovate BC Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$10K - $300K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      BC&apos;s innovation agency offers multiple program streams including Ignite,
                      Venture Acceleration, and Industry Innovation. These programs support tech
                      companies from early-stage through commercialization.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Ignite Program: R&D support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Venture Acceleration: Scale-up support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Industry Innovation: Partnerships</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Indigenous Business Investment */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Indigenous Business Investment Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $2M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Mountain className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Indigenous Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      BC leads Canada in Indigenous economic development. Multiple programs support
                      First Nations-owned businesses, joint ventures, and Indigenous entrepreneurs
                      across all sectors.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Indigenous business development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Cultural tourism initiatives</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Community economic development</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* BC Small Business Venture Capital */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">BC Venture Capital Tax Credit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>30% Tax Credit</strong></span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Growth Capital</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      The BC Venture Capital Tax Credit provides 30% tax credits to investors
                      who invest in eligible small businesses. This incentivizes investment
                      in BC tech companies and startups.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>30% investor tax credit</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Eligible BC small businesses</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Register via SBVC Program</span>
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
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for BC Business Grants?</h2>

              <p className="text-gray-700 mb-6">
                BC business grants are available to for-profit enterprises operating within British Columbia.
                Eligibility varies by program, but most require BC incorporation or significant provincial
                operations. Indigenous programs have specific ownership requirements, while clean tech
                programs require demonstrable emissions reduction potential.
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
                        <span>Incorporated in BC or with significant BC operations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Small and medium enterprises (typically under 500 employees)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Businesses with growth, innovation, or sustainability plans</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Good standing with provincial and federal tax authorities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Projects with measurable economic or environmental impact</span>
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
                        <span>Businesses without BC operations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Projects completed before application</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses in tax arrears</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Real estate speculation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Retail or service without innovation component</span>
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
              <h2 className="text-3xl font-bold mb-6">How Much Grant Funding Can BC Businesses Get?</h2>

              <p className="text-gray-700 mb-6">
                BC grant amounts vary significantly by program. Clean technology projects can access
                multi-million dollar funding, while innovation and startup programs offer more modest
                amounts. Most programs use cost-sharing models requiring business co-investment.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Typical Range</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Cost Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Startup/Accelerator</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$10K - $75K</td>
                      <td className="border border-gray-200 px-4 py-3">50%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Innovation Programs</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$50K - $300K</td>
                      <td className="border border-gray-200 px-4 py-3">33-50%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Clean Technology</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$100K - $5M</td>
                      <td className="border border-gray-200 px-4 py-3">25-50%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Indigenous Business</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$50K - $2M</td>
                      <td className="border border-gray-200 px-4 py-3">Variable</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> BC businesses can stack provincial funding with federal
                  programs. PacifiCan (formerly Western Economic Diversification) offers federal
                  funding specifically for BC, while IRAP and SR&ED provide technology-focused support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for BC Business Grants - Step by Step</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Research Programs (1-2 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Visit Innovate BC, the CleanBC website, and BC&apos;s Small Business services
                      portal to identify relevant programs. For Indigenous businesses, check BC
                      Indigenous Business Support and NACCA member organizations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Pre-Application Consultation</h3>
                    <p className="text-gray-600 mt-1">
                      Most BC programs offer intake consultations. For CleanBC programs, connect
                      with the program team to discuss project eligibility. Innovate BC runs
                      regular intake sessions for their programs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Application (3-4 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      BC applications require comprehensive documentation including business plans,
                      project descriptions, financial projections, and impact assessments.
                      Clean tech projects need emissions reduction quantification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit & Review</h3>
                    <p className="text-gray-600 mt-1">
                      Submit through provincial portals. BC programs typically take 60-120 days
                      for review. Large CleanBC projects may involve technical assessments
                      and due diligence processes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="font-bold text-lg">Contribution Agreement</h3>
                    <p className="text-gray-600 mt-1">
                      Upon approval, sign a contribution agreement outlining terms, milestones,
                      and reporting requirements. BC typically uses milestone-based or
                      reimbursement funding models.
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
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required for BC Grant Applications?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-2" />
                    Core Business Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>BC corporate registration documents</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>2-3 years of audited financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Current year-to-date financials</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Shareholder/ownership documentation</span>
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
                      <span>Budget with vendor quotes</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Emissions assessment (CleanBC)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Letters of support from partners</span>
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
              <h2 className="text-3xl font-bold mb-6">How Long Does BC Grant Approval Take?</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Review Timeline</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">First Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Startup/Accelerator</td>
                      <td className="border border-gray-200 px-4 py-3">4-8 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Upon milestones</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Innovate BC</td>
                      <td className="border border-gray-200 px-4 py-3">60-90 days</td>
                      <td className="border border-gray-200 px-4 py-3">Milestone basis</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">CleanBC Industry</td>
                      <td className="border border-gray-200 px-4 py-3">90-180 days</td>
                      <td className="border border-gray-200 px-4 py-3">Reimbursement</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> BC programs often have competitive intake periods rather
                  than continuous intake. Check official program websites for current application
                  windows and deadlines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid with BC Grant Applications</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Ignoring the Sustainability Angle</h3>
                        <p className="text-gray-600 mt-1">
                          BC strongly prioritizes sustainability. Even non-clean tech applications
                          should highlight environmental benefits, emissions reduction potential,
                          or alignment with BC&apos;s climate goals.
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
                        <h3 className="font-bold text-lg">Weak Quantification for CleanBC</h3>
                        <p className="text-gray-600 mt-1">
                          CleanBC programs require specific emissions reduction projections.
                          Vague statements about &quot;being cleaner&quot; aren&apos;t sufficient—provide
                          tonnes of CO2e reduced with methodology.
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
                        <h3 className="font-bold text-lg">Missing Indigenous Partnership Opportunities</h3>
                        <p className="text-gray-600 mt-1">
                          BC values economic reconciliation. Projects with Indigenous partnerships,
                          even informal ones, often receive favorable consideration. Explore
                          partnership opportunities before applying.
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
              <h2 className="text-3xl font-bold mb-6">Industry-Specific Grants in BC</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Leaf className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold mb-2">Clean Technology</h3>
                  <p className="text-sm text-gray-600">CleanBC, hydrogen, carbon capture, electrification</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Zap className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold mb-2">Technology & Digital</h3>
                  <p className="text-sm text-gray-600">Software, VR/AR, gaming, fintech, AI</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Mountain className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold mb-2">Indigenous Business</h3>
                  <p className="text-sm text-gray-600">First Nations enterprises, cultural tourism</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold mb-2">Life Sciences</h3>
                  <p className="text-sm text-gray-600">Biotech, medical devices, health tech</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Building className="w-8 h-8 text-gray-600 mb-3" />
                  <h3 className="font-bold mb-2">Film & Creative</h3>
                  <p className="text-sm text-gray-600">Film production, animation, visual effects</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Users className="w-8 h-8 text-cyan-600 mb-3" />
                  <h3 className="font-bold mb-2">Tourism</h3>
                  <p className="text-sm text-gray-600">Sustainable tourism, outdoor recreation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City-Specific Section */}
        <section id="cities" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Vancouver & Victoria Business Programs</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vancouver Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Vancouver Economic Commission – Business support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Spring Accelerator – Startup programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Foresight CAC – Clean tech accelerator</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Victoria & Island Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>South Island Prosperity Partnership</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>VIATEC – Tech association programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>UVic Innovation – Commercialization support</span>
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
              <h2 className="text-3xl font-bold mb-6">Alternatives to BC Business Grants</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">SR&ED Tax Credits</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Federal R&D credits provide 35-64% return on eligible costs. BC offers a
                    10% provincial top-up through the BC SR&ED Tax Credit for qualifying activities.
                  </p>
                  <Link href="/blog/sred-scientific-research-experimental-development" className="text-green-700 hover:underline text-sm">
                    Learn about SR&ED →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">PacifiCan (Federal)</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Federal regional development agency for BC. Offers substantial funding for
                    innovation, economic development, and community projects.
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
                      <HelpCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      Are BC business grants taxable?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Yes, most grants are taxable income. Consult with a tax professional
                      familiar with BC business incentives.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      Can startups apply for BC grants?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Yes, Innovate BC and accelerator programs specifically target early-stage
                      companies. Pre-revenue companies need to demonstrate technical capability
                      and market opportunity.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      How competitive are BC business grants?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      BC is competitive due to its strong tech ecosystem. Approval rates
                      average 15-25%, but well-prepared applications in priority sectors
                      (clean tech, Indigenous business) often see higher success rates.
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
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-green-600">Federal Grants for Canadian Businesses</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center p-4 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-green-600">SR&ED Tax Credit Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/alberta-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-green-600">Alberta Business Grants</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-green-600">All Grant Application Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-teal-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Access BC&apos;s $1.3B+ in Business Funding?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Our BC specialists have secured over $9M for local businesses. Get expert guidance
                on CleanBC, Innovate BC, Indigenous business programs, and more.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our BC Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Free eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Clean technology funding expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Indigenous business program guidance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Innovate BC relationships</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Vancouver and Victoria offices</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>89% success rate for BC businesses</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=bc-grants-expert-help">
                  Get Expert Help with BC Grants
                </Link>
              </Button>
              <p className="text-green-200 text-sm mt-4">
                Free consultation • Clean tech specialists • Local BC expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
