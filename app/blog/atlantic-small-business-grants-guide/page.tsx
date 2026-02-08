import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, Anchor, Ship, Building, Users, Zap,
  Clock, AlertTriangle, FileText, HelpCircle, MapPin, Briefcase, ChevronRight,
  ExternalLink, BookOpen, TrendingUp, Leaf
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Atlantic Canada Small Business Grants 2026 | $850M+ Complete Funding Guide",
  description: "Complete guide to Atlantic Canada business grants. Access ACOA funding, Nova Scotia Small Business Fund, New Brunswick Innovation, PEI Development Fund, Newfoundland Business Growth programs, and 50+ funding opportunities. Expert tips for successful applications.",
  keywords: "Atlantic Canada small business grants, ACOA business funding, Nova Scotia Small Business Fund, New Brunswick Innovation Fund, PEI Development Fund, Newfoundland business grants, Halifax business grants, ocean technology funding",
}

export default function AtlanticSmallBusinessGrantsGuide() {
  const faqData = [
    {
      question: "Are ACOA loans truly interest-free?",
      answer: "Yes, ACOA repayable contributions are typically interest-free, making them very attractive financing options for eligible projects."
    },
    {
      question: "Can I apply to ACOA and provincial programs simultaneously?",
      answer: "Yes, stacking is commonly done. Coordinate applications to ensure total government funding stays within acceptable limits."
    },
    {
      question: "How competitive are Atlantic Canada grants?",
      answer: "Atlantic Canada has higher approval rates than major urban centers. Well-prepared applications in priority sectors see 30-40% success rates."
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
        <section className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                ⚓ Atlantic Canada Business Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Atlantic Canada Business Grants 2026
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Access $850M+ through ACOA and provincial programs. Complete guide covering Nova Scotia,
                New Brunswick, Prince Edward Island, and Newfoundland & Labrador funding opportunities.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=atlantic-business-grants-expert-help">
                  Get Expert Help with Atlantic Grants
                </Link>
              </Button>
              <p className="text-indigo-200 text-sm mt-4">
                Free consultation • 88% success rate • ACOA specialists
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
                  <li><a href="#overview" className="text-indigo-700 hover:underline">1. Atlantic Canada Funding Overview</a></li>
                  <li><a href="#acoa" className="text-indigo-700 hover:underline">2. ACOA Federal Programs</a></li>
                  <li><a href="#provincial" className="text-indigo-700 hover:underline">3. Provincial Programs</a></li>
                  <li><a href="#eligibility" className="text-indigo-700 hover:underline">4. Who is Eligible?</a></li>
                  <li><a href="#how-much" className="text-indigo-700 hover:underline">5. How Much Funding?</a></li>
                  <li><a href="#how-to-apply" className="text-indigo-700 hover:underline">6. How to Apply</a></li>
                  <li><a href="#documents" className="text-indigo-700 hover:underline">7. Required Documents</a></li>
                  <li><a href="#timeline" className="text-indigo-700 hover:underline">8. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-indigo-700 hover:underline">9. Common Mistakes</a></li>
                  <li><a href="#industries" className="text-indigo-700 hover:underline">10. Industry-Specific Grants</a></li>
                  <li><a href="#cities" className="text-indigo-700 hover:underline">11. City-Specific Programs</a></li>
                  <li><a href="#faqs" className="text-indigo-700 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-12 bg-indigo-50 border-b border-indigo-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Atlantic Business Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#eligibility" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">Who is eligible for ACOA grants?</h3>
                  <p className="text-sm text-gray-600 mt-1">Check eligibility for Atlantic Canada Opportunities Agency.</p>
                </a>
                <a href="#provincial" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">What funding is in Nova Scotia & NB?</h3>
                  <p className="text-sm text-gray-600 mt-1">Explore provincial grants for Atlantic businesses.</p>
                </a>
                <a href="#how-much" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">How much funding can I get?</h3>
                  <p className="text-sm text-gray-600 mt-1">View funding limits for ACOA and provincial streams.</p>
                </a>
                <a href="#acoa" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">Is ACOA funding repayable?</h3>
                  <p className="text-sm text-gray-600 mt-1">Understand interest-free loans vs. non-repayable grants.</p>
                </a>
                <a href="#cities" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">Are there grants for Halifax startups?</h3>
                  <p className="text-sm text-gray-600 mt-1">See city-specific programs for urban centers.</p>
                </a>
                <a href="#industries" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">Which industries are prioritized?</h3>
                  <p className="text-sm text-gray-600 mt-1">Ocean tech, clean energy, and manufacturing focus.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$850M+</div>
                  <div className="text-gray-600">Annual Atlantic SME Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600">Active Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">35%</div>
                  <div className="text-gray-600">Average Approval Rate</div>
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
              <h2 className="text-3xl font-bold mb-6">How does Atlantic Canada business funding work?</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Atlantic Canada operates a unique business funding ecosystem with approximately $850 million
                  available annually through federal and provincial programs. The Atlantic Canada Opportunities
                  Agency (ACOA) serves as the primary federal agency, providing substantial funding that
                  complements each province&apos;s own programs.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  The region&apos;s economic development priorities focus on ocean technology, clean energy,
                  digital innovation, and diversifying traditional industries like fishing and forestry.
                  Atlantic Canada&apos;s smaller population means less competition for funding compared to
                  major urban centers, making it one of the more accessible funding environments in Canada.
                </p>

                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Insight:</strong> ACOA funding is often the best starting point for
                    Atlantic businesses. The agency offers both repayable and non-repayable contributions,
                    with interest-free loans being particularly attractive for eligible projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACOA Programs Section */}
        <section id="acoa" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Atlantic Canada Opportunities Agency (ACOA)</h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                ACOA is the federal regional development agency serving Atlantic Canada with comprehensive
                business development programs and funding opportunities.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* ACOA Business Development Program */}
                <Card className="border-2 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">ACOA Business Development Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Growth & Innovation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      ACOA&apos;s flagship program provides interest-free repayable contributions
                      and non-repayable grants for business expansion, modernization, and
                      competitiveness enhancement.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Business expansion and modernization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation and technology adoption</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Export market development</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* ACOA Innovation Program */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Regional Economic Growth through Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $1M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>R&D Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      REGI provides funding for innovative projects that drive regional economic
                      growth, including R&D, technology commercialization, and ecosystem development.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>R&D project funding</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Commercialization support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology partnerships</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Atlantic Immigration Pilot */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Atlantic Growth Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Variable</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Workforce</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Multi-faceted federal initiative supporting Atlantic business growth
                      through workforce development, immigration, and strategic investment.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Skilled workforce attraction</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>International market access</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Strategic investments</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Women Entrepreneurship Fund */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Women Entrepreneurship Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $100K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Women-Led</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Targeted funding for Atlantic women entrepreneurs and women-led businesses
                      seeking to start, grow, or expand operations.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Women-owned business support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Scale-up funding</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Ecosystem development</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Provincial Programs Section */}
        <section id="provincial" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">What provincial programs are available in each Atlantic province?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Nova Scotia */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Nova Scotia Business Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$5K - $500K</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Nova Scotia offers multiple programs through Invest Nova Scotia, including
                      the Small Business Development Program and sector-specific incentives.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Small Business Development Program</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Payroll Rebate for Technology</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Digital Innovation Programs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* New Brunswick */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">New Brunswick Business Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$10K - $200K</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      New Brunswick Innovation Foundation and Opportunities New Brunswick
                      provide funding for technology development and business growth.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>NB Innovation Foundation grants</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Opportunities NB programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Bilingual workforce incentives</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* PEI */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Prince Edward Island Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$10K - $150K</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Innovation PEI offers development funding, while the PEI Development Fund
                      supports job creation and rural business development.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation PEI grants</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Rural economic development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Tourism and agriculture focus</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Newfoundland */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Newfoundland & Labrador Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$25K - $300K</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Newfoundland offers programs through the Department of Industry, Energy
                      and Technology, with special focus on ocean and energy sectors.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Business investment grants</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Ocean technology funding</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Remote community support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for Atlantic Canada Business Grants?</h2>

              <p className="text-gray-700 mb-6">
                Atlantic Canada grants are available to for-profit enterprises with operations in one
                of the four Atlantic provinces. ACOA programs serve all four provinces, while
                provincial programs have province-specific requirements.
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
                        <span>Incorporated in an Atlantic province</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>SMEs with significant Atlantic operations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Projects creating regional economic impact</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Good standing with tax authorities</span>
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
                        <span>Businesses without Atlantic operations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Projects completed before approval</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses in tax arrears</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Real estate speculation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How Much Funding Section */}
        <section id="how-much" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Much Grant Funding Can Atlantic Businesses Get?</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-indigo-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Typical Range</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Cost Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">ACOA BDP</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$50K - $500K</td>
                      <td className="border border-gray-200 px-4 py-3">50%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">ACOA REGI</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$100K - $1M</td>
                      <td className="border border-gray-200 px-4 py-3">50-70%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Provincial Programs</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$10K - $300K</td>
                      <td className="border border-gray-200 px-4 py-3">Variable</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> Atlantic businesses can often stack ACOA federal funding
                  with provincial programs, maximizing total support. Coordinate applications to
                  avoid conflicts and ensure both applications reference each other.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for Atlantic Canada Grants - Step by Step</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Contact ACOA Regional Office</h3>
                    <p className="text-gray-600 mt-1">
                      ACOA encourages early contact. Reach out to your provincial office
                      to discuss your project and identify suitable programs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Application Package</h3>
                    <p className="text-gray-600 mt-1">
                      Complete application forms with business plan, project description,
                      budget, and financial statements. ACOA provides templates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit & Due Diligence</h3>
                    <p className="text-gray-600 mt-1">
                      ACOA conducts thorough assessment including site visits for larger
                      projects. Provincial programs may have shorter review cycles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Contribution Agreement</h3>
                    <p className="text-gray-600 mt-1">
                      Upon approval, sign agreement outlining terms, milestones, and
                      reporting requirements. ACOA uses milestone-based payments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section id="documents" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Required Documents for Atlantic Canada Grant Applications</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                    Business Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Corporate registration</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>2-3 years of financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Current year financials</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Ownership documentation</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                    Project Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Detailed project plan</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Budget with vendor quotes</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Cash flow projections</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Market analysis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Long Does Atlantic Canada Grant Approval Take?</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-indigo-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Review Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">ACOA BDP (smaller projects)</td>
                      <td className="border border-gray-200 px-4 py-3">30-60 days</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">ACOA BDP (larger projects)</td>
                      <td className="border border-gray-200 px-4 py-3">60-120 days</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Provincial Programs</td>
                      <td className="border border-gray-200 px-4 py-3">30-90 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid with Atlantic Canada Grant Applications</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Not Contacting ACOA First</h3>
                        <p className="text-gray-600 mt-1">
                          ACOA encourages pre-application discussions. Skipping this step
                          means missing valuable guidance and potentially applying to the
                          wrong program.
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
                        <h3 className="font-bold text-lg">Weak Regional Impact Documentation</h3>
                        <p className="text-gray-600 mt-1">
                          Atlantic programs prioritize regional economic impact. Applications
                          must clearly demonstrate job creation, export potential, and
                          community benefits.
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
                        <h3 className="font-bold text-lg">Ignoring Provincial Programs</h3>
                        <p className="text-gray-600 mt-1">
                          Many applicants focus only on ACOA. Provincial programs can
                          stack with federal funding and often have faster approval times.
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
        <section id="industries" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Which industries get the most Atlantic Canada funding?</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Ship className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold mb-2">Ocean Technology</h3>
                  <p className="text-sm text-gray-600">Aquaculture, marine research, offshore energy</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Leaf className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold mb-2">Clean Energy</h3>
                  <p className="text-sm text-gray-600">Wind, tidal, hydrogen, sustainability</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Zap className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold mb-2">Digital Economy</h3>
                  <p className="text-sm text-gray-600">Software, gaming, fintech, AI</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Building className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold mb-2">Aerospace & Defence</h3>
                  <p className="text-sm text-gray-600">Aircraft maintenance, defense tech</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Anchor className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-bold mb-2">Fishing & Seafood</h3>
                  <p className="text-sm text-gray-600">Processing, export, sustainability</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Users className="w-8 h-8 text-cyan-600 mb-3" />
                  <h3 className="font-bold mb-2">Tourism</h3>
                  <p className="text-sm text-gray-600">Eco-tourism, cultural tourism</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City-Specific Section */}
        <section id="cities" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Major City Business Programs</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Halifax, Nova Scotia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Halifax Partnership economic programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Volta – Tech accelerator</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Ocean tech hub programs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>St. John&apos;s, Newfoundland</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Genesis Centre – Tech incubator</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Memorial University commercialization</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Ocean Supercluster participation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
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
                        <HelpCircle className="w-5 h-5 text-indigo-600 mr-2 mt-1 flex-shrink-0" />
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
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-indigo-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-indigo-600">Federal Grants for Canadian Businesses</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center p-4 bg-white rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-indigo-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-indigo-600">SR&ED Tax Credit Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/bc-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-indigo-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-indigo-600">BC Business Grants Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-indigo-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-indigo-600">All Grant Application Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Access Atlantic Canada&apos;s $850M+ in Business Funding?
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Our Atlantic specialists have secured over $11M for Maritime businesses. Get expert guidance
                on ACOA, provincial programs, and sector-specific opportunities.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Atlantic Canada Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Free eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>ACOA relationship expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>All 4 Atlantic provinces covered</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Ocean and clean tech focus</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Halifax and regional offices</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>88% success rate for Atlantic businesses</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=atlantic-grants-expert-help">
                  Get Expert Help with Atlantic Canada Grants
                </Link>
              </Button>
              <p className="text-indigo-200 text-sm mt-4">
                Free consultation • Maritime expertise • ACOA relationship specialists
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
