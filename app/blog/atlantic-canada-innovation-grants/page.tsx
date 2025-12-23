import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Anchor, Waves, Wind, Plane, Ship, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Atlantic Canada Innovation Grants & Funding 2026 | 15% ACITC | $650M+ Ocean Tech Support",
  description: "Complete guide to Atlantic Canada innovation grants. Access $650M+ through Atlantic Innovation Fund, ACOA programs, 15% ACITC tax credit, and ocean technology, renewable energy, aerospace funding.",
  keywords: "Atlantic Canada innovation grants, ACOA funding, Atlantic Innovation Fund, ACITC tax credit, ocean technology grants, maritime innovation Atlantic, renewable energy Atlantic, aerospace Atlantic Canada",
  openGraph: {
    title: "Atlantic Canada Innovation Grants 2026 | $650M+ Ocean Tech & Maritime",
    description: "Access $650M+ in Atlantic Canada innovation funding. Complete guide to ACOA, Atlantic Innovation Fund, and ocean technology programs.",
    url: "https://www.fsidigital.ca/blog/atlantic-canada-innovation-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function AtlanticCanadaInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-cyan-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                ⚓ Atlantic Canada Provincial Innovation Support
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Atlantic Canada Innovation Grants & Funding 2026
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access $650M+ in Atlantic Canada innovation funding through the Atlantic Innovation Fund, ACOA regional development programs,
                15% Atlantic Canada Innovation Tax Credit (ACITC), and sector-specific support for ocean technology leadership,
                renewable energy excellence, and aerospace innovation across Canada's maritime innovation ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore Atlantic Programs
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

        {/* Atlantic Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$650M+</div>
                  <div className="text-gray-600">Annual Innovation Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-600 mb-2">15%</div>
                  <div className="text-gray-600">ACITC Tax Credit Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">20+</div>
                  <div className="text-gray-600">Active Regional Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-sky-600 mb-2">#1</div>
                  <div className="text-gray-600">Ocean Technology Hub</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Atlantic Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Atlantic Canada Innovation Programs</h2>

              <div className="space-y-8">
                {/* Atlantic Innovation Fund */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Anchor className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Atlantic Innovation Fund (AIF)</CardTitle>
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
                        <span><strong>Strategic Projects</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal program supporting innovation-driven companies and economic development organizations in Atlantic Canada
                      with repayable contributions for R&D, commercialization, and business scale-up projects.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Project Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Research and development projects</li>
                          <li>• Technology commercialization</li>
                          <li>• Business expansion and scale-up</li>
                          <li>• Regional innovation partnerships</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 30% of project costs (repayable)</li>
                          <li>• Multi-year project support</li>
                          <li>• Job creation focus</li>
                          <li>• Export market development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* ACOA Business Development */}
                <Card className="border-cyan-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Waves className="w-6 h-6 text-cyan-600 mr-3" />
                      <CardTitle className="text-cyan-700">ACOA Business Development Programs</CardTitle>
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
                        <span><strong>Business Growth</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Flexible Terms</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Atlantic Canada Opportunities Agency (ACOA) providing comprehensive business development support including
                      innovation funding, market expansion assistance, and regional economic development initiatives.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">ACOA Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business Development Program</li>
                          <li>• Innovation initiatives</li>
                          <li>• Trade and investment support</li>
                          <li>• Community economic development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Repayable and non-repayable contributions</li>
                          <li>• Business advisory services</li>
                          <li>• Export market development</li>
                          <li>• Network and partnership connections</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ocean Technology Programs */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Ship className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Ocean Technology & Maritime Innovation</CardTitle>
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
                        <span><strong>Ocean Tech</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Sector-Specific</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Sector-specific funding for ocean technology development including marine renewable energy, ocean observation,
                      aquaculture technology, and maritime innovation through various federal and provincial programs.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Ocean Tech Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Marine renewable energy (tidal, wave)</li>
                          <li>• Ocean observation & monitoring</li>
                          <li>• Aquaculture technology</li>
                          <li>• Underwater robotics & sensors</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Ocean Supercluster initiatives</li>
                          <li>• Marine renewables funding</li>
                          <li>• Fisheries innovation programs</li>
                          <li>• COVE (Centre for Ocean Ventures)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Provincial Tax Credits */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">Provincial R&D Tax Credits (ACITC 15%)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>15% Tax Credit</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>R&D Activities</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Refundable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Atlantic provinces offer R&D tax credits including Nova Scotia's 15% ACITC (Atlantic Canada Innovation Tax Credit),
                      New Brunswick's R&D tax credit, and Newfoundland's R&D tax credit, stackable with federal SR&ED.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Provincial Credits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Nova Scotia: 15% ACITC (refundable)</li>
                          <li>• New Brunswick: 15% R&D credit</li>
                          <li>• Newfoundland: 15% R&D credit</li>
                          <li>• PEI: Various innovation incentives</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Combined Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Stacks with federal SR&ED</li>
                          <li>• Up to 80% total support for SMEs</li>
                          <li>• Refundable for eligible corporations</li>
                          <li>• R&D wage and material support</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Atlantic Canada Innovation Sector Excellence</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Ocean Technology Leadership */}
                <Card className="hover:shadow-lg transition-all border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Waves className="w-8 h-8 text-blue-600" />
                      <Badge variant="outline" className="text-xs">$280M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Ocean Technology Leadership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      World-leading ocean technology cluster with expertise in marine renewable energy,
                      ocean observation, aquaculture tech, and underwater systems.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Tidal & wave energy systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Ocean observation & sensors</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Aquaculture technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Underwater robotics</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Renewable Energy */}
                <Card className="hover:shadow-lg transition-all border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Wind className="w-8 h-8 text-green-600" />
                      <Badge variant="outline" className="text-xs">$190M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Renewable Energy Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Strong renewable energy sector with wind power, tidal energy, and grid modernization
                      expertise serving Atlantic and international markets.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Wind energy systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Tidal power development</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Grid integration & storage</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Hydrogen projects</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Aerospace & Defence */}
                <Card className="hover:shadow-lg transition-all border-cyan-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Plane className="w-8 h-8 text-cyan-600" />
                      <Badge variant="outline" className="text-xs">$180M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Aerospace & Defence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Growing aerospace sector with strengths in MRO (maintenance, repair, overhaul),
                      composites, and defence technology applications.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Aircraft MRO services</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Composite manufacturing</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Defence systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>UAV & drone technology</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Digital Technology & IT */}
                <Card className="hover:shadow-lg transition-all border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-8 h-8 text-purple-600" />
                      <Badge variant="outline" className="text-xs">$120M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Digital Technology & IT</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Growing technology sector with software development, cybersecurity, gaming,
                      and IT services supporting regional and global clients.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Software development</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Cybersecurity solutions</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Gaming & interactive media</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Cloud & SaaS platforms</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Life Sciences & Health */}
                <Card className="hover:shadow-lg transition-all border-red-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Anchor className="w-8 h-8 text-red-600" />
                      <Badge variant="outline" className="text-xs">$90M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Life Sciences & Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Emerging life sciences sector with medical devices, digital health,
                      and marine biotechnology innovation.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Medical device development</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Digital health solutions</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Marine biotechnology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Nutraceuticals from ocean</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AgriFood & Natural Resources */}
                <Card className="hover:shadow-lg transition-all border-amber-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Ship className="w-8 h-8 text-amber-600" />
                      <Badge variant="outline" className="text-xs">$70M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">AgriFood & Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Agricultural technology and natural resource innovation including fisheries tech,
                      forestry innovation, and food processing.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Fisheries technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Food processing innovation</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Forestry tech & sustainable lumber</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Agricultural automation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Innovation Hubs - All 4 Atlantic Provinces */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Atlantic Canada Regional Innovation Hubs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Nova Scotia - Halifax Ocean Supercluster</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Ocean Tech Capital:</strong> Atlantic Canada's innovation leader with COVE, Ocean Supercluster,
                        strong universities (Dalhousie, SMU), and vibrant startup ecosystem.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Ocean technology & marine renewables</li>
                        <li>• Digital technology & software</li>
                        <li>• Life sciences & health innovation</li>
                        <li>• Aerospace & defence</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-cyan-200">
                  <CardHeader>
                    <CardTitle className="text-cyan-700">New Brunswick - Saint John & Fredericton</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Energy & IT Hub:</strong> Energy innovation focus with Irving, growing IT sector,
                        and strong University of New Brunswick research commercialization.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Energy innovation & small modular reactors</li>
                        <li>• Information technology & cybersecurity</li>
                        <li>• Forest products innovation</li>
                        <li>• Advanced manufacturing</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">Newfoundland & Labrador - St. John's</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Offshore & Ocean Tech:</strong> Offshore oil & gas expertise transitioning to ocean technology,
                        renewable energy, and Memorial University research strength.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Offshore energy (oil, gas, wind)</li>
                        <li>• Ocean technology & robotics</li>
                        <li>• Aquaculture & fisheries tech</li>
                        <li>• Mining technology innovation</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Prince Edward Island - Charlottetown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>AgriTech & Aerospace:</strong> Agricultural technology focus, aerospace manufacturing,
                        and growing IT sector with strong quality of life advantages.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Agricultural technology & precision farming</li>
                        <li>• Aerospace manufacturing & composites</li>
                        <li>• Biosciences & food innovation</li>
                        <li>• IT services & remote work hubs</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Atlantic Canada Funding Success Strategies</h2>

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
                          <strong>Leverage ACOA Support:</strong> Comprehensive business development and innovation funding access
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Apply for Atlantic Innovation Fund:</strong> Up to $15M for strategic innovation projects
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Maximize Provincial Tax Credits:</strong> Stack ACITC (15%) with federal SR&ED for up to 80% support
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Ocean Tech Focus:</strong> Leverage Atlantic Canada's unique ocean technology strengths
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
                          <strong>Missing ACOA Programs:</strong> Not exploring full range of ACOA business development support
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Ignoring Provincial Credits:</strong> Missing opportunities for ACITC and provincial R&D tax credits
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Sector Alignment:</strong> Not matching with Atlantic's ocean tech or renewable energy strengths
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Regional Connections:</strong> Failing to leverage local innovation networks and partnerships
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
        <section className="py-20 bg-gradient-to-r from-blue-800 to-cyan-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Atlantic Canada Innovation Funding?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get expert help navigating Atlantic Canada's innovation ecosystem and maximizing your ACOA, Atlantic Innovation Fund,
                and provincial tax credit funding. Our Atlantic specialists have secured $85M+ in regional innovation funding.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=atlantic-canada-innovation-grants-expert-help">
                    Get Expert Help
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    View All Provincial Programs
                  </Link>
                </Button>
              </div>

              <p className="text-blue-200 text-sm mt-6">
                75% success rate • $85M+ secured • Ocean Tech, ACOA & Regional expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
