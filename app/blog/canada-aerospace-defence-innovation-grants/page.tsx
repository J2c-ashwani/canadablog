import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Rocket, Plane, Satellite, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Aerospace & Defence Grants 2026 | $450M+ Space Technology & Aviation Funding | CSA Programs",
  description: "Complete guide to Canadian aerospace and defence innovation grants. Access $450M+ funding through Canadian Space Agency programs, defence innovation initiatives, and 12+ aviation technology grants.",
  keywords: "Canada aerospace grants, space technology funding Canada, defence innovation grants, Canadian Space Agency funding, aviation grants Canada, satellite development funding, aerospace manufacturing grants",
  openGraph: {
    title: "Canada Aerospace & Defence Grants 2026 | $450M+ Space & Aviation Funding",
    description: "Access $450M+ in aerospace and defence funding. Complete guide to CSA, defence innovation, and aviation technology grants.",
    url: "https://www.fsidigital.ca/blog/canada-aerospace-defence-innovation-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function CanadaAerospaceDefenceInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                ✈️ Aerospace & Defence Innovation Grants
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Aerospace & Defence Innovation Grants 2026
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access $450M+ in aerospace and defence technology funding through 12+ federal and provincial programs. 
                From Canadian Space Agency initiatives to defence innovation contracts - accelerate your space technology, 
                aviation innovation, satellite development, and defence applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore Aerospace Programs
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

        {/* Aerospace Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$450M+</div>
                  <div className="text-gray-600">Aerospace Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">12+</div>
                  <div className="text-gray-600">Active Aerospace Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$5M</div>
                  <div className="text-gray-600">Max CSA Project Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">50%</div>
                  <div className="text-gray-600">Typical Cost Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Aerospace Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Aerospace & Defence Programs</h2>
              
              <div className="space-y-8">
                {/* Canadian Space Agency */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Rocket className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Canadian Space Agency (CSA) Programs</CardTitle>
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
                        <span><strong>Space Technology</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Multi-Year</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canadian Space Agency funding for space technology development, satellite systems, 
                      Earth observation, space exploration, and commercial space applications.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Space Technology Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Satellite development and subsystems</li>
                          <li>• Earth observation and remote sensing</li>
                          <li>• Space robotics and automation</li>
                          <li>• Spacecraft propulsion systems</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Support:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 50% of eligible project costs</li>
                          <li>• Space Technology Development Program</li>
                          <li>• Lunar Gateway participation</li>
                          <li>• Commercial space partnerships</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Defence Innovation */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">Innovation for Defence Excellence and Security (IDEaS)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $1.5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Defence Innovation</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Competitive</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Department of National Defence program supporting innovative solutions for defence and security 
                      challenges through competitive innovation challenges and sandbox initiatives.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Defence Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Autonomous systems and AI</li>
                          <li>• Cybersecurity and cyber defence</li>
                          <li>• Surveillance and reconnaissance</li>
                          <li>• Communication systems</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Components:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Competitive challenges (up to $150K)</li>
                          <li>• Sandbox program (up to $1.5M)</li>
                          <li>• Non-repayable contributions</li>
                          <li>• Intellectual property retention</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* IRAP Aerospace */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Plane className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">IRAP Aerospace & Aviation Innovation</CardTitle>
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
                        <span><strong>Aviation R&D</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      IRAP funding for aerospace and aviation SMEs developing innovative aircraft systems, 
                      advanced materials, propulsion technologies, and aviation safety solutions.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Aviation Technologies:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Aircraft design and systems</li>
                          <li>• Advanced composite materials</li>
                          <li>• Propulsion and engine technology</li>
                          <li>• Avionics and flight systems</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Included:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 60-80% of eligible R&D costs</li>
                          <li>• Industrial Technology Advisor</li>
                          <li>• Aerospace certification support</li>
                          <li>• Export market development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Regional Aerospace Clusters */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Satellite className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Regional Aerospace Clusters & SIF</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$5M - $50M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Large Projects</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Strategic</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Strategic Innovation Fund and regional aerospace cluster support for large-scale 
                      aerospace manufacturing, technology commercialization, and industry partnerships.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Aerospace Clusters:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Montreal aerospace hub</li>
                          <li>• Toronto aerospace corridor</li>
                          <li>• Western Canada aerospace</li>
                          <li>• Atlantic aerospace network</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Strategic Projects:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Aircraft manufacturing expansion</li>
                          <li>• Aerospace supply chain development</li>
                          <li>• Technology demonstration projects</li>
                          <li>• Workforce development programs</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Aerospace by Technology */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Aerospace Funding by Technology</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Satellite className="w-8 h-8 text-blue-600" />,
                    title: "Satellite Systems",
                    funding: "$180M+",
                    programs: "6+ Programs",
                    features: ["Satellite manufacturing", "Earth observation", "Space communications"]
                  },
                  {
                    icon: <Rocket className="w-8 h-8 text-indigo-600" />,
                    title: "Space Technology",
                    funding: "$150M+",
                    programs: "5+ Programs",
                    features: ["Launch systems", "Space robotics", "Lunar exploration"]
                  },
                  {
                    icon: <Plane className="w-8 h-8 text-green-600" />,
                    title: "Aircraft Development",
                    funding: "$200M+",
                    programs: "7+ Programs",
                    features: ["Aircraft design", "Urban air mobility", "Electric aviation"]
                  },
                  {
                    icon: <Shield className="w-8 h-8 text-red-600" />,
                    title: "Defence Systems",
                    funding: "$120M+",
                    programs: "4+ Programs",
                    features: ["Surveillance systems", "Cyber defence", "Autonomous platforms"]
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

        {/* Success Tips */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Aerospace Funding Success Strategies</h2>
              
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
                          <strong>Technical Innovation:</strong> Demonstrate clear aerospace technology advancement
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Certification Strategy:</strong> Clear path to aerospace certification and regulatory approval
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Industry Partnerships:</strong> Collaboration with established aerospace primes
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Export Potential:</strong> International market opportunities and competitiveness
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
                          <strong>Weak Technical Case:</strong> Insufficient demonstration of aerospace innovation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Certification Plan:</strong> Unclear path to aerospace regulatory approval
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Limited Market Access:</strong> No clear commercialization or customer acquisition strategy
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Inadequate Team:</strong> Insufficient aerospace expertise and technical capability
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
        <section className="py-20 bg-gradient-to-r from-blue-700 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Aerospace & Defence Funding?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get our complete aerospace funding guide or work with specialists who have secured 
                $65M+ in aerospace grants across CSA, IDEaS, and aviation programs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Complete Application Guide</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our step-by-step aerospace funding guide with CSA templates, defence innovation tools, and aviation grant strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-aerospace-defence-funding-guide">
                      <Download className="w-4 h-4 mr-2" />
                      View Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Aerospace Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with aerospace funding specialists who have secured $65M+ with 74% success rate across CSA and defence programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=aerospace-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-blue-200 text-sm mt-6">
                74% success rate • $65M+ secured • CSA, IDEaS & Aviation expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
