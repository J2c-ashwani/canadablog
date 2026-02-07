import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Leaf, Zap, Sun, Wind, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CleanTech Funding Canada 2025 | SDTC & Net Zero Grants",
  description: "Complete guide to clean technology funding. Apply for SDTC, Clean Tech ITCs (30%), and Net Zero Accelerator grants.",
  keywords: "cleantech funding Canada, SDTC application guide, Clean Tech ITC, Net Zero Accelerator, environmental grants, green technology funding",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/canada-cleantech-funding-guide",
  },
  openGraph: {
    title: "CleanTech Funding Canada 2025 | SDTC & ITCs",
    description: "Step-by-step guide to securing up to $15M in clean tech funding and 30% tax credits.",
    url: "https://www.fsidigital.ca/guides/canada-cleantech-funding-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Clean Technology Investment Tax Credit (ITC)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Clean Tech ITC is a refundable tax credit of up to 30% of the capital cost of eligible clean technology property (e.g., solar, wind, storage) acquired and available for use on or after March 28, 2023."
      }
    },
    {
      "@type": "Question",
      "name": "How does SDTC funding work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SDTC (Sustainable Development Technology Canada) provides non-repayable contributions (grants) for pre-commercial demonstration projects. They typically fund 33-40% of eligible project costs."
      }
    },
    {
      "@type": "Question",
      "name": "Can I stack ITCs with other grants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but the capital cost of the equipment for the ITC calculation must be reduced by the amount of any government assistance (grants) received."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Net Zero Accelerator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Net Zero Accelerator (NZA) is a stream of the Strategic Innovation Fund (SIF) targeting large-scale decarbonization projects (usually >$10M) for high-emitting sectors."
      }
    }
  ]
}

export default function CanadaCleanTechFundingGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-700 to-emerald-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-teal-500/20 text-teal-100 border-teal-400/30 backdrop-blur-sm">
                🌱 CleanTech & Net Zero
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Canada CleanTech Funding Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-teal-100 leading-relaxed text-pretty">
                The complete handbook for environmental innovators.
                Secure SDTC grants, Clean Tech ITCs, and Net Zero Accelerator funding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-lg shadow-teal-900/50" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-teal-800/50 border-teal-400/30 text-teal-100 hover:bg-teal-800/80 backdrop-blur-sm" asChild>
                  <Link href="/blog/cleantech-grants-canada">
                    CleanTech Strategy
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-teal-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-teal-900 gap-4">
              <span className="font-semibold text-teal-900 flex items-center shrink-0">
                <Leaf className="w-4 h-4 mr-2 text-teal-600" />
                Green Funding:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-teal-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> Top Programs</Link>
                <Link href="#sdtc" className="hover:text-teal-700 transition-colors flex items-center gap-1"><Zap className="w-3 h-3" /> SDTC</Link>
                <Link href="#itc" className="hover:text-teal-700 transition-colors flex items-center gap-1"><DollarSign className="w-3 h-3" /> 30% ITC</Link>
                <Link href="#process" className="hover:text-teal-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#faq" className="hover:text-teal-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-teal-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-teal-600 mb-2">$15M</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Max SDTC Grant</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Refundable ITC</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">TRL 6-8</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Sweet Spot</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-emerald-700 mb-2">22+</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Active Funds</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Programs Section */}
        <section id="programs" className="py-20 bg-teal-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Top CleanTech Funding Streams</h2>

              <div className="space-y-8">
                {/* SDTC */}
                <Card id="sdtc" className="border-l-4 border-l-teal-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Leaf className="w-8 h-8 text-teal-600" />
                        <CardTitle className="text-xl">SDTC (Sustainable Development Tech)</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-teal-300 text-teal-700">Demonstration</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The premier funding body for Canadian cleantech. SDTC funds <strong>pre-commercial demonstration</strong> of technologies that address climate change, clean air, clean water, or clean soil.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 bg-white border border-teal-100 p-4 rounded-lg text-sm">
                      <div>
                        <strong className="block text-teal-900 mb-2">The Offer:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Average Contribution: $2M - $5M</li>
                          <li>Non-Repayable (Grant)</li>
                          <li>Funds 33-40% of project costs</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-teal-900 mb-2">Requirements:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>TRL 5-8 (Beyond prototype, not yet sales)</li>
                          <li>Strong consortium (partners)</li>
                          <li>Quantifiable environmental benefits</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clean Tech ITC */}
                <Card id="itc" className="border-l-4 border-l-green-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-green-600" />
                        <CardTitle className="text-xl">Clean Tech ITC (Tax Credit)</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-green-300 text-green-700">Refundable</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      A powerful <strong>refundable tax credit</strong> for businesses investing in eligible clean energy equipment.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-green-100 text-green-800">Solar</Badge>
                      <Badge className="bg-green-100 text-green-800">Wind</Badge>
                      <Badge className="bg-green-100 text-green-800">Storage</Badge>
                      <Badge className="bg-green-100 text-green-800">Heat Pumps</Badge>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-green-900">Standard Rate</span>
                        <span className="font-bold text-green-600 text-xl">30%</span>
                      </div>
                      <p className="text-xs text-green-700 mt-1">*Must pay prevailing wages for installation labor to get full rate.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Net Zero Accelerator */}
                <Card className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Wind className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">Net Zero Accelerator (SIF)</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-blue-300 text-blue-700">Large Scale</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      For massive industrial decarbonization projects. Part of the Strategic Innovation Fund.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">Projects $10M+</Badge>
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">Heavy Industry</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Timeline */}
        <section id="process" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">SDTC Application Lifecycle</h2>

              <div className="relative border-l-2 border-slate-200 pl-8 space-y-12 ml-4 md:ml-0">

                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Phase 1: Initial Proposal (SOI)</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Submit a Statement of Interest (SOI). This is a shorter document outlining the technology, the market, and the environmental benefits.
                  </p>
                  <div className="bg-teal-50 p-4 rounded border border-teal-200">
                    <span className="text-xs font-mono text-teal-600 bg-teal-100 px-2 py-1 rounded">TIP</span>
                    <span className="text-sm text-teal-800 ml-2">Focus heavily on the "Why Now?" and the specific environmental quantification (e.g., tonnes of CO2e reduced).</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Phase 2: Full Proposal</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    If invited, submit the Full Project Proposal (FPP). This requires a detailed GANTT chart, full financial workbooks, and confirmed consortium partners.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Phase 3: Due Diligence</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    SDTC sends external experts (technical and financial) to grill your team. They verify your claims and check your IP status.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Approval & Board Presentation</h3>
                  <p className="text-slate-600 text-sm">
                    Final approval by the SDTC Project Review Committee and Board.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">CleanTech Winning Strategies</h2>
              <div className="grid md:grid-cols-2 gap-8">

                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-teal-600" />
                      <CardTitle className="text-lg">The Consortium Model</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      SDTC hates "lone wolf" projects. You need a <strong>Consortium</strong>: A partner who is a potential first customer, validating the tech in the real world.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Target className="w-6 h-6 text-green-600" />
                      <CardTitle className="text-lg">Quantified Impact</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      Vague promises like "cleaner air" fail. You need: "Reduces GHG by 50,000 tonnes CO2e/year by 2030, verified by ISO 14064."
                    </p>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-teal-600 mr-2" />
                CleanTech Funding FAQs
              </h2>
              <div className="divide-y divide-teal-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can early-stage startups apply for SDTC?</h3>
                  <p className="text-slate-600 text-sm">Typically no. SDTC is for "Demonstration" (TRL 5-8). If you are still in R&D (TRL 1-4), look at <strong>IRAP</strong> or <strong>SDTC Seed Funding</strong> (via accelerators).</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Is the Clean Tech ITC taxable?</h3>
                  <p className="text-slate-600 text-sm">Yes. The ITC reduces the capital cost of the equipment for CCA (depreciation) purposes, effectively increasing taxable income over time, but providing immediate cash flow.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What happens if I sell the equipment?</h3>
                  <p className="text-slate-600 text-sm">If you sell ITC-funded equipment within a certain period (usually 10-20 years), there may be a recapture of the tax credit.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Related Funding Pathways</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-strategic-innovation-fund" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Scaling Up</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">SIF Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">For large Net Zero Accelerator projects &gt;$10M.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/sred-application-guide" className="group block h-full">
                  <div className="bg-white border hover:border-teal-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-teal-600 font-semibold mb-2">R&D Tax</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-teal-700 mb-2">SR&ED Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">Fund your early stage R&D before SDTC.</p>
                    <div className="mt-3 text-xs text-teal-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-irap-grants" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Innovation</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">NRC IRAP</h4>
                    <p className="text-sm text-slate-500 flex-grow">Support for technical hurdles in clean tech.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-teal-800 to-green-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Fast-Track Your Green Funding</h2>
            <p className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
              Our engineers and grant writers specialize in CleanTech. We speak TRL, GHG, and ISO.
            </p>
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-lg shadow-teal-900/50" asChild>
              <Link href="/contact?service=cleantech-expert-help">
                Get Expert Helps
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
