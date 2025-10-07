import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Mountain } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "British Columbia Government Business Grants 2025 | BC Provincial Funding Programs Guide",
  description: "Complete guide to British Columbia government business grants and provincial funding programs. Access Innovate BC, CleanBC, Creative BC, and PacifiCan regional funding for BC businesses.",
  keywords: "British Columbia government business grants, BC provincial funding, Innovate BC grants, CleanBC funding, Creative BC support, PacifiCan regional funding, BC business support programs 2025",
  openGraph: {
    title: "British Columbia Government Business Grants 2025 | BC Provincial Funding Guide",
    description: "Comprehensive guide to BC provincial business grants offering funding for innovation, clean technology, creative industries, and regional development.",
    url: "https://grantfinder.pro/blog/british-columbia-government-business-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function BritishColumbiaGovernmentBusinessGrantsBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏔️ Pacific Province Business Support Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                British Columbia Government Business Grants & Provincial Funding
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                British Columbia's comprehensive provincial business support ecosystem offering grants, loans, and incentives 
                from $5,000 to $5M+ through Innovate BC, CleanBC, Creative BC, and PacifiCan regional initiatives 
                supporting innovation, sustainability, and creative industries in Canada's Pacific gateway province.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=bc">
                    Find Your BC Program
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/government-grants">
                    Back to Government Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Program Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$5M+</div>
                  <div className="text-gray-600">Max BC Provincial Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$1.8B</div>
                  <div className="text-gray-600">Annual Provincial Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">40+</div>
                  <div className="text-gray-600">Provincial Program Streams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">18,000+</div>
                  <div className="text-gray-600">Businesses Supported Annually</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">BC as Canada's Pacific Innovation Hub</h2>
                <p className="text-lg text-gray-700 mb-6">
                  British Columbia serves as Canada's gateway to Asia-Pacific markets and innovation, with a provincial 
                  economy focused on technology, clean energy, creative industries, and sustainable development. The BC 
                  government delivers comprehensive business support through Innovate BC, CleanBC programs, Creative BC, 
                  and strategic partnerships with PacifiCan federal regional development, creating Canada's most 
                  sustainability-focused provincial business ecosystem.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Provincial Policy Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Clean technology and sustainable innovation</li>
                      <li>• Digital transformation and technology adoption</li>
                      <li>• Creative industries and cultural content development</li>
                      <li>• Asia-Pacific trade and export competitiveness</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">Strategic Provincial Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Coordination with PacifiCan regional development</li>
                      <li>• CleanBC climate action and emission reduction goals</li>
                      <li>• Asia-Pacific Gateway trade and investment facilitation</li>
                      <li>• Indigenous reconciliation and economic development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major BC Provincial Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major BC Provincial Programs</h2>
              
              <div className="space-y-8">
                {/* Innovate BC */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Innovate BC</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $3M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Innovation Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Tech Development</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Scale-up Support</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      BC's flagship innovation agency providing funding and support for technology companies, 
                      research commercialization, and innovation ecosystem development across British Columbia.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Key Program Streams:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Ignite Program (up to $300K)</li>
                          <li>• Platform Program (up to $3M)</li>
                          <li>• Sector Innovation Programs</li>
                          <li>• International market development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Innovation Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Information and communications technology</li>
                          <li>• Life sciences and health technologies</li>
                          <li>• Clean technology and renewable energy</li>
                          <li>• Advanced materials and manufacturing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Provincial Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• BC-based business operations</li>
                          <li>• Technology commercialization focus</li>
                          <li>• Export and scale-up potential</li>
                          <li>• Job creation and economic impact</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CleanBC Programs */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Mountain className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">CleanBC Industry Fund & Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Clean Technology</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Emission Reduction</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Industrial Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Provincial clean technology and climate action programs supporting businesses in reducing 
                      greenhouse gas emissions, adopting clean technologies, and advancing BC's net-zero goals.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">CleanBC Industry Fund:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Large industrial emission reduction projects</li>
                          <li>• Clean technology adoption and deployment</li>
                          <li>• Energy efficiency and fuel switching</li>
                          <li>• Carbon capture and industrial process improvements</li>
                          <li>• Minimum $3M project investment requirement</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Additional CleanBC Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• CleanBC Commercial Express (up to $125K)</li>
                          <li>• Custom Efficiency Program (energy retrofits)</li>
                          <li>• CleanBC Go Electric commercial rebates</li>
                          <li>• Sustainable Transportation programs</li>
                          <li>• Building retrofits and efficiency upgrades</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Creative BC */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Creative BC</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $10M+</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Creative Industries</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Content Creation</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Export Development</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      BC's creative industries agency supporting film, television, interactive media, music, 
                      and digital content companies through comprehensive funding and tax credit programs.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-purple-700">Creative Industries Supported:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Film and television production</li>
                          <li>• Interactive digital media and gaming</li>
                          <li>• Music creation, recording, and publishing</li>
                          <li>• Digital animation and visual effects</li>
                          <li>• Publishing and magazine production</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Key Program Streams:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• BC Production Services Tax Credit</li>
                          <li>• Interactive Digital Media Tax Credit</li>
                          <li>• Business Foundations Program ($2K-$10K)</li>
                          <li>• Music Industry development funding</li>
                          <li>• International trade and market development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* BC Manufacturing Jobs Fund */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">BC Manufacturing Jobs Fund (BCMJF)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Min. $100K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Manufacturing</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Up to 20% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Capital Investment</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Provincial manufacturing competitiveness program supporting capital investments, equipment 
                      upgrades, and productivity improvements in BC's manufacturing sector.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Machinery and equipment purchases</li>
                          <li>• Manufacturing process improvements</li>
                          <li>• Technology adoption and automation</li>
                          <li>• Facility upgrades and modifications</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Manufacturing Sectors:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Food and beverage processing</li>
                          <li>• Wood products and forestry</li>
                          <li>• Advanced manufacturing and materials</li>
                          <li>• Clean technology manufacturing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Provincial Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• BC manufacturing operations</li>
                          <li>• Minimum $500K total project investment</li>
                          <li>• Job creation and retention commitment</li>
                          <li>• Environmental compliance and sustainability</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PacifiCan Regional Programs */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <FileText className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">PacifiCan Regional Development Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Federal-Regional</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Economic Growth</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Innovation Support</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal regional development programs delivered through PacifiCan (Pacific Economic Development 
                      Canada) supporting BC business growth, innovation, and economic diversification.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-teal-700">Key PacifiCan Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Regional Economic Growth through Innovation (REGI)</li>
                          <li>• Business Scale-Up and Productivity program</li>
                          <li>• Regional Artificial Intelligence Initiative (RAII)</li>
                          <li>• Indigenous Business Development support</li>
                          <li>• Tourism and creative industries development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Regional Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Technology commercialization and scale-up</li>
                          <li>• Clean technology and sustainability</li>
                          <li>• Asia-Pacific trade and export development</li>
                          <li>• Rural and Indigenous economic development</li>
                          <li>• Innovation ecosystem capacity building</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional BC Programs */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">Additional BC Provincial Initiatives</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-pink-700">Workforce and Skills Development:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>BC Employer Training Grant (ETG):</strong> Up to $300K for employee training</li>
                          <li>• <strong>WorkBC programs:</strong> Workforce development and skills training</li>
                          <li>• <strong>Indigenous Skills and Employment:</strong> First Nations workforce development</li>
                          <li>• <strong>Women in Trades:</strong> Gender diversity in skilled trades</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Specialized Provincial Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Small Business BC:</strong> Workplace accessibility grants up to $5K</li>
                          <li>• <strong>Community Futures:</strong> Loans and funding up to $1M</li>
                          <li>• <strong>BC Agritech programs:</strong> Agricultural innovation support</li>
                          <li>• <strong>Forestry Innovation:</strong> Forest sector technology and sustainability</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* BC Provincial Policy Integration */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">BC Provincial Policy Integration</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-700">🌊 Pacific Gateway Strategy Integration:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Asia-Pacific Trade Leadership:</strong> BC as Canada's gateway to Asian markets and trade relationships</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Federal-Provincial Coordination:</strong> Integration with PacifiCan and federal trade initiatives</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Innovation Corridor Development:</strong> Vancouver-Seattle tech corridor and cross-border collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Indigenous Economic Reconciliation:</strong> Truth and Reconciliation economic development initiatives</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">🌱 CleanBC Climate Leadership:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Net-Zero by 2050:</strong> Provincial climate commitments driving clean technology adoption</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Carbon Pricing Integration:</strong> Business competitiveness and emission reduction balance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Clean Energy Leadership:</strong> Renewable energy development and clean technology export</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Sustainable Resource Management:</strong> Forestry, mining, and ocean resource sustainability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access BC Provincial Business Funding?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get the complete British Columbia provincial application guide or work with our BC business funding specialists 
                who have secured $8M+ in provincial grants with expertise across all BC programs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY BC Approach</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our comprehensive BC provincial application guide with program-specific templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-british-columbia-grants">
                      <Download className="w-4 h-4 mr-2" />
                      Get BC Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert BC Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with BC business specialists who have secured $8M+ in provincial funding with 85% success rate.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=bc-business-expert-help">
                      Get BC Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-blue-200 text-sm mt-6">
                85% success rate for BC applications • Average funding secured: $325K • All BC programs expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
