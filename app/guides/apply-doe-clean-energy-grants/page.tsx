import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Zap, Leaf, Sun, Wind } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Department of Energy Clean Energy Grants 2025 | DOE Funding Guide",
  description: "Complete guide to DOE clean energy grants. Learn renewable energy funding, energy efficiency programs, and innovative clean tech grant opportunities from Department of Energy.",
  keywords: "DOE clean energy grants, Department of Energy funding, renewable energy grants, energy efficiency funding, clean tech grants",
  openGraph: {
    title: "Department of Energy Clean Energy Grants 2025",
    description: "Complete guide to securing DOE clean energy grants and renewable energy funding.",
    url: "https://fsidigital.ca/guides/apply-doe-clean-energy-grants",
  },
}

export default function DOECleanEnergyGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                ⚡ DOE Clean Energy Grants
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Department of Energy Clean Energy Grants
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Complete guide to securing Department of Energy clean energy grants. Access billions in funding 
                for renewable energy, energy efficiency, and innovative clean technology projects.
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
                  <div className="text-3xl font-bold text-green-600 mb-2">$7.5B</div>
                  <div className="text-gray-600">Annual DOE R&D Budget</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$62B</div>
                  <div className="text-gray-600">Clean Energy Investments</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-gray-600">Clean Energy Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">25%</div>
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
              
              {/* DOE Clean Energy Programs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Major DOE Clean Energy Grant Programs</h2>
                
                <div className="space-y-6">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700 flex items-center">
                        <Sun className="w-5 h-5 mr-2" />
                        Solar Energy Technologies Office (SETO)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Focus:</strong> Solar PV, CSP, Systems</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 1-4 years</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Funding:</strong> $50K - $7M</span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Research Areas:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Advanced photovoltaic technologies</li>
                            <li>• Concentrating solar power</li>
                            <li>• Solar manufacturing R&D</li>
                            <li>• Grid integration & storage</li>
                            <li>• Solar workforce development</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Eligible Applicants:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Universities & research institutions</li>
                            <li>• Private companies & startups</li>
                            <li>• National laboratories</li>
                            <li>• State & local governments</li>
                            <li>• Nonprofit organizations</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700 flex items-center">
                        <Wind className="w-5 h-5 mr-2" />
                        Wind Energy Technologies Office (WETO)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Focus:</strong> Wind power systems</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 2-5 years</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Funding:</strong> $100K - $10M</span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Program Areas:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Offshore wind technologies</li>
                            <li>• Advanced wind turbine designs</li>
                            <li>• Wind plant optimization</li>
                            <li>• Grid integration solutions</li>
                            <li>• Wind resource assessment</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Key Initiatives:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Offshore Wind Research & Development</li>
                            <li>• Wind Energy Manufacturing</li>
                            <li>• Atmosphere to Electrons (A2e)</li>
                            <li>• Small Wind Technology</li>
                            <li>• Wind-Solar Hybrid Systems</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700 flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Advanced Research Projects Agency-Energy (ARPA-E)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Focus:</strong> Transformational R&D</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 1-3 years</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Funding:</strong> $500K - $10M</span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Technology Areas:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Energy storage breakthroughs</li>
                            <li>• Carbon capture & utilization</li>
                            <li>• Advanced materials</li>
                            <li>• Smart grid technologies</li>
                            <li>• Transportation energy</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Program Structure:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• High-risk, high-reward research</li>
                            <li>• Transformational potential required</li>
                            <li>• Focused technical programs</li>
                            <li>• Open solicitations</li>
                            <li>• Fast-track funding decisions</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-700 flex items-center">
                        <Leaf className="w-5 h-5 mr-2" />
                        Building Technologies Office (BTO)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-orange-700">Energy Efficiency Focus:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Building envelope technologies</li>
                            <li>• HVAC system improvements</li>
                            <li>• Smart building systems</li>
                            <li>• Lighting & electrical systems</li>
                            <li>• Building-to-grid integration</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-orange-700">Funding Opportunities:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Small Business Innovation Research</li>
                            <li>• Building America Program</li>
                            <li>• Better Buildings Initiative</li>
                            <li>• Commercial Building Partnerships</li>
                            <li>• Residential Building Integration</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">DOE Grant Application Process</h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Monitor FOAs</h4>
                      <p className="text-sm text-gray-600">
                        Track Funding Opportunity Announcements on EERE Exchange and grants.gov
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Prepare Concept</h4>
                      <p className="text-sm text-gray-600">
                        Develop innovative concept papers and preliminary proposals
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit Full Proposal</h4>
                      <p className="text-sm text-gray-600">
                        Complete detailed technical and business proposals
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Merit Review</h4>
                      <p className="text-sm text-gray-600">
                        Technical and business reviews by expert panels
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">💡 DOE Application Success Tips</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Align with DOE strategic priorities</li>
                        <li>• Demonstrate transformational potential</li>
                        <li>• Show clear commercialization pathway</li>
                        <li>• Include strong technical team</li>
                      </ul>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Provide detailed budget justification</li>
                        <li>• Address market barriers & solutions</li>
                        <li>• Include industry partnerships</li>
                        <li>• Plan for technology transfer</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility & Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Eligibility Requirements</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">✅ Eligible Organizations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Universities:</strong> Public & private higher education institutions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Private Companies:</strong> For-profit businesses of all sizes</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Research Institutes:</strong> Non-profit research organizations</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Government Entities:</strong> State, local, and tribal governments</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Consortiums:</strong> Multi-organizational partnerships</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">📋 Key Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <span><strong>Technical Merit:</strong> Innovative, high-impact research</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <span><strong>Team Qualifications:</strong> Experienced research team</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <span><strong>Cost Share:</strong> May require matching funds</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <span><strong>Milestones:</strong> Clear technical milestones</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <span><strong>Impact:</strong> Energy & economic benefits</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Official DOE Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official DOE Clean Energy Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Primary DOE Portals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">EERE Exchange</h5>
                          <p className="text-sm text-gray-600">Energy Efficiency & Renewable Energy funding</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://eere-exchange.energy.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">ARPA-E FOAs</h5>
                          <p className="text-sm text-gray-600">Advanced research funding opportunities</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://arpa-e.energy.gov/funding-opportunities" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">DOE Office of Science</h5>
                          <p className="text-sm text-gray-600">Basic energy sciences funding</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://science.osti.gov/Funding-Opportunities" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Technology-Specific Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Solar Energy Technologies</h5>
                          <p className="text-sm text-gray-600">SETO funding opportunities</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.energy.gov/eere/solar/solar-energy-technologies-office" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Wind Energy Technologies</h5>
                          <p className="text-sm text-gray-600">WETO research programs</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.energy.gov/eere/wind/wind-energy-technologies-office" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Building Technologies</h5>
                          <p className="text-sm text-gray-600">Energy efficiency programs</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.energy.gov/eere/buildings/building-technologies-office" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-green-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for DOE Clean Energy Grants?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Need expert guidance on DOE clean energy grant applications? Our specialists can help you navigate 
                  the process and develop winning proposals for renewable energy and efficiency projects.
                </p>
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
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
