import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Heart, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Entrepreneurship Strategy Guide 2025 | Step-by-Step Female Business Funding",
  description:
    "Complete step-by-step guide to applying for Canada's Women Entrepreneurship Strategy funding. Get WES templates, loan applications, and funding strategies.",
  keywords:
    "women entrepreneurship strategy, WES funding application, female business grants Canada, women entrepreneur loan, Canadian women funding guide",
  openGraph: {
    title: "Women Entrepreneurship Strategy Guide 2025 | Female Business Funding",
    description: "Step-by-step guide with templates and strategies for successful WES funding applications for Canadian women entrepreneurs.",
    url: "https://grantfinder.pro/guides/apply-women-entrepreneurship",
  },
}

export default function WESApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-600 to-pink-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">👩‍💼 Women's Funding Guide</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Women Entrepreneurship Strategy Guide</h1>
              <p className="text-xl md:text-2xl mb-8 text-rose-100 leading-relaxed text-pretty">
                Step-by-step guide to applying for Canada's Women Entrepreneurship Strategy funding. Includes WES templates, loan applications, and funding strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/download/wes-application-kit">
                    <Download className="w-5 h-5 mr-2" />
                    Download WES Kit
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-rose-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/apply-women-entrepreneurship">Back to WES Guide</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-rose-600 mb-2">8-12 Weeks</div>
                  <div className="text-gray-600">Average Review Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">18+ Docs</div>
                  <div className="text-gray-600">Required Documents</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">84%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">No Cost</div>
                  <div className="text-gray-600">Application Fee</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">WES Application Timeline</h2>
              <div className="space-y-8">
                {/* Phase 1 */}
                <Card className="border-rose-200">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-rose-700">Phase 1: Program Selection</CardTitle>
                      <Badge className="bg-rose-100 text-rose-800">Weeks 1-2</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">Select WES Program</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-rose-500" />
                            <span><b>Entrepreneurship Fund:</b> Grants up to $100K</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-rose-500" />
                            <span><b>Entrepreneurship Loan:</b> Loans up to $50K</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-rose-500" />
                            <span><b>BDC Women in Tech:</b> Venture Capital</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-rose-500" />
                            <span><b>Provincial Programs:</b> Regional support</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Verify Ownership</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-rose-500" />
                            <span>51%+ female ownership proof</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-rose-500" />
                            <span>Women in key management</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-rose-500" />
                            <span>Female decision-making role</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-rose-500" />
                            <span>Entrepreneurship focus</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 border border-rose-200 bg-rose-50 rounded-lg p-4">
                      <div className="flex items-start">
                        <Heart className="w-5 h-5 mr-3 text-rose-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-rose-800">Eligibility Check</p>
                          <p className="text-rose-700 text-sm">
                            Confirm your business meets WES requirements before applying.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* The next phases and content continue... */}
              </div>
            </div>
          </div>
        </section>
                {/* Phase 2: Business Plan Development */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-pink-700">Phase 2: Women Entrepreneur Business Plan Development</CardTitle>
                      <Badge className="bg-pink-100 text-pink-800">Weeks 3-6</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Female Leadership Business Plan Components:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-pink-50 p-4 rounded">
                            <strong>Women-Focused Market Analysis:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Target market demographics (women consumers)</li>
                              <li>• Underserved women market opportunities</li>
                              <li>• Female customer pain points and solutions</li>
                              <li>• Women-led competitive landscape analysis</li>
                            </ul>
                          </div>
                          <div className="bg-pink-50 p-4 rounded">
                            <strong>Female Leadership Team:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Women founder/co-founder background</li>
                              <li>• Female executive team qualifications</li>
                              <li>• Women mentorship and advisory board</li>
                              <li>• Diversity and inclusion strategy</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Financial Projections for Women Entrepreneurs:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Revenue Forecasting:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Conservative growth assumptions</li>
                              <li>• Women market penetration rates</li>
                              <li>• Seasonal variations consideration</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Cost Structure:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Women-owned supplier preferences</li>
                              <li>• Flexible work arrangement costs</li>
                              <li>• Professional development budgets</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Funding Strategy:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• WES funding utilization plan</li>
                              <li>• Additional women-focused funding sources</li>
                              <li>• Debt servicing capabilities</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3: Application Submission */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-purple-700">Phase 3: WES Application Submission</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Weeks 7-8</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Women Entrepreneurship Fund Application:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2">Required Documents:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Women business ownership certificates</li>
                              <li>• Female leadership organizational chart</li>
                              <li>• Women entrepreneur impact statement</li>
                              <li>• Gender-inclusive business plan</li>
                              <li>• Financial statements and projections</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2">Application Portal:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Innovation, Science & Economic Development Canada</li>
                              <li>• Online WES application system</li>
                              <li>• Document upload requirements</li>
                              <li>• Application status tracking</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Women Entrepreneurship Loan Fund Application:</h5>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Community Organization Route:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• Find local women business support organizations</li>
                                <li>• Aboriginal Financial Institutions (for Indigenous women)</li>
                                <li>• Community Futures organizations</li>
                                <li>• Women's Enterprise Organizations</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Loan Application Process:</strong>
                              <ul className="mt-1 space-y-1">
                                <li>• Microloan application form</li>
                                <li>• Business mentorship enrollment</li>
                                <li>• Financial literacy assessment</li>
                                <li>• Repayment plan development</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Phase 4: Review Process */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-orange-700">Phase 4: Application Review</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">Weeks 9-12</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold">Evaluation Criteria</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="text-orange-700 font-medium mb-2">Business Merit (40%)</h6>
                            <ul className="text-sm space-y-1">
                              <li>Market opportunity and validation</li>
                              <li>Business model sustainability</li>
                              <li>Financial projections reasonableness</li>
                              <li>Competitive advantage clarity</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="text-orange-700 font-medium mb-2">Leadership Impact (35%)</h6>
                            <ul className="text-sm space-y-1">
                              <li>Female leadership demonstration</li>
                              <li>Women empowerment initiatives</li>
                              <li>Gender diversity commitment</li>
                              <li>Market impact potential</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h6 className="text-orange-700 font-medium mb-2">Economic Impact & Scalability (25%)</h6>
                        <div className="grid md:grid-cols-2 gap-4">
                          <ul className="text-sm space-y-1">
                            <li>Job creation for women</li>
                            <li>Economic growth potential</li>
                          </ul>
                          <ul className="text-sm space-y-1">
                            <li>Scalability and expansion plans</li>
                            <li>Community impact measurement</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                        <h5 className="font-semibold text-green-800">Upon Approval</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                          <ul className="space-y-1">
                            <li>Funding agreement execution</li>
                            <li>Milestone and reporting setup</li>
                            <li>Entrepreneur mentorship access</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>Networking with business owners</li>
                            <li>Access to ecosystem programs</li>
                            <li>Ongoing support</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Provincial Women’s Programs */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Building className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle>Ontario Women's Enterprise Organizations</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Eligible Programs</h6>
                        <ul className="text-sm space-y-1">
                          <li>Women Business Loans up to $100K</li>
                          <li>Entrepreneur Mentorship</li>
                          <li>Business Development</li>
                          <li>Networking & Training</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Requirements</h6>
                        <ul className="text-sm space-y-1">
                          <li>Business Registration</li>
                          <li>Ownership Verification</li>
                          <li>Business Plan & Financials</li>
                          <li>Market Research</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Regional Offices</h6>
                        <ul className="text-sm space-y-1">
                          <li>Toronto Women’s Centre</li>
                          <li>Ottawa Valley</li>
                          <li>Southwestern Ontario</li>
                          <li>Northern Ontario</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Users className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle>Quebec & BC Women's Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold mb-2">Quebec Support</h6>
                        <ul className="text-sm space-y-1">
                          <li>Réseau des Femmes d'Affaires</li>
                          <li>Women’s Grants</li>
                          <li>Tax Credits</li>
                          <li>Francophone Support</li>
                          <li>Montreal Startup Ecosystem</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">BC Support</h6>
                        <ul className="text-sm space-y-1">
                          <li>Small Business Loans</li>
                          <li>Training Programs</li>
                          <li>Startup Support</li>
                          <li>Rural Programs</li>
                          <li>Indigenous Women Initiatives</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
        {/* Common Women Entrepreneurship Mistakes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Women Entrepreneurship Funding Mistakes</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Application Killers for Women Entrepreneurs:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Undervaluing Business Potential:</strong>
                        <p className="text-sm text-gray-600">Women entrepreneurs often underestimate their market opportunity and business value.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Insufficient Ownership Documentation:</strong>
                        <p className="text-sm text-gray-600">Failure to properly document 51%+ female ownership and control.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Leadership Narrative:</strong>
                        <p className="text-sm text-gray-600">Not effectively highlighting women's unique leadership and value proposition.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Business Funding Process Errors:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Wrong Program Selection:</strong>
                        <p className="text-sm text-gray-600">Applying to inappropriate funding streams designed for women entrepreneurs.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Incomplete Financial Projections:</strong>
                        <p className="text-sm text-gray-600">Missing detailed forecasts and funding utilization plans.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Limited Network Utilization:</strong>
                        <p className="text-sm text-gray-600">Not leveraging mentorship and women entrepreneur networks.</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Women Entrepreneurship Success Strategies</h2>

              <div className="space-y-6">
                <Card className="border-rose-200">
                  <CardHeader>
                    <CardTitle className="text-rose-700">Female Leadership Excellence Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Leadership Positioning:</h5>
                        <ul className="text-sm space-y-1">
                          <li>Highlight unique female perspectives and approaches.</li>
                          <li>Demonstrate inclusive leadership and decision-making.</li>
                          <li>Show commitment to women empowerment.</li>
                          <li>Evidence of mentoring other women entrepreneurs.</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Market Impact Demonstration:</h5>
                        <ul className="text-sm space-y-1">
                          <li>Target underserved women market segments.</li>
                          <li>Address gender-specific pain points.</li>
                          <li>Create work-life balance solutions.</li>
                          <li>Support other women-owned businesses.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-pink-200">
                  <CardHeader>
                    <CardTitle className="text-pink-700">Women Business Network Leverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h5 className="font-semibold mb-2">Strategic Networking:</h5>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <ul className="space-y-1">
                          <li>Join Women's Enterprise Organizations</li>
                          <li>Participate in female founder accelerators</li>
                          <li>Attend women business conferences</li>
                        </ul>
                        <ul className="space-y-1">
                          <li>Connect with women investor networks</li>
                          <li>Engage female business mentors</li>
                          <li>Join industry women leadership groups</li>
                        </ul>
                        <ul className="space-y-1">
                          <li>Support women entrepreneurs</li>
                          <li>Build supplier diversity programs</li>
                          <li>Create women-focused partnerships</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Financial Strategy for Women-Owned Businesses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <p><strong>Diversified Funding Approach:</strong> Combine WES grants with angel investors and female entrepreneur loans.</p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <p><strong>Conservative Financial Planning:</strong> Develop forecasts with multiple scenarios for sustainable growth.</p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <p><strong>Impact Measurement:</strong> Monitor and report on women empowerment and diversity metrics.</p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <p><strong>Long-term Vision:</strong> Build scalable models to access larger women entrepreneurship funds.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Get Expert Help CTA */}
        <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Need Expert Help with Your Women Entrepreneurship Strategy Application?</h2>
              <p className="text-xl text-rose-100 mb-8">
                Maximize success with female business funding specialists. Our experts have secured over $15M in WES funding with an 84% success rate.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">Women-Focused Expert Services Include:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-rose-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Women entrepreneurship application preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Female leadership narrative development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Women market analysis and positioning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Female entrepreneur network introductions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>WES program matching and strategy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Women business mentorship connections</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=women-entrepreneurship-expert-help">Get Women's Funding Expert Help</Link>
              </Button>
              <p className="text-rose-200 text-sm mt-4">84% success rate for women entrepreneurs • Average funding secured: $42K • Female-focused expertise</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
