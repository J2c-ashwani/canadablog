import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp, Globe } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quebec Business Grants Application Guide 2025 | Step-by-Step Provincial Aide aux Entreprises Process",
  description: "Complete step-by-step guide to applying for Quebec business grants and aide aux entreprises provincial funding. Get Quebec application templates, R&D tax credit strategies, and proven frameworks for ESSOR, PSCE, and Investissement Quebec programs.",
  keywords: "Quebec business grants application guide, aide aux entreprises Quebec application process, ESSOR program application, PSCE funding application, Quebec R&D tax credits guide, how to apply Quebec grants",
  openGraph: {
    title: "Quebec Business Grants Application Guide 2025 | Aide aux Entreprises Provincial Funding Process",
    description: "Step-by-step guide with templates and strategies for successful Quebec provincial funding applications and R&D tax credit optimization.",
    url: "https://www.fsidigital.ca/guides/apply-quebec-business-grants",
  },
}

export default function QuebecBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🍁 Province de Québec - Application Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Quebec Business Grants Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for Quebec provincial business grants and aide aux entreprises funding. 
                Complete with program-specific templates, R&D tax credit optimization, and proven application frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/download/quebec-business-grants-kit">
                    <Download className="w-5 h-5 mr-2" />
                    Download Quebec Business Kit
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-800/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/quebec-government-business-grants">
                    Back to Quebec Government Guide
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">8-16 Weeks</div>
                  <div className="text-gray-600">Average Application Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">60+ Programs</div>
                  <div className="text-gray-600">Quebec Provincial Streams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">88%</div>
                  <div className="text-gray-600">Success Rate (Expert Prep)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$15M</div>
                  <div className="text-gray-600">Maximum Quebec Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quebec Application Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Quebec Provincial Application Timeline</h2>
              
              <div className="space-y-8">
                {/* Phase 1: Program Selection & Quebec Eligibility */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Phase 1: Program Selection & Quebec Provincial Business Eligibility</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Weeks 1-3</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">Quebec Program Stream Selection:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>ESSOR (Investissement Québec):</strong> Productivity and investment acceleration</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>PSCE:</strong> Commercialization and export development support</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>R&D Tax Credits:</strong> Research and development activities</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>NovaScience:</strong> Innovation management and commercialization</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Provincial Business Requirements:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Quebec business registration and operations</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Provincial tax compliance and good standing</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>French-language business capacity (where applicable)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Innovation and productivity improvement focus</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Globe className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-blue-800 font-medium">Quebec Provincial Verification:</p>
                          <p className="text-blue-700 text-sm">
                            Ensure your business is incorporated or registered in Quebec with active operations. 
                            Many Quebec programs emphasize innovation, R&D excellence, and international market development.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 2: Business Assessment & R&D Alignment */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">Phase 2: Business Assessment & Quebec Innovation Excellence Alignment</CardTitle>
                      <Badge className="bg-green-100 text-green-800">Weeks 3-8</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Quebec Economic Impact Framework:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded">
                            <strong>Innovation & R&D Excellence:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Research and development investment and commercialization</li>
                              <li>• Technology innovation and intellectual property development</li>
                              <li>• University-industry collaboration and knowledge transfer</li>
                              <li>• Innovation cluster participation and ecosystem integration</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded">
                            <strong>Provincial Economic Contribution:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• High-value job creation and talent development</li>
                              <li>• Quebec economic diversification and competitiveness</li>
                              <li>• International market expansion and export development</li>
                              <li>• Supply chain development and productivity improvement</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">Quebec Provincial Policy Priority Integration:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Francophone Business Leadership:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• French-language business capacity and services</li>
                              <li>• Cultural industries and creative economy contribution</li>
                              <li>• International francophone market development</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Innovation & Commercialization:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• R&D activities and technology commercialization</li>
                              <li>• Digital transformation and Industry 4.0 adoption</li>
                              <li>• Productivity improvement and automation</li>
                            </ul>
                          </div>
                          <div>
                            <strong>International Development:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Export market development and internationalization</li>
                              <li>• Trade mission participation and partnerships</li>
                              <li>• Cultural export and content development</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3: Comprehensive Quebec Application Development */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Phase 3: Comprehensive Quebec Provincial Application Development</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Weeks 8-14</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Quebec Provincial Application Components:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2">Provincial Business Case:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Comprehensive Quebec-focused business plan and strategy</li>
                              <li>• Detailed financial projections and ROI analysis</li>
                              <li>• Market analysis and competitive positioning assessment</li>
                              <li>• Innovation strategy and R&D commercialization plan</li>
                              <li>• Risk assessment and mitigation planning</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2">Provincial Compliance Documentation:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Quebec business registration and incorporation verification</li>
                              <li>• Provincial tax compliance and regulatory documentation</li>
                              <li>• Management team qualifications and Quebec presence</li>
                              <li>• R&D activities documentation and qualification</li>
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
                              <strong>ESSOR Specific:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• Productivity improvement strategy and measurement</li>
                                <li>• Investment project plan and implementation timeline</li>
                                <li>• Environmental impact reduction demonstration</li>
                                <li>• Internationalization strategy and market development</li>
                              </ul>
                            </div>
                            <div>
                              <strong>R&D Tax Credits Specific:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• Detailed R&D activities documentation and classification</li>
                                <li>• Scientific and technical uncertainty demonstration</li>
                                <li>• Systematic investigation and experimentation evidence</li>
                                <li>• Eligible R&D expenditure tracking and allocation</li>
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
                      <CardTitle className="text-orange-700">Phase 4: Quebec Provincial Review & Innovation Impact Assessment</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">Weeks 14-16</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Quebec Multi-Level Review Process:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Business Merit Assessment:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Business viability and financial sustainability</li>
                              <li>• Management team capacity and track record</li>
                              <li>• Innovation potential and competitive advantage</li>
                              <li>• Market opportunity and commercialization feasibility</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Provincial Policy Impact Review:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Quebec economic development and innovation contribution</li>
                              <li>• R&D excellence and technology commercialization impact</li>
                              <li>• International market development and export potential</li>
                              <li>• Francophone business leadership and cultural contribution</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">Upon Quebec Provincial Approval:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                          <ul className="space-y-1">
                            <li>• Provincial funding agreement negotiation and execution</li>
                            <li>• Quebec innovation milestone and deliverable establishment</li>
                            <li>• R&D tax credit optimization and ongoing compliance</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>• Ongoing Quebec program management and advisory support</li>
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
                {/* ESSOR Strategy */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle>ESSOR Application Strategy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Productivity Excellence:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Clear productivity improvement metrics and targets</li>
                          <li>• Technology adoption and automation implementation</li>
                          <li>• Process optimization and efficiency gains</li>
                          <li>• Workforce development and skills enhancement</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Investment Strategy:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Capital investment plan and equipment justification</li>
                          <li>• Return on investment analysis and projections</li>
                          <li>• Environmental impact reduction demonstration</li>
                          <li>• Strategic market positioning and competitive advantage</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Internationalization Focus:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Export market development and expansion strategy</li>
                          <li>• International partnership and distribution channels</li>
                          <li>• Cultural adaptation and francophone market leverage</li>
                          <li>• Trade mission participation and market intelligence</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* R&D Tax Credits Strategy */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Award className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle>Quebec R&D Tax Credits Optimization Strategy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold mb-2 text-purple-700">R&D Activities Excellence:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Scientific and technical uncertainty identification</li>
                          <li>• Systematic investigation and experimentation documentation</li>
                          <li>• Knowledge advancement and innovation demonstration</li>
                          <li>• Eligible R&D expenditure tracking and classification</li>
                          <li>• University collaboration and research partnership</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2 text-green-700">Tax Credit Maximization:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Multiple credit program stacking and optimization</li>
                          <li>• Enhanced credit qualification for SMEs (up to 30%)</li>
                          <li>• University partnership credit (additional 14%)</li>
                          <li>• Pre-competitive research consortium participation</li>
                          <li>• Ongoing compliance and audit preparation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PSCE Strategy */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Globe className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle>PSCE Commercialization & Export Strategy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Market Development:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Product commercialization strategy and go-to-market plan</li>
                          <li>• Market research and customer development</li>
                          <li>• Distribution channel development and partnerships</li>
                          <li>• Brand development and market positioning</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Export Excellence:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• International market analysis and entry strategy</li>
                          <li>• Export readiness assessment and preparation</li>
                          <li>• Cultural adaptation and localization strategy</li>
                          <li>• International partnership and distributor development</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Marketing Strategy:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Marketing strategy development and implementation</li>
                          <li>• Digital marketing and e-commerce development</li>
                          <li>• Trade show participation and market presence</li>
                          <li>• Sales force development and training programs</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Quebec Application Mistakes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Quebec Provincial Application Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Quebec Provincial Application Killers:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Insufficient R&D Documentation:</strong>
                        <p className="text-sm text-gray-600">Not properly documenting R&D activities, scientific uncertainty, and systematic investigation</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Innovation Component:</strong>
                        <p className="text-sm text-gray-600">Failing to demonstrate clear innovation, technology development, or competitive advantage</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Quebec Economic Connection:</strong>
                        <p className="text-sm text-gray-600">Not clearly demonstrating significant Quebec operations and economic development contribution</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Quebec Provincial Process Errors:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Wrong Program Stream Selection:</strong>
                        <p className="text-sm text-gray-600">Not matching business type, sector, and development stage with appropriate Quebec program</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Limited Francophone Strategy:</strong>
                        <p className="text-sm text-gray-600">Not leveraging Quebec's francophone business advantages and international connections</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Inadequate R&D Tax Credit Planning:</strong>
                        <p className="text-sm text-gray-600">Not optimizing multiple R&D credit programs and missing stacking opportunities</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quebec Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quebec Provincial Application Success Strategies</h2>
              
              <div className="space-y-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Francophone Business Excellence Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Quebec Innovation Leadership:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Demonstrate clear R&D activities and innovation excellence</li>
                          <li>• Show significant Quebec operations and high-value job creation</li>
                          <li>• Present measurable contribution to Quebec economic development</li>
                          <li>• Highlight Quebec talent development and capacity building</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Provincial Policy Integration:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Align business goals with Quebec innovation and R&D priorities</li>
                          <li>• Connect to international francophone markets and opportunities</li>
                          <li>• Demonstrate understanding of Quebec innovation ecosystem</li>
                          <li>• Show potential for cross-program and federal program integration</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Strategic Quebec Innovation Ecosystem Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Maximizing Quebec Innovation Network Value:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <ul className="space-y-1">
                              <li>• Connect with Quebec innovation hubs and research centers</li>
                              <li>• Engage with Quebec universities and research institutions</li>
                              <li>• Access Quebec venture capital and investment community</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Partner with Quebec technology clusters and consortiums</li>
                              <li>• Leverage Investissement Quebec advisory services</li>
                              <li>• Connect with international francophone business networks</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Build relationships with Quebec industry associations</li>
                              <li>• Engage with cultural and creative industries ecosystem</li>
                              <li>• Access federal CED-Quebec regional development support</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Long-term Quebec Provincial Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Multi-Program Quebec Development:</strong> Use Quebec success to access federal programs and international opportunities
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>R&D Tax Credit Optimization:</strong> Maximize Quebec's generous R&D credits (up to 30%) and federal program stacking
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Francophone Market Leadership:</strong> Leverage Quebec positioning for international French-language market expansion
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Innovation Ecosystem Excellence:</strong> Establish leadership role in Quebec innovation clusters and research commercialization
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
        <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Need Expert Help with Your Quebec Provincial Application?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Maximize your success with Quebec business funding specialists. Our experts have secured 
                over $14M in Quebec provincial funding with an 88% success rate and deep understanding of all Quebec programs.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">Quebec Provincial Expert Services Include:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Quebec provincial application preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>R&D tax credit optimization and compliance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Innovation and commercialization strategy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Quebec innovation ecosystem integration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>International market development strategy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Federal-provincial funding optimization</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=quebec-business-expert-help">
                  Get Quebec Provincial Expert Help
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
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
