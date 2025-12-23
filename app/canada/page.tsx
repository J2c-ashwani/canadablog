import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, DollarSign, Users } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canadian Government Grants for Business | Federal & Provincial Funding",
  description:
    "Find Canadian government grants for startups and small businesses. Browse over 300 federal and provincial funding programs with $800M+ available.",
  keywords:
    "Canadian government grants, Canada business funding, federal grants Canada, provincial grants, startup funding Canada",
  openGraph: {
    title: "Canadian Government Grants for Business | Federal & Provincial Funding",
    description: "Find Canadian government grants for startups and small businesses.",
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
                    <Link href="/canada/green-energy-grants">
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
              { province: "Ontario", grants: 65, funding: "$200M" },
              { province: "Quebec", grants: 55, funding: "$150M" },
              { province: "Alberta", grants: 42, funding: "$120M" },
              { province: "British Columbia", grants: 48, funding: "$140M" },
              { province: "Manitoba", grants: 25, funding: "$60M" },
              { province: "Saskatchewan", grants: 22, funding: "$50M" },
              { province: "Nova Scotia", grants: 18, funding: "$40M" },
              { province: "New Brunswick", grants: 15, funding: "$35M" },
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
                    <Link href={`/canada/${province.province.toLowerCase().replace(" ", "-")}`}>View Grants</Link>
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
                href: "/canada/women-business-grants",
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

      <Footer />
    </div>
  )
}
