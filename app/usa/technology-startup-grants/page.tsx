import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, ExternalLink, MapPin, Building, Users, Zap, Award, TrendingUp, Heart, Rocket, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "USA Tech Startup Grants 2026: $2.5M+ SBIR/STTR Funding | Complete Guide",
  description: "How to get federal tech grants in 2026. SBIR/STTR up to $2.5M, NSF, DOE, state programs. 45% approval rate with proper application. Step-by-step guide.",
  keywords: "USA technology startup grants, SBIR STTR funding, tech startup grants America, Silicon Valley startup funding, federal innovation grants, NSF SBIR grants, tech entrepreneur funding USA",
  openGraph: {
    title: "USA Tech Startup Grants 2026: $2.5M+ SBIR/STTR Funding",
    description: "Complete SBIR/STTR guide for American tech startups with federal and state innovation grants.",
    url: "https://www.fsidigital.ca/usa/technology-startup-grants",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.fsidigital.ca/usa/technology-startup-grants",
  },
}

export default function USATechnologyStartupGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - FIXED CTAs */}
        <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                🇺🇸 USA Technology Startup Grants
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance leading-tight">
                $2.5+ Million Available for Technology Startups Across America
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
                Access comprehensive federal SBIR/STTR funding, NSF innovation grants, DOE tech programs, and state-level
                startup support designed specifically for technology entrepreneurs across all 50 states.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                  <Link href="#tech-programs">
                    Find Tech Startup Grants Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-4" asChild>
                  <Link href="#tech-programs">
                    Browse Federal Programs
                  </Link>
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
                  <div className="text-4xl font-bold text-blue-600 mb-2">$2.5M</div>
                  <div className="text-gray-600 font-medium">SBIR Phase II Maximum</div>
                  <div className="text-sm text-gray-500 mt-1">Federal Innovation Funding</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">$275K</div>
                  <div className="text-gray-600 font-medium">SBIR Phase I Grants</div>
                  <div className="text-sm text-gray-500 mt-1">Early-Stage R&D Support</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">11</div>
                  <div className="text-gray-600 font-medium">Federal SBIR Agencies</div>
                  <div className="text-sm text-gray-500 mt-1">DOD, NIH, NSF, DOE, NASA</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">85%</div>
                  <div className="text-gray-600 font-medium">Expert Success Rate</div>
                  <div className="text-sm text-gray-500 mt-1">Professional Applications</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Federal SBIR/STTR Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Federal SBIR/STTR Technology Grants</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Non-dilutive federal funding programs supporting technology innovation across 11 federal agencies
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* NSF SBIR */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between mb-2">
                      <Rocket className="w-8 h-8 text-blue-600" />
                      <Badge className="bg-blue-100 text-blue-700">Federal</Badge>
                    </div>
                    <CardTitle className="text-blue-700">NSF SBIR/STTR</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                        <span className="font-semibold">Phase I: $275K | Phase II: $2M</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        National Science Foundation SBIR program for deep tech, AI, software, hardware innovations
                      </p>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>AI/ML, quantum computing focus</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Advanced manufacturing technology</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Biotech and life sciences</span>
                        </li>
                      </ul>
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/blog/nsf-sbir-grants-technology-startups">
                          Learn More <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* DOE Innovation */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-8 h-8 text-green-600" />
                      <Badge className="bg-green-100 text-green-700">Federal</Badge>
                    </div>
                    <CardTitle className="text-green-700">DOE SBIR</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                        <span className="font-semibold">Phase I: $200K | Phase II: $1.1M</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Department of Energy grants for clean energy, grid tech, climate solutions
                      </p>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Renewable energy technology</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Energy storage and grid</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Carbon capture and climate tech</span>
                        </li>
                      </ul>
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/blog/doe-sbir-clean-energy-grants">
                          Learn More <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* NIH SBIR */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="flex items-center justify-between mb-2">
                      <Heart className="w-8 h-8 text-purple-600" />
                      <Badge className="bg-purple-100 text-purple-700">Federal</Badge>
                    </div>
                    <CardTitle className="text-purple-700">NIH SBIR/STTR</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                        <span className="font-semibold">Phase I: $285K | Phase II: $2M</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        National Institutes of Health funding for biotech, medical devices, health tech
                      </p>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Biotech and therapeutics</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Medical devices and diagnostics</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Digital health platforms</span>
                        </li>
                      </ul>
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/blog/nih-sbir-biotech-grants">
                          Learn More <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* DOD SBIR */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <div className="flex items-center justify-between mb-2">
                      <Building className="w-8 h-8 text-red-600" />
                      <Badge className="bg-red-100 text-red-700">Federal</Badge>
                    </div>
                    <CardTitle className="text-red-700">DOD SBIR/STTR</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                        <span className="font-semibold">Phase I: $256K | Phase II: $1.7M</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Department of Defense largest SBIR program for defense, aerospace, cyber tech
                      </p>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Cybersecurity and encryption</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Aerospace and UAV technology</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Advanced materials and sensors</span>
                        </li>
                      </ul>
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/blog/dod-sbir-defense-tech-grants">
                          Learn More <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* NASA SBIR */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-indigo-50 to-blue-50">
                    <div className="flex items-center justify-between mb-2">
                      <Rocket className="w-8 h-8 text-indigo-600" />
                      <Badge className="bg-indigo-100 text-indigo-700">Federal</Badge>
                    </div>
                    <CardTitle className="text-indigo-700">NASA SBIR/STTR</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                        <span className="font-semibold">Phase I: $150K | Phase II: $850K</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        NASA space technology, satellite systems, aeronautics innovation funding
                      </p>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Satellite and space systems</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Remote sensing technology</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Advanced propulsion systems</span>
                        </li>
                      </ul>
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/blog/nasa-sbir-space-tech-grants">
                          Learn More <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* USDA SBIR */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-yellow-50 to-orange-50">
                    <div className="flex items-center justify-between mb-2">
                      <BookOpen className="w-8 h-8 text-yellow-600" />
                      <Badge className="bg-yellow-100 text-yellow-700">Federal</Badge>
                    </div>
                    <CardTitle className="text-yellow-700">USDA SBIR</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                        <span className="font-semibold">Phase I: $125K | Phase II: $575K</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Agriculture technology, food tech, sustainable farming innovations
                      </p>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>AgTech and precision farming</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Food safety and processing</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Sustainable agriculture tech</span>
                        </li>
                      </ul>
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/blog/usda-sbir-agtech-grants">
                          Learn More <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* State Technology Programs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">State Technology Startup Grants</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  State-level innovation programs, SBIR matching grants, and regional tech ecosystem support
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* California */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                    <div className="flex items-center justify-between mb-2">
                      <MapPin className="w-8 h-8 text-blue-600" />
                      <Badge className="bg-blue-100 text-blue-700">State</Badge>
                    </div>
                    <CardTitle className="text-blue-700">California Tech Programs</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 text-sm mb-4">
                      Silicon Valley ecosystem, SBIR matching, California Competes Tax Credit for tech startups
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                      <li>• CalSEED clean energy grants</li>
                      <li>• SBIR State Match $50K</li>
                      <li>• GO-Biz tech incentives</li>
                    </ul>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/blog/california-tech-programs">
                        Explore California Programs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Massachusetts */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="flex items-center justify-between mb-2">
                      <MapPin className="w-8 h-8 text-purple-600" />
                      <Badge className="bg-purple-100 text-purple-700">State</Badge>
                    </div>
                    <CardTitle className="text-purple-700">Massachusetts Programs</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 text-sm mb-4">
                      Boston biotech hub, SBIR matching, MassVentures early-stage funding
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                      <li>• SBIR Tiered Cash Award</li>
                      <li>• MassCEC clean energy</li>
                      <li>• Life Sciences Center grants</li>
                    </ul>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/blog/massachusetts-tech-programs">
                        Explore Massachusetts Programs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* New York */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-indigo-50 to-blue-50">
                    <div className="flex items-center justify-between mb-2">
                      <MapPin className="w-8 h-8 text-indigo-600" />
                      <Badge className="bg-indigo-100 text-indigo-700">State</Badge>
                    </div>
                    <CardTitle className="text-indigo-700">New York Programs</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 text-sm mb-4">
                      NYC tech scene, NYSERDA clean energy, Empire State Development grants
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                      <li>• NYSERDA innovation grants</li>
                      <li>• ESD tech startup support</li>
                      <li>• NYC Economic Development</li>
                    </ul>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/blog/new-york-tech-programs">
                        Explore New York Programs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Texas */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-orange-50 to-red-50">
                    <div className="flex items-center justify-between mb-2">
                      <MapPin className="w-8 h-8 text-orange-600" />
                      <Badge className="bg-orange-100 text-orange-700">State</Badge>
                    </div>
                    <CardTitle className="text-orange-700">Texas Programs</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 text-sm mb-4">
                      Austin tech hub, emerging technology fund, research commercialization grants
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                      <li>• Texas Enterprise Fund</li>
                      <li>• Emerging Tech Program</li>
                      <li>• Governor's University Research</li>
                    </ul>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/blog/texas-tech-programs">
                        Explore Texas Programs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Washington */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-teal-50 to-cyan-50">
                    <div className="flex items-center justify-between mb-2">
                      <MapPin className="w-8 h-8 text-teal-600" />
                      <Badge className="bg-teal-100 text-teal-700">State</Badge>
                    </div>
                    <CardTitle className="text-teal-700">Washington Programs</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 text-sm mb-4">
                      Seattle tech corridor, clean energy grants, innovation partnership zones
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                      <li>• WA Clean Energy Fund</li>
                      <li>• Innovation Partnership Zones</li>
                      <li>• SBIR Phase 0 support</li>
                    </ul>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/blog/washington-tech-programs">
                        Explore Washington Programs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Colorado */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="flex items-center justify-between mb-2">
                      <MapPin className="w-8 h-8 text-green-600" />
                      <Badge className="bg-green-100 text-green-700">State</Badge>
                    </div>
                    <CardTitle className="text-green-700">Colorado Programs</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 text-sm mb-4">
                      Denver tech scene, advanced industries accelerator, clean energy grants
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                      <li>• Advanced Industries Accelerator</li>
                      <li>• Colorado SBIR matching</li>
                      <li>• Clean Energy Fund</li>
                    </ul>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/blog/colorado-tech-programs">
                        Explore Colorado Programs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Industry Categories */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Funding by Technology Sector</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Specialized funding programs for different technology verticals and innovation areas
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Zap className="w-8 h-8 text-blue-600 mb-2" />
                    <CardTitle className="text-blue-700">Software & SaaS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">
                      Enterprise software, cloud platforms, developer tools
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• NSF SBIR software innovation</li>
                      <li>• DOD software modernization</li>
                      <li>• State tech accelerators</li>
                    </ul>
                    <Button className="w-full" variant="outline" size="sm" asChild>
                      <Link href="/blog/software-saas-startup-grants">
                        View Software Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Rocket className="w-8 h-8 text-purple-600 mb-2" />
                    <CardTitle className="text-purple-700">AI & Machine Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">
                      Artificial intelligence, ML platforms, computer vision
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• NSF AI innovation hub</li>
                      <li>• DOD AI applications</li>
                      <li>• NIST AI technology</li>
                    </ul>
                    <Button className="w-full" variant="outline" size="sm" asChild>
                      <Link href="/blog/ai-machine-learning-grants">
                        View AI Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Heart className="w-8 h-8 text-pink-600 mb-2" />
                    <CardTitle className="text-pink-700">Biotech & Life Sciences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">
                      Therapeutics, medical devices, diagnostics
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• NIH SBIR/STTR biotech</li>
                      <li>• State life sciences centers</li>
                      <li>• FDA orphan drug grants</li>
                    </ul>
                    <Button className="w-full" variant="outline" size="sm" asChild>
                      <Link href="/blog/biotech-life-sciences-grants">
                        View Biotech Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Building className="w-8 h-8 text-green-600 mb-2" />
                    <CardTitle className="text-green-700">Hardware & IoT</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">
                      Electronics, sensors, connected devices
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• NSF hardware innovation</li>
                      <li>• DOD electronics programs</li>
                      <li>• Advanced manufacturing</li>
                    </ul>
                    <Button className="w-full" variant="outline" size="sm" asChild>
                      <Link href="/blog/hardware-iot-startup-grants">
                        View Hardware Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Award className="w-8 h-8 text-orange-600 mb-2" />
                    <CardTitle className="text-orange-700">Clean Tech & Energy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">
                      Renewable energy, battery tech, climate solutions
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• DOE SBIR clean energy</li>
                      <li>• EPA environmental tech</li>
                      <li>• State energy programs</li>
                    </ul>
                    <Button className="w-full" variant="outline" size="sm" asChild>
                      <Link href="/blog/clean-tech-energy-grants">
                        View Clean Tech Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="w-8 h-8 text-indigo-600 mb-2" />
                    <CardTitle className="text-indigo-700">Cybersecurity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">
                      Security software, encryption, threat detection
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• DOD cyber security SBIR</li>
                      <li>• DHS cybersecurity grants</li>
                      <li>• NSA research programs</li>
                    </ul>
                    <Button className="w-full" variant="outline" size="sm" asChild>
                      <Link href="/blog/cybersecurity-startup-grants">
                        View Cybersecurity Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Success Tips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">SBIR/STTR Application Success Strategies</h2>
                <p className="text-xl text-gray-600">
                  Proven strategies for winning federal technology startup grants
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      What Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Clear Innovation:</strong> Articulate novel technical approach solving real problem with quantified benefits</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Strong Team:</strong> PhD-level technical expertise with relevant industry experience</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Market Validation:</strong> Customer discovery, letters of support, addressable market analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Commercialization Plan:</strong> Realistic path to revenue with identified customers and channels</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Technical Merit:</strong> Rigorous R&D plan with measurable milestones and success criteria</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center">
                      <Target className="w-6 h-6 mr-2" />
                      Common Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Vague Innovation:</strong> Generic claims without specific technical differentiation or evidence</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Weak Team:</strong> Insufficient technical credentials or relevant domain expertise</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>No Market Research:</strong> Assuming demand without customer validation or market data</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Unrealistic Plan:</strong> Overpromising results or underestimating technical challenges</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>Poor Writing:</strong> Jargon-heavy, unclear proposals that reviewers can't understand</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - FIXED ALL BUTTONS */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Access Federal Technology Startup Grants?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get expert assistance with SBIR/STTR applications and maximize your chances of winning federal funding
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-white/10 backdrop-blur border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Free Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-100 text-sm mb-4">
                      Download our comprehensive SBIR/STTR application guide with templates and success strategies
                    </p>
                    <Button className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                      <Link href="/contact">
                        Download Free Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-500/20 backdrop-blur border-yellow-400/30">
                  <CardHeader>
                    <CardTitle className="text-white">Expert Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-yellow-100 text-sm mb-4">
                      Work with SBIR specialists to develop winning proposals with 85% success rate
                    </p>
                    <Button className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-600" asChild>
                      <Link href="/contact?service=usa-technology-startup-grants">
                        Get Expert Help
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="#tech-programs">
                    Browse All Tech Grants
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 bg-transparent" asChild>
                  <Link href="/contact?service=sbir-sttr-consultation">
                    Schedule Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
