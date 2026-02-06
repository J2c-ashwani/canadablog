import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Rocket, Users, Building, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Briefcase, Globe, Zap, Layers } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Startup Funding 2026 Guide | Grants, Loans & Futurpreneur",
  description: "Complete 2026 guide to Canadian startup funding. Futurpreneur loans (up to $75k), Innovative Solutions Canada grants ($150k+), and hiring subsidies for new businesses.",
  keywords: "startup grants Canada 2026, Futurpreneur eligibility, Innovative Solutions Canada, startup business loans, seed funding Canada, small business startup grants",
}

export default function CanadaStartupFundingGrantsGuide() {
  const faqData = [
    {
      question: "Are there free grants to start a business in Canada?",
      answer: "Rarely 'unrestricted' ones. Most startup funding is either 1) repayable loans (like Futurpreneur), 2) hiring subsidies (like SWPP), or 3) specific to R&D (like IRAP). The 'free money' for general startup costs is largely a myth, currently."
    },
    {
      question: "How much can I get from Futurpreneur in 2026?",
      answer: "You can access up to $75,000 total. This is split between Futurpreneur (up to $20,000) and BDC (up to $55,000). There is also a 'Side Hustle' program offering up to $25,000 for part-time founders."
    },
    {
      question: "What is the Innovative Solutions Canada (ISC) program?",
      answer: "ISC is the government's 'buy first' program. Instead of a standard grant, they pay you to build a prototype that solves a government problem. Phase 1 grants are up to $150,000, and Phase 2 can go up to $2 million."
    },
    {
      question: "Can I get funding for an app idea?",
      answer: "Funding usually requires a 'Minimum Viable Product' (MVP) or prototype. IRAP or ISC may fund the *development* of innovative technology, but they rarely fund ideas on a napkin. You typically need to demonstrate technical uncertainty or innovation."
    },
    {
      question: "Do hiring grants work for startups?",
      answer: "Yes, they are the easiest money to get. Programs like the Student Work Placement Program (SWPP) can cover 50-70% of a student's salary, allowing you to hire developers or marketers cheaply."
    },
    {
      question: "What is the Startup Visa Program?",
      answer: "It is for international founders who want to build in Canada. You must get a 'Letter of Support' from a designated organization (Angel Group, VC, or Incubator) to qualify for a permanent resident visa."
    },
    {
      question: "Do Provincial grants exist for startups?",
      answer: "Yes. For example, 'Summer Company' (Ontario) gives $3,000 to students. 'Self-Employment Program' (National) offers income support while you launch. Always check your local Economic Development center."
    },
    {
      question: "Can I use personal credit lines?",
      answer: "Yes, but be careful. Personal debt puts your personal assets (house, car) at risk. Programs like Futurpreneur are 'Character Based' but generally do not put a lien on your primary residence."
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
        <section className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-indigo-500/20 text-indigo-100 border-indigo-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🚀 2026 Startup Ecosystem
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Canada Startup Funding 2026: <span className="text-indigo-400">Futurpreneur, ISC & Hidden Grants</span>
              </h1>
              <p className="text-xl text-indigo-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                Stop looking for "free money" that doesn't exist. This guide reveals the <strong>real</strong> funding sources for Canadian startups: low-interest loans, government procurement tracks, and hiring subsidies that extend your runway.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#futurpreneur-breakdown">
                    Futurpreneur Loans ($75k)
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-indigo-400/50 text-white hover:bg-indigo-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#hiring-grants">
                    Easy Hiring Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Reality Check Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <AlertTriangle className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-orange-900 mb-2">The "Grant Myth" vs. Reality</h3>
                    <p className="text-orange-800 mb-4">
                      <strong>Myth:</strong> "I can get a $50,000 grant to start my coffee shop/agency/app."
                    </p>
                    <p className="text-orange-800">
                      <strong>Reality:</strong> The government rarely funds 100% of startup costs. They fund <strong>Growth</strong> (Exporting, Hiring) or <strong>Innovation</strong> (R&D). For starting up, you leverage <strong>Loans</strong> (Futurpreneur) and reduce costs with <strong>Hiring Grants</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Futurpreneur Masterclass */}
        <section id="futurpreneur-breakdown" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Deep Dive: The Futurpreneur Application</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  This is the "Gold Standard" for Canadian startups aged 18-39. It's not just money; it's a 2-year mentorship that dramatically increases your survival rate.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="border-indigo-100 bg-indigo-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg text-indigo-900">Core Startup Program</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-indigo-700 mb-2">Up to $75,000</div>
                        <p className="text-sm text-gray-600 mb-4">For full-time founders ready to launch.</p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-indigo-600 mr-2" /> $20k from Futurpreneur</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-indigo-600 mr-2" /> $55k from BDC</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-indigo-600 mr-2" /> Interest Only (Year 1)</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-100 bg-green-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg text-green-900">Side Hustle Program</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-700 mb-2">Up to $25,000</div>
                        <p className="text-sm text-gray-600 mb-4">Keep your day job while you build.</p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-600 mr-2" /> Keep full-time job</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-600 mr-2" /> Lower credit requirements</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-600 mr-2" /> Expert mentorship included</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-3">The "Secret Sauce" for Approval</h3>
                  <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
                    <p className="text-gray-700 mb-4">
                      Futurpreneur doesn't care about your "Idea". They care about your "Cash Flow".
                    </p>
                    <h4 className="font-bold text-indigo-900 mb-2">The Cash Flow Template Strategy:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                      <li><strong>Be Realistic:</strong> Don't project $1M revenue in Month 3. They will reject you for lack of realism.</li>
                      <li><strong>Show the Loan Repayment:</strong> Make sure your expenses line includes the monthly loan payment ($600-$800). If you forget this, you look incompetent.</li>
                      <li><strong>Living Expenses:</strong> If you are full-time, how are you eating? Your cash flow MUST show you paying yourself enough to survive, OR you must prove you have personal savings.</li>
                    </ol>
                  </div>
                </div>

                <div className="w-full md:w-1/3">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg relative">
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      REQUIRED DOCUMENT
                    </div>
                    <h4 className="font-bold text-gray-900 mb-4">The Application "Key"</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      You cannot apply without a <strong>Business Plan</strong> and <strong>Cash Flow Projection</strong>.
                    </p>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5" />
                        <span>24-month month-by-month cash flow</span>
                      </li>
                      <li className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5" />
                        <span>Detailed competitor analysis</span>
                      </li>
                      <li className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5" />
                        <span>Personal credit check (soft/hard)</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                      <a href="https://www.futurpreneur.ca" target="_blank" rel="noopener noreferrer">
                        Start Eligibility Check <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Incubators & Accelerators */}
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">The Accelerator Ecosystem</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Sometimes the best funding isn't a grant; it's an investment from a top-tier accelerator. These programs often provide $50k-$150k in exchange for small equity (5-7%).
                </p>
              </div>

              <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-900 font-bold">
                    <tr>
                      <th className="p-5">Accelerator Name</th>
                      <th className="p-5">Location</th>
                      <th className="p-5">Focus</th>
                      <th className="p-5">Typical Funding/Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="p-5 font-semibold text-gray-900">Creative Destruction Lab (CDL)</td>
                      <td className="p-5 text-gray-600">Tor/Van/Mtl/Cal/Hal</td>
                      <td className="p-5 text-gray-600">Deep Tech, AI, Climate</td>
                      <td className="p-5 text-emerald-600 font-bold">Access to Angel Investors (No direct cash, massive network)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-5 font-semibold text-gray-900">DMZ (Toronto Metropolitan U)</td>
                      <td className="p-5 text-gray-600">Toronto</td>
                      <td className="p-5 text-gray-600">SaaS, Tech</td>
                      <td className="p-5 text-emerald-600 font-bold">Sales Training + Global expansion support</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-5 font-semibold text-gray-900">Highline Beta</td>
                      <td className="p-5 text-gray-600">National</td>
                      <td className="p-5 text-gray-600">Venture Studio</td>
                      <td className="p-5 text-emerald-600 font-bold">Pre-seed investment (~$100k) for co-creation</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-5 font-semibold text-gray-900">FounderFuel</td>
                      <td className="p-5 text-gray-600">Montreal</td>
                      <td className="p-5 text-gray-600">Tech / Software</td>
                      <td className="p-5 text-emerald-600 font-bold">$120k for ~5-7% equity (Demo Day)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-5 font-semibold text-gray-900">Foresight Canada</td>
                      <td className="p-5 text-gray-600">BC / Alberta</td>
                      <td className="p-5 text-gray-600">Clean Tech</td>
                      <td className="p-5 text-emerald-600 font-bold">Industry pilot connections</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Innovative Solutions Canada */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Target className="w-10 h-10 text-red-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">2. Innovative Solutions Canada (ISC)</h2>
                  <p className="text-gray-600">For Tech & R&D Startups</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <p className="text-gray-700 text-lg mb-6">
                      ISC is not a charity; it's a <strong>Challenge</strong>. Government departments (like the Navy or Health Canada) post "Problems". If your startup can build the solution, they fund the development.
                    </p>
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-bold text-gray-900">Phase 1: Proof of Concept</h4>
                          <p className="text-gray-600 text-sm">Grant up to <span className="text-red-600 font-bold">$150,000</span> to prove your idea works (6 months).</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-bold text-gray-900">Phase 2: Prototype</h4>
                          <p className="text-gray-600 text-sm">Grant up to <span className="text-red-600 font-bold">$1 Million+</span> to build the working model (2 years).</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-bold text-gray-900">Phase 3: Sales</h4>
                          <p className="text-gray-600 text-sm">The government becomes your first customer.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4 text-center">Is Your Startup Eligible?</h4>
                    <ul className="space-y-4">
                      <li className="flex items-center text-sm text-gray-700 bg-white p-3 rounded shadow-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                        Canadian for-profit corporation (fewer than 500 FTEs)
                      </li>
                      <li className="flex items-center text-sm text-gray-700 bg-white p-3 rounded shadow-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                        50% of FTEs and wages based in Canada
                      </li>
                      <li className="flex items-center text-sm text-gray-700 bg-white p-3 rounded shadow-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                        R&D happens in Canada
                      </li>
                      <li className="flex items-center text-sm text-gray-700 bg-white p-3 rounded shadow-sm border border-red-200">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-3" />
                        Must have sufficient "Freedom to Operate" (IP rights)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: The "Easy Wins" (Hiring) */}
        <section id="hiring-grants" className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900">3. The Hiring Strategy: How to Extend Runway</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
                  For a startup, cash burn is the enemy. Hiring grants reduce your burn rate on talent by 50-70%.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow border-emerald-200 bg-emerald-50/30">
                  <CardHeader>
                    <Users className="w-10 h-10 text-emerald-600 mb-2" />
                    <CardTitle className="text-lg">Student Work Placement (SWPP)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-emerald-700 mb-2">Up to $7,000</p>
                    <p className="text-sm text-gray-600 mb-4">Per student, per semester. Great for interns.</p>
                    <div className="text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded inline-block">TECH, MARKETING, BUSINESS</div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-blue-200 bg-blue-50/30">
                  <CardHeader>
                    <Briefcase className="w-10 h-10 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">IRAP Youth Employment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-blue-700 mb-2">Up to $30,000</p>
                    <p className="text-sm text-gray-600 mb-4">To hire a graduate (under 30) for 6-12 months.</p>
                    <div className="text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded inline-block">R&D, ENGINEERING, SCIENCE</div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-purple-200 bg-purple-50/30">
                  <CardHeader>
                    <Award className="w-10 h-10 text-purple-600 mb-2" />
                    <CardTitle className="text-lg">Mitacs Accelerate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-purple-700 mb-2">$15,000 Package</p>
                    <p className="text-sm text-gray-600 mb-4">You pay $7.5k, Mitacs pays $7.5k for a Master's/PhD intern.</p>
                    <div className="text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded inline-block">DEEP TECH, AI, HEALTH</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Startup Visa & International */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <Globe className="w-10 h-10 text-blue-300 mr-4" />
                <h2 className="text-3xl font-bold text-center">International Founders: Startup Visa</h2>
              </div>
              <p className="text-lg text-blue-100 text-center mb-10">
                If you are not a Canadian PR/Citizen, you cannot apply for Futurpreneur. However, Canada wants you. The **Startup Visa Program** is your pathway.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-blue-800 p-6 rounded-lg border border-blue-700">
                  <h3 className="font-bold text-xl mb-2">Designated Orgs</h3>
                  <p className="text-sm text-blue-200">You must get a "Letter of Support" from an approved Angel Group, VC fund, or Incubator.</p>
                </div>
                <div className="bg-blue-800 p-6 rounded-lg border border-blue-700">
                  <h3 className="font-bold text-xl mb-2">Investment</h3>
                  <p className="text-sm text-blue-200">Angels must invest min $75k. VCs must invest min $200k. Incubators accept you into their program.</p>
                </div>
                <div className="bg-blue-800 p-6 rounded-lg border border-blue-700">
                  <h3 className="font-bold text-xl mb-2">Outcome</h3>
                  <p className="text-sm text-blue-200">You get Permanent Residency (PR) for you and your co-founders (up to 5 families).</p>
                </div>
              </div>
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
        <section className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Need a Business Plan Assessment?</h2>
              <p className="text-xl text-gray-300 mb-10">
                Futurpreneur loans require a bulletproof financial model. Our experts can review your cash flow projections before you submit.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/contact?service=startup-plan-review">
                    <Rocket className="w-5 h-5 mr-2" />
                    Review My Startup Plan
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/canada-technology-adoption-grants-guide">
                    See Tech Grants
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
