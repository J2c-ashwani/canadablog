import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Users, Heart, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Federal Grants for Women, Minorities & Veterans 2026 | Specialized Business Funding",
  description: "Complete guide to federal grants for women-owned, minority-owned, and veteran-owned businesses. Find WOSB, 8(a), HUBZone, VOSB, and specialized funding programs.",
  keywords: "women business grants, minority business grants, veteran business grants, WOSB, 8a program, HUBZone, VOSB, disadvantaged business",
  openGraph: {
    title: "Federal Grants for Women, Minorities & Veterans 2026",
    description: "Complete guide to specialized federal grants for women, minority, and veteran entrepreneurs.",
    url: "https://fsidigital.ca/blog/federal-grants-women-minorities",
  },
}

export default function FederalGrantsWomenMinorities() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-pink-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🎯 Specialized Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Federal Grants for Women, Minorities & Veterans
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Discover specialized federal funding programs designed to support women-owned, minority-owned, and veteran-owned businesses. Access targeted grants and contracting opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                  Explore Programs Below
                </Button>
                {/* FIXED: Added proper background styling for visibility */}
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/guides/apply-minority-grants">
                    Get Certification Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-pink-600 mb-2">42%</div>
                <div className="text-gray-600">Women-Owned Businesses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">$133B</div>
                <div className="text-gray-600">Federal Contracting Goal</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">2.5M</div>
                <div className="text-gray-600">Veteran-Owned Businesses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">5%</div>
                <div className="text-gray-600">Federal Contracts Goal for WOSBs</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Specialized Federal Programs Exist</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The federal government has established specific programs to promote diversity and inclusion in business ownership 
                  and federal contracting. These programs help level the playing field for historically underrepresented groups.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-pink-50 p-6 rounded-lg text-center">
                    <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-3 text-pink-800">Women-Owned Businesses</h4>
                    <p className="text-gray-700 text-sm">Special programs and contracting set-asides for women entrepreneurs</p>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg text-center">
                    <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-3 text-purple-800">Minority-Owned Businesses</h4>
                    <p className="text-gray-700 text-sm">8(a) program and minority business development initiatives</p>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Veteran-Owned Businesses</h4>
                    <p className="text-gray-700 text-sm">VOSB and SDVOSB programs for military veterans</p>
                  </div>
                </div>
              </div>

              {/* Women-Owned Small Business Programs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Women-Owned Small Business (WOSB) Programs</h2>
                
                <div className="space-y-6">
                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700">Women-Owned Small Business (WOSB) Certification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Goal:</strong> 5% of federal contracts</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Value:</strong> $25B+ annually</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Certification:</strong> Self-certification or 3rd party</span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Requirements:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 51% owned by women</li>
                            <li>• Women control day-to-day operations</li>
                            <li>• Women make long-term decisions</li>
                            <li>• Meet small business size standards</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Benefits:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Access to set-aside contracts</li>
                            <li>• Sole source awards up to $4M</li>
                            <li>• Priority in certain industries</li>
                            <li>• Business development support</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-700">Economically Disadvantaged WOSB (EDWOSB)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        Enhanced program for women-owned businesses that meet economic disadvantage criteria.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Additional Requirements:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {/* FIXED: Escaped the < characters */}
                            <li>• Personal net worth &lt; $750K</li>
                            <li>• Adjusted gross income &lt; $350K (avg 3 years)</li>
                            <li>• Assets &lt; $6M</li>
                            <li>• Meet social disadvantage criteria</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Enhanced Benefits:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Additional contract set-asides</li>
                            <li>• Higher sole source thresholds</li>
                            <li>• Price evaluation preferences</li>
                            <li>• Mentorship opportunities</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Minority Business Programs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Minority Business Development Programs</h2>
                
                <div className="space-y-6">
                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">8(a) Business Development Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 9-year program</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Sole Source:</strong> Up to $4M/$7M</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Goal:</strong> 5% of federal contracts</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        Premier program for socially and economically disadvantaged small businesses, providing business 
                        development assistance and access to federal contracting opportunities.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Eligibility:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 51% owned by disadvantaged individuals</li>
                            <li>• Social disadvantage (minority groups)</li>
                            <li>• Economic disadvantage criteria</li>
                            <li>• Good character and potential for success</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Program Benefits:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Set-aside and sole-source contracts</li>
                            <li>• Business development assistance</li>
                            <li>• Mentor-protégé relationships</li>
                            <li>• SBA loan programs access</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">HUBZone Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        Historically Underutilized Business Zone program helps businesses in distressed communities 
                        access federal contracting opportunities.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Requirements:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Located in qualified HUBZone area</li>
                            <li>• 35% of employees live in HUBZone</li>
                            <li>• Principal office in HUBZone</li>
                            <li>• 51% owned by US citizens</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Benefits:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 3% federal contracting goal</li>
                            <li>• Competitive and sole-source awards</li>
                            <li>• Price evaluation preference (10%)</li>
                            <li>• Subcontracting opportunities</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Veteran-Owned Business Programs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Veteran-Owned Small Business Programs</h2>
                
                <div className="space-y-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Veteran-Owned Small Business (VOSB)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Requirements:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 51% owned by veterans</li>
                            <li>• Veterans control management</li>
                            <li>• Veterans control daily operations</li>
                            <li>• Meet small business size standards</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Benefits:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Access to set-aside contracts</li>
                            <li>• VA contracting opportunities</li>
                            <li>• Subcontracting preferences</li>
                            <li>• Business development resources</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-200">
                    <CardHeader>
                      <CardTitle className="text-indigo-700">Service-Disabled Veteran-Owned Small Business (SDVOSB)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Goal:</strong> 3% of federal contracts</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Sole Source:</strong> Up to $4M/$7M</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Certification:</strong> VA verification required</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        Enhanced program for businesses owned by veterans with service-connected disabilities.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Additional Requirements:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Service-connected disability rating</li>
                            <li>• VA verification required</li>
                            <li>• Veteran must have day-to-day control</li>
                            <li>• Economic interest aligned with control</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Enhanced Benefits:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Priority in federal contracting</li>
                            <li>• Higher sole-source thresholds</li>
                            <li>• VA vendor preference</li>
                            <li>• Mentor-protégé opportunities</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Certification Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Certification Process Overview</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Determine Eligibility</h3>
                    <p className="text-gray-600">
                      Review program requirements and determine which certifications your business qualifies for.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Gather Documents</h3>
                    <p className="text-gray-600">Collect required documentation including financial records, ownership proof, and personal information.</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Submit Application</h3>
                    <p className="text-gray-600">Complete online applications through appropriate portals (SAM.gov, certify.sba.gov, etc.)</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Maintain Certification</h3>
                    <p className="text-gray-600">
                      Keep certifications current through annual updates and compliance with program requirements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-yellow-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Certification Mistakes to Avoid</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Avoid These Mistakes:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Incomplete or inaccurate documentation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Not meeting ownership control requirements</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Failing to maintain certification status</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Missing annual recertification deadlines</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Success Tips:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Work with experienced consultants</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Maintain detailed financial records</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Document all operational control</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Set calendar reminders for renewals</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FIXED: Single CTA Button - Removed external link */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Certified?</h3>
                <p className="text-purple-100 mb-6 text-lg">
                  Get our comprehensive certification guide with step-by-step instructions, required documents checklist, 
                  and application strategies for each program.
                </p>
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="/guides/apply-minority-grants">
                    Get Certification Guide
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
