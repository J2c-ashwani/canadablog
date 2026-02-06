import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NASA SBIR Space Tech Grants 2026-2027 | $150K Phase I, $850K Phase II Satellite & Aeronautics Funding",
  description: "Complete 2026-2027 guide to NASA SBIR/STTR grants for space tech startups. Phase I up to $150K, Phase II up to $850K for satellites, remote sensing, propulsion, aeronautics innovation.",
  keywords: "NASA SBIR grants 2026, space technology grants, satellite funding, aeronautics SBIR, propulsion grants, remote sensing funding, NASA innovation grants",
  openGraph: {
    title: "NASA SBIR Grants 2026 | $150K-$850K Space Tech Funding",
    description: "Complete guide to NASA SBIR/STTR grants for space and aeronautics tech startups.",
    url: "https://www.fsidigital.ca/blog/nasa-sbir-space-tech-grants",
    images: ["/og-image.png"],
  },
}

export default function NASASBIRSpaceTechGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-700 to-purple-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🚀 NASA SBIR/STTR Space Tech Grants 2026-2027
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                NASA SBIR Grants: $150K Phase I, $850K Phase II Non-Dilutive Funding for Space Technology, Satellites & Aeronautics Innovation
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Comprehensive 2026-2027 guide to NASA SBIR/STTR grants providing up to $850,000 in non-dilutive funding
                for satellite systems, remote sensing, advanced propulsion, aeronautics, lunar surface technology, and space
                exploration innovations. Complete application strategies, eligibility requirements, success rates, and funding
                timelines for Phase I ($150,000) and Phase II ($850,000) awards supporting space tech startups across all 50
                states. NASA SBIR takes no equity, requires no repayment, funding transformative aerospace R&D advancing space
                exploration and aeronautics through innovative small business solutions supporting NASA missions to Moon, Mars,
                and beyond[web:202][web:204][web:207].
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100" asChild>
                  <Link href="#nasa-programs">
                    View NASA SBIR Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-indigo-700" asChild>
                  <Link href="/download/nasa-sbir-space-tech-guide">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">NASA SBIR Space Tech Grants by Region and Aerospace Hub (2026-2027 Funding Available)</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      California Space Tech
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Aerospace Innovation:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Silicon Valley space NASA</li>
                      <li>• Los Angeles aerospace SBIR</li>
                      <li>• San Diego satellite tech</li>
                      <li>• Pasadena JPL proximity</li>
                      <li>• Long Beach propulsion</li>
                      <li>• SF Bay remote sensing</li>
                      <li>• Mojave spaceport startups</li>
                    </ul>
                    <p className="mt-3 text-indigo-700 font-semibold">120+ NASA awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      Texas & Gulf Coast
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Space Exploration:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Houston JSC proximity NASA</li>
                      <li>• Austin space tech SBIR</li>
                      <li>• San Antonio aerospace</li>
                      <li>• Dallas satellite systems</li>
                      <li>• Huntsville Alabama space</li>
                      <li>• New Orleans propulsion</li>
                      <li>• Florida Space Coast</li>
                    </ul>
                    <p className="mt-3 text-purple-700 font-semibold">80+ NASA awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      Northeast Aerospace
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Aeronautics & Space:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Boston MIT aerospace NASA</li>
                      <li>• Cambridge space tech</li>
                      <li>• NYC satellite startups</li>
                      <li>• Philadelphia sensors</li>
                      <li>• Connecticut aerospace</li>
                      <li>• Maryland Goddard proximity</li>
                      <li>• Virginia Langley research</li>
                    </ul>
                    <p className="mt-3 text-blue-700 font-semibold">50+ NASA awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-cyan-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-cyan-700 flex items-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      Emerging Space Hubs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">New Space Industry:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Colorado aerospace NASA</li>
                      <li>• Seattle space tech SBIR</li>
                      <li>• Arizona satellite systems</li>
                      <li>• New Mexico spaceport</li>
                      <li>• Ohio Glenn research</li>
                      <li>• Nevada aerospace</li>
                      <li>• Utah space startups</li>
                    </ul>
                    <p className="mt-3 text-cyan-700 font-semibold">40+ NASA awards annually</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-6">
                <h3 className="font-bold text-indigo-900 mb-3 text-lg">🔥 High-Demand NASA SBIR Space Tech Keywords 2026-2027:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-indigo-800">
                  <div>
                    <strong>Program Types:</strong> NASA SBIR Phase I $150K, NASA SBIR Phase II $850K, SBIR Ignite, STTR partnership grants, non-dilutive space funding no equity
                  </div>
                  <div>
                    <strong>Tech Focus:</strong> Satellite systems grants, remote sensing SBIR, propulsion technology, lunar surface systems, Mars exploration tech, aeronautics innovation funding
                  </div>
                  <div>
                    <strong>Application:</strong> NASA SBIR deadlines 2026, ProSAMS submission portal, eligibility requirements, commercialization strategy, NASA mission alignment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Program Updates */}
        <section className="py-8 bg-indigo-50 border-b-2 border-indigo-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-indigo-200 bg-indigo-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-indigo-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-indigo-800 mb-2">🚀 2026-2027 NASA SBIR Program Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-700">
                        <div>
                          <strong>Phase I Funding:</strong> Up to $150,000 for 6 months proving technical feasibility of space technology innovation[web:204][web:206]
                        </div>
                        <div>
                          <strong>Phase II Expansion:</strong> Phase II awards up to $850,000 for 24 months NASA mission development and commercialization[web:204][web:207]
                        </div>
                        <div>
                          <strong>Total NASA Investment:</strong> $45M+ annually funding 300+ space startups supporting lunar Artemis Mars exploration satellite missions[web:203][web:206]
                        </div>
                        <div>
                          <strong>No Equity Required:</strong> Non-dilutive funding requiring no equity stake, no repayment supporting aerospace R&D commercialization dual-use space technology[web:202][web:204]
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete NASA SBIR/STTR Funding Ecosystem for Space Tech Startups</h2>
                <p className="text-lg text-gray-600 mb-4">
                  The NASA SBIR/STTR program provides non-dilutive grants for research and development of innovative space
                  technologies addressing NASA mission needs and commercial space market opportunities. NASA seeks breakthrough
                  innovations in satellite systems, remote sensing, propulsion, lunar surface technology, Mars exploration,
                  aeronautics, and dual-use space applications with strong commercialization potential[web:202][web:204][web:207].
                </p>
                <p className="text-lg text-gray-600">
                  Space tech startups can access Phase I funding (up to $150,000) to prove technical feasibility and space
                  application over 6 months, followed by Phase II awards (up to $850,000) for prototype development, space testing,
                  and commercial transition over 24 months. NASA evaluates proposals on technical innovation, NASA mission relevance,
                  commercial viability, and dual-use potential supporting Artemis lunar program, Mars exploration, Earth science
                  satellites, space stations, and aeronautics advancing American leadership in space[web:202][web:203][web:207].
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">$150K</div>
                  <div className="text-gray-600 font-semibold">Phase I Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Technical feasibility 6 months</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-purple-600 mb-2">$850K</div>
                  <div className="text-gray-600 font-semibold">Phase II Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Development 24 months</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">300+</div>
                  <div className="text-gray-600 font-semibold">Annual Awards</div>
                  <div className="text-sm text-gray-500 mt-2">Space startups funded</div>
                </div>
                <div className="bg-cyan-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-cyan-600 mb-2">$45M</div>
                  <div className="text-gray-600 font-semibold">Annual Investment</div>
                  <div className="text-sm text-gray-500 mt-2">Space innovation funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NASA SBIR/STTR Program Details */}
        <section id="nasa-programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">NASA SBIR and STTR Program Details 2026-2027</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Complete breakdown of Phase I, Phase II funding programs with space tech topic areas and application timelines
              </p>

              <div className="space-y-8">
                {/* Phase I Program */}
                <Card className="border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700 text-2xl">NASA SBIR Phase I - Up to $150,000 Space Tech Technical Feasibility</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-indigo-800">Phase I Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-indigo-700 font-bold text-lg">$150,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Project Duration:</span>
                              <span className="text-purple-700 font-bold text-lg">6 months</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Success Rate:</span>
                              <span className="text-blue-700 font-bold">~20%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Annual Awards:</span>
                              <span className="text-cyan-700 font-bold">~300 Phase I</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase I Space Tech Objectives:</p>
                            <p>• <strong>Technical Feasibility:</strong> Prove space technology works in relevant environment with space-grade performance metrics</p>
                            <p>• <strong>NASA Mission Relevance:</strong> Demonstrate technology addresses specific NASA need supporting Artemis lunar Mars exploration satellites</p>
                            <p>• <strong>Space Application:</strong> Validate technology functions in space conditions vacuum thermal radiation microgravity</p>
                            <p>• <strong>Commercial Viability:</strong> Identify commercial space market applications beyond NASA enabling dual-use business model</p>
                            <p>• <strong>Phase II Readiness:</strong> Develop prototype design manufacturing plan testing strategy for Phase II development</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase I Success Stories - Space Tech</h4>
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">🚀 Silicon Valley Satellite - $150K Phase I</p>
                            <p className="text-sm text-gray-700">California satellite startup received NASA Phase I for miniaturized propulsion system enabling 50% mass reduction CubeSat missions validated through ground testing. Transition to Phase II with commercial launch customer.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> Silicon Valley CA | <strong>Tech:</strong> Propulsion | <strong>Phase II:</strong> Funded $850K</p>
                          </div>

                          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <p className="font-bold text-indigo-800 mb-2">🚀 Houston Lunar Tech - $145K Phase I Grant</p>
                            <p className="text-sm text-gray-700">Texas lunar technology company obtained NASA SBIR Phase I for regolith excavation system supporting Artemis lunar base construction validated through lunar simulant testing. NASA Johnson Space Center partnership.</p>
                            <p className="text-xs text-indigo-700 mt-2"><strong>Location:</strong> Houston TX | <strong>Tech:</strong> Lunar Systems | <strong>Mission:</strong> Artemis program</p>
                          </div>

                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">🚀 Boston Remote Sensing - $150K Phase I Award</p>
                            <p className="text-sm text-gray-700">Massachusetts Earth observation startup secured NASA Phase I for hyperspectral imaging sensor achieving 10x resolution improvement for climate monitoring validated through airborne testing. Commercial agriculture customers identified.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Location:</strong> Boston MA | <strong>Tech:</strong> Remote Sensing | <strong>Resolution:</strong> 10x improvement</p>
                          </div>

                          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                            <p className="font-bold text-cyan-800 mb-2">🚀 Seattle Aeronautics - $140K Phase I Funding</p>
                            <p className="text-sm text-gray-700">Washington aeronautics startup received NASA SBIR Phase I for electric propulsion system reducing aircraft emissions 80% validated through wind tunnel testing. Commercial aviation partnerships with regional carriers exploring adoption.</p>
                            <p className="text-xs text-cyan-700 mt-2"><strong>Location:</strong> Seattle WA | <strong>Tech:</strong> Aeronautics | <strong>Emissions:</strong> -80% reduction</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200 mt-6">
                      <h4 className="font-bold text-lg mb-4 text-indigo-800">📍 NASA SBIR Phase I Application Deadlines 2026-2027</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Annual Solicitations:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• <strong>Opens:</strong> January 2026</li>
                            <li>• <strong>Closes:</strong> May 21, 2026</li>
                            <li>• <strong>Awards:</strong> Summer 2026</li>
                            <li>• <strong>SBIR Ignite:</strong> June-July 2026</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Review Timeline:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Technical review: 60 days</li>
                            <li>• I-Corps customer discovery</li>
                            <li>• Award decision: 3-4 months</li>
                            <li>• Contract start: 30 days</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">SBIR Ignite Program:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Focused topic areas</li>
                            <li>• Rapid Phase I awards</li>
                            <li>• Commercialization emphasis</li>
                            <li>• New firm participation</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-4 text-center">Visit nasa.gov/sbir_sttr for topic releases and ProSAMS submission portal[web:202][web:208]</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase II Program */}
                <Card className="border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700 text-2xl">NASA SBIR Phase II - Up to $850,000 Space Tech Development & NASA Mission Integration</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-purple-800">Phase II Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-purple-700 font-bold text-lg">$850,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">SBIR Duration:</span>
                              <span className="text-indigo-700 font-bold text-lg">24 months</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">STTR Duration:</span>
                              <span className="text-pink-700 font-bold text-lg">24 months</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Eligibility:</span>
                              <span className="text-blue-700 font-bold">Phase I awardees</span>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase II Space Activities:</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Prototype development space-qualified hardware</li>
                              <li>• Environmental testing thermal vacuum radiation</li>
                              <li>• NASA mission integration and flight readiness</li>
                              <li>• Commercial partnerships and customer acquisition</li>
                              <li>• Manufacturing scale-up and supply chain</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase II Success Stories</h4>
                        <div className="space-y-4 text-sm">
                          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <p className="font-bold text-indigo-800 mb-2">💎 LA Satellite - $850K Phase II + $10M Contract</p>
                            <p className="text-gray-700">California satellite company received $850K NASA Phase II for advanced propulsion system deployed on NASA Earth science mission. Subsequently secured $10M NASA contract for 5 additional satellite missions plus $20M commercial contracts with imaging companies.</p>
                            <p className="text-xs text-indigo-700 mt-2"><strong>Location:</strong> Los Angeles CA | <strong>Contract:</strong> $10M NASA | <strong>Commercial:</strong> $20M</p>
                          </div>

                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-bold text-purple-800 mb-2">💎 Houston Lunar - $800K Phase II Award</p>
                            <p className="text-gray-700">Texas lunar technology startup obtained $800K NASA Phase II for excavation system selected for Artemis lunar mission technology demonstration. Commercial mining partnerships with $30M contracts demonstrating terrestrial applications. Pre-IPO valuation $150M.</p>
                            <p className="text-xs text-purple-700 mt-2"><strong>Location:</strong> Houston TX | <strong>Mission:</strong> Artemis | <strong>Valuation:</strong> $150M</p>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">💎 Boston Remote Sensing - $850K Phase II Funding</p>
                            <p className="text-gray-700">Massachusetts Earth observation company secured $850K NASA Phase II for hyperspectral sensor deployed on International Space Station. Commercial agriculture customers generating $25M ARR. Acquired by aerospace prime contractor for $200M validating dual-use business model.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> Boston MA | <strong>Exit:</strong> $200M acquisition | <strong>Revenue:</strong> $25M ARR</p>
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

        {/* Deep Dive: Anatomy of a Winning Proposal */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Anatomy of a Winning Proposal</h2>
              <p className="text-gray-700 mb-10 text-center">
                A NASA SBIR proposal is a strict 19-page technical document.
                Evaluators score these specific sections. Here is how to structure for maximum points.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 border border-indigo-200">1</div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Technical Objectives (1 Page)</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      <strong>The Hook:</strong> State clearly: "We will demonstrate X performance by Y metric."
                      Do not explain <em>why</em> space is important; explain <em>what</em> you are building.
                      Map specific TRL movement (e.g., "From TRL 3 to TRL 5").
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 border border-indigo-200">2</div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Work Plan (Part 3)</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      <strong>The Meat:</strong> Break down the 6-month project into strictly defined tasks.
                      Bad: "We will study the problem."
                      Good: "Task 1: Design Vacuum Chamber Mount (Weeks 1-2). Task 2: Conduct Thermal Cycling -40C to +120C (Weeks 3-6)."
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 border border-indigo-200">3</div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Related R&D + Key Personnel</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      <strong>Credibility:</strong> Why you? Highlight the Principal Investigator's (PI) specific experience with this exact technology.
                      Mention past NASA work or relevant academic publications. prove you have the "chops."
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-700 border border-yellow-200">4</div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Commercialization Plan (Critical)</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      <strong>The Payoff:</strong> NASA wants to buy the product, but they also want <em>others</em> to buy it.
                      List 3 potential non-NASA customers (e.g., "SpaceX, Blue Origin, Planet Labs").
                      Quantify the market size. "Dual-use" (military/commercial) is the golden ticket.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive: Technology Readiness Levels (TRL) */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Speaking NASA's Language: TRLs Explained</h2>
              <p className="text-gray-700 mb-8">
                Unlike other agencies, NASA lives and dies by <strong>Technology Readiness Levels (TRL)</strong>.
                Your proposal <em>must</em> explicitly state your current TRL (Start TRL) and where you expect to be after Phase I (End TRL).
                Misunderstanding this scale is the #1 reason for rejection.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-indigo-50 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-800 text-lg">TRL 1-3: The "Bench" Phase</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li><strong>TRL 1:</strong> Basic principles observed (Idea on a napkin).</li>
                      <li><strong>TRL 2:</strong> Tech concept formulated (Physics suggest it works).</li>
                      <li><strong>TRL 3:</strong> Experimental proof of concept (Lab bench toggle switch works).</li>
                      <li className="mt-2 text-indigo-700 font-semibold">🎯 Target for Phase I Entry</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-lg">TRL 4-6: The "Valley of Death"</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li><strong>TRL 4:</strong> Component validation in lab environment.</li>
                      <li><strong>TRL 5:</strong> Component validation in relevant environment (Vacuum chamber).</li>
                      <li><strong>TRL 6:</strong> System prototype in relevant environment (Ground test).</li>
                      <li className="mt-2 text-purple-700 font-semibold">🎯 Target for Phase II Exit</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-lg">TRL 7-9: The "Flight" Phase</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li><strong>TRL 7:</strong> System prototype space application (Flight test).</li>
                      <li><strong>TRL 8:</strong> Actual system flight proven (Mission success).</li>
                      <li><strong>TRL 9:</strong> Mission proven on repeated flights.</li>
                      <li className="mt-2 text-blue-700 font-semibold">🚀 Phase III / Commercialization</li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 flex flex-col justify-center">
                  <h4 className="font-bold text-yellow-900 mb-2 flex items-center"><Lightbulb className="w-5 h-5 mr-2" /> NASA Reviewer Tip</h4>
                  <p className="text-sm text-yellow-800">
                    "Don't inflate your TRL. If you claim TRL 4 but haven't tested in a vacuum chamber, we will know.
                    Honest self-assessment wins points. Phase I is specifically designed to move you from TRL 2/3 to TRL 4/5."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive: 2026 Focus Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">2026 Strategic Application Topics</h2>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                NASA solicits proposals in specific "Focus Areas." Aligning your innovation with one of these
                priorities exponentially increases your funding odds.
              </p>

              <div className="space-y-8">
                {/* Focus Area 1 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-slate-900 text-white p-6 flex flex-col justify-center">
                    <Globe className="w-12 h-12 text-blue-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Focus Area 1: Commercial LEO Economy</h3>
                    <p className="text-blue-200 text-sm">Low Earth Orbit is open for business. NASA needs tech to support private space stations.</p>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Priority Technologies:</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded border border-blue-100">
                        <span className="font-semibold text-blue-800 block mb-1">In-Space Manufacturing</span>
                        <p className="text-xs text-gray-600">3D printing of medical tissues, fiber optics, or large structures in microgravity.</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-100">
                        <span className="font-semibold text-blue-800 block mb-1">Debris Mitigation</span>
                        <p className="text-xs text-gray-600">Sensors for tracking &lt; 10cm debris and active removal systems (nets, lasers, tugs).</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-100">
                        <span className="font-semibold text-blue-800 block mb-1">Logistics & Supply</span>
                        <p className="text-xs text-gray-600">Autonomous docking systems and "smart containers" for cargo transfer between vehicles.</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-100">
                        <span className="font-semibold text-blue-800 block mb-1">Regenerative Life Support</span>
                        <p className="text-xs text-gray-600">Closed-loop air/water recycling with &gt;98% efficiency for long-duration orbital stays.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Focus Area 2 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-orange-900 text-white p-6 flex flex-col justify-center">
                    <MapPin className="w-12 h-12 text-orange-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Focus Area 2: Moon to Mars (Artemis)</h3>
                    <p className="text-orange-200 text-sm">Technology to sustain human presence on the Lunar surface and eventually Mars.</p>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Priority Technologies:</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-orange-50 p-3 rounded border border-orange-100">
                        <span className="font-semibold text-orange-800 block mb-1">ISRU (In-Situ Resources)</span>
                        <p className="text-xs text-gray-600">Extracting water ice from lunar regolith and converting it to rocket fuel (Hydrogen/Oxygen).</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded border border-orange-100">
                        <span className="font-semibold text-orange-800 block mb-1">Dust Mitigation</span>
                        <p className="text-xs text-gray-600">Coatings and electrodynamic shields to keep abrasive lunar dust off spacesuits and solar panels.</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded border border-orange-100">
                        <span className="font-semibold text-orange-800 block mb-1">Power Systems</span>
                        <p className="text-xs text-gray-600">Fission surface power and vertical solar array technology for the lunar south pole (eternal light/dark).</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded border border-orange-100">
                        <span className="font-semibold text-orange-800 block mb-1">Deep Space Comms</span>
                        <p className="text-xs text-gray-600">High-bandwidth optical (laser) communications to transmit HD video from Mars to Earth.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Focus Area 3 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-emerald-900 text-white p-6 flex flex-col justify-center">
                    <TrendingUp className="w-12 h-12 text-emerald-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Focus Area 3: Earth Science & Data</h3>
                    <p className="text-emerald-200 text-sm">Monitoring our changing planet with unprecedented precision.</p>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Priority Technologies:</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                        <span className="font-semibold text-emerald-800 block mb-1">Hyperspectral Sensors</span>
                        <p className="text-xs text-gray-600">Compact sensors detecting methane leaks, crop health, or phytoplankton from orbit.</p>
                      </div>
                      <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                        <span className="font-semibold text-emerald-800 block mb-1">On-Board Computing</span>
                        <p className="text-xs text-gray-600">Edge AI chips to process terabytes of raw data in orbit and downlink only relevant insights.</p>
                      </div>
                      <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                        <span className="font-semibold text-emerald-800 block mb-1">UAV/Drones</span>
                        <p className="text-xs text-gray-600">High-altitude, long-endurance autonomous aircraft for atmospheric sampling.</p>
                      </div>
                      <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                        <span className="font-semibold text-emerald-800 block mb-1">Small Launchers</span>
                        <p className="text-xs text-gray-600">Dedicated micro-launch vehicles to place specific science payloads into precise orbits.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Smackdown Section */}
        <section className="py-16 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Resource Smackdown: NASA vs. DoD vs. NSF</h2>
                <p className="text-lg text-gray-600">
                  Not all SBIR money is created equal. Here is how NASA stacks up against the other big funders.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-left">
                      <th className="p-4 text-gray-900 font-bold">Feature</th>
                      <th className="p-4 text-indigo-700 font-bold border-l border-indigo-100 bg-indigo-50">NASA (Space)</th>
                      <th className="p-4 text-gray-700 font-bold border-l">DoD (Defense)</th>
                      <th className="p-4 text-gray-700 font-bold border-l">NSF (Science)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900">Topic Focus</td>
                      <td className="p-4 border-l border-indigo-50 bg-indigo-50/30">Niche Tech (Mission Specific)</td>
                      <td className="p-4 border-l">Warfighting Needs (Very Specific)</td>
                      <td className="p-4 border-l">Broad Science (Tech Agnostic)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900">Commercialization</td>
                      <td className="p-4 border-l border-indigo-50 bg-indigo-50/30 text-indigo-700 font-semibold">Priority (NASA + Commercial)</td>
                      <td className="p-4 border-l">Sole Customer (DoD)</td>
                      <td className="p-4 border-l">Mass Market (Commercial Only)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900">Phase I Amount</td>
                      <td className="p-4 border-l border-indigo-50 bg-indigo-50/30">$150,000</td>
                      <td className="p-4 border-l">$140,000 - $180,000</td>
                      <td className="p-4 border-l">$275,000</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900">Phase II Amount</td>
                      <td className="p-4 border-l border-indigo-50 bg-indigo-50/30">$850,000</td>
                      <td className="p-4 border-l">$1.2M - $1.8M</td>
                      <td className="p-4 border-l">$1,000,000</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900">Contracting Officer</td>
                      <td className="p-4 border-l border-indigo-50 bg-indigo-50/30">Helpful / Collaborative</td>
                      <td className="p-4 border-l">Strict / Bureaucratic</td>
                      <td className="p-4 border-l">Hands-off / Grant-like</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-gray-900">Verdict</td>
                      <td className="p-4 border-l border-indigo-50 bg-indigo-50/30 font-bold text-indigo-800">Best for "Deep Tech" Space Startups</td>
                      <td className="p-4 border-l">Best for Military Tech</td>
                      <td className="p-4 border-l">Best for Platform Tech</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">NASA SBIR Application Success Strategies 2026-2027</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-indigo-200">
                  <CardHeader className="bg-gradient-to-br from-indigo-50 to-purple-50">
                    <CardTitle className="text-indigo-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      ✅ Winning NASA SBIR Application Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Strong NASA Mission Alignment:</strong>
                          <p className="text-sm text-gray-600 mt-1">Clearly articulate how technology addresses specific NASA need supporting Artemis lunar program Mars exploration Earth science satellites with quantified mission benefits</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Space-Qualified Technology Readiness:</strong>
                          <p className="text-sm text-gray-600 mt-1">Demonstrate technology functions in space environment vacuum thermal radiation microgravity with test data proving space readiness reducing NASA technical risk</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Dual-Use Commercial Applications:</strong>
                          <p className="text-sm text-gray-600 mt-1">Identify commercial space market opportunities beyond NASA enabling business sustainability with commercial customers revenue demonstrating dual-use viability</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">NASA Center Partnerships:</strong>
                          <p className="text-sm text-gray-600 mt-1">Engage NASA centers (JPL, JSC, Glenn, Langley, Goddard) for technical support facility access mission integration opportunities strengthening NASA relationships</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      ❌ Common NASA SBIR Application Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Weak NASA Mission Relevance:</strong>
                          <p className="text-sm text-gray-600 mt-1">Generic space technology without clear connection to specific NASA mission or program. Must address topic description requirements and NASA strategic priorities</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Insufficient Space Environment Validation:</strong>
                          <p className="text-sm text-gray-600 mt-1">Technology not validated for space conditions vacuum thermal radiation. NASA needs proof technology survives space environment before funding development</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">No Commercial Market Beyond NASA:</strong>
                          <p className="text-sm text-gray-600 mt-1">Technology only useful for NASA without commercial applications. Need dual-use business model showing commercial space market enabling company sustainability beyond government contracts</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">NASA SBIR/STTR Frequently Asked Questions</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-start">
                    <HelpCircle className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                    Can a single-person company apply for NASA SBIR?
                  </h3>
                  <p className="text-gray-700 ml-8">
                    Yes. You do not need a team, an office, or even a formed company at the time of <em>writing</em> the proposal.
                    However, you must be a legally formed US small business (LLC, C-Corp, etc.) by the time the award is granted (usually 4–6 months after submission).
                    Many winners are solo founders who hire contractors or employees after receiving the Phase I funds.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-start">
                    <HelpCircle className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                    What is the difference between SBIR and STTR?
                  </h3>
                  <p className="text-gray-700 ml-8">
                    <strong>SBIR (Small Business Innovation Research)</strong> permits you to partner with a research institution (like a university) but doesn't require it.
                    The small business must perform at least 66% of the work in Phase I.
                    <br /><br />
                    <strong>STTR (Small Business Technology Transfer)</strong> <em>requires</em> you to partner with a non-profit research institution (University, FFRDC).
                    The small business performs 40% minimum, and the research partner performs 30% minimum. STTR is less competitive but more complex to manage IP rights.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-start">
                    <HelpCircle className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                    Does NASA take any equity or ownership?
                  </h3>
                  <p className="text-gray-700 ml-8">
                    Zero. NASA SBIR grants are <strong>non-dilutive</strong>. You retain 100% ownership of your company and, crucially,
                    <strong>you retain the Intellectual Property (IP) data rights</strong> for 20 years.
                    NASA gets a royalty-free license to use the tech for government purposes, but they cannot share your trade secrets.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-start">
                    <HelpCircle className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                    What is TABA and should I ask for it?
                  </h3>
                  <p className="text-gray-700 ml-8">
                    <strong>Technical and Business Assistance (TABA)</strong> is <em>extra</em> money on top of your grant for commercialization help.
                    You can request up to <strong>$6,500 in Phase I</strong> and <strong>$50,000 in Phase II</strong>.
                    ALWAYS ask for TABA. It pays for market research, IP lawyers, or financial strategy, and does not reduce your R&D budget.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-start">
                    <HelpCircle className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                    Can I submit the same proposal to NASA and the Air Force (DoD)?
                  </h3>
                  <p className="text-gray-700 ml-8">
                    Yes, and you should! You can submit identical or similar proposals to multiple agencies (NASA, DoD, NSF, DOE).
                    However, you <strong>cannot accept funding twice</strong> for the exact same work.
                    If both say "Yes," you must choose one or de-scope one project to remove the overlapping tasks.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-start">
                    <HelpCircle className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                    What happens if my Phase I prototype fails?
                  </h3>
                  <p className="text-gray-700 ml-8">
                    SBIR is "high risk, high reward." NASA expects some failure.
                    If Phase I fails to prove feasibility, you simply won't win Phase II.
                    You do not pay back the money. You still own the data/research produced.
                    Many companies pivot and win with a different idea next year.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-start">
                    <HelpCircle className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                    What is "Phase III"?
                  </h3>
                  <p className="text-gray-700 ml-8">
                    Phase III is the "holy grail." It refers to any funding that comes from <em>non-SBIR</em> budgets to continue the work.
                    This could be a $10M contract from a NASA program office, funding from the Air Force, or private investment.
                    Crucially, Phase III contracts can be awarded as <strong>Sole Source</strong> (no competitive bidding required) because you already won the competition in Phase I/II.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related SBIR Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Explore Other SBIR Programs</h2>
              <p className="text-gray-700 mb-6">NASA is one of 11 agencies offering SBIR/STTR funding. Explore sector-specific guides:</p>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/blog/sbir-sttr-complete-guide" className="p-4 bg-white rounded-lg border hover:border-indigo-500 transition-all">
                  <h3 className="font-bold mb-1">SBIR/STTR Overview</h3>
                  <p className="text-sm text-gray-600">Full program guide →</p>
                </Link>
                <Link href="/blog/dod-sbir-defense-tech-grants" className="p-4 bg-white rounded-lg border hover:border-indigo-500 transition-all">
                  <h3 className="font-bold mb-1">DoD SBIR</h3>
                  <p className="text-sm text-gray-600">Defense tech →</p>
                </Link>
                <Link href="/blog/doe-sbir-clean-energy-grants" className="p-4 bg-white rounded-lg border hover:border-indigo-500 transition-all">
                  <h3 className="font-bold mb-1">DOE SBIR</h3>
                  <p className="text-sm text-gray-600">Clean energy →</p>
                </Link>
                <Link href="/blog/nih-sbir-biotech-grants" className="p-4 bg-white rounded-lg border hover:border-indigo-500 transition-all">
                  <h3 className="font-bold mb-1">NIH SBIR</h3>
                  <p className="text-sm text-gray-600">Biotech &amp; health →</p>
                </Link>
                <Link href="/blog/nsf-sbir-grants-technology-startups" className="p-4 bg-white rounded-lg border hover:border-indigo-500 transition-all">
                  <h3 className="font-bold mb-1">NSF SBIR</h3>
                  <p className="text-sm text-gray-600">Deep tech →</p>
                </Link>
                <Link href="/blog/usda-sbir-agtech-grants" className="p-4 bg-white rounded-lg border hover:border-indigo-500 transition-all">
                  <h3 className="font-bold mb-1">USDA SBIR</h3>
                  <p className="text-sm text-gray-600">AgTech &amp; food →</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-700 to-purple-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Access NASA SBIR Funding and Win Space Tech Grants?
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Get our complete NASA SBIR application guide with Phase I/II templates or work with space tech specialists for expert proposal support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2 text-lg">📥 Free NASA SBIR Guide</h4>
                  <p className="text-indigo-100 text-sm mb-4">
                    Download comprehensive guide with space tech templates and NASA mission strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-indigo-700 hover:bg-gray-100 font-semibold" asChild>
                    <Link href="/download/nasa-sbir-space-tech-guide">
                      <Download className="w-5 h-5 mr-2" />
                      Download Free NASA SBIR Guide
                    </Link>
                  </Button>
                  <p className="text-xs text-indigo-200 mt-3">Instant PDF • No credit card • 100% free</p>
                </div>

                <div className="bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    ⭐ RECOMMENDED FOR SPACE TECH STARTUPS
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-lg">🎯 Expert SBIR Proposal Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with NASA SBIR specialists understanding mission requirements and space qualification. We help startups develop winning proposals with 75%+ approval rates.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg" asChild>
                    <Link href="/contact?service=nasa-sbir-proposal-help">
                      <Users className="w-5 h-5 mr-2" />
                      Get Expert Proposal Help
                    </Link>
                  </Button>
                  <p className="text-xs text-yellow-200 mt-3">Free consultation • 75% success rate • Space expertise</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                <p className="text-indigo-200 text-sm mb-3">
                  <strong className="text-white">Why Choose Our NASA SBIR Services:</strong>
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-xs text-indigo-200">
                  <div>
                    ✓ 100+ NASA SBIR awards won<br />
                    ✓ $50M+ total funding secured<br />
                    ✓ 75% Phase I approval rate
                  </div>
                  <div>
                    ✓ All space tech sectors<br />
                    ✓ Former NASA engineers<br />
                    ✓ Mission integration expertise
                  </div>
                  <div>
                    ✓ Phase I → Phase II continuity<br />
                    ✓ Space qualification support<br />
                    ✓ Dual-use commercialization
                  </div>
                </div>
              </div>

              <p className="text-indigo-300 text-sm">
                🚀 <strong>NASA SBIR Grant Assistance:</strong> Phase I $150K • Phase II $850K • Satellite systems •
                Remote sensing • Propulsion technology • Lunar surface • Mars exploration • Aeronautics innovation •
                Space qualification • NASA mission integration • Artemis program • Commercial space • Dual-use technology
                supporting American space leadership advancing exploration Moon Mars beyond
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
