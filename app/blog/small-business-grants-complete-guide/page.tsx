import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Building, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Small Business Grants Complete Guide 2026 | SBA & Federal Funding",
  description: "Complete guide to small business grants. Learn about SBA loans, federal grants, microloans, state programs, and how to secure funding up to $5M for your business.",
  keywords: "small business grants, SBA loans, federal grants small business, business funding guide, small business loans",
  openGraph: {
    title: "Small Business Grants Complete Guide 2026",
    description: "Complete guide to small business grants with SBA programs, federal funding, and application strategies.",
    url: "https://fsidigital.ca/blog/small-business-grants-complete-guide",
  },
}

export default function SmallBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏢 Complete Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Small Business Grants Complete Guide
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Everything you need to know about small business grants and funding programs. Access SBA loans, federal grants, 
                state programs, and specialized funding to grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                  Start Reading Guide
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/guides/apply-small-business-grants">
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
                <div className="text-3xl font-bold text-green-600 mb-2">33.2M</div>
                <div className="text-gray-600">Small Businesses in USA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">$44.8B</div>
                <div className="text-gray-600">SBA Loans Approved 2024</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                <div className="text-gray-600">Of All US Businesses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">47.1%</div>
                <div className="text-gray-600">Private Workforce Employed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* What are Small Business Grants */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are Small Business Grants?</h2>
                
                <p className="text-lg text-gray-700 mb-6">
                  Small business grants are financial assistance programs designed to help entrepreneurs start, grow, and sustain 
                  their businesses. Unlike loans, grants typically don't require repayment, though many programs are actually 
                  low-interest loans with favorable terms.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">True Grants (No Repayment)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Actual grants that don't require repayment, typically for specific purposes or demographics.
                      </p>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• SBIR/STTR research grants</li>
                        <li>• State economic development grants</li>
                        <li>• Industry-specific grants</li>
                        <li>• Minority/women business grants</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Government-Backed Loans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Low-interest loans with government guarantees, making them accessible to small businesses.
                      </p>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• SBA 7(a) loans (up to $5M)</li>
                        <li>• SBA microloans (up to $50K)</li>
                        <li>• CDC/504 real estate loans</li>
                        <li>• Disaster relief loans</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Major Funding Categories */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Major Small Business Funding Categories</h2>
                
                <div className="space-y-8">
                  {/* SBA Programs */}
                  <Card className="border-green-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Building className="w-6 h-6 text-green-600 mr-3" />
                        <CardTitle className="text-green-700">SBA Loan Programs</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> Up to $5M</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Terms:</strong> Up to 25 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Guarantee:</strong> 75-85%</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        The Small Business Administration offers the most comprehensive funding programs for American small businesses, 
                        with government guarantees that reduce lender risk and improve approval rates.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">7(a) Loan Program:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Most flexible SBA program</li>
                            <li>• Working capital & expansion</li>
                            <li>• Equipment & real estate</li>
                            <li>• Business acquisition</li>
                            <li>• Debt refinancing</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Microloans:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Up to $50K funding</li>
                            <li>• Great for startups</li>
                            <li>• Business mentoring included</li>
                            <li>• Faster approval process</li>
                            <li>• Less documentation required</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Federal Grant Programs */}
                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Target className="w-6 h-6 text-blue-600 mr-3" />
                        <CardTitle className="text-blue-700">Federal Grant Programs</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> $50K - $1.7M</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 1-3 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Repayment:</strong> None required</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        True grants from federal agencies that don't require repayment, typically focused on research, 
                        innovation, and specific policy objectives.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">SBIR/STTR Programs:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Phase I: $50K-$300K proof of concept</li>
                            <li>• Phase II: $750K-$1.7M development</li>
                            <li>• 11 participating federal agencies</li>
                            <li>• Focus on innovation & R&D</li>
                            <li>• High-growth potential businesses</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Agency-Specific Grants:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Department of Agriculture (USDA)</li>
                            <li>• Department of Energy (DOE)</li>
                            <li>• Environmental Protection Agency</li>
                            <li>• Department of Commerce</li>
                            <li>• National Science Foundation</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* State & Local Programs */}
                  <Card className="border-purple-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Users className="w-6 h-6 text-purple-600 mr-3" />
                        <CardTitle className="text-purple-700">State & Local Programs</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> $5K - $500K</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Focus:</strong> Local Economic Development</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Eligibility:</strong> Location-based</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        State and local governments offer various programs to encourage business development, 
                        job creation, and economic growth in their regions.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Program Types:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Economic development grants</li>
                            <li>• Job creation incentives</li>
                            <li>• Industry-specific programs</li>
                            <li>• Export assistance programs</li>
                            <li>• Rural development funding</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Top State Programs:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• California: CalCompetes Tax Credit</li>
                            <li>• Texas: Enterprise Fund</li>
                            <li>• New York: Excelsior Jobs Program</li>
                            <li>• Florida: Quick Action Closing Fund</li>
                            <li>• Illinois: EDGE Tax Credit</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Private & Corporate Programs */}
                  <Card className="border-orange-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <TrendingUp className="w-6 h-6 text-orange-600 mr-3" />
                        <CardTitle className="text-orange-700">Private & Corporate Grants</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        Private foundations, corporations, and organizations offer grants to support small business 
                        development, often with specific focus areas or demographics.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-orange-700">Corporate Programs:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• FedEx Small Business Grant</li>
                            <li>• Chase for Business</li>
                            <li>• Visa Everywhere Initiative</li>
                            <li>• UPS Capital Business Credit</li>
                            <li>• Amazon Small Business Grants</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-orange-700">Foundation Grants:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Kauffman Foundation</li>
                            <li>• Kiva Microfunds</li>
                            <li>• Grameen America</li>
                            <li>• SCORE Foundation</li>
                            <li>• Local community foundations</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Small Business Grant Eligibility</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ General Requirements:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Small Business Status:</strong> Meet SBA size standards for your industry</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>For-Profit Business:</strong> Must operate as a for-profit entity</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>US Ownership:</strong> Majority owned by US citizens or legal residents</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Good Standing:</strong> Compliance with all applicable laws</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Restrictions:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Large Business:</strong> Cannot exceed size standards</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Prohibited Industries:</strong> Gambling, adult entertainment</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Passive Investment:</strong> Real estate rental or investment only</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Financial Services:</strong> Banks, investment companies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Success Tips */}
              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Small Business Grant Success Strategies</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Start with a solid business plan</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Maintain excellent financial records</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Build strong credit history</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Research multiple funding sources</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">🎯 Application Tips:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Apply to multiple programs</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Follow application instructions precisely</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Submit applications early</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Work with SCORE mentors</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for Small Business Grants?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Get our comprehensive application guide with step-by-step instructions, required documents checklist, 
                  and proven strategies to maximize your funding success.
                </p>
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="/guides/apply-small-business-grants">
                    Get Application Guide
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
