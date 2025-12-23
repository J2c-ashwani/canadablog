import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Zap, Lightbulb, Beaker } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Innovation & R&D Grants 2026 | $4.2B+ Research Development Funding Programs Guide",
  description: "Complete guide to Canada's innovation and R&D grants. Access SR&ED tax credits, IRAP funding, Strategic Innovation Fund, and 45+ programs offering $4.2B+ for research and development.",
  keywords: "Canada innovation grants, R&D funding Canada, SR&ED tax credits, IRAP funding, Strategic Innovation Fund, research development grants Canada 2026",
  openGraph: {
    title: "Canada Innovation & R&D Grants 2026 | $4.2B+ Research Development Funding Guide",
    description: "Comprehensive guide to Canada's innovation and R&D funding ecosystem with 45+ programs offering $4.2B+ for research, development, and commercialization.",
    url: "https://www.fsidigital.ca/blog/canada-innovation-research-development-grants-guide",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function CanadaInnovationRDGrantsGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🚀 Innovation & R&D Funding Ecosystem
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Innovation & R&D Grants Guide
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access Canada's comprehensive innovation and research development funding ecosystem with $4.2B+ available annually through 45+ federal and provincial programs. From SR&ED tax credits to Strategic Innovation Fund - find the perfect R&D funding for your innovation projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?category=innovation-rd">
                    Find Your R&D Program
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/government-grants">
                    Back to All Programs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Funding Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$4.2B+</div>
                  <div className="text-gray-600">Annual Innovation Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">45+</div>
                  <div className="text-gray-600">Active R&D Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$100M</div>
                  <div className="text-gray-600">Maximum Project Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">35%</div>
                  <div className="text-gray-600">SR&ED Refundable Rate</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada as Global Innovation Leader</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Canada operates one of the world's most comprehensive innovation and R&D funding ecosystems, with over $4.2 billion available annually through federal and provincial programs. From the flagship SR&ED tax credit program supporting 25,000+ companies annually to the Strategic Innovation Fund backing transformative projects up to $100M+, Canada provides unparalleled support for research, development, and commercialization across all sectors and business stages.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Innovation Policy Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Research and experimental development excellence</li>
                      <li>• Technology commercialization and scale-up support</li>
                      <li>• International competitiveness and export development</li>
                      <li>• Clean technology and sustainable innovation leadership</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">Strategic Innovation Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Federal-provincial R&D program coordination</li>
                      <li>• University-industry collaboration initiatives</li>
                      <li>• Innovation supercluster ecosystem development</li>
                      <li>• International research partnership facilitation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Innovation Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Innovation & R&D Programs</h2>
              
              <div className="space-y-8">
                {/* SR&ED Tax Credit Program */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">SR&ED - Scientific Research & Experimental Development</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$4.5B Budget</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Tax Credit</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Up to 35%</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>All Businesses</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canada's largest R&D tax incentive program providing refundable tax credits for research and experimental development activities. Enhanced in 2026 with increased refundable limit to $4.5M for CCPCs.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Enhanced 2026 Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 35% refundable ITC on first $4.5M (up from $3M)</li>
                          <li>• 15% non-refundable above limit</li>
                          <li>• Provincial supplements up to 30% additional</li>
                          <li>• Covers salaries, materials, contractors, overhead</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Software development and innovation</li>
                          <li>• Advanced manufacturing processes</li>
                          <li>• Biotechnology and life sciences research</li>
                          <li>• Clean technology development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Application Process:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Filed with corporate tax return</li>
                          <li>• Rolling intake - no deadlines</li>
                          <li>• CRA review and audit process</li>
                          <li>• Professional preparation recommended</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* IRAP Program */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">IRAP - Industrial Research Assistance Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>60-80% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>SMEs Only</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      National Research Council's flagship program supporting Canadian SMEs with non-repayable contributions for technology innovation and commercialization projects.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">2026 Program Updates:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Funding:</strong> 60-80% of eligible costs up to $500K per project</li>
                          <li>• <strong>Duration:</strong> 12-24 months with possible extension</li>
                          <li>• <strong>Focus:</strong> Technology development and commercialization</li>
                          <li>• <strong>Advisory:</strong> Dedicated industrial technology advisors</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Eligibility Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Canadian-incorporated for-profit SMEs</li>
                          <li>• Fewer than 500 full-time employees</li>
                          <li>• Demonstrated innovation capacity</li>
                          <li>• Potential for commercialization and growth</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Strategic Innovation Fund */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Strategic Innovation Fund (SIF)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$10M - $100M+</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Large Projects</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Transformative</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>All Sizes</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal flagship program supporting large-scale, transformative innovation projects that drive economic growth, create jobs, and enhance Canada's global competitiveness.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Program Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Advanced manufacturing and materials</li>
                          <li>• Clean technology and sustainability</li>
                          <li>• Digital industries and AI</li>
                          <li>• Health and life sciences</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Structure:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Repayable and non-repayable contributions</li>
                          <li>• Minimum $10M contribution requests</li>
                          <li>• Typically covers 50%+ of project costs</li>
                          <li>• Multi-year project timelines</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Application Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Significant economic impact demonstration</li>
                          <li>• Innovation and competitiveness focus</li>
                          <li>• Environmental and social benefits</li>
                          <li>• Industry collaboration potential</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Innovation Superclusters */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">Innovation Superclusters Initiative</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $40M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Collaborative</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Ecosystem</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Multi-Partner</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Large-scale collaborative innovation projects connecting businesses, research institutions, and not-for-profits to address global challenges and build innovation ecosystems.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-orange-700">Active Superclusters:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Digital Technology:</strong> AI, quantum computing, cybersecurity</li>
                          <li>• <strong>Next Generation Manufacturing:</strong> Advanced materials, automation</li>
                          <li>• <strong>Ocean:</strong> Marine technology and clean ocean solutions</li>
                          <li>• <strong>AI-Powered Supply Chains:</strong> Logistics innovation</li>
                          <li>• <strong>Scale AI:</strong> Artificial intelligence applications</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Project Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Multi-partner collaboration (3+ organizations)</li>
                          <li>• Industry-academia partnerships</li>
                          <li>• Significant economic impact potential</li>
                          <li>• Knowledge sharing and commercialization</li>
                          <li>• IP development and retention in Canada</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clean Technology Programs */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Beaker className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Clean Technology Innovation Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$1.2B+</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Clean Tech Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Sustainability</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>All Stages</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Specialized funding streams supporting clean technology innovation, environmental solutions, and sustainable development across multiple federal departments and agencies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-teal-700">Major Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Clean Growth Program:</strong> Technology development and demonstration</li>
                          <li>• <strong>Sustainable Development Technology Canada:</strong> Pre-commercial cleantech</li>
                          <li>• <strong>Clean Technology Stream (SIF):</strong> Large-scale deployment</li>
                          <li>• <strong>Agricultural Clean Technology Program:</strong> Sector-specific innovation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Technology Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Renewable energy and storage systems</li>
                          <li>• Energy efficiency and smart grid technologies</li>
                          <li>• Clean transportation and mobility solutions</li>
                          <li>• Environmental monitoring and remediation</li>
                          <li>• Circular economy and waste reduction</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Provincial R&D Programs */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">Provincial Innovation & R&D Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-pink-700">Major Provincial Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Ontario Innovation Tax Credit:</strong> Additional 10% refundable credit</li>
                          <li>• <strong>Quebec R&D Tax Credit:</strong> Up to 30% provincial supplement</li>
                          <li>• <strong>BC Innovation Council:</strong> Technology development funding</li>
                          <li>• <strong>Alberta Innovates:</strong> Research and commercialization support</li>
                          <li>• <strong>Mitacs Research Training:</strong> Graduate student and postdoc support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Provincial Advantages:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Stackable with federal SR&ED credits</li>
                          <li>• Regional economic development focus</li>
                          <li>• Industry cluster and ecosystem support</li>
                          <li>• University-industry collaboration programs</li>
                          <li>• Sector-specific innovation initiatives</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Strategy Framework */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Innovation Funding Strategy Framework</h2>
              
              <div className="space-y-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Multi-Program Optimization Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Strategic Program Stacking:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Combine SR&ED with provincial R&D credits (up to 65% total)</li>
                          <li>• Use IRAP for project-specific non-repayable funding</li>
                          <li>• Leverage SIF for large-scale transformative projects</li>
                          <li>• Access sector-specific programs for specialized support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Timeline Coordination:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• SR&ED: File with annual corporate tax returns</li>
                          <li>• IRAP: Rolling intake with 2026 cohort opening</li>
                          <li>• SIF: Competitive process with rolling submissions</li>
                          <li>• Provincial: Various deadlines and intake periods</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Innovation Excellence Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Technical Innovation Documentation:</strong> Maintain detailed records of experimental development, technical challenges, and systematic investigation processes
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Commercialization Strategy:</strong> Demonstrate clear pathway from research to market with economic impact potential
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Collaboration and Partnerships:</strong> Leverage university-industry partnerships and international collaboration opportunities
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>IP Strategy and Protection:</strong> Develop comprehensive intellectual property strategy with retention in Canada
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Canada's $4.2B+ Innovation Funding Ecosystem?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get our complete innovation funding strategy guide or work with our R&D specialists who have secured over $25M in innovation grants with 91% success rate across all major programs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Innovation Approach</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our comprehensive innovation funding guide with program-specific templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-innovation-rd-funding">
                      <Download className="w-4 h-4 mr-2" />
                      Get Innovation Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Innovation Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with R&D specialists who have secured $25M+ with 91% success rate across SR&ED, IRAP, SIF, and provincial programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=innovation-rd-expert-help">
                      Get Innovation Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-blue-200 text-sm mt-6">
                91% success rate for innovation applications • Average funding secured: $425K • Multi-program expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
