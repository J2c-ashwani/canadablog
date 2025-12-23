import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket, MapPin } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BC Women Business Grants 2026 | $650M Innovation & Tech Support Programs",
  description: "Complete guide to BC women entrepreneurship support with Women's Enterprise Centre loans up to $150K, Innovate BC programs, Indigenous women funding, and tech leadership initiatives.",
  keywords: "BC women business grants, WeBC loans, Innovate BC women, British Columbia women entrepreneurs, women tech BC",
  openGraph: {
    title: "BC Women Business Grants 2026 | $650M Innovation Support",
    description: "Comprehensive guide to BC women business support with WeBC financing, innovation programs, and technology leadership funding.",
    url: "https://www.fsidigital.ca/blog/bc-women-business-grants",
    images: ["/og-image.png"],
  },
}

export default function BCWomenBusinessGrantsGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏔️ BC Women Business Support 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                BC Women Business Grants & Innovation Funding
              </h1>
              <p className="text-xl text-emerald-100 mb-8">
                Access $650M in BC women entrepreneurship support including Women's Enterprise Centre 
                loans up to $150,000, Innovate BC women programs, Indigenous Women Entrepreneurship Fund, 
                tech women leadership initiatives, and comprehensive innovation funding across British Columbia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    View BC Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/bc-women-business-grants-guide">
                    Get Free BC Guide
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
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 BC Women Entrepreneurship 2026 Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>$650M Provincial Support:</strong> Innovation-focused women business ecosystem
                        </div>
                        <div>
                          <strong>WeBC Loans:</strong> Up to $150,000 with flexible terms and advisory
                        </div>
                        <div>
                          <strong>Innovate BC:</strong> Women-led tech and innovation program support
                        </div>
                        <div>
                          <strong>Indigenous Women:</strong> Dedicated entrepreneurship fund and resources
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* BC Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada's Innovation Hub for Women Entrepreneurs</h2>
                <p className="text-lg text-gray-600">
                  British Columbia leads in women entrepreneurship innovation with $650M in provincial support, 
                  WeBC financing up to $150,000, Innovate BC tech programs, and comprehensive resources designed 
                  to help women start, innovate, and scale businesses across BC's dynamic economy.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">$650M</div>
                  <div className="text-gray-600">Provincial Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$150K</div>
                  <div className="text-gray-600">WeBC Loans</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">Innovation</div>
                  <div className="text-gray-600">Tech Focus</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">Indigenous</div>
                  <div className="text-gray-600">Women Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BC Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">BC Women Business Support Programs</h2>
              
              <div className="space-y-8">
                {/* Women's Enterprise Centre BC */}
                <Card className="border-emerald-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-emerald-600 mr-3" />
                      <CardTitle className="text-emerald-700">Women's Enterprise Centre of BC (WeBC)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-emerald-800">Business Loans & Advisory</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg">
                            <span className="font-semibold">Loan Amount:</span>
                            <span className="text-emerald-700 font-bold">Up to $150,000</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Loans for market-ready startups and expansions</p>
                            <p>• Equal Access to Capital (EAC) program under $50K</p>
                            <p>• Business advisory and coaching services</p>
                            <p>• Training and skills development programs</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">WeBC Eligibility</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Ownership:</strong> 51%+ women-owned BC businesses</p>
                          <p><strong>Age:</strong> Over 19 years old, Canadian citizen/PR</p>
                          <p><strong>Business Stage:</strong> Market-ready, expansion, or acquisition</p>
                          <p><strong>Equity:</strong> 25% minimum equity contribution required</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 WeBC Loan Uses:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Startups:</strong> New business launch and market entry</li>
                            <li>• <strong>Expansion:</strong> Business growth and capacity increases</li>
                            <li>• <strong>Equipment:</strong> Leasehold improvements and purchases</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Working Capital:</strong> Operating expenses and cash flow</li>
                            <li>• <strong>Acquisition:</strong> Purchasing established businesses</li>
                            <li>• <strong>Market-Ready:</strong> For-profit businesses ready to operate</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Innovate BC Women Programs */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Innovate BC Women in Innovation Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-teal-800">Innovation & Technology Support</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-teal-50 p-3 rounded-lg">
                            <span className="font-semibold">Focus:</span>
                            <span className="text-teal-700 font-bold">Tech & Innovation</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Women-led tech startups and scale-ups</p>
                            <p>• Innovation funding and grant programs</p>
                            <p>• Commercialization support services</p>
                            <p>• Acceleration and incubation programs</p>
                            <p>• Technology sector connections</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Innovate BC Benefits</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Funding:</strong> Tech innovation grants and loans</p>
                          <p><strong>Mentorship:</strong> Industry expert connections</p>
                          <p><strong>Acceleration:</strong> Program support for scale-ups</p>
                          <p><strong>Networks:</strong> BC tech ecosystem access</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Indigenous Women Entrepreneurship */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Indigenous Women Entrepreneurship Fund (IWEF)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-orange-800">Indigenous Women Business Support</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                            <span className="font-semibold">Grant Type:</span>
                            <span className="text-orange-700 font-bold">Annual Funding</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Annual grant program for Indigenous women-owned businesses (51%+ ownership) 
                            in BC facing systemic barriers in accessing lending opportunities, providing 
                            development resources and networking through CCIB's Tools for Indigenous Business program.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">IWEF Eligibility</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Ownership:</strong> 51%+ Indigenous women-owned</p>
                          <p><strong>Registration:</strong> For-profit business in Canada/BC</p>
                          <p><strong>Identity:</strong> First Nations, Métis, or Inuit women</p>
                          <p><strong>Barriers:</strong> Systemic lending access challenges</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tech Women Leadership */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Women in Technology Leadership Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">Tech Leadership Development</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Sector:</span>
                            <span className="text-purple-700 font-bold">Technology</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Comprehensive programs supporting women in BC's technology sector through 
                            leadership development, mentorship, funding access, networking, and career 
                            advancement initiatives in software, AI, clean tech, and digital innovation.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Tech Programs</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>BC Tech:</strong> Women in tech ecosystem programs</p>
                          <p><strong>Accelerators:</strong> Vancouver tech accelerator access</p>
                          <p><strong>Mentorship:</strong> Senior tech leader connections</p>
                          <p><strong>Funding:</strong> Tech-specific grant opportunities</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* BC Regional Programs */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">BC Regional Women Business Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Regional Support Services</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Coverage:</span>
                            <span className="text-blue-700 font-bold">Province-Wide</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Regional women business organizations across BC providing localized support, 
                            networking, training, and funding guidance tailored to community needs in Vancouver, 
                            Victoria, Kelowna, and other BC regions.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Regional Resources</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Vancouver:</strong> Metro women business networks</p>
                          <p><strong>Victoria:</strong> Capital region entrepreneur support</p>
                          <p><strong>Interior:</strong> Kelowna and regional programs</p>
                          <p><strong>Rural:</strong> Small community business support</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* WELF BC Access */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">Women Entrepreneurship Loan Fund (WELF) BC Access</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-pink-800">National Program BC Delivery</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-pink-50 p-3 rounded-lg">
                            <span className="font-semibold">Loan Amount:</span>
                            <span className="text-pink-700 font-bold">Up to $50,000</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Access to federal WELF microloans up to $50,000 through WEOC network 
                            delivered by WeBC in British Columbia with business advisory, training, 
                            and comprehensive women entrepreneur support services.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">WELF BC Benefits</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Microloans:</strong> Up to $50K for women businesses</p>
                          <p><strong>Flexible Terms:</strong> Customized repayment schedules</p>
                          <p><strong>Advisory:</strong> Business coaching and mentorship</p>
                          <p><strong>National Network:</strong> WEOC resources and connections</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">BC Women Business Support Success Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices for BC Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>WeBC First Contact:</strong> Start with WeBC for loans, advisory, and program navigation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Innovation Focus:</strong> Leverage Innovate BC if in tech or innovation sector
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Indigenous Resources:</strong> Access IWEF if Indigenous women entrepreneur
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Regional Networks:</strong> Connect with local BC women business organizations
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common BC Application Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Pre-Market Applications:</strong> Applying before business is market-ready
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Insufficient Equity:</strong> Not meeting 25% equity contribution requirement
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Wrong Program:</strong> Applying to programs not matching business stage
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No BC Registration:</strong> Business not registered or located in British Columbia
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
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access BC Women Business Support?
              </h2>
              <p className="text-xl text-emerald-100 mb-8">
                Get our complete BC women business support guide with program comparison and application templates, 
                or work with our BC funding specialists for expert application support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free BC Support Guide</h4>
                  <p className="text-emerald-100 text-sm mb-4">
                    Get our comprehensive BC women business support guide with WeBC loan templates, 
                    Innovate BC insights, and indigenous program information.
                  </p>
                  <Button size="lg" className="w-full bg-white text-emerald-700 hover:bg-gray-100" asChild>
                    <Link href="/download/bc-women-business-grants-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get BC Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert BC Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with BC funding specialists who understand provincial programs and can help 
                    optimize your applications for WeBC and innovation funding success.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=bc-women-business-grants-help">
                      Get BC Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-emerald-200 text-sm mt-6">
                Expert guidance • Provincial programs • Innovation support • BC women entrepreneur success
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
