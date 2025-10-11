import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket, ArrowRight, Zap, Sun, Wind, Battery, Leaf, Droplet } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Clean Tech & Energy Grants 2025-2026 | $200K DOE SBIR, $1.6M Phase II, EPA Environmental Tech Non-Dilutive Funding",
  description: "Complete 2025-2026 guide to clean tech and energy grants. DOE SBIR Phase I $200K, Phase II $1.6M, EPA environmental technology, state energy programs supporting renewable energy, battery tech, climate solutions, solar, wind, hydrogen with zero equity.",
  keywords: "clean tech grants 2025, renewable energy startup funding, DOE SBIR $200K, battery technology grants, climate tech funding Phase II, solar energy grants, wind power funding, hydrogen grants, EPA environmental tech, state energy programs",
  openGraph: {
    title: "Clean Tech & Energy Grants 2025 | $200K DOE SBIR + $1.6M Phase II",
    description: "Complete guide to clean tech and energy grants from DOE, EPA, and state programs.",
    url: "https://grantfinder.pro/blog/clean-tech-energy-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function CleanTechEnergyGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Clean Hero Section */}
        <section className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-green-500 text-white border-green-600 px-4 py-2 text-sm font-medium">
                  🌱 Clean Tech & Energy Grants 2025-2026
                </Badge>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight">
                Get Up to $1.6M in<br />Clean Energy Funding
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-green-100 mb-8 text-center max-w-3xl mx-auto font-light">
                DOE SBIR grants for clean tech startups. Zero equity required for renewable energy, battery technology, climate solutions, solar, wind, and hydrogen innovations.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-10">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-green-400">$200K</div>
                  <div className="text-sm md:text-base text-gray-300">Phase I Grants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-green-400">$1.6M</div>
                  <div className="text-sm md:text-base text-gray-300">Phase II Maximum</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-green-400">0%</div>
                  <div className="text-sm md:text-base text-gray-300">Equity Required</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-green-500 text-white hover:bg-green-600 font-semibold px-8 py-6 text-lg w-full sm:w-auto shadow-xl" asChild>
                  <Link href="#cleantech-grants">
                    View Clean Tech Programs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-green-500 bg-transparent text-green-300 hover:bg-green-500 hover:text-white font-semibold px-8 py-6 text-lg w-full sm:w-auto" asChild>
                  <Link href="/download/clean-tech-energy-grants-guide">
                    <Download className="mr-2 w-5 h-5" />
                    Free Energy Guide
                  </Link>
                </Button>
              </div>

              {/* Trust Indicator */}
              <p className="text-center text-gray-300 mt-8 text-sm">
                ✓ $65M annual DOE funding • ✓ National lab partnerships • ✓ Non-dilutive capital
              </p>
            </div>
          </div>
        </section>

        {/* Quick Overview - Main Programs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Clean Tech & Energy Grant Programs</h2>
              <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
                Federal and state funding for renewable energy, battery technology, climate solutions, and environmental innovation.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* DOE SBIR */}
                <Card className="border-2 border-green-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                        <Sun className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-700">$200,000</div>
                        <div className="text-sm text-gray-600">DOE SBIR Phase I</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Clean Energy Innovation</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Solar, wind, geothermal technologies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Battery storage & grid integration</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Hydrogen production & fuel cells</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>6-12 months feasibility study</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#doe-sbir-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* DOE Phase II */}
                <Card className="border-2 border-emerald-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-emerald-50 to-teal-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
                        <Battery className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-emerald-700">$1.6M</div>
                        <div className="text-sm text-gray-600">DOE SBIR Phase II</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Full Development</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>24 months prototype development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Testing, validation & certification</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>National lab partnerships available</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Commercialization support included</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#phase-2-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* EPA & State */}
                <Card className="border-2 border-teal-200 hover:shadow-xl transition-all hover:-translate-y-1 relative">
                  <div className="absolute -top-3 -right-3 bg-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    CLIMATE TECH
                  </div>
                  <CardHeader className="bg-gradient-to-br from-teal-50 to-cyan-50">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mr-3">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-teal-700">$5M+</div>
                        <div className="text-sm text-gray-600">EPA & State Programs</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Environmental Tech</h3>
                    <ul className="space-y-2 text-sm text-gray-700 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>EPA SBIR environmental solutions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>State clean energy programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Carbon capture & climate tech</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Water treatment & air quality</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#epa-state-details">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Clean Technologies That Qualify</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                DOE and EPA grants support a wide range of clean energy and environmental innovations.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Sun className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Solar Energy</h3>
                    <p className="text-sm text-gray-600 mb-3">Photovoltaics, CSP, agrivoltaics, solar-thermal, BIPV, perovskites, thin-film technologies</p>
                    <p className="text-xs text-green-700 font-semibold">SETO active funding</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Battery className="w-8 h-8 text-emerald-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Energy Storage</h3>
                    <p className="text-sm text-gray-600 mb-3">Lithium-ion, solid-state batteries, flow batteries, thermal storage, grid-scale systems</p>
                    <p className="text-xs text-emerald-700 font-semibold">$65M VTO funding</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-teal-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Wind className="w-8 h-8 text-teal-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Wind & Water Power</h3>
                    <p className="text-sm text-gray-600 mb-3">Offshore wind, floating turbines, hydropower, tidal energy, wave energy converters</p>
                    <p className="text-xs text-teal-700 font-semibold">WETO priority area</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-cyan-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Zap className="w-8 h-8 text-cyan-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Hydrogen & Fuel Cells</h3>
                    <p className="text-sm text-gray-600 mb-3">Green hydrogen, electrolyzers, fuel cells, hydrogen storage, distribution systems</p>
                    <p className="text-xs text-cyan-700 font-semibold">HFTO focus area</p>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Categories Row */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Globe className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Geothermal Energy</h3>
                    <p className="text-sm text-gray-600 mb-3">Enhanced geothermal, district heating, direct use applications, exploration tech</p>
                    <p className="text-xs text-blue-700 font-semibold">GTO programs</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Leaf className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Bioenergy</h3>
                    <p className="text-sm text-gray-600 mb-3">Biofuels, biomass, biogas, algae, cellulosic ethanol, renewable diesel, SAF</p>
                    <p className="text-xs text-indigo-700 font-semibold">BETO funding</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Droplet className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Carbon Capture</h3>
                    <p className="text-sm text-gray-600 mb-3">Direct air capture, CCUS, carbon utilization, sequestration, negative emissions</p>
                    <p className="text-xs text-purple-700 font-semibold">FECM priority</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-pink-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Building className="w-8 h-8 text-pink-600 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Buildings & Industry</h3>
                    <p className="text-sm text-gray-600 mb-3">Heat pumps, HVAC, lighting, industrial decarbonization, process efficiency</p>
                    <p className="text-xs text-pink-700 font-semibold">BTO & IEDO focus</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 2025 Updates */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-900 mb-2">What&apos;s New in Clean Energy Funding 2025-2026</h3>
                    <p className="text-gray-700">Recent DOE and EPA investments for clean tech entrepreneurs</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-5 border border-green-100">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-bold text-gray-900">$65M Annual DOE SBIR</h4>
                    </div>
                    <p className="text-sm text-gray-700">DOE SBIR/STTR FY 2025 Phase I Release 2 offers $65 million for clean energy innovation. Phase I up to $200K, Phase II up to $1.6M with national lab partnerships.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-green-100">
                    <div className="flex items-center mb-2">
                      <Sun className="w-5 h-5 text-orange-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Solar Technology Focus</h4>
                    </div>
                    <p className="text-sm text-gray-700">SETO funding covers dual-use PV, agrivoltaics, BIPV, floating PV, CSP Gen3, solar microgrids, cybersecurity, and manufacturing innovations for 2025 cycle.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-green-100">
                    <div className="flex items-center mb-2">
                      <Battery className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-bold text-gray-900">EV Battery Innovation</h4>
                    </div>
                    <p className="text-sm text-gray-700">VTO $65M focuses on EV battery cells, recycling efficiency, thermal runaway mitigation, modular HD batteries, firefighting tech, electrified hydraulics for 2025.</p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-green-100">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-5 h-5 text-purple-600 mr-2" />
                      <h4 className="font-bold text-gray-900">Commercialization Support</h4>
                    </div>
                    <p className="text-sm text-gray-700">DOE offers Phase IIB commercialization funding, TABA (Technical and Business Assistance), American-Made Network connections, and follow-on support bridging to market.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        // ... (keep all the existing code up to the 2025 Updates section, then add:)

        {/* Detailed Programs Section - THIS WAS MISSING */}
        <section id="cleantech-grants" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Complete Clean Tech Grant Program Details</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Everything you need to know about DOE SBIR, EPA environmental tech, and state clean energy programs.
              </p>
              
              <div className="space-y-8">
                {/* DOE SBIR Phase I */}
                <Card id="doe-sbir-details" className="border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                    <div className="flex items-center mb-2">
                      <Sun className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700 text-2xl">DOE SBIR Phase I - $200,000 Clean Energy Innovation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-green-800">Program Overview</h4>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Phase I Award:</span>
                              <span className="text-green-700 font-bold text-xl">$200,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-emerald-700 font-bold">6-12 months</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Equity Required:</span>
                              <span className="text-green-700 font-bold">0% Non-dilutive</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Annual Funding:</span>
                              <span className="text-teal-700 font-bold">$65M total</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-800 mb-3">DOE Technology Focus Areas (FY2025):</h5>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Sun className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Solar Energy:</strong> SETO - Dual-use PV, agrivoltaics, BIPV, floating solar, CSP Gen3</span>
                            </li>
                            <li className="flex items-start">
                              <Battery className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Vehicle Technologies:</strong> VTO - EV batteries, recycling, thermal safety, HD electrification</span>
                            </li>
                            <li className="flex items-start">
                              <Wind className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Wind/Water:</strong> WETO - Offshore wind, floating turbines, hydropower, tidal energy</span>
                            </li>
                            <li className="flex items-start">
                              <Zap className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Hydrogen & Fuel Cells:</strong> HFTO - Green hydrogen, electrolyzers, fuel cells, storage</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Clean Tech Success Stories</h4>
                        <div className="space-y-4">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-2">
                                <Sun className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-green-800">Solar Innovation - Perovskite</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              $200K Phase I → developed tandem perovskite-silicon solar cells with 30%+ efficiency → Phase II $1.6M for manufacturing scale-up → partnered with national lab → pilot production facility → Series A $25M.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">$25M Series A</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">30% efficiency</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">DOE funded</span>
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                                <Battery className="w-5 h-5 text-white" />
                              </div>
                              <p className="font-bold text-blue-800">Battery Storage Breakthrough</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              $200K Phase I → validated solid-state battery technology → $1.6M Phase II development → grid-scale demo with utility partner → $50M strategic investment from automotive OEM → commercial deployment 2026.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">$50M investment</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Grid-scale</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">OEM partner</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                      <h4 className="font-bold text-lg mb-4 text-green-800">Application Strategy & Requirements</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Building className="w-4 h-4 mr-2 text-green-600" />
                            Eligibility
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• US small business &lt;500 employees</li>
                            <li>• 51%+ owned by US citizens/residents</li>
                            <li>• At least 2/3 R&D performed in US</li>
                            <li>• Clean energy technology focus</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-green-600" />
                            Application Process
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Identify DOE office & subtopic</li>
                            <li>• Technical innovation description</li>
                            <li>• Energy impact assessment</li>
                            <li>• Commercialization strategy</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-green-600" />
                            Success Factors
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Clear energy efficiency gains</li>
                            <li>• Cost reduction pathway</li>
                            <li>• Market size & adoption plan</li>
                            <li>• Technical risk mitigation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DOE SBIR Phase II */}
                <Card id="phase-2-details" className="border-2 border-emerald-200">
                  <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100">
                    <div className="flex items-center mb-2">
                      <Battery className="w-6 h-6 text-emerald-600 mr-3" />
                      <CardTitle className="text-emerald-700 text-2xl">DOE SBIR Phase II - $1.6M R&D & Commercialization</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-emerald-800">Program Details</h4>
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-emerald-700 font-bold text-xl">$1,600,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-teal-700 font-bold">24 months</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Requirement:</span>
                              <span className="text-green-700 font-bold">Successful Phase I</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                          Phase II supports full technology development, prototype testing, manufacturing readiness, and commercialization. DOE provides access to national laboratories, TABA support, and American-Made Network connections. Combined Phase I + II provides ~$1.8M total non-dilutive funding.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase II Objectives</h4>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="font-semibold text-gray-800 mb-3">Development Milestones:</p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <Rocket className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Technology Development:</strong> Prototype refinement, performance validation, field testing</span>
                            </li>
                            <li className="flex items-start">
                              <Shield className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Manufacturing:</strong> Production scale-up, supply chain development, cost reduction</span>
                            </li>
                            <li className="flex items-start">
                              <Users className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>National Lab Support:</strong> Testing facilities, expert consultation, technology transfer</span>
                            </li>
                            <li className="flex items-start">
                              <DollarSign className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span><strong>Commercialization:</strong> Customer pilots, strategic partnerships, investor connections</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* EPA & State Programs */}
                <Card id="epa-state-details" className="border-2 border-teal-200">
                  <CardHeader className="bg-gradient-to-r from-teal-100 to-cyan-100">
                    <div className="flex items-center mb-2">
                      <Leaf className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700 text-2xl">EPA SBIR + State Clean Energy Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-teal-800">EPA SBIR Environmental Tech</h4>
                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-200 mb-4">
                          <p className="font-semibold text-gray-800 mb-3">EPA Focus Areas:</p>
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li>• Air quality monitoring & pollution control</li>
                            <li>• Water treatment & purification technologies</li>
                            <li>• Waste management & circular economy</li>
                            <li>• Environmental monitoring & sensors</li>
                            <li>• Climate adaptation & resilience</li>
                            <li>• Green chemistry & safer materials</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">State Energy Programs</h4>
                        <div className="space-y-3 text-sm">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-semibold text-green-800 mb-2">California Energy Innovation</p>
                            <p className="text-gray-700">EPIC program, CEC grants, CARB zero-emission tech, EV infrastructure, renewable integration, energy storage funding opportunities.</p>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="font-semibold text-blue-800 mb-2">New York State Energy</p>
                            <p className="text-gray-700">NYSERDA clean energy programs, offshore wind support, building decarbonization, EV charging, clean heating & cooling grants.</p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="font-semibold text-purple-800 mb-2">Texas & Regional Programs</p>
                            <p className="text-gray-700">Texas State Energy Conservation Office, regional clean energy funds, grid modernization, renewable integration, carbon management.</p>
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

        {/* Success Strategies */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Clean Tech Grant Application Success Strategies</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Proven tactics to increase your chances of winning DOE and EPA clean energy funding.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      What Works for Clean Tech
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Target className="w-5 h-5 text-green-600 mr-2" />
                          Quantify Energy Impact
                        </h4>
                        <p className="text-sm text-gray-700">
                          Provide specific energy savings (kWh, BTU), GHG reduction (tons CO2e), or efficiency gains (%). DOE reviewers prioritize measurable energy/environmental impact with clear baseline comparisons.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          Show Cost Reduction Pathway
                        </h4>
                        <p className="text-sm text-gray-700">
                          Demonstrate path to cost competitiveness with incumbent technologies. Include levelized cost analysis (LCOE for energy), manufacturing scale-up projections, and market adoption timeline.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Building className="w-5 h-5 text-green-600 mr-2" />
                          Leverage National Lab Partnerships
                        </h4>
                        <p className="text-sm text-gray-700">
                          Propose collaboration with DOE national labs for testing, validation, or technical expertise. Shows seriousness and provides access to world-class facilities and researchers.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <Users className="w-5 h-5 text-green-600 mr-2" />
                          Align with DOE Priority Areas
                        </h4>
                        <p className="text-sm text-gray-700">
                          Match your technology to specific DOE office priorities (SETO solar, VTO vehicles, WETO wind, etc.). Use language from funding announcements and cite relevant DOE technical targets.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      Common Clean Tech Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Vague Environmental Claims
                        </h4>
                        <p className="text-sm text-gray-700">
                          Making general "green" or "sustainable" statements without quantified impact. DOE requires specific energy metrics, emissions reductions, and performance benchmarks with verifiable data.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Ignoring Market Barriers
                        </h4>
                        <p className="text-sm text-gray-700">
                          Not addressing cost, policy, or infrastructure challenges to adoption. Clean tech faces real deployment barriers - show awareness and mitigation strategies for commercialization hurdles.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Underestimating Technical Risk
                        </h4>
                        <p className="text-sm text-gray-700">
                          Overpromising performance without acknowledging technical challenges. Be realistic about TRL progression, identify key technical risks, and explain de-risking approach.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          Weak Competitive Analysis
                        </h4>
                        <p className="text-sm text-gray-700">
                          Claiming "no competition" or ignoring incumbent solutions. Show deep understanding of competitive landscape, explain differentiation, and justify why your approach will win in market.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-900 via-emerald-800 to-teal-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Apply for Clean Energy Grants?
              </h2>
              <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
                Download our free clean tech grants guide or get personalized help from specialists experienced in DOE and EPA funding.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card className="bg-white/10 backdrop-blur border-2 border-white/20 hover:bg-white/15 transition-all">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white">Free Clean Tech Guide</h3>
                    <p className="text-green-100 text-sm mb-6">
                      Comprehensive PDF with DOE SBIR templates, EPA programs, state funding, and winning strategies for renewable energy.
                    </p>
                    <Button size="lg" className="w-full bg-white text-green-700 hover:bg-green-50 font-semibold" asChild>
                      <Link href="/download/clean-tech-energy-grants-guide">
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
                    <h3 className="font-bold text-xl mb-2 text-white">Expert Clean Tech Support</h3>
                    <p className="text-yellow-100 text-sm mb-6">
                      Work with specialists who&apos;ve helped clean tech startups win DOE grants, partner with national labs, and commercialize energy innovations.
                    </p>
                    <Button size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold" asChild>
                      <Link href="/contact?service=cleantech-grants-help">
                        Get Expert Help
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <p className="text-green-200 mt-8 text-sm">
                ✓ $65M DOE funding • ✓ National lab partnerships • ✓ Zero equity required
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}