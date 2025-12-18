import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, ExternalLink, MapPin, Building, Users, Zap, Award, Factory, Wheat, Mountain, Leaf } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canadian Government Grants for Business 2025 | Federal & Provincial $12B+ Available",
  description: "Comprehensive guide to Canadian government grants for businesses. Access federal programs like Strategic Innovation Fund, IRAP, and provincial funding with $12B+ available for all business types.",
  keywords: "Canadian government grants, Canada business funding, federal grants Canada, provincial grants, startup funding Canada, Strategic Innovation Fund, IRAP",
  openGraph: {
    title: "Canadian Government Grants for Business 2025 | Federal & Provincial $12B+ Available",
    description: "Complete guide to Canadian government business grants with federal and provincial programs offering $12B+ in funding opportunities.",
    url: "https://fsidigital.ca/canada/government-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function CanadaGovernmentGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                🇨🇦 Canadian Government Grants
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance leading-tight">
                $12+ Billion Available in Government Business Funding
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed max-w-3xl mx-auto">
                Access comprehensive government funding from federal, provincial, and territorial programs. 
                From Strategic Innovation Fund to local business support - find the perfect government grant for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4">
                  Find Government Grants Now
                </Button>
                <Button size="lg" variant="outline" className="bg-red-700/30 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                  Browse by Program Type
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
                  <div className="text-4xl font-bold text-red-600 mb-2">$12.5B+</div>
                  <div className="text-gray-600 font-medium">Government Funding Available</div>
                  <div className="text-sm text-gray-500 mt-1">Federal + Provincial + Territorial</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">$100M</div>
                  <div className="text-gray-600 font-medium">Maximum Grant Amount</div>
                  <div className="text-sm text-gray-500 mt-1">Strategic Innovation Fund</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
                  <div className="text-gray-600 font-medium">Active Government Programs</div>
                  <div className="text-sm text-gray-500 mt-1">All Levels of Government</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">87%</div>
                  <div className="text-gray-600 font-medium">Expert Success Rate</div>
                  <div className="text-sm text-gray-500 mt-1">Professional Applications</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Government Programs - UPDATED WITH ALL 6 CARDS */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-red-100 text-red-800 border-red-200">
                  Federal Programs
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Major Federal Government Grant Programs
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Access flagship federal programs designed to support Canadian businesses 
                  across all sectors, sizes, and stages of development.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Strategic Innovation Fund */}
                <Card className="border-2 border-red-200 hover:border-red-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-red-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        SIF
                      </div>
                      <div>
                        <CardTitle className="text-red-700 text-xl">Strategic Innovation Fund</CardTitle>
                        <p className="text-red-600 text-sm">Innovation, Science & Economic Development Canada</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Up to $100M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Large Projects</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Rolling Intake</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Large-scale funding for transformative business projects that drive innovation, 
                      economic growth, and job creation across Canada.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Major technology and innovation projects</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Significant economic impact requirements</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Industrial research and development</span>
                      </div>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                      <Link href="/blog/strategic-innovation-fund-canada-guide">
                        Learn About SIF
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* IRAP Program */}
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
                        <span className="text-sm"><strong>Innovation</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>67% Funding</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Non-repayable contributions for businesses developing and 
                      commercializing innovative technologies and solutions.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>R&D project funding up to 67%</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Technical advisory services included</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Youth employment support programs</span>
                      </div>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                      <Link href="/blog/irap-industrial-research-assistance-program">
                        Learn About IRAP
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* CSBFP */}
                <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        CSBF
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
                        Learn About CSBF
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
                        <p className="text-purple-600 text-sm">6 Federal Regional Development Agencies</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>$125K - $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Regional Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Ongoing</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Region-specific federal funding delivered through six development 
                      agencies supporting local economic priorities.
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
                        <span>FedDev Ontario & other regional agencies</span>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                      <Link href="/blog/regional-development-agencies-funding">
                        Learn About RDA Programs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Agriculture & Agri-Food Canada */}
                <Card className="border-2 border-emerald-200 hover:border-emerald-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-emerald-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        <Wheat className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-emerald-700 text-xl">Agriculture & Agri-Food Programs</CardTitle>
                        <p className="text-emerald-600 text-sm">Agriculture and Agri-Food Canada</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Agri-Food</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Multiple Streams</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive federal support for agriculture, agri-food, and 
                      agri-based businesses and research initiatives.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>AgriInnovate Program funding</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>AgriScience research support</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Agricultural Clean Technology programs</span>
                      </div>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                      <Link href="/blog/agriculture-agri-food-canada-grants">
                        Learn About AgriFood Programs
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
              </div>
            </div>
          </div>
        </section>

        {/* Provincial Government Programs - UPDATED WITH SINGLE BUTTONS */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                  Provincial Programs
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Provincial Government Business Support
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Provincial governments offer specialized programs tailored to local 
                  economic priorities and regional business development needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Ontario Government Programs */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-red-700">Ontario Government</CardTitle>
                      <MapPin className="w-5 h-5 text-red-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$3.2B</div>
                    <div className="text-sm text-gray-600 mb-4">Provincial Business Funding</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Jobs and Prosperity Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Ontario Innovation Tax Credit</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Advanced Manufacturing Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Regional Economic Development</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/ontario-government-business-grants">
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Quebec Government Programs */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Quebec Government</CardTitle>
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$2.5B</div>
                    <div className="text-sm text-gray-600 mb-4">Provincial Support Programs</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Investissement Québec Programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>R&D Tax Credits (30%)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>ESSOR & PSCE Programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Francophone Business Support</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/quebec-government-business-grants">
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* British Columbia Government Programs */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">British Columbia</CardTitle>
                      <Mountain className="w-5 h-5 text-green-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$1.8B</div>
                    <div className="text-sm text-gray-600 mb-4">Provincial Innovation Funding</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovate BC Programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>CleanBC Initiatives</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Asia-Pacific Gateway</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Creative BC Support</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/british-columbia-government-business-grants">
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Alberta Government Programs */}
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-orange-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-700">Alberta Government</CardTitle>
                      <Leaf className="w-5 h-5 text-orange-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$2.8B</div>
                    <div className="text-sm text-gray-600 mb-4">Energy Innovation Funding</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Alberta Innovates Programs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Emissions Reduction Alberta</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Economic Diversification</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Clean Technology Focus</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/alberta-government-business-grants">
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/contact?service=provincial-government-grants-expert-help">
                    Get Expert Help with Provincial Government Programs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Government Grant Categories - CORRECTED URLS */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                  Grant Categories
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Government Grants by Program Type
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Explore government funding opportunities organized by program focus, 
                  department, and specific business support objectives.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Zap className="w-8 h-8 text-red-600" />,
                    title: "Innovation & R&D",
                    description: "Research, development, and innovation commercialization programs",
                    amount: "$4.2B+",
                    programs: "45+ Programs",
                    color: "red",
                    slug: "canada-innovation-research-development-grants-guide"
                  },
                  {
                    icon: <Factory className="w-8 h-8 text-blue-600" />,
                    title: "Manufacturing & Industry",
                    description: "Advanced manufacturing, productivity, and industrial development",
                    amount: "$3.1B+", 
                    programs: "38+ Programs",
                    color: "blue",
                    slug: "canada-manufacturing-industry-grants-guide"
                  },
                  {
                    icon: <Wheat className="w-8 h-8 text-green-600" />,
                    title: "Agriculture & Food",
                    description: "Agricultural innovation, food processing, and agri-business support",
                    amount: "$2.3B+",
                    programs: "32+ Programs",
                    color: "green",
                    slug: "canada-agriculture-agrifood-grants-guide"
                  },
                  {
                    icon: <Users className="w-8 h-8 text-purple-600" />,
                    title: "Employment & Training",
                    description: "Workforce development, job creation, and skills training programs",
                    amount: "$1.9B+",
                    programs: "28+ Programs",
                    color: "purple",
                    slug: "canada-employment-workforce-training-grants-guide"
                  },
                  {
                    icon: <Building className="w-8 h-8 text-orange-600" />,
                    title: "Regional Development",
                    description: "Community economic development and regional growth initiatives",
                    amount: "$2.8B+",
                    programs: "35+ Programs",
                    color: "orange",
                    slug: "canada-regional-economic-development-grants-guide"
                  },
                  {
                    icon: <Award className="w-8 h-8 text-teal-600" />,
                    title: "Clean Technology",
                    description: "Environmental technology, clean energy, and sustainability programs",
                    amount: "$1.2B+",
                    programs: "22+ Programs",
                    color: "teal",
                    slug: "canada-clean-technology-environment-grants-guide"
                  }
                ].map((category, index) => {
                  const colorClasses = {
                    red: "border-red-200 hover:border-red-300",
                    blue: "border-blue-200 hover:border-blue-300", 
                    green: "border-green-200 hover:border-green-300",
                    purple: "border-purple-200 hover:border-purple-300",
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
                          <Link href={`/blog/${category.slug}`}>
                            Explore Programs
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
        <section className="py-20 bg-gradient-to-r from-red-600 to-red-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Navigate Canada's $12B+ Government Funding Ecosystem with Expert Guidance
              </h2>
              <p className="text-xl text-red-100 mb-8">
                Government grants span multiple departments, agencies, and levels of government. Our specialists understand 
                the complex application processes and have secured over $85M in government funding for Canadian businesses.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">Why Choose Our Government Grant Experts:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-red-100">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>87% success rate with government programs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Multi-department application expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Federal, provincial, territorial specialists</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Strategic portfolio approach</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Compliance and reporting support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Government relations and advocacy</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=government-grants-expert-help">
                  Get Expert Help with Government Grants
                </Link>
              </Button>
              <p className="text-red-200 text-sm mt-4">
                Free initial consultation • Multi-program specialists • Government relations expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
