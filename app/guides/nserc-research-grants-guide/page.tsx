import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, GraduationCap, Shield, HelpCircle, ArrowRight, Microscope } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NSERC Research Grants 2025 | I2I & Alliance Application Guide",
  description: "Complete guide to NSERC Idea to Innovation (I2I) and Alliance grants. Learn how to secure up to $1M+ in research funding for university-industry partnerships.",
  keywords: "NSERC I2I application, Alliance grants Canada, university research funding, NSERC proposal guide, HQP training plan",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/nserc-research-grants-guide",
  },
  openGraph: {
    title: "NSERC Research Grants Guide 2025",
    description: "Secure funding for your research lab. Step-by-step guide to NSERC I2I and Alliance grants.",
    url: "https://www.fsidigital.ca/guides/nserc-research-grants-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the NSERC Idea to Innovation (I2I) grant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I2I is a grant (up to $350k) designed to accelerate the pre-competitive development of promising technology originating from the university sector to promote its transfer to a new or established Canadian company."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need an industry partner for NSERC Alliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. NSERC Alliance grants require a partnership with at least one organization from the private, public, or not-for-profit sector that can apply the research results."
      }
    },
    {
      "@type": "Question",
      "name": "What qualifies as HQP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HQP stands for Highly Qualified Personnel. This includes undergraduate and graduate students, and postdoctoral fellows who are trained through the research project."
      }
    },
    {
      "@type": "Question",
      "name": "What is the success rate for NSERC grants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success rates vary by program but generally range from 50% to 80% for partnership programs like I2I and Alliance, which is significantly higher than Discovery Grants."
      }
    }
  ]
}

