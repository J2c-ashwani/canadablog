import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Search, Award, TrendingUp, AlertTriangle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for Federal Grants 2025 | Complete Application Guide",
  description: "Step-by-step guide to applying for federal grants. Learn eligibility requirements, application process, winning strategies, and access billions in government funding.",
  keywords: "federal grants application, how to apply federal grants, government grants, grants.gov application, federal funding guide",
  openGraph: {
    title: "How to Apply for Federal Grants 2025",
    description: "Complete guide to applying for federal grants with winning strategies and step-by-step process.",
    url: "https://www.fsidigital.ca/guides/apply-federal-grants",
  },
}

export default function ApplyFederalGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🇺🇸 Federal Grants Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for Federal Grants
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Complete step-by-step guide to applying for federal grants. Learn how to navigate the federal funding landscape
                and secure government grants for your business, nonprofit, or research project.
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">$750B+</div>
                  <div className="text-gray-600">Federal Grants Annually</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">26</div>
                  <div className="text-gray-600">Federal Agencies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">2,000+</div>
                  <div className="text-gray-600">Grant Programs Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">15%</div>
                  <div className="text-gray-600">Average Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* Federal Grant Categories */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Major Federal Grant Categories</h2>

                <div className="space-y-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Business & Economic Development
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Program Types:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• SBIR/STTR Research Grants</li>
                            <li>• SBA Business Development</li>
                            <li>• Community Development Block Grants</li>
                            <li>• Rural Business Development</li>
                            <li>• Export Development Programs</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Typical Funding:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Small Business: $50K - $1.7M</li>
                            <li>• Community Development: $500K - $3M</li>
                            <li>• Economic Development: $1M - $10M</li>
                            <li>• Infrastructure: $5M - $50M</li>
                            <li>• Innovation Hubs: $10M - $100M</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Research & Development
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Major Agencies:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• National Science Foundation (NSF)</li>
                            <li>• National Institutes of Health (NIH)</li>
                            <li>• Department of Defense (DoD)</li>
                            <li>• Department of Energy (DOE)</li>
                            <li>• NASA Research Programs</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Research Areas:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Basic & Applied Sciences</li>
                            <li>• Health & Medical Research</li>
                            <li>• Technology & Innovation</li>
                            <li>• Climate & Environment</li>
                            <li>• Defense & Security</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Social Services & Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Program Areas:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Education & Training</li>
                            <li>• Healthcare Services</li>
                            <li>• Housing & Community Development</li>
                            <li>• Social Services</li>
                            <li>• Arts & Culture Programs</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Key Agencies:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Department of Education</li>
                            <li>• Department of Health & Human Services</li>
                            <li>• Department of Housing & Urban Development</li>
                            <li>• Corporation for National Service</li>
                            <li>• National Endowment for the Arts</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Federal Grant Application Process</h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Research & Prepare</h4>
                      <p className="text-sm text-gray-600">
                        Find relevant opportunities, understand requirements, and prepare your organization.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Register & Setup</h4>
                      <p className="text-sm text-gray-600">
                        Complete SAM.gov registration and set up Grants.gov workspace account.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Write & Submit</h4>
                      <p className="text-sm text-gray-600">
                        Develop your proposal, complete application forms, and submit before deadline.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Review & Award</h4>
                      <p className="text-sm text-gray-600">
                        Track application status, respond to queries, and prepare for potential award.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Success Factors */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Federal Grant Success Factors</h2>

                <div className="space-y-6">
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-700">✅ Winning Application Elements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Project Design:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Clear problem statement</li>
                            <li>• Innovative solution approach</li>
                            <li>• Measurable objectives</li>
                            <li>• Realistic timeline</li>
                            <li>• Strong evaluation plan</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Organizational Strength:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Relevant experience & track record</li>
                            <li>• Qualified project team</li>
                            <li>• Strong partnerships</li>
                            <li>• Adequate resources</li>
                            <li>• Institutional support</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-red-700">❌ Common Failure Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Application Issues:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Missing eligibility requirements</li>
                            <li>• Incomplete applications</li>
                            <li>• Late submissions</li>
                            <li>• Budget errors</li>
                            <li>• Poor proposal writing</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Strategic Mistakes:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Not aligning with agency priorities</li>
                            <li>• Weak evaluation methodology</li>
                            <li>• Unrealistic budgets</li>
                            <li>• Limited sustainability plan</li>
                            <li>• Insufficient community support</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Timeline Planning */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Federal Grant Application Timeline</h2>

                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-16 h-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold mr-4">
                      6-12M
                    </div>
                    <div>
                      <h4 className="font-bold">Strategic Planning Phase</h4>
                      <p className="text-sm text-gray-600">Research funding opportunities, build partnerships, develop project concepts</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <div className="w-16 h-12 bg-green-600 rounded flex items-center justify-center text-white font-bold mr-4">
                      3-6M
                    </div>
                    <div>
                      <h4 className="font-bold">Pre-Application Phase</h4>
                      <p className="text-sm text-gray-600">Contact program officers, attend webinars, complete registrations</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                    <div className="w-16 h-12 bg-yellow-600 rounded flex items-center justify-center text-white font-bold mr-4">
                      1-3M
                    </div>
                    <div>
                      <h4 className="font-bold">Application Development</h4>
                      <p className="text-sm text-gray-600">Write proposal, develop budgets, gather required documents</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                    <div className="w-16 h-12 bg-orange-600 rounded flex items-center justify-center text-white font-bold mr-4">
                      2-4W
                    </div>
                    <div>
                      <h4 className="font-bold">Final Review & Submission</h4>
                      <p className="text-sm text-gray-600">Internal reviews, final edits, submission preparation and testing</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-yellow-800">💡 Pro Tip: Start Early</h4>
                        <p className="text-yellow-700">
                          Federal grants are highly competitive. Starting 6-12 months before the deadline gives you time to develop strong partnerships,
                          gather preliminary data, and craft a compelling proposal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Registrations & Systems</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">🔐 Essential Registrations</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-blue-200 rounded-lg">
                        <h5 className="font-semibold mb-2">SAM.gov Registration</h5>
                        <p className="text-sm text-gray-600 mb-2">System for Award Management - Required for all federal awards</p>
                        <ul className="text-xs text-gray-500">
                          <li>• Processing time: 7-10 business days</li>
                          <li>• Annual renewal required</li>
                          <li>• No cost to register</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-green-200 rounded-lg">
                        <h5 className="font-semibold mb-2">Grants.gov Registration</h5>
                        <p className="text-sm text-gray-600 mb-2">Federal grant application portal</p>
                        <ul className="text-xs text-gray-500">
                          <li>• Requires active SAM registration</li>
                          <li>• Organization workspace setup</li>
                          <li>• Authorized representative designation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">📋 Additional Requirements</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-purple-200 rounded-lg">
                        <h5 className="font-semibold mb-2">UEI Number</h5>
                        <p className="text-sm text-gray-600 mb-2">Unique Entity Identifier (replaces DUNS)</p>
                        <ul className="text-xs text-gray-500">
                          <li>• Generated automatically in SAM.gov</li>
                          <li>• Required for all applications</li>
                          <li>• Used for tracking and reporting</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-orange-200 rounded-lg">
                        <h5 className="font-semibold mb-2">Federal Award Identification</h5>
                        <p className="text-sm text-gray-600 mb-2">CFDA numbers and program classifications</p>
                        <ul className="text-xs text-gray-500">
                          <li>• Assistance Listing numbers</li>
                          <li>• Program-specific requirements</li>
                          <li>• Compliance certifications</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official Federal Grant Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Primary Portals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Grants.gov</h5>
                          <p className="text-sm text-gray-600">Find and apply for federal grants</p>
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
                          <p className="text-sm text-gray-600">Entity registration and validation</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://sam.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Assistance Listings</h5>
                          <p className="text-sm text-gray-600">Formerly CFDA - Federal Assistance Listings</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://sam.gov/content/assistance-listings" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Support Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Federal Register</h5>
                          <p className="text-sm text-gray-600">Official government publications</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.federalregister.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Grants Learning Center</h5>
                          <p className="text-sm text-gray-600">Training and resources for applicants</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.grants.gov/learn-grants" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">USA.gov Grants</h5>
                          <p className="text-sm text-gray-600">Government grants information hub</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.usa.gov/grants" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for Federal Grants?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Need expert guidance navigating the federal grant application process? Our team can help you identify
                  opportunities, develop winning strategies, and maximize your chances of success.
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
