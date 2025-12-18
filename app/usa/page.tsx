import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { getGrantsByCountry } from "@/lib/grants-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Heart, Users, Crown, BookOpen, TrendingUp, DollarSign, Target, CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Entrepreneurs Grants USA 2025 | Female Business Owner Funding",
  description:
    "Find grants for women entrepreneurs in the USA. Browse women-owned business grants, SBA programs for women, and federal funding up to $1M available.",
  keywords: "women entrepreneurs grants usa, women owned business grants, female entrepreneur funding, SBA women grants, grants for women business owners",
  openGraph: {
    title: "Women Entrepreneurs Grants USA 2025 | Female Business Owner Funding",
    description: "Find grants and funding programs specifically for women entrepreneurs and female business owners in the USA.",
    url: "https://fsidigital.ca/usa/women-entrepreneurs-grants",
  },
}

export default function USAWomenEntrepreneursGrantsPage() {
  const usaGrants = getGrantsByCountry("USA")
  const womenGrantsAll = usaGrants.filter((grant) => 
    grant.category.includes("Women") || 
    grant.name.includes("Women") ||
    grant.name.includes("Female") ||
    grant.eligibility.some(e => e.includes("women") || e.includes("female") || e.includes("Women"))
  )
  
  // If no specific women grants, include minority and general small business grants
  const womenGrants = womenGrantsAll.length > 0 ? womenGrantsAll : usaGrants.filter((grant) => 
    grant.category.includes("Small Business") || 
    grant.category.includes("Minority") ||
    grant.name.includes("Small Business") ||
    grant.eligibility.some(e => e.includes("small business") || e.includes("minority"))
  )

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">👩‍💼 Women Entrepreneur Programs</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Women Entrepreneurs Grants{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                USA 2025
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100 leading-relaxed text-pretty">
              Comprehensive funding opportunities for women entrepreneurs and female business owners. Access specialized 
              grants, SBA programs, and federal funding designed to support women-led businesses across America.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                Browse Women's Business Grants Below
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link href="/guides/apply-minority-grants">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Get Women's Grant Application Guide
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Women Entrepreneurs Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Women-owned businesses are among the fastest-growing segments of the economy, driving innovation and job creation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">13M+</div>
              <div className="text-gray-600">Women-Owned Businesses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">42%</div>
              <div className="text-gray-600">Growth Rate Since 2019</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$2.7T</div>
              <div className="text-gray-600">Annual Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10.2M</div>
              <div className="text-gray-600">Jobs Provided</div>
            </div>
          </div>
        </div>
      </section>

      {/* Major Women's Business Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Major Women's Business Funding Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore funding opportunities specifically designed to support women entrepreneurs and female business owners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Women's Business Centers */}
            <Card className="hover:shadow-lg transition-shadow border-pink-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-pink-100 text-pink-800">WBC Programs</Badge>
                </div>
                <CardTitle>Women's Business Centers</CardTitle>
                <CardDescription>
                  SBA-funded centers providing counseling, training, and access to capital for women entrepreneurs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grant Range:</span>
                    <span className="font-semibold text-green-600">$5K - $100K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Centers:</span>
                    <span className="text-sm">100+ Nationwide</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Training & Support</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Business counseling & training</li>
                    <li>• Access to capital programs</li>
                    <li>• Networking opportunities</li>
                    <li>• Government contracting assistance</li>
                  </ul>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/women-business-centers-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn About WBC Programs
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Women-Owned Small Business Federal Contracting */}
            <Card className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">WOSB Contracting</Badge>
                </div>
                <CardTitle>Women-Owned Small Business Contracting</CardTitle>
                <CardDescription>
                  Federal contracting set-aside opportunities exclusively for certified women-owned businesses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contract Value:</span>
                    <span className="font-semibold text-green-600">$10K - $10M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Goal:</span>
                    <span className="text-sm">5% of Federal Contracts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certification:</span>
                    <span className="text-sm">WOSB/EDWOSB</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Set-aside contracts</li>
                    <li>• Sole-source opportunities</li>
                    <li>• Industry-specific contracts</li>
                    <li>• Priority consideration</li>
                  </ul>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/wosb-federal-contracting-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn About WOSB Contracting
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* National Women's Business Council Programs */}
            <Card className="hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">NWBC</Badge>
                </div>
                <CardTitle>National Women's Business Council</CardTitle>
                <CardDescription>
                  Federal advisory council supporting policies and programs for women's business development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Research:</span>
                    <span className="font-semibold text-green-600">Policy & Data</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Advocacy:</span>
                    <span className="text-sm">Federal Level</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Women's Business Growth</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Policy recommendations</li>
                    <li>• Research & data analysis</li>
                    <li>• Best practices development</li>
                    <li>• Advocacy for women entrepreneurs</li>
                  </ul>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/nwbc-programs-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn About NWBC
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Women-Focused Private Foundations */}
            <Card className="hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">Private Grants</Badge>
                </div>
                <CardTitle>Women-Focused Private Foundation Grants</CardTitle>
                <CardDescription>
                  Private foundation grants specifically supporting women entrepreneurs and business development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grant Range:</span>
                    <span className="font-semibold text-green-600">$1K - $250K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Foundations:</span>
                    <span className="text-sm">50+ Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Women Empowerment</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• The Cartier Women's Initiative</li>
                    <li>• Kiva Microfunds for Women</li>
                    <li>• Amber Grant Foundation</li>
                    <li>• Local women's business funds</li>
                  </ul>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/private-women-grants-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Explore Private Grants
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Women in Technology & STEM */}
            <Card className="hover:shadow-lg transition-shadow border-indigo-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-800">STEM/Tech</Badge>
                </div>
                <CardTitle>Women in Technology & STEM Grants</CardTitle>
                <CardDescription>
                  Specialized funding for women-led businesses in technology, science, and innovation sectors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grant Range:</span>
                    <span className="font-semibold text-green-600">$25K - $1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Tech Innovation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sectors:</span>
                    <span className="text-sm">STEM Fields</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• Women in Tech accelerators</li>
                    <li>• STEM research grants</li>
                    <li>• Innovation competitions</li>
                    <li>• Technology startup funding</li>
                  </ul>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/women-tech-stem-grants-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn About Tech Grants
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* State & Local Women's Programs */}
            <Card className="hover:shadow-lg transition-shadow border-orange-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">State/Local</Badge>
                </div>
                <CardTitle>State & Local Women's Business Programs</CardTitle>
                <CardDescription>
                  Regional programs supporting women entrepreneurs through state and local government initiatives.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grant Range:</span>
                    <span className="font-semibold text-green-600">$2K - $100K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Programs:</span>
                    <span className="text-sm">50 States</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="text-sm">Local Economic Development</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mt-4">
                    <li>• State women's business centers</li>
                    <li>• Local procurement opportunities</li>
                    <li>• Regional development funds</li>
                    <li>• Economic development incentives</li>
                  </ul>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/state-women-business-programs-guide">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Find State Programs
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Women Entrepreneur Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from women entrepreneurs who successfully secured funding and grew their businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-pink-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Chen</h4>
                    <p className="text-sm text-gray-600">Tech Startup Founder</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "The Women's Business Center helped me secure $150K in funding and provided invaluable mentoring 
                  throughout my startup journey."
                </blockquote>
                <div className="text-sm text-pink-600 font-semibold">
                  Secured: $150K • Industry: Technology
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">Maria Rodriguez</h4>
                    <p className="text-sm text-gray-600">Manufacturing Business Owner</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "WOSB certification opened doors to federal contracts worth over $2M. The process was worth every effort."
                </blockquote>
                <div className="text-sm text-purple-600 font-semibold">
                  Secured: $2M+ • Industry: Manufacturing
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Sparkles className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">Jessica Taylor</h4>
                    <p className="text-sm text-gray-600">Sustainable Fashion Brand</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "Private foundation grants gave me the initial capital to launch my sustainable fashion brand. 
                  Now we're nationwide!"
                </blockquote>
                <div className="text-sm text-green-600 font-semibold">
                  Secured: $75K • Industry: Fashion/Retail
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Women's Business Grant Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these essential steps to successfully apply for women-focused business grants and funding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Business Certification</h3>
              <p className="text-gray-600">
                Get WOSB certification and register with SAM.gov for federal opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect with WBCs</h3>
              <p className="text-gray-600">Find your local Women's Business Center for counseling and support.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Research Opportunities</h3>
              <p className="text-gray-600">Identify federal, state, and private funding sources for women.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Apply & Network</h3>
              <p className="text-gray-600">
                Submit applications and leverage women entrepreneur networks.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/guides/apply-minority-grants">
                <BookOpen className="w-5 h-5 mr-2" />
                Get Women's Grant Application Guide
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Women's Business Grant Programs Table */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Women's Business Grant Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse all available grants and funding programs for women entrepreneurs. Click "Application Guide" for detailed instructions.
            </p>
          </div>
          <GrantComparisonTable grants={womenGrants} title="Women's Business Grant Programs" showFilters={true} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
