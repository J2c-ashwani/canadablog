import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Target, DollarSign, AlertTriangle, Download, Brain, Code, Database, Sparkles, HelpCircle, ArrowRight, Laptop } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EEATBadge from '@/components/blog/EEATBadge';
import EligibleCheck from '@/components/blog/EligibleCheck';
import StickyTOC from '@/components/blog/StickyTOC';
import InlineCTA from '@/components/blog/InlineCTA';

export const metadata: Metadata = {
  title: "AI Funding Canada 2026 | Scale AI & CDAP Grants",
  description: "Complete guide to AI and digital adoption funding. Apply for Scale AI supercluster projects, CDAP digital transformation grants, and IRAP machine learning funding.",
  keywords: "AI funding Canada, Scale AI grants, CDAP application, machine learning grants, artificial intelligence funding, digital adoption grants",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/canada-digital-ai-funding-guide",
  },
  openGraph: {
    title: "AI Funding Canada 2026 | Scale AI & CDAP",
    description: "Step-by-step guide to securing up to $5M in AI funding and digital adoption grants.",
    url: "https://www.fsidigital.ca/guides/canada-digital-ai-funding-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Canada Digital Adoption Program (CDAP)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CDAP provides a $15,000 grant to hire a digital advisor to create a Digital Adoption Plan, followed by an interest-free loan of up to $100,000 to implement new technologies, including AI tools."
      }
    },
    {
      "@type": "Question",
      "name": "How does Scale AI funding work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scale AI reimburses up to 50% of eligible costs for collaborative AI projects focused on supply chains. Projects typically range from $1M to $5M+ and require a consortium of partners."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get funding for ChatGPT integration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, if it involves developing a proprietary business application (e.g., customer service automation) as part of a digital transformation plan (CDAP) or technical R&D (IRAP)."
      }
    },
    {
      "@type": "Question",
      "name": "Is AI software considered an eligible expense?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Licensing fees, subscription costs for AI platforms, and developer salaries are often eligible expenses under programs like CDAP and IRAP."
      }
    }
  ]
}

export default function CanadaDigitalAIFundingGuide() {
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
                🤖 AI & Digital Adoption
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Canada AI Grants Guide
              </h1>
              
              <div className="text-left mb-6 max-w-4xl mx-auto shadow-sm mt-6 relative z-20">
                 <ShortAnswerBox content="Canada Digital & AI Funding Guide — Funding opportunities for digital transformation and AI development projects." />
              </div>
              <div className="flex justify-center mb-8 relative z-20">
                 <div className="inline-block text-left bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl overflow-hidden">
                    <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-02-25" />
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-900/50" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-indigo-800/50 border-indigo-400/30 text-indigo-100 hover:bg-indigo-800/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/canada-digital-ai-funding-guide">
                    AI Strategy
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
        <div className="bg-white border-b border-indigo-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-indigo-900 gap-4">
              <span className="font-semibold text-indigo-900 flex items-center shrink-0">
                <Brain className="w-4 h-4 mr-2 text-indigo-600" />
                Innovation Track:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> Top Grants</Link>
                <Link href="#scale-ai" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><Database className="w-3 h-3" /> Scale AI</Link>
                <Link href="#cdap" className="hover:text-indigo-700 transition-colors flex items-center gap-1"><Laptop className="w-3 h-3" /> CDAP</Link>
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
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$5M+</div>
                  <div className="text-indigo-800 text-sm font-medium uppercase tracking-wide">Scale AI Max</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$100K</div>
                  <div className="text-indigo-800 text-sm font-medium uppercase tracking-wide">CDAP Loan (0%)</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50%</div>
                  <div className="text-indigo-800 text-sm font-medium uppercase tracking-wide">Cost Reimbursement</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-violet-700 mb-2">25+</div>
                  <div className="text-indigo-800 text-sm font-medium uppercase tracking-wide">AI Streams</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Programs Section */}
        <section id="programs" className="py-20 bg-indigo-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Top AI & Digital Funding Streams</h2>

              <div className="space-y-8">
                {/* Scale AI */}
                <Card id="scale-ai" className="border-l-4 border-l-indigo-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Brain className="w-8 h-8 text-indigo-600" />
                        <CardTitle className="text-xl">Scale AI Supercluster</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-indigo-300 text-indigo-700">Supply Chain AI</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Canada's dedicated AI Supercluster. Funds collaborative projects that apply AI to <strong>supply chains, logistics, and operations</strong>.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 bg-white border border-indigo-100 p-4 rounded-lg text-sm">
                      <div>
                        <strong className="block text-indigo-900 mb-2">The Offer:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Reimburse up to 50% eligible costs</li>
                          <li>Projects must be collaborative (multiple partners)</li>
                          <li>Focus on commercialization & scale</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-indigo-900 mb-2">Requirements:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Adopter + Solution Provider partnership</li>
                          <li>Incremental IP generated</li>
                          <li>Data sharing component</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CDAP */}
                <Card id="cdap" className="border-l-4 border-l-purple-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Laptop className="w-8 h-8 text-purple-600" />
                        <CardTitle className="text-xl">CDAP (Digital Adoption)</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-purple-300 text-purple-700">SME Adoption</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      For SMEs looking to modernize. Get a grant to plan your AI/Digital strategy, then an interest-free loan to buy the tech.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-purple-100 text-purple-800">$15K Advisor Grant</Badge>
                      <Badge className="bg-purple-100 text-purple-800">$100K 0% Interest Loan</Badge>
                      <Badge className="bg-purple-100 text-purple-800">$7,300 Hiring Subsidy</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* IRAP */}
                <Card className="border-l-4 border-l-green-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Code className="w-8 h-8 text-green-600" />
                        <CardTitle className="text-xl">NRC IRAP (AI R&D)</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-green-300 text-green-700">Technical Risk</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      For solving technical hurdles in AI development (e.g., training a new novel model structure).
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-xs text-green-800">
                      <strong>Key Difference:</strong> Unlike Scale AI (which funds deployment), IRAP funds the <em>development</em> of the technology itself.
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
              
        <div className="container mx-auto px-4 max-w-4xl my-12"><InlineCTA {...{
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
    }} /></div>
