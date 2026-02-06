import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Rocket, ShoppingCart, Globe, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Gavel, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Commercialization Grants Canada 2026 | ISC & Scale-Up Funding",
  description: "Complete 2026 guide to commercialization funding. Get the government to buy your prototype (ISC Testing Stream), fund your patent strategy (IP Assist), and scale globally.",
  keywords: "Canada commercialization grants, Innovative Solutions Canada ISC, testing stream grant, CanExport innovation, IP assist funding, scale-up grants Canada",
}

export default function CommercializationFundingGuide() {
  const faqData = [
    {
      question: "What is the ISC 'Testing Stream'?",
      answer: "It is widely considered the best 'Commercialization' program. The government buys your pre-commercial prototype (up to $1.15 Million contract) to test it in a real department. You keep the IP and get a first customer."
    },
    {
      question: "Is there funding for Patent costs?",
      answer: "Yes. The 'IP Assist' program (via IRAP) provides funding specifically to hire patent lawyers and develop an IP strategy. You must be an IRAP client to access it."
    },
    {
      question: "What differentiates 'Commercialization' from R&D?",
      answer: "R&D funds (IRAP/SR&ED) stop when the tech 'works'. Commercialization funds (ISC, CanExport) start then—helping you find customers, protect IP, and enter markets."
    },
    {
      question: "Can I use CanExport for product launches?",
      answer: "Sort of. CanExport SMEs covers travel, trade shows, and marketing materials for NEW export markets. It does not fund domestic launches."
    },
    {
      question: "What is the 'Valley of Death'?",
      answer: "The gap between 'Finished Prototype' and 'First Recurring Revenue'. Grants like ISC are designed to bridge this by validating your tech with a trusted buyer."
    },
    {
      question: "Does the Business Development Bank (BDC) help here?",
      answer: "Yes. They have a 'Commercialization Loan' (distinct from the Tech Loan) for intangible costs like sales hiring and marketing campaigns."
    },
    {
      question: "Is there specific funding for University spin-outs?",
      answer: "Yes. 'Lab-to-Market' programs and the 'I-STEM' program provide specific grants to researchers trying to turn a thesis into a company."
    },
    {
      question: "What about Scale AI?",
      answer: "Scale AI is a Supercluster that funds supply chain commercialization projects. If your AI product improves logistics/supply chains, they can fund up to 50% of the implementation."
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
        <section className="bg-gradient-to-br from-slate-900 to-gray-800 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-slate-500/20 text-slate-100 border-slate-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🚀 Crossing the "Valley of Death"
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Commercialization Funding: <span className="text-slate-400">Your First Customer</span>
              </h1>
              <p className="text-xl text-slate-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                Building the product is only half the battle. Selling it is harder. Canada has specific programs like <strong>ISC</strong> and <strong>CanExport</strong> to help you land your first major contract.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-slate-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#isc-testing">
                    Get a $500k Contract
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-slate-400/50 text-white hover:bg-slate-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#ip-funding">
                    Fund Your Patents
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The "First Customer" Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <ShoppingCart className="w-8 h-8 text-emerald-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">The Best Funding is Revenue</h3>
                    <p className="text-emerald-800 mb-4">
                      Grants are great, but contracts are better. The <strong>Innovative Solutions Canada (ISC) Testing Stream</strong> doesn't give you "free money"; it gives you a <strong>Sale</strong>.
                    </p>
                    <p className="text-emerald-800">
                      The Government buys your prototype to test it. If it works, you have a case study from the Government of Canada to show future investors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: ISC Testing Stream */}
        <section id="isc-testing" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Innovative Solutions Canada (ISC)</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  The "Build in Canada Innovation Program" (BCIP) was rebranded to ISC Testing Stream. It remains the gold standard.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-slate-900">Testing Stream</h3>
                      <Badge className="bg-emerald-600 text-white text-lg px-4 py-1">Up to $1.15M</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">How it works:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                          <li>You have a working prototype (TRL 7-9).</li>
                          <li>You apply to the "Pool" of innovations.</li>
                          <li>A Department (e.g., Defence, Transport) expresses interest.</li>
                          <li>They sign a contract to buy/test it.</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">The Benefits:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" /> You keep 100% IP</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" /> Non-dilutive Revenue</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" /> Real-world validation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: IP Assist */}
        <section id="ip-funding" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Gavel className="w-10 h-10 text-indigo-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">2. Fund Your Patents (IP Assist)</h2>
                  <p className="text-gray-600">Don't let legal costs stop you.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <p className="text-gray-700 text-lg mb-8">
                  Patents are expensive ($20k+). The <strong>IP Assist</strong> program, delivered via IRAP, helps SMEs cover these costs.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-indigo-100 bg-indigo-50/50">
                    <CardHeader><CardTitle className="text-indigo-900">Level 1: Awareness</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600 mb-4">Funding to hire an expert to simply audit what IP you might have.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-indigo-100 bg-indigo-50/50">
                    <CardHeader><CardTitle className="text-indigo-900">Level 2: Strategy</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600 mb-4">Funding to develop a comprehensive IP strategy (offensive/defensive).</p>
                    </CardContent>
                  </Card>
                  <Card className="border-indigo-100 bg-indigo-50/50">
                    <CardHeader><CardTitle className="text-indigo-900">Level 3: Action</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600 mb-4">Funding to execute the strategy (file patents, trademarks). *Requires IRAP nomination.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: CanExport Innovation */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Globe className="w-10 h-10 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">3. CanExport Innovation</h2>
              </div>
              <p className="text-lg text-gray-600 mb-10 max-w-3xl">
                Different from CanExport SMEs (which is for sales), <strong>CanExport Innovation</strong> is for finding R&D partners.
              </p>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-bold text-xl mb-4">What it funds:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                      <span className="text-gray-700">Travel to meet foreign partners.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                      <span className="text-gray-700">Legal fees for partnership agreements.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                      <span className="text-gray-700">Translating technical documents.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-4">The Goal:</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    To sign a collaborative R&D agreement with a foreign entity (e.g., a German university or Japanese firm).
                  </p>
                  <Button variant="outline" className="w-full bg-white">
                    Check CanExport Guide
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Text Content - SEO & Authority */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg prose-slate text-gray-700">
              <h2>The "First Customer" Problem</h2>
              <p>
                In Canada, we are great at inventing things (R&D) but terrible at buying them (Commercialization). This is often called the "Valley of Death"—the period where your grant money runs out but you don't yet have enough sales to survive.
              </p>
              <p>
                Grants like IRAP are designed for TRL 1-6 (Technology Readiness Levels). Once you hit TRL 7 (Prototype ready in a real environment), IRAP stops. This is where <strong>Innovative Solutions Canada (ISC)</strong> and <strong>Export Development Canada (EDC)</strong> take over.
              </p>

              <h3>Understanding TRLs (Technology Readiness Levels)</h3>
              <p>
                To get commercialization funding, you must speak the language of TRLs.
              </p>
              <ul>
                <li><strong>TRL 1-4 (Lab Stage):</strong> You are proving the science. Use NSERC, Mitacs, and IRAP.</li>
                <li><strong>TRL 5-6 (Simulation):</strong> You have a beta that works in your office. Use IRAP and Regional Development Agencies (RDAs).</li>
                <li><strong>TRL 7-9 (Real World):</strong> You have a product that works, but need a customer to trust it. Use ISC Testing Stream.</li>
              </ul>
              <p>
                <strong>Why this matters:</strong> If you apply to ISC with a TRL 4 idea, you will be rejected immediately. You must already have a working prototype.
              </p>

              <h3>The Government as a Customer (Procurement)</h3>
              <p>
                The Government of Canada spends $20 Billion+ per year on goods and services. The <strong>ISC Testing Stream</strong> is a "set-aside" to force departments to buy from startups.
              </p>
              <h4>How to Hack ISC:</h4>
              <ol>
                <li><strong>Don't look for open challenges only.</strong> The "Testing Stream" has an open "Call for Proposals" where you submit your tech to a pool.</li>
                <li><strong>Find a Champion.</strong> Once you are in the pool, you are "Pre-Qualified". Now, you can cold call a Director at the Department of National Defence or Transport Canada and say: "I have a pre-qualified boat hull inspection drone. If you want to buy it, ISC pays for it, not your department budget."</li>
                <li><strong>Close the Sale.</strong> If the department agrees, ISC writes the cheque (up to $1.15M). The department gets your tech for "free" (paid by ISED), and you get a sale.</li>
              </ol>

              <h3>Export is Scale</h3>
              <p>
                The Canadian market is small (40M people). Real scale happens when you export.
              </p>
              <h4>Using CanExport to Pivot</h4>
              <p>
                CanExport SMEs pays for 50% of your marketing costs in a new country.
              </p>
              <ul>
                <li><strong>Scenario:</strong> You sell a SaaS tool to Canadian realtors. You want to enter the Florida market.</li>
                <li><strong>The Grant:</strong> CanExport will pay for your flights to Miami, your booth at the Florida Realtor Conference, and the SEO agency you hire to rank for "Florida Realtor Software".</li>
                <li><strong> The Catch:</strong> You must have $100k in annual revenue already. It is not for pre-revenue startups.</li>
              </ul>

              <h3>The IP Trap</h3>
              <p>
                As you scale, "Patent Trolls" become a risk. The <strong>IP Assist</strong> program is critical here. It doesn't just pay for filing patents; it pays for "Freedom to Operate" searches.
              </p>
              <p>
                Before you enter the US market, spend the $5,000 (funded by IP Assist) to ensure you aren't infringing on a competitor's patent. It is cheaper to find out now than in a lawsuit later.
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
                      <HelpCircle className="w-5 h-5 text-slate-500 mr-3 mt-0.5 flex-shrink-0" />
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
        <section className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Validate Your Tech</h2>
              <p className="text-xl text-slate-100 mb-10">
                The ISC program is competitive, but it is the ultimate validation. Start by pre-qualifying.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="https://ised-isde.canada.ca/site/innovative-solutions-canada/en" target="_blank" rel="noopener noreferrer">
                    <Rocket className="w-5 h-5 mr-2" />
                    Visit ISC Portal
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-400 text-slate-100 hover:bg-slate-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/clean-tech-energy-grants">
                    See Clean Tech Grants
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
