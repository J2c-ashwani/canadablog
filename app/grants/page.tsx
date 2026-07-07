import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { grantsDatabase } from "@/lib/grants-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Building, MapPin, BookOpen, Download, Calculator, Sparkles, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { getPseoProvinceSummaries } from "@/lib/pseo-data"

import EEATBadge from '@/components/blog/EEATBadge'

export const metadata: Metadata = {
  title: "All Government Grants Database | USA & Canada Business Funding",
  description:
    "Browse our comprehensive database of 800+ government grants for businesses in USA and Canada. Compare funding amounts, deadlines, and eligibility requirements.",
  keywords:
    "government grants database, business grants comparison, USA Canada grants, grant search, funding opportunities",
  alternates: {
    canonical: "https://www.fsidigital.ca/grants",
  },
  openGraph: {
    title: "All Government Grants Database | USA & Canada Business Funding",
    description: "Browse our comprehensive database of 800+ government grants for businesses.",
    url: "https://www.fsidigital.ca/grants",
  },
}

export default function AllGrantsPage() {
  const totalFunding = grantsDatabase.reduce((sum, grant) => sum + grant.fundingMax, 0)
  const activeGrants = grantsDatabase.filter((grant) => grant.status === "Active").length
  const usaGrants = grantsDatabase.filter((grant) => grant.country === "USA").length
  const canadaGrants = grantsDatabase.filter((grant) => grant.country === "Canada").length
  const provinceHubs = getPseoProvinceSummaries()

  return (
    <>
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

        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex justify-center">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-03-01" />
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

        <section className="py-16 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Local grant pages by region</h2>
                <p className="mt-3 max-w-3xl text-gray-600">
                  Browse city and industry specific grant pages across Canada and the United States.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {provinceHubs.map((hub) => (
                  <Link
                    key={hub.provinceSlug}
                    href={`/grants/${hub.provinceSlug}`}
                    className="rounded border border-gray-200 p-4 transition hover:border-green-300 hover:bg-green-50"
                  >
                    <div className="font-semibold text-gray-950">{hub.provinceName}</div>
                    <div className="mt-2 text-sm text-gray-600">
                      {hub.cityCount} cities, {hub.pageCount} grant pages
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Grants Table */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GrantComparisonTable grants={grantsDatabase} title="All Government Grants" showFilters={true} />
          </div>
        </section>

        {/* Internal Hub Links */}
        <section className="py-14 bg-slate-50 border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">Your Next Steps After Finding a Grant</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-sm transition-shadow">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Read Application Guides</h3>
                  <p className="text-sm text-slate-500 mb-4">Step-by-step how-to guides for IRAP, SR&amp;ED, CSBFP, SBA, SBIR, and 30+ more programs.</p>
                  <Link href="/guides" className="inline-flex items-center gap-1.5 text-indigo-600 font-bold text-sm hover:text-indigo-800">
                    Browse Guides <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-sm transition-shadow">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Download Free Kits</h3>
                  <p className="text-sm text-slate-500 mb-4">Free application kits, checklists, and templates for 60+ government funding programs.</p>
                  <Link href="/download" className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-sm hover:text-emerald-800">
                    Get Free Templates <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-sm transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Get AI-Matched Grants</h3>
                  <p className="text-sm text-slate-500 mb-4">Let our AI Grant Finder scan 1,200+ active programs and surface only the ones that match your exact profile.</p>
                  <Link href="/grant-finder" className="inline-flex items-center gap-1.5 text-purple-600 font-bold text-sm hover:text-purple-800">
                    Try AI Finder <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">How many business grants are actively available in Canada and the USA?</h3>
                    <p className="text-gray-600">There are over 800 active government grant programs and business funding opportunities currently listed and tracked across both Canada and the USA. This database is updated continuously.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Are there grants specifically for small businesses?</h3>
                    <p className="text-gray-600">Yes, a large portion of available government funding is specifically reserved for small and medium-sized enterprises (SMEs). This includes specialized loan funds, tax credits, and direct grant contributions.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to pay back a government grant?</h3>
                    <p className="text-gray-600">Most true 'grants' are non-repayable, provided you meet the performance and reporting requirements. However, many government 'funding' programs are actually interest-free loans or repayable contributions. Our database clarifies the funding type for each program.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I start applying for a grant?</h3>
                    <p className="text-gray-600">The first step is finding a grant that matches your exact industry, location, and project type (e.g., hiring, exporting, R&D). Use our Grant Finder tool to filter the database, then read our comprehensive guides for application strategies.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
