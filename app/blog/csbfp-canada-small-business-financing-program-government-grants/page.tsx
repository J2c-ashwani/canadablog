import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Percent } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CSBFP Canada Small Business Financing Program 2026 | Government Guaranteed Loans Guide",
  description: "Complete guide to CSBFP government-guaranteed loans for Canadian small businesses. Federal loan guarantee program offering up to $1M with 85% government backing for equipment and real property.",
  keywords: "CSBFP government guaranteed loans, Canada Small Business Financing Program, government backed business loans Canada, federal SME loan guarantee, ISED small business financing",
  openGraph: {
    title: "CSBFP Canada Small Business Financing Program 2026 | Government Guaranteed Loans",
    description: "Comprehensive guide to CSBFP federal loan guarantee program with up to $1M in government-backed financing for Canadian small businesses.",
    url: "https://www.fsidigital.ca/blog/csbfp-canada-small-business-financing-program-government-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function CSBFPGovernmentGrantsBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏛️ Federal Loan Guarantee Program
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Small Business Financing Program (CSBFP)
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Canada's flagship government-guaranteed lending program providing up to $1M in federally-backed 
                financing for small business equipment and real property. Complete guide to CSBFP federal loan guarantees, 
                government compliance requirements, and strategic integration with other federal SME programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=csbfp">
                    Check CSBFP Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/government-grants">
                    Back to Government Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Program Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$1M</div>
                  <div className="text-gray-600">Max CSBFP Financing</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                  <div className="text-gray-600">Government Guarantee</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">53,000+</div>
                  <div className="text-gray-600">Loans Approved (10 Years)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$10B</div>
                  <div className="text-gray-600">Total Financing Delivered</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">CSBFP as Federal Risk-Sharing Policy Tool</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Canada Small Business Financing Program represents the federal government's primary mechanism 
                  for addressing market failures in small business lending. Administered by Innovation, Science & 
                  Economic Development Canada (ISED), CSBFP operates as a risk-sharing partnership between the 
                  Government of Canada and approved financial institutions, providing loan guarantees that enable 
                  access to capital for businesses that might otherwise be declined.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Federal Policy Objectives</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Increase SME access to debt financing</li>
                      <li>• Support business asset acquisition and modernization</li>
                      <li>• Enable productivity improvements through equipment</li>
                      <li>• Facilitate business expansion and job creation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">Government Risk Management</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• 85% federal guarantee on approved loans</li>
                      <li>• Shared risk model with financial institutions</li>
                      <li>• Comprehensive eligibility and security requirements</li>
                      <li>• Claims management and loss mitigation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CSBFP Federal Program Structure */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">CSBFP Federal Program Structure</h2>
              
              <div className="space-y-8">
                {/* Federal Loan Guarantee Framework */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Federal Loan Guarantee Framework</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $1M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Percent className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>85% Guarantee</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Asset-Backed</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      CSBFP operates under the Canada Small Business Financing Act, providing federal loan guarantees 
                      to approved financial institutions for qualifying small business loans.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Government Guarantee Coverage:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 85% federal guarantee on loan principal</li>
                          <li>• Claims paid to lenders on defaulted loans</li>
                          <li>• Government risk assessment and monitoring</li>
                          <li>• Federal Administration Act compliance</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Asset Categories:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Real property (land and buildings) - up to $500K</li>
                          <li>• Equipment and machinery - up to $350K</li>
                          <li>• Leasehold improvements - up to $350K</li>
                          <li>• Working capital (line of credit) - up to $150K</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Federal Eligibility Requirements */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Federal Eligibility and Compliance Requirements</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$10M Revenue</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Canadian Business</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>For-Profit Entity</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal eligibility requirements ensure CSBFP serves its intended policy objectives of 
                      supporting qualifying Canadian small businesses.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Government Business Criteria:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Canadian incorporation or registration required</li>
                          <li>• Physical place of business in Canada</li>
                          <li>• Gross annual revenues $10M or less</li>
                          <li>• For-profit business entity (since 2021: includes NPOs)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Federal Restrictions:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Farming and agricultural operations excluded</li>
                          <li>• Independent small business test required</li>
                          <li>• Related borrower aggregate limits apply</li>
                          <li>• Asset-based lending focus maintained</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Government-Approved Lender Network */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Government-Approved Lender Network</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>200+ Lenders</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>National Coverage</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>ISED Approved</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      CSBFP operates through a network of government-approved lenders who are authorized to 
                      make loans under the federal guarantee program.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Approved Lender Types:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Chartered banks (Big 6 + regional banks)</li>
                          <li>• Credit unions and caisses populaires</li>
                          <li>• Alternative lenders (ISED approved)</li>
                          <li>• Specialized asset-based lenders</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Lender Responsibilities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Credit decision and underwriting</li>
                          <li>• Loan registration with ISED</li>
                          <li>• Security documentation and filing</li>
                          <li>• Loan administration and collection</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Federal Security and Documentation */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <FileText className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Federal Security and Documentation Requirements</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>First Charge</strong></span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Valid Security</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Enforceable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal regulations require comprehensive security documentation to protect government 
                      guarantee interests and ensure loan recoverability.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Primary Security Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• First charge on financed assets</li>
                          <li>• Valid provincial security registrations</li>
                          <li>• Enforceable security agreements</li>
                          <li>• Proper asset identification and description</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Additional Federal Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Personal guarantees (at lender discretion)</li>
                          <li>• General Security Agreement for certain assets</li>
                          <li>• Insurance and environmental compliance</li>
                          <li>• Government registration and reporting</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Policy Integration */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">CSBFP Federal Policy Integration</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-700">🏛️ Federal SME Policy Alignment:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Small Business Strategy:</strong> Core component of federal SME support ecosystem</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Economic Recovery:</strong> Critical financing during economic downturns</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Productivity Enhancement:</strong> Equipment financing for modernization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Regional Development:</strong> Support for businesses across all regions</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">🔗 Complementary Federal Programs:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>IRAP Coordination:</strong> Equipment financing for R&D commercialization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Export Development:</strong> Asset base for international expansion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Regional Agencies:</strong> Coordinated delivery through RDAs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>BDC Collaboration:</strong> Complementary financing solutions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">CSBFP Federal Application Process</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Federal Eligibility Verification</h4>
                    <p className="text-gray-600">Confirm business meets CSBFP federal criteria: Canadian incorporation, under $10M revenue, for-profit operation, and asset-based financing needs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Approved Lender Selection and Application</h4>
                    <p className="text-gray-600">Choose from 200+ government-approved CSBFP lenders and submit loan application with business plan, financial statements, and asset documentation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Lender Credit Decision and Security Setup</h4>
                    <p className="text-gray-600">Lender conducts credit assessment and establishes required federal security documentation including first charge on financed assets.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Federal Registration and Guarantee Activation</h4>
                    <p className="text-gray-600">Approved loans registered with ISED, activating 85% federal guarantee coverage and enabling loan disbursement.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Ongoing Federal Compliance and Monitoring</h4>
                    <p className="text-gray-600">Maintain compliance with federal program requirements, security obligations, and reporting standards throughout loan term.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">CSBFP Federal Application Success Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Government Program Success Factors:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Asset-Based Focus:</strong> Clearly identify specific equipment or property to be financed</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Federal Compliance:</strong> Ensure all eligibility criteria and documentation requirements met</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Security Preparation:</strong> Understand security requirements and asset valuation needs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Lender Relationship:</strong> Build strong relationship with approved CSBFP lender</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Federal Application Mistakes:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Ineligible Asset Financing:</strong> Attempting to finance working capital beyond program limits</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Revenue Misrepresentation:</strong> Not accurately reporting gross annual revenues</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Security Documentation Gaps:</strong> Inadequate or improperly filed security agreements</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Related Borrower Issues:</strong> Not accounting for aggregate exposure limits</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access CSBFP Government-Guaranteed Financing?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get the complete CSBFP federal application guide or work with our government financing specialists 
                who have secured $25M+ in CSBFP approvals with deep federal program expertise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Get Application Guide CTA */}
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Approach</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our comprehensive CSBFP government financing guide with federal compliance templates and lender selection strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-csbfp-government-financing">
                      <Download className="w-4 h-4 mr-2" />
                      Get CSBFP Government Guide
                    </Link>
                  </Button>
                </div>

                {/* Get Expert Help CTA */}
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Assistance</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with federal financing specialists who have secured $25M+ in CSBFP approvals with 92% success rate and deep lender relationships.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=csbfp-government-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-blue-200 text-sm mt-6">
                92% success rate for CSBFP applications • Average financing secured: $285K • Federal program expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
