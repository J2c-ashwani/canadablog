import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, MapPin, Target, DollarSign, AlertTriangle, Shield, HelpCircle, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EEATBadge from '@/components/blog/EEATBadge';
import EligibleCheck from '@/components/blog/EligibleCheck';
import StickyTOC from '@/components/blog/StickyTOC';
import InlineCTA from '@/components/blog/InlineCTA';

export const metadata: Metadata = {
  title: "California Small Business Loan Guarantee 2026 | IBank Guide",
  description: "Official guide to the California Small Business Loan Guarantee Program (SSBCI). How to get state-backed loans up to $2.5 million if you lack collateral.",
  keywords: "California small business loan guarantee, IBank loan guarantee, California SSBCI, state backed business loans, FDC loan guarantee",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/california-loan-guarantee-guide",
  },
  openGraph: {
    title: "California Small Business Loan Guarantee Guide 2026",
    description: "Get approved for a business loan even if you lack collateral. The state of California will guarantee up to 95% of your loan.",
    url: "https://www.fsidigital.ca/guides/california-loan-guarantee-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the California Loan Guarantee Program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is a program where the State of California (via IBank) guarantees up to 95% of a business loan, encouraging lenders to fund businesses that might otherwise be rejected due to lack of collateral."
      }
    },
    {
      "@type": "Question",
      "name": "Who is eligible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Small businesses located in California with 1-750 employees. You must be a for-profit entity and demonstrate that you cannot obtain full financing elsewhere on reasonable terms."
      }
    },
    {
      "@type": "Question",
      "name": "What is the maximum loan amount?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The program can guarantee loans up to $20 million, but the guaranteed portion is capped at $2.5 million (or 95% of the loan, whichever is less)."
      }
    },
    {
      "@type": "Question",
      "name": "How do I apply?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You do NOT apply to the state directly. You must apply through a participating lender or a Financial Development Corporation (FDC). They submit the guarantee package on your behalf."
      }
    }
  ]
}

export default function CaliforniaLoanGuaranteeGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-500 to-orange-600 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-amber-200/20 text-amber-50 border-amber-200/30 backdrop-blur-sm">
                🏛️ California State Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                California Small Business <br className="hidden md:block" /> Loan Guarantee
              </h1>
              
              <div className="text-left mb-6 max-w-4xl mx-auto shadow-sm mt-6 relative z-20">
                 <ShortAnswerBox content="California Small Business Loan Guarantee Program Guide — Complete guide to accessing California state loan guarantees for small businesses." />
              </div>
              <div className="flex justify-center mb-8 relative z-20">
                 <div className="inline-block text-left bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl overflow-hidden">
                    <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-02-25" />
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-800 hover:bg-orange-50 font-bold shadow-lg" asChild>
                  <Link href="#fdc-map">
                    Find a Lender
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-orange-800/50 border-amber-200/30 text-amber-50 hover:bg-orange-800/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/california-loan-guarantee-guide">
                    Download Checklist
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 max-w-4xl my-8"><EligibleCheck /></div>

        <StickyTOC links={[
      { title: 'Loans', id: 'loans' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'Application', id: 'application' }, { title: 'FAQ', id: 'faq' }
    ]} />


        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-orange-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-orange-900 gap-4">
              <span className="font-semibold text-orange-900 flex items-center shrink-0">
                <Shield className="w-4 h-4 mr-2 text-orange-600" />
                Jump to:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#how-it-works" className="hover:text-orange-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> How It Works</Link>
                <Link href="#eligibility" className="hover:text-orange-700 transition-colors flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Eligibility</Link>
                <Link href="#fdc-map" className="hover:text-orange-700 transition-colors flex items-center gap-1"><MapPin className="w-3 h-3" /> Find FDC</Link>
                <Link href="#faq" className="hover:text-orange-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-orange-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-orange-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">$2.5M</div>
                  <div className="text-orange-900 text-sm font-medium uppercase tracking-wide">Max Guarantee</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-orange-900 text-sm font-medium uppercase tracking-wide">Coverage</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">7 Years</div>
                  <div className="text-orange-900 text-sm font-medium uppercase tracking-wide">Term (Working Capital)</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">Non-Profits</div>
                  <div className="text-orange-900 text-sm font-medium uppercase tracking-wide">Also Eligible</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section id="how-it-works" className="py-16 bg-orange-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How the Guarantee Works</h2>

              <div className="grid gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-orange-100 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Shield className="w-24 h-24 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">The Problem & Solution</h3>
                  <p className="text-slate-600 mb-6 text-lg">
                    Banks want collateral (real estate, cash) to secure a loan. If you rent your office and don't own a home, the bank usually says "No."
                  </p>
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                    <p className="text-orange-900 font-medium">
                      <strong>The Solution:</strong> The State of California steps in and says, "We will cover 80-95% of the loss if this business defaults." The bank now feels safe to lend to you.
                    </p>
                  </div>
                </div>

                <Card className="shadow-lg border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-blue-800 flex items-center"><DollarSign className="w-5 h-5 mr-2" /> Use of Funds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Start-up costs</li>
                        <li className="flex items-center text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Inventory & Working Capital</li>
                        <li className="flex items-center text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Franchise Fees</li>
                      </ul>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Machinery & Equipment</li>
                        <li className="flex items-center text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Real Estate Purchase</li>
                        <li className="flex items-center text-slate-700"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Bridge Loans</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </section>

        {/* FDC Map Section */}
        <section id="fdc-map" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
        <div className="container mx-auto px-4 max-w-4xl my-12"><InlineCTA {...{
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
    }} /></div>
