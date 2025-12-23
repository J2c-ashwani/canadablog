import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Target, DollarSign, AlertTriangle, Download, Sprout, Tractor, Wheat, Leaf } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for AgriInnovate Grants Canada 2025 | Agriculture & Food Technology Funding Guide",
  description: "Step-by-step guide to applying for agriculture grants in Canada. Learn AgriInnovate application process, CAP funding strategies, and how to secure $2.3B+ in agritech and precision agriculture funding.",
  keywords: "how to apply for agriculture grants Canada, AgriInnovate application guide, farm technology funding, precision agriculture grants, food processing grants application, agritech funding Canada",
  openGraph: {
    title: "How to Apply for AgriInnovate Grants Canada 2025",
    description: "Complete application guide for Canadian agriculture grants with AgriInnovate, CAP, and precision farming funding strategies.",
    url: "https://www.fsidigital.ca/guides/canada-agri-food-funding-guide",
  },
}

export default function CanadaAgriFoodFundingGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-green-700 to-emerald-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌾 Agri-Food Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for Agriculture Grants in Canada 2025
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Complete step-by-step guide to applying for agriculture and food technology grants in Canada. Learn the AgriInnovate 
                application process, CAP funding strategies, and how to secure up to $10M in farm technology and precision 
                agriculture funding across 32+ programs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$2.3B+</div>
                  <div className="text-gray-600">AgriTech Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">$10M</div>
                  <div className="text-gray-600">Max AgriInnovate Grant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">50%</div>
                  <div className="text-gray-600">Cost Coverage</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">32+</div>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada Agriculture Grant Application Overview</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Sprout className="w-8 h-8 text-green-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-green-800 mb-2">Agricultural Innovation Focus</h4>
                      <p className="text-green-700">
                        Canada provides $2.3B+ annually in agri-food funding through federal programs supporting precision 
                        agriculture, food processing technology, sustainable farming practices, and agricultural innovation 
                        from R&D to commercialization.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Identify Farm Need</h4>
                      <p className="text-sm text-gray-600">
                        Define specific agricultural challenge or opportunity
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Select Programs</h4>
                      <p className="text-sm text-gray-600">
                        Match with AgriInnovate, CAP, or sector programs
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Build Farm Case</h4>
                      <p className="text-sm text-gray-600">
                        Demonstrate on-farm benefits and ROI
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Apply & Implement</h4>
                      <p className="text-sm text-gray-600">
                        Submit applications and deploy technology
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">AgriInnovate Application Process (Up to $10M)</h2>
                
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      AgriInnovate Program - AAFC
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> Up to $10M</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Type:</strong> Repayable</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Focus:</strong> Commercialization</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">AgriInnovate Eligibility:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Canadian agri-food business</li>
                          <li>• Innovative agricultural product/technology</li>
                          <li>• Clear commercialization pathway</li>
                          <li>• Market demand demonstrated</li>
                          <li>• Financial capacity for repayment</li>
                          <li>• Economic benefits to agriculture sector</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-emerald-700">Application Components:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Technology/product description</li>
                          <li>• Market analysis and competition</li>
                          <li>• Commercialization plan and timeline</li>
                          <li>• Financial projections and repayment</li>
                          <li>• Farm-level impact assessment</li>
                          <li>• Partnership and distribution strategy</li>
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
                      <tr className="bg-green-50">
                        <th className="border border-green-200 p-3 text-left">Agricultural Area</th>
                        <th className="border border-green-200 p-3 text-left">Recommended Programs</th>
                        <th className="border border-green-200 p-3 text-left">Funding Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>Technology Commercialization</strong>
                          <p className="text-sm text-gray-600">Ready-to-market agritech products</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• AgriInnovate Program</li>
                            <li>• IRAP Agri-Food Projects</li>
                            <li>• Provincial commercialization</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$500K - $10M</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>On-Farm Technology</strong>
                          <p className="text-sm text-gray-600">Precision ag equipment adoption</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• Canadian Agricultural Partnership</li>
                            <li>• Provincial cost-share programs</li>
                            <li>• Equipment financing programs</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$25K - $250K</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>Research & Development</strong>
                          <p className="text-sm text-gray-600">Pre-commercial innovation</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• AgriScience Program Clusters</li>
                            <li>• NSERC Collaborative R&D</li>
                            <li>• SR&ED Tax Credits</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$100K - $3M</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>Food Processing Innovation</strong>
                          <p className="text-sm text-gray-600">Value-added processing technology</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• AgriProcessing Initiative</li>
                            <li>• Regional food hubs funding</li>
                            <li>• Food safety system grants</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$250K - $2M</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Agriculture Funding Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Farm-Level Validation:</strong> Demonstrate technology effectiveness on real farms with measurable results</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Clear ROI for Farmers:</strong> Show economic benefits, payback period, and cost savings</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Industry Partnerships:</strong> Collaborate with farm organizations, processors, and distributors</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Sustainability Focus:</strong> Address environmental benefits and sustainable practices</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>No Farm Testing:</strong> Insufficient validation in real agricultural conditions</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Weak Economic Case:</strong> Unclear financial benefits or ROI for farmers</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Ignoring Farmer Needs:</strong> Technology developed without farmer input or usability</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>No Adoption Strategy:</strong> Unclear path to market or farmer uptake plan</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-700 to-emerald-800 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-green-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free Agri-Food Funding Kit</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Download our comprehensive agriculture funding guide with AgriInnovate templates, CAP application tools, 
                  precision agriculture strategies, and successful farm technology project examples.
                </p>
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="/download/canada-agri-food-funding-guide">
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Guide
                  </Link>
                </Button>
              </div>

              <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-emerald-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for Agriculture Grants?</h3>
                <p className="text-emerald-100 mb-6 text-lg">
                  Our agri-food funding specialists understand AgriInnovate, CAP, and precision agriculture programs. 
                  We've secured $78M+ in agriculture funding with 72% success rate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100" asChild>
                    <Link href="/contact?service=agritech-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white border-0" asChild>
                    <Link href="/contact?service=agritech-assessment">
                      Free AgriTech Assessment
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
