import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Leaf, Zap, Droplet, Wind, Sun } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Clean Technology Innovation Grants 2025 | $1.2B+ CleanTech Funding | SDTC & Net Zero",
  description: "Complete guide to Canadian clean technology innovation grants. Access $1.2B+ funding through SDTC (up to $15M), Clean Technology ITCs, Net Zero Accelerator, and 22+ cleantech programs.",
  keywords: "Canada clean technology grants, cleantech funding Canada, SDTC grants, sustainable technology funding, renewable energy grants Canada, environmental innovation funding, Net Zero Accelerator, clean tech tax credits Canada",
  openGraph: {
    title: "Canada Clean Technology Innovation Grants 2025 | $1.2B+ CleanTech Funding",
    description: "Access $1.2B+ in clean technology innovation funding. Complete guide to SDTC grants, Clean Technology ITCs, and 22+ programs supporting environmental innovation.",
    url: "https://grantfinder.pro/blog/canada-clean-technology-innovation-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function CanadaCleanTechnologyInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-green-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌱 Clean Technology Innovation Grants
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Clean Technology Innovation Grants 2025
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Access $1.2B+ in clean technology innovation funding through 22+ federal and provincial programs. 
                From SDTC grants up to $15M to Clean Technology Investment Tax Credits - accelerate your 
                environmental technology, renewable energy, and sustainability innovation projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore CleanTech Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    Back to Innovation Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CleanTech Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">$1.2B+</div>
                  <div className="text-gray-600">CleanTech Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">22+</div>
                  <div className="text-gray-600">Active CleanTech Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$15M</div>
                  <div className="text-gray-600">Max SDTC Grant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">30%</div>
                  <div className="text-gray-600">Clean Tech ITC Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major CleanTech Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Clean Technology Programs</h2>
              
              <div className="space-y-8">
                {/* SDTC - Sustainable Development Technology Canada */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Leaf className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Sustainable Development Technology Canada (SDTC)</CardTitle>
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
                        <span><strong>Demonstration</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Up to 5 Years</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      SDTC provides funding for demonstration and deployment of pre-commercial clean technologies 
                      that address climate change, clean air, clean water, and clean soil challenges.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Technologies:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Renewable energy generation and storage</li>
                          <li>• Clean transportation solutions</li>
                          <li>• Industrial energy efficiency technologies</li>
                          <li>• Waste-to-energy and circular economy</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Coverage:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 40% of eligible project costs</li>
                          <li>• Minimum $5M total project budget</li>
                          <li>• Demonstration and scale-up activities</li>
                          <li>• Performance validation and monitoring</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clean Technology Investment Tax Credits */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Clean Technology Investment Tax Credits (ITCs)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>15-30% ITC</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Equipment Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Refundable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Refundable investment tax credits for clean technology equipment including renewable energy, 
                      energy storage, low-carbon heat equipment, and clean hydrogen production.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Solar & Wind (30%):</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Solar photovoltaic systems</li>
                          <li>• Concentrated solar power</li>
                          <li>• Wind turbines and farms</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Energy Storage (30%):</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Electrical energy storage</li>
                          <li>• Thermal energy storage</li>
                          <li>• Battery systems</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Clean Hydrogen (15%):</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Electrolysis equipment</li>
                          <li>• Production facilities</li>
                          <li>• Hydrogen refueling stations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Net Zero Accelerator */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Target className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Net Zero Accelerator Initiative</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$10M - $100M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Large Projects</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Decarbonization</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Supports large-scale decarbonization projects and technology commercialization to help 
                      Canada achieve net-zero emissions by 2050. Part of Strategic Innovation Fund.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Priority Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Industrial emissions reduction projects</li>
                          <li>• Clean technology manufacturing</li>
                          <li>• Carbon capture utilization & storage (CCUS)</li>
                          <li>• Clean fuel production facilities</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Minimum $50M total project cost</li>
                          <li>• Credible net-zero pathway commitment</li>
                          <li>• Significant GHG emissions reduction</li>
                          <li>• Canadian economic benefits</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clean Growth Program */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Clean Growth Program</CardTitle>
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
                        <span><strong>Scale-up</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Commercialization</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Natural Resources Canada program supporting late-stage demonstration and early commercialization 
                      of clean technology solutions in energy, mining, and forestry sectors.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Energy efficiency innovations</li>
                          <li>• Renewable energy integration</li>
                          <li>• Clean resource extraction</li>
                          <li>• Low-carbon fuel alternatives</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Support:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 50% of eligible costs</li>
                          <li>• Demonstration project funding</li>
                          <li>• Market readiness activities</li>
                          <li>• Pilot to commercial scale-up</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CleanTech by Technology Area */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Clean Technology Funding by Area</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Sun className="w-8 h-8 text-yellow-600" />,
                    title: "Solar Energy",
                    funding: "$450M+",
                    programs: "12+ Programs",
                    features: ["30% Clean Tech ITC", "SDTC demonstration grants", "Provincial solar incentives"]
                  },
                  {
                    icon: <Wind className="w-8 h-8 text-blue-600" />,
                    title: "Wind Energy",
                    funding: "$380M+",
                    programs: "10+ Programs",
                    features: ["Offshore wind initiatives", "Grid integration support", "Manufacturing incentives"]
                  },
                  {
                    icon: <Zap className="w-8 h-8 text-purple-600" />,
                    title: "Energy Storage",
                    funding: "$320M+",
                    programs: "8+ Programs",
                    features: ["Battery technology ITCs", "Grid-scale storage", "Innovation funding"]
                  },
                  {
                    icon: <Droplet className="w-8 h-8 text-teal-600" />,
                    title: "Clean Hydrogen",
                    funding: "$280M+",
                    programs: "7+ Programs",
                    features: ["Hydrogen Strategy funding", "Production tax credits", "Infrastructure support"]
                  },
                  {
                    icon: <Building className="w-8 h-8 text-green-600" />,
                    title: "Carbon Capture (CCUS)",
                    funding: "$550M+",
                    programs: "9+ Programs",
                    features: ["CCUS tax credits", "Hub development", "Industrial projects"]
                  },
                  {
                    icon: <Leaf className="w-8 h-8 text-lime-600" />,
                    title: "Sustainable Agriculture",
                    funding: "$220M+",
                    programs: "11+ Programs",
                    features: ["AgriInnovate cleantech", "Precision agriculture", "Emissions reduction"]
                  }
                ].map((tech, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all border-gray-200">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        {tech.icon}
                        <Badge variant="outline" className="text-xs">
                          {tech.programs}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{tech.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{tech.funding}</div>
                      <div className="text-sm text-gray-500 mb-4">Available Funding</div>
                      <div className="space-y-2">
                        {tech.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Provincial CleanTech Support */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Provincial Clean Technology Programs</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-teal-700">🍁 Leading Provincial Programs:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>BC CleanBC Programs:</strong> $380M for clean energy and emissions reduction</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Alberta Technology & Innovation:</strong> $250M for energy transition</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Ontario Green Fund:</strong> $200M for sustainable innovation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Quebec Electrification:</strong> $180M for transport and industry</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">🎯 Priority Technology Areas:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Electric Vehicles:</strong> Manufacturing and infrastructure</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Critical Minerals:</strong> Battery materials processing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Green Buildings:</strong> Energy efficiency technologies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Circular Economy:</strong> Waste reduction and recycling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">CleanTech Funding Success Strategies</h2>
              
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
                          <strong>Quantify Environmental Impact:</strong> Demonstrate clear GHG reductions and sustainability metrics
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Technology Readiness:</strong> Show appropriate TRL level for the program
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Market Potential:</strong> Prove commercial viability and scalability
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Stack Multiple Programs:</strong> Combine federal, provincial, and tax incentives
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
                          <strong>Weak Impact Metrics:</strong> Insufficient quantification of environmental benefits
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Wrong Program Selection:</strong> Applying to programs not aligned with technology stage
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Inadequate Co-Funding:</strong> Failing to secure required matching funds
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Limited Market Analysis:</strong> Poor demonstration of commercial readiness
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA */}
        <section className="py-20 bg-gradient-to-r from-teal-600 to-green-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Clean Technology Funding?
              </h2>
              <p className="text-xl text-teal-100 mb-8">
                Get our complete clean technology funding guide or work with specialists who have secured 
                $75M+ in cleantech grants across SDTC, ITCs, and provincial programs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Complete Application Guide</h4>
                  <p className="text-teal-100 text-sm mb-4">
                    Get our step-by-step clean technology funding application guide with SDTC templates, ITC calculators, and program selection tools.
                  </p>
                  <Button size="lg" className="w-full bg-white text-teal-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-cleantech-funding-guide">
                      <Download className="w-4 h-4 mr-2" />
                      View Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert CleanTech Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with cleantech funding specialists who have secured $75M+ with 85% success rate across SDTC, ITCs, and Net Zero programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=cleantech-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-teal-200 text-sm mt-6">
                85% success rate • $75M+ secured • SDTC, ITC & Net Zero expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
