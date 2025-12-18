import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for SBIR Grants 2025 | Step-by-Step Application Guide",
  description: "Complete SBIR grant application guide. Learn Phase I & II requirements, proposal writing, budget preparation, and winning strategies for Small Business Innovation Research grants.",
  keywords: "SBIR application guide, SBIR grants how to apply, Phase I Phase II SBIR, SBIR proposal writing, innovation research grants",
  openGraph: {
    title: "How to Apply for SBIR Grants 2025",
    description: "Complete step-by-step guide to applying for SBIR grants with winning strategies.",
    url: "https://fsidigital.ca/guides/apply-sbir-grants",
  },
}

export default function ApplySBIRGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🚀 SBIR Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for SBIR Grants
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Complete step-by-step guide to applying for Small Business Innovation Research (SBIR) grants. 
                Learn the application process, requirements, and winning strategies for securing up to $1.7M in R&D funding.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$4.1B</div>
                  <div className="text-gray-600">Annual SBIR Awards</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">23%</div>
                  <div className="text-gray-600">Average Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">11</div>
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
              
              {/* Eligibility Check */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBIR Eligibility Checklist</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">✅ Required Qualifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Small Business:</strong> ≤ 500 employees</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>For-Profit:</strong> Must be for-profit entity</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>US Owned:</strong> ≥ 51% US citizens/permanent residents</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Principal Investigator:</strong> Primarily employed by company</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Research Focus:</strong> Innovative R&D with commercial potential</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">📋 Pre-Application Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <span><strong>SAM.gov Registration:</strong> Active registration required</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <span><strong>Grants.gov Account:</strong> For application submission</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <span><strong>UEI Number:</strong> Unique Entity Identifier</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <span><strong>Research Topics:</strong> Align with agency priorities</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <span><strong>Team Assembly:</strong> Key personnel identified</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Phase I Application Guide */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Phase I Application Components</h2>
                
                <div className="space-y-6">
                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700 flex items-center">
                        <Lightbulb className="w-5 h-5 mr-2" />
                        Technical Abstract & Proposal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Technical Abstract (200-300 words):</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• State the problem clearly</li>
                            <li>• Describe your innovative solution</li>
                            <li>• Highlight technical approach</li>
                            <li>• Mention commercial potential</li>
                            <li>• Include key objectives</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Technical Proposal (14-15 pages):</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Identification & significance of problem</li>
                            <li>• Phase I technical objectives</li>
                            <li>• Phase I work plan</li>
                            <li>• Related work & literature review</li>
                            <li>• Relationship with Phase II</li>
                            <li>• Key personnel qualifications</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Commercialization Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Market Analysis (3-5 pages):</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Target market identification</li>
                            <li>• Market size and growth</li>
                            <li>• Customer needs analysis</li>
                            <li>• Competitive landscape</li>
                            <li>• Value proposition</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Business Strategy:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Go-to-market strategy</li>
                            <li>• Revenue model</li>
                            <li>• Sales & distribution channels</li>
                            <li>• Pricing strategy</li>
                            <li>• Intellectual property plan</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Budget & Cost Proposal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Direct Costs:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Personnel (PI, key staff)</li>
                            <li>• Fringe benefits</li>
                            <li>• Equipment & supplies</li>
                            <li>• Travel expenses</li>
                            <li>• Contractual/consultant costs</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Budget Guidelines:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Most agencies: up to $300K</li>
                            <li>• 6-month performance period</li>
                            <li>• Detailed cost breakdown required</li>
                            <li>• Justify all major expenses</li>
                            <li>• No cost sharing required</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Phase II Information */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Phase II Application Requirements</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800">
                    <strong>Important:</strong> Only Phase I recipients can apply for Phase II funding. 
                    Phase II applications are typically due 12-18 months after Phase I award.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4">Enhanced Requirements:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Expanded technical proposal (45 pages)</li>
                      <li>• Detailed commercialization plan (15 pages)</li>
                      <li>• Phase I results and achievements</li>
                      <li>• Updated market analysis</li>
                      <li>• Partnership and funding strategy</li>
                      <li>• Intellectual property status</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4">Phase II Benefits:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Up to $1.7M in funding</li>
                      <li>• 24-month performance period</li>
                      <li>• Product development focus</li>
                      <li>• Market entry preparation</li>
                      <li>• Access to Phase II enhancement</li>
                      <li>• Investor attraction support</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Application Timeline */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBIR Application Timeline</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      6M
                    </div>
                    <div>
                      <h4 className="font-bold">6 Months Before Deadline</h4>
                      <p className="text-sm text-gray-600">Research topics, identify opportunities, begin team building</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      4M
                    </div>
                    <div>
                      <h4 className="font-bold">4 Months Before Deadline</h4>
                      <p className="text-sm text-gray-600">Contact program officers, refine research approach, complete registrations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      3M
                    </div>
                    <div>
                      <h4 className="font-bold">3 Months Before Deadline</h4>
                      <p className="text-sm text-gray-600">Begin proposal writing, market research, competitive analysis</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      1M
                    </div>
                    <div>
                      <h4 className="font-bold">1 Month Before Deadline</h4>
                      <p className="text-sm text-gray-600">Complete first draft, internal reviews, budget finalization</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-red-50 rounded-lg">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      1W
                    </div>
                    <div>
                      <h4 className="font-bold">1 Week Before Deadline</h4>
                      <p className="text-sm text-gray-600">Final reviews, technical submission tests, early submission</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Winning Tips */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">SBIR Winning Strategies</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-green-200 bg-white">
                    <CardHeader>
                      <CardTitle className="text-green-700 text-lg">Research Excellence</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Address agency priorities</li>
                        <li>• Demonstrate innovation</li>
                        <li>• Show technical feasibility</li>
                        <li>• Include preliminary data</li>
                        <li>• Cite relevant literature</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-white">
                    <CardHeader>
                      <CardTitle className="text-green-700 text-lg">Commercial Viability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Large addressable market</li>
                        <li>• Clear value proposition</li>
                        <li>• Realistic timeline</li>
                        <li>• Customer validation</li>
                        <li>• IP protection strategy</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-white">
                    <CardHeader>
                      <CardTitle className="text-green-700 text-lg">Team Strength</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Qualified PI with domain expertise</li>
                        <li>• Complementary team skills</li>
                        <li>• Industry experience</li>
                        <li>• Advisory board members</li>
                        <li>• Prior commercialization success</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Major SBIR Agencies */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Major SBIR Participating Agencies</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">High-Funding Agencies</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Department of Defense (DoD)</h5>
                          <p className="text-sm text-gray-600">$1.8B annually - Defense technologies</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sbir.gov/node/1088" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">National Institutes of Health (NIH)</h5>
                          <p className="text-sm text-gray-600">$900M annually - Health & life sciences</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://sbir.nih.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Other Major Agencies</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">National Science Foundation (NSF)</h5>
                          <p className="text-sm text-gray-600">$200M annually - Broad technology areas</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://seedfund.nsf.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Department of Energy (DOE)</h5>
                          <p className="text-sm text-gray-600">$150M annually - Energy technologies</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sbir.gov/node/1090" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official SBIR Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">Primary Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBIR.gov</h5>
                          <p className="text-sm text-gray-600">Official SBIR program portal</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sbir.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Grants.gov</h5>
                          <p className="text-sm text-gray-600">Federal grant application system</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.grants.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-700">Supporting Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SAM.gov</h5>
                          <p className="text-sm text-gray-600">Business registration system</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://sam.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBA.gov</h5>
                          <p className="text-sm text-gray-600">Small Business Administration resources</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sba.gov/funding-programs/investment-capital/sbir-sttr-grants" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact CTA - UPDATED TO SINGLE BUTTON */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-700 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-purple-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for SBIR Funding?</h3>
                <p className="text-purple-100 mb-6 text-lg">
                  Need help with your SBIR application? Our experts can guide you through the process, 
                  review your proposal, and help maximize your chances of winning funding.
                </p>
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
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
