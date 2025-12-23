import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Zap, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Youth Entrepreneurship Canada 2026 | $60K+ Young Entrepreneur Grants & Business Funding",
  description: "Complete guide to Canadian youth entrepreneur funding programs. Access CYBF grants up to $60K, Youth Employment Strategy funding, and young business startup loans for entrepreneurs aged 18-35 across Canada.",
  keywords: "youth entrepreneurship Canada, young entrepreneur grants Canada, Canadian youth business foundation, CYBF funding, youth business loans Canada, young entrepreneur startup funding, youth employment strategy, Canadian youth business grants, young business owner funding",
  openGraph: {
    title: "Youth Entrepreneurship Canada 2026 | $60K+ Young Entrepreneur Grants & Funding",
    description: "Access $60K+ in Canadian government funding for young entrepreneurs. Complete guide to CYBF grants, Youth Employment Strategy, and startup funding for youth aged 18-35.",
    url: "https://www.fsidigital.ca/blog/youth-entrepreneurship-canada-funding",
    images: ["/og-image.png"],
  },
}

export default function YouthEntrepreneurshipBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🧑‍💼 Youth Entrepreneurship Guide Canada
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Youth Entrepreneurship Canada Funding 2026
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Complete guide to Canadian youth entrepreneur funding programs. Access CYBF grants up to $60K,
                Youth Employment Strategy funding, and young business startup loans for entrepreneurs aged 18-35
                across all Canadian provinces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=youth&age=18-35">
                    Check Youth Funding Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/small-business-grants">
                    Back to Canadian Business Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Program Statistics - SEO Optimized */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$60K+</div>
                  <div className="text-gray-600">Max CYBF Youth Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">18-35</div>
                  <div className="text-gray-600">Eligible Age Range</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">25,000+</div>
                  <div className="text-gray-600">Young Entrepreneurs Funded</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">78%</div>
                  <div className="text-gray-600">Youth Business Success Rate</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Youth Entrepreneurship Funding in Canada?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Canada offers comprehensive youth entrepreneurship support through multiple government programs designed
                  to help young Canadians aged 18-35 start and scale their businesses. From the Canadian Youth Business
                  Foundation (CYBF) providing up to $60,000 in startup funding to the Youth Employment Strategy offering
                  wage subsidies and skills training, young entrepreneurs have access to significant financial support
                  across all provinces and territories.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-indigo-800">Youth Funding Benefits</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• CYBF startup loans up to $60,000</li>
                      <li>• Youth Employment Strategy wage subsidies</li>
                      <li>• Futurpreneur Canada mentorship + funding</li>
                      <li>• Provincial young entrepreneur grants</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Target Youth Demographics</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Young entrepreneurs aged 18-35</li>
                      <li>• Recent graduates starting businesses</li>
                      <li>• Youth facing employment barriers</li>
                      <li>• Student entrepreneurs and side hustles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Youth Funding Programs - High CPC Keywords */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Youth Entrepreneurship Funding Programs</h2>

              <div className="space-y-8">
                {/* Canadian Youth Business Foundation (CYBF) */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">Canadian Youth Business Foundation (CYBF)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $60K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Ages 18-39</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Startup Loans</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      CYBF provides startup financing, mentorship, and business resources to young Canadian entrepreneurs.
                      Combined with BDC partnerships, youth can access up to $60,000 in startup capital.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">CYBF Funding Details:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to $20K direct CYBF loan</li>
                          <li>• Additional $40K through BDC partnership</li>
                          <li>• 0% interest for first 2 years</li>
                          <li>• 2-year mentorship program included</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligibility Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Canadian citizen or permanent resident</li>
                          <li>• Ages 18-39 years old</li>
                          <li>• New business or less than 1 year old</li>
                          <li>• Solid business plan and character assessment</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Futurpreneur Canada */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Star className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Futurpreneur Canada</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $60K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Ages 18-39</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Mentorship + Loans</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Futurpreneur Canada offers startup loans combined with 2-year mentorship programs specifically
                      designed for young entrepreneurs across Canada.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Funding Streams:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• $20K startup financing</li>
                          <li>• Up to $40K additional from partners</li>
                          <li>• Collateral-free loans available</li>
                          <li>• Flexible repayment terms</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Services:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 2-year professional mentorship</li>
                          <li>• Business plan development support</li>
                          <li>• Networking events and workshops</li>
                          <li>• Online learning resources</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Youth Employment Strategy */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Youth Employment & Skills Strategy (YESS)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Wage Subsidies</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Ages 15-30</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Skills Training</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      The Youth Employment Strategy provides wage subsidies to employers hiring young people,
                      plus skills training and work experience programs for young entrepreneurs.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Program Components:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Canada Summer Jobs wage subsidies</li>
                          <li>• Skills development training programs</li>
                          <li>• Work experience placements</li>
                          <li>• Youth entrepreneurship support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Target Groups:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Youth facing barriers to employment</li>
                          <li>• Recent graduates and students</li>
                          <li>• Indigenous and diverse youth</li>
                          <li>• Youth in rural and remote areas</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* BDC Young Entrepreneur Financing */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">BDC Young Entrepreneur Financing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$100K+ Loans</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Under 35</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Growth Financing</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Business Development Bank of Canada provides specialized financing solutions for young entrepreneurs
                      looking to start or expand their businesses.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Financing Options:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Term loans up to $100K+</li>
                          <li>• Operating lines of credit</li>
                          <li>• Equipment financing</li>
                          <li>• Working capital loans</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Young Entrepreneur Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Reduced interest rates for youth</li>
                          <li>• Flexible collateral requirements</li>
                          <li>• Business coaching and advice</li>
                          <li>• Partnership with CYBF and Futurpreneur</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Provincial Youth Programs - Geo-Targeted SEO */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Provincial Young Entrepreneur Support Programs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-indigo-700">🚀 Major Provincial Youth Programs:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Ontario Summer Company:</strong> Young entrepreneurs up to $3,000 grants</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Quebec Young Entrepreneur Grants:</strong> Jeunes Entreprises du Québec funding</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>BC Small Business Venture Capital:</strong> Youth business investment programs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Alberta Youth Entrepreneurship:</strong> Young business owner support</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-700">⭐ Specialized Youth Support:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Indigenous Youth Entrepreneurship:</strong> NACCA and Indigenous business loans</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Student Entrepreneur Programs:</strong> Campus-linked business incubators</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Rural Youth Business Support:</strong> Remote entrepreneur funding programs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Youth with Disabilities:</strong> Accessible entrepreneurship programs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Youth Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Apply for Youth Entrepreneurship Funding</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="bg-indigo-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Verify Age and Citizenship Eligibility</h4>
                    <p className="text-gray-600">Confirm you meet age requirements (typically 18-39) and are a Canadian citizen or permanent resident.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-indigo-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Develop Your Young Entrepreneur Business Plan</h4>
                    <p className="text-gray-600">Create comprehensive business plan highlighting innovation, market opportunity, and your commitment as a young entrepreneur.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-indigo-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Choose the Right Youth Funding Program</h4>
                    <p className="text-gray-600">Select between CYBF loans, Futurpreneur mentorship, provincial youth grants, or federal employment programs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-indigo-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Complete Application and Character Assessment</h4>
                    <p className="text-gray-600">Submit detailed application with financial projections, character references, and commitment to mentorship programs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-indigo-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Leverage Young Entrepreneur Networks</h4>
                    <p className="text-gray-600">Connect with youth entrepreneurship organizations, startup incubators, and young business owner communities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips for Young Entrepreneurs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Success Tips for Young Entrepreneurs in Canada</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Maximize Your Youth Funding Success:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Emphasize Innovation:</strong> Show how your young perspective brings fresh solutions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Demonstrate Learning Agility:</strong> Highlight your adaptability and growth mindset</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Embrace Mentorship:</strong> Show commitment to learning from experienced entrepreneurs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Network Actively:</strong> Join young entrepreneur organizations and startup communities</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Young Entrepreneur Funding Mistakes:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Overconfident Projections:</strong> Young entrepreneurs often overestimate market penetration</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Insufficient Market Research:</strong> Not validating business ideas with real customers</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Weak Financial Planning:</strong> Underestimating startup costs and cash flow needs</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Ignoring Mentorship Opportunities:</strong> Not taking advantage of guidance programs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 CTAs Section - High Converting Keywords */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Youth Entrepreneurship Funding?
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Get the complete young entrepreneur application guide or work with our youth funding experts
                to maximize your CYBF and Canadian youth business grant approvals.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Get Application Guide CTA */}
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Approach</h4>
                  <p className="text-indigo-100 text-sm mb-4">
                    Get our comprehensive youth entrepreneur application guide with CYBF templates and funding strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-indigo-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-youth-entrepreneurship-funding">
                      <Download className="w-4 h-4 mr-2" />
                      Get Youth Funding Guide
                    </Link>
                  </Button>
                </div>

                {/* Get Expert Help CTA */}
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Assistance</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with youth funding specialists who have secured $8M+ for young Canadian entrepreneurs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=youth-entrepreneurship-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-indigo-200 text-sm mt-6">
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
