import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, CreditCard, Building2, Target, DollarSign, AlertCircle, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SBA Loan Requirements 2025 | 7(a), 504 & Microloans",
  description: "Official guide to applying for SBA loans. Compare 7(a), CDC/504, and Microloan requirements. Learn how to get approved for up to $5M.",
  keywords: "SBA loan requirements, SBA 7a loan application, SBA 504 loan guide, federal small business loans, SBA lender match",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-sba-loans",
  },
  openGraph: {
    title: "SBA Loan Application Guide 2025 | $5M Funding",
    description: "Step-by-step process for SBA 7(a) and 504 loans. Download checklists and find approved lenders.",
    url: "https://www.fsidigital.ca/guides/apply-sba-loans",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between SBA 7(a) and 504 loans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 7(a) loan is flexible and can be used for working capital, equipment, or buying a business. The 504 loan is strictly for major fixed assets like real estate or heavy machinery and offers long-term fixed rates."
      }
    },
    {
      "@type": "Question",
      "name": "What credit score is needed for an SBA loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While the SBA doesn't set a hard minimum, most lenders look for a personal credit score of 680 or higher. For SBA 7(a) Small Loans, the SBA pre-screens with a FICO SBSS score of 155+."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to get an SBA loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It varies by lender. SBA Express loans can be approved in days, while standard 7(a) loans typically take 60-90 days from application to funding due to thorough underwriting."
      }
    },
    {
      "@type": "Question",
      "name": "Is an SBA loan a grant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. SBA loans are debt that must be repaid with interest. They are 'guaranteed' by the government, which reduces risk for the bank, but you (the borrower) are fully responsible for repayment."
      }
    }
  ]
}

export default function ApplySBALoansGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-500/20 text-blue-100 border-blue-400/30 backdrop-blur-sm">
                🏢 Federal Loan Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                How to Apply for <br className="hidden md:block" /> SBA Loans (2025)
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
                The complete handbook to 7(a), 504, and Microloans. <br className="hidden md:block" /> Secure up to <strong>$5 Million</strong> in government-backed funding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold shadow-lg" asChild>
                  <Link href="#types">
                    Compare Loan Types
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-800/50 border-blue-400/30 text-blue-100 hover:bg-blue-800/80 backdrop-blur-sm" asChild>
                  <Link href="/blog/sba-loan-requirements-checklist">
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
                <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                Jump to:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#types" className="hover:text-blue-700 transition-colors flex items-center gap-1"><CreditCard className="w-3 h-3" /> Loan Types</Link>
                <Link href="#requirements" className="hover:text-blue-700 transition-colors flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Eligibility</Link>
                <Link href="#process" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
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
                  <div className="text-blue-800 text-sm font-medium uppercase tracking-wide">Max 7(a) Loan</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">25yr</div>
                  <div className="text-blue-800 text-sm font-medium uppercase tracking-wide">Max Term</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">680+</div>
                  <div className="text-blue-800 text-sm font-medium uppercase tracking-wide">Min Credit (Avg)</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">10%</div>
                  <div className="text-blue-800 text-sm font-medium uppercase tracking-wide">Typical Down Pmt</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section id="types" className="py-16 bg-blue-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Choose Your SBA Pathway</h2>

              <div className="space-y-8">
                {/* 7(a) Loans */}
                <Card className="border-l-4 border-l-green-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-green-600" />
                        <CardTitle className="text-xl">SBA 7(a) Loan (Standard)</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Most Popular</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The "do-it-all" loan. Use it for working capital, buying a business, debt refinancing, or equipment.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm bg-white border border-green-100 p-4 rounded-lg">
                      <ul className="space-y-2">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Up to $5 Million</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 10-25 year terms</li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Can include goodwill</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Variable or fixed rates</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* 504 Loans */}
                <Card className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">CDC/504 Loan (Real Estate)</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Strictly for massive fixed assets. Buying a warehouse? Heavy manufacturing equipment? This is the one.
                    </p>
                    <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
                      <strong>Structure:</strong> 50% Bank Loan + 40% SBA Debenture + 10% You. This means you only put 10% down on a multimillion dollar property.
                    </div>
                  </CardContent>
                </Card>

                {/* Microloans */}
                <Card className="border-l-4 border-l-purple-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target className="w-8 h-8 text-purple-600" />
                        <CardTitle className="text-xl">SBA Microloan</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Small loans (up to $50k) for startups and minorities, delivered via non-profit intermediaries, not banks.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge className="bg-purple-100 text-purple-800">Easiest to Qualify</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Includes Mentoring</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Max 6 Year Term</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="requirements" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Eligibility Checklist</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Must Haves</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>For-Profit:</strong> Must operate for profit in the US.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Owner Equity:</strong> You must have "skin in the game" (time or money).</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Need:</strong> Must demonstrate you can't get credit elsewhere on reasonable terms.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Deal Breakers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Delinquency:</strong> Default on prior government loans (student loans, FHA).</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Ineligible Industry:</strong> Gambling, lending, speculation, or pyramid sales.</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Criminal Record:</strong> Certain recent criminal history may disqualify owners.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section id="process" className="py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">The "Lender Match" Process</h2>

              <div className="relative border-l-2 border-blue-200 pl-8 space-y-12 ml-4 md:ml-0">

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Build the Packet</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Before talking to a bank, gather: SBA Form 1919, 3 years of tax returns, Personal Financial Statement (SBA Form 413), and a Business Plan.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Find a "Preferred Lender"</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Do not just walk into any bank. Find an SBA <strong>Preferred Lender (PLP)</strong>. They have authority to approve loans in-house without sending files to the SBA, saving weeks.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Underwriting (60-90 Days)</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    The bank analyzes your "5 C's": Character, Cash Flow, Collateral, Capital, and Conditions. Be prepared for lots of questions.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Closing & Disbursement</h3>
                  <p className="text-slate-600 text-sm">
                    Once approved, you sign the Note. Funds are often disbursed directly to vendors (if buying equipment) or to your operating account.
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
                <Link href="/guides/apply-small-business-grants" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Grants</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">General Grants Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">Free funding options.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/bdc-women-entrepreneurs-financing-guide" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Canada</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">BDC Loans (Canada)</h4>
                    <p className="text-sm text-slate-500 flex-grow">Canadian equivalent of SBA.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-startup-grants" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Startups</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Startup Funding</h4>
                    <p className="text-sm text-slate-500 flex-grow">For early stage companies.</p>
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
                SBA FAQs
              </h2>
              <div className="divide-y divide-blue-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Do I need collateral?</h3>
                  <p className="text-slate-600 text-sm">For loans under $25,000, typically no. But for loans over $350,000, the SBA requires the lender to collateralize the loan to the maximum extent possible (including personal real estate).</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Is there a prepayment penalty?</h3>
                  <p className="text-slate-600 text-sm">For loans under 15 years, usually no. For loans 15 years or longer (like real estate), there is a prepayment penalty during the first 3 years.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I refinance existing debt?</h3>
                  <p className="text-slate-600 text-sm">Yes, but only if the new payment is at least 10% lower than the current payment (Debt Refinance with Expansion).</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get SBA Approved</h2>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              SBA paperwork is daunting. Our experts help you package your 7(a) or 504 application for speed and success.
            </p>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=sba-loan-help">
                Get SBA Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