<h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Find Your FDC Contact</h2>
              <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                You do not apply to the "State." You apply through a <strong>Financial Development Corporation (FDC)</strong>. Find the one in your region below.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Card className="hover:border-orange-400 transition-colors">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-slate-900">Nor-Cal FDC</h4>
                      <p className="text-sm text-slate-500">Serves: Bay Area & Northern CA</p>
                      <a href="https://www.nor-calfdc.org/" target="_blank" className="text-orange-600 text-sm font-medium hover:underline mt-2 inline-block">Visit Website →</a>
                    </CardContent>
                  </Card>
                  <Card className="hover:border-orange-400 transition-colors">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-slate-900">Pacific Coast Regional (PCR)</h4>
                      <p className="text-sm text-slate-500">Serves: Los Angeles & Southern CA</p>
                      <a href="https://pcrccorp.org/" target="_blank" className="text-orange-600 text-sm font-medium hover:underline mt-2 inline-block">Visit Website →</a>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Card className="hover:border-orange-400 transition-colors">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-slate-900">California Capital FDC</h4>
                      <p className="text-sm text-slate-500">Serves: Sacramento & Central Valley</p>
                      <a href="https://cacapital.org/" target="_blank" className="text-orange-600 text-sm font-medium hover:underline mt-2 inline-block">Visit Website →</a>
                    </CardContent>
                  </Card>
                  <Card className="hover:border-orange-400 transition-colors">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-slate-900">CDC Small Business Finance</h4>
                      <p className="text-sm text-slate-500">Serves: San Diego & Imperial</p>
                      <a href="https://cdcloans.com/" target="_blank" className="text-orange-600 text-sm font-medium hover:underline mt-2 inline-block">Visit Website →</a>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About the State Guarantee</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Is the guarantee a direct loan from the state?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No. The state (via IBank) does not lend you money directly. You still borrow from a commercial bank or credit union. The state simply signs a contract with the bank promising to repay up to 95% of the loan if you fail to do so. This typically lowers the interest rate you are offered.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. How long does the approval process take?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The FDC approval is surprisingly fast—often <strong>2-3 weeks</strong> once a complete package is submitted. However, the participating lender (your bank) has their own underwriting process which can take 30-60 days. Working with an experienced FDC can speed this up significantly.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. What happens if I default on the loan?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    If you default, the bank will first attempt to collect from your business assets. If a balance remains, they file a claim with the state. The state pays the bank the guaranteed portion. <strong>Crucially:</strong> You are still liable for the debt. The state may pursue you for repayment of the amount they paid to the bank. A loan guarantee is not loan forgiveness.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Can I use this for refinancing existing debt?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Generally, yes, but with restrictions. The refinancing must provide a "substantial benefit" to your business, such as significantly lowering your monthly payments or freeing up cash flow for expansion. You cannot use it to pay off owners or investors.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. Does my personal credit score matter?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes. While the guarantee mitigates collateral risk, most lenders still require a personal guarantee from any owner with &gt;20% equity. A credit score below 640 may be challenging, though some mission-driven lenders (CDFIs) have more flexible requirements than big commercial banks.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. Is there a minimum loan amount?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    There is no strict statutory minimum, but practically, most lenders won't process a guarantee for loans under $25,000 due to the paperwork involved. For smaller amounts, microloans (which often don't require the state guarantee) might be a better fit.
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
                    <div className="text-sm text-blue-600 font-semibold mb-2">Federal</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">SBA Loans (7a)</h4>
                    <p className="text-sm text-slate-500 flex-grow">Nationwide loan guarantees.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-doe-clean-energy-grants" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Energy</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Clean Energy Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">For California green tech.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-csbfp-loans" className="group block h-full">
                  <div className="bg-white border hover:border-red-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-red-600 font-semibold mb-2">Canada</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-red-700 mb-2">CSBFP Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">Canada's equivalent program.</p>
                    <div className="mt-3 text-xs text-red-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
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
                <HelpCircle className="w-6 h-6 text-orange-600 mr-2" />
                Program FAQs
              </h2>
              <div className="divide-y divide-orange-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Is this free money?</h3>
                  <p className="text-slate-600 text-sm">No. This is a <strong>loan</strong> that you must pay back. The "Guarantee" is for the bank, not you. It protects the bank if you fail to pay.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Are non-profits eligible?</h3>
                  <p className="text-slate-600 text-sm">Yes! Unlike the SBA 7(a) program, the California Loan Guarantee Program allows non-profits to apply for certain guarantee types.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What interest rate will I pay?</h3>
                  <p className="text-slate-600 text-sm">Interest rates are negotiated between you and the lender, but they are generally capped at a reasonable spread over the Prime Rate (e.g., Prime + 2%).</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-orange-900 to-amber-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get State-Backed</h2>
            <p className="text-lg text-orange-200 mb-8 max-w-2xl mx-auto">
              Don't let lack of collateral stop your growth. Contact our team to match with an IBank participating lender.
            </p>
            <Button size="lg" className="bg-white text-orange-900 hover:bg-orange-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=california-loan-match">
                Match with a Lender
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
