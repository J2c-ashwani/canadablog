import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp, MessageCircle, HelpCircle, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CSBFP Government Financing Application Guide 2025 | Step-by-Step Federal Loan Guarantee Process",
  description: "Complete step-by-step guide to applying for CSBFP government-guaranteed loans. Get federal financing templates, lender selection strategies, and proven application frameworks for up to $1.15M in financing.",
  keywords: "CSBFP government financing application guide, how to apply CSBFP loans, federal loan guarantee application Canada, CSBFP compliance application process, government guaranteed business loan application guide, Canada Small Business Financing Program",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-csbfp-government-financing",
  },
  openGraph: {
    title: "CSBFP Government Financing Application Guide 2025 | Federal Loan Guarantee Process",
    description: "Step-by-step guide with templates and strategies for successful CSBFP government-guaranteed loan applications for Canadian small businesses.",
    url: "https://www.fsidigital.ca/guides/apply-csbfp-government-financing",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the maximum amount I can borrow under CSBFP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under CSBFP, you can borrow up to $1.15 million: $500,000 for real property (land/buildings), $350,000 for equipment, $350,000 for leasehold improvements, and $150,000 for working capital. Related businesses share these limits."
      }
    },
    {
      "@type": "Question",
      "name": "How long does CSBFP loan approval take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CSBFP loan approval typically takes 4-8 weeks from application to funding. Phase 1 (eligibility review) takes 1-2 weeks, Phase 2 (lender selection) 1-2 weeks, Phase 3 (application/documentation) 2-3 weeks, and Phase 4 (approval/funding) 1-2 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "What are CSBFP eligibility requirements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To qualify for CSBFP: your business must be Canadian and operating for profit, have gross annual revenues of $10 million or less, and use funds for eligible purposes (equipment, real property, leasehold improvements, or working capital). Farming businesses are excluded."
      }
    },
    {
      "@type": "Question",
      "name": "What is the CSBFP registration fee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CSBFP charges a 2% registration fee on the loan amount, payable at loan disbursement. This fee can be financed as part of the loan. There's also an annual administration fee of 1.25% on the outstanding balance."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a personal guarantee for CSBFP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Personal guarantees are at the lender's discretion but are typically required. The federal government limits guarantor exposure to 25% of the original loan amount, which is significantly lower than conventional loans requiring 100% personal guarantees."
      }
    },
    {
      "@type": "Question",
      "name": "Which banks offer CSBFP loans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Over 200 ISED-approved lenders offer CSBFP loans, including all major banks (RBC, TD, BMO, Scotiabank, CIBC, National Bank), credit unions, caisses populaires, and some specialized lenders. Not all branches may be familiar with the program."
      }
    }
  ]
}

export default function CSBFPGovernmentFinancingGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏛️ Federal Loan Guarantee Application Guide 2025
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
                  <Link href="#process">
                    View Application Process
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/csbfp-canada-small-business-financing-program-government-grants">
                    Back to CSBFP Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm/50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
              <span className="font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                Common Questions:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#how-much" className="hover:text-blue-600 transition-colors">How Much?</Link>
                <Link href="#eligibility" className="hover:text-blue-600 transition-colors">Who Qualifies?</Link>
                <Link href="#process" className="hover:text-blue-600 transition-colors">How Long?</Link>
                <Link href="#lenders" className="hover:text-blue-600 transition-colors">Which Banks?</Link>
                <Link href="#faq" className="hover:text-blue-600 transition-colors">FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">4-8 Weeks</div>
                  <div className="text-gray-600">Average Approval Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$1.15M</div>
                  <div className="text-gray-600">Maximum Financing Available</div>
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

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* What is CSBFP */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is the CSBFP program?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  The Canada Small Business Financing Program (CSBFP) is a federal loan guarantee program that helps small
                  businesses access financing they might not otherwise qualify for. The government guarantees up to 85% of the
                  loan to approved lenders, reducing risk and making financing more accessible.
                </p>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Shield className="w-8 h-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Why CSBFP Matters</h4>
                      <p className="text-blue-800 leading-relaxed">
                        Unlike conventional loans, CSBFP offers lower personal guarantee requirements (25% cap vs 100%),
                        competitive interest rates (prime + 3% max), and access to financing for businesses that might be
                        declined by traditional lending criteria.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 id="how-much" className="text-xl font-bold text-gray-900 mb-4">Maximum Financing Amounts</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Real Property</h4>
                      <Badge className="bg-blue-100 text-blue-800">Up to $500K</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Land, buildings, commercial properties</p>
                  </div>
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Equipment</h4>
                      <Badge className="bg-green-100 text-green-800">Up to $350K</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Machinery, vehicles, technology</p>
                  </div>
                  <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Leasehold Improvements</h4>
                      <Badge className="bg-purple-100 text-purple-800">Up to $350K</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Renovations, tenant improvements, buildout</p>
                  </div>
                  <div className="border border-orange-200 rounded-lg p-4 bg-orange-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Working Capital</h4>
                      <Badge className="bg-orange-100 text-orange-800">Up to $150K</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Line of credit for operations (NEW in 2023)</p>
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <div id="eligibility" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who qualifies for CSBFP loans?</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-bold text-green-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Eligible Businesses
                    </h4>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Canadian for-profit business</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Gross revenues ≤ $10M annually</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Startups and new businesses welcome</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Most industries and sectors</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Business acquisitions</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Franchise purchases</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-bold text-red-800 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Not Eligible
                    </h4>
                    <ul className="text-red-700 space-y-2 text-sm">
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Farming operations</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Religious/charitable organizations</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Businesses over $10M revenue</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Government-owned entities</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Financing for working capital above $150K</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Inventory or accounts receivable</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-yellow-800 mb-2">💡 Related Businesses Rule</h4>
                      <p className="text-yellow-700 text-sm">
                        If you own multiple businesses or have related entities, the combined outstanding CSBFP loans
                        cannot exceed the program maximums. Plan your financing strategy across all related companies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Process Timeline */}
              <div id="process" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">CSBFP Application Timeline</h2>

                <div className="space-y-8">
                  {/* Phase 1 */}
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
                              <span><strong>Canadian Business:</strong> Federal incorporation or registration</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                              <span><strong>Revenue Test:</strong> Gross annual revenues $10M or less</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                              <span><strong>For-Profit Entity:</strong> Commercial business operations</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Asset Planning:</h5>
                          <ul className="text-sm space-y-2">
                            <li className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                              Define specific assets to be financed
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                              Obtain vendor quotes and specifications
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                              Calculate total financing requirement
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phase 2 */}
                  <Card id="lenders" className="border-green-200">
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
                                <li>• Big 6 Banks (RBC, TD, BMO, Scotia, CIBC, NBC)</li>
                                <li>• Regional and community banks</li>
                                <li>• Credit unions and caisses populaires</li>
                              </ul>
                            </div>
                            <div className="bg-green-50 p-4 rounded">
                              <strong>Alternative Approved Lenders:</strong>
                              <ul className="text-sm mt-2 space-y-1">
                                <li>• Specialized asset-based lenders</li>
                                <li>• Equipment financing companies</li>
                                <li>• Regional development institutions</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phase 3 */}
                  <Card className="border-purple-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-purple-700">Phase 3: Application Preparation & Submission</CardTitle>
                        <Badge className="bg-purple-100 text-purple-800">Week 3-5</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="font-medium mb-2">Core Business Documents:</h6>
                          <ul className="text-sm space-y-1">
                            <li>• CSBFP loan application form</li>
                            <li>• Comprehensive business plan</li>
                            <li>• 3 years financial statements</li>
                            <li>• Current interim financials</li>
                            <li>• Credit reports (personal & business)</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium mb-2">Federal Compliance Documentation:</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Incorporation/registration documents</li>
                            <li>• Revenue verification and tax returns</li>
                            <li>• Asset specifications and quotes</li>
                            <li>• Security and collateral documentation</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phase 4 */}
                  <Card className="border-orange-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-orange-700">Phase 4: Federal Approval & Loan Implementation</CardTitle>
                        <Badge className="bg-orange-100 text-orange-800">Week 5-8</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">Upon CSBFP Approval:</h5>
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
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What mistakes cause CSBFP rejections?</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Application Killers:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Revenue Misrepresentation:</strong>
                          <p className="text-sm text-gray-600">Exceeding $10M threshold or misrepresenting size</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Ineligible Asset Financing:</strong>
                          <p className="text-sm text-gray-600">Using funds for inventory or A/R instead of assets</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Business Plan:</strong>
                          <p className="text-sm text-gray-600">No clear repayment strategy or cash flow projections</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Process Errors:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Wrong Lender Selection:</strong>
                          <p className="text-sm text-gray-600">Choosing lenders with limited CSBFP experience</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Related Borrower Issues:</strong>
                          <p className="text-sm text-gray-600">Not accounting for aggregate limits across entities</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                        <div>
                          <strong>Incomplete Documentation:</strong>
                          <p className="text-sm text-gray-600">Missing tax returns, quotes, or financial statements</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div id="faq" className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Can I use CSBFP to refinance existing debt?</h3>
                    <p className="text-gray-600">No. CSBFP loans cannot be used to refinance existing debt. Funds must be used for new asset acquisitions, leasehold improvements, or working capital needs. However, you can use conventional financing to refinance and free up capacity for CSBFP.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">What interest rate can I expect?</h3>
                    <p className="text-gray-600">CSBFP loans are capped at prime + 3% for floating rate loans or the single-family residential mortgage rate + 3% for fixed rate loans. Your actual rate depends on the lender and your creditworthiness.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Can startups with no revenue apply?</h3>
                    <p className="text-gray-600">Yes! CSBFP is specifically designed to help startups access financing. You'll need a strong business plan, personal credit history, and potentially additional security, but no minimum revenue is required.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">How is the 2% registration fee paid?</h3>
                    <p className="text-gray-600">The 2% registration fee can be added to your loan amount or paid upfront at disbursement. Most borrowers choose to finance it, spreading the cost over the loan term.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Can I have multiple CSBFP loans?</h3>
                    <p className="text-gray-600">Yes, you can have multiple CSBFP loans as long as total outstanding balances don't exceed program maximums. This is useful for financing different asset categories at different times.</p>
                  </div>
                </div>
              </div>

              {/* Neural Network: Related Guides */}
              <div className="border-t border-gray-200 pt-12 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding Guides</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/guides/irap-innovation-application-guide" className="group block">
                    <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-blue-600 font-semibold mb-2">Innovation Grants</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">IRAP Application Guide</h4>
                      <p className="text-sm text-gray-500">Federal R&D funding up to $1M for innovation.</p>
                    </div>
                  </Link>
                  <Link href="/guides/sred-application-guide" className="group block">
                    <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-green-600 font-semibold mb-2">Tax Credits</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">SR&ED Application Guide</h4>
                      <p className="text-sm text-gray-500">R&D tax credits for eligible development work.</p>
                    </div>
                  </Link>
                  <Link href="/guides/apply-ontario-business-grants" className="group block">
                    <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-purple-600 font-semibold mb-2">Provincial Grants</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">Ontario Business Grants</h4>
                      <p className="text-sm text-gray-500">Provincial funding programs for Ontario businesses.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Official CSBFP Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <h5 className="font-semibold">ISED CSBFP Portal</h5>
                        <p className="text-sm text-gray-600">Official program information</p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href="https://ised-isde.canada.ca/site/canada-small-business-financing-program/en" target="_blank" rel="noopener noreferrer">
                          Visit <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <h5 className="font-semibold">Find CSBFP Lenders</h5>
                        <p className="text-sm text-gray-600">Search approved financial institutions</p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href="https://ised-isde.canada.ca/site/canada-small-business-financing-program/en/lenders" target="_blank" rel="noopener noreferrer">
                          Visit <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <h5 className="font-semibold">Program Guidelines</h5>
                        <p className="text-sm text-gray-600">Eligibility and requirements</p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href="https://ised-isde.canada.ca/site/canada-small-business-financing-program/en/applying-csbfp-loan" target="_blank" rel="noopener noreferrer">
                          Visit <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <h5 className="font-semibold">BDC Financing</h5>
                        <p className="text-sm text-gray-600">Complementary federal financing</p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href="https://www.bdc.ca/" target="_blank" rel="noopener noreferrer">
                          Visit <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help with Your CSBFP Application?</h3>
                <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                  Our federal financing specialists have secured over $25M in CSBFP loans with a 92% success rate.
                  Get expert guidance on lender selection, documentation, and application strategy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 font-semibold" asChild>
                    <Link href="/contact?service=csbfp-government-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                    <Link href="/grant-finder">
                      Browse All Programs
                    </Link>
                  </Button>
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
