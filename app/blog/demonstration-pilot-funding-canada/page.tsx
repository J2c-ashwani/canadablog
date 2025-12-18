import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Rocket, Factory, Settings, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Stage 3: Demonstration & Pilot Funding Canada 2026 | SDTC & Clean Growth | Up to $15M Project Funding",
  description: "Complete guide to Canadian demonstration and pilot project funding. Access up to $15M through SDTC Demonstration, Clean Growth Program, sector pilots, and TRL 7-8 validation projects for pre-commercial scale-up.",
  keywords: "demonstration project funding Canada, pilot program grants, SDTC demonstration funding, Clean Growth Program Canada, TRL 7-8 funding, pre-commercial funding, scale-up grants Canada, pilot plant funding",
  openGraph: {
    title: "Stage 3: Demonstration & Pilot Funding Canada 2026 | SDTC & Clean Growth",
    description: "Access up to $15M in demonstration and pilot funding. Complete guide to SDTC, Clean Growth, and sector pilot programs.",
    url: "https://fsidigital.ca/blog/demonstration-pilot-funding-canada",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function DemonstrationPilotFundingCanadaPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🚀 Stage 3: Demonstration & Pilot Funding
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Stage 3: Demonstration & Pilot Funding Canada 2026
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Access up to $15M in demonstration project and pilot program funding through SDTC Demonstration, 
                Clean Growth Program, and sector-specific pilots. Scale your validated technology to pre-commercial 
                demonstration and pilot implementation (TRL 7-8).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore Pilot Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    View All Innovation Stages
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 3 Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$15M</div>
                  <div className="text-gray-600">Maximum Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">12+</div>
                  <div className="text-gray-600">Demonstration Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">33-50%</div>
                  <div className="text-gray-600">Cost Coverage (SDTC)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rose-600 mb-2">TRL 7-8</div>
                  <div className="text-gray-600">Technology Readiness Level</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Stage 3 Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Stage 3: Demonstration & Pilot Programs</h2>
              
              <div className="space-y-8">
                {/* SDTC Demonstration */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">SDTC - Sustainable Development Technology Canada</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $15M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>CleanTech Demo</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canada's premier cleantech funding program supporting large-scale demonstration and pilot projects 
                      for climate change, clean air, clean water, and clean soil technologies at pre-commercial stages.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Demonstration Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Pre-commercial scale demonstration</li>
                          <li>• Real-world operating conditions</li>
                          <li>• Performance validation at scale</li>
                          <li>• Environmental impact measurement</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 33% project funding (repayable)</li>
                          <li>• Multi-year project support</li>
                          <li>• Technical and business advisory</li>
                          <li>• Strategic partnership facilitation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clean Growth Program */}
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Factory className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle className="text-red-700">Clean Growth Program - Innovation & Scale-up</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Industrial Pilots</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal program supporting clean technology demonstration and deployment in industrial settings, 
                      focusing on emissions reduction, energy efficiency, and resource productivity.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Project Types:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Industrial demonstration projects</li>
                          <li>• First-of-kind installations</li>
                          <li>• Scale-up manufacturing pilots</li>
                          <li>• Commercial validation projects</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Included:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 50% of eligible costs</li>
                          <li>• Repayable contribution structure</li>
                          <li>• Partnership development support</li>
                          <li>• Market access facilitation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sector Pilot Programs */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Settings className="w-6 h-6 text-amber-600 mr-3" />
                      <CardTitle className="text-amber-700">Sector-Specific Pilot Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$1M - $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Industry Pilots</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Varies</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Industry-specific demonstration and pilot programs across agriculture, manufacturing, energy, 
                      and other sectors supporting technology validation in real-world applications.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Sector Examples:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Agricultural technology pilots</li>
                          <li>• Manufacturing automation demos</li>
                          <li>• Energy system demonstrations</li>
                          <li>• Transportation technology pilots</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Pilot Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Real customer/user testing</li>
                          <li>• Performance data collection</li>
                          <li>• Business model validation</li>
                          <li>• Market feedback and iteration</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Strategic Innovation Fund */}
                <Card className="border-rose-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-6 h-6 text-rose-600 mr-3" />
                      <CardTitle className="text-rose-700">Strategic Innovation Fund (SIF) - Demonstration Stream</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$10M - $50M+</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Large Projects</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal program supporting large-scale demonstration projects with significant economic and 
                      innovation impact, particularly in strategic sectors and transformative technologies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Project Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Significant economic impact</li>
                          <li>• Strategic sector alignment</li>
                          <li>• Large-scale demonstration</li>
                          <li>• Job creation potential</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Structure:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Repayable contributions</li>
                          <li>• Multi-year project timelines</li>
                          <li>• Co-investment requirements</li>
                          <li>• Performance milestones</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What Stage 3 Covers */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Stage 3: Demonstration & Pilot Covers</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">✅ Eligible Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Pre-Commercial Demonstration:</strong> Large-scale technology demonstration in relevant environment
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Pilot Plant Operations:</strong> Operating pilot facilities and first-of-kind installations
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Performance Validation:</strong> Real-world testing and performance data collection
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Customer Trials:</strong> Beta testing with real customers and users
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Scale-Up Engineering:</strong> Preparing for commercial production and deployment
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">🎯 Stage 3 Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Demonstrated Technology:</strong> Proven system operating in real-world conditions
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Commercial Validation:</strong> Verified business model and customer acceptance
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Performance Data:</strong> Comprehensive operational data and metrics
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Market Readiness:</strong> Customer references and early revenue generation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Commercialization Ready:</strong> Foundation for full market launch (Stage 4)
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Stage 3 Demonstration Funding Success Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Strong Performance Metrics:</strong> Define clear KPIs and measurement framework
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Customer Partnerships:</strong> Secure committed pilot customers or partners
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Scale-Up Plan:</strong> Clear pathway from pilot to commercial production
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Risk Mitigation:</strong> Comprehensive plan for technical and commercial risks
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Customer Commitment:</strong> Lack of confirmed pilot partners or customers
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Unclear Scale-Up Path:</strong> No plan for transitioning to commercial production
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Business Model:</strong> Unproven unit economics or revenue model
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Insufficient Co-Funding:</strong> Inadequate financial commitment or partnerships
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Next Stage CTA */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Fund Your Demonstration Project?
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Get expert help navigating Stage 3 demonstration and pilot funding programs. Our specialists have secured 
                $210M+ in SDTC, Clean Growth, and large-scale demonstration funding.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=demonstration-pilot-funding-canada-expert-help">
                    Get Expert Help
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    View All Innovation Stages
                  </Link>
                </Button>
              </div>
              
              <p className="text-orange-200 text-sm mt-6">
                76% success rate • $210M+ secured in SDTC and demonstration funding • Expert guidance for all stages
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
