import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { getGrantsByCountry } from "@/lib/grants-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Building, Users, Zap, BookOpen, TrendingUp, DollarSign, Target, CheckCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Small Business Grants USA 2026: $44.8B Available [Apply Now]",
  description:
    "Find small business grants in the USA. Browse SBA grants, federal small business funding, microloans, and government programs with up to $2M available.",
  keywords: "small business grants usa, SBA grants, small business funding, federal grants small business, government business grants",
  openGraph: {
    title: "Small Business Grants USA 2026: $44.8B Available [Apply Now]",
    description: "Find small business grants and funding programs in the USA.",
    url: "https://www.fsidigital.ca/usa/small-business-grants",
  },
}

export default function USASmallBusinessGrantsPage() {
  const usaGrants = getGrantsByCountry("USA")
  const smallBusinessGrants = usaGrants.filter((grant) => 
    grant.category.includes("Small Business") || 
    grant.name.includes("Small Business") ||
    grant.name.includes("SBA") ||
    grant.eligibility.some(e => e.includes("small business"))
  )

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">🏢 USA Small Business Programs</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Small Business Grants{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                USA 2025
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed text-pretty">
              Access comprehensive small business funding including SBA grants, federal programs, microloans, and 
              specialized funding designed to help American small businesses start, grow, and scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                Browse Small Business Grants Below
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link href="/guides/apply-sba-loans">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Get SBA Application Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Small Business Funding Landscape</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Small businesses are the backbone of the American economy, driving innovation and job creation nationwide.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">33.2M</div>
              <div className="text-gray-600">Small Businesses in USA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$44.8B</div>
              <div className="text-gray-600">SBA Loans Approved 2024</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600">Of All US Businesses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">61.7M</div>
              <div className="text-gray-600">Americans Employed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Major Small Business Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Major Small Business Funding Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the most significant federal and SBA funding opportunities for American small businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SBA 7(a) Loans */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">SBA 7(a)</Badge>
                </div>
                <CardTitle>SBA 7(a) Loans</CardTitle>
                <CardDescription>
                  Most popular SBA loan program providing flexible funding for working capital, equipment, and expansion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Range:</span>
                    <span className="font-semibold text-green-600">Up to $5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Terms:</span>
                    <span className="text-sm">Up to 25 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SBA Guarantee:</span>
                    <span className="text-sm">75-85%</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Working capital & expansion</li>
                    <li>• Equipment & real estate</li>
                    <li>• Business acquisition</li>
                    <li>• Debt refinancing</li>
                  </ul>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/sba-7a-loans-complete-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More About SBA Loans
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SBA Microloans */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Microloans</Badge>
                </div>
                <CardTitle>SBA Microloans</CardTitle>
                <CardDescription>
                  Small, short-term loans for startups and small businesses needing smaller funding amounts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Range:</span>
                    <span className="font-semibold text-green-600">Up to $50K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average:</span>
                    <span className="text-sm">$13,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Terms:</span>
                    <span className="text-sm">Up to 6 years</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Working capital</li>
                    <li>• Inventory & supplies</li>
                    <li>• Equipment (not real estate)</li>
                    <li>• Business mentoring included</li>
                  </ul>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/sba-microloans-complete-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn About Microloans
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SBIR for Small Business */}
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
                  Federal R&D funding for innovative small businesses with high-growth potential.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grant Range:</span>
                    <span className="font-semibold text-green-600">$50K - $1.7M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phases:</span>
                    <span className="text-sm">3-phase program</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">R&D Innovation</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Phase I: $50K-$300K proof of concept</li>
                    <li>• Phase II: $750K-$1.7M development</li>
                    <li>• Phase III: Commercialization</li>
                    <li>• No repayment required</li>
                  </ul>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/sbir-small-business-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More About SBIR
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* State & Local Programs */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">State Programs</Badge>
                </div>
                <CardTitle>State & Local Business Grants</CardTitle>
                <CardDescription>
                  Regional funding programs tailored to local economic development and business growth.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grant Range:</span>
                    <span className="font-semibold text-green-600">$5K - $500K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility:</span>
                    <span className="text-sm">Location-based</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Local Economic Development</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Job creation incentives</li>
                    <li>• Industry-specific funding</li>
                    <li>• Rural business development</li>
                    <li>• Export assistance programs</li>
                  </ul>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/state-local-business-grants-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn About State Programs
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency & Disaster Relief */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-red-100 text-red-800">Emergency</Badge>
                </div>
                <CardTitle>Disaster Relief Loans</CardTitle>
                <CardDescription>
                  SBA disaster loans for businesses affected by natural disasters and economic hardship.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Range:</span>
                    <span className="font-semibold text-green-600">Up to $2M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="text-sm">As low as 4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Terms:</span>
                    <span className="text-sm">Up to 30 years</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Physical damage repair</li>
                    <li>• Economic injury assistance</li>
                    <li>• Working capital replacement</li>
                    <li>• Low-interest rates</li>
                  </ul>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/sba-disaster-relief-loans-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn About Disaster Relief
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Industry-Specific Programs */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-teal-100 text-teal-800">Industry-Specific</Badge>
                </div>
                <CardTitle>Industry-Specific Small Business Grants</CardTitle>
                <CardDescription>
                  Specialized funding programs targeting specific industries and business sectors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grant Range:</span>
                    <span className="font-semibold text-green-600">$10K - $1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Sector-specific</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility:</span>
                    <span className="text-sm">Industry-based</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Agriculture & rural development</li>
                    <li>• Manufacturing & technology</li>
                    <li>• Healthcare & life sciences</li>
                    <li>• Clean energy & sustainability</li>
                  </ul>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/industry-specific-business-grants-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Explore Industry Programs
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Small Business Funding Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these essential steps to successfully apply for small business grants and loans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Business Registration</h3>
              <p className="text-gray-600">
                Register your business, obtain EIN, and complete SAM.gov registration for federal programs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Financial Preparation</h3>
              <p className="text-gray-600">Prepare financial statements, tax returns, and business plan documentation.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Funding Sources</h3>
              <p className="text-gray-600">Research and identify the best funding programs for your business needs.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Submit & Follow Up</h3>
              <p className="text-gray-600">
                Complete applications through proper channels and maintain communication with lenders.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/guides/apply-sba-loans">
                <BookOpen className="w-5 h-5 mr-2" />
                Get Complete Application Guide
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Small Business Grants Table */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Small Business Grant Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse all available small business grants and funding programs. Click "Application Guide" for detailed instructions.
            </p>
          </div>
          <GrantComparisonTable grants={smallBusinessGrants} title="Small Business Grant Programs" showFilters={true} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
