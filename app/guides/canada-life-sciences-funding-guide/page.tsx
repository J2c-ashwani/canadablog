import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Target, DollarSign, AlertTriangle, Download, Microscope, Pill, Stethoscope, Dna, HelpCircle, ArrowRight, Activity } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Biotech & Life Sciences Grants Canada 2025 | Clinical Trials Funding",
  description: "Complete guide to life sciences funding. Apply for IRAP biotech grants, Clinical Trials Fund, and medical device commercialization support.",
  keywords: "life sciences grants Canada, biotech funding, clinical trials grants, medical device funding, health tech grants, biomanufacturing funding",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/canada-life-sciences-funding-guide",
  },
  openGraph: {
    title: "Biotech & Life Sciences Grants Canada 2025",
    description: "Step-by-step guide to securing funding for drug development, clinical trials, and medical devices.",
    url: "https://www.fsidigital.ca/guides/canada-life-sciences-funding-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What funding is available for Clinical Trials?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The CIHR Clinical Trials Fund and various broad health research programs support trials. Additionally, the Strategic Innovation Fund (SIF) can fund major biomanufacturing and late-stage clinical development projects."
      }
    },
    {
      "@type": "Question",
      "name": "Does IRAP fund drug development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, IRAP funds technical R&D projects, including preclinical studies and early-stage development of therapeutics, diagnostics, and medical devices, typically up to $500k."
      }
    },
    {
      "@type": "Question",
      "name": "Can I claim SR&ED for clinical trials?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Clinical trials are generally considered eligible R&D work for SR&ED tax credits, allowing you to recover up to 35% of eligible expenditures (salaries, materials, subcontracts)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the timeline for Health Canada approval?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It varies by risk class. Class I medical devices are fast (weeks), while Class III/IV devices and new drugs can take 6-12+ months for review after submission."
      }
    }
  ]
}

export default function CanadaLifeSciencesFundingGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-800 to-blue-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-cyan-500/20 text-cyan-100 border-cyan-400/30 backdrop-blur-sm">
                🧬 Life Sciences & Biotech
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Canada Life Sciences Funding
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-cyan-100 leading-relaxed text-pretty">
                The comprehensive handbook for health innovators.
                Secure IRAP biotech grants, clinical trial funding, and medical device support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg shadow-cyan-900/50" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-cyan-800/50 border-cyan-400/30 text-cyan-100 hover:bg-cyan-800/80 backdrop-blur-sm" asChild>
                  <Link href="/blog/biotech-grants-canada-guide">
                    Biotech Strategy
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-cyan-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-cyan-900 gap-4">
              <span className="font-semibold text-cyan-900 flex items-center shrink-0">
                <Dna className="w-4 h-4 mr-2 text-cyan-600" />
                Sector Focus:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-cyan-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> Top Grants</Link>
                <Link href="#clinical" className="hover:text-cyan-700 transition-colors flex items-center gap-1"><Stethoscope className="w-3 h-3" /> Trials</Link>
                <Link href="#device" className="hover:text-cyan-700 transition-colors flex items-center gap-1"><Activity className="w-3 h-3" /> MedTech</Link>
                <Link href="#process" className="hover:text-cyan-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#faq" className="hover:text-cyan-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-cyan-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-cyan-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">$10M+</div>
                  <div className="text-cyan-800 text-sm font-medium uppercase tracking-wide">Max Trial Grant</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">35%</div>
                  <div className="text-cyan-800 text-sm font-medium uppercase tracking-wide">SR&ED Recovery</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-teal-600 mb-2">Ph 1-3</div>
                  <div className="text-cyan-800 text-sm font-medium uppercase tracking-wide">Eligible Phases</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-indigo-700 mb-2">18+</div>
                  <div className="text-cyan-800 text-sm font-medium uppercase tracking-wide">Active Programs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Programs Section */}
        <section id="programs" className="py-20 bg-cyan-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Top Biotech & MedTech Funding</h2>

              <div className="space-y-8">
                {/* IRAP */}
                <Card className="border-l-4 border-l-cyan-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Microscope className="w-8 h-8 text-cyan-600" />
                        <CardTitle className="text-xl">NRC IRAP (Preclinical/R&D)</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-cyan-300 text-cyan-700">Early Stage</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The go-to initial funding for Canadian biotech startups. Funds technical R&D to overcome scientific uncertainty.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 bg-white border border-cyan-100 p-4 rounded-lg text-sm">
                      <div>
                        <strong className="block text-cyan-900 mb-2">The Offer:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Up to $500k per project</li>
                          <li>Non-Repayable (Grant)</li>
                          <li>Covers 60-80% of salary/contractor costs</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-cyan-900 mb-2">Best For:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Proof of concept studies</li>
                          <li>Prototyping medical devices</li>
                          <li>Initial validation data</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clinical Trials */}
                <Card id="clinical" className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Stethoscope className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">Clinical Trials Support</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-blue-300 text-blue-700">Clinical Phase</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Various streams (CIHR, SIF, Regional) exist to support the high cost of human clinical trials.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-blue-100 text-blue-800">Phase I (Safety)</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Phase II (Efficacy)</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Phase III</Badge>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-xs text-blue-800">
                      <strong>Key Note:</strong> Funding often requires partnering with Canadian research hospitals or institutes.
                    </div>
                  </CardContent>
                </Card>

                {/* Medical Devices */}
                <Card id="device" className="border-l-4 border-l-teal-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Activity className="w-8 h-8 text-teal-600" />
                        <CardTitle className="text-xl">Medical Device Commercialization</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-teal-300 text-teal-700">MedTech</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Funding to navigate the regulatory hurdle (MDEL, ISO 13485) and scale manufacturing.
                    </p>
                    <div className="flex gap-2 text-sm text-slate-700">
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-teal-500" /> Prototype Dev</span>
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-teal-500" /> Quality Systems</span>
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-teal-500" /> Market Access</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Development Timeline */}
        <section id="process" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Life Sciences Funding Lifecycle</h2>

              <div className="relative border-l-2 border-slate-200 pl-8 space-y-12 ml-4 md:ml-0">

                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Preclinical & Discovery</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    <strong>Funding Sources:</strong> IRAP, NSERC, SR&ED.
                    <br />Focus on validation data. Grant reviewers need to see "freedom to operate" (IP check) early on.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Regulatory Submission (CTA/MDEL)</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Before trials, you need Health Canada approval. Costs for regulatory consultants are often eligible under "export market access" grants if targeting FDA/CE as well.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Clinical Trials (Phase I/II)</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    <strong>Funding Sources:</strong> VC equity + SR&ED + Specific Health Funds.
                    <br />This is the "Valley of Death." Government grants are rarer here; tax credits (SR&ED) become your lifeline.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Market Approval & Scale</h3>
                  <p className="text-slate-600 text-sm">
                    <strong>Funding Sources:</strong> Strategic Innovation Fund (SIF), Regional Agencies.
                    <br />Focus shifts to biomanufacturing capacity and global sales.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-cyan-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Biotech Winning Strategies</h2>
              <div className="grid md:grid-cols-2 gap-8">

                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-cyan-600" />
                      <CardTitle className="text-lg">The "Regulatory Moat"</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      Don't just show the tech works. Show you know exactly what Health Canada/FDA requires. A clear regulatory roadmap instills confidence in funders.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-6 h-6 text-green-600" />
                      <CardTitle className="text-lg">SR&ED Maximization</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      Biotech has the highest SR&ED success rate. Ensure you are tracking "clinical uncertainties" as technological obstacles to maximize your claim.
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
                <HelpCircle className="w-6 h-6 text-cyan-600 mr-2" />
                Life Sciences FAQs
              </h2>
              <div className="divide-y divide-cyan-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Is software considered a medical device?</h3>
                  <p className="text-slate-600 text-sm">It can be. "Software as a Medical Device" (SaMD) requires regulatory approval if it diagnoses or treats conditions. Funding is available for this validation.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I use grant money for patent costs?</h3>
                  <p className="text-slate-600 text-sm">Some "Market Access" or "Export" grants cover IP legal fees for foreign filings. R&D grants (IRAP) typically do not cover IP legal costs directly.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What about natural health products?</h3>
                  <p className="text-slate-600 text-sm">Natural Health Products (NHPs) have a different regulatory pathway than drugs but are still eligible for agri-food or general innovation grants.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About Life Sciences Funding</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Do I need Health Canada approval first?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Not for early R&D funding (like IRAP). However, for clinical trial funding, you typically need your "No Objection Letter" (NOL) or Clinical Trial Application (CTA) approval from <a href="https://www.canada.ca/en/health-canada/services/drugs-health-products/drug-products/applications-submissions/guidance-documents/clinical-trials-human-subjects.html" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Health Canada</a> before funds are released.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. What is the Clinical Trials Fund (CTF)?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The CTF is part of Canada's Biomanufacturing and Life Sciences Strategy. It is administered by CIHR and funds the "clinical" portion of development, which is often the most expensive gap in the pipeline.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. Can I use money for IP legal fees?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Generally, no. Technical grants cover <strong>science</strong>, not lawyers. However, export-focused grants (like CanExport Innovation) may cover IP protection costs if they are required to enter a foreign market.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Does SR&ED apply to failed trials?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes! SR&ED rewards <strong>technological uncertainty</strong>, not commercial success. A failed clinical trial often proves that a hypothesis was incorrect, which is valid scientific knowledge and fully claimable.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. Is there funding for digital health apps?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes, if there is a technical hurdle (e.g., AI algorithms, encryption, hardware integration). If it is just a standard app content wrapper, it might not qualify for R&D grants but could qualify for the CDAP digital adoption grant.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. What about biomanufacturing?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The <a href="https://ised-isde.canada.ca/site/strategic-innovation-fund/en" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Strategic Innovation Fund (SIF)</a> has a specific stream for biomanufacturing to increase domestic capacity for vaccine and therapeutic production.
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
              <h3 className="text-xl font-bold text-slate-900 mb-6">Related Funding Pathways</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/sred-application-guide" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Tax Credits</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">SR&ED Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">Crucial for recovering clinical trial costs.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/nserc-research-grants-guide" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Academic</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">NSERC Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">Partner with universities for basic research.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-irap-grants" className="group block h-full">
                  <div className="bg-white border hover:border-cyan-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-cyan-600 font-semibold mb-2">R&D</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-cyan-700 mb-2">NRC IRAP</h4>
                    <p className="text-sm text-slate-500 flex-grow">The best starting point for biotech SMEs.</p>
                    <div className="mt-3 text-xs text-cyan-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-cyan-900 to-blue-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Commercialize Your Discovery</h2>
            <p className="text-lg text-cyan-100 mb-8 max-w-2xl mx-auto">
              From bench to bedside. Our experts help you navigate the complex funding landscape for life sciences.
            </p>
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg shadow-cyan-900/50" asChild>
              <Link href="/contact?service=lifesciences-expert-help">
                Get Biotech Funding Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
