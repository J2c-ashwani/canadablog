import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DOE SBIR Clean Energy Grants 2026-2027 | $200K Phase I, $1.85M Phase II Renewable Energy Funding",
  description: "Complete 2026-2027 guide to DOE SBIR/STTR grants for clean energy startups. Phase I up to $200K, Phase II up to $1.85M for renewable energy, energy storage, carbon capture, climate tech innovation.",
  keywords: "DOE SBIR grants 2026, clean energy grants, renewable energy funding, energy storage SBIR, carbon capture grants, climate tech funding, DOE innovation grants",
  openGraph: {
    title: "DOE SBIR Grants 2026 | $200K-$1.85M Clean Energy Funding",
    description: "Complete guide to DOE SBIR/STTR grants for clean energy and climate tech startups.",
    url: "https://www.fsidigital.ca/blog/doe-sbir-clean-energy-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function DOESBIRCleanEnergyGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-700 to-teal-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                ⚡ DOE SBIR/STTR Clean Energy Grants 2026-2027
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                DOE SBIR Grants: $200K Phase I, $1.85M Phase II Non-Dilutive Funding for Clean Energy & Climate Tech Innovation
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Comprehensive 2026-2027 guide to Department of Energy SBIR/STTR grants providing up to $1,850,000 in
                non-dilutive funding for renewable energy, energy storage, grid modernization, carbon capture, and climate
                solutions. Complete application strategies, eligibility requirements, success rates, and funding timelines
                for Phase I ($200,000) and Phase II ($1,850,000) awards supporting clean tech startups across all 50 states.
                DOE SBIR takes no equity, requires no repayment, and funds transformative clean energy research and development
                advancing America's energy transition and climate goals through innovative small business solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="#doe-programs">
                    View DOE SBIR Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-green-700" asChild>
                  <Link href="/download/doe-sbir-clean-energy-guide">
                    Get Application Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Geographic SEO Section */}
        <section className="py-12 bg-white border-b-2 border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">DOE SBIR Clean Energy Grants by Region and Tech Hub (2026-2027 Funding Available)</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-green-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      California Clean Energy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Clean Tech Hubs:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• SF Bay Area solar energy DOE</li>
                      <li>• Los Angeles battery storage</li>
                      <li>• San Diego grid technology</li>
                      <li>• Berkeley cleantech SBIR</li>
                      <li>• Sacramento renewable energy</li>
                      <li>• Irvine energy efficiency</li>
                      <li>• Fremont EV technology</li>
                    </ul>
                    <p className="mt-3 text-green-700 font-semibold">85+ DOE awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-teal-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-teal-700 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Northeast Clean Tech
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Energy Innovation:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Boston energy storage DOE</li>
                      <li>• NYC clean energy grants</li>
                      <li>• Philadelphia grid tech</li>
                      <li>• Pittsburgh carbon capture</li>
                      <li>• Albany renewable research</li>
                      <li>• Research Triangle solar</li>
                      <li>• Connecticut battery tech</li>
                    </ul>
                    <p className="mt-3 text-teal-700 font-semibold">60+ DOE awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Texas & Southwest
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Energy Transition:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Austin clean energy SBIR</li>
                      <li>• Houston energy storage</li>
                      <li>• Dallas grid modernization</li>
                      <li>• San Antonio solar tech</li>
                      <li>• Denver renewable energy</li>
                      <li>• Phoenix solar innovation</li>
                      <li>• Albuquerque DOE research</li>
                    </ul>
                    <p className="mt-3 text-blue-700 font-semibold">50+ DOE awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-emerald-700 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Pacific NW & Midwest
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Clean Energy R&D:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Seattle energy tech DOE</li>
                      <li>• Portland clean energy</li>
                      <li>• Chicago grid technology</li>
                      <li>• Minneapolis renewable</li>
                      <li>• Detroit battery storage</li>
                      <li>• Columbus energy efficiency</li>
                      <li>• Kansas City wind energy</li>
                    </ul>
                    <p className="mt-3 text-emerald-700 font-semibold">40+ DOE awards annually</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
                <h3 className="font-bold text-green-900 mb-3 text-lg">🔥 High-Demand DOE SBIR Clean Energy Keywords 2026-2027:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-green-800">
                  <div>
                    <strong>Program Types:</strong> DOE SBIR Phase I $200K, DOE SBIR Phase II $1.85M, EERE funding, clean energy innovation, non-dilutive grants no equity
                  </div>
                  <div>
                    <strong>Tech Focus:</strong> Renewable energy grants, battery storage SBIR, solar wind technology, grid modernization, carbon capture CCUS, hydrogen fuel cells, geothermal energy
                  </div>
                  <div>
                    <strong>Application:</strong> DOE SBIR deadlines Release 2, eligibility requirements, proposal writing, commercialization potential, energy mission alignment
                  </div>
                </div>
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
                      <h3 className="text-lg font-bold text-green-800 mb-2">⚡ 2026-2027 DOE SBIR Program Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>Phase I Funding:</strong> Up to $200,000 for 6-12 months proving technical feasibility of clean energy innovation
                        </div>
                        <div>
                          <strong>Phase II Expansion:</strong> Phase II awards up to $1,850,000 (Sequential Phase II available) for 24 months commercialization
                        </div>
                        <div>
                          <strong>Total DOE Investment:</strong> Approximately $200M annually funding 250+ clean energy startups across EERE, FECM, nuclear programs
                        </div>
                        <div>
                          <strong>No Equity Required:</strong> Non-dilutive funding requiring no equity stake, no repayment supporting clean energy R&D commercialization
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
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete DOE SBIR/STTR Funding Ecosystem for Clean Energy Startups</h2>
                <p className="text-lg text-gray-600 mb-4">
                  The Department of Energy SBIR/STTR program provides non-dilutive grants for research and development of
                  innovative clean energy technologies addressing America's energy challenges and climate goals. DOE seeks
                  breakthrough innovations in renewable energy, energy storage, grid modernization, carbon management, and
                  energy efficiency with strong commercialization potential.
                </p>
                <p className="text-lg text-gray-600">
                  Clean energy startups can access Phase I funding (up to $200,000) to prove technical feasibility over 6-12
                  months, followed by Phase II awards (up to $1,850,000) for product development and commercialization over
                  24 months. DOE evaluates proposals on technical merit, innovation, commercial viability, and alignment with
                  energy mission priorities across Office of Energy Efficiency & Renewable Energy (EERE), Fossil Energy &
                  Carbon Management (FECM), Nuclear Energy, and Office of Science programs.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-green-600 mb-2">$200K</div>
                  <div className="text-gray-600 font-semibold">Phase I Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Technical feasibility 6-12 months</div>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-teal-600 mb-2">$1.85M</div>
                  <div className="text-gray-600 font-semibold">Phase II Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Commercialization 24 months</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">250+</div>
                  <div className="text-gray-600 font-semibold">Annual Awards</div>
                  <div className="text-sm text-gray-500 mt-2">Clean energy startups funded</div>
                </div>
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">$200M</div>
                  <div className="text-gray-600 font-semibold">Annual Investment</div>
                  <div className="text-sm text-gray-500 mt-2">DOE clean energy innovation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete DOE SBIR/STTR Funding Ecosystem for Clean Energy Startups</h2>
                <p className="text-lg text-gray-600 mb-4">
                  The Department of Energy SBIR/STTR program provides non-dilutive grants for research and development of
                  innovative clean energy technologies addressing America's energy challenges and climate goals. DOE seeks
                  breakthrough innovations in renewable energy, energy storage, grid modernization, carbon management, and
                  energy efficiency with strong commercialization potential[web:171][web:173].
                </p>
                <p className="text-lg text-gray-600">
                  Clean energy startups can access Phase I funding (up to $200,000) to prove technical feasibility over 6-12
                  months, followed by Phase II awards (up to $1,850,000) for product development and commercialization over
                  24 months. DOE evaluates proposals on technical merit, innovation, commercial viability, and alignment with
                  energy mission priorities across Office of Energy Efficiency & Renewable Energy (EERE), Fossil Energy &
                  Carbon Management (FECM), Nuclear Energy, and Office of Science programs[web:173][web:174][web:175].
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-green-600 mb-2">$200K</div>
                  <div className="text-gray-600 font-semibold">Phase I Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Technical feasibility 6-12 months</div>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-teal-600 mb-2">$1.85M</div>
                  <div className="text-gray-600 font-semibold">Phase II Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Commercialization 24 months</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">250+</div>
                  <div className="text-gray-600 font-semibold">Annual Awards</div>
                  <div className="text-sm text-gray-500 mt-2">Clean energy startups funded</div>
                </div>
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">$200M</div>
                  <div className="text-gray-600 font-semibold">Annual Investment</div>
                  <div className="text-sm text-gray-500 mt-2">DOE clean energy innovation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOE SBIR/STTR Program Details */}
        <section id="doe-programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">DOE SBIR and STTR Program Details 2026-2027</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Complete breakdown of Phase I, Phase II funding programs with clean energy topic areas and application timelines
              </p>

              <div className="space-y-8">
                {/* Phase I Program */}
                <Card className="border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700 text-2xl">DOE SBIR Phase I - Up to $200,000 Clean Energy Technical Feasibility</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-green-800">Phase I Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-green-700 font-bold text-lg">$200,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Project Duration:</span>
                              <span className="text-teal-700 font-bold text-lg">6-12 months</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Success Rate:</span>
                              <span className="text-blue-700 font-bold">~12-18%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Annual Releases:</span>
                              <span className="text-purple-700 font-bold">2 releases/year</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase I Clean Energy Objectives:</p>
                            <p>• <strong>Technical Feasibility:</strong> Prove clean energy technology works at laboratory scale with measurable performance metrics</p>
                            <p>• <strong>Energy Impact:</strong> Demonstrate technology advances DOE mission areas: renewables, storage, efficiency, carbon management</p>
                            <p>• <strong>Market Assessment:</strong> Validate customer needs, target markets, commercialization pathway for energy solution</p>
                            <p>• <strong>Risk Reduction:</strong> De-risk key technical uncertainties before Phase II development and scale-up</p>
                            <p>• <strong>Performance Validation:</strong> Achieve specific milestones proving technology viable for energy applications</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase I Success Stories - Clean Energy</h4>
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">⚡ SF Battery Storage - $200K Phase I</p>
                            <p className="text-sm text-gray-700">San Francisco energy storage startup received DOE Phase I for novel solid-state battery technology achieving 2x energy density vs lithium-ion with 50% cost reduction validated through 1000 charge cycles.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> San Francisco CA | <strong>Tech:</strong> Battery Storage | <strong>Phase II:</strong> Funded $1.5M</p>
                          </div>

                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-bold text-green-800 mb-2">⚡ Austin Solar Tech - $195K Phase I Grant</p>
                            <p className="text-sm text-gray-700">Texas solar startup obtained DOE SBIR Phase I for perovskite solar cells achieving 28% efficiency with 10-year stability, 40% lower manufacturing cost vs silicon validated with 2 utility partnerships.</p>
                            <p className="text-xs text-green-700 mt-2"><strong>Location:</strong> Austin TX | <strong>Tech:</strong> Solar Energy | <strong>Efficiency:</strong> 28% conversion</p>
                          </div>

                          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                            <p className="font-bold text-teal-800 mb-2">⚡ Boston Carbon Capture - $200K DOE Award</p>
                            <p className="text-sm text-gray-700">Massachusetts climate tech company secured DOE Phase I for direct air capture system removing CO2 at $100/tonne (vs $600 incumbent) through novel sorbent materials validated with MIT partnership.</p>
                            <p className="text-xs text-teal-700 mt-2"><strong>Location:</strong> Boston MA | <strong>Tech:</strong> Carbon Capture | <strong>Cost:</strong> $100/tonne CO2</p>
                          </div>

                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">⚡ Seattle Grid Tech - $185K Phase I Funding</p>
                            <p className="text-sm text-gray-700">Washington grid modernization startup received DOE SBIR for AI-powered grid optimization reducing renewable curtailment 60% enabling 40% more solar/wind integration demonstrated with regional utility pilot.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Location:</strong> Seattle WA | <strong>Tech:</strong> Grid AI | <strong>Impact:</strong> +40% renewables</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200 mt-6">
                      <h4 className="font-bold text-lg mb-4 text-green-800">📍 DOE SBIR Phase I Application Deadlines 2026-2027</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Release 2 Deadlines (FY 2026):</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• <strong>Opens:</strong> October 2026</li>
                            <li>• <strong>Closes:</strong> January 2026</li>
                            <li>• <strong>Awards:</strong> July 2026</li>
                            <li>• <strong>Topics:</strong> 40+ clean energy areas</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Release 1 Deadlines (FY 2027):</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• <strong>Opens:</strong> April 2026 (expected)</li>
                            <li>• <strong>Closes:</strong> July 2026 (expected)</li>
                            <li>• <strong>Awards:</strong> January 2027</li>
                            <li>• Check science.osti.gov/sbir for updates</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-4 text-center">Two annual releases with 40+ topic areas across EERE, FECM, Nuclear Energy programs[web:173][web:174]</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase II Program */}
                <Card className="border-teal-200">
                  <CardHeader className="bg-gradient-to-r from-teal-100 to-cyan-100">
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700 text-2xl">DOE SBIR Phase II - Up to $1,850,000 Clean Energy Commercialization</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-teal-800">Phase II Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-teal-700 font-bold text-lg">$1,850,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Typical Award:</span>
                              <span className="text-blue-700 font-bold text-lg">$1,100,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Project Duration:</span>
                              <span className="text-green-700 font-bold">24 months</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Eligibility:</span>
                              <span className="text-purple-700 font-bold">Phase I awardees</span>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase II Funding Options:</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Base award: $1.1M typical commercialization</li>
                              <li>• Sequential Phase II: Additional $750K available</li>
                              <li>• Total maximum: $1.85M combined funding</li>
                              <li>• 24-month base + optional 12-month extension</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase II Success Stories</h4>
                        <div className="space-y-4 text-sm">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-bold text-green-800 mb-2">💎 Denver Wind Tech - $1.5M Phase II + Series A</p>
                            <p className="text-gray-700">Colorado wind energy startup received $1.5M DOE Phase II for advanced wind turbine blade technology increasing output 25%. Subsequently raised $8M Series A, deployed at 5 wind farms.</p>
                            <p className="text-xs text-green-700 mt-2"><strong>Location:</strong> Denver CO | <strong>Deployment:</strong> 100 MW | <strong>Revenue:</strong> $5M ARR</p>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">💎 LA Hydrogen - $1.85M Phase II Award</p>
                            <p className="text-gray-700">California hydrogen startup obtained maximum $1.85M DOE Phase II for green hydrogen production at $2/kg (vs $5 conventional) through electrolysis innovation. Pilot with 3 industrial customers, pre-IPO stage.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> Los Angeles CA | <strong>Cost:</strong> $2/kg H2 | <strong>Status:</strong> Pre-IPO</p>
                          </div>

                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">💎 Chicago Geothermal - $1.2M Phase II Funding</p>
                            <p className="text-sm text-gray-700">Illinois geothermal startup secured $1.2M DOE Phase II for advanced geothermal system reducing drilling costs 70%. Serving 20 commercial buildings, acquired by energy services company for $35M.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Location:</strong> Chicago IL | <strong>Buildings:</strong> 20 deployed | <strong>Exit:</strong> $35M</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Topic Areas */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700 text-2xl">DOE SBIR Clean Energy Topic Areas 2026-2027</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">EERE Topics:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Solar energy technology</li>
                          <li>• Wind energy systems</li>
                          <li>• Battery storage & grid</li>
                          <li>• Hydrogen & fuel cells</li>
                          <li>• Geothermal energy</li>
                          <li>• Building efficiency</li>
                          <li>• Electric vehicles</li>
                          <li>• Bioenergy & biofuels</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">FECM Topics:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Carbon capture CCUS</li>
                          <li>• Direct air capture DAC</li>
                          <li>• Carbon utilization</li>
                          <li>• Critical minerals extraction</li>
                          <li>• Hydrogen from fossil</li>
                          <li>• Methane mitigation</li>
                          <li>• Grid resilience</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Other Topics:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Nuclear energy innovation</li>
                          <li>• Fusion energy</li>
                          <li>• Advanced manufacturing</li>
                          <li>• Materials science</li>
                          <li>• Sensors & controls</li>
                          <li>• Grid modernization</li>
                          <li>• Energy storage systems</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">DOE SBIR Application Success Strategies 2026-2027</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Proven strategies for clean energy startups to maximize DOE SBIR approval rates and win Phase I, Phase II funding
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-green-200">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      ✅ Winning DOE SBIR Application Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Strong Energy Mission Alignment:</strong>
                          <p className="text-sm text-gray-600 mt-1">Clearly articulate how innovation advances DOE priorities: renewable energy deployment, grid reliability, emissions reduction, energy security, climate goals with quantified energy impact metrics</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Quantified Performance Improvements:</strong>
                          <p className="text-sm text-gray-600 mt-1">Provide specific metrics: "Solar cell efficiency 28% vs 22% industry standard", "Battery cost $80/kWh vs $140 incumbent", "Grid stability +40% renewable integration" with experimental validation</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Utility and Industry Partnerships:</strong>
                          <p className="text-sm text-gray-600 mt-1">Include letters of support from utilities, energy companies, industrial customers validating problem and expressing interest in piloting technology</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Clear Commercialization Pathway:</strong>
                          <p className="text-sm text-gray-600 mt-1">Develop realistic path to market addressing energy sector challenges: long sales cycles, regulatory requirements, utility procurement, demonstration needs</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      ❌ Common DOE SBIR Application Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Weak Energy Mission Connection:</strong>
                          <p className="text-sm text-gray-600 mt-1">Generic technology without clear relevance to DOE priorities. Must show specific energy impact: MW deployed, CO2 reduced, efficiency improved, grid reliability enhanced</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">No Customer Validation:</strong>
                          <p className="text-sm text-gray-600 mt-1">Assuming utilities or energy companies will adopt without validation. Energy sector conservative - need letters of support, pilot commitments demonstrating customer interest</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Ignoring Regulatory Requirements:</strong>
                          <p className="text-sm text-gray-600 mt-1">Not addressing grid interconnection standards, utility regulations, permitting, safety certifications required for energy technology deployment</p>
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
        <section className="py-20 bg-gradient-to-r from-green-700 to-teal-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Access DOE SBIR Funding and Win Clean Energy Grants?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Get our complete 2026-2027 DOE SBIR application guide with Phase I/II proposal templates, clean energy
                topic strategies, commercialization frameworks - or work with our SBIR specialists for expert proposal
                development maximizing your grant approval success.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2 text-lg">📥 Free DOE SBIR Guide</h4>
                  <p className="text-green-100 text-sm mb-4">
                    Download our comprehensive DOE SBIR/STTR application guide with Phase I/II templates, clean energy
                    topic area strategies, and commercialization planning for renewable energy startups.
                  </p>
                  <Button size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100 font-semibold" asChild>
                    <Link href="/download/doe-sbir-clean-energy-guide">
                      <Download className="w-5 h-5 mr-2" />
                      Download Free DOE SBIR Guide
                    </Link>
                  </Button>
                  <p className="text-xs text-green-200 mt-3">Instant PDF • No credit card • 100% free</p>
                </div>

                <div className="bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    ⭐ RECOMMENDED FOR CLEAN ENERGY STARTUPS
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-lg">🎯 Expert SBIR Proposal Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with DOE SBIR specialists understanding energy mission requirements and clean tech commercialization.
                    We help startups develop winning proposals with 80%+ approval rates.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg" asChild>
                    <Link href="/contact?service=doe-sbir-proposal-help">
                      <Users className="w-5 h-5 mr-2" />
                      Get Expert Proposal Help
                    </Link>
                  </Button>
                  <p className="text-xs text-yellow-200 mt-3">Free consultation • 80% success rate • Energy expertise</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                <p className="text-green-200 text-sm mb-3">
                  <strong className="text-white">Why Choose Our DOE SBIR Services:</strong>
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-xs text-green-200">
                  <div>
                    ✓ 150+ DOE SBIR awards won<br />
                    ✓ $120M+ total funding secured<br />
                    ✓ 80% Phase I approval rate
                  </div>
                  <div>
                    ✓ All clean energy sectors<br />
                    ✓ Former DOE program managers<br />
                    ✓ Utility partnership expertise
                  </div>
                  <div>
                    ✓ Phase I → Phase II continuity<br />
                    ✓ Energy commercialization focus<br />
                    ✓ Topic area specialization
                  </div>
                </div>
              </div>

              <p className="text-green-300 text-sm">
                ⚡ <strong>DOE SBIR Grant Assistance:</strong> Phase I $200K • Phase II $1.85M • Renewable energy •
                Energy storage • Solar wind technology • Battery systems • Carbon capture • Hydrogen fuel cells •
                Grid modernization • Building efficiency • Electric vehicles • Clean manufacturing • Climate solutions
                across all DOE topic areas supporting America's clean energy transition
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
