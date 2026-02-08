import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket, MapPin, ExternalLink, HelpCircle, Briefcase } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alberta Women Business Grants 2026 | $580M Energy & Tech Support Programs",
  description: "Complete guide to Alberta women entrepreneurship support with AWE loans up to $150K, Women Building Futures, energy sector programs, and tech innovation funding.",
  keywords: "Alberta women business grants, AWE loans, Women Building Futures, Alberta women entrepreneurs, energy sector women, women business loans Calgary, female founder grants Edmonton, rural Alberta women business support, Alberta tech grants women",
  openGraph: {
    title: "Alberta Women Business Grants 2026 | $580M Provincial Support",
    description: "Comprehensive guide to Alberta women business support with AWE financing, energy sector programs, and technology funding.",
    url: "https://www.fsidigital.ca/blog/alberta-women-business-grants",
    images: ["/og-image.png"],
  },
}

const faqData = [
  {
    question: "Who is eligible for Alberta Women Entrepreneurs (AWE) loans?",
    answer: "AWE loans are available to businesses in Alberta that are at least 50% + 1 share owned by women. The business must be registered in Alberta, and the owner must be a Canadian citizen or permanent resident."
  },
  {
    question: "How much funding does Women Building Futures provide?",
    answer: "Women Building Futures is primarily a training organization that provides fully funded or subsidized pre-employment training for women in trades. They connect graduates directly with employers in the construction, maintenance, and energy sectors, which leads to high-paying careers."
  },
  {
    question: "Do rural Alberta women entrepreneurs have specific funding options?",
    answer: "Yes, the Community Futures Network of Alberta typically serves rural entrepreneurs. They offer loans up to $150,000 and have specific initiatives and advisory support for women entrepreneurs outside of major urban centers."
  },
  {
    question: "Are there grants for women in Alberta's energy sector?",
    answer: "Yes, specific support exists through Alberta Innovates and Emissions Reduction Alberta for clean tech and energy innovation. While not always women-exclusive, there are often streams or priority points for diverse-led leadership teams."
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

export default function AlbertaWomenBusinessGrantsGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-600 to-orange-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                ⚡ Alberta Women Business Support 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Alberta Women Business Grants & Growth Programs
              </h1>
              <p className="text-xl text-amber-100 mb-8">
                Access $580M in Alberta women entrepreneurship support including Alberta Women Entrepreneurs
                (AWE) loans up to $150,000, Women Building Futures trades programs, energy sector women
                initiatives, tech innovation funding, and comprehensive business growth resources across Alberta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-amber-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    View Alberta Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/alberta-women-business-grants-guide">
                    Get Free Alberta Guide
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
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 Alberta Women Entrepreneurship 2026 Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>$580M Provincial Support:</strong> Energy and innovation-focused ecosystem
                        </div>
                        <div>
                          <strong>AWE Loans:</strong> Up to $150,000 with flexible terms and business advisory
                        </div>
                        <div>
                          <strong>Women Building Futures:</strong> Trades training and energy sector access
                        </div>
                        <div>
                          <strong>Tech Innovation:</strong> Alberta Innovates women programs and funding
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
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Alberta Women Programs</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">Who qualifies for AWE loans?</h3>
                  <p className="text-sm text-gray-600 mt-1">50.1%+ women-owned Alberta businesses, market-ready stage.</p>
                </a>
                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">What's Women Building Futures?</h3>
                  <p className="text-sm text-gray-600 mt-1">Trades training program connecting women to energy sector careers.</p>
                </a>
                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">Rural support available?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, Community Futures serves rural Alberta entrepreneurs.</p>
                </a>
                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">Energy sector funding?</h3>
                  <p className="text-sm text-gray-600 mt-1">Alberta Innovates and ERA support clean tech and energy innovation.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Alberta Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Energy and Innovation Capital for Women Entrepreneurs</h2>
                <p className="text-lg text-gray-600">
                  Alberta provides unique women entrepreneurship support combining $580M in provincial funding,
                  energy sector opportunities, AWE financing up to $150,000, Women Building Futures trades access,
                  and tech innovation programs designed to help women succeed in Alberta's diverse economy.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">$580M</div>
                  <div className="text-gray-600">Provincial Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$150K</div>
                  <div className="text-gray-600">AWE Loans</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">Energy</div>
                  <div className="text-gray-600">Sector Access</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Trades</div>
                  <div className="text-gray-600">WBF Training</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alberta Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Alberta Women Business Support Programs</h2>

              <div className="space-y-8">
                {/* Alberta Women Entrepreneurs (AWE) */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-amber-600 mr-3" />
                      <CardTitle className="text-amber-700">Alberta Women Entrepreneurs (AWE)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-amber-800">Business Loans & Support</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-amber-50 p-3 rounded-lg">
                            <span className="font-semibold">Loan Amount:</span>
                            <span className="text-amber-700 font-bold">Up to $150,000</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Market-ready startups and business expansion</p>
                            <p>• Competitive rates: Prime +2% to Prime +4%</p>
                            <p>• Flexible repayment terms up to 5 years</p>
                            <p>• No early repayment penalties</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">AWE Eligibility</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Ownership:</strong> 50.1%+ women-owned Alberta businesses</p>
                          <p><strong>Location:</strong> Edmonton, Calgary, St. Albert, Fort Saskatchewan</p>
                          <p><strong>Business Stage:</strong> Market-ready or expansion</p>
                          <p><strong>Status:</strong> Canadian citizen or permanent resident</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 AWE Loan Uses:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Equipment:</strong> Purchases and upgrades</li>
                            <li>• <strong>Leasehold:</strong> Property improvements</li>
                            <li>• <strong>Inventory:</strong> Stock purchases</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Marketing:</strong> Advertising and promotion</li>
                            <li>• <strong>Technology:</strong> Digital upgrades</li>
                            <li>• <strong>Operating Costs:</strong> Business expenses</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Women Building Futures */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Women Building Futures</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-orange-800">Trades Training & Energy Sector</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                            <span className="font-semibold">Program Type:</span>
                            <span className="text-orange-700 font-bold">Trades & Energy</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Training women for careers in skilled trades</p>
                            <p>• Energy sector employment pathways</p>
                            <p>• Employer connections and job placement</p>
                            <p>• Certification and apprenticeship support</p>
                            <p>• Mentorship and career development</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">WBF Training Focus</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Construction:</strong> Building trades and carpentry</p>
                          <p><strong>Energy:</strong> Oil & gas, renewable energy careers</p>
                          <p><strong>Manufacturing:</strong> Industrial and production roles</p>
                          <p><strong>Transportation:</strong> Heavy equipment operation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Community Futures Network */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Community Futures Network of Alberta</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Rural Women Entrepreneur Support</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Loan Amount:</span>
                            <span className="text-green-700 font-bold">$10,000 - $75,000</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Network of 27 Community Futures locations providing unsecured conditionally
                              repayable loans for rural Alberta women entrepreneurs with local business
                              advisory support and skills development.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Rural Program Benefits</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Access:</strong> 27 rural Alberta locations</p>
                          <p><strong>Loans:</strong> Unsecured conditionally repayable</p>
                          <p><strong>Advisory:</strong> Local business advisor support</p>
                          <p><strong>Training:</strong> Skills development programs</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Alberta Innovates Women Programs */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Alberta Innovates Women in Technology & Innovation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Innovation Funding Programs</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Focus:</span>
                            <span className="text-blue-700 font-bold">Tech & Innovation</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Women-led tech startups and scale-ups</p>
                            <p>• Clean energy and environmental innovation</p>
                            <p>• AI and digital technology ventures</p>
                            <p>• Agri-food innovation and biotech</p>
                            <p>• Research commercialization support</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Innovation Support</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Grants:</strong> Technology development funding</p>
                          <p><strong>Acceleration:</strong> Innovation programs and mentorship</p>
                          <p><strong>Networks:</strong> Alberta tech ecosystem connections</p>
                          <p><strong>Commercialization:</strong> Market entry support</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Energy Sector Women Programs */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Energy Sector Women Support Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">Energy Industry Opportunities</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Sector:</span>
                            <span className="text-purple-700 font-bold">Energy</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Specialized programs supporting women entrepreneurs in Alberta's energy sector
                              including oil & gas services, renewable energy, clean tech, and energy transition
                              ventures with funding, mentorship, and industry connections.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Energy Programs</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Oil & Gas:</strong> Service company support</p>
                          <p><strong>Renewable Energy:</strong> Clean energy ventures</p>
                          <p><strong>Clean Tech:</strong> Environmental innovation</p>
                          <p><strong>Energy Transition:</strong> Sector diversification</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* WELF Alberta Access */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">Women Entrepreneurship Loan Fund (WELF) Alberta</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-pink-800">Federal Microloans</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-pink-50 p-3 rounded-lg">
                            <span className="font-semibold">Loan Amount:</span>
                            <span className="text-pink-700 font-bold">Up to $50,000</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Access to federal WELF microloans through WEOC network with Alberta Women
                              Entrepreneurs delivery, providing flexible financing, business advisory, and
                              training for women entrepreneurs across Alberta.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">WELF Benefits</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Microloans:</strong> Up to $50K for women businesses</p>
                          <p><strong>Terms:</strong> Flexible repayment up to 5 years</p>
                          <p><strong>Advisory:</strong> AWE business coaching included</p>
                          <p><strong>Network:</strong> WEOC national connections</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Alberta Women Business Support Success Strategies</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices for Alberta Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>AWE First Contact:</strong> Start with AWE for urban business loans and advisory
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Rural Resources:</strong> Use Community Futures for rural Alberta support
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Sector-Specific:</strong> Leverage energy or tech programs if in those sectors
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Trades Training:</strong> Explore Women Building Futures for trades careers
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common Alberta Application Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Wrong Location:</strong> Applying to AWE from outside service areas
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Pre-Market Stage:</strong> Not being market-ready for business loans
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Insufficient Ownership:</strong> Not meeting 50.1% women ownership requirement
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Missing Opportunities:</strong> Not exploring sector-specific energy or tech programs
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Official Resources Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <ExternalLink className="w-8 h-8 text-amber-700" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Official Alberta Resources</h2>
                  <p className="text-gray-600">Direct links to government and partner verification sources</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-amber-100 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-amber-700">Program Applications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href="https://www.awebusiness.com/" target="_blank" className="flex items-center text-gray-700 hover:text-amber-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-amber-500" />
                      Alberta Women Entrepreneurs (AWE)
                    </Link>
                    <Link href="https://womenbuildingfutures.ca/" target="_blank" className="flex items-center text-gray-700 hover:text-amber-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-amber-500" />
                      Women Building Futures
                    </Link>
                    <Link href="https://albertacf.com/" target="_blank" className="flex items-center text-gray-700 hover:text-amber-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-amber-500" />
                      Community Futures Alberta
                    </Link>
                  </CardContent>
                </Card>
                <Card className="border-amber-100 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-amber-700">Support Networks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href="https://albertainnovates.ca/" target="_blank" className="flex items-center text-gray-700 hover:text-amber-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-amber-500" />
                      Alberta Innovates
                    </Link>
                    <Link href="https://www.alberta.ca/small-business-resources.aspx" target="_blank" className="flex items-center text-gray-700 hover:text-amber-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-amber-500" />
                      Alberta Small Business Resources
                    </Link>
                    <Link href="https://businesslink.ca/" target="_blank" className="flex items-center text-gray-700 hover:text-amber-600 group">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400 group-hover:text-amber-500" />
                      Business Link Alberta
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section and Related Guides */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* FAQ Section */}
              <div className="mb-20" id="faqs">
                <h2 className="text-3xl font-bold text-center mb-12">Alberta Women Business Grants FAQs</h2>
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

              {/* Related Guides Section */}
              <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">More Funding Resources for Alberta</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-amber-100">
                    <CardHeader>
                      <Briefcase className="w-8 h-8 text-amber-600 mb-4" />
                      <CardTitle className="text-xl mb-2">Alberta Business Grants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">
                        Guide to provincial business grants, loans, and tax credits available in Alberta.
                      </p>
                      <Button variant="outline" className="w-full text-amber-700 border-amber-200 hover:bg-amber-50" asChild>
                        <Link href="/blog/alberta-government-business-grants">
                          View Alberta Grants
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-amber-100">
                    <CardHeader>
                      <MapPin className="w-8 h-8 text-amber-600 mb-4" />
                      <CardTitle className="text-xl mb-2">Startup Funding</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">
                        Explore startup funding, loans, and investment for new businesses across Canada.
                      </p>
                      <Button variant="outline" className="w-full text-amber-700 border-amber-200 hover:bg-amber-50" asChild>
                        <Link href="/blog/startup-business-grants-canada-guide">
                          View Startup Funding
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-amber-100">
                    <CardHeader>
                      <Target className="w-8 h-8 text-amber-600 mb-4" />
                      <CardTitle className="text-xl mb-2">Grants for Women</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">
                        See individual grant opportunities like the Amber Grant for women entrepreneurs.
                      </p>
                      <Button variant="outline" className="w-full text-amber-700 border-amber-200 hover:bg-amber-50" asChild>
                        <Link href="/blog/amber-grant-women-canada">
                          View Amber Grant
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Alberta Women Business Support?
              </h2>
              <p className="text-xl text-amber-100 mb-8">
                Get our complete Alberta women business support guide with program comparison and application templates,
                or work with our Alberta funding specialists for expert application support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free Alberta Support Guide</h4>
                  <p className="text-amber-100 text-sm mb-4">
                    Get our comprehensive Alberta women business support guide with AWE loan templates,
                    Community Futures insights, and energy sector opportunities.
                  </p>
                  <Button size="lg" className="w-full bg-white text-amber-700 hover:bg-gray-100" asChild>
                    <Link href="/download/alberta-women-business-grants-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get Alberta Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Alberta Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with Alberta funding specialists who understand provincial programs and can help
                    optimize your applications for AWE and innovation funding success.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=alberta-women-business-grants-help">
                      Get Alberta Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-amber-200 text-sm mt-6">
                Expert guidance • Provincial programs • Energy & tech support • Alberta women entrepreneur success
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
