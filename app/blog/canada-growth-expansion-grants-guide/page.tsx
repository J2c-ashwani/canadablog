import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, TrendingUp, Building, Globe, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Factory, Scale, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Business Expansion Grants 2026 | 0% Interest Loans & Funding",
  description: "Complete 2026 guide to business scaling funding. Learn about the Business Scale-up and Productivity (BSP) program (0% interest loans), Regional Development Agencies, and the Canada Growth Fund.",
  keywords: "Canada business expansion grants, Business Scale-up and Productivity, REGI program, FedDev Ontario funding, PrairiesCan grants, 0% interest business loans",
}

export default function CanadaGrowthExpansionGrantsGuide() {
  const faqData = [
    {
      question: "Is the Business Scale-up (BSP) program a grant or loan?",
      answer: "It is an interest-free, repayable contribution (loan). You pay back 100% of the principal, but with 0% interest and no collateral. This is significantly cheaper than bank debt."
    },
    {
      question: "Do I need to be profitable to apply for expansion funding?",
      answer: "Generally, yes OR have a clear path to profitability. RDAs (like FedDev or PrairiesCan) look for 'high growth' potential (20%+ year-over-year) and usually require 2-3 years of financial statements."
    },
    {
      question: "What is the minimum revenue required?",
      answer: "While not explicitly stated for all regions, most successful BSP applicants have at least $500,000 in annual revenue. Some streams require $1M+. It is NOT for pre-revenue startups."
    },
    {
      question: "Can I use expansion funds to buy a building?",
      answer: "No. Federal expansion funds (REGI/BSP) typically exclude land and building purchases. They fund equipment, technology adoption, and market expansion costs."
    },
    {
      question: "What is the Canada Growth Fund?",
      answer: "The CGF is a $15 Billion arm's length public investment vehicle. It targets massive scale-ups (deal sizes >$20M) in Clean Tech and low-carbon supply chains, often using 'Contracts for Difference'."
    },
    {
      question: "How long is the repayment period?",
      answer: "Typically, you get a 1-2 year grace period (no payments) during the project, followed by a 5-year repayment schedule. Total term is often 7+ years."
    },
    {
      question: "Does EDC offer grants for expansion?",
      answer: "No, EDC offers Loan Guarantees. They guarantee 80% of a loan from your bank, which encourages your bank to lend you more money at better rates."
    },
    {
      question: "Are there specific grants for manufacturing expansion?",
      answer: "Yes. The 'Advanced Manufacturing and Innovation Competitiveness' (AMIC) stream in Ontario and similar tech-manufacturing streams in other provinces are very active."
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
        <section className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-100 border-emerald-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                📈 Scaling Up in 2026
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Canada Expansion Funding: <span className="text-emerald-400">The 0% Interest Ecosystem</span>
              </h1>
              <p className="text-xl text-emerald-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                Once you hit $500k in revenue, the game changes. You stop asking for small grants and start leveraging <strong>Regional Development Agencies (RDAs)</strong> for multi-million dollar interest-free capital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-emerald-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#rda-map">
                    Find Your RDA
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-emerald-400/50 text-white hover:bg-emerald-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#bsp-program">
                    BSP Program Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The "Not Free Money" Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <Lightbulb className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Shift Your Mindset: Repayable Contributions</h3>
                    <p className="text-blue-800 mb-4">
                      At the expansion stage, the government rarely gives "Free Grants". Instead, they offer <strong>"Repayable Contributions"</strong>.
                    </p>
                    <p className="text-blue-800">
                      <strong>Why this is effectively free money:</strong> In an era of 7% interest rates, a 0% loan for 7 years is a massive subsidy. Inflation eats the principal, saving you 30-40% in real dollar value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: The Regional Development Agencies (RDAs) */}
        <section id="rda-map" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Who holds the Chequebook?</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Canada delivers expansion funding regionally. You do not apply to "Ottawa"; you apply to the agency covering your postal code.
                </p>
              </div>

              <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-900 text-white font-bold">
                    <tr>
                      <th className="p-5">Region</th>
                      <th className="p-5">Agency Name</th>
                      <th className="p-5">Flagship Program</th>
                      <th className="p-5">Max Funding</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="p-5 font-bold text-emerald-900">Southern Ontario</td>
                      <td className="p-5 text-gray-700">FedDev Ontario</td>
                      <td className="p-5 text-gray-600">Business Scale-up & Productivity</td>
                      <td className="p-5 font-bold text-gray-900">$10 Million</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-5 font-bold text-emerald-900">Northern Ontario</td>
                      <td className="p-5 text-gray-700">FedNor</td>
                      <td className="p-5 text-gray-600">REGI Scale-up</td>
                      <td className="p-5 font-bold text-gray-900">$5 Million</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-5 font-bold text-emerald-900">Western Canada (AB, SK, MB)</td>
                      <td className="p-5 text-gray-700">PrairiesCan</td>
                      <td className="p-5 text-gray-600">Business Scale-up</td>
                      <td className="p-5 font-bold text-gray-900">$5 Million</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-5 font-bold text-emerald-900">British Columbia</td>
                      <td className="p-5 text-gray-700">PacifiCan</td>
                      <td className="p-5 text-gray-600">Business Scale-up</td>
                      <td className="p-5 font-bold text-gray-900">$5 Million</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-5 font-bold text-emerald-900">Quebec</td>
                      <td className="p-5 text-gray-700">CED (DEC)</td>
                      <td className="p-5 text-gray-600">REGI</td>
                      <td className="p-5 font-bold text-gray-900">$2 Million</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-5 font-bold text-emerald-900">Atlantic Canada</td>
                      <td className="p-5 text-gray-700">ACOA</td>
                      <td className="p-5 text-gray-600">Regional Economic Growth</td>
                      <td className="p-5 font-bold text-gray-900">Based on Project</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: BSP Deep Dive */}
        <section id="bsp-program" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <TrendingUp className="w-10 h-10 text-emerald-600 mr-4" />
                    <h2 className="text-3xl font-bold text-gray-900">The "BSP" Program Masterclass</h2>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 mb-6 px-3 py-1">Best Capital in Canada</Badge>
                  <p className="text-lg text-gray-700 mb-6">
                    The <strong>Business Scale-up and Productivity (BSP)</strong> program is the holy grail for established SMEs. It provides upfront cash to buy equipment or expand markets.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="border-emerald-100 bg-white">
                      <CardHeader>
                        <CardTitle className="text-lg text-emerald-900">The Terms</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-3">
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-emerald-600 mr-2" /> <strong>0% Interest</strong> (Always)</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-emerald-600 mr-2" /> <strong>Unsecured</strong> (Usually no personal guarantee)</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-emerald-600 mr-2" /> <strong>Up to 50%</strong> of project costs</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-emerald-100 bg-white">
                      <CardHeader>
                        <CardTitle className="text-lg text-emerald-900">The Catch</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-3">
                          <li className="flex items-center"><AlertTriangle className="w-3 h-3 text-orange-500 mr-2" /> <strong>Match Funding:</strong> You must prove you have the other 50%.</li>
                          <li className="flex items-center"><AlertTriangle className="w-3 h-3 text-orange-500 mr-2" /> <strong>High Bar:</strong> Rejection rate is ~60%.</li>
                          <li className="flex items-center"><AlertTriangle className="w-3 h-3 text-orange-500 mr-2" /> <strong>Reporting:</strong> Strict quarterly reporting on jobs created.</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-3">Case Study: "MetalFab Inc."</h3>
                  <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <p className="text-gray-700 mb-4 text-sm">
                      MetalFab Inc. had $3M revenue and wanted to buy a $1M automated laser cutter to export to the USA.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>Total Project:</span>
                        <span className="font-bold">$1,000,000</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1 text-emerald-700">
                        <span>FedDev Ontario (BSP) Contribution (0% Loan):</span>
                        <span className="font-bold">$350,000</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1 text-blue-700">
                        <span>Bank Finance (Equipment Loan):</span>
                        <span className="font-bold">$550,000</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>Company Cash:</span>
                        <span className="font-bold">$100,000</span>
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      <strong>Outcome:</strong> By stacking the government 0% loan with a bank loan, they only needed $100k cash to buy a $1M machine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Canada Growth Fund */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Scale className="w-10 h-10 text-emerald-400 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold">The Heavyweight: Canada Growth Fund (CGF)</h2>
                  <p className="text-emerald-300">For $20M+ Deals</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-lg text-gray-300 mb-6">
                    If you are building a massive Clean Tech plant or infrastructure, BSP is too small. Enter the **$15 Billion** Canada Growth Fund.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-1" />
                      <div>
                        <strong className="text-white">Contracts for Difference (CfD):</strong>
                        <p className="text-sm text-gray-400">The government guarantees a future price for your carbon credits or hydrogen, removing market risk.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-1" />
                      <div>
                        <strong className="text-white">Equity & Debt:</strong>
                        <p className="text-sm text-gray-400">They can take an equity stake or provide concessional debt to make the project bankable.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h4 className="font-bold text-white mb-4">Target Sectors</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">Carbon Capture (CCUS)</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">Hydrogen</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">Biofuels</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">Critical Minerals</span>
                  </div>
                  <div className="mt-8">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Visit CGF Investment Team
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Export Development Canada (EDC) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Globe className="w-10 h-10 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Export Development Canada (EDC)</h2>
              </div>
              <p className="text-lg text-gray-600 mb-10 max-w-3xl">
                EDC is not a grant agency; they are an insurance agency. But their "Export Guarantee Program" is powerful for scaling.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader><CardTitle className="text-lg">Export Guarantee</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">EDC tells your bank: "If they default, we cover 80%." This makes your bank willing to lend you millions for international expansion.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">Credit Insurance</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">If your US customer goes bankrupt and doesn't pay your $500k invoice, EDC pays you. This lets you sleep at night.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">Direct Lending</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">For larger mid-market firms, EDC can lend directly alongside your bank to increase available working capital.</p>
                  </CardContent>
                </Card>
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
                      <HelpCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
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
        <section className="py-24 bg-emerald-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Scale?</h2>
              <p className="text-xl text-emerald-100 mb-10">
                Navigating the BSP application process is complex. Our team can help structure your project to maximize RDA funding.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/contact?service=expansion-funding-strategy">
                    <Factory className="w-5 h-5 mr-2" />
                    Book Expansion Strategy Call
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-emerald-400 text-emerald-100 hover:bg-emerald-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/canada-innovation-research-development-grants-guide">
                    Explore R&D Grants
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
