import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Shield, AlertTriangle, Home } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBA Disaster Relief Loans Guide 2026 | Emergency Business Funding",
  description: "Complete guide to SBA disaster relief loans. Learn about physical damage loans, economic injury loans, and how to get up to $2M in emergency business funding.",
  keywords: "SBA disaster loans, disaster relief loans, economic injury disaster loans, emergency business funding, SBA disaster assistance",
  openGraph: {
    title: "SBA Disaster Relief Loans Guide 2026",
    description: "Complete guide to SBA disaster relief loans for emergency business funding and recovery.",
    url: "https://fsidigital.ca/blog/sba-disaster-relief-loans-guide",
  },
}

export default function SBADisasterReliefLoansGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-pink-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🛡️ SBA Disaster Relief Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SBA Disaster Relief Loans Guide
              </h1>
              <p className="text-xl text-red-100 mb-8">
                Complete guide to SBA disaster relief loans for businesses affected by natural disasters
                and economic hardship. Get up to $2M in low-interest emergency funding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100">
                  Start Reading Guide
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/guides/apply-sba-loans">
                    Get Disaster Loan Application Guide
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
                <div className="text-3xl font-bold text-red-600 mb-2">$2M</div>
                <div className="text-gray-600">Maximum Loan Amount</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600 mb-2">4%</div>
                <div className="text-gray-600">Interest Rate (as low as)</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">30</div>
                <div className="text-gray-600">Years Maximum Term</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">60</div>
                <div className="text-gray-600">Days to Apply (after declaration)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* What are SBA Disaster Loans */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are SBA Disaster Relief Loans?</h2>

                <p className="text-lg text-gray-700 mb-6">
                  SBA disaster loans are low-interest loans designed to help businesses, homeowners, and renters
                  recover from declared disasters. These loans provide crucial funding to repair damage, replace
                  destroyed property, and cover economic losses during recovery periods.
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-8 h-8 text-red-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-red-800 mb-2">Emergency Funding Available</h4>
                      <p className="text-red-700">
                        SBA is typically the largest source of federal disaster recovery funds for businesses.
                        Applications must be submitted within specific timeframes after disaster declarations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-700">Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Low interest rates (as low as 4%)</li>
                        <li>• Long repayment terms (up to 30 years)</li>
                        <li>• No prepayment penalties</li>
                        <li>• Refinancing of existing debt allowed</li>
                        <li>• Covers both physical damage & economic loss</li>
                        <li>• Available to businesses of all sizes</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700">Qualifying Disasters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Hurricanes, tornadoes, floods</li>
                        <li>• Earthquakes, wildfires</li>
                        <li>• Severe storms, winter storms</li>
                        <li>• Droughts, volcanic activity</li>
                        <li>• Civil unrest, terrorism</li>
                        <li>• Pandemic-related economic injury</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Types of Disaster Loans */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of SBA Disaster Loans</h2>

                <div className="space-y-8">
                  {/* Physical Disaster Loans */}
                  <Card className="border-red-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Home className="w-6 h-6 text-red-600 mr-3" />
                        <CardTitle className="text-red-700">Physical Disaster Loans</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> Up to $2M</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Terms:</strong> Up to 30 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Rate:</strong> Up to 4% for businesses</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">
                        Loans to repair or replace disaster-damaged property owned by businesses, including
                        real estate, inventories, supplies, machinery, and equipment.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-red-700">Covers:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Building repairs & reconstruction</li>
                            <li>• Equipment replacement</li>
                            <li>• Inventory & supplies</li>
                            <li>• Machinery & fixtures</li>
                            <li>• Improvements to meet current codes</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-red-700">Requirements:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Located in declared disaster area</li>
                            <li>• Suffered uninsured disaster losses</li>
                            <li>• Must have been in operation before disaster</li>
                            <li>• Cannot obtain credit elsewhere</li>
                            <li>• Personal guarantee required</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Economic Injury Disaster Loans */}
                  <Card className="border-orange-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Shield className="w-6 h-6 text-orange-600 mr-3" />
                        <CardTitle className="text-orange-700">Economic Injury Disaster Loans (EIDL)</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> Up to $2M</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Terms:</strong> Up to 30 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Rate:</strong> Up to 4% for businesses</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">
                        Working capital loans to help businesses meet financial obligations and operating
                        expenses that could have been met had the disaster not occurred.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-orange-700">Covers:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Working capital needs</li>
                            <li>• Lost revenue replacement</li>
                            <li>• Operating expenses</li>
                            <li>• Accounts payable</li>
                            <li>• Fixed debts & obligations</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-orange-700">Key Features:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• No physical damage required</li>
                            <li>• Based on economic impact</li>
                            <li>• Cannot duplicate other assistance</li>
                            <li>• Must show substantial economic injury</li>
                            <li>• Available to businesses & nonprofits</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Military Reservist EIDL */}
                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Shield className="w-6 h-6 text-blue-600 mr-3" />
                        <CardTitle className="text-blue-700">Military Reservist Economic Injury Loans</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Amount:</strong> Up to $2M</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Terms:</strong> Up to 30 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Rate:</strong> 4% for businesses</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">
                        Loans for small businesses when an essential employee is called to active military duty,
                        causing economic injury to the business.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Eligibility:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Essential employee called to active duty</li>
                            <li>• Deployment &gt; 90 consecutive days</li>
                            <li>• Business suffers economic injury</li>
                            <li>• Small business criteria met</li>
                            <li>• Cannot obtain credit elsewhere</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Covers:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Working capital shortfall</li>
                            <li>• Operating expenses</li>
                            <li>• Fixed obligations</li>
                            <li>• Temporary employee costs</li>
                            <li>• Lost income replacement</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Disaster Loan Application Process</h2>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Clock className="w-8 h-8 text-red-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-red-800 mb-2">Time-Sensitive Application</h4>
                      <p className="text-red-700 mb-2">
                        Applications must be submitted within specific deadlines:
                      </p>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Physical damage: 60 days after disaster declaration</li>
                        <li>• Economic injury: 9 months after disaster declaration</li>
                        <li>• Late applications may be considered with good cause</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Check Eligibility</h4>
                    <p className="text-sm text-gray-600">
                      Verify you're in a declared disaster area and meet criteria
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Document Losses</h4>
                    <p className="text-sm text-gray-600">
                      Document all disaster-related damages and economic losses
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Apply Online</h4>
                    <p className="text-sm text-gray-600">
                      Submit application through SBA's online portal
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Work with SBA</h4>
                    <p className="text-sm text-gray-600">
                      Respond to SBA requests and complete loan processing
                    </p>
                  </div>
                </div>
              </div>

              {/* Required Documentation */}
              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Documentation</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">📊 Financial Documents:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Tax returns (business & personal)</li>
                      <li>• Financial statements</li>
                      <li>• Profit & loss statements</li>
                      <li>• Balance sheets</li>
                      <li>• Bank statements</li>
                      <li>• Accounts receivable/payable</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">📋 Damage Documentation:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Insurance claim documentation</li>
                      <li>• Repair estimates</li>
                      <li>• Photos of damage</li>
                      <li>• Inventory lists</li>
                      <li>• Equipment appraisals</li>
                      <li>• Legal structure documents</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Success Tips */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Disaster Loan Success Tips</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Apply immediately - don't wait</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Document everything thoroughly</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Work with SBA disaster specialists</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Consider both physical & economic injury loans</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Missing application deadlines</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Inadequate damage documentation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Not including all eligible damages</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Waiting for insurance settlement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-red-600 to-pink-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need SBA Disaster Relief Assistance?</h3>
                <p className="text-red-100 mb-6 text-lg">
                  Get our comprehensive SBA disaster loan application guide with documentation checklists,
                  application strategies, and recovery planning resources.
                </p>
                <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100" asChild>
                  <Link href="/guides/apply-sba-loans">
                    Get Disaster Loan Application Guide
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
