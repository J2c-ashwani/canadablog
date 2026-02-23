import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Building, Target, DollarSign, AlertTriangle, HelpCircle, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Small Business Grants 2026 | SBA & Federal Funding Guide",
  description: "Stop searching for 'free money' scams. Learn the real way to get small business funding through SBA 7(a) loans, microloans, and federal grants.",
  keywords: "small business grants, SBA 7a loan requirements, apply for business grants, federal small business funding, startup grants",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-small-business-grants",
  },
  openGraph: {
    title: "Small Business Grants & Loans Guide 2026",
    description: "The definitive guide to SBA loans and federal grants. Learn the difference between 7(a) loans and SBIR grants.",
    url: "https://www.fsidigital.ca/guides/apply-small-business-grants",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are there grants for starting a business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rarely. Federal grants are typically for 'non-commercial' activities like research (SBIR) or non-profits. For a standard business (restaurant, retail, consulting), you typically need an SBA loan, not a grant."
      }
    },
    {
      "@type": "Question",
      "name": "What is an SBA 7(a) loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is the SBA's primary program for providing financial assistance to small businesses. The SBA guarantees a portion of the loan, which makes it easier for banks to lend to you."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a business plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every lender and grant agency will require a detailed business plan that outlines your revenue model, market analysis, and financial projections."
      }
    },
    {
      "@type": "Question",
      "name": "What credit score do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For SBA loans, most lenders look for a personal credit score of 680 or higher, though some microloans may accept lower scores."
      }
    }
  ]
}

export default function ApplySmallBusinessGrantsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-500/20 text-blue-100 border-blue-400/30 backdrop-blur-sm">
                🏢 SMB Funding Masterclass
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Small Business Grants <br className="hidden md:block" /> & Funding Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
                Navigate the <strong>$500 Billion</strong> world of federal funding. <br className="hidden md:block" /> Loans, Grants, and Micro-financing explained.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold shadow-lg" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-800/50 border-blue-400/30 text-blue-100 hover:bg-blue-800/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/apply-sba-loans">
                    Download Checklist
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-blue-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-blue-900 gap-4">
              <span className="font-semibold text-blue-900 flex items-center shrink-0">
                <Target className="w-4 h-4 mr-2 text-blue-600" />
                Topic:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-blue-700 transition-colors flex items-center gap-1"><DollarSign className="w-3 h-3" /> Funding Types</Link>
                <Link href="#sba-process" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Process</Link>
                <Link href="#documentation" className="hover:text-blue-700 transition-colors flex items-center gap-1"><FileText className="w-3 h-3" /> Documents</Link>
                <Link href="#faq" className="hover:text-blue-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-blue-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$5M</div>
                  <div className="text-blue-900 text-sm font-medium uppercase tracking-wide">Max SBA Loan</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">9-11%</div>
                  <div className="text-blue-900 text-sm font-medium uppercase tracking-wide">Typical Interest (7a)</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">10 Years</div>
                  <div className="text-blue-900 text-sm font-medium uppercase tracking-wide">Working Capital Term</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">30 Days</div>
                  <div className="text-blue-900 text-sm font-medium uppercase tracking-wide">Avg Approval Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section id="programs" className="py-16 bg-blue-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Funding Options Explained</h2>

              <div className="space-y-8">
                {/* SBA 7(a) */}
                <Card className="border-l-4 border-l-blue-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">SBA 7(a) Loan</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">Most Popular</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The "Standard" small business loan. Can be used for almost anything: real estate, inventory, or buying another business.
                    </p>
                    <div className="bg-white border border-blue-100 p-4 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                        <div className="font-semibold text-center bg-blue-50 p-2 rounded">Guaranteed up to 85%</div>
                        <div className="font-semibold text-center bg-blue-50 p-2 rounded">Amortized (Monthly Payments)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Microloans */}
                <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target className="w-8 h-8 text-green-500" />
                        <CardTitle className="text-xl">SBA Microloans</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Smaller loans up to $50,000 for startups and minorities who might not qualify for a big bank loan. Often includes free mentoring.
                    </p>
                  </CardContent>
                </Card>

                {/* Grants (SBIR) */}
                <Card className="border-l-4 border-l-purple-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-8 h-8 text-purple-600" />
                        <CardTitle className="text-xl">Grants (SBIR/STTR)</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">No Repayment</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      <strong>Warning:</strong> Generally only for high-tech R&D (biotech, AI, energy). NOT for opening a coffee shop or buying a truck.
                    </p>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* Application Process Timeline */}
        <section id="sba-process" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">The Application Flow</h2>

              <div className="relative border-l-2 border-blue-200 pl-8 space-y-12 ml-4 md:ml-0">

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Prepare Financials</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    You need 3 years of tax returns (Personal & Business), a P&L statement, and a Balance Sheet. No messy shoeboxes of receipts.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Find a Lender</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Use the <strong>SBA Lender Match</strong> tool. Do not just walk into a random bank; find one that specializes in 7(a) lending.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Submit Application</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    This will include SBA Form 1919 and Form 413 (Personal Financial Statement).
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Underwriting & Closing</h3>
                  <p className="text-slate-600 text-sm">
                    The bank vets you. If approved, you sign papers, pay closing costs, and funds are wired.
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
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About Small Business Grants</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. How do I find "free money" for my business?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    True "free money" (unrestricted grants) is exceptionally rare for for-profit businesses. Most legitimate grants are for very specific activities like scientific research (<a href="https://www.sbir.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SBIR</a>) or export expansion. Be very skeptical of any site promising easy grants for a fee.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Does the SBA lend money directly?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No. The Small Business Administration is primarily a <strong>guarantor</strong>. You borrow working capital from a commercial bank (like Chase, Wells Fargo, or a local credit union), and the SBA promises to pay them back if you default. This is why you apply at a bank, not at an SBA office.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. Can I use a grant for payroll?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Generally, no. Grants are usually project-based (e.g., "Build a prototype" or "audit your energy usage"). They are rarely for operational expenses like rent or payroll. Loans, however, are specifically designed for these working capital needs.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Do I need to hire a grant writer?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    For federal grants like SBIR, yes, professional help is often needed due to the complexity. For smaller corporate grants ($5k-$10k), you can usually write them yourself. <strong>Never</strong> pay a "grant finder" just to see a list of grants; that information is free on <a href="https://www.grants.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Grants.gov</a>.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. What is the difference between a grant and a loan?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    A <strong>Grant</strong> does not need to be repaid (unless you misuse the funds). A <strong>Loan</strong> must be repaid with interest. A <strong>Forgivable Loan</strong> turns into a grant if you meet certain conditions (like the PPP loans during COVID), but these are currently rare.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. Where can I get free advice?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    You should utilize <a href="https://www.score.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SCORE</a>. They are an SBA partner that provides free, volunteer business mentors who can help you review your business plan and financing application before you go to the bank.
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
              <h3 className="text-xl font-bold text-slate-900 mb-6">Explore More Funding</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-sba-loans" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Deep Dive</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">SBA Loans (7a)</h4>
                    <p className="text-sm text-slate-500 flex-grow">Detailed guide on 7(a).</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-minority-grants" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Minority</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">Minority Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">8(a) and WOSB details.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/sba-growth-accelerator-fund-guide" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Ecosystem</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Accelerator Fund</h4>
                    <p className="text-sm text-slate-500 flex-grow">For incubators & accelerators.</p>
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
                <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
                Funding FAQs
              </h2>
              <div className="divide-y divide-blue-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Is there really "free money"?</h3>
                  <p className="text-slate-600 text-sm">Generally, no. Most "grants" are scams. Legitimate grants are highly competitive and specific (research, non-profit, clean energy). Loans are the standard way to grow.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I use the money to pay myself?</h3>
                  <p className="text-slate-600 text-sm">With an SBA loan, yes, you can include working capital for salaries, including your own, provided it is reasonable and documented.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What if I have bad credit?</h3>
                  <p className="text-slate-600 text-sm">Consider a Microloan or a CDFI (Community Development Financial Institution). They are non-profits that lend to "unbankable" businesses.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Fund Your Dream</h2>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Ready to apply? We help you prepare your financial package so lenders say "Yes."
            </p>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=funding-prep">
                Get Funding Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
