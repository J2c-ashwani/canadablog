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
    images: ["/og-image.png"],
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
        <section className="py-16 bg-white border-b-2 border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Regional Clean Energy Innovation Hubs (2026-2027)</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                While DOE SBIR is a federal program open to all 50 states, strong regional ecosystems have emerged, providing state-level matching funds and specialized incubator support.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="border-green-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-green-800 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      California & The West
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4">
                      California continues to lead the nation in clean energy innovation, securing nearly 20% of all DOE SBIR awards. The ecosystem is bolstered by the <strong>California Energy Commission (CEC)</strong>, which often provides "bridge funding" to Phase I winners.
                    </p>
                    <h4 className="font-bold text-sm text-gray-900 mb-2">Key Innovation Clusters:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>San Francisco Bay Area:</strong> Epicenter for energy software, grid management AI, and advanced battery chemistries. Labs like LBNL provide critical partnership opportunities.</li>
                      <li><strong>Los Angeles & Irvine:</strong> Emerging strongholds for electric vehicle infrastructure and hydrogen fuel cell technologies, supported by major port logistics needs.</li>
                      <li><strong>San Diego:</strong> A leader in microgrid deployment and biotech-energy cross-over innovations (biofuels).</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-teal-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-teal-50">
                    <CardTitle className="text-teal-800 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Northeast Corridor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4">
                      The Northeast leverages its density of world-class universities (MIT, Harvard, Columbia) to drive deep-tech energy solutions. State programs like <strong>MassCEC</strong> offer robust supplemental grants for climate tech startups.
                    </p>
                    <h4 className="font-bold text-sm text-gray-900 mb-2">Key Innovation Clusters:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Boston/Cambridge:</strong> The global hub for fusion energy research and hard-tech climate solutions ("Tough Tech"), with heavy VC involvement.</li>
                      <li><strong>New York State:</strong> NYSERDA offers some of the country's most aggressive commercialization support for building efficiency and offshore wind technologies.</li>
                      <li><strong>Pennsylvania:</strong> Leveraging a history of materials science (Pittsburgh) to lead in carbon capture and industrial decarbonization.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-blue-800 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Texas & Southwest
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4">
                      Historically an oil and gas hub, this region is rapidly pivoting to become a "New Energy" capital, dominating in utility-scale renewables and carbon management.
                    </p>
                    <h4 className="font-bold text-sm text-gray-900 mb-2">Key Innovation Clusters:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Houston:</strong> Self-proclaimed "Energy Capital of the World," focusing heavily on hydrogen hubs, carbon sequestration (CCUS), and industrial heat electrification.</li>
                      <li><strong>Austin:</strong> A growing intersection of software and energy, focusing on grid modernization, distributed energy resources (DERs), and solar tech.</li>
                      <li><strong>Arizona & New Mexico:</strong> Solar photovoltaic innovation and advanced nuclear research (supported by Los Alamos and Sandia National Labs).</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-emerald-50">
                    <CardTitle className="text-emerald-800 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Midwest & Heartland
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4">
                      Defining the future of bio-energy and agricultural integration, the Midwest is crucial for biofuels and wind energy component manufacturing.
                    </p>
                    <h4 className="font-bold text-sm text-gray-900 mb-2">Key Innovation Clusters:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Chicago:</strong> Driven by Argonne National Lab, focusing on energy storage materials and quantum computing for energy applications.</li>
                      <li><strong>Detroit/Michigan:</strong> The heart of EV battery manufacturing innovation and vehicle-to-grid (V2G) connectivity standards.</li>
                      <li><strong>Kansas/Iowa:</strong> Centers of excellence for next-generation wind turbine technologies and ethanol/biodiesel optimization.</li>
                    </ul>
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
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase I Case Studies: Moving from Lab to Prototype</h4>
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-blue-800 text-lg">Case Study A: The Grid Storage Breakthrough</span>
                              <Badge className="bg-blue-200 text-blue-800 hover:bg-blue-300">Phase I: $200,000</Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-3"><strong>The Challenge:</strong> A San Francisco-based materials science startup developed a novel solid-state electrolyte but lacked data on its cycle life in real-world conditions.</p>
                            <p className="text-sm text-gray-700 mb-3"><strong>The Work:</strong> They used Phase I funding to build 50 coin cells and run continuous charge-discharge cycles for 6 months. They also performed safety testing to prove non-flammability.</p>
                            <p className="text-sm text-gray-700"><strong>The Outcome:</strong> Achieved 1000+ cycles with 95% capacity retention. This data was critical to winning a $1.5M Phase II award and raising a $4M Seed round.</p>
                          </div>

                          <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-green-800 text-lg">Case Study B: Perovskite Solar Scaling</span>
                              <Badge className="bg-green-200 text-green-800 hover:bg-green-300">Phase I: $195,000</Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-3"><strong>The Challenge:</strong> An Austin-based university spin-out had a record-breaking solar cell (28% efficiency) that was only the size of a fingernail. They needed to prove it could be printed on larger sheets.</p>
                            <p className="text-sm text-gray-700 mb-3"><strong>The Work:</strong> The grant funded the rental of slot-die coating equipment and the hiring of a process engineer. They focused entirely on manufacturing uniformity rather than efficiency gains.</p>
                            <p className="text-sm text-gray-700"><strong>The Outcome:</strong> Successfully printed a 6-inch square module with 24% efficiency. This "scalability proof" attracted a major glass manufacturer as a strategic partner.</p>
                          </div>

                          <div className="bg-teal-50 p-5 rounded-lg border border-teal-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-teal-800 text-lg">Case Study C: Direct Air Capture</span>
                              <Badge className="bg-teal-200 text-teal-800 hover:bg-teal-300">Phase I: $200,000</Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-3"><strong>The Challenge:</strong> A Boston startup hypothesized that a specific waste mineral could absorb CO2 from the air cheaply but had only simulated the reaction.</p>
                            <p className="text-sm text-gray-700 mb-3"><strong>The Work:</strong> Phase I funds built a "bench-scale" reactor (size of a microwave) to test the material against varying humidity and temperatures. They verified the CO2 uptake rate matched simulations.</p>
                            <p className="text-sm text-gray-700"><strong>The Outcome:</strong> Validated a capture cost of $100/tonne at scale. The published results helped them secure a DOE ARPA-E grant and Series A venture funding.</p>
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
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase II Case Studies: Scaling to Market</h4>
                        <div className="space-y-4 text-sm">
                          <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-green-800 text-lg">Case Study D: Advanced Wind Tech</span>
                              <Badge className="bg-green-200 text-green-800 hover:bg-green-300">Phase II: $1.5M + Series A</Badge>
                            </div>
                            <p className="text-gray-700 mb-3"><strong>The Pivot:</strong> A Colorado startup used Phase I to design a new sensor for wind turbine blades. In Phase II, they pivoted from selling sensors to selling a "service" where they monitored blades remotely.</p>
                            <p className="text-gray-700 mb-3"><strong>The Impact:</strong> The $1.5M Phase II grant covered the cost of deploying their sensors on 5 major wind farms for a free pilot. The data proved a 25% reduction in maintenance costs.</p>
                            <p className="text-gray-700"><strong>The Result:</strong> Armed with this pilot data, they raised an $8M Series A round led by a major energy utility's venture arm.</p>
                          </div>

                          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-blue-800 text-lg">Case Study E: Green Hydrogen</span>
                              <Badge className="bg-blue-200 text-blue-800 hover:bg-blue-300">Phase II: $1.85M Max Award</Badge>
                            </div>
                            <p className="text-gray-700 mb-3"><strong>The Tech:</strong> A Los Angeles team developed an electrolyzer that didn't require expensive iridium catalysts. Phase I proved it worked in a beaker.</p>
                            <p className="text-gray-700 mb-3"><strong>The Scale-Up:</strong> The $1.85M Phase II award allowed them to build a containerized 1-megawatt prototype. This unit was large enough to be tested by an ammonia fertilizer plant.</p>
                            <p className="text-gray-700"><strong>The Result:</strong> The pilot led to a commercial off-take agreement valued at $20M and put the company on a pre-IPO track.</p>
                          </div>

                          <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-purple-800 text-lg">Case Study F: Geothermal Drilling</span>
                              <Badge className="bg-purple-200 text-purple-800 hover:bg-purple-300">Phase II: $1.2M + Exit</Badge>
                            </div>
                            <p className="text-gray-700 mb-3"><strong>The Innovation:</strong> An Illinois startup invented a drill bit that used thermal spallation (intense heat) instead of mechanical grinding to bore through granite.</p>
                            <p className="text-gray-700"><strong>The Exit:</strong> The Phase II grant funded field trials in a granite quarry. The speed of drilling (4x faster than conventional) caught the eye of a major oilfield services company, which acquired the startup for $35M before Phase II was even fully complete.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Topic Areas */}
                {/* Topic Areas */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700 text-2xl">High-Priority Technology Themes (2026-2027)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-6 font-medium">Unlike general grant programs, DOE SBIR topics are highly specific. While the exact topics change with each Release, these core themes remain consistent priorities:</p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="flex items-center text-lg font-bold text-gray-900 mb-2">
                          <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                          Renewable Energy Integration
                        </h4>
                        <p className="text-gray-700 text-sm mb-2">
                          <strong>Solar:</strong> Moving beyond silicon. Big focus on perovskites, cadmium telluride (CdTe) thin films, and manufacturing techniques that reduce cost per watt. Also funding "soft costs" reduction like permitting software.
                        </p>
                        <p className="text-gray-700 text-sm">
                          <strong>Wind:</strong> Distributed wind assets (small turbines for rural use), offshore wind logistics optimization, and recyclable turbine blade materials.
                        </p>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="flex items-center text-lg font-bold text-gray-900 mb-2">
                          <Target className="w-5 h-5 text-red-500 mr-2" />
                          Carbon Management (FECM)
                        </h4>
                        <p className="text-gray-700 text-sm mb-2">
                          <strong>Point-Source Capture:</strong> Filtration systems for cement and steel plants. Funding prioritizes materials with lower energy regeneration penalties.
                        </p>
                        <p className="text-gray-700 text-sm">
                          <strong>Carbon Dioxide Removal (CDR):</strong> Direct Air Capture (DAC) and biomass carbon removal and storage (BiCRS). Key metric: Scale potential to gigaton levels.
                        </p>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="flex items-center text-lg font-bold text-gray-900 mb-2">
                          <Building className="w-5 h-5 text-green-500 mr-2" />
                          Building Decarbonization
                        </h4>
                        <p className="text-gray-700 text-sm mb-2">
                          <strong>Heating & Cooling:</strong> Cold-climate heat pumps are a massive priority. Innovations that allow heat pumps to work efficiently at -20°F without backup electric resistance heat.
                        </p>
                        <p className="text-gray-700 text-sm">
                          <strong>Envelope:</strong> Advanced insulation materials (aerogels), automated retrofit robots (e.g., robots that spray foam under floorboards), and smart windows.
                        </p>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="flex items-center text-lg font-bold text-gray-900 mb-2">
                          <Lightbulb className="w-5 h-5 text-purple-500 mr-2" />
                          Fusion & Nuclear
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Often overlooked by typical startups, the Office of Nuclear Energy funds advanced manufacturing for Small Modular Reactors (SMRs). The Fusion Energy Sciences program funds enabling technologies like high-temperature superconducting magnets and advanced plasma control software.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The DOE 5-Step Registration Gauntlet</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
                <p className="text-amber-800">
                  <strong>CRITICAL WARNING:</strong> Registration can take up to 6 weeks. You cannot submit if these steps are incomplete. Do not wait until the deadline week.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">1</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">SAM.gov (System for Award Management)</h4>
                    <p className="text-gray-700"><strong>Time: 2-4 Weeks.</strong> This is the bottleneck. You need a Unique Entity ID (UEI) and CAGE code. It requires validating your physical address, which often triggers manual reviews. Start this immediately.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">2</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Grants.gov</h4>
                    <p className="text-gray-700"><strong>Time: 1-2 Days.</strong> This is where you submit the actual application package. It links to your SAM.gov account.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">3</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">PAMS (Portfolio Analysis and Management System)</h4>
                    <p className="text-gray-700"><strong>Time: 1 Day.</strong> Unique to DOE. You must submit your "Letter of Intent" (LOI) here first. If you miss the LOI deadline in PAMS, you cannot submit a full application in Grants.gov.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">4</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">FedConnect.net</h4>
                    <p className="text-gray-700"><strong>Time: 1 Day.</strong> This is where the DOE communicates awards and contracts. You need to link this to your SAM account to receive the actual grant document.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">5</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">SBIR.gov</h4>
                    <p className="text-gray-700"><strong>Time: 1 Hour.</strong> The Small Business Administration's registry. You simply need to register your company and get an SBC Control ID to paste into your application forms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The DOE 5-Step Registration Gauntlet</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
                <p className="text-amber-800">
                  <strong>CRITICAL WARNING:</strong> Registration can take up to 6 weeks. You cannot submit if these steps are incomplete. Do not wait until the deadline week.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">1</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">SAM.gov (System for Award Management)</h4>
                    <p className="text-gray-700"><strong>Time: 2-4 Weeks.</strong> This is the bottleneck. You need a Unique Entity ID (UEI) and CAGE code. It requires validating your physical address, which often triggers manual reviews. Start this immediately.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">2</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Grants.gov</h4>
                    <p className="text-gray-700"><strong>Time: 1-2 Days.</strong> This is where you submit the actual application package. It links to your SAM.gov account.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">3</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">PAMS (Portfolio Analysis and Management System)</h4>
                    <p className="text-gray-700"><strong>Time: 1 Day.</strong> Unique to DOE. You must submit your "Letter of Intent" (LOI) here first. If you miss the LOI deadline in PAMS, you cannot submit a full application in Grants.gov.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">4</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">FedConnect.net</h4>
                    <p className="text-gray-700"><strong>Time: 1 Day.</strong> This is where the DOE communicates awards and contracts. You need to link this to your SAM account to receive the actual grant document.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">5</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">SBIR.gov</h4>
                    <p className="text-gray-700"><strong>Time: 1 Hour.</strong> The Small Business Administration's registry. You simply need to register your company and get an SBC Control ID to paste into your application forms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The DOE 5-Step Registration Gauntlet</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
                <p className="text-amber-800">
                  <strong>CRITICAL WARNING:</strong> Registration can take up to 6 weeks. You cannot submit if these steps are incomplete. Do not wait until the deadline week.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">1</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">SAM.gov (System for Award Management)</h4>
                    <p className="text-gray-700"><strong>Time: 2-4 Weeks.</strong> This is the bottleneck. You need a Unique Entity ID (UEI) and CAGE code. It requires validating your physical address, which often triggers manual reviews. Start this immediately.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">2</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Grants.gov</h4>
                    <p className="text-gray-700"><strong>Time: 1-2 Days.</strong> This is where you submit the actual application package. It links to your SAM.gov account.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">3</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">PAMS (Portfolio Analysis and Management System)</h4>
                    <p className="text-gray-700"><strong>Time: 1 Day.</strong> Unique to DOE. One-time registration. You must submit your "Letter of Intent" (LOI) here first. If you miss the LOI deadline in PAMS, you cannot submit a full application in Grants.gov.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">4</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">FedConnect.net</h4>
                    <p className="text-gray-700"><strong>Time: 1 Day.</strong> This is where the DOE communicates awards and contracts. You need to link this to your SAM account to receive the actual grant document.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">5</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">SBIR.gov</h4>
                    <p className="text-gray-700"><strong>Time: 1 Hour.</strong> The Small Business Administration's registry. You simply need to register your company and get an SBC Control ID to paste into your application forms.</p>
                  </div>
                </div>
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

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Anatomy of a Perfect DOE Proposal</h3>
                <p className="text-gray-700 text-center mb-8 max-w-3xl mx-auto">Scoring highly requires more than just good technology. You must structure your narrative to hit every review criteria. Here is the blueprint winning applicants use:</p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-3">1</div>
                      <h4 className="font-bold text-gray-900">The "Impact" Hook (Page 1)</h4>
                    </div>
                    <p className="text-sm text-gray-600"><strong>Don't start with:</strong> "We are developing a Lithium-Sulfur battery."</p>
                    <p className="text-sm text-gray-900 mt-2"><strong>Start with:</strong> "Grid storage needs to cost $50/kWh to replace coal. Current Li-ion costs $130/kWh. Our Li-S architecture achieves $45/kWh, unlocking 500GW of storage potential."</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-3">2</div>
                      <h4 className="font-bold text-gray-900">The Technical "Secret Sauce"</h4>
                    </div>
                    <p className="text-sm text-gray-600"><strong>The Reviewer asks:</strong> "Why hasn't this been done before?"</p>
                    <p className="text-sm text-gray-900 mt-2"><strong>Your Answer:</strong> "Competitors failed because sulfur expands 80% during charging, cracking the cathode. We solved this with a proprietary polymer binder that stretches, maintaining contact for 1000+ cycles."</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-3">3</div>
                      <h4 className="font-bold text-gray-900">The Commercialization Path</h4>
                    </div>
                    <p className="text-sm text-gray-600"><strong>The Trap:</strong> "We will sell batteries to everyone."</p>
                    <p className="text-sm text-gray-900 mt-2"><strong>The Strategy:</strong> "We will enter the beachhead market of heavy-duty drones first (where weight is critical). Then, scaled manufacturing will lower costs to penetrate the EV market by Year 4."</p>
                  </div>
                </div>
              </div>

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

        {/* Related SBIR Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Explore Other SBIR Programs</h2>
              <p className="text-gray-700 mb-6">DOE is one of 11 agencies offering SBIR/STTR funding. Explore sector-specific guides:</p>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/blog/sbir-sttr-complete-guide" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">SBIR/STTR Overview</h3>
                  <p className="text-sm text-gray-600">Full program guide →</p>
                </Link>
                <Link href="/blog/dod-sbir-defense-tech-grants" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">DoD SBIR</h3>
                  <p className="text-sm text-gray-600">Defense tech →</p>
                </Link>
                <Link href="/blog/nasa-sbir-space-tech-grants" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">NASA SBIR</h3>
                  <p className="text-sm text-gray-600">Space technology →</p>
                </Link>
                <Link href="/blog/nih-sbir-biotech-grants" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">NIH SBIR</h3>
                  <p className="text-sm text-gray-600">Biotech &amp; health →</p>
                </Link>
                <Link href="/blog/nsf-sbir-grants-technology-startups" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">NSF SBIR</h3>
                  <p className="text-sm text-gray-600">Deep tech →</p>
                </Link>
                <Link href="/blog/usda-sbir-agtech-grants" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">USDA SBIR</h3>
                  <p className="text-sm text-gray-600">AgTech &amp; food →</p>
                </Link>
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
