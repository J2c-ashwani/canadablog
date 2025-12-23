import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Factory, Settings, Cog } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Manufacturing & Industry Grants 2026 | $3.1B+ Advanced Manufacturing Funding Programs Guide",
  description: "Complete guide to Canada's manufacturing and industry grants. Access NGen funding, Advanced Manufacturing Investment Strategy, productivity programs, and 38+ programs offering $3.1B+ for manufacturing excellence.",
  keywords: "Canada manufacturing grants, advanced manufacturing funding, NGen grants, manufacturing productivity programs, industry 4.0 funding Canada 2026",
  openGraph: {
    title: "Canada Manufacturing & Industry Grants 2026 | $3.1B+ Advanced Manufacturing Funding Guide",
    description: "Comprehensive guide to Canada's manufacturing and industry funding ecosystem with 38+ programs offering $3.1B+ for productivity, automation, and competitiveness.",
    url: "https://www.fsidigital.ca/blog/canada-manufacturing-industry-grants-guide",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function CanadaManufacturingIndustryGrantsGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-700 to-gray-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏭 Manufacturing & Industry Excellence Funding
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Manufacturing & Industry Grants Guide
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Access Canada's comprehensive manufacturing and industry funding ecosystem with $3.1B+ available annually through 38+ federal and provincial programs. From NGen advanced manufacturing to Industry 4.0 automation - accelerate productivity, competitiveness, and innovation in Canada's manufacturing sector.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-gray-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?category=manufacturing-industry">
                    Find Your Manufacturing Program
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

        {/* Manufacturing Funding Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-gray-600 mb-2">$3.1B+</div>
                  <div className="text-gray-600">Annual Manufacturing Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">38+</div>
                  <div className="text-gray-600">Active Manufacturing Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$87.5M</div>
                  <div className="text-gray-600">NGen Investment 2026</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">40%</div>
                  <div className="text-gray-600">Maximum Funding Rate</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada as Advanced Manufacturing Leader</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Canada operates one of North America's most comprehensive manufacturing support ecosystems, with over $3.1 billion available annually through federal and provincial programs targeting productivity improvements, automation adoption, Industry 4.0 transformation, and advanced manufacturing capabilities. From the Next Generation Manufacturing Canada (NGen) supercluster to provincial advanced manufacturing investment strategies, Canada provides unparalleled support for manufacturing excellence across all sectors and company sizes.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-gray-800">Manufacturing Policy Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Advanced manufacturing technology adoption and automation</li>
                      <li>• Industry 4.0 transformation and digitalization</li>
                      <li>• Productivity improvements and operational excellence</li>
                      <li>• Supply chain resilience and competitiveness</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">Strategic Manufacturing Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Federal-provincial manufacturing program coordination</li>
                      <li>• Industry-academia collaboration and skills development</li>
                      <li>• Manufacturing supercluster ecosystem development</li>
                      <li>• International competitiveness and export growth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Manufacturing Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Manufacturing & Industry Programs</h2>

              <div className="space-y-8">
                {/* NGen - Next Generation Manufacturing Canada */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">NGen - Next Generation Manufacturing Canada</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$87.5M Investment</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Supercluster</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>40% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Collaborative</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canada's advanced manufacturing innovation supercluster co-investing $87.5M in 2026 for collaborative projects that accelerate advanced manufacturing capabilities, digitalization, and global competitiveness.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">2026 Program Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Advanced Manufacturing Technology Program</li>
                          <li>• Collaborative projects $1.5M - $8M</li>
                          <li>• 40% funding rate of eligible costs</li>
                          <li>• Projects completed by Jan 31, 2028</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Technologies:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Automation and robotics systems</li>
                          <li>• Advanced materials and processes</li>
                          <li>• Digital manufacturing and Industry 4.0</li>
                          <li>• Additive manufacturing and 3D printing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Collaboration Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Minimum 2 unassociated Canadian industry partners</li>
                          <li>• At least one SME partner required</li>
                          <li>• Academic/research organization inclusion encouraged</li>
                          <li>• IP development and retention in Canada</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Advanced Manufacturing Investment Strategy (AMIS) */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Factory className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Advanced Manufacturing Investment Strategy (AMIS) - Ontario</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Investment</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>30% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Ontario Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Ontario's flagship advanced manufacturing program supporting large-scale investments in productivity improvements, automation, and advanced manufacturing capabilities for southern Ontario manufacturers.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Program Objectives:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Productivity:</strong> Equipment and process improvements</li>
                          <li>• <strong>Automation:</strong> Advanced manufacturing technology adoption</li>
                          <li>• <strong>Market Expansion:</strong> Capacity building for growth</li>
                          <li>• <strong>Jobs:</strong> High-value employment creation and retention</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Eligible Investments:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Manufacturing equipment and machinery</li>
                          <li>• Automation systems and robotics</li>
                          <li>• Digital manufacturing technologies</li>
                          <li>• Facility improvements and infrastructure</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Manufacturing Productivity Enhancement Program */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Settings className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Manufacturing Productivity Enhancement Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Multi-Program</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Productivity</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Efficiency</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>All Sizes</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive suite of federal and provincial programs targeting manufacturing productivity improvements, operational efficiency, and competitive advantage enhancement across Canada.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Federal Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>CDAP:</strong> Digital technology adoption up to $100K</li>
                          <li>• <strong>IRAP:</strong> Technology innovation up to $500K</li>
                          <li>• <strong>CanExport:</strong> Market expansion support</li>
                          <li>• <strong>EDC:</strong> Export financing and insurance</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Provincial Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Quebec ESSOR:</strong> Productivity investments up to $15M</li>
                          <li>• <strong>Alberta SEMI:</strong> Energy management up to $1M</li>
                          <li>• <strong>BC CleanBC:</strong> Clean technology adoption</li>
                          <li>• <strong>Atlantic ACOA:</strong> Regional development support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Lean manufacturing and process optimization</li>
                          <li>• Digital transformation and Industry 4.0</li>
                          <li>• Energy efficiency and sustainability</li>
                          <li>• Skills development and workforce training</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Industry 4.0 and Digital Manufacturing */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Cog className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Industry 4.0 & Digital Manufacturing Programs</CardTitle>
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
                        <span><strong>Digital Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Smart Factory</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Transformation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Specialized funding streams supporting digital transformation, smart manufacturing, IoT implementation, and Industry 4.0 adoption for Canadian manufacturers seeking competitive advantage through technology.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-orange-700">Key Technologies:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Smart Manufacturing:</strong> IoT sensors, connected systems</li>
                          <li>• <strong>Artificial Intelligence:</strong> Predictive maintenance, optimization</li>
                          <li>• <strong>Advanced Analytics:</strong> Data-driven decision making</li>
                          <li>• <strong>Cyber-Physical Systems:</strong> Integrated digital-physical processes</li>
                          <li>• <strong>Digital Twins:</strong> Virtual manufacturing simulation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Program Examples:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>CDAP Manufacturing Stream:</strong> Digital adoption support</li>
                          <li>• <strong>NGen Digital Projects:</strong> Collaborative technology development</li>
                          <li>• <strong>Provincial Innovation Programs:</strong> Smart manufacturing initiatives</li>
                          <li>• <strong>PRIMA Hub:</strong> Advanced materials and digital integration</li>
                          <li>• <strong>Synchronex:</strong> Technology transfer and adoption</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Regional Manufacturing Support */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Regional Manufacturing Support Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Regional Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Federal-Provincial</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Economic Dev</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Local Priorities</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive regional development programs delivered through federal-provincial partnerships supporting manufacturing growth, competitiveness, and economic development across Canada's diverse manufacturing regions.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-teal-700">Regional Development Agencies:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>ACOA (Atlantic):</strong> Regional manufacturing competitiveness</li>
                          <li>• <strong>CED-Quebec:</strong> Manufacturing innovation and export</li>
                          <li>• <strong>FedDev Ontario:</strong> Southern Ontario manufacturing leadership</li>
                          <li>• <strong>FedNor:</strong> Northern Ontario resource-based manufacturing</li>
                          <li>• <strong>PrairiesCan:</strong> Prairie manufacturing diversification</li>
                          <li>• <strong>PacifiCan:</strong> BC advanced manufacturing and export</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Provincial Specializations:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Ontario:</strong> Automotive, aerospace, advanced materials</li>
                          <li>• <strong>Quebec:</strong> Aerospace, biotechnology, clean technology</li>
                          <li>• <strong>British Columbia:</strong> Forest products, clean tech, marine</li>
                          <li>• <strong>Alberta:</strong> Energy sector manufacturing, petrochemicals</li>
                          <li>• <strong>Atlantic:</strong> Ocean technology, food processing, energy</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Environmental and Sustainability Manufacturing */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Environmental & Sustainability Manufacturing Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $20M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Clean Tech</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Sustainability</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Green Manufacturing</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive environmental and sustainability programs supporting green manufacturing, circular economy adoption, energy efficiency, and clean technology integration across Canadian manufacturing operations.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Major Environmental Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Green Industrial Facilities:</strong> Energy efficiency up to $20M</li>
                          <li>• <strong>ÉcoPerformance Quebec:</strong> Large industrial projects 75% funding</li>
                          <li>• <strong>CleanBC Manufacturing:</strong> Clean technology adoption</li>
                          <li>• <strong>GHG Challenge Program:</strong> Emission reduction up to $50M</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Sustainability Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Energy efficiency and renewable energy integration</li>
                          <li>• Waste reduction and circular economy implementation</li>
                          <li>• Clean production processes and technologies</li>
                          <li>• Environmental management system implementation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Application Strategy Framework */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Manufacturing Funding Strategy Framework</h2>

              <div className="space-y-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Manufacturing Excellence Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Multi-Program Manufacturing Approach:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Combine federal and provincial manufacturing programs</li>
                          <li>• Stack productivity and innovation funding</li>
                          <li>• Leverage regional development agency support</li>
                          <li>• Access sector-specific manufacturing initiatives</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Technology Investment Priority:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Advanced manufacturing equipment and automation</li>
                          <li>• Digital transformation and Industry 4.0 systems</li>
                          <li>• Environmental and energy efficiency improvements</li>
                          <li>• Skills development and workforce training</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Manufacturing Competitiveness Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Productivity Impact Demonstration:</strong> Quantify expected improvements in efficiency, output, quality, and cost reduction
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Advanced Technology Integration:</strong> Show clear adoption of Industry 4.0, automation, and digital manufacturing capabilities
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Collaboration and Knowledge Transfer:</strong> Partner with research institutions, technology providers, and supply chain partners
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Market Expansion Strategy:</strong> Demonstrate how investments enable growth, export development, and competitive positioning
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
        <section className="py-16 bg-gradient-to-r from-gray-700 to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Canada's $3.1B+ Manufacturing Funding Ecosystem?
              </h2>
              <p className="text-xl text-gray-100 mb-8">
                Get our complete manufacturing funding strategy guide or work with our manufacturing specialists who have secured over $18M in manufacturing grants with 89% success rate across all major programs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Manufacturing Approach</h4>
                  <p className="text-gray-100 text-sm mb-4">
                    Get our comprehensive manufacturing funding guide with program-specific templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-gray-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-manufacturing-funding">
                      <Download className="w-4 h-4 mr-2" />
                      Get Manufacturing Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Manufacturing Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with manufacturing specialists who have secured $18M+ with 89% success rate across NGen, AMIS, and provincial programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=manufacturing-expert-help">
                      Get Manufacturing Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-gray-200 text-sm mt-6">
                89% success rate for manufacturing applications • Average funding secured: $485K • Multi-program expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
