import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, MapPin } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ontario Government Business Grants 2026 | Provincial Funding Programs Guide | OCED Support",
  description: "Complete guide to Ontario government business grants and provincial funding programs. Access Ontario Creates, OCED programs, Starter Company Plus, and innovation funding for businesses in Ontario.",
  keywords: "Ontario government business grants, Ontario provincial funding, OCED grants, Starter Company Plus Ontario, Ontario Creates funding, Ontario business support programs 2026",
  openGraph: {
    title: "Ontario Government Business Grants 2026 | Provincial Funding Programs Guide",
    description: "Comprehensive guide to Ontario provincial business grants offering funding for startups, innovation, and business growth across all sectors.",
    url: "https://fsidigital.ca/blog/ontario-government-business-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function OntarioGovernmentBusinessGrantsBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🍁 Provincial Business Support Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Ontario Government Business Grants & Provincial Funding
              </h1>
              <p className="text-xl text-red-100 mb-8">
                Ontario's comprehensive provincial business support ecosystem offering grants, loans, and incentives
                from $5,000 to $10M+ through Ontario Creates, OCED programs, Starter Company Plus, and innovation
                initiatives supporting business growth across Canada's largest provincial economy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=ontario">
                    Find Your Ontario Program
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/government-grants">
                    Back to Government Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Program Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">$10M+</div>
                  <div className="text-gray-600">Max Ontario Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$2.5B</div>
                  <div className="text-gray-600">Annual Provincial Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-gray-600">Provincial Program Streams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">25,000+</div>
                  <div className="text-gray-600">Businesses Supported Annually</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Ontario as Provincial Economic Powerhouse</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Ontario represents Canada's largest provincial economy, contributing over 38% of national GDP with
                  comprehensive business support infrastructure spanning multiple ministries and agencies. The provincial
                  government delivers targeted funding through Ontario Centre for Entrepreneurship & Development (OCED),
                  Ontario Creates, Ministry of Economic Development, and regional development corporations, creating
                  Canada's most diverse provincial business support ecosystem.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-red-800">Provincial Policy Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Innovation and technology commercialization</li>
                      <li>• Manufacturing competitiveness and automation</li>
                      <li>• Creative industries and digital media development</li>
                      <li>• Regional economic development and diversification</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Strategic Provincial Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Coordination with federal innovation programs</li>
                      <li>• Municipal and regional partnership development</li>
                      <li>• Cross-border trade and investment facilitation</li>
                      <li>• Post-secondary research commercialization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Ontario Provincial Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Ontario Provincial Programs</h2>

              <div className="space-y-8">
                {/* Starter Company Plus */}
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle className="text-red-700">Starter Company Plus</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $50K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Startup Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Training Included</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Ontario's flagship entrepreneurship program providing funding, training, and mentorship for
                      new and early-stage businesses, delivered through regional partners across the province.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Program Components:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business training and workshops</li>
                          <li>• One-on-one business coaching</li>
                          <li>• Networking and mentorship opportunities</li>
                          <li>• Grant funding up to $50,000</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Equipment and technology purchases</li>
                          <li>• Marketing and branding initiatives</li>
                          <li>• Product development and prototyping</li>
                          <li>• Market research and business development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Provincial Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Ontario-based business operations</li>
                          <li>• Business less than 3 years old</li>
                          <li>• Completion of business training program</li>
                          <li>• Job creation commitment</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ontario Creates */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Ontario Creates</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Creative Industries</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Content Creation</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Export Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Ontario's creative industries agency supporting film, television, digital media, music,
                      book publishing, and interactive digital media companies through comprehensive funding programs.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Creative Industries Supported:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Film and television production</li>
                          <li>• Interactive digital media and gaming</li>
                          <li>• Music creation and publishing</li>
                          <li>• Book and magazine publishing</li>
                          <li>• Digital content and streaming media</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Key Program Streams:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Ontario Production Services Tax Credit</li>
                          <li>• Ontario Interactive Digital Media Tax Credit</li>
                          <li>• Indigenous Screen Office funding</li>
                          <li>• Ontario Music Investment Fund</li>
                          <li>• Book and Publishing Industry Development Program</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ontario Centre for Innovation */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Ontario Centre for Innovation (OCI)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Innovation Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Tech Development</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Scale-up Support</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Provincial innovation agency providing funding and support for technology companies,
                      research commercialization, and innovation ecosystem development across Ontario.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Innovation Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Technology development funding</li>
                          <li>• Commercialization support</li>
                          <li>• Scale-up acceleration programs</li>
                          <li>• International market development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Sector Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Information and communications technology</li>
                          <li>• Advanced manufacturing and materials</li>
                          <li>• Life sciences and health technologies</li>
                          <li>• Clean technology and energy</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Provincial Services:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business advisory and coaching</li>
                          <li>• Access to capital and investment</li>
                          <li>• Market intelligence and research</li>
                          <li>• Partnership and collaboration facilitation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Regional Development Programs */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Ontario Regional Development Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $2M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Regional Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Economic Development</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Community Impact</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Provincial regional development initiatives supporting economic diversification,
                      job creation, and business growth in specific geographic areas across Ontario.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Northern Ontario Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Northern Ontario Heritage Fund Corporation (NOHFC)</li>
                          <li>• Innovation North program</li>
                          <li>• Community Economic Development Program</li>
                          <li>• Tourism and culture development initiatives</li>
                          <li>• Indigenous business development support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Eastern & Southwestern Ontario:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Eastern Ontario Development Program</li>
                          <li>• Southwestern Ontario Development Fund</li>
                          <li>• Rural Economic Development Program</li>
                          <li>• Regional Innovation Centre support</li>
                          <li>• Manufacturing and technology initiatives</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Continue with CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Ontario Provincial Business Funding?
              </h2>
              <p className="text-xl text-red-100 mb-8">
                Get the complete Ontario provincial application guide or work with our Ontario business funding specialists
                who have secured $12M+ in provincial grants with expertise across all Ontario programs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Ontario Approach</h4>
                  <p className="text-red-100 text-sm mb-4">
                    Get our comprehensive Ontario provincial application guide with program-specific templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-red-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-ontario-business-grants">
                      <Download className="w-4 h-4 mr-2" />
                      Get Ontario Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Ontario Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with Ontario business specialists who have secured $12M+ in provincial funding with 87% success rate.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=ontario-business-expert-help">
                      Get Ontario Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-red-200 text-sm mt-6">
                87% success rate for Ontario applications • Average funding secured: $285K • All provincial programs expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
