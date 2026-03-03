import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket, TrendingUp as Growth, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BDC Women Entrepreneurs Financing 2026 | Flexible Loans & Advisory for Women-Led Business Growth",
  description: "Complete guide to BDC Women Entrepreneurs financing with flexible loan terms, strategic advisory services, and growth support from Business Development Bank of Canada.",
  keywords: "BDC Women Entrepreneurs, BDC women business loans, women entrepreneur financing BDC, flexible business loans women, BDC advisory services",
  openGraph: {
    title: "BDC Women Entrepreneurs Financing 2026 | Flexible Loans & Advisory Services",
    description: "Comprehensive financing and advisory services for women-led businesses with flexible terms and strategic growth support from BDC.",
    url: "https://www.fsidigital.ca/blog/bdc-women-entrepreneurs-financing",
    images: ["/og-image.png"],
  },
}

const faqData = [
  {
    question: "What are the eligibility requirements for BDC Women Entrepreneurs financing?",
    answer: "BDC requires women-led businesses (ownership or leadership) that are Canadian incorporated, operating or with viable startup plans, demonstrating growth potential, and with clear financing use cases."
  },
  {
    question: "What is the BDC Thrive ETA Fund?",
    answer: "The Thrive ETA Fund is a $50 million initiative supporting 60+ women acquiring and operating businesses through direct investments, accelerator programs, and mentorship."
  },
  {
    question: "How long does the BDC financing application process take?",
    answer: "Initial consultation takes 1-2 weeks, application preparation 2-4 weeks, credit review 4-6 weeks, and funding disbursement 1-2 weeks after approval."
  },
  {
    question: "Does BDC offer advisory services along with financing?",
    answer: "Yes, BDC provides strategic advisory services including growth strategy, operations, financial planning, and leadership development from dedicated business advisors with women entrepreneur expertise."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

export default function BDCWomenEntrepreneursGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-teal-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏦 BDC Women Entrepreneurs 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                BDC Women Entrepreneurs Financing
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Comprehensive financing and advisory services designed for women-led businesses
                with flexible loan terms, strategic growth support, and expert business guidance from
                Business Development Bank of Canada. Available for all business stages from startup to scale-up.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="#eligibility">
                    Check BDC Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/guides/bdc-women-entrepreneurs-financing-guide">
                    Get Free BDC Application Guide
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
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 BDC 2026 Women Entrepreneur Program Enhancements</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>$50M Thrive ETA Fund:</strong> New fund supporting 60+ women acquiring and operating businesses
                        </div>
                        <div>
                          <strong>Flexible Terms:</strong> Customized repayment schedules aligned with business cash flow
                        </div>
                        <div>
                          <strong>Strategic Advisory:</strong> Dedicated business advisors with women entrepreneur expertise
                        </div>
                        <div>
                          <strong>All-Stage Support:</strong> From startup to growth-stage and business acquisition financing
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* BDC Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why is BDC a Key Partner for Women Entrepreneurs?</h2>
                <p className="text-lg text-gray-600">
                  BDC combines flexible financing with expert advisory services specifically designed for
                  women-led businesses. Unlike traditional banks, BDC offers patient capital with terms
                  that adapt to your business needs, plus strategic guidance to accelerate growth.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Flexible</div>
                  <div className="text-gray-600">Customized Loan Terms</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">All Stages</div>
                  <div className="text-gray-600">Startup to Scale-Up</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">Advisory</div>
                  <div className="text-gray-600">Expert Guidance Included</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">Patient</div>
                  <div className="text-gray-600">Growth-Focused Capital</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BDC Financing Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Financing Solutions Does BDC Offer Women?</h2>

              <div className="space-y-8">
                {/* Business Growth Financing */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Growth className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Business Growth Financing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Flexible Growth Loans</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Loan Type:</span>
                            <span className="text-blue-700 font-bold">Term Loans & Lines of Credit</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Working capital and operational financing</p>
                            <p>• Equipment purchases and technology investments</p>
                            <p>• Expansion and market entry funding</p>
                            <p>• Flexible repayment aligned with cash flow</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Growth Financing Features</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Loan Amounts:</strong> Customized to business needs and growth plans</p>
                          <p><strong>Repayment Terms:</strong> Flexible schedules matching business cash flow</p>
                          <p><strong>Interest Rates:</strong> Competitive rates for women entrepreneurs</p>
                          <p><strong>Collateral:</strong> Flexible security requirements</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 Growth Financing Use Cases:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Working Capital:</strong> Day-to-day operations and cash flow</li>
                            <li>• <strong>Equipment:</strong> Machinery, technology, vehicles</li>
                            <li>• <strong>Inventory:</strong> Stock purchases and management</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Expansion:</strong> New locations or markets</li>
                            <li>• <strong>Hiring:</strong> Team building and talent acquisition</li>
                            <li>• <strong>Marketing:</strong> Brand building and customer acquisition</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Thrive ETA Fund */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Thrive ETA Fund - Business Acquisition</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">$50M Acquisition Fund</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Fund Size:</span>
                            <span className="text-purple-700 font-bold">$50 Million</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Support for 60+ women acquiring businesses</p>
                            <p>• $40M direct investments for acquisitions</p>
                            <p>• $10M indirect investments in PE funds</p>
                            <p>• Accelerator program with training and mentorship</p>
                            <p>• Deal sourcing and peer community support</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Acquisition Pathways</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Search Funds:</strong> Support for women seeking to acquire companies</p>
                          <p><strong>Management Buyouts:</strong> Financing for internal acquisitions</p>
                          <p><strong>Self-Funded Search:</strong> Independent acquisition financing</p>
                          <p><strong>Ownership Transition:</strong> Capitalize on 142,000+ business transfers</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Advisory Services */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Strategic Advisory Services</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Expert Business Guidance</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Advisory Type:</span>
                            <span className="text-green-700 font-bold">Strategic Growth Support</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Dedicated business advisors with women entrepreneur expertise providing
                              strategic guidance on growth, operations, and scaling challenges.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Advisory Services</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Growth Strategy:</strong> Expansion planning and market entry</p>
                          <p><strong>Operations:</strong> Efficiency and productivity improvement</p>
                          <p><strong>Financial Planning:</strong> Cash flow and financial management</p>
                          <p><strong>Leadership:</strong> Management and team development</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Thrive Lab Resources */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Thrive Lab for Women Resources</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-orange-800">Women Entrepreneur Ecosystem</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                            <span className="font-semibold">Support Type:</span>
                            <span className="text-orange-700 font-bold">Holistic Ecosystem</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>BDC's Thrive Lab provides comprehensive support ecosystem specifically
                              designed for women entrepreneurs at all business stages.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Thrive Lab Benefits</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Networking:</strong> Women entrepreneur community connections</p>
                          <p><strong>Education:</strong> Training programs and workshops</p>
                          <p><strong>Mentorship:</strong> Experienced entrepreneur guidance</p>
                          <p><strong>Resources:</strong> Business tools and templates</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Who is Eligible for BDC Women's Financing?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Business Eligibility */}
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Business Owner Eligibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">✅ Essential Requirements</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Women-led business (ownership or leadership)</li>
                          <li>• Canadian incorporated business</li>
                          <li>• Operating business or viable startup plan</li>
                          <li>• Demonstrated growth potential</li>
                          <li>• Financially viable with sustainable model</li>
                          <li>• Clear use of financing proceeds</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">🎯 All Business Stages Supported</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Startups with strong business plans</li>
                          <li>• Early-stage businesses building traction</li>
                          <li>• Growth-stage companies scaling operations</li>
                          <li>• Established businesses expanding</li>
                          <li>• Women acquiring existing businesses</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financing Use Cases */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Financing Use Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">✅ Eligible Uses</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Working capital and cash flow management</li>
                          <li>• Equipment, technology, and asset purchases</li>
                          <li>• Business expansion and new locations</li>
                          <li>• Marketing and sales development</li>
                          <li>• Hiring and team building</li>
                          <li>• Business acquisition financing</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-purple-700 mb-2">💡 Strategic Priorities</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Innovation and product development</li>
                          <li>• Export market development</li>
                          <li>• Digital transformation initiatives</li>
                          <li>• Operational efficiency improvements</li>
                          <li>• Market positioning and brand building</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What is the BDC Financing Application Process?</h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Initial Consultation",
                      description: "Connect with BDC advisor to discuss business needs and financing options",
                      icon: <Users className="w-6 h-6" />,
                      color: "blue"
                    },
                    {
                      step: "2",
                      title: "Application Preparation",
                      description: "Gather financial documents, business plan, and expansion strategy",
                      icon: <FileText className="w-6 h-6" />,
                      color: "green"
                    },
                    {
                      step: "3",
                      title: "Formal Application",
                      description: "Submit complete application through BDC with advisor support",
                      icon: <Send className="w-6 h-6" />,
                      color: "purple"
                    },
                    {
                      step: "4",
                      title: "Approval & Funding",
                      description: "Credit review, approval decision, and flexible financing disbursement",
                      icon: <Award className="w-6 h-6" />,
                      color: "orange"
                    }
                  ].map((item, index) => {
                    const colors = {
                      blue: "bg-blue-500 text-white",
                      green: "bg-green-500 text-white",
                      purple: "bg-purple-500 text-white",
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
                        <h4 className="font-bold text-blue-800 mb-2">📅 BDC Application Timeline & Process</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Initial Consultation:</strong> 1-2 weeks to connect with advisor</li>
                              <li>• <strong>Application Prep:</strong> 2-4 weeks document gathering</li>
                              <li>• <strong>Credit Review:</strong> 4-6 weeks for approval decision</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Funding Disbursement:</strong> 1-2 weeks after approval</li>
                              <li>• <strong>Advisory Support:</strong> Ongoing throughout relationship</li>
                              <li>• <strong>Flexible Terms:</strong> Customized to business needs</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How Can You Succeed with a BDC Application?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices for BDC Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Strong Financial Position:</strong> Demonstrate sound financials and clear path to repayment
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Clear Use of Funds:</strong> Specific explanation of how financing will drive growth
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Comprehensive Business Plan:</strong> Detailed strategy with market analysis and projections
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Leverage Advisory:</strong> Engage BDC advisors early for guidance and relationship building
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common BDC Application Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Incomplete Financials:</strong> Missing historical statements or unrealistic projections
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Repayment Plan:</strong> Unclear cash flow or insufficient revenue to service debt
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Vague Use of Funds:</strong> General descriptions without specific allocation details
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Late Advisor Engagement:</strong> Not connecting with BDC early in planning process
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Official Government Resources */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Official BDC Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <a href="https://www.bdc.ca/en/about/women-entrepreneurs" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">BDC Women Entrepreneurs</div>
                    <div className="text-sm text-gray-600">Official BDC women's programs portal</div>
                  </div>
                </a>
                <a href="https://www.bdc.ca/en/articles-tools/entrepreneur-toolkit/templates-business-guides/glossary/thrive-lab" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Thrive Lab</div>
                    <div className="text-sm text-gray-600">Women entrepreneur resources and tools</div>
                  </div>
                </a>
                <a href="https://www.bdc.ca/en/financing" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">BDC Financing</div>
                    <div className="text-sm text-gray-600">Business financing solutions</div>
                  </div>
                </a>
                <a href="https://www.bdc.ca/en/consulting" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">BDC Advisory Services</div>
                    <div className="text-sm text-gray-600">Strategic business consulting</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Questions About BDC Women Financing</h2>
              <div className="space-y-4">
                <a href="#eligibility" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  <span className="font-medium text-blue-700">What are the eligibility requirements for BDC financing?</span>
                </a>
                <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  <span className="font-medium text-blue-700">What is the BDC Thrive ETA Fund?</span>
                </a>
                <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  <span className="font-medium text-blue-700">Does BDC offer advisory services along with financing?</span>
                </a>
                <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  <span className="font-medium text-blue-700">How long does the BDC financing application process take?</span>
                </a>
                <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  <span className="font-medium text-blue-700">What are the interest rates for BDC loans?</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Women Entrepreneur Funding Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/bmo-celebrating-women-grant" className="block p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">BMO Celebrating Women Grant</h3>
                  <p className="text-gray-600 text-sm">$10K non-repayable grant for women-owned businesses</p>
                </Link>
                <Link href="/blog/indigenous-women-business-grants-canada" className="block p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">Indigenous Women Business Grants</h3>
                  <p className="text-gray-600 text-sm">Funding programs for Indigenous women entrepreneurs</p>
                </Link>
                <Link href="/blog/women-clean-technology-grants-canada" className="block p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">Women Clean Tech Grants</h3>
                  <p className="text-gray-600 text-sm">Green economy funding for women-led businesses</p>
                </Link>
                <Link href="/blog/edc-women-trade-export-financing" className="block p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">EDC Women in Trade</h3>
                  <p className="text-gray-600 text-sm">Export financing for women-owned businesses</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access BDC Women Entrepreneur Financing?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get our complete BDC application guide with financing comparison and business plan templates,
                or work with our women entrepreneur financing specialists for expert application support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free BDC Application Guide</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our comprehensive BDC financing guide with loan program breakdown,
                    eligibility checklist, and application templates.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/bdc-women-entrepreneurs-financing-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get BDC Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert BDC Financing Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with women entrepreneur financing specialists who can help optimize your BDC
                    application and connect you with BDC advisors.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=bdc-women-entrepreneur-financing-help">
                      Get BDC Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-blue-200 text-sm mt-6">
                Expert guidance • BDC advisor connections • Application optimization • Flexible financing success
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
