import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, XCircle, Users, RefreshCw, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, History, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Entrepreneurship Fund (WEF) 2026 | Status & Alternatives",
  description: "Is the Women Entrepreneurship Fund still open? No. Learn about the 2026 alternatives: The $50k WELF loan and the Ecosystem Fund.",
  keywords: "Women Entrepreneurship Fund application, WEF grant status, Canada women business grants, WELF vs WEF, women entrepreneur funding Canada 2026",
}

export default function WomenEntrepreneurshipFundGuide() {
  const faqData = [
    {
      question: "Is the Women Entrepreneurship Fund (WEF) still accepting applications?",
      answer: "No. The direct grant portion of the strategy (WEF) closed in 2019/2020. It was a one-time injection. The current strategy focuses on LOANS (WELF) and Ecosystem support."
    },
    {
      question: "Will the $100,000 grant ever come back?",
      answer: "It is unlikely. The government has shifted its focus to 'sustainable' capital (loans) via the Women Entrepreneurship Loan Fund (WELF), which recycles capital for future borrowers."
    },
    {
      question: "What replaced the WEF?",
      answer: "Two things: 1) The 'Women Entrepreneurship Loan Fund' (up to $50k loans), and 2) The 'Ecosystem Fund' (funding for non-profits to provide free training to you)."
    },
    {
      question: "Are there ANY grants left for women?",
      answer: "Yes, but they are smaller and mostly private. Visa She's Next and Amex Blueprint offer $10,000 grants. Government grants are now mostly sector-specific (e.g., Tech, Agriculture)."
    },
    {
      question: "Can I apply for the Ecosystem Fund?",
      answer: "Only if you are a non-profit organization helping women. If you are a business owner, you cannot apply for the Ecosystem Fund; you BENEFIT from it by accessing the free services it funds."
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
        <section className="bg-gradient-to-br from-gray-900 to-slate-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-red-500/20 text-red-100 border-red-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🚫 Program Status: CLOSED
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Women Entrepreneurship Fund: <span className="text-gray-400">The 2026 Realities</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
                Many websites still list the "WEF Grant" as active. They are wrong. The direct grant program ended years ago. Here is where the money actually is in 2026.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="/blog/women-entrepreneurship-loan-fund-canada">
                    Go to Active Loan Fund ($50k)
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-400/50 text-white hover:bg-gray-800 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#alternatives">
                    See Alternatives
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The "Reality Check" Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <XCircle className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-red-900 mb-2">Stop Searching for "WEF Application"</h3>
                    <p className="text-red-800 mb-4">
                      Scammers often set up fake sites claiming to offer the "Women Entrepreneurship Fund Application".
                    </p>
                    <p className="text-red-800">
                      <strong>Fact:</strong> The official WEF portal has been closed since 2019. Any site asking for an application fee for this grant is a scam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: What happened? */}
        <section id="history" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">What happened to the Grant?</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    In 2018, the Government announced a $20 Million direct grant fund. It was overwhelmed. They received thousands of applications for a small pot of money.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    <strong>The Pivot:</strong> Realizing grants were unsustainable, the government shifted the remaining billions of the Strategy into:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <RefreshCw className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <strong className="text-gray-900">Revolving Loans (WELF):</strong> By lending money, they can get it back and lend it again to the next woman.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Users className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <strong className="text-gray-900">Ecosystem Fund:</strong> Funding organizations (like Coralus, PARO, The Forum) to support thousands of women instead of giving cash to just a few.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 bg-gray-100 p-8 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">WEF Timeline</h3>
                  <div className="space-y-6 border-l-2 border-gray-300 pl-6 relative">
                    <div className="relative">
                      <span className="absolute -left-[31px] bg-gray-500 w-4 h-4 rounded-full"></span>
                      <p className="text-sm font-bold text-gray-500">2018</p>
                      <p className="text-gray-700">Program Launched ($100k Grants)</p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[31px] bg-red-500 w-4 h-4 rounded-full"></span>
                      <p className="text-sm font-bold text-red-500">2019</p>
                      <p className="text-gray-900 font-bold">Applications Closed Permanently</p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[31px] bg-emerald-500 w-4 h-4 rounded-full"></span>
                      <p className="text-sm font-bold text-emerald-600">2022-Present</p>
                      <p className="text-gray-700">Focus shift to WELF (Loans)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Alternatives */}
        <section id="alternatives" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Target className="w-10 h-10 text-emerald-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Where to apply in 2026</h2>
                  <p className="text-gray-600">The money is still there, it just changed form.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-emerald-100 bg-emerald-50/50">
                  <CardHeader><CardTitle className="text-emerald-900">1. WELF (The Loan)</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-emerald-700 mb-2">$50,000</div>
                    <p className="text-sm text-gray-600 mb-4">The direct successor. If you wanted the grant to grow your business, this is the tool you use now.</p>
                    <Button className="w-full bg-emerald-600" asChild>
                      <Link href="/blog/women-entrepreneurship-loan-fund-canada">View Guide</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-100 bg-blue-50/50">
                  <CardHeader><CardTitle className="text-blue-900">2. Private Grants</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-700 mb-2">$10,000</div>
                    <p className="text-sm text-gray-600 mb-4">Visa She's Next and Amex Blueprint still offer actual cash grants. They are competitive lotteries.</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/ontario-women-business-grants">View Private Options</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-purple-100 bg-purple-50/50">
                  <CardHeader><CardTitle className="text-purple-900">3. Inclusive Hiring</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-700 mb-2">$7,000</div>
                    <p className="text-sm text-gray-600 mb-4">Grants to hire students (SWPP). They often prioritize women in STEM roles.</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/canada-hiring-training-grants-guide">View Hiring Grants</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed FAQ Section */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                      <HelpCircle className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
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
              <h2 className="text-4xl font-bold mb-6">Don't Get Stuck in the Past</h2>
              <p className="text-xl text-gray-300 mb-10">
                The WEF grant is history. The WELF loan is the present. Move forward with the funding that is actually available.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/women-entrepreneurship-loan-fund-canada">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Apply for WELF Loan
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
