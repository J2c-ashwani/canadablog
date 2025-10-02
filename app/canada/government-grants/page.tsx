import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { getGrantsByCountry } from "@/lib/grants-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, Zap } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canadian Government Grants for Business | Federal & Provincial Funding",
  description:
    "Find Canadian government grants for businesses. Browse federal programs like Strategic Innovation Fund and provincial funding with $800M+ available.",
  keywords:
    "Canadian government grants, Canada business funding, federal grants Canada, provincial grants, startup funding Canada",
  openGraph: {
    title: "Canadian Government Grants for Business | Federal & Provincial Funding",
    description: "Find Canadian government grants for businesses.",
    url: "https://grantfinder.pro/canada/government-grants",
  },
}

export default function CanadaGovernmentGrantsPage() {
  const canadaGrants = getGrantsByCountry("Canada")
  const federalGrants = canadaGrants.filter((grant) => grant.region === "Federal")

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-700 to-red-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">🇨🇦 Canadian Federal Programs</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Canadian Government Grants for{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Business
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed text-pretty">
              Access federal and provincial funding programs including Strategic Innovation Fund, CSBF, and other
              government initiatives supporting Canadian businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                Browse Federal Grants
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Download Application Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Major Federal Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the most significant federal funding opportunities for Canadian businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-red-100 text-red-800">SIF</Badge>
                </div>
                <CardTitle>Strategic Innovation Fund</CardTitle>
                <CardDescription>
                  Large-scale funding for transformative business projects that drive innovation and economic growth.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Range:</span>
                    <span className="font-semibold text-green-600">$10M - $100M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application:</span>
                    <span className="text-sm">Rolling applications</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Innovation & Scale</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Large-scale transformative projects</li>
                    <li>• Significant economic impact</li>
                    <li>• Innovation and competitiveness</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">CSBF</Badge>
                </div>
                <CardTitle>Canada Small Business Financing</CardTitle>
                <CardDescription>
                  Government-backed loans and financing programs for small and medium enterprises.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Range:</span>
                    <span className="font-semibold text-green-600">$25K - $1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application:</span>
                    <span className="text-sm">Ongoing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Small Business</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Equipment and technology</li>
                    <li>• Real estate improvements</li>
                    <li>• Working capital needs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Targeted</Badge>
                </div>
                <CardTitle>Targeted Support Programs</CardTitle>
                <CardDescription>
                  Specialized funding for women, Indigenous entrepreneurs, and other underrepresented groups.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Range:</span>
                    <span className="font-semibold text-green-600">$5K - $500K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application:</span>
                    <span className="text-sm">Various deadlines</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Diversity & Inclusion</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Women Entrepreneurship Strategy</li>
                    <li>• Indigenous Business Development</li>
                    <li>• Youth entrepreneurship programs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Federal Grants Table */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <GrantComparisonTable grants={federalGrants} title="Federal Grant Programs" showFilters={true} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
