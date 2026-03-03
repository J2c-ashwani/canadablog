import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket, Calendar, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BMO Celebrating Women Grant 2026 | $10K Grants + Business Advisory for Women Entrepreneurs",
  description: "Complete guide to BMO Celebrating Women Grant with $10,000 funding, BMO business advisor support, workshops, and resources. Applications open August 5-19, 2026 for Canadian and U.S. women business owners.",
  keywords: "BMO Celebrating Women Grant, women business grants Canada, BMO women entrepreneurs, $10000 business grants, women-owned business funding",
  openGraph: {
    title: "BMO Celebrating Women Grant 2026 | $10K Grants + Advisory",
    description: "Annual grant program from BMO supporting women-owned businesses with $10,000 grants, business advisory, and comprehensive resources.",
    url: "https://www.fsidigital.ca/blog/bmo-celebrating-women-grant",
    images: ["/og-image.png"],
  },
}

export default function BMOCelebratingWomenGrantGuidePage() {
  const faqData = [
    {
      question: "How competitive is the BMO Celebrating Women Grant?",
      answer: "Very competitive. Only 15 grants are awarded annually across all of Canada and 24 US states. Focus on clearly demonstrating women advancement impact and specific growth plans."
    },
    {
      question: "Can I apply if my business is less than 2 years old?",
      answer: "No. Your business must have been selling products or services for at least 2 years by August 5, 2026 to be eligible."
    },
    {
      question: "What if I missed the application window?",
      answer: "The program runs annually in August. If you miss the 2026 window (August 5-19), prepare for the 2027 program. Sign up for notifications at bmoforwomen.com."
    },
    {
      question: "Do I need to have a specific women advancement program?",
      answer: "Not necessarily a formal program, but you must demonstrate commitment to women advancement - through products, services, hiring, mentorship, or community impact."
    },
    {
      question: "What US states are eligible for BMO grant?",
      answer: "24 states in BMO footprint including: Arizona, California, Colorado, Florida, Illinois, Indiana, Kansas, Minnesota, Missouri, Wisconsin, and others. Check bmoforwomen.com for the full list."
    },
    {
      question: "Is the $10,000 grant taxable?",
      answer: "Grant funds are typically considered taxable business income. Consult with your accountant for specific tax implications in your jurisdiction."
    }
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-cyan-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💼 Annual Grant Program 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                BMO Celebrating Women Grant Program
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Annual grant program from BMO Bank of Montreal and Deloitte providing $10,000 grants to
                women-owned small businesses in Canada and the United States. Includes BMO business advisor
                support, workshops, seminars, and comprehensive resources to help businesses make real financial
                progress. Applications open August 5-19, 2026 for the 2026 program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="#grant-details">
                    View Grant Details
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/bmo-celebrating-women-grant-guide">
                    Get Application Guide
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
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 BMO Celebrating Women 2026 Program Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>Application Window:</strong> August 5-19, 2026 (8:00 AM - 8:00 PM ET)
                        </div>
                        <div>
                          <strong>Grant Amount:</strong> $10,000 per recipient (15 grants total)
                        </div>
                        <div>
                          <strong>Geographic Coverage:</strong> All Canadian provinces + 24 U.S. states
                        </div>
                        <div>
                          <strong>Program Impact:</strong> Over $750,000 awarded across North America since inception
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About BMO Celebrating Women Grant</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#eligibility" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-700">Who is eligible for BMO Celebrating Women Grant?</h3>
                  <p className="text-sm text-gray-600">51%+ women-owned, 2+ years operating, under $5M revenue</p>
                </a>
                <a href="#grant-details" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-green-500">
                  <h3 className="font-semibold text-green-700">How much funding does BMO provide?</h3>
                  <p className="text-sm text-gray-600">$10,000 grant plus business advisory support</p>
                </a>
                <a href="#application" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-cyan-500">
                  <h3 className="font-semibold text-cyan-700">When does the BMO grant application open?</h3>
                  <p className="text-sm text-gray-600">August 5-19, 2026 (2-week window only)</p>
                </a>
                <a href="#us-eligibility" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-orange-500">
                  <h3 className="font-semibold text-orange-700">Can US businesses apply for BMO grant?</h3>
                  <p className="text-sm text-gray-600">Yes, 24 US states in BMO footprint are eligible</p>
                </a>
                <a href="#requirements" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-purple-500">
                  <h3 className="font-semibold text-purple-700">Do I need a BMO account to apply?</h3>
                  <p className="text-sm text-gray-600">No, BMO account is not required for eligibility</p>
                </a>
                <a href="#faq" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-pink-500">
                  <h3 className="font-semibold text-pink-700">What do past winners use grant money for?</h3>
                  <p className="text-sm text-gray-600">Business growth, women advancement programs, expansion</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Boldly Growing the Good in Business and Life</h2>
                <p className="text-lg text-gray-600">
                  BMO, in collaboration with Deloitte, created the BMO Celebrating Women Grant Program as part
                  of its commitment to supporting the advancement of women. Since launching in Canada in 2020
                  and the U.S. in 2021, the program has awarded over $750,000 to women-owned businesses,
                  providing not just financial support but comprehensive business advisory and resources.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$10K</div>
                  <div className="text-gray-600">Grant Amount</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">15</div>
                  <div className="text-gray-600">Annual Recipients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-600 mb-2">$750K+</div>
                  <div className="text-gray-600">Total Awarded</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">Annual</div>
                  <div className="text-gray-600">August Program</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grant Details */}
        <section id="grant-details" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">BMO Celebrating Women Grant Package</h2>

              <div className="space-y-8">
                {/* Grant Funding */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">$10,000 Grant Funding</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Financial Support</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Award Amount:</span>
                            <span className="text-blue-700 font-bold">$10,000</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Fifteen grants awarded annually (15 total)</p>
                            <p>• Direct financial support for business growth</p>
                            <p>• No repayment required (true grant funding)</p>
                            <p>• Flexible use for business expansion needs</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Grant Use Cases</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Business Growth:</strong> New products, services, or markets</p>
                          <p><strong>Women Advancement:</strong> Support women's health, safety, education</p>
                          <p><strong>Products/Services:</strong> Designed for women and girls</p>
                          <p><strong>Mentorship:</strong> Financial literacy, skills training programs</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Advisory */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">BMO Business Advisor Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Expert Guidance</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Service Type:</span>
                            <span className="text-green-700 font-bold">Personalized Advisory</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Dedicated BMO business advisor access</p>
                            <p>• Personalized business growth guidance</p>
                            <p>• Financial planning and strategy support</p>
                            <p>• Ongoing consultation throughout grant period</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Advisory Benefits</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Business Strategy:</strong> Growth planning and execution</p>
                          <p><strong>Financial Management:</strong> Cash flow and budgeting</p>
                          <p><strong>Market Expansion:</strong> New market entry strategies</p>
                          <p><strong>Operational Efficiency:</strong> Process optimization</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resources & Support */}
                <Card className="border-cyan-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-cyan-600 mr-3" />
                      <CardTitle className="text-cyan-700">Workshops, Seminars & Resources</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-cyan-800">Educational Programs</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-cyan-50 p-3 rounded-lg">
                            <span className="font-semibold">Access:</span>
                            <span className="text-cyan-700 font-bold">BMO Events & Resources</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Grant recipients receive access to BMO-hosted workshops, business seminars,
                              networking events, and educational resources designed to accelerate business growth
                              and financial progress.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Additional Support</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Workshops:</strong> Business skills development training</p>
                          <p><strong>Seminars:</strong> Industry insights and best practices</p>
                          <p><strong>Networking:</strong> Connect with other women entrepreneurs</p>
                          <p><strong>Memberships:</strong> Potential organization/advisory board access</p>
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What are the BMO Grant Eligibility Requirements?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Canadian Business Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Women-Owned:</strong> Business must be 51%+ owned by one or more women
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Canadian Resident:</strong> Legal age of majority in province/territory
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>For-Profit:</strong> Registered for-profit business in good standing
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Revenue:</strong> $5 million CAD or less in annual revenues
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Operating History:</strong> At least 2 years selling product/service by August 5, 2026
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">U.S. Business Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Women-Owned:</strong> 51%+ owned by one or more women
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Physical Location:</strong> In one of 24 eligible U.S. states (BMO footprint)
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>For-Profit:</strong> Annual revenues of $5 million USD or less
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Good Standing:</strong> Registered and in good standing in jurisdiction
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Operating History:</strong> At least 2 years in operation by August 5, 2026
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-orange-200 bg-orange-50 mt-8">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-orange-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-bold text-orange-800 mb-2">Important Eligibility Notes</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Previous Winners:</strong> Not eligible to reapply</li>
                            <li>• <strong>BMO Account:</strong> Not required (no impact on selection)</li>
                            <li>• <strong>Women Advancement:</strong> Must demonstrate commitment</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Sanctions:</strong> No government sanctions on owner/business</li>
                            <li>• <strong>U.S. States:</strong> 24 states in BMO footprint eligible</li>
                            <li>• <strong>All Provinces:</strong> All Canadian provinces eligible</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Apply for the BMO Celebrating Women Grant?</h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Complete Application",
                      description: "Submit online at www.bmoforwomen.com with business details and growth plans",
                      icon: <FileText className="w-6 h-6" />,
                      color: "blue"
                    },
                    {
                      step: "2",
                      title: "Semi-Finalist Video",
                      description: "If selected, create short video about business (notified September 2026)",
                      icon: <Sparkles className="w-6 h-6" />,
                      color: "green"
                    },
                    {
                      step: "3",
                      title: "Winner Announcement",
                      description: "Final recipients announced and receive grant package benefits",
                      icon: <Award className="w-6 h-6" />,
                      color: "cyan"
                    }
                  ].map((item, index) => {
                    const colors = {
                      blue: "bg-blue-500 text-white",
                      green: "bg-green-500 text-white",
                      cyan: "bg-cyan-500 text-white"
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
                      <Calendar className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold text-blue-800 mb-2">📅 2026 Program Timeline</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Applications Open:</strong> August 5, 2026 at 8:00 AM ET</li>
                              <li>• <strong>Applications Close:</strong> August 19, 2026 at 8:00 PM ET</li>
                              <li>• <strong>Application Window:</strong> 2 weeks only</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Semi-Finalists:</strong> Notified September 2026</li>
                              <li>• <strong>No Edits:</strong> Once submitted, cannot be changed</li>
                              <li>• <strong>No Save Draft:</strong> Complete in one session</li>
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

        {/* Application Questions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Information is Required for the Application?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Required Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Business Details:</strong> Name, location, revenue, industry, operating history
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Owner Information:</strong> Demographics, contact information, eligibility verification
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Women Advancement:</strong> How business supports advancement of women/girls
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Growth Plans:</strong> High-level business growth objectives and strategies
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Essay Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start">
                        <Lightbulb className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Impact Statement:</strong> Detail how business supports women advancement
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Lightbulb className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Growth Strategy:</strong> Plans to expand business with grant funding
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Lightbulb className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Challenges:</strong> Obstacles business may encounter and how to overcome
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Lightbulb className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Growth Goals:</strong> Quantifiable metrics and how grant helps achieve them
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Win the BMO Celebrating Women Grant?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Winning Application Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Clear Women Impact:</strong> Articulate specific ways business advances women/girls
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Detailed Growth Plan:</strong> Provide concrete, realistic business expansion strategies
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Quantifiable Goals:</strong> Include specific metrics and measurable objectives
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Complete in One Session:</strong> No save draft - prepare answers externally first
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common Application Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Vague Women Connection:</strong> Not clearly explaining how business advances women
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Generic Growth Plans:</strong> Lacking specific details and realistic timelines
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Missing Word Limits:</strong> Exceeding character/word count requirements
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Incomplete Application:</strong> Starting without preparing answers externally first
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">❓ Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-blue-900">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">📚 Related Women Business Grant Guides</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/women-entrepreneurship-fund-guide" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-pink-500">
                  <h3 className="font-semibold text-gray-900 mb-2">Women Entrepreneurship Fund Guide</h3>
                  <p className="text-sm text-gray-600">$5M+ in Canadian government funding for women-owned businesses</p>
                </Link>
                <Link href="/guides/bdc-women-entrepreneurs-financing-guide" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-500">
                  <h3 className="font-semibold text-gray-900 mb-2">BDC Women Entrepreneurs Financing</h3>
                  <p className="text-sm text-gray-600">Up to $100K loans with flexible terms for women business owners</p>
                </Link>
                <Link href="/blog/scotiabank-women-initiative" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-red-500">
                  <h3 className="font-semibold text-gray-900 mb-2">Scotiabank Women Initiative</h3>
                  <p className="text-sm text-gray-600">$3B in capital, mentorship, and advisory for women businesses</p>
                </Link>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <Link href="/usa/california" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900">California Women Business Grants →</h3>
                  <p className="text-sm text-gray-600">State-specific programs for California women entrepreneurs</p>
                </Link>
                <Link href="/usa/new-york" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900">New York Women Business Grants →</h3>
                  <p className="text-sm text-gray-600">Empire State funding opportunities for women business owners</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-800 to-cyan-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Apply for BMO Celebrating Women Grant?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get our complete application guide with women advancement frameworks and growth planning templates,
                or work with our grant specialists for expert application support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free Application Guide</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our comprehensive BMO Celebrating Women application guide with eligibility checklist,
                    essay templates, and women advancement demonstration frameworks.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/download/bmo-celebrating-women-grant-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Application Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with grant specialists who understand BMO criteria and can help optimize
                    your application for women advancement demonstration and growth planning.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=bmo-celebrating-women-grant-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-blue-200 text-sm mt-6">
                Expert guidance • Growth planning • Women advancement frameworks • BMO grant success
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
