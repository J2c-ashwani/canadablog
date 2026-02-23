import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, AlertCircle, HelpCircle, ArrowRight, Lightbulb, Target, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Federal Grants Application Tips 2026 | Expert Acceptance Strategies",
  description: "Master the federal grant application process. Expert tips on writing narratives, budget justification, SAM.gov registration, and avoiding rejection.",
  keywords: "federal grant application tips, grants.gov strategies, write winning grant proposal, federal funding guide, SAM.gov registration tips",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/federal-grants-application-tips",
  },
  openGraph: {
    title: "Federal Grants Application Tips 2026 | Expert Strategies",
    description: "Stop getting rejected. Learn the insider tips to writing winning federal grant applications.",
    url: "https://www.fsidigital.ca/guides/federal-grants-application-tips",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the most common reason for grant rejection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The #1 reason is 'Technical Non-Compliance'—meaning you missed a form, used the wrong font size, or went over the page limit. It is rejected before anyone even reads your idea."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a professional grant writer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For large federal grants ($500k+), it is highly recommended. The complexity of the narrative and budget justification often requires specialist expertise."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the review process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Federal grants typically take 3-6 months from submission to award notification. Peer review panels meet periodically, not abundantly."
      }
    },
    {
      "@type": "Question",
      "name": "What is match funding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many federal grants require 'cost-sharing' or 'matching funds' (e.g., 50%). You must prove you have cash or in-kind contributions to cover your share of the project."
      }
    }
  ]
}

export default function FederalGrantsApplicationTipsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-800 to-gray-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-500/20 text-blue-100 border-blue-400/30 backdrop-blur-sm">
                💡 Expert Strategy Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Federal Grants <br className="hidden md:block" /> Application Tips
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed text-pretty">
                Don't let a formatting error kill your million-dollar idea. <br className="hidden md:block" /> Master the <strong>narrative</strong>, <strong>budget</strong>, and <strong>compliance</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 font-bold shadow-lg" asChild>
                  <Link href="#checklist">
                    View Checklist
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-slate-700/50 border-white/30 text-white hover:bg-slate-700/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/federal-grants-application-tips">
                    Download Template
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-700 gap-4">
              <span className="font-semibold text-slate-900 flex items-center shrink-0">
                <Lightbulb className="w-4 h-4 mr-2 text-blue-600" />
                Jump to:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#checklist" className="hover:text-blue-700 transition-colors flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Readiness Checklist</Link>
                <Link href="#mistakes" className="hover:text-blue-700 transition-colors flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Fatal Mistakes</Link>
                <Link href="#narrative" className="hover:text-blue-700 transition-colors flex items-center gap-1"><FileText className="w-3 h-3" /> Writing Tips</Link>
                <Link href="#faq" className="hover:text-blue-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips High-Level */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Start Early</div>
                  <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">60+ Days Out</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">Be Exact</div>
                  <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">Follow Formatting</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">Show Data</div>
                  <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">Quantify Impact</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-red-600 mb-2">No Fluff</div>
                  <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">Concise Writing</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}

        {/* 1. Readiness Checklist */}
        <section id="checklist" className="py-16 bg-slate-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
                Pre-Application Readiness
              </h2>

              <div className="space-y-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800">1. Administrative Must-Haves</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Shield className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                          <div>
                            <strong>UEI (Unique Entity ID):</strong>
                            <p className="text-sm text-gray-600">Replaced the DUNS number. You cannot apply without it.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Shield className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                          <div>
                            <strong>SAM.gov Active Status:</strong>
                            <p className="text-sm text-gray-600">Registration takes 2+ weeks. If it expires during review, you are disqualified.</p>
                          </div>
                        </li>
                      </ul>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Shield className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                          <div>
                            <strong>Grants.gov Account:</strong>
                            <p className="text-sm text-gray-600">Ensure your AOR (Authorized Org Rep) role is approved.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Shield className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                          <div>
                            <strong>Financial Audit:</strong>
                            <p className="text-sm text-gray-600">Most federal grants require 2 years of audited or reviewed financials.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Common Mistakes */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
                Why Grants Get Rejected
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                  <h3 className="text-xl font-bold text-red-800 mb-4">❌ Technical Disqualification</h3>
                  <p className="mb-4 text-sm text-red-700">These result in an immediate "Return Without Review".</p>
                  <ul className="space-y-2 text-red-900 text-sm">
                    <li className="flex items-start"><span className="mr-2">•</span> Late submission (even by 1 minute).</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Wrong font size or margins (they measure this!).</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Exceeding page limits.</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Missing a mandatory attachment.</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">⚠️ Narrative Failure</h3>
                  <p className="mb-4 text-sm text-orange-700">These result in a low score from reviewers.</p>
                  <ul className="space-y-2 text-orange-900 text-sm">
                    <li className="flex items-start"><span className="mr-2">•</span> "Wall of text" with no headers or graphics.</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Focusing on "your need" instead of "public benefit".</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Vague budget justification ("$50k for supplies").</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Lack of quantifiable outcome metrics.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Writing Tips (Narrative) */}
        <section id="narrative" className="py-16 bg-slate-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                <FileText className="w-8 h-8 text-purple-600 mr-3" />
                Writing the Perfect Narrative
              </h2>

              <div className="space-y-6">
                <Card className="border-purple-200">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-bold text-purple-800 mb-2">The "So What?" Test</h4>
                        <p className="text-sm text-gray-600">Don't just say what you will do. Explain why it matters. Who benefits? How does this solve a national problem?</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-800 mb-2">Use Their Keywords</h4>
                        <p className="text-sm text-gray-600">Read the NOFO (Notice of Funding Opportunity) carefully. Mirror their exact terminology in your headings.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-800 mb-2">Visuals Matter</h4>
                        <p className="text-sm text-gray-600">Reviewers are tired. Use charts, logic models, and bullet points to break up the text. Make it skimmable.</p>
                      </div>
                    </div>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About Federal Grants</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Can I submit a day late?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Absolutely not. Federal grants are automated. If the deadline is 11:59 PM EST and you submit at 12:00 AM EST, the system (Grants.gov) will reject it. Aim to submit <strong>48 hours early</strong> to account for technical glitches.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. How long does SAM.gov registration take?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    It used to take days; now it can take weeks or even months due to new fraud validation steps. Start your renewal at least 60 days before expiration. You cannot receive a grant with an expired <a href="https://sam.gov/content/home" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SAM.gov</a> entity.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. What is a "Single Audit"?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    If you spend more than $750,000 in federal funds in a single year, you are legally required to undergo a specific financial audit (Single Audit). This is an extra cost you should be aware of.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Are there page limits?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes. Each NOFO (Notice of Funding Opportunity) specifies them. If the limit is 25 pages and you submit 26, the reviewer will simply discard page 26 (or the whole application).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. Can I use ChatGTP/AI to write my grant?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    You can use it for brainstorming or outlining, but be careful. AI often generates generic "fluff" that scores poorly on specific technical criteria. Also, never input sensitive proprietary data into public AI models.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. What is the difference between an Authorizing Official and a Point of Contact?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The <strong>Authorizing Official (AOR)</strong> is the only person who can illegally sign the grant submission. The Point of Contact is just who they email. Ensure your AOR has the right roles in <a href="https://www.grants.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Grants.gov</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Explore Funding Opportunities</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-federal-grants" className="group block h-full">
                  <div className="bg-slate-50 border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Federal</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">Apply for Federal Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">The core "How-To" guide.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/sba-application-process" className="group block h-full">
                  <div className="bg-slate-50 border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Loans</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">SBA Application Process</h4>
                    <p className="text-sm text-slate-500 flex-grow">For loans instead of grants.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-small-business-grants" className="group block h-full">
                  <div className="bg-slate-50 border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">General</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Small Business Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">Private & Public mix.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-slate-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-slate-600 mr-2" />
                Grant Writing FAQs
              </h2>
              <div className="divide-y divide-slate-200">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I include my salary in the budget?</h3>
                  <p className="text-slate-600 text-sm">Yes, if you are directly working on the project. You can charge a percentage of your time (FTE) to the grant.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What is "Indirect Cost Rate"?</h3>
                  <p className="text-slate-600 text-sm">It covers overhead (rent, utilities, admin). You usually need a negotiated rate agreement (NICRA), or you can use the "de minimis" 10% rate.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Does the government take equity?</h3>
                  <p className="text-slate-600 text-sm">No. Grants are non-dilutive. They do not take ownership. However, they may own the rights to data or IP developed with the funds (Bayh-Dole Act).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-gray-800 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stop Writing in the Dark</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Our grant review service checks your proposal for "fatal errors" before you hit submit.
            </p>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=grant-review">
                Review My Proposal
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
