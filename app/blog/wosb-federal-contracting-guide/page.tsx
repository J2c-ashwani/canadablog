import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Crown, Building, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "WOSB Federal Contracting Guide 2026 | Women-Owned Small Business Certification",
  description: "Complete guide to WOSB and EDWOSB certification for federal contracting. Learn how women-owned businesses can access $2M+ government contracts.",
  keywords: "WOSB certification, women owned small business, federal contracting, EDWOSB, government contracts women, SBA certification",
  openGraph: {
    title: "WOSB Federal Contracting Guide 2026 | Women-Owned Small Business Certification",
    description: "Complete guide to WOSB certification and federal contracting opportunities for women-owned businesses.",
    url: "https://www.fsidigital.ca/blog/wosb-federal-contracting-guide",
  },
}

export default function WOSBFederalContractingGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                👑 WOSB Contracting Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                WOSB Federal Contracting Complete Guide
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Everything you need to know about Women-Owned Small Business certification and accessing federal contracting opportunities worth billions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                  Start WOSB Certification
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/usa/women-entrepreneurs-grants">
                    Back to Women's Grants
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
                <div className="text-3xl font-bold text-purple-600 mb-2">5%</div>
                <div className="text-gray-600">Federal Contract Goal</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">$25B+</div>
                <div className="text-gray-600">WOSB Contracts Awarded 2024</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">83%</div>
                <div className="text-gray-600">Set-Aside Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">$2M+</div>
                <div className="text-gray-600">Average Contract Value</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* What is WOSB */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is WOSB Certification?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Women-Owned Small Business (WOSB) certification is a federal program that provides women entrepreneurs with greater
                  access to federal contracting opportunities. The program includes both WOSB and Economically Disadvantaged
                  Women-Owned Small Business (EDWOSB) certifications.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-purple-800">WOSB Benefits</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Access to set-aside contracts</li>
                      <li>• Priority in competitive bidding</li>
                      <li>• Sole-source contract opportunities</li>
                      <li>• Government buyer networking</li>
                    </ul>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-indigo-800">Federal Goal</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• 5% of all federal contracts to women-owned businesses</li>
                      <li>• Over $600 billion in federal procurement annually</li>
                      <li>• Growing opportunities in all industries</li>
                      <li>• Strong government commitment to women's businesses</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* WOSB vs EDWOSB */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WOSB vs EDWOSB Certification</h2>

                <div className="space-y-8">
                  {/* WOSB Certification */}
                  <Card className="border-purple-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Crown className="w-6 h-6 text-purple-600 mr-3" />
                        <CardTitle className="text-purple-700">WOSB - Women-Owned Small Business</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Ownership:</strong> 51%+ Women</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Control:</strong> Day-to-Day Management</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Income Limit:</strong> None</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Standard certification for women-owned businesses. Provides access to WOSB set-aside contracts
                        in all industries where women are underrepresented.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Eligible Industries (Set-Asides):</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Professional services</li>
                            <li>• Information technology</li>
                            <li>• Construction services</li>
                            <li>• Administrative support</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Requirements:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 51% women ownership</li>
                            <li>• Women control management</li>
                            <li>• Small business size standards</li>
                            <li>• Good character requirements</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* EDWOSB Certification */}
                  <Card className="border-indigo-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Shield className="w-6 h-6 text-indigo-600 mr-3" />
                        <CardTitle className="text-indigo-700">EDWOSB - Economically Disadvantaged WOSB</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-indigo-600 mr-2" />
                          <span><strong>Ownership:</strong> 51%+ Women</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Net Worth:</strong> &lt;$750K</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Income:</strong> 3-Year Average &lt;$350K</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Enhanced certification for economically disadvantaged women-owned businesses. Provides access to both
                        WOSB and EDWOSB set-aside contracts with additional opportunities.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Additional Benefits:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Access to all WOSB set-asides</li>
                            <li>• EDWOSB-specific opportunities</li>
                            <li>• Sole-source contracts up to $4M</li>
                            <li>• Priority in competitive selections</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Economic Disadvantage Criteria:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Personal net worth &lt;$750,000</li>
                            <li>• Adjusted gross income &lt;$350,000</li>
                            <li>• Fair market value of assets &lt;$6M</li>
                            <li>• Must demonstrate economic disadvantage</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sole Source vs Set-Aside Deep Dive */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8 border-l-4 border-indigo-500">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The "Golden Ticket": Sole Source vs. Set-Asides</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Understanding the difference between these two contract types is critical for your strategy.
                  One requires you to compete; the other can be handed to you directly.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-purple-700 mb-3">Competitive Set-Asides</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      The government "sets aside" a contract so that <strong>only WOSBs can bid</strong>.
                      You still have to write a proposal and compete, but you are only competing against other women-owned firms, not huge corporations.
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-bold text-sm text-purple-900 mb-2">The "Rule of Two"</h4>
                      <p className="text-xs text-gray-700">
                        Contracting Officers (COs) will typically create a set-aside if they have a "reasonable expectation" that at least <strong>two</strong> capable WOSBs will submit offers at fair market prices.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-indigo-700 mb-3">Sole Source Awards (No Bid)</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      The "Holy Grail" of contracting. A CO can award a contract <strong>directly to you</strong> without a competitive bidding process if certain conditions are met.
                    </p>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-bold text-sm text-indigo-900 mb-2">Sole Source Conditions</h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Value is under $4.5M ($7M for manufacturing).</li>
                        <li>• Only <strong>ONE</strong> capable WOSB/EDWOSB can be identified.</li>
                        <li>• Used often when you build a relationship with an agency first.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Certification Gauntlet: Step-by-Step */}
              <section className="py-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The "Gauntlet": Navigating certify.sba.gov</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="grid md:grid-cols-4 border-b border-gray-100">
                    <div className="p-6 border-r border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 mb-3">1</div>
                      <h4 className="font-bold text-gray-900 mb-1">SAM.gov</h4>
                      <p className="text-xs text-gray-500">You MUST be active in SAM.gov first. This takes 2+ weeks. Do not start SBA app until this is "Active".</p>
                    </div>
                    <div className="p-6 border-r border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 mb-3">2</div>
                      <h4 className="font-bold text-gray-900 mb-1">Claim WOSB</h4>
                      <p className="text-xs text-gray-500">Log into certify.sba.gov. It will pull your data from SAM. You must "Claim" your business here.</p>
                    </div>
                    <div className="p-6 border-r border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600 mb-3">3</div>
                      <h4 className="font-bold text-gray-900 mb-1">Upload Docs</h4>
                      <p className="text-xs text-gray-500">Upload ownership proofs (LLC agreement, stock ledger). This is where 50% of applicants get rejected for incompleteness.</p>
                    </div>
                    <div className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600 mb-3">4</div>
                      <h4 className="font-bold text-gray-900 mb-1">The Wait</h4>
                      <p className="text-xs text-gray-500">SBA review takes 90 days. If they ask a question, answer within 2 days or they may close your file!</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Certification Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WOSB Certification Process</h2>

                <div className="space-y-6">
                  <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-700">Step 1: Determine Eligibility</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">
                        Verify your business meets all WOSB requirements before starting the application process.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Business must be at least 51% owned by women</li>
                        <li>• Women must control day-to-day management</li>
                        <li>• Must qualify as small business in primary industry</li>
                        <li>• Women owners must be U.S. citizens</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-200">
                    <CardHeader>
                      <CardTitle className="text-teal-700">Step 2: Gather Required Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">
                        Collect all necessary documentation to support your certification application.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Ownership Documents:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Articles of incorporation</li>
                            <li>• Operating agreement/bylaws</li>
                            <li>• Stock certificates</li>
                            <li>• Ownership transfer documents</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Financial Documents:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Personal financial statements</li>
                            <li>• Business tax returns (3 years)</li>
                            <li>• Personal tax returns (3 years)</li>
                            <li>• Bank statements</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Step 3: Choose Certification Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">
                        Select between SBA certification or third-party certifier for your WOSB application.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded">
                          <h5 className="font-semibold mb-2 text-green-800">SBA Certification (Free)</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• No cost</li>
                            <li>• 90-120 day process</li>
                            <li>• Direct SBA review</li>
                            <li>• 3-year certification</li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 p-4 rounded">
                          <h5 className="font-semibold mb-2 text-blue-800">Third-Party Certifier</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• $1,500-3,000 cost</li>
                            <li>• 30-60 day process</li>
                            <li>• Faster processing</li>
                            <li>• Additional support</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contract Opportunities */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Federal Contract Opportunities</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Types of WOSB Contracts:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Set-Aside Contracts:</strong> Reserved exclusively for WOSB businesses</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Sole-Source Contracts:</strong> Direct awards up to $4M (EDWOSB)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Competitive Contracts:</strong> Priority consideration in evaluations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Subcontracting:</strong> Prime contractor subcontracting opportunities</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">🎯 High-Opportunity Industries:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                        <span><strong>Professional Services:</strong> Consulting, management, training</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                        <span><strong>Information Technology:</strong> Software, cybersecurity, data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                        <span><strong>Healthcare Services:</strong> Medical support, research</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                        <span><strong>Construction:</strong> Building, maintenance, engineering</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WOSB Success Strategies</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-blue-800 font-medium">Proven Approach:</p>
                      <p className="text-blue-700 text-sm">
                        Successful WOSB contractors combine certification with strategic business development,
                        relationship building, and capability demonstration.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <h4 className="font-bold text-lg text-purple-600 mb-2">Build Capabilities</h4>
                    <p className="text-sm text-gray-600">Develop strong past performance, certifications, and technical capabilities</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg text-center">
                    <h4 className="font-bold text-lg text-indigo-600 mb-2">Network Actively</h4>
                    <p className="text-sm text-gray-600">Attend industry events, meet contracting officers, build prime relationships</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h4 className="font-bold text-lg text-blue-600 mb-2">Proposal Excellence</h4>
                    <p className="text-sm text-gray-600">Invest in professional proposal writing and competitive pricing strategies</p>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Common WOSB Mistakes to Avoid</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-red-800 font-medium">Important Warning:</p>
                      <p className="text-red-700 text-sm">
                        False certification claims can result in criminal prosecution, civil penalties,
                        and debarment from federal contracting.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Incomplete Documentation</h4>
                      <p className="text-sm text-gray-600">Failing to provide complete ownership, control, and financial documentation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Control Issues</h4>
                      <p className="text-sm text-gray-600">Male spouse or partner having excessive involvement in business operations</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Size Standard Violations</h4>
                      <p className="text-sm text-gray-600">Exceeding small business size standards for your primary industry</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Recertification Lapses</h4>
                      <p className="text-sm text-gray-600">Failing to recertify before your 3-year certification expires</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Study Section */}
              <section className="py-16 bg-slate-50 border-y border-slate-200 my-8 -mx-4 sm:-mx-8 px-4 sm:px-8">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Case Study: TechSolutions Defense (Hypothetical)</h2>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-slate-800 p-8 md:w-1/3 text-white flex flex-col justify-between">
                        <div>
                          <Badge className="bg-blue-500 mb-4">WOSB Certified</Badge>
                          <h3 className="text-2xl font-bold mb-2">The Pivot</h3>
                          <p className="text-slate-300 text-sm">From commercial IT support to Defense Contractor.</p>
                        </div>
                        <div className="mt-8">
                          <div className="text-3xl font-bold text-green-400">$3.2M</div>
                          <div className="text-sm text-slate-400">First Contract Value</div>
                        </div>
                      </div>

                      <div className="p-8 md:w-2/3">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">1. The Opportunity</h4>
                            <p className="text-sm text-gray-600">Founder Sarah noticed a "Sources Sought" notice on SAM.gov for IT helpdesk services at a local Air Force base. The notice specifically asked if WOSBs were capable.</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">2. The Strategy</h4>
                            <p className="text-sm text-gray-600">Sarah replied to the notice with a "Capability Statement" (not a full proposal). She proved she had done similar work for banks. Because she and one other WOSB replied, the Contracting Officer set it aside as a <strong>WOSB Set-Aside</strong>.</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">3. The Win</h4>
                            <p className="text-sm text-gray-600">Competing against only 3 other women-owned firms (instead of IBM or Raytheon), Sarah's lean overhead allowed her to bid competitively. She won the 5-year, $3.2M contract.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* NAICS Code Strategy */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Strategic Tip: NAICS Codes Matter</h3>
                <p className="text-gray-700 mb-4">
                  Everything in federal contracting is driven by NAICS (North American Industry Classification System) codes.
                  SBA designates specific NAICS codes as "underrepresented" for WOSB set-asides.
                </p>
                <div className="bg-white p-4 rounded border border-blue-100">
                  <p className="text-sm text-gray-600">
                    <strong>Action Item:</strong> Go to the SBA WOSB site and check if your primary NAICS code is on the eligible list.
                    If your primary code isn't capable, look for secondary codes where you perform work that ARE eligible.
                    You can have multiple NAICS codes in your SAM profile!
                  </p>
                </div>
              </div>

              {/* Lead-Generating CTA Section */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Get Your FREE WOSB Certification Strategy Session</h3>
                <p className="text-purple-100 mb-6 text-lg">
                  Book a complimentary consultation with our WOSB experts. Get personalized guidance on certification,
                  contract opportunities, and federal contracting success strategies.
                </p>
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-white mb-2">In Your FREE Strategy Session:</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-purple-100">
                    <div>✅ WOSB vs EDWOSB assessment</div>
                    <div>✅ Certification readiness review</div>
                    <div>✅ Contract opportunity analysis</div>
                    <div>✅ Industry targeting strategy</div>
                    <div>✅ Application timeline planning</div>
                    <div>✅ Success roadmap development</div>
                  </div>
                </div>
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/contact?service=wosb-certification-consultation">
                    Book FREE Strategy Session Now
                  </Link>
                </Button>
                <p className="text-purple-200 text-xs mt-3">
                  No obligations. Just expert guidance for your WOSB certification journey.
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
