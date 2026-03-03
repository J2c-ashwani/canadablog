import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, Wheat, Building, Users, Zap, TrendingUp,
  Clock, AlertTriangle, FileText, HelpCircle, MapPin, Briefcase, ChevronRight,
  ExternalLink, BookOpen, Leaf
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Saskatchewan Small Business Grants 2026 | $425M+ Complete Funding Guide",
  description: "Complete guide to Saskatchewan small business grants. Access Innovation Saskatchewan, Agriculture Value-Added Fund, Export Development, Mining Innovation programs, and 30+ funding opportunities. Expert tips for successful applications.",
  keywords: "Saskatchewan small business grants, Saskatchewan business funding, Innovation Saskatchewan, Agriculture Value-Added Fund, Export Development Saskatchewan, Saskatoon business grants, Regina business grants, potash industry funding",
}

export default function SaskatchewanSmallBusinessGrantsGuide() {
  const faqData = [
    {
      question: "Are Saskatchewan business grants taxable?",
      answer: "Yes, most grants are taxable income. Consult with a tax professional familiar with Saskatchewan business incentives."
    },
    {
      question: "Can startups apply for Saskatchewan grants?",
      answer: "Yes, Innovation Saskatchewan and accelerator programs specifically target early-stage companies. Agricultural grants typically require more established operations."
    },
    {
      question: "How competitive are Saskatchewan business grants?",
      answer: "Saskatchewan has less competition than larger provinces. Well-prepared applications in priority sectors see 30-40% approval rates—above national averages."
    }
  ]

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
  }

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-yellow-600 to-amber-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🌾 Saskatchewan Business Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Saskatchewan Small Business Grants 2026
              </h1>
              <p className="text-xl text-yellow-100 mb-8">
                Access $425M+ in Saskatchewan business development programs. Complete guide covering Agriculture
                Value-Added, Innovation Saskatchewan, Export Development, and 30+ active programs.
              </p>
              <Button size="lg" className="bg-white hover:bg-gray-100 text-yellow-700 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=saskatchewan-business-grants-expert-help">
                  Get Expert Help with Saskatchewan Grants
                </Link>
              </Button>
              <p className="text-yellow-200 text-sm mt-4">
                Free consultation • 86% success rate • Agriculture specialists
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
                  <li><a href="#overview" className="text-yellow-700 hover:underline">1. Saskatchewan Funding Overview</a></li>
                  <li><a href="#programs" className="text-yellow-700 hover:underline">2. Major Grant Programs</a></li>
                  <li><a href="#eligibility" className="text-yellow-700 hover:underline">3. Who is Eligible?</a></li>
                  <li><a href="#how-much" className="text-yellow-700 hover:underline">4. How Much Funding?</a></li>
                  <li><a href="#how-to-apply" className="text-yellow-700 hover:underline">5. How to Apply</a></li>
                  <li><a href="#documents" className="text-yellow-700 hover:underline">6. Required Documents</a></li>
                  <li><a href="#timeline" className="text-yellow-700 hover:underline">7. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-yellow-700 hover:underline">8. Common Mistakes</a></li>
                  <li><a href="#industries" className="text-yellow-700 hover:underline">9. Industry-Specific Grants</a></li>
                  <li><a href="#cities" className="text-yellow-700 hover:underline">10. Saskatoon & Regina Programs</a></li>
                  <li><a href="#alternatives" className="text-yellow-700 hover:underline">11. Alternatives to Grants</a></li>
                  <li><a href="#faqs" className="text-yellow-700 hover:underline">12. FAQs</a></li>
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
                  <div className="text-3xl font-bold text-yellow-600 mb-2">$425M+</div>
                  <div className="text-gray-600">Annual Saskatchewan SME Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">30+</div>
                  <div className="text-gray-600">Active Provincial Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
                  <div className="text-gray-600">Average Approval Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">45-75</div>
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
              <h2 className="text-3xl font-bold mb-6">How does Saskatchewan business funding work?</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Saskatchewan operates a strategically focused business funding ecosystem with approximately $425 million
                  available annually through provincial programs. The province&apos;s economic development priorities
                  center on agriculture, mining, energy, and emerging technology sectors—reflecting Saskatchewan&apos;s
                  natural resource strengths and diversification ambitions.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Innovation Saskatchewan serves as the province&apos;s primary innovation agency, coordinating
                  technology development and commercialization support. The Ministry of Trade and Export Development
                  manages export-focused programs, while the Ministry of Agriculture oversees significant funding
                  for agricultural value-added projects—one of Canada&apos;s most substantial agricultural
                  business support programs.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Insight:</strong> Saskatchewan&apos;s smaller population means less competition
                    for business funding compared to Ontario, BC, or Alberta. Businesses in priority sectors
                    like agriculture, potash mining technology, and clean energy often see approval rates
                    significantly above national averages.
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
              <h2 className="text-3xl font-bold text-center mb-12">What are the major Saskatchewan grant programs?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Innovation Saskatchewan */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Innovation Saskatchewan Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$25K - $300K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Innovation Saskatchewan coordinates the province&apos;s innovation ecosystem,
                      providing funding for R&D, technology commercialization, and startup development.
                      Programs include direct grants and connections to federal funding sources.
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
                        <span>Startup accelerator programs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Agriculture Value-Added Fund */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Agriculture Value-Added Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Wheat className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Agriculture</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      One of Canada&apos;s most substantial agricultural business funds, supporting
                      value-added processing, food manufacturing, and agricultural product development.
                      Saskatchewan&apos;s agricultural heritage makes this a well-resourced program.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Food processing and manufacturing</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Agricultural product development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Value-chain integration</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Export Development Program */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Export Development Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $75K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Export Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Support for Saskatchewan businesses expanding into international markets.
                      Covers market research, trade mission participation, and export readiness
                      activities. Particularly relevant for agricultural and resource exporters.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Market research and development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Trade mission participation</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Export readiness training</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Saskatchewan Small Business Loans */}
                <Card className="border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-700">Community Futures Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $150K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Regional</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Community Futures organizations across Saskatchewan provide loans, grants,
                      and business support services for rural and small-town businesses. Each
                      regional office has some flexibility in program delivery.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Low-interest business loans</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Business advisory services</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Rural community focus</span>
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
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for Saskatchewan Business Grants?</h2>

              <p className="text-gray-700 mb-6">
                Saskatchewan business grants are available to for-profit enterprises operating within the province.
                Eligibility varies by program, but most require Saskatchewan incorporation or significant
                provincial operations. Agricultural projects often have additional eligibility through
                federal-provincial cost-share programs.
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
                        <span>Incorporated in Saskatchewan or with significant local operations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Small and medium enterprises (under 500 employees)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Businesses in priority sectors (agriculture, mining, technology)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Good standing with provincial and federal tax authorities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Projects with demonstrable economic impact</span>
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
                        <span>Businesses without Saskatchewan operations</span>
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
                        <span>Primary agricultural production (most grants for value-added only)</span>
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
              <h2 className="text-3xl font-bold mb-6">How Much Grant Funding Can Saskatchewan Businesses Get?</h2>

              <p className="text-gray-700 mb-6">
                Saskatchewan grant amounts vary by program and project scope. Agricultural value-added
                projects can access significant funding, while innovation and export programs offer
                more modest amounts but with less stringent requirements.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-yellow-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Typical Range</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Cost Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Export Development</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$5K - $75K</td>
                      <td className="border border-gray-200 px-4 py-3">50%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Innovation Programs</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$25K - $300K</td>
                      <td className="border border-gray-200 px-4 py-3">33-50%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Ag Value-Added</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$100K - $500K</td>
                      <td className="border border-gray-200 px-4 py-3">25-50%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Community Futures</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$10K - $150K</td>
                      <td className="border border-gray-200 px-4 py-3">Loan basis</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> Saskatchewan businesses can stack provincial funding with
                  federal programs. PrairiesCan (formerly Western Economic Diversification) offers
                  additional federal funding specifically for Prairie provinces, while IRAP and
                  SR&ED provide technology-focused support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for Saskatchewan Business Grants - Step by Step</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Research Programs (1-2 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Visit Innovation Saskatchewan and Ministry of Trade websites for program details.
                      For agricultural projects, check the Ministry of Agriculture&apos;s Agri-Business
                      section for value-added funding opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Pre-Application Consultation</h3>
                    <p className="text-gray-600 mt-1">
                      Saskatchewan programs typically offer intake consultations. For Innovation
                      Saskatchewan programs, connect with their intake team. Agricultural projects
                      should consult with regional Agriculture offices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Application (2-3 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Complete application forms with business plan, project description, timeline,
                      and budget. Saskatchewan applications are typically 10-20 pages. Agricultural
                      programs may require additional production and processing documentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit & Review</h3>
                    <p className="text-gray-600 mt-1">
                      Submit through provincial intake portals. Most programs have 45-75 day
                      review periods. Be responsive to follow-up requests—program officers
                      may ask for clarification or additional documentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="font-bold text-lg">Contribution Agreement</h3>
                    <p className="text-gray-600 mt-1">
                      Upon approval, sign a contribution agreement outlining terms, milestones,
                      and reporting requirements. Saskatchewan typically uses reimbursement-based
                      funding—you spend first, then claim back eligible expenses.
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
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required for Saskatchewan Grant Applications?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-yellow-600 mr-2" />
                    Core Business Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                      <span>Saskatchewan corporate registration</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                      <span>2-3 years of financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                      <span>Current year-to-date financials</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
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
                      <span>Budget with vendor quotes</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Market analysis</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Letters of support (for ag projects)</span>
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
              <h2 className="text-3xl font-bold mb-6">How Long Does Saskatchewan Grant Approval Take?</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-yellow-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Review Timeline</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">First Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Export Programs</td>
                      <td className="border border-gray-200 px-4 py-3">2-4 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Upon claim</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Innovation Saskatchewan</td>
                      <td className="border border-gray-200 px-4 py-3">45-60 days</td>
                      <td className="border border-gray-200 px-4 py-3">Milestone basis</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Ag Value-Added</td>
                      <td className="border border-gray-200 px-4 py-3">60-90 days</td>
                      <td className="border border-gray-200 px-4 py-3">Reimbursement</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> Most Saskatchewan programs accept applications on a
                  continuous intake basis. Check the official provincial websites for current
                  program status and any temporary closures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid with Saskatchewan Grant Applications</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Confusing Primary Production with Value-Added</h3>
                        <p className="text-gray-600 mt-1">
                          Most Saskatchewan agricultural grants fund value-added processing, not
                          primary production. Growing crops doesn&apos;t qualify—processing them into
                          food products does. Make sure you understand this distinction.
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
                        <h3 className="font-bold text-lg">Weak Export Market Documentation</h3>
                        <p className="text-gray-600 mt-1">
                          Export development grants require evidence of export readiness and market
                          opportunity. Vague statements about &quot;international expansion&quot; aren&apos;t
                          sufficient—provide specific target markets and entry strategies.
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
                          Most Saskatchewan grants require you to co-invest 50-75% of costs.
                          Show clear evidence of matching capital through bank statements or
                          investor commitments.
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
              <h2 className="text-3xl font-bold mb-6">Which industries get the most Saskatchewan funding?</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Wheat className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold mb-2">Agriculture & Agri-Food</h3>
                  <p className="text-sm text-gray-600">Food processing, pulse crops, specialty grains, and AgTech</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Building className="w-8 h-8 text-yellow-600 mb-3" />
                  <h3 className="font-bold mb-2">Mining & Resources</h3>
                  <p className="text-sm text-gray-600">Potash, uranium, oil services, and mining technology</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Zap className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold mb-2">Technology</h3>
                  <p className="text-sm text-gray-600">AgTech, clean technology, software, and digital innovation</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Leaf className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold mb-2">Clean Energy</h3>
                  <p className="text-sm text-gray-600">Renewable energy, carbon capture, and sustainability</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold mb-2">Life Sciences</h3>
                  <p className="text-sm text-gray-600">Vaccine development, animal health, and biopharmaceuticals</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Users className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold mb-2">Indigenous Business</h3>
                  <p className="text-sm text-gray-600">Specialized programs for Indigenous entrepreneurs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City-Specific Section */}
        <section id="cities" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Are there local grants in Saskatoon and Regina?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Saskatoon Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Co.Labs – Innovation accelerator</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Saskatoon Regional Economic Development Authority</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>University of Saskatchewan commercialization</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Regina Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Economic Development Regina</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Cultivator – AgTech accelerator</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>University of Regina innovation programs</span>
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
              <h2 className="text-3xl font-bold mb-6">What if I don't qualify for Saskatchewan grants?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">SR&ED Tax Credits</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Federal R&D credits provide 35-64% return on eligible costs. Saskatchewan
                    offers an additional 10% provincial R&D tax credit for qualifying activities.
                  </p>
                  <Link href="/blog/sred-scientific-research-experimental-development" className="text-yellow-700 hover:underline text-sm">
                    Learn about SR&ED →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">PrairiesCan (Federal)</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Federal regional development agency for Prairie provinces. Offers substantial
                    funding for innovation, economic development, and diversification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg flex items-start">
                        <HelpCircle className="w-5 h-5 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 mt-2 ml-7">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
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
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-yellow-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-yellow-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-yellow-600">Federal Grants for Canadian Businesses</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center p-4 bg-white rounded-lg border hover:border-yellow-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-yellow-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-yellow-600">SR&ED Tax Credit Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/alberta-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-yellow-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-yellow-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-yellow-600">Alberta Business Grants</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-yellow-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-yellow-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-yellow-600">All Grant Application Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-yellow-600 to-amber-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Access Saskatchewan&apos;s $425M+ in Business Funding?
              </h2>
              <p className="text-xl text-yellow-100 mb-8">
                Our Saskatchewan specialists have secured over $5M for local businesses. Get expert guidance
                on Agriculture Value-Added, Innovation Saskatchewan, and export development programs.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Saskatchewan Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Free eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Agriculture and AgTech expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Innovation Saskatchewan relationships</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Export development support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Saskatoon and Regina offices</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>86% success rate for Saskatchewan businesses</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-white hover:bg-gray-100 text-yellow-700 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=saskatchewan-grants-expert-help">
                  Get Expert Help with Saskatchewan Grants
                </Link>
              </Button>
              <p className="text-yellow-200 text-sm mt-4">
                Free consultation • Agriculture specialists • Saskatchewan expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
