import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Globe, Plane, Building, Users, TrendingUp, FileText, Shield, Award, HelpCircle, ExternalLink, ArrowRight, MousePointerClick } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Export Development Grants 2026 | $680M+ International Market Expansion Across 18+ Programs",
  description: "Complete guide to Canadian export development grants. Access all 18+ international market expansion programs including CanExport SMEs, EDC Trade Impact, provincial export programs, and trade mission funding.",
  keywords: "Canada export development grants, CanExport SMEs, international market expansion funding, export readiness programs, trade mission grants, EDC Trade Impact Program, international business development",
}

export default function CanadaExportDevelopmentGrantsGuide() {
  const faqData = [
    {
      question: "What expenses does CanExport cover?",
      answer: "CanExport SMEs covers up to 50% of costs for travel (economy airfare, per diems), trade show registration, translation of marketing materials, search engine optimization for foreign markets, and expert legal/business advice aimed at a new market."
    },
    {
      question: "Who pays upfront?",
      answer: "You do. CanExport is a reimbursement program. You pay the bills, submit the claims, and the government reimburses you 50% later. You need the cash flow to handle the upfront costs."
    },
    {
      question: "Can I apply for the US market?",
      answer: "Yes, but it must be a 'new' market for you. If you already export to New York, you can't apply for New York. But you could apply for California or Texas if you have no sales there. The US is treated as key regions, not just one country."
    },
    {
      question: "Do I need a Minimum Viable Product (MVP)?",
      answer: "You need more than an MVP. You typically need a market-ready product that is already generating revenue in Canada ($100k+ to $100M). CanExport is for selling existing products, not developing new ones."
    },
    {
      question: "How long is the approval process?",
      answer: "The service standard is 60 business days (about 3 months), but it can be faster. Do not book travel or spend money before approval—costs incurred before the start date are not eligible."
    }
  ];

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
  };
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🌍 Canadian Export Development Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Canada Export Development Grants 2026
              </h1>
              <p className="text-xl text-emerald-100 mb-8">
                Access $680M+ in Canadian international market expansion funding across 18+ specialized programs. From CanExport SMEs
                to trade mission support - complete guide to taking your business global.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=export-development-grants-expert-help">
                  Get Expert Help with Export Grants
                </Link>
              </Button>
              <p className="text-emerald-200 text-sm mt-4">
                Free consultation • 89% export funding success rate • Average funding: $37K
              </p>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">$680M+</div>
                  <div className="text-gray-600">Export Development Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">18+</div>
                  <div className="text-gray-600">Active Export Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">89%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$37K</div>
                  <div className="text-gray-600">Average Export Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Federal Export Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">What Federal Export Grants are Available?</h2>
              <p className="text-center text-gray-600 mb-12">
                Government of Canada flagship programs designed to help Canadian businesses expand internationally and develop new markets.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* CanExport SMEs */}
                <Card className="border-2 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-700">CanExport SMEs Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $50K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>New Markets</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Flagship SME export program covering 50% of eligible costs for businesses entering new international markets.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Market research and feasibility studies</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>International trade show participation</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Business development travel and meetings</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Marketing materials and website localization</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* CanExport Innovation */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">CanExport Innovation Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $75K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>R&D Partnerships</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Support for innovative companies to develop R&D partnerships and commercialize technologies internationally.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>International R&D collaboration projects</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology commercialization abroad</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation partnership development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>International IP and licensing activities</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* CanExport Associations */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">CanExport Associations Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $250K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Industry Groups</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Support for industry associations to pursue international business development activities for their members.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Sector-specific international missions</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Industry trade show pavilions</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Market development for multiple companies</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Collective export promotion activities</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* EDC Trade Impact Program */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">EDC Trade Impact Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$5B Capacity</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Risk Mitigation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Export Development Canada's enhanced financing and insurance solutions for exporters and their suppliers.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Trade credit insurance protection</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Foreign exchange risk mitigation</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Working capital guarantees</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>International expansion financing</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Provincial Export Development Programs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Which Provinces Support Export Expansion?</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Ontario Export Programs */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700 text-lg">Ontario Export Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Ontario Export Development Program</strong> - Up to $50K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>International Trade Missions</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Export Market Access Program</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Global Trade Acceleration</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quebec Export Programs */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-lg">Quebec International Trade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Quebec Export Program</strong> - Up to $40K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>International Market Development</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Trade Mission Support</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Francophone Market Access</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* BC Export Programs */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 text-lg">BC International Trade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>BC Export Navigator Program</strong> - Up to $30K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Asia-Pacific Trade Development</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Clean Technology Export Support</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>International Business Development</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Provincial Programs */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-700">Prairie Provinces Export Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Alberta:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>Alberta Export Expansion Program</strong> - Up to $25K</li>
                          <li>• International Trade Mission Support</li>
                          <li>• Export Market Development Initiative</li>
                          <li>• AgriFood Export Development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Saskatchewan:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Saskatchewan Export Development Program</li>
                          <li>• Agriculture Export Support</li>
                          <li>• International Market Access</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Manitoba:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Manitoba Export Program</li>
                          <li>• International Trade Development</li>
                          <li>• Market Entry Support</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Atlantic & Territories Export</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Atlantic Canada:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Nova Scotia Export Development Program</li>
                          <li>• New Brunswick International Trade</li>
                          <li>• PEI Export Market Access</li>
                          <li>• Newfoundland Export Support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Territories:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• NWT Export Development Initiative</li>
                          <li>• Yukon International Trade Support</li>
                          <li>• Nunavut Export Program</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Export Support Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Are There Specialized Export Support Programs?</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <Plane className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Trade Missions & Delegations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Government-led trade missions and business delegation support programs.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• CanExport GAC-Led Delegations</li>
                      <li>• Team Canada Trade Missions</li>
                      <li>• Ministerial Trade Missions</li>
                      <li>• Sector-specific delegations</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Creative & Cultural Exports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Specialized export support for creative industries and cultural products.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Creative Export Canada</li>
                      <li>• Export Development Stream</li>
                      <li>• Cultural industry trade support</li>
                      <li>• Media and entertainment exports</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Building className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Foreign Direct Investment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Programs to attract foreign investment and support international partnerships.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• CanExport Community Investments</li>
                      <li>• FDI attraction support</li>
                      <li>• International partnership development</li>
                      <li>• Investment readiness programs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Export Readiness & Support Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">How Can I Get Export Readiness Support?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">Trade Commissioner Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Market intelligence and research</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>International business connections</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Export readiness assessment</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Local market entry support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Canadian International Innovation Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Global R&D collaboration funding</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>International innovation partnerships</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology commercialization abroad</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Cross-border innovation projects</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Export Funding FAQs</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                  <HelpCircle className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Official Resources Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Official Export Resources</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-emerald-600" />
                    Government Programs
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://www.tradecommissioner.gc.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-600 hover:underline">
                        Trade Commissioner Service <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.edc.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-600 hover:underline">
                        Export Development Canada (EDC) <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.tradecommissioner.gc.ca/funding-financement/canexport/sme-pme/index.aspx?lang=eng" target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-600 hover:underline">
                        CanExport SMEs Program <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <MousePointerClick className="w-5 h-5 mr-2 text-emerald-600" />
                    Related Guides
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/blog/canexport-smes-funding-guide" className="flex items-center text-emerald-600 hover:underline">
                        Detailed CanExport SMEs Guide <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/edc-women-trade-export-financing" className="flex items-center text-emerald-600 hover:underline">
                        Women in Trade Finance <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Expand Globally with Expert Navigation of 18+ Export Programs
              </h2>
              <p className="text-xl text-emerald-100 mb-8">
                Canada's export development ecosystem spans flagship CanExport programs, EDC trade financing, provincial export support,
                and specialized industry initiatives. Our international trade specialists have helped 250+ Canadian businesses secure
                over $9M in export funding with an 89% success rate.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Complete Export Development Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>All 18+ program eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>CanExport SMEs application optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Provincial export program coordination</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>EDC Trade Impact Program access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>89% success rate for export funding</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Average $37K export funding secured</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=export-development-grants-expert-help">
                  Get Expert Help with All Export Programs
                </Link>
              </Button>
              <p className="text-emerald-200 text-sm mt-4">
                Free consultation • International trade specialists • Multi-program expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
