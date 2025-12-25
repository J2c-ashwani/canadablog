import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Award, Shield, Heart, Target, AlertTriangle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for Minority & Women Business Grants 2025 | Certification Guide",
  description: "Complete guide to applying for minority and women business grants. Learn 8(a), WOSB, VOSB certification process, eligibility requirements, and application strategies.",
  keywords: "minority business grants, women business grants, 8a certification, WOSB certification, VOSB grants, disadvantaged business enterprise",
  openGraph: {
    title: "How to Apply for Minority & Women Business Grants 2025",
    description: "Step-by-step guide to minority and women business grant applications and certifications.",
    url: "https://www.fsidigital.ca/guides/apply-minority-grants",
  },
}

export default function ApplyMinorityGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌟 Minority & Women Business Grants
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for Minority & Women Business Grants
              </h1>
              <p className="text-xl text-pink-100 mb-8">
                Complete step-by-step guide to applying for minority, women, and veteran business grants.
                Learn certification requirements, application strategies, and access targeted funding opportunities.
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
                  <div className="text-3xl font-bold text-pink-600 mb-2">23%</div>
                  <div className="text-gray-600">Federal Contract Goal</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$133B</div>
                  <div className="text-gray-600">Annual Contract Value</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">42%</div>
                  <div className="text-gray-600">Women-Owned Businesses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">2.5M</div>
                  <div className="text-gray-600">Veteran-Owned Businesses</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* Certification Programs Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Federal Certification Programs</h2>

                <div className="space-y-6">
                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700 flex items-center">
                        <Heart className="w-5 h-5 mr-2" />
                        Women-Owned Small Business (WOSB)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Goal:</strong> 5% of contracts</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Value:</strong> $25B+ annually</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Process:</strong> Self or 3rd party</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-pink-700">Basic Requirements:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 51% owned by women</li>
                            <li>• Women control operations</li>
                            <li>• Women make strategic decisions</li>
                            <li>• Meet small business size standards</li>
                            <li>• US citizens or legal residents</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-pink-700">EDWOSB Additional:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Personal net worth &lt; $750K</li>
                            <li>• Adjusted gross income &lt; $350K</li>
                            <li>• Assets &lt; $6M</li>
                            <li>• Economic disadvantage status</li>
                            <li>• Enhanced contracting opportunities</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        8(a) Business Development Program
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 9-year program</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Sole Source:</strong> Up to $4M/$7M</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Goal:</strong> 5% of contracts</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Social Disadvantage:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Black Americans</li>
                            <li>• Hispanic Americans</li>
                            <li>• Native Americans</li>
                            <li>• Asian Pacific Americans</li>
                            <li>• Subcontinent Asian Americans</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Program Benefits:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Set-aside contracting opportunities</li>
                            <li>• Business development assistance</li>
                            <li>• Mentor-protégé relationships</li>
                            <li>• Access to SBA loans</li>
                            <li>• Management and technical assistance</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Veteran-Owned Small Business Programs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">VOSB (Veteran-Owned):</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 51% owned by veterans</li>
                            <li>• Veterans control management</li>
                            <li>• Veterans control daily operations</li>
                            <li>• Access to set-aside contracts</li>
                            <li>• VA contracting preferences</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">SDVOSB (Service-Disabled):</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Service-connected disability rating</li>
                            <li>• VA verification required</li>
                            <li>• 3% federal contracting goal</li>
                            <li>• Sole source up to $4M/$7M</li>
                            <li>• Enhanced contracting opportunities</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Certification Application Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Certification Application Process</h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Determine Eligibility</h4>
                      <p className="text-sm text-gray-600">
                        Review requirements for each certification program and assess your qualifications.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Gather Documentation</h4>
                      <p className="text-sm text-gray-600">
                        Collect required financial records, ownership documents, and personal information.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit Applications</h4>
                      <p className="text-sm text-gray-600">
                        Complete online applications through appropriate certification portals.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Maintain Status</h4>
                      <p className="text-sm text-gray-600">
                        Complete annual updates and maintain compliance with program requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Required Documentation */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documentation Checklist</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">📊 Business Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Corporate Structure</strong>
                            <p className="text-sm text-gray-600">Articles of incorporation, operating agreements, bylaws</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Ownership Documentation</strong>
                            <p className="text-sm text-gray-600">Stock certificates, ownership percentages, voting agreements</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Financial Records</strong>
                            <p className="text-sm text-gray-600">Tax returns, financial statements, bank statements</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Business Operations</strong>
                            <p className="text-sm text-gray-600">Organizational chart, contracts, business plan</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">👤 Personal Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Identity Verification</strong>
                            <p className="text-sm text-gray-600">Birth certificate, passport, citizenship documents</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Personal Financial</strong>
                            <p className="text-sm text-gray-600">Personal tax returns, financial statements, net worth</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Military Records (Veterans)</strong>
                            <p className="text-sm text-gray-600">DD-214, VA disability rating, service records</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Social Disadvantage (8a)</strong>
                            <p className="text-sm text-gray-600">Evidence of disadvantage, personal history narrative</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Tips */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Certification Success Strategies</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Ensure clear documentation of ownership and control</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Maintain detailed financial records</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Work with experienced consultants</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Prepare comprehensive personal narratives</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Set up proper corporate governance</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Pitfalls</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Incomplete ownership documentation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Failure to demonstrate operational control</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Missing annual recertification deadlines</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Inadequate personal history narratives</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Not meeting economic disadvantage thresholds</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Grant Opportunities */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Grant Opportunities for Certified Businesses</h2>

                <div className="space-y-6">
                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700">Federal Contracting Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Set-Aside Contracts:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• WOSB set-asides in underrepresented industries</li>
                            <li>• 8(a) sole source and competitive awards</li>
                            <li>• SDVOSB priority contracting</li>
                            <li>• HUBZone competitive preferences</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Subcontracting Goals:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Large prime contractor requirements</li>
                            <li>• Mentor-protégé joint ventures</li>
                            <li>• Teaming agreements</li>
                            <li>• Supply chain opportunities</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">Grant Programs for Certified Businesses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Business Development:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• MBDA Business Centers funding</li>
                            <li>• SBA Growth Accelerator grants</li>
                            <li>• SCORE mentorship programs</li>
                            <li>• Women's Business Centers</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Industry-Specific:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• STEM education and research</li>
                            <li>• Healthcare innovation grants</li>
                            <li>• Clean energy development</li>
                            <li>• Technology commercialization</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Official Certification Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official Certification Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700">Primary Certification Portals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Certify.SBA.gov</h5>
                          <p className="text-sm text-gray-600">WOSB, EDWOSB, and 8(a) certifications</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://certify.sba.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">VetBiz.va.gov</h5>
                          <p className="text-sm text-gray-600">VOSB and SDVOSB verification</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.va.gov/osdbu/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SAM.gov</h5>
                          <p className="text-sm text-gray-600">Entity registration and representations</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://sam.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">Support & Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBA District Offices</h5>
                          <p className="text-sm text-gray-600">Local SBA assistance and guidance</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sba.gov/local-assistance" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">MBDA Business Centers</h5>
                          <p className="text-sm text-gray-600">Minority business development assistance</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.mbda.gov/business-centers" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Women's Business Centers</h5>
                          <p className="text-sm text-gray-600">Training and counseling for women entrepreneurs</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sba.gov/local-assistance/resource-partners/womens-business-centers" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-pink-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Get Certified?</h3>
                <p className="text-pink-100 mb-6 text-lg">
                  Need help with your minority, women, or veteran business certification? Our experts can guide you through
                  the entire process and help you access targeted funding opportunities.
                </p>
                <Button size="lg" className="bg-white text-pink-700 hover:bg-gray-100" asChild>
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
