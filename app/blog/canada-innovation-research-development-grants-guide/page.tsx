import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Microscope, Cpu, FlaskConical, Building, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, FileText, Users, Calculator, Scale, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada R&D Grants 2026 | SR&ED & IRAP Funding Guide",
  description: "Complete 2026 guide to Canadian R&D funding. Major SR&ED update (limit doubled to $6M), NRC IRAP grants, and how to stack funding to cover 80% of dev & research costs.",
  keywords: "SR&ED tax credit 2026, NRC IRAP grants, Canada innovation funding, R&D grants canada, SRED refund rates, research and development tax credits",
}

export default function CanadaInnovationGrantsGuide() {
  const faqData = [
    {
      question: "What is the new SR&ED limit for 2026?",
      answer: "Major Update: The expenditure limit for the enhanced 35% refundable tax credit has effectively doubled from $3 million to $6 million for tax years starting after Dec 2024. This allows scaling tech firms to claim significantly more cash back."
    },
    {
      question: "What is the difference between IRAP and SR&ED?",
      answer: "Timing is the key difference. IRAP is a 'Grant' (Contribution) that pays you monthly *while* you do the work (improving cash flow). SR&ED is a 'Tax Credit' that pays you a lump sum *after* your fiscal year ends (retroactive)."
    },
    {
      question: "Can I claim both IRAP and SR&ED?",
      answer: "Yes, but you cannot 'double dip'. You must subtract the IRAP grant amount from your SR&ED eligible expenses. However, using both is still the optimal strategy: IRAP funds the project now, SR&ED tops up the refund later."
    },
    {
      question: "Does software development count as R&D?",
      answer: "Yes, IF there is 'Technical Uncertainty'. Building a standard CRUD app or website is not SR&ED. Developing a novel algorithm, resolving a systemic database bottleneck, or creating a new encryption method often is."
    },
    {
      question: "How long does it take to get the money?",
      answer: "IRAP: Approval takes 1-3 months, then monthly claims are paid in weeks. SR&ED: Processing takes 2-6 months *after* you file your taxes. It is a slower, but guaranteed, mechanism."
    },
    {
      question: "Can I claim SR&ED if I fail?",
      answer: "Yes! In fact, failure often proves there was 'Technical Uncertainty'. If the solution was obvious and you succeeded easily, it might NOT be SR&ED. Documenting your failures is key evidence."
    },
    {
      question: "What expenses are eligible?",
      answer: "1. Salaries (T4) of technical staff (Developers, Engineers). 2. Subcontractors (Canadians only). 3. Materials consumed or transformed. 4. Overhead (Proxy method, usually 55% of salaries)."
    },
    {
      question: "Is marketing eligible for SR&ED?",
      answer: "No. Market research, sales, routine data collection, and style changes are strictly excluded. The work must be 'Scientific' or 'Technological' in nature."
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
        <section className="bg-gradient-to-br from-violet-900 to-fuchsia-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-fuchsia-500/20 text-fuchsia-100 border-fuchsia-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🔬 Innovation Economy 2026
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Canada R&D Funding: <span className="text-fuchsia-400">The Power of "The Stack"</span>
              </h1>
              <p className="text-xl text-fuchsia-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                Canada has one of the world's most generous R&D funding ecosystems. Learn how smart founders use <strong>IRAP</strong> for upfront cash and the upgraded <strong>SR&ED (now $6M limit)</strong> for backend refunds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-violet-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#sred-masterclass">
                    New SR&ED Rules ($6M)
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-fuchsia-400/50 text-white hover:bg-fuchsia-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#irap-grants">
                    IRAP Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The 2026 Update Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-violet-50 border-l-4 border-violet-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <Lightbulb className="w-8 h-8 text-violet-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-violet-900 mb-2">2026 Alert: SR&ED Limit Doubled</h3>
                    <p className="text-violet-800 mb-4">
                      Historically, the enhanced 35% refund was capped at $3 million of expenditures. <strong>This cap has been raised to $6 million</strong>.
                    </p>
                    <p className="text-violet-800">
                      <strong>Impact:</strong> Mid-sized tech companies (CCPCs) can now get up to <strong>$2.1 Million</strong> in cash refunds annually, rather than being capped at ~$1M.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About R&D Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#sred-masterclass" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-violet-700">What is the new SR&ED limit?</h3>
                  <p className="text-sm text-gray-600 mt-1">Doubled to $6M for 2026.</p>
                </a>
                <a href="#irap-grants" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-violet-700">What is the difference between IRAP and SR&ED?</h3>
                  <p className="text-sm text-gray-600 mt-1">Upfront grant vs. retroactive tax credit.</p>
                </a>
                <a href="#stack" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-violet-700">Can I stack IRAP and SR&ED?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, optimizing for ~88% coverage.</p>
                </a>
                <a href="#timeline" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-violet-700">How long does the refund take?</h3>
                  <p className="text-sm text-gray-600 mt-1">2 weeks to 6 months depending on program.</p>
                </a>
                <a href="#faq" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-violet-700">Does software count as R&D?</h3>
                  <p className="text-sm text-gray-600 mt-1">Only if there is technical uncertainty.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: SR&ED Masterclass */}
        <section id="sred-masterclass" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. SR&ED Masterclass</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Scientific Research and Experimental Development (SR&ED) is an entitlement, not a competition. If you qualify, you get the money. But *do* you qualify?
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  {/* The "Why" Test */}
                  <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm mb-8">
                    <h3 className="font-bold text-2xl text-violet-900 mb-6">The "Why" Test (Technical Uncertainty)</h3>
                    <p className="text-gray-700 mb-6">
                      This is where 90% of claims fail audit. You must prove that at the outset, you <strong>did not know</strong> if the project was technically possible, or how to achieve it.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-red-50 p-4 rounded border border-red-100">
                        <h5 className="font-bold text-red-800 mb-2">❌ Standard Development</h5>
                        <p className="text-sm text-gray-600 mb-2">"We built a React website with a MongoDB backend."</p>
                        <p className="text-xs text-red-600 font-bold">Why it fails: Standard libraries, known patterns, no unknown obstacles.</p>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded border border-emerald-100">
                        <h5 className="font-bold text-emerald-800 mb-2">✅ Experimental Development</h5>
                        <p className="text-sm text-gray-600 mb-2">"We built a custom sharding algorithm because MongoDB failed at our specific write-throughput scale."</p>
                        <p className="text-xs text-emerald-600 font-bold">Why it wins: Standard tools failed. You had to invent a solution.</p>
                      </div>
                    </div>
                  </div>

                  {/* Refund Rates */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-violet-100 bg-violet-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg text-violet-900">Federal Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-violet-700 mb-2">35% Refundable</div>
                        <p className="text-sm text-gray-600 mb-4">For Canadian-Controlled Private Corps (CCPCs) on first $6M.</p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-violet-600 mr-2" /> Cash Cheque (Not just tax credit)</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-violet-600 mr-2" /> Covers Salaries & Materials</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-pink-100 bg-pink-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg text-pink-900">Provincial Top-Up</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-pink-700 mb-2">+10% to 30%</div>
                        <p className="text-sm text-gray-600 mb-4">Most provinces reduce your R&D cost further.</p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-pink-600 mr-2" /> Ontario (OITC): +8% Refundable</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-pink-600 mr-2" /> BC: +10% Credit</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-pink-600 mr-2" /> Quebec: Up to 30% (Best in Canada)</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: NRC IRAP */}
        <section id="irap-grants" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-12">
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <Microscope className="w-10 h-10 text-orange-600 mr-4" />
                    <h2 className="text-3xl font-bold text-gray-900">2. NRC IRAP (The Accelerator)</h2>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 mb-6 px-3 py-1">Discretionary Grant</Badge>
                  <p className="text-lg text-gray-700 mb-6">
                    While SR&ED is for everyone, IRAP is for the "Chosen Few". An Industrial Technology Advisor (ITA) must vet your project. If they like it, they fund it <strong>upfront</strong>.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                      <DollarSign className="w-6 h-6 text-orange-500 mr-4 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900">Cash Flow Friendly</h4>
                        <p className="text-sm text-gray-600">IRAP pays monthly. You don't have to wait 18 months for a tax return. This is critical for startups burning cash.</p>
                      </div>
                    </div>
                    <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                      <Target className="w-6 h-6 text-orange-500 mr-4 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900">Coverage Rates</h4>
                        <p className="text-sm text-gray-600">Typically covers <strong>80% of internal labour salaries</strong> and <strong>50% of contractor costs</strong> for the project duration.</p>
                      </div>
                    </div>
                    <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                      <Users className="w-6 h-6 text-orange-500 mr-4 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900">Youth Employment Program (YEP)</h4>
                        <p className="text-sm text-gray-600">A special IRAP stream giving up to $30,000 to hire a recent science/tech graduate.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/3">
                  <div className="bg-orange-900 text-white p-8 rounded-xl">
                    <h4 className="font-bold text-xl mb-4">The "ITA" Gatekeeper</h4>
                    <p className="text-orange-200 text-sm mb-6">
                      You cannot apply for IRAP on a website. You must call 1-877-994-4727 and request a meeting with an Industrial Technology Advisor (ITA).
                    </p>
                    <div className="bg-orange-800 p-4 rounded border border-orange-700">
                      <h5 className="font-bold text-sm mb-2 text-white">Pitching your ITA:</h5>
                      <ul className="space-y-2 text-xs text-orange-100">
                        <li>• Focus on Technical Innovation (not just sales).</li>
                        <li>• Use terms like "De-risking technology".</li>
                        <li>• Show you create Canadian jobs.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Stack Strategy */}
        <section id="stack" className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">The "Double Dip" Strategy (Stacking)</h2>
              <div className="bg-gray-900 text-gray-300 rounded-2xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <p className="text-lg mb-6">
                      Technically, you cannot get funded twice for the same dollar. If IRAP pays $80k of a $100k salary, you can only claim SR&ED on the remaining $20k.
                    </p>
                    <p className="text-lg mb-6 font-bold text-white">
                      BUT... Using both maximizes your net benefit.
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span>Developer Salary:</span>
                        <span className="text-white">$100,000</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-orange-400">Less: IRAP Grant (80%)</span>
                        <span className="text-orange-400">-$80,000</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span>Net Cost to You:</span>
                        <span className="text-white">$20,000</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-violet-400">Less: SR&ED on remaining $20k (~40%)</span>
                        <span className="text-violet-400">-$8,000</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold pt-2">
                        <span className="text-emerald-400">Final Cost:</span>
                        <span className="text-emerald-400">$12,000</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center">
                    <h4 className="text-2xl font-bold text-white mb-2">12 Cents on the Dollar</h4>
                    <p className="text-gray-400 mb-6">
                      By stacking IRAP and SR&ED, you can effectively employ top-tier R&D talent for ~12% of their actual salary.
                    </p>
                    <div className="bg-gray-700 p-4 rounded text-left">
                      <p className="text-xs text-gray-300 mb-2"><strong>Why this matters:</strong></p>
                      <p className="text-sm text-gray-200">
                        It de-risks innovation. You can afford to fail when the government pays 88% of the cost.
                      </p>
                    </div>
                    <div className="mt-8">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                        <Link href="/contact?service=rd-strategy-session">
                          <Calculator className="w-5 h-5 mr-2" />
                          Plan My R&D Stack
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Refund Flow Chart */}
        <section id="timeline" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">The Refund Timeline</h2>
              <div className="relative border-l-4 border-violet-200 ml-6 space-y-12">
                <div className="relative pl-8">
                  <div className="absolute -left-3.5 top-1 bg-violet-600 w-6 h-6 rounded-full border-4 border-white"></div>
                  <h4 className="font-bold text-gray-900">Fiscal Year End</h4>
                  <p className="text-gray-600">Your accountant prepares your T2 Corporate Tax Return.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute -left-3.5 top-1 bg-violet-600 w-6 h-6 rounded-full border-4 border-white"></div>
                  <h4 className="font-bold text-gray-900">Technical Writing</h4>
                  <p className="text-gray-600">You write the "Technical Narrative" explaining the uncertainty and advancement.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute -left-3.5 top-1 bg-violet-600 w-6 h-6 rounded-full border-4 border-white"></div>
                  <h4 className="font-bold text-gray-900">Submission (T661 Form)</h4>
                  <p className="text-gray-600">You attach the T661 to your tax return. (Deadline: 18 months after year end).</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute -left-3.5 top-1 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white"></div>
                  <h4 className="font-bold text-gray-900">Direct Deposit</h4>
                  <p className="text-gray-600">CRA processes the claim. Cheque arrives in your bank (2-6 months typically).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Text Content - SEO & Authority */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg prose-indigo text-gray-700">
              <h2>The T661 Masterclass: How to Write a Winning Narrative</h2>
              <p>
                The <strong>T661 Form</strong> is the heart of your SR&ED claim. Specifically, "Part 2: Project Information". This is where you must write a technical essay (approx. 1400 words) answering three questions.
              </p>
              <p>
                <strong>Warning:</strong> Most founders fail here because they write about "Business Success" ("We increased sales by 20%"). The CRA does not care about sales. They care about <em>Technical Failure</em>.
              </p>

              <h3>Question 1: Scientific or Technological Uncertainty</h3>
              <p>
                You must describe the technical problems you faced that could not be solved by standard practice.
              </p>
              <ul>
                <li><strong>Bad:</strong> "We needed to build a faster database." (This is a goal, not an uncertainty).</li>
                <li><strong>Good:</strong> "We attempted to shard our PostgreSQL database, but standard horizontal partitioning failed due to cross-shard join latency exceeding 200ms. We were uncertain if a custom middleware layer could route queries efficiently enough to meet our SLA."</li>
              </ul>

              <h3>Question 2: Work Performed</h3>
              <p>
                Describe the experiments, testing, and analysis you did to overcome the uncertainty.
              </p>
              <ul>
                <li><strong>Focus on the Iterations:</strong> "In Experiment A, we tried X, and it failed (System crashed). In Experiment B, we modified the cache coherence protocol, and latency dropped by 10% (Partial Success). In Experiment C...."</li>
                <li><strong>Logs & Git Commits:</strong> Your technical narrative should be backed by time-stamped logs (Git commit history, Jira tickets, Lab notebooks). If you are audited, the CRA will ask for these.</li>
              </ul>

              <h3>Question 3: Technological Advancement</h3>
              <p>
                What new knowledge did you gain? This does not mean you "Succeeded". It means you <em>learned</em>.
              </p>
              <p>
                "We discovered that using a bloom filter in the routing layer reduced load by 40%, a technique not documented in standard PostgreSQL manuals for this specific use case."
              </p>

              <h2>Sector Specific Examples</h2>

              <h3>1. The Software "CRUD" Trap</h3>
              <p>
                <strong>The Trap:</strong> Building a standard tailored software application (e.g., a CRM for dentists) is almost never SR&ED. Using existing APIs to glue together features is "Standard Practice."
              </p>
              <p>
                <strong>The Exception:</strong> If you are building a CRM that uses a novel AI algorithm to predict patient cancellations, and existing AI models failed to handle the sparse data, <em>that algorithm integration</em> is SR&ED.
              </p>

              <h3>2. Manufacturing: The "Trial Run"</h3>
              <p>
                <strong>The Scenario:</strong> You are a plastics manufacturer. You buy a new injection molding machine.
              </p>
              <p>
                <strong>Is it SR&ED?</strong> NO. Buying the machine is capital expeniture (CapEx).
              </p>
              <p>
                <strong>The Twist:</strong> You try to use a new biodegradable polymer in the machine. It clogs. You spend 6 months modifying the screw design and heating profile to make the new material flow. <strong>All that time (and the wasted material) is SR&ED.</strong>
              </p>

              <h3>3. Agriculture (AgTech)</h3>
              <p>
                <strong>The Scenario:</strong> A farmer tests a new fertilizer.
              </p>
              <p>
                <strong>Is it SR&ED?</strong> Maybe. If it is just "A vs B" testing, probably not. But if you are developing a new robotic harvesting arm and you have to write custom vision code to distinguish between a green tomato and a red one in variable lighting conditions, that IS SR&ED.
              </p>

              <h2>The "Patent Box" (Future Outlook)</h2>
              <p>
                The Canadian government is currently consulting on a "Patent Box" regime. This would lower the corporate tax rate on income derived from Intellectual Property (IP) developed in Canada.
              </p>
              <p>
                <strong>Why this matters:</strong> Currently, SR&ED helps you <em>build</em> the IP (Cost side). A Patent Box would help you <em>profit</em> from the IP (Revenue side). For 2026, keep a close eye on the federal budget for this announcement.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                      <HelpCircle className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-red-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-red-900 mb-6">SR&ED Claim Killers</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-l-4 border-red-500"><CardContent className="pt-4"><h3 className="font-bold text-red-700">No Contemporaneous Docs</h3><p className="text-sm text-gray-600">Git logs and Jira tickets must exist FROM THE TIME of the work. Backfilled docs get rejected in audit.</p></CardContent></Card>
                <Card className="border-l-4 border-red-500"><CardContent className="pt-4"><h3 className="font-bold text-red-700">Claiming US Contractor Fees</h3><p className="text-sm text-gray-600">Only Canadian-resident subcontractors are eligible. Offshore developers are 100% excluded.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore More Funding Options</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/canada/ontario" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-blue-600 mr-3" /><span>Ontario Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/british-columbia" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Target className="w-5 h-5 text-emerald-600 mr-3" /><span>BC Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/alberta" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Award className="w-5 h-5 text-orange-600 mr-3" /><span>Alberta Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/quebec" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Briefcase className="w-5 h-5 text-purple-600 mr-3" /><span>Quebec Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Shield className="w-5 h-5 text-red-600 mr-3" /><span>All Provincial Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related R&D Funding</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/blog/canada-hiring-training-grants-guide" className="px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-700 font-medium transition-colors">
                Hiring Grants (Non-R&D)
              </Link>
              <Link href="/blog/canada-technology-adoption-grants-guide" className="px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-700 font-medium transition-colors">
                Tech Adoption (CDAP Alternatives)
              </Link>
              <Link href="/blog/clean-tech-energy-grants" className="px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-700 font-medium transition-colors">
                Clean Tech Specifics
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Need an R&D Tax Credit Consultant?</p>
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white font-bold" asChild>
              <Link href="/contact?service=sred-audit">
                Get a Free Claim Assessment
              </Link>
            </Button>
          </div>
        </section>

        <Footer />
      </div >
    </>
  )
}
