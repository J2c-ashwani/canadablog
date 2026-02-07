import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, HelpCircle, MessageCircle, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Complete CSBFP Application Guide 2025 | Step-by-Step Process",
  description: "Step-by-step guide to applying for Canada Small Business Financing Program loans. Get templates, checklists, and expert strategies for CSBFP success.",
  keywords: "CSBFP application guide, how to apply CSBFP, Canada Small Business Financing Program application, CSBFP loan process, business loan checklist",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-csbfp-loans",
  },
  openGraph: {
    title: "Complete CSBFP Application Guide 2025 | Step-by-Step Process",
    description: "Step-by-step guide with templates and strategies for successful CSBFP loan applications for Canadian small businesses.",
    url: "https://www.fsidigital.ca/guides/apply-csbfp-loans",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What documents do I need for a CSBFP loan application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You typically need a detailed business plan, 2-3 years of financial statements (or opening balance sheet for startups), cash flow projections (12-24 months), personal financial statements for all guarantors, equipment quotes, and lease agreements."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to get a CSBFP loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The entire process usually takes 4-8 weeks. Preparation takes 1-2 weeks, lender review takes 2-3 weeks, and final approval and funding take another 1-2 weeks. Delays often occur due to incomplete documentation."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use CSBFP for working capital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, as of July 2022, you can use CSBFP for working capital costs (up to $150,000), such as inventory, marketing, and operational expenses, in addition to the standard equipment and real property financing."
      }
    },
    {
      "@type": "Question",
      "name": "Do I apply to the government or a bank?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You apply directly to a financial institution (bank, credit union, or caisse populaire), NOT the government. The bank makes the lending decision, and the government simply guarantees the loan to reduce the bank's risk."
      }
    },
    {
      "@type": "Question",
      "name": "What if my CSBFP application is rejected?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If rejected, ask the lender for specific reasons. Common reasons include weak cash flow, poor personal credit, or ineligible assets. You can re-apply with a different lender or improve your application based on the feedback."
      }
    }
  ]
}

