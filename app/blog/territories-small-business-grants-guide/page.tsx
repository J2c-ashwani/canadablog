import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Mountain, MapPin, Building, Users, Snowflake } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Territories Small Business Grants 2026 | $125M+ NT, YT, Nunavut Combined Funding",
  description: "Complete guide to Territories business grants. Access NWT Business Development, Yukon Small Business Support, Nunavut Economic Development, and Indigenous Business Programs.",
  keywords: "Territories small business grants, NWT business development, Yukon small business support, Nunavut economic development, Northwest Territories business funding, Yukon business grants",
}

export default function TerritoriesSmallBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                ❄️ Northern Territories Business Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Territories Small Business Grants 2026
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Access $125M+ in combined funding across Northwest Territories, Yukon, and Nunavut. 
                Specialized programs for northern businesses, Indigenous enterprises, and remote community development.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=territories-business-grants-expert-help">
                  Get Expert Help with Territories Grants
                </Link>
              </Button>
              <p className="text-purple-200 text-sm mt-4">
                Free consultation • 83% northern success rate • Remote community specialists
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
                  <div className="text-3xl font-bold text-purple-600 mb-2">$125M+</div>
                  <div className="text-gray-600">Combined Territory Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">3</div>
                  <div className="text-gray-600">Northern Territories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">83%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$92K</div>
                  <div className="text-gray-600">Average Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Territory Programs by Region */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Northern Territories Business Programs</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* NWT Business Development */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">NWT Business Development Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $200K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>All Industries</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive business support for Northwest Territories businesses and entrepreneurs.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Business startup and expansion funding</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Northern business development support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Remote community business services</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Yukon Small Business Support */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Yukon Small Business Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $150K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Snowflake className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Yukon Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Targeted support for Yukon Territory small businesses and economic development initiatives.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Small business loans and grants</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Tourism and hospitality support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Northern innovation initiatives</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Nunavut Economic Development */}
                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">Nunavut Economic Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $175K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Mountain className="w-5 h-5 text-teal-600 mr-2" />
                        <span><strong>Arctic Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Economic development funding for Nunavut businesses and community-based enterprises.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Community economic development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Traditional economy integration</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Inuit-owned business support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Indigenous Business Programs */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Indigenous Business Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $300K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Indigenous Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Specialized funding for Indigenous-owned businesses across all three territories.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Indigenous business development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Cultural tourism and arts support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Traditional knowledge commercialization</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Northern Business Challenges & Opportunities */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Northern Business Priorities</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <Mountain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Natural Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Mining, oil and gas services, renewable energy, and resource-based manufacturing.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <MapPin className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Tourism & Culture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Northern tourism, cultural experiences, arts and crafts, and hospitality services.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Community Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Essential services, transportation, telecommunications, and remote community support.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Navigate Northern Canada's Unique Business Environment
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                The Territories present unique opportunities and challenges for business development. 
                Our northern specialists understand the remote business environment and have secured over $2.8M for territorial businesses.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Territories Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>All three territories coverage</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Remote and northern business expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Indigenous business development guidance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Territorial government relationships</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>83% success rate for northern businesses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Resource and tourism sector focus</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=territories-grants-expert-help">
                  Get Expert Help with Territories Grants
                </Link>
              </Button>
              <p className="text-purple-200 text-sm mt-4">
                Free consultation • Northern specialists • Remote business expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
