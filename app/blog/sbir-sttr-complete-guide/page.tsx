import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBIR & STTR Grants Complete Guide 2025 | Small Business Innovation Research",
  description: "Complete guide to SBIR and STTR grants. Learn eligibility requirements, application process, funding phases, and tips to win up to $1.7M in federal R&D funding.",
  keywords: "SBIR grants, STTR grants, small business innovation research, federal R&D funding, Phase I Phase II grants",
  openGraph: {
    title: "SBIR & STTR Grants Complete Guide 2025",
    description: "Complete guide to SBIR and STTR grants with eligibility, application process, and winning strategies.",
    url: "https://grantfinder.pro/blog/sbir-sttr-complete-guide",
  },
}

export default function SBIRSTTRGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                💡 Complete Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SBIR & STTR Grants Complete Guide
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Everything you need to know about Small Business Innovation Research (SBIR) and Small Business Technology Transfer (STTR) grants. Win up to $1.7M in federal R&D funding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                  Start Reading Guide
                </Button>
                {/* FIXED: Added proper background styling for visibility */}
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/guides/apply-sbir-grants">
                    Get Application Checklist
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">$4.1B+</div>
                <div className="text-gray-600">Annual SBIR/STTR Awards</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">11</div>
                <div className="text-gray-600">Federal Agencies Participating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">$1.7M</div>
                <div className="text-gray-600">Maximum Phase II Award</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">23%</div>
                <div className="text-gray-600">Average Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* What is SBIR/STTR */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are SBIR & STTR Grants?</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">SBIR (Small Business Innovation Research)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Federal program that encourages domestic small businesses to engage in R&D with commercialization potential.
                      </p>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Small business must own 51%+ of the company</li>
                        <li>• Focus on innovation and commercialization</li>
                        <li>• No required partnerships</li>
                        <li>• Principal investigator must be primarily employed by the small business</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">STTR (Small Business Technology Transfer)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Requires partnership between small business and research institution to foster technology transfer.
                      </p>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Required partnership with research institution</li>
                        <li>• Small business performs 40%+ of work</li>
                        <li>• Research institution performs 30%+ of work</li>
                        <li>• Promotes technology transfer from academia</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Three Phase Structure */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SBIR/STTR Three-Phase Structure</h2>
                
                <div className="space-y-8">
                  {/* Phase I */}
                  <div className="border-l-4 border-green-500 pl-6">
                    <div className="flex items-center mb-3">
                      <Badge className="bg-green-100 text-green-800 mr-3">Phase I</Badge>
                      <span className="text-2xl font-bold text-gray-900">Proof of Concept</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> $50K - $300K</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Duration:</strong> 6-12 months</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Focus:</strong> Feasibility</span>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Establish technical merit, feasibility, and commercial potential. Determine if the research idea has merit and if the company can perform the research.
                    </p>
                  </div>

                  {/* Phase II */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <div className="flex items-center mb-3">
                      <Badge className="bg-blue-100 text-blue-800 mr-3">Phase II</Badge>
                      <span className="text-2xl font-bold text-gray-900">Development & Prototype</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> $750K - $1.7M</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Duration:</strong> 24 months</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Focus:</strong> Development</span>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Continue R&D efforts, build prototypes, and demonstrate commercial potential. Only Phase I recipients can apply for Phase II.
                    </p>
                  </div>

                  {/* Phase III */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <div className="flex items-center mb-3">
                      <Badge className="bg-purple-100 text-purple-800 mr-3">Phase III</Badge>
                      <span className="text-2xl font-bold text-gray-900">Commercialization</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> Private/Other Sources</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Duration:</strong> Ongoing</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Focus:</strong> Market Entry</span>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      No SBIR/STTR funds provided. Companies pursue commercialization through private investment, partnerships, or federal contracts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Participating Agencies */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Participating Federal Agencies</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3">Major SBIR/STTR Agencies:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Department of Defense (DoD) - $1.8B annually
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        National Institutes of Health (NIH) - $900M annually
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        National Science Foundation (NSF) - $200M annually
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Department of Energy (DOE) - $150M annually
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        NASA - $130M annually
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3">Other Agencies:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Department of Agriculture (USDA)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Department of Homeland Security (DHS)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Department of Transportation (DOT)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Environmental Protection Agency (EPA)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Department of Education (ED)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Eligibility Requirements</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ You Must Be:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Small Business:</strong> ≤ 500 employees, for-profit company</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>US Owned:</strong> ≥ 51% owned by US citizens or permanent residents</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Principal Investigator:</strong> Primarily employed by your company</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>R&D Focus:</strong> Conducting research with commercial potential</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Restrictions:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>No Large Businesses:</strong> Cannot be majority-owned by large companies</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>No Foreign Ownership:</strong> Cannot be majority foreign-owned</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>No Current Federal Funding:</strong> Cannot use other federal funds for same work</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Employee Limit:</strong> Must maintain small business status throughout</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FIXED: Single CTA Button - Removed external link */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for SBIR/STTR Grants?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Get our step-by-step application guide with checklists, templates, and proven strategies to maximize your chances of winning.
                </p>
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="/guides/apply-sbir-grants">
                    Get Application Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
