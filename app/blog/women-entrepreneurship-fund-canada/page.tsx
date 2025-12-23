import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Entrepreneurship Fund Canada 2026 | Non-Repayable Grants for Women-Owned Business Growth",
  description: "Complete guide to Women Entrepreneurship Fund (WEF) non-repayable grants for women-owned businesses. Get funding for expansion, innovation, equipment, marketing, and R&D from ISED Canada.",
  keywords: "Women Entrepreneurship Fund, WEF Canada, non-repayable grants women, women business expansion funding, women entrepreneur innovation grants, ISED women funding",
  openGraph: {
    title: "Women Entrepreneurship Fund Canada 2026 | Non-Repayable Business Grants",
    description: "Complete guide to WEF non-repayable grants for women-owned business expansion, innovation, equipment, and market access from Innovation, Science & Economic Development Canada.",
    url: "https://www.fsidigital.ca/blog/women-entrepreneurship-fund-canada",
    images: ["/og-image.jpg"],
  },
}

export default function WomenEntrepreneurshipFundGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🚀 Women Entrepreneurship Fund 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Women Entrepreneurship Fund (WEF)
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Non-repayable grant funding for women-owned businesses to expand operations, 
                innovate product lines, hire staff, and access new markets. Growth-stage and early-stage 
                businesses prioritized through Innovation, Science & Economic Development Canada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="#eligibility">
                    Check WEF Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/guides/women-entrepreneurship-fund-guide">
                    Get Free WEF Application Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Program Updates */}
        <section className="py-8 bg-green-50 border-b-2 border-green-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-green-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 WEF 2026 Program Enhancements</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>Non-Repayable Grants:</strong> No repayment required - true grant funding for women businesses
                        </div>
                        <div>
                          <strong>Growth Focus:</strong> Prioritizes early-stage and growth-stage women-owned enterprises
                        </div>
                        <div>
                          <strong>Rolling Intake:</strong> Applications accepted year-round with flexible timelines
                        </div>
                        <div>
                          <strong>Comprehensive Support:</strong> Expansion, innovation, equipment, marketing, and R&D eligible
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WEF Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Non-Repayable Grant Funding for Women Business Growth</h2>
                <p className="text-lg text-gray-600">
                  WEF provides non-repayable grants specifically for women-owned businesses ready to scale 
                  operations, innovate products, expand into new markets, and create jobs through strategic 
                  business investments that don't require repayment.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">Non-Repayable</div>
                  <div className="text-gray-600">True Grant Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">Growth Stage</div>
                  <div className="text-gray-600">Early & Scaling Businesses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Rolling</div>
                  <div className="text-gray-600">Year-Round Applications</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">51%+</div>
                  <div className="text-gray-600">Women Ownership</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WEF Funding Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">WEF Grant Funding Categories & Uses</h2>
              
              <div className="space-y-8">
                {/* Business Expansion */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Business Expansion & Operations Growth</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">Operational Expansion Funding</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Funding Type:</span>
                            <span className="text-purple-700 font-bold">Non-Repayable Grant</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Facility expansion and new location openings</p>
                            <p>• Operational capacity increases</p>
                            <p>• Production scaling and efficiency improvements</p>
                            <p>• Supply chain optimization and logistics</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Expansion Eligibility</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Target Groups:</strong> Growth-stage women-owned businesses</p>
                          <p><strong>Business Stage:</strong> Early-stage and scaling enterprises</p>
                          <p><strong>Investment Focus:</strong> Strategic expansion with job creation</p>
                          <p><strong>Documentation:</strong> Expansion plan with market analysis required</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 Expansion Funding Coverage:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>New Locations:</strong> Lease, renovations, setup costs</li>
                            <li>• <strong>Staff Hiring:</strong> Recruitment and training expenses</li>
                            <li>• <strong>Operations:</strong> Systems, processes, infrastructure</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Market Entry:</strong> New geographic or sector expansion</li>
                            <li>• <strong>Capacity:</strong> Production equipment and facilities</li>
                            <li>• <strong>Job Creation:</strong> Employment growth initiatives</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Innovation & Product Development */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Innovation & Product Line Development</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Product Innovation Grants</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Grant Focus:</span>
                            <span className="text-blue-700 font-bold">R&D & Product Innovation</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• New product development and prototyping</p>
                            <p>• Product line expansion and diversification</p>
                            <p>• Technology integration and digital transformation</p>
                            <p>• Research and development initiatives</p>
                            <p>• Intellectual property development</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Innovation Eligibility</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Innovation Type:</strong> Product, service, or process innovation</p>
                          <p><strong>R&D Activities:</strong> Research, testing, development phases</p>
                          <p><strong>Market Potential:</strong> Clear commercialization path required</p>
                          <p><strong>Competitive Edge:</strong> Demonstrable market differentiation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Equipment & Technology */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Equipment & Technology Investment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Equipment Funding</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Investment Type:</span>
                            <span className="text-green-700 font-bold">Capital Equipment</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Non-repayable funding for capital equipment purchases, technology upgrades, 
                            and machinery investments that enhance productivity and competitiveness.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Eligible Equipment</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Manufacturing:</strong> Production equipment and machinery</p>
                          <p><strong>Technology:</strong> Software, hardware, digital systems</p>
                          <p><strong>Processing:</strong> Industry-specific equipment needs</p>
                          <p><strong>Efficiency:</strong> Automation and productivity tools</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Marketing & Market Access */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Target className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Marketing & New Market Access</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-orange-800">Marketing Investment Grants</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                            <span className="font-semibold">Market Focus:</span>
                            <span className="text-orange-700 font-bold">Growth & Expansion</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Funding for marketing campaigns, brand development, digital marketing, 
                            and market entry strategies targeting new customer segments or geographies.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Marketing Activities</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Digital Marketing:</strong> Online campaigns, SEO, social media</p>
                          <p><strong>Brand Development:</strong> Identity, positioning, messaging</p>
                          <p><strong>Market Research:</strong> Customer insights, competitive analysis</p>
                          <p><strong>Export Markets:</strong> International expansion initiatives</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Staff Hiring & Training */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">Staff Hiring & Team Development</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-pink-800">Hiring & Training Support</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-pink-50 p-3 rounded-lg">
                            <span className="font-semibold">People Investment:</span>
                            <span className="text-pink-700 font-bold">Job Creation Focus</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Grant funding for strategic hiring, employee training programs, leadership 
                            development, and building high-performing teams to support business growth.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Eligible Activities</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Recruitment:</strong> Hiring costs for growth positions</p>
                          <p><strong>Training:</strong> Employee skills development programs</p>
                          <p><strong>Leadership:</strong> Management and executive development</p>
                          <p><strong>Retention:</strong> Employee engagement and culture initiatives</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Requirements */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">WEF Women Business Grant Eligibility</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Business Eligibility */}
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Business Owner Eligibility Criteria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">✅ Essential Requirements</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Self-identifying woman entrepreneur (51%+ ownership)</li>
                          <li>• Canadian incorporated for-profit business</li>
                          <li>• Operating business with revenue history (growth-stage)</li>
                          <li>• Demonstrated growth potential and scalability</li>
                          <li>• Strong business plan with clear expansion strategy</li>
                          <li>• Job creation and economic impact potential</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">🎯 Priority Business Stages</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Early-stage businesses (post-startup phase)</li>
                          <li>• Growth-stage enterprises ready to scale</li>
                          <li>• Businesses with proven market traction</li>
                          <li>• Revenue-generating women-owned companies</li>
                          <li>• Innovation-focused business models</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Eligibility */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Grant Project Eligibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">✅ Eligible Project Types</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business expansion and new market entry</li>
                          <li>• Product innovation and R&D initiatives</li>
                          <li>• Equipment and technology investments</li>
                          <li>• Marketing and brand development campaigns</li>
                          <li>• Staff hiring and team building</li>
                          <li>• Export development and international expansion</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-purple-700 mb-2">🚫 Non-Eligible Activities</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Personal expenses or debt repayment</li>
                          <li>• Real estate property purchases</li>
                          <li>• Routine operational expenses</li>
                          <li>• Activities without growth impact</li>
                          <li>• Non-Canadian business operations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">WEF Grant Application Process</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Prepare Business Case",
                      description: "Develop comprehensive business plan with expansion strategy and financial projections",
                      icon: <FileText className="w-6 h-6" />,
                      color: "purple"
                    },
                    {
                      step: "2", 
                      title: "Application Submission",
                      description: "Submit detailed grant application through ISED portal with required documentation",
                      icon: <Send className="w-6 h-6" />,
                      color: "green"
                    },
                    {
                      step: "3",
                      title: "Review & Assessment",
                      description: "ISED review team evaluates business viability, growth potential, and project impact",
                      icon: <Users className="w-6 h-6" />,
                      color: "blue"
                    },
                    {
                      step: "4",
                      title: "Grant Approval",
                      description: "Approval decision, funding agreement, and non-repayable grant disbursement",
                      icon: <Award className="w-6 h-6" />,
                      color: "orange"
                    }
                  ].map((item, index) => {
                    const colors = {
                      purple: "bg-purple-500 text-white",
                      green: "bg-green-500 text-white", 
                      blue: "bg-blue-500 text-white",
                      orange: "bg-orange-500 text-white"
                    }
                    
                    return (
                      <Card key={index} className="text-center">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-full ${colors[item.color as keyof typeof colors]} flex items-center justify-center mx-auto mb-3`}>
                            {item.icon}
                          </div>
                          <CardTitle className="text-lg">Step {item.step}: {item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold text-blue-800 mb-2">📅 WEF Application Timeline & Process</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Rolling Intake:</strong> Applications accepted year-round</li>
                              <li>• <strong>Preparation Time:</strong> 4-8 weeks for comprehensive application</li>
                              <li>• <strong>Initial Review:</strong> 6-8 weeks from submission</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Decision Timeline:</strong> 12-16 weeks typical for approval</li>
                              <li>• <strong>Funding Disbursement:</strong> 4-6 weeks after approval</li>
                              <li>• <strong>Reporting:</strong> Quarterly progress and milestone reports</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">WEF Grant Application Success Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices for WEF Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Strong Growth Story:</strong> Demonstrate clear scalability and market opportunity with data-backed projections
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Economic Impact:</strong> Show job creation potential and contribution to Canadian economic growth
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Innovation Focus:</strong> Highlight competitive advantages and market differentiation through innovation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Comprehensive Documentation:</strong> Provide complete financials, market analysis, and expansion plans
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common WEF Application Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Growth Plan:</strong> Insufficient market analysis or unrealistic expansion projections
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Poor Financial Documentation:</strong> Incomplete historical financials or budget justifications
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Limited Impact Demonstration:</strong> Failure to show economic contribution and job creation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Too Early Stage:</strong> Applying before business has sufficient operational history
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access WEF Non-Repayable Grant Funding?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Get our complete WEF application guide with grant strategy templates and business plan frameworks, 
                or work with our women entrepreneur funding specialists for expert grant application support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free WEF Application Guide</h4>
                  <p className="text-purple-100 text-sm mb-4">
                    Get our comprehensive WEF grant application guide with funding category breakdown, 
                    eligibility checklist, and application templates.
                  </p>
                  <Button size="lg" className="w-full bg-white text-purple-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/women-entrepreneurship-fund-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get WEF Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert WEF Grant Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with women entrepreneur grant specialists who can help develop your expansion 
                    strategy and optimize your WEF application for maximum approval chances.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=wef-women-entrepreneur-expert-help">
                      Get WEF Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-purple-200 text-sm mt-6">
                Expert guidance • Grant strategy • Application optimization • Non-repayable funding success
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
