import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Building, Target, DollarSign, AlertTriangle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for Small Business Grants 2025 | Complete Application Guide",
  description: "Step-by-step guide to applying for small business grants. Learn SBA loan process, federal grant applications, eligibility requirements, and winning strategies.",
  keywords: "how to apply small business grants, SBA loan application, small business funding guide, grant application process",
  openGraph: {
    title: "How to Apply for Small Business Grants 2025",
    description: "Complete guide to applying for small business grants with step-by-step instructions and winning strategies.",
    url: "https://grantfinder.pro/guides/apply-small-business-grants",
  },
}

export default function ApplySmallBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏢 Small Business Grant Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for Small Business Grants
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Complete step-by-step guide to applying for small business grants and funding. Learn the application process, 
                requirements, and strategies to secure funding up to $5M for your business.
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
                  <div className="text-3xl font-bold text-green-600 mb-2">7-10</div>
                  <div className="text-gray-600">Business Days Registration</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">30-90</div>
                  <div className="text-gray-600">Days Application Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">65%</div>
                  <div className="text-gray-600">SBA Loan Approval Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$5M</div>
                  <div className="text-gray-600">Maximum SBA Loan Amount</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Application Process Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Small Business Grant Application Process</h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Business Setup</h4>
                      <p className="text-sm text-gray-600">
                        Register business entity, obtain EIN, and complete legal requirements
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Financial Preparation</h4>
                      <p className="text-sm text-gray-600">
                        Prepare financial statements, tax returns, and business plan
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Registration</h4>
                      <p className="text-sm text-gray-600">
                        Complete SAM.gov registration and set up grant application portals
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Apply & Follow Up</h4>
                      <p className="text-sm text-gray-600">
                        Submit applications and maintain communication with lenders
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SBA Loan Application Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA Loan Application Guide</h2>
                
                <div className="space-y-6">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700 flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        SBA 7(a) Loan Application
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
                          <span><strong>Processing:</strong> 30-90 days</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Guarantee:</strong> 75-85%</span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Step-by-Step Process:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Find an SBA preferred lender</li>
                            <li>• Complete SBA Form 1919</li>
                            <li>• Submit financial documentation</li>
                            <li>• Provide business plan & projections</li>
                            <li>• Wait for lender decision</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Required Documents:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Personal financial statement (SBA Form 413)</li>
                            <li>• Business financial statements</li>
                            <li>• Tax returns (3 years)</li>
                            <li>• Business plan with projections</li>
                            <li>• Legal documents & licenses</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        SBA Microloan Application
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
                          <span><strong>Processing:</strong> 2-4 weeks</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Average:</strong> $13K</span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Application Process:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Find microloan intermediary lender</li>
                            <li>• Attend business counseling session</li>
                            <li>• Complete simplified application</li>
                            <li>• Provide basic financial information</li>
                            <li>• Receive mentoring support</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-purple-700">Ideal For:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Startup businesses</li>
                            <li>• Working capital needs</li>
                            <li>• Equipment purchases</li>
                            <li>• Inventory financing</li>
                            <li>• Credit building</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Required Documentation */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documentation Checklist</h2>
                
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
                            <p className="text-sm text-gray-600">Profit & loss, balance sheet, cash flow (3 years)</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Personal Financial Statements</strong>
                            <p className="text-sm text-gray-600">SBA Form 413 for owners with 20%+ ownership</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Tax Returns</strong>
                            <p className="text-sm text-gray-600">Business and personal returns (3 years)</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Bank Statements</strong>
                            <p className="text-sm text-gray-600">Business and personal (3 months recent)</p>
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
                            <p className="text-sm text-gray-600">Comprehensive plan with financial projections</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Legal Documents</strong>
                            <p className="text-sm text-gray-600">Articles of incorporation, operating agreements</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Licenses & Permits</strong>
                            <p className="text-sm text-gray-600">Business license, professional licenses</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Lease Agreements</strong>
                            <p className="text-sm text-gray-600">Commercial property lease or purchase agreement</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Federal Grant Applications */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Federal Grant Application Process</h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Find Opportunities</h4>
                      <p className="text-sm text-gray-600">
                        Search grants.gov and agency websites for relevant funding
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Register Systems</h4>
                      <p className="text-sm text-gray-600">
                        Complete SAM.gov and grants.gov workspace registration
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Develop Proposal</h4>
                      <p className="text-sm text-gray-600">
                        Write detailed technical and business proposals
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit & Track</h4>
                      <p className="text-sm text-gray-600">
                        Submit through grants.gov and track application status
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">💡 SBIR Grant Application Tips</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Focus on innovation and commercialization</li>
                        <li>• Demonstrate market need and opportunity</li>
                        <li>• Show strong technical team qualifications</li>
                        <li>• Include detailed budget justification</li>
                      </ul>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Address all evaluation criteria</li>
                        <li>• Submit Phase I before Phase II</li>
                        <li>• Work with experienced consultants</li>
                        <li>• Allow time for multiple revisions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Small Business Grant Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Start with a strong business credit profile</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Maintain organized financial records</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Build relationships with lenders early</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Apply to multiple funding sources</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Waiting until you need money to apply</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Incomplete or inaccurate applications</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Not understanding repayment terms</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Applying to wrong programs for your business</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official Small Business Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">SBA Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBA.gov</h5>
                          <p className="text-sm text-gray-600">Official SBA loans and programs</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sba.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBA Lender Match</h5>
                          <p className="text-sm text-gray-600">Find approved SBA lenders</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sba.gov/funding-programs/loans/lender-match" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SCORE</h5>
                          <p className="text-sm text-gray-600">Free business mentoring</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.score.org/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Federal Grant Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Grants.gov</h5>
                          <p className="text-sm text-gray-600">Federal grant opportunities</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.grants.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBIR.gov</h5>
                          <p className="text-sm text-gray-600">Small Business Innovation Research</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sbir.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SAM.gov</h5>
                          <p className="text-sm text-gray-600">System for Award Management</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://sam.gov/" target="_blank" rel="noopener noreferrer">
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
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for Small Business Grants?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Need expert guidance on small business grant applications? Our specialists can help you navigate 
                  the process and develop winning applications for SBA loans and federal grants.
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
