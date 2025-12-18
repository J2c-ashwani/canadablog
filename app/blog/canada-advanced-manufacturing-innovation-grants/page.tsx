import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, Download, Factory, Cog, Cpu, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Advanced Manufacturing Innovation Grants 2026 | $3.1B+ Industry 4.0 Funding | NGen",
  description: "Complete guide to Canadian advanced manufacturing innovation grants. Access $3.1B+ funding through NGen, automation programs, Industry 4.0 initiatives, and 38+ smart manufacturing programs.",
  keywords: "Canada advanced manufacturing grants, Industry 4.0 funding Canada, NGen grants, smart manufacturing funding, automation grants Canada, manufacturing innovation funding, productivity enhancement grants",
  openGraph: {
    title: "Canada Advanced Manufacturing Innovation Grants 2026 | $3.1B+ Industry 4.0 Funding",
    description: "Access $3.1B+ in advanced manufacturing funding. Complete guide to NGen, automation programs, and 38+ Industry 4.0 innovation grants.",
    url: "https://fsidigital.ca/blog/canada-advanced-manufacturing-innovation-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function CanadaAdvancedManufacturingInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-700 to-gray-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏭 Advanced Manufacturing Innovation Grants
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Advanced Manufacturing Innovation Grants 2026
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Access $3.1B+ in advanced manufacturing funding through 38+ federal and provincial programs.
                From NGen collaborative projects to automation funding - accelerate your Industry 4.0, smart manufacturing,
                and productivity enhancement initiatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore Manufacturing Programs
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

        {/* Manufacturing Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-gray-700 mb-2">$3.1B+</div>
                  <div className="text-gray-600">Manufacturing Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">38+</div>
                  <div className="text-gray-600">Active Manufacturing Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$10M</div>
                  <div className="text-gray-600">Max NGen Project Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">50%</div>
                  <div className="text-gray-600">Typical Cost Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Manufacturing Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Advanced Manufacturing Programs</h2>

              <div className="space-y-8">
                {/* NGen - Next Generation Manufacturing Canada */}
                <Card className="border-gray-300">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Factory className="w-6 h-6 text-gray-700 mr-3" />
                      <CardTitle className="text-gray-800">NGen - Next Generation Manufacturing Canada</CardTitle>
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
                        <span><strong>Collaborative</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Up to 3 Years</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canada's Advanced Manufacturing Supercluster providing funding for collaborative projects that
                      advance Industry 4.0, smart manufacturing, and manufacturing innovation.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Priority Technologies:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Advanced robotics and automation</li>
                          <li>• AI and machine learning in manufacturing</li>
                          <li>• Digital twins and simulation</li>
                          <li>• Additive manufacturing (3D printing)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Coverage:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 50% of eligible project costs</li>
                          <li>• Consortium-based projects required</li>
                          <li>• Scale-up and commercialization focus</li>
                          <li>• Skills development support included</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* IRAP Manufacturing Innovation */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Cog className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">IRAP Manufacturing Innovation</CardTitle>
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
                        <span><strong>SMEs</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      IRAP funding specifically for manufacturing SMEs developing innovative production technologies,
                      automation solutions, and advanced manufacturing capabilities.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Manufacturing Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Process automation and optimization</li>
                          <li>• Production technology development</li>
                          <li>• Quality control systems</li>
                          <li>• Supply chain digitization</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Included:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 60-80% of eligible R&D costs</li>
                          <li>• Industrial Technology Advisor</li>
                          <li>• Youth employment support</li>
                          <li>• Access to research networks</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CDAP - Canada Digital Adoption Program */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Cpu className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">CDAP - Canada Digital Adoption Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $15K + Loan</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Digital Tools</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Quick Access</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Support for manufacturers adopting digital technologies including automation systems,
                      ERP/MES platforms, IoT sensors, and Industry 4.0 solutions.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Digital Solutions:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Manufacturing execution systems (MES)</li>
                          <li>• Enterprise resource planning (ERP)</li>
                          <li>• IoT and sensor networks</li>
                          <li>• Cloud-based manufacturing platforms</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• $15K grant for digital adoption plan</li>
                          <li>• Up to $100K interest-free loan</li>
                          <li>• Digital advisor support included</li>
                          <li>• E-commerce platform development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Regional Manufacturing Programs */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Regional Manufacturing Development</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Varies by Region</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Expansion Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Scale-up</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Regional Development Agencies (RDAs) provide manufacturing-specific funding for facility
                      expansion, equipment modernization, and productivity improvements.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">RDA Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• FedDev Ontario - Advanced Manufacturing</li>
                          <li>• PrairiesCan - Manufacturing Growth</li>
                          <li>• PacifiCan - BC Manufacturing</li>
                          <li>• ACOA - Atlantic Manufacturing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Equipment and machinery acquisition</li>
                          <li>• Facility expansion and modernization</li>
                          <li>• Process improvement initiatives</li>
                          <li>• Workforce training and development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing by Technology Area */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Manufacturing Funding by Technology</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Cpu className="w-8 h-8 text-blue-600" />,
                    title: "Robotics & Automation",
                    funding: "$1.2B+",
                    programs: "15+ Programs",
                    features: ["Industrial robotics", "Collaborative robots (cobots)", "Automated assembly lines"]
                  },
                  {
                    icon: <Factory className="w-8 h-8 text-gray-700" />,
                    title: "Additive Manufacturing",
                    funding: "$450M+",
                    programs: "8+ Programs",
                    features: ["3D printing technologies", "Metal additive manufacturing", "Rapid prototyping"]
                  },
                  {
                    icon: <TrendingUp className="w-8 h-8 text-green-600" />,
                    title: "AI & Analytics",
                    funding: "$680M+",
                    programs: "12+ Programs",
                    features: ["Predictive maintenance", "Quality control AI", "Production optimization"]
                  },
                  {
                    icon: <Cog className="w-8 h-8 text-orange-600" />,
                    title: "IoT & Sensors",
                    funding: "$520M+",
                    programs: "10+ Programs",
                    features: ["Smart factory sensors", "Real-time monitoring", "Connected manufacturing"]
                  },
                  {
                    icon: <Building className="w-8 h-8 text-purple-600" />,
                    title: "Digital Twins",
                    funding: "$380M+",
                    programs: "7+ Programs",
                    features: ["Virtual factory modeling", "Process simulation", "Performance optimization"]
                  },
                  {
                    icon: <Users className="w-8 h-8 text-teal-600" />,
                    title: "Workforce Development",
                    funding: "$340M+",
                    programs: "14+ Programs",
                    features: ["Skills training programs", "Apprenticeship support", "Upskilling initiatives"]
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

        {/* Provincial Manufacturing Support */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Provincial Manufacturing Programs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-gray-700">🍁 Leading Provincial Programs:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Ontario Made Manufacturing:</strong> $1.4B for advanced manufacturing and automation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Quebec Manufacturing 4.0:</strong> $850M for Industry 4.0 transformation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>BC Manufacturing Competitiveness:</strong> $420M for productivity enhancement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Alberta Diversification:</strong> $380M for manufacturing expansion</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-700">🎯 Priority Manufacturing Areas:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Automotive Manufacturing:</strong> EVs and components production</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Aerospace & Defense:</strong> Advanced manufacturing technologies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Food & Beverage Processing:</strong> Automation and efficiency</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Medical Device Manufacturing:</strong> Precision manufacturing</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Manufacturing Funding Success Strategies</h2>

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
                          <strong>Quantify Productivity Gains:</strong> Show clear ROI and efficiency improvements
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Technology Integration Plan:</strong> Demonstrate how new tech integrates with existing systems
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Workforce Training Strategy:</strong> Include employee upskilling and training plans
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Collaborative Approach:</strong> Partner with technology providers and research institutions
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
                          <strong>Weak Business Case:</strong> Insufficient ROI analysis and productivity metrics
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Technology Without Strategy:</strong> Adopting tech without clear implementation plan
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Ignoring Workforce Impact:</strong> Not addressing training and change management
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Poor Co-funding Plan:</strong> Inadequate matching funds or financial capacity
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
        <section className="py-20 bg-gradient-to-r from-gray-700 to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Advanced Manufacturing Funding?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get our complete advanced manufacturing funding guide or work with specialists who have secured
                $120M+ in manufacturing grants across NGen, automation programs, and provincial initiatives.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Complete Application Guide</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Get our step-by-step manufacturing funding application guide with NGen templates, program selection tools, and ROI calculators.
                  </p>
                  <Button size="lg" className="w-full bg-white text-gray-900 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-manufacturing-funding-guide">
                      <Download className="w-4 h-4 mr-2" />
                      View Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Manufacturing Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with manufacturing funding specialists who have secured $120M+ with 82% success rate across NGen and Industry 4.0 programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=manufacturing-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-gray-400 text-sm mt-6">
                82% success rate • $120M+ secured • NGen, IRAP & CDAP expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
