import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle,
  Lightbulb, Target, DollarSign, AlertTriangle, HelpCircle, ArrowRight
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBIR Research Grants 2026: Application Guide & Requirements",
  description: "Complete guide to applying for SBIR Phase I & II grants. Learn eligibility, deadlines, and how to secure up to $1.7M in federal R&D funding without equity loss.",
  keywords: "SBIR grants, Phase I application, Phase II funding, R&D tax credits, small business innovation research, federal startup grants",
  openGraph: {
    title: "SBIR Grants 2026: The Complete Application Guide",
    description: "Secure $1.7M+ in non-dilutive R&D funding. Step-by-step guide for Phase I & II applications.",
    url: "https://www.fsidigital.ca/guides/sbir-research-grants-guide",
  },
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/sbir-research-grants-guide",
  },
}

export default function SBIRResearchGrantsGuide() {
  // FAQ Schema for Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between SBIR Phase I and Phase II?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Phase I is for 'Proof of Concept' funding ($50K-$250K) covering 6-12 months. Phase II is for 'Prototype Development' ($750K-$1.7M) covering 24 months and is only available to Phase I awardees."
        }
      },
      {
        "@type": "Question",
        "name": "Do I have to pay back SBIR grants?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SBIR grants are non-dilutive funding. You do not repay the money, and the government takes 0% equity in your company."
        }
      },
      {
        "@type": "Question",
        "name": "Can I apply for SBIR if I am a solo founder?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, but the Principal Investigator (PI) must be primarily employed by the small business (51% of their time) at the time of award. You can hire others as contractors."
        }
      },
      {
        "@type": "Question",
        "name": "What is the success rate for SBIR applications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average success rate for Phase I is approximately 15-17%. For Phase II, it rises to about 45-50% since the applicant pool is pre-screened."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to get SBIR funding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The process is slow. It typically takes 6-9 months from submission to receiving the first check. Plan your runway accordingly."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-500/20 text-blue-200 border-blue-400/30 hover:bg-blue-500/30 px-4 py-1.5 text-sm backdrop-blur-sm">
                ⚡ 2026 Federal R&D Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                SBIR Research Grants: <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">
                  Get Up to $1.7M Funding
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                No equity loss. No repayment. The complete guide to securing Phase I & II funding for your technology startup.
              </p>
            </div>
          </div>
        </section>

        {/* 1. QUERY HOOK: Common Questions */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
              Common Questions About SBIR Grants
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="#eligibility" className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100 group">
                <span className="font-semibold text-gray-800 group-hover:text-blue-700 block mb-1">Am I eligible for SBIR?</span>
                <span className="text-sm text-gray-500 flex items-center">Check criteria <ArrowRight className="w-3 h-3 ml-1" /></span>
              </Link>
              <Link href="#phase1" className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100 group">
                <span className="font-semibold text-gray-800 group-hover:text-blue-700 block mb-1">What does Phase I cover?</span>
                <span className="text-sm text-gray-500 flex items-center">See funding limits <ArrowRight className="w-3 h-3 ml-1" /></span>
              </Link>
              <Link href="#success-rate" className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100 group">
                <span className="font-semibold text-gray-800 group-hover:text-blue-700 block mb-1">Is it hard to get approved?</span>
                <span className="text-sm text-gray-500 flex items-center">View acceptance rates <ArrowRight className="w-3 h-3 ml-1" /></span>
              </Link>
              <Link href="#timeline" className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100 group">
                <span className="font-semibold text-gray-800 group-hover:text-blue-700 block mb-1">How long does it take?</span>
                <span className="text-sm text-gray-500 flex items-center">See 12-month timeline <ArrowRight className="w-3 h-3 ml-1" /></span>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Overview Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-700 mb-2">$1.7M+</div>
                  <div className="text-sm font-medium text-gray-600">Max Non-Dilutive Funding</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-700 mb-2">0%</div>
                  <div className="text-sm font-medium text-gray-600">Equity Taken by Govt</div>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-700 mb-2">15%</div>
                  <div className="text-sm font-medium text-gray-600">Phase I Success Rate</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <div className="text-3xl font-bold text-orange-700 mb-2">12</div>
                  <div className="text-sm font-medium text-gray-600">Participating Agencies</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* 2. STRUCTURE SCAN: Question-based Headings */}
              <div id="eligibility" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How does the SBIR Application Process work?</h2>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <div className="flex items-start">
                    <Lightbulb className="w-8 h-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Why apply for SBIR?</h4>
                      <p className="text-blue-800 leading-relaxed">
                        SBIR (Small Business Innovation Research) is often called "America's Seed Fund." It provides
                        <strong> risk-free capital</strong> to validate technology concepts. Unlike VC money, you don't lose ownership,
                        and you keep your Intellectual Property (IP) rights.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
                  <div className="space-y-12">
                    {/* Step 1 */}
                    <div className="relative md:pl-24">
                      <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 bg-white border-4 border-blue-500 rounded-full items-center justify-center z-10">
                        <span className="text-blue-600 font-bold text-xl">1</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Select Your Agency & Topic</h3>
                      <p className="text-gray-600 mb-4">
                        Don't just "apply for SBIR." You must apply to a specific agency (like <Link href="/usa/technology-startup-grants" className="text-blue-600 hover:underline">Department of Defense</Link> or NIH)
                        and a specific "solicitation topic" that matches your tech.
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative md:pl-24">
                      <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 bg-white border-4 border-blue-500 rounded-full items-center justify-center z-10">
                        <span className="text-blue-600 font-bold text-xl">2</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Registration (Don't Skip This!)</h3>
                      <p className="text-gray-600 mb-4">
                        Before writing a word, register on <strong>SAM.gov</strong>, <strong>SBIR.gov</strong>, and the agency's specific portal.
                        <span className="text-red-600 font-medium"> Warning: SAM.gov can take 4 weeks. Do this first.</span>
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative md:pl-24">
                      <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 bg-white border-4 border-blue-500 rounded-full items-center justify-center z-10">
                        <span className="text-blue-600 font-bold text-xl">3</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Submit Phase I Proposal</h3>
                      <p className="text-gray-600 mb-4">
                        Write a 15-25 page technical proposal proving the "technical merit" and "commercial potential" of your idea.
                        Aim for $50k-$250k funding.
                      </p>
                    </div>

                    {/* Step 4 */}
                    <div className="relative md:pl-24">
                      <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 bg-white border-4 border-blue-500 rounded-full items-center justify-center z-10">
                        <span className="text-blue-600 font-bold text-xl">4</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Execute & Apply Phase II</h3>
                      <p className="text-gray-600 mb-4">
                        If you win Phase I, you have 6-9 months to prove the concept works. Then, you compete for the big prize:
                        <strong> Phase II ($1.5M+)</strong> to build the prototype.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase I Detail */}
              <div id="phase1" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What does Phase I cover?</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Phase I is purely about <strong>feasibility</strong>. The government is paying you to answer the question: "Can this technology actually be built?"
                </p>

                <Card className="border-green-200 bg-green-50/50 mb-8">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Phase I Snapshot
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <div>
                          <span className="block text-xs text-gray-500 uppercase">Award Size</span>
                          <span className="font-bold text-gray-900">$50K - $250K</span>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <div>
                          <span className="block text-xs text-gray-500 uppercase">Duration</span>
                          <span className="font-bold text-gray-900">6 - 12 Months</span>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <div>
                          <span className="block text-xs text-gray-500 uppercase">Goal</span>
                          <span className="font-bold text-gray-900">Proof of Concept</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Required Proposal Sections</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Technical Objectives:</strong> What exact problem are you solving?</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Work Plan:</strong> Detailed timeline of R&D tasks.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Related Work:</strong> Prove you know the current state of the art.</span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Team Bios:</strong> Why is your team the best in the world to do this?</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Facilities:</strong> Do you have access to the necessary lab equipment?</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Phase II Detail */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How do I get Phase II funding?</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Phase II is where the real money is. It funds the <strong>development of the prototype</strong>.
                  <span className="italic text-gray-500"> Note: You usually cannot apply for Phase II unless you won Phase I.</span>
                </p>

                <Card className="border-purple-200 bg-purple-50/50 mb-6">
                  <CardHeader>
                    <CardTitle className="text-purple-800 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Phase II Snapshot
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <div>
                          <span className="block text-xs text-gray-500 uppercase">Award Size</span>
                          <span className="font-bold text-gray-900">$750K - $1.7M</span>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <div>
                          <span className="block text-xs text-gray-500 uppercase">Duration</span>
                          <span className="font-bold text-gray-900">24 Months</span>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <Users className="w-5 h-5 text-purple-600 mr-2" />
                        <div>
                          <span className="block text-xs text-gray-500 uppercase">Focus</span>
                          <span className="font-bold text-gray-900">Commercialization</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <h4 className="font-bold mb-2 text-gray-900">The "Commercialization Plan" is Key</h4>
                      <p className="text-sm text-gray-600">
                        In Phase II, agencies care less about the "science" (you proved that in Phase I) and more about the "business."
                        You must show letters of support from potential customers, investors, or partners who want to buy your product once it's built.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 3. NEURAL NETWORK: Internal Links */}
              <div className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore More Funding Options</h2>
                <p className="text-gray-600 mb-6">SBIR is just one federal program. Compare it with other opportunities:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/guides/apply-federal-grants" className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">Federal Grants 101</span>
                      <span className="text-sm text-gray-500">Learn the basics of Grants.gov</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                  </Link>
                  <Link href="/guides/sttr-vs-sbir" className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">STTR Grants</span>
                      <span className="text-sm text-gray-500">Partner with a University? Read this.</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                  </Link>
                  <Link href="/usa/california" className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                      <Target className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">California Grants</span>
                      <span className="text-sm text-gray-500">State matching funds available</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                  </Link>
                  <Link href="/usa/technology-startup-grants" className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <Lightbulb className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">Tech Startup Funding</span>
                      <span className="text-sm text-gray-500">Broader tech funding guide</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                  </Link>
                </div>
              </div>


              {/* 4. DEDICATED FAQ BLOCK */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">1. What is the difference between SBIR Phase I and Phase II?</h3>
                    <p className="text-gray-600 text-sm">Phase I is for "Proof of Concept" funding ($50K-$250K) covering 6-12 months. Phase II is for "Prototype Development" ($750K-$1.7M) covering 24 months and is only available to Phase I awardees.</p>
                  </div>
                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">2. Do I have to pay back SBIR grants?</h3>
                    <p className="text-gray-600 text-sm">No. SBIR grants are non-dilutive funding. You do not repay the money, and the government takes 0% equity in your company. Visit <Link href="https://www.sbir.gov/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">SBIR.gov</Link> for official policy.</p>
                  </div>
                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">3. Can I apply for SBIR if I am a solo founder?</h3>
                    <p className="text-gray-600 text-sm">Yes, but the Principal Investigator (PI) must be primarily employed by the small business (51% of their time) at the time of award. You can hire others as contractors.</p>
                  </div>
                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">4. What is the success rate for SBIR applications?</h3>
                    <p className="text-gray-600 text-sm">The average success rate for Phase I is approximately 15-17%. For Phase II, it rises to about 45-50% since the applicant pool is pre-screened.</p>
                  </div>
                  <div className="border-b border-gray-100 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">5. How long does it take to get SBIR funding?</h3>
                    <p className="text-gray-600 text-sm">The process is slow. It typically takes 6-9 months from submission to receiving the first check. Plan your runway accordingly.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">6. Can I use SBIR funds for marketing?</h3>
                    <p className="text-gray-600 text-sm">Typically, no. SBIR funds are restricted to Research and Development (R&D) activities. Sales, marketing, and general business development costs are usually unallowable overhead.</p>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 text-white text-center shadow-xl">
                <Users className="w-16 h-16 mx-auto mb-6 text-blue-200" />
                <h3 className="text-3xl font-bold mb-4">Need Help with your SBIR Proposal?</h3>
                <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                  SBIR applications are complex legal documents. Our specialists can help you navigate the 50+ page requirements and increase your odds of success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 h-12" asChild>
                    <Link href="/contact">
                      Get Application Help
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-blue-200 text-blue-100 hover:bg-blue-800/50 h-12" asChild>
                    <Link href="/guides">
                      Read More Guides
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
