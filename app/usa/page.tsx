import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, DollarSign, Building2, Users, Lightbulb, TrendingUp, Landmark, MapPin } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { getAllStateDetails } from "@/lib/data/stateDetails"


export const metadata: Metadata = {
  title: "USA Government Grants 2026: Federal & State Funding [50 States]",
  description:
    "Find USA government grants for small businesses and startups. Explore federal funding, state programs, SBIR/STTR grants, and opportunities for women and minorities.",
  keywords:
    "USA government grants, federal business grants, state business grants, small business funding, SBIR grants, startup grants USA",
  openGraph: {
    title: "USA Government Grants 2026: Federal & State Funding [50 States]",
    description: "Find USA government grants for small businesses and startups. Explore federal funding and state programs.",
    url: "https://www.fsidigital.ca/usa",
  },
}

export default function USAGrantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🇺🇸 USA Federal & State Programs
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Government Grants for{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                USA Businesses
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
              Access billions in non-dilutive funding through federal agencies, state programs, and specialized initiatives for American entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                Browse Federal Grants
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                View State Programs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$2.5B+</div>
              <div className="text-gray-600">Annual Funding</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">26+</div>
              <div className="text-gray-600">Federal Agencies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50</div>
              <div className="text-gray-600">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">5,000+</div>
              <div className="text-gray-600">Active Opportunities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Funding Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the right funding program based on your business profile and industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Federal Grants */}
            <Card className="hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Landmark className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Federal Grants</CardTitle>
                <CardDescription>Major funding programs from federal agencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">$50K - $2M+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">Innovation & R&D</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/usa/federal-grants">View Federal Grants</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Small Business */}
            <Card className="hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <StoreIcon className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Small Business Grants</CardTitle>
                <CardDescription>Support for growth and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">$10K - $100K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">Growth & Hiring</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/usa/small-business-grants">View Opportunities</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Women Entrepreneurs - Linking to the specific page we found earlier */}
            <Card className="hover:shadow-lg transition-shadow border-pink-200">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>Women Entrepreneurs</CardTitle>
                <CardDescription>Dedicated funding for women-owned businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">$5K - $500K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">Equity & Inclusion</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/usa/women-entrepreneurs-grants">View Women's Grants</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Innovation & Tech */}
            <Card className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Tech & Innovation</CardTitle>
                <CardDescription>SBIR/STTR and technology funding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">Up to $1.7M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">R&D & Commercialization</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/usa/technology-startup-grants">View Tech Grants</Link>
                </Button>
              </CardContent>
            </Card>

            {/* State Programs */}
            <Card className="hover:shadow-lg transition-shadow border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>State Programs</CardTitle>
                <CardDescription>Local funding in your state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">Varies</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">Economic Development</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/usa/california">California</Link>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/usa/texas">Texas</Link>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/usa/new-york">New York</Link>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/usa/florida">Florida</Link>
                    </Button>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Startup Funding */}
            <Card className="hover:shadow-lg transition-shadow border-cyan-200">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle>Startup Funding</CardTitle>
                <CardDescription>Seed funding and early-stage capitl</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-green-600">$10K - $250K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-gray-900">Launch & Scale</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/grant-finder">Find Startup Grants</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* All 50 States Section - Internal Linking for SEO */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">Complete Coverage</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Business Grants by State
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore comprehensive funding guides for all 50 US states. Find state-specific grants, tax credits, and business incentives in your area.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {getAllStateDetails().map((state) => (
              <Link
                key={state.slug}
                href={`/usa/${state.slug}`}
                className="flex items-center p-3 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all group"
              >
                <MapPin className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700 group-hover:text-green-600 truncate">
                  {state.abbreviation} - {state.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Can&apos;t find your state? Our grant database covers all 50 states with over 5,000+ funding opportunities.
            </p>
            <Button asChild>
              <Link href="/grant-finder">
                Use Our Grant Finder Tool <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Guides Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Business Funding Guides</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth guides to help you navigate US government funding programs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/blog/usa-federal-grants" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">USA Federal Grants Guide</h3>
              <p className="text-gray-600 text-sm">Complete guide to SBIR/STTR, SBA programs, and agency-specific federal funding.</p>
            </Link>
            <Link href="/blog/sbir-small-business-guide" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">SBIR Small Business Guide</h3>
              <p className="text-gray-600 text-sm">How to win SBIR Phase I and II grants across 11 federal agencies.</p>
            </Link>
            <Link href="/blog/state-local-business-grants-guide" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">State & Local Grants Guide</h3>
              <p className="text-gray-600 text-sm">Regional economic development funding, tax credits, and job creation incentives.</p>
            </Link>
            <Link href="/blog/industry-specific-business-grants-guide" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Industry-Specific Grants</h3>
              <p className="text-gray-600 text-sm">Targeted funding for manufacturing, healthcare, cleantech, and more industries.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-Country & Category Internal Links */}
      <section className="py-16 bg-gray-50 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Also Explore</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/canada" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🇨🇦 Government Grants Canada 2026</h3>
              <p className="text-sm text-gray-600">300+ federal and provincial programs with $10B+ available for Canadian businesses.</p>
            </Link>
            <Link href="/usa/women-entrepreneurs-grants" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">👩‍💼 Women Entrepreneurs Grants USA</h3>
              <p className="text-sm text-gray-600">SBA microloans, federal funding up to $1M for women-owned small businesses.</p>
            </Link>
            <Link href="/blog/sba-loans-grants-guide" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🏦 SBA Microloan Program Guide</h3>
              <p className="text-sm text-gray-600">Up to $50K through nonprofit intermediaries — requirements, max amount, and how to apply.</p>
            </Link>
            <Link href="/canada/women-business-grants" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">👩‍💼 Women Business Grants Canada</h3>
              <p className="text-sm text-gray-600">$6B+ through WELF microloans, BDC financing, and Women Entrepreneurship Strategy.</p>
            </Link>
            <Link href="/usa/technology-startup-grants" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">💡 Tech Startup Grants USA</h3>
              <p className="text-sm text-gray-600">SBIR/STTR, NSF, and DOE grants for technology and innovation startups.</p>
            </Link>
            <Link href="/blog/canada-startup-funding-grants-guide" className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">📚 Canada Startup Funding Guide</h3>
              <p className="text-sm text-gray-600">35+ programs worth $1.2B+ — IRAP, BDC, and provincial accelerators.</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function StoreIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  )
}
