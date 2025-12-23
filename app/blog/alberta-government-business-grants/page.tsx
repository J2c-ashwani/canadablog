import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alberta Government Business Grants 2026 | Provincial Energy & Innovation Funding Programs Guide",
  description: "Complete guide to Alberta government business grants and provincial funding programs. Access Alberta Innovates, ERA programs, diversification initiatives, and energy sector funding for Alberta businesses.",
  keywords: "Alberta government business grants, Alberta provincial funding, Alberta Innovates grants, ERA funding, Alberta energy diversification programs, Alberta business support programs 2026",
  openGraph: {
    title: "Alberta Government Business Grants 2026 | Energy & Innovation Provincial Funding Guide",
    description: "Comprehensive guide to Alberta provincial business grants offering funding for energy innovation, economic diversification, and technology development.",
    url: "https://www.fsidigital.ca/blog/alberta-government-business-grants",
    images: ["/og-image.jpg"],
  },
}

export default function AlbertaGovernmentBusinessGrantsBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🛢️ Energy Province Business Innovation Support
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Alberta Government Business Grants & Provincial Funding
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Alberta's comprehensive provincial business support ecosystem offering grants, loans, and tax credits 
                from $10,000 to $15M+ through Alberta Innovates, Emissions Reduction Alberta (ERA), economic diversification 
                initiatives, and energy sector transformation programs supporting innovation and competitiveness in Canada's energy capital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=alberta">
                    Find Your Alberta Program
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
                  <div className="text-3xl font-bold text-orange-600 mb-2">$15M+</div>
                  <div className="text-gray-600">Max Alberta Provincial Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$2.8B</div>
                  <div className="text-gray-600">Annual Provincial Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">45+</div>
                  <div className="text-gray-600">Provincial Program Streams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">16,000+</div>
                  <div className="text-gray-600">Businesses Supported Annually</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Alberta as Energy Innovation & Diversification Leader</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Alberta represents Canada's energy capital and innovation hub, with a sophisticated ecosystem focused on 
                  energy sector transformation, economic diversification, and technology commercialization. The province 
                  delivers comprehensive business support through Alberta Innovates, Emissions Reduction Alberta (ERA), 
                  Northern and Regional Economic Development programs, and strategic partnerships with PrairiesCan, creating 
                  Canada's most energy-focused and diversification-oriented provincial business ecosystem.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-orange-800">Provincial Policy Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Energy sector innovation and clean technology development</li>
                      <li>• Economic diversification beyond traditional energy sectors</li>
                      <li>• Technology commercialization and startup ecosystem support</li>
                      <li>• Regional development and rural economic growth</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">Strategic Provincial Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Coordination with PrairiesCan regional development</li>
                      <li>• Energy transition and emissions reduction leadership</li>
                      <li>• Technology transfer and research commercialization</li>
                      <li>• Indigenous economic development and reconciliation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Alberta Provincial Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Alberta Provincial Programs</h2>
              
              <div className="space-y-8">
                {/* Alberta Innovates */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Alberta Innovates</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $2M</strong></span>
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
                        <span><strong>Commercialization</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Alberta's flagship innovation agency providing funding and support for technology companies, 
                      research commercialization, and innovation ecosystem development across diverse sectors from 
                      energy to health technologies.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Key Program Streams:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Voucher Program (up to $100K)</li>
                          <li>• Micro Voucher Program (up to $10K)</li>
                          <li>• R&D Associates Program (up to $105K)</li>
                          <li>• Industry Commercialization Associates (up to $120K)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Innovation Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Energy and environmental technologies</li>
                          <li>• Health innovations and life sciences</li>
                          <li>• Agri-food and bioindustrial development</li>
                          <li>• Information and communications technology</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Provincial Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Alberta-based business operations</li>
                          <li>• Innovation and technology commercialization focus</li>
                          <li>• Job creation and economic impact potential</li>
                          <li>• Industry collaboration and partnership</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emissions Reduction Alberta (ERA) */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Emissions Reduction Alberta (ERA)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $15M</strong></span>
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
                        <span><strong>Energy Innovation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Provincial clean technology and emissions reduction agency supporting businesses in developing 
                      and deploying innovative technologies that reduce greenhouse gas emissions while maintaining 
                      economic competitiveness.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Key ERA Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Industrial Transformation Challenge:</strong> $500K-$15M for large-scale projects</li>
                          <li>• <strong>Strategic Energy Management for Industry (SEMI):</strong> Up to $1M</li>
                          <li>• <strong>Lab Services Incentive Program (LSIP):</strong> Up to $100K</li>
                          <li>• <strong>Natural Gas Challenge:</strong> Technology development and deployment</li>
                          <li>• <strong>Grand Challenges:</strong> Sector-specific innovation programs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Clean energy technology development</li>
                          <li>• Industrial process improvement and efficiency</li>
                          <li>• Carbon capture, utilization, and storage (CCUS)</li>
                          <li>• Renewable energy integration and storage</li>
                          <li>• Methane emission reduction technologies</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Economic Diversification Programs */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Alberta Economic Diversification Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $750K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Diversification</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Economic Growth</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Regional Development</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Provincial economic diversification initiatives supporting businesses in non-traditional 
                      sectors, regional development, and Indigenous economic development across Alberta.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Key Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Aboriginal Business Investment Fund (ABIF):</strong> $150K-$750K for Indigenous businesses</li>
                          <li>• <strong>Community Economic Development (CEDD):</strong> Regional growth initiatives</li>
                          <li>• <strong>Northern and Regional Economic Development (NRED):</strong> $3M annual funding</li>
                          <li>• <strong>Business Link Support:</strong> Comprehensive business advisory services</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Diversification Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Technology and software development</li>
                          <li>• Advanced manufacturing and materials</li>
                          <li>• Agriculture and food processing</li>
                          <li>• Tourism and hospitality development</li>
                          <li>• Creative industries and digital media</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Alberta Tax Credits & Incentives */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Alberta Tax Credits & Business Incentives</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to 30%</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Tax Credits</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Investment Support</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Sector Specific</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive tax credit and incentive programs supporting business investment, job creation, 
                      and sector-specific development across Alberta's diverse economy.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-purple-700">Key Tax Credits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Alberta Film and Television Tax Credit:</strong> Up to 30% for productions over $500K</li>
                          <li>• <strong>Alberta Agri-Processing Investment Tax Credit (APITC):</strong> Up to 12%</li>
                          <li>• <strong>Innovation Employment Grant:</strong> R&D investment support</li>
                          <li>• <strong>Small Business Tax Rate:</strong> Lowest in Canada at 2%</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Business Incentives:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Competitive corporate tax rates</li>
                          <li>• No provincial sales tax (PST)</li>
                          <li>• Capital investment attraction programs</li>
                          <li>• International business development support</li>
                          <li>• Export development and trade facilitation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PrairiesCan Regional Programs */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <FileText className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">PrairiesCan Regional Development Programs</CardTitle>
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
                        <span><strong>Prairies Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Innovation Support</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal regional development programs delivered through PrairiesCan (Prairies Economic Development Canada) 
                      supporting Alberta business growth, innovation, and economic diversification.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-teal-700">Key PrairiesCan Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Regional Economic Growth through Innovation</li>
                          <li>• Business Scale-Up and Productivity program</li>
                          <li>• Aerospace Regional Recovery Initiative</li>
                          <li>• Regional Artificial Intelligence Initiative (RAII)</li>
                          <li>• Indigenous Business Development support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Alberta Regional Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Energy sector transformation and diversification</li>
                          <li>• Technology commercialization and scale-up</li>
                          <li>• Rural and Indigenous economic development</li>
                          <li>• Innovation ecosystem capacity building</li>
                          <li>• International market development and export</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Alberta Programs */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">Additional Alberta Provincial Initiatives</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-pink-700">Workforce & Skills Development:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Alberta Workplace Training:</strong> Up to $7K for employee training</li>
                          <li>• <strong>Alberta Self-Employment Program:</strong> Entrepreneurship support</li>
                          <li>• <strong>Indigenous Employment Training Partnerships:</strong> Skills development</li>
                          <li>• <strong>Emerging Innovators Challenge:</strong> Youth entrepreneurship</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Specialized Sector Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Alberta Foundation for the Arts (AFA):</strong> Creative industries support</li>
                          <li>• <strong>Results Driven Agriculture Research (RDAR):</strong> Agricultural innovation</li>
                          <li>• <strong>Digital Economy Program:</strong> Technology adoption and transformation</li>
                          <li>• <strong>Campus Alberta Small Business Engagement:</strong> University partnerships</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Alberta Provincial Policy Integration */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Alberta Provincial Policy Integration</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">🛢️ Energy Transformation Leadership Integration:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Energy Sector Innovation:</strong> Leading clean technology development and energy transition</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Economic Diversification:</strong> Supporting non-traditional sectors and innovation ecosystems</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Technology Commercialization:</strong> Research-to-market acceleration and startup support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Regional Development:</strong> Rural and Indigenous economic development initiatives</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">⚡ Innovation & Competitiveness Excellence:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Business Climate Leadership:</strong> Lowest small business tax rate and no PST</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Clean Technology Investment:</strong> $15M+ ERA funding for emission reduction technologies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Federal-Provincial Coordination:</strong> PrairiesCan integration and program synergies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Innovation Infrastructure:</strong> Alberta Innovates ecosystem and commercialization support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Alberta Provincial Business Funding?
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Get the complete Alberta provincial application guide or work with our Alberta business funding specialists 
                who have secured $11M+ in provincial grants with expertise across all Alberta programs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Alberta Approach</h4>
                  <p className="text-orange-100 text-sm mb-4">
                    Get our comprehensive Alberta provincial application guide with program-specific templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-orange-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-alberta-business-grants">
                      <Download className="w-4 h-4 mr-2" />
                      Get Alberta Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Alberta Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with Alberta business specialists who have secured $11M+ in provincial funding with 84% success rate.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=alberta-business-expert-help">
                      Get Alberta Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-orange-200 text-sm mt-6">
                84% success rate for Alberta applications • Average funding secured: $295K • All Alberta programs expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
