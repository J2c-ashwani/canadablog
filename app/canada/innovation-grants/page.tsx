import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, ExternalLink, MapPin, Building, Users, Zap, Award, Lightbulb, Rocket, Beaker, Brain } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Innovation Grants 2025 | $4.2B+ R&D Funding for Canadian Innovators",
  description: "Comprehensive guide to Canadian innovation grants. Access SR&ED, IRAP, SIF, NSERC, and 45+ programs offering $4.2B+ for research, development, and technology commercialization.",
  keywords: "Canada innovation grants, R&D funding Canada, SR&ED tax credits, IRAP grants, Strategic Innovation Fund, NSERC funding, technology commercialization Canada",
  openGraph: {
    title: "Canada Innovation Grants 2025 | $4.2B+ R&D Funding for Canadian Innovators",
    description: "Complete guide to Canadian innovation funding with federal and provincial programs offering $4.2B+ for research, development, and commercialization.",
    url: "https://grantfinder.pro/canada/innovation-grants",
    images: ["/og-image.jpg"],
  },
}

export default function CanadaInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                🚀 Canada Innovation Grants
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance leading-tight">
                $4.2B+ Available for Canadian Innovation
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
                Access Canada's comprehensive innovation funding ecosystem. From SR&ED tax credits to Strategic Innovation Fund - 
                accelerate your research, development, and technology commercialization with government support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4">
                  Find Innovation Grants Now
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-700/30 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                  Browse R&D Programs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Innovation Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="p-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$4.2B+</div>
                  <div className="text-gray-600 font-medium">Innovation Funding Available</div>
                  <div className="text-sm text-gray-500 mt-1">Federal + Provincial Programs</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">45+</div>
                  <div className="text-gray-600 font-medium">Active R&D Programs</div>
                  <div className="text-sm text-gray-500 mt-1">All Innovation Stages</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">35%</div>
                  <div className="text-gray-600 font-medium">SR&ED Refundable Rate</div>
                  <div className="text-sm text-gray-500 mt-1">Enhanced 2025 Limits</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">$100M</div>
                  <div className="text-gray-600 font-medium">Maximum SIF Funding</div>
                  <div className="text-sm text-gray-500 mt-1">Transformative Projects</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Innovation Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                  Major Programs
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Canada's Flagship Innovation Programs
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Access Canada's premier innovation funding programs designed to support 
                  research, development, and technology commercialization across all sectors.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* SR&ED Tax Credits */}
                <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-green-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        SR&ED
                      </div>
                      <div>
                        <CardTitle className="text-green-700 text-xl">Scientific Research & Experimental Development</CardTitle>
                        <p className="text-green-600 text-sm">Canada Revenue Agency</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Up to 65%</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Tax Credits</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Annual Filing</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canada's largest R&D tax incentive program providing refundable tax credits 
                      for eligible research and experimental development activities.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>35% refundable federal credit (first $4.5M)</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Provincial credits up to 30% additional</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Covers salaries, materials, contractors, overhead</span>
                      </div>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                      <Link href="/blog/sred-scientific-research-experimental-development">
                        Learn About SR&ED
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* IRAP Program */}
                <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        IRAP
                      </div>
                      <div>
                        <CardTitle className="text-blue-700 text-xl">Industrial Research Assistance Program</CardTitle>
                        <p className="text-blue-600 text-sm">National Research Council Canada</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>SMEs</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>60-80% Funding</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Non-repayable contributions for SMEs developing and commercializing 
                      innovative technologies and solutions with dedicated advisory support.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>R&D project funding 60-80% of costs</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Industrial Technology Advisors included</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Youth Employment Program support</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                      <Link href="/blog/irap-industrial-research-assistance-program-innovation">
                        Learn About IRAP
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Strategic Innovation Fund */}
                <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-purple-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        SIF
                      </div>
                      <div>
                        <CardTitle className="text-purple-700 text-xl">Strategic Innovation Fund</CardTitle>
                        <p className="text-purple-600 text-sm">Innovation, Science & Economic Development Canada</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>$10M - $100M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>Large Projects</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Transformative</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Large-scale funding for transformative innovation projects that drive 
                      economic growth, create jobs, and enhance Canada's global competitiveness.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Major technology and innovation projects</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Significant economic impact requirements</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Industrial research and commercialization</span>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                      <Link href="/blog/strategic-innovation-fund-canada-guide">
                        Learn About SIF
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* NSERC Programs */}
                <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="bg-orange-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold mr-3">
                        NSERC
                      </div>
                      <div>
                        <CardTitle className="text-orange-700 text-xl">Natural Sciences & Engineering Research</CardTitle>
                        <p className="text-orange-600 text-sm">Natural Sciences and Engineering Research Council</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm"><strong>Various Amounts</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm"><strong>University-Industry</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm"><strong>Research Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive research funding supporting university-industry partnerships, 
                      technology transfer, and collaborative R&D initiatives.
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Idea to Innovation (I2I) grants</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Collaborative Research and Development</span>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Technology transfer and commercialization</span>
                      </div>
                    </div>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                      <Link href="/blog/nserc-research-grants-canada">
                        Learn About NSERC
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation by Sector */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                  Sector-Specific Innovation
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Innovation Funding by Industry Sector
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Specialized innovation programs targeting key sectors driving 
                  Canada's economic growth and technological advancement.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Beaker className="w-8 h-8 text-teal-600" />,
                    title: "Clean Technology",
                    description: "Environmental technology, renewable energy, and sustainability innovation",
                    amount: "$1.2B+",
                    programs: "22+ Programs",
                    color: "teal",
                    features: ["SDTC funding up to $15M", "Clean Technology ITCs", "Net Zero Accelerator"]
                  },
                  {
                    icon: <Building className="w-8 h-8 text-gray-600" />,
                    title: "Advanced Manufacturing",
                    description: "Industry 4.0, automation, and smart manufacturing technologies",
                    amount: "$3.1B+",
                    programs: "38+ Programs",
                    color: "gray",
                    features: ["NGen collaborative projects", "Automation funding", "Productivity enhancement"]
                  },
                  {
                    icon: <Brain className="w-8 h-8 text-pink-600" />,
                    title: "Digital & AI",
                    description: "Artificial intelligence, digital transformation, and software innovation",
                    amount: "$850M+",
                    programs: "25+ Programs",
                    color: "pink",
                    features: ["AI research initiatives", "Digital adoption programs", "Scale AI supercluster"]
                  },
                  {
                    icon: <Award className="w-8 h-8 text-green-600" />,
                    title: "Life Sciences",
                    description: "Biotechnology, medical devices, and health technology innovation",
                    amount: "$720M+",
                    programs: "18+ Programs",
                    color: "green",
                    features: ["Biomanufacturing support", "Clinical trials funding", "Medical device pathways"]
                  },
                  {
                    icon: <Rocket className="w-8 h-8 text-blue-600" />,
                    title: "Aerospace & Defence",
                    description: "Aerospace innovation, space technology, and defence applications",
                    amount: "$450M+",
                    programs: "12+ Programs",
                    color: "blue",
                    features: ["Canadian Space Agency", "Defence innovation", "Aerospace clusters"]
                  },
                  {
                    icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
                    title: "Agri-Food Technology",
                    description: "Agricultural innovation, food technology, and agri-tech solutions",
                    amount: "$2.3B+",
                    programs: "32+ Programs",
                    color: "yellow",
                    features: ["AgriInnovate Program", "Precision agriculture", "Food processing tech"]
                  }
                ].map((sector, index) => {
                  const colorClasses = {
                    teal: "border-teal-200 hover:border-teal-300",
                    gray: "border-gray-200 hover:border-gray-300",
                    pink: "border-pink-200 hover:border-pink-300",
                    green: "border-green-200 hover:border-green-300",
                    blue: "border-blue-200 hover:border-blue-300",
                    yellow: "border-yellow-200 hover:border-yellow-300"
                  }
                  
                  return (
                    <Card key={index} className={`hover:shadow-lg transition-all ${colorClasses[sector.color as keyof typeof colorClasses]}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          {sector.icon}
                          <Badge variant="outline" className="text-xs">
                            {sector.programs}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{sector.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">{sector.description}</p>
                        <div className="text-2xl font-bold text-gray-900 mb-2">{sector.amount}</div>
                        <div className="text-sm text-gray-500 mb-4">Available Funding</div>
                        <div className="space-y-2 mb-4">
                          {sector.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-600">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" className="w-full" size="sm" asChild>
                          <Link href={`/blog/canada-${sector.title.toLowerCase().replace(/\s+/g, '-').replace('&', '')}-innovation-grants`}>
                            Explore {sector.title}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ENHANCED Innovation Stages Support */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                  Innovation Journey
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Funding for Every Stage of Innovation
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From early-stage research to market commercialization - Canada provides 
                  comprehensive support throughout your innovation journey.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
                    title: "Ideation & Research",
                    stage: "Stage 1",
                    programs: ["NSERC Discovery Grants", "University Research", "Basic R&D Support"],
                    funding: "Up to $1M",
                    color: "yellow",
                    slug: "ideation-research-funding-canada",
                    description: "Early-stage research and concept development funding"
                  },
                  {
                    icon: <Beaker className="w-8 h-8 text-blue-500" />,
                    title: "Development & Proof",
                    stage: "Stage 2", 
                    programs: ["IRAP Technology Development", "SR&ED Tax Credits", "NSERC CRD"],
                    funding: "Up to $5M",
                    color: "blue",
                    slug: "development-proof-concept-funding-canada",
                    description: "Technology development and proof-of-concept validation"
                  },
                  {
                    icon: <Building className="w-8 h-8 text-purple-500" />,
                    title: "Demonstration & Pilot",
                    stage: "Stage 3",
                    programs: ["SDTC Demonstration", "Clean Growth Program", "Sector Pilots"],
                    funding: "Up to $15M",
                    color: "purple",
                    slug: "demonstration-pilot-funding-canada",
                    description: "Demonstration projects and pilot program implementation"
                  },
                  {
                    icon: <Rocket className="w-8 h-8 text-green-500" />,
                    title: "Commercialization & Scale",
                    stage: "Stage 4",
                    programs: ["Strategic Innovation Fund", "Export Development", "Scale-up Support"],
                    funding: "Up to $100M",
                    color: "green",
                    slug: "commercialization-scale-up-funding-canada",
                    description: "Market entry and large-scale commercialization support"
                  }
                ].map((stage, index) => {
                  const colorClasses = {
                    yellow: "border-l-yellow-500 bg-yellow-50",
                    blue: "border-l-blue-500 bg-blue-50",
                    purple: "border-l-purple-500 bg-purple-50",
                    green: "border-l-green-500 bg-green-50"
                  }
                  
                  const buttonColors = {
                    yellow: "bg-yellow-600 hover:bg-yellow-700",
                    blue: "bg-blue-600 hover:bg-blue-700",
                    purple: "bg-purple-600 hover:bg-purple-700",
                    green: "bg-green-600 hover:bg-green-700"
                  }
                  
                  return (
                    <Card key={index} className={`border-l-4 ${colorClasses[stage.color as keyof typeof colorClasses]} hover:shadow-lg transition-all`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          {stage.icon}
                          <Badge variant="secondary" className="text-xs">
                            {stage.stage}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{stage.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-2">{stage.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold text-gray-900 mb-3">{stage.funding}</div>
                        <div className="space-y-2 mb-4">
                          {stage.programs.map((program, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                              <span>{program}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button 
                            className={`w-full ${buttonColors[stage.color as keyof typeof buttonColors]} text-white`} 
                            size="sm" 
                            asChild
                          >
                            <Link href={`/blog/${stage.slug}`}>
                              Learn More About {stage.stage}
                            </Link>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            size="sm" 
                            asChild
                          >
                            <Link href={`/contact?service=${stage.slug}-expert-help`}>
                              Get Expert Help
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ENHANCED Provincial Innovation Programs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-red-100 text-red-800 border-red-200">
                  Provincial Innovation
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Provincial Innovation Support
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Provincial governments complement federal programs with region-specific 
                  innovation initiatives and enhanced tax credit opportunities.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    province: "Ontario",
                    icon: <MapPin className="w-6 h-6 text-red-500" />,
                    credit: "10% OITC",
                    programs: ["Ontario Innovation Tax Credit", "Jobs and Prosperity Fund", "Ontario Centres of Excellence"],
                    total: "$3.2B",
                    color: "red",
                    slug: "ontario-innovation-grants",
                    description: "Canada's largest provincial innovation ecosystem with comprehensive R&D support",
                    highlights: ["Advanced Manufacturing", "Life Sciences Hub", "AI & Digital Tech"]
                  },
                  {
                    province: "Quebec", 
                    icon: <MapPin className="w-6 h-6 text-blue-500" />,
                    credit: "30% CRIC",
                    programs: ["Quebec R&D Tax Credit (CRIC)", "Investissement Québec", "PRIMA Quebec"],
                    total: "$2.5B",
                    color: "blue",
                    slug: "quebec-innovation-grants",
                    description: "Leading francophone innovation ecosystem with highest provincial R&D tax credits",
                    highlights: ["Aerospace Excellence", "Gaming & VFX", "Biotech Cluster"]
                  },
                  {
                    province: "British Columbia",
                    icon: <MapPin className="w-6 h-6 text-green-500" />,
                    credit: "10% BCITC",
                    programs: ["BC Innovation Tax Credit", "Innovate BC", "New Ventures BC"],
                    total: "$1.8B",
                    color: "green",
                    slug: "british-columbia-innovation-grants",
                    description: "Pacific gateway for innovation with strong cleantech and digital focus",
                    highlights: ["Clean Technology", "Film & Creative", "Ocean Tech"]
                  },
                  {
                    province: "Alberta",
                    icon: <MapPin className="w-6 h-6 text-orange-500" />,
                    credit: "Various",
                    programs: ["Alberta Innovates", "Emissions Reduction Alberta", "AI4Society"],
                    total: "$950M",
                    color: "orange",
                    slug: "alberta-innovation-grants",
                    description: "Energy innovation leader diversifying into AI, cleantech, and health",
                    highlights: ["Energy Transition", "AI & Machine Learning", "Health Innovation"]
                  },
                  {
                    province: "Atlantic Canada",
                    icon: <MapPin className="w-6 h-6 text-teal-500" />,
                    credit: "15% ACITC",
                    programs: ["Atlantic Innovation Fund", "ACOA Programs", "Ocean Technology"],
                    total: "$650M",
                    color: "teal",
                    slug: "atlantic-canada-innovation-grants",
                    description: "Ocean technology and maritime innovation leadership with federal support",
                    highlights: ["Ocean Technology", "Renewable Energy", "Aerospace"]
                  },
                  {
                    province: "Prairies",
                    icon: <MapPin className="w-6 h-6 text-purple-500" />,
                    credit: "Various",
                    programs: ["Saskatchewan Innovation", "Manitoba Research", "PrairiesCan Funding"],
                    total: "$580M",
                    color: "purple",
                    slug: "prairie-provinces-innovation-grants",
                    description: "Agricultural innovation and resource technology development focus",
                    highlights: ["Agri-Food Innovation", "Mining Tech", "Renewable Energy"]
                  }
                ].map((region, index) => {
                  const colorClasses = {
                    red: "border-red-200 hover:border-red-300",
                    blue: "border-blue-200 hover:border-blue-300",
                    green: "border-green-200 hover:border-green-300",
                    orange: "border-orange-200 hover:border-orange-300",
                    teal: "border-teal-200 hover:border-teal-300",
                    purple: "border-purple-200 hover:border-purple-300"
                  }
                  
                  const buttonColors = {
                    red: "bg-red-600 hover:bg-red-700",
                    blue: "bg-blue-600 hover:bg-blue-700",
                    green: "bg-green-600 hover:bg-green-700",
                    orange: "bg-orange-600 hover:bg-orange-700",
                    teal: "bg-teal-600 hover:bg-teal-700",
                    purple: "bg-purple-600 hover:bg-purple-700"
                  }
                  
                  return (
                    <Card key={index} className={`hover:shadow-lg transition-all ${colorClasses[region.color as keyof typeof colorClasses]}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {region.icon}
                            <CardTitle className="ml-2 text-lg">{region.province}</CardTitle>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {region.credit}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{region.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gray-900 mb-3">{region.total}</div>
                        
                        <div className="space-y-2 mb-4">
                          <h5 className="font-semibold text-sm">Major Programs:</h5>
                          {region.programs.map((program, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                              <span>{program}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <h5 className="font-semibold text-sm">Innovation Highlights:</h5>
                          {region.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-500">
                              <Award className="w-3 h-3 mr-2 text-blue-500" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button 
                            className={`w-full ${buttonColors[region.color as keyof typeof buttonColors]} text-white`} 
                            size="sm" 
                            asChild
                          >
                            <Link href={`/blog/${region.slug}`}>
                              Explore {region.province} Programs
                            </Link>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            size="sm" 
                            asChild
                          >
                            <Link href={`/contact?service=${region.slug}-expert-help`}>
                              Get {region.province} Expert Help
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Success Framework */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                  Success Framework
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Maximizing Your Innovation Funding Success
                </h2>
              </div>

              <div className="space-y-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Strategic Multi-Program Approach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Program Stacking Strategy:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Combine SR&ED with provincial R&D credits (up to 65% total)</li>
                          <li>• Use IRAP for project-specific development funding</li>
                          <li>• Leverage sector-specific programs for specialized support</li>
                          <li>• Access international collaboration opportunities</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Innovation Excellence Criteria:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Technical innovation and advancement</li>
                          <li>• Commercial viability and market potential</li>
                          <li>• Economic impact and job creation</li>
                          <li>• Canadian competitive advantage</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Innovation Application Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Technical Innovation Documentation:</strong> Maintain detailed records of systematic investigation, technical challenges, and experimental development processes
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Commercialization Pathway Planning:</strong> Demonstrate clear route to market with business case, competitive analysis, and implementation strategy
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Partnership and Collaboration:</strong> Build strategic alliances with universities, research institutions, and industry partners
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>IP Strategy and Protection:</strong> Develop comprehensive intellectual property strategy with strong Canadian presence
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Expert Help CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Accelerate Your Innovation with Canada's $4.2B+ Funding Ecosystem
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Innovation funding spans multiple programs, departments, and jurisdictions. Our specialists understand 
                the complex R&D landscape and have secured over $35M in innovation funding with 91% success rate.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Innovation Approach</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our comprehensive innovation funding guide with program-specific strategies and templates.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/canada-innovation-funding">
                      Get Innovation Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Innovation Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with innovation specialists who have secured $35M+ with 91% success rate across SR&ED, IRAP, SIF, and provincial programs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=innovation-grants-expert-help">
                      Get Innovation Expert Help
                    </Link>
                  </Button>
                </div>
              </div>
              
              <p className="text-blue-200 text-sm mt-6">
                91% success rate for innovation applications • Average funding secured: $485K • Multi-program expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
