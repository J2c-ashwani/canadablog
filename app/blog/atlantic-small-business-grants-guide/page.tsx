import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Anchor, Ship, Building, Users, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Atlantic Canada Small Business Grants 2026 | $850M+ ACOA & Provincial SME Funding",
  description: "Complete guide to Atlantic Canada business grants. Access ACOA funding, Nova Scotia Small Business Fund, New Brunswick Innovation, PEI Development Fund, and Newfoundland Business Growth programs.",
  keywords: "Atlantic Canada small business grants, ACOA business funding, Nova Scotia Small Business Fund, New Brunswick Innovation Fund, PEI Development Fund, Newfoundland business grants",
}

export default function AtlanticSmallBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                ⚓ Atlantic Canada Business Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Atlantic Canada Business Grants 2026
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Access $850M+ in Atlantic Canada funding through ACOA and provincial programs. Complete guide to
                Nova Scotia, New Brunswick, PEI, and Newfoundland business support opportunities.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=atlantic-business-grants-expert-help">
                  Get Expert Help with Atlantic Grants
                </Link>
              </Button>
              <p className="text-indigo-200 text-sm mt-4">
                Free consultation • 88% Atlantic success rate • ACOA specialists
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
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$850M+</div>
                  <div className="text-gray-600">Atlantic SME Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">ACOA</div>
                  <div className="text-gray-600">Federal Lead Agency</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                  <div className="text-gray-600">Atlantic Provinces</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">88%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACOA Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Atlantic Canada Opportunities Agency (ACOA)</h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                ACOA is the federal regional development agency serving Atlantic Canada with comprehensive
                business development programs and funding opportunities.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
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
                      Non-repayable contributions for Atlantic businesses to enhance competitiveness and growth.
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
                    <CardTitle className="text-blue-700">ACOA Innovation Program</CardTitle>
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
                      Funding for research, development, and commercialization of innovative technologies.
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
              </div>
            </div>
          </div>
        </section>

        {/* Provincial Programs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Provincial Small Business Programs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Nova Scotia Small Business Fund */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Nova Scotia Small Business Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $25K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>All Sectors</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Direct funding support for Nova Scotia small businesses to enhance operations and competitiveness.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Business development and expansion</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology and equipment upgrades</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Marketing and export initiatives</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* New Brunswick Innovation Fund */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">New Brunswick Innovation Foundation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $200K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Innovation funding for New Brunswick businesses developing new technologies and solutions.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology development projects</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Research and development support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation commercialization</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* PEI Development Fund */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">PEI Development Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $150K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Job Creation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Prince Edward Island funding for business development and job creation initiatives.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Small business startup support</span>
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

                {/* Newfoundland Business Growth */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Newfoundland & Labrador Business Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $300K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Growth Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Newfoundland and Labrador funding for business expansion and economic development.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Business expansion and modernization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Ocean technology and resources</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Remote community business support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Atlantic Canada Sector Focus */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Atlantic Canada Sector Priorities</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <Ship className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Ocean Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Aquaculture, fisheries technology, marine renewable energy, and ocean research.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Clean Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Renewable energy, environmental services, and sustainable technology development.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Building className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Digital Economy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Software development, digital media, e-commerce, and IT services.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Master Atlantic Canada's Unique Funding Ecosystem
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Atlantic Canada's $850M+ combines ACOA federal funding with strong provincial programs.
                Our Atlantic specialists understand the regional priorities and have secured over $11M for Maritime businesses.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Atlantic Canada Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>ACOA program specialization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>All 4 Atlantic provinces coverage</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Ocean and clean technology expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Halifax and regional office connections</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>88% success rate for Atlantic businesses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Maritime industry focus and relationships</span>
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
