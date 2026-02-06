import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Microscope, Dna, FlaskConical, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Stethoscope, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Biotech & Life Sciences Grants Canada 2026 | Funding Guide",
  description: "Complete 2026 guide to Canadian biotech funding. Access the Biomanufacturing Fund, Genome Canada grants, and clinical trial support.",
  keywords: "Canada biotech grants, life sciences funding, biomanufacturing strategy, Genome Canada, CIHR grants, health tech startups Canada",
}

export default function BiotechLifeSciencesGrantsGuide() {
  const faqData = [
    {
      question: "What is the 'Biomanufacturing Strategy'?",
      answer: "Post-COVID, Canada launched a $2.2 Billion strategy to rebuild domestic vaccine and therapeutic manufacturing. This is the largest pool of capital for scaling life sciences firms."
    },
    {
      question: "Does Genome Canada fund startups?",
      answer: "Yes, but usually through partnerships. They fund 'Large-Scale Applied Research Projects' (LSARP) where industry partners with academia to solve a problem using genomics."
    },
    {
      question: "Are there grants for Clinical Trials?",
      answer: "Yes. The 'Clinical Trials Fund' (via CIHR) helps de-risk the expensive Phase 1/2 stages. Often, this requires a hospital or university partner."
    },
    {
      question: "What about Medical Devices?",
      answer: "Medical device startups often fit better into IRAP (industrial R&D) or Regional Development Agency (RDA) scaling funds, rather than pure 'discovery' grants."
    },
    {
      question: "Is there funding for Regulatory Approval (FDA/Health Canada)?",
      answer: "CanExport Innovation can sometimes cover costs related to foreign regulatory compliance. However, domestic regulatory costs are usually considered 'business operations' and not covered by grants."
    },
    {
      question: "What is OBI (Ontario Bioscience Innovation)?",
      answer: "OBI (now OBIO) runs the 'CAAP' program, which provides capital and access to hospitals for testing early-stage health tech."
    },
    {
      question: "Can I use SR&ED for clinical trials?",
      answer: "Absolutely. Clinical trials are classic 'scientific uncertainty'. You can claim salaries, materials (drugs/testing kits), and subcontractor costs."
    },
    {
      question: "What is AdMare BioInnovations?",
      answer: "AdMare is an accelerator that provides expertise and infrastructure. They have an 'Executive Institute' and often co-develop IP with Canadian heavyweights."
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
        <section className="bg-gradient-to-br from-cyan-900 to-blue-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-cyan-500/20 text-cyan-100 border-cyan-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🧬 Canada's Life Sciences Boom
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Biotech Funding 2026: <span className="text-cyan-400">From Bench to Bedside</span>
              </h1>
              <p className="text-xl text-cyan-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                Canada is rebuilding its biomanufacturing capacity. Whether you are sequencing DNA or building medical devices, the <strong>$2.2 Billion Biomanufacturing Strategy</strong> is the headline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-cyan-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#biomanufacturing">
                    Biomanufacturing Fund
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-cyan-400/50 text-white hover:bg-cyan-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#genome-canada">
                    Genomics Funding
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The "Regulatory" Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <Stethoscope className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">The "Valley of Death": Clinical Trials</h3>
                    <p className="text-blue-800 mb-4">
                      Most biotech startups die between Pre-Clinical and Phase 2.
                    </p>
                    <p className="text-blue-800">
                      <strong>Strategy:</strong> Use <strong>IRAP</strong> for early R&D, then stack <strong>CIHR Clinical Trial Fund</strong> for Phase 1/2, then target the <strong>Strategic Innovation Fund (SIF)</strong> for Phase 3/Manufacturing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Biomanufacturing Strategy */}
        <section id="biomanufacturing" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. The Biomanufacturing Strategy</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Canada never wants to be short on vaccines again. This is "Strategic" funding, meaning huge amounts ($10M+) for fewer companies.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  <div className="bg-cyan-50 border border-cyan-100 p-8 rounded-2xl mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-cyan-900">Strategic Innovation Fund (SIF)</h3>
                      <Badge className="bg-cyan-600 text-white text-lg px-4 py-1">Stream 4</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Target Projects:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-cyan-500 mr-2" /> Vaccine Production Facilities</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-cyan-500 mr-2" /> Therapeutic Manufacturing</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-cyan-500 mr-2" /> Supply Chain (e.g., Lipids, Glass Vials)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Check Size:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 text-cyan-500 mr-2" /> Minimum ask: $10 Million</li>
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 text-cyan-500 mr-2" /> Often 25-40% of project costs</li>
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 text-cyan-500 mr-2" /> Repayable or Forgivable</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Genome Canada */}
        <section id="genome-canada" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Dna className="w-10 h-10 text-pink-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">2. Genome Canada</h2>
                  <p className="text-gray-600">The Power of Genomics</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <p className="text-gray-700 text-lg mb-8">
                  Genome Canada operates through regional centres (like Ontario Genomics, Genome BC). They run massive competitions.
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">GAPP (Genomic Applications Partnership Program)</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      This is the holy grail for industry-academic partnerships.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-pink-500 mr-3 mt-1" />
                        <div>
                          <strong className="text-gray-900">1:1:1 Match:</strong>
                          <p className="text-xs text-gray-600">1/3 Genome Canada, 1/3 Industry User, 1/3 Other (Province/Uni).</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-pink-500 mr-3 mt-1" />
                        <div>
                          <strong className="text-gray-900">Commercial Focus:</strong>
                          <p className="text-xs text-gray-600">Must have a clear "line of sight" to a product near the end of the project.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-100">
                    <h4 className="font-bold text-pink-900 mb-2">Regional Centres:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <span>• Genome BC</span>
                      <span>• Genome Alberta</span>
                      <span>• Genome Prairie</span>
                      <span>• Ontario Genomics</span>
                      <span>• Génome Québec</span>
                      <span>• Genome Atlantic</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Specialized Institutes (Stem Cell / AdMare) */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <FlaskConical className="w-10 h-10 text-purple-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">3. The Niche Funds</h2>
              </div>
              <p className="text-lg text-gray-600 mb-10 max-w-3xl">
                For highly specific science, look to the Networks of Centres of Excellence (NCE) successors.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader><CardTitle className="text-lg">Stem Cell Network</CardTitle></CardHeader>
                  <CardContent>
                    <p className="font-bold text-purple-700 text-lg mb-2">Regenerative Med</p>
                    <p className="text-sm text-gray-600">Grants for translating stem cell research into clinical applications.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">AdMare BioInnovations</CardTitle></CardHeader>
                  <CardContent>
                    <p className="font-bold text-purple-700 text-lg mb-2">Drug Discovery</p>
                    <p className="text-sm text-gray-600">Provides wet-lab space, capital, and expertise to scale therapeutic companies.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">CQDM</CardTitle></CardHeader>
                  <CardContent>
                    <p className="font-bold text-purple-700 text-lg mb-2">Biopharma</p>
                    <p className="text-sm text-gray-600">Quebec-based consortium that funds collaborative drug research.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Text Content - SEO & Authority */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg prose-cyan text-gray-700">
              <h2>The Complete Guide to Life Sciences Funding in Canada</h2>
              <p>
                Canada has a storied history in life sciences—from the discovery of Insulin to the lipid nanoparticles behind the COVID-19 vaccines. However, for a new founder, the ecosystem can feel fragmented. Unlike the US, where the NIH is a monolith, Canadian funding is "federated" across dozens of agencies.
              </p>
              <p>
                In this deep dive, we will explain how to navigate the "Valley of Death" (Phase 1/2 Clinical Trials) using the <strong>Biomanufacturing Strategy</strong>, <strong>Genome Canada</strong>, and <strong>IRAP</strong>.
              </p>

              <h3>The "Biomanufacturing Strategy" (2021-2028)</h3>
              <p>
                Following the pandemic, the federal government realized Canada's lack of domestic vaccine production was a national security risk. They responded with a <strong>$2.2 Billion</strong> war chest known as the Biomanufacturing and Life Sciences Strategy (BLSS).
              </p>
              <p>
                This is not just for vaccines. It covers:
              </p>
              <ul>
                <li><strong>Therapeutics:</strong> New drugs (small molecule or biologics) for cancer, diabetes, etc.</li>
                <li><strong>Diagnostics:</strong> Rapid testing platforms.</li>
                <li><strong>Supply Chain:</strong> Companies making the glass vials, lipids, or bioreactors needed by the big players.</li>
              </ul>
              <p>
                <strong>How to Apply:</strong> You don't apply to the "Strategy". You apply to the <strong>Strategic Innovation Fund (SIF) - Stream 4</strong>. This is for projects >$10 Million. If you are smaller, you apply to the Regional Development Agencies (RDAs) like FedDev or PrairiesCan, which have received "carve-outs" from this fund to support smaller biotech scale-ups.
              </p>

              <h3>Surviving the "Valley of Death": Clinical Trials</h3>
              <p>
                The hardest funding gap for any Canadian biotech is Phase 1 and Phase 2 clinical trials. VCs often want to see Phase 2 data before investing series A/B, but getting that data costs $5M+.
              </p>
              <h4>1. The CIHR Clinical Trials Fund (CTF)</h4>
              <p>
                The Canadian Institutes of Health Research (CIHR) launched a specific fund to de-risk this. However, it is academic-heavy. You almost <em>must</em> partner with a hospital or university research institute.
              </p>
              <p>
                <strong>Strategy:</strong> Don't try to run the trial yourself. Partner with a "Network" like the <strong>Canadian Cancer Trials Group (CCTG)</strong> or <strong>Primary Care Research Network</strong>. They apply for the funding; you provide the IP.
              </p>

              <h4>2. SR&ED for Clinical Trials</h4>
              <p>
                Many founders forget that Clinical Trials are 100% eligible for SR&ED tax credits.
              </p>
              <ul>
                <li><strong>Salaries:</strong> The doctors and nurses monitoring the trial (if they are your employees).</li>
                <li><strong>Materials:</strong> The drugs/devices consumed during testing.</li>
                <li><strong>Subcontractors:</strong> The CRO (Contract Research Organization) you hire to manage the data. (Claimable at 80%).</li>
              </ul>
              <p>
                If you are a Canadian-controlled private corporation (CCPC), you get 35% of these costs back as a <strong>cash refund</strong>. This effectively discounts your clinical trial by a third.
              </p>

              <h3>Genome Canada: The GAPP</h3>
              <p>
                If your technology involves Omics (Genomics, Proteomics, Metabolomics), <strong>Genome Canada</strong> is your best friend. Their flagship program for industry is the <strong>Genomic Applications Partnership Program (GAPP)</strong>.
              </p>
              <p>
                <strong>The 1:1:1 Model:</strong> GAPP projects are massive ($2M - $6M). The funding model is usually:
              </p>
              <ul>
                <li>1/3 from Genome Canada (Grant).</li>
                <li>1/3 from the "User" (You, the company).</li>
                <li>1/3 from Co-funders (Provincial agencies, other partners).</li>
              </ul>
              <p>
                This allows you to leverage your R&D budget 3x. For every $1 you spend, $2 comes from the system. The catch? It is slow. The application process acts in "Rounds" and can take 6-12 months. It is not for quick runway extension; it is for long-term strategic R&D.
              </p>

              <h3>Regional Hubs Matter</h3>
              <p>
                Biotech is highly clustered in Canada. You should physically locate your startup where the money is:
              </p>
              <ul>
                <li><strong>Vancouver (AdMare usually based here):</strong> Lipid nanoparticles, antibodies, regenerative med.</li>
                <li><strong>Toronto/Hamilton (MaRS/JLABS):</strong> Digital health, oncology, medical devices.</li>
                <li><strong>Montreal (CQDM/Medteq):</strong> AI for drug discovery, neurology, vaccines.</li>
              </ul>
              <p>
                Each province has "topping up" grants (e.g., OBIO in Ontario) that are only available to residents. Choosing your HQ is a strategic financial decision.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed FAQ Section */}
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                      <HelpCircle className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-cyan-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Scale with SIF</h2>
              <p className="text-xl text-cyan-100 mb-10">
                If you are ready for a $10M+ project, the Strategic Innovation Fund is your next step.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-cyan-900 hover:bg-cyan-50 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="https://ised-isde.canada.ca/site/strategic-innovation-fund/en" target="_blank" rel="noopener noreferrer">
                    <Microscope className="w-5 h-5 mr-2" />
                    Visit SIF Website
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-100 hover:bg-cyan-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/canada-innovation-research-development-grants-guide">
                    Explore R&D Tax Credits
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
