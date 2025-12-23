import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Building, CreditCard } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBA 7(a) Loans Complete Guide 2026 | Small Business Administration Funding",
  description: "Complete guide to SBA 7(a) loans. Learn eligibility requirements, application process, terms, and how to secure up to $5M in SBA funding for your business.",
  keywords: "SBA 7a loans, SBA loan application, small business loans, SBA 7a loan requirements, SBA funding guide",
  openGraph: {
    title: "SBA 7(a) Loans Complete Guide 2026",
    description: "Complete guide to SBA 7(a) loans with application process and eligibility requirements.",
    url: "https://www.fsidigital.ca/blog/sba-7a-loans-complete-guide",
  },
}

export default function SBA7aLoansGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏢 SBA 7(a) Complete Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SBA 7(a) Loans Complete Guide
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Everything you need to know about SBA 7(a) loans - the most popular SBA program. 
                Learn how to secure up to $5M in flexible funding for your small business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
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
                <div className="text-3xl font-bold text-green-600 mb-2">75%</div>
                <div className="text-gray-600">Of All SBA Loans</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">$5M</div>
                <div className="text-gray-600">Maximum Loan Amount</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                <div className="text-gray-600">SBA Guarantee (loans &lt; $150K)</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">25</div>
                <div className="text-gray-600">Years Maximum Terms</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* What are SBA 7(a) Loans */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are SBA 7(a) Loans?</h2>
                
                <p className="text-lg text-gray-700 mb-6">
                  SBA 7(a) loans are the Small Business Administration's primary loan program, providing flexible financing 
                  for a wide variety of business purposes. The SBA guarantees 75-85% of the loan amount, reducing risk for 
                  lenders and making it easier for small businesses to qualify.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Lower down payments (10-15% vs 20-30%)</li>
                        <li>• Longer repayment terms (up to 25 years)</li>
                        <li>• Competitive interest rates</li>
                        <li>• No prepayment penalties</li>
                        <li>• Flexible use of funds</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Loan Uses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Working capital</li>
                        <li>• Equipment purchases</li>
                        <li>• Real estate acquisition</li>
                        <li>• Business expansion</li>
                        <li>• Debt refinancing</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Loan Terms & Structure */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA 7(a) Loan Terms & Structure</h2>
                
                <div className="space-y-6">
                  <Card className="border-green-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <CreditCard className="w-6 h-6 text-green-600 mr-3" />
                        <CardTitle className="text-green-700">Loan Amounts & Terms</CardTitle>
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
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Term Length by Use:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Working capital: Up to 10 years</li>
                            <li>• Equipment: Up to 10 years</li>
                            <li>• Real estate: Up to 25 years</li>
                            <li>• Business acquisition: Up to 10 years</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Interest Rates (2026):</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Prime + 2.75% to 4.75%</li>
                            <li>• Fixed or variable rates available</li>
                            <li>• Lower rates for smaller loans</li>
                            <li>• Competitive with conventional loans</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA 7(a) Loan Eligibility Requirements</h2>
                
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
                        <span><strong>Owner Investment:</strong> Inject own time/money</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Good Character:</strong> Pass character evaluation</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Restrictions:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Prohibited Industries:</strong> Gambling, lending, speculation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Passive Investment:</strong> Real estate investment only</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Non-profits:</strong> Must be for-profit entity</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Size Limits:</strong> Cannot exceed industry standards</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA 7(a) Application Process</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Find Lender</h4>
                    <p className="text-sm text-gray-600">
                      Find an SBA preferred or express lender in your area
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Prepare Documents</h4>
                    <p className="text-sm text-gray-600">
                      Gather financial statements, business plan, and personal information
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Submit Application</h4>
                    <p className="text-sm text-gray-600">
                      Complete SBA forms and submit to chosen lender
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Close Loan</h4>
                    <p className="text-sm text-gray-600">
                      Complete underwriting process and close on funding
                    </p>
                  </div>
                </div>
              </div>

              {/* Required Documents */}
              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Documentation</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">📊 Financial Documents:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Business financial statements (3 years)</li>
                      <li>• Personal financial statements</li>
                      <li>• Business and personal tax returns</li>
                      <li>• Bank statements (3 months)</li>
                      <li>• Accounts receivable aging</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">📋 Business Documents:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Business plan with projections</li>
                      <li>• Legal structure documents</li>
                      <li>• Business licenses</li>
                      <li>• Lease agreements</li>
                      <li>• Purchase agreements (if applicable)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for SBA 7(a) Loan?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Get our comprehensive SBA loan application guide with step-by-step instructions, 
                  required documents checklist, and lender directory.
                </p>
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
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
