import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for SBIR Research Grants 2025 | Small Business Innovation Research",
  description: "Step-by-step guide to applying for SBIR research grants. Learn Phase I & II application process, eligibility requirements, and winning strategies for $50K-$1.7M.",
  keywords: "SBIR application guide, SBIR research grants, small business innovation research application, SBIR Phase I Phase II",
  openGraph: {
    title: "How to Apply for SBIR Research Grants 2025",
    description: "Complete guide to SBIR research grant applications with step-by-step process and winning strategies.",
    url: "https://fsidigital.ca/guides/sbir-research-grants-guide",
  },
}

export default function SBIRResearchGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                ⚡ SBIR Research Grant Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for SBIR Research Grants
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Complete step-by-step guide to applying for Small Business Innovation Research grants. 
                Learn the application process, requirements, and strategies to secure $50K-$1.7M in federal R&D funding.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$1.7M</div>
                  <div className="text-gray-600">Maximum Phase II Award</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">6-9</div>
                  <div className="text-gray-600">Months Application Review</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">23%</div>
                  <div className="text-gray-600">Average Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">11</div>
                  <div className="text-gray-600">Federal Agencies</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* SBIR Application Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBIR Research Grant Application Process</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Lightbulb className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-800 mb-2">Innovation-Focused Funding</h4>
                      <p className="text-blue-700">
                        SBIR grants fund research and development with high commercialization potential. 
                        Unlike loans, these grants don't require repayment and don't dilute equity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Choose Agency & Topic</h4>
                      <p className="text-sm text-gray-600">
                        Select federal agency and research topic that aligns with your innovation
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Register & Prepare</h4>
                      <p className="text-sm text-gray-600">
                        Complete SAM.gov registration and develop technical proposal
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit Phase I</h4>
                      <p className="text-sm text-gray-600">
                        Submit Phase I proposal through agency portal or grants.gov
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Execute & Apply Phase II</h4>
                      <p className="text-sm text-gray-600">
                        Complete Phase I work and apply for Phase II funding
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase I Application Details */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Phase I Application Requirements</h2>
                
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Phase I: Proof of Concept ($50K - $300K)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> $50K - $300K</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Duration:</strong> 6-12 months</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Page Limit:</strong> 25 pages (varies by agency)</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Required Sections:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Technical objectives and approach</li>
                          <li>• Anticipated technical challenges</li>
                          <li>• Commercial potential assessment</li>
                          <li>• Team qualifications</li>
                          <li>• Budget and budget narrative</li>
                          <li>• Work plan and milestones</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Key Success Factors:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Clear innovation and technical merit</li>
                          <li>• Strong commercial potential</li>
                          <li>• Qualified research team</li>
                          <li>• Realistic work plan</li>
                          <li>• Alignment with agency needs</li>
                          <li>• Market opportunity analysis</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Phase II Application Details */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Phase II Application Requirements</h2>
                
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Phase II: R&D Development ($750K - $1.7M)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> $750K - $1.7M</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Duration:</strong> 24 months</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Eligibility:</strong> Phase I recipients only</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-bold mb-2 text-blue-800">Phase II Requirements:</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Must demonstrate successful Phase I completion and significant progress toward commercialization.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">Additional Sections:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Phase I results and achievements</li>
                          <li>• Detailed commercialization plan</li>
                          <li>• Market analysis and competition</li>
                          <li>• Partnership and collaboration plans</li>
                          <li>• Intellectual property strategy</li>
                          <li>• Follow-on funding strategy</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">Enhanced Focus Areas:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Product development roadmap</li>
                          <li>• Regulatory approval pathway</li>
                          <li>• Manufacturing and scaling plans</li>
                          <li>• Revenue projections</li>
                          <li>• Customer validation evidence</li>
                          <li>• Risk mitigation strategies</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Agency Selection Guide */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Choosing the Right SBIR Agency</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Largest SBIR Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <div>
                            <strong>Department of Defense (DoD)</strong>
                            <p className="text-sm text-gray-600">Defense & security technologies</p>
                          </div>
                          <span className="font-bold text-green-600">$1.8B</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>National Institutes of Health (NIH)</strong>
                            <p className="text-sm text-gray-600">Healthcare & life sciences</p>
                          </div>
                          <span className="font-bold text-blue-600">$900M</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                          <div>
                            <strong>National Science Foundation (NSF)</strong>
                            <p className="text-sm text-gray-600">Broad technology areas</p>
                          </div>
                          <span className="font-bold text-purple-600">$200M</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Agency Selection Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Match Technology Focus</strong>
                            <p className="text-sm text-gray-600">Align your innovation with agency mission</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Review Topic Areas</strong>
                            <p className="text-sm text-gray-600">Study annual solicitation topics</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Consider Success Rates</strong>
                            <p className="text-sm text-gray-600">Research historical award rates by topic</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Engage Program Managers</strong>
                            <p className="text-sm text-gray-600">Contact agency personnel early</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Required Documentation */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documentation & Forms</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">📊 Technical Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Technical Proposal</strong>
                            <p className="text-sm text-gray-600">Detailed technical approach and methodology</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Work Plan & Schedule</strong>
                            <p className="text-sm text-gray-600">Timeline with milestones and deliverables</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Budget & Justification</strong>
                            <p className="text-sm text-gray-600">Detailed cost breakdown with explanations</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Commercialization Plan</strong>
                            <p className="text-sm text-gray-600">Market analysis and business strategy</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">📋 Administrative Forms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Company Capability Statement</strong>
                            <p className="text-sm text-gray-600">Company background and qualifications</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Principal Investigator Bio</strong>
                            <p className="text-sm text-gray-600">Detailed resume and experience</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Cost Accounting Standards</strong>
                            <p className="text-sm text-gray-600">CAS compliance documentation</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Certifications & Representations</strong>
                            <p className="text-sm text-gray-600">Required federal compliance forms</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">SBIR Application Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Winning Strategies</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Start early - proposals take 2-3 months to develop</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Focus on both technical merit and commercial potential</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Demonstrate clear competitive advantage</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Show strong management team with relevant experience</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Pitfalls</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Weak commercialization plan</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Insufficient market research</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Overly technical writing</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Unrealistic budget or timeline</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official SBIR Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">SBIR Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBIR.gov</h5>
                          <p className="text-sm text-gray-600">Official SBIR program website</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sbir.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Grants.gov</h5>
                          <p className="text-sm text-gray-600">Federal grant application portal</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.grants.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SAM.gov</h5>
                          <p className="text-sm text-gray-600">System for Award Management</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://sam.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Support Programs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBIR Road Tour</h5>
                          <p className="text-sm text-gray-600">National outreach events</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sbir.gov/events" target="_blank" rel="noopener noreferrer">
                            Events <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SCORE</h5>
                          <p className="text-sm text-gray-600">Free business mentoring</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.score.org/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBDC</h5>
                          <p className="text-sm text-gray-600">Small Business Development Centers</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://americassbdc.org/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for SBIR Research Grants?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Need expert guidance on SBIR applications? Our specialists can help you develop winning proposals, 
                  navigate the application process, and maximize your chances of securing federal R&D funding.
                </p>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/contact">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Get Expert Help
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
