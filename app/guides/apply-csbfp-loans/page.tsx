import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Complete CSBFP Application Guide 2025 | Step-by-Step Process",
  description: "Step-by-step guide to applying for Canada Small Business Financing Program loans. Get templates, checklists, and expert strategies for CSBFP success.",
  keywords: "CSBFP application guide, how to apply CSBFP, Canada Small Business Financing Program application, CSBFP loan process",
  openGraph: {
    title: "Complete CSBFP Application Guide 2025 | Step-by-Step Process", 
    description: "Step-by-step guide with templates and strategies for successful CSBFP loan applications.",
    url: "https://www.fsidigital.ca/guides/apply-csbfp-loans",
  },
}

export default function CSBFPApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - CORRECTED CTA */}
        <section className="bg-gradient-to-br from-green-600 to-teal-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                📋 Complete Application Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                CSBFP Loan Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for Canada Small Business Financing Program loans. 
                Complete with templates, checklists, and proven strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/download/csbfp-application-kit">
                    <Download className="w-5 h-5 mr-2" />
                    Download Application Kit
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-green-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/csbfp-canada-small-business-financing-program">
                    Back to CSBFP Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">6-8 Weeks</div>
                  <div className="text-gray-600">Average Processing Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">12 Documents</div>
                  <div className="text-gray-600">Required for Application</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-gray-600">Approval Rate (Prepared Apps)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">2%</div>
                  <div className="text-gray-600">Registration Fee + HST</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">CSBFP Application Timeline</h2>
              
              <div className="space-y-8">
                {/* Week 1-2: Preparation */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">Week 1-2: Document Preparation</CardTitle>
                      <Badge className="bg-green-100 text-green-800">Foundation Phase</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">Financial Documents Required:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Business financial statements (2-3 years)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Personal financial statements</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Business and personal tax returns</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Cash flow projections (12-24 months)</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Business Documents:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Articles of incorporation</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Business plan (detailed)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Equipment quotes and specifications</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Lease agreements (if applicable)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Week 3-4: Lender Selection */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Week 3-4: Lender Selection & Pre-Application</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Strategy Phase</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h5 className="font-semibold mb-3">Choosing the Right Lender:</h5>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Major Banks:</strong>
                            <ul className="mt-2 space-y-1">
                              <li>• RBC, TD, Scotiabank</li>
                              <li>• Large loan amounts</li>
                              <li>• Established relationships</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Credit Unions:</strong>
                            <ul className="mt-2 space-y-1">
                              <li>• Local decision making</li>
                              <li>• Personal service</li>
                              <li>• Community focus</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Alternative Lenders:</strong>
                            <ul className="mt-2 space-y-1">
                              <li>• BDC, Fundica</li>
                              <li>• Flexible criteria</li>
                              <li>• Specialized industries</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-semibold">Pre-Application Steps:</h5>
                      <div className="flex items-start">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                        <div>
                          <strong>Initial Consultation:</strong> Schedule meeting with 2-3 potential lenders
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                        <div>
                          <strong>Present Opportunity:</strong> Share business plan and funding needs
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                        <div>
                          <strong>Compare Terms:</strong> Interest rates, fees, and service levels
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Week 5-6: Application Submission */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Week 5-6: Application Submission</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Submission Phase</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Application Components:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-purple-50 p-4 rounded">
                            <strong>Loan Application Form:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Complete all sections</li>
                              <li>• Double-check calculations</li>
                              <li>• Include all guarantors</li>
                              <li>• Sign and date</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 p-4 rounded">
                            <strong>Supporting Documents:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• All financial statements</li>
                              <li>• Business plan</li>
                              <li>• Equipment quotes</li>
                              <li>• Insurance certificates</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                          <div>
                            <p className="text-yellow-800 font-medium">Critical Success Factor:</p>
                            <p className="text-yellow-700 text-sm">
                              Ensure your cash flow projections clearly show ability to service the debt. 
                              This is the #1 factor lenders evaluate.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Week 7-8: Review & Approval */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Week 7-8: Review & Approval</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">Decision Phase</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Lender Review Process:</h5>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start">
                            <Clock className="w-4 h-4 text-orange-600 mr-2 mt-1" />
                            <div>
                              <strong>Initial Review (3-5 days):</strong> Credit checks, document verification, preliminary assessment
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Users className="w-4 h-4 text-orange-600 mr-2 mt-1" />
                            <div>
                              <strong>Detailed Analysis (5-7 days):</strong> Financial analysis, business plan review, risk assessment
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Building className="w-4 h-4 text-orange-600 mr-2 mt-1" />
                            <div>
                              <strong>Final Decision (3-5 days):</strong> Credit committee review, approval/conditions, commitment letter
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">If Approved:</h5>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Receive commitment letter with conditions</li>
                          <li>• Complete final documentation</li>
                          <li>• Pay 2% + HST registration fee</li>
                          <li>• Schedule funding date</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Document Checklist */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete Document Checklist</h2>
              
              <div className="space-y-6">
                {/* Personal Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Documents (All Guarantors)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Personal financial statement</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Personal tax returns (2-3 years)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Personal credit report authorization</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Government-issued ID</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Resume/business experience</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Proof of equity contribution</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Banking history (6 months)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Professional references</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle>Business Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Articles of incorporation/partnership agreement</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Business license and permits</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">HST/GST registration</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Business financial statements</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Business tax returns</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Business plan (comprehensive)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Cash flow projections</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">Business banking history</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Project-Specific Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project-Specific Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Equipment Purchase:</h5>
                        <ul className="space-y-1 text-sm">
                          <li>• Equipment quotes (detailed)</li>
                          <li>• Equipment specifications</li>
                          <li>• Installation estimates</li>
                          <li>• Warranty information</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Real Property:</h5>
                        <ul className="space-y-1 text-sm">
                          <li>• Purchase agreement</li>
                          <li>• Property appraisal</li>
                          <li>• Environmental assessment</li>
                          <li>• Title search</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Leasehold Improvements:</h5>
                        <ul className="space-y-1 text-sm">
                          <li>• Lease agreement</li>
                          <li>• Contractor quotes</li>
                          <li>• Improvement plans</li>
                          <li>• Landlord consent</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Avoid These Common CSBFP Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Application Killers:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Insufficient Cash Flow:</strong>
                        <p className="text-sm text-gray-600">Not demonstrating adequate cash flow to service debt payments</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Credit History:</strong>
                        <p className="text-sm text-gray-600">Multiple late payments or defaults in personal/business credit</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Inadequate Equity:</strong>
                        <p className="text-sm text-gray-600">Not contributing sufficient personal equity to the project</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Documentation Issues:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Incomplete Financial Statements:</strong>
                        <p className="text-sm text-gray-600">Missing periods or incomplete financial information</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Business Plan:</strong>
                        <p className="text-sm text-gray-600">Generic template without specific market analysis</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Unrealistic Projections:</strong>
                        <p className="text-sm text-gray-600">Overly optimistic financial forecasts not supported by data</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">CSBFP Success Strategies</h2>
              
              <div className="space-y-6">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Financial Presentation Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Cash Flow Projections:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Use conservative revenue estimates</li>
                          <li>• Include seasonal variations</li>
                          <li>• Show debt service coverage of 1.25x minimum</li>
                          <li>• Explain key assumptions</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Financial Statements:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Ensure statements are professionally prepared</li>
                          <li>• Reconcile any discrepancies</li>
                          <li>• Provide detailed notes</li>
                          <li>• Show consistent growth trends</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Business Plan Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Key Components to Emphasize:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <ul className="space-y-1">
                              <li>• Market analysis with specific data</li>
                              <li>• Competitive advantage and positioning</li>
                              <li>• Management experience and qualifications</li>
                              <li>• Risk analysis and mitigation strategies</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Clear growth strategy and timeline</li>
                              <li>• Marketing and sales plan</li>
                              <li>• Operational efficiency measures</li>
                              <li>• Financial controls and reporting</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Lender Relationship Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Be Transparent:</strong> Disclose any potential issues upfront rather than letting lenders discover them
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Respond Quickly:</strong> Provide requested information promptly to keep application moving
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Ask Questions:</strong> Understand the lender's requirements and decision-making process
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Follow Up:</strong> Maintain professional contact throughout the review process
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Get Expert Help CTA */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-teal-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Need Expert Help with Your CSBFP Application?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Don't risk rejection. Our CSBFP specialists have a 95% approval rate and have secured 
                over $50M in funding for Canadian businesses.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">Expert Services Include:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-green-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Complete application preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Financial statement optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Business plan enhancement</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Lender matching and introduction</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Application tracking and follow-up</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Negotiation support</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=csbfp-expert-help">
                  Get Expert Help Now
                </Link>
              </Button>
              <p className="text-green-200 text-sm mt-4">
                95% approval rate • Average funding: $185K • No success, no full fee
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
