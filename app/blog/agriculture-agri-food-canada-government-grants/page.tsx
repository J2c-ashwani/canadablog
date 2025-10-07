import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Leaf } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agriculture & Agri-Food Canada Grants 2025 | Federal Funding Programs Guide | AAFC Support",
  description: "Complete guide to Agriculture and Agri-Food Canada federal funding programs. Access up to $5M through AgriInnovate, AgriScience, AgriCompetitiveness, and Sustainable CAP programs.",
  keywords: "Agriculture Agri-Food Canada grants, AAFC federal funding, AgriInnovate program, AgriScience funding, Sustainable CAP programs, Canadian agricultural grants, federal agri-food funding",
  openGraph: {
    title: "Agriculture & Agri-Food Canada Grants 2025 | Federal Funding Programs Guide",
    description: "Comprehensive guide to AAFC federal funding programs offering up to $5M for agriculture, agri-food innovation, research, and sustainable development.",
    url: "https://grantfinder.pro/blog/agriculture-agri-food-canada-government-grants",
    images: ["/api/placeholder/1200/630"],
  },
}

export default function AgricultureAgriFoodGovernmentGrantsBlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌾 Federal Agri-Food Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Agriculture & Agri-Food Canada Government Grants
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Canada's comprehensive federal support system for agriculture, agri-food, and agri-based businesses. 
                Access up to $5M through AgriInnovate, AgriScience, and Sustainable CAP programs designed to drive 
                innovation, sustainability, and competitiveness in Canada's agriculture sector.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=agriculture">
                    Find Your AAFC Program
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/government-grants">
                    Back to Government Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Program Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$5M</div>
                  <div className="text-gray-600">Max AAFC Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$3.5B</div>
                  <div className="text-gray-600">Sustainable CAP Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">12+</div>
                  <div className="text-gray-600">Federal Program Streams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">8,500+</div>
                  <div className="text-gray-600">Projects Supported Annually</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">AAFC as Federal Agri-Food Policy Anchor</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Agriculture and Agri-Food Canada (AAFC) serves as the federal government's primary vehicle for 
                  advancing Canada's agriculture, agri-food, and agri-based products sector. Through comprehensive 
                  programming worth $3.5 billion over five years under the Sustainable Canadian Agricultural 
                  Partnership, AAFC delivers strategic federal support for innovation, sustainability, competitiveness, 
                  and resilience across Canada's diverse agricultural landscape.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">Federal Policy Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Sustainable agricultural practices and climate resilience</li>
                      <li>• Innovation and technology adoption in agriculture</li>
                      <li>• Market development and export competitiveness</li>
                      <li>• Food security and supply chain strengthening</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Strategic Federal Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Federal-provincial-territorial program coordination</li>
                      <li>• Integration with federal innovation initiatives</li>
                      <li>• Alignment with climate change and environmental goals</li>
                      <li>• Connection to federal trade and export strategies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major AAFC Federal Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major AAFC Federal Programs</h2>
              
              <div className="space-y-8">
                {/* AgriInnovate Program */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Leaf className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">AgriInnovate Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Up to 60% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Commercialization</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal support for pre-commercial innovation activities in agriculture, agri-food and agri-based 
                      products sectors, accelerating development and adoption of innovative products, technologies, 
                      processes, and services.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Research and development of innovative solutions</li>
                          <li>• Technology development and demonstration</li>
                          <li>• Pre-commercial testing and validation</li>
                          <li>• Prototype development and refinement</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Innovation Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Sustainable agriculture technologies</li>
                          <li>• Digital agriculture and precision farming</li>
                          <li>• Alternative protein development</li>
                          <li>• Agricultural biotechnology innovations</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Federal Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Incorporated Canadian business</li>
                          <li>• Pre-commercial innovation focus</li>
                          <li>• Clear commercialization pathway</li>
                          <li>• Measurable performance outcomes</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AgriScience Program */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">AgriScience Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $15M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Up to 70% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Research Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Science Excellence</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal support for industry-led research partnerships advancing agricultural science priorities 
                      through collaborative research projects and research clusters addressing sector challenges.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">AgriScience Projects ($5M max):</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Industry-led collaborative research initiatives</li>
                          <li>• Applied research addressing sector priorities</li>
                          <li>• Multi-partner research consortiums</li>
                          <li>• Technology transfer and knowledge mobilization</li>
                          <li>• Research infrastructure and capacity building</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">AgriScience Clusters ($15M max):</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Large-scale sector research programs</li>
                          <li>• National research network coordination</li>
                          <li>• Multi-year strategic research initiatives</li>
                          <li>• Cross-sector collaboration and partnerships</li>
                          <li>• Research excellence and international competitiveness</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sustainable CAP Programs */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Sustainable Canadian Agricultural Partnership (CAP)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$3.5B Total</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>2023-2028</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Fed-Prov Partnership</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Multi-Stream</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Five-year federal-provincial-territorial partnership delivering comprehensive support for agricultural 
                      competitiveness, innovation, resilience, and sustainability across Canada.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Federal Programs ($1B):</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• AgriInnovate Program</li>
                          <li>• AgriScience Program</li>
                          <li>• AgriCompetitiveness Program</li>
                          <li>• AgriDiversity Program</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Cost-Shared Programs ($2.5B):</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Environmental and climate action</li>
                          <li>• Science and innovation initiatives</li>
                          <li>• Market development and competitiveness</li>
                          <li>• Resiliency and public trust programs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Business Risk Management:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Agricultural insurance programs</li>
                          <li>• AgriStability income stabilization</li>
                          <li>• AgriInvest savings account program</li>
                          <li>• AgriRecovery disaster assistance</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AgriCompetitiveness Program */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-orange-600 mr-3" />
                      <CardTitle className="text-orange-700">AgriCompetitiveness Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Up to 70% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Market Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Sector Development</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal support for activities that enhance competitiveness and market positioning of Canadian 
                      agriculture, agri-food and agri-based products in domestic and international markets.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Market Development Activities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Market research and intelligence</li>
                          <li>• Export market development initiatives</li>
                          <li>• Brand development and promotion</li>
                          <li>• Trade mission and market access activities</li>
                          <li>• Supply chain optimization and efficiency</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Competitiveness Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Value-added product development</li>
                          <li>• Quality assurance and certification systems</li>
                          <li>• Sustainability and traceability initiatives</li>
                          <li>• Industry capacity building and training</li>
                          <li>• Strategic sector partnerships and alliances</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Federal Programs */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <FileText className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Additional AAFC Federal Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-teal-700">Specialized Federal Initiatives:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>AgriDiversity Program:</strong> Up to $1M for underrepresented groups</li>
                          <li>• <strong>Canadian Agricultural Strategic Priorities:</strong> Up to $1M for strategic initiatives</li>
                          <li>• <strong>Local Food Infrastructure Fund:</strong> $25K-$500K for local food systems</li>
                          <li>• <strong>Agricultural Clean Technology:</strong> Clean tech adoption and development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Export and Trade Support:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Canada Brand Program:</strong> International market promotion</li>
                          <li>• <strong>Canada Pavilion Program:</strong> Trade show participation support</li>
                          <li>• <strong>Market Access Secretariat:</strong> Trade barrier resolution</li>
                          <li>• <strong>Agri-Marketing Program:</strong> Export development assistance</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Policy Integration */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">AAFC Federal Policy Integration</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">🏛️ Federal Innovation Integration:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Strategic Innovation Fund Coordination:</strong> Agricultural projects scaling to SIF mega-projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>IRAP Technology Transfer:</strong> Agricultural R&D commercialization pathways</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Innovation Superclusters:</strong> Protein Industries Canada and advanced manufacturing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Clean Technology Programs:</strong> Agricultural sustainability and climate resilience</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-700">🌍 Federal Policy Alignment:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Climate Change Strategy:</strong> Agricultural contribution to net-zero emissions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Export Development:</strong> Global Affairs and Trade Commissioner Service integration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Indigenous Reconciliation:</strong> AgriDiversity and community economic development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Food Security Strategy:</strong> Supply chain resilience and local food systems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AAFC Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">AAFC Federal Application Process</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Program Selection and Federal Eligibility Assessment</h4>
                    <p className="text-gray-600">Identify appropriate AAFC program stream and confirm federal eligibility requirements for agriculture, agri-food, or agri-based business operations.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Project Development and Federal Alignment</h4>
                    <p className="text-gray-600">Develop comprehensive project proposal demonstrating alignment with federal agricultural priorities, innovation objectives, and policy outcomes.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Federal Application Submission and Documentation</h4>
                    <p className="text-gray-600">Submit detailed application through AAFC portal with comprehensive business plan, technical specifications, and federal compliance documentation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Federal Review and Assessment Process</h4>
                    <p className="text-gray-600">AAFC technical and policy review including agricultural merit assessment, federal priority alignment, and risk evaluation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Federal Contribution Agreement and Implementation</h4>
                    <p className="text-gray-600">Execute federal contribution agreement with performance milestones, reporting requirements, and ongoing AAFC support.</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">AAFC Federal Application Success Strategies</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Agricultural Federal Program Success Factors:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Clear Agricultural Focus:</strong> Demonstrate direct contribution to agriculture, agri-food, or agri-based sectors</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Federal Policy Alignment:</strong> Connect project to federal agricultural priorities and sustainability goals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Innovation and Competitiveness:</strong> Present clear innovation elements and market competitiveness benefits</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Measurable Outcomes:</strong> Define clear performance indicators and agricultural sector impact metrics</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common AAFC Federal Application Mistakes:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Weak Agricultural Connection:</strong>
                        <p className="text-sm text-gray-600">Insufficient demonstration of direct benefit to agricultural sectors</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Limited Innovation Component:</strong>
                        <p className="text-sm text-gray-600">Failing to clearly articulate innovative aspects and technological advancement</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Poor Market Analysis:</strong>
                        <p className="text-sm text-gray-600">Insufficient market research and commercialization pathway development</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Inadequate Partnership Strategy:</strong>
                        <p className="text-sm text-gray-600">Not leveraging agricultural industry partnerships and collaboration opportunities</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access AAFC Federal Agricultural Funding?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Get the complete AAFC federal application guide or work with our agricultural funding specialists 
                who have secured $18M+ in Agriculture Canada approvals across all program streams.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Get Application Guide CTA */}
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Agricultural Approach</h4>
                  <p className="text-green-100 text-sm mb-4">
                    Get our comprehensive AAFC federal application guide with agricultural templates and program-specific strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-agriculture-agri-food-canada">
                      <Download className="w-4 h-4 mr-2" />
                      Get AAFC Federal Guide
                    </Link>
                  </Button>
                </div>

                {/* Get Expert Help CTA */}
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Agricultural Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with agricultural funding specialists who have secured $18M+ in AAFC approvals with 91% success rate and deep sector expertise.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=agriculture-agri-food-expert-help">
                      Get Agricultural Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-green-200 text-sm mt-6">
                91% success rate for AAFC applications • Average funding secured: $625K • All program streams expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
