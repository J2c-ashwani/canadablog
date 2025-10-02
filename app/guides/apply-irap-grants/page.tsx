import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Lightbulb, Code, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Complete IRAP Application Guide 2025 | Step-by-Step R&D Grant Process",
  description: "Step-by-step guide to applying for IRAP grants from NRC. Get templates, strategies, and expert tips for successful R&D funding applications.",
  keywords: "IRAP application guide, how to apply IRAP, NRC IRAP process, R&D grant application, industrial research funding",
  openGraph: {
    title: "Complete IRAP Application Guide 2025 | Step-by-Step R&D Grant Process",
    description: "Step-by-step guide with templates and strategies for successful IRAP grant applications.",
    url: "https://grantfinder.pro/guides/apply-irap-grants",
  },
}

export default function IRAPApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🔬 Complete Application Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                IRAP Grant Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-emerald-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for Industrial Research Assistance Program grants. 
                Complete with templates, project frameworks, and proven R&D strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/download/irap-application-kit">
                    <Download className="w-5 h-5 mr-2" />
                    Download Application Kit
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-emerald-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/irap-industrial-research-assistance-program">
                    Back to IRAP Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">8-12 Weeks</div>
                  <div className="text-gray-600">Average Review Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+ Documents</div>
                  <div className="text-gray-600">Technical Submission</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
                  <div className="text-gray-600">Approval Rate (Expert Prep)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">No Fee</div>
                  <div className="text-gray-600">Application Cost</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">IRAP Application Process</h2>
              
              <div className="space-y-8">
                {/* Phase 1: Pre-Application */}
                <Card className="border-emerald-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-emerald-700">Phase 1: Pre-Application Consultation</CardTitle>
                      <Badge className="bg-emerald-100 text-emerald-800">Weeks 1-2</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">ITA Engagement:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                            <span>Find your local Industrial Technology Advisor</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                            <span>Schedule initial consultation meeting</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                            <span>Present technology concept and goals</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                            <span>Discuss eligibility and funding options</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Project Scoping:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                            <span>Define technical objectives and scope</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                            <span>Identify key milestones and deliverables</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                            <span>Assess technical feasibility and risks</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                            <span>Develop preliminary budget estimates</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Lightbulb className="w-5 h-5 text-emerald-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-emerald-800 font-medium">Key Success Factor:</p>
                          <p className="text-emerald-700 text-sm">
                            Early ITA engagement is critical. They provide invaluable guidance on project positioning 
                            and help align your proposal with IRAP priorities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 2: Project Development */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Phase 2: Project Development & Planning</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Weeks 3-6</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Technical Work Plan:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-4 rounded">
                            <strong>Research Activities:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Define research methodology</li>
                              <li>• Identify required resources and expertise</li>
                              <li>• Plan experimental design and validation</li>
                              <li>• Establish success criteria and metrics</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded">
                            <strong>Project Management:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Create detailed project timeline</li>
                              <li>• Define work packages and tasks</li>
                              <li>• Assign team roles and responsibilities</li>
                              <li>• Plan risk mitigation strategies</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">Commercialization Strategy:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Market Analysis:</strong>
                            <ul className="mt-2 space-y-1">
                              <li>• Target market identification</li>
                              <li>• Competitive landscape analysis</li>
                              <li>• Market size and growth potential</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Business Model:</strong>
                            <ul className="mt-2 space-y-1">
                              <li>• Revenue model development</li>
                              <li>• Pricing strategy framework</li>
                              <li>• Partnership and distribution plans</li>
                            </ul>
                          </div>
                          <div>
                            <strong>IP Strategy:</strong>
                            <ul className="mt-2 space-y-1">
                              <li>• Patent landscape analysis</li>
                              <li>• IP protection strategy</li>
                              <li>• Freedom-to-operate assessment</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3: Proposal Preparation */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Phase 3: Proposal Preparation</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Weeks 7-8</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Required Documentation:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2">Technical Documents:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Project description and objectives</li>
                              <li>• Technical approach and methodology</li>
                              <li>• Work plan and timeline</li>
                              <li>• Risk assessment and mitigation</li>
                              <li>• Expected outcomes and deliverables</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2">Business Documents:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Company profile and capabilities</li>
                              <li>• Management team qualifications</li>
                              <li>• Financial statements and projections</li>
                              <li>• Market analysis and commercialization plan</li>
                              <li>• Intellectual property strategy</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h5 className="font-semibold text-purple-800 mb-2">Budget Development:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Eligible Costs:</strong>
                            <ul className="mt-1 space-y-1 text-purple-700">
                              <li>• Salaries and benefits (67%)</li>
                              <li>• Contract research (67%)</li>
                              <li>• Materials and supplies (67%)</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Limited Funding:</strong>
                            <ul className="mt-1 space-y-1 text-purple-700">
                              <li>• Equipment (case-by-case)</li>
                              <li>• Travel (project-related only)</li>
                              <li>• Training (R&D specific)</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Ineligible Costs:</strong>
                            <ul className="mt-1 space-y-1 text-purple-700">
                              <li>• General overhead</li>
                              <li>• Marketing expenses</li>
                              <li>• Routine operations</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 4: Review Process */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Phase 4: Technical Review & Decision</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">Weeks 9-12</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Review Criteria:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Technical Merit (40%):</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Innovation and technical advancement</li>
                              <li>• Scientific and technical feasibility</li>
                              <li>• Quality of technical approach</li>
                              <li>• Team expertise and capabilities</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Commercial Potential (40%):</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Market opportunity and size</li>
                              <li>• Competitive advantage</li>
                              <li>• Business model viability</li>
                              <li>• Commercialization timeline</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h6 className="font-medium mb-2 text-orange-700">Management & Resources (20%):</h6>
                          <div className="grid md:grid-cols-2 gap-4">
                            <ul className="text-sm space-y-1">
                              <li>• Project management capabilities</li>
                              <li>• Financial resources and stability</li>
                            </ul>
                            <ul className="text-sm space-y-1">
                              <li>• Previous R&D track record</li>
                              <li>• Partnership and collaboration strategy</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">Upon Approval:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                          <ul className="space-y-1">
                            <li>• Receive contribution agreement</li>
                            <li>• Complete project setup and reporting</li>
                            <li>• Begin quarterly milestone reviews</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>• Access ongoing ITA advisory support</li>
                            <li>• Connect with NRC technical experts</li>
                            <li>• Participate in commercialization programs</li>
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

        {/* Project Categories & Requirements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">IRAP Project Categories</h2>
              
              <div className="space-y-6">
                {/* Innovation Projects */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Lightbulb className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle>Innovation Projects</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Eligible Activities:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• New product development</li>
                          <li>• Process innovation</li>
                          <li>• Technology adaptation</li>
                          <li>• Prototype development</li>
                          <li>• Proof-of-concept studies</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Funding Details:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Up to $1M per project</li>
                          <li>• Up to 67% cost-sharing</li>
                          <li>• 6-24 month duration</li>
                          <li>• Non-repayable contributions</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Success Factors:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Clear technical innovation</li>
                          <li>• Strong commercial potential</li>
                          <li>• Experienced R&D team</li>
                          <li>• Well-defined milestones</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Youth Employment */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Users className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle>Youth Employment Initiative</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Program Features:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• 75% salary contribution</li>
                          <li>• Up to $40K annually</li>
                          <li>• 12-24 month placements</li>
                          <li>• Recent STEM graduates</li>
                          <li>• Skills development focus</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Candidate Requirements:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Age 15-30 years</li>
                          <li>• Post-secondary graduate</li>
                          <li>• STEM field background</li>
                          <li>• Canadian citizen/PR</li>
                          <li>• Graduated within 3 years</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Project Alignment:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Must support innovation project</li>
                          <li>• Technical skill development</li>
                          <li>• Meaningful R&D contribution</li>
                          <li>• Clear learning objectives</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Avoid These Common IRAP Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Application Killers:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Technical Innovation:</strong>
                        <p className="text-sm text-gray-600">Proposing incremental improvements rather than significant technological advancement</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Market Validation:</strong>
                        <p className="text-sm text-gray-600">Failing to demonstrate clear market need and commercial viability</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Inadequate R&D Capability:</strong>
                        <p className="text-sm text-gray-600">Lacking necessary technical expertise or research infrastructure</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Process Mistakes:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Late ITA Engagement:</strong>
                        <p className="text-sm text-gray-600">Not involving Industrial Technology Advisor early in project development</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Unrealistic Timelines:</strong>
                        <p className="text-sm text-gray-600">Setting overly aggressive schedules without proper risk assessment</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Commercialization Plan:</strong>
                        <p className="text-sm text-gray-600">Vague or unrealistic path from R&D to market implementation</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">IRAP Success Strategies</h2>
              
              <div className="space-y-6">
                <Card className="border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-700">Technical Excellence Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Innovation Positioning:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Clearly articulate technological breakthrough</li>
                          <li>• Demonstrate significant advancement over prior art</li>
                          <li>• Show measurable performance improvements</li>
                          <li>• Address real technical challenges</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Research Methodology:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Use rigorous scientific approaches</li>
                          <li>• Plan comprehensive validation studies</li>
                          <li>• Include appropriate control experiments</li>
                          <li>• Define clear success criteria</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Market-Driven Approach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Commercial Validation:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <ul className="space-y-1">
                              <li>• Customer discovery and validation</li>
                              <li>• Market size quantification</li>
                              <li>• Competitive analysis depth</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Value proposition clarity</li>
                              <li>• Pricing model development</li>
                              <li>• Go-to-market strategy</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Partnership opportunities</li>
                              <li>• Regulatory pathway planning</li>
                              <li>• Revenue projections</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Team & Resource Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Assemble Strong R&D Team:</strong> Include technical leaders with relevant experience and track record
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Leverage External Expertise:</strong> Partner with universities, research institutes, or consultants
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Plan Resource Allocation:</strong> Ensure adequate facilities, equipment, and materials access
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Manage Project Risks:</strong> Identify technical and commercial risks with mitigation plans
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
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Need Expert Help with Your IRAP Application?
              </h2>
              <p className="text-xl text-emerald-100 mb-8">
                Maximize your R&D funding success. Our IRAP specialists have secured over $25M 
                in grants and maintain an 89% approval rate for Canadian tech companies.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">Expert Services Include:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Technical proposal development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Market analysis and validation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Commercialization strategy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>ITA relationship management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Project planning and budgeting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Application review and optimization</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=irap-expert-help">
                  Get Expert Help Now
                </Link>
              </Button>
              <p className="text-emerald-200 text-sm mt-4">
                89% approval rate • Average funding: $320K • Tech-focused expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
