import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Factory, Wheat, Building2, Truck, Heart, Cpu, Leaf, Users, Award, HelpCircle, FileText } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Industry Specific Grants 2026 | $1.5B+ Sector-Focused Programs Across 25+ Industries",
  description: "Complete guide to Canadian industry specific grants. Access all 25+ sector-focused programs for manufacturing, agriculture, services, technology, healthcare, construction, and specialized industry funding.",
  keywords: "Canada industry specific grants, manufacturing grants Canada, agriculture grants, service industry funding, sector specific programs, industry targeted grants, specialized business funding",
  openGraph: {
    title: "Canada Industry Specific Grants 2026 | $1.5B+ Sector-Focused Guide",
    description: "Complete guide to Canadian industry specific grants. Access all 25+ sector-focused programs for manufacturing, agriculture, services, technology, healthcare, construction, and specialized industry funding.",
    url: "https://grants.finance/blog/canada-industry-specific-grants-guide",
    siteName: "Grants Finance",
    locale: "en_CA",
    type: "article",
    images: ["/og-image.png"],
  },
}

const faqData = [
  {
    question: "What industries are eligible for Canadian government grants?",
    answer: "Almost all major sectors have specific funding programs, including manufacturing (AMF), agriculture (SCAP), technology (IRAP), healthcare, tourism, and aerospace. Service-based businesses can often access general small business grants or digital adoption funding (CDAP)."
  },
  {
    question: "Can I apply for multiple industry grants?",
    answer: "Yes, stacking grants is a common strategy. You can often combine a federal program like IRAP (R&D) with a provincial manufacturing grant and a hiring grant. However, you typically cannot use two government sources to cover the exact same 100% of a cost (stacking limits usually cap at 75%)."
  },
  {
    question: "Are there grants for construction companies?",
    answer: "Yes, primarily for adopting new technologies (e.g., green building tech, digitalization), hiring apprentices, or purchasing equipment that improves productivity. Direct 'cash for operations' grants are rare in construction."
  },
  {
    question: "How do I find grants for my specific niche?",
    answer: "Start by identifying your NAICS code. Then look for 'sector-specific' streams within major agencies like ISED or your Regional Development Agency (e.g., FedDev Ontario, PrairiesCan). Industry associations often list specialized funding opportunities."
  },
  {
    question: "What is the success rate for industry-specific grants?",
    answer: "Generally higher than open competitions. Eligibility criteria are stricter, which filters out many applicants. If you meet the specific sector requirements (e.g., 'dairy processor' or 'automotive supplier'), your chances of approval are significantly better."
  }
]

export default function CanadaIndustrySpecificGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏭 Canadian Industry Specific Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Canada Industry Specific Grants 2026
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Access $1.5B+ in Canadian sector-focused funding across 25+ specialized industry programs. From manufacturing
                to agriculture, services to technology - complete guide to industry-tailored business support.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=industry-specific-grants-expert-help">
                  Get Expert Help with Industry Grants
                </Link>
              </Button>
              <p className="text-indigo-200 text-sm mt-4">
                Free consultation • 90% industry funding success rate • Average funding: $85K
              </p>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-12 bg-indigo-50 border-b border-indigo-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Industry Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#sectors" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">What industries are eligible?</h3>
                  <p className="text-sm text-gray-600 mt-1">Manufacturing, tech, agri-food, and more.</p>
                </a>
                <a href="#faq" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">Can I apply for multiple grants?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, stacking is allowed within limits.</p>
                </a>
                <a href="#sectors" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">Are there grants for construction?</h3>
                  <p className="text-sm text-gray-600 mt-1">Focus on tech adoption and equipment.</p>
                </a>
                <a href="#sectors" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">How do I find grants for my niche?</h3>
                  <p className="text-sm text-gray-600 mt-1">Browse by industry sector below.</p>
                </a>
                <a href="#sectors" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">What is the AMF program?</h3>
                  <p className="text-sm text-gray-600 mt-1">Advanced Manufacturing Fund details.</p>
                </a>
                <a href="#sectors" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-indigo-700">Is there funding for retail?</h3>
                  <p className="text-sm text-gray-600 mt-1">Digital adoption and hiring grants.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$1.5B+</div>
                  <div className="text-gray-600">Industry Specific Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                  <div className="text-gray-600">Specialized Industry Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$85K</div>
                  <div className="text-gray-600">Average Industry Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Industry Programs */}
        <section id="sectors" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Factory className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-center">Manufacturing Industry Programs</h2>
              </div>
              <p className="text-center text-gray-600 mb-12">
                Specialized funding programs designed specifically for Canadian manufacturers, processors, and industrial businesses.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Advanced Manufacturing Fund */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Advanced Manufacturing Fund (AMF)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Factory className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Manufacturing</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal program supporting advanced manufacturing technology adoption and Industry 4.0 transformation.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Advanced manufacturing equipment</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Automation and robotics integration</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Digital manufacturing systems</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Smart factory technologies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Provincial Manufacturing Programs */}
                <Card className="border-2 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Provincial Manufacturing Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$50K - $2M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building2 className="w-5 h-5 text-indigo-600 mr-2" />
                        <span><strong>Regional Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Province-specific manufacturing programs targeting equipment upgrades, productivity improvements, and expansion.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Ontario Manufacturing Modernization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Quebec Industry 4.0 Program</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>BC Manufacturing Enhancement</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Alberta Manufacturing Innovation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Agriculture & Agri-Food Programs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Wheat className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-center">Agriculture & Agri-Food Industry Programs</h2>
              </div>
              <p className="text-center text-gray-600 mb-12">
                Comprehensive funding ecosystem for farmers, agri-businesses, food processors, and agricultural technology companies.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* AgriInnovate Program */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">AgriInnovate Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Wheat className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Agri-Innovation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Federal program promoting commercialization and adoption of agricultural and agri-food technologies.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Agricultural technology commercialization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>AgTech innovation demonstration</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Sustainable farming practices</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Food processing innovation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Agricultural Clean Technology */}
                <Card className="border-2 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-700">Agricultural Clean Technology Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $2M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Leaf className="w-5 h-5 text-emerald-600 mr-2" />
                        <span><strong>Clean Tech</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Support for clean technology adoption in agriculture to reduce emissions and improve sustainability.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Precision agriculture technology</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Renewable energy systems</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Carbon reduction initiatives</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Sustainable processing technologies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Supply Management Processing */}
                <Card className="border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-700">Supply Management Processing Investment Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$5M - $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Factory className="w-5 h-5 text-yellow-600 mr-2" />
                        <span><strong>Food Processing</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Major funding for dairy, poultry, and egg processing sectors to enhance competitiveness.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Automated processing equipment</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Technology upgrades and modernization</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Production capacity expansion</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Quality and safety improvements</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* AgriScience Program */}
                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">AgriScience Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Cpu className="w-5 h-5 text-teal-600 mr-2" />
                        <span><strong>R&D Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Non-repayable funding for pre-commercial scientific research in agriculture and agri-food innovation.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Agricultural research and development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Food safety and nutrition research</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Plant and animal health studies</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Climate adaptation research</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Technology & Innovation Industries */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Cpu className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-center">Technology & Innovation Industry Programs</h2>
              </div>
              <p className="text-center text-gray-600 mb-12">
                Specialized funding for technology companies, software developers, AI/ML businesses, and innovation-driven enterprises.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <Cpu className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Software & AI Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Funding for software development, artificial intelligence, and machine learning companies.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• AI for Good Technology Program</li>
                      <li>• Software Development Tax Credits</li>
                      <li>• Digital Innovation Programs</li>
                      <li>• Tech Commercialization Support</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Cleantech & Greentech</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Environmental technology and clean energy innovation funding programs.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Clean Technology Fund</li>
                      <li>• Net Zero Accelerator</li>
                      <li>• Sustainable Development Goals Fund</li>
                      <li>• Green Innovation Programs</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Biotech & Life Sciences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Biotechnology, pharmaceutical, and life sciences industry support programs.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Biomanufacturing and Life Sciences</li>
                      <li>• Medical Device Development</li>
                      <li>• Pharmaceutical Innovation Fund</li>
                      <li>• Health Technology Acceleration</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Service Industries & Other Sectors */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Service Industries & Other Specialized Sectors</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Healthcare & Social Services */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <Heart className="w-6 h-6 text-red-600 mr-2" />
                      <CardTitle className="text-red-700">Healthcare & Social Services</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Digital Health Innovation</strong> - Up to $500K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Healthcare Technology Adoption</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Telemedicine Platform Development</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Medical Device Innovation</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Transportation & Logistics */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <Truck className="w-6 h-6 text-orange-600 mr-2" />
                      <CardTitle className="text-orange-700">Transportation & Logistics</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Zero Emission Vehicle Program</strong> - Up to $300K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Smart Transportation Technology</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Supply Chain Innovation</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Electric Vehicle Infrastructure</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Creative Industries */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <Award className="w-6 h-6 text-purple-600 mr-2" />
                      <CardTitle className="text-purple-700">Creative & Cultural Industries</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Creative Export Canada</strong> - Up to $100K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Digital Media Innovation</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Cultural Technology Adoption</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Indigenous Cultural Business Support</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Tourism & Hospitality */}
                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <Users className="w-6 h-6 text-teal-600 mr-2" />
                      <CardTitle className="text-teal-700">Tourism & Hospitality</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Tourism Recovery Program</strong> - Up to $75K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Indigenous Tourism Development</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Sustainable Tourism Innovation</strong></span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span><strong>Digital Tourism Platform Support</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Specialization Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Why Industry-Specific Programs Matter</h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Targeted Solutions</h3>
                  <p className="text-gray-600 text-sm">
                    Programs designed to address specific industry challenges, opportunities, and regulatory requirements.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Sector Expertise</h3>
                  <p className="text-gray-600 text-sm">
                    Funding agencies with deep understanding of industry dynamics, trends, and competitive landscapes.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Higher Success Rates</h3>
                  <p className="text-gray-600 text-sm">
                    Industry-specific programs typically have higher approval rates due to focused eligibility criteria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Unlock Your Industry's Specialized Funding with Expert Navigation of 25+ Programs
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Canada's industry-specific funding ecosystem spans manufacturing, agriculture, technology, healthcare, and specialized sectors.
                Our industry specialists understand sector-specific requirements and have helped 400+ businesses secure over $34M in
                industry-targeted funding with a 90% success rate.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Complete Industry-Specific Funding Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>All 25+ industry program eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Sector-specific application optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Industry requirements and compliance guidance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Multi-program coordination across sectors</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>90% success rate for industry-specific funding</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Average $85K industry funding secured</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=industry-specific-grants-expert-help">
                  Get Expert Help with All Industry Programs
                </Link>
              </Button>
              <p className="text-indigo-200 text-sm mt-4">
                Free consultation • Industry funding specialists • Sector-specific expertise
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                      <HelpCircle className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 ml-9">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Industry Funding Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-left">
                    <h4 className="font-bold text-lg mb-2 flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      Manufacturing Grants
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Complete guide to the Advanced Manufacturing Fund and other industrial programs.
                    </p>
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50" asChild>
                      <Link href="/blog/canada-manufacturing-industry-grants-guide">Read Guide</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-left">
                    <h4 className="font-bold text-lg mb-2 flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      Tech & Innovation
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Funding for technology companies and digital adoption across all sectors.
                    </p>
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50" asChild>
                      <Link href="/blog/canada-technology-adoption-grants-guide">Read Guide</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      {/* FAQ Schema for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          })
        }}
      />

    </>
  )
}
