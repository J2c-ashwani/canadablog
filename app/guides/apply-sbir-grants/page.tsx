import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertCircle, HelpCircle, ArrowRight, Rocket, Microscope } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBIR Phase I & II Requirements 2025 | $1.7M R&D Funding",
  description: "Complete guide to Small Business Innovation Research (SBIR) grants. Learn how to write a winning proposal for Phase I ($250k) and Phase II ($1.7M) funding.",
  keywords: "SBIR grant requirements, SBIR Phase I vs Phase II, federal R&D grants, NSF SBIR, NIH SBIR, DoD small business grants",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-sbir-grants",
  },
  openGraph: {
    title: "SBIR Grant Application Guide 2025 | $1.7M Funding",
    description: "Step-by-step guide to applying for federal R&D grants. Download proposal templates and budget guides.",
    url: "https://www.fsidigital.ca/guides/apply-sbir-grants",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between SBIR Phase I and Phase II?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Phase I is for 'Feasibility & Proof of Concept' (typically $150k-$275k for 6-12 months). Phase II is for 'Prototype Development' (typically $1M-$1.7M for 2 years) and requires a successful Phase I result."
      }
    },
    {
      "@type": "Question",
      "name": "Note: can I skip Phase I and go straight to Phase II?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generally, no. Most agencies require you to complete Phase I first. However, the NIH and DoD sometimes offer a 'Direct to Phase II' pilot program for companies that already have strong feasibility data."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a PhD to get an SBIR grant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not officially, but the Principal Investigator (PI) needs to have the expertise to lead the research. For NIH/NSF grants, having a PhD on the team is very common and improves credibility."
      }
    },
    {
      "@type": "Question",
      "name": "Is the money tax-free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. SBIR awards are considered taxable business income. However, they are non-dilutive, meaning you don't give up any equity/ownership in your company."
      }
    }
  ]
}

