import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { getGrantsByCountry } from "@/lib/grants-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Building, Users, Zap, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Federal Grants for Small Business | USA Government Funding Programs",
  description:
    "Find federal grants for small businesses in the USA. Browse SBIR, SBA, and other federal funding programs with up to $1.7M available.",
  keywords: "federal grants small business, SBIR grants, SBA funding, USA federal grants, government business funding",
  openGraph: {
    title: "Federal Grants for Small Business | USA Government Funding Programs",
    description: "Find federal grants for small businesses in the USA.",
    url: "https://www.fsidigital.ca/usa/federal-grants",
  },
}

export default function USAFederalGrantsPage() {
  const usaGrants = getGrantsByCountry("USA")
  const federalGrants = usaGrants.filter((grant) => grant.region === "Federal")

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">🇺🇸 USA Federal Programs</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Federal Grants for{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Small Business
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
              Access federal funding programs including SBIR, SBA grants, and other government initiatives designed to
              support American small businesses and startups.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                Browse Federal Grants Below
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link href="/guides/federal-grants-application-tips">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Get Application Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Programs with Learn More Buttons */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Major Federal Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the most significant federal funding opportunities for American businesses. Click "Learn More" for detailed guides.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SBIR/STTR Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">SBIR/STTR</Badge>
                </div>
                <CardTitle>Small Business Innovation Research</CardTitle>
                <CardDescription>
                  Federal R&D funding for innovative small businesses with commercialization potential.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Range:</span>
                    <span className="font-semibold text-green-600">$50K - $1.7M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application:</span>
                    <span className="text-sm">Rolling deadlines</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">R&D and Innovation</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Phase I: Proof of concept ($50K-$300K)</li>
                    <li>• Phase II: Development ($750K-$1.7M)</li>
                    <li>• Phase III: Commercialization</li>
                  </ul>

                  {/* Learn More Button */}
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/sbir-sttr-complete-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More About SBIR
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SBA Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">SBA</Badge>
                </div>
                <CardTitle>Small Business Administration</CardTitle>
                <CardDescription>
                  Direct funding, loans, and support programs for small businesses across all industries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Range:</span>
                    <span className="font-semibold text-green-600">$10K - $500K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application:</span>
                    <span className="text-sm">Ongoing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">General Business</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Microloans ($500 - $50K)</li>
                    <li>• 7(a) Loans (up to $5M)</li>
                    <li>• CDC/504 Loans (real estate/equipment)</li>
                  </ul>

                  {/* Learn More Button */}
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/sba-loans-grants-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More About SBA
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialized Programs Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Specialized</Badge>
                </div>
                <CardTitle>Specialized Federal Programs</CardTitle>
                <CardDescription>
                  Targeted funding for women, minorities, veterans, and other specific business categories.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Range:</span>
                    <span className="font-semibold text-green-600">$15K - $400K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application:</span>
                    <span className="text-sm">Various deadlines</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Targeted Groups</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Women Business Centers</li>
                    <li>• Minority Business Development</li>
                    <li>• Veteran Entrepreneur Programs</li>
                  </ul>

                  {/* Learn More Button */}
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/federal-grants-women-minorities">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More About Specialized Programs
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Federal Grant Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these steps to successfully apply for federal grants. Get our detailed guide for step-by-step instructions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Register Your Business</h3>
              <p className="text-gray-600">
                Obtain DUNS number, register in SAM.gov, and complete business registrations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Opportunities</h3>
              <p className="text-gray-600">Search grants.gov and agency websites for relevant funding opportunities.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Prepare Application</h3>
              <p className="text-gray-600">Gather required documents, write proposals, and prepare detailed budgets.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Submit & Follow Up</h3>
              <p className="text-gray-600">
                Submit through grants.gov and track application status through the review process.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/guides/federal-grants-application-tips">
                <BookOpen className="w-5 h-5 mr-2" />
                Get Detailed Application Guide
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* State Matching Programs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">State SBIR Matching & Tech Grants</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Many states offer "matching funds" to boost your federal grant. Explore these state-specific technology programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-700">California</CardTitle>
                <CardDescription>CalSEED & SBIR Match</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/california-tech-programs" className="text-blue-600 hover:underline flex items-center">
                  View California Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-indigo-200">
              <CardHeader>
                <CardTitle className="text-indigo-700">New York</CardTitle>
                <CardDescription>START-UP NY & Pre-Seed</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/new-york-tech-programs" className="text-blue-600 hover:underline flex items-center">
                  View New York Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-700">Colorado</CardTitle>
                <CardDescription>Advanced Industries</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/colorado-tech-programs" className="text-blue-600 hover:underline flex items-center">
                  View Colorado Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-700">Massachusetts</CardTitle>
                <CardDescription>SBIR START & Life Sciences</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/massachusetts-tech-programs" className="text-blue-600 hover:underline flex items-center">
                  View Massachusetts Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-700">Washington</CardTitle>
                <CardDescription>WRF & Clean Energy</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/washington-tech-programs" className="text-blue-600 hover:underline flex items-center">
                  View Washington Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Federal Grants Table - Now with Internal Links */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Federal Grant Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse all available federal grants. Click "Application Guide" to get detailed instructions before applying.
            </p>
          </div>
          <GrantComparisonTable grants={federalGrants} title="Federal Grant Programs" showFilters={true} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
