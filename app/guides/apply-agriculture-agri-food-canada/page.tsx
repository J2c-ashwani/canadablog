import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp, Leaf } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agriculture & Agri-Food Canada Application Guide 2025 | Step-by-Step AAFC Federal Funding Process",
  description: "Complete step-by-step guide to applying for Agriculture & Agri-Food Canada federal funding. Get AAFC application templates, agricultural strategies, and proven frameworks for AgriInnovate, AgriScience, and CAP programs.",
  keywords: "Agriculture Agri-Food Canada application guide, AAFC funding application process, AgriInnovate application guide, AgriScience funding application, how to apply AAFC funding, agricultural grants application Canada",
  openGraph: {
    title: "Agriculture & Agri-Food Canada Application Guide 2025 | AAFC Federal Funding Process",
    description: "Step-by-step guide with templates and strategies for successful AAFC federal funding applications across all agricultural programs.",
    url: "https://fsidigital.ca/guides/apply-agriculture-agri-food-canada",
  },
}

export default function AgricultureAgriFoodGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🌾 Federal Agricultural Funding Application Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Agriculture & Agri-Food Canada Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for AAFC federal funding across all agricultural programs. 
                Complete with sector-specific templates, federal compliance strategies, and proven application frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/download/agriculture-agri-food-application-kit">
                    <Download className="w-5 h-5 mr-2" />
                    Download AAFC Agricultural Kit
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-green-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/agriculture-agri-food-canada-government-grants">
                    Back to AAFC Government Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">10-20 Weeks</div>
                  <div className="text-gray-600">Average Application Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">12+ Programs</div>
                  <div className="text-gray-600">AAFC Federal Streams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">91%</div>
                  <div className="text-gray-600">Success Rate (Expert Prep)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$15M</div>
                  <div className="text-gray-600">Maximum AAFC Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AAFC Application Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">AAFC Federal Application Timeline</h2>
              
              <div className="space-y-8">
                {/* Phase 1: Program Selection & Agricultural Alignment */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">Phase 1: Program Selection & Agricultural Sector Alignment</CardTitle>
                      <Badge className="bg-green-100 text-green-800">Weeks 1-3</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">AAFC Program Stream Selection:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span><strong>AgriInnovate:</strong> Pre-commercial innovation and technology development</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span><strong>AgriScience:</strong> Industry-led research partnerships and clusters</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span><strong>AgriCompetitiveness:</strong> Market development and competitiveness</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span><strong>AgriDiversity:</strong> Underrepresented groups in agriculture</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Federal Agricultural Focus Areas:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Sustainable agriculture and climate resilience</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Digital agriculture and precision farming</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Alternative proteins and food innovation</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Agricultural biotechnology and genomics</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Leaf className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-green-800 font-medium">Agricultural Sector Verification:</p>
                          <p className="text-green-700 text-sm">
                            Ensure your project has clear connection to agriculture, agri-food, or agri-based products sectors. 
                            AAFC requires direct agricultural benefit and sector relevance for all funding programs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 2: Project Development & Federal Priority Alignment */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Phase 2: Project Development & Federal Priority Alignment</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Weeks 3-8</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Agricultural Innovation Project Framework:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-4 rounded">
                            <strong>Technical Innovation Component:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Novel agricultural technologies or processes</li>
                              <li>• Scientific advancement and research methodology</li>
                              <li>• Technology readiness level progression</li>
                              <li>• Intellectual property development potential</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded">
                            <strong>Agricultural Market Application:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Clear commercialization pathway and timeline</li>
                              <li>• Market demand validation and sizing</li>
                              <li>• Competitive advantage and differentiation</li>
                              <li>• Scalability and adoption potential</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">Federal Agricultural Policy Integration:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Sustainability Goals:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Environmental impact reduction</li>
                              <li>• Climate change adaptation and mitigation</li>
                              <li>• Sustainable resource management</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Competitiveness Enhancement:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Productivity improvements and efficiency gains</li>
                              <li>• Export market development opportunities</li>
                              <li>• Value-added product development</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Innovation Excellence:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Research collaboration and partnerships</li>
                              <li>• Knowledge transfer and commercialization</li>
                              <li>• Sector capacity building and development</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3: Comprehensive Federal Application Development */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Phase 3: Comprehensive Federal Application Development</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Weeks 8-15</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">AAFC Federal Application Components:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2">Agricultural Business Case:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Comprehensive agricultural business plan</li>
                              <li>• Detailed project technical specifications</li>
                              <li>• Financial projections and funding requirements</li>
                              <li>• Risk assessment and mitigation strategies</li>
                              <li>• Performance measurement and evaluation plan</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2">Federal Compliance Documentation:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Federal incorporation and agricultural focus verification</li>
                              <li>• Management team qualifications and experience</li>
                              <li>• Partnership agreements and collaboration frameworks</li>
                              <li>• Environmental and regulatory compliance</li>
                              <li>• Intellectual property and commercialization strategy</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">Program-Specific Application Requirements:</h5>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>AgriInnovate Specific:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• Pre-commercial innovation focus documentation</li>
                                <li>• Technology development timeline and milestones</li>
                                <li>• Commercialization pathway and market strategy</li>
                                <li>• Innovation partnership and collaboration plan</li>
                              </ul>
                            </div>
                            <div>
                              <strong>AgriScience Specific:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• Research partnership agreements and roles</li>
                                <li>• Scientific methodology and research approach</li>
                                <li>• Knowledge mobilization and transfer strategy</li>
                                <li>• Research cluster coordination (if applicable)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 4: Federal Review & Agricultural Assessment */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Phase 4: Federal Review & Agricultural Merit Assessment</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">Weeks 15-20</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">AAFC Multi-Level Review Process:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Technical Assessment:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Agricultural science and technical merit evaluation</li>
                              <li>• Innovation potential and technological advancement</li>
                              <li>• Research methodology and scientific rigor</li>
                              <li>• Technical feasibility and implementation risk</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Policy and Strategic Review:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Federal agricultural priority alignment</li>
                              <li>• Sustainable CAP strategic objective contribution</li>
                              <li>• Economic impact and sector competitiveness</li>
                              <li>• Environmental and sustainability benefits</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">Upon AAFC Federal Approval:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                          <ul className="space-y-1">
                            <li>• Federal contribution agreement negotiation and execution</li>
                            <li>• Agricultural milestone and deliverable establishment</li>
                            <li>• Performance measurement framework implementation</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>• Ongoing AAFC program management support</li>
                            <li>• Agricultural sector network and partnership access</li>
                            <li>• Federal program integration opportunities</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Agricultural Sector-Specific Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Agricultural Sector-Specific Application Strategies</h2>
              
              <div className="space-y-6">
                {/* Primary Production Agriculture */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Leaf className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle>Primary Production Agriculture Strategy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Crop Production Innovation:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Precision agriculture and digital farming</li>
                          <li>• Sustainable crop management practices</li>
                          <li>• Climate-resilient varieties and genetics</li>
                          <li>• Integrated pest and disease management</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Livestock Advancement:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Animal health and welfare technologies</li>
                          <li>• Feed efficiency and nutrition optimization</li>
                          <li>• Breeding and genetics innovation</li>
                          <li>• Sustainable livestock production systems</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Resource Management:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Water use efficiency and conservation</li>
                          <li>• Soil health and carbon sequestration</li>
                          <li>• Renewable energy adoption</li>
                          <li>• Waste reduction and circular economy</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Agri-Food Processing */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Building className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle>Agri-Food Processing & Value-Added Strategy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold mb-2 text-blue-700">Food Innovation Focus:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Alternative protein development and scaling</li>
                          <li>• Functional foods and nutraceuticals</li>
                          <li>• Novel food processing technologies</li>
                          <li>• Food safety and quality assurance systems</li>
                          <li>• Packaging innovation and sustainability</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2 text-orange-700">Market Development:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Export market penetration and development</li>
                          <li>• Brand development and consumer engagement</li>
                          <li>• Supply chain optimization and traceability</li>
                          <li>• Local food systems and short supply chains</li>
                          <li>• E-commerce and direct-to-consumer platforms</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Agri-Based Products */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Shield className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle>Agri-Based Products & Bio-Economy Strategy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Bio-Based Materials:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Bio-plastics and biodegradable materials</li>
                          <li>• Agricultural fiber and composite development</li>
                          <li>• Bio-based chemicals and pharmaceuticals</li>
                          <li>• Renewable material substitution</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Energy Applications:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Bioenergy and biofuel production</li>
                          <li>• Agricultural waste valorization</li>
                          <li>• Renewable energy integration</li>
                          <li>• Carbon capture and utilization</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Industrial Applications:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Agricultural biomass processing</li>
                          <li>• Bio-refinery development</li>
                          <li>• Specialty chemical production</li>
                          <li>• Circular economy integration</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common AAFC Application Mistakes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common AAFC Federal Application Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Agricultural Federal Application Killers:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Agricultural Connection:</strong>
                        <p className="text-sm text-gray-600">Insufficient demonstration of direct benefit to agriculture, agri-food, or agri-based sectors</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Limited Innovation Component:</strong>
                        <p className="text-sm text-gray-600">Failing to clearly articulate innovative aspects and technological advancement potential</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Commercialization Strategy:</strong>
                        <p className="text-sm text-gray-600">Inadequate market analysis and pathway to commercialization development</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Federal Agricultural Process Errors:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Wrong Program Selection:</strong>
                        <p className="text-sm text-gray-600">Not matching project type and stage with appropriate AAFC program stream</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Limited Partnership Strategy:</strong>
                        <p className="text-sm text-gray-600">Not leveraging agricultural industry partnerships and research collaborations</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Insufficient Federal Alignment:</strong>
                        <p className="text-sm text-gray-600">Not demonstrating clear connection to federal agricultural priorities and policies</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AAFC Federal Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">AAFC Federal Application Success Strategies</h2>
              
              <div className="space-y-6">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Agricultural Federal Excellence Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Agricultural Sector Optimization:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Clearly define agricultural sector connection and benefits</li>
                          <li>• Demonstrate understanding of sector challenges and opportunities</li>
                          <li>• Position project within agricultural value chain context</li>
                          <li>• Show measurable impact on agricultural productivity or sustainability</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Federal Priority Integration:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Align project with Sustainable CAP strategic priorities</li>
                          <li>• Connect to federal climate and environmental objectives</li>
                          <li>• Demonstrate contribution to Canadian competitiveness</li>
                          <li>• Show integration potential with broader federal initiatives</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Strategic Agricultural Partnership Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Maximizing Agricultural Ecosystem Value:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <ul className="space-y-1">
                              <li>• Partner with agricultural research institutions</li>
                              <li>• Engage commodity organizations and industry associations</li>
                              <li>• Connect with agricultural technology companies</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Collaborate with agricultural producers and processors</li>
                              <li>• Leverage provincial agricultural departments</li>
                              <li>• Engage agricultural extension and advisory services</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Build relationships with agricultural innovation hubs</li>
                              <li>• Connect with international agricultural partners</li>
                              <li>• Engage agricultural finance and investment partners</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Long-term Agricultural Federal Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Multi-Program Agricultural Development:</strong> Use AAFC success to access Strategic Innovation Fund and other large-scale federal programs
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Agricultural Innovation Leadership:</strong> Establish your organization as a leader in agricultural innovation and sustainability
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Agricultural Sector Integration:</strong> Build comprehensive agricultural value chain partnerships and collaborations
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Sustainable Impact Demonstration:</strong> Track and showcase measurable contributions to agricultural sustainability and competitiveness
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Get Expert Help CTA */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Need Expert Help with Your AAFC Agricultural Application?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Maximize your success with agricultural funding specialists. Our experts have secured 
                over $18M in AAFC federal funding with a 91% success rate and deep agricultural sector expertise.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">AAFC Agricultural Expert Services Include:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-green-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>AAFC agricultural application preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Agricultural sector alignment strategy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Federal agricultural priority alignment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Agricultural partnership development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Multi-program agricultural funding optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Agricultural innovation commercialization strategy</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=agriculture-agri-food-expert-help">
                  Get AAFC Agricultural Expert Help
                </Link>
              </Button>
              <p className="text-green-200 text-sm mt-4">
                91% success rate for AAFC applications • Average funding secured: $625K • All agricultural programs expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
