import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Waves, Film, Leaf, Zap, Mountain, Sailboat } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "British Columbia Innovation Grants & Tax Credits 2026 | 10% BCITC | $1.8B+ CleanTech Funding",
  description: "Complete guide to BC innovation grants and tax credits. Access $1.8B+ through 10% BC Innovation Tax Credit (BCITC), Innovate BC, New Ventures BC, and cleantech, film, ocean technology programs.",
  keywords: "British Columbia innovation grants, BCITC tax credit, BC Innovation Tax Credit, Innovate BC funding, New Ventures BC, cleantech BC grants, film tax credit BC, ocean technology BC",
  openGraph: {
    title: "British Columbia Innovation Grants & Tax Credits 2026 | $1.8B+ BCITC & CleanTech",
    description: "Access $1.8B+ in BC innovation funding. Complete guide to BCITC, Innovate BC, and Pacific gateway programs.",
    url: "https://www.fsidigital.ca/blog/british-columbia-innovation-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function BritishColumbiaInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-700 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌊 British Columbia Provincial Innovation Support
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                British Columbia Innovation Grants & Tax Credits 2026
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Access $1.8B+ in British Columbia innovation funding through the 10% BC Innovation Tax Credit (BCITC),
                Innovate BC programs, New Ventures BC accelerator, and sector-specific support for clean technology
                leadership, film & creative industries, and ocean technology excellence across Canada's Pacific gateway innovation ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore BC Programs
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

        {/* BC Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">$1.8B+</div>
                  <div className="text-gray-600">Annual Innovation Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">10%</div>
                  <div className="text-gray-600">BCITC Tax Credit Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-600 mb-2">18+</div>
                  <div className="text-gray-600">Active Provincial Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">#1</div>
                  <div className="text-gray-600">CleanTech Hub in Canada</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major BC Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major British Columbia Innovation Programs</h2>

              <div className="space-y-8">
                {/* BC Innovation Tax Credit */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">BC Innovation Tax Credit (BCITC) - 10% Refundable Tax Credit</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>10% Tax Credit</strong></span>
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
                      British Columbia's R&D tax incentive providing a 10% refundable tax credit on eligible BC research and
                      development expenditures, stackable with federal SR&ED tax credits for combined support up to 75%.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible BCITC Expenditures:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• BC-based R&D salaries and wages</li>
                          <li>• Materials consumed in R&D</li>
                          <li>• BC R&D overhead expenses</li>
                          <li>• Subcontractor payments (BC-based)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">BCITC Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 10% refundable tax credit</li>
                          <li>• Stacks with federal SR&ED (up to 75% total)</li>
                          <li>• No annual expenditure limit</li>
                          <li>• Cash refund for eligible corporations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Innovate BC */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Innovate BC - Provincial Innovation Agency</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $300K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Tech Development</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      BC's provincial innovation agency providing grants, vouchers, and partnership facilitation for technology
                      companies at all stages from research to commercialization.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Innovate BC Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Ignite program (early-stage grants)</li>
                          <li>• Platform program (applied research)</li>
                          <li>• Integrated Marketplace vouchers</li>
                          <li>• Sector-specific initiatives</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Technology validation funding</li>
                          <li>• Partnership and network connections</li>
                          <li>• Market intelligence and advisory</li>
                          <li>• Access to research facilities</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* New Ventures BC */}
                <Card className="border-cyan-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Mountain className="w-6 h-6 text-cyan-600 mr-3" />
                      <CardTitle className="text-cyan-700">New Ventures BC - Startup Accelerator</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$150K+ Prizes</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Startup Support</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Competition</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      BC's premier startup competition and accelerator program providing cash prizes, mentorship, and connections
                      to venture capital for early-stage technology companies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Competition Categories:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Natural Resources & CleanTech</li>
                          <li>• Life Sciences & Healthcare</li>
                          <li>• Technology & Innovation</li>
                          <li>• Social Impact ventures</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Program Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Cash prizes ($150K+ total)</li>
                          <li>• Mentorship and advisory support</li>
                          <li>• Investor pitch opportunities</li>
                          <li>• Media exposure and recognition</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Film & Creative Tax Credits */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Film className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">BC Film & Creative Industry Tax Credits</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>35-58.5% Credits</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Film & Digital</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Refundable</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive suite of tax credits supporting film, television, digital animation, and visual effects
                      production - making BC a premier destination for creative content production.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Film Tax Credits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Production Services Tax Credit (35%)</li>
                          <li>• Film Incentive BC (35%)</li>
                          <li>• Regional & Distant Location (6%)</li>
                          <li>• Digital Animation & VFX (58.5%)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Productions:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Feature films and TV series</li>
                          <li>• Animated content production</li>
                          <li>• Visual effects and post-production</li>
                          <li>• Interactive digital media</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">BC Innovation Sector Excellence</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Clean Technology Leadership */}
                <Card className="hover:shadow-lg transition-all border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Leaf className="w-8 h-8 text-green-600" />
                      <Badge variant="outline" className="text-xs">$720M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Clean Technology Leadership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Canada's #1 cleantech cluster with world-leading companies in renewable energy, hydrogen,
                      carbon capture, and sustainable technology.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Hydrogen & clean fuel cells</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Renewable energy systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Carbon capture & storage</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Sustainable building tech</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Film & Creative Industries */}
                <Card className="hover:shadow-lg transition-all border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Film className="w-8 h-8 text-purple-600" />
                      <Badge variant="outline" className="text-xs">$540M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Film & Creative Industries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Hollywood North with extensive film, television, digital animation, and VFX production
                      supported by generous tax credits.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Film & TV production</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Digital animation studios</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Visual effects (VFX)</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Interactive digital media</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ocean Technology */}
                <Card className="hover:shadow-lg transition-all border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Sailboat className="w-8 h-8 text-blue-600" />
                      <Badge variant="outline" className="text-xs">$380M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Ocean Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Pacific access driving ocean tech innovation in aquaculture, marine robotics,
                      ocean observation, and sustainable fisheries.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Aquaculture technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Marine robotics & sensors</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Ocean observation systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Sustainable fisheries tech</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Technology & Software */}
                <Card className="hover:shadow-lg transition-all border-cyan-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-8 h-8 text-cyan-600" />
                      <Badge variant="outline" className="text-xs">$420M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Technology & Software</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Growing tech sector with strengths in SaaS, gaming, cybersecurity, and emerging
                      technologies with Asia-Pacific connections.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>SaaS & cloud platforms</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Gaming & interactive media</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Cybersecurity solutions</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>AI & machine learning</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Life Sciences */}
                <Card className="hover:shadow-lg transition-all border-teal-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Waves className="w-8 h-8 text-teal-600" />
                      <Badge variant="outline" className="text-xs">$310M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Life Sciences & Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Growing life sciences sector with focus on precision health, medical devices,
                      and health technology innovation.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Precision health & genomics</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Medical device innovation</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Digital health technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Therapeutic development</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Natural Resources Tech */}
                <Card className="hover:shadow-lg transition-all border-emerald-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Mountain className="w-8 h-8 text-emerald-600" />
                      <Badge variant="outline" className="text-xs">$280M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Natural Resources Tech</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Technology innovation for forestry, mining, and natural resource sectors
                      with focus on sustainability and efficiency.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Forestry technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Mining innovation</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Sustainable resource extraction</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Environmental monitoring</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">BC Regional Innovation Hubs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">Metro Vancouver</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Vancouver Tech Hub:</strong> BC's largest innovation ecosystem with strengths in cleantech,
                        film production, gaming, and emerging technologies with Asia-Pacific gateway advantages.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• CleanTech capital of Canada</li>
                        <li>• Film & VFX production center</li>
                        <li>• Gaming & digital entertainment</li>
                        <li>• Asia-Pacific trade connections</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Victoria & Vancouver Island</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Capital Region Innovation:</strong> Government technology hub with ocean tech,
                        clean energy, and software development focus.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Ocean technology leadership</li>
                        <li>• Clean energy & marine renewable</li>
                        <li>• Software & cybersecurity</li>
                        <li>• Government procurement access</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-cyan-200">
                  <CardHeader>
                    <CardTitle className="text-cyan-700">Kelowna & Okanagan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Interior Tech Corridor:</strong> Growing tech sector with quality of life advantages
                        and strong software, digital media, and manufacturing base.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Software development</li>
                        <li>• Digital media & creative</li>
                        <li>• Advanced manufacturing</li>
                        <li>• AgriTech & wine technology</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Prince George & Northern BC</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Natural Resources Innovation:</strong> Technology development for forestry, mining,
                        and natural resource sectors with sustainability focus.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Forestry technology</li>
                        <li>• Mining innovation</li>
                        <li>• Clean energy projects</li>
                        <li>• Environmental solutions</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">BC Innovation Funding Success Strategies</h2>

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
                          <strong>Maximize BCITC Claims:</strong> Ensure all eligible BC R&D expenditures captured for 10% tax credit
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Leverage Innovate BC:</strong> Access multiple program streams and partnership opportunities
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Apply to New Ventures BC:</strong> Gain exposure, prizes, and investor connections
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Program Stacking:</strong> Combine BCITC with SR&ED and sector-specific programs
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
                          <strong>Missing BCITC Claims:</strong> Not claiming eligible BC R&D or poor documentation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Ignoring Innovate BC:</strong> Missing opportunities for grants and partnerships
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Regional Connections:</strong> Failing to leverage local innovation ecosystem
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Wrong Program Fit:</strong> Applying without understanding sector alignment
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
        <section className="py-20 bg-gradient-to-r from-teal-700 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access BC Innovation Funding?
              </h2>
              <p className="text-xl text-teal-100 mb-8">
                Get expert help navigating BC's innovation ecosystem and maximizing your BCITC, Innovate BC, and sector-specific funding.
                Our BC specialists have secured $180M+ in provincial innovation funding.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bc-innovation-expert-help">
                    Get Expert Help
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/innovation-grants">
                    View All Provincial Programs
                  </Link>
                </Button>
              </div>

              <p className="text-teal-200 text-sm mt-6">
                79% success rate • $180M+ secured • BCITC, Innovate BC & CleanTech expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
