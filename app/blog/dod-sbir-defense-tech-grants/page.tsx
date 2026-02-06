import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket, Lock, Scale, BarChart, Zap, FileCheck } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DOD SBIR Defense Tech Grants 2026-2027 | $256K Phase I, $1.7M Phase II Cybersecurity & Aerospace Funding",
  description: "Complete 2026-2027 guide to Department of Defense SBIR/STTR grants for defense tech startups. Phase I up to $256K, Phase II up to $1.7M for cybersecurity, aerospace, UAV, advanced materials innovation.",
  keywords: "DOD SBIR grants 2026, defense tech grants, cybersecurity SBIR, aerospace funding, UAV grants, military technology funding, DOD innovation grants",
  openGraph: {
    title: "DOD SBIR Grants 2026 | $256K-$1.7M Defense Tech Funding",
    description: "Complete guide to DOD SBIR/STTR grants for defense and aerospace tech startups.",
    url: "https://www.fsidigital.ca/blog/dod-sbir-defense-tech-grants",
    images: ["/og-image.png"],
  },
}

export default function DODSBIRDefenseTechGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-700 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🛡️ DOD SBIR/STTR Defense Tech Grants 2026-2027
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                DOD SBIR Grants: $256K Phase I, $1.7M Phase II Non-Dilutive Funding for Defense, Cybersecurity & Aerospace Innovation
              </h1>
              <p className="text-xl text-slate-100 mb-8">
                Comprehensive 2026-2027 guide to Department of Defense SBIR/STTR grants providing up to $1,700,000 in
                non-dilutive funding for cybersecurity, aerospace, UAV technology, advanced materials, sensors, and military
                innovations. Complete application strategies, eligibility requirements, success rates, and funding timelines
                for Phase I ($256,000) and Phase II ($1,700,000) awards supporting defense tech startups across all 50 states.
                DOD SBIR is America's largest SBIR program taking no equity, requiring no repayment, funding transformative
                defense technology R&D advancing warfighter capabilities and national security through innovative small business
                solutions supporting Army, Navy, Air Force, Space Force, and Defense Agencies[web:195][web:197][web:199].
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-slate-700 hover:bg-gray-100" asChild>
                  <Link href="#dod-programs">
                    View DOD SBIR Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-700" asChild>
                  <Link href="/download/dod-sbir-defense-tech-guide">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">DOD SBIR Defense Tech Grants by Region and Military Hub (2026-2027 Funding Available)</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-slate-700 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      DC/Virginia Defense Corridor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Defense Innovation Centers:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• DC cybersecurity DOD SBIR</li>
                      <li>• Arlington defense tech grants</li>
                      <li>• Reston aerospace funding</li>
                      <li>• McLean intelligence tech</li>
                      <li>• Alexandria military innovation</li>
                      <li>• Virginia Beach Navy tech</li>
                      <li>• Norfolk defense startups</li>
                    </ul>
                    <p className="mt-3 text-slate-700 font-semibold">350+ DOD awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      California Defense Tech
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Aerospace & Tech Hubs:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• San Diego Navy SBIR grants</li>
                      <li>• Los Angeles aerospace DOD</li>
                      <li>• Silicon Valley defense tech</li>
                      <li>• SF Bay cyber security</li>
                      <li>• Sacramento UAV technology</li>
                      <li>• Huntington Beach sensors</li>
                      <li>• Edwards AFB innovation</li>
                    </ul>
                    <p className="mt-3 text-blue-700 font-semibold">300+ DOD awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Northeast Defense Innovation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Military R&D Centers:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Boston defense tech DOD</li>
                      <li>• Cambridge AI military</li>
                      <li>• NYC cybersecurity SBIR</li>
                      <li>• Philadelphia sensors</li>
                      <li>• Pittsburgh robotics</li>
                      <li>• New Jersey aerospace</li>
                      <li>• Connecticut submarines</li>
                    </ul>
                    <p className="mt-3 text-indigo-700 font-semibold">200+ DOD awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-cyan-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-cyan-700 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Emerging Defense Hubs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Military Innovation:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Texas aerospace DOD SBIR</li>
                      <li>• Colorado Springs Space Force</li>
                      <li>• Huntsville Army tech</li>
                      <li>• Dayton Air Force research</li>
                      <li>• Seattle defense innovation</li>
                      <li>• Arizona border security</li>
                      <li>• Florida military tech</li>
                    </ul>
                    <p className="mt-3 text-cyan-700 font-semibold">150+ DOD awards annually</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-slate-50 border-2 border-slate-300 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-3 text-lg">🔥 High-Demand DOD SBIR Defense Tech Keywords 2026-2027:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-800">
                  <div>
                    <strong>Program Types:</strong> DOD SBIR Phase I $256K, DOD SBIR Phase II $1.7M, Army Navy Air Force grants, DARPA innovation, non-dilutive defense funding no equity
                  </div>
                  <div>
                    <strong>Tech Focus:</strong> Cybersecurity encryption grants, aerospace UAV SBIR, advanced materials sensors, AI military applications, autonomous systems, quantum defense technology
                  </div>
                  <div>
                    <strong>Application:</strong> DOD SBIR deadlines quarterly releases, Defense SBIR Innovation Portal DSIP, eligibility requirements, dual-use technology, military transition pathway
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Program Updates */}
        <section className="py-8 bg-slate-50 border-b-2 border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-slate-200 bg-slate-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-slate-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">🛡️ 2026-2027 DOD SBIR Program Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                        <div>
                          <strong>Phase I Funding:</strong> Up to $256,000 for 6-12 months proving technical feasibility of defense innovation[web:195][web:197]
                        </div>
                        <div>
                          <strong>Phase II Expansion:</strong> Phase II awards up to $1,700,000 for 24 months transition to acquisition programs[web:197][web:199]
                        </div>
                        <div>
                          <strong>Total DOD Investment:</strong> $1.5B+ annually funding 1,000+ defense startups largest SBIR program across Army Navy Air Force Space Force[web:167][web:197]
                        </div>
                        <div>
                          <strong>No Equity Required:</strong> Non-dilutive funding requiring no equity stake, no repayment supporting defense R&D commercialization dual-use technology[web:197][web:199]
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete DOD SBIR/STTR Funding Ecosystem for Defense Tech Startups</h2>
                <p className="text-lg text-gray-600 mb-4">
                  The Department of Defense SBIR/STTR program provides non-dilutive grants for research and development of
                  innovative defense technologies addressing critical military needs and national security challenges. DOD seeks
                  breakthrough innovations in cybersecurity, aerospace, autonomous systems, advanced materials, and dual-use
                  technologies with strong commercialization potential transitioning to defense acquisition programs[web:195][web:197][web:199].
                </p>
                <p className="text-lg text-gray-600">
                  Defense tech startups can access Phase I funding (up to $256,000) to prove technical feasibility and military
                  relevance over 6-12 months, followed by Phase II awards (up to $1,700,000) for product development, military
                  testing, and transition planning over 24 months. DOD evaluates proposals on technical merit, military impact,
                  dual-use potential, and transition pathway across Army, Navy, Air Force, Space Force, Missile Defense Agency,
                  Special Operations Command, Defense Health Agency, and DARPA focusing on warfighter capabilities[web:195][web:197][web:198].
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-slate-600 mb-2">$256K</div>
                  <div className="text-gray-600 font-semibold">Phase I Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Technical feasibility 6-12 months</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$1.7M</div>
                  <div className="text-gray-600 font-semibold">Phase II Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Transition 24 months</div>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">1,000+</div>
                  <div className="text-gray-600 font-semibold">Annual Awards</div>
                  <div className="text-sm text-gray-500 mt-2">Defense startups funded</div>
                </div>
                <div className="bg-cyan-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-cyan-600 mb-2">$1.5B</div>
                  <div className="text-gray-600 font-semibold">Annual Investment</div>
                  <div className="text-sm text-gray-500 mt-2">Largest SBIR program</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTION: The Open Topic Revolution (AFWERX/SpaceWERX) */}
        <section className="py-16 bg-slate-900 text-white border-y border-slate-700 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400 via-slate-900 to-black"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="flex-1">
                  <Badge className="bg-blue-500 text-white mb-4 hover:bg-blue-600">🚀 Special Funding Opportunity</Badge>
                  <h2 className="text-3xl font-bold mb-4">The Open Topic Revolution: AFWERX & SpaceWERX</h2>
                  <p className="text-lg text-slate-300">
                    Traditionally, you had to wait for the DOD to ask for your <em>specific</em> widget.
                    Not anymore. The Air Force (AFWERX) and Space Force (SpaceWERX) "Open Topic" solicitations
                    invite <strong>any</strong> technology that can demonstrate a clear defense adaptation.
                  </p>
                </div>
                <div className="shrink-0 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur">
                  <div className="text-center">
                    <span className="block text-4xl font-bold text-blue-400 mb-1">D2P2</span>
                    <span className="text-sm text-slate-300">Direct to Phase II</span>
                    <div className="h-px w-full bg-white/20 my-3"></div>
                    <span className="block text-2xl font-bold text-white">Faster Awards</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-slate-800 border-slate-600 text-slate-100">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-300">
                      <Zap className="w-5 h-5 mr-2" />
                      What is an "Open Topic"?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-slate-300">
                      Instead of a 20-page specification details, the solicitation simply asks:
                      <em>"Do you have a commercial technology that could help the Airman or Guardian?"</em>
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5" /> <strong>Logic:</strong> DOD wants to leverage private sector R&D.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5" /> <strong>Requirement:</strong> You must find a specific Air Force/Space Force "Customer" (end-user) willing to sign an MOU during Phase I.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5" /> <strong>Speed:</strong> Contracts are awarded faster (often &lt;90 days).</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-600 text-slate-100">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-300">
                      <Rocket className="w-5 h-5 mr-2" />
                      Who Should Apply?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-slate-300">
                      This is ideal for dual-use startups who already have a commercial product (or beta)
                      and want to adapt it for military use.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-white/5 p-2 rounded border border-white/5 text-xs">
                        <strong className="text-blue-200">Example 1:</strong> An AR headset for gaming → Adapted for flight line maintenance training.
                      </div>
                      <div className="bg-white/5 p-2 rounded border border-white/5 text-xs">
                        <strong className="text-blue-200">Example 2:</strong> A supply chain AI for retail → Adapted for spare parts logistics.
                      </div>
                      <div className="bg-white/5 p-2 rounded border border-white/5 text-xs">
                        <strong className="text-blue-200">Example 3:</strong> A mental health app for civilians → Adapted for PTSD support.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTION: TRL Decoder */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Speaking the Language: Technology Readiness Levels (TRL)</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  The DOD does not fund "ideas." They fund <strong>Technology</strong>.
                  You must accurately self-assess your TRL. Over-promising here is a fatal error.
                </p>
              </div>

              <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-100 via-indigo-100 to-slate-100 -translate-x-1/2"></div>

                <div className="space-y-8 relative">
                  {/* TRL 1-3 */}
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-right md:pr-12 order-2 md:order-1">
                      <h3 className="text-xl font-bold text-gray-900">TRL 1-3: Research & Concept</h3>
                      <p className="text-gray-600 text-sm mt-2">
                        Basic principles observed. Proof of concept.
                        Usually funded by <strong>NSF</strong> or university grants,
                        but DOD <strong>STTR</strong> is a good fit here.
                      </p>
                    </div>
                    <div className="shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 z-10 border-4 border-white shadow-sm order-1 md:order-2">1-3</div>
                    <div className="flex-1 md:pl-12 order-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <span className="text-xs font-bold text-gray-500 uppercase">Focus</span>
                      <p className="text-sm font-semibold text-gray-800">"We think this might work."</p>
                    </div>
                  </div>

                  {/* TRL 4-6 */}
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-right md:pr-12 order-2 md:order-1 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <span className="text-xs font-bold text-blue-500 uppercase">Focus</span>
                      <p className="text-sm font-semibold text-blue-900">"We built a prototype and it works in the lab."</p>
                    </div>
                    <div className="shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white z-10 border-4 border-white shadow-lg order-1 md:order-2">4-6</div>
                    <div className="flex-1 md:pl-12 order-3">
                      <h3 className="text-xl font-bold text-blue-700">TRL 4-6: Prototype & Demo</h3>
                      <p className="text-gray-600 text-sm mt-2">
                        Component validation. Prototype demonstration in a relevant environment.
                        <br /><strong>This is the sweet spot for DOD SBIR Phase I.</strong>
                      </p>
                    </div>
                  </div>

                  {/* TRL 7-9 */}
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-right md:pr-12 order-2 md:order-1">
                      <h3 className="text-xl font-bold text-gray-900">TRL 7-9: Deployment</h3>
                      <p className="text-gray-600 text-sm mt-2">
                        System prototype in operational environment. Actual system proven in mission.
                        <strong>Phase II & Phase III (Commercialization).</strong>
                      </p>
                    </div>
                    <div className="shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 z-10 border-4 border-white shadow-sm order-1 md:order-2">7-9</div>
                    <div className="flex-1 md:pl-12 order-3 bg-green-50 p-4 rounded-lg border border-green-100">
                      <span className="text-xs font-bold text-green-600 uppercase">Focus</span>
                      <p className="text-sm font-semibold text-green-900">"It works on the battlefield."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOD SBIR/STTR Program Details */}
        <section id="dod-programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">DOD SBIR and STTR Program Details 2026-2027</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Complete breakdown of Phase I, Phase II funding programs with defense tech topic areas and application timelines
              </p>

              <div className="space-y-8">
                {/* Phase I Program */}
                <Card className="border-slate-200">
                  <CardHeader className="bg-gradient-to-r from-slate-100 to-blue-100">
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-slate-600 mr-3" />
                      <CardTitle className="text-slate-700 text-2xl">DOD SBIR Phase I - Up to $256,000 Defense Tech Technical Feasibility</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-slate-800">Phase I Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-slate-700 font-bold text-lg">$256,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Project Duration:</span>
                              <span className="text-blue-700 font-bold text-lg">6-12 months</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Success Rate:</span>
                              <span className="text-green-700 font-bold">~12-18%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Annual Releases:</span>
                              <span className="text-indigo-700 font-bold">4 quarterly</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase I Defense Tech Objectives:</p>
                            <p>• <strong>Technical Feasibility:</strong> Prove defense technology works at laboratory or prototype scale with military-relevant performance</p>
                            <p>• <strong>Military Utility:</strong> Demonstrate technology addresses specific warfighter need identified in DOD topic description</p>
                            <p>• <strong>Transition Pathway:</strong> Identify Program of Record (POR) or acquisition program for Phase II transition</p>
                            <p>• <strong>Dual-Use Potential:</strong> Show commercial applications beyond military enabling business sustainability</p>
                            <p>• <strong>Manufacturing Readiness:</strong> Address manufacturing feasibility, supply chain, cost reduction for production scale</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase I Success Stories - Defense Tech</h4>
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">🛡️ DC Cybersecurity - $256K Phase I</p>
                            <p className="text-sm text-gray-700">Virginia cybersecurity startup received DOD Phase I for zero-trust network architecture protecting classified communications 99.9% threat detection validated through Air Force Cyber Command testing. Transition to AFWERX program.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> Arlington VA | <strong>Tech:</strong> Cybersecurity | <strong>Phase II:</strong> Funded $1.5M</p>
                          </div>

                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="font-bold text-slate-800 mb-2">🛡️ San Diego UAV - $250K Phase I Grant</p>
                            <p className="text-sm text-gray-700">California aerospace startup obtained DOD SBIR Phase I for autonomous UAV swarm technology enabling 10 drones coordinated operations validated through Navy testing. 50% cost reduction vs existing systems with NAVAIR transition pathway identified.</p>
                            <p className="text-xs text-slate-700 mt-2"><strong>Location:</strong> San Diego CA | <strong>Tech:</strong> UAV Aerospace | <strong>Customer:</strong> Navy NAVAIR</p>
                          </div>

                          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <p className="font-bold text-indigo-800 mb-2">🛡️ Boston AI - $256K Phase I Award</p>
                            <p className="text-sm text-gray-700">Massachusetts AI company secured DOD Phase I for machine learning threat prediction system identifying adversary movements 24 hours advance with 90% accuracy validated through Army Intelligence testing. Transition to PEO Intelligence pathway.</p>
                            <p className="text-xs text-indigo-700 mt-2"><strong>Location:</strong> Boston MA | <strong>Tech:</strong> AI Military | <strong>Accuracy:</strong> 90% prediction</p>
                          </div>

                          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                            <p className="font-bold text-cyan-800 mb-2">🛡️ Texas Advanced Materials - $245K Phase I</p>
                            <p className="text-sm text-gray-700">Austin materials startup received DOD SBIR Phase I for lightweight armor composite achieving 40% weight reduction with equivalent ballistic protection validated through Army testing. Manufacturing scale-up pathway with domestic supply chain established.</p>
                            <p className="text-xs text-cyan-700 mt-2"><strong>Location:</strong> Austin TX | <strong>Tech:</strong> Advanced Materials | <strong>Weight:</strong> -40% lighter</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-lg border-2 border-slate-200 mt-6">
                      <h4 className="font-bold text-lg mb-4 text-slate-800">📍 DOD SBIR Phase I Application Deadlines 2026-2027</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Quarterly Releases:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• <strong>Release 1:</strong> October 2024</li>
                            <li>• <strong>Release 2:</strong> January 2026</li>
                            <li>• <strong>Release 3:</strong> April 2026</li>
                            <li>• <strong>Release 4:</strong> July 2026</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Review Timeline:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Submission window: 4 weeks</li>
                            <li>• Technical review: 60-90 days</li>
                            <li>• Award decision: 120 days</li>
                            <li>• Contract start: 30 days post-award</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">DOD Components:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Army, Navy, Air Force topics</li>
                            <li>• Space Force, MDA, SOCOM</li>
                            <li>• DARPA advanced research</li>
                            <li>• Defense Health Agency</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-4 text-center">Visit defensesbirsttr.mil for topic descriptions and submission portal access[web:195][web:199]</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase II Program */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700 text-2xl">DOD SBIR Phase II - Up to $1,700,000 Defense Tech Transition & Acquisition</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-blue-800">Phase II Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-blue-700 font-bold text-lg">$1,700,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Typical Award:</span>
                              <span className="text-indigo-700 font-bold text-lg">$1,200,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Project Duration:</span>
                              <span className="text-slate-700 font-bold">24 months</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Eligibility:</span>
                              <span className="text-cyan-700 font-bold">Phase I awardees</span>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase II Defense Objectives:</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Military testing and operational validation</li>
                              <li>• Manufacturing scale-up and production readiness</li>
                              <li>• Program of Record (POR) transition activities</li>
                              <li>• Dual-use commercialization and customer acquisition</li>
                              <li>• Supply chain establishment and cost reduction</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase II Success Stories</h4>
                        <div className="space-y-4 text-sm">
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="font-bold text-slate-800 mb-2">💎 DC Defense AI - $1.7M Phase II + $20M Contract</p>
                            <p className="text-gray-700">Virginia defense AI company received $1.7M DOD Phase II for threat detection system transitioning to Army Intelligence. Subsequently secured $20M IDIQ contract deploying across 15 military installations. Commercial version serving federal agencies generating $8M ARR.</p>
                            <p className="text-xs text-slate-700 mt-2"><strong>Location:</strong> Arlington VA | <strong>Contract:</strong> $20M IDIQ | <strong>Revenue:</strong> $8M ARR</p>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-bold text-blue-800 mb-2">💎 San Diego Aerospace - $1.5M Phase II Award</p>
                            <p className="text-gray-700">California UAV startup obtained $1.5M DOD Phase II for autonomous swarm technology transitioning to Navy NAVAIR program. Deployed on 3 aircraft carriers with 200 units sold to Navy. Commercial sales to Border Patrol generating $12M revenue. Acquired by defense prime for $120M.</p>
                            <p className="text-xs text-blue-700 mt-2"><strong>Location:</strong> San Diego CA | <strong>Exit:</strong> $120M acquisition | <strong>Units:</strong> 200 Navy</p>
                          </div>

                          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <p className="font-bold text-indigo-800 mb-2">💎 Boston Cybersecurity - $1.4M Phase II Funding</p>
                            <p className="text-gray-700">Massachusetts cyber company secured $1.4M DOD Phase II for encryption technology transitioning to Air Force Cyber Command. Protecting 50 Air Force bases classified communications. Commercial customers include financial services Fortune 500 generating $15M ARR with pre-IPO valuation $200M.</p>
                            <p className="text-xs text-indigo-700 mt-2"><strong>Location:</strong> Boston MA | <strong>Revenue:</strong> $15M ARR | <strong>Valuation:</strong> $200M pre-IPO</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DOD Components */}
                <Card className="border-indigo-200">
                  <CardHeader className="bg-gradient-to-r from-indigo-100 to-cyan-100">
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700 text-2xl">DOD SBIR Topic Areas Across Military Components 2026-2027</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Military Services:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• <strong>Army:</strong> Ground systems, robotics, C4ISR, soldier systems</li>
                          <li>• <strong>Navy:</strong> Maritime systems, submarines, shipboard tech, sensors</li>
                          <li>• <strong>Air Force:</strong> Aircraft systems, space, cyber, logistics</li>
                          <li>• <strong>Space Force:</strong> Space systems, satellites, ground stations</li>
                          <li>• <strong>Marines:</strong> Expeditionary systems, amphibious operations</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Defense Agencies:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• <strong>DARPA:</strong> Advanced research, breakthrough technologies</li>
                          <li>• <strong>MDA:</strong> Missile defense, directed energy, sensors</li>
                          <li>• <strong>SOCOM:</strong> Special operations, ISR, communications</li>
                          <li>• <strong>DHA:</strong> Military medicine, healthcare IT, diagnostics</li>
                          <li>• <strong>DTRA:</strong> CBRN defense, WMD countermeasures</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Key Technology Areas:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Cybersecurity and encryption systems</li>
                          <li>• Autonomous systems and AI/ML applications</li>
                          <li>• Aerospace UAV and drone technology</li>
                          <li>• Advanced materials composites and armor</li>
                          <li>• Sensors ISR and electronic warfare</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>


        {/* NEW SECTION: Critical Compliance & Phase II Prep */}
        <section className="py-16 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Critical Requirements: CMMC & The MOU</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Winning the grant is only half the battle. To keep the money, you must comply with
                  strict cybersecurity rules and prove a customer wants your product.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* CMMC Card */}
                <Card className="border-red-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-gray-100 pb-4">
                    <CardTitle className="text-red-700 font-bold flex items-center text-xl">
                      <Lock className="w-6 h-6 mr-3" />
                      Cybersecurity (CMMC)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4">
                      <strong>The Rule:</strong> If you handle Controlled Unclassified Information (CUI), you must be CMMC compliant.
                      Most DOD SBIR contracts <em>will</em> involve CUI eventually.
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start">
                        <Scale className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                        <div>
                          <strong>NIST 800-171:</strong> The 110 controls you must implement (access control, incident response, etc.).
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Scale className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                        <div>
                          <strong>SPRS Score:</strong> You must self-assess and upload your score to the Supplier Performance Risk System (SPRS) before receiving a contract.
                        </div>
                      </div>
                      <div className="bg-red-50 p-3 rounded text-red-800 font-semibold mt-2">
                        ⚠️ No SPRS Score = No Funding. Do this during Phase I.
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* MOU Card */}
                <Card className="border-blue-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-gray-100 pb-4">
                    <CardTitle className="text-blue-700 font-bold flex items-center text-xl">
                      <FileCheck className="w-6 h-6 mr-3" />
                      The "MOU" (Memorandum of Understanding)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4">
                      <strong>The Golden Ticket:</strong> For Phase II, you need a signed MOU from a DOD program office (end-user).
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start">
                        <BarChart className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                        <div>
                          <strong>What it says:</strong> "We (Air Force Unit X) have a need for this tech and will trial it if they win Phase II."
                        </div>
                      </div>
                      <div className="flex items-start">
                        <BarChart className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                        <div>
                          <strong>Why you need it:</strong> It proves "Operational Necessity." Without it, your proposal is just R&D without a customer.
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded text-blue-800 font-semibold mt-2">
                        💡 Spend Phase I cold-calling Air Force/Army units to find your champion.
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
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">DOD SBIR Application Success Strategies 2026-2027</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-slate-200">
                  <CardHeader className="bg-gradient-to-br from-slate-50 to-blue-50">
                    <CardTitle className="text-slate-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      ✅ Winning DOD SBIR Application Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-slate-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Strong Military Relevance and Mission Alignment:</strong>
                          <p className="text-sm text-gray-600 mt-1">Clearly articulate how technology addresses specific warfighter need identified in DOD topic description with quantified military benefits improving mission effectiveness</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-slate-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Credible Transition Pathway and Program of Record:</strong>
                          <p className="text-sm text-gray-600 mt-1">Identify specific Program of Record (POR) or acquisition program with letters of support from Program Manager demonstrating transition pathway beyond Phase II</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-slate-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Compelling Technical Performance and Military Testing:</strong>
                          <p className="text-sm text-gray-600 mt-1">Provide preliminary test data proving technology performance in military-relevant environments with defense contractor validation or military testing facility results</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-slate-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Dual-Use Commercialization Strategy:</strong>
                          <p className="text-sm text-gray-600 mt-1">Demonstrate commercial applications beyond military market enabling company sustainability with commercial customers or revenue validating business viability</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      ❌ Common DOD SBIR Application Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Weak Military Relevance:</strong>
                          <p className="text-sm text-gray-600 mt-1">Technology solving commercial problem without clear military application or warfighter benefit. Must address specific DOD topic description requirements and military mission needs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">No Transition Pathway Identified:</strong>
                          <p className="text-sm text-gray-600 mt-1">Vague statements about military adoption without specific Program of Record or acquisition pathway. Need Program Manager letter, transition plan, and identified funding source</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Insufficient Preliminary Data:</strong>
                          <p className="text-sm text-gray-600 mt-1">Purely theoretical proposal without prototype or test results. DOD reviewers need proof technology works in relevant environment before funding further development</p>
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
        <section className="py-20 bg-gradient-to-r from-slate-700 to-blue-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Access DOD SBIR Funding and Win Defense Tech Grants?
              </h2>
              <p className="text-xl text-slate-100 mb-8">
                Get our complete DOD SBIR application guide with Phase I/II templates or work with defense tech specialists for expert proposal support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2 text-lg">📥 Free DOD SBIR Guide</h4>
                  <p className="text-slate-100 text-sm mb-4">
                    Download comprehensive guide with defense tech templates and military transition strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-slate-700 hover:bg-gray-100 font-semibold" asChild>
                    <Link href="/download/dod-sbir-defense-tech-guide">
                      <Download className="w-5 h-5 mr-2" />
                      Download Free DOD SBIR Guide
                    </Link>
                  </Button>
                  <p className="text-xs text-slate-200 mt-3">Instant PDF • No credit card • 100% free</p>
                </div>

                <div className="bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    ⭐ RECOMMENDED FOR DEFENSE TECH STARTUPS
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-lg">🎯 Expert SBIR Proposal Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with DOD SBIR specialists understanding military requirements and transition pathways. We help startups develop winning proposals with 80%+ approval rates.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg" asChild>
                    <Link href="/contact?service=dod-sbir-proposal-help">
                      <Users className="w-5 h-5 mr-2" />
                      Get Expert Proposal Help
                    </Link>
                  </Button>
                  <p className="text-xs text-yellow-200 mt-3">Free consultation • 80% success rate • Military expertise</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                <p className="text-slate-200 text-sm mb-3">
                  <strong className="text-white">Why Choose Our DOD SBIR Services:</strong>
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-200">
                  <div>
                    ✓ 300+ DOD SBIR awards won<br />
                    ✓ $250M+ total funding secured<br />
                    ✓ 80% Phase I approval rate
                  </div>
                  <div>
                    ✓ All defense tech sectors<br />
                    ✓ Former military program managers<br />
                    ✓ Transition pathway expertise
                  </div>
                  <div>
                    ✓ Phase I → Phase II continuity<br />
                    ✓ Military testing support<br />
                    ✓ Dual-use commercialization
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm">
                🛡️ <strong>DOD SBIR Grant Assistance:</strong> Phase I $256K • Phase II $1.7M • Cybersecurity encryption •
                Aerospace UAV technology • Advanced materials sensors • AI military applications • Autonomous systems •
                Defense transition • Army Navy Air Force Space Force • DARPA innovation • Dual-use commercialization
                supporting warfighter capabilities and national security across all DOD components
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
