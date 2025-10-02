import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Building, Users, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quebec Small Business Grants 2025 | $1.8B+ Quebec SME Funding",
  description: "Complete guide to Quebec small business grants. Access Investissement Québec SME Fund, Quebec Startup Fund, R&D Tax Credits up to 37.5%, and francophone business support.",
  keywords: "Quebec small business grants, Investissement Quebec SME fund, Quebec startup funding, Quebec R&D tax credits, francophone business grants Quebec",
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
                🏢 Quebec Business Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Quebec Small Business Grants 2025
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access $1.8B+ in Quebec government funding. From Investissement Québec to R&D tax credits 
                up to 37.5% - complete guide to Quebec's generous business support ecosystem.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=quebec-business-grants-expert-help">
                  Get Expert Help with Quebec Grants
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
                Service en français disponible • 91% Quebec success rate • Average funding: $89K
              </p>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$1.8B+</div>
                  <div className="text-gray-600">Quebec SME Support Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">37.5%</div>
                  <div className="text-gray-600">Max R&D Tax Credit Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">91%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Quebec Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Major Quebec Small Business Programs</h2>
              
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
                      Comprehensive financing solutions for Quebec SMEs looking to grow and expand operations.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Loans and equity investment options</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Strategic advisory services included</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Flexible financing structures</span>
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
                        <Building className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>R&D Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      One of Canada's most generous R&D tax credit programs for Quebec businesses.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Fully refundable tax credit</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Strong innovation incentive</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Supports breakthrough technologies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quebec Startup Fund */}
                <Card className="border-2 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Quebec Startup Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $200K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Early Stage</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Venture capital funding for high-growth Quebec startups and emerging companies.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Early-stage venture capital</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Mentorship and networking</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Scale-up support services</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Tech Transfer Tax Credit */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Tech Transfer Tax Credit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to 35%</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Technology</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Tax credit for technology transfer and commercialization activities in Quebec.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology commercialization support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>University-industry partnerships</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation ecosystem development</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Maximize Your Quebec Business Funding Success
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Quebec offers some of Canada's most generous business incentives, but navigating the application process 
                requires local expertise. Our bilingual Quebec specialists have secured over $12M for local businesses.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Quebec Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Bilingual service (French & English)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Quebec program specialization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>R&D tax credit optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Investissement Québec relationship</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>91% success rate for Quebec businesses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Montreal & Quebec City local teams</span>
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
