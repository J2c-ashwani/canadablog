import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket, Calendar } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "WBDC Equity Match Grant 2027 | $2,500-$10,000 for Women Business Growth Projects",
  description: "Complete guide to WBDC Equity Match Grant with quarterly deadlines, $2,500-$10,000 funding for Connecticut women-owned businesses with matching investment requirement.",
  keywords: "WBDC Equity Match Grant, Connecticut women business grants, equity match funding, women business growth",
  openGraph: {
    title: "WBDC Equity Match Grant 2027 | Quarterly $2.5K-$10K Awards",
    description: "Quarterly grant program requiring 1:1 match for Connecticut women-owned business growth projects.",
    url: "https://www.fsidigital.ca/blog/wbdc-equity-match-grant-women",
    images: ["/og-image.png"],
  },
}

export default function WBDCEquityMatchGrantGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-700 to-indigo-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💰 Quarterly Grant Program 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                WBDC Equity Match Grant for Women
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Quarterly grant program from Women's Business Development Council (WBDC) providing $2,500 to
                $10,000 in matching grants for Connecticut women-owned businesses investing in growth projects.
                Requires 1:1 equity match - business must invest equal or greater amount. Four funding rounds
                annually with rolling quarterly deadlines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="#grant-details">
                    View Grant Details
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/wbdc-equity-match-grant-guide">
                    Get Application Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Program Updates */}
        <section className="py-8 bg-green-50 border-b-2 border-green-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-green-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 WBDC Equity Match Grant 2027 Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>Quarterly Deadlines:</strong> Four funding rounds annually throughout the year
                        </div>
                        <div>
                          <strong>Grant Range:</strong> $2,500 to $10,000 per approved project
                        </div>
                        <div>
                          <strong>Match Requirement:</strong> 1:1 equity match from business (equal or greater investment)
                        </div>
                        <div>
                          <strong>Connecticut Only:</strong> Must be Connecticut-based women-owned business
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Connecticut's Premier Women Business Growth Grant</h2>
                <p className="text-lg text-gray-600">
                  The WBDC Equity Match Grant Program recognizes that when women entrepreneurs invest their own
                  capital in growth projects, strategic matching funds can accelerate success. By requiring businesses
                  to match grant funding dollar-for-dollar, WBDC ensures commitment while providing crucial financial
                  boost for expansion, equipment, marketing, and other growth initiatives.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$10K</div>
                  <div className="text-gray-600">Maximum Grant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">1:1</div>
                  <div className="text-gray-600">Match Required</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">Quarterly</div>
                  <div className="text-gray-600">Four Rounds</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">CT</div>
                  <div className="text-gray-600">Connecticut</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grant Details */}
        <section id="grant-details" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">WBDC Equity Match Grant Program Details</h2>

              <div className="space-y-8">
                {/* Grant Structure */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Grant Structure & Match Requirement</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">Funding Details</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Grant Amount:</span>
                            <span className="text-purple-700 font-bold">$2,500 - $10,000</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Matching grant requiring 1:1 equity investment</p>
                            <p>• Business must contribute equal or greater amount</p>
                            <p>• Total project funding: $5,000 - $20,000+</p>
                            <p>• Non-repayable grant funds (not a loan)</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Match Calculation Example</h4>
                        <div className="text-sm text-gray-700 space-y-2 bg-purple-50 p-4 rounded-lg">
                          <p><strong>Scenario:</strong> $10,000 equipment purchase project</p>
                          <p><strong>Business Investment:</strong> $5,000 (your equity)</p>
                          <p><strong>WBDC Grant Match:</strong> $5,000 (matched funding)</p>
                          <p><strong>Total Project Cost:</strong> $10,000 achieved</p>
                          <p className="text-purple-700 font-semibold pt-2">Your $5K becomes $10K purchasing power!</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 Eligible Grant Uses:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Equipment:</strong> Machinery, technology, tools</li>
                            <li>• <strong>Marketing:</strong> Advertising campaigns and materials</li>
                            <li>• <strong>Technology:</strong> Software, systems, digital tools</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Inventory:</strong> Product stock for growth</li>
                            <li>• <strong>Facilities:</strong> Leasehold improvements</li>
                            <li>• <strong>Expansion:</strong> Business growth projects</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Eligibility Requirements */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Eligibility Requirements</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Business Requirements</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div className="text-sm">
                              <strong>Women-Owned:</strong> 51%+ owned and controlled by women
                            </div>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div className="text-sm">
                              <strong>Connecticut Location:</strong> Based and operating in Connecticut
                            </div>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div className="text-sm">
                              <strong>For-Profit:</strong> Registered for-profit business entity
                            </div>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div className="text-sm">
                              <strong>Operating History:</strong> Established business with track record
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Match Requirements</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <DollarSign className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div className="text-sm">
                              <strong>1:1 Match:</strong> Business must invest equal or greater amount
                            </div>
                          </div>
                          <div className="flex items-start">
                            <DollarSign className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div className="text-sm">
                              <strong>Documented Investment:</strong> Proof of business contribution required
                            </div>
                          </div>
                          <div className="flex items-start">
                            <DollarSign className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div className="text-sm">
                              <strong>Growth Project:</strong> Funds must support business expansion/improvement
                            </div>
                          </div>
                          <div className="flex items-start">
                            <DollarSign className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div className="text-sm">
                              <strong>Financial Capacity:</strong> Ability to provide matching investment
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Application Timeline */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Quarterly Application Timeline</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Four Annual Funding Rounds</h4>
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <strong className="text-blue-700">Q1 Round:</strong> January - March deadline
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <strong className="text-blue-700">Q2 Round:</strong> April - June deadline
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <strong className="text-blue-700">Q3 Round:</strong> July - September deadline
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <strong className="text-blue-700">Q4 Round:</strong> October - December deadline
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Application Process</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Step 1:</strong> Submit application with growth project proposal</p>
                          <p><strong>Step 2:</strong> Demonstrate 1:1 match capability and business readiness</p>
                          <p><strong>Step 3:</strong> WBDC review and evaluation (2-4 weeks)</p>
                          <p><strong>Step 4:</strong> Award notification and grant disbursement</p>
                          <p className="pt-2 text-blue-700"><strong>Tip:</strong> Apply in quarter when you're ready to execute project</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Application Success Strategies</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Winning Application Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Clear ROI Demonstration:</strong> Show how project investment generates business growth
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Match Readiness:</strong> Document ability to provide 1:1 matching investment
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Specific Project Plan:</strong> Detailed timeline and budget breakdown
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Growth Metrics:</strong> Quantifiable goals for revenue, jobs, market expansion
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common Application Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Insufficient Match:</strong> Cannot demonstrate financial capacity for 1:1 investment
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Vague Project:</strong> Unclear growth plans without specific deliverables
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Wrong Timing:</strong> Applying before ready to execute project immediately
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Non-Growth Use:</strong> Requesting funds for operational expenses vs. expansion
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Apply for WBDC Equity Match Grant?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Get our complete application guide with match requirement calculator and project planning templates,
                or work with our Connecticut grant specialists for expert application support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free Application Guide</h4>
                  <p className="text-purple-100 text-sm mb-4">
                    Get our comprehensive WBDC Equity Match Grant guide with 1:1 match calculator,
                    quarterly deadline tracker, and growth project planning templates.
                  </p>
                  <Button size="lg" className="w-full bg-white text-purple-700 hover:bg-gray-100" asChild>
                    <Link href="/download/wbdc-equity-match-grant-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Application Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with Connecticut grant specialists who understand WBDC requirements and can help
                    optimize your match strategy and growth project proposal.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=wbdc-equity-match-grant-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-purple-200 text-sm mt-6">
                Expert guidance • Match strategy • Quarterly deadlines • Connecticut women business growth success
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
