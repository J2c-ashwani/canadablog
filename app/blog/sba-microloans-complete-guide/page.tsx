import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Users, Heart } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBA Microloans Complete Guide 2026 | Small Business Microloan Program",
  description: "Complete guide to SBA microloans. Learn eligibility, application process, and how to secure up to $50K in small business funding with business mentoring included.",
  keywords: "SBA microloans, small business microloans, SBA microloan program, startup funding, small business loans",
  openGraph: {
    title: "SBA Microloans Complete Guide 2026",
    description: "Complete guide to SBA microloans with application process and mentoring benefits.",
    url: "https://fsidigital.ca/blog/sba-microloans-complete-guide",
  },
}

export default function SBAMicroloansGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-pink-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💜 SBA Microloans Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SBA Microloans Complete Guide
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Everything you need to know about SBA microloans - perfect for startups and small businesses 
                needing smaller amounts. Get up to $50K plus free business mentoring.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                  Start Reading Guide
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/guides/apply-sba-loans">
                    Get Application Guide
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
                <div className="text-3xl font-bold text-purple-600 mb-2">$50K</div>
                <div className="text-gray-600">Maximum Loan Amount</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600 mb-2">$13K</div>
                <div className="text-gray-600">Average Loan Size</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-gray-600">Years Maximum Term</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">180+</div>
                <div className="text-gray-600">Microloan Intermediaries</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* What are SBA Microloans */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are SBA Microloans?</h2>
                
                <p className="text-lg text-gray-700 mb-6">
                  SBA microloans are small, short-term loans provided through nonprofit community-based intermediary lenders. 
                  These loans are perfect for startups and small businesses that need smaller amounts of capital and can 
                  benefit from business mentoring and technical assistance.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Smaller loan amounts (up to $50K)</li>
                        <li>• Less paperwork than traditional SBA loans</li>
                        <li>• Faster approval process (2-4 weeks)</li>
                        <li>• Business mentoring included</li>
                        <li>• Good for credit building</li>
                        <li>• Community-based lenders</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700">Ideal For</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Startup businesses</li>
                        <li>• Working capital needs</li>
                        <li>• Inventory purchases</li>
                        <li>• Equipment (not real estate)</li>
                        <li>• Business expansion</li>
                        <li>• Women & minority entrepreneurs</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Microloan Program Structure */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA Microloan Program Structure</h2>
                
                <div className="space-y-6">
                  <Card className="border-purple-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Heart className="w-6 h-6 text-purple-600 mr-3" />
                        <CardTitle className="text-purple-700">How Microloans Work</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> Up to $50K</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Terms:</strong> Up to 6 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Average:</strong> $13,000</span>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold mb-2 text-purple-800">Three-Party Structure:</h4>
                        <p className="text-sm text-purple-700 mb-3">
                          SBA provides funds to nonprofit intermediary lenders, who then make loans to small businesses.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                          <div className="bg-white rounded p-3">
                            <strong className="text-purple-700">SBA</strong>
                            <p className="text-xs text-gray-600">Provides capital to intermediaries</p>
                          </div>
                          <div className="bg-white rounded p-3">
                            <strong className="text-purple-700">Intermediary</strong>
                            <p className="text-xs text-gray-600">Community-based lender</p>
                          </div>
                          <div className="bg-white rounded p-3">
                            <strong className="text-purple-700">Small Business</strong>
                            <p className="text-xs text-gray-600">Receives loan + mentoring</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Loan Uses:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Working capital</li>
                            <li>• Inventory & supplies</li>
                            <li>• Equipment & machinery</li>
                            <li>• Startup costs</li>
                            <li>• Business expansion</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Interest Rates (2026):</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Typically 8% - 13%</li>
                            <li>• Set by intermediary lender</li>
                            <li>• Fixed rate loans</li>
                            <li>• No prepayment penalties</li>
                            <li>• Competitive with market rates</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Business Mentoring Component */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Business Mentoring & Technical Assistance</h2>
                
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Users className="w-8 h-8 text-pink-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-pink-800 mb-2">Unique Advantage of Microloans</h4>
                      <p className="text-pink-700">
                        Unlike other SBA loan programs, microloans come with mandatory business counseling and mentoring, 
                        providing invaluable support for new entrepreneurs and growing businesses.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700">Pre-Loan Counseling</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Business plan development</li>
                        <li>• Financial projections</li>
                        <li>• Market research guidance</li>
                        <li>• Loan application assistance</li>
                        <li>• Industry-specific advice</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">Post-Loan Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Ongoing business mentoring</li>
                        <li>• Financial management training</li>
                        <li>• Marketing & sales support</li>
                        <li>• Networking opportunities</li>
                        <li>• Growth planning assistance</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA Microloan Eligibility Requirements</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Basic Requirements:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Small Business:</strong> Meet SBA size standards</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>For-Profit:</strong> Must be for-profit business</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Good Credit:</strong> Reasonable credit history</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Business Need:</strong> Demonstrate need for capital</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Restrictions:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Real Estate:</strong> Cannot purchase real estate</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Debt Payment:</strong> Cannot pay existing debt</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Prohibited Industries:</strong> Same as other SBA loans</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Location:</strong> Must be in intermediary's service area</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA Microloan Application Process</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Find Intermediary</h4>
                    <p className="text-sm text-gray-600">
                      Locate a microloan intermediary in your area using SBA directory
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Get Counseling</h4>
                    <p className="text-sm text-gray-600">
                      Attend mandatory business counseling session
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Apply</h4>
                    <p className="text-sm text-gray-600">
                      Complete simplified application with intermediary
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Receive Support</h4>
                    <p className="text-sm text-gray-600">
                      Get funding plus ongoing business mentoring
                    </p>
                  </div>
                </div>
              </div>

              {/* Popular Microloan Intermediaries */}
              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Microloan Intermediary Types</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">🏢 Community Development Financial Institutions (CDFIs):</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Opportunity Fund (nationwide)</li>
                      <li>• Kiva Microfunds (nationwide)</li>
                      <li>• Accion (multiple states)</li>
                      <li>• Community development corporations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">👥 Specialized Organizations:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Women's Business Centers</li>
                      <li>• Minority business development agencies</li>
                      <li>• Veteran entrepreneur programs</li>
                      <li>• Rural development organizations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Success Tips */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Microloan Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Build relationship with intermediary early</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Complete all required counseling</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Have clear business plan and budget</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Take advantage of ongoing mentoring</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-purple-700">🎯 Application Tips</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                        <span>Start small - you can always get additional funding</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                        <span>Focus on immediate, specific needs</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                        <span>Show how you'll repay from cash flow</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                        <span>Be prepared to provide collateral</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for SBA Microloan?</h3>
                <p className="text-purple-100 mb-6 text-lg">
                  Get our comprehensive SBA loan application guide including microloan application tips, 
                  intermediary directory, and mentoring program details.
                </p>
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="/guides/apply-sba-loans">
                    Get SBA Application Guide
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
