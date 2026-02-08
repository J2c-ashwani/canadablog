import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Download, Building, Factory, Microscope, Brain, Leaf, TrendingUp, ExternalLink, ArrowRight, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ontario Innovation Grants & Tax Credits 2026 | OITC 10% Tax Credit | $3.2B+ R&D Funding",
  description: "Complete guide to Ontario innovation grants and tax credits. Access $3.2B+ through Ontario Innovation Tax Credit (10% OITC), Jobs and Prosperity Fund, OCE programs, and advanced manufacturing support.",
  keywords: "Ontario innovation grants, OITC tax credit, Ontario Innovation Tax Credit, Jobs and Prosperity Fund Ontario, Ontario Centres of Excellence, Ontario R&D tax credits, advanced manufacturing Ontario, life sciences Ontario grants",
  openGraph: {
    title: "Ontario Innovation Grants & Tax Credits 2026 | $3.2B+ OITC & R&D Support",
    description: "Access $3.2B+ in Ontario innovation funding. Complete guide to OITC, Jobs and Prosperity Fund, and provincial R&D programs.",
    url: "https://www.fsidigital.ca/blog/ontario-innovation-grants-tax-credits",
    images: ["/og-image.png"],
  },
}

export default function OntarioInnovationGrantsTaxCreditsPage() {
  const faqData = [
    {
      question: "What is the Ontario Innovation Tax Credit (OITC)?",
      answer: "The OITC is a 10% refundable tax credit for small to medium-sized corporations on eligible R&D expenditures in Ontario, which can be stacked with federal SR&ED credits."
    },
    {
      question: "What does the Ontario Centre of Innovation (OCI) fund?",
      answer: "OCI supports collaborative R&D between industry and academia, technology commercialization, and automotive innovation through programs like the Vehicle Innovation Network."
    },
    {
      question: "Is the Jobs and Prosperity Fund still active?",
      answer: "Yes, the Jobs and Prosperity Fund continues to support large-scale business expansion and innovation projects in Ontario, typically requiring minimum investments of $10 million."
    },
    {
      question: "Can I combine provincial and federal innovation grants?",
      answer: "Yes, 'stacking' is encouraged. You can often combine the Ontario Innovation Tax Credit (OITC) with the federal SR&ED tax credit, and provincial grants with federal programs like IRAP."
    },
    {
      question: "Who is eligible for the Ontario Interactive Digital Media Tax Credit?",
      answer: "The OIDMTC offers a 35-40% refundable tax credit for eligible labour, marketing, and distribution costs for qualifying digital media products developed in Ontario."
    }
  ];

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
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🍁 Ontario Provincial Innovation Support
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Ontario Innovation Grants & Tax Credits 2026
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access $3.2B+ in Ontario innovation funding through the 10% Ontario Innovation Tax Credit (OITC),
                Jobs and Prosperity Fund, Ontario Centres of Excellence, and sector-specific programs supporting
                advanced manufacturing, life sciences, AI & digital technology across Canada's largest innovation ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore Ontario Programs
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

        {/* Ontario Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$3.2B+</div>
                  <div className="text-gray-600">Annual Innovation Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">10%</div>
                  <div className="text-gray-600">OITC Tax Credit Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                  <div className="text-gray-600">Active Provincial Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-violet-600 mb-2">#1</div>
                  <div className="text-gray-600">Largest Innovation Ecosystem</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Ontario Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What are the Top Innovation Grants in Ontario?</h2>

              <div className="space-y-8">
                {/* Ontario Innovation Tax Credit */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Ontario Innovation Tax Credit (OITC) - 10% Refundable Tax Credit</CardTitle>
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
                      Ontario's premier R&D tax incentive providing a 10% refundable tax credit on eligible Ontario research and
                      development expenditures, stackable with federal SR&ED tax credits for combined support up to 75%.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible OITC Expenditures:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Ontario-based R&D salaries and wages</li>
                          <li>• Materials consumed in R&D</li>
                          <li>• Ontario R&D overhead expenses</li>
                          <li>• Subcontractor payments (Ontario-based)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">OITC Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 10% refundable tax credit</li>
                          <li>• Stacks with federal SR&ED (up to 75% total)</li>
                          <li>• No expenditure limit</li>
                          <li>• Cash refund for eligible corporations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Jobs and Prosperity Fund */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">Jobs and Prosperity Fund (JPF)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $20M</strong></span>
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
                      Ontario's flagship economic development program supporting large-scale business expansion, modernization,
                      and commercialization projects that create jobs and drive innovation across strategic sectors.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Project Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business expansion and modernization</li>
                          <li>• Manufacturing facility upgrades</li>
                          <li>• Technology commercialization</li>
                          <li>• Strategic sector investments</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Structure:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Up to 15% of eligible project costs</li>
                          <li>• Repayable performance-based loans</li>
                          <li>• Minimum $5M project investment</li>
                          <li>• Job creation requirements</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ontario Centres of Excellence */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Brain className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Ontario Centres of Excellence (OCE)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $250K</strong></span>
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
                      Ontario's innovation network facilitating university-industry collaboration, technology commercialization,
                      and talent development through multiple funding streams and partnership programs.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">OCE Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Voucher for Innovation & Productivity (VIP)</li>
                          <li>• Market Readiness Co-Investment (MRCI)</li>
                          <li>• TalentEdge internship programs</li>
                          <li>• SmartStart seed funding</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Support Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 50/50 cost-share models</li>
                          <li>• Access to university researchers</li>
                          <li>• Technology validation support</li>
                          <li>• Commercialization mentorship</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Regional Innovation Centres */}
                <Card className="border-teal-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-6 h-6 text-teal-600 mr-3" />
                      <CardTitle className="text-teal-700">Ontario Regional Innovation Centres (RICs)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Advisory & Support</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Startup Support</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Free Services</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Network of 17 regional innovation centres across Ontario providing free advisory services, mentorship,
                      and connections to funding programs for technology startups and scale-ups.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">RIC Services:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business advisory and mentorship</li>
                          <li>• Funding navigation and applications</li>
                          <li>• Technology commercialization support</li>
                          <li>• Market intelligence and connections</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Regional Coverage:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Toronto & GTA innovation hubs</li>
                          <li>• Ottawa & Eastern Ontario tech corridor</li>
                          <li>• Kitchener-Waterloo Region tech ecosystem</li>
                          <li>• Southwest, Central, Northern Ontario</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Sectors */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Which Sectors Receive Ontario Innovation Funding?</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Advanced Manufacturing */}
                <Card className="hover:shadow-lg transition-all border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Factory className="w-8 h-8 text-blue-600" />
                      <Badge variant="outline" className="text-xs">$1.2B+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Advanced Manufacturing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Ontario's largest innovation sector with comprehensive support for Industry 4.0, automation,
                      and manufacturing technology development.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Automotive & mobility manufacturing</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Industrial automation & robotics</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Advanced materials & aerospace</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Smart factory technologies</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Life Sciences Hub */}
                <Card className="hover:shadow-lg transition-all border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Microscope className="w-8 h-8 text-green-600" />
                      <Badge variant="outline" className="text-xs">$950M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Life Sciences Hub</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Canada's premier life sciences cluster supporting biotech, pharma, medical devices,
                      and health technology innovation.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Drug discovery & development</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Medical device innovation</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Digital health & MedTech</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Clinical trials & research</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI & Digital Tech */}
                <Card className="hover:shadow-lg transition-all border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Brain className="w-8 h-8 text-purple-600" />
                      <Badge variant="outline" className="text-xs">$850M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">AI & Digital Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Leading artificial intelligence and digital innovation ecosystem with Vector Institute
                      and comprehensive AI research support.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Machine learning & deep learning</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Computer vision & NLP</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>FinTech & InsurTech innovation</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Cybersecurity & blockchain</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CleanTech & Environment */}
                <Card className="hover:shadow-lg transition-all border-emerald-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Leaf className="w-8 h-8 text-emerald-600" />
                      <Badge variant="outline" className="text-xs">$620M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">CleanTech & Environment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Growing cleantech sector with support for renewable energy, environmental technology,
                      and sustainable innovation.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Renewable energy systems</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Energy storage & batteries</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Water & waste technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Circular economy solutions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AgriFood Innovation */}
                <Card className="hover:shadow-lg transition-all border-amber-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 text-amber-600" />
                      <Badge variant="outline" className="text-xs">$480M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">AgriFood Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Agricultural technology and food innovation support with focus on precision agriculture
                      and food processing technology.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Precision agriculture technology</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Food processing innovation</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Alternative proteins & biotech</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Smart farming solutions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emerging Technologies */}
                <Card className="hover:shadow-lg transition-all border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Building className="w-8 h-8 text-indigo-600" />
                      <Badge variant="outline" className="text-xs">$420M+ Funding</Badge>
                    </div>
                    <CardTitle className="text-lg">Emerging Technologies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Support for frontier technologies including quantum computing, space tech,
                      and next-generation innovation.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Quantum computing & sensors</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Space technology & satellites</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>5G & telecommunications</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        <span>Nanotechnology & materials</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Where are Ontario's Innovation Hubs Located?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Greater Toronto Area (GTA)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Toronto Innovation Corridor:</strong> Canada's largest tech hub with MaRS Discovery District,
                        Vector Institute for AI, and extensive startup ecosystem.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• AI & machine learning excellence</li>
                        <li>• FinTech & financial services innovation</li>
                        <li>• Life sciences & MedTech cluster</li>
                        <li>• Extensive venture capital access</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Ottawa & Eastern Ontario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Technology Corridor:</strong> National capital region with strengths in telecommunications,
                        cybersecurity, and government technology.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Telecommunications & 5G innovation</li>
                        <li>• Cybersecurity & defense tech</li>
                        <li>• Clean technology development</li>
                        <li>• Government procurement opportunities</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Waterloo Region</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Innovation Triangle:</strong> University of Waterloo ecosystem with Communitech hub
                        and strong automotive tech presence.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Quantum computing leadership</li>
                        <li>• Automotive & autonomous vehicles</li>
                        <li>• Software engineering talent</li>
                        <li>• Strong startup culture</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Southwest & London</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong>Advanced Manufacturing Hub:</strong> Strong manufacturing base with growing health sciences
                        and agricultural technology sectors.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Advanced manufacturing & automation</li>
                        <li>• Health sciences & medical devices</li>
                        <li>• Agricultural technology</li>
                        <li>• Food processing innovation</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Win Ontario Innovation Grants?</h2>

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
                          <strong>Maximize OITC Claims:</strong> Ensure all eligible Ontario R&D expenditures are captured for 10% tax credit
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Leverage OCE Network:</strong> Utilize university partnerships and OCE programs for cost-share funding
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Regional Innovation Centres:</strong> Connect with local RIC for advisory and funding navigation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Program Stacking:</strong> Combine OITC with federal SR&ED and sector programs for maximum support
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
                          <strong>Missing OITC Claims:</strong> Not claiming eligible Ontario R&D expenditures or poor documentation
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Ignoring OCE Programs:</strong> Missing opportunities for university collaboration and cost-share funding
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>No Regional Connections:</strong> Failing to leverage local innovation hubs and support networks
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Poor Application Strategy:</strong> Applying without understanding program fit or requirements
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
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-blue-700">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Official Resources Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Official Ontario Innovation Resources</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-blue-600" />
                    Government & Agencies
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://www.ontario.ca/page/ontario-innovation-tax-credit" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        Ontario Innovation Tax Credit (OITC) <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.oc-innovation.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        Ontario Centre of Innovation (OCI) <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://feddevontario.gc.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        FedDev Ontario <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Download className="w-5 h-5 mr-2 text-blue-600" />
                    Related Guides
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/blog/ontario-government-business-grants" className="flex items-center text-blue-600 hover:underline">
                        Ontario Business Grants Guide <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/ontario-small-business-grants-guide" className="flex items-center text-blue-600 hover:underline">
                        Small Business Grants Ontario <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-700 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Ontario Innovation Funding?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get expert help navigating Ontario's innovation ecosystem and maximizing your OITC, JPF, and OCE funding.
                Our Ontario specialists have secured $420M+ in provincial innovation funding.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=ontario-innovation-expert-help">
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
                83% success rate • $420M+ secured • OITC, JPF & OCE expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
