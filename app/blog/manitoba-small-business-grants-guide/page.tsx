import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Building, Users, Zap, TrendingUp, MapPin } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manitoba Small Business Grants 2026 | $380M+ Business Development Programs",
  description: "Complete guide to Manitoba small business grants. Access Manitoba Business Development, Innovation Growth Program, Small Business Venture Capital, and Rural Development Corporation funding.",
  keywords: "Manitoba small business grants, Manitoba business funding, Manitoba Business Development, Innovation Growth Program Manitoba, Manitoba Small Business Venture Capital",
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
                🏔️ Manitoba Business Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Manitoba Small Business Grants 2026
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Access $380M+ in Manitoba business development programs. From innovation growth funding to 
                rural development support - complete guide to Manitoba's entrepreneurial opportunities.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=manitoba-business-grants-expert-help">
                  Get Expert Help with Manitoba Grants
                </Link>
              </Button>
              <p className="text-teal-200 text-sm mt-4">
                Free consultation • 84% Manitoba success rate • Innovation specialists
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
                  <div className="text-3xl font-bold text-teal-600 mb-2">$380M+</div>
                  <div className="text-gray-600">Manitoba SME Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-600 mb-2">25+</div>
                  <div className="text-gray-600">Active Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">84%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$68K</div>
                  <div className="text-gray-600">Average Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Manitoba Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Major Manitoba Small Business Programs</h2>
              
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
                        <span><strong>Up to $150K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>All Industries</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive funding support for Manitoba businesses to enhance competitiveness and growth.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Business expansion and modernization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Equipment and technology upgrades</span>
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
                        <span><strong>Innovation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Funding for Manitoba businesses developing innovative products, services, and technologies.
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
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Growth Capital</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Equity investment funding for high-growth Manitoba small businesses and startups.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Venture capital investment</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Scale-up business support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Strategic mentorship and guidance</span>
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
                      Specialized support for businesses in rural Manitoba communities and agricultural sectors.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Rural business development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Agricultural value-added projects</span>
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

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Access Manitoba's $380M+ Business Development Ecosystem
              </h2>
              <p className="text-xl text-teal-100 mb-8">
                Manitoba's balanced approach supports innovation, rural development, and business growth. 
                Our Manitoba specialists understand the province's unique opportunities and have secured over $4.2M for local businesses.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Manitoba Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Manitoba program specialization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Innovation and technology expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Rural development guidance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Winnipeg and regional office connections</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>84% success rate for Manitoba businesses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Venture capital and growth funding expertise</span>
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