export default function CSBFPApplicationGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
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
                Complete with templates, checklists, and proven strategies to secure up to $1.15M.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="#checklist">
                    View Document Checklist
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-green-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/csbfp-canada-small-business-financing-program">
                    Back to CSBFP Overview
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
                <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
                Jump to:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#checklist" className="hover:text-green-600 transition-colors">Document Checklist</Link>
                <Link href="#timeline" className="hover:text-green-600 transition-colors">Timeline</Link>
                <Link href="#mistakes" className="hover:text-green-600 transition-colors">Common Mistakes</Link>
                <Link href="#strategies" className="hover:text-green-600 transition-colors">Success Strategies</Link>
                <Link href="#faq" className="hover:text-green-600 transition-colors">FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">4-8 Weeks</div>
                  <div className="text-gray-600">Average Processing Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">12 Documents</div>
                  <div className="text-gray-600">Typically Required</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-gray-600">Approval Rate (Prepared Apps)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">2%</div>
                  <div className="text-gray-600">Registration Fee (Financed)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Timeline */}
        <section id="timeline" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">CSBFP Application Timeline</h2>

              <div className="space-y-8">
                {/* Week 1-2: Preparation */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">Week 1-2: Document Preparation</CardTitle>
                      <Badge className="bg-green-100 text-green-800">Foundation</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">Financial Documents:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Business financial statements (2-3 years)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Personal financial statements (guarantors)</span>
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
                            <span>Detailed Business Plan</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Formal equipment quotes</span>
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
                      <Badge className="bg-blue-100 text-blue-800">Strategy</Badge>
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
                              <li>• RBC, TD, BMO, CIBC</li>
                              <li>• High volume processors</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Credit Unions:</strong>
                            <ul className="mt-2 space-y-1">
                              <li>• Local decision making</li>
                              <li>• Often more flexible</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Process:</strong>
                            <ul className="mt-2 space-y-1">
                              <li>• Meet 2-3 lenders</li>
                              <li>• Compare service levels</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Week 5-6: Application Submission */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Week 5-6: Submission & Review</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Review</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">The Review Process:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <Clock className="w-4 h-4 text-purple-500 mr-2" />
                            <span><strong>Initial Screen (3-5 days):</strong> Credit checks & basic eligibility</span>
                          </li>
                          <li className="flex items-center">
                            <FileText className="w-4 h-4 text-purple-500 mr-2" />
                            <span><strong>Deep Dive (5-7 days):</strong> Financial analysis & risk assessment</span>
                          </li>
                          <li className="flex items-center">
                            <Target className="w-4 h-4 text-purple-500 mr-2" />
                            <span><strong>Adjudication (3-5 days):</strong> Final credit committee decision</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                          <div>
                            <p className="text-yellow-800 font-medium">Critical Success Factor:</p>
                            <p className="text-yellow-700 text-sm">
                              Lenders focus heavily on <strong>Debt Service Coverage Ratio (DSCR)</strong>.
                              Ensure your projections show you have at least $1.25 in cash flow for every $1.00 of debt payment.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Week 7-8: Approval & Funding */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Week 7-8: Approval & Funding</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">Closing</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h5 className="font-semibold text-green-800 mb-2">Closing Steps:</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Sign Letter of Offer covering rates, terms, and security</li>
                        <li>• Provide proof of asset purchase (invoices)</li>
                        <li>• Pay 2% registration fee (usually deducted from loan)</li>
                        <li>• Funds disbursed directly to vendor or borrower</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Document Checklist */}
        <section id="checklist" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete Document Checklist</h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-green-600" />
                      Personal Documents (All Guarantors)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-sm">Personal Net Worth Statement (Form 4 or bank equivalent)</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-sm">Last 2-3 years Personal Tax Returns (T1 General)</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-sm">Notice of Assessments (NOAs)</span>
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-sm">Government Photo ID (Driver's License/Passport)</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-sm">Resume / Curriculum Vitae (CV)</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="w-5 h-5 mr-2 text-blue-600" />
                      Business Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-500 mr-3" />
                          <span className="text-sm">Articles of Incorporation / Master Business License</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-500 mr-3" />
                          <span className="text-sm">Business Plan (Executive Summary, Operations, Market)</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-500 mr-3" />
                          <span className="text-sm">HST/GST Registration Number</span>
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-500 mr-3" />
                          <span className="text-sm">Agreements (Partnership, Shareholder, Franchise)</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-500 mr-3" />
                          <span className="text-sm">Current Month-End Interim Financials</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-purple-600" />
                      Project-Specific Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2 text-sm text-gray-700">Equipment Loans:</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Official Vendor Quotes</li>
                          <li>• Purchase Agreements</li>
                          <li>• Equipment Specs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-sm text-gray-700">Leasehold Improvements:</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Contractor Estimates</li>
                          <li>• Signed Lease Agreement</li>
                          <li>• Landlord Consent Form</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-sm text-gray-700">Real Property:</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Offer to Purchase</li>
                          <li>• Property Appraisal</li>
                          <li>• Environmental Audit (Phase 1)</li>
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
        <section id="mistakes" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Avoid These Application Killers</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Top Rejection Reasons:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Cash Flow Projections:</strong>
                        <p className="text-sm text-gray-600">Failing to show exactly how the business generates enough cash to pay the loan monthly.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Ineligible Use of Funds:</strong>
                        <p className="text-sm text-gray-600">Trying to finance inventory, goodwill, or operating losses (exceeding working capital limits).</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Lack of "Skin in the Game":</strong>
                        <p className="text-sm text-gray-600">Banks want to see owner equity. 10-15% is mandatory, but 20-30% strengthens the deal significantly.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Process Blunders:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Shopping Too Aggressively:</strong>
                        <p className="text-sm text-gray-600">Applying to 5 banks simultaneously hurts your credit score. Pick 1-2 targets.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Ignoring Personal Credit:</strong>
                        <p className="text-sm text-gray-600">Even with a government guarantee, personal credit scores of guarantors matter. Fix errors before applying.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Incomplete Packages:</strong>
                        <p className="text-sm text-gray-600">Submitting documents "dribble style" annoys bankers and delays processing.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-green-600 mr-2" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">Do I need a lawyer for a CSBFP loan?</h3>
                  <p className="text-gray-600">Usually, yes. While not strictly mandatory for the application, a lawyer is often required for closing, especially for security registration (GSA) and real property transactions. Legal costs are an eligible expense.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">Can I pay off the loan early?</h3>
                  <p className="text-gray-600">Yes, CSBFP loans can be prepaid at any time without penalty. This is a significant advantage over many commercial loans which have breakage fees.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">What happens if I default?</h3>
                  <p className="text-gray-600">The bank will attempt to recover funds from business assets first. If insufficient, they may call on the personal guarantee (limited to 25% of the original loan). The government covers 85% of the bank's remaining loss.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">Is the interest rate fixed or floating?</h3>
                  <p className="text-gray-600">It can be either. Floating rates are capped at Prime + 3%. Fixed rates are capped at the Residential Mortgage Rate + 3%. Discuss with your lender what makes sense for your cash flow.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding Guides</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-csbfp-government-financing" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Program Overview</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">CSBFP Program Guide</h4>
                    <p className="text-sm text-gray-500 flex-grow">Deep dive into eligibility, loan limits, and program structure.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-small-business-grants" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Free Money</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">Small Business Grants</h4>
                    <p className="text-sm text-gray-500 flex-grow">Don't pay it back. Guide to federal and provincial grant programs.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/startup-funding-canada" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Startups</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">Startup Funding Guide</h4>
                    <p className="text-sm text-gray-500 flex-grow">Angel investors, VCs, and incubators for high-growth startups.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Get Expert Help CTA */}
        <section id="strategies" className="py-20 bg-gradient-to-r from-green-600 to-teal-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Need Help Preparing Your CSBFP Application?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Don't risk rejection due to paperwork errors. Our specialists have secured
                over $50M in CSBFP funding.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
                <h4 className="font-semibold text-white mb-4 text-center">Our Application Support Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-green-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Business Plan Review & Edits</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Financial Projection Modeling</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Lender Introductions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Document Package Assembly</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=csbfp-application-support">
                  Get Application Help
                </Link>
              </Button>
              <p className="text-green-200 text-sm mt-4">
                95% approval rate for managed applications.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
