import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Shield, Heart, Sparkles, Building } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for Women Entrepreneurship Loan Fund (WELF) 2025 | Complete Application Guide",
  description: "Step-by-step guide to applying for WELF microloans. Learn the application process, delivery partner selection, and winning strategies for up to $50K in women entrepreneur financing.",
  keywords: "WELF application guide, Women Entrepreneurship Loan Fund, women business microloans, WEOC loans, NACCA women funding, women entrepreneur financing",
  openGraph: {
    title: "How to Apply for Women Entrepreneurship Loan Fund (WELF) 2025",
    description: "Complete guide to WELF applications with step-by-step process and delivery partner selection strategies.",
    url: "https://grantfinder.pro/guides/women-entrepreneurship-loan-fund-guide",
  },
}

export default function WomenEntrepreneurshipLoanFundApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-600 to-purple-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💼 WELF Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for Women Entrepreneurship Loan Fund
              </h1>
              <p className="text-xl text-pink-100 mb-8">
                Complete step-by-step guide to applying for WELF microloans through five national delivery organizations. 
                Learn partner selection, application strategies, and how to secure up to $50,000 in women entrepreneur financing.
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
                  <div className="text-3xl font-bold text-pink-600 mb-2">$50K</div>
                  <div className="text-gray-600">Maximum Loan Amount</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
                  <div className="text-gray-600">Delivery Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$55M</div>
                  <div className="text-gray-600">Total Federal Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">51%</div>
                  <div className="text-gray-600">Women Ownership Required</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* WELF Application Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WELF Microloan Application Process</h2>
                
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Heart className="w-8 h-8 text-pink-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-pink-800 mb-2">Women Entrepreneur Focus</h4>
                      <p className="text-pink-700">
                        WELF addresses capital access barriers for women entrepreneurs through flexible microloans 
                        delivered by five specialized national organizations, each serving different entrepreneur communities 
                        and business stages with customized support services.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Choose Partner</h4>
                      <p className="text-sm text-gray-600">
                        Select appropriate WELF delivery organization based on profile and needs
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Prepare Application</h4>
                      <p className="text-sm text-gray-600">
                        Develop business plan and gather required financial documents
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit & Review</h4>
                      <p className="text-sm text-gray-600">
                        Submit application and participate in assessment interview
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Receive Funding</h4>
                      <p className="text-sm text-gray-600">
                        Loan approval, agreement signing, and fund disbursement
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WELF Women Entrepreneur Eligibility</h2>
                
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Business Owner & Loan Eligibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Loan:</strong> Up to $50,000</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Terms:</strong> Up to 5 years</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Ownership:</strong> 51%+ women</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Business Owner Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Self-identifying woman entrepreneur (51%+ ownership)</li>
                          <li>• Canadian citizen, permanent resident, or protected person</li>
                          <li>• Legally registered business or in formation</li>
                          <li>• Operating or planning to operate in Canada</li>
                          <li>• Viable business plan with revenue potential</li>
                          <li>• Demonstrated need for capital access</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Priority Entrepreneur Groups:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Startups and early-stage businesses</li>
                          <li>• Sole proprietorships and microbusinesses</li>
                          <li>• Indigenous women entrepreneurs</li>
                          <li>• Racialized and immigrant women</li>
                          <li>• Women with disabilities</li>
                          <li>• LGBTQ2S+ women entrepreneurs</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* WELF Delivery Partners */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WELF Delivery Partner Selection Guide</h2>
                
                <div className="space-y-6">
                  {/* WEOC */}
                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Women's Enterprise Organizations of Canada (WEOC)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> Up to $50,000</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Terms:</strong> Up to 5 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Coverage:</strong> All provinces</span>
                        </div>
                      </div>
                      
                      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold mb-2 text-pink-800">Best For:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-pink-700">
                          <div>
                            <p>• General women-owned businesses (all sectors)</p>
                            <p>• Startups and existing businesses</p>
                            <p>• Provincial/territorial women entrepreneurs</p>
                          </div>
                          <div>
                            <p>• Working capital and equipment needs</p>
                            <p>• Business advisory support desired</p>
                            <p>• Provincial WEOC network access</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-pink-700">Application Requirements:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Comprehensive business plan</li>
                            <li>• Financial statements (if existing business)</li>
                            <li>• Personal credit check</li>
                            <li>• Proof of business registration</li>
                            <li>• Government-issued ID</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Value-Added Services:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Business coaching and mentorship</li>
                            <li>• Networking opportunities</li>
                            <li>• Training workshops and webinars</li>
                            <li>• Provincial resource connections</li>
                            <li>• Ongoing advisory support</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="https://weoc.ca/" target="_blank" rel="noopener noreferrer">
                            Apply Through WEOC <ExternalLink className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* NACCA */}
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700 flex items-center">
                        <Heart className="w-5 h-5 mr-2" />
                        National Aboriginal Capital Corporations Association (NACCA)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> Up to $50,000</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Terms:</strong> Flexible</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Focus:</strong> Indigenous women</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold mb-2 text-blue-800">Best For:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                          <div>
                            <p>• First Nations, Métis, and Inuit women</p>
                            <p>• Indigenous community-based businesses</p>
                            <p>• Culturally appropriate support needed</p>
                          </div>
                          <div>
                            <p>• Access to 59 Aboriginal Financial Institutions</p>
                            <p>• Indigenous business ecosystem connections</p>
                            <p>• Cultural context understanding required</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="https://nacca.ca/" target="_blank" rel="noopener noreferrer">
                            Apply Through NACCA <ExternalLink className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Nventure */}
                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700 flex items-center">
                        <Lightbulb className="w-5 h-5 mr-2" />
                        Nventure (Formerly Futurpreneur Canada)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> Up to $50,000</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Age:</strong> 18-39 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Support:</strong> 2 years mentorship</span>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold mb-2 text-purple-800">Best For:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
                          <div>
                            <p>• Young women entrepreneurs (18-39)</p>
                            <p>• Innovative startup launches</p>
                            <p>• First-time business owners</p>
                          </div>
                          <div>
                            <p>• Mentorship and learning needs</p>
                            <p>• Reduced collateral requirements</p>
                            <p>• Can combine with other Nventure financing</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="https://www.nventure.ca/" target="_blank" rel="noopener noreferrer">
                            Apply Through Nventure <ExternalLink className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Coralus */}
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Coralus (Formerly SheEO)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> Up to $50,000</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Interest:</strong> 0% loan</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Focus:</strong> Impact ventures</span>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold mb-2 text-green-800">Best For:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                          <div>
                            <p>• Social and environmental ventures</p>
                            <p>• Impact-driven business models</p>
                            <p>• World-changing innovation focus</p>
                          </div>
                          <div>
                            <p>• 0% interest loans with flexible repayment</p>
                            <p>• Community-backed support</p>
                            <p>• Access to Activator network</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="https://coralus.world/" target="_blank" rel="noopener noreferrer">
                            Apply Through Coralus <ExternalLink className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Evol */}
                  <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-700 flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        Evol (Quebec-based)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> Up to $50,000</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Language:</strong> Bilingual</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Region:</strong> Quebec</span>
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold mb-2 text-orange-800">Best For:</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
                          <div>
                            <p>• Quebec-based women entrepreneurs</p>
                            <p>• Francophone business owners</p>
                            <p>• All Quebec regions served</p>
                          </div>
                          <div>
                            <p>• English/French bilingual services</p>
                            <p>• Quebec market expertise</p>
                            <p>• Provincial business ecosystem access</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="https://evol.ca/" target="_blank" rel="noopener noreferrer">
                            Apply Through Evol <ExternalLink className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Components */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WELF Application Components</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700">📊 Business Plan Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-pink-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Executive Summary</strong>
                            <p className="text-sm text-gray-600">Business concept, mission, and key highlights</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-pink-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Market Analysis</strong>
                            <p className="text-sm text-gray-600">Target market, competition, and positioning</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-pink-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Operations Plan</strong>
                            <p className="text-sm text-gray-600">Business model, processes, and suppliers</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-pink-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Management Team</strong>
                            <p className="text-sm text-gray-600">Owner qualifications and key personnel</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">📋 Financial Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Financial Projections</strong>
                            <p className="text-sm text-gray-600">3-year revenue, expenses, and cash flow</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Use of Funds</strong>
                            <p className="text-sm text-gray-600">Detailed breakdown of loan allocation</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Personal Financial Statement</strong>
                            <p className="text-sm text-gray-600">Owner's assets, liabilities, and net worth</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Historical Financials</strong>
                            <p className="text-sm text-gray-600">Past 2 years (if existing business)</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">WELF Application Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Winning Strategies</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Choose delivery partner that best matches your entrepreneur profile</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Develop comprehensive business plan with realistic financial projections</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Demonstrate clear capital access barriers and how loan fills gap</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Provide complete documentation with accurate, up-to-date information</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Pitfalls</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Applying to wrong delivery partner for your business stage or profile</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Weak business plan with insufficient market research or analysis</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Unrealistic financial projections not supported by market data</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Requesting funds for ineligible uses like personal debt or real estate</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official WELF Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700">WELF Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">ISED WELF Program</h5>
                          <p className="text-sm text-gray-600">Official Women Entrepreneurship Loan Fund website</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://ised-isde.canada.ca/site/ised/en/programs-and-initiatives/women-entrepreneurship-strategy/women-entrepreneurship-loan-fund" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">WEOC National</h5>
                          <p className="text-sm text-gray-600">Women's Enterprise Organizations network</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://weoc.ca/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Women Entrepreneurship Strategy</h5>
                          <p className="text-sm text-gray-600">Complete WES program overview</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://ised-isde.canada.ca/site/ised/en/programs-and-initiatives/women-entrepreneurship-strategy" target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Professional Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">WELF Assessment</h5>
                          <p className="text-sm text-gray-600">Free eligibility review and partner selection</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=welf-assessment">
                            Get Assessment <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Partner Selection Help</h5>
                          <p className="text-sm text-gray-600">Expert guidance on choosing right delivery partner</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=welf-partner-selection">
                            Get Help <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Application Support</h5>
                          <p className="text-sm text-gray-600">Professional WELF application development</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=welf-women-entrepreneur-expert-help">
                            Get Support <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Lead Magnet CTA */}
              <div className="bg-gradient-to-r from-pink-600 to-purple-800 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-pink-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free WELF Application Kit</h3>
                <p className="text-pink-100 mb-6 text-lg">
                  Download our comprehensive WELF application guide with delivery partner comparison, 
                  business plan templates, and successful application strategies.
                </p>
                <Button size="lg" className="bg-white text-pink-700 hover:bg-gray-100" asChild>
                  <Link href="#lead-form">
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Guide
                  </Link>
                </Button>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-green-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for WELF Women Entrepreneur Funding?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Our women entrepreneur funding specialists can help you choose the right delivery partner, 
                  develop a compelling business plan, and maximize your chances of securing up to $50K in financing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                    <Link href="/contact?service=welf-women-entrepreneur-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                    <Link href="/contact?service=welf-assessment">
                      Free WELF Assessment
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Lead Magnet Form Section */}
              <div id="lead-form" className="bg-white rounded-lg shadow-sm p-8 mt-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free WELF Application Kit</h3>
                  <p className="text-gray-600">Get instant access to our professional WELF application resources for women entrepreneurs</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4">What's Included:</h4>
                    <div className="space-y-3">
                      {[
                        "Complete WELF delivery partner comparison",
                        "Business plan templates and examples",
                        "Financial projection worksheets",
                        "Application checklists by partner",
                        "Loan use planning guide",
                        "Women entrepreneur success strategies"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-1">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                          placeholder="Jane Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Business Email *</label>
                        <input 
                          type="email" 
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                          placeholder="jane@yourbusiness.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Company Name</label>
                        <input 
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                          placeholder="Your Business Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Business Stage</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500">
                          <option>Select stage</option>
                          <option>Planning/Pre-launch</option>
                          <option>Startup (0-2 years)</option>
                          <option>Established (2-5 years)</option>
                          <option>Growth stage (5+ years)</option>
                        </select>
                      </div>
                      <div className="flex items-start">
                        <input type="checkbox" required className="mt-1 mr-3" />
                        <span className="text-xs text-gray-600">
                          I agree to receive WELF updates and women entrepreneur funding opportunities. Unsubscribe anytime.
                        </span>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download WELF Application Guide Now
                      </Button>
                    </form>
                  </div>
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
