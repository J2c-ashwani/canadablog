import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, ExternalLink, MapPin, Building, Users, Zap, Award, TrendingUp, Heart, Rocket, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women-Owned Business Grants Canada 2026: $6B+ [Full List]",
  description: "150+ grants for women entrepreneurs in Canada. WELF microloans ($50K), WES Strategy, BDC women financing & provincial programs. See which ones you qualify for.",
  keywords: "women-owned business grants canada, women entrepreneurs canada, grants for women in business canada, canadian grants for women entrepreneurs, funding for women entrepreneurs, women business loans Canada, ladies business loan",
  openGraph: {
    title: "Women-Owned Business Grants Canada 2026: $6B+ [Full List]",
    description: "150+ grants for women entrepreneurs in Canada. WELF, BDC, and provincial programs with $6B+ available.",
    url: "https://www.fsidigital.ca/canada/women-business-grants",
    images: ["/og-image.png"],
  },
}

export default function WomenBusinessGrantsCanadaPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-pink-600 via-purple-700 to-pink-800 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                🇨🇦 Women Business Grants Canada
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance leading-tight">
                $6+ Billion Available for Women-Owned & Women-Led Businesses
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-pink-100 leading-relaxed max-w-3xl mx-auto">
                Access comprehensive funding through Women Entrepreneurship Strategy, loan funds, provincial programs,
                and federal grants designed specifically for women entrepreneurs across Canada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4">
                  Find Women Business Grants Now
                </Button>
                <Button size="lg" variant="outline" className="bg-pink-700/30 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                  Browse Funding Programs
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
                  <div className="text-4xl font-bold text-pink-600 mb-2">$6B+</div>
                  <div className="text-gray-600 font-medium">Women Business Funding</div>
                  <div className="text-sm text-gray-500 mt-1">Federal + Provincial Programs</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">$50K</div>
                  <div className="text-gray-600 font-medium">Women Entrepreneurship Loans</div>
                  <div className="text-sm text-gray-500 mt-1">Up to $50,000 Microloans</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
                  <div className="text-gray-600 font-medium">Active Women Grant Programs</div>
                  <div className="text-sm text-gray-500 mt-1">All Provinces & Territories</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">89%</div>
                  <div className="text-gray-600 font-medium">Expert Success Rate</div>
                  <div className="text-sm text-gray-500 mt-1">Professional Applications</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Women Entrepreneurship Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-pink-100 text-pink-800 border-pink-200">
                  Federal Women Programs
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Women Entrepreneurship Strategy (WES) Programs
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Federal government programs specifically designed to support women entrepreneurs
                  at every stage - from startup to scale-up and beyond.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Women Entrepreneurship Loan Fund */}
                <Card className="border-2 border-pink-200 hover:border-pink-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-pink-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        WELF
                      </div>
                      <div>
                        <CardTitle className="text-pink-700 text-xl">Women Entrepreneurship Loan Fund</CardTitle>
                        <p className="text-pink-600 text-sm">Innovation, Science & Economic Development Canada</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Up to $50K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Microloans</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Open Now</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      National microloan program providing up to $50,000 for women entrepreneurs,
                      particularly startups, underrepresented groups, and sole proprietorships.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>$55M allocated through delivery organizations</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>WEOC, NACCA, Nventure, Coralus, Evol</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Focus on underrepresented women entrepreneurs</span>
                      </div>
                    </div>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700" asChild>
                      <Link href="/blog/women-entrepreneurship-loan-fund-canada">
                        Learn About WELF
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Women Entrepreneurship Fund */}
                <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-purple-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        WEF
                      </div>
                      <div>
                        <CardTitle className="text-purple-700 text-xl">Women Entrepreneurship Fund Canada</CardTitle>
                        <p className="text-purple-600 text-sm">Innovation, Science & Economic Development Canada</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Non-Repayable</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Growth Stage</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Rolling Intake</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Non-repayable funding for women-owned businesses to expand operations,
                      innovate product lines, hire staff, and access new markets.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Business expansion and innovation funding</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Equipment, marketing, R&D support</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Early-stage and growth-stage prioritized</span>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                      <Link href="/blog/women-entrepreneurship-fund-canada">
                        Learn About WEF
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* BDC Women Entrepreneurs */}
                <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        BDC
                      </div>
                      <div>
                        <CardTitle className="text-blue-700 text-xl">BDC Women Entrepreneurs</CardTitle>
                        <p className="text-blue-600 text-sm">Business Development Bank of Canada</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Flexible Loans</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>All Stages</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Advisory Included</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive financing and advisory services designed for women-led businesses
                      with flexible terms and strategic growth support.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Flexible loan terms for women entrepreneurs</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Strategic advisory services included</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Growth and expansion expertise</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                      <Link href="/blog/bdc-women-entrepreneurs-financing">
                        Learn About BDC
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* EDC Women in Trade */}
                <Card className="border-2 border-teal-200 hover:border-teal-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-teal-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        EDC
                      </div>
                      <div>
                        <CardTitle className="text-teal-700 text-xl">EDC Women in Trade</CardTitle>
                        <p className="text-teal-600 text-sm">Export Development Canada</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Export Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>International</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Equity Capital</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Export financing and equity capital for women-owned businesses targeting
                      international markets and global expansion opportunities.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Inclusive Trade Investments Program</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Export market development support</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Equity capital for diverse women businesses</span>
                      </div>
                    </div>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700" asChild>
                      <Link href="/blog/edc-women-trade-export-financing">
                        Learn About EDC
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Provincial Women Business Support */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                  Provincial Women Programs
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Provincial Women Entrepreneurship Support
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Province-specific funding programs and organizations supporting women
                  entrepreneurs with grants, loans, mentorship, and business services.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Ontario Women Programs */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-red-700">Ontario Women</CardTitle>
                      <MapPin className="w-5 h-5 text-red-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$850M</div>
                    <div className="text-sm text-gray-600 mb-4">Women Business Support</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Women's Enterprise Organizations</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>FedDev Ontario RE3 Initiative</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Up to $5,000 non-repayable grants</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Women in Technology support</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/ontario-women-business-grants">
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Quebec Women Programs */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Quebec Women</CardTitle>
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$720M</div>
                    <div className="text-sm text-gray-600 mb-4">Women Entrepreneur Support</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Réseau des Femmes d'Affaires</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Investissement Québec for Women</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Francophone women business support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Women in leadership programs</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/quebec-women-business-grants">
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* British Columbia Women Programs */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">BC Women</CardTitle>
                      <MapPin className="w-5 h-5 text-green-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$650M</div>
                    <div className="text-sm text-gray-600 mb-4">Women Innovation Funding</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Women's Enterprise Centre BC</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovate BC women programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Tech women leadership support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Indigenous women entrepreneurs</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/bc-women-business-grants">
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Alberta Women Programs */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-orange-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Alberta Women</CardTitle>
                      <MapPin className="w-5 h-5 text-orange-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$580M</div>
                    <div className="text-sm text-gray-600 mb-4">Women Business Growth</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Women Building Futures</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Alberta Women Entrepreneurs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Energy sector women support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Tech and innovation women programs</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/alberta-women-business-grants">
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/contact?service=provincial-women-grants-expert-help">
                    Get Expert Help with Provincial Women Programs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* National Women Business Awards & Grants */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                  National Awards & Grants
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Competitive Women Business Awards & Grant Opportunities
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  National and international grant competitions recognizing and funding
                  exceptional women entrepreneurs across Canada and beyond.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Award className="w-8 h-8 text-yellow-600" />,
                    title: "Amber Grant for Women",
                    description: "Monthly $10,000 grants with annual $25,000 bonus for women-owned businesses",
                    amount: "$10K-$25K",
                    deadline: "Monthly",
                    color: "yellow",
                    slug: "amber-grant-women-canada"
                  },
                  {
                    icon: <Heart className="w-8 h-8 text-pink-600" />,
                    title: "RBC Women Entrepreneur Awards",
                    description: "Recognition and funding for outstanding women entrepreneurs in Canada",
                    amount: "$5K-$10K",
                    deadline: "Annual",
                    color: "pink",
                    slug: "rbc-women-entrepreneur-awards"
                  },
                  {
                    icon: <Rocket className="w-8 h-8 text-purple-600" />,
                    title: "Cartier Women's Initiative",
                    description: "International program supporting female founders of impact-driven businesses",
                    amount: "Cash + Coaching",
                    deadline: "Apr-Jun 2025",
                    color: "purple",
                    slug: "cartier-womens-initiative-canada"
                  },
                  {
                    icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
                    title: "BMO Celebrating Women Grant",
                    description: "Resources and funding for women-owned businesses to thrive and grow",
                    amount: "Variable",
                    deadline: "Ongoing",
                    color: "blue",
                    slug: "bmo-celebrating-women-grant"
                  },
                  {
                    icon: <Building className="w-8 h-8 text-green-600" />,
                    title: "Scotiabank Women Initiative",
                    description: "Capital funding, mentorship, and education for women-led businesses",
                    amount: "Funding + Support",
                    deadline: "Rolling",
                    color: "green",
                    slug: "scotiabank-women-initiative"
                  },
                  {
                    icon: <BookOpen className="w-8 h-8 text-teal-600" />,
                    title: "WBDC Equity Match Grant",
                    description: "Connecticut-based grants $2,500-$10,000 for women business growth projects",
                    amount: "$2.5K-$10K",
                    deadline: "Quarterly",
                    color: "teal",
                    slug: "wbdc-equity-match-grant-women"
                  }
                ].map((grant, index) => {
                  const colorClasses = {
                    yellow: "border-yellow-200 hover:border-yellow-300",
                    pink: "border-pink-200 hover:border-pink-300",
                    purple: "border-purple-200 hover:border-purple-300",
                    blue: "border-blue-200 hover:border-blue-300",
                    green: "border-green-200 hover:border-green-300",
                    teal: "border-teal-200 hover:border-teal-300"
                  }

                  return (
                    <Card key={index} className={`hover:shadow-lg transition-all ${colorClasses[grant.color as keyof typeof colorClasses]}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          {grant.icon}
                          <Badge variant="outline" className="text-xs">
                            {grant.deadline}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{grant.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">{grant.description}</p>
                        <div className="text-2xl font-bold text-gray-900 mb-2">{grant.amount}</div>
                        <div className="text-sm text-gray-500 mb-4">Grant Amount</div>
                        <Button variant="outline" className="w-full" size="sm" asChild>
                          <Link href={`/blog/${grant.slug}`}>
                            Learn More
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

        {/* Women Grant Categories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-pink-100 text-pink-800 border-pink-200">
                  Industry & Focus Areas
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Women Business Grants by Industry Sector
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Specialized funding opportunities for women entrepreneurs in specific
                  industries, sectors, and business focus areas.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow border-2 border-purple-200">
                  <CardHeader>
                    <Zap className="w-12 h-12 text-purple-600 mb-4" />
                    <CardTitle className="text-purple-700">Women in Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Specialized grants for women entrepreneurs in tech, software, AI, and digital innovation
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Software development funding</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>AI and machine learning grants</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Digital innovation support</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/women-technology-grants-canada">
                        Explore Tech Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-2 border-green-200">
                  <CardHeader>
                    <Building className="w-12 h-12 text-green-600 mb-4" />
                    <CardTitle className="text-green-700">Women in Manufacturing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Manufacturing sector grants for women-owned production, processing, and industrial businesses
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Advanced manufacturing support</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Equipment and productivity grants</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Industrial innovation funding</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/women-manufacturing-grants-canada">
                        Explore Manufacturing Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200">
                  <CardHeader>
                    <Users className="w-12 h-12 text-blue-600 mb-4" />
                    <CardTitle className="text-blue-700">Women Social Enterprise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Funding for women-led social enterprises, non-profits, and impact-driven businesses
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Social impact funding</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Community development grants</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Purpose-driven business support</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/women-social-enterprise-grants-canada">
                        Explore Social Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-2 border-pink-200">
                  <CardHeader>
                    <Heart className="w-12 h-12 text-pink-600 mb-4" />
                    <CardTitle className="text-pink-700">Indigenous Women</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Dedicated funding for Indigenous women entrepreneurs and First Nations businesses
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>NACCA Indigenous support</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>First Nations business funding</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Cultural enterprise grants</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/indigenous-women-business-grants-canada">
                        Explore Indigenous Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-2 border-orange-200">
                  <CardHeader>
                    <Rocket className="w-12 h-12 text-orange-600 mb-4" />
                    <CardTitle className="text-orange-700">Women Export & Trade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      International trade and export funding for women entrepreneurs expanding globally
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Export market development</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>International expansion grants</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Trade mission support</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/women-export-trade-grants-canada">
                        Explore Export Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-2 border-teal-200">
                  <CardHeader>
                    <Award className="w-12 h-12 text-teal-600 mb-4" />
                    <CardTitle className="text-teal-700">Women Clean Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Environmental and clean technology grants for women in sustainability and green innovation
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Clean energy funding</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Sustainability innovation grants</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Environmental technology support</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/women-clean-technology-grants-canada">
                        Explore Clean Tech Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Success Tips */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                  Application Success
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  How to Win Women Business Grants in Canada
                </h2>
                <p className="text-xl text-gray-600">
                  Expert strategies to maximize your success rate when applying for women entrepreneur funding
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                      Eligibility Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>51%+ women ownership or majority women-led business structure</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Canadian business registration and operational requirements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Business plan demonstrating growth potential and sustainability</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Financial statements and revenue documentation (varies by program)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-6 h-6 text-blue-600 mr-2" />
                      Application Best Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Clearly articulate business impact, job creation, and economic contribution</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Demonstrate innovation, market differentiation, and competitive advantage</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Provide detailed financial projections with realistic assumptions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Highlight women entrepreneurship challenges and how funding helps overcome</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-6 h-6 text-purple-600 mr-2" />
                      Timeline & Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Rolling intake programs: apply anytime with 4-8 week review periods</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Annual competitions: typically spring/fall deadlines with specific dates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Allow 2-3 months application preparation for comprehensive programs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Funding disbursement typically 30-90 days post-approval</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-6 h-6 text-orange-600 mr-2" />
                      Common Mistakes to Avoid
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Incomplete applications missing required documentation or signatures</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Vague business plans without specific goals, metrics, and milestones</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Unrealistic financial projections not supported by market research</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Failing to demonstrate women entrepreneurship barriers and solutions</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Get Expert Help CTA Section */}
        <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Maximize Your Success with Women Business Grant Experts
              </h2>
              <p className="text-xl text-pink-100 mb-8">
                Women entrepreneurs face unique challenges accessing capital. Our specialized grant consultants understand
                the Women Entrepreneurship Strategy ecosystem and have secured over $42M in funding for women-led businesses.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">Why Choose Our Women Business Grant Specialists:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-pink-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>89% success rate with women entrepreneur programs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>WES and provincial program expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Multi-program application strategies</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Women entrepreneur success coaching</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Business plan development support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Financial projection and compliance expertise</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=women-business-grants-expert-help">
                  Get Expert Help with Women Business Grants
                </Link>
              </Button>
              <p className="text-pink-200 text-sm mt-4">
                Free initial consultation • Women entrepreneurship specialists • 89% success rate
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gray-100 text-gray-800 border-gray-200">
                  Frequently Asked Questions
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Women Business Grants Canada - Common Questions
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">
                      What qualifies as a women-owned or women-led business in Canada?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Most programs require 51% or more ownership by women, or majority women leadership in decision-making roles.
                      Some programs have flexible definitions including women-identifying entrepreneurs, women majority boards,
                      or businesses advancing women's economic participation.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">
                      How much funding can women entrepreneurs access in Canada?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Women entrepreneurs can access over $6 billion through combined federal, provincial, and organizational programs.
                      Individual grants range from $2,500 microloans to multi-million dollar innovation funding. The Women Entrepreneurship
                      Loan Fund provides up to $50,000, while growth programs can exceed $1M for established businesses.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">
                      Are women business grants repayable in Canada?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Programs vary: grants are non-repayable contributions, loans require repayment with flexible terms, and equity
                      investments involve ownership stakes. Women Entrepreneurship Fund grants are non-repayable, while Women
                      Entrepreneurship Loan Fund requires repayment. Review each program's specific terms carefully.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">
                      Can women entrepreneurs apply to multiple grant programs simultaneously?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Yes, women entrepreneurs can apply to multiple programs simultaneously. Strategic portfolio approaches often yield
                      better results by diversifying funding sources. Ensure no program restrictions prohibit concurrent applications,
                      and disclose other funding applications when required. Expert consultants maximize multi-program success rates.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">
                      What industries receive the most women business grant funding?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Technology, clean energy, manufacturing, healthcare, and social enterprises receive substantial women entrepreneur
                      funding. However, programs exist for all industries including retail, services, agriculture, creative industries,
                      and professional services. Industry-agnostic programs focus on innovation, growth potential, and economic impact.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">
                      How long does the women business grant application process take?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Application timelines vary by program complexity: simple applications take 2-4 weeks to prepare, comprehensive
                      applications require 2-3 months. Review periods range from 4-12 weeks post-submission. Funding disbursement
                      typically occurs 30-90 days after approval. Rolling intake programs offer flexibility, while annual competitions
                      have fixed deadlines.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Cross-Links */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Funding Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/usa/women-entrepreneurs-grants" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-pink-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 mb-2">🇺🇸 Women Entrepreneurs Grants USA</h3>
              <p className="text-sm text-gray-600">SBA microloans, federal funding up to $1M for women-owned businesses in the US.</p>
            </Link>
            <Link href="/canada" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🇨🇦 All Canada Business Grants</h3>
              <p className="text-sm text-gray-600">300+ federal and provincial programs with $10B+ available.</p>
            </Link>
            <Link href="/blog/sba-loans-grants-guide" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🏦 SBA Microloan Guide</h3>
              <p className="text-sm text-gray-600">Up to $50K through nonprofit intermediaries — popular with women entrepreneurs.</p>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

