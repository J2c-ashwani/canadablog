import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, ExternalLink, MapPin, Building, Users, Zap, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canadian Small Business Grants 2025 | $8B+ Available for SMEs",
  description: "Comprehensive guide to Canadian small business grants. Access federal and provincial funding programs with up to $1M available for Canadian SMEs.",
  keywords: "Canadian small business grants, Canada SME funding, small business grants Canada, federal business grants, provincial SME support",
  openGraph: {
    title: "Canadian Small Business Grants 2025 | $8B+ Available for SMEs",
    description: "Complete guide to small business grants in Canada with federal and provincial programs offering up to $1M in funding.",
    url: "https://www.fsidigital.ca/canada/small-business-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function CanadianSmallBusinessGrants() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                🏢 Canadian Small Business Grants
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance leading-tight">
                $8+ Billion Available for Canadian SMEs
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
                Access comprehensive small business funding from federal, provincial, and territorial programs. 
                From startup grants to growth funding - find the perfect grant for your Canadian small business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4">
                  Find My Grants Now
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-700/30 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                  Browse by Province
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="p-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$8.2B+</div>
                  <div className="text-gray-600 font-medium">SME Funding Available</div>
                  <div className="text-sm text-gray-500 mt-1">Federal + Provincial</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">$1M</div>
                  <div className="text-gray-600 font-medium">Maximum Grant Amount</div>
                  <div className="text-sm text-gray-500 mt-1">Per Program</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
                  <div className="text-gray-600 font-medium">Active SME Programs</div>
                  <div className="text-sm text-gray-500 mt-1">All Provinces</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">82%</div>
                  <div className="text-gray-600 font-medium">Success Rate</div>
                  <div className="text-sm text-gray-500 mt-1">Prepared Applications</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Federal SME Programs - UPDATED WITH ALL 6 CARDS */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                  Federal Programs
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Major Federal SME Grant Programs
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Access flagship federal programs designed specifically to support 
                  small and medium enterprises across Canada.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Canada Small Business Financing Program */}
                <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        CSBFP
                      </div>
                      <div>
                        <CardTitle className="text-blue-700 text-xl">Canada Small Business Financing Program</CardTitle>
                        <p className="text-blue-600 text-sm">Innovation, Science & Economic Development Canada</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Up to $1M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>SMEs</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>85% Guarantee</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Government-guaranteed loans for small businesses to purchase equipment, 
                      improve leasehold, and buy real property.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Up to $350K for equipment financing</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Up to $500K for real property</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Competitive interest rates</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                      <Link href="/blog/csbfp-canada-small-business-financing-program">
                        Learn About CSBFP
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* IRAP for SMEs */}
                <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-green-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        IRAP
                      </div>
                      <div>
                        <CardTitle className="text-green-700 text-xl">Industrial Research Assistance Program</CardTitle>
                        <p className="text-green-600 text-sm">National Research Council Canada</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Up to $1M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Tech SMEs</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>67% Funding</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Non-repayable contributions for small businesses developing and 
                      commercializing innovative technologies.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>R&D project funding up to 67%</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Technical advisory services</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Youth employment support</span>
                      </div>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                      <Link href="/blog/irap-industrial-research-assistance-program">
                        Learn About IRAP
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Women Entrepreneurship Strategy */}
                <Card className="border-2 border-pink-200 hover:border-pink-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-pink-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        WES
                      </div>
                      <div>
                        <CardTitle className="text-pink-700 text-xl">Women Entrepreneurship Strategy</CardTitle>
                        <p className="text-pink-600 text-sm">Innovation, Science & Economic Development Canada</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>$6B Available</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Women-Led</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>All Stages</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive support ecosystem for women entrepreneurs including 
                      financing, mentorship, and market access programs.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Women Entrepreneurship Loan Fund</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Ecosystem funding programs</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Business development support</span>
                      </div>
                    </div>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700" asChild>
                      <Link href="/blog/women-entrepreneurship-strategy-canada">
                        Learn About WES
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Youth Entrepreneurship Programs - NEW CARD */}
                <Card className="border-2 border-indigo-200 hover:border-indigo-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-indigo-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        CYBF
                      </div>
                      <div>
                        <CardTitle className="text-indigo-700 text-xl">Youth Entrepreneurship Programs</CardTitle>
                        <p className="text-indigo-600 text-sm">CYBF, Futurpreneur & Youth Employment Strategy</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Up to $60K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Ages 18-39</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Mentorship</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive support for young Canadian entrepreneurs including 
                      startup loans, mentorship, and business development programs.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>CYBF startup loans + BDC partnership</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>2-year mentorship programs</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Youth Employment Strategy support</span>
                      </div>
                    </div>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                      <Link href="/blog/youth-entrepreneurship-canada-funding">
                        Learn About Youth Programs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Indigenous & Rural Business Funding - NEW CARD */}
                <Card className="border-2 border-amber-200 hover:border-amber-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-amber-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        AEP
                      </div>
                      <div>
                        <CardTitle className="text-amber-700 text-xl">Indigenous & Rural Business Funding</CardTitle>
                        <p className="text-amber-600 text-sm">Aboriginal Entrepreneurship Program & NACCA</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Indigenous & Rural</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Cultural Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Specialized funding for Indigenous entrepreneurs and rural businesses, 
                      including culturally appropriate support and flexible financing options.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Aboriginal Entrepreneurship Program grants</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>NACCA business loans and advisory</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Community Futures rural support</span>
                      </div>
                    </div>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
                      <Link href="/blog/indigenous-rural-business-funding-canada">
                        Learn About Indigenous & Rural Programs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Regional Development Agencies */}
                <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-purple-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        RDA
                      </div>
                      <div>
                        <CardTitle className="text-purple-700 text-xl">Regional Development Agencies</CardTitle>
                        <p className="text-purple-600 text-sm">6 Regional Development Agencies</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>$2.8B Total</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Regional Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>All Industries</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Region-specific funding programs delivered through six federal 
                      regional development agencies across Canada.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Atlantic Canada Opportunities Agency (ACOA)</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Western Economic Diversification (WED)</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Federal Economic Development Agency</span>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                      <Link href="/blog/regional-development-agencies-funding">
                        Learn About RDA Programs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Expanded Provincial SME Programs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                  Provincial Programs
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Provincial Small Business Support
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Each province offers specialized programs tailored to local 
                  economic priorities and small business needs.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Ontario */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-red-700">Ontario</CardTitle>
                      <MapPin className="w-5 h-5 text-red-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$2.1B</div>
                    <div className="text-sm text-gray-600 mb-4">SME Funding Available</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Ontario Small Business Support Grant</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Digital Main Street Program</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Jobs and Prosperity Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Ontario Innovation Tax Credit</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/ontario-small-business-grants-guide">
                        Ontario SME Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Quebec */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Quebec</CardTitle>
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$1.8B</div>
                    <div className="text-sm text-gray-600 mb-4">SME Support Programs</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Investissement Québec SME Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Quebec Startup Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Tech Transfer Tax Credit</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>R&D Tax Credits (37.5%)</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/quebec-small-business-grants-guide">
                        Quebec SME Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* British Columbia */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">British Columbia</CardTitle>
                      <MapPin className="w-5 h-5 text-green-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$1.3B</div>
                    <div className="text-sm text-gray-600 mb-4">Available for SMEs</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Small Business Recovery Grant</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>BC Small Business Venture Capital</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>CleanBC Industry Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Indigenous Business Investment</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/bc-small-business-grants-guide">
                        BC SME Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Alberta */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-orange-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Alberta</CardTitle>
                      <MapPin className="w-5 h-5 text-orange-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$980M</div>
                    <div className="text-sm text-gray-600 mb-4">Business Development Funding</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Alberta Small Business Grant</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology Innovation Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Rural Economic Development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Energy Diversification Program</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/alberta-small-business-grants-guide">
                        Alberta SME Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Saskatchewan */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-yellow-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-yellow-700">Saskatchewan</CardTitle>
                      <MapPin className="w-5 h-5 text-yellow-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$425M</div>
                    <div className="text-sm text-gray-600 mb-4">SME Growth Programs</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Saskatchewan Small Business Loans</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation Saskatchewan Programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Agriculture Value-Added Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Export Development Program</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/saskatchewan-small-business-grants-guide">
                        Saskatchewan SME Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Manitoba */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-teal-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-teal-700">Manitoba</CardTitle>
                      <MapPin className="w-5 h-5 text-teal-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$380M</div>
                    <div className="text-sm text-gray-600 mb-4">Business Development</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Manitoba Business Development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation Growth Program</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Small Business Venture Capital</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Rural Development Corporation</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/manitoba-small-business-grants-guide">
                        Manitoba SME Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Atlantic Provinces */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-indigo-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-indigo-700">Atlantic Canada</CardTitle>
                      <MapPin className="w-5 h-5 text-indigo-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$850M</div>
                    <div className="text-sm text-gray-600 mb-4">ACOA & Provincial Combined</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Nova Scotia Small Business Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>New Brunswick Innovation</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>PEI Development Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Newfoundland Business Growth</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/atlantic-small-business-grants-guide">
                        Atlantic SME Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Northern Territories */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-purple-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Territories</CardTitle>
                      <MapPin className="w-5 h-5 text-purple-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$125M</div>
                    <div className="text-sm text-gray-600 mb-4">NT, YT, Nunavut Combined</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>NWT Business Development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Yukon Small Business Support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Nunavut Economic Development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Indigenous Business Programs</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/territories-small-business-grants-guide">
                        Territories SME Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/contact?service=provincial-grants-expert-help">
                    Get Expert Help with Provincial Programs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SME Grant Categories */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                  Grant Categories
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Find Grants by Business Need
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Explore funding opportunities organized by business stage, 
                  industry focus, and specific small business requirements.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Building className="w-8 h-8 text-blue-600" />,
                    title: "Startup Funding",
                    description: "Initial capital and seed funding for new Canadian small businesses",
                    amount: "$1.2B+",
                    programs: "35+ Programs",
                    color: "blue",
                    slug: "startup-funding"
                  },
                  {
                    icon: <Zap className="w-8 h-8 text-green-600" />,
                    title: "Growth & Expansion",
                    description: "Scale funding for established SMEs looking to expand operations",
                    amount: "$2.8B+", 
                    programs: "42+ Programs",
                    color: "green",
                    slug: "growth-expansion"
                  },
                  {
                    icon: <Users className="w-8 h-8 text-purple-600" />,
                    title: "Hiring & Training",
                    description: "Workforce development and job creation incentive programs",
                    amount: "$1.9B+",
                    programs: "28+ Programs",
                    color: "purple",
                    slug: "hiring-training"
                  },
                  {
                    icon: <Target className="w-8 h-8 text-red-600" />,
                    title: "Technology Adoption",
                    description: "Digital transformation and technology integration support",
                    amount: "$950M+",
                    programs: "22+ Programs",
                    color: "red",
                    slug: "technology-adoption"
                  },
                  {
                    icon: <MapPin className="w-8 h-8 text-orange-600" />,
                    title: "Export Development",
                    description: "International market expansion and export readiness programs",
                    amount: "$680M+",
                    programs: "18+ Programs",
                    color: "orange",
                    slug: "export-development"
                  },
                  {
                    icon: <Award className="w-8 h-8 text-teal-600" />,
                    title: "Industry Specific",
                    description: "Sector-focused programs for manufacturing, agriculture, services",
                    amount: "$1.5B+",
                    programs: "25+ Programs",
                    color: "teal",
                    slug: "industry-specific"
                  }
                ].map((category, index) => {
                  const colorClasses = {
                    blue: "border-blue-200 hover:border-blue-300",
                    green: "border-green-200 hover:border-green-300", 
                    purple: "border-purple-200 hover:border-purple-300",
                    red: "border-red-200 hover:border-red-300",
                    orange: "border-orange-200 hover:border-orange-300",
                    teal: "border-teal-200 hover:border-teal-300"
                  }
                  
                  return (
                    <Card key={index} className={`hover:shadow-lg transition-all ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          {category.icon}
                          <Badge variant="outline" className="text-xs">
                            {category.programs}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                        <div className="text-2xl font-bold text-gray-900 mb-2">{category.amount}</div>
                        <div className="text-sm text-gray-500 mb-4">Available Funding</div>
                        <Button variant="outline" className="w-full" size="sm" asChild>
                          <Link href={`/blog/canada-${category.slug}-grants-guide`}>
                            Explore Category
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Get Expert Help CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Get Expert Help with Your Canadian SME Grant Applications
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Don't navigate the complex world of Canadian grants alone. Our experts have helped secure over $50M 
                in funding for Canadian small businesses. Get personalized guidance and increase your success rate.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">Why Choose Our Expert Help:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>85% average success rate vs 35% DIY</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Complete application management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Federal & provincial program expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Strategic funding portfolio planning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Save 120+ hours of research time</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Maximize funding amounts secured</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=canada-sme-grants-expert-help">
                  Get Expert Help Now
                </Link>
              </Button>
              <p className="text-blue-200 text-sm mt-4">
                Consultation fees often covered by first grant secured • No success, no full fee
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
