import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Zap, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Youth Entrepreneurship Funding Application Guide 2025 | Step-by-Step CYBF & Young Entrepreneur Grants",
  description: "Complete step-by-step guide to applying for Canadian youth entrepreneurship funding. Get CYBF application templates, Futurpreneur strategies, and young entrepreneur funding guides for ages 18-35.",
  keywords: "youth entrepreneurship application guide, how to apply CYBF funding, young entrepreneur grant application Canada, Futurpreneur application process, Canadian youth business funding guide, CYBF application templates, youth business loan application",
  openGraph: {
    title: "Youth Entrepreneurship Funding Application Guide 2025 | CYBF & Young Entrepreneur Grants",
    description: "Step-by-step guide with templates and strategies for successful youth entrepreneurship funding applications in Canada.",
    url: "https://fsidigital.ca/guides/apply-youth-entrepreneurship-funding",
  },
}

export default function YouthEntrepreneurshipApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🧑‍💼 Youth Funding Application Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Youth Entrepreneurship Funding Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for Canadian youth entrepreneurship funding. 
                Complete with CYBF templates, Futurpreneur strategies, and young entrepreneur application frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/download/youth-entrepreneurship-kit">
                    <Download className="w-5 h-5 mr-2" />
                    Download Youth Funding Kit
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/youth-entrepreneurship-canada-funding">
                    Back to Youth Funding Guide
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">6-10 Weeks</div>
                  <div className="text-gray-600">Average CYBF Review Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">15+ Documents</div>
                  <div className="text-gray-600">Youth Application Requirements</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">78%</div>
                  <div className="text-gray-600">Success Rate (Expert Prep)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">No Fee</div>
                  <div className="text-gray-600">Application Cost</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Youth Funding Application Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Youth Entrepreneurship Application Timeline</h2>
              
              <div className="space-y-8">
                {/* Phase 1: Program Selection & Eligibility */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Phase 1: Youth Program Selection & Age Verification</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Weeks 1-2</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">Choose Your Youth Funding Program:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>CYBF (Ages 18-39):</strong> Up to $60K startup loans</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>Futurpreneur (Ages 18-39):</strong> Loans + mentorship</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>Provincial Youth Programs:</strong> Regional support</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span><strong>YESS Programs (Ages 15-30):</strong> Employment support</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Young Entrepreneur Eligibility Check:</h5>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Age verification (18-39 for most programs)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Canadian citizenship or permanent residency</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Business age (new or under 1 year)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Character and commitment assessment</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Zap className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-blue-800 font-medium">Young Entrepreneur Advantage:</p>
                          <p className="text-blue-700 text-sm">
                            Youth programs prioritize first-time entrepreneurs with innovative ideas and strong 
                            learning potential over extensive business experience.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 2: Business Plan Development */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-indigo-700">Phase 2: Young Entrepreneur Business Plan Development</CardTitle>
                      <Badge className="bg-indigo-100 text-indigo-800">Weeks 3-5</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Youth-Focused Business Plan Components:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-indigo-50 p-4 rounded">
                            <strong>Innovation & Technology Focus:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Digital-first business models</li>
                              <li>• Tech-savvy customer approaches</li>
                              <li>• Social media and online marketing</li>
                              <li>• Sustainable and ethical practices</li>
                            </ul>
                          </div>
                          <div className="bg-indigo-50 p-4 rounded">
                            <strong>Young Entrepreneur Strengths:</strong>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Adaptability and learning agility</li>
                              <li>• Fresh perspectives on market needs</li>
                              <li>• Energy and commitment to growth</li>
                              <li>• Willingness to embrace mentorship</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-3">Financial Planning for Young Entrepreneurs:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Startup Costs:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Conservative equipment estimates</li>
                              <li>• Digital-first operational costs</li>
                              <li>• Lean startup methodology</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Revenue Projections:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Realistic market penetration</li>
                              <li>• Scalable business model</li>
                              <li>• Multiple revenue streams</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Growth Strategy:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Reinvestment priorities</li>
                              <li>• Team expansion plans</li>
                              <li>• Technology scaling</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3: CYBF Application Process */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Phase 3: CYBF Application Submission</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Weeks 6-7</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">CYBF Application Requirements:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2">Core Documents:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Completed CYBF application form</li>
                              <li>• Comprehensive business plan</li>
                              <li>• Personal and business financial statements</li>
                              <li>• Market research and analysis</li>
                              <li>• Character reference letters (3-5)</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2">Supporting Materials:</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Resume and educational background</li>
                              <li>• Industry experience documentation</li>
                              <li>• Proof of Canadian citizenship/PR</li>
                              <li>• Credit report authorization</li>
                              <li>• Collateral and security details</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h5 className="font-semibold text-purple-800 mb-2">CYBF Character Assessment Process:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>What They Evaluate:</strong>
                            <ul className="mt-1 space-y-1 text-purple-700">
                              <li>• Personal integrity and commitment</li>
                              <li>• Business knowledge and preparation</li>
                              <li>• Financial responsibility and planning</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Young Entrepreneur Advantages:</strong>
                            <ul className="mt-1 space-y-1 text-purple-700">
                              <li>• Enthusiasm and energy</li>
                              <li>• Openness to learning and guidance</li>
                              <li>• Innovation and fresh thinking</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 4: Review & Decision */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Phase 4: Application Review & Mentorship Matching</CardTitle>
                      <Badge className="bg-orange-100 text-orange-800">Weeks 8-10</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3">Youth Program Evaluation Criteria:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Business Viability (35%):</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Market opportunity and demand validation</li>
                              <li>• Financial projections reasonableness</li>
                              <li>• Competitive advantage and differentiation</li>
                              <li>• Scalability and growth potential</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="font-medium mb-2 text-orange-700">Entrepreneur Character (40%):</h6>
                            <ul className="text-sm space-y-1">
                              <li>• Commitment and determination</li>
                              <li>• Learning attitude and coachability</li>
                              <li>• Leadership potential and vision</li>
                              <li>• Integrity and trustworthiness</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h6 className="font-medium mb-2 text-orange-700">Youth-Specific Factors (25%):</h6>
                          <div className="grid md:grid-cols-2 gap-4">
                            <ul className="text-sm space-y-1">
                              <li>• Innovation and creative thinking</li>
                              <li>• Technology adoption and digital savvy</li>
                            </ul>
                            <ul className="text-sm space-y-1">
                              <li>• Social impact and sustainability focus</li>
                              <li>• Adaptability to market changes</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">Upon Youth Funding Approval:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                          <ul className="space-y-1">
                            <li>• Loan agreement and funding disbursement</li>
                            <li>• Mentor matching and introduction</li>
                            <li>• Ongoing business coaching access</li>
                          </ul>
                          <ul className="space-y-1">
                            <li>• Young entrepreneur network access</li>
                            <li>• Skills development workshops</li>
                            <li>• Regular progress monitoring</li>
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

        {/* Provincial Youth Application Processes */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Provincial Youth Entrepreneur Application Processes</h2>
              
              <div className="space-y-6">
                {/* Ontario Summer Company */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Star className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle>Ontario Summer Company Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Program Details:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Up to $3,000 grants for students</li>
                          <li>• Summer business startup support</li>
                          <li>• Ages 15-29 years eligible</li>
                          <li>• Mentorship and training included</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Application Requirements:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Ontario resident and student status</li>
                          <li>• Detailed business proposal</li>
                          <li>• Financial projections and budgets</li>
                          <li>• Letter of commitment</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Application Timeline:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Applications open February-March</li>
                          <li>• Review process: 4-6 weeks</li>
                          <li>• Program runs May-August</li>
                          <li>• Final reporting in September</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quebec & BC Programs */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle>Quebec & BC Young Entrepreneur Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold mb-2 text-blue-700">Quebec Youth Business Support:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Jeunes Entreprises du Québec funding</li>
                          <li>• Québec youth entrepreneur tax credits</li>
                          <li>• Regional development support</li>
                          <li>• Francophone business networks</li>
                          <li>• Montreal startup ecosystem access</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2 text-green-700">BC Young Entrepreneur Initiative:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Small Business Venture Capital funding</li>
                          <li>• BC youth business development programs</li>
                          <li>• Vancouver startup community access</li>
                          <li>• Rural BC young entrepreneur support</li>
                          <li>• Technology sector youth programs</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes for Young Entrepreneurs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Youth Entrepreneurship Funding Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Youth Application Killers:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Overconfident Market Projections:</strong>
                        <p className="text-sm text-gray-600">Young entrepreneurs often overestimate market penetration and customer adoption rates</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Insufficient Industry Research:</strong>
                        <p className="text-sm text-gray-600">Not demonstrating deep understanding of industry dynamics and competition</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Financial Planning:</strong>
                        <p className="text-sm text-gray-600">Underestimating startup costs and not planning for cash flow challenges</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Young Entrepreneur Process Errors:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Character References:</strong>
                        <p className="text-sm text-gray-600">Choosing references who don't know your business capabilities well</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Ignoring Mentorship Requirements:</strong>
                        <p className="text-sm text-gray-600">Not showing genuine commitment to learning and receiving guidance</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Limited Network Engagement:</strong>
                        <p className="text-sm text-gray-600">Not actively participating in young entrepreneur communities and events</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies for Young Entrepreneurs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Young Entrepreneur Success Strategies</h2>
              
              <div className="space-y-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Youth Entrepreneurship Positioning Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Leverage Your Youth Advantages:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Highlight digital nativity and tech-savvy approaches</li>
                          <li>• Emphasize fresh perspectives on market problems</li>
                          <li>• Show adaptability and learning agility</li>
                          <li>• Demonstrate sustainability and social impact focus</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Address Age-Related Concerns:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Show maturity in business planning and execution</li>
                          <li>• Demonstrate commitment beyond just passion</li>
                          <li>• Provide evidence of reliability and follow-through</li>
                          <li>• Show openness to mentorship and guidance</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Young Entrepreneur Network Building</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Strategic Networking for Young Entrepreneurs:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <ul className="space-y-1">
                              <li>• Join CYBF and Futurpreneur alumni networks</li>
                              <li>• Participate in young entrepreneur meetups</li>
                              <li>• Attend startup and innovation events</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Connect with university entrepreneurship centers</li>
                              <li>• Join industry-specific young professional groups</li>
                              <li>• Engage with local business incubators</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• Build relationships with potential mentors</li>
                              <li>• Create peer support networks</li>
                              <li>• Engage with investors focused on youth</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Financial Strategy for Young Entrepreneurs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Start Lean and Scale Smart:</strong> Begin with minimal viable product and reinvest profits for sustainable growth
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Combine Multiple Funding Sources:</strong> Layer CYBF loans with provincial grants and angel investment
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Plan for Learning Curves:</strong> Build buffer time and resources for the inevitable learning process
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Measure and Iterate:</strong> Use data-driven approaches to validate assumptions and pivot when needed
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
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Need Expert Help with Your Youth Entrepreneurship Application?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Maximize your success with young entrepreneur funding specialists. Our experts have secured 
                over $8M in CYBF and youth funding with a 78% approval rate for Canadian entrepreneurs aged 18-35.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">Youth-Focused Expert Services Include:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>CYBF application preparation and optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Young entrepreneur positioning strategy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Character assessment coaching</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Mentor network introductions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Provincial youth program guidance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Young entrepreneur network connections</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=youth-entrepreneurship-expert-help">
                  Get Youth Funding Expert Help
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
                78% success rate for young entrepreneurs • Average funding secured: $28K • Youth-focused expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
