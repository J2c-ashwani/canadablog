import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp, Mountain } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "British Columbia Business Grants Application Guide 2025 | Step-by-Step BC Provincial Funding Process",
  description: "Complete step-by-step guide to applying for British Columbia business grants and provincial funding. Get BC application templates, provincial strategies, and proven frameworks for Innovate BC, CleanBC, and Creative BC programs.",
  keywords: "British Columbia business grants application guide, BC provincial funding application process, Innovate BC application, CleanBC funding application, Creative BC application guide, how to apply BC grants",
  openGraph: {
    title: "British Columbia Business Grants Application Guide 2025 | BC Provincial Funding Process",
    description: "Step-by-step guide with templates and strategies for successful BC provincial funding applications.",
    url: "https://fsidigital.ca/guides/apply-british-columbia-grants",
  },
}

export default function BritishColumbiaBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏔️ Pacific Province Business Funding Application Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                British Columbia Business Grants Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for British Columbia provincial business grants and funding. 
                Complete with program-specific templates, provincial compliance strategies, and proven application frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/download/british-columbia-grants-kit">
                    <Download className="w-5 h-5 mr-2" />
                    Download BC Business Kit
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/british-columbia-government-business-grants">
                    Back to BC Government Guide
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">6-14 Weeks</div>
                  <div className="text-gray-600">Average Application Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">40+ Programs</div>
                  <div className="text-gray-600">BC Provincial Streams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                  <div className="text-gray-600">Success Rate (Expert Prep)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$5M</div>
                  <div className="text-gray-600">Maximum BC Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BC Application Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">BC Provincial Application Timeline</h2>
              
              <div className="space-y-8">
                {/* Phase 1: Program Selection & BC Eligibility */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Phase 1: Program Selection & BC Provincial Business Eligibility</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Weeks 1-2</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">BC Program Stream Selection:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>Innovate BC:</strong> Technology companies and innovation projects</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>CleanBC Programs:</strong> Clean technology and emission reduction</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>Creative BC:</strong> Creative industries and digital media</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>BC Manufacturing Jobs Fund:</strong> Manufacturing capital investments</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Provincial Business Requirements:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>BC business registration and operations</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Provincial tax compliance and good standing</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Job creation and economic impact commitment</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>CleanBC and sustainability alignment (where applicable)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Mountain className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-blue-800 font-medium">BC Provincial Verification:</p>
                          <p className="text-blue-700 text-sm">
                            Ensure your business is incorporated or registered in British Columbia with active operations. 
                            Most BC programs emphasize sustainability, innovation, and Asia-Pacific market development.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 2: Business Assessment & Provincial Alignment */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">Phase 2: Business Assessment & Pacific Gateway Strategy Alignment</CardTitle>
                      <Badge className="bg-green-100 text-green-800">Weeks 2-6</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">BC Economic Impact Framework:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded">
                            <strong>Innovation and Technology Development:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Technology commercialization and scale-up strategy</li>
                              <li>• Research and development investment and innovation</li>
                              <li>• Intellectual property development and protection</li>
                              <li>• International market expansion and export potential</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded">
                            <strong>Provincial Economic Contribution:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Job creation targets and high-value employment</li>
                              <li>• BC economic diversification and competitiveness</li>
                              <li>• Supply chain development and local procurement</li>
                              <li>• Asia-Pacific trade and investment attraction</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">BC Provincial Policy Priority Integration:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>CleanBC and Sustainability:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Greenhouse gas emission reduction contribution</li>
                              <li>• Clean technology adoption and development</li>
                              <li>• Renewable energy and efficiency improvements</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Innovation Excellence:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Technology leadership and competitive advantage</li>
                              <li>• Research commercialization and knowledge transfer</li>
                              <li>• Digital transformation and automation adoption</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Creative Economy Development:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Creative content production and distribution</li>
                              <li>• Cultural impact and BC content development</li>
                              <li>• Digital media and interactive entertainment</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3: Comprehensive BC Application Development */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Phase 3: Comprehensive BC Provincial Application Development</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Weeks 6-12</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">BC Provincial Application Components:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2">Provincial Business Case:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Comprehensive BC-focused business plan and strategy</li>
                              <li>• Detailed financial projections and funding requirements</li>
                              <li>• Market analysis and Asia-Pacific competitive positioning</li>
                              <li>• Technology development and innovation implementation</li>
                              <li>• Risk assessment and sustainability planning</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2">Provincial Compliance Documentation:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• BC business registration and incorporation verification</li>
                              <li>• Provincial tax and regulatory compliance documentation</li>
                              <li>• Management team qualifications and BC presence</li>
                              <li>• Environmental and sustainability impact assessment</li>
                              <li>• Performance measurement and evaluation framework</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">Program-Specific Application Requirements:</h5>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Innovate BC Specific:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• Technology commercialization plan and timeline</li>
                                <li>• Market validation and customer development strategy</li>
                                <li>• Intellectual property strategy and protection plan</li>
                                <li>• Scale-up and international expansion roadmap</li>
                              </ul>
                            </div>
                            <div>
                              <strong>CleanBC Specific:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• Emission reduction quantification and measurement</li>
                                <li>• Clean technology adoption and deployment plan</li>
                                <li>• Environmental impact assessment and monitoring</li>
                                <li>• Sustainability and climate action contribution</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 4: Provincial Review & Assessment */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Phase 4: BC Provincial Review & Innovation Impact Assessment</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">Weeks 12-14</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">BC Multi-Level Review Process:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Business Merit Assessment:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Business viability and financial sustainability</li>
                              <li>• Management team capacity and track record</li>
                              <li>• Technology innovation and competitive advantage</li>
                              <li>• Market opportunity and commercialization potential</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Provincial Policy Impact Review:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• BC economic development and diversification contribution</li>
                              <li>• Innovation ecosystem and cluster development impact</li>
                              <li>• Sustainability and CleanBC alignment assessment</li>
                              <li>• Asia-Pacific gateway and trade development potential</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">Upon BC Provincial Approval:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                          <ul className="space-y-1">
                            <li>• Provincial funding agreement negotiation and execution</li>
                            <li>• BC economic milestone and deliverable establishment</li>
                            <li>• Innovation and sustainability performance tracking</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>• Ongoing BC program management and advisory support</li>
                            <li>• Innovation ecosystem network access and integration</li>
                            <li>• Cross-program referrals and federal program connections</li>
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

        {/* Program-Specific Application Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Program-Specific Application Strategies</h2>
              
              <div className="space-y-6">
                {/* Innovate BC Strategy */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle>Innovate BC Application Strategy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Technology Excellence:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Innovative technology development and IP creation</li>
                          <li>• Clear competitive advantage and market differentiation</li>
                          <li>• Technology readiness level progression and validation</li>
                          <li>• Research partnerships and collaboration evidence</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Market Commercialization:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Market validation and customer traction demonstration</li>
                          <li>• Go-to-market strategy and revenue model</li>
                          <li>• International market expansion and export potential</li>
                          <li>• Strategic partnerships and distribution channels</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Scale-up Excellence:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Management team strength and advisory support</li>
                          <li>• Investment readiness and capital planning</li>
                          <li>• Job creation and high-value employment targets</li>
                          <li>• BC ecosystem engagement and cluster participation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CleanBC Strategy */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Mountain className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle>CleanBC Funding Strategy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold mb-2 text-green-700">Emission Reduction Excellence:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Quantifiable greenhouse gas emission reductions</li>
                          <li>• Clean technology adoption and deployment evidence</li>
                          <li>• Energy efficiency improvements and cost savings</li>
                          <li>• Environmental monitoring and reporting capabilities</li>
                          <li>• Contribution to BC net-zero by 2050 goals</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2 text-blue-700">Innovation and Economic Impact:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Clean technology innovation and development</li>
                          <li>• Job creation in clean economy sectors</li>
                          <li>• Supply chain development and local procurement</li>
                          <li>• Export potential for clean technology solutions</li>
                          <li>• Industry leadership and best practice development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Creative BC Strategy */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Award className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle>Creative BC Funding Strategy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Content Excellence:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• High-quality creative content development</li>
                          <li>• BC content requirements and cultural impact</li>
                          <li>• Creative talent development and capacity</li>
                          <li>• Innovation in digital media and storytelling</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Market Development:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Distribution strategy and market access</li>
                          <li>• Audience development and engagement</li>
                          <li>• Revenue model and monetization plan</li>
                          <li>• International market expansion potential</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Industry Impact:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• BC creative industry ecosystem contribution</li>
                          <li>• Economic impact and job creation</li>
                          <li>• Industry partnership and collaboration</li>
                          <li>• Cultural and social impact demonstration</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common BC Application Mistakes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common BC Provincial Application Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ BC Provincial Application Killers:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak BC Economic Connection:</strong>
                        <p className="text-sm text-gray-600">Not clearly demonstrating significant BC operations, employment, and economic development contribution</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Insufficient Innovation Component:</strong>
                        <p className="text-sm text-gray-600">Failing to demonstrate clear technology innovation and competitive advantage</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Sustainability Integration:</strong>
                        <p className="text-sm text-gray-600">Not aligning project with CleanBC and environmental sustainability priorities</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ BC Provincial Process Errors:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Wrong Program Stream Selection:</strong>
                        <p className="text-sm text-gray-600">Not matching business type, sector, and development stage with appropriate BC program</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Limited Asia-Pacific Strategy:</strong>
                        <p className="text-sm text-gray-600">Not leveraging BC's Asia-Pacific gateway positioning and international market opportunities</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Innovation Ecosystem Engagement:</strong>
                        <p className="text-sm text-gray-600">Not connecting with BC innovation hubs, research institutions, and industry clusters</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BC Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">BC Provincial Application Success Strategies</h2>
              
              <div className="space-y-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Pacific Gateway Excellence Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">BC Innovation Leadership:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Demonstrate clear technology innovation and competitive advantage</li>
                          <li>• Show significant BC operations and high-value job creation</li>
                          <li>• Present measurable contribution to BC economic diversification</li>
                          <li>• Highlight BC talent development and capacity building</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Provincial Policy Integration:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Align business goals with CleanBC and sustainability priorities</li>
                          <li>• Connect to Asia-Pacific gateway and international trade strategy</li>
                          <li>• Demonstrate understanding of BC innovation ecosystem</li>
                          <li>• Show potential for cross-program and federal program integration</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Strategic BC Ecosystem Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Maximizing BC Innovation Network Value:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <ul className="space-y-1">
                              <li>• Connect with BC innovation hubs and accelerators</li>
                              <li>• Engage with BC research institutions and universities</li>
                              <li>• Access BC venture capital and investment community</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Partner with BC technology clusters and associations</li>
                              <li>• Leverage BC export and trade development services</li>
                              <li>• Connect with Asia-Pacific trade and investment networks</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Build relationships with BC clean technology leaders</li>
                              <li>• Engage with BC creative industries ecosystem</li>
                              <li>• Access federal PacifiCan regional development support</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Long-term BC Provincial Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Multi-Program BC Development:</strong> Use BC success to access federal programs and international opportunities
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Innovation Ecosystem Leadership:</strong> Establish leadership role in BC innovation clusters and Asia-Pacific networks
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Sustainability Champion:</strong> Lead clean technology adoption and CleanBC goal achievement
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Asia-Pacific Gateway Success:</strong> Leverage BC positioning for international market expansion and trade development
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
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Need Expert Help with Your BC Provincial Application?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Maximize your success with British Columbia business funding specialists. Our experts have secured 
                over $8M in BC provincial funding with an 85% success rate and deep understanding of all BC programs.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">BC Provincial Expert Services Include:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>BC provincial application preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Program-specific strategy development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Innovation and sustainability alignment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>BC innovation ecosystem integration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Asia-Pacific market development strategy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Federal-provincial funding optimization</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=bc-business-expert-help">
                  Get BC Provincial Expert Help
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
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
