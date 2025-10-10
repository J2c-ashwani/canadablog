import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, Heart, Sparkles, Zap, Rocket, Calendar } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Amber Grant for Women Canada 2025 | Monthly $10K Grants + $25K Annual Award",
  description: "Complete guide to Amber Grant for Women with monthly $10,000 grants and $25,000 year-end award. Simple application, rolling deadlines, and support for Canadian women entrepreneurs.",
  keywords: "Amber Grant Canada, women business grants monthly, WomensNet grants, $10000 women grants, Canadian women entrepreneurs",
  openGraph: {
    title: "Amber Grant for Women Canada 2025 | Monthly $10K + $25K Annual",
    description: "Monthly $10,000 grants and $25,000 annual award for Canadian women entrepreneurs. Simple application with rolling monthly deadlines.",
    url: "https://grantfinder.pro/blog/amber-grant-women-canada",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function AmberGrantWomenCanadaGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-500 to-orange-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏆 Monthly Grant Awards 2025
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Amber Grant for Women Canada
              </h1>
              <p className="text-xl text-amber-100 mb-8">
                Monthly $10,000 grants awarded to three women-owned businesses every month, with one 
                annual $25,000 year-end grand prize. Simple application process with rolling monthly 
                deadlines for Canadian and American women entrepreneurs across all industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-amber-700 hover:bg-gray-100" asChild>
                  <Link href="#grant-details">
                    View Grant Details
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/amber-grant-women-application-guide">
                    Get Application Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2025 Program Updates */}
        <section className="py-8 bg-green-50 border-b-2 border-green-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-green-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 2025 Amber Grant Program Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>Monthly Awards:</strong> Three $10,000 grants awarded every month
                        </div>
                        <div>
                          <strong>Annual Grand Prize:</strong> One $25,000 year-end award to monthly winners
                        </div>
                        <div>
                          <strong>Rolling Deadlines:</strong> Applications accepted monthly with quick turnaround
                        </div>
                        <div>
                          <strong>Simple Process:</strong> Short application with $15 fee, results by 23rd of following month
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Grant Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Honoring Women Entrepreneurs Since 1998</h2>
                <p className="text-lg text-gray-600">
                  Founded by WomensNet in 1998 to honor Amber Wigdahl, who died at 19 before realizing 
                  her business dreams, the Amber Grant has awarded over $10 million to women entrepreneurs 
                  in the United States and Canada. With monthly $10,000 grants and a $25,000 annual award, 
                  this accessible grant program supports women at all business stages.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">$10K</div>
                  <div className="text-gray-600">Monthly Grants</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$25K</div>
                  <div className="text-gray-600">Annual Award</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
                  <div className="text-gray-600">Winners/Month</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Monthly</div>
                  <div className="text-gray-600">Rolling Deadlines</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grant Programs */}
        <section id="grant-details" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Amber Grant Award Programs</h2>
              
              <div className="space-y-8">
                {/* Monthly Amber Grant */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-amber-600 mr-3" />
                      <CardTitle className="text-amber-700">Monthly Amber Grant</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-amber-800">General Business Grant</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-amber-50 p-3 rounded-lg">
                            <span className="font-semibold">Grant Amount:</span>
                            <span className="text-amber-700 font-bold">$10,000</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Awarded monthly to one general women-owned business</p>
                            <p>• All industries and business stages eligible</p>
                            <p>• Automatic entry to $25,000 year-end award</p>
                            <p>• Winners announced by 23rd of following month</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Eligibility Requirements</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Ownership:</strong> 50%+ women-owned business</p>
                          <p><strong>Location:</strong> United States or Canada</p>
                          <p><strong>Age:</strong> 18+ years old</p>
                          <p><strong>Business Stage:</strong> Any stage including pre-launch ideas</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 Application Details:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Application Fee:</strong> $15 (one-time for all grants)</li>
                            <li>• <strong>Process:</strong> Simple short essay about business</li>
                            <li>• <strong>Deadline:</strong> Rolling monthly submissions</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Announcement:</strong> By 23rd of following month</li>
                            <li>• <strong>Eligibility:</strong> Automatic for all related grants</li>
                            <li>• <strong>Industry:</strong> No industry restrictions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Startup Grant */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Monthly Startup Grant</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Idea-Stage Business Grant</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Grant Amount:</span>
                            <span className="text-green-700 font-bold">$10,000</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Monthly award for businesses in idea/startup stage</p>
                            <p>• Pre-launch and early-stage businesses eligible</p>
                            <p>• No revenue requirement</p>
                            <p>• Same application process as Monthly Amber Grant</p>
                            <p>• Automatic year-end award eligibility</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Startup Grant Focus</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Target:</strong> Businesses in planning or early launch phase</p>
                          <p><strong>Purpose:</strong> Help turn ideas into reality</p>
                          <p><strong>Stage:</strong> Pre-revenue or minimal revenue</p>
                          <p><strong>Application:</strong> One submission covers all grant types</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Category Grant */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Target className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Monthly Business Category Grant</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Rotating Industry Focus</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Grant Amount:</span>
                            <span className="text-blue-700 font-bold">$10,000</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Monthly award focused on a specific business category that rotates each month. 
                            Categories include retail, service-based, e-commerce, health/wellness, technology, 
                            creative industries, and more based on WomensNet's monthly selection.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Category Examples</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Retail:</strong> Product-based businesses and stores</p>
                          <p><strong>Service:</strong> Professional and personal services</p>
                          <p><strong>E-commerce:</strong> Online retail and digital products</p>
                          <p><strong>Creative:</strong> Arts, design, and creative ventures</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Year-End Amber Grant */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">$25,000 Year-End Amber Grant</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-orange-800">Annual Grand Prize</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                            <span className="font-semibold">Grant Amount:</span>
                            <span className="text-orange-700 font-bold">$25,000</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• One annual award selected from monthly winners</p>
                            <p>• Three $25,000 grants awarded each year</p>
                            <p>• Automatic entry for all monthly grant recipients</p>
                            <p>• No additional application required</p>
                            <p>• Selected at end of calendar year</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Year-End Selection</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Pool:</strong> All monthly grant winners from the year</p>
                          <p><strong>Awards:</strong> Three separate $25K grants annually</p>
                          <p><strong>Timing:</strong> Announced at year-end</p>
                          <p><strong>Total Value:</strong> $35,000 potential for monthly winners</p>
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Amber Grant Application Process</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Visit Application Page",
                      description: "Go to WomensNet Amber Grant application portal",
                      icon: <Target className="w-6 h-6" />,
                      color: "amber"
                    },
                    {
                      step: "2", 
                      title: "Complete Short Essay",
                      description: "Write brief essay about yourself and business dream",
                      icon: <FileText className="w-6 h-6" />,
                      color: "green"
                    },
                    {
                      step: "3",
                      title: "Pay $15 Fee",
                      description: "One-time application fee for all grant eligibility",
                      icon: <DollarSign className="w-6 h-6" />,
                      color: "blue"
                    },
                    {
                      step: "4",
                      title: "Wait for Results",
                      description: "Winners announced by 23rd of following month",
                      icon: <Calendar className="w-6 h-6" />,
                      color: "orange"
                    }
                  ].map((item, index) => {
                    const colors = {
                      amber: "bg-amber-500 text-white",
                      green: "bg-green-500 text-white", 
                      blue: "bg-blue-500 text-white",
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

                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-6 h-6 text-amber-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold text-amber-800 mb-2">📅 Application Timeline</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Submissions:</strong> Rolling monthly basis</li>
                              <li>• <strong>Review Period:</strong> Following month</li>
                              <li>• <strong>Announcement:</strong> By 23rd of next month</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Application Fee:</strong> $15 one-time payment</li>
                              <li>• <strong>Grant Types:</strong> Automatically considered for all</li>
                              <li>• <strong>Year-End:</strong> Monthly winners auto-entered</li>
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

        {/* Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Amber Grant Success Stories</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Notable Winners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Krista Woods - GloveStix:</strong> Year-end Amber Grant winner who appeared on ABC's Shark Tank
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Maia Josebachvili - Urban Escapes:</strong> Company acquired by LivingSocial after grant award
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>$10M+ Awarded:</strong> Over 22 years supporting women entrepreneurs
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Grant Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Award className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Business Growth:</strong> Recipients use funds for equipment, marketing, inventory, and expansion
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Award className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Dream Realization:</strong> Helps women turn business ideas into reality
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Award className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Restrictions:</strong> Winners free to use grants for any business needs
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Application Success Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Winning Application Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Clear Vision:</strong> Articulate your business dream and passion clearly
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Personal Story:</strong> Share why you started and what drives you
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Grant Use:</strong> Explain specifically how $10,000 would help your business
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Authenticity:</strong> Be genuine and passionate in your essay
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
                          <strong>Generic Responses:</strong> Using template answers without personalization
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Vague Plans:</strong> Not explaining specific use of grant funds
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Too Long:</strong> Exceeding word limits or being overly verbose
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Passion:</strong> Failing to convey enthusiasm for your business
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
        <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Apply for the Amber Grant?
              </h2>
              <p className="text-xl text-amber-100 mb-8">
                Get our complete Amber Grant application guide with essay templates and winning strategies, 
                or work with our grant specialists for expert application support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free Application Guide</h4>
                  <p className="text-amber-100 text-sm mb-4">
                    Get our comprehensive Amber Grant application guide with essay templates, 
                    success strategies, and monthly deadline tracking.
                  </p>
                  <Button size="lg" className="w-full bg-white text-amber-700 hover:bg-gray-100" asChild>
                    <Link href="/download/amber-grant-women-application-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Application Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with grant specialists who understand Amber Grant requirements and can help 
                    optimize your application for maximum success.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=amber-grant-application-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-amber-200 text-sm mt-6">
                Expert guidance • Essay review • Application optimization • Monthly deadline tracking
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
