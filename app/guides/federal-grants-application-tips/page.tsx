import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Federal Grants Application Tips & Guide 2025 | Step-by-Step Process",
  description: "Complete guide to applying for federal grants. Learn application process, required documents, common mistakes, and winning strategies for government funding.",
  keywords: "federal grants application, grants.gov application, federal funding guide, grant application tips, government grants process",
  openGraph: {
    title: "Federal Grants Application Tips & Guide 2025",
    description: "Step-by-step guide to applying for federal grants with tips and strategies.",
    url: "https://www.fsidigital.ca/guides/federal-grants-application-tips",
  },
}

export default function FederalGrantsApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                📋 Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Federal Grants Application Guide
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Step-by-step guide to successfully applying for federal grants. Learn the complete process, avoid common mistakes, and maximize your chances of winning government funding.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Pre-Application Preparation */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Pre-Application Preparation</h2>
                
                <div className="space-y-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">1. Business Registration Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold mb-2">Required Registrations:</h5>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                              <span><strong>DUNS Number:</strong> Unique 9-digit identifier (now UEI - Unique Entity Identifier)</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                              <span><strong>SAM.gov Registration:</strong> System for Award Management (required for all federal contracts)</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                              <span><strong>Grants.gov Username:</strong> Required for submitting applications</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                              <span><strong>EIN (Employer ID Number):</strong> From the IRS for tax purposes</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Important:</strong> SAM.gov registration can take 7-10 business days. Start this process early!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">2. Essential Documents Checklist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Financial Documents:</h5>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Audited financial statements (last 3 years)</li>
                            <li>• Tax returns (business and personal)</li>
                            <li>• Bank statements</li>
                            <li>• Profit & loss statements</li>
                            <li>• Balance sheets</li>
                            <li>• Cash flow projections</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Legal Documents:</h5>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Articles of incorporation</li>
                            <li>• Operating agreements</li>
                            <li>• Business licenses</li>
                            <li>• Insurance certificates</li>
                            <li>• Organizational chart</li>
                            <li>• Board resolutions</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Process Steps */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Federal Grant Application Process</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Find Opportunities</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Search grants.gov</li>
                      <li>• Agency websites</li>
                      <li>• Federal Register</li>
                      <li>• Industry publications</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Review Requirements</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Eligibility criteria</li>
                      <li>• Funding amounts</li>
                      <li>• Deadlines</li>
                      <li>• Matching funds</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Prepare Application</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Write proposals</li>
                      <li>• Create budgets</li>
                      <li>• Gather documents</li>
                      <li>• Internal review</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Submit & Track</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Submit via grants.gov</li>
                      <li>• Confirm receipt</li>
                      <li>• Track status</li>
                      <li>• Respond to queries</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Application Components */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Application Components</h2>
                
                <div className="space-y-6">
                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Project Narrative
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Essential Elements:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Clear problem statement</li>
                            <li>• Specific objectives</li>
                            <li>• Detailed methodology</li>
                            <li>• Timeline with milestones</li>
                            <li>• Expected outcomes</li>
                            <li>• Evaluation plan</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Writing Tips:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Use active voice</li>
                            <li>• Be specific and quantifiable</li>
                            <li>• Follow page/word limits</li>
                            <li>• Include compelling data</li>
                            <li>• Address evaluation criteria</li>
                            <li>• Proofread thoroughly</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700 flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Budget & Financial Planning
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Budget Categories:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Personnel (salaries, benefits)</li>
                            <li>• Equipment and supplies</li>
                            <li>• Travel expenses</li>
                            <li>• Contractual services</li>
                            <li>• Indirect costs</li>
                            <li>• Cost sharing (if required)</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Budget Best Practices:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Align with project activities</li>
                            <li>• Be realistic and detailed</li>
                            <li>• Include budget narrative</li>
                            <li>• Follow agency guidelines</li>
                            <li>• Plan for inflation</li>
                            <li>• Account for contingencies</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-red-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Application Mistakes to Avoid</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Fatal Mistakes:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Missing application deadlines</li>
                      <li>• Not meeting eligibility requirements</li>
                      <li>• Incomplete applications</li>
                      <li>• Exceeding page/word limits</li>
                      <li>• Math errors in budgets</li>
                      <li>• Missing required forms</li>
                      <li>• Inadequate cost sharing documentation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Quality Issues:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Vague or unclear objectives</li>
                      <li>• Unrealistic timelines</li>
                      <li>• Weak evaluation plans</li>
                      <li>• Poor writing quality</li>
                      <li>• Inconsistent information</li>
                      <li>• Lack of supporting data</li>
                      <li>• Inadequate team qualifications</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Success Tips */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Winning Application Strategies</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-green-200 bg-white">
                    <CardHeader>
                      <CardTitle className="text-green-700 text-lg">Before Writing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Contact program officers</li>
                        <li>• Attend webinars</li>
                        <li>• Review funded projects</li>
                        <li>• Build partnerships</li>
                        <li>• Gather preliminary data</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-white">
                    <CardHeader>
                      <CardTitle className="text-green-700 text-lg">During Writing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Address all evaluation criteria</li>
                        <li>• Use clear, compelling language</li>
                        <li>• Include strong supporting data</li>
                        <li>• Demonstrate innovation</li>
                        <li>• Show measurable outcomes</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-white">
                    <CardHeader>
                      <CardTitle className="text-green-700 text-lg">Before Submission</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Multiple internal reviews</li>
                        <li>• External expert review</li>
                        <li>• Check all requirements</li>
                        <li>• Test technical submission</li>
                        <li>• Submit early</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Timeline Planning */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Application Timeline Planning</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      90
                    </div>
                    <div>
                      <h4 className="font-bold">90 Days Before Deadline</h4>
                      <p className="text-sm text-gray-600">Begin research, team building, and initial planning</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      60
                    </div>
                    <div>
                      <h4 className="font-bold">60 Days Before Deadline</h4>
                      <p className="text-sm text-gray-600">Start writing, gather documents, develop partnerships</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      30
                    </div>
                    <div>
                      <h4 className="font-bold">30 Days Before Deadline</h4>
                      <p className="text-sm text-gray-600">Complete first draft, begin internal reviews</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-red-50 rounded-lg">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      7
                    </div>
                    <div>
                      <h4 className="font-bold">7 Days Before Deadline</h4>
                      <p className="text-sm text-gray-600">Final reviews, technical checks, early submission</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Government Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official Government Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Primary Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Grants.gov</h5>
                          <p className="text-sm text-gray-600">Main portal for federal grant opportunities</p>
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
                          <p className="text-sm text-gray-600">System for Award Management registration</p>
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
                      <CardTitle className="text-green-700">Additional Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Federal Register</h5>
                          <p className="text-sm text-gray-600">Official journal of federal government</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.federalregister.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">CFDA.gov</h5>
                          <p className="text-sm text-gray-600">Catalog of Federal Domestic Assistance</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.cfda.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-100" />
                <h3 className="text-2xl font-bold mb-4">Need Personalized Help?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Still have questions about federal grant applications? Our experts are here to help guide you through 
                  the process and maximize your chances of success.
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
