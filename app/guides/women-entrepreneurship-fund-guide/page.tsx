import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Shield, Rocket, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for Women Entrepreneurship Fund 2025 | WEF Grant Application Guide",
  description: "Step-by-step guide to applying for WEF non-repayable grants. Learn eligibility, funding categories, and winning strategies for women business expansion funding.",
  keywords: "WEF application guide, Women Entrepreneurship Fund application, women business grant guide, non-repayable grant application",
}

export default function WomenEntrepreneurshipFundApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🚀 WEF Grant Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for Women Entrepreneurship Fund
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Complete step-by-step guide to applying for WEF non-repayable grants for women-owned business 
                expansion, innovation, and growth. Learn funding categories, eligibility, and winning application strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">Non-Repayable</div>
                  <div className="text-gray-600">True Grant Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">Growth</div>
                  <div className="text-gray-600">Early & Scaling Stage</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Rolling</div>
                  <div className="text-gray-600">Year-Round Applications</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">51%+</div>
                  <div className="text-gray-600">Women Ownership</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Application Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WEF Grant Application Process</h2>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Rocket className="w-8 h-8 text-purple-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-purple-800 mb-2">Growth-Stage Business Focus</h4>
                      <p className="text-purple-700">
                        WEF provides non-repayable grant funding for women-owned businesses ready to scale. 
                        Unlike loans, these grants don't require repayment and support expansion, innovation, 
                        equipment, marketing, R&D, and hiring initiatives with measurable economic impact.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Business Assessment</h4>
                      <p className="text-sm text-gray-600">
                        Evaluate growth readiness and expansion strategy
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Develop Grant Proposal</h4>
                      <p className="text-sm text-gray-600">
                        Create comprehensive business case with projections
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit Application</h4>
                      <p className="text-sm text-gray-600">
                        Apply through ISED with complete documentation
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Receive Grant Funding</h4>
                      <p className="text-sm text-gray-600">
                        Approval and non-repayable grant disbursement
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WEF Grant Eligibility Requirements</h2>
                
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Business Owner & Grant Eligibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Type:</strong> Non-Repayable</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Stage:</strong> Growth Focus</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Ownership:</strong> 51%+ women</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Business Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Women-owned business (51%+ ownership)</li>
                          <li>• Canadian incorporated for-profit company</li>
                          <li>• Established operations with revenue history</li>
                          <li>• Demonstrated growth potential and scalability</li>
                          <li>• Strong financial position and stability</li>
                          <li>• Clear competitive advantages</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Priority Business Stages:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Early-stage with market traction</li>
                          <li>• Growth-stage ready to scale</li>
                          <li>• Revenue-generating enterprises</li>
                          <li>• Job creation potential</li>
                          <li>• Innovation-focused models</li>
                          <li>• Export-ready businesses</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* WEF Funding Categories */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">WEF Grant Funding Categories</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Business Expansion",
                      icon: <Rocket className="w-6 h-6 text-purple-600" />,
                      color: "purple",
                      description: "Operational growth, new locations, facility expansion, capacity increases",
                      examples: ["New location openings", "Production scaling", "Market expansion", "Job creation initiatives"]
                    },
                    {
                      title: "Innovation & R&D",
                      icon: <Lightbulb className="w-6 h-6 text-blue-600" />,
                      color: "blue",
                      description: "Product development, innovation initiatives, research activities, IP development",
                      examples: ["New product launches", "Technology integration", "R&D projects", "Process innovation"]
                    },
                    {
                      title: "Equipment & Technology",
                      icon: <Zap className="w-6 h-6 text-green-600" />,
                      color: "green",
                      description: "Capital equipment, machinery, technology systems, automation tools",
                      examples: ["Manufacturing equipment", "Software systems", "Automation tools", "Digital infrastructure"]
                    },
                    {
                      title: "Marketing & Market Access",
                      icon: <Target className="w-6 h-6 text-orange-600" />,
                      color: "orange",
                      description: "Marketing campaigns, brand development, new market entry, export development",
                      examples: ["Digital marketing", "Brand building", "Market research", "Export strategies"]
                    },
                    {
                      title: "Staff Hiring & Training",
                      icon: <Users className="w-6 h-6 text-pink-600" />,
                      color: "pink",
                      description: "Strategic hiring, employee training, leadership development, team building",
                      examples: ["Recruitment costs", "Training programs", "Leadership development", "Team expansion"]
                    }
                  ].map((category, index) => (
                    <Card key={index} className={`border-${category.color}-200`}>
                      <CardHeader>
                        <CardTitle className={`text-${category.color}-700 flex items-center`}>
                          {category.icon}
                          <span className="ml-2">{category.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{category.description}</p>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                          {category.examples.map((example, i) => (
                            <div key={i} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span>{example}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">WEF Grant Application Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Winning Strategies</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Strong growth story with data-backed market opportunity and scalability</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Clear economic impact demonstration with job creation and GDP contribution</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Innovation focus showing competitive advantages and market differentiation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Comprehensive financials with realistic projections and milestone tracking</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Pitfalls</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Weak expansion strategy without sufficient market validation or research</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Incomplete financial documentation or unrealistic revenue projections</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Limited economic impact or job creation demonstration</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Applying too early before sufficient operational history</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official WEF Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">WEF Program Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">ISED WEF Program</h5>
                          <p className="text-sm text-gray-600">Official Women Entrepreneurship Fund website</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://ised-isde.canada.ca/site/ised/en/programs-and-initiatives/women-entrepreneurship-strategy" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Women Entrepreneurship Strategy</h5>
                          <p className="text-sm text-gray-600">Complete WES ecosystem overview</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://ised-isde.canada.ca/site/ised/en/programs-and-initiatives/women-entrepreneurship-strategy" target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Professional Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">WEF Assessment</h5>
                          <p className="text-sm text-gray-600">Free grant eligibility review and strategy</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=wef-assessment">
                            Get Assessment <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Grant Writing Support</h5>
                          <p className="text-sm text-gray-600">Professional WEF application development</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=wef-women-entrepreneur-expert-help">
                            Get Support <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Lead Magnet CTA */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-800 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-purple-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free WEF Application Kit</h3>
                <p className="text-purple-100 mb-6 text-lg">
                  Download our comprehensive WEF grant application guide with funding category breakdown, 
                  business case templates, and successful grant application examples.
                </p>
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=wef-women-entrepreneur-expert-help">
                    <Download className="w-5 h-5 mr-2" />
                    Request Application Guide
                  </Link>
                </Button>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-green-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for WEF Grant Funding?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Our women entrepreneur grant specialists understand WEF requirements and can help develop 
                  your expansion strategy, prepare compelling applications, and maximize approval chances.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 font-semibold shadow-lg" asChild>
                    <Link href="/contact?service=wef-women-entrepreneur-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-green-700 text-white hover:bg-green-800 font-semibold shadow-lg border-2 border-white" asChild>
                    <Link href="/contact?service=wef-assessment">
                      Free WEF Assessment
                    </Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
