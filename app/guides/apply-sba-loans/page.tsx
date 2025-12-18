import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, CreditCard, Building2, Target, DollarSign, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for SBA Loans 2025 | Complete Application Guide",
  description: "Step-by-step guide to applying for SBA loans. Learn 7(a) loans, microloans, CDC/504 requirements, application process, and approval strategies.",
  keywords: "SBA loan application, how to apply SBA loans, 7a loan application, SBA microloan, CDC 504 loan, small business loans",
  openGraph: {
    title: "How to Apply for SBA Loans 2025",
    description: "Complete guide to applying for SBA loans with requirements and approval strategies.",
    url: "https://grantfinder.pro/guides/apply-sba-loans",
  },
}

export default function ApplySBALoansGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏢 SBA Loan Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for SBA Loans
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Complete step-by-step guide to applying for SBA loans. Learn the requirements, process, and strategies 
                for securing up to $5M in Small Business Administration funding.
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
                  <div className="text-3xl font-bold text-green-600 mb-2">$44.8B</div>
                  <div className="text-gray-600">SBA Loans in 2024</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                  <div className="text-gray-600">SBA Guarantee</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$5M</div>
                  <div className="text-gray-600">Max 7(a) Loan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">25</div>
                  <div className="text-gray-600">Years Max Term</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* SBA Loan Types Comparison */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your SBA Loan Program</h2>
                
                <div className="space-y-6">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700 flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        7(a) Loans - Most Popular Choice
                      </CardTitle>
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
                          <span><strong>Down Payment:</strong> 10-15%</span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Best For:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Working capital needs</li>
                            <li>• Equipment purchases</li>
                            <li>• Business acquisition</li>
                            <li>• Debt refinancing</li>
                            <li>• Real estate (up to 90%)</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Key Benefits:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Lower down payment requirements</li>
                            <li>• Competitive interest rates</li>
                            <li>• No prepayment penalties</li>
                            <li>• Flexible use of funds</li>
                            <li>• Up to 85% SBA guarantee</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700 flex items-center">
                        <Building2 className="w-5 h-5 mr-2" />
                        CDC/504 Loans - Real Estate & Equipment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> Up to $20M</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Terms:</strong> 10-20 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Structure:</strong> 50/40/10</span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Requirements:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Owner-occupied (51% minimum)</li>
                            <li>• Job creation or retention</li>
                            <li>• Tangible net worth &lt; $15M</li>
                            <li>• Average net income &lt; $5M (2 years)</li>
                            <li>• Fixed asset purchases only</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Structure Breakdown:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 50% Bank loan (market rate)</li>
                            <li>• 40% SBA debenture (below market)</li>
                            <li>• 10% Borrower down payment</li>
                            <li>• Fixed rates available</li>
                            <li>• Long-term financing</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Microloans - Small Amount Financing
                      </CardTitle>
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
                          <span><strong>Average:</strong> $13K</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        Perfect for startups and small businesses needing smaller amounts. Includes business counseling 
                        and has simpler application requirements.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Ideal For:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Startup businesses</li>
                            <li>• Working capital</li>
                            <li>• Inventory purchases</li>
                            <li>• Small equipment needs</li>
                            <li>• Credit building</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Advantages:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Faster approval process</li>
                            <li>• Less paperwork required</li>
                            <li>• Business counseling included</li>
                            <li>• More flexible requirements</li>
                            <li>• Good for new businesses</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA Loan Eligibility Requirements</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">✅ Basic Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Small Business:</strong> Meet SBA size standards for your industry</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>For-Profit:</strong> Must operate for profit</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Owner Investment:</strong> Reasonable equity injection required</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Good Character:</strong> Owners must demonstrate good character</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <span><strong>Alternative Sources:</strong> Unable to get credit elsewhere</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-700">❌ Ineligible Businesses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                          <span><strong>Financial Services:</strong> Banks, investment companies, check cashing</span>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                          <span><strong>Passive Real Estate:</strong> Real estate investment or rental</span>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                          <span><strong>Speculation:</strong> Gambling, adult entertainment</span>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                          <span><strong>Non-Profits:</strong> Religious, charitable organizations</span>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                          <span><strong>MLM/Pyramid:</strong> Multi-level marketing schemes</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Required Documents */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documentation Checklist</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">📊 Financial Documents</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Business Financial Statements</strong>
                          <p className="text-sm text-gray-600">Profit & loss, balance sheet (last 3 years)</p>
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
                          <p className="text-sm text-gray-600">Business & personal (last 3 years)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Bank Statements</strong>
                          <p className="text-sm text-gray-600">Business & personal (last 3 months)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Cash Flow Projections</strong>
                          <p className="text-sm text-gray-600">12-month forward-looking projections</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">📋 Legal & Business Documents</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Articles of Incorporation</strong>
                          <p className="text-sm text-gray-600">Business formation documents</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Operating Agreement</strong>
                          <p className="text-sm text-gray-600">Partnership/LLC agreements</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Business Licenses</strong>
                          <p className="text-sm text-gray-600">Industry-specific licenses & permits</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Business Plan</strong>
                          <p className="text-sm text-gray-600">Comprehensive business plan with projections</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Lease Agreements</strong>
                          <p className="text-sm text-gray-600">Current business location lease</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Process Steps */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA Loan Application Process</h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Prepare Documentation</h4>
                      <p className="text-sm text-gray-600">
                        Gather all required financial and legal documents for your business and personal finances.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Find SBA Lender</h4>
                      <p className="text-sm text-gray-600">
                        Research and contact SBA preferred lenders who specialize in your loan type and industry.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit Application</h4>
                      <p className="text-sm text-gray-600">
                        Complete loan application with lender and provide all supporting documentation.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Underwriting & Approval</h4>
                      <p className="text-sm text-gray-600">
                        Lender reviews application, SBA provides guarantee, and loan closes upon approval.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h4 className="font-bold text-lg mb-3 text-yellow-800">💡 Pro Tip: Work with SBA Preferred Lenders</h4>
                    <p className="text-yellow-700">
                      SBA Preferred Lenders have delegated authority to approve loans without SBA pre-approval, 
                      significantly reducing processing time from months to weeks.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline & Expectations */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Application Timeline & What to Expect</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <div className="w-20 h-12 bg-green-600 rounded flex items-center justify-center text-white font-bold mr-4">
                      Week 1-2
                    </div>
                    <div>
                      <h4 className="font-bold">Document Preparation & Lender Selection</h4>
                      <p className="text-sm text-gray-600">Gather documentation, research lenders, initial consultations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-20 h-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold mr-4">
                      Week 3-4
                    </div>
                    <div>
                      <h4 className="font-bold">Application Submission</h4>
                      <p className="text-sm text-gray-600">Complete application forms, submit to chosen lender</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-20 h-12 bg-purple-600 rounded flex items-center justify-center text-white font-bold mr-4">
                      Week 5-8
                    </div>
                    <div>
                      <h4 className="font-bold">Lender Review & Underwriting</h4>
                      <p className="text-sm text-gray-600">Credit analysis, cash flow review, collateral evaluation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                    <div className="w-20 h-12 bg-orange-600 rounded flex items-center justify-center text-white font-bold mr-4">
                      Week 9-12
                    </div>
                    <div>
                      <h4 className="font-bold">SBA Review (if required) & Final Approval</h4>
                      <p className="text-sm text-gray-600">SBA guarantee processing, final approval, loan closing</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval Tips */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">SBA Loan Approval Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Strengthen Your Application</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Maintain strong personal credit score (680+)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Show consistent business cash flow</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Provide detailed business plan</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Demonstrate industry experience</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Offer reasonable collateral</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">🎯 Lender Selection Tips</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Choose lenders active in your industry</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Work with SBA Preferred Lenders</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Consider community development lenders</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Ask about loan processing times</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Compare rates and terms</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official SBA Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official SBA Loan Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Primary SBA Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBA.gov Loans</h5>
                          <p className="text-sm text-gray-600">Official SBA loan information & programs</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sba.gov/funding-programs/loans" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBA Lender Match</h5>
                          <p className="text-sm text-gray-600">Find approved SBA lenders in your area</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sba.gov/funding-programs/loans/lender-match" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Supporting Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SCORE Mentoring</h5>
                          <p className="text-sm text-gray-600">Free business mentoring & loan guidance</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.score.org/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Small Business Development Centers</h5>
                          <p className="text-sm text-gray-600">Business counseling & loan preparation help</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://americassbdc.org/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-green-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for an SBA Loan?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Need help preparing your SBA loan application? Our experts can guide you through the process, 
                  review your documentation, and connect you with the right lenders.
                </p>
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
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
