import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Zap, Leaf, Sun, Wind, HelpCircle, ArrowRight, Lightbulb, DollarSign } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DOE Clean Energy Grants 2025 | $62B Funding Guide",
  description: "Official guide to Department of Energy (DOE) grants. Funding for solar, wind, and clean tech startups. Learn how to apply for ARPA-E and EERE grants.",
  keywords: "DOE clean energy grants, solar energy funding, wind energy grants, ARPA-E application, EERE funding opportunities, clean tech startup grants",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-doe-clean-energy-grants",
  },
  openGraph: {
    title: "DOE Clean Energy Grant Guide 2025 | $62B Available",
    description: "Access billions in federal funding for renewable energy and clean tech. Step-by-step application guide.",
    url: "https://www.fsidigital.ca/guides/apply-doe-clean-energy-grants",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is ARPA-E?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ARPA-E (Advanced Research Projects Agency-Energy) funds high-risk, high-reward clean energy technologies that are too early for private investment. Think 'moonshot' projects."
      }
    },
    {
      "@type": "Question",
      "name": "Can startups apply for DOE grants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! The DOE has specific SBIR/STTR programs for small businesses. Additionally, many FOAs (Funding Opportunity Announcements) encourage startup participation, often requiring a cost-share."
      }
    },
    {
      "@type": "Question",
      "name": "What is EERE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "EERE (Office of Energy Efficiency and Renewable Energy) is the largest DOE office for clean tech. It funds solar (SETO), wind (WETO), innovative buildings, and manufacturing efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to match the funds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Usually, yes. Most DOE grants require a 'cost share' (typically 20% for R&D projects and up to 50% for demonstration projects). SBIR grants are an exception and strictly do not require cost share."
      }
    }
  ]
}

export default function DOECleanEnergyGrantsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-100 border-emerald-400/30 backdrop-blur-sm">
                ⚡ Federal Energy Grants
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                DOE Clean Energy <br className="hidden md:block" /> Grants (2025)
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-emerald-100 leading-relaxed text-pretty">
                Tap into the <strong>$62 Billion</strong> clean energy revolution. <br className="hidden md:block" /> Funding for Solar, Wind, and Deep Tech.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold shadow-lg" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-emerald-800/50 border-emerald-400/30 text-emerald-100 hover:bg-emerald-800/80 backdrop-blur-sm" asChild>
                  <Link href="/blog/doe-grant-application-checklist">
                    Download Checklist
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-emerald-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-emerald-900 gap-4">
              <span className="font-semibold text-emerald-900 flex items-center shrink-0">
                <Zap className="w-4 h-4 mr-2 text-emerald-600" />
                Sector:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-emerald-700 transition-colors flex items-center gap-1"><Sun className="w-3 h-3" /> Solar & Wind</Link>
                <Link href="#arpa-e" className="hover:text-emerald-700 transition-colors flex items-center gap-1"><Lightbulb className="w-3 h-3" /> ARPA-E (Moonshots)</Link>
                <Link href="#process" className="hover:text-emerald-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#faq" className="hover:text-emerald-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-emerald-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-emerald-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">$62B</div>
                  <div className="text-emerald-900 text-sm font-medium uppercase tracking-wide">Investment Pool</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-emerald-900 text-sm font-medium uppercase tracking-wide">Active Programs</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$5M</div>
                  <div className="text-emerald-900 text-sm font-medium uppercase tracking-wide">Typical Max Grant</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">20%</div>
                  <div className="text-emerald-900 text-sm font-medium uppercase tracking-wide">Typical Cost Share</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section id="programs" className="py-16 bg-emerald-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Funding by Technology</h2>

              <div className="space-y-8">
                {/* Solar (SETO) */}
                <Card className="border-l-4 border-l-yellow-500 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sun className="w-8 h-8 text-yellow-500" />
                        <CardTitle className="text-xl">Solar Energy (SETO)</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Most Popular</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The Solar Energy Technologies Office funds everything from new PV materials to grid integration software.
                    </p>
                    <div className="bg-white border border-yellow-100 p-4 rounded-lg">
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
                        <div className="font-semibold text-center bg-yellow-50 p-2 rounded">Hardware R&D</div>
                        <div className="font-semibold text-center bg-yellow-50 p-2 rounded">Soft Costs</div>
                        <div className="font-semibold text-center bg-yellow-50 p-2 rounded">Manufacturing</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Wind (WETO) */}
                <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Wind className="w-8 h-8 text-blue-500" />
                        <CardTitle className="text-xl">Wind Energy (WETO)</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Focuses heavily on offshore wind technology, distributed wind (small turbines), and environmental coexistence.
                    </p>
                  </CardContent>
                </Card>

                {/* ARPA-E */}
                <div id="arpa-e">
                  <Card className="border-l-4 border-l-purple-600 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Zap className="w-8 h-8 text-purple-600" />
                          <CardTitle className="text-xl">ARPA-E (The Moonshots)</CardTitle>
                        </div>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">High Risk/Reward</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">
                        <strong>Advanced Research Projects Agency-Energy.</strong> They fund technologies that are "too early" for private VC. Think cold fusion, advanced batteries, or carbon eating concrete.
                      </p>
                      <div className="bg-purple-50 text-purple-900 p-3 rounded text-sm italic border border-purple-100">
                        "If it works, will it matter?" - The ARPA-E Mantra.
                      </div>
                    </CardContent>
                  </Card>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Application Process Timeline */}
        <section id="process" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">The DOE Application Flow</h2>

              <div className="relative border-l-2 border-emerald-200 pl-8 space-y-12 ml-4 md:ml-0">

                <div className="relative">
                  <div className="absolute -left-[41px] bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Identify the FOA</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    DOE releases <strong>Funding Opportunity Announcements (FOAs)</strong> on the EERE Exchange. You must subscribe to get alerts.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Concept Paper (Go / No-Go)</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Before the full application, you usually submit a 5-page Concept Paper. The DOE will encourage or discourage you from proceeding. This saves you time.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Full Application</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Extensive technical volume, management plan, and budget justification.
                    <span className="text-red-600 font-semibold ml-1">*This is where many fail due to compliant budget formatting.*</span>
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Selection & Negotiation</h3>
                  <p className="text-slate-600 text-sm">
                    If selected, you enter months of negotiation to finalize milestones and the "Statement of Project Objectives" (SOPO).
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
              <h3 className="text-xl font-bold text-slate-900 mb-6">Explore More Funding</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-sbir-grants" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">R&D</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">SBIR Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">Small business specific R&D.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/canada-cleantech-funding-guide" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Canada</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">Canada CleanTech</h4>
                    <p className="text-sm text-slate-500 flex-grow">Canadian energy funding.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/sba-growth-accelerator-fund-guide" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Accelerators</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Growth Accelerator</h4>
                    <p className="text-sm text-slate-500 flex-grow">Funding for support orgs.</p>
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
                <HelpCircle className="w-6 h-6 text-emerald-600 mr-2" />
                DOE FAQs
              </h2>
              <div className="divide-y divide-emerald-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What is TRL?</h3>
                  <p className="text-slate-600 text-sm">Technology Readiness Level. DOE grants range from TRL 1 (Basic Principles) to TRL 9 (Commercial). You must know your TRL to apply to the right FOA.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I partner with a National Lab?</h3>
                  <p className="text-slate-600 text-sm">Yes, and it is highly encouraged. Partnering with NREL, Oak Ridge, or Argonne gives you access to world-class equipment and credibility.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Are pre-revenue companies eligible?</h3>
                  <p className="text-slate-600 text-sm">Yes. Most DOE grants are designed specifically for pre-revenue technology development.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-emerald-900 to-teal-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Power Your Innovation</h2>
            <p className="text-lg text-emerald-200 mb-8 max-w-2xl mx-auto">
              DOE applications are rigorously technical. We help you align your technology with the specific FOA requirements.
            </p>
            <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=energy-grant-writing">
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
