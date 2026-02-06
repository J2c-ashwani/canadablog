import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Code, Cpu, Cloud, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Terminal, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SaaS & Software Startup Grants Canada 2026 | Non-Dilutive Funding",
  description: "Complete 2026 guide to Canadian software grants. Learn how to qualify for IRAP (vs standard CRUD apps), get BDC recurring revenue loans, and use hiring subsidies.",
  keywords: "Canada software grants, SaaS startup funding, IRAP for software, BDC tech loan, startup grants Canada, SR&ED for SaaS",
}

export default function SoftwareSaaSGrantsGuide() {
  const faqData = [
    {
      question: "Are there grants for building a mobile app?",
      answer: "Generally, no. If you are building a standard e-commerce or verified directory app (CRUD), there are no R&D grants. Funding exists if you are solving 'Technical Uncertainty' (new algorithms, encryption, AI)."
    },
    {
      question: "What is the BDC 'recurring revenue' loan?",
      answer: "It is a specialized loan for SaaS companies with at least $500k ARR. BDC lends against your monthly recurring revenue (MRR) instead of physical assets like buildings."
    },
    {
      question: "Can I use SR&ED for software development?",
      answer: "Yes, BUT only for the 'experimental' portion. Routine bug fixing, UI/UX design, and standard API integrations are NOT eligible. Creating a custom query optimizer? Likely eligible."
    },
    {
      question: "Are there grants for hiring developers?",
      answer: "Yes. The 'Digital Skills for Youth' (DS4Y) and Student Work Placement Program (SWPP) are massive. You can get up to $7,500 per semester for hiring a CS student."
    },
    {
      question: "Do accelerators give money?",
      answer: "Some do. 'Investment' accelerators like Techstars or CDL (Creative Destruction Lab) often facilitate angel investment, but they are not 'grants'. They take equity."
    },
    {
      question: "What qualifies as 'Technical Uncertainty'?",
      answer: "If a standard developer could solve your problem by reading documentation or StackOverflow, it is NOT uncertainty. If you have to test, fail, and iterate on a novel architecture, it IS uncertainty."
    },
    {
      question: "Is there funding for marketing SaaS?",
      answer: "CanExport SMEs can fund up to $50,000 of your international digital marketing (SEO, Ads directed at US/EU customers). You cannot use it for Canadian marketing."
    },
    {
      question: "What is C100?",
      answer: "C100 is a non-profit association of Canadians in Silicon Valley. They run 'Fellows' programs that connect Canadian founders with US VCs. It is networking capital, not grant capital."
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
        <section className="bg-gradient-to-br from-indigo-900 to-violet-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-indigo-500/20 text-indigo-100 border-indigo-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                💻 Non-Dilutive SaaS Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Software Startup Grants: <span className="text-indigo-400">Scaling Without Dilution</span>
              </h1>
              <p className="text-xl text-indigo-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                In 2026, you don't need to give up 20% of your company to a VC just to hire your first engineer. Learn how to stack <strong>IRAP</strong>, <strong>SR&ED</strong>, and <strong>BDC Revenue Loans</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-indigo-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#hiring-grants">
                    Hire Devs ($7k subsidy)
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-indigo-400/50 text-white hover:bg-indigo-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#technical-uncertainty">
                    IRAP Eligibility
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The "App Myth" Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <Lightbulb className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-orange-900 mb-2">Hard Truth: "Just an App" doesn't get Grants</h3>
                    <p className="text-orange-800 mb-4">
                      Government R&D grants (IRAP, SR&ED) do <strong>NOT</strong> fund standard apps (e.g., "Uber for Dog Walking").
                    </p>
                    <p className="text-orange-800">
                      <strong>The Rule:</strong> You must be solving a problem where the solution is not technically obvious. If you are just connecting APIs, you need <strong>Sales Funding</strong> (Loans), not R&D Funding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Hiring Grants */}
        <section id="hiring-grants" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Hiring Developers for Cheap</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  The biggest cost in SaaS is talent. Canada subsidizes this heavily.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-indigo-100 bg-indigo-50/50">
                  <CardHeader><CardTitle className="text-indigo-900">SWPP (Student Work Placement)</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-indigo-700 mb-2">$5k - $7k</div>
                    <p className="text-sm text-gray-600 mb-4">Per student, per semester. You can hire the same student multiple times.</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-indigo-600 mr-2" /> Delivery Partner: ICTC (Wil)</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-indigo-600 mr-2" /> Delivery Partner: Technation</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-indigo-100 bg-indigo-50/50">
                  <CardHeader><CardTitle className="text-indigo-900">DS4Y (Digital Skills for Youth)</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-indigo-700 mb-2">Up to $15,000</div>
                    <p className="text-sm text-gray-600 mb-4">To hire a recent grad (under 30) for a full-time digital role.</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-indigo-600 mr-2" /> Covers wages + training</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-indigo-600 mr-2" /> Often competitive rounds</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Technical Uncertainty (IRAP/SR&ED) */}
        <section id="technical-uncertainty" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Code className="w-10 h-10 text-indigo-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">2. The "Technical Uncertainty" Test</h2>
                  <p className="text-gray-600">How to unlock IRAP and SR&ED</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">NOT Eligible (Standard Dev)</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-3 mt-1" />
                        <span className="text-gray-700">Building a standard React/Node.js web app.</span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-3 mt-1" />
                        <span className="text-gray-700">Integrating Stripe, Auth0, or Google Maps APIs.</span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-3 mt-1" />
                        <span className="text-gray-700">Changing the UI/CS to look better.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Eligible (Experimental Dev)</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-1" />
                        <span className="text-gray-700">Developing a custom compression algorithm for video.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-1" />
                        <span className="text-gray-700">Reducing latency in a real-time system below known limits.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-1" />
                        <span className="text-gray-700">Novel AI model training methods (not just using GPT-4 API).</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                  <p className="font-bold text-indigo-900">
                    "If you know it will work before you start coding, it is NOT R&D."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Financing (BDC) */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <DollarSign className="w-10 h-10 text-green-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">3. BDC Tech Financing</h2>
              </div>
              <p className="text-lg text-gray-600 mb-10 max-w-3xl">
                Banks hate SaaS because you have no assets. BDC understands SaaS.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader><CardTitle className="text-lg">Recurring Revenue Loan</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      They lend based on your ARR (Annual Recurring Revenue).
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      <li>Must have $500k+ ARR.</li>
                      <li>High retention (low churn) required.</li>
                      <li>Longer repayment terms to spare cash flow.</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">Start-up Loan</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      For earlier stage companies.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      <li>Up to $250k.</li>
                      <li>Requires personal guarantee.</li>
                      <li>12-month interest-only period (crucial for runway).</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Text Content - SEO & Authority */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg prose-indigo text-gray-700">
              <h2>The Complete Guide to SaaS Funding in Canada</h2>
              <p>
                Building a software company in Canada offers a distinct unfair advantage: the government pays you to write code. However, thousands of founders miss out on this "free equity" because they misunderstand the fundamental rules of the game. They treat grants like a lottery rather than a rigorous tax incentive system.
              </p>
              <p>
                In this deep dive, we will unpack the specific mechanics of <strong>IRAP (Industrial Research Assistance Program)</strong>, <strong>SR&ED (Scientific Research and Experimental Development)</strong>, and the <strong>BDC (Business Development Bank of Canada)</strong> to show you exactly how to structure your SaaS roadmap to maximize non-dilutive funding.
              </p>

              <h3>The "Technical Uncertainty" Standard for SaaS</h3>
              <p>
                The single biggest reason software companies are rejected for funding is a failure to define "Technical Uncertainty". It is not enough to say "building this app is hard". Building a house is hard, but it is not "uncertain"—we know how to do it.
              </p>
              <h4>1. Standard Development (Not Funded)</h4>
              <p>
                If a competent developer could solve your problem by reading documentation, browsing Stack Overflow, or using standard libraries, it is Standard Development. This includes:
              </p>
              <ul>
                <li>Building a CRUD (Create, Read, Update, Delete) application.</li>
                <li>Integrating Google Maps, Stripe, or Auth0 APIs.</li>
                <li>Optimizing a database using standard indexing strategies.</li>
                <li>Designing a beautiful React frontend.</li>
              </ul>
              <p>
                None of these activities are eligible for IRAP or SR&ED because there is no "Technological Benefit" to Canada. You aren't creating new knowledge; you are applying existing knowledge.
              </p>

              <h4>2. Experimental Development (Funded)</h4>
              <p>
                To qualify for funding, you must be attempting something where the outcome is unknown at the outset. This often involves:
              </p>
              <ul>
                <li><strong>Algorithmic Complexity:</strong> Developing a new compression algorithm that reduces file size by 20% compared to H.264 without quality loss.</li>
                <li><strong>System Latency:</strong> Re-architecting a real-time bidding engine to process 1M requests per second with sub-5ms latency, where standard architectures failed.</li>
                <li><strong>New architectures:</strong> Integrating distinct technologies in a way that creates unforeseen conflicts (e.g., blockchain consensus mechanisms on low-power IoT devices).</li>
              </ul>
              <p>
                <strong>Pro Tip:</strong> When writing your IRAP grant application, focus 80% of the text on the <em>failures</em>. "We tried approach A using standard library X, but it failed due to memory constraints. We then hypothesized that a custom memory management layer would solve it..." This narrative proves uncertainty.
              </p>

              <h3>Mastering the IRAP "Relationship"</h3>
              <p>
                IRAP is not a form you submit; it is a relationship you manage. The gatekeeper is the <strong>Industrial Technology Advisor (ITA)</strong>. These are typically former engineers or CTOs who have "been there, done that".
              </p>
              <p>
                <strong>Do not BS an ITA.</strong> They will smell a sales pitch instantly. Instead, approach them as a peer. "We are trying to solve this really hard technical problem involving distributed locking. We think we have a solution, but it's risky and will cost $200k in developer hours to test. Can IRAP help de-risk this?"
              </p>
              <p>
                If the ITA likes the technical challenge (and believes in your team's ability to execute), they can invite you to submit a proposal. This differs from other grants where you blindly submit a PDF. IRAP is invitation-only, which means the "Application" starts with a coffee chat.
              </p>

              <h3>The BDC SaaS Loan: How it Works</h3>
              <p>
                For years, Canadian banks (RBC, TD, Scotiabank) refused to lend to SaaS companies. Why? Because if you default, they can't repossess your code like they can repossess a truck or a factory. Your code walks out the door every night in the heads of your developers.
              </p>
              <p>
                The BDC (a crown corporation) stepped in to fix this market failure. They recognized that <strong>Recurring Revenue (MRR)</strong> is an asset. It is predictable cash flow.
              </p>
              <p>
                <strong>The "Exigible Assets" Model:</strong> BDC will typically lend up to 4x your Monthly Recurring Revenue (MRR). If you have $50k MRR ($600k ARR), you might qualify for a $200k loan.
              </p>
              <p>
                <strong>The Catch:</strong> The interest rates are higher than a mortgage (often Prime + 2% or more), and they almost always require a <strong>Personal Guarantee</strong> from the founders for smaller loans (&lt;$250k). However, they are often the only source of "debt" capital for a company with no physical assets.
              </p>

              <h3>Stacking: The Ultimate Strategy</h3>
              <p>
                The most successful Canadian SaaS founders "stack" these programs to extend their runway without dilution. Here is the classic playbook:
              </p>
              <ol>
                <li><strong>Day 1:</strong> Incorporate. Use the "Futurpreneur" loan ($75k) to buy laptops and pay strict legal fees.</li>
                <li><strong>Hire #1:</strong> Use the "Student Work Placement Program" (SWPP) to hire a CS student. Total cost: $10,000. Subsidy: $7,000. Net Cost: $3,000.</li>
                <li><strong>The Prototype:</strong> Identify a "Technical Uncertainty". approach an IRAP ITA. Secure a "Youth Employment Program" (YEP) grant from IRAP to hire a full-time junior engineer (up to $30k subsidy).</li>
                <li><strong>Launch:</strong> Once you have a product, use "CanExport SMEs" to fund your Google Ads or travel to a conference in San Francisco.</li>
                <li><strong>Scale:</strong> Once you hit $500k ARR, replace your expensive equity financing with a non-dilutive BDC Recurring Revenue loan.</li>
                <li><strong>Tax Season:</strong> File an SR&ED claim for all the "Experimental Development" you did in Step 3. Get a cheque back for 60% of those salaries.</li>
              </ol>
              <p>
                By following this path, a Canadian founder can reach $1M ARR while retaining 80-90% of their equity. A US founder, relying on Angel/VC money early, might only own 60% at the same stage. That is the Canadian advantage.
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

        {/* Final CTA */}
        <section className="py-24 bg-indigo-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Talk to an IRAP ITA</h2>
              <p className="text-xl text-indigo-100 mb-10">
                The Industrial Technology Advisor (ITA) is your gateway to federal R&D money.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="https://nrc.canada.ca/en/support-technology-innovation/nrc-irap" target="_blank" rel="noopener noreferrer">
                    <Terminal className="w-5 h-5 mr-2" />
                    Contact IRAP
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-indigo-400 text-indigo-100 hover:bg-indigo-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/canada-hiring-training-grants-guide">
                    Get Hiring Grants
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

function XCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  )
}
