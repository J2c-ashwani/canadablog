import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Building2, CreditCard } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBA Loans & Grants Complete Guide 2025 | Small Business Administration Funding",
  description: "Complete guide to SBA loans and grants. Learn about 7(a) loans, microloans, CDC/504 loans, and SBA grant programs. Get up to $5M in funding.",
  keywords: "SBA loans, SBA grants, small business administration, 7a loans, microloans, CDC 504 loans, small business funding",
  openGraph: {
    title: "SBA Loans & Grants Complete Guide 2025",
    description: "Complete guide to SBA loans and grants with program details, eligibility, and application strategies.",
    url: "https://grantfinder.pro/blog/sba-loans-grants-guide",
  },
}

export default function SBALoansGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏢 SBA Complete Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SBA Loans & Grants Complete Guide
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Everything you need to know about Small Business Administration funding. Access loans up to $5M and discover available grant programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                  Explore SBA Programs
                </Button>
                {/* FIXED: Added proper background styling for visibility */}
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
                <div className="text-3xl font-bold text-green-600 mb-2">$44.8B</div>
                <div className="text-gray-600">SBA Loans Approved in 2024</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">$5M</div>
                <div className="text-gray-600">Maximum 7(a) Loan Amount</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">99.8%</div>
                <div className="text-gray-600">Small Businesses Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">75%</div>
                <div className="text-gray-600">SBA Guarantee on 7(a) Loans</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* What is SBA */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is the Small Business Administration (SBA)?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Small Business Administration is a federal agency that provides support to entrepreneurs and small businesses. 
                  The SBA doesn't lend money directly but guarantees loans made by approved lenders, reducing risk and making it 
                  easier for small businesses to access capital.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">SBA's Mission</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Support small business growth and job creation</li>
                      <li>• Provide access to capital through loan guarantees</li>
                      <li>• Offer business counseling and training</li>
                      <li>• Help businesses compete for government contracts</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Key Benefits</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Lower down payments (10-15% vs 20-30%)</li>
                      <li>• Longer repayment terms</li>
                      <li>• Competitive interest rates</li>
                      <li>• Flexible use of funds</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SBA Loan Programs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Major SBA Loan Programs</h2>
                
                <div className="space-y-8">
                  {/* 7(a) Loans */}
                  <Card className="border-green-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <CreditCard className="w-6 h-6 text-green-600 mr-3" />
                        <CardTitle className="text-green-700">7(a) Loans - Most Popular</CardTitle>
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
                        Most flexible SBA loan program. Can be used for working capital, equipment, real estate, 
                        refinancing debt, and business acquisition.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Best For:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Working capital needs</li>
                            <li>• Equipment purchases</li>
                            <li>• Business expansion</li>
                            <li>• Debt refinancing</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Key Features:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• No prepayment penalties</li>
                            <li>• Competitive rates</li>
                            <li>• Various collateral options</li>
                            <li>• Personal guarantee required</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CDC/504 Loans */}
                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Building2 className="w-6 h-6 text-blue-600 mr-3" />
                        <CardTitle className="text-blue-700">CDC/504 Loans - Real Estate & Equipment</CardTitle>
                      </div>
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
                          <span><strong>Down Payment:</strong> 10%</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Long-term, fixed-rate financing for real estate and major equipment purchases. 
                        Involves three parties: borrower, bank, and Certified Development Company (CDC).
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Structure:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 50% from bank (market rate)</li>
                            <li>• 40% from CDC (below market rate)</li>
                            <li>• 10% borrower down payment</li>
                            <li>• Fixed rates on CDC portion</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Requirements:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Owner-occupied real estate (51%)</li>
                            <li>• Job creation or retention</li>
                            {/* FIXED: Escaped the < characters */}
                            <li>• Tangible net worth &lt; $15M</li>
                            <li>• Average net income &lt; $5M</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Microloans */}
                  <Card className="border-purple-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Target className="w-6 h-6 text-purple-600 mr-3" />
                        <CardTitle className="text-purple-700">Microloans - Small Amount Funding</CardTitle>
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
                          <span><strong>Average:</strong> $13K</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Small, short-term loans provided through nonprofit community-based organizations. 
                        Great for startups and businesses needing smaller amounts.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Advantages:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Less paperwork</li>
                            <li>• Faster approval</li>
                            <li>• Business counseling included</li>
                            <li>• Good for credit building</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Uses:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Working capital</li>
                            <li>• Inventory</li>
                            <li>• Equipment (not real estate)</li>
                            <li>• Business startup costs</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* SBA Grant Programs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA Grant Programs</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-yellow-800 font-medium">Important Note:</p>
                      <p className="text-yellow-700 text-sm">
                        The SBA rarely offers grants directly to businesses. Most "SBA grants" are actually loans. 
                        However, the SBA does provide grants to organizations that support small businesses.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-700">SCORE Mentorship Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">
                        Free mentoring and educational workshops from experienced business professionals.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Free one-on-one mentoring</li>
                        <li>• Business plan review</li>
                        <li>• Industry expertise</li>
                        <li>• Online and in-person support</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-200">
                    <CardHeader>
                      <CardTitle className="text-teal-700">Small Business Development Centers (SBDC)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">
                        Free business counseling and low-cost training at 900+ locations nationwide.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Business plan development</li>
                        <li>• Financial projections</li>
                        <li>• Market research assistance</li>
                        <li>• Export/import guidance</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700">Women's Business Centers (WBC)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">
                        Specialized support for women entrepreneurs through training and counseling.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Women-focused training programs</li>
                        <li>• Access to capital guidance</li>
                        <li>• Networking opportunities</li>
                        <li>• Government contracting assistance</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA Loan Eligibility Requirements</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Basic Requirements:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Small Business:</strong> Meet SBA size standards for your industry</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>For-Profit:</strong> Must be a for-profit business</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Good Character:</strong> Owners must have good character</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Equity Investment:</strong> Owners must invest their own time/money</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Ineligible Businesses:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Financial Businesses:</strong> Banks, investment companies</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Passive Investments:</strong> Real estate rental or investment</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Prohibited Activities:</strong> Gambling, adult entertainment</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Multi-level Marketing:</strong> Pyramid schemes, MLM businesses</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FIXED: Single CTA Button - Removed external link */}
              <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for SBA Funding?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Get our comprehensive application guide with loan comparison charts, required documents checklist, 
                  and step-by-step application process.
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
