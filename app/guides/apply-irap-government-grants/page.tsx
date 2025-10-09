import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IRAP Government Grants Application Guide 2025 | Step-by-Step Federal R&D Funding Process",
  description: "Complete step-by-step guide to applying for IRAP government grants. Get federal R&D funding templates, compliance checklists, and proven application frameworks.",
  keywords: "IRAP government grants application guide, how to apply IRAP funding, federal R&D grant application Canada, IRAP compliance application process, government innovation funding application guide, NRC IRAP application strategy",
  openGraph: {
    title: "IRAP Government Grants Application Guide 2025 | Federal R&D Funding Process",
    description: "Step-by-step guide with templates and strategies for successful IRAP government grants applications for Canadian R&D projects.",
    url: "https://grantfinder.pro/guides/apply-irap-government-grants",
  },
}

export default function IRAPGovernmentGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏛️ Federal R&D Funding Application Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                IRAP Government Grants Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for IRAP government grants. 
                Complete with federal compliance templates, R&D funding strategies, and proven government application frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/download/irap-government-application-kit">
                    <Download className="w-5 h-5 mr-2" />
                    Download IRAP Government Kit
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-green-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/irap-industrial-research-assistance-program-government-grants">
                    Back to IRAP Government Guide
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
                  <div className="text-3xl font-bold text-green-600 mb-2">6-8 Months</div>
                  <div className="text-gray-600">Average Application Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+ Documents</div>
                  <div className="text-gray-600">Federal Compliance Requirements</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                  <div className="text-gray-600">Success Rate (Expert Prep)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">No Cost</div>
                  <div className="text-gray-600">Application Fee</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IRAP Government Application Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">IRAP Government Application Timeline</h2>
              <div className="space-y-8">
                {/* Phase 1: Federal Eligibility Assessment */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">Phase 1: Federal Eligibility & Compliance Assessment</CardTitle>
                      <Badge className="bg-green-100 text-green-800">Months 1-2</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">Federal Eligibility Requirements:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span><strong>Canadian SME Status:</strong> &lt;500 employees, Canadian incorporation</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span><strong>R&D Focus:</strong> Technology development and innovation activities</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span><strong>Financial Capacity:</strong> Ability to co-fund project activities</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span><strong>Compliance Readiness:</strong> Federal reporting and audit capabilities</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Government Program Alignment:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Federal innovation strategy priorities</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Clean technology and sustainability goals</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Digital economy and AI advancement</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Advanced manufacturing competitiveness</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-green-800 font-medium">Federal Compliance Check:</p>
                          <p className="text-green-700 text-sm">
                            Ensure your organization meets Federal Contractors Program requirements and has systems in place for Treasury Board Secretariat reporting standards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Phase 2: ITA Engagement & Project Development */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Phase 2: Industrial Technology Advisor (ITA) Engagement</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Months 2-4</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">ITA Partnership Development:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-4 rounded">
                            <strong>Technical Advisory Services:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Technology roadmap development</li>
                              <li>• Innovation strategy formulation</li>
                              <li>• Market intelligence and competitive analysis</li>
                              <li>• Technical feasibility assessment</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded">
                            <strong>Government Integration Support:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Federal program alignment guidance</li>
                              <li>• Strategic Innovation Fund pathway planning</li>
                              <li>• Innovation ecosystem connections</li>
                              <li>• Partnership facilitation and networking</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">Project Definition for Government Funding:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Technical Objectives:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Clear innovation goals and outcomes</li>
                              <li>• Technology readiness level advancement</li>
                              <li>• Intellectual property development strategy</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Economic Impact:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Job creation and retention projections</li>
                              <li>• Revenue growth and market expansion</li>
                              <li>• Export potential and competitiveness</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Federal Alignment:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Innovation policy objective alignment</li>
                              <li>• Sector strategy contribution</li>
                              <li>• Regional development benefits</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3: Formal Application Preparation */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Phase 3: Federal Application Preparation & Submission</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Months 4-6</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Government Application Documentation:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2">Technical Documentation:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Detailed R&D project description</li>
                              <li>• Technology development roadmap</li>
                              <li>• Innovation differentiation analysis</li>
                              <li>• Risk assessment and mitigation strategy</li>
                              <li>• Performance measurement framework</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2">Federal Compliance Documentation:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Corporate eligibility verification</li>
                              <li>• Financial capacity demonstration</li>
                              <li>• Audit readiness and controls documentation</li>
                              <li>• Reporting system capabilities</li>
                              <li>• Performance measurement systems</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-3">IRAP Government Application Submission:</h5>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Required Federal Documents:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• NRC-IRAP formal application form</li>
                                <li>• Audited financial statements (2-3 years)</li>
                                <li>• Project budget with eligible cost breakdown</li>
                                <li>• Technical project specifications</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Government Review Process:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• Technical evaluation by NRC panel</li>
                                <li>• Financial due diligence assessment</li>
                                <li>• Policy alignment verification</li>
                                <li>• Risk assessment and mitigation review</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 4: Federal Approval & Implementation */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Phase 4: Federal Approval & Project Implementation</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">Months 6-8</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Government Decision Process:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">NRC Evaluation Criteria:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Technical merit and innovation potential</li>
                              <li>• Economic impact and job creation</li>
                              <li>• Organizational capacity and track record</li>
                              <li>• Federal policy alignment and priorities</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Risk Assessment Factors:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Technical feasibility and development risk</li>
                              <li>• Market acceptance and commercial viability</li>
                              <li>• Financial stability and co-funding capacity</li>
                              <li>• Compliance and reporting capabilities</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">Upon IRAP Government Approval:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                          <ul className="space-y-1">
                            <li>• Federal contribution agreement execution</li>
                            <li>• Performance milestone establishment</li>
                            <li>• Reporting schedule and requirements setup</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>• Project launch and implementation</li>
                            <li>• Regular federal reporting and monitoring</li>
                            <li>• Pathway to additional government programs</li>
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

        {/* Federal Compliance Application Requirements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Federal Compliance Application Requirements</h2>

              <div className="space-y-6">
                {/* Treasury Board Compliance */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Shield className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle>Treasury Board Secretariat Compliance Requirements</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Financial Reporting:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Monthly contribution claims with documentation</li>
                          <li>• Auditable expense tracking systems</li>
                          <li>• Government accounting standards compliance</li>
                          <li>• Quarterly progress and financial reporting</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Audit Readiness:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Document retention systems (7+ years)</li>
                          <li>• Time recording and verification procedures</li>
                          <li>• Internal controls and approval processes</li>
                          <li>• External audit cooperation capabilities</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Performance Monitoring:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Milestone tracking and reporting systems</li>
                          <li>• Key performance indicator measurement</li>
                          <li>• Impact assessment and evaluation</li>
                          <li>• Corrective action and improvement processes</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Federal Integration Opportunities */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Building className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle>Strategic Federal Program Integration</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold mb-2 text-blue-700">Pathway to Larger Federal Programs:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Strategic Innovation Fund (SIF) readiness development</li>
                          <li>• Innovation Superclusters collaboration opportunities</li>
                          <li>• Clean Technology Program eligibility building</li>
                          <li>• Export development and internationalization support</li>
                          <li>• Defence Innovation Fund potential alignment</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2 text-green-700">Complementary Government Support:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• SR&ED tax credit optimization strategies</li>
                          <li>• Regional Development Agency coordination</li>
                          <li>• Provincial innovation program alignment</li>
                          <li>• Trade Commissioner Service export support</li>
                          <li>• Mitacs research partnership opportunities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Government Application Mistakes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common IRAP Government Application Mistakes</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Federal Application Killers:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Inadequate Compliance Systems:</strong>
                        <p className="text-sm text-gray-600">Lacking proper financial tracking, audit readiness, and federal reporting capabilities</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Federal Policy Alignment:</strong>
                        <p className="text-sm text-gray-600">Failing to demonstrate clear connection to Canada's innovation priorities and strategies</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Economic Impact Justification:</strong>
                        <p className="text-sm text-gray-600">Insufficient demonstration of job creation and economic benefits to Canada</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Government Process Errors:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Limited ITA Engagement:</strong>
                        <p className="text-sm text-gray-600">Not fully leveraging Industrial Technology Advisor expertise and guidance</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Narrow Program Vision:</strong>
                        <p className="text-sm text-gray-600">Not positioning IRAP as stepping stone to larger federal innovation programs</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Insufficient Technical Detail:</strong>
                        <p className="text-sm text-gray-600">Lacking comprehensive technical specifications and development methodology</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IRAP Government Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">IRAP Government Application Success Strategies</h2>

              <div className="space-y-6">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Federal Funding Excellence Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Government Priority Alignment:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Demonstrate clear connection to federal innovation strategy</li>
                          <li>• Align with sector-specific government priorities</li>
                          <li>• Show contribution to economic growth and competitiveness</li>
                          <li>• Evidence support for government policy objectives</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Compliance Excellence Positioning:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Establish robust financial tracking and reporting systems</li>
                          <li>• Implement comprehensive audit readiness procedures</li>
                          <li>• Develop strong performance measurement frameworks</li>
                          <li>• Show commitment to transparency and accountability</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Strategic Government Partnership Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Maximizing ITA Partnership Value:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <ul className="space-y-1">
                              <li>• Engage ITA early in project development</li>
                              <li>• Leverage technical advisory expertise</li>
                              <li>• Access market intelligence and insights</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Build long-term strategic relationship</li>
                              <li>• Utilize networking and partnership facilitation</li>
                              <li>• Access broader NRC innovation ecosystem</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Position for future federal program opportunities</li>
                              <li>• Develop pathway to larger government initiatives</li>
                              <li>• Build credibility within federal innovation system</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Long-term Federal Innovation Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Strategic Innovation Fund Pathway:</strong> Use IRAP success to build credibility for larger SIF applications
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Innovation Ecosystem Integration:</strong> Connect with superclusters, research institutions, and innovation hubs
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Multi-Program Optimization:</strong> Coordinate IRAP with SR&ED, regional programs, and provincial initiatives
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>International Growth Strategy:</strong> Leverage Trade Commissioner Service and export development programs
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
                Need Expert Help with Your IRAP Government Application?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Maximize your success with federal funding specialists. Our experts have secured 
                over $12M in IRAP government grants with an 85% success rate and deep federal compliance expertise.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">IRAP Government Expert Services Include:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-green-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>IRAP government application preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Federal compliance system development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>ITA relationship management and strategy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Multi-program federal funding optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Strategic Innovation Fund pathway development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Treasury Board compliance and audit preparation</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=irap-government-expert-help">
                  Get IRAP Government Expert Help
                </Link>
              </Button>
              <p className="text-green-200 text-sm mt-4">
                85% success rate for IRAP government applications • Average funding secured: $94K • Federal compliance expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
