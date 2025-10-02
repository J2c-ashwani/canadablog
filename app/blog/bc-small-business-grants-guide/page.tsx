import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Leaf, Mountain, Building, Users, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BC Small Business Grants 2025 | $1.3B+ British Columbia SME Funding",
  description: "Complete guide to BC small business grants. Access Small Business Recovery Grant, BC Small Business Venture Capital, CleanBC Industry Fund, and Indigenous business investment programs.",
  keywords: "BC small business grants, British Columbia business funding, Small Business Recovery Grant BC, CleanBC Industry Fund, BC Small Business Venture Capital",
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
                🏔️ BC Business Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                BC Small Business Grants 2025
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Access $1.3B+ in BC government funding for small businesses. From recovery grants to 
                clean technology funding - complete guide to British Columbia's innovative business programs.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=bc-business-grants-expert-help">
                  Get Expert Help with BC Grants
                </Link>
              </Button>
              <p className="text-green-200 text-sm mt-4">
                Free consultation • 89% BC success rate • Clean tech specialists
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
                  <div className="text-3xl font-bold text-green-600 mb-2">$1.3B+</div>
                  <div className="text-gray-600">BC SME Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">40+</div>
                  <div className="text-gray-600">Active BC Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">89%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major BC Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Major BC Small Business Programs</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Small Business Recovery Grant */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Small Business Recovery Grant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $30K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Recovery Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Financial support for BC small businesses affected by economic challenges and disruptions.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Non-repayable funding assistance</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Quick application and approval process</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Operational cost support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* CleanBC Industry Fund */}
                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">CleanBC Industry Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Leaf className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Clean Technology</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Major funding for clean technology and emissions reduction projects in British Columbia.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Clean technology development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Emissions reduction initiatives</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Sustainable business practices</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* BC Small Business Venture Capital */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">BC Small Business Venture Capital</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Growth Capital</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Venture capital funding for high-growth BC small businesses and startups.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Equity investment funding</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Scale-up support services</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Strategic business guidance</span>
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
                      Specialized funding for Indigenous-owned businesses and partnerships in BC.
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
              </div>
            </div>
          </div>
        </section>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-teal-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Navigate BC's Innovation-Focused Funding Landscape
              </h2>
              <p className="text-xl text-green-100 mb-8">
                BC's $1.3B+ in funding emphasizes clean technology, Indigenous businesses, and economic innovation. 
                Our BC specialists understand the unique requirements and have secured over $9M for local businesses.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our BC Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>BC program specialization and expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Clean technology funding optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Indigenous business funding guidance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Vancouver and Victoria local teams</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>89% success rate for BC businesses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Sustainability and innovation focus</span>
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
