import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket, Calendar, Globe } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cartier Women's Initiative Canada 2026-2027 | $100K Awards + Coaching for Impact Entrepreneurs",
  description: "Complete guide to Cartier Women's Initiative with $100,000 grants, INSEAD coaching, mentorship, and global networking for Canadian women impact entrepreneurs. Apply by June 24, 2026.",
  keywords: "Cartier Women's Initiative Canada, women impact entrepreneurs, social enterprise grants, UN SDG funding, women environmental business",
  openGraph: {
    title: "Cartier Women's Initiative 2026-2027 | $100K for Impact Entrepreneurs",
    description: "International program supporting Canadian women founders with $100K grants, executive coaching, and year-long fellowship for impact-driven businesses.",
    url: "https://www.fsidigital.ca/blog/cartier-womens-initiative-canada",
    images: ["/og-image.jpg"],
  },
}

export default function CartierWomensInitiativeCanadaGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌍 Global Impact Awards 2026-2027
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Cartier Women's Initiative Canada
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                International entrepreneurship program supporting Canadian women founders of impact-driven
                businesses with up to $100,000 in grant funding, executive coaching from INSEAD, year-long
                fellowship, and global networking. Open to for-profit businesses addressing UN Sustainable
                Development Goals. Application deadline: June 24, 2026.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="#award-details">
                    View Award Details
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/cartier-womens-initiative-application-guide">
                    Get Application Guide
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
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 Cartier Women's Initiative 2026-2027 Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>Application Deadline:</strong> June 24, 2026 at 2:00 PM CEST
                        </div>
                        <div>
                          <strong>Awards:</strong> $100K (1st), $60K (2nd), $30K (3rd) + coaching
                        </div>
                        <div>
                          <strong>Fellowship:</strong> 12-month program with INSEAD education
                        </div>
                        <div>
                          <strong>Global Network:</strong> North America region + 8 other regions
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Empowering Women Impact Entrepreneurs Since 2006</h2>
                <p className="text-lg text-gray-600">
                  The Cartier Women's Initiative is an annual international entrepreneurship program founded by
                  Cartier in 2006 to drive change by empowering women impact entrepreneurs. Open to women-run and
                  women-owned businesses from any country addressing social and environmental challenges aligned
                  with the United Nations Sustainable Development Goals. Canadian entrepreneurs compete in the
                  North America region alongside United States applicants.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$100K</div>
                  <div className="text-gray-600">1st Place Award</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">12 Months</div>
                  <div className="text-gray-600">Fellowship Program</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">9 Regions</div>
                  <div className="text-gray-600">Global Coverage</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">UN SDGs</div>
                  <div className="text-gray-600">Impact Focus</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Award Categories */}
        <section id="award-details" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Cartier Women's Initiative Award Programs</h2>

              <div className="space-y-8">
                {/* Regional Awards - North America */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Globe className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Regional Awards - North America</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">Award Structure</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">1st Place:</span>
                            <span className="text-purple-700 font-bold">$100,000</span>
                          </div>
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">2nd Place:</span>
                            <span className="text-purple-700 font-bold">$60,000</span>
                          </div>
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">3rd Place:</span>
                            <span className="text-purple-700 font-bold">$30,000</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Fellowship Benefits</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Coaching:</strong> Tailored mentoring and executive coaching</p>
                          <p><strong>Education:</strong> INSEAD business school courses</p>
                          <p><strong>Visibility:</strong> Global media exposure and recognition</p>
                          <p><strong>Network:</strong> Global fellows community connections</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 North America Region Details:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Coverage:</strong> Canada, United States, Mexico</li>
                            <li>• <strong>Duration:</strong> January-December 2027 fellowship</li>
                            <li>• <strong>In-Person:</strong> 1 week event April/May 2027</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Time Commitment:</strong> 1-3 hours/week</li>
                            <li>• <strong>Impact Reporting:</strong> 3 years post-fellowship</li>
                            <li>• <strong>Filming:</strong> On-site business documentation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Science & Technology Pioneer Award */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Science & Technology Pioneer Award</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Deep Tech Ventures</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Award Amount:</span>
                            <span className="text-blue-700 font-bold">$100K/$60K/$30K</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Deep tech businesses based on pioneering technology</p>
                            <p>• Complex engineering processes or scientific discoveries</p>
                            <p>• Not just disruptive business models</p>
                            <p>• Same fellowship benefits as Regional Awards</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Ideal Candidates</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Technology:</strong> Pioneering new technology development</p>
                          <p><strong>Scientific:</strong> Based on scientific discoveries</p>
                          <p><strong>Engineering:</strong> Complex engineering innovations</p>
                          <p><strong>Impact:</strong> Addresses UN SDGs through deep tech</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Requirements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Eligibility Requirements for Canadian Entrepreneurs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Business Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Positive Impact:</strong> Demonstrates realized positive impact with potential to scale, contributes to UN Sustainable Development Goals
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>For-Profit:</strong> Must generate revenue to support operations and return profit (non-profits not eligible)
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Early-Stage:</strong> Proven business model, 1-6 years of licensed/registered operations (June 2020-June 2026 for 2027 edition)
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Revenue Generating:</strong> Validated product/market fit in target segment, generating revenue (not required to be profitable yet)
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Applicant Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Legal Age:</strong> Must be 18+ years old by June 24, 2026 application deadline
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>English Proficiency:</strong> B2 level required (Common European Framework) - complex text comprehension and fluent interaction
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Time Commitment:</strong> January-December 2027 fellowship, 1-3 hours/week + 1 week in-person event
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Women-Owned/Led:</strong> Business must be women-owned and women-led
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Application Process & Timeline</h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Register Online",
                      description: "Create account on application platform and start form",
                      icon: <Target className="w-6 h-6" />,
                      color: "purple"
                    },
                    {
                      step: "2",
                      title: "Complete Application",
                      description: "Submit detailed business and impact information in English",
                      icon: <FileText className="w-6 h-6" />,
                      color: "blue"
                    },
                    {
                      step: "3",
                      title: "Submit by Deadline",
                      description: "June 24, 2026 at 2:00 PM CEST (400MB/file, 800MB total)",
                      icon: <Calendar className="w-6 h-6" />,
                      color: "green"
                    },
                    {
                      step: "4",
                      title: "Await Results",
                      description: "Notification by December 2026, fellowship starts January 2027",
                      icon: <Award className="w-6 h-6" />,
                      color: "orange"
                    }
                  ].map((item, index) => {
                    const colors = {
                      purple: "bg-purple-500 text-white",
                      blue: "bg-blue-500 text-white",
                      green: "bg-green-500 text-white",
                      orange: "bg-orange-500 text-white"
                    }

                    return (
                      <Card key={index} className="text-center">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-full ${colors[item.color as keyof typeof colors]} flex items-center justify-center mx-auto mb-3`}>
                            {item.icon}
                          </div>
                          <CardTitle className="text-lg">Step {item.step}: {item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold text-purple-800 mb-2">📅 Key Application Details</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Platform:</strong> Online applications only (no mail/email)</li>
                              <li>• <strong>Language:</strong> English only, B2 proficiency required</li>
                              <li>• <strong>One Application:</strong> One business, one award category only</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Prior Applicants:</strong> Can reapply if not selected previously</li>
                              <li>• <strong>Former Fellows:</strong> Ineligible for future applications</li>
                              <li>• <strong>Auto-Save:</strong> Use "Save Draft" feature regularly</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* UN SDGs Focus */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">UN Sustainable Development Goals Impact</h2>

              <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
                <h3 className="text-xl font-bold text-green-800 mb-4">17 UN Sustainable Development Goals</h3>
                <p className="text-gray-700 mb-4">
                  All applicants must demonstrate how their business contributes to at least one of the 17 United Nations
                  Sustainable Development Goals - a universal call to tackle social, economic, and environmental challenges by 2030.
                </p>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Improving Lives:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• No Poverty</li>
                      <li>• Zero Hunger</li>
                      <li>• Good Health & Well-Being</li>
                      <li>• Quality Education</li>
                      <li>• Gender Equality</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Preserving the Planet:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Clean Water & Sanitation</li>
                      <li>• Affordable & Clean Energy</li>
                      <li>• Climate Action</li>
                      <li>• Life Below Water</li>
                      <li>• Life on Land</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Creating Opportunities:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Decent Work & Economic Growth</li>
                      <li>• Industry, Innovation & Infrastructure</li>
                      <li>• Reduced Inequalities</li>
                      <li>• Sustainable Cities & Communities</li>
                      <li>• Responsible Consumption</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Application Success Strategies</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Winning Application Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Clear Impact:</strong> Demonstrate measurable social/environmental impact aligned with specific UN SDGs
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Proven Model:</strong> Show validated product/market fit and revenue generation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Scale Potential:</strong> Articulate realistic path to scaling impact and business
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Use Worksheet:</strong> Draft answers externally before copying to application form
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common Application Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Vague Impact:</strong> Not clearly connecting business to specific UN SDGs
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Wrong Stage:</strong> Applying before validated business model or too late (over 6 years)
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Non-Profit Status:</strong> Applying with non-profit instead of for-profit structure
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Multiple Submissions:</strong> Submitting multiple applications or to multiple categories
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
        <section className="py-20 bg-gradient-to-r from-purple-800 to-indigo-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Apply for Cartier Women's Initiative?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Get our complete application guide with UN SDG alignment tools and impact articulation frameworks,
                or work with our impact entrepreneurship specialists for expert application support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free Application Guide</h4>
                  <p className="text-purple-100 text-sm mb-4">
                    Get our comprehensive Cartier Women's Initiative application guide with category selection,
                    UN SDG frameworks, and impact demonstration templates.
                  </p>
                  <Button size="lg" className="w-full bg-white text-purple-700 hover:bg-gray-100" asChild>
                    <Link href="/download/cartier-womens-initiative-application-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Application Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with impact entrepreneurship specialists who understand Cartier criteria and can help
                    optimize your application for UN SDG alignment and impact articulation.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=cartier-womens-initiative-application-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-purple-200 text-sm mt-6">
                Expert guidance • Impact frameworks • UN SDG alignment • Global recognition success
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
