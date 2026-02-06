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
  title: "Ontario Small Business Grants 2026 | $2.1B+ Complete Funding Guide",
  description: "Complete guide to Ontario small business grants. Access Ontario Small Business Support Grant, Jobs and Prosperity Fund, Digital Main Street, and Ontario Innovation Tax Credits. 45+ active programs.",
  keywords: "Ontario small business grants, Ontario business funding, Jobs and Prosperity Fund, Digital Main Street, Ontario Innovation Tax Credit, GTA small business grants, Toronto startup grants",
}

export default function OntarioSmallBusinessGrantsGuide() {
  const faqData = [
    {
      question: "Is the Ontario Small Business Support Grant still available?",
      answer: "The original pandemic-era program has ended, but Ontario continues to offer various small business support programs. Check Ontario.ca for current offerings and eligibility requirements."
    },
    {
      question: "Can Toronto startups access provincial grants?",
      answer: "Yes. Toronto-based businesses can access both provincial programs and Toronto-specific initiatives. MaRS, Toronto Global, and local development centres offer additional support."
    },
    {
      question: "How competitive are Ontario business grants?",
      answer: "Ontario receives significantly more applications than available funding. Strong applications with clear job creation projections, defined economic impact, and professional preparation tend to succeed."
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
        <section className="bg-gradient-to-br from-red-600 to-orange-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏢 Ontario Business Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Ontario Small Business Grants 2026
              </h1>
              <p className="text-xl text-red-100 mb-8">
                Access $2.1B+ in Ontario government funding. Complete guide to Jobs and Prosperity Fund,
                Digital Main Street, innovation tax credits, and 45+ active business support programs.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=ontario-business-grants-expert-help">
                  Get Expert Help with Ontario Grants
                </Link>
              </Button>
              <p className="text-red-200 text-sm mt-4">
                Free consultation • 87% success rate • Toronto, Ottawa, GTA specialists
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
                  <li><a href="#overview" className="text-red-700 hover:underline">1. Ontario Funding Overview</a></li>
                  <li><a href="#programs" className="text-red-700 hover:underline">2. Major Grant Programs</a></li>
                  <li><a href="#eligibility" className="text-red-700 hover:underline">3. Who is Eligible?</a></li>
                  <li><a href="#how-much" className="text-red-700 hover:underline">4. How Much Funding?</a></li>
                  <li><a href="#how-to-apply" className="text-red-700 hover:underline">5. How to Apply</a></li>
                  <li><a href="#documents" className="text-red-700 hover:underline">6. Required Documents</a></li>
                  <li><a href="#timeline" className="text-red-700 hover:underline">7. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-red-700 hover:underline">8. Common Mistakes</a></li>
                  <li><a href="#industries" className="text-red-700 hover:underline">9. Industry-Specific Grants</a></li>
                  <li><a href="#cities" className="text-red-700 hover:underline">10. Toronto, Ottawa & GTA Programs</a></li>
                  <li><a href="#alternatives" className="text-red-700 hover:underline">11. Alternatives to Grants</a></li>
                  <li><a href="#faqs" className="text-red-700 hover:underline">12. FAQs</a></li>
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
                  <div className="text-3xl font-bold text-red-600 mb-2">$2.1B+</div>
                  <div className="text-gray-600">Annual Ontario SME Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">45+</div>
                  <div className="text-gray-600">Active Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">500K+</div>
                  <div className="text-gray-600">Businesses Supported</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">30-60</div>
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
              <h2 className="text-3xl font-bold mb-6">Ontario Business Funding Overview</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ontario, Canada&apos;s largest provincial economy with a GDP exceeding $850 billion,
                  operates an extensive network of business support programs. The province invests
                  over $2.1 billion annually in SME funding through direct grants, tax credits,
                  loans, and strategic investments.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Ontario&apos;s business funding landscape includes major programs like the Jobs and
                  Prosperity Fund for large-scale investments, Digital Main Street for small
                  business digitization, and the Ontario Innovation Tax Credit for R&D activities.
                  Municipal programs from Toronto, Ottawa, and regional economic development
                  agencies complement provincial offerings.
                </p>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Insight:</strong> Ontario&apos;s programs heavily emphasize job creation
                    and economic development. Businesses that can demonstrate significant employment
                    impact typically receive priority consideration and higher funding amounts.
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
              <h2 className="text-3xl font-bold text-center mb-12">Major Ontario Small Business Grant Programs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Jobs and Prosperity Fund */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Jobs and Prosperity Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Job Creation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Ontario&apos;s flagship economic development program for significant business
                      expansion and job creation projects. Provides strategic investment support.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Large-scale expansions</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Manufacturing modernization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Strategic sector investments</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Digital Main Street */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Digital Main Street (ShopHERE)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$2,400 Grant</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Digitization</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Helps Ontario small businesses establish and enhance their online
                      presence with grants and expert support for digital transformation.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>E-commerce platform setup</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Digital marketing training</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology adoption support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Ontario Innovation Tax Credit */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Ontario Innovation Tax Credit (OITC)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>10% Credit</strong></span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>R&D Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Refundable tax credit on eligible R&D expenditures for Ontario
                      corporations on their first $3 million of eligible expenditures.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Refundable for CCPCs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Stacks with federal SR&ED</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation-focused industries</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Ontario Together Fund */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Ontario Together Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Critical Supplies</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Supports Ontario businesses retooling and scaling up production
                      of essential supplies and building supply chain resilience.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Manufacturing retooling</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Supply chain security</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Production scale-up</span>
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
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for Ontario Business Grants?</h2>

              <p className="text-gray-700 mb-6">
                Ontario business grants are available to incorporated businesses operating in the
                province. Eligibility varies by program, but most require Ontario registration,
                demonstrated business operations, and clear project objectives.
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
                        <span>Ontario-incorporated businesses (provincial or federal)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>SMEs with fewer than 500 employees</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Businesses creating or retaining Ontario jobs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Companies with growth or export plans</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Good standing with Ontario tax authorities</span>
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
                        <span>Businesses without Ontario operations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Projects already completed</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses in tax arrears</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Real estate development (except certain programs)</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Non-profit organizations (for most business grants)</span>
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
              <h2 className="text-3xl font-bold mb-6">How Much Grant Funding Can Ontario Businesses Get?</h2>

              <p className="text-gray-700 mb-6">
                Ontario grant amounts vary significantly by program. Small digitization grants
                may offer $2,400, while major economic development investments can reach
                $5 million or more for strategic projects.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-red-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Typical Range</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Jobs and Prosperity Fund</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$500K - $5M</td>
                      <td className="border border-gray-200 px-4 py-3">Large-scale projects</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Digital Main Street</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$2,400</td>
                      <td className="border border-gray-200 px-4 py-3">Digitization grant</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Ontario Innovation Tax Credit</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">10% Credit</td>
                      <td className="border border-gray-200 px-4 py-3">On R&D expenditures</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Municipal Programs</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$5K - $100K</td>
                      <td className="border border-gray-200 px-4 py-3">Varies by city</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> Ontario businesses can stack multiple programs.
                  A typical approach combines provincial grants with federal funding (SR&ED,
                  IRAP, or FedDev Ontario) for maximum support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for Ontario Business Grants - Step by Step</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Identify Relevant Programs (1-2 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Visit Ontario.ca&apos;s business support finder, consult with Small Business
                      Enterprise Centres, and check regional economic development agencies
                      for programs matching your business profile.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Pre-Application Consultation</h3>
                    <p className="text-gray-600 mt-1">
                      Many Ontario programs offer pre-application discussions. Contact the
                      program office or your regional development advisor to confirm
                      eligibility before investing time in applications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Application (2-4 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Gather financial statements, develop project plans, and prepare
                      job creation projections. Larger programs may require business
                      plans and feasibility studies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit & Review Period</h3>
                    <p className="text-gray-600 mt-1">
                      Submit through official portals. Ontario programs typically review
                      applications within 30-60 days, though larger projects may require
                      additional due diligence.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="font-bold text-lg">Agreement & Implementation</h3>
                    <p className="text-gray-600 mt-1">
                      Upon approval, sign a contribution agreement outlining milestones,
                      reporting requirements, and payment schedules. Most Ontario programs
                      use reimbursement or milestone-based payment models.
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
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required for Ontario Grant Applications?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-red-600 mr-2" />
                    Core Business Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Ontario Business Number (BN)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Articles of Incorporation</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>2-3 years of financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Current year-to-date financials</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 text-orange-600 mr-2" />
                    Project-Specific Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Detailed project plan with milestones</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Job creation projections</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Cash flow projections</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Quotes from vendors</span>
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
              <h2 className="text-3xl font-bold mb-6">How Long Does Ontario Grant Approval Take?</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-red-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Review Timeline</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">First Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Digital Main Street</td>
                      <td className="border border-gray-200 px-4 py-3">2-4 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Upon completion</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Standard Provincial Grants</td>
                      <td className="border border-gray-200 px-4 py-3">30-60 days</td>
                      <td className="border border-gray-200 px-4 py-3">Milestone basis</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Jobs and Prosperity Fund</td>
                      <td className="border border-gray-200 px-4 py-3">60-90 days</td>
                      <td className="border border-gray-200 px-4 py-3">Upon closing</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> Processing times can vary based on application
                  completeness, project complexity, and current application volumes.
                  Submitting complete applications speeds up review significantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid with Ontario Grant Applications</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Weak Job Creation Projections</h3>
                        <p className="text-gray-600 mt-1">
                          Ontario programs heavily weight job creation. Vague or unrealistic
                          employment projections can doom otherwise strong applications.
                          Be specific about roles, timing, and salaries.
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
                        <h3 className="font-bold text-lg">Missing the Competitive Edge</h3>
                        <p className="text-gray-600 mt-1">
                          Ontario programs receive far more applications than available
                          funding. Applications that clearly articulate competitive
                          advantages without government support tend to stand out.
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
                        <h3 className="font-bold text-lg">Starting Projects Before Approval</h3>
                        <p className="text-gray-600 mt-1">
                          Most Ontario programs require pre-approval before project
                          commencement. Costs incurred before approval dates are
                          typically ineligible for reimbursement.
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
              <h2 className="text-3xl font-bold mb-6">Industry-Specific Grants in Ontario</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Building className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="font-bold mb-2">Automotive & Advanced Manufacturing</h3>
                  <p className="text-sm text-gray-600">Ontario Vehicle Innovation Network, EV production</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Zap className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold mb-2">Technology & AI</h3>
                  <p className="text-sm text-gray-600">Toronto-Waterloo corridor, MaRS, Communitech</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold mb-2">Life Sciences</h3>
                  <p className="text-sm text-gray-600">MaRS Health, biotech clusters, medical devices</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Leaf className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold mb-2">Agri-Food</h3>
                  <p className="text-sm text-gray-600">Ontario Agri-Food Innovation Alliance</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Target className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold mb-2">Mining & Natural Resources</h3>
                  <p className="text-sm text-gray-600">Northern Ontario development, Ring of Fire</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Users className="w-8 h-8 text-cyan-600 mb-3" />
                  <h3 className="font-bold mb-2">Financial Services</h3>
                  <p className="text-sm text-gray-600">Toronto fintech ecosystem, FinHub</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City-Specific Section */}
        <section id="cities" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Toronto, Ottawa & GTA Business Programs</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Toronto & GTA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Toronto Business Development Centre</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>MaRS Discovery District</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Toronto Global – Investment attraction</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Regional development corporations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ottawa & Eastern Ontario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Invest Ottawa</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Ottawa Centre for Regional Innovation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Eastern Ontario Development Fund</span>
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
              <h2 className="text-3xl font-bold mb-6">Alternatives to Ontario Business Grants</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">FedDev Ontario</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Federal economic development agency for southern Ontario offering
                    substantial funding for innovation and growth projects.
                  </p>
                  <Link href="/blog/canada-federal-grants" className="text-red-700 hover:underline text-sm">
                    Learn about Federal Grants →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">SR&ED Tax Credits</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Federal R&D tax credits that combine with Ontario&apos;s OITC for
                    comprehensive innovation support.
                  </p>
                  <Link href="/blog/sred-scientific-research-experimental-development" className="text-red-700 hover:underline text-sm">
                    Learn about SR&ED →
                  </Link>
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
                {faqData.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg flex items-start">
                        <HelpCircle className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
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
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-red-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-red-600">Federal Grants for Canadian Businesses</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center p-4 bg-white rounded-lg border hover:border-red-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-red-600">SR&ED Tax Credit Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/quebec-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-red-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-red-600">Quebec Business Grants</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-red-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-red-600">All Grant Application Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-orange-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Don&apos;t Navigate Ontario Grants Alone
              </h2>
              <p className="text-xl text-red-100 mb-8">
                Our Ontario grant specialists have secured over $15M for local businesses
                with an 87% success rate. Get expert guidance on provincial and federal programs.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Ontario Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Complete Ontario program eligibility analysis</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Professional application writing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Provincial deadline management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Follow-up and compliance support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>87% success rate vs 31% DIY average</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Toronto, Ottawa, GTA local teams</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=ontario-grants-expert-help">
                  Get Expert Help with Ontario Grants
                </Link>
              </Button>
              <p className="text-red-200 text-sm mt-4">
                Free consultation • No success, no full fee • Ontario grant specialists
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
