import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, DollarSign, Users } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Government Grants Canada 2026: 300+ Programs, $10B+ Available",
  description:
    "Browse 300+ government grants in Canada for small businesses and startups. Federal & provincial programs with $800M+ available. Free eligibility checker.",
  keywords:
    "government grants canada, canada business grants, government funding canada, federal grants Canada, provincial grants, startup funding Canada, small business funding canada",
  openGraph: {
    title: "Government Grants Canada 2026: 300+ Programs, $10B+ Available",
    description: "Browse 300+ government grants in Canada for small businesses and startups.",
    url: "https://www.fsidigital.ca/canada",
  },
}

export default function CanadaGrantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🇨🇦 Canadian Federal & Provincial Grants
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Canadian Government Grants for{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Business Growth
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed text-pretty">
              Access over 300 federal and provincial grant programs with $800M+ in available funding for Canadian
              entrepreneurs and businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                Browse Federal Grants
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                View Provincial Programs
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$800M+</div>
              <div className="text-gray-600">Available Funding</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">300+</div>
              <div className="text-gray-600">Active Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">13</div>
              <div className="text-gray-600">Provinces & Territories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">15,000+</div>
              <div className="text-gray-600">Businesses Funded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Federal Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Federal Grant Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore major federal funding opportunities available to businesses across Canada.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-red-100 text-red-800">Federal</Badge>
                  <span className="text-sm text-gray-500">Rolling</span>
                </div>
                <CardTitle>Strategic Innovation Fund</CardTitle>
                <CardDescription>Large-scale transformative business projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding:</span>
                    <span className="font-semibold text-green-600">$10M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility:</span>
                    <span className="text-sm">All business sizes</span>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/canada/innovation-grants">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-red-100 text-red-800">ISED</Badge>
                  <span className="text-sm text-gray-500">Ongoing</span>
                </div>
                <CardTitle>Canada Small Business Financing</CardTitle>
                <CardDescription>Government-backed loans and grants for SMEs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding:</span>
                    <span className="font-semibold text-green-600">$25K - $1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility:</span>
                    <span className="text-sm">Small businesses</span>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/canada/small-business-grants">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-green-100 text-green-800">Clean Tech</Badge>
                  <span className="text-sm text-gray-500">Apr 15</span>
                </div>
                <CardTitle>Clean Growth Program</CardTitle>
                <CardDescription>Funding for clean technology innovation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding:</span>
                    <span className="font-semibold text-green-600">$100K - $5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility:</span>
                    <span className="text-sm">Clean tech companies</span>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/contact">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Provincial Programs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Provincial Grant Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover province-specific funding opportunities in your region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { province: "Ontario", grants: 65, funding: "$200M", slug: "ontario" },
              { province: "Quebec", grants: 55, funding: "$150M", slug: "quebec" },
              { province: "Alberta", grants: 42, funding: "$120M", slug: "alberta" },
              { province: "British Columbia", grants: 48, funding: "$140M", slug: "british-columbia" },
              { province: "Manitoba", grants: 25, funding: "$60M", slug: "manitoba" },
              { province: "Saskatchewan", grants: 22, funding: "$50M", slug: "saskatchewan" },
              { province: "Nova Scotia", grants: 18, funding: "$40M", slug: "nova-scotia" },
              { province: "New Brunswick", grants: 15, funding: "$35M", slug: "new-brunswick" },
            ].map((province) => (
              <Card key={province.province} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    <h3 className="font-semibold text-lg">{province.province}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Grants:</span>
                      <span className="font-semibold">{province.grants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-semibold text-green-600">{province.funding}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline" asChild>
                    <Link href={`/canada/${province.slug}`}>View Grants</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find grants tailored to your business type and industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Women-Owned Business",
                description: "Dedicated funding for women entrepreneurs",
                icon: Users,
                count: "45+ grants",
                href: "/canada/women-entrepreneurship-grants",
              },
              {
                title: "Indigenous Entrepreneurs",
                description: "Support for Indigenous business owners",
                icon: Users,
                count: "35+ grants",
                href: "/canada/indigenous-entrepreneur-grants",
              },
              {
                title: "Innovation Grants",
                description: "Funding for tech and innovation projects",
                icon: DollarSign,
                count: "85+ grants",
                href: "/canada/innovation-grants",
              },
              {
                title: "Green Energy",
                description: "Clean energy and sustainability funding",
                icon: DollarSign,
                count: "40+ grants",
                href: "/canada/green-energy-grants",
              },
              {
                title: "Agriculture",
                description: "Farming and agri-business funding",
                icon: DollarSign,
                count: "30+ grants",
                href: "/canada/agriculture-startup-funding",
              },
              {
                title: "Healthcare",
                description: "Medical and healthcare innovation grants",
                icon: DollarSign,
                count: "25+ grants",
                href: "/canada/healthcare-startup-grants",
              },
            ].map((category) => (
              <Card key={category.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-4">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {category.count}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link href={category.href}>
                      Explore Grants <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Guides Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Business Funding Guides</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth guides to help you navigate Canadian business funding programs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/blog/ontario-business-grants-2025" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Ontario Government Business Grants</h3>
              <p className="text-gray-600 text-sm">Complete guide to Starter Company Plus, OCASE, and manufacturing grants in Ontario.</p>
            </Link>
            <Link href="/blog/alberta-business-grants-2025" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Alberta Government Business Grants</h3>
              <p className="text-gray-600 text-sm">Alberta Innovates, cleantech grants, and energy sector funding programs.</p>
            </Link>
            <Link href="/blog/bc-business-grants-2025" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">BC Government Business Grants</h3>
              <p className="text-gray-600 text-sm">Innovate BC, CleanBC, Creative BC, and PacifiCan funding opportunities.</p>
            </Link>
            <Link href="/blog/csbfp-canada-small-business-financing-program" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">CSBFP Financing Guide</h3>
              <p className="text-gray-600 text-sm">How to secure up to $1.15M in government-guaranteed loans for your business.</p>
            </Link>
            <Link href="/blog/scotiabank-women-initiative" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Scotiabank Women Initiative</h3>
              <p className="text-gray-600 text-sm">Access capital, advisory services, and education for women entrepreneurs.</p>
            </Link>
            <Link href="/blog/canada-agri-food-technology-innovation-grants" className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary">Agri-Food Innovation Grants</h3>
              <p className="text-gray-600 text-sm">AgriScience, AgriInnovate, and CAP framework funding for agriculture tech.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-Country & Category Internal Links */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Also Explore</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/usa" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🇺🇸 USA Business Grants 2026</h3>
              <p className="text-sm text-gray-600">Explore $2.5B+ in federal and state funding across all 50 US states.</p>
            </Link>
            <Link href="/canada/women-business-grants" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">👩‍💼 Women Business Grants Canada</h3>
              <p className="text-sm text-gray-600">$6B+ available through WELF, BDC, and Women Entrepreneurship Strategy.</p>
            </Link>
            <Link href="/blog/sba-loans-grants-guide" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🏦 SBA Microloan Program Guide</h3>
              <p className="text-sm text-gray-600">Up to $50K through nonprofit intermediaries — requirements, terms, and how to apply.</p>
            </Link>
            <Link href="/usa/women-entrepreneurs-grants" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">👩‍💼 Women Entrepreneurs USA</h3>
              <p className="text-sm text-gray-600">SBA microloans, federal funding up to $1M for women-owned businesses.</p>
            </Link>
            <Link href="/usa/federal-grants" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">🏛 Federal Grants USA</h3>
              <p className="text-sm text-gray-600">SBIR/STTR, DOE, NIH, and NSF innovation grants for startups.</p>
            </Link>
            <Link href="/blog/canada-startup-funding-grants-guide" className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">📚 Canada Startup Funding Guide</h3>
              <p className="text-sm text-gray-600">35+ programs worth $1.2B+ for Canadian startups.</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
