import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Wheat, Building, Users, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Saskatchewan Small Business Grants 2025 | $425M+ SME Growth Programs",
  description: "Complete guide to Saskatchewan small business grants. Access Saskatchewan Small Business Loans, Innovation Saskatchewan Programs, Agriculture Value-Added Fund, and Export Development programs.",
  keywords: "Saskatchewan small business grants, Saskatchewan business funding, Innovation Saskatchewan Programs, Agriculture Value-Added Fund, Saskatchewan Export Development Program",
}

export default function SaskatchewanSmallBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-yellow-600 to-amber-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🌾 Saskatchewan Business Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Saskatchewan Small Business Grants 2025
              </h1>
              <p className="text-xl text-yellow-100 mb-8">
                Access $425M+ in Saskatchewan SME growth programs. From agriculture value-added funding to 
                innovation programs - complete guide to Saskatchewan's business development opportunities.
              </p>
              <Button size="lg" className="bg-white hover:bg-gray-100 text-yellow-700 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=saskatchewan-business-grants-expert-help">
                  Get Expert Help with Saskatchewan Grants
                </Link>
              </Button>
              <p className="text-yellow-200 text-sm mt-4">
                Free consultation • 86% Saskatchewan success rate • Agriculture specialists
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
                  <div className="text-3xl font-bold text-yellow-600 mb-2">$425M+</div>
                  <div className="text-gray-600">Saskatchewan SME Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">30+</div>
                  <div className="text-gray-600">Active Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">86%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$73K</div>
                  <div className="text-gray-600">Average Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Saskatchewan Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Major Saskatchewan Small Business Programs</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Saskatchewan Small Business Loans */}
                <Card className="border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-700">Saskatchewan Small Business Loans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $100K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>All Industries</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Low-interest loans for Saskatchewan small businesses to support growth and expansion initiatives.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Competitive interest rates</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Flexible repayment terms</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Equipment and working capital</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Innovation Saskatchewan Programs */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Innovation Saskatchewan Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $300K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Funding for Saskatchewan businesses developing innovative products, services, and technologies.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Research and development support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology commercialization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation ecosystem development</span>
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
                      Specialized funding for Saskatchewan agricultural businesses to add value to primary products.
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
                      Support for Saskatchewan businesses to develop export markets and international opportunities.
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
              </div>
            </div>
          </div>
        </section>

        {/* Saskatchewan Sector Priorities */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Saskatchewan Economic Priorities</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <Wheat className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Agriculture & Food</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Food processing, agricultural technology, and value-added agricultural products.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Building className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Mining & Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Potash, uranium, oil and gas services, and resource-based manufacturing.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      AgTech, clean technology, software development, and digital innovation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-yellow-600 to-amber-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Unlock Saskatchewan's $425M+ in Business Funding
              </h2>
              <p className="text-xl text-yellow-100 mb-8">
                Saskatchewan's economy is built on agriculture, resources, and innovation. Our Saskatchewan specialists 
                understand the province's unique opportunities and have secured over $5M for local businesses.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Saskatchewan Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Saskatchewan program specialization</span>
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
                    <span>Saskatoon and Regina local teams</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>86% success rate for Saskatchewan businesses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Export development and trade expertise</span>
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
