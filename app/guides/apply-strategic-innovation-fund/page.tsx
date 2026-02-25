import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Lightbulb, Award, TrendingUp, MessageCircle, HelpCircle, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EEATBadge from '@/components/blog/EEATBadge';
import EligibleCheck from '@/components/blog/EligibleCheck';
import StickyTOC from '@/components/blog/StickyTOC';
import InlineCTA from '@/components/blog/InlineCTA';

export const metadata: Metadata = {
  title: "Strategic Innovation Fund Application Guide 2026 | Step-by-Step SIF Funding Process",
  description: "Complete step-by-step guide to applying for Strategic Innovation Fund (SIF) funding. Get SIF application templates, innovation project strategies, and proven application frameworks for $10M+ projects.",
  keywords: "strategic innovation fund application guide, how to apply SIF funding, innovation project grant application Canada, SIF grant application process, transformative project funding, ISED funding, innovation supercluster",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-strategic-innovation-fund",
  },
  openGraph: {
    title: "Strategic Innovation Fund Application Guide 2026 | SIF Funding Process",
    description: "Step-by-step guide with templates and strategies for successful Strategic Innovation Fund applications for Canadian innovation projects.",
    url: "https://www.fsidigital.ca/guides/apply-strategic-innovation-fund",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the minimum funding amount for SIF?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The SIF typically requires a minimum funding request of $10 million, with total project investments of $20 million or more. The program is designed for large-scale, transformative innovation projects."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the SIF application process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The SIF application process typically takes 12-18 months from initial concept to funding approval. This includes 3 months for conceptualization, 3 months for SOI development, 4 months for full application, and 5 months for due diligence."
      }
    },
    {
      "@type": "Question",
      "name": "What are the SIF funding streams?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SIF has four main streams: Stream 1 for R&D and commercialization (TRL 1-9), Stream 2 for business growth and expansion (TRL 8-9), Stream 3 for investment attraction (TRL 2-9), and Stream 4 for collaborative technology development (TRL 1-7)."
      }
    },
    {
      "@type": "Question",
      "name": "What percentage of project costs does SIF cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SIF typically covers up to 50% of eligible project costs through repayable and non-repayable contributions. The exact percentage depends on the project type, stream selected, and demonstrated economic impact."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need co-funding for SIF?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SIF requires significant co-funding, typically 50% or more of the total project cost. This can come from private investment, other government programs, or strategic partnerships. Firm co-funding commitments are required before approval."
      }
    },
    {
      "@type": "Question",
      "name": "Can startups apply for SIF?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While SIF is open to startups, the minimum project size ($20M+) and co-funding requirements make it more suitable for established companies or well-funded growth-stage startups. Smaller companies often pursue IRAP first."
      }
    }
  ]
}

export default function SIFApplicationGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏛️ SIF Funding Application Guide 2026
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Strategic Innovation Fund Application Guide
              </h1>
              
              <div className="text-left mb-6 max-w-4xl mx-auto shadow-sm mt-6 relative z-20">
                 <ShortAnswerBox content="Strategic Innovation Fund Application Guide — How to apply for large-scale innovation funding through Canada." />
              </div>
              <div className="flex justify-center mb-8 relative z-20">
                 <div className="inline-block text-left bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl overflow-hidden">
                    <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-02-25" />
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="#process">
                    View Application Process
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-red-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/strategic-innovation-fund-canada-guide">
                    Back to SIF Overview
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 max-w-4xl my-8"><EligibleCheck /></div>

        <StickyTOC links={[
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ]} />


        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm/50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
              <span className="font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-red-600" />
                Common Questions:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#funding" className="hover:text-red-600 transition-colors">How Much?</Link>
                <Link href="#streams" className="hover:text-red-600 transition-colors">Which Stream?</Link>
                <Link href="#process" className="hover:text-red-600 transition-colors">How Long?</Link>
                <Link href="#eligibility" className="hover:text-red-600 transition-colors">Who Qualifies?</Link>
                <Link href="#faq" className="hover:text-red-600 transition-colors">FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">12-18 Months</div>
                  <div className="text-gray-600">Average Application Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$10M+</div>
                  <div className="text-gray-600">Minimum Funding Request</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">Up to 50%</div>
                  <div className="text-gray-600">Project Cost Coverage</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">No Cost</div>
                  <div className="text-gray-600">Application Fee</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* What is SIF */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is the Strategic Innovation Fund?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  The Strategic Innovation Fund (SIF) is one of Canada's largest innovation funding programs, designed
                  to support large-scale, transformative projects that strengthen the Canadian economy. Administered by
                  Innovation, Science and Economic Development Canada (ISED), SIF provides significant funding for
                  projects that advance technological leadership and drive economic growth.
                </p>

                <div className="bg-red-50 border border-red-100 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Lightbulb className="w-8 h-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-900 mb-2">Why SIF Matters</h4>
                      <p className="text-red-800 leading-relaxed">
                        SIF provides repayable and non-repayable contributions for transformative innovation. Unlike
                        smaller programs, SIF can fund projects in the tens or hundreds of millions, making it ideal
                        for game-changing innovations with significant economic impact potential.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 id="funding" className="text-xl font-bold text-gray-900 mb-4">Funding Amounts by Stream</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Stream 1: R&D</h4>
                      <Badge className="bg-red-100 text-red-800">$10M-$100M+</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Research, development, and commercialization</p>
                  </div>
                  <div className="border border-orange-200 rounded-lg p-4 bg-orange-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Stream 2: Growth</h4>
                      <Badge className="bg-orange-100 text-orange-800">$10M-$250M+</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Business expansion and facility modernization</p>
                  </div>
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Stream 3: Investment</h4>
                      <Badge className="bg-green-100 text-green-800">$10M-$500M+</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Attracting major new investments to Canada</p>
                  </div>
                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Stream 4: Collaborative</h4>
                      <Badge className="bg-blue-100 text-blue-800">$10M-$50M+</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Multi-partner technology development</p>
                  </div>
                </div>
              </div>

              {/* SIF Streams */}
              <div id="streams" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                
        <div className="container mx-auto px-4 max-w-4xl my-12"><InlineCTA {...{
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
    }} /></div>
