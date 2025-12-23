import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, MapPin, Target, DollarSign, AlertTriangle, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for California Small Business Loan Guarantee 2025 | State-Backed Loan Program",
  description: "Step-by-step guide to California Small Business Loan Guarantee Program. Learn eligibility, application process, and how to secure $50K-$2.5M with state backing.",
  keywords: "California small business loan guarantee, California loan program, state-backed small business loans, California IDB loans",
  openGraph: {
    title: "How to Apply for California Small Business Loan Guarantee 2025",
    description: "Complete guide to California Small Business Loan Guarantee applications with step-by-step process.",
    url: "https://www.fsidigital.ca/guides/california-loan-guarantee-guide",
  },
}

export default function CaliforniaLoanGuaranteeGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏛️ California State Program Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for California Small Business Loan Guarantee
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Complete step-by-step guide to California's Small Business Loan Guarantee Program. 
                Learn how to access $50K-$2.5M in state-backed financing for your California business.
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">$2.5M</div>
                  <div className="text-gray-600">Maximum Loan Amount</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">95%</div>
                  <div className="text-gray-600">Maximum Guarantee Percentage</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">20</div>
                  <div className="text-gray-600">Years Maximum Term</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">Rolling</div>
                  <div className="text-gray-600">Applications Accepted</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Program Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">California Small Business Loan Guarantee Program Overview</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <MapPin className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-800 mb-2">State-Backed Financing for California Businesses</h4>
                      <p className="text-blue-700">
                        The California Infrastructure and Economic Development Bank (IBank) provides loan guarantees 
                        to help small businesses access capital when conventional financing isn't available.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Program Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• State guarantee reduces lender risk</li>
                        <li>• Lower down payment requirements</li>
                        <li>• Competitive interest rates</li>
                        <li>• Flexible loan terms up to 20 years</li>
                        <li>• Support for businesses unable to get conventional loans</li>
                        <li>• Streamlined application process</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-200">
                    <CardHeader>
                      <CardTitle className="text-indigo-700">Eligible Uses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Working capital needs</li>
                        <li>• Equipment purchases</li>
                        <li>• Real estate acquisition</li>
                        <li>• Business expansion</li>
                        <li>• Inventory financing</li>
                        <li>• Debt refinancing (limited cases)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Program Structure */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Loan Guarantee Structure</h2>
                
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      California IBank Loan Guarantee Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Amount:</strong> $50K - $2.5M</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Guarantee:</strong> Up to 95%</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Terms:</strong> Up to 20 years</span>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <h4 className="font-bold mb-2 text-green-800">How the Guarantee Works:</h4>
                      <p className="text-sm text-green-700 mb-3">
                        IBank guarantees a percentage of the loan, reducing the lender's risk and making approval more likely.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Guarantee Percentages:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Loans &lt; $350K: Up to 95% guarantee</li>
                          <li>• Loans $350K - $1M: Up to 90% guarantee</li>
                          <li>• Loans &gt; $1M: Up to 80% guarantee</li>
                          <li>• Special programs may vary</li>
                          <li>• Guarantee fee: 2-3% of loan amount</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Interest Rates:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Competitive market rates</li>
                          <li>• Fixed or variable options</li>
                          <li>• Typically Prime + 1-3%</li>
                          <li>• Depends on loan amount and term</li>
                          <li>• No prepayment penalties</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Application Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Application Process</h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Find Participating Lender</h4>
                      <p className="text-sm text-gray-600">
                        Contact IBank-approved lender in your area
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit Loan Application</h4>
                      <p className="text-sm text-gray-600">
                        Complete loan application with participating lender
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Lender Reviews & Submits</h4>
                      <p className="text-sm text-gray-600">
                        Lender evaluates and submits to IBank for guarantee
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">IBank Approval & Closing</h4>
                      <p className="text-sm text-gray-600">
                        IBank reviews guarantee request and loan closes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Eligibility Requirements</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Business Requirements:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>California Location:</strong> Business must operate in California</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Small Business:</strong> Meet SBA small business size standards</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>For-Profit:</strong> Must be for-profit business entity</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Good Standing:</strong> Current on all taxes and obligations</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Restrictions:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Credit Available:</strong> Cannot obtain conventional financing</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Prohibited Uses:</strong> No speculation, investment, or gambling</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Personal Use:</strong> Business purposes only</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Owner Investment:</strong> Must have equity investment in business</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Required Documentation */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documentation</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">📊 Financial Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Business Financial Statements</strong>
                            <p className="text-sm text-gray-600">Profit & loss, balance sheet (3 years)</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Personal Financial Statements</strong>
                            <p className="text-sm text-gray-600">For all owners with 20%+ ownership</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Tax Returns</strong>
                            <p className="text-sm text-gray-600">Business and personal (3 years)</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Cash Flow Projections</strong>
                            <p className="text-sm text-gray-600">12-month detailed projections</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">📋 Business Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Business Plan</strong>
                            <p className="text-sm text-gray-600">Detailed business plan with market analysis</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Legal Documents</strong>
                            <p className="text-sm text-gray-600">Articles, bylaws, operating agreements</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Licenses & Permits</strong>
                            <p className="text-sm text-gray-600">All required business licenses</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Use of Proceeds</strong>
                            <p className="text-sm text-gray-600">Detailed explanation of loan use</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Participating Lenders */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Finding Participating Lenders</h2>
                
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                  <h4 className="font-bold mb-2 text-indigo-800">Work with IBank-Approved Lenders</h4>
                  <p className="text-indigo-700">
                    You must work with a lender that participates in the IBank loan guarantee program. 
                    These lenders are familiar with the application process and requirements.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">Types of Participating Lenders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Community banks</li>
                        <li>• Credit unions</li>
                        <li>• Community Development Financial Institutions (CDFIs)</li>
                        <li>• Small Business Investment Companies (SBICs)</li>
                        <li>• Non-bank lenders</li>
                        <li>• Online lending platforms</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-700">Lender Selection Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Look for lenders experienced with IBank programs</li>
                        <li>• Consider local community banks</li>
                        <li>• Ask about their guarantee application success rate</li>
                        <li>• Compare interest rates and terms</li>
                        <li>• Evaluate their small business focus</li>
                        <li>• Check their responsiveness and service</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Success Tips */}
              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Demonstrate clear inability to get conventional financing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Show strong business fundamentals and cash flow</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Highlight positive economic impact for California</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Work with experienced participating lender</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Incomplete financial documentation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Weak business plan or projections</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Insufficient owner equity investment</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Not demonstrating credit unavailability</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fees and Costs */}
              <div className="bg-yellow-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Fees and Costs</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-yellow-700">📊 IBank Guarantee Fees:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Guarantee fee: 2-3% of loan amount</li>
                      <li>• One-time fee paid at loan closing</li>
                      <li>• May be financed into loan amount</li>
                      <li>• No ongoing annual fees</li>
                      <li>• Fee varies by loan size and risk</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-yellow-700">💰 Additional Costs:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Standard loan origination fees</li>
                      <li>• Legal and documentation costs</li>
                      <li>• Property appraisal (if applicable)</li>
                      <li>• Environmental assessment (if needed)</li>
                      <li>• Title insurance and recording fees</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official California Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">California IBank Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">IBank.ca.gov</h5>
                          <p className="text-sm text-gray-600">Official California IBank website</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.ibank.ca.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Small Business Loan Guarantee</h5>
                          <p className="text-sm text-gray-600">Program details and guidelines</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.ibank.ca.gov/small-business-finance/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Participating Lenders</h5>
                          <p className="text-sm text-gray-600">Directory of approved lenders</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.ibank.ca.gov/small-business-finance/participating-lenders/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-200">
                    <CardHeader>
                      <CardTitle className="text-indigo-700">Support Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">California SBDC</h5>
                          <p className="text-sm text-gray-600">Small Business Development Centers</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://californiasbdc.org/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SCORE California</h5>
                          <p className="text-sm text-gray-600">Free business mentoring</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.score.org/find-location?search_api_views_fulltext=california" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">GO-Biz</h5>
                          <p className="text-sm text-gray-600">California Governor's Office of Business</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://business.ca.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for California Loan Guarantee?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Need expert guidance on your California loan guarantee application? Our specialists can help you 
                  find participating lenders, prepare your application, and navigate the state guarantee process.
                </p>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
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
