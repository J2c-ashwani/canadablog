import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, MapPin, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Regional Development Agencies Canada 2026 | RDA Federal Funding Guide | 7 Regional Programs",
  description: "Complete guide to Canada's Regional Development Agencies (RDA) federal funding programs. Access $125K-$10M through ACOA, FedDev Ontario, PacifiCan, PrairiesCan, CED, FedNor, and CanNor regional programs.",
  keywords: "Regional Development Agencies Canada, RDA federal funding, ACOA grants, FedDev Ontario funding, PacifiCan programs, PrairiesCan funding, CED Quebec funding, regional development funding Canada",
  openGraph: {
    title: "Regional Development Agencies Canada 2026 | RDA Federal Funding Guide",
    description: "Comprehensive guide to Canada's 7 Regional Development Agencies offering targeted federal funding from $125K to $10M for regional economic development.",
    url: "https://www.fsidigital.ca/blog/regional-development-agencies-government-grants",
    images: ["/og-image.png"],
  },
}

export default function RDAGovernmentGrantsBlogPage() {
  const faqData = [
    {
      question: "Which Regional Development Agency (RDA) should I apply to?",
      answer: "You must apply to the RDA responsible for the region where your project will take place. For example, if your business is in Toronto, you apply to FedDev Ontario. If it's in Halifax, you apply to ACOA. You cannot pick and choose based on which program looks better."
    },
    {
      question: "Is RDA funding a grant or a loan?",
      answer: "It is usually a 'repayable contribution' (an interest-free loan). Grants (non-repayable) are generally reserved for non-profit organizations or very specific small business initiatives (like the old RRRF during COVID)."
    },
    {
      question: "What is the difference between RDA and IRAP?",
      answer: "IRAP focuses on R&D and technical innovation. RDAs focus on economic growth, job creation, and scaling up. You can often use both: IRAP to develop the technology, and RDA funding to buy the factory equipment to mass-produce it."
    },
    {
      question: "Can I stack RDA funding with other grants?",
      answer: "Yes. The government stacking limit is usually 75% to 90%. You can combine RDA funding with provincial grants or BDC loans, as long as you have some 'skin in the game' (your own equity)."
    },
    {
      question: "What is the minimum revenue requirement?",
      answer: "Most RDA scale-up programs require you to be an incorporated business with at least $500k in revenue, or significant investment. They are not typically for early-stage idea startups (look to Futurpreneur or IRAP for that)."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌍 Federal Regional Development Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Regional Development Agencies (RDA) Federal Funding
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Canada's comprehensive network of 7 Regional Development Agencies providing targeted federal funding
                from $125K to $10M for regional economic development, innovation, and job creation. Complete guide to
                RDA programs across Atlantic Canada, Quebec, Ontario, Prairies, BC, and Northern Canada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=rda">
                    Find Your Regional RDA
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
                  <div className="text-3xl font-bold text-purple-600 mb-2">$10M</div>
                  <div className="text-gray-600">Max RDA Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
                  <div className="text-gray-600">Regional Agencies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$2.5B</div>
                  <div className="text-gray-600">Annual Investment Portfolio</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">15,000+</div>
                  <div className="text-gray-600">Projects Supported Annually</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">RDA Network as Federal Regional Policy Tool</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Canada's Regional Development Agencies (RDAs) represent the federal government's primary mechanism
                  for delivering tailored economic development support across diverse regional economies. Operating
                  under Innovation, Science & Economic Development Canada (ISED), the seven RDAs provide region-specific
                  federal funding and expertise to address unique economic challenges, leverage regional strengths,
                  and ensure balanced national economic growth.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-purple-800">Federal Regional Policy Objectives</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Address regional economic disparities and gaps</li>
                      <li>• Support region-specific innovation ecosystems</li>
                      <li>• Facilitate economic diversification and resilience</li>
                      <li>• Enable competitive regional business environments</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Strategic Federal Coordination</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Nationally coordinated programs with regional delivery</li>
                      <li>• Integration with federal innovation strategy</li>
                      <li>• Alignment with other federal business programs</li>
                      <li>• Regional economic intelligence and insights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Complete RDA Network Overview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Canada's 7 Regional Development Agencies</h2>

              <div className="space-y-8">
                {/* Atlantic Canada - ACOA */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Atlantic Canada Opportunities Agency (ACOA)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>NB, NS, PE, NL</strong></span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>SME & Innovation</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Ocean Economy</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      ACOA supports business competitiveness, innovation, and productivity across Atlantic Canada's
                      four provinces, with specialized focus on ocean technologies, clean technology, and tourism.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Key Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business Development Program</li>
                          <li>• Regional Economic Growth through Innovation</li>
                          <li>• Community Futures Program</li>
                          <li>• Atlantic Trade and Investment Growth</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Priority Sectors:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Ocean and clean technologies</li>
                          <li>• Information and communications technology</li>
                          <li>• Life sciences and biomanufacturing</li>
                          <li>• Tourism and creative industries</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Federal Investment Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business scale-up and productivity</li>
                          <li>• Innovation commercialization</li>
                          <li>• Export development and trade</li>
                          <li>• Community economic development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quebec - CED */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Canada Economic Development for Quebec Regions (CED)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Quebec</strong></span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Up to $8M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Innovation Hubs</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>AI & Digital</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      CED guides Quebec businesses and regions toward tomorrow's economy, supporting innovation,
                      entrepreneurship, and regional economic development across all Quebec regions.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Key Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Quebec Economic Development Program</li>
                          <li>• Innovation and Competitiveness Program</li>
                          <li>• Community Economic Development</li>
                          <li>• Tourism Development Program</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Innovation Clusters:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Artificial intelligence and digital</li>
                          <li>• Life sciences and health technologies</li>
                          <li>• Aerospace and advanced manufacturing</li>
                          <li>• Clean technology and sustainable development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Regional Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Montreal innovation ecosystem</li>
                          <li>• Quebec City technology corridor</li>
                          <li>• Rural and remote region development</li>
                          <li>• Indigenous community economic development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ontario - FedDev & FedNor */}
                <Card className="border-red-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-6 h-6 text-red-600 mr-3" />
                      <CardTitle className="text-red-700">FedDev Ontario & FedNor (Ontario Regional Agencies)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Ontario</strong></span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Tech & Manufacturing</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Scale-up Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      FedDev Ontario supports innovation and economic growth in Southern Ontario, while FedNor focuses
                      on Northern Ontario's unique economic challenges and opportunities.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2 text-red-700">FedDev Ontario (Southern):</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business Scale-up and Productivity Program</li>
                          <li>• Regional Innovation Ecosystems</li>
                          <li>• Advanced Manufacturing Supercluster</li>
                          <li>• Inclusive Innovation Program</li>
                          <li>• Toronto-Waterloo Innovation Corridor</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-blue-700">FedNor (Northern Ontario):</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Northern Ontario Development Program</li>
                          <li>• Community Futures Program</li>
                          <li>• Indigenous Economic Development</li>
                          <li>• Mining innovation and technology</li>
                          <li>• Forestry and natural resources</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Prairies - PrairiesCan */}
                <Card className="border-yellow-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-6 h-6 text-yellow-600 mr-3" />
                      <CardTitle className="text-yellow-700">Prairies Economic Development Canada (PrairiesCan)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>AB, SK, MB</strong></span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Energy & Agri</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Diversification</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      PrairiesCan supports economic diversification, innovation, and community development unique
                      to Alberta, Saskatchewan, and Manitoba's prairie economy.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Priority Sectors:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Clean technology and renewable energy</li>
                          <li>• Agriculture and food processing</li>
                          <li>• Advanced manufacturing and materials</li>
                          <li>• Digital technologies and fintech</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Regional Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Prairie Innovation Program</li>
                          <li>• Business Scale-up and Productivity</li>
                          <li>• Community Futures Program</li>
                          <li>• Regional Relief and Recovery Fund</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Economic Diversification:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Energy transition and cleantech</li>
                          <li>• Value-added agriculture</li>
                          <li>• Technology sector development</li>
                          <li>• Indigenous business development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* British Columbia - PacifiCan */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Pacific Economic Development Canada (PacifiCan)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>British Columbia</strong></span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Up to $10M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Tech & Cleantech</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Asia-Pacific Gateway</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      PacifiCan leverages BC's strategic position as Canada's Asia-Pacific gateway, supporting
                      innovation, clean technology, and international trade development.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Innovation Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Clean technology and climate solutions</li>
                          <li>• Digital technologies and gaming</li>
                          <li>• Life sciences and health technologies</li>
                          <li>• Ocean and marine technologies</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Strategic Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• BC Innovation Program</li>
                          <li>• Business Scale-up and Productivity</li>
                          <li>• Regional Innovation Ecosystems</li>
                          <li>• Trade Accelerator Program</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Regional Advantages:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Vancouver tech ecosystem</li>
                          <li>• Asia-Pacific trade connections</li>
                          <li>• Clean energy and sustainability focus</li>
                          <li>• Indigenous reconciliation initiatives</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Northern Canada - CanNor */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">Canadian Northern Economic Development Agency (CanNor)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>YT, NT, NU</strong></span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Indigenous Focus</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>Resource Development</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      CanNor develops diversified, sustainable economies across Canada's three territories, with
                      emphasis on Indigenous economic development and northern-specific opportunities.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Northern Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Mining and resource development</li>
                          <li>• Tourism and cultural industries</li>
                          <li>• Arts, crafts, and traditional knowledge</li>
                          <li>• Infrastructure and connectivity</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Key Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Northern Economic Development Program</li>
                          <li>• Strategic Investments in Northern Economic Development</li>
                          <li>• Community Futures Program</li>
                          <li>• Economic Development Initiative</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Indigenous Development:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Indigenous business development</li>
                          <li>• Traditional knowledge commercialization</li>
                          <li>• Community capacity building</li>
                          <li>• Cultural tourism initiatives</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Federal RDA Coordination & Integration */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Federal RDA Program Integration</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-purple-700">🏛️ National Federal Coordination:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>ISED Portfolio Integration:</strong> Coordinated delivery of federal innovation and economic development priorities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Strategic Innovation Fund Pathway:</strong> Regional preparation for large-scale federal programs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Innovation Superclusters:</strong> Regional participation in national innovation initiatives</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Trade and Investment:</strong> Integration with Global Affairs and Trade Commissioner Service</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-700">🔗 Federal Program Synergies:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>IRAP Coordination:</strong> Technology development through to regional commercialization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>BDC Partnership:</strong> Complementary financing and advisory services</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Export Development:</strong> Regional businesses accessing international markets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Clean Technology Programs:</strong> Regional clean tech innovation and deployment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RDA Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">RDA Federal Application Process</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Regional Agency Identification and Alignment</h4>
                    <p className="text-gray-600">Identify your appropriate regional RDA based on business location and ensure project aligns with regional economic priorities and federal mandates.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Program Selection and Preliminary Consultation</h4>
                    <p className="text-gray-600">Select appropriate RDA program stream and engage in preliminary discussions with regional business development officers.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Comprehensive Application Development</h4>
                    <p className="text-gray-600">Develop detailed application with business plan, financial projections, regional economic impact analysis, and implementation timeline.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Regional and Federal Review Process</h4>
                    <p className="text-gray-600">Application undergoes regional assessment for alignment with local priorities and federal evaluation for national policy compliance.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Federal Contribution Agreement and Implementation</h4>
                    <p className="text-gray-600">Execute federal contribution agreement with performance milestones, reporting requirements, and ongoing regional support.</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">RDA Federal Application Success Strategies</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Regional Federal Program Success Factors:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Regional Economic Alignment:</strong> Demonstrate clear contribution to regional economic priorities and development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Federal Policy Connection:</strong> Show alignment with national innovation and economic strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Regional Partnership Building:</strong> Engage with local economic development stakeholders and organizations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Scalable Impact Demonstration:</strong> Present clear pathway for regional economic impact and job creation</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common RDA Federal Application Mistakes:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Wrong Regional Agency:</strong> Applying to incorrect RDA or not understanding regional mandates</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Weak Regional Economic Case:</strong> Insufficient demonstration of regional benefits and economic impact</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Limited Regional Engagement:</strong> Not building relationships with regional business development officers</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Generic Federal Application:</strong> Not tailoring application to specific regional priorities and characteristics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">RDA Frequently Asked Questions</h2>
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

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access RDA Federal Regional Funding?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Get the complete RDA federal application guide or work with our regional development specialists
                who have secured $45M+ in RDA approvals across all seven regional agencies.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Get Application Guide CTA */}
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Regional Approach</h4>
                  <p className="text-purple-100 text-sm mb-4">
                    Get our comprehensive RDA federal application guide with regional-specific templates and strategies for all 7 agencies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-purple-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-regional-development-agencies">
                      <Download className="w-4 h-4 mr-2" />
                      Get RDA Federal Guide
                    </Link>
                  </Button>
                </div>

                {/* Get Expert Help CTA */}
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Regional Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with regional development specialists who have secured $45M+ in RDA approvals with 88% success rate across all agencies.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=rda-regional-expert-help">
                      Get Regional Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-purple-200 text-sm mt-6">
                88% success rate for RDA applications • Average funding secured: $485K • All 7 regional agencies expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