export default function ApplySBIRGrantsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-800 to-purple-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-indigo-500/20 text-indigo-100 border-indigo-400/30 backdrop-blur-sm">
                🚀 Federal R&D Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                How to Apply for <br className="hidden md:block" /> SBIR Grants (2025)
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-indigo-100 leading-relaxed text-pretty">
                The ultimate guide to "America's Seed Fund". <br className="hidden md:block" /> Secure <strong>$1.7 Million+</strong> in non-dilutive R&D funding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold shadow-lg" asChild>
                  <Link href="#phases">
                    View Phases
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-indigo-800/50 border-indigo-400/30 text-indigo-100 hover:bg-indigo-800/80 backdrop-blur-sm" asChild>
                  <Link href="/blog/sbir-proposal-template">
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
                Topic:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#phases" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> Phase I vs II</Link>
                <Link href="#agencies" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><Users className="w-3 h-3" /> Agencies</Link>
                <Link href="#requirements" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Eligibility</Link>
                <Link href="#process" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#faq" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-indigo-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$4B+</div>
                  <div className="text-indigo-800 text-sm font-medium uppercase tracking-wide">Annual Funding</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$1.7M</div>
                  <div className="text-indigo-800 text-sm font-medium uppercase tracking-wide">Phase II Award</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">0%</div>
                  <div className="text-indigo-800 text-sm font-medium uppercase tracking-wide">Equity Taken</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">15%</div>
                  <div className="text-indigo-800 text-sm font-medium uppercase tracking-wide">Win Rate (Avg)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content: Phases */}
        <section id="phases" className="py-16 bg-indigo-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How the Program Works</h2>

              <div className="space-y-8">
                {/* Phase I */}
                <Card className="border-l-4 border-l-purple-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lightbulb className="w-8 h-8 text-purple-600" />
                        <CardTitle className="text-xl">Phase I: Feasibility</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">Concept Stage</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The "Startup" phase. The goal is to prove your idea creates the scientific results you claim. It is not for scaling or marketing.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm bg-white border border-purple-100 p-4 rounded-lg">
                      <ul className="space-y-2">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" /> <strong>$150k - $275k</strong> funding</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" /> 6-12 month duration</li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" /> Lab/Feasibility focused</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" /> Outcome: Validated data</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase II */}
                <Card className="border-l-4 border-l-indigo-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Rocket className="w-8 h-8 text-indigo-600" />
                        <CardTitle className="text-xl">Phase II: Prototype & Dev</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">Scale Stage</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The big money. Once Phase I proves it works, Phase II pays you to build the commercial prototype.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <ul className="space-y-2">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-500 mr-2" /> <strong>$1M - $1.7M</strong> funding</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-500 mr-2" /> 24 month duration</li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center"><AlertCircle className="w-4 h-4 text-indigo-500 mr-2" /> Must have Phase I first</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-500 mr-2" /> Outcome: Commercial Prototype</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Agencies Map */}
                <div id="agencies" className="pt-12">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Where to Apply (Top Agencies)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Link href="https://seedfund.nsf.gov/" target="_blank" className="block group">
                      <div className="bg-white p-6 rounded-lg border hover:border-blue-500 transition-all shadow-sm">
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 flex justify-between">
                          NSF (Science Fdn) <ExternalLink className="w-4 h-4 opacity-50" />
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Best for: Deep tech, AI, Materials, Robotics. "We fund the technology, not just the application."</p>
                      </div>
                    </Link>
                    <Link href="https://sbir.nih.gov/" target="_blank" className="block group">
                      <div className="bg-white p-6 rounded-lg border hover:border-blue-500 transition-all shadow-sm">
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 flex justify-between">
                          NIH (Health) <ExternalLink className="w-4 h-4 opacity-50" />
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Best for: Biotech, Pharma, Medical Devices, Digital Health. Focus on clinical impact.</p>
                      </div>
                    </Link>
                    <Link href="https://www.defensesbirsttr.mil/" target="_blank" className="block group">
                      <div className="bg-white p-6 rounded-lg border hover:border-blue-500 transition-all shadow-sm">
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 flex justify-between">
                          DoD (Defense) <ExternalLink className="w-4 h-4 opacity-50" />
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Best for: Dual-use tech. Drones, cybersecurity, logistics. They are the CUSTOMER.</p>
                      </div>
                    </Link>
                    <Link href="https://science.osti.gov/sbir" target="_blank" className="block group">
                      <div className="bg-white p-6 rounded-lg border hover:border-blue-500 transition-all shadow-sm">
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 flex justify-between">
                          DOE (Energy) <ExternalLink className="w-4 h-4 opacity-50" />
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Best for: Clean tech, fusion, nuclear, grid modernization.</p>
                      </div>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="requirements" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Eligibility Checklist</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Must Haves</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>US Owned:</strong> 51% owned by US citizens or permanent residents.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Small Biz:</strong> Under 500 employees (most are under 10).</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>PI Requirement:</strong> Principal Investigator must be employed &gt;50% by the small business.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Deal Breakers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>VC Ownership:</strong> If &gt;50% owned by VCs, you are generally ineligible (except for some NIH exceptions).</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Outsourcing:</strong> Validation work must be done IN the USA.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About SBIR</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Can I use SBIR funds for marketing?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No. SBIR/STTR funds are strictly for <strong>Technical R&D</strong>. You cannot use them for sales, marketing, or general business operations. However, you can use the "profit fee" (usually 7%) for any purpose you want.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Do I have to pay it back?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No. SBIR awards are grants (or contracts), not loans. They are non-dilutive, meaning the government takes <strong>zero equity</strong> in your company.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. What is TABA?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    TABA (Technical and Business Assistance) is extra funding (up to $6,500 in Phase I) you can request to hire a vendor for market research, IP strategy, or financial management. <em>Always request TABA.</em>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Can a VC-backed company apply?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Generally, no. If your company is majority-owned (&gt;50%) by Venture Capital firms or Hedge Funds, you are ineligible. There are some specific exceptions for NIH awards, but check the rules carefully.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. Can I outsource the work?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    In Phase I, you can outsource up to 33% of the work. The remaining 67% must be done by your employees. In Phase II, you can outsource up to 50%.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. How long does approval take?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    It is slow. From submission to award typically takes <strong>4 to 6 months</strong>. Plan your cash flow accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Related R&D Funding</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/irap-innovation-application-guide" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Canada</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">IRAP Grants (Canada)</h4>
                    <p className="text-sm text-slate-500 flex-grow">Canadian equivalent of SBIR.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-doe-clean-energy-grants" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Energy</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">DOE Energy Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">Specifics for energy tech.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-startup-grants" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Startups</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">General Startup Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">Non-R&D options.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-indigo-600 mr-2" />
                SBIR FAQs
              </h2>
              <div className="divide-y divide-indigo-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I use the funds for marketing?</h3>
                  <p className="text-slate-600 text-sm">No. SBIR funds are strictly for Research & Development (labor, materials, testing). Sales and marketing expenses are generally unallowable.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Do I need a university partner?</h3>
                  <p className="text-slate-600 text-sm">No, but it helps. About 33% of the work in Phase I can be outsourced. Partnering with a university lab can provide credibility and access to equipment.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What is the "TABA" supplement?</h3>
                  <p className="text-slate-600 text-sm">Technical and Business Assistance (TABA) is extra money (up to $6,500 in Phase I) you can request to hire a consultant for market research or IP strategy. Always ask for it!</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Win Your SBIR Grant</h2>
            <p className="text-lg text-indigo-200 mb-8 max-w-2xl mx-auto">
              Writing a 15-page technical proposal is hard. We help you structure your specific aims, commercialization plan, and budget.
            </p>
            <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=sbir-grant-writing">
                Get Proposal Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
