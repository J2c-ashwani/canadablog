import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, MapPin, Zap, Factory, Lightbulb } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Strategic Innovation Fund Canada 2025 | $100M+ SIF Funding Guide | Innovation Projects",
  description: "Complete guide to Strategic Innovation Fund (SIF) funding in Canada. Access up to $100M for transformative innovation projects, R&D commercialization, and industrial expansion from ISED Canada.",
  keywords: "Strategic Innovation Fund Canada, SIF funding, ISED grants, innovation funding Canada, R&D commercialization grants, industrial expansion funding, technology innovation grants Canada, large scale business funding, transformative project funding",
  openGraph: {
    title: "Strategic Innovation Fund Canada 2025 | $100M+ SIF Funding Guide",
    description: "Access up to $100M through Canada's Strategic Innovation Fund. Complete guide to SIF eligibility, application process, and transformative innovation funding.",
    url: "https://grantfinder.pro/blog/strategic-innovation-fund-canada-guide",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function StrategicInnovationFundBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏛️ Strategic Innovation Fund (SIF) Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Strategic Innovation Fund Canada 2025
              </h1>
              <p className="text-xl text-red-100 mb-8">
                Complete guide to Canada's Strategic Innovation Fund (SIF) offering up to $100M for transformative 
                business projects. Access large-scale funding for innovation, R&D commercialization, industrial expansion, 
                and technology development from Innovation, Science & Economic Development Canada (ISED).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=strategic-innovation-fund">
                    Check SIF Funding Eligibility
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

        {/* Program Statistics - SEO Optimized */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">$100M+</div>
                  <div className="text-gray-600">Max SIF Funding Per Project</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$7.2B</div>
                  <div className="text-gray-600">Total SIF Investment Portfolio</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-gray-600">Transformative Projects Funded</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
                  <div className="text-gray-600">Large Project Success Rate</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is the Strategic Innovation Fund (SIF)?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Canada's Strategic Innovation Fund (SIF) is the flagship federal program providing large-scale funding 
                  for transformative business projects that drive innovation, economic growth, and job creation. Managed by 
                  Innovation, Science & Economic Development Canada (ISED), SIF supports projects across all sectors with 
                  contributions up to $100M+ for initiatives demonstrating significant economic impact and innovation potential.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-red-800">SIF Funding Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Major technology and innovation projects</li>
                      <li>• Industrial R&D and commercialization</li>
                      <li>• Manufacturing facility expansion</li>
                      <li>• Critical minerals and clean technology</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-orange-800">SIF Investment Terms</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Minimum $10M SIF contribution request</li>
                      <li>• $20M minimum total project costs</li>
                      <li>• Up to 50% of eligible project costs</li>
                      <li>• Combination of grants and repayable loans</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SIF Program Streams - High CPC Keywords */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Strategic Innovation Fund Program Streams</h2>
              
              <div className="space-y-8">
                {/* Stream 1: R&D and Commercialization */}
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle className="text-red-700">Stream 1: Research, Development & Commercialization</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $100M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>TRL 1-9</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Supports R&D activities from early-stage technology development through to commercial deployment, 
                      including development of new products, processes, or services with significant innovation potential.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Applied research and experimental development</li>
                          <li>• Technology demonstration and validation</li>
                          <li>• Product prototype development and testing</li>
                          <li>• Pre-commercial technology advancement</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Priority Sectors:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Artificial intelligence and digital technologies</li>
                          <li>• Biomanufacturing and life sciences</li>
                          <li>• Clean technology and renewable energy</li>
                          <li>• Advanced manufacturing and materials</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stream 2: Business Growth and Expansion */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Factory className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Stream 2: Business Growth & Expansion</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $50M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>TRL 8-9</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Facility Expansion</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Supports expansion or material improvement of existing industrial or technological facilities, 
                      focusing on increased capacity, productivity improvements, and competitive positioning.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Expansion Projects:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Manufacturing capacity increases</li>
                          <li>• Production line modernization</li>
                          <li>• Equipment and technology upgrades</li>
                          <li>• Process efficiency improvements</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Expected Outcomes:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Increased production output capacity</li>
                          <li>• Enhanced operational efficiency</li>
                          <li>• Job creation and skills development</li>
                          <li>• Improved competitive positioning</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stream 3: Investment Attraction */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Stream 3: Investment Attraction & Reinvestment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $75M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>TRL 2-9</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>New Facilities</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Attracts new investment in industrial or technological facilities in Canada, supporting establishment 
                      of new operations or bringing new mandates to Canadian facilities.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Investment Types:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• New facility establishment in Canada</li>
                          <li>• Technology mandate relocations</li>
                          <li>• Global competency center development</li>
                          <li>• Strategic reinvestment initiatives</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Economic Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Direct job creation in target regions</li>
                          <li>• Technology transfer and knowledge spillovers</li>
                          <li>• Supply chain development opportunities</li>
                          <li>• Regional economic diversification</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stream 4: Collaborative Technology */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Stream 4: Collaborative Technology Development</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $25M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>TRL 1-7</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Consortium Projects</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Supports collaborative projects between Canadian businesses and academic institutions for 
                      industrial research and large-scale technology demonstration activities.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Collaboration Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business-academia partnerships required</li>
                          <li>• Multiple organization consortium approach</li>
                          <li>• Shared intellectual property arrangements</li>
                          <li>• Joint research and development activities</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Technology Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Early-stage industrial research projects</li>
                          <li>• Large-scale technology demonstration</li>
                          <li>• Cross-sector innovation initiatives</li>
                          <li>• Knowledge transfer and commercialization</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stream 5: National Innovation Ecosystems */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Stream 5: National Innovation Ecosystems</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $15M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Network Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation Networks</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Develops national innovation networks and ecosystems that connect businesses, academia, 
                      and other organizations to accelerate innovation and commercialization activities.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Network Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Innovation network development and management</li>
                          <li>• Industry-academia collaboration facilitation</li>
                          <li>• Technology transfer and commercialization</li>
                          <li>• Cross-sector partnership development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Ecosystem Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Enhanced innovation collaboration</li>
                          <li>• Accelerated technology commercialization</li>
                          <li>• Improved access to research capabilities</li>
                          <li>• Strengthened competitive positioning</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Regional SIF Impact - Geo-Targeted SEO */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">SIF Regional Impact Across Canada</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">🏭 Major SIF Manufacturing Investments:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Ontario Advanced Manufacturing:</strong> $2.5B SIF investment in automotive and aerospace</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Quebec Technology Hubs:</strong> $1.8B SIF support for AI and clean tech projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>BC Innovation Corridor:</strong> $900M SIF funding for technology commercialization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Alberta Energy Transition:</strong> $1.2B SIF investment in clean technology</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">🌟 Priority Innovation Sectors:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Artificial Intelligence:</strong> AI compute infrastructure and applications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Biomanufacturing:</strong> Life sciences and pharmaceutical manufacturing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Critical Minerals:</strong> Battery materials and rare earth processing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Steel & Aluminum:</strong> Advanced materials and sustainable production</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Apply for Strategic Innovation Fund</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Pre-Application Consultation & Eligibility Check</h4>
                    <p className="text-gray-600">Contact SIF officials for project consultation and complete online eligibility assessment. Ensure minimum $10M funding request and $20M total project costs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Submit Statement of Interest (SOI)</h4>
                    <p className="text-gray-600">Prepare comprehensive SOI outlining project scope, innovation potential, economic benefits, and organizational capacity. Receive feedback and potential Letter of Intent invitation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Complete Full Application Submission</h4>
                    <p className="text-gray-600">If invited, submit detailed application with technical specifications, financial projections, risk assessments, and comprehensive benefits analysis.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Due Diligence & Terms Negotiation</h4>
                    <p className="text-gray-600">Participate in technical and financial due diligence process. Negotiate funding terms, repayment conditions, and performance milestones with SIF team.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Sign Contribution Agreement & Project Launch</h4>
                    <p className="text-gray-600">Execute formal contribution agreement, establish reporting requirements, and commence project implementation with regular milestone reporting to ISED.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">SIF Application Success Tips</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Maximize Your SIF Success:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Demonstrate Transformative Impact:</strong> Show significant economic benefits and job creation potential</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Align with Government Priorities:</strong> Focus on AI, clean tech, biomanufacturing, or critical minerals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Strong Financial Position:</strong> Provide 3 years audited financials and secure co-funding</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Technical Excellence:</strong> Ensure robust technical feasibility and innovation differentiation</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common SIF Application Mistakes:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Insufficient Scale:</strong> Not meeting minimum $10M funding request threshold</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Weak Economic Case:</strong> Inadequate demonstration of Canadian economic benefits</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Poor Risk Management:</strong> Insufficient risk mitigation and contingency planning</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Limited IP Strategy:</strong> Unclear intellectual property ownership and commercialization plan</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 CTAs Section - High Converting Keywords */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Strategic Innovation Fund?
              </h2>
              <p className="text-xl text-red-100 mb-8">
                Get the complete SIF application guide or work with our specialized experts 
                who have secured $180M+ in Strategic Innovation Fund approvals for transformative Canadian projects.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Get Application Guide CTA */}
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Approach</h4>
                  <p className="text-red-100 text-sm mb-4">
                    Get our comprehensive Strategic Innovation Fund guide with application templates and success strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-red-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-strategic-innovation-fund">
                      <Download className="w-4 h-4 mr-2" />
                      Get SIF Application Guide
                    </Link>
                  </Button>
                </div>

                {/* Get Expert Help CTA */}
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Assistance</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with SIF specialists who have secured $180M+ in Strategic Innovation Fund approvals with 78% success rate.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=strategic-innovation-fund-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-red-200 text-sm mt-6">
                78% success rate for SIF applications • Average funding secured: $35M • Large-scale project expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
