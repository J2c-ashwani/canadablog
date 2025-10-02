import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Lightbulb, Zap, Code } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Industrial Research Assistance Program (IRAP) 2025 | Up to $1M Tech Grants",
  description: "Complete guide to IRAP funding for Canadian tech SMEs. Learn eligibility, application process, and get up to $1M in non-repayable R&D grants.",
  keywords: "IRAP, Industrial Research Assistance Program, Canada tech grants, R&D funding Canada, NRC IRAP, innovation grants",
  openGraph: {
    title: "Industrial Research Assistance Program (IRAP) 2025 | Up to $1M Tech Grants",
    description: "Complete guide to IRAP - non-repayable R&D grants up to $1M for Canadian tech businesses.",
    url: "https://grantfinder.pro/blog/irap-industrial-research-assistance-program",
  },
}

export default function IRAPBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🔬 IRAP Complete Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Industrial Research Assistance Program (IRAP)
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Everything you need to know about securing non-repayable R&D grants up to $1M 
                for your Canadian tech business through the National Research Council's IRAP program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=irap">
                    Check IRAP Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/small-business-grants">
                    Back to Canadian SME Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$1M</div>
                  <div className="text-gray-600">Maximum Grant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">67%</div>
                  <div className="text-gray-600">Project Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$300M+</div>
                  <div className="text-gray-600">Annual Budget</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">89%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is IRAP?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Industrial Research Assistance Program (IRAP) is Canada's largest technology assistance 
                  program for small and medium-sized enterprises. Delivered by the National Research Council of 
                  Canada (NRC), IRAP provides funding and advisory services to help innovative Canadian businesses 
                  accelerate technology development and commercialization.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">Program Benefits</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Non-repayable contributions up to 67%</li>
                      <li>• Technical and business advisory services</li>
                      <li>• Access to NRC expertise and facilities</li>
                      <li>• Youth employment funding</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Eligible Activities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Research and development projects</li>
                      <li>• Technology development and validation</li>
                      <li>• Product commercialization</li>
                      <li>• Process innovation and improvement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IRAP Funding Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">IRAP Funding Categories</h2>
              
              <div className="space-y-8">
                {/* Research & Development */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Research & Development Projects</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $1M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Up to 67%</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Funding for innovative R&D projects that advance technology and create competitive advantages.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Projects:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• New product development</li>
                          <li>• Process innovation</li>
                          <li>• Technology adaptation</li>
                          <li>• Prototype development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Covered Costs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Salaries and wages</li>
                          <li>• Contract research</li>
                          <li>• Materials and supplies</li>
                          <li>• Equipment (limited)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Youth Employment */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Youth Employment Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $80K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>75% Salary</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Recent Grads</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Wage subsidies to hire recent STEM graduates for innovation projects and technology development.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Candidates:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Recent STEM graduates (within 3 years)</li>
                          <li>• Post-secondary education completed</li>
                          <li>• Canadian citizens or permanent residents</li>
                          <li>• Age 15-30 years old</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 75% salary coverage</li>
                          <li>• Maximum $40K per year</li>
                          <li>• 12-24 month placements</li>
                          <li>• Skills development focus</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Advisory */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Code className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Technical Advisory Services</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>No Cost</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Ongoing</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Expert Access</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Free access to NRC's network of technology experts and business advisors.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Technical Support:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Technology roadmapping</li>
                          <li>• Technical problem solving</li>
                          <li>• Research collaboration</li>
                          <li>• Lab facility access</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Business Advisory:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Commercialization strategy</li>
                          <li>• Market intelligence</li>
                          <li>• IP strategy development</li>
                          <li>• Partnership facilitation</li>
                        </ul>
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">IRAP Eligibility Requirements</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Eligible Companies:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Small to Medium Enterprise:</strong> 500 employees or fewer</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Canadian Incorporation:</strong> Incorporated in Canada</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>For-Profit:</strong> Commercially oriented business</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Innovation Focus:</strong> Technology development mandate</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Ineligible Organizations:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Large Corporations:</strong> Over 500 employees</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Non-Profits:</strong> Not commercially oriented</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Universities:</strong> Academic institutions</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Government Entities:</strong> Public sector organizations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">IRAP Application Process</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Initial Consultation</h4>
                    <p className="text-gray-600">Contact your local IRAP Industrial Technology Advisor (ITA) to discuss your project and eligibility.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Project Development</h4>
                    <p className="text-gray-600">Work with your ITA to develop project scope, timeline, budget, and technical approach.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Proposal Submission</h4>
                    <p className="text-gray-600">Submit detailed project proposal including technical plan, budget, milestones, and commercialization strategy.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Technical Review</h4>
                    <p className="text-gray-600">NRC experts evaluate technical merit, feasibility, and commercial potential. Review typically takes 4-6 weeks.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Project Execution</h4>
                    <p className="text-gray-600">Upon approval, begin project execution with ongoing ITA support and quarterly milestone reviews.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">IRAP Success Tips</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Increase Your Success Rate:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Clear Innovation:</strong> Demonstrate significant technological advancement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Market Validation:</strong> Show clear market demand and commercial potential</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Technical Team:</strong> Demonstrate R&D capability and experience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Early Engagement:</strong> Contact ITA early in project planning</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes to Avoid:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Weak Technical Merit:</strong> Incremental rather than innovative R&D</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Poor Commercialization:</strong> No clear path to market</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Unrealistic Timelines:</strong> Overly ambitious project schedules</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Late Application:</strong> Applying after project has started</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 CTAs Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Apply for IRAP Funding?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Get the detailed application guide or work with our experts to maximize 
                your IRAP approval chances and secure the R&D funding you need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Get Application Guide CTA */}
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Approach</h4>
                  <p className="text-green-100 text-sm mb-4">
                    Get our comprehensive step-by-step IRAP application guide with templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-irap-grants">
                      <Download className="w-4 h-4 mr-2" />
                      Get Application Guide
                    </Link>
                  </Button>
                </div>

                {/* Get Expert Help CTA */}
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Assistance</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with IRAP specialists who have secured $25M+ in R&D funding for Canadian tech companies.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=irap-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-green-200 text-sm mt-6">
                89% approval rate with expert help vs 52% DIY • Average funding secured: $320K
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
