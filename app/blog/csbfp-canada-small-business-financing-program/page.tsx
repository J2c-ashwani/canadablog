import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Small Business Financing Program (CSBFP) 2026 | Up to $1M Business Loans",
  description: "Complete guide to Canada Small Business Financing Program. Learn eligibility, application process, and get up to $1M in government-guaranteed loans for your SME.",
  keywords: "CSBFP, Canada Small Business Financing Program, business loans Canada, government guaranteed loans, SME financing Canada",
  openGraph: {
    title: "Canada Small Business Financing Program (CSBFP) 2026 | Up to $1M Business Loans",
    description: "Complete guide to CSBFP - government-guaranteed loans up to $1M for Canadian small businesses.",
    url: "https://fsidigital.ca/blog/csbfp-canada-small-business-financing-program",
  },
}

export default function CSBFPBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏢 CSBFP Complete Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Small Business Financing Program (CSBFP)
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Everything you need to know about securing government-guaranteed loans up to $1M 
                for your Canadian small business through the CSBFP program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=csbfp">
                    Check CSBFP Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/small-business-grants">
                    Back to Canadian SME Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$1M</div>
                  <div className="text-gray-600">Maximum Loan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                  <div className="text-gray-600">Government Guarantee</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$50B+</div>
                  <div className="text-gray-600">Total Approved Since 1999</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                  <div className="text-gray-600">Approval Rate</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is the CSBFP?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Canada Small Business Financing Program (CSBFP) is a loan loss-sharing program between 
                  the Government of Canada and participating financial institutions. It helps small businesses 
                  access loans for equipment, leasehold improvements, and real property purchases.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Program Benefits</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Government guarantees 85% of loan</li>
                      <li>• Competitive interest rates</li>
                      <li>• Flexible repayment terms up to 10 years</li>
                      <li>• Available through 1,800+ lenders</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">Eligible Uses</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Equipment and machinery purchase</li>
                      <li>• Leasehold improvements</li>
                      <li>• Real property acquisition</li>
                      <li>• Business premises improvement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">CSBFP Loan Categories</h2>
              
              <div className="space-y-8">
                {/* Equipment Financing */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Equipment Financing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $350K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Max 10 years</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>New/Used Equipment</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Finance new or used equipment, machinery, and vehicles essential for business operations.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Equipment:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Manufacturing machinery</li>
                          <li>• Computer hardware and software</li>
                          <li>• Vehicles for business use</li>
                          <li>• Office furniture and equipment</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Key Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Equipment serves as collateral</li>
                          <li>• Flexible repayment schedule</li>
                          <li>• No personal guarantees required</li>
                          <li>• Quick approval process</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Leasehold Improvements */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Leasehold Improvements</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $350K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Max 10 years</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Leased Premises</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Improve leased commercial premises to better suit your business needs and operations.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Improvements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Renovations and upgrades</li>
                          <li>• Electrical and plumbing work</li>
                          <li>• Flooring and interior design</li>
                          <li>• Accessibility improvements</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Valid lease agreement required</li>
                          <li>• Minimum 1-year lease term</li>
                          <li>• Landlord consent may be needed</li>
                          <li>• Improvements must add value</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Real Property */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <FileText className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Real Property Purchase</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Max 10 years</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Business Use Only</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Purchase commercial real estate for your business operations and growth.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Properties:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Office buildings</li>
                          <li>• Retail spaces</li>
                          <li>• Manufacturing facilities</li>
                          <li>• Warehouses and storage</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Important Notes:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Property must be for business use</li>
                          <li>• Professional appraisal required</li>
                          <li>• Environmental assessment needed</li>
                          <li>• Title insurance mandatory</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Requirements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">CSBFP Eligibility Requirements</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Eligible Businesses:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Small Business:</strong> Annual gross revenues of $10M or less</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>For-Profit:</strong> Must be operated for profit</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Canadian Operations:</strong> Operating in Canada</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>All Industries:</strong> Most business sectors eligible</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Ineligible Businesses:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Farming & Agriculture:</strong> Primary agriculture operations</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Charitable Organizations:</strong> Non-profit entities</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Religious Organizations:</strong> Faith-based organizations</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Financial Services:</strong> Banks, insurance companies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">CSBFP Application Process</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Choose Your Lender</h4>
                    <p className="text-gray-600">Select from over 1,800 participating financial institutions including major banks, credit unions, and alternative lenders.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Prepare Required Documents</h4>
                    <p className="text-gray-600">Gather business financials, business plan, equipment quotes, and personal information for all guarantors.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Submit Loan Application</h4>
                    <p className="text-gray-600">Work with your chosen lender to complete and submit the CSBFP loan application with all supporting documentation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Lender Review & Approval</h4>
                    <p className="text-gray-600">Lender reviews application using standard credit criteria and CSBFP guidelines. Decision typically within 2-4 weeks.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Loan Closing & Funding</h4>
                    <p className="text-gray-600">Complete loan documentation, pay registration fee (2% + HST), and receive funding for your business project.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interest Rates & Terms */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Interest Rates & Terms</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-blue-800 mb-2">Current CSBFP Interest Rate Structure</h4>
                <p className="text-blue-700 text-sm mb-4">
                  CSBFP loans have regulated maximum interest rates to ensure affordability for small businesses.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-3">Floating Rate Loans:</h5>
                    <ul className="text-sm space-y-2">
                      <li><strong>Prime + 3%</strong> (maximum)</li>
                      <li>Rate adjusts with prime rate changes</li>
                      <li>Most common option chosen</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-3">Fixed Rate Loans:</h5>
                    <ul className="text-sm space-y-2">
                      <li><strong>Prime + 3%</strong> (at time of approval)</li>
                      <li>Rate locked for entire term</li>
                      <li>Provides payment certainty</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Loan Terms</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">Up to 10 Years</div>
                    <p className="text-sm text-gray-600">Maximum repayment period for all loan types</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Registration Fee</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">2% + HST</div>
                    <p className="text-sm text-gray-600">One-time fee paid on loan amount</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Prepayment</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">No Penalty</div>
                    <p className="text-sm text-gray-600">Pay off early without additional charges</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">CSBFP Success Tips</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Increase Your Approval Odds:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Strong Business Plan:</strong> Detailed financial projections and market analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Good Credit History:</strong> Both personal and business credit</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Industry Experience:</strong> Demonstrate relevant experience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Adequate Equity:</strong> Contribute 25% of project cost</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes to Avoid:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Incomplete Applications:</strong> Missing required documentation</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Unrealistic Projections:</strong> Overly optimistic financial forecasts</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Poor Cash Flow:</strong> Insufficient working capital planning</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Wrong Lender Choice:</strong> Not matching lender specialty</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 CTAs Section - CORRECTED NAVIGATION */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Apply for CSBFP Funding?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get the detailed application guide or work with our experts to maximize 
                your CSBFP approval chances and secure the funding you need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Get Application Guide CTA - CORRECTED */}
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Approach</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our comprehensive step-by-step CSBFP application guide with templates and checklists.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-csbfp-loans">
                      <Download className="w-4 h-4 mr-2" />
                      Get Application Guide
                    </Link>
                  </Button>
                </div>

                {/* Get Expert Help CTA */}
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Assistance</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with CSBFP specialists who have secured $50M+ in funding for Canadian businesses.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=csbfp-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-blue-200 text-sm mt-6">
                95% approval rate with expert help vs 65% DIY • Average funding secured: $185K
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
