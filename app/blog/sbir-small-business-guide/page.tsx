import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Zap, Lightbulb, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBIR Small Business Innovation Research 2025 | Federal R&D Grant Guide",
  description: "Complete guide to SBIR grants for small businesses. Learn Phase I & II funding, eligibility requirements, and how to win up to $1.7M in federal R&D grants.",
  keywords: "SBIR grants, small business innovation research, federal R&D grants, SBIR Phase I Phase II, innovation funding",
  openGraph: {
    title: "SBIR Small Business Innovation Research 2025",
    description: "Complete guide to SBIR grants with Phase I & II funding for innovative small businesses.",
    url: "https://grantfinder.pro/blog/sbir-small-business-guide",
  },
}

export default function SBIRSmallBusinessGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                ⚡ SBIR Innovation Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SBIR Small Business Innovation Research
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Complete guide to SBIR grants for innovative small businesses. Learn how to secure federal 
                R&D funding up to $1.7M with no repayment required for breakthrough technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                  Start Reading Guide
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/guides/apply-sbir-grants">
                    Get SBIR Application Guide
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
                <div className="text-3xl font-bold text-blue-600 mb-2">$4.1B+</div>
                <div className="text-gray-600">Annual SBIR Awards</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">$1.7M</div>
                <div className="text-gray-600">Maximum Phase II Award</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">11</div>
                <div className="text-gray-600">Federal Agencies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">23%</div>
                <div className="text-gray-600">Average Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* What is SBIR for Small Business */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is SBIR for Small Businesses?</h2>
                
                <p className="text-lg text-gray-700 mb-6">
                  The Small Business Innovation Research (SBIR) program is the largest source of early-stage technology 
                  funding in the United States. It provides non-dilutive grants (no repayment required) to small businesses 
                  engaged in research and development with high commercialization potential.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">SBIR Advantages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• No repayment required (grants, not loans)</li>
                        <li>• Non-dilutive funding (keep 100% ownership)</li>
                        <li>• Federal validation of your technology</li>
                        <li>• Access to government markets</li>
                        <li>• Networking with federal agencies</li>
                        <li>• Competitive advantage in fundraising</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">Small Business Focus</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Must have &lt; 500 employees</li>
                        <li>• 51%+ owned by US citizens</li>
                        <li>• Principal investigator primarily employed</li>
                        <li>• For-profit business entity</li>
                        <li>• Focus on R&D commercialization</li>
                        <li>• Technology innovation emphasis</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* SBIR Phase Structure */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBIR Three-Phase Program Structure</h2>
                
                <div className="space-y-8">
                  {/* Phase I */}
                  <Card className="border-green-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Lightbulb className="w-6 h-6 text-green-600 mr-3" />
                        <CardTitle className="text-green-700">Phase I: Proof of Concept</CardTitle>
                      </div>
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
                          <span><strong>Focus:</strong> Technical Feasibility</span>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold mb-2 text-green-800">Phase I Objectives:</h4>
                        <p className="text-sm text-green-700 mb-3">
                          Establish technical merit, feasibility, and commercial potential of your innovation.
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Typical Activities:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Technology feasibility studies</li>
                            <li>• Prototype development</li>
                            <li>• Market research</li>
                            <li>• Competitive analysis</li>
                            <li>• Intellectual property strategy</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Success Metrics:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Technical milestones achieved</li>
                            <li>• Market validation completed</li>
                            <li>• Commercial potential demonstrated</li>
                            <li>• Phase II proposal submitted</li>
                            <li>• Partnership opportunities identified</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phase II */}
                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Zap className="w-6 h-6 text-blue-600 mr-3" />
                        <CardTitle className="text-blue-700">Phase II: Development & Prototype</CardTitle>
                      </div>
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
                          <span><strong>Focus:</strong> Product Development</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold mb-2 text-blue-800">Phase II Requirements:</h4>
                        <p className="text-sm text-blue-700 mb-3">
                          Only Phase I recipients can apply. Must demonstrate significant progress and commercial readiness.
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Development Activities:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Full product/service development</li>
                            <li>• Beta testing & validation</li>
                            <li>• Manufacturing scale-up</li>
                            <li>• Regulatory approvals</li>
                            <li>• Customer acquisition</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Commercialization Focus:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Business model refinement</li>
                            <li>• Marketing strategy development</li>
                            <li>• Partnership agreements</li>
                            <li>• Revenue generation</li>
                            <li>• Follow-on funding preparation</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phase III */}
                  <Card className="border-purple-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <TrendingUp className="w-6 h-6 text-purple-600 mr-3" />
                        <CardTitle className="text-purple-700">Phase III: Commercialization</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Funding:</strong> Private/Other Sources</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> Ongoing</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Focus:</strong> Market Success</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        No SBIR funding provided. Companies pursue commercialization through private investment, 
                        partnerships, or federal procurement contracts.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Funding Sources:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Venture capital & private equity</li>
                            <li>• Strategic partnerships</li>
                            <li>• Federal procurement contracts</li>
                            <li>• Commercial sales revenue</li>
                            <li>• Additional grant programs</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">SBIR Advantages:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Federal validation & credibility</li>
                            <li>• Intellectual property portfolio</li>
                            <li>• Government customer relationships</li>
                            <li>• Proven technology readiness</li>
                            <li>• Track record of execution</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Major SBIR Agencies */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Major SBIR Participating Agencies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Largest SBIR Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
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
                            <p className="text-sm text-gray-600">Advanced technologies</p>
                          </div>
                          <span className="font-bold text-purple-600">$200M</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Other Key Agencies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <div>
                            <strong>Department of Energy (DOE)</strong>
                            <p className="text-sm text-gray-600">Clean energy & advanced materials</p>
                          </div>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <div>
                            <strong>NASA</strong>
                            <p className="text-sm text-gray-600">Space technologies & exploration</p>
                          </div>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <div>
                            <strong>Department of Agriculture (USDA)</strong>
                            <p className="text-sm text-gray-600">Agricultural innovation</p>
                          </div>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <div>
                            <strong>Department of Homeland Security (DHS)</strong>
                            <p className="text-sm text-gray-600">Security & emergency response</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Eligibility & Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBIR Eligibility for Small Businesses</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Must Meet:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Small Business:</strong> &lt; 500 employees</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>US Ownership:</strong> 51%+ owned by US citizens</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>For-Profit:</strong> Must be for-profit entity</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Principal Investigator:</strong> Primarily employed by company</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Restrictions:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>No Large Companies:</strong> Cannot be majority-owned by large business</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>No Foreign Control:</strong> Cannot be majority foreign-owned</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>R&D Focus:</strong> Must perform substantial R&D work</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Innovation Required:</strong> Must be novel technology/approach</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Success Tips */}
              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">SBIR Success Strategies for Small Businesses</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Winning Approach</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Focus on agency-specific needs and priorities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Demonstrate clear commercial potential</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Show strong technical team credentials</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Include detailed project management plan</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">🎯 Key Tips</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Start with Phase I - don't skip to Phase II</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Address both technical merit and commercial impact</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Connect with agency program managers early</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Plan for sustainability beyond SBIR funding</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for SBIR Grants?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Get our comprehensive SBIR application guide with agency-specific tips, proposal templates, 
                  and winning strategies for innovative small businesses.
                </p>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/guides/apply-sbir-grants">
                    Get SBIR Application Guide
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
