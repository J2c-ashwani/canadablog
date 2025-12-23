import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Software & SaaS Startup Grants 2026-2027 | $305K NSF SBIR, $1.25M Phase II, DOD Software Modernization Non-Dilutive Funding",
  description: "Complete 2026-2027 guide to software and SaaS startup grants. NSF SBIR Phase I $305,000, Phase II $1.25M, Fast-Track $1.555M non-dilutive funding for enterprise software, cloud platforms, developer tools, AI/ML, cybersecurity, software automation supporting zero equity retention commercialization.",
  keywords: "software startup grants 2026, SaaS startup grants NSF SBIR, enterprise software grants $305K, cloud platform funding non-dilutive, developer tools grants Phase II, NSF SBIR software innovation $1.25M, DOD software modernization grants, AI ML software grants, cybersecurity software funding, software automation grants zero equity",
  openGraph: {
    title: "Software & SaaS Grants 2026 | $305K NSF SBIR, $1.25M Phase II Non-Dilutive",
    description: "Complete guide to software and SaaS startup grants from NSF SBIR, DOD, state programs.",
    url: "https://www.fsidigital.ca/blog/software-saas-startup-grants",
    images: ["/og-image.jpg"],
  },
}

export default function SoftwareSaaSStartupGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* REDESIGNED Hero Section - Clean & Focused */}
        <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  💻 Software & SaaS Grants 2026-2027
                </Badge>
              </div>

              {/* Main Headline - Concise & Clear */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight">
                Get Up to $1.555M in<br />Non-Dilutive Software Funding
              </h1>

              {/* Subheadline - Benefit-Focused */}
              <p className="text-xl md:text-2xl text-indigo-100 mb-8 text-center max-w-3xl mx-auto font-light">
                NSF SBIR grants for software & SaaS startups. Zero equity required. Keep 100% ownership while scaling your enterprise software, cloud platforms, or AI/ML solutions.
              </p>

              {/* Key Stats - Quick Visual Scan */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-10">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">$305K</div>
                  <div className="text-sm md:text-base text-indigo-200">Phase I Grants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">$1.25M</div>
                  <div className="text-sm md:text-base text-indigo-200">Phase II Grants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">0%</div>
                  <div className="text-sm md:text-base text-indigo-200">Equity Required</div>
                </div>
              </div>

              {/* Clear CTAs - Primary & Secondary */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-8 py-6 text-lg w-full sm:w-auto shadow-xl" asChild>
                  <Link href="#software-grants">
                    View Grant Programs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg w-full sm:w-auto" asChild>
                  <Link href="/download/software-saas-grants-guide">
                    <Download className="mr-2 w-5 h-5" />
                    Free Application Guide
                  </Link>
                </Button>
              </div>

              {/* Trust Indicator */}
              <p className="text-center text-indigo-200 mt-8 text-sm">
                ✓ Used by 500+ software startups • ✓ 40% success rate in healthcare tech • ✓ Non-dilutive funding
              </p>
            </div>
          </div>
        </section>

        {/* Quick Overview Section - What's Available */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Grant Programs for Software & SaaS Startups</h2>
              <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
                Federal and state funding opportunities for enterprise software, cloud platforms, developer tools, AI/ML, cybersecurity, and automation.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2 border-indigo-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-indigo-50 to-purple-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-indigo-700">$305,000</div>
                        <div className="text-sm text-gray-600">NSF SBIR Phase I</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Proof of Concept</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>6-18 months development timeline</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Build MVP & validate market fit</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Zero equity, full ownership retained</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Fast-track to Phase II eligibility</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#phase-1-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-700">$1.25M</div>
                        <div className="text-sm text-gray-600">NSF SBIR Phase II</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Full Development</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>24 months commercialization focus</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Production-ready platform launch</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Customer acquisition & revenue growth</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Prep for Series A fundraising</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#phase-2-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1 relative">
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    FAST TRACK
                  </div>
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-700">$1.555M</div>
                        <div className="text-sm text-gray-600">Combined Fast-Track</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Combined Funding</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Phase I + II in single proposal</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Streamlined approval process</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>For NSF lineage companies only</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Faster path to market launch</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#fast-track-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Focus Categories - Scannable */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Software Technologies That Qualify</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                NSF SBIR and DOD grants support a wide range of software innovations across these categories.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Sparkles className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Enterprise Software</h3>
                    <p className="text-sm text-gray-600 mb-3">ERP, CRM, HRMS, financial management, supply chain platforms</p>
                    <p className="text-xs text-indigo-700 font-semibold">$305K - $1.25M available</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Globe className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Cloud & PaaS</h3>
                    <p className="text-sm text-gray-600 mb-3">Cloud infrastructure, developer tools, APIs, low-code platforms</p>
                    <p className="text-xs text-purple-700 font-semibold">$1.555M Fast-Track option</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Lightbulb className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">AI & ML Software</h3>
                    <p className="text-sm text-gray-600 mb-3">NLP, computer vision, automation, predictive analytics</p>
                    <p className="text-xs text-blue-700 font-semibold">40% healthcare success rate</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-cyan-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Shield className="w-8 h-8 text-cyan-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Cybersecurity</h3>
                    <p className="text-sm text-gray-600 mb-3">Threat detection, IAM, AppSec, compliance, SIEM systems</p>
                    <p className="text-xs text-cyan-700 font-semibold">DOD SBIR targeted funding</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 2026 Updates - Highlight What's New */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-indigo-900 mb-2">What's New in 2026-2027</h3>
                    <p className="text-gray-700">Recent NSF SBIR updates that benefit software startups</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-5 border border-indigo-100">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Increased Funding Amounts</h4>
                    </div>
                    <p className="text-sm text-gray-700">Phase I increased to $305K (from $275K). Phase II now $1.25M (from $1M). Access ~$2M total non-dilutive funding.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-indigo-100">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Fast-Track Pilot Launch</h4>
                    </div>
                    <p className="text-sm text-gray-700">New Fast-Track program allows single combined proposal for Phase I+II. Up to $1.555M, faster market entry.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-indigo-100">
                    <div className="flex items-center mb-2">
                      <Heart className="w-5 h-5 text-red-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Healthcare Tech Sweet Spot</h4>
                    </div>
                    <p className="text-sm text-gray-700">40% of Phase I awards go to healthcare/medtech software. Digital health innovations see exceptional success rates.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-indigo-100">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-purple-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Project Pitch Fast Feedback</h4>
                    </div>
                    <p className="text-sm text-gray-700">3-page pitch gets feedback in 3 weeks. Know if your project fits before full proposal. Quick iteration cycles.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Programs Section */}
        <section id="software-grants" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Complete Grant Program Details</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Everything you need to know about NSF SBIR Phase I, Phase II, Fast-Track, DOD, and state programs for software startups.
              </p>
              
              <div className="space-y-8">
                {/* NSF SBIR Phase I */}
                <Card id="phase-1-details" className="border-2 border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700 text-2xl">NSF SBIR Phase I - $305,000 Proof of Concept Grant</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-indigo-800">Program Overview</h4>
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-indigo-700 font-bold text-xl">$305,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-purple-700 font-bold">6-18 months</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Equity Required:</span>
                              <span className="text-green-700 font-bold">0% (Non-dilutive)</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Review Time:</span>
                              <span className="text-blue-700 font-bold">3-6 months</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-800 mb-3">Phase I Objectives:</h5>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Target className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Technical Feasibility:</strong> Prove your software concept works and solves a real problem</span>
                            </li>
                            <li className="flex items-start">
                              <Target className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Build MVP:</strong> Develop working prototype demonstrating core functionality</span>
                            </li>
                            <li className="flex items-start">
                              <Target className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Market Validation:</strong> Conduct customer discovery, pilot testing, prove demand</span>
                            </li>
                            <li className="flex items-start">
                              <Target className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Phase II Prep:</strong> Develop commercialization plan for $1.25M full development</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Success Stories</h4>
                        <div className="space-y-4">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-2">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-green-800">AI Testing Software</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              $305K Phase I → validated AI-powered QA platform with Fortune 500 pilots → raised $20M Series A from Andreessen Horowitz → serving 500 enterprise customers with $10M ARR.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">$20M Series A</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">$10M ARR</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">500 customers</span>
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-blue-800">Low-Code Platform</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              $305K Phase I → built MVP with 50 beta users → transitioned to Phase II $1.25M → launched production platform → 5,000 developers, 200 enterprise customers, $5M ARR.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Phase II $1.25M</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">$5M ARR</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">5K developers</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200">
                      <h4 className="font-bold text-lg mb-4 text-indigo-800">Application Process & Requirements</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Building className="w-4 h-4 mr-2 text-indigo-600" />
                            Eligibility
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• US-based small business &lt;500 employees</li>
                            <li>• 50%+ US citizen/resident owned</li>
                            <li>• Principal Investigator employed by company</li>
                            <li>• Innovative, high-risk software technology</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                            Application Steps
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Submit 3-page Project Pitch (3 weeks feedback)</li>
                            <li>• If invited, develop full 15-page proposal</li>
                            <li>• Build relationship with NSF Program Director</li>
                            <li>• Review process takes 3-6 months</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-indigo-600" />
                            Success Factors
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Clear unmet market need evidence</li>
                            <li>• Technical innovation & IP strategy</li>
                            <li>• Strong team with domain expertise</li>
                            <li>• Realistic budget, timeline, milestones</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* NSF SBIR Phase II */}
                <Card id="phase-2-details" className="border-2 border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700 text-2xl">NSF SBIR Phase II - $1.25M Full Development & Commercialization</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-purple-800">Program Details</h4>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-purple-700 font-bold text-xl">$1,250,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-pink-700 font-bold">24 months</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Requirement:</span>
                              <span className="text-indigo-700 font-bold">Successful Phase I</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Equity:</span>
                              <span className="text-green-700 font-bold">0% Non-dilutive</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                          Phase II supports full development of production-ready software platforms, customer acquisition, revenue generation, and commercialization activities. Combined with Phase I, access ~$2M total non-dilutive funding while retaining 100% equity.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Commercialization Focus</h4>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="font-semibold text-gray-800 mb-3">Phase II Objectives:</p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Rocket className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Production Platform:</strong> Build scalable, production-ready software with enterprise-grade infrastructure</span>
                            </li>
                            <li className="flex items-start">
                              <Users className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Customer Acquisition:</strong> Execute pilot deployments, early adopter programs, generate initial revenue</span>
                            </li>
                            <li className="flex items-start">
                              <TrendingUp className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Go-to-Market:</strong> Execute sales & marketing strategy, build distribution channels, grow pipeline</span>
                            </li>
                            <li className="flex items-start">
                              <DollarSign className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Follow-on Capital:</strong> Prepare for Series A, investor introductions, pitch development</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Fast-Track & Additional Programs */}
                <Card id="fast-track-details" className="border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700 text-2xl">Fast-Track $1.555M + DOD & State Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-blue-800">NSF Fast-Track Pilot Program</h4>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Combined Award:</span>
                              <span className="text-blue-700 font-bold text-xl">$1,555,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Eligibility:</span>
                              <span className="text-blue-700 font-bold">NSF Lineage Only</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-4 bg-white p-4 rounded-lg border border-gray-200">
                          Software companies with NSF lineage (prior Phase I, Phase II, or other NSF funding) can submit a single combined proposal for Phase I + Phase II, potentially securing up to $1.555M. Streamlines approval process and accelerates time to market.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Additional Software Programs</h4>
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center mb-2">
                              <Shield className="w-5 h-5 text-blue-700 mr-2" />
                              <p className="font-semibold text-blue-800">DOD SBIR Software Modernization</p>
                            </div>
                            <p className="text-sm text-gray-700">
                              Department of Defense SBIR targets software for defense applications, military systems, cybersecurity, command & control communications supporting national security.
                            </p>
                          </div>

                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center mb-2">
                              <MapPin className="w-5 h-5 text-green-700 mr-2" />
                              <p className="font-semibold text-green-800">State Technology Accelerators</p>
                            </div>
                            <p className="text-sm text-gray-700">
                              California, Massachusetts, New York, Washington, Colorado offer SBIR matching grants, tax incentives, and accelerator programs for software innovation.
                            </p>
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

        {/* Success Strategies - Cleaner Layout */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Application Success Strategies</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Proven tactics to increase your chances of winning NSF SBIR funding for your software startup.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      What Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Users className="w-5 h-5 text-green-600 mr-2" />
                          Build NSF Program Director Relationships
                        </h4>
                        <p className="text-sm text-gray-700">
                          Connect early, discuss your project fit, and get guidance. Directors want to fund innovative projects and provide valuable feedback to strengthen applications.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Target className="w-5 h-5 text-green-600 mr-2" />
                          Demonstrate Clear Market Demand
                        </h4>
                        <p className="text-sm text-gray-700">
                          Provide evidence through customer interviews, letters of intent, pilot agreements, or early revenue. NSF prioritizes real market problems with commercial viability.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Clock className="w-5 h-5 text-green-600 mr-2" />
                          Use Project Pitch for Fast Feedback
                        </h4>
                        <p className="text-sm text-gray-700">
                          Submit a 3-page pitch first to get feedback in 3 weeks. Learn if your project fits before investing time in a full proposal. Iterate quickly.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Shield className="w-5 h-5 text-green-600 mr-2" />
                          Emphasize Innovation & IP Strategy
                        </h4>
                        <p className="text-sm text-gray-700">
                          Clearly articulate technical differentiation, competitive advantages, and intellectual property protection plans for defensible market position.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      Common Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Technology Push Without Market Pull
                        </h4>
                        <p className="text-sm text-gray-700">
                          Building cool technology without proven customer demand. NSF prioritizes evidence of unmet needs and commercial opportunity, not just interesting innovations.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Weak Commercialization Plan
                        </h4>
                        <p className="text-sm text-gray-700">
                          Vague strategy without specific go-to-market plans, customer acquisition channels, or revenue models. NSF requires realistic paths to profitability.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Insufficient Team Expertise
                        </h4>
                        <p className="text-sm text-gray-700">
                          Teams lacking necessary software development, domain expertise, or commercialization experience. NSF evaluates likelihood of successfully executing the project.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Unrealistic Timelines or Budgets
                        </h4>
                        <p className="text-sm text-gray-700">
                          Overpromising what can be achieved in the grant period or unclear budget justification. Be realistic about milestones and deliverables.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Clear Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Apply for Software Grants?
              </h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                Download our free guide with NSF SBIR templates or get personalized help from grant specialists.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card className="bg-white/10 backdrop-blur border-2 border-white/20 hover:bg-white/15 transition-all">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white">Free Application Guide</h3>
                    <p className="text-indigo-100 text-sm mb-6">
                      Comprehensive PDF with NSF SBIR templates, timelines, checklists, and winning strategies.
                    </p>
                    <Button size="lg" className="w-full bg-white text-indigo-700 hover:bg-indigo-50 font-semibold" asChild>
                      <Link href="/download/software-saas-grants-guide">
                        Download Now (Free)
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 hover:bg-yellow-500/25 transition-all">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-900" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white">Expert Grant Support</h3>
                    <p className="text-yellow-100 text-sm mb-6">
                      Work with SBIR specialists who've helped software startups win millions in non-dilutive funding.
                    </p>
                    <Button size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold" asChild>
                      <Link href="/contact?service=software-grants-help">
                        Get Expert Help
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <p className="text-indigo-200 mt-8 text-sm">
                ✓ 500+ software startups funded • ✓ $2M+ average funding per company • ✓ Zero equity required
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
