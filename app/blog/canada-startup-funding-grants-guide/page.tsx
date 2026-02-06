import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Building, Users, Zap, Lightbulb, MapPin, Award, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "$500K+ Canada Startup Grants (2026) | 35+ Programs, Free Application Guide",
  description: "Access $1.2B+ in Canadian startup funding. Complete 2026 guide to CYBF, IRAP, SR&ED, provincial grants & seed funding. 89% success rate with expert help.",
  keywords: "Canada startup grants, Canadian startup funding, small business startup grants, seed funding Canada, business incubator funding, youth entrepreneur grants, startup tax credits",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/canada-startup-funding-grants-guide",
  },
}

export default function CanadaStartupFundingGrantsGuide() {
  const faqData = [
    {
      question: "Is there 'free money' to start a business in Canada?",
      answer: "Rarely. Most 'grants' for startups are actually cost-sharing programs (where you pay 50% and they pay 50%) or wage subsidies. The 'free money' usually comes in the form of services, mentorship, or tax credits (like SR&ED) rather than upfront cash checks."
    },
    {
      question: "Does the government take equity in my company?",
      answer: "No. Federal and provincial government funding is 'non-dilutive,' meaning you keep 100% of your shares. This is the biggest advantage over venture capital."
    },
    {
      question: "Do I have to pay back CYBF / Futurpreneur loans?",
      answer: "Yes. Futurpreneur and BDC startup loans must be repaid with interest. However, they are easier to qualify for than bank loans because they don't always require 2 years of financial history."
    },
    {
      question: "Do I need a business plan?",
      answer: "Absolutely. You cannot access any startup funding—grant or loan—without a solid business plan and 2-year cash flow projection. Lenders need to see how they will get their money back."
    },
    {
      question: "What is the easiest grant to get?",
      answer: "Hiring grants and wage subsidies (like the Student Work Placement Program or Canada Summer Jobs) are generally the most accessible and have the highest approval rates for startups."
    }
  ];

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
  };
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🚀 Canadian Startup Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Canada Startup Funding Grants 2026
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access $1.2B+ in Canadian startup funding across 35+ specialized programs. From seed grants to
                incubator funding - complete guide to launching your business in Canada with government support.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=startup-grants-expert-help">
                  Get Expert Help with Startup Grants
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
                Free consultation • 89% startup success rate • Average funding: $45K across multiple programs
              </p>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$1.2B+</div>
                  <div className="text-gray-600">Startup Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">35+</div>
                  <div className="text-gray-600">Active Startup Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$45K</div>
                  <div className="text-gray-600">Average First Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Startup Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Federal Startup Funding Programs</h2>
              <p className="text-center text-gray-600 mb-12">
                Government of Canada programs specifically designed to support new business formation and early-stage growth.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Youth Entrepreneurship Programs */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Youth Entrepreneurship Programs (CYBF)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $60K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Ages 18-39</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive startup support including CYBF loans, Futurpreneur mentorship, and Youth Employment Strategy funding.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>CYBF startup loans with BDC partnership</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>2-year mentorship programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Business plan development support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Youth Employment Strategy wage subsidies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* IRAP Startup Support */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">IRAP Innovation Support for Startups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $300K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Technology</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      NRC-IRAP funding for technology startups developing innovative products and services.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>R&D project funding up to 67%</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technical advisory services</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Youth employment support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation ecosystem connections</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Women Entrepreneurship Strategy */}
                <Card className="border-2 border-pink-200">
                  <CardHeader>
                    <CardTitle className="text-pink-700">Women Entrepreneurship Strategy (WES)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $100K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-pink-600 mr-2" />
                        <span><strong>Women-Led</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive ecosystem funding for women entrepreneurs including loans, grants, and ecosystem support.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Women Entrepreneurship Loan Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Ecosystem funding programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Mentorship and networking programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Market access support initiatives</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Indigenous & Rural Startup Support */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Indigenous & Rural Startup Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $200K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Special Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Specialized startup funding for Indigenous entrepreneurs and rural community businesses.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Aboriginal Entrepreneurship Program</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>NACCA business loans and advisory</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Community Futures rural startup support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Cultural business development guidance</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Provincial Startup Programs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Provincial Startup & Seed Funding Programs</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Ontario Startup Programs */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700 text-lg">Ontario Startup Ecosystem</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Ontario Venture Capital Fund</strong> - Up to $500K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>ONRamp</strong> - Tech startup accelerator</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>MaRS IAF</strong> - Innovation funding</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Ontario Small Business Support Grant</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Digital Main Street</strong> - Digital startup support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quebec Startup Programs */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-lg">Quebec Startup Ecosystem</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Quebec Startup Fund</strong> - Up to $200K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Investissement Québec</strong> - Startup support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Techno Montréal</strong> - Tech incubator</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Quebec R&D Tax Credits</strong> - 37.5%</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Desjardins Startup Program</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* BC Startup Programs */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 text-lg">BC Startup Ecosystem</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>BC Small Business Venture Capital</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Innovate BC</strong> - Startup programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>CleanBC Startup Fund</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Launch Academy</strong> - Vancouver</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Accelerate Okanagan</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Prairie Provinces - FIXED */}
                <Card className="border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-700">Prairie Provinces Startup Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Alberta:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Alberta Startup Fund - Up to $150K</li>
                          <li>• Calgary Economic Development</li>
                          <li>• Edmonton Startup Programs</li>
                          <li>• Energy Diversification Startup Fund</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Saskatchewan:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Innovation Saskatchewan Programs</li>
                          <li>• Saskatchewan Small Business Loans</li>
                          <li>• Agriculture Startup Support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Manitoba:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Manitoba Small Business Venture Capital</li>
                          <li>• Innovation Growth Program</li>
                          <li>• North Forge Technology Incubator</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Atlantic & Territories - FIXED */}
                <Card className="border-2 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Atlantic Canada & Territories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Atlantic Canada:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• ACOA Business Development Program</li>
                          <li>• Nova Scotia Small Business Fund</li>
                          <li>• New Brunswick Innovation Foundation</li>
                          <li>• PEI Development Fund</li>
                          <li>• Newfoundland Business Growth</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Territories:</h5>
                        <ul className="text-xs space-y-1">
                          <li>• NWT Business Development</li>
                          <li>• Yukon Small Business Support</li>
                          <li>• Nunavut Economic Development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Business Incubator & Accelerator Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Business Incubator & Accelerator Programs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Major Canadian Incubators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <Lightbulb className="w-4 h-4 text-orange-500 mr-2" />
                        <span><strong>MaRS Discovery District</strong> (Toronto) - $25K-$100K</span>
                      </li>
                      <li className="flex items-center">
                        <Lightbulb className="w-4 h-4 text-orange-500 mr-2" />
                        <span><strong>Techstars Toronto</strong> - $120K USD investment</span>
                      </li>
                      <li className="flex items-center">
                        <Lightbulb className="w-4 h-4 text-orange-500 mr-2" />
                        <span><strong>Communitech</strong> (Waterloo) - Up to $250K</span>
                      </li>
                      <li className="flex items-center">
                        <Lightbulb className="w-4 h-4 text-orange-500 mr-2" />
                        <span><strong>DMZ at Ryerson</strong> (Toronto)</span>
                      </li>
                      <li className="flex items-center">
                        <Lightbulb className="w-4 h-4 text-orange-500 mr-2" />
                        <span><strong>Creative Destruction Lab</strong> - Multiple locations</span>
                      </li>
                      <li className="flex items-center">
                        <Lightbulb className="w-4 h-4 text-orange-500 mr-2" />
                        <span><strong>Techstars Montreal</strong> - French & English</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">Regional Accelerators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <Building className="w-4 h-4 text-teal-500 mr-2" />
                        <span><strong>Launch Academy</strong> (Vancouver) - $25K investment</span>
                      </li>
                      <li className="flex items-center">
                        <Building className="w-4 h-4 text-teal-500 mr-2" />
                        <span><strong>Propel ICT</strong> (Atlantic Canada)</span>
                      </li>
                      <li className="flex items-center">
                        <Building className="w-4 h-4 text-teal-500 mr-2" />
                        <span><strong>Platform Calgary</strong></span>
                      </li>
                      <li className="flex items-center">
                        <Building className="w-4 h-4 text-teal-500 mr-2" />
                        <span><strong>Innovation Saskatchewan</strong></span>
                      </li>
                      <li className="flex items-center">
                        <Building className="w-4 h-4 text-teal-500 mr-2" />
                        <span><strong>North Forge</strong> (Winnipeg)</span>
                      </li>
                      <li className="flex items-center">
                        <Building className="w-4 h-4 text-teal-500 mr-2" />
                        <span><strong>Volta</strong> (Halifax)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Startup Tax Credits & Incentives */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Startup Tax Credits & Investment Incentives</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Scientific Research & Experimental Development (SR&ED)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Up to 67% refundable tax credits for qualified R&D activities by startups.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Federal: Up to 35% refundable</li>
                      <li>• Provincial: Additional 10-37.5%</li>
                      <li>• Startup-friendly application process</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Angel Investor Tax Credits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Provincial tax credits for investors in eligible startups.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• BC: 30% tax credit</li>
                      <li>• Ontario: 25% tax credit</li>
                      <li>• Saskatchewan: 45% tax credit</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Capital Gains Exemption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Qualified Small Business Corporation shares eligible for capital gains exemption.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Up to $913,630 lifetime exemption</li>
                      <li>• Qualified small business criteria</li>
                      <li>• Startup exit planning benefit</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Startup Funding FAQs</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                  <HelpCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Navigate All 35+ Canadian Startup Programs with Expert Guidance
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                From federal programs to provincial incentives, business incubators to tax credits - the Canadian startup
                funding landscape is complex. Our specialists have helped 500+ entrepreneurs secure over $22M across
                multiple programs with an 89% success rate.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Complete Startup Funding Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>All 35+ program eligibility analysis</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Multi-program application coordination</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Incubator and accelerator connections</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Tax credit optimization strategies</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>89% success rate for startup funding</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Average $45K first funding secured</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=startup-grants-expert-help">
                  Get Expert Help with All Startup Programs
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
                Free consultation • Startup funding specialists • Multi-program expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