export default function NSERCResearchGrantsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-900 to-violet-800 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-indigo-500/20 text-indigo-100 border-indigo-400/30 backdrop-blur-sm">
                🔬 Academic Research Series
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                NSERC Research <br className="hidden md:block" /> Funding Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-indigo-100 leading-relaxed text-pretty">
                Bridge the gap from lab to market. <br className="hidden md:block" /> detailed strategies for <strong>I2I</strong> and <strong>Alliance</strong> grants.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold shadow-lg" asChild>
                  <Link href="#programs">
                    Explore Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-indigo-800/50 border-indigo-400/30 text-white hover:bg-indigo-800/80 backdrop-blur-sm" asChild>
                  <Link href="/blog/nserc-proposal-template">
                    Download Template
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-indigo-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-indigo-900 gap-4">
              <span className="font-semibold text-indigo-900 flex items-center shrink-0">
                <Microscope className="w-4 h-4 mr-2 text-indigo-600" />
                Research Focus:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><DollarSign className="w-3 h-3" /> Grant Programs</Link>
                <Link href="#eligibility" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Eligibility</Link>
                <Link href="#strategy" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> Winning Strategy</Link>
                <Link href="#faq" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Overview */}
        <section className="py-12 bg-white border-b border-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-indigo-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$1M+</div>
                  <div className="text-indigo-900 text-sm font-medium uppercase tracking-wide">Alliance Cap</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$350K</div>
                  <div className="text-indigo-900 text-sm font-medium uppercase tracking-wide">I2I Maximum</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">66%</div>
                  <div className="text-indigo-900 text-sm font-medium uppercase tracking-wide">Avg Success Rate</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">Rolling</div>
                  <div className="text-indigo-900 text-sm font-medium uppercase tracking-wide">Alliance Deadline</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}

        {/* Programs Section */}
        <section id="programs" className="py-16 bg-indigo-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Core NSERC Programs</h2>

              <div className="space-y-8">
                {/* I2I Program */}
                <Card className="border-l-4 border-l-purple-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lightbulb className="w-8 h-8 text-purple-600" />
                        <CardTitle className="text-xl">Idea to Innovation (I2I)</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">Commercialization</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      For university researchers looking to transfer technology to industry.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-purple-50 p-3 rounded border border-purple-100">
                        <div className="text-xs font-semibold text-purple-800 uppercase">Phase I</div>
                        <div className="text-lg font-bold text-slate-800">$125K</div>
                        <div className="text-xs text-slate-500">Validation (1 yr)</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded border border-purple-100">
                        <div className="text-xs font-semibold text-purple-800 uppercase">Phase IIa</div>
                        <div className="text-lg font-bold text-slate-800">$125K</div>
                        <div className="text-xs text-slate-500">Enhancement (6-18 mos)</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded border border-purple-100">
                        <div className="text-xs font-semibold text-purple-800 uppercase">Phase IIb</div>
                        <div className="text-lg font-bold text-slate-800">$350K</div>
                        <div className="text-xs text-slate-500">Market Ready (2 yrs)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Alliance Program */}
                <Card className="border-l-4 border-l-blue-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">NSERC Alliance</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">Partnership</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The flagship partnership grant. Matches partner contributions (cash and in-kind) to solve complex challenges.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-slate-700">Cost Sharing Ratio:</span>
                        <span className="bg-white px-2 py-1 rounded text-blue-700 font-bold border border-blue-200">50% - 100% NSERC Coverage</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        NSERC can cover up to 100% of costs for partnerships with non-profits or small businesses, or 50-66% for large corporate partners.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                Eligibility Checklist
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-100 bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="text-green-800 text-lg">For Researchers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />Must hold an academic appointment at a Canadian university.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />Research must be in natural sciences or engineering.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />Must certify adherence to research integrity policies.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-100 bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-lg">For Partners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />Can be private companies, non-profits, or government agencies.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />Must have the capacity to exploit the research results.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />For I2I, must demonstrate market potential.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section id="strategy" className="py-16 bg-slate-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                <Target className="w-8 h-8 text-red-600 mr-3" />
                Winning Strategies
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-4">1. The HQP Factor</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    NSERC exists to train the next generation. Your proposal MUST detail how students (HQP) will gain industry-relevant skills.
                  </p>
                  <div className="bg-white p-4 rounded border border-indigo-100 text-xs text-indigo-700">
                    <strong>Tip:</strong> Don't just list student names. Describe their specific tasks, mentorship plan, and exposure to the partner organization.
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-4">2. Commercial Viability</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    For I2I, the science is secondary to the business case. You need a "Market Assessment" (often done by your University Transfer Office).
                  </p>
                  <div className="bg-white p-4 rounded border border-indigo-100 text-xs text-indigo-700">
                    <strong>Tip:</strong> Include letters of interest from potential customers, not just your primary partner.
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Partner Contribution Note</h3>
                <p className="text-sm text-yellow-800">
                  In-kind contributions (equipment, staff time) are valued, but <strong>cash contributions</strong> are king. A partner putting in cash shows true commitment and significantly increases approval odds.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Related Research Funding</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-nrc-irap" className="group block h-full">
                  <div className="bg-slate-50 border hover:border-orange-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-orange-600 font-semibold mb-2">Industry</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-orange-700 mb-2">NRC IRAP Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">For the industrial partner side.</p>
                    <div className="mt-3 text-xs text-orange-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-mitacs-accelerate" className="group block h-full">
                  <div className="bg-slate-50 border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Internships</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">Mitacs Accelerate</h4>
                    <p className="text-sm text-slate-500 flex-grow">Easier/faster than NSERC for student funding.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-federal-grants" className="group block h-full">
                  <div className="bg-slate-50 border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">General</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Federal Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">Broader government funding.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-indigo-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-indigo-600 mr-2" />
                NSERC FAQs
              </h2>
              <div className="divide-y divide-indigo-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I apply for I2I and Alliance at the same time?</h3>
                  <p className="text-slate-600 text-sm">Yes, provided they are for distinct phases or projects. You cannot double-dip for the exact same expenses.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Does NSERC take IP ownership?</h3>
                  <p className="text-slate-600 text-sm">No. NSERC does not claim IP rights. However, a signed IP agreement between the university and the partner is a mandatory condition of the award.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">How long does the review take?</h3>
                  <p className="text-slate-600 text-sm">Alliance grants are often faster (3-5 months) than Discovery grants. I2I has quarterly deadlines and takes about 3-4 months.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-indigo-900 to-violet-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Turn Research into Reality</h2>
            <p className="text-lg text-indigo-200 mb-8 max-w-2xl mx-auto">
              Our academic funding specialists can review your I2I or Alliance proposal for HQP and commercialization compliance.
            </p>
            <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=nserc-review">
                Get Proposal Review
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
