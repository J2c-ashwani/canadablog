import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Scotiabank Women Initiative 2026 | Capital Funding + Mentorship + Education for Women Entrepreneurs",
  description: "Complete guide to Scotiabank Women Initiative with capital funding access, mentorship programs, business education, and comprehensive support for Canadian women-led businesses.",
  keywords: "Scotiabank Women Initiative, women business funding, ScotiaRISE, women entrepreneur support, banking for women businesses",
  openGraph: {
    title: "Scotiabank Women Initiative 2026 | Capital + Mentorship + Education",
    description: "Comprehensive banking and support program for women-led businesses with capital access, mentorship, and educational resources.",
    url: "https://www.fsidigital.ca/blog/scotiabank-women-initiative",
    images: ["/og-image.jpg"],
  },
}

export default function ScotiabankWomenInitiativeGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-700 to-red-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏦 Ongoing Banking Support Program
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Scotiabank Women Initiative
              </h1>
              <p className="text-xl text-red-100 mb-8">
                Comprehensive banking and support program for Canadian women entrepreneurs featuring capital 
                funding access, mentorship programs, business education resources, and tailored financial solutions 
                through Scotiabank's commitment to advancing women-led businesses across Canada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100" asChild>
                  <Link href="#program-details">
                    View Program Details
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/scotiabank-women-initiative-guide">
                    Get Free Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Program Updates */}
        <section className="py-8 bg-green-50 border-b-2 border-green-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-green-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 Scotiabank Women Initiative 2026 Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>Capital Access:</strong> Financing solutions tailored for women-owned businesses
                        </div>
                        <div>
                          <strong>Mentorship:</strong> Access to business advisors and successful entrepreneurs
                        </div>
                        <div>
                          <strong>Education:</strong> Workshops, webinars, and resources for business growth
                        </div>
                        <div>
                          <strong>ScotiaRISE:</strong> Social impact initiative supporting diverse women entrepreneurs
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Banking Partner Committed to Women Entrepreneurship Success</h2>
                <p className="text-lg text-gray-600">
                  Scotiabank Women Initiative represents the bank's comprehensive commitment to supporting women 
                  entrepreneurs across Canada through capital access, mentorship programs, educational resources, 
                  and tailored banking solutions designed to help women-led businesses start, grow, and scale successfully.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">Capital</div>
                  <div className="text-gray-600">Funding Access</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">Mentorship</div>
                  <div className="text-gray-600">Expert Guidance</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Education</div>
                  <div className="text-gray-600">Business Resources</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">Ongoing</div>
                  <div className="text-gray-600">Rolling Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Components */}
        <section id="program-details" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Scotiabank Women Initiative Program Components</h2>
              
              <div className="space-y-8">
                {/* Capital Funding Access */}
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle className="text-red-700">Capital Funding & Financial Solutions</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-red-800">Business Financing Options</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                            <span className="font-semibold">Access Type:</span>
                            <span className="text-red-700 font-bold">Tailored Solutions</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Business loans and lines of credit</p>
                            <p>• Commercial banking services</p>
                            <p>• Merchant services and payment solutions</p>
                            <p>• Customized financing for women entrepreneurs</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Banking Support</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Business Accounts:</strong> Specialized banking products for women businesses</p>
                          <p><strong>Credit Solutions:</strong> Access to business credit and financing</p>
                          <p><strong>Advisory:</strong> Financial planning and business growth guidance</p>
                          <p><strong>Digital Tools:</strong> Online and mobile banking for business management</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mentorship Programs */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Mentorship & Advisory Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Expert Guidance Network</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Program Type:</span>
                            <span className="text-green-700 font-bold">Mentorship Access</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• One-on-one business mentorship opportunities</p>
                            <p>• Industry expert connections and guidance</p>
                            <p>• Peer networking with other women entrepreneurs</p>
                            <p>• Success stories and best practices sharing</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Mentorship Benefits</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Business Strategy:</strong> Growth planning and execution guidance</p>
                          <p><strong>Industry Insights:</strong> Sector-specific expertise and knowledge</p>
                          <p><strong>Network Building:</strong> Connections to customers and partners</p>
                          <p><strong>Leadership Development:</strong> Skills for scaling businesses</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Education & Resources */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Business Education & Learning Resources</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Educational Programs</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Access:</span>
                            <span className="text-blue-700 font-bold">Workshops & Webinars</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Comprehensive educational resources including workshops, webinars, online courses, 
                            and business tools designed to accelerate women entrepreneur knowledge and skills 
                            across all business stages.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Learning Topics</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Financial Management:</strong> Business finance and accounting</p>
                          <p><strong>Growth Strategies:</strong> Scaling and expansion planning</p>
                          <p><strong>Digital Marketing:</strong> Online presence and customer acquisition</p>
                          <p><strong>Operations:</strong> Efficiency and productivity optimization</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* ScotiaRISE Initiative */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">ScotiaRISE Social Impact Initiative</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">Resilience Through Inclusive Support</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Focus:</span>
                            <span className="text-purple-700 font-bold">Diverse Women</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>ScotiaRISE supports economic resilience and inclusive growth, with specific 
                            focus on diverse women entrepreneurs including Indigenous, Black, and newcomer 
                            women business owners through funding and partnership programs.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">ScotiaRISE Programs</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Community Partnerships:</strong> Support through women business organizations</p>
                          <p><strong>Funding Programs:</strong> Grants to ecosystem partners serving women</p>
                          <p><strong>Inclusive Growth:</strong> Addressing systemic barriers for diverse women</p>
                          <p><strong>Economic Resilience:</strong> Building strong women entrepreneur community</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Maximizing Scotiabank Women Initiative Benefits</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices for Program Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Early Contact:</strong> Connect with Scotiabank business advisors early in planning stage
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Leverage Education:</strong> Participate in workshops and webinars for skill building
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Build Relationships:</strong> Engage with mentorship programs and peer networks
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Comprehensive Use:</strong> Take advantage of all program components not just financing
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common Mistakes to Avoid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Single Focus:</strong> Only using financing without mentorship or education resources
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Preparation:</strong> Not having business plan or financial statements ready
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Limited Networking:</strong> Not engaging with women entrepreneur community
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Missing Updates:</strong> Not staying informed about new programs and resources
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-700 to-red-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Scotiabank Women Initiative Support?
              </h2>
              <p className="text-xl text-red-100 mb-8">
                Get our complete Scotiabank Women Initiative guide with program comparison and access strategies, 
                or work with our banking specialists for expert navigation support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free Program Guide</h4>
                  <p className="text-red-100 text-sm mb-4">
                    Get our comprehensive Scotiabank Women Initiative guide with capital access strategies, 
                    mentorship program details, and educational resource overview.
                  </p>
                  <Button size="lg" className="w-full bg-white text-red-700 hover:bg-gray-100" asChild>
                    <Link href="/download/scotiabank-women-initiative-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get Scotiabank Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Navigation Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with banking specialists who understand Scotiabank programs and can help 
                    navigate capital access, mentorship, and educational resources.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=scotiabank-women-initiative-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-red-200 text-sm mt-6">
                Expert guidance • Capital access • Mentorship programs • Business education • Scotiabank success
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
