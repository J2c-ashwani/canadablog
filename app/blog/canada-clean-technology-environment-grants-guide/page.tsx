import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Leaf, Sun, Recycle, MapPin, Briefcase, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Clean Technology & Environment Grants 2026 | $1.2B+ Sustainability Funding Programs Guide",
  description: "Complete guide to Canada's clean technology and environmental grants. Access SDTC funding, Clean Growth Program, and 22+ programs offering $1.2B+ for cleantech innovation.",
  keywords: "Canada clean technology grants, environmental funding, SDTC grants, renewable energy funding, carbon capture grants, sustainability programs Canada 2026",
  openGraph: {
    title: "Canada Clean Technology & Environment Grants 2026 | $1.2B+ Sustainability Funding Guide",
    description: "Comprehensive guide to Canada's clean technology and environmental funding ecosystem with 22+ programs offering $1.2B+ for sustainability innovation.",
    url: "https://www.fsidigital.ca/blog/canada-clean-technology-environment-grants-guide",
    images: ["/og-image.png"],
  },
}

const faqData = [
  {
    question: "What clean technology grants are available in Canada?",
    answer: "Major programs include SDTC (up to $15M), the Net Zero Accelerator ($8B initiative), Agricultural Clean Technology Program ($165M), and the Clean Growth Program. There are also Investment Tax Credits covering up to 30% of capital costs for clean energy systems."
  },
  {
    question: "Who is eligible for SDTC funding?",
    answer: "SDTC funds Canadian companies with pre-commercial clean technologies that have demonstrated environmental benefits and market potential. Projects typically receive $2M-$15M (up to 40% of costs) and must involve a consortium of partners."
  },
  {
    question: "How do Clean Technology Investment Tax Credits work?",
    answer: "The Clean Tech ITC provides a refundable tax credit of up to 30% of the capital cost of eligible property, such as solar, wind, and energy storage systems. It applies to taxable Canadian entities making eligible investments after March 28, 2023."
  },
  {
    question: "Can I stack federal and provincial clean tech funding?",
    answer: "Yes, many programs allow stacking of federal and provincial grants, though total government assistance is usually capped (often at 75-100%). Check specific program guidelines for stacking rules."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

export default function CanadaCleanTechnologyEnvironmentGrantsGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-teal-600 to-green-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌱 Clean Technology & Environment Funding
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Clean Technology & Environment Grants Guide
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Access Canada's comprehensive clean technology and environmental funding ecosystem with $1.2B+ available annually through 22+ federal and provincial programs. From SDTC's $15M cleantech commercialization to Net Zero Accelerator's $8B decarbonization fund - drive sustainability innovation, environmental solutions, and Canada's net-zero transition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?category=clean-technology">
                    Find Your CleanTech Program
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

        {/* Common Questions Section */}
        <section className="py-12 bg-teal-50 border-b border-teal-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About CleanTech Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-teal-700">What clean technology grants exist?</h3>
                  <p className="text-sm text-gray-600 mt-1">Explore SDTC, Net Zero, and more.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-teal-700">How to apply for SDTC funding?</h3>
                  <p className="text-sm text-gray-600 mt-1">Pre-commercial tech demonstration support.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-teal-700">What is the Net Zero Accelerator?</h3>
                  <p className="text-sm text-gray-600 mt-1">$8B fund for large decarbonization projects.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-teal-700">Are there tax credits for clean energy?</h3>
                  <p className="text-sm text-gray-600 mt-1">Up to 30% refundable ITCs available.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-teal-700">Who is eligible for funding?</h3>
                  <p className="text-sm text-gray-600 mt-1">Criteria for startups vs large industry.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-teal-700">Can I stack grants and credits?</h3>
                  <p className="text-sm text-gray-600 mt-1">Combine funding sources effectively.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Clean Technology Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$1.2B+</div>
                  <div className="text-gray-600">Annual CleanTech Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">22+</div>
                  <div className="text-gray-600">Active CleanTech Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">$15M</div>
                  <div className="text-gray-600">Maximum SDTC Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">2050</div>
                  <div className="text-gray-600">Net-Zero Target</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada as Global CleanTech Leader</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Canada's clean technology sector represents a $13.5 billion industry employing over 300,000 Canadians, positioning the nation as a global leader in environmental innovation and sustainability solutions. With over $1.2 billion available annually through 22+ specialized programs, Canada provides comprehensive support for renewable energy, carbon capture, waste management, water treatment, and net-zero transition technologies. From SDTC's pre-commercial cleantech development to the $8B Net Zero Accelerator, Canada drives environmental excellence and economic competitiveness.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">CleanTech Policy Priorities</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Net-zero emissions by 2050 transition support</li>
                      <li>• Renewable energy and clean electricity systems</li>
                      <li>• Carbon capture, utilization, and storage technologies</li>
                      <li>• Circular economy and waste-to-energy solutions</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Strategic Environmental Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Federal-provincial environmental coordination</li>
                      <li>• Industry-research institution collaboration</li>
                      <li>• International cleantech export development</li>
                      <li>• Indigenous clean energy and environmental stewardship</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Clean Technology Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Major Clean Technology & Environment Programs</h2>

              <div className="space-y-8">
                {/* Sustainable Development Technology Canada */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Sustainable Development Technology Canada (SDTC)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$2M - $15M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Pre-Commercial</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Up to 40%</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Canadian Companies</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canada's flagship cleantech commercialization fund providing up to $15M (40% project costs) in non-repayable contributions for pre-commercial clean technology development and demonstration with significant environmental benefits.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">SDTC Technology Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Climate Technologies:</strong> GHG reduction and mitigation</li>
                          <li>• <strong>Clean Air:</strong> Air quality improvement solutions</li>
                          <li>• <strong>Clean Water:</strong> Water quality and conservation technologies</li>
                          <li>• <strong>Clean Soil:</strong> Soil remediation and protection systems</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Project Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Demonstrated environmental benefits</li>
                          <li>• Strong commercial potential and market validation</li>
                          <li>• Technical feasibility and innovation</li>
                          <li>• Capable management team and partners</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Structure:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Average $3M contribution over 5 years</li>
                          <li>• Rolling application intake</li>
                          <li>• Non-repayable funding (no equity taken)</li>
                          <li>• Co-funding partnerships encouraged</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Net Zero Accelerator */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sun className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Net Zero Accelerator Initiative</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$8B Program</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Large-Scale</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Net-Zero 2050</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Transformative</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal government's $8 billion flagship program supporting large-scale projects that help achieve Canada's net-zero emissions by 2050, with emphasis on decarbonization and clean technology deployment.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-teal-700">Program Objectives:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Accelerate large-scale decarbonization projects</li>
                          <li>• Transform heavy-emitting industrial sectors</li>
                          <li>• Build Canadian clean technology manufacturing</li>
                          <li>• Create sustainable jobs in clean economy</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Priority Sectors:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Steel, cement, aluminum, chemicals manufacturing</li>
                          <li>• Clean electricity generation and storage</li>
                          <li>• Electric vehicle and battery manufacturing</li>
                          <li>• Hydrogen production and infrastructure</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Agricultural Clean Technology Program */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Leaf className="w-6 h-6 text-amber-600 mr-3" />
                      <CardTitle className="text-amber-700">Agricultural Clean Technology Program (ACT)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $2M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Agriculture Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>50-75% Funding</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Farm Operations</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      $165M program supporting agricultural clean technology adoption and R&D through two streams: technology adoption (50-75% funding) and research innovation for pre-market cleantech development.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Adoption Stream:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Purchase and installation of commercial cleantech</li>
                          <li>• Green energy and energy efficiency systems</li>
                          <li>• Precision agriculture technologies</li>
                          <li>• Bioeconomy solutions and processes</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Research & Innovation Stream:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Applied R&D of agricultural clean technologies</li>
                          <li>• Piloting and technology evaluation</li>
                          <li>• Demonstration and knowledge transfer</li>
                          <li>• Commercialization and scale-up activities</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Recipients:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Farm businesses and agri-food processors</li>
                          <li>• Not-for-profit organizations and co-operatives</li>
                          <li>• Indigenous groups and communities</li>
                          <li>• Individuals and sole proprietors (Adoption only)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clean Growth Program */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Clean Growth Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Early-Stage</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>SMEs</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Innovation funding for early-stage clean technology companies developing breakthrough environmental solutions with significant market potential and environmental impact.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">Technology Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Advanced energy storage and grid integration</li>
                          <li>• Carbon capture, utilization, and storage</li>
                          <li>• Advanced materials and manufacturing processes</li>
                          <li>• Water treatment and purification technologies</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Program Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Non-dilutive funding preserving equity</li>
                          <li>• Technical and business mentorship support</li>
                          <li>• Access to testing facilities and validation</li>
                          <li>• Connection to investors and strategic partners</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clean Technology Investment Tax Credits */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Clean Technology Investment Tax Credits</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>30% Tax Credit</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Capital Investment</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Refundable</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>All Industries</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal refundable tax credit offering up to 30% of capital investments in eligible clean technology equipment and systems, supporting widespread clean technology adoption across all sectors.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Technologies:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Solar, wind, and hydroelectric generation</li>
                          <li>• Battery energy storage systems</li>
                          <li>• Heat pumps and geothermal systems</li>
                          <li>• Electric vehicle charging equipment</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Manufacturing Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Clean technology manufacturing equipment</li>
                          <li>• Processing and refining technologies</li>
                          <li>• Critical mineral extraction and processing</li>
                          <li>• Industrial electrification systems</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Credit Structure:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 30% refundable credit on eligible capital</li>
                          <li>• Available for properties acquired after 2023</li>
                          <li>• Labour requirements for certain projects</li>
                          <li>• Stacks with other federal and provincial support</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Provincial Clean Technology Programs */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Recycle className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">Provincial Clean Technology Programs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Multi-Program</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Regional Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Stackable</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Provincial Priorities</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive suite of provincial clean technology programs complementing federal initiatives with region-specific environmental priorities and economic development objectives.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-indigo-700">Major Provincial Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>CleanBC (BC):</strong> Industry Fund and innovation initiatives</li>
                          <li>• <strong>Emissions Reduction Alberta:</strong> GHG reduction technologies</li>
                          <li>• <strong>Ontario Green Commercial Vehicle Program:</strong> Fleet electrification</li>
                          <li>• <strong>Nova Scotia Clean Economy Grant:</strong> Research and development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-green-700">Regional Specializations:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• BC: Clean energy, forest sector innovation</li>
                          <li>• Alberta: CCUS, hydrogen, energy transition</li>
                          <li>• Ontario: Electric vehicles, battery manufacturing</li>
                          <li>• Quebec: Renewable energy, circular economy</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Clean Technology Application Strategy */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Clean Technology Funding Strategy Framework</h2>

              <div className="space-y-6">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">CleanTech Excellence Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Multi-Program CleanTech Approach:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Combine SDTC pre-commercial with tax credit deployment</li>
                          <li>• Stack federal, provincial, and regional cleantech programs</li>
                          <li>• Leverage sector-specific environmental initiatives</li>
                          <li>• Access international cleantech export support</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Environmental Innovation Priorities:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Net-zero transition and decarbonization technologies</li>
                          <li>• Renewable energy and energy storage systems</li>
                          <li>• Circular economy and waste-to-resource solutions</li>
                          <li>• Environmental monitoring and remediation technologies</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">Clean Technology Success Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Environmental Impact Quantification:</strong> Demonstrate clear, measurable environmental benefits including GHG reductions, resource conservation, and ecosystem improvements
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Technology Readiness and Innovation:</strong> Show technological advancement, competitive differentiation, and pathway to commercial viability
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Market Validation and Adoption:</strong> Demonstrate market need, customer validation, and scalable deployment potential
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Partnership and Ecosystem Integration:</strong> Build strategic alliances with end-users, technology partners, and value chain participants
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h2>
              <div className="grid gap-6">
                {faqData.map((faq, index) => (
                  <Card key={index} className="border-green-100">
                    <CardHeader>
                      <CardTitle className="flex items-start text-lg text-gray-800">
                        <HelpCircle className="w-6 h-6 text-green-600 mr-3 shrink-0" />
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 ml-9">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Related Government Grant Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/energy-efficiency-grants-canada" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <MapPin className="w-8 h-8 text-green-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Energy Efficiency Grants</h3>
                      <p className="text-sm text-gray-500">Retrofit funding for businesses</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/canada-innovation-research-development-grants-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <Briefcase className="w-8 h-8 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Innovation Grants</h3>
                      <p className="text-sm text-gray-500">R&D funding opportunities</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/agricultural-grants-canada" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <Leaf className="w-8 h-8 text-amber-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Agricultural Grants</h3>
                      <p className="text-sm text-gray-500">Farming and agri-tech funding</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/startup-grants-canada-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <Briefcase className="w-8 h-8 text-purple-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Startup Grants</h3>
                      <p className="text-sm text-gray-500">New business funding</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 via-teal-600 to-green-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Canada's $1.2B+ Clean Technology Ecosystem?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Get our complete clean technology funding guide or work with our cleantech specialists who have secured over $22M in environmental grants with 93% success rate across all major programs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY CleanTech Approach</h4>
                  <p className="text-green-100 text-sm mb-4">
                    Get our comprehensive clean technology funding guide with program-specific templates and strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-cleantech-funding-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get CleanTech Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert CleanTech Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with cleantech specialists who have secured $22M+ with 93% success rate across SDTC, Net Zero Accelerator, and tax credit programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=cleantech-expert-help">
                      Get CleanTech Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-green-200 text-sm mt-6">
                93% success rate for cleantech applications • Average funding secured: $680K • Multi-program expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
