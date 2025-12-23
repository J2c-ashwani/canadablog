import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Plane, Gamepad2, Microscope, Zap, Building2, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quebec Innovation Grants & Tax Credits 2026 | 30% CRIC R&D Tax Credit | $2.5B+ Funding",
  description: "Complete guide to Quebec innovation grants and tax credits. Access $2.5B+ through 30% Quebec R&D Tax Credit (CRIC), Investissement Québec, PRIMA Quebec, and aerospace, gaming, biotech programs.",
  keywords: "Quebec innovation grants, CRIC tax credit Quebec, Quebec R&D tax credit 30%, Investissement Quebec funding, PRIMA Quebec, aerospace grants Quebec, gaming VFX Quebec, biotech Quebec grants",
  openGraph: {
    title: "Quebec Innovation Grants & Tax Credits 2026 | $2.5B+ CRIC & R&D Support",
    description: "Access $2.5B+ in Quebec innovation funding. Complete guide to 30% CRIC, Investissement Québec, and francophone innovation programs.",
    url: "https://www.fsidigital.ca/blog/quebec-innovation-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function QuebecInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-700 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                ⚜️ Quebec Provincial Innovation Support
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Quebec Innovation Grants & Tax Credits 2026
              </h1>
              <p className="text-xl text-cyan-100 mb-8">
                Access $2.5B+ in Quebec innovation funding through the 30% Quebec R&D Tax Credit (CRIC), 
                Investissement Québec programs, PRIMA Quebec initiatives, and sector-specific support for 
                aerospace excellence, gaming & VFX leadership, and biotech clusters across Canada's premier francophone innovation ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-cyan-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore Quebec Programs
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

        {/* Quebec Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-cyan-600 mb-2">$2.5B+</div>
                  <div className="text-gray-600">Annual Innovation Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
                  <div className="text-gray-600">CRIC R&D Tax Credit Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">20+</div>
                  <div className="text-gray-600">Active Provincial Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-sky-600 mb-2">#2</div>
                  <div className="text-gray-600">Innovation Ecosystem in Canada</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Quebec Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Quebec Innovation Programs</h2>
              
              <div className="space-y-8">
                {/* Quebec R&D Tax Credit (CRIC) */}
                <Card className="border-cyan-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-6 h-6 text-cyan-600 mr-3" />
                      <CardTitle className="text-cyan-700">Quebec R&D Tax Credit (CRIC) - 30% Refundable Tax Credit</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>30% Tax Credit</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>R&D Expenditures</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Refundable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Quebec's premium R&D tax incentive offering up to 30% refundable tax credit on eligible Quebec research and 
                      development expenditures - Canada's highest provincial R&D tax credit rate, stackable with federal SR&ED for up to 95% total support.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible CRIC Expenditures:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Quebec-based R&D salaries (30% credit)</li>
                          <li>• University research contracts (30% credit)</li>
                          <li>• Materials consumed in R&D (30% credit)</li>
                          <li>• Private research contracts (14% credit)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">CRIC Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 30% refundable tax credit</li>
                          <li>• Stacks with SR&ED (up to 95% combined)</li>
                          <li>• No annual expenditure limit</li>
                          <li>• Cash refund for eligible corporations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Investissement Québec */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building2 className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Investissement Québec - Innovation & Growth Programs</CardTitle>
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
                        <span><strong>Business Growth</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Flexible Terms</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Quebec's economic development agency providing comprehensive financial support through loans, loan guarantees, 
                      equity investments, and tax credits for innovation projects, business expansion, and technology commercialization.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Financing Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Innovation loans and working capital</li>
                          <li>• Export financing and guarantees</li>
                          <li>• Equity investments and venture capital</li>
                          <li>• Technology commercialization support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Tax Credit Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• C3i tax credit (innovation project)</li>
                          <li>• E-business tax credit</li>
                          <li>• Multimedia title tax credit</li>
                          <li>• Manufacturing investment tax credit</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PRIMA Quebec */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">PRIMA Quebec - Advanced Manufacturing Consortium</CardTitle>
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
                        <span><strong>Collaborative R&D</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Cost-Share</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Quebec's advanced manufacturing research consortium connecting industry, universities, and research centers 
                      for collaborative innovation projects in aerospace, transportation, and industrial manufacturing.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Research Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Aerospace manufacturing innovation</li>
                          <li>• Advanced materials and composites</li>
                          <li>• Industry 4.0 and smart factories</li>
                          <li>• Sustainable manufacturing processes</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 50/50 cost-share model</li>
                          <li>• University-industry partnerships</li>
                          <li>• Technology transfer support</li>
                          <li>• Commercialization pathways</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quebec Research Consortia */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Microscope className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Quebec Research Consortia & Innovation Centers</CardTitle>
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
                        <span><strong>Applied Research</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Sector-Specific</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Network of sector-specific research consortia including CRIBIQ (biotech), CRITM (transportation), 
                      PROMPT (IT), and innovation centers supporting collaborative R&D across Quebec's key industries.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Research Consortia:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• CRIBIQ - Industrial biotechnology</li>
                          <li>• CRITM - Transportation materials</li>
                          <li>• PROMPT - Software & IT innovation</li>
                          <li>• FPInnovations - Forest products</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Included:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Pre-competitive research funding</li>
                          <li>• Technology development support</li>
                          <li>• Industry networking and partnerships</li>
                          <li>• Student and researcher training</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Quebec Innovation Sector Excellence</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Aerospace Excellence */}
                <Card className="hover:shadow-lg transition-all border-cyan-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Plane className="w-8 h-8 text-cyan-600" />
                      <Badge variant="outline" className="text-xs">$950M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Aerospace Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      World-leading aerospace cluster centered in Montreal with Bombardier, Pratt & Whitney Canada, 
                      CAE, and extensive supply chain ecosystem.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Aircraft design & manufacturing</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Aerospace simulation & training</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Avionics & flight systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Advanced materials & composites</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Gaming & VFX Leadership */}
                <Card className="hover:shadow-lg transition-all border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Gamepad2 className="w-8 h-8 text-blue-600" />
                      <Badge variant="outline" className="text-xs">$780M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Gaming & VFX Leadership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Global gaming and visual effects capital with Ubisoft Montreal, Warner Bros., and extensive 
                      multimedia tax credit support.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Video game development (AAA & indie)</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Visual effects & animation</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>VR/AR immersive experiences</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Film & TV post-production</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Biotech Cluster */}
                <Card className="hover:shadow-lg transition-all border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Microscope className="w-8 h-8 text-indigo-600" />
                      <Badge variant="outline" className="text-xs">$620M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Life Sciences & Biotech</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Strong pharmaceutical and biotechnology cluster with focus on drug discovery, 
                      biomanufacturing, and personalized medicine.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Pharmaceutical R&D</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Biomanufacturing & vaccines</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Medical technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Precision medicine</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI & IT Innovation */}
                <Card className="hover:shadow-lg transition-all border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-8 h-8 text-purple-600" />
                      <Badge variant="outline" className="text-xs">$540M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">AI & IT Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Leading AI research center with Mila (Quebec AI Institute) and strong software 
                      development and IT services sector.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Deep learning & AI research</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Software engineering</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Cybersecurity solutions</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>FinTech innovation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CleanTech & Energy */}
                <Card className="hover:shadow-lg transition-all border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                      <Badge variant="outline" className="text-xs">$410M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">CleanTech & Hydroelectricity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Clean energy expertise with Hydro-Québec leadership, battery technology, 
                      and sustainable technology development.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Hydroelectric technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Battery & energy storage</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Smart grid systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Environmental technology</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Advanced Materials */}
                <Card className="hover:shadow-lg transition-all border-amber-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Building2 className="w-8 h-8 text-amber-600" />
                      <Badge variant="outline" className="text-xs">$350M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Advanced Manufacturing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Strong advanced manufacturing base with focus on aluminum transformation, 
                      composites, and Industry 4.0 technologies.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Aluminum & metallurgy</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Composite materials</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Smart manufacturing</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Industrial automation</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Quebec Regional Innovation Hubs</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-cyan-200">
                  <CardHeader>
                    <CardTitle className="text-cyan-700">Greater Montreal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Montreal Innovation District:</strong> Quebec's largest innovation ecosystem with strengths 
                        in AI, gaming, aerospace, and life sciences featuring Mila, Element AI, and extensive startup support.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• AI & deep learning excellence (Mila)</li>
                        <li>• Gaming & VFX capital of North America</li>
                        <li>• Aerospace manufacturing cluster</li>
                        <li>• Strong venture capital ecosystem</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Quebec City & Eastern Quebec</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Capital-Nationale Innovation:</strong> Government technology hub with strengths in 
                        software, insurance tech, and optics/photonics.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Insurance & financial technology</li>
                        <li>• Software development & IT services</li>
                        <li>• Optics, photonics & lasers</li>
                        <li>• Government procurement opportunities</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Laval & North Shore</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Life Sciences & Manufacturing:</strong> Biotech manufacturing hub with pharmaceutical 
                        companies and advanced manufacturing facilities.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Biomanufacturing & pharmaceuticals</li>
                        <li>• Medical technology</li>
                        <li>• Aerospace supply chain</li>
                        <li>• Food processing innovation</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Sherbrooke & Eastern Townships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>University Innovation Hub:</strong> University of Sherbrooke ecosystem with focus on 
                        health sciences, engineering, and entrepreneurship.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Health technology & medical devices</li>
                        <li>• Engineering innovation</li>
                        <li>• Clean technology development</li>
                        <li>• University-industry partnerships</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quebec Innovation Funding Success Strategies</h2>
              
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
                          <strong>Maximize CRIC Claims:</strong> Ensure all eligible Quebec R&D expenditures captured for 30% tax credit
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Leverage Investissement Québec:</strong> Utilize multiple IQ programs and tax credits simultaneously
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Join Research Consortia:</strong> Access PRIMA, CRIBIQ, and sector-specific collaborative funding
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Program Stacking:</strong> Combine CRIC with federal SR&ED and sector programs for maximum support
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
                          <strong>Missing CRIC Claims:</strong> Not maximizing Quebec R&D expenditures or poor documentation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Ignoring IQ Programs:</strong> Missing opportunities for loans, guarantees, and specialized tax credits
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Consortium Engagement:</strong> Failing to participate in collaborative research opportunities
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak French Documentation:</strong> Inadequate French-language applications or documentation
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
        <section className="py-20 bg-gradient-to-r from-cyan-700 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Quebec Innovation Funding?
              </h2>
              <p className="text-xl text-cyan-100 mb-8">
                Get expert help navigating Quebec's innovation ecosystem and maximizing your CRIC, Investissement Québec, 
                and sector-specific funding. Our bilingual Quebec specialists have secured $310M+ in provincial innovation funding.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-cyan-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=quebec-innovation-grants-expert-help">
                    Get Expert Help
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    View All Provincial Programs
                  </Link>
                </Button>
              </div>
              
              <p className="text-cyan-200 text-sm mt-6">
                81% success rate • $310M+ secured • CRIC, IQ & sector expertise • Bilingual support
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