<h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">AI Project Lifecycle</h2>

              <div className="relative border-l-2 border-slate-200 pl-8 space-y-12 ml-4 md:ml-0">

                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Data Readiness Assessment</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Before applying for funding, you must prove you have the data. "We will collect data later" is a red flag. You need a data governance plan and sample datasets.
                  </p>
                  <div className="bg-indigo-50 p-4 rounded border border-indigo-200">
                    <span className="text-xs font-mono text-indigo-600 bg-indigo-100 px-2 py-1 rounded">TIP</span>
                    <span className="text-sm text-indigo-800 ml-2">For Scale AI, you need to show how multiple partners contribute/share data.</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Partner MOU</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    For superclusters, sign a Memorandum of Understanding (MOU) with your consortium partners (e.g., the factory implementing your AI).
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Project Submission</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Submit detailed technical architecture (Model types, infrastructure) and ROI calculations.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Model Training & Deployment</h3>
                  <p className="text-slate-600 text-sm">
                    Funding is released against milestones (e.g., "Model Training Complete", "Pilot Deployment", "Final Rollout").
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">AI Winning Strategies</h2>
              <div className="grid md:grid-cols-2 gap-8">

                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-indigo-600" />
                      <CardTitle className="text-lg">The "Adopter" Lead</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      Don't lead with the tech company. Lead with the <strong>industrial adopter</strong> (the customer). Funding agencies want to see demand pull, not technology push.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                      <CardTitle className="text-lg">IP Strategy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      Be clear on who owns the model vs who owns the weights vs who owns the data. Ambiguous IP agreements kill consortium deals.
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
                <HelpCircle className="w-6 h-6 text-indigo-600 mr-2" />
                AI Funding FAQs
              </h2>
              <div className="divide-y divide-indigo-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I hire foreign AI talent?</h3>
                  <p className="text-slate-600 text-sm">Generally, federal grants (IRAP, Scale AI) require the employees to be on Canadian payroll and often physically present in Canada.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Does CDAP pay for Microsoft Copilot fees?</h3>
                  <p className="text-slate-600 text-sm">The 0% loan can cover software subscriptions for the first 12 months as part of the implementation. The grant covers the <em>advisor</em> to tell you to buy it.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What about SR&ED for AI?</h3>
                  <p className="text-slate-600 text-sm">AI SR&ED is tricky. You must prove "technological uncertainty." Using standard libraries (PyTorch) isn't enough; you need to be improving the architecture or applying it in a novel, unproven way.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About AI Funding</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Is the CDAP loan still available?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes. The <a href="https://ised-isde.canada.ca/site/canada-digital-adoption-program/en" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">CDAP (Canada Digital Adoption Program)</a> "Boost Your Business Technology" stream is active. It offers a 0% interest loan of up to $100,000 with a 5-year repayment term.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Can I use ChatGPT for my project?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Simply using ChatGPT prompts is not considered "R&D" for IRAP or SR&ED. However, building a <strong>proprietary application</strong> that integrates LLMs via API to solve a unique business problem <em>is</em> eligible for CDAP digital adoption funding.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. What is the minimum project size?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    For Scale AI, projects typically need to be over $1M to be worth the administrative effort. For CDAP, you need to have at least $500k in annual revenue to qualify for the loan.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Do I need to be profitable?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No, but you must be <strong>solvent</strong>. Lenders (BDC for CDAP) will check that you aren't bankrupt, but pre-profit startups can often qualify if they have investor backing.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. Can I use funds for hardware?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    CDAP loans <strong>can</strong> be used for hardware (sensors, servers) if it's essential to the digital plan. IRAP generally covers <strong>labour</strong>, not capital equipment.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. How long does the approval take?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    CDAP grant approval is fast (2-4 weeks). The BDC loan portion takes another 4-6 weeks. Scale AI projects can take 3-6 months to negotiate.
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
                <Link href="/guides/apply-irap-grants" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">R&D</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">NRC IRAP</h4>
                    <p className="text-sm text-slate-500 flex-grow">Essential regarding technical AI risk funding.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/sred-application-guide" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Tax Credits</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">SR&ED Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">Recover 35% of your AI developer salaries.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/canada-cleantech-funding-guide" className="group block h-full">
                  <div className="bg-white border hover:border-teal-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-teal-600 font-semibold mb-2">Green AI</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-teal-700 mb-2">CleanTech Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">If your AI reduces energy usage, check this.</p>
                    <div className="mt-3 text-xs text-teal-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Accelerate Your AI Roadmap</h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Our team includes CDAP advisors and Scale AI grant writers. We help you structure the consortium and the data plan.
            </p>
            <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-900/50" asChild>
              <Link href="/contact?service=ai-expert-help">
                Get AI Expert Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
