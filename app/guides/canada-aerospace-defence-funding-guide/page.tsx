import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Target, DollarSign, AlertTriangle, Download, Rocket, Plane, Satellite, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for Aerospace Grants Canada 2025 | CSA & Defence Innovation Funding Guide",
  description: "Step-by-step guide to applying for aerospace grants in Canada. Learn Canadian Space Agency application process, IDEaS defence innovation, and strategies for $450M+ in space technology funding.",
  keywords: "how to apply for aerospace grants Canada, CSA application guide, space technology funding Canada, defence innovation grants, satellite development funding, aviation grants application",
  openGraph: {
    title: "How to Apply for Aerospace Grants Canada 2025",
    description: "Complete application guide for Canadian aerospace grants with CSA, IDEaS, and aviation funding strategies.",
    url: "https://grantfinder.pro/guides/canada-aerospace-defence-funding-guide",
  },
}

export default function CanadaAerospaceDefenceFundingGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                ✈️ Aerospace Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for Aerospace Grants in Canada 2025
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Complete step-by-step guide to applying for aerospace and defence grants in Canada. Learn the Canadian Space 
                Agency application process, IDEaS defence innovation strategies, and how to secure up to $5M in space technology 
                and aviation funding across 12+ programs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$450M+</div>
                  <div className="text-gray-600">Aerospace Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$5M</div>
                  <div className="text-gray-600">Max CSA Grant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">50%</div>
                  <div className="text-gray-600">Cost Coverage</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">12+</div>
                  <div className="text-gray-600">Active Programs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada Aerospace Grant Application Overview</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Rocket className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-800 mb-2">Space & Aviation Innovation Focus</h4>
                      <p className="text-blue-700">
                        Canada provides $450M+ annually in aerospace funding through federal programs supporting space technology, 
                        satellite development, aviation innovation, defence applications, and commercial aerospace from R&D to manufacturing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Identify Technology</h4>
                      <p className="text-sm text-gray-600">
                        Define aerospace innovation and application area
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Select Programs</h4>
                      <p className="text-sm text-gray-600">
                        Match with CSA, IDEaS, or IRAP programs
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Build Technical Case</h4>
                      <p className="text-sm text-gray-600">
                        Demonstrate aerospace innovation and feasibility
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Apply & Execute</h4>
                      <p className="text-sm text-gray-600">
                        Submit applications and develop technology
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">CSA Application Process (Up to $5M)</h2>
                
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Canadian Space Agency Programs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> Up to $5M</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Coverage:</strong> Up to 50%</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Type:</strong> Space Technology</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">CSA Eligibility:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Canadian space technology company</li>
                          <li>• Space application or mission relevance</li>
                          <li>• Technical feasibility demonstrated</li>
                          <li>• Commercialization potential</li>
                          <li>• Technology readiness level appropriate</li>
                          <li>• Canadian content and benefits</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-indigo-700">Application Components:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Technology description and innovation</li>
                          <li>• Space mission or application context</li>
                          <li>• Technical approach and methodology</li>
                          <li>• Budget and project timeline</li>
                          <li>• Team capabilities and experience</li>
                          <li>• Commercialization and partnership strategy</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Program Selection Matrix</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="border border-blue-200 p-3 text-left">Aerospace Area</th>
                        <th className="border border-blue-200 p-3 text-left">Recommended Programs</th>
                        <th className="border border-blue-200 p-3 text-left">Funding Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>Space Technology R&D</strong>
                          <p className="text-sm text-gray-600">Satellite systems, space robotics</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• CSA Space Technology Development</li>
                            <li>• IRAP Aerospace Innovation</li>
                            <li>• SR&ED Tax Credits</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$500K - $5M</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>Defence Innovation</strong>
                          <p className="text-sm text-gray-600">Security solutions, autonomous systems</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• IDEaS Competitive Challenges</li>
                            <li>• IDEaS Sandbox Program</li>
                            <li>• Build in Canada Innovation Program</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$150K - $1.5M</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>Aviation Technology</strong>
                          <p className="text-sm text-gray-600">Aircraft systems, propulsion</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• IRAP Aviation Projects</li>
                            <li>• Provincial aerospace clusters</li>
                            <li>• Regional development funds</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$100K - $500K</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>Large-Scale Manufacturing</strong>
                          <p className="text-sm text-gray-600">Aerospace production expansion</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• Strategic Innovation Fund</li>
                            <li>• Regional aerospace hubs</li>
                            <li>• Provincial manufacturing programs</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$5M - $50M</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Aerospace Funding Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Strong Technical Innovation:</strong> Demonstrate clear aerospace technology advancement and competitive advantage</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Certification Path:</strong> Clear strategy for aerospace certification and regulatory compliance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Industry Partnerships:</strong> Collaboration with aerospace primes, suppliers, or research institutions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Export Market Strategy:</strong> Clear international market opportunities and competitiveness</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Weak Technical Case:</strong> Insufficient demonstration of aerospace innovation or technical feasibility</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>No Certification Plan:</strong> Unclear path to aerospace regulatory approval or standards compliance</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Limited Market Access:</strong> No clear customer acquisition or commercialization strategy</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Inadequate Team:</strong> Insufficient aerospace expertise, technical capability, or industry experience</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-blue-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free Aerospace Funding Kit</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Download our comprehensive aerospace funding guide with CSA templates, IDEaS application tools, 
                  aviation grant strategies, and successful space technology project examples.
                </p>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/download/canada-aerospace-defence-funding-guide">
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Guide
                  </Link>
                </Button>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-indigo-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for Aerospace Grants?</h3>
                <p className="text-indigo-100 mb-6 text-lg">
                  Our aerospace funding specialists understand CSA, IDEaS, and aviation programs. 
                  We've secured $65M+ in aerospace funding with 74% success rate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100" asChild>
                    <Link href="/contact?service=aerospace-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white border-0" asChild>
                    <Link href="/contact?service=aerospace-assessment">
                      Free Aerospace Assessment
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
