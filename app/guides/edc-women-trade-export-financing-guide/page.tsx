import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Shield, Globe, TrendingUp, Zap, Award, Rocket, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "EDC Women in Trade 2025 | $50M Export Funding",
  description: "Complete guide to EDC's Women in Trade financing. Apply for the $50M Inclusive Trade Investment Fund, export credit insurance, and global market access.",
  keywords: "EDC Women in Trade, export financing Canada, Inclusive Trade Investments, women exporter grants, EDC equity fund",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/edc-women-trade-export-financing-guide",
  },
  openGraph: {
    title: "EDC Women in Trade Financing 2025 | Export Capital",
    description: "Step-by-step guide to securing up to $50M in equity and export financing for women-led businesses.",
    url: "https://www.fsidigital.ca/guides/edc-women-trade-export-financing-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Inclusive Trade Investments Program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is a $50 million equity investment program designed for women-owned and diverse-owned businesses that are exporting or planning to export. EDC takes an equity stake to help you scale."
      }
    },
    {
      "@type": "Question",
      "name": "Can EDC help if I'm not exporting yet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but your business must be 'export-ready'. This means you have a product or service that is sellable internationally and a clear plan to enter foreign markets within the next 12 months."
      }
    },
    {
      "@type": "Question",
      "name": "What is Export Credit Insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It protects your business against the risk of non-payment by foreign buyers. If your international customer goes bankrupt or refuses to pay, EDC covers up to 90% of your losses."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a grant for women exporters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "EDC primarily offers financing and insurance. However, they partner with the Trade Commissioner Service for the 'CanExport' program, which IS a grant covering up to 50% of marketing costs for new markets."
      }
    }
  ]
}

export default function EDCWomenInTradeApplicationGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-green-800 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-teal-500/20 text-teal-100 border-teal-400/30 backdrop-blur-sm">
                🌍 Export Financing Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                EDC Women in Trade <br className="hidden md:block" /> Financing
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-teal-100 leading-relaxed text-pretty">
                The complete handbook for going global. Secure equity from the <br className="hidden md:block" /> $50M Inclusive Trade Fund and protect your receivables.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-teal-800 hover:bg-teal-50 font-bold shadow-lg" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-teal-800/50 border-teal-400/30 text-teal-100 hover:bg-teal-800/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/edc-women-trade-export-financing-guide">
                    Am I Export Ready?
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-teal-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-teal-900 gap-4">
              <span className="font-semibold text-teal-900 flex items-center shrink-0">
                <Globe className="w-4 h-4 mr-2 text-teal-600" />
                Topic:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-teal-700 transition-colors flex items-center gap-1"><DollarSign className="w-3 h-3" /> Equity Fund</Link>
                <Link href="#credit" className="hover:text-teal-700 transition-colors flex items-center gap-1"><Shield className="w-3 h-3" /> Insurance</Link>
                <Link href="#process" className="hover:text-teal-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#canexport" className="hover:text-teal-700 transition-colors flex items-center gap-1"><Rocket className="w-3 h-3" /> CanExport</Link>
                <Link href="#faq" className="hover:text-teal-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-teal-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-teal-600 mb-2">$50M</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Investment Fund</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Insured value</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Equity</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Direct Investment</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">Global</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Market Access</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Programs Section */}
        <section id="programs" className="py-16 bg-teal-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">EDC Women in Trade Programs</h2>

              {/* Programs */}
              <div className="space-y-8">
                {/* Inclusive Trade Investments */}
                <Card className="border-l-4 border-l-teal-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="w-8 h-8 text-teal-600" />
                        <CardTitle className="text-xl">Inclusive Trade Investments (ITI)</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-teal-100 text-teal-800">Equity Capital</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      EDC invests directly into your company to fuel global growth. This is equity (ownership), not a loan, meaning no monthly repayments but you give up some shares.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm bg-white border border-teal-100 p-4 rounded-lg">
                      <ul className="space-y-2">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Growth capital for scaling</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Patient capital (long-term)</li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> For high-growth exporters</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Must be 51% diverse-owned</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Credit Insurance */}
                <Card id="credit" className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">Export Credit Insurance</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-blue-300 text-blue-700">Risk Protection</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The biggest fear in exporting is not getting paid. EDC insures your receivables so you can sleep at night.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-blue-100 text-blue-800">Covers 90% of Loss</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Unlock Bank Loans</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Offer Better Terms to Buyers</Badge>
                    </div>
                    <div className="text-xs text-slate-500 italic">
                      *Banks love this. Since your foreign invoices are insured, banks will often lend you money against them (margining).
                    </div>
                  </CardContent>
                </Card>

                {/* CanExport */}
                <Card id="canexport" className="border-l-4 border-l-purple-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Rocket className="w-8 h-8 text-purple-600" />
                        <CardTitle className="text-xl">CanExport Cost-Sharing (Grant)</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      While EDC runs financing, they partner with the Trade Commissioner Service for this grant. It pays for 50% of your marketing costs to enter a NEW country.
                    </p>
                    <div className="bg-purple-50 p-3 rounded text-sm text-purple-800">
                      <strong>Eligible Costs:</strong> Trade show booths, translating your website, SEO for foreign markets, and patent filings.
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
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Export Application Timeline</h2>

              <div className="relative border-l-2 border-slate-200 pl-8 space-y-12 ml-4 md:ml-0">

                <div className="relative">
                  <div className="absolute -left-[41px] bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Export Readiness Check</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Before applying, you must show "Export Readiness". Do you have capacity to fill orders? Is your IP protected?
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Engage Trade Commissioner</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Contact the TCS (Trade Commissioner Service). They are free consultants who can validate your international plan – a crucial step for EDC approval.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Apply for Financing</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    For equity (ITI), pitch directly to EDC. For working capital guarantees, you often start with your own bank, and they bring EDC in to "guarantee" the loan.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Expansion</h3>
                  <p className="text-slate-600 text-sm">
                    Use CanExport grants to fund the marketing travel, and EDC insurance to secure the deals.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About EDC Funding</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Is EDC only for big companies?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No. EDC serves thousands of small businesses. If you have a contract with a US buyer for $50k, EDC can insure it. You don't need to be a multinational corporation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. How much does Export Insurance cost?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    It varies by country and customer risk, but typically costs between <strong>0.5% and 1.5%</strong> of the invoice value. For the peace of mind (and bankability) it provides, this is very cheap.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. Can I use CanExport for the USA?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Only if it is a NEW market for you. If you already export to New York but want to expand to California, that usually doesn't count. But if you have zero US sales, yes. Check the <a href="https://www.tradecommissioner.gc.ca/funding-financement/canexport/sme-pme/index.aspx?lang=eng" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Applicant Guide</a> for specifics.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Does EDC give grants?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    EDC itself does not give grants; they do lending and insurance. However, they are a key partner in the disbursement of the Inclusive Trade Investment Program (equity).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. What counts as "Diverse-Owned"?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    For the Inclusive Trade provisions, the business must be 51%+ owned/managed by women, Indigenous peoples, Black Canadians, or other equity-deserving groups.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. How helps me find foreign buyers?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We recommend starting with the <a href="https://www.tradecommissioner.gc.ca/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Trade Commissioner Service (TCS)</a>. They have offices in 160+ cities worldwide and can introduce you to vetted potential partners for free.
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
                <Link href="/guides/bdc-women-entrepreneurs-financing-guide" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Domestic Loans</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">BDC Women Loans</h4>
                    <p className="text-sm text-slate-500 flex-grow">Domestic working capital loans.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/women-entrepreneurship-fund-guide" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Domestic Grants</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">Women Grant Fund</h4>
                    <p className="text-sm text-slate-500 flex-grow">Non-repayable domestic funding.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/canada-manufacturing-funding-guide" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Sector</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Manufacturing Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">Scaling production for export.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-teal-600 mr-2" />
                Export Export FAQs
              </h2>
              <div className="divide-y divide-teal-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Is EDC government owned?</h3>
                  <p className="text-slate-600 text-sm">Yes, Export Development Canada is a Crown corporation. Their mandate is to support Canadian trade, but they operate commercially (they charge for insurance).</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I use CanExport for the USA?</h3>
                  <p className="text-slate-600 text-sm">Partially. CanExport is for <em>new</em> markets. If you already export to New York but want to expand to California, that generally doesn't count. But if you've never sold to the US, then yes.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Does EDC invest in startups?</h3>
                  <p className="text-slate-600 text-sm">Typically no. EDC seeks established companies ready to scale. For early-stage tech, BDC's Thrive Venture Fund is a better fit.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-teal-900 to-green-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Go Global with Confidence</h2>
            <p className="text-lg text-teal-200 mb-8 max-w-2xl mx-auto">
              Don't let financing hold you back from international markets. Our experts help you navigate EDC and CanExport.
            </p>
            <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=export-financing-help">
                Get Export Funding Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
