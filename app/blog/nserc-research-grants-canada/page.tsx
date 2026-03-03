import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Lightbulb, Users, Globe, BookOpen, GraduationCap, Microscope, Award, ArrowRight, HelpCircle, FileText, AlertCircle, Building, Shield, Clock, Send, Download } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NSERC Research Grants Canada 2026 | Natural Sciences & Engineering Funding Guide",
  description: "Complete guide to NSERC research grants including Idea to Innovation (I2I) grants up to $350K. University-industry partnerships and technology transfer funding.",
  keywords: "NSERC grants, Idea to Innovation grants, NSERC I2I, university research funding Canada, technology transfer grants, NSERC 2026",
  openGraph: {
    title: "NSERC Research Grants Canada 2026 | Natural Sciences & Engineering Funding",
    description: "Complete guide to NSERC research funding with Idea to Innovation grants, university-industry partnerships, and technology commercialization support.",
    url: "https://www.fsidigital.ca/blog/nserc-research-grants-canada",
    images: ["/og-image.png"],
  },
}

export default function NSERCResearchGrantsGuidePage() {
  const faqData = [
    {
      question: "Who owns the Intellectual Property (IP) in NSERC projects?",
      answer: "Typically, the university researchers own the IP, unless a specific agreement states otherwise. Industry partners often negotiate an exclusive license to use the IP in exchange for their cash/in-kind contribution."
    },
    {
      question: "Do I qualify if I don't have a university partner?",
      answer: "No. NSERC grants are primarily for academic researchers or partnerships between academia and industry. If you are a company wanting to do internal R&D without a university, look at IRAP instead."
    },
    {
      question: "Can NSERC funds be used to pay my company's staff?",
      answer: "Generally, no. NSERC funds pay for the university students, professors, and lab equipment. Your company's 'contribution' covers your own internal costs. The benefit to you is the research output, not cash for payroll."
    },
    {
      question: "What is the success rate for Alliance Grants?",
      answer: "Alliance grants have a relatively high success rate (often >50%) compared to discovery grants, provided the industry partner has 'skin in the game' (cash contribution) and the research goals are clear."
    },
    {
      question: "Can I use NSERC for software development?",
      answer: "Yes, if there is a research component (e.g., developing new algorithms or AI models). Standard software engineering (building an app) is not eligible."
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
        <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🔬 NSERC Research Grants 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Natural Sciences & Engineering Research Council (NSERC)
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Comprehensive research funding supporting university-industry partnerships, technology transfer, and collaborative R&D initiatives.
                From Idea to Innovation grants up to $350K to large-scale research partnerships driving Canadian innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100" asChild>
                  <Link href="#programs">
                    Explore NSERC Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/download/nserc-research-grants-guide">
                    Get Free NSERC Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Updates */}
        <section className="py-8 bg-yellow-50 border-b-2 border-yellow-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-yellow-800 mb-2">⚠️ Important NSERC Program Updates (2026)</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
                        <div>
                          <strong>I2I Pause Notice:</strong> Market Assessment and Phase Ib applications paused as of Feb 14, 2026 for program review
                        </div>
                        <div>
                          <strong>Active Programs:</strong> Phase I, IIa, and IIb applications continue with quarterly deadlines
                        </div>
                        <div>
                          <strong>Enhanced Funding:</strong> Phase IIb increased to maximum $350K over 24 months
                        </div>
                        <div>
                          <strong>Partnership Focus:</strong> Stronger emphasis on university-industry collaboration
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* NSERC Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada's Premier Research Funding Agency</h2>
                <p className="text-lg text-gray-600">
                  NSERC supports university researchers and students in the natural sciences and engineering, fostering innovation
                  through discovery research, strategic partnerships, and technology transfer to Canadian industry.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$1.3B</div>
                  <div className="text-gray-600">Annual Research Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$350K</div>
                  <div className="text-gray-600">Max I2I Grant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">30K+</div>
                  <div className="text-gray-600">Students & Researchers Supported</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">2,000+</div>
                  <div className="text-gray-600">Industry Partnerships</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NSERC Funding Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">NSERC Funding Programs</h2>

              <div className="space-y-8">
                {/* Idea to Innovation (I2I) Grants */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Lightbulb className="w-6 h-6 text-indigo-600 mr-3" />
                      <CardTitle className="text-indigo-700">Idea to Innovation (I2I) Grants</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-indigo-800">Phase I: Reduction-to-Practice</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg">
                            <span className="font-semibold">Funding Amount:</span>
                            <span className="text-indigo-700 font-bold">Up to $125K</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• <strong>Duration:</strong> Up to 12 months</p>
                            <p>• <strong>Coverage:</strong> 100% of direct research costs</p>
                            <p>• <strong>Focus:</strong> Proof-of-concept validation</p>
                            <p>• <strong>Renewable:</strong> Non-renewable</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">Phase IIa: Early-Stage Investment</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Funding Amount:</span>
                            <span className="text-green-700 font-bold">Up to $125K/year</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• <strong>Duration:</strong> 6-18 months</p>
                            <p>• <strong>NSERC Coverage:</strong> 67% of costs</p>
                            <p>• <strong>Partner Contribution:</strong> 33% (cash)</p>
                            <p>• <strong>Focus:</strong> Technology enhancement</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-purple-800">Phase IIb: Company Partnership</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                            <span className="font-semibold">Funding Amount:</span>
                            <span className="text-purple-700 font-bold">Up to $350K</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• <strong>Duration:</strong> Up to 24 months</p>
                            <p>• <strong>NSERC Coverage:</strong> 50% of costs</p>
                            <p>• <strong>Partner Contribution:</strong> 50% (40% cash min)</p>
                            <p>• <strong>Focus:</strong> Commercialization readiness</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h5 className="font-semibold mb-2">⚠️ Current Status (2026):</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Active Programs:</strong> Phase I, IIa, and IIb applications accepted</p>
                          <p><strong>Application Deadlines:</strong> Quarterly - Jan 8, Mar 31, Jun 20, Sep 22</p>
                        </div>
                        <div>
                          <p><strong>Paused Programs:</strong> Market Assessment and Phase Ib (until further notice)</p>
                          <p><strong>Reason:</strong> Program review and process optimization</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Collaborative Research and Development */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Building className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Collaborative Research and Development (CRD)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-green-800">CRD Grants</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold">Funding Range:</span>
                            <span className="text-green-700 font-bold">$20K - $500K/year</span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p>• University-industry research partnerships</p>
                            <p>• Matching funding required from partners</p>
                            <p>• Duration: Up to 5 years</p>
                            <p>• Focus on applied research challenges</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-3 text-blue-800">Industrial Research Chairs</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p><strong>Funding:</strong> Up to $500K/year for 5 years</p>
                          <p><strong>Purpose:</strong> Long-term industry-university research partnerships</p>
                          <p><strong>Requirements:</strong> Minimum 1:1 industry matching</p>
                          <p><strong>Benefit:</strong> Dedicated research program leadership</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Strategic Partnership Grants */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Target className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Strategic Partnership Grants</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold text-blue-700 mb-2">Networks</h5>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>• Large-scale research networks</p>
                          <p>• Multi-institutional collaboration</p>
                          <p>• Up to $2.5M/year</p>
                          <p>• 5-7 year terms</p>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-700 mb-2">Centres</h5>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>• Research excellence centres</p>
                          <p>• Strategic priority areas</p>
                          <p>• Significant infrastructure</p>
                          <p>• Long-term commitments</p>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-700 mb-2">Initiatives</h5>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>• Targeted research themes</p>
                          <p>• National priorities</p>
                          <p>• Cross-sectoral partnerships</p>
                          <p>• Innovation ecosystems</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility & Requirements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">NSERC Eligibility & Requirements</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Researcher Eligibility */}
                <Card className="border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700">Researcher Eligibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-indigo-700 mb-2">✅ Faculty Requirements</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Canadian citizen or permanent resident</li>
                          <li>• Faculty appointment at eligible institution</li>
                          <li>• PhD or equivalent in eligible field</li>
                          <li>• Active research program in NSERC areas</li>
                          <li>• Demonstrated research excellence</li>
                          <li>• Strong publication and funding record</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">🎯 Research Areas</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Engineering and applied sciences</li>
                          <li>• Physical sciences and mathematics</li>
                          <li>• Life sciences and biotechnology</li>
                          <li>• Computer science and IT</li>
                          <li>• Environmental sciences</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Institution & Partner Requirements */}
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Institution & Partner Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">✅ Eligible Institutions</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Canadian universities and colleges</li>
                          <li>• NSERC-approved research institutions</li>
                          <li>• Provincial research organizations</li>
                          <li>• Federal research facilities</li>
                          <li>• Affiliated hospitals and institutes</li>
                          <li>• International collaborations (limited)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">🏢 Industry Partners</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Canadian companies (for-profit)</li>
                          <li>• Technology transfer organizations</li>
                          <li>• Government agencies and departments</li>
                          <li>• Not-for-profit research organizations</li>
                          <li>• International companies with Canadian operations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">NSERC Application Process</h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Eligibility Check",
                      description: "Confirm researcher and institution eligibility requirements",
                      icon: <Shield className="w-6 h-6" />,
                      color: "indigo"
                    },
                    {
                      step: "2",
                      title: "Partner Engagement",
                      description: "Identify and secure industry or institutional partners",
                      icon: <Building className="w-6 h-6" />,
                      color: "green"
                    },
                    {
                      step: "3",
                      title: "Proposal Development",
                      description: "Develop comprehensive research proposal and budget",
                      icon: <FileText className="w-6 h-6" />,
                      color: "blue"
                    },
                    {
                      step: "4",
                      title: "Submission & Review",
                      description: "Submit application and undergo peer review process",
                      icon: <Send className="w-6 h-6" />,
                      color: "purple"
                    }
                  ].map((item, index) => {
                    const colors = {
                      indigo: "bg-indigo-500 text-white",
                      green: "bg-green-500 text-white",
                      blue: "bg-blue-500 text-white",
                      purple: "bg-purple-500 text-white"
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

                <Card className="border-indigo-200 bg-indigo-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <Clock className="w-6 h-6 text-indigo-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold text-indigo-800 mb-2">📅 NSERC Application Timelines</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-700">
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>I2I Deadlines:</strong> Quarterly (Jan 8, Mar 31, Jun 20, Sep 22)</li>
                              <li>• <strong>CRD Applications:</strong> Continuous intake</li>
                              <li>• <strong>Review Period:</strong> 4-6 months typical</li>
                            </ul>
                          </div>
                          <div>
                            <ul className="space-y-1">
                              <li>• <strong>Strategic Programs:</strong> Annual competitions</li>
                              <li>• <strong>Funding Start:</strong> April 1st (most programs)</li>
                              <li>• <strong>Reporting:</strong> Annual progress reports required</li>
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">NSERC Application Success Strategies</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ Best Practices for Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Strong Research Excellence:</strong> Demonstrate clear research leadership and innovation potential
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Industry Relevance:</strong> Show clear commercial potential and technology transfer pathway
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Partner Commitment:</strong> Secure meaningful financial and in-kind contributions
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Student Training:</strong> Emphasize HQP development and knowledge mobilization
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">❌ Common Application Pitfalls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Weak Partner Engagement:</strong> Insufficient industry commitment or unrealistic partnerships
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Poor Commercialization Plan:</strong> Vague or unrealistic technology transfer strategy
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Limited Research Impact:</strong> Unclear benefits to Canadian innovation ecosystem
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                        <div>
                          <strong>Inadequate Budget Justification:</strong> Poor alignment of resources with objectives
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">NSERC Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <span className="font-medium text-indigo-700">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access NSERC Research Funding?
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Get our complete NSERC application guide or work with our research funding specialists who understand
                university-industry partnerships and have helped secure millions in NSERC grants.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Free NSERC Research Guide</h4>
                  <p className="text-indigo-100 text-sm mb-4">
                    Get our comprehensive NSERC application guide with I2I templates, partner engagement strategies, and successful proposal examples.
                  </p>
                  <Button size="lg" className="w-full bg-white text-indigo-700 hover:bg-gray-100" asChild>
                    <Link href="/download/nserc-research-grants-guide">
                      <Download className="w-4 h-4 mr-2" />
                      Get NSERC Guide
                    </Link>
                  </Button>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert NSERC Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with research funding specialists who can help develop winning NSERC proposals and identify the right industry partnerships.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/download/nserc-research-grants-guide?service=nserc-expert-help">
                      Get NSERC Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-indigo-200 text-sm mt-6">
                Expert guidance • University connections • Industry partnerships • Successful track record
              </p>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Innovation & Research Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-left">
                    <h4 className="font-bold text-lg mb-2 flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      IRAP Innovation Funding
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Complete guide to the Industrial Research Assistance Program (IRAP) for Canadian SMEs.
                    </p>
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50" asChild>
                      <Link href="/blog/irap-industrial-research-assistance-program-government-grants">Read Guide</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-left">
                    <h4 className="font-bold text-lg mb-2 flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      Canada Innovation Grants
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Overview of major R&D and innovation funding programs available across Canada.
                    </p>
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50" asChild>
                      <Link href="/blog/canada-innovation-research-development-grants-guide">Read Guide</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
