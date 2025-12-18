import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Lightbulb, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Strategic Innovation Fund Application Guide 2025 | Step-by-Step SIF Funding Process",
  description: "Complete step-by-step guide to applying for Strategic Innovation Fund (SIF) funding. Get SIF application templates, innovation project strategies, and proven application frameworks.",
  keywords: "strategic innovation fund application guide, how to apply SIF funding, innovation project grant application Canada, SIF grant application process, transformative project funding application, ISED funding application guide, innovation funding strategy",
  openGraph: {
    title: "Strategic Innovation Fund Application Guide 2025 | SIF Funding Process",
    description: "Step-by-step guide with templates and strategies for successful Strategic Innovation Fund applications for Canadian innovation projects.",
    url: "https://fsidigital.ca/guides/apply-strategic-innovation-fund",
  },
}

export default function SIFApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏛️ SIF Funding Application Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Strategic Innovation Fund Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for Canada's Strategic Innovation Fund. 
                Complete with SIF templates, innovation project strategies, and proven application frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/download/sif-application-kit">
                    <Download className="w-5 h-5 mr-2" />
                    Download SIF Application Kit
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-red-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/strategic-innovation-fund-canada-guide">
                    Back to SIF Guide
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
                  <div className="text-3xl font-bold text-red-600 mb-2">12-18 Months</div>
                  <div className="text-gray-600">Average Application Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">25+ Documents</div>
                  <div className="text-gray-600">Required for SIF Application</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">78%</div>
                  <div className="text-gray-600">Success Rate (Expert Prep)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">No Cost</div>
                  <div className="text-gray-600">Application Fee</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SIF Application Process Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">SIF Application Timeline</h2>
              
              <div className="space-y-8">
                {/* Phase 1: Project Conceptualization */}
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-red-700">Phase 1: Innovation Project Conceptualization</CardTitle>
                      <Badge className="bg-red-100 text-red-800">Months 1-3</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">Identify the Right SIF Stream:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                            <span><strong>Stream 1:</strong> R&D and Commercialization (TRL 1-9)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                            <span><strong>Stream 2:</strong> Business Growth & Expansion (TRL 8-9)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                            <span><strong>Stream 3:</strong> Investment Attraction (TRL 2-9)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                            <span><strong>Stream 4:</strong> Collaborative Technology (TRL 1-7)</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Verify SIF Eligibility Requirements:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                            <span>Minimum $10M SIF funding request</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                            <span>$20M+ total project investment</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                            <span>Canadian incorporated business entity</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                            <span>Transformative innovation potential</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Lightbulb className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-red-800 font-medium">Innovation Project Assessment:</p>
                          <p className="text-red-700 text-sm">
                            Ensure your project demonstrates significant technological advancement, economic impact potential, 
                            and aligns with Canada's innovation priorities before proceeding.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 2: Statement of Interest Development */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Phase 2: Statement of Interest (SOI) Development</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">Months 4-6</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Innovation SOI Components:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-orange-50 p-4 rounded">
                            <strong>Technical Innovation Description:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Core technology and innovation elements</li>
                              <li>• Competitive advantages and differentiation</li>
                              <li>• Technology readiness level assessment</li>
                              <li>• Intellectual property strategy outline</li>
                            </ul>
                          </div>
                          <div className="bg-orange-50 p-4 rounded">
                            <strong>Economic Impact Analysis:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Job creation projections (direct/indirect)</li>
                              <li>• GDP contribution estimates</li>
                              <li>• Export potential and market size</li>
                              <li>• Supply chain development impacts</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">Financial Framework for Innovation Projects:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Project Investment:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Total project costs breakdown</li>
                              <li>• SIF funding request (up to 50%)</li>
                              <li>• Co-funding sources identification</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Cost Categories:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• R&D and innovation activities</li>
                              <li>• Equipment and infrastructure</li>
                              <li>• Personnel and expertise costs</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Return Analysis:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Revenue projection models</li>
                              <li>• Market penetration assumptions</li>
                              <li>• Risk-adjusted return calculations</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3: Full Application Submission */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">Phase 3: SIF Full Application Submission</CardTitle>
                      <Badge className="bg-green-100 text-green-800">Months 7-10</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Comprehensive Technical Documentation:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2">Innovation Documentation:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Detailed technical specifications</li>
                              <li>• Technology development roadmap</li>
                              <li>• Innovation competitive analysis</li>
                              <li>• Intellectual property portfolio</li>
                              <li>• Risk assessment and mitigation</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2">Implementation Planning:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Project management methodology</li>
                              <li>• Milestone and deliverables schedule</li>
                              <li>• Team qualifications and expertise</li>
                              <li>• Quality assurance frameworks</li>
                              <li>• Performance measurement systems</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">Strategic Innovation Fund Financial Submission:</h5>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Required Financial Documents:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• 3+ years audited financial statements</li>
                                <li>• Detailed project budget breakdown</li>
                                <li>• Cash flow projections (5-year horizon)</li>
                                <li>• Co-funding commitment letters</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Economic Benefits Analysis:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• Economic impact modeling</li>
                                <li>• Job creation and retention analysis</li>
                                <li>• Regional development contributions</li>
                                <li>• Innovation ecosystem benefits</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 4: Due Diligence Process */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Phase 4: SIF Due Diligence & Review Process</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Months 11-15</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">SIF Evaluation Criteria:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2 text-blue-700">Innovation Merit (35%):</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Technology advancement significance</li>
                              <li>• Competitive differentiation strength</li>
                              <li>• Innovation commercialization potential</li>
                              <li>• Technical feasibility assessment</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2 text-blue-700">Economic Impact (40%):</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Job creation and economic growth</li>
                              <li>• Export potential and market access</li>
                              <li>• Supply chain development impacts</li>
                              <li>• Regional economic benefits</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h6 className="font-medium mb-2 text-blue-700">Organizational Capability & Implementation (25%):</h6>
                          <div className="grid md:grid-cols-2 gap-4">
                            <ul className="text-sm space-y-1">
                              <li>• Management team expertise and track record</li>
                              <li>• Financial stability and co-funding capacity</li>
                            </ul>
                            <ul className="text-sm space-y-1">
                              <li>• Project implementation methodology</li>
                              <li>• Risk management and mitigation strategies</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-800 mb-2">Upon SIF Approval:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                          <ul className="space-y-1">
                            <li>• Contribution agreement negotiation</li>
                            <li>• Performance milestone establishment</li>
                            <li>• Reporting and monitoring setup</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>• Project launch and implementation</li>
                            <li>• Regular progress reporting</li>
                            <li>• Innovation ecosystem engagement</li>
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

        {/* SIF Stream-Specific Application Processes */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">SIF Stream-Specific Application Processes</h2>
              
              <div className="space-y-6">
                {/* Stream 1: R&D and Commercialization */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Lightbulb className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle>Stream 1: Research, Development & Commercialization</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Application Focus:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Early-stage R&D through commercialization</li>
                          <li>• Technology readiness advancement</li>
                          <li>• Innovation differentiation demonstration</li>
                          <li>• Commercialization pathway planning</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Key Requirements:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Clear innovation objectives</li>
                          <li>• Technical feasibility evidence</li>
                          <li>• Market validation research</li>
                          <li>• IP protection strategy</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Success Factors:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Strong technical team credentials</li>
                          <li>• Clear competitive advantages</li>
                          <li>• Robust commercialization plan</li>
                          <li>• Risk mitigation strategies</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stream 2 & 3 Combined */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Building className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle>Stream 2 & 3: Business Growth & Investment Attraction</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold mb-2 text-orange-700">Stream 2: Business Growth Focus:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Existing facility expansion projects</li>
                          <li>• Production capacity increases</li>
                          <li>• Technology upgrade and modernization</li>
                          <li>• Process efficiency improvements</li>
                          <li>• Market penetration enhancement</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2 text-green-700">Stream 3: Investment Attraction:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• New facility establishment in Canada</li>
                          <li>• Technology mandate relocations</li>
                          <li>• Foreign investment attraction</li>
                          <li>• Global competency center development</li>
                          <li>• Strategic reinvestment initiatives</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common SIF Application Mistakes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Strategic Innovation Fund Application Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Application Killers for SIF Projects:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Insufficient Scale and Impact:</strong>
                        <p className="text-sm text-gray-600">Not meeting minimum $10M funding threshold or demonstrating transformative economic impact</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Innovation Differentiation:</strong>
                        <p className="text-sm text-gray-600">Failing to clearly articulate competitive advantages and technological advancement</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Inadequate Co-funding Commitment:</strong>
                        <p className="text-sm text-gray-600">Not securing firm commitment for 50%+ co-funding requirement</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ SIF Application Process Errors:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Wrong Stream Selection:</strong>
                        <p className="text-sm text-gray-600">Applying to inappropriate SIF stream based on project characteristics and TRL</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Risk Management:</strong>
                        <p className="text-sm text-gray-600">Insufficient identification and mitigation of technical, commercial, and financial risks</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Unrealistic Timeline and Milestones:</strong>
                        <p className="text-sm text-gray-600">Overly optimistic project schedules without adequate contingency planning</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SIF Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Strategic Innovation Fund Success Strategies</h2>
              
              <div className="space-y-6">
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Innovation Excellence Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Innovation Positioning:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Clearly articulate technological breakthrough elements</li>
                          <li>• Demonstrate significant advancement beyond current state-of-art</li>
                          <li>• Show alignment with government innovation priorities</li>
                          <li>• Evidence strong intellectual property strategy</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Economic Impact Demonstration:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Quantify job creation potential (direct and indirect)</li>
                          <li>• Model GDP contribution and economic multipliers</li>
                          <li>• Assess export potential and global market access</li>
                          <li>• Show supply chain development benefits</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Strategic Partnership Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Building Innovation Ecosystem Partnerships:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <ul className="space-y-1">
                              <li>• Partner with leading research institutions</li>
                              <li>• Engage with innovation superclusters</li>
                              <li>• Connect with technology accelerators</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Build strategic industry partnerships</li>
                              <li>• Develop supplier ecosystem relationships</li>
                              <li>• Establish customer validation partnerships</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Engage government stakeholders early</li>
                              <li>• Leverage regional development opportunities</li>
                              <li>• Build international collaboration networks</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Financial Strategy for Large-Scale Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Diversified Co-funding Approach:</strong> Combine SIF funding with private investment, other government programs, and strategic partnerships
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Phased Investment Strategy:</strong> Structure project in phases with clear milestones and risk mitigation at each stage
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Robust Financial Controls:</strong> Implement comprehensive project financial management and reporting systems
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Value Creation Planning:</strong> Develop clear pathways for return on investment and economic value creation
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
        <section className="py-20 bg-gradient-to-r from-red-600 to-red-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Need Expert Help with Your Strategic Innovation Fund Application?
              </h2>
              <p className="text-xl text-red-100 mb-8">
                Maximize your success with SIF funding specialists. Our experts have secured 
                over $180M in Strategic Innovation Fund approvals with a 78% success rate for large-scale innovation projects.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">SIF Expert Services Include:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-red-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Strategic Innovation Fund application preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Innovation project strategy development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Economic impact analysis and modeling</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Technical feasibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>SIF stream selection and positioning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Due diligence preparation and support</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=strategic-innovation-fund-expert-help">
                  Get SIF Expert Help
                </Link>
              </Button>
              <p className="text-red-200 text-sm mt-4">
                78% success rate for SIF applications • Average funding secured: $35M • Large-scale innovation expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
