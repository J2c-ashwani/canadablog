import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Zap, Brain, Heart, Fuel, Wind, Factory } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alberta Innovation Grants & Funding 2026 | $950M+ Energy Transition, AI & CleanTech Support",
  description: "Complete guide to Alberta innovation grants and funding programs. Access $950M+ through Alberta Innovates, Emissions Reduction Alberta, AI4Society, and energy transition, AI, health innovation programs.",
  keywords: "Alberta innovation grants, Alberta Innovates funding, Emissions Reduction Alberta, AI4Society grants, energy transition Alberta, cleantech Alberta grants, health innovation Alberta, AI funding Alberta",
  openGraph: {
    title: "Alberta Innovation Grants & Funding 2026 | $950M+ Energy & AI Support",
    description: "Access $950M+ in Alberta innovation funding. Complete guide to Alberta Innovates, ERA, and diversification programs.",
    url: "https://fsidigital.ca/blog/alberta-innovation-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function AlbertaInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-700 to-red-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏔️ Alberta Provincial Innovation Support
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Alberta Innovation Grants & Funding Programs 2026
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Access $950M+ in Alberta innovation funding through Alberta Innovates, Emissions Reduction Alberta (ERA), 
                AI4Society, and sector-specific programs supporting energy transition leadership, AI & machine learning excellence, 
                health innovation, and economic diversification across Canada's energy innovation capital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore Alberta Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    View All Provincial Support
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Alberta Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$950M+</div>
                  <div className="text-gray-600">Annual Innovation Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">15+</div>
                  <div className="text-gray-600">Active Provincial Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">#1</div>
                  <div className="text-gray-600">Energy Innovation Leader</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rose-600 mb-2">$320M+</div>
                  <div className="text-gray-600">Emissions Reduction Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Alberta Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Alberta Innovation Programs</h2>
              
              <div className="space-y-8">
                {/* Alberta Innovates */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Alberta Innovates - Provincial Innovation Agency</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Applied Research</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Multiple Streams</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Alberta's primary innovation agency providing comprehensive funding, facilities access, and partnership support 
                      for technology development, applied research, and commercialization across all innovation stages.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Core Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Voucher Program (applied research)</li>
                          <li>• Accelerator initiatives</li>
                          <li>• Ecosystem development grants</li>
                          <li>• Infrastructure access programs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Technology validation funding</li>
                          <li>• Access to world-class facilities</li>
                          <li>• Industry partnership facilitation</li>
                          <li>• Technical expertise and mentorship</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emissions Reduction Alberta */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Wind className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Emissions Reduction Alberta (ERA)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $25M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>CleanTech Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Leading cleantech funding agency supporting technology development and deployment for emissions reduction, 
                      clean energy, carbon capture, hydrogen, and environmental innovation projects.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Technology Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Carbon capture utilization & storage</li>
                          <li>• Hydrogen production & applications</li>
                          <li>• Methane emission reduction</li>
                          <li>• Clean energy generation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Types:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Grand Challenges (large-scale demo)</li>
                          <li>• Natural Gas Challenge</li>
                          <li>• Energy Savings for Business</li>
                          <li>• Technology development projects</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI4Society */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Brain className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">AI4Society - Alberta Machine Intelligence Institute (Amii)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>AI & ML</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Collaborative</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      World-leading AI research institute providing funding, expertise, and partnership opportunities for companies 
                      applying artificial intelligence and machine learning to real-world problems.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">AI Applications:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Reinforcement learning solutions</li>
                          <li>• Machine learning deployment</li>
                          <li>• AI for energy & resources</li>
                          <li>• Healthcare AI applications</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Included:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• AI expertise and consultation</li>
                          <li>• Research collaboration</li>
                          <li>• Talent access and training</li>
                          <li>• Technology commercialization</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Health Innovation */}
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle className="text-red-700">Alberta Health Services Innovation Fund & Health Innovation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $2M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Health Tech</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Clinical Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Health innovation funding supporting medical devices, digital health, clinical technologies, and healthcare 
                      solutions improving patient outcomes and healthcare system efficiency.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Innovation Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Digital health & telemedicine</li>
                          <li>• Medical device innovation</li>
                          <li>• Clinical decision support systems</li>
                          <li>• Patient monitoring technology</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Clinical validation support</li>
                          <li>• Healthcare system access</li>
                          <li>• Pilot implementation funding</li>
                          <li>• Commercialization pathways</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Sector Highlights */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Alberta Innovation Sector Excellence</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Energy Transition Leadership */}
                <Card className="hover:shadow-lg transition-all border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Fuel className="w-8 h-8 text-orange-600" />
                      <Badge variant="outline" className="text-xs">$450M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Energy Transition & CleanTech</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Global leader in energy innovation with world-class expertise in carbon capture, hydrogen, 
                      and clean energy technology development.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Carbon capture & storage (CCUS)</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Hydrogen production & deployment</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Geothermal & clean energy</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Oil sands innovation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI & Machine Learning */}
                <Card className="hover:shadow-lg transition-all border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Brain className="w-8 h-8 text-blue-600" />
                      <Badge variant="outline" className="text-xs">$280M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">AI & Machine Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      World-leading AI research through Amii (Alberta Machine Intelligence Institute) with 
                      pioneering reinforcement learning expertise.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Reinforcement learning (RL)</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Machine learning applications</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>AI for energy & resources</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Computer vision & robotics</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Health Innovation */}
                <Card className="hover:shadow-lg transition-all border-red-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Heart className="w-8 h-8 text-red-600" />
                      <Badge variant="outline" className="text-xs">$220M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Health Innovation & MedTech</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Growing health technology sector with strengths in digital health, medical devices, 
                      and healthcare AI applications.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Digital health platforms</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Medical device development</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Healthcare AI & analytics</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Telemedicine solutions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AgriFood Innovation */}
                <Card className="hover:shadow-lg transition-all border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-8 h-8 text-green-600" />
                      <Badge variant="outline" className="text-xs">$180M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">AgriFood & AgTech</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Strong agricultural technology base supporting precision agriculture, livestock tech, 
                      and food processing innovation.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Precision agriculture technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Livestock management systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Food processing innovation</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Sustainable farming solutions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Advanced Manufacturing */}
                <Card className="hover:shadow-lg transition-all border-amber-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Factory className="w-8 h-8 text-amber-600" />
                      <Badge variant="outline" className="text-xs">$150M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Advanced Manufacturing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Growing manufacturing sector with focus on automation, Industry 4.0, and advanced 
                      materials for energy and resource sectors.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Industrial automation</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Robotics & AI manufacturing</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Advanced materials</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>3D printing & additive</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FinTech & Software */}
                <Card className="hover:shadow-lg transition-all border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-8 h-8 text-purple-600" />
                      <Badge variant="outline" className="text-xs">$120M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">FinTech & Software</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Emerging technology sector with strengths in financial technology, software development, 
                      and enterprise solutions.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Financial technology (FinTech)</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Enterprise software solutions</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Cybersecurity</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Blockchain & crypto</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Innovation Hubs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Alberta Regional Innovation Hubs</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Calgary Innovation Corridor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Energy & Tech Hub:</strong> Alberta's largest innovation ecosystem with world-leading energy expertise, 
                        growing tech sector, and strong entrepreneurial culture.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Energy transition leadership</li>
                        <li>• CleanTech & carbon tech</li>
                        <li>• Financial services & FinTech</li>
                        <li>• AI & software development</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Edmonton & Capital Region</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Research & Innovation:</strong> University of Alberta ecosystem with AI excellence (Amii), 
                        health innovation, and strong research commercialization.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• AI & machine learning (Amii)</li>
                        <li>• Health innovation & medical research</li>
                        <li>• Nanotechnology & materials</li>
                        <li>• Manufacturing & industrial tech</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Southern Alberta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>AgriFood Innovation:</strong> Agricultural technology focus with University of Lethbridge 
                        and strong agribusiness sector.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Precision agriculture</li>
                        <li>• Food processing technology</li>
                        <li>• Water management systems</li>
                        <li>• Renewable energy projects</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Red Deer & Central Alberta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Industrial Innovation:</strong> Manufacturing and industrial technology development 
                        with Red Deer Polytechnic connections.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Industrial manufacturing</li>
                        <li>• Applied research & training</li>
                        <li>• Oil & gas services innovation</li>
                        <li>• Regional business support</li>
                      </ul>
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Alberta Innovation Funding Success Strategies</h2>
              
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
                          <strong>Leverage Alberta Innovates:</strong> Access multiple programs and world-class facilities
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Target ERA Funding:</strong> Strong cleantech and emissions reduction project support
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Engage with Amii:</strong> Access world-leading AI expertise and research collaboration
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Energy Sector Focus:</strong> Leverage Alberta's unique energy innovation strengths
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
                          <strong>Missing ERA Opportunities:</strong> Not exploring emissions reduction and cleantech funding
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Ignoring AI Resources:</strong> Failing to leverage Amii's world-class AI expertise
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Facility Access:</strong> Missing opportunities for Alberta Innovates infrastructure
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Poor Sector Alignment:</strong> Not matching with Alberta's energy transition focus
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-700 to-red-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Alberta Innovation Funding?
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Get expert help navigating Alberta's innovation ecosystem and maximizing your Alberta Innovates, ERA, and AI4Society funding. 
                Our Alberta specialists have secured $140M+ in provincial innovation funding.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=alberta-innovation-grants-expert-help">
                    Get Expert Help
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    View All Provincial Programs
                  </Link>
                </Button>
              </div>
              
              <p className="text-orange-200 text-sm mt-6">
                77% success rate • $140M+ secured • Energy, AI & CleanTech expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
