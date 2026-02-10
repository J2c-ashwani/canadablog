import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Target, DollarSign, AlertTriangle, Download, Rocket, Plane, Satellite, Shield, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aerospace & Defence Grants Canada 2025 | CSA & IDEaS Projects",
  description: "Complete guide to aerospace and defence funding in Canada. Apply for CSA space technology grants, IDEaS defence innovation, and SIF aerospace streams.",
  keywords: "aerospace grants Canada, CSA funding application, IDEaS program guide, defence innovation grants, space technology funding, SIF aerospace",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/canada-aerospace-defence-funding-guide",
  },
  openGraph: {
    title: "Aerospace & Defence Grants Canada 2025 | Application Guide",
    description: "Step-by-step guide to securing funding from the Canadian Space Agency (CSA) and Department of National Defence (IDEaS).",
    url: "https://www.fsidigital.ca/guides/canada-aerospace-defence-funding-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the IDEaS program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IDEaS (Innovation for Defence Excellence and Security) is a DND program that funds solutions to defence challenges. It offers competitive projects (up to $200k for Phase 1, $1M+ for Phase 2) and Test Drives."
      }
    },
    {
      "@type": "Question",
      "name": "How much funding can I get from the CSA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Canadian Space Agency (CSA) funding varies by initiative. Space Technology Development Program (STDP) contribution agreements typically range from $200,000 to $5 million depending on the TRL advancement."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be Controlled Goods certified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, for most defence and some space projects, you must be registered with the Controlled Goods Program (CGP) to access data and secure contracts."
      }
    },
    {
      "@type": "Question",
      "name": "Is aerospace funding repayable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends. SIF aerospace streams are often repayable loans. CSA STDP contributions are often non-repayable if they support lower TRL research, but may be repayable for near-commercial projects."
      }
    },
    {
      "@type": "Question",
      "name": "Can startups apply for defence contracts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. IDEaS is specifically designed to engage non-traditional defence partners, including startups and universities. You do not need to be a prime contractor to win an IDEaS challenge."
      }
    }
  ]
}

export default function CanadaAerospaceDefenceFundingGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-500/20 text-blue-100 border-blue-400/30 backdrop-blur-sm">
                ✈️ Aerospace & Defence Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Canada Aerospace & Defence Grants Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
                The comprehensive handbook for Canadian innovators in space, aviation, and defence.
                Secure funding from CSA, IDEaS, and SIF Aerospace streams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-900/50" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-slate-800/50 border-blue-400/30 text-blue-100 hover:bg-slate-800/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/canada-aerospace-defence-funding-guide">
                    Industry Insights
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-slate-600 gap-4">
              <span className="font-semibold text-slate-900 flex items-center shrink-0">
                <Rocket className="w-4 h-4 mr-2 text-blue-600" />
                Mission Systems:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> Key Programs</Link>
                <Link href="#timeline" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#strategy" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Shield className="w-3 h-3" /> Defence Strategy</Link>
                <Link href="#csa" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Satellite className="w-3 h-3" /> CSA Tips</Link>
                <Link href="#mistakes" className="hover:text-red-600 transition-colors flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Risks</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$5M+</div>
                  <div className="text-slate-600 text-sm font-medium uppercase tracking-wide">Typical CSA Grant</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">TRL 1-9</div>
                  <div className="text-slate-600 text-sm font-medium uppercase tracking-wide">Full Spectrum Funding</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-slate-700 mb-2">IDEaS</div>
                  <div className="text-slate-600 text-sm font-medium uppercase tracking-wide">Use Case Challenges</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">Stackable</div>
                  <div className="text-slate-600 text-sm font-medium uppercase tracking-wide">With SR&ED</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Programs Section */}
        <section id="programs" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Core Aerospace & Defence Programs</h2>

              <div className="space-y-8">
                {/* IDEaS */}
                <Card className="border-l-4 border-l-slate-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-8 h-8 text-slate-700" />
                        <CardTitle className="text-xl">IDEaS (Defence Innovation)</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-slate-300 text-slate-700">Application Driven</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The <strong>Innovation for Defence Excellence and Security (IDEaS)</strong> program issues specific "Challenges" (e.g., "Counter Drone Tech", "Arctic Surveillance").
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 bg-slate-100 p-4 rounded-lg text-sm">
                      <div>
                        <strong className="block text-slate-800 mb-2">Phase 1 (Concept):</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Up to $200,000</li>
                          <li>6-month duration</li>
                          <li>Proof of feasibility</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-slate-800 mb-2">Phase 2 (Prototype):</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Up to $1,000,000+</li>
                          <li>1-2 year duration</li>
                          <li>Working functional prototype</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CSA */}
                <Card className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Satellite className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">Canadian Space Agency (STDP)</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-blue-300 text-blue-700">Technology Development</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The <strong>Space Technology Development Program (STDP)</strong> funds R&D for future Canadian space missions. It is highly competitive and TRL-focused.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg text-sm">
                      <div>
                        <strong className="block text-blue-900 mb-2">Funding Scope:</strong>
                        <ul className="list-disc list-inside text-blue-800 space-y-1">
                          <li>Typical wins: $100k - $2M</li>
                          <li>Cost-sharing: 50-75%</li>
                          <li>Focus: Robotics, Optics, SatCom</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-blue-900 mb-2">Requirements:</strong>
                        <ul className="list-disc list-inside text-blue-800 space-y-1">
                          <li>Must advance TRL (e.g. 4 to 6)</li>
                          <li>Must align with Space Strategy</li>
                          <li>Strong commercial potential</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SIF Aerospace */}
                <Card className="border-l-4 border-l-indigo-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Plane className="w-8 h-8 text-indigo-600" />
                        <CardTitle className="text-xl">SIF Aerospace Stream</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-indigo-300 text-indigo-700">Large Scale</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The <strong>Strategic Innovation Fund (SIF)</strong> has specific streams for aerospace and aviation to support major manufacturing and green aviation projects.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Projects $10M+</Badge>
                      <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Net Zero Focus</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Timeline */}
        <section id="timeline" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Application Lifecycle</h2>

              <div className="relative border-l-2 border-slate-200 pl-8 space-y-12 ml-4 md:ml-0">

                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">TRL Assessment & Gap Analysis</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Before applying, you must rigorously define your Technology Readiness Level (TRL). CSA and DND judge you on *moving* the TRL needle.
                  </p>
                  <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <span className="text-xs font-mono text-slate-500 bg-slate-200 px-2 py-1 rounded">TIP</span>
                    <span className="text-sm text-slate-700 ml-2">Don't guess your TRL. Use the official NASA/CSA definitions. Over-estimating leads to rejection.</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Controlled Goods Registration</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    If your tech has military application (or high-grade encryption/space specs), you must register with the Controlled Goods Program (CGP) *before* you can even see full tender specs.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Proposal Defense</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Writing the proposal is just the start. DND/IDEaS often requires an oral defense or "shark tank" style presentation for shortlisted candidates.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section id="strategy" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Defence & Space Strategy</h2>
              <div className="grid md:grid-cols-2 gap-8">

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-slate-700" />
                      <CardTitle className="text-lg">Dual-Use Capability</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      The "Holy Grail" of aerospace funding is <strong>Dual-Use</strong>.
                      Show how your tech solves a military problem (IDEaS) <em>and</em> has a civilian commercial market (e.g., Arctic monitoring for sovereignty + environmental tracking).
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-blue-600" />
                      <CardTitle className="text-lg">The "Prime" Partnership</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      For SIF and larger CSA contracts, you often need to partner with an "Anchor Firm" (e.g., MDA, Thales, Lockheed Martin).
                      Being in their supply chain (ITB obligations) is a massive funding lever.
                    </p>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Critical Application Risks</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Compliance Failures:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 mr-2 shrink-0"></div>
                      <div>
                        <strong>ITAR Contamination:</strong>
                        <p className="text-sm text-slate-600">Failing to segregate US ITAR data from your Canadian development can disqualify you or cause legal nightmares.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 mr-2 shrink-0"></div>
                      <div>
                        <strong>Cyber Certification:</strong>
                        <p className="text-sm text-slate-600">New DND contracts require CyberSecure Canada certification. Lack of it is a showstopper.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-amber-700 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Strategic Failures:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 mr-2 shrink-0"></div>
                      <div>
                        <strong>"Science Project" Syndrome:</strong>
                        <p className="text-sm text-slate-600">CSA wants <em>missions</em>, not just science. If you can't show how your tech fits on a future satellite bus, you won't get funded.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 mr-2 shrink-0"></div>
                      <div>
                        <strong>Missing ITB Strategy:</strong>
                        <p className="text-sm text-slate-600">For large bids, failing to provide an Industrial & Technological Benefits (ITB) plan (offsetting value to Canada) is fatal.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">1. Do I need a security clearance?</h3>
                  <p className="text-slate-600 text-sm">For IDEaS and DND work, yes. Your company needs a Designated Organization Screening (DOS) or Facility Security Clearance (FSC). This can take months, so start early. Visit <Link href="https://www.tpsgc-pwgsc.gc.ca/esc-src/index-eng.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">PSPC Security</Link> for details.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">2. Can universities apply?</h3>
                  <p className="text-slate-600 text-sm">Yes, especially for CSA STDP and IDEaS. However, industry-led projects often have a clearer path to commercialization. University-only projects are typically lower TRL research.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">3. Are satellites considered "manufacturing"?</h3>
                  <p className="text-slate-600 text-sm">Yes. Satellite constellation production can qualify for manufacturing grants (SIF, CME) as well as space grants. Check the <Link href="/guides/canada-manufacturing-funding-guide" className="text-blue-600 hover:underline">Manufacturing Guide</Link> for more info.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">4. What is the IDEaS program?</h3>
                  <p className="text-slate-600 text-sm">IDEaS (Innovation for Defence Excellence and Security) is a DND program that funds solutions to specific defence challenges. It offers competitive projects (up to $200k for Phase 1, $1M+ for Phase 2) and Test Drives.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">5. How much funding can I get from the CSA?</h3>
                  <p className="text-slate-600 text-sm">Canadian Space Agency (CSA) funding varies. Space Technology Development Program (STDP) contribution agreements typically range from $200,000 to $5 million depending on the TRL advancement.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">6. Is aerospace funding repayable?</h3>
                  <p className="text-slate-600 text-sm">It depends. SIF aerospace streams are often repayable loans. CSA STDP contributions are often non-repayable if they support lower TRL research but may be repayable for near-commercial projects.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Related Funding Pathways</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-strategic-innovation-fund" className="group block h-full">
                  <div className="bg-slate-50 border hover:border-indigo-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-indigo-600 font-semibold mb-2">Big Projects</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-700 mb-2">Strategic Innovation Fund</h4>
                    <p className="text-sm text-slate-500 flex-grow">For aerospace projects over $10M.</p>
                    <div className="mt-3 text-xs text-indigo-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/sred-application-guide" className="group block h-full">
                  <div className="bg-slate-50 border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Tax Credits</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">SR&ED Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">Recover up to 35% of your R&D labor costs.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-irap-grants" className="group block h-full">
                  <div className="bg-slate-50 border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">R&D Grants</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">NRC IRAP</h4>
                    <p className="text-sm text-slate-500 flex-grow">Smaller, faster grants for tech development.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Mission Critical Funding Support</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Aerospace and defence applications are zero-fail environments. Our team includes former DND procurement offers and CSA evaluators.
            </p>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-900/50" asChild>
              <Link href="/contact?service=aerospace-expert-help">
                Deploy Expert Team
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
