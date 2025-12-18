import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Factory, Stethoscope, Cpu, Wheat, Beaker } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Industry-Specific Business Grants Guide 2026 | Sector-Focused Funding Programs",
  description: "Complete guide to industry-specific business grants. Find targeted funding for manufacturing, healthcare, technology, agriculture, and specialized business sectors.",
  keywords: "industry specific grants, sector grants, manufacturing grants, healthcare grants, technology grants, agriculture grants",
  openGraph: {
    title: "Industry-Specific Business Grants Guide 2026",
    description: "Complete guide to industry-specific business grants with targeted funding for specialized sectors.",
    url: "https://fsidigital.ca/blog/industry-specific-business-grants-guide",
  },
}

export default function IndustrySpecificBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏭 Industry-Specific Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Industry-Specific Business Grants Guide
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Complete guide to industry-specific business grants. Find targeted funding programs for manufacturing, 
                healthcare, technology, agriculture, and other specialized business sectors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100">
                  Start Reading Guide
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/guides/apply-federal-grants">
                    Get Industry Grant Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-teal-600 mb-2">200+</div>
                <div className="text-gray-600">Industry-Specific Programs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-600 mb-2">$1M</div>
                <div className="text-gray-600">Maximum Grant Awards</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
                <div className="text-gray-600">Major Industry Sectors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">$8B</div>
                <div className="text-gray-600">Annual Industry Grants</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* What are Industry-Specific Grants */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are Industry-Specific Business Grants?</h2>
                
                <p className="text-lg text-gray-700 mb-6">
                  Industry-specific business grants are targeted funding programs designed to address the unique needs, 
                  challenges, and opportunities within particular business sectors. These grants often focus on innovation, 
                  research, modernization, and growth within specialized industries.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-teal-200">
                    <CardHeader>
                      <CardTitle className="text-teal-700">Why Industry-Specific Grants?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Address sector-specific challenges</li>
                        <li>• Promote industry innovation</li>
                        <li>• Support economic priorities</li>
                        <li>• Meet regulatory requirements</li>
                        <li>• Enhance competitiveness</li>
                        <li>• Drive technological advancement</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-cyan-200">
                    <CardHeader>
                      <CardTitle className="text-cyan-700">Funding Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Federal agencies (USDA, NIH, DOE, etc.)</li>
                        <li>• State economic development programs</li>
                        <li>• Industry associations</li>
                        <li>• Private foundations</li>
                        <li>• Corporate grant programs</li>
                        <li>• Professional organizations</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Major Industry Grant Categories */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Major Industry Grant Categories</h2>
                
                <div className="space-y-8">
                  {/* Healthcare & Life Sciences */}
                  <Card className="border-pink-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Stethoscope className="w-6 h-6 text-pink-600 mr-3" />
                        <CardTitle className="text-pink-700">Healthcare & Life Sciences</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Range:</strong> $50K - $1M</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 1-5 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Focus:</strong> Research & Innovation</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        Grants for medical device development, pharmaceutical research, healthcare technology, 
                        and clinical innovations from NIH, FDA, and private health foundations.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-pink-700">Major Programs:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• NIH SBIR/STTR grants</li>
                            <li>• FDA Orphan Products Development</li>
                            <li>• BARDA medical countermeasures</li>
                            <li>• CDC prevention research</li>
                            <li>• Private foundation health grants</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-pink-700">Eligible Activities:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Medical device R&D</li>
                            <li>• Drug discovery & development</li>
                            <li>• Digital health solutions</li>
                            <li>• Clinical trials</li>
                            <li>• Healthcare delivery innovation</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Manufacturing */}
                  <Card className="border-orange-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Factory className="w-6 h-6 text-orange-600 mr-3" />
                        <CardTitle className="text-orange-700">Manufacturing & Industrial</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Range:</strong> $25K - $500K</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 1-3 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Focus:</strong> Modernization & Efficiency</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        Funding for manufacturing innovation, automation, supply chain improvements, 
                        and advanced manufacturing technologies.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-orange-700">Key Programs:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• DOD ManTech programs</li>
                            <li>• NIST Manufacturing Extension Partnership</li>
                            <li>• State manufacturing incentives</li>
                            <li>• Industry 4.0 initiatives</li>
                            <li>• Supply chain resilience grants</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-orange-700">Funding Areas:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Advanced manufacturing R&D</li>
                            <li>• Automation & robotics</li>
                            <li>• Process improvements</li>
                            <li>• Quality systems</li>
                            <li>• Workforce development</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Technology & Software */}
                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Cpu className="w-6 h-6 text-blue-600 mr-3" />
                        <CardTitle className="text-blue-700">Technology & Software Development</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Range:</strong> $50K - $1.7M</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 6 months - 2 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Focus:</strong> Innovation & Commercialization</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        Grants for software development, artificial intelligence, cybersecurity, 
                        and emerging technology commercialization.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Major Sources:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• NSF SBIR/STTR programs</li>
                            <li>• DOD technology development</li>
                            <li>• DHS cybersecurity innovation</li>
                            <li>• DOE advanced computing</li>
                            <li>• Private tech accelerators</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-700">Technology Areas:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Artificial intelligence & ML</li>
                            <li>• Cybersecurity solutions</li>
                            <li>• Cloud & edge computing</li>
                            <li>• Quantum technologies</li>
                            <li>• Blockchain applications</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Agriculture & Food */}
                  <Card className="border-green-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Wheat className="w-6 h-6 text-green-600 mr-3" />
                        <CardTitle className="text-green-700">Agriculture & Food Systems</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Range:</strong> $10K - $600K</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 1-4 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Focus:</strong> Sustainability & Innovation</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        Funding for agricultural innovation, food safety, sustainable farming, 
                        and rural business development.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">USDA Programs:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• SBIR Agriculture research</li>
                            <li>• Rural Business Development Grants</li>
                            <li>• Specialty Crop Block Grants</li>
                            <li>• Sustainable Agriculture Research</li>
                            <li>• Value-Added Producer Grants</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-green-700">Focus Areas:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Precision agriculture</li>
                            <li>• Food safety technology</li>
                            <li>• Sustainable farming practices</li>
                            <li>• Agricultural biotechnology</li>
                            <li>• Farm-to-table innovations</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Clean Energy & Environment */}
                  <Card className="border-emerald-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Beaker className="w-6 h-6 text-emerald-600 mr-3" />
                        <CardTitle className="text-emerald-700">Clean Energy & Environmental</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Range:</strong> $100K - $1.5M</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Duration:</strong> 1-3 years</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Focus:</strong> Clean Technology</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        Grants for renewable energy, environmental remediation, clean technology 
                        development, and sustainability initiatives.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-emerald-700">Major Programs:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• DOE SBIR clean energy</li>
                            <li>• EPA environmental innovation</li>
                            <li>• NSF sustainable technology</li>
                            <li>• State renewable energy funds</li>
                            <li>• Private environmental grants</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-emerald-700">Technology Areas:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Solar & wind technology</li>
                            <li>• Energy storage systems</li>
                            <li>• Water treatment solutions</li>
                            <li>• Waste reduction technology</li>
                            <li>• Carbon capture & storage</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* How to Find Industry Grants */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Find Industry-Specific Grants</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Industry Associations</h4>
                    <p className="text-sm text-gray-600">
                      Check professional and trade associations in your industry
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Federal Agencies</h4>
                    <p className="text-sm text-gray-600">
                      Research agencies that regulate or support your industry
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Grant Databases</h4>
                    <p className="text-sm text-gray-600">
                      Use specialized databases and search by industry keywords
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Industry Events</h4>
                    <p className="text-sm text-gray-600">
                      Attend conferences and networking events in your sector
                    </p>
                  </div>
                </div>
              </div>

              {/* Application Success Tips */}
              <div className="bg-cyan-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Industry Grant Application Success Tips</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Demonstrate deep industry knowledge</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Show market need and potential impact</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Include industry partnerships</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Address sector-specific challenges</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-teal-700">🎯 Application Tips</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                        <span>Use industry-specific terminology correctly</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                        <span>Reference relevant regulations and standards</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                        <span>Show alignment with industry priorities</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                        <span>Include letters of support from industry leaders</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Find Industry-Specific Grants?</h3>
                <p className="text-teal-100 mb-6 text-lg">
                  Get our comprehensive industry grant directory with sector-specific programs, 
                  application strategies, and industry funding resources.
                </p>
                <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100" asChild>
                  <Link href="/guides/apply-federal-grants">
                    Get Industry Grant Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
