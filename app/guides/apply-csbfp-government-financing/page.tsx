import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CSBFP Government Financing Application Guide 2025 | Step-by-Step Federal Loan Guarantee Process",
  description: "Complete step-by-step guide to applying for CSBFP government-guaranteed loans. Get federal financing templates, lender selection strategies, and proven application frameworks.",
  keywords: "CSBFP government financing application guide, how to apply CSBFP loans, federal loan guarantee application Canada, CSBFP compliance application process, government guaranteed business loan application guide",
  openGraph: {
    title: "CSBFP Government Financing Application Guide 2025 | Federal Loan Guarantee Process",
    description: "Step-by-step guide with templates and strategies for successful CSBFP government-guaranteed loan applications for Canadian small businesses.",
    url: "https://fsidigital.ca/guides/apply-csbfp-government-financing",
  },
}

export default function CSBFPGovernmentFinancingGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏛️ Federal Loan Guarantee Application Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                CSBFP Government Financing Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for CSBFP government-guaranteed loans. 
                Complete with federal compliance templates, lender selection strategies, and proven government financing frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/download/csbfp-government-financing-kit">
                    <Download className="w-5 h-5 mr-2" />
                    Download CSBFP Government Kit
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/csbfp-canada-small-business-financing-program-government-grants">
                    Back to CSBFP Government Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">4-8 Weeks</div>
                  <div className="text-gray-600">Average Approval Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">12+ Documents</div>
                  <div className="text-gray-600">Federal Compliance Requirements</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
                  <div className="text-gray-600">Success Rate (Expert Prep)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">200+</div>
                  <div className="text-gray-600">Government-Approved Lenders</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CSBFP Government Application Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">CSBFP Government Application Timeline</h2>
              
              <div className="space-y-8">
                {/* Phase 1: Federal Eligibility & Asset Planning */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Phase 1: Federal Eligibility & Asset Planning</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Week 1-2</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">Government Program Eligibility Check:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>Canadian Business:</strong> Federal incorporation or registration required</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>Revenue Test:</strong> Gross annual revenues $10M or less</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>For-Profit Entity:</strong> Commercial business operations</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>Asset-Based Focus:</strong> Equipment, real property, or leasehold improvements</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Federal Financing Categories:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Real property (land/buildings) - up to $500K</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Equipment and machinery - up to $350K</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Leasehold improvements - up to $350K</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Working capital (line of credit) - up to $150K</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-blue-800 font-medium">Federal Asset Planning:</p>
                          <p className="text-blue-700 text-sm">
                            Clearly define the specific assets to be financed and ensure they meet federal CSBFP 
                            eligibility requirements. Government guarantee applies only to approved asset categories.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 2: Government-Approved Lender Selection */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">Phase 2: Government-Approved Lender Selection</CardTitle>
                      <Badge className="bg-green-100 text-green-800">Week 2-3</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">ISED-Approved Lender Categories:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded">
                            <strong>Traditional Financial Institutions:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Big 6 chartered banks (RBC, TD, BMO, Scotia, CIBC, NBC)</li>
                              <li>• Regional and community banks</li>
                              <li>• Credit unions and caisses populaires</li>
                              <li>• Provincial credit union centrals</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded">
                            <strong>Alternative Government-Approved Lenders:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Specialized asset-based lenders</li>
                              <li>• Equipment financing companies</li>
                              <li>• ISED-approved alternative lenders</li>
                              <li>• Regional development financial institutions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">Lender Selection Strategy for Government Program:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Relationship Banking:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Existing banking relationships</li>
                              <li>• Local branch access and service</li>
                              <li>• Business banking expertise</li>
                            </ul>
                          </div>
                          <div>
                            <strong>CSBFP Experience:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• CSBFP loan volume and expertise</li>
                              <li>• Federal program knowledge</li>
                              <li>• Processing efficiency and timing</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Terms & Conditions:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Interest rates and fees</li>
                              <li>• Security and guarantee requirements</li>
                              <li>• Repayment terms and flexibility</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3: Federal Application Preparation */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Phase 3: Federal Application Preparation & Submission</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Week 3-5</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Government Application Documentation:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2">Core Business Documents:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• CSBFP loan application form</li>
                              <li>• Comprehensive business plan</li>
                              <li>• 3 years financial statements (audited preferred)</li>
                              <li>• Current interim financial statements</li>
                              <li>• Personal and business credit reports</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2">Federal Compliance Documentation:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Federal incorporation or registration documents</li>
                              <li>• Revenue verification and tax returns</li>
                              <li>• Asset specifications and quotes</li>
                              <li>• Security and collateral documentation</li>
                              <li>• Environmental and regulatory compliance</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">CSBFP Government Application Submission:</h5>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Lender Review Process:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• Credit assessment and underwriting</li>
                                <li>• Federal eligibility verification</li>
                                <li>• Asset valuation and security review</li>
                                <li>• Risk assessment and pricing</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Federal Registration Process:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• ISED loan registration</li>
                                <li>• Federal guarantee activation</li>
                                <li>• Security documentation filing</li>
                                <li>• Loan disbursement authorization</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 4: Federal Approval & Implementation */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Phase 4: Federal Approval & Loan Implementation</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">Week 5-8</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Government Decision & Security Setup:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Lender Final Approval Process:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Credit committee review and approval</li>
                              <li>• Federal program compliance verification</li>
                              <li>• Loan terms and conditions finalization</li>
                              <li>• Security documentation preparation</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Federal Security Requirements:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• First charge security on financed assets</li>
                              <li>• Provincial security registrations</li>
                              <li>• General Security Agreement (if required)</li>
                              <li>• Personal guarantees (at lender discretion)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">Upon CSBFP Government Approval:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                          <ul className="space-y-1">
                            <li>• Federal loan agreement execution</li>
                            <li>• Security documentation completion</li>
                            <li>• ISED registration and guarantee activation</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>• Loan disbursement and asset acquisition</li>
                            <li>• Ongoing federal compliance obligations</li>
                            <li>• Regular loan servicing and reporting</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Security and Compliance Requirements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Federal Security and Compliance Requirements</h2>
              
              <div className="space-y-6">
                {/* Government Security Framework */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Shield className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle>Federal Security Documentation Framework</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Real Property Security:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Registered mortgage or deed of trust</li>
                          <li>• Title insurance and survey requirements</li>
                          <li>• Environmental assessments and compliance</li>
                          <li>• Property appraisal and valuation</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Equipment Security:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Personal Property Security Act (PPSA) registration</li>
                          <li>• Equipment identification and description</li>
                          <li>• Serial number and specification documentation</li>
                          <li>• Insurance coverage and beneficiary assignments</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Federal Guarantee Protection:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• First charge priority on financed assets</li>
                          <li>• Valid and enforceable security agreements</li>
                          <li>• Proper provincial registrations</li>
                          <li>• Government guarantee coverage verification</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Federal Compliance Obligations */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Building className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle>Ongoing Federal Compliance Obligations</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold mb-2 text-blue-700">Borrower Obligations:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Maintain federal eligibility throughout loan term</li>
                          <li>• Comply with loan agreement terms and conditions</li>
                          <li>• Maintain adequate insurance coverage</li>
                          <li>• Provide annual financial statements to lender</li>
                          <li>• Preserve security and asset integrity</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2 text-green-700">Government Program Compliance:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Asset use restrictions and monitoring</li>
                          <li>• Revenue and business activity reporting</li>
                          <li>• Federal audit and inspection cooperation</li>
                          <li>• Change of control or ownership notifications</li>
                          <li>• Environmental and regulatory compliance</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Government Financing Mistakes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common CSBFP Government Financing Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Federal Application Killers:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Revenue Misrepresentation:</strong>
                        <p className="text-sm text-gray-600">Exceeding $10M gross revenue threshold or misrepresenting business size</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Ineligible Asset Financing:</strong>
                        <p className="text-sm text-gray-600">Attempting to finance working capital beyond federal program limits</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Security Documentation Gaps:</strong>
                        <p className="text-sm text-gray-600">Inadequate or improperly filed provincial security registrations</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Government Process Errors:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Wrong Lender Selection:</strong>
                        <p className="text-sm text-gray-600">Choosing non-approved lenders or those with limited CSBFP experience</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Related Borrower Issues:</strong>
                        <p className="text-sm text-gray-600">Not accounting for aggregate exposure limits across related entities</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Asset Documentation:</strong>
                        <p className="text-sm text-gray-600">Insufficient asset specifications, quotes, or valuation documentation</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CSBFP Government Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">CSBFP Government Financing Success Strategies</h2>
              
              <div className="space-y-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Federal Program Excellence Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Government Eligibility Optimization:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Ensure clear Canadian business status and operations</li>
                          <li>• Accurately calculate and document gross annual revenues</li>
                          <li>• Focus on eligible asset categories and purposes</li>
                          <li>• Maintain proper corporate structure and governance</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Federal Security Preparation:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Obtain comprehensive asset specifications and quotes</li>
                          <li>• Ensure clear asset ownership and title</li>
                          <li>• Prepare for provincial security registrations</li>
                          <li>• Plan for insurance and environmental requirements</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Strategic Lender Relationship Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Maximizing Government-Approved Lender Partnerships:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <ul className="space-y-1">
                              <li>• Research lender CSBFP experience and volume</li>
                              <li>• Understand specific lender requirements and preferences</li>
                              <li>• Build relationship before formal application</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Present complete and professional application package</li>
                              <li>• Demonstrate strong business case and asset need</li>
                              <li>• Show clear repayment capacity and security</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Maintain ongoing communication and transparency</li>
                              <li>• Be responsive to additional information requests</li>
                              <li>• Build long-term banking relationship beyond CSBFP</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Long-term Federal Program Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Multi-Asset Financing Strategy:</strong> Plan sequential CSBFP loans for different asset categories to maximize government-backed financing
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Complementary Government Programs:</strong> Coordinate CSBFP with IRAP, BDC, and other federal business support programs
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Business Growth Planning:</strong> Use CSBFP asset base to qualify for additional conventional financing and growth capital
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Compliance Excellence:</strong> Maintain exemplary federal program compliance to build credibility for future government programs
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
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Need Expert Help with Your CSBFP Government Application?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Maximize your success with federal financing specialists. Our experts have secured 
                over $25M in CSBFP government-guaranteed loans with a 92% success rate and deep lender relationships.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">CSBFP Government Expert Services Include:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>CSBFP government application preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Federal compliance documentation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Government-approved lender matching</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Security documentation and filing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Multi-program federal financing optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Asset acquisition and implementation support</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=csbfp-government-expert-help">
                  Get CSBFP Government Expert Help
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
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
