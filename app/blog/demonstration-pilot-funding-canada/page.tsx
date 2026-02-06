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
    url: "https://www.fsidigital.ca/blog/demonstration-pilot-funding-canada",
    images: ["/og-image.png"],
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

        {/* TRL Breakdown Section */}
        <section className="py-12 bg-orange-50 border-y border-orange-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Understanding Technology Readiness Levels (TRL 7-9)</h2>
              <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
                Stage 3 is about "Real-World Operation." You must move out of the lab and into an operational environment. This is where capital intensity spikes.
              </p>

              <div className="space-y-6">
                <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl mr-4">7</div>
                  <div>
                    <h3 className="font-bold text-lg text-orange-900">TRL 7: System Prototype in Operational Environment</h3>
                    <p className="text-sm text-gray-600 mb-2">Prototype near or at planned operational system. It requires demonstration of an actual system prototype in an operational environment (e.g., in an aircraft, in a vehicle, or in space).</p>
                    <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200">SDTC Eligible</Badge>
                  </div>
                </div>

                <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xl mr-4">8</div>
                  <div>
                    <h3 className="font-bold text-lg text-red-900">TRL 8: System Complete and Qualified</h3>
                    <p className="text-sm text-gray-600 mb-2">Technology has been proven to work in its final form and under expected conditions. In almost all cases, this TRL represents the end of true system development.</p>
                    <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200">Clean Growth Program Eligible</Badge>
                  </div>
                </div>

                <div className="flex items-start bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold text-xl mr-4">9</div>
                  <div>
                    <h3 className="font-bold text-lg text-amber-900">TRL 9: Actual System Proven in Successful Operations</h3>
                    <p className="text-sm text-gray-600 mb-2">Actual application of the technology in its final form and under mission conditions, such as those encountered in operational test and evaluation.</p>
                    <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200">SIF Eligible</Badge>
                  </div>
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


        {/* Pilot to Market Roadmap */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">From Pilot to Commercial: Stage 3 Roadmap</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100 relative">
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <h3 className="font-bold text-orange-900 mt-2 mb-2">Pilot Deployment</h3>
                  <p className="text-sm text-gray-600">Install technology at first customer site (Beta).
                    <br /><span className="text-orange-600 font-semibold text-xs">Goal: Live Operation</span></p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg border border-red-100 relative">
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <h3 className="font-bold text-red-900 mt-2 mb-2">Data Collection</h3>
                  <p className="text-sm text-gray-600">Gather 6-12 months of operational data.
                    <br /><span className="text-red-600 font-semibold text-xs">Goal: Verify ROI</span></p>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 relative">
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <h3 className="font-bold text-amber-900 mt-2 mb-2">Regulatory Approval</h3>
                  <p className="text-sm text-gray-600">Finalize certifications (CSA, ISO, Health Canada).
                    <br /><span className="text-amber-600 font-semibold text-xs">Goal: Market Compliance</span></p>
                </div>
                <div className="bg-rose-50 p-6 rounded-lg border border-rose-100 relative">
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <h3 className="font-bold text-rose-900 mt-2 mb-2">First Commercial Sale</h3>
                  <p className="text-sm text-gray-600">Convert pilot into a paid contract or new sale.
                    <br /><span className="text-rose-600 font-semibold text-xs">Goal: TRL 9 & Revenue</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real World Case Study */}
        <section className="py-16 bg-slate-50 border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Case Study: The CleanTech Pivot</h2>
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                    C
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">CleanFlow Systems (Hypothetical)</h3>
                    <p className="text-slate-600">Industrial wastewater treatment system for mining operations.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                      <div className="h-full w-0.5 bg-gray-200 my-2"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-900">Month 1-12 (TRL 7)</span>
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">SDTC Fund</Badge>
                      </div>
                      <p className="text-sm text-slate-600">Secured $3M SDTC grant (33% project cost) to install a full-scale pilot at a Partner Mine in Northern Ontario.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                      <div className="h-full w-0.5 bg-gray-200 my-2"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-900">Month 13-18 (TRL 8)</span>
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Clean Growth</Badge>
                      </div>
                      <p className="text-sm text-slate-600">Pilot data showed 95% efficiency but high energy use. Used $500k Clean Growth funding to re-engineer power systems.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-900">Month 19-24 (TRL 9)</span>
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Commercial</Badge>
                      </div>
                      <p className="text-sm text-slate-600">Partner Mine converted pilot to permanent installation. Signed 3 new mining contracts based on proven data.</p>
                    </div>
                  </div>
                </div>
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

        {/* FAQ Section */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Is SDTC funding a grant or a loan?</h3>
                  <p className="text-gray-600">It is technically a "non-repayable contribution" if you meet certain conditions, but often structured with repayment terms based on commercial success. Always check the specific terms of the current funding round, as they can evolve.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Do I need a confirmed customer for a pilot project?</h3>
                  <p className="text-gray-600">For most Stage 3 grants (like Clean Growth or SDTC), yes. You need a "host site" or a partner who is willing to test your technology. A letter of intent (LOI) is the minimum, but a signed pilot agreement is much stronger.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">How much equity do I give up?</h3>
                  <p className="text-gray-600">Zero. All programs listed here (SDTC, Clean Growth, SIF) are non-dilutive. The government does not take ownership shares in your company, keeping your cap table clean for future VC investment.</p>
                </div>
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
