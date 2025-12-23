import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Globe } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quebec Government Business Grants 2026 | Aide aux Entreprises & Provincial Funding Programs Guide",
  description: "Complete guide to Quebec government business grants and aide aux entreprises provincial funding. Access Investissement Quebec, ESSOR, PSCE programs, and R&D tax credits for Quebec businesses.",
  keywords: "Quebec government business grants, aide aux entreprises Quebec, Investissement Quebec ESSOR, PSCE Quebec funding, Quebec R&D tax credits, Quebec provincial funding programs 2026",
  openGraph: {
    title: "Quebec Government Business Grants 2026 | Aide aux Entreprises Provincial Funding Guide",
    description: "Comprehensive guide to Quebec provincial business grants offering aide aux entreprises funding for innovation, commercialization, and international expansion.",
    url: "https://www.fsidigital.ca/blog/quebec-government-business-grants",
    images: ["/og-image.jpg"],
  },
}

export default function QuebecGovernmentBusinessGrantsBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🍁 Province de Québec - Aide aux Entreprises
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Quebec Government Business Grants & Aide aux Entreprises
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Quebec's comprehensive provincial business support ecosystem offering grants, loans, and tax credits
                from $5,000 to $15M+ through Investissement Québec, ESSOR, PSCE programs, and R&D initiatives
                supporting innovation, commercialization, and international expansion in Canada's largest francophone economy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=quebec">
                    Find Your Quebec Program
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">$15M+</div>
                  <div className="text-gray-600">Max Quebec Provincial Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$3.2B</div>
                  <div className="text-gray-600">Annual Provincial Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">60+</div>
                  <div className="text-gray-600">Provincial Program Streams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">22,000+</div>
                  <div className="text-gray-600">Businesses Supported Annually</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Quebec as Innovation & Commercialization Leader</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Quebec represents Canada's second-largest provincial economy and North America's largest francophone
                  business environment, with sophisticated support through Investissement Québec, comprehensive R&D tax
                  credits, and international commercialization programs. The province delivers comprehensive aide aux
                  entreprises through ESSOR productivity programs, PSCE commercialization support, and strategic partnerships
                  with CED-Quebec, creating Canada's most innovation-focused provincial business ecosystem.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Provincial Policy Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Innovation and R&D commercialization excellence</li>
                      <li>• International market expansion and export development</li>
                      <li>• Digital transformation and Industry 4.0 adoption</li>
                      <li>• Francophone business leadership and cultural industries</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">Strategic Provincial Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Coordination with CED-Quebec regional development</li>
                      <li>• Franco-Canadian business and trade relationships</li>
                      <li>• North American French-language market leadership</li>
                      <li>• Innovation cluster development and ecosystem integration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Quebec Provincial Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Quebec Provincial Programs</h2>

              <div className="space-y-8">
                {/* ESSOR Program */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">ESSOR (Investissement Québec)</CardTitle>
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
                        <span><strong>Investment Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Productivity</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Scale-up Support</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Quebec's flagship productivity and investment acceleration program supporting manufacturing,
                      wholesale/retail trade businesses in productivity improvements, environmental impact reduction,
                      and internationalization strategies.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Program Components:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Component 1A: Feasibility studies (up to $50K)</li>
                          <li>• Component 1B: Investment projects (up to $15M)</li>
                          <li>• Component 2: Environmental impact reduction</li>
                          <li>• Component 3: Internationalization strategies</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Sectors:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Manufacturing and industrial production</li>
                          <li>• Wholesale trade operations</li>
                          <li>• Retail trade and distribution</li>
                          <li>• Transportation and warehousing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Quebec Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Quebec-based business operations</li>
                          <li>• Minimum investment thresholds</li>
                          <li>• Productivity improvement objectives</li>
                          <li>• Job creation and retention commitments</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PSCE Program */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Globe className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">PSCE - Programme de soutien à la commercialisation et à l'exportation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $250K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Commercialization</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Export Development</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Market Expansion</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive commercialization and export support program helping Quebec businesses
                      expand market presence domestically and internationally through strategic market development initiatives.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Program Components:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Component 1:</strong> Market development and commercialization ($25K-$250K)</li>
                          <li>• <strong>Component 2:</strong> International market expansion and export</li>
                          <li>• <strong>Component 3:</strong> Marketing strategy development (up to $100K)</li>
                          <li>• Trade mission participation and market intelligence</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Eligible Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Product commercialization and market launch</li>
                          <li>• International trade development and partnerships</li>
                          <li>• Marketing strategy development and implementation</li>
                          <li>• Export market research and intelligence</li>
                          <li>• Sales force development and training</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quebec R&D Tax Credits */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Quebec R&D Tax Credits (Revenu Québec)</CardTitle>
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
                        <span><strong>R&D Excellence</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Up to 30%</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Innovation Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Quebec's comprehensive R&D tax credit system providing up to 30% refundable tax credits
                      for research and development activities, positioning Quebec as Canada's most generous
                      R&D support jurisdiction.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-purple-700">R&D Tax Credit Components:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Basic R&D Credit:</strong> 14% refundable for all qualifying activities</li>
                          <li>• <strong>Enhanced Credit:</strong> Up to 30% for eligible small/medium businesses</li>
                          <li>• <strong>University Partnership Credit:</strong> Additional 14% for collaboration</li>
                          <li>• <strong>Pre-competitive R&D:</strong> 35% for consortium research projects</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Innovation Specializations:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Information technology and software development</li>
                          <li>• Biotechnology and life sciences research</li>
                          <li>• Advanced materials and manufacturing processes</li>
                          <li>• Clean technology and environmental innovation</li>
                          <li>• Creative digital media and interactive entertainment</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* NovaScience Program */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">NovaScience Program (MEIE)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $75K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Innovation Management</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Up to 50%</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Talent Development</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Provincial innovation management program supporting the hiring of innovation and
                      commercialization managers to accelerate technology transfer and business development
                      in Quebec's professional, scientific, and technical services sectors.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Program Objectives:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Innovation capacity building and management</li>
                          <li>• Technology commercialization acceleration</li>
                          <li>• Business development and market expansion</li>
                          <li>• Innovation ecosystem integration</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Innovation manager salary support</li>
                          <li>• Commercialization strategy development</li>
                          <li>• Technology transfer and licensing</li>
                          <li>• Partnership and collaboration facilitation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Target Organizations:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Professional services firms</li>
                          <li>• Scientific and technical consulting</li>
                          <li>• Research and development organizations</li>
                          <li>• Technology transfer organizations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CED-Quebec Regional Programs */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <FileText className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">CED-Quebec Regional Development Programs</CardTitle>
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
                        <span><strong>Economic Diversification</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Innovation Support</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal regional development programs delivered through Canada Economic Development for
                      Quebec Regions (CED) supporting business growth, innovation, and economic diversification
                      across Quebec's diverse regional economies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-teal-700">Key CED-Quebec Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Regional Economic Growth through Innovation</li>
                          <li>• Regional Artificial Intelligence Initiative (RAII)</li>
                          <li>• Quebec Economic Diversification Program (QEPD)</li>
                          <li>• Innovation and commercialization support</li>
                          <li>• Tourism and creative industries development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Regional Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Montreal innovation hub and technology cluster</li>
                          <li>• Quebec City biotechnology and life sciences</li>
                          <li>• Regional economic diversification initiatives</li>
                          <li>• Francophone business development and trade</li>
                          <li>• Cultural and creative industries ecosystem</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Quebec Programs */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">Additional Quebec Provincial Initiatives</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-pink-700">Digital Transformation & Industry 4.0:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>CDAP Quebec:</strong> Digital adoption program up to $100K</li>
                          <li>• <strong>SIPEM Program:</strong> Manufacturing productivity and automation</li>
                          <li>• <strong>Digital Transformation Grants:</strong> Technology adoption support</li>
                          <li>• <strong>E-commerce Acceleration:</strong> Online presence development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Cultural Industries & Creative Economy:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>SODEC Programs:</strong> Cultural and creative industries support</li>
                          <li>• <strong>PROMPT:</strong> Digital media and interactive entertainment</li>
                          <li>• <strong>Cultural Export Support:</strong> International market development</li>
                          <li>• <strong>Francophone Content Development:</strong> French-language media production</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quebec Provincial Policy Integration */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Quebec Provincial Policy Integration</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-700">🇫🇷 Francophone Business Leadership Integration:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>French-Language Business Excellence:</strong> Quebec as North America's francophone business capital</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Franco-Canadian Trade Networks:</strong> Unique access to French-speaking markets globally</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Cultural Industries Leadership:</strong> Creative content and digital media excellence</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>International Francophone Relations:</strong> Quebec-France-Belgium business connections</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">🚀 Innovation & R&D Excellence:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>R&D Tax Credit Leadership:</strong> Most generous R&D support in North America (up to 30%)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Innovation Cluster Development:</strong> Montreal AI, Quebec City biotech, regional specialization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>University-Industry Collaboration:</strong> Strong research commercialization ecosystem</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Federal-Provincial Integration:</strong> CED-Quebec coordination and program synergies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Quebec Provincial Business Funding?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get the complete Quebec provincial application guide or work with our Quebec business funding specialists
                who have secured $14M+ in provincial grants with expertise across all Quebec aide aux entreprises programs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Quebec Approach</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our comprehensive Quebec provincial application guide with program-specific templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-quebec-business-grants">
                      <Download className="w-4 h-4 mr-2" />
                      Get Quebec Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Quebec Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with Quebec business specialists who have secured $14M+ in provincial funding with 88% success rate.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=quebec-business-expert-help">
                      Get Quebec Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-blue-200 text-sm mt-6">
                88% success rate for Quebec applications • Average funding secured: $385K • All Quebec programs expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
