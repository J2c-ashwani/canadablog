import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { grantsDatabase } from "@/lib/grants-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Building, MapPin } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Government Grants Database | USA & Canada Business Funding",
  description:
    "Browse our comprehensive database of 800+ government grants for businesses in USA and Canada. Compare funding amounts, deadlines, and eligibility requirements.",
  keywords:
    "government grants database, business grants comparison, USA Canada grants, grant search, funding opportunities",
  openGraph: {
    title: "All Government Grants Database | USA & Canada Business Funding",
    description: "Browse our comprehensive database of 800+ government grants for businesses.",
    url: "https://fsidigital.ca/grants",
  },
}

export default function AllGrantsPage() {
  const totalFunding = grantsDatabase.reduce((sum, grant) => sum + grant.fundingMax, 0)
  const activeGrants = grantsDatabase.filter((grant) => grant.status === "Active").length
  const usaGrants = grantsDatabase.filter((grant) => grant.country === "USA").length
  const canadaGrants = grantsDatabase.filter((grant) => grant.country === "Canada").length

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">Complete Grant Database</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Browse All{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Government Grants
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
              Search and compare over 800 government grants from USA and Canada. Find the perfect funding opportunity
              for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">${(totalFunding / 1000000000).toFixed(1)}B+</div>
                <div className="text-gray-600">Total Available</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Building className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{activeGrants}</div>
                <div className="text-gray-600">Active Grants</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{usaGrants}</div>
                <div className="text-gray-600">USA Grants</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{canadaGrants}</div>
                <div className="text-gray-600">Canada Grants</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AdSense Placement */}
      <div className="ad-container">
        <div className="ad-banner">
          <p className="text-gray-500 text-sm">Advertisement</p>
        </div>
      </div>

      {/* Grants Table */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <GrantComparisonTable grants={grantsDatabase} title="All Government Grants" showFilters={true} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