<h2 className="text-3xl font-bold text-gray-900 mb-6">Which SIF stream is right for my project?</h2>

                <div className="space-y-6">
                  <Card className="border-red-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-red-700 flex items-center">
                          <Lightbulb className="w-5 h-5 mr-2" />
                          Stream 1: R&D and Commercialization
                        </CardTitle>
                        <Badge className="bg-red-100 text-red-800">TRL 1-9</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        For companies developing new technologies from early research through to market launch.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Best For:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Novel technology development</li>
                            <li>• Proof-of-concept to market</li>
                            <li>• IP-intensive projects</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Focus Areas:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• AI and machine learning</li>
                            <li>• Cleantech and energy</li>
                            <li>• Life sciences and biotech</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-orange-700 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Stream 2: Business Growth & Expansion
                        </CardTitle>
                        <Badge className="bg-orange-100 text-orange-800">TRL 8-9</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        For established companies scaling operations, expanding facilities, or modernizing production.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Best For:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Manufacturing scale-up</li>
                            <li>• Facility expansion</li>
                            <li>• Technology modernization</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Requirements:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Proven product/technology</li>
                            <li>• Clear growth trajectory</li>
                            <li>• Job creation commitments</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-green-700 flex items-center">
                          <Building className="w-5 h-5 mr-2" />
                          Stream 3: Investment Attraction
                        </CardTitle>
                        <Badge className="bg-green-100 text-green-800">TRL 2-9</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        For attracting major new investments to Canada or retaining existing global mandates.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Best For:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• New facility establishment</li>
                            <li>• Technology mandate retention</li>
                            <li>• Global HQ decisions</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Often Used By:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Multinationals investing in Canada</li>
                            <li>• Anchor companies in clusters</li>
                            <li>• Foreign direct investment</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Process */}
              <div id="process" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How long does the SIF process take?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  SIF applications are complex and take 12-18 months from concept to approval. The process involves
                  multiple phases with extensive due diligence. Starting early and maintaining momentum is critical.
                </p>

                <div className="relative border-l-2 border-red-100 pl-8 ml-4 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-red-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">1</div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-gray-900">Innovation Project Conceptualization</h4>
                      <Badge className="bg-red-100 text-red-800">Months 1-3</Badge>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Identify the right SIF stream</li>
                      <li>• Verify eligibility requirements</li>
                      <li>• Develop initial project concept</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-orange-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">2</div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-gray-900">Statement of Interest (SOI)</h4>
                      <Badge className="bg-orange-100 text-orange-800">Months 4-6</Badge>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Technical innovation description</li>
                      <li>• Economic impact analysis</li>
                      <li>• Financial framework outline</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-green-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">3</div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-gray-900">Full Application Submission</h4>
                      <Badge className="bg-green-100 text-green-800">Months 7-10</Badge>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Comprehensive technical documentation</li>
                      <li>• Detailed financial projections</li>
                      <li>• Implementation planning</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">4</div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-gray-900">Due Diligence & Approval</h4>
                      <Badge className="bg-blue-100 text-blue-800">Months 11-18</Badge>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• ISED review and evaluation</li>
                      <li>• Contribution agreement negotiation</li>
                      <li>• Final approvals and project launch</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <div id="eligibility" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who qualifies for SIF funding?</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-bold text-green-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Good SIF Candidates
                    </h4>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Projects with $20M+ total investment</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Transformative economic impact</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Strong management teams</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> 50%+ co-funding available</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Significant job creation potential</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-bold text-red-800 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Not Ideal for SIF
                    </h4>
                    <ul className="text-red-700 space-y-2 text-sm">
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Projects under $20M total</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Early startups needing &lt;$1M</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Limited co-funding capacity</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Short timelines (&lt;12 months)</li>
                      <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1" /> Incremental improvements</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-yellow-800 mb-2">💡 Pro Tip: Start with IRAP</h4>
                      <p className="text-yellow-700 text-sm">
                        If your project is smaller than $20M or you're early-stage, consider starting with IRAP
                        (up to $1M). A successful IRAP project can strengthen your SIF application later.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div id="faq" className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-red-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">1. Is SIF funding repayable?</h3>
                    <p className="text-gray-600 text-sm">SIF provides a mix of repayable and non-repayable contributions. The repayable portion typically comes from royalty on revenues or repayment based on project success. The exact terms are negotiated case-by-case.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">2. Can I apply for multiple SIF streams?</h3>
                    <p className="text-gray-600 text-sm">Yes, but each project should target the most appropriate stream. Different phases of a large initiative could potentially apply to different streams, but this requires strategic coordination with ISED.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">3. What is the Net Zero Accelerator?</h3>
                    <p className="text-gray-600 text-sm">The <a href="https://ised-isde.canada.ca/site/strategic-innovation-fund/en/net-zero-accelerator" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:underline">Net Zero Accelerator (NZA)</a> is a special SIF initiative with $8 billion to fund decarbonization projects. If your project reduces GHG emissions significantly, apply through NZA.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">4. What evaluation criteria does SIF use?</h3>
                    <p className="text-gray-600 text-sm">SIF evaluates: Innovation Merit (35%), Economic Impact (40%), and Organizational Capability (25%). Strong applications excel across all three dimensions with quantifiable evidence.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">5. How do I engage ISED early?</h3>
                    <p className="text-gray-600 text-sm">Contact ISED's SIF team with a preliminary project concept before formal application. They can provide guidance on stream selection and eligibility. Regional offices can also provide support.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">6. Can foreign companies apply?</h3>
                    <p className="text-gray-600 text-sm">Yes, but the project must be in Canada with significant Canadian benefits. Foreign companies often apply under Stream 3 (Investment Attraction) when establishing or expanding Canadian operations.</p>
                  </div>
                </div>
              </div>

              {/* Neural Network: Related Guides */}
              <div className="border-t border-gray-200 pt-12 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding Guides</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/guides/irap-innovation-application-guide" className="group block">
                    <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-blue-600 font-semibold mb-2">Federal R&D</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">IRAP Application Guide</h4>
                      <p className="text-sm text-gray-500">Start smaller with IRAP before scaling to SIF.</p>
                    </div>
                  </Link>
                  <Link href="/guides/sred-application-guide" className="group block">
                    <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-green-600 font-semibold mb-2">Tax Credits</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">SR&ED Application Guide</h4>
                      <p className="text-sm text-gray-500">Stack R&D tax credits with SIF funding.</p>
                    </div>
                  </Link>
                  <Link href="/guides/apply-csbfp-government-financing" className="group block">
                    <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-purple-600 font-semibold mb-2">Financing</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">CSBFP Loans Guide</h4>
                      <p className="text-sm text-gray-500">Combine asset financing with SIF funding.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Official SIF Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <h5 className="font-semibold">ISED SIF Portal</h5>
                        <p className="text-sm text-gray-600">Official program information</p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href="https://ised-isde.canada.ca/site/strategic-innovation-fund/en" target="_blank" rel="noopener noreferrer">
                          Visit <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <h5 className="font-semibold">Apply for SIF</h5>
                        <p className="text-sm text-gray-600">Submit your application</p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href="https://ised-isde.canada.ca/site/strategic-innovation-fund/en/how-apply" target="_blank" rel="noopener noreferrer">
                          Visit <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <h5 className="font-semibold">SIF Funded Projects</h5>
                        <p className="text-sm text-gray-600">Examples of approved projects</p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href="https://ised-isde.canada.ca/site/strategic-innovation-fund/en/projects-funded" target="_blank" rel="noopener noreferrer">
                          Visit <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <h5 className="font-semibold">Innovation Superclusters</h5>
                        <p className="text-sm text-gray-600">Complementary programs</p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href="https://ised-isde.canada.ca/site/global-innovation-clusters/en" target="_blank" rel="noopener noreferrer">
                          Visit <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-red-700 to-red-900 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help with Your SIF Application?</h3>
                <p className="text-red-100 mb-6 max-w-xl mx-auto">
                  SIF applications are complex and highly competitive. Our specialists have secured over $180M in SIF
                  approvals and can guide you through every phase of the process.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-red-800 hover:bg-red-50 font-semibold" asChild>
                    <Link href="/contact?service=strategic-innovation-fund-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                    <Link href="/grant-finder">
                      Browse All Programs
                    </Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
