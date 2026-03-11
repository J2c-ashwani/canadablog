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
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

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
      {/* EEAT Components */}
      <section className="py-6 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <ShortAnswerBox content="U.S. small businesses can access $50B+ annually through SBA programs, SBIR/STTR grants, and state-level funding. The SBA 7(a) loan guarantees up to $5M. SBIR Phase I provides up to $305K in non-dilutive funding." />
            <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-03-01" />
            <EligibleCheck />
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

      {/* Deep Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">

            <Card>
              <CardHeader><CardTitle className="text-xl">SBA Loan Programs Compared — Which One Is Right for Your Business?</CardTitle></CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  The SBA administers several distinct loan programs, each designed for different business needs. Understanding which program fits your situation is the critical first step — applying to the wrong program wastes months. Here&apos;s a direct comparison of the three primary programs:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-green-800 text-white">
                        <th className="text-left p-3 font-medium">Program</th>
                        <th className="text-left p-3 font-medium">Max Amount</th>
                        <th className="text-left p-3 font-medium">Best For</th>
                        <th className="text-left p-3 font-medium">Key Requirement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["SBA 7(a)", "$5M", "Working capital, equipment, business acquisition, renovation, refinancing", "Good credit; 2+ years operating history; collateral for larger amounts"],
                        ["SBA 504", "$5M–$5.5M", "Fixed assets: commercial real estate, large equipment, infrastructure", "For-profit business; net income under $5M; tangible net worth under $15M"],
                        ["SBA Microloan", "$50K max (avg $13K)", "Startups, micro-businesses, inventory, working capital, small equipment", "Administered through nonprofit lenders; business training often required"],
                        ["SBA Express", "$500K", "Faster 7(a) with 36-hour response; small working capital needs", "Smaller maximum; higher interest rate; 50% SBA guarantee (vs 85%)"],
                        ["SBA Disaster", "$2M", "Physical damage or economic injury from declared disasters", "Must be in declared disaster area; demonstrates disaster-related need"],
                      ].map(([prog, max, best, req], i) => (
                        <tr key={prog} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="p-3 font-semibold text-green-900">{prog}</td>
                          <td className="p-3 text-green-700 font-medium">{max}</td>
                          <td className="p-3 text-gray-700 text-xs">{best}</td>
                          <td className="p-3 text-gray-600 text-xs">{req}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-xl">SBA Business Certifications — Access to Set-Aside Contracts and Grant Priority</CardTitle></CardHeader>
              <CardContent className="text-gray-700 space-y-4">
                <p className="leading-relaxed">
                  SBA certifications provide access to federal set-aside contracts (some government contracts reserved only for certified businesses) AND scoring advantages in certain grant programs. If you qualify, these certifications are among the highest-ROI business development investments your small business can make.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { cert: "8(a) Business Development Program", who: "Socially AND economically disadvantaged individuals. Net worth under $750K, adjusted gross income under $350K.", benefit: "9-year certification; sole-source contracts up to $4.5M (goods/services) and $7M (manufacturing); business development mentorship; access to SBA 8(a) contract set-asides.", apply: "sba.gov/8a" },
                    { cert: "Women-Owned Small Business (WOSB)", who: "51%+ women-owned and controlled small business in WOSB-eligible industry.", benefit: "Federal contract set-asides for WOSB; EDWOSB (Economically Disadvantaged WOSB) can receive sole-source awards. No size limitation beyond SBA small business definition.", apply: "certify.sba.gov/wosb" },
                    { cert: "HUBZone Certification", who: "Business located in HUBZone area; 35% of employees living in HUBZone; meets SBA small business standards.", benefit: "Set-aside contract eligibility; 10% price evaluation preference in competing bids; competitive advantage in HUBZone-eligible solicitations.", apply: "sba.gov/hubzone" },
                    { cert: "Service-Disabled Veteran-Owned (SDVOSB)", who: "51%+ owned/controlled by service-disabled veteran(s); meets SBA size standards.", benefit: "Federal contract set-asides; sole-source contracts up to $4.5M (goods/services) and $7M (manufacturing); VA Veterans First Contracting priority.", apply: "vetcert.va.gov (VA CVE)" },
                  ].map(({ cert, who, benefit, apply }) => (
                    <div key={cert} className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="font-semibold text-green-900 mb-1 text-sm">{cert}</div>
                      <div className="text-xs text-green-700 mb-1"><span className="font-medium">Who:</span> {who}</div>
                      <div className="text-xs text-green-700 mb-1"><span className="font-medium">Benefit:</span> {benefit}</div>
                      <div className="text-xs text-green-600"><span className="font-medium">Apply:</span> {apply}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-100">
              <CardHeader><CardTitle className="text-xl text-red-900">5 Mistakes Small Businesses Make When Seeking U.S. Government Funding</CardTitle></CardHeader>
              <CardContent className="text-red-900 space-y-3">
                {[
                  { n: "1", m: "Applying for SBA Grants When SBA Primarily Provides Loans", d: "The SBA is primarily a loan-guarantee agency, not a grant-giving agency. Direct SBA grants to for-profit businesses are limited to specific programs (WOSB accelerator programs, specific disaster relief contexts). Most small businesses seeking 'SBA grants' should actually be applying for SBA-guaranteed loans — which have substantially better terms than conventional bank loans but must be repaid." },
                  { n: "2", m: "Not Engaging a Local SBA Resource Partner Before Applying", d: "SBA SCORE mentors and SBDC advisors are free, experienced advisors who significantly improve loan application quality, lender selection strategy, and overall funding approach. Businesses that apply without engaging these free resources consistently have lower approval rates and accept worse terms than businesses that engage SBDC advisors first." },
                  { n: "3", m: "Seeking Only Federal Funding While Missing State and Local Programs", d: "Every state has economic development programs including direct business grants, tax credit programs, job creation incentives, and business loan programs — often simpler to access than federal programs. Businesses that apply only to federal programs miss substantial state-level capital that is faster to access and less competitive." },
                  { n: "4", m: "Not Obtaining SBA Certifications Before Pursuing Contracts and Grants", d: "SBA certifications (8(a), WOSB, HUBZone, SDVOSB) take 3–6 months to obtain. Businesses that pursue federal contracts and grants without certifications compete in fully competitive procurement against experienced incumbents. Obtaining certifications before pursuing federal opportunities dramatically changes the competitive landscape." },
                  { n: "5", m: "Focusing Exclusively on Grants When Loans Would Be More Accessible and Faster", d: "True non-repayable grants for small for-profit businesses are limited and competitive. SBA-guaranteed loans are significantly more accessible, faster (weeks vs. months for grants), and can be refinanced or repaid early if grant funding subsequently arrives. A business waiting 12 months for a grant while declining an SBA loan loses operational momentum that no grant can recover." },
                ].map(({ n, m, d }) => (
                  <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="font-semibold text-red-900 mb-1">{n}. {m}</div>
                    <p className="text-xs text-red-800 leading-relaxed">{d}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ: USA Small Business Grants 2026</h2>
              <div className="space-y-4">
                {[
                  { q: "Does the federal government give grants to small businesses to start a business?", a: "True startup grants from the federal government for for-profit businesses are rare. SBIR Phase I ($305K) requires a working prototype concept and technical innovation — not just a business idea. The SBA Community Advantage loan program (through mission-focused lenders) and SBA Microloan program ($500–$50K) are the most accessible federal programs for startup businesses. Many state programs provide small business startup grants ($5K–$25K) through economic development agencies — these are more accessible and specifically designed for new businesses." },
                  { q: "What is an SBA-guaranteed loan and how is it different from a regular bank loan?", a: "An SBA-guaranteed loan is made by a private bank but partially guaranteed by the SBA — meaning if the business defaults, the SBA pays the bank 75–85% of the outstanding loan balance. This guarantee reduces the bank&apos;s risk, enabling them to lend to businesses that might not qualify for conventional financing. The result: better terms (longer repayment periods, lower down payments, potentially lower interest rates) for qualified small businesses. The SBA does not make the loan itself — it guarantees it, encouraging banks to lend to businesses they&apos;d otherwise decline." },
                  { q: "Can I get an SBA loan if I have bad credit?", a: "SBA loans have minimum credit requirements — most SBA 7(a) programs require a personal credit score of 650+ and the business must demonstrate ability to repay. Scores below 620 disqualify for most SBA 7(a) products. The SBA Microloan program (through nonprofit lenders) has more flexible credit standards, focusing more on character, business plan quality, and business model viability than credit scores. If your credit score is below 620, start with credit improvement while working with an SBDC advisor on a 6–12 month plan to SBA eligibility." },
                  { q: "What are CDFIs and can they help small businesses that SBA declines?", a: "Community Development Financial Institutions (CDFIs) are Treasury-certified financial institutions that provide credit, capital, and technical assistance to underserved communities and small businesses. CDFIs often have more flexible underwriting standards than conventional banks and SBA-approved lenders — serving businesses with limited credit history, minority-owned businesses, rural businesses, and businesses in low-income communities. Many CDFIs provide both loans (often subsidized rates) and sometimes small grants. Find CDFIs in your area at cdfifund.gov." },
                  { q: "Are there small business grants specifically for rural businesses?", a: "Yes — USDA Rural Development provides several grant and loan programs specifically for rural small businesses. The USDA B&I (Business & Industry) Loan Guarantee program (up to $25M) supports businesses in rural areas. USDA Rural Business Development Grants (RBDG) fund training, technical assistance, and rural business development. USDA REAP (Rural Energy for America Program) provides grants and loan guarantees for agricultural producers and rural small businesses installing renewable energy systems. Community Facilities grants support essential rural services. All are administered through USDA Rural Development regional offices." },
                  { q: "What is a SCORE mentor and are they really free?", a: "SCORE is a nonprofit organization partnered with the SBA that provides free mentorship to small business owners through a network of 10,000+ volunteer mentors who are experienced business executives, entrepreneurs, and professionals. Mentoring sessions are completely free — you can schedule multiple sessions with experienced mentors in your specific industry. SCORE is particularly valuable for first-time business owners seeking guidance on business plans, financial projections, SBA loan preparation, and overall business strategy. Find your local SCORE chapter at score.org." },
                  { q: "Can a sole proprietor or self-employed individual access SBA loans?", a: "Yes — SBA 7(a) loans are available to sole proprietors including self-employed individuals operating under Schedule C. SBA Microloans (up to $50K) are specifically designed for micro-businesses and sole proprietors. Requirements: EIN or SSN (sole proprietors can use SSN), ability to repay documentation (Schedule C tax returns), credit history, and business plan. The SBA Express loan ($500K max) is often the fastest option for established sole proprietors with good credit. First-time sole proprietors without revenue history may find the Microloan program (through nonprofit lenders) most accessible." },
                  { q: "Are there U.S. government grants for small businesses affected by international trade?", a: "Yes — several programs help small businesses affected by or seeking to benefit from international trade. The SBA State Trade Expansion Program (STEP) provides grants to states who then provide grants and technical assistance to small businesses for international market entry and trade show participation ($3K–$10K for market research, translation, certification, trade missions). The Export-Import Bank provides export credit insurance and working capital guarantees. For businesses negatively affected by trade policies, Trade Adjustment Assistance for Firms (TAAF) helps domestic manufacturers compete with imports." },
                ].map((item, i) => (
                  <Card key={i}><CardContent className="pt-5">
                    <div className="font-semibold text-gray-900 mb-2">{item.q}</div>
                    <div className="text-gray-600 text-sm leading-relaxed">{item.a}</div>
                  </CardContent></Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

