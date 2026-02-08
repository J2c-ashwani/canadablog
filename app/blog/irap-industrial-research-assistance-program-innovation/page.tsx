import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Send, Lightbulb, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IRAP Industrial Research Assistance Program 2026 | Up to $500K Innovation Funding for SMEs",
  description: "Complete guide to IRAP innovation funding from National Research Council Canada. Get 60-80% R&D funding up to $500K with dedicated Industrial Technology Advisors for SMEs.",
  keywords: "IRAP funding, Industrial Research Assistance Program, NRC IRAP innovation, R&D grants Canada, SME innovation funding, Industrial Technology Advisors",
  openGraph: {
    title: "IRAP Industrial Research Assistance Program 2026 | Up to $500K Innovation Funding",
    description: "Complete guide to IRAP innovation funding with 60-80% R&D support, dedicated advisors, and up to $500K for Canadian SMEs under 500 employees.",
    url: "https://www.fsidigital.ca/blog/irap-industrial-research-assistance-program-innovation",
    images: ["/og-image.png"],
  },
}

export default function IRAPInnovationFundingGuidePage() {
  const faqData = [
    {
      question: "Does software development qualify for innovation funding?",
      answer: "Yes, software projects are highly successful in IRAP, provided they solve a 'technical uncertainty.' Building a standard website or CRUD app usually fails; developing new algorithms, AI models, or complex backend architectures usually succeeds."
    },
    {
      question: "What exactly is 'Technical Uncertainty'?",
      answer: "It means you don't know *if* the solution is possible or *how* to achieve it when you start. If you can hire a standard contractor to build it without risk of failure, it likely lacks technical uncertainty."
    },
    {
      question: "Can I use IRAP to hire a contractor?",
      answer: "Yes. While IRAP prefers funding internal payroll (80%), it can cover up to 50% of North American contractor costs if that expertise is not available internally."
    },
    {
      question: "Do I need a patent to apply?",
      answer: "No. You do not need a patent. However, you must demonstrate a strategy for protecting your Intellectual Property (IP), which could include trade secrets, copyright, or future patents."
    },
    {
      question: "Is there an age limit for the Youth Employment program?",
      answer: "Yes. The candidate must be between 15 and 30 years old (inclusive) at the start of the internship and must be a graduate of a post-secondary institution."
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
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🔬 IRAP Innovation Funding 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Industrial Research Assistance Program (IRAP)
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Canada's premier R&D innovation funding program providing 60-80% non-repayable contributions up to $500K
                for SME innovation projects, plus dedicated Industrial Technology Advisor support from the National Research Council.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="#eligibility">
                    Check IRAP Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/irap-innovation-application-guide">
                    Get Free IRAP Innovation Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Program Updates */}
        <section className="py-8 bg-green-50 border-b-2 border-green-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-green-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">🚀 What are the IRAP 2026 Innovation Program Enhancements?</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>Increased Innovation Budget:</strong> $400M annual budget (2024-25) with $100M/year commitment through 2026
                        </div>
                        <div>
                          <strong>Enhanced Advisory Support:</strong> Strengthened Industrial Technology Advisor network nationwide
                        </div>
                        <div>
                          <strong>Youth Employment Expansion:</strong> Up to $30K per graduate placement for innovation projects
                        </div>
                        <div>
                          <strong>Global Innovation Partnerships:</strong> Enhanced international collaboration opportunities
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* IRAP Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why is IRAP Canada's Leading SME Innovation Program?</h2>
                <p className="text-lg text-gray-600">
                  IRAP combines generous non-repayable funding with dedicated advisory support to help Canadian SMEs
                  develop and commercialize innovative technologies with strong market potential.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$500K</div>
                  <div className="text-gray-600">Maximum Innovation Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">80%</div>
                  <div className="text-gray-600">Maximum Funding Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">500</div>
                  <div className="text-gray-600">Max Employee Eligibility</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">24</div>
                  <div className="text-gray-600">Months Project Duration</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IRAP Funding Streams */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What are the IRAP Innovation Funding Streams & Programs?</h2>

              <div className="space-y-8">
                {/* R&D Project Funding */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">R&D Innovation Project Funding</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Small Technology Innovation Projects (ARP)</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold">Funding Amount:</span>
                            <span className="text-blue-700 font-bold">Up to $50K</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Accelerated review process</p>
                            <p>• Quick approval for smaller R&D projects</p>
                            <p>• Ideal for proof-of-concept development</p>
                            <p>• Commercialization preparation activities</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Mid-sized Technology Innovation</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Funding Amount:</span>
                            <span className="text-green-700 font-bold">Up to $500K</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• Comprehensive R&D project support</p>
                            <p>• Product development and innovation</p>
                            <p>• Process improvement initiatives</p>
                            <p>• Technology commercialization</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 R&D Funding Coverage:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Salaries & Benefits:</strong> Up to 80% of costs</li>
                            <li>• <strong>Contractor Services:</strong> Up to 50% of costs</li>
                            <li>• <strong>Materials & Supplies:</strong> Case-by-case basis</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• <strong>Equipment:</strong> Limited coverage available</li>
                            <li>• <strong>Overhead:</strong> Not typically covered</li>
                            <li>• <strong>Travel:</strong> Project-related travel considered</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Youth Employment Program */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Youth Employment Strategy Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">Graduate Placement Support</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Support Amount:</span>
                            <span className="text-purple-700 font-bold">Up to $30K per Graduate</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Wage subsidies for hiring recent graduates (ages 15-30) to work on innovation projects for 12-month placements.</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-gray-800">Eligibility Requirements</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Graduate Requirements:</strong> Recent post-secondary graduates aged 15-30</p>
                          <p><strong>Work Period:</strong> 12-month work placement minimum</p>
                          <p><strong>Project Focus:</strong> Must work on innovation/R&D activities</p>
                          <p><strong>Maximum:</strong> Up to 2 candidates per company</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Requirements */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What are the IRAP Innovation Eligibility Requirements?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Company Eligibility */}
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Company Eligibility Criteria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">✅ Essential Requirements</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Canadian incorporated for-profit business</li>
                          <li>• Fewer than 500 employees worldwide</li>
                          <li>• Financially stable with adequate cash flow</li>
                          <li>• Demonstrated innovation capacity</li>
                          <li>• Strong potential for commercial growth</li>
                          <li>• Commitment to R&D and innovation</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">🎯 Business Characteristics</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Technology-based or innovation-focused</li>
                          <li>• Established business operations (not startups)</li>
                          <li>• Clear competitive advantages</li>
                          <li>• Export potential or national market focus</li>
                          <li>• Management commitment to innovation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Eligibility */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Innovation Project Eligibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">✅ Eligible Project Types</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Technology development with technical uncertainty</li>
                          <li>• New product or service development</li>
                          <li>• Significant process improvements</li>
                          <li>• Technology adaptation and enhancement</li>
                          <li>• Prototype development and testing</li>
                          <li>• Pre-commercial technology validation</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-purple-700 mb-2">🚫 Non-Eligible Activities</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Routine engineering or quality control</li>
                          <li>• Market research and business planning</li>
                          <li>• Commercial production activities</li>
                          <li>• General business operations</li>
                          <li>• Activities without technical risk</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Industrial Technology Advisors */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Who are Industrial Technology Advisors (ITAs)?</h2>

              <div className="space-y-6">
                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Dedicated Innovation Advisory Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-orange-800">ITA Services & Support</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Technical and business advisory services</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Innovation project planning and milestone development</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Market and commercialization guidance</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Network connections and partnerships</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Risk assessment and mitigation strategies</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">ITA Value & Impact</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Advisory Value:</strong> Equivalent to ~1.2% additional R&D subsidy</p>
                          <p><strong>Local Presence:</strong> ITAs located in communities across Canada</p>
                          <p><strong>Industry Expertise:</strong> Specialized knowledge across all sectors</p>
                          <p><strong>Ongoing Support:</strong> Throughout project lifecycle and beyond</p>
                          <p><strong>Network Access:</strong> Connections to researchers, partners, customers</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-green-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold text-green-800 mb-2">Combined Innovation Funding Impact</h4>
                        <p className="text-green-700 mb-2">
                          IRAP innovation funding complements SR&ED tax credits for maximum R&D support:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-green-700">
                          <div>
                            <strong>IRAP Contribution:</strong> 37% average project costs
                          </div>
                          <div>
                            <strong>SR&ED Tax Credits:</strong> 35%+ federal + provincial
                          </div>
                          <div>
                            <strong>Combined Support:</strong> Up to 65% total R&D subsidy
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What is the IRAP Innovation Application Process?</h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Initial Contact",
                      description: "Connect with local Industrial Technology Advisor",
                      icon: <Building className="w-6 h-6" />,
                      color: "blue"
                    },
                    {
                      step: "2",
                      title: "Project Assessment",
                      description: "ITA evaluates innovation project feasibility and eligibility",
                      icon: <Users className="w-6 h-6" />,
                      color: "green"
                    },
                    {
                      step: "3",
                      title: "Application Submission",
                      description: "Submit detailed project proposal with ITA support",
                      icon: <Send className="w-6 h-6" />,
                      color: "purple"
                    },
                    {
                      step: "4",
                      title: "Review & Approval",
                      description: "IRAP review process and funding decision",
                      icon: <Clock className="w-6 h-6" />,
                      color: "orange"
                    }
                  ].map((item, index) => {
                    const colors = {
                      blue: "bg-blue-500 text-white",
                      green: "bg-green-500 text-white",
                      purple: "bg-purple-500 text-white",
                      orange: "bg-orange-500 text-white"
                    }

                    return (
                      <Card key={index} className="text-center">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-full ${colors[item.color as keyof typeof colors]} flex items-center justify-center mx-auto mb-3`}>
                            {item.icon}
                          </div>
                          <CardTitle className="text-lg">Step {item.step}: {item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold text-blue-800 mb-2">📅 IRAP Innovation Application Timeline & Process</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Open Intake:</strong> No specific deadlines - rolling applications</li>
                              <li>• <strong>Initial Review:</strong> 2-4 weeks ITA assessment</li>
                              <li>• <strong>Application Development:</strong> 4-8 weeks with ITA support</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>IRAP Review:</strong> 8-12 weeks for decision</li>
                              <li>• <strong>Project Duration:</strong> 12-24 months typical</li>
                              <li>• <strong>Reporting:</strong> Quarterly progress reports required</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How Can You Ensure IRAP Innovation Application Success?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices for IRAP Innovation Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Early ITA Engagement:</strong> Connect with your local ITA before developing formal application
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Clear Technical Innovation:</strong> Demonstrate genuine technical uncertainty and advancement
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Strong Commercial Potential:</strong> Show clear path to market with realistic timelines
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Qualified Team:</strong> Demonstrate technical and business capabilities
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common IRAP Innovation Application Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Insufficient Technical Content:</strong> Weak description of innovation and technical challenges
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Poor Market Analysis:</strong> Inadequate commercialization planning and market research
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Unrealistic Projections:</strong> Overly optimistic timelines or budget estimates
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Limited ITA Engagement:</strong> Not leveraging ITA expertise and guidance effectively
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Innovation Funding FAQs</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                  <HelpCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Questions About IRAP Innovation Funding</h2>
              <div className="space-y-4">
                <a href="#eligibility" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-blue-700">Who is eligible for IRAP innovation funding?</span>
                </a>
                <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-blue-700">What is an Industrial Technology Advisor (ITA)?</span>
                </a>
                <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-blue-700">Can IRAP be stacked with SR&ED tax credits?</span>
                </a>
                <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-blue-700">What is the Youth Employment Strategy program?</span>
                </a>
                <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-blue-700">How long does the IRAP application process take?</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related R&D Funding Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/irap-industrial-research-assistance-program" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">IRAP Complete Guide</h3>
                  <p className="text-gray-600 text-sm">The comprehensive guide to NRC-IRAP funding</p>
                </Link>
                <Link href="/blog/sred-scientific-research-experimental-development" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">SR&ED Tax Credits</h3>
                  <p className="text-gray-600 text-sm">Up to 65% refundable R&D tax credits</p>
                </Link>
                <Link href="/blog/ideation-research-funding-canada" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">Ideation & Research Funding</h3>
                  <p className="text-gray-600 text-sm">Early-stage R&D grants for Canadian startups</p>
                </Link>
                <Link href="/blog/ai-machine-learning-grants" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">AI & Machine Learning Grants</h3>
                  <p className="text-gray-600 text-sm">Innovation funding for AI/ML technology development</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access IRAP's $500K Innovation Funding?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get our complete IRAP innovation application guide or work with our R&D funding specialists who understand
                the IRAP process and can help you connect with the right Industrial Technology Advisor.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free IRAP Innovation Guide</h4>
                  <p className="text-blue-100 text-sm mb-4">
                    Get our comprehensive IRAP innovation application guide with project planning templates, eligibility checklist, and ITA contact directory.
                  </p>
                  <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/download/irap-innovation-application-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get IRAP Innovation Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert IRAP Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with R&D funding specialists who can help optimize your IRAP innovation application and connect you with the right ITA in your region.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/download/irap-innovation-application-guide?service=irap-innovation-expert-help">
                      Get IRAP Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-blue-200 text-sm mt-6">
                Expert guidance • ITA network connections • Application optimization • Innovation success rate improvement
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
