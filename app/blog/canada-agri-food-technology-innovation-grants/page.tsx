import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Sprout, Wheat, Tractor, Leaf } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Agri-Food Technology Grants 2026 | $2.3B+ AgriInnovate & Precision Agriculture Funding",
  description: "Complete guide to Canadian agri-food technology innovation grants. Access $2.3B+ funding through AgriInnovate, precision agriculture programs, food processing technology, and 32+ agritech grants.",
  keywords: "Canada agriculture grants, AgriInnovate funding, precision agriculture grants Canada, food technology funding, agritech innovation grants, farm technology grants, food processing grants Canada, sustainable agriculture funding",
  openGraph: {
    title: "Canada Agri-Food Technology Grants 2026 | $2.3B+ AgriTech Funding",
    description: "Access $2.3B+ in agri-food technology funding. Complete guide to AgriInnovate, precision agriculture, and food processing grants.",
    url: "https://www.fsidigital.ca/blog/canada-agri-food-technology-innovation-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function CanadaAgriFoodTechnologyInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-700 to-emerald-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌾 Agri-Food Technology Innovation Grants
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Agri-Food Technology Innovation Grants 2026
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Access $2.3B+ in agricultural technology and food innovation funding through 32+ federal and provincial programs. 
                From AgriInnovate commercialization to precision agriculture initiatives - accelerate your farm technology, 
                food processing innovation, sustainable agriculture, and agritech solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore AgriTech Programs
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

        {/* Agri-Food Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$2.3B+</div>
                  <div className="text-gray-600">AgriTech Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">32+</div>
                  <div className="text-gray-600">Active Agriculture Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$10M</div>
                  <div className="text-gray-600">Max AgriInnovate Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">50%</div>
                  <div className="text-gray-600">Typical Cost Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major AgriFood Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Agri-Food Technology Programs</h2>
              
              <div className="space-y-8">
                {/* AgriInnovate */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sprout className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">AgriInnovate Program</CardTitle>
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
                        <span><strong>Commercialization</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Agriculture and Agri-Food Canada's flagship program for accelerating commercialization and adoption 
                      of innovative agricultural products, technologies, and processes.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">AgriTech Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Precision agriculture technology</li>
                          <li>• Food processing innovation</li>
                          <li>• Agricultural biotechnology</li>
                          <li>• Sustainable farming solutions</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Support:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 50% of eligible project costs</li>
                          <li>• Repayable contributions (interest-free)</li>
                          <li>• Technology commercialization focus</li>
                          <li>• Market development support</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AgriScience */}
                <Card className="border-emerald-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Wheat className="w-6 h-6 text-emerald-600 mr-3" />
                      <CardTitle className="text-emerald-700">AgriScience Program - Clusters Component</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $3M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>R&D Projects</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Collaborative</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Support for pre-commercial science research and innovation through industry-led research networks 
                      addressing agriculture and agri-food sector priorities.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Research Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Crop genetics and breeding</li>
                          <li>• Soil health and sustainability</li>
                          <li>• Livestock health and productivity</li>
                          <li>• Climate change adaptation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Industry-led research clusters</li>
                          <li>• Collaborative projects required</li>
                          <li>• Up to 75% cost-share available</li>
                          <li>• Pre-commercial research focus</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Canadian Agricultural Partnership */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Tractor className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Canadian Agricultural Partnership (CAP)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Varies by Province</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>On-Farm Innovation</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Cost-Share</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal-provincial-territorial framework providing cost-share funding for on-farm technology adoption, 
                      innovation, and market development initiatives.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Farm Technology:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Precision farming equipment</li>
                          <li>• Smart irrigation systems</li>
                          <li>• Automated feeding systems</li>
                          <li>• Environmental monitoring</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Cost-Share Support:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Varies by province (typically 25-50%)</li>
                          <li>• On-farm adoption projects</li>
                          <li>• Energy efficiency upgrades</li>
                          <li>• Environmental sustainability</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AgriAssurance */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Leaf className="w-6 h-6 text-amber-600 mr-3" />
                      <CardTitle className="text-amber-700">AgriAssurance - Food Safety & Traceability</CardTitle>
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
                        <span><strong>Food Safety</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Systems Development</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Funding for development and implementation of food safety systems, traceability solutions, 
                      and assurance programs for agricultural products.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Systems:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Food safety certification systems</li>
                          <li>• Traceability technology platforms</li>
                          <li>• Quality assurance programs</li>
                          <li>• Blockchain for food supply chain</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 70% cost-share available</li>
                          <li>• Industry-wide systems</li>
                          <li>• Market access enhancement</li>
                          <li>• Export competitiveness</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* AgriTech by Technology */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Agri-Food Funding by Technology</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Tractor className="w-8 h-8 text-green-600" />,
                    title: "Precision Agriculture",
                    funding: "$850M+",
                    programs: "15+ Programs",
                    features: ["GPS-guided equipment", "Sensor technology", "Variable rate application"]
                  },
                  {
                    icon: <Sprout className="w-8 h-8 text-emerald-600" />,
                    title: "Vertical Farming",
                    funding: "$420M+",
                    programs: "8+ Programs",
                    features: ["Indoor agriculture", "Controlled environment", "Urban farming systems"]
                  },
                  {
                    icon: <Wheat className="w-8 h-8 text-amber-600" />,
                    title: "Food Processing Tech",
                    funding: "$680M+",
                    programs: "12+ Programs",
                    features: ["Automation systems", "Food safety technology", "Packaging innovation"]
                  },
                  {
                    icon: <Leaf className="w-8 h-8 text-lime-600" />,
                    title: "Sustainable Agriculture",
                    funding: "$520M+",
                    programs: "10+ Programs",
                    features: ["Organic farming", "Carbon sequestration", "Water conservation"]
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

        {/* Provincial AgriFood Support */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Provincial Agri-Food Programs</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">🍁 Leading Provincial Programs:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Ontario AgriFood:</strong> $850M for farm technology and food processing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Quebec AgriInnovation:</strong> $620M for precision agriculture</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Prairie Agricultural Innovation:</strong> $540M for farm technology</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>BC AgriTech:</strong> $380M for sustainable agriculture</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-emerald-700">🎯 Priority AgriTech Areas:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Smart Farming:</strong> IoT sensors and data analytics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Alternative Proteins:</strong> Plant-based and cellular agriculture</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Climate Resilience:</strong> Drought-resistant crops</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Automation:</strong> Robotic harvesting and processing</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">AgriTech Funding Success Strategies</h2>
              
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
                          <strong>Measurable Impact:</strong> Quantify yield improvements, cost savings, and sustainability gains
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Farm-Level Testing:</strong> Demonstrate technology validation on real farms
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Industry Partnerships:</strong> Collaborate with farmers, processors, and retailers
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Market Adoption Path:</strong> Clear strategy for farmer adoption and scaling
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
                          <strong>No Farm Validation:</strong> Insufficient real-world testing in agricultural settings
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Economic Case:</strong> Unclear ROI or payback period for farmers
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Ignoring Farmer Needs:</strong> Technology without farmer input or usability
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Limited Market Understanding:</strong> No clear distribution or adoption strategy
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
        <section className="py-20 bg-gradient-to-r from-green-700 to-emerald-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Agri-Food Technology Funding?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Get our complete agri-food funding guide or work with specialists who have secured 
                $78M+ in agriculture grants across AgriInnovate, CAP, and precision farming programs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Complete Application Guide</h4>
                  <p className="text-green-100 text-sm mb-4">
                    Get our step-by-step agri-food funding guide with AgriInnovate templates, CAP tools, and farm technology grant strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-agri-food-funding-guide">
                      <Download className="w-4 h-4 mr-2" />
                      View Application Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert AgriTech Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with agri-food funding specialists who have secured $78M+ with 72% success rate across AgriInnovate and precision agriculture programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=agritech-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-green-200 text-sm mt-6">
                72% success rate • $78M+ secured • AgriInnovate, CAP & Precision Agriculture expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
