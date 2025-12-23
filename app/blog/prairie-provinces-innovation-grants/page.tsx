import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Wheat, Mountain, Wind, Zap, Factory, Sprout } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prairie Provinces Innovation Grants 2026 | $580M+ AgriFood, Mining & Renewable Energy Funding",
  description: "Complete guide to Prairie innovation grants. Access $580M+ through Saskatchewan Innovation, Manitoba Research, PrairiesCan funding, and agri-food, mining technology, renewable energy programs.",
  keywords: "Prairie provinces innovation grants, Saskatchewan innovation funding, Manitoba research grants, PrairiesCan funding, agri-food innovation Prairie, mining technology Saskatchewan, renewable energy Manitoba",
  openGraph: {
    title: "Prairie Provinces Innovation Grants 2026 | $580M+ AgriFood & Mining Tech",
    description: "Access $580M+ in Prairie innovation funding. Complete guide to Saskatchewan, Manitoba, PrairiesCan programs.",
    url: "https://www.fsidigital.ca/blog/prairie-provinces-innovation-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function PrairieProvincesInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-700 to-yellow-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌾 Prairie Provinces Innovation Support
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Prairie Provinces Innovation Grants & Funding 2026
              </h1>
              <p className="text-xl text-amber-100 mb-8">
                Access $580M+ in Prairie provinces innovation funding through Saskatchewan Innovation Place, Manitoba Research Council, 
                PrairiesCan regional development programs, and sector-specific support for agri-food innovation leadership, 
                mining technology excellence, and renewable energy development across Saskatchewan and Manitoba.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-amber-800 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore Prairie Programs
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

        {/* Prairie Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">$580M+</div>
                  <div className="text-gray-800">Annual Innovation Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">16+</div>
                  <div className="text-gray-800">Active Regional Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">#1</div>
                  <div className="text-gray-800">AgriFood Innovation Hub</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-lime-600 mb-2">$240M+</div>
                  <div className="text-gray-800">AgriTech Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Prairie Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Prairie Provinces Innovation Programs</h2>
              
              <div className="space-y-8">
                {/* PrairiesCan Funding */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Wheat className="w-6 h-6 text-amber-600 mr-3" />
                      <CardTitle className="text-amber-800">PrairiesCan - Prairies Economic Development Canada</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-gray-900"><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-gray-900"><strong>Regional Development</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-gray-900"><strong>Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-900 mb-4">
                      Federal regional development agency supporting innovation, business growth, and economic diversification 
                      across Manitoba, Saskatchewan, Alberta, and parts of BC with comprehensive funding programs.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900">Program Focus:</h5>
                        <ul className="text-sm text-gray-800 space-y-1">
                          <li>• Innovation commercialization</li>
                          <li>• Business scale-up and expansion</li>
                          <li>• Technology development</li>
                          <li>• Regional economic development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900">Support Features:</h5>
                        <ul className="text-sm text-gray-800 space-y-1">
                          <li>• Up to 50% of eligible project costs</li>
                          <li>• Repayable contributions</li>
                          <li>• Multi-year project support</li>
                          <li>• Export market development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Saskatchewan Innovation */}
                <Card className="border-yellow-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Mountain className="w-6 h-6 text-yellow-600 mr-3" />
                      <CardTitle className="text-yellow-800">Saskatchewan Innovation Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-gray-900"><strong>Up to $3M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-gray-900"><strong>Applied Research</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-gray-900"><strong>Cost-Share</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-900 mb-4">
                      Saskatchewan's innovation ecosystem including Innovation Place, Saskatchewan Polytechnic Applied Research, 
                      and provincial funding supporting technology commercialization and applied research.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900">Innovation Support:</h5>
                        <ul className="text-sm text-gray-800 space-y-1">
                          <li>• Innovation Place tech parks</li>
                          <li>• Applied research programs</li>
                          <li>• Commercialization support</li>
                          <li>• Industry partnerships</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900">Sector Strengths:</h5>
                        <ul className="text-sm text-gray-800 space-y-1">
                          <li>• Agricultural technology</li>
                          <li>• Mining innovation</li>
                          <li>• Energy & uranium technology</li>
                          <li>• Water & environmental tech</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Manitoba Research */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-800">Manitoba Research & Innovation Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-gray-900"><strong>Up to $2M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-gray-900"><strong>Technology Dev</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-gray-900"><strong>Various Terms</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-900 mb-4">
                      Manitoba innovation support including Research Manitoba, Mitacs programs, university partnerships, 
                      and sector-specific funding for technology development and commercialization.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900">Research Support:</h5>
                        <ul className="text-sm text-gray-800 space-y-1">
                          <li>• Research Manitoba programs</li>
                          <li>• University-industry partnerships</li>
                          <li>• Technology commercialization</li>
                          <li>• Infrastructure access</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900">Innovation Focus:</h5>
                        <ul className="text-sm text-gray-800 space-y-1">
                          <li>• Clean technology & renewable energy</li>
                          <li>• Advanced manufacturing</li>
                          <li>• AgriFood & processing</li>
                          <li>• ICT & digital innovation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AgriFood Innovation Programs */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sprout className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-800">Prairie AgriFood Innovation Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-gray-900"><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-gray-900"><strong>AgriTech</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-gray-900"><strong>Sector-Specific</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-900 mb-4">
                      Comprehensive agri-food technology support through federal Canadian Agricultural Partnership (CAP), 
                      provincial programs, and Prairie-specific initiatives for precision agriculture and food processing innovation.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900">AgriTech Areas:</h5>
                        <ul className="text-sm text-gray-800 space-y-1">
                          <li>• Precision agriculture & automation</li>
                          <li>• Crop genetics & breeding</li>
                          <li>• Livestock management systems</li>
                          <li>• Food processing technology</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900">Funding Programs:</h5>
                        <ul className="text-sm text-gray-800 space-y-1">
                          <li>• CAP cost-share programs</li>
                          <li>• Provincial agri-innovation funds</li>
                          <li>• Research facility access</li>
                          <li>• Commercialization support</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Prairie Provinces Innovation Excellence</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Agri-Food Innovation Leadership */}
                <Card className="hover:shadow-lg transition-all border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Wheat className="w-8 h-8 text-green-600" />
                      <Badge variant="outline" className="text-xs text-gray-900">$240M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg text-gray-900">Agri-Food Innovation Leadership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-800 mb-4">
                      Canada's breadbasket with world-leading agricultural technology, precision farming, 
                      crop genetics, and food processing innovation.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Precision agriculture & GPS systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Crop genetics & breeding</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Livestock management technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Food processing & value-add</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mining Technology Excellence */}
                <Card className="hover:shadow-lg transition-all border-amber-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Mountain className="w-8 h-8 text-amber-600" />
                      <Badge variant="outline" className="text-xs text-gray-900">$180M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg text-gray-900">Mining Technology Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-800 mb-4">
                      World-class mining innovation with strengths in potash, uranium, critical minerals, 
                      and mining technology development.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Mining automation & robotics</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Critical minerals processing</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Uranium & nuclear technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Sustainable mining solutions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Renewable Energy Development */}
                <Card className="hover:shadow-lg transition-all border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Wind className="w-8 h-8 text-blue-600" />
                      <Badge variant="outline" className="text-xs text-gray-900">$120M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg text-gray-900">Renewable Energy Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-800 mb-4">
                      Growing renewable energy sector with wind power, solar, hydrogen, and grid 
                      modernization expertise leveraging Prairie advantages.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Wind energy systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Solar power development</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Hydrogen production & storage</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Smart grid & energy storage</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Advanced Manufacturing */}
                <Card className="hover:shadow-lg transition-all border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Factory className="w-8 h-8 text-purple-600" />
                      <Badge variant="outline" className="text-xs text-gray-900">$90M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg text-gray-900">Advanced Manufacturing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-800 mb-4">
                      Manufacturing sector with focus on agricultural equipment, industrial machinery, 
                      and advanced manufacturing technologies.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Agricultural equipment manufacturing</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Industrial automation</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Aerospace components</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Industrial 4.0 technologies</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Digital Technology & ICT */}
                <Card className="hover:shadow-lg transition-all border-cyan-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-8 h-8 text-cyan-600" />
                      <Badge variant="outline" className="text-xs text-gray-900">$70M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg text-gray-900">Digital Technology & ICT</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-800 mb-4">
                      Growing technology sector with software development, digital agriculture platforms, 
                      and ICT services supporting regional industries.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Agricultural software platforms</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Software development</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Digital twins & IoT</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Data analytics for agriculture</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Water & Environmental Tech */}
                <Card className="hover:shadow-lg transition-all border-teal-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Sprout className="w-8 h-8 text-teal-600" />
                      <Badge variant="outline" className="text-xs text-gray-900">$50M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg text-gray-900">Water & Environmental Tech</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-800 mb-4">
                      Environmental technology development with focus on water management, soil health, 
                      and sustainable resource management solutions.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Water management systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Soil health technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Environmental monitoring</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-800">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Sustainable agriculture practices</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Prairie Regional Innovation Hubs</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Saskatchewan - Saskatoon & Regina</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-900">
                        <strong>Innovation Place & AgTech Hub:</strong> Leading agricultural technology cluster with 
                        Innovation Place tech parks, University of Saskatchewan research, and strong mining sector.
                      </p>
                      <ul className="text-sm text-gray-800 space-y-1">
                        <li>• Agricultural technology & precision farming</li>
                        <li>• Mining innovation & critical minerals</li>
                        <li>• Water & environmental technology</li>
                        <li>• Uranium & nuclear innovation</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-800">Manitoba - Winnipeg</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-900">
                        <strong>Diversified Innovation:</strong> Balanced economy with strong agri-food, advanced manufacturing, 
                        clean technology, and growing ICT sector through university partnerships.
                      </p>
                      <ul className="text-sm text-gray-800 space-y-1">
                        <li>• Clean technology & renewable energy</li>
                        <li>• Advanced manufacturing & aerospace</li>
                        <li>• AgriFood processing & innovation</li>
                        <li>• ICT & digital technology</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Prairie Innovation Funding Success Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">✅ Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-900">
                          <strong>Leverage PrairiesCan:</strong> Access federal regional development support and business growth funding
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-900">
                          <strong>Focus on AgriTech:</strong> Capitalize on Prairie agricultural technology leadership and expertise
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-900">
                          <strong>Innovation Place Network:</strong> Utilize Saskatchewan's tech park infrastructure and resources
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-900">
                          <strong>CAP AgriFood Programs:</strong> Access Canadian Agricultural Partnership cost-share funding
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-800">❌ Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-900">
                          <strong>Missing PrairiesCan Programs:</strong> Not exploring comprehensive regional development support
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-900">
                          <strong>Ignoring AgriTech Focus:</strong> Missing opportunities in agricultural technology excellence
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-900">
                          <strong>No University Partnerships:</strong> Failing to leverage University of Saskatchewan/Manitoba research
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-900">
                          <strong>Weak Sector Alignment:</strong> Not matching with Prairie mining, agritech, or renewable energy strengths
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
        <section className="py-20 bg-gradient-to-r from-amber-700 to-yellow-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Prairie Innovation Funding?
              </h2>
              <p className="text-xl text-amber-100 mb-8">
                Get expert help navigating Prairie provinces innovation ecosystem and maximizing your PrairiesCan, Saskatchewan, 
                and Manitoba funding. Our Prairie specialists have secured $65M+ in regional innovation funding.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-amber-800 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=prairie-provinces-innovation-grants-expert-help">
                    Get Expert Help
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    View All Provincial Support
                  </Link>
                </Button>
              </div>
              
              <p className="text-amber-200 text-sm mt-6">
                74% success rate • $65M+ secured • AgriTech, Mining & Regional expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
