import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, Download, Factory, Cog, Cpu, TrendingUp, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Advanced Manufacturing Innovation Grants 2026 | $3.1B+ Industry 4.0 Funding | NGen",
  description: "Complete guide to Canadian advanced manufacturing innovation grants. Access $3.1B+ funding through NGen, automation programs, Industry 4.0 initiatives, and 38+ smart manufacturing programs.",
  keywords: "Canada advanced manufacturing grants, Industry 4.0 funding Canada, NGen grants, smart manufacturing funding, automation grants Canada, manufacturing innovation funding, productivity enhancement grants",
  openGraph: {
    title: "Canada Advanced Manufacturing Innovation Grants 2026 | $3.1B+ Industry 4.0 Funding",
    description: "Access $3.1B+ in advanced manufacturing funding. Complete guide to NGen, automation programs, and 38+ Industry 4.0 innovation grants.",
    url: "https://www.fsidigital.ca/blog/canada-advanced-manufacturing-innovation-grants",
    images: ["/og-image.png"],
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



        {/* Common Questions Section */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Manufacturing Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200">
                  <h3 className="font-semibold text-gray-800">What is NGen?</h3>
                  <p className="text-sm text-gray-600 mt-1">Canada's Supercluster for advanced manufacturing projects.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200">
                  <h3 className="font-semibold text-gray-800">Can I get funding for robotics?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, through NGen, IRAP, and regional programs.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200">
                  <h3 className="font-semibold text-gray-800">Does CDAP apply to factories?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, for ERP, MES, and digital supply chain tools.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200">
                  <h3 className="font-semibold text-gray-800">Is there funding for equipment?</h3>
                  <p className="text-sm text-gray-600 mt-1">Regional agencies (FedDev, etc.) fund expansion capital.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200">
                  <h3 className="font-semibold text-gray-800">Can I stack SR&ED?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, SR&ED credits often stack with other grants.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200">
                  <h3 className="font-semibold text-gray-800">Are these loans or grants?</h3>
                  <p className="text-sm text-gray-600 mt-1">Mix of non-repayable grants and interest-free loans.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Major Manufacturing Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What are the Top Grants for Advanced Manufacturing?</h2>

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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Which Manufacturing Technologies Qualify for Funding?</h2>

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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Are there Provincial Grants for Manufacturers?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-gray-700">🍁 Leading Provincial Programs:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong><Link href="/canada/ontario" className="hover:underline">Ontario Made Manufacturing</Link>:</strong> $1.4B for advanced manufacturing and automation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong><Link href="/canada/quebec" className="hover:underline">Quebec Manufacturing 4.0</Link>:</strong> $850M for Industry 4.0 transformation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong><Link href="/canada/british-columbia" className="hover:underline">BC Manufacturing Competitiveness</Link>:</strong> $420M for productivity enhancement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong><Link href="/canada/alberta" className="hover:underline">Alberta Diversification</Link>:</strong> $380M for manufacturing expansion</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Secure Funding for Manufacturing Projects?</h2>

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

        {/* Official Resources Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Official Manufacturing Funding Resources</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-gray-700" />
                    Government & Clusters
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://www.ngen.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:underline">
                        NGen - Next Generation Manufacturing Canada <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://ised-isde.canada.ca/site/canada-digital-adoption-program/en" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:underline">
                        Canada Digital Adoption Program (CDAP) <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://feddev-ontario.canada.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:underline">
                        Regional Development Agencies (e.g., FedDev) <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Factory className="w-5 h-5 mr-2 text-gray-700" />
                    Related Guides
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/blog/canada-federal-grants" className="flex items-center text-gray-700 hover:underline">
                        Canada Federal Grants Guide <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center text-gray-700 hover:underline">
                        SR&ED Tax Credit Guide <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/ontario-innovation-grants" className="flex items-center text-gray-700 hover:underline">
                        Ontario Innovation Grants <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <h3 className="font-bold text-lg mb-2">What does NGen fund?</h3>
                  <p className="text-gray-600">Next Generation Manufacturing Canada (NGen) funds collaborative technology development and deployment projects aiming to build world-leading advanced manufacturing capabilities in Canada. They focus on Industry 4.0, automation, and scale-up.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <h3 className="font-bold text-lg mb-2">Are there grants for buying new machinery?</h3>
                  <p className="text-gray-600">Yes, several Regional Development Agency (RDA) programs (like FedDev Ontario&apos;s Business Scale-up and Productivity) provide repayable contributions (interest-free loans) for equipment purchase. Additionally, the Accelerated Investment Incentive allows for enhanced tax write-offs.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <h3 className="font-bold text-lg mb-2">Does SR&ED cover manufacturing innovation?</h3>
                  <p className="text-gray-600">Yes, SR&ED is commonly used by manufacturers who are improving processes, developing new products, or overcoming technological uncertainties in production. It can cover labour, materials, and overheads related to experimental development.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <h3 className="font-bold text-lg mb-2">Is there funding for robotics integration?</h3>
                  <p className="text-gray-600">Yes, programs like NGen and local manufacturing streams specifically target the integration of robotics and automation to improve productivity and competitiveness.</p>
                </div>
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
      </div >
      <Footer />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What does NGen fund?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Next Generation Manufacturing Canada (NGen) funds collaborative technology development and deployment projects aiming to build world-leading advanced manufacturing capabilities in Canada. They focus on Industry 4.0, automation, and scale-up."
                }
              },
              {
                "@type": "Question",
                "name": "Are there grants for buying new machinery?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, several Regional Development Agency (RDA) programs (like FedDev Ontario's Business Scale-up and Productivity) provide repayable contributions (interest-free loans) for equipment purchase. Additionally, the Accelerated Investment Incentive allows for enhanced tax write-offs."
                }
              },
              {
                "@type": "Question",
                "name": "Does SR&ED cover manufacturing innovation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, SR&ED is commonly used by manufacturers who are improving processes, developing new products, or overcoming technological uncertainties in production. It can cover labour, materials, and overheads related to experimental development."
                }
              },
              {
                "@type": "Question",
                "name": "Is there funding for robotics integration?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, programs like NGen and local manufacturing streams specifically target the integration of robotics and automation to improve productivity and competitiveness."
                }
              }
            ]
          }),
        }}
      />
    </>
  )
}
