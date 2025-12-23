import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, MapPin, Home, Globe } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Regional Economic Development Grants 2026 | $2.8B+ Community Growth Funding Programs Guide",
  description: "Complete guide to Canada's regional economic development grants. Access RDA funding, community development programs, and 35+ programs offering $2.8B+ for regional growth.",
  keywords: "Canada regional development grants, RDA funding, community economic development, regional growth programs, ACOA PrairiesCan grants Canada 2026",
  openGraph: {
    title: "Canada Regional Economic Development Grants 2026 | $2.8B+ Community Growth Funding Guide",
    description: "Comprehensive guide to Canada's regional economic development funding ecosystem with 35+ programs offering $2.8B+ for community and regional growth.",
    url: "https://www.fsidigital.ca/blog/canada-regional-economic-development-grants-guide",
    images: ["/og-image.jpg"],
  },
}

export default function CanadaRegionalEconomicDevelopmentGrantsGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏘️ Regional & Community Development Funding
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Regional Economic Development Grants Guide
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Access Canada's comprehensive regional economic development funding ecosystem with $2.8B+ available annually through 35+ federal and provincial programs. From Regional Development Agencies' targeted support to community-led initiatives - drive economic growth, diversification, and competitiveness across Canada's diverse regions and communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?category=regional-development">
                    Find Your Regional Program
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/government-grants">
                    Back to All Programs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Development Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$2.8B+</div>
                  <div className="text-gray-600">Annual Regional Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">35+</div>
                  <div className="text-gray-600">Active Regional Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">6</div>
                  <div className="text-gray-600">Federal RDA Agencies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$5M</div>
                  <div className="text-gray-600">Maximum Project Funding</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada as Regional Development Leader</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Canada's regional economic development framework represents one of the world's most comprehensive approaches to place-based economic growth, with over $2.8 billion invested annually through 35+ specialized programs delivered by six federal Regional Development Agencies (RDAs) and complementary provincial initiatives. From Atlantic Canada's innovation ecosystem to Western diversification and Northern development, Canada provides targeted support for regional competitiveness, community resilience, and inclusive economic growth across all provinces and territories.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-orange-800">Regional Policy Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Community economic development and diversification</li>
                      <li>• Regional innovation ecosystems and clusters</li>
                      <li>• Rural and remote community resilience</li>
                      <li>• Indigenous economic development and reconciliation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Strategic Regional Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Federal-provincial-municipal coordination</li>
                      <li>• Community-led development approaches</li>
                      <li>• Regional competitive advantage building</li>
                      <li>• Inter-regional collaboration and knowledge transfer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Regional Development Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Regional Development Programs</h2>
              
              <div className="space-y-8">
                {/* Atlantic Canada Opportunities Agency */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Atlantic Canada Opportunities Agency (ACOA)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$850M+ Portfolio</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Atlantic Provinces</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>All Sectors</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Atlantic Canada's federal development agency supporting innovation, entrepreneurship, and community development across Nova Scotia, New Brunswick, Prince Edward Island, and Newfoundland and Labrador.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">ACOA Program Streams:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Business Development Program:</strong> SME growth and productivity</li>
                          <li>• <strong>Innovation Program:</strong> R&D commercialization support</li>
                          <li>• <strong>Community Development Program:</strong> Infrastructure and capacity</li>
                          <li>• <strong>Trade and Investment:</strong> Export and FDI facilitation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Regional Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Ocean technology and marine industries</li>
                          <li>• Clean technology and renewable energy</li>
                          <li>• Information technology and digital economy</li>
                          <li>• Tourism and cultural industries</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Structure:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Repayable and non-repayable contributions</li>
                          <li>• Up to $5M per project (major initiatives)</li>
                          <li>• Flexible terms based on project type</li>
                          <li>• Leveraged with private and other public funding</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PrairiesCan */}
                <Card className="border-yellow-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-6 h-6 text-yellow-600 mr-3" />
                      <CardTitle className="text-yellow-700">Prairies Economic Development Canada (PrairiesCan)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$200K - $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Prairie Provinces</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Up to 50%</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Diversification</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal agency driving economic growth and diversification in Manitoba, Saskatchewan, and Alberta through business scale-up, innovation commercialization, and community economic development.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-yellow-700">Major 2026 Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Regional Economic Growth through Innovation:</strong> Business scale-up</li>
                          <li>• <strong>Regional Homebuilding Innovation Initiative:</strong> Housing solutions</li>
                          <li>• <strong>Community Economic Development:</strong> Diversification projects</li>
                          <li>• <strong>Regional Artificial Intelligence Initiative:</strong> AI adoption</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Sector Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Agriculture value-added processing</li>
                          <li>• Mining, oil & gas, and energy transition</li>
                          <li>• Advanced manufacturing and logistics</li>
                          <li>• Information technology and digital services</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CanNor - Northern Development */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Home className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Canadian Northern Economic Development Agency (CanNor)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$32.5M Annual</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Territories</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Northern Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Remote Communities</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal agency promoting economic development across Canada's three territories (Northwest Territories, Nunavut, and Yukon) with $32.5M in 2026-26 funding for northern communities and businesses.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Core Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Regional Economic Growth Through Innovation (REGI)</li>
                          <li>• Northern Innovation and Community Infrastructure (NICI)</li>
                          <li>• Economic Development Initiative (EDI)</li>
                          <li>• Territorial Growth Program (TGP)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Northern Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Indigenous economic development and self-determination</li>
                          <li>• Resource extraction and value-added processing</li>
                          <li>• Tourism and cultural industries</li>
                          <li>• Infrastructure and connectivity solutions</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Recipients:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Individuals and businesses (including Indigenous)</li>
                          <li>• Social enterprises and cooperatives</li>
                          <li>• Municipal, provincial, and territorial governments</li>
                          <li>• Not-for-profit and educational institutions</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FedDev Ontario */}
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle className="text-red-700">Federal Economic Development Agency for Southern Ontario (FedDev)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$1.2B+ Portfolio</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Southern Ontario</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation Leader</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Advanced Economy</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal agency supporting Southern Ontario's advanced manufacturing, technology innovation, and community economic development through targeted investments in high-growth sectors and regional ecosystems.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-red-700">Investment Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Advanced manufacturing and automation</li>
                          <li>• Clean technology and sustainability</li>
                          <li>• Life sciences and health technology</li>
                          <li>• Digital economy and artificial intelligence</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Community Development:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Innovation districts and ecosystem building</li>
                          <li>• Rural and small community diversification</li>
                          <li>• Indigenous economic development</li>
                          <li>• Francophone minority community support</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PacifiCan */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Globe className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Pacific Economic Development Canada (PacifiCan)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$400M+ Annual</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>British Columbia</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Asia-Pacific</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Innovation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal agency promoting British Columbia's economic growth through innovation, clean technology, Indigenous economic development, and Asia-Pacific trade relationships.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-teal-700">BC Regional Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Clean technology and renewable energy</li>
                          <li>• Forest sector innovation and value-added</li>
                          <li>• Ocean and marine technology</li>
                          <li>• Digital technology and creative industries</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Strategic Initiatives:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Asia-Pacific gateway and trade corridor</li>
                          <li>• Indigenous economic reconciliation</li>
                          <li>• Rural and remote community development</li>
                          <li>• Innovation supercluster ecosystem support</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FedNor */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">Federal Economic Development Initiative for Northern Ontario (FedNor)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$150M+ Annual</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Northern Ontario</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Resource-Based</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Diversification</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal agency supporting Northern Ontario's economic diversification away from traditional resource industries through innovation, entrepreneurship, and community development initiatives.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-indigo-700">Northern Ontario Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Mining sector innovation and value-added processing</li>
                          <li>• Forestry and bioproducts development</li>
                          <li>• Tourism and outdoor recreation</li>
                          <li>• Indigenous economic development and partnerships</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Program Delivery:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Regional Economic Growth through Innovation</li>
                          <li>• Community Future Development Corporations</li>
                          <li>• Northern Ontario Development Program</li>
                          <li>• Strategic initiatives and special projects</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Application Strategy Framework */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Regional Development Funding Strategy Framework</h2>
              
              <div className="space-y-6">
                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Regional Excellence Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Multi-Agency Regional Approach:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Align with regional RDA priorities and mandates</li>
                          <li>• Combine federal, provincial, and municipal funding</li>
                          <li>• Leverage community partnerships and collaboration</li>
                          <li>• Access sector-specific and thematic initiatives</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Community Development Priorities:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Economic diversification and resilience building</li>
                          <li>• Innovation ecosystem and cluster development</li>
                          <li>• Infrastructure and capacity enhancement</li>
                          <li>• Indigenous reconciliation and inclusive growth</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Regional Development Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Regional Impact Demonstration:</strong> Show clear contribution to regional economic priorities, competitiveness, and community development
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Community Partnership Building:</strong> Engage local stakeholders, municipal governments, and community organizations
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Sustainable Development Integration:</strong> Align with environmental, social, and economic sustainability objectives
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Knowledge Transfer and Scaling:</strong> Demonstrate potential for replication and knowledge sharing across regions
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Canada's $2.8B+ Regional Development Ecosystem?
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Get our complete regional development funding guide or work with our community development specialists who have secured over $15M in regional grants with 91% success rate across all RDA programs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Regional Approach</h4>
                  <p className="text-orange-100 text-sm mb-4">
                    Get our comprehensive regional development guide with RDA-specific templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-orange-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-regional-development-funding">
                      <Download className="w-4 h-4 mr-2" />
                      Get Regional Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Regional Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with regional specialists who have secured $15M+ with 91% success rate across ACOA, PrairiesCan, and all RDA programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=regional-development-expert-help">
                      Get Regional Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-orange-200 text-sm mt-6">
                91% success rate for regional applications • Average funding secured: $425K • All RDA expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
