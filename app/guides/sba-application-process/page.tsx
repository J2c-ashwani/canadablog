import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, AlertCircle, HelpCircle, ArrowRight, TrendingUp, DollarSign, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EEATBadge from '@/components/blog/EEATBadge';
import EligibleCheck from '@/components/blog/EligibleCheck';
import StickyTOC from '@/components/blog/StickyTOC';
import InlineCTA from '@/components/blog/InlineCTA';

export const metadata: Metadata = {
  title: "SBA Application Process 2026 | Step-by-Step Approval Guide",
  description: "Master the SBA application process. From EIN registration to 'Lender Match' and final approval. Download the 2025 document checklist.",
  keywords: "SBA application process, SBA 7a application steps, lenders match, SBA grant application, small business funding guide",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/sba-application-process",
  },
  openGraph: {
    title: "SBA Loan & Grant Application Guide 2026",
    description: "Step-by-step walkthrough of the federal funding process. Avoid common rejection mistakes.",
    url: "https://www.fsidigital.ca/guides/sba-application-process",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does the SBA application process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It typically takes 60-90 days from initial application to funding for standard 7(a) loans. SBA Express loans can be faster (30-45 days), while complex 504 loans may take longer."
      }
    },
    {
      "@type": "Question",
      "name": "Do I apply directly to the SBA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For loans (7(a), 504), NO. You apply through an SBA-approved lender (bank). For disaster loans (EIDL), you apply directly at SBA.gov. For grants (SBIR), you apply via Grants.gov."
      }
    },
    {
      "@type": "Question",
      "name": "What is the most common reason for rejection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Incomplete documentation and lack of cash flow to service the debt. The SBA requires proof that your business can afford the loan payments based on historical tax returns."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a fee to apply?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Banks may charge a packaging fee, but the SBA sets limits on these fees. You should never pay an upfront fee to a 'broker' just to apply. Official assistance from SBDCs and SCORE is free."
      }
    }
  ]
}

export default function SBAApplicationProcessGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-800 to-gray-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-slate-500/20 text-slate-100 border-slate-400/30 backdrop-blur-sm">
                📋 Application Masterclass
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                The SBA Application <br className="hidden md:block" /> Process (2026)
              </h1>
              
              <div className="text-left mb-6 max-w-4xl mx-auto shadow-sm mt-6 relative z-20">
                 <ShortAnswerBox content="The SBA application takes 30-90 days. You need a 640+ credit score, 10-20% down payment, and proof you can't get a conventional loan. Start at SBA.gov/lender-match to find an approved lender." />
              </div>
              <div className="flex justify-center mb-8 relative z-20">
                 <div className="inline-block text-left bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl overflow-hidden">
                    <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-02-25" />
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-50 font-bold shadow-lg" asChild>
                  <Link href="#checklist">
                    View Checklist
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-slate-800/50 border-slate-400/30 text-slate-100 hover:bg-slate-800/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/sba-application-process">
                    Download PDF
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 max-w-4xl my-8"><EligibleCheck /></div>

        <StickyTOC links={[
      { title: 'Requirements', id: 'requirements' },
      { title: 'Documents', id: 'documents' },
      { title: 'Timeline', id: 'timeline' },
      { title: 'Mistakes', id: 'mistakes' }
    ]} />


        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-slate-900 gap-4">
              <span className="font-semibold text-slate-900 flex items-center shrink-0">
                <FileText className="w-4 h-4 mr-2 text-slate-600" />
                Steps:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#step1" className="hover:text-blue-700 transition-colors flex items-center gap-1"><CheckCircle className="w-3 h-3" /> 1. Qualify</Link>
                <Link href="#step2" className="hover:text-blue-700 transition-colors flex items-center gap-1"><FileText className="w-3 h-3" /> 2. Documents</Link>
                <Link href="#step3" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Users className="w-3 h-3" /> 3. Lender Match</Link>
                <Link href="#faq" className="hover:text-blue-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                <div className="p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">60-90</div>
                  <div className="text-slate-800 text-sm font-medium uppercase tracking-wide">Days to Fund</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                  <div className="text-slate-800 text-sm font-medium uppercase tracking-wide">Documents Needed</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">680+</div>
                  <div className="text-slate-800 text-sm font-medium uppercase tracking-wide">Credit Score</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">10%</div>
                  <div className="text-slate-800 text-sm font-medium uppercase tracking-wide">Down Payment</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* Step 1 */}
              <div id="step1" className="mb-16 relative border-l-2 border-slate-200 pl-8 ml-4 md:ml-0">
                <div className="absolute -left-[41px] bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">1</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Verify Eligibility First</h2>
                <p className="text-lg text-slate-600 mb-6">
                  Don't waste 3 months applying if you are automatically disqualified. Check these deal-breakers immediately.
                </p>
                <Card className="bg-red-50 border-red-100">
                  <CardHeader>
                    <CardTitle className="text-red-800 flex items-center"><AlertCircle className="w-5 h-5 mr-2" /> Automatic Disqualifiers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start text-sm text-red-900">
                        <span className="mr-2">•</span> <strong>Default on Government Debt:</strong> Have you defaulted on a student loan or FHA loan? You are ineligible.
                      </li>
                      <li className="flex items-start text-sm text-red-900">
                        <span className="mr-2">•</span> <strong>Criminal History:</strong> Recent felonies or current probation/parole can be a bar.
                      </li>
                      <li className="flex items-start text-sm text-red-900">
                        <span className="mr-2">•</span> <strong>Ineligible Industry:</strong> Gambling, pyramid schemes, lending, or adult industries.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Step 2 */}
              <div id="step2" className="mb-16 relative border-l-2 border-slate-200 pl-8 ml-4 md:ml-0">
                <div className="absolute -left-[41px] bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">2</div>
                
        <div className="container mx-auto px-4 max-w-4xl my-12"><InlineCTA {...{
      description: "Need help with your SBA application? Our funding specialists guide you through every step.",
    }} /></div>
<h2 className="text-3xl font-bold text-slate-900 mb-6">The "Packet" (Documents)</h2>
                <p className="text-lg text-slate-600 mb-6">
                  Lenders will not look at you without a complete packet. Gather these BEFORE you approach a bank.
                </p>
                <Card className="border-blue-100 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-blue-800 flex items-center"><FileText className="w-5 h-5 mr-2" /> Application Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-slate-900 mb-2">Financials</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> 3 Years Business Tax Returns</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> Year-to-Date P&L Statement</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> Year-to-Date Balance Sheet</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> Schedule of Business Debt</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-2">Personal & Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> 3 Years Personal Tax Returns</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> Personal Financial Statement (SBA Form 413)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> Business Licenses & Articles</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> Ownership Structure Chart</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Step 3 */}
              <div id="step3" className="mb-16 relative border-l-2 border-slate-200 pl-8 ml-4 md:ml-0">
                <div className="absolute -left-[41px] bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">3</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Find a Preferred Lender</h2>
                <p className="text-lg text-slate-600 mb-6">
                  Do not apply to every bank. Use the SBA's "Lender Match" tool or find a local bank with <strong>PLP (Preferred Lender Program)</strong> status.
                </p>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Why PLP Matters?</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Non-PLP banks have to send your application to the SBA for approval (adds 3-4 weeks). PLP banks have authority to approve the loan <em>on behalf of</em> the SBA instantly.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="https://www.sba.gov/funding-programs/loans/lender-match" target="_blank">
                      Use SBA Lender Match <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About SBA Applications</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. How long does it really take?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Realistically, plan for <strong>60 to 90 days</strong>. While some "Express" loans close in 30 days, most standard 7(a) deals involve back-and-forth negotiation with the underwriter. It is not a quick fix for next week's payroll.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. What is "Equity Injection"?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    This is your down payment. You typically need to put in 10-20% of the total project cost. Importantly, you must <strong>source</strong> this money—meaning you must show 3 months of bank statements proving it isn't borrowed from another credit card.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. Do I need life insurance?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Almost always, yes. If you are key to the business, the lender will require a life insurance policy assigned to the bank for the amount of the loan. This ensures the loan is paid off if something happens to you.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. Can I buy a business with an SBA loan?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes! This is one of the most popular uses of the 7(a) program. You generally need 10% equity, and the seller can sometimes carry a "standby note" to help cover part of the equity requirement.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. What collateral is required?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The SBA requires banks to take "all available collateral" until the loan is fully secured. This often includes business assets (machinery, inventory) and personal assets (your home).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. Who approves the loan, the SBA or the Bank?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The Bank approves it, based on SBA rules. If you use a <a href="https://www.sba.gov/partners/lenders/7a-loan-program/types-7a-loans" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Preferred Lender (PLP)</a>, they make the final decision. If not, they have to send your file to the SBA for a second review.
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
              <h3 className="text-xl font-bold text-slate-900 mb-6">Related Application Guides</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-sba-loans" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Requirements</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">SBA Loan Requirements</h4>
                    <p className="text-sm text-slate-500 flex-grow">Detailed eligibility criteria.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-sbir-grants" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Grants</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">SBIR Application Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">For R&D grant applications.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/women-entrepreneurship-fund-guide" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Canada</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Women Entrepreneurship</h4>
                    <p className="text-sm text-slate-500 flex-grow">Funding for women-owned biz.</p>
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
                <HelpCircle className="w-6 h-6 text-slate-600 mr-2" />
                Application FAQs
              </h2>
              <div className="divide-y divide-slate-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What is the Form 413?</h3>
                  <p className="text-slate-600 text-sm">Form 413 is the Personal Financial Statement. It lists your personal assets (home, cash, retirement) and liabilities. Every owner with 20%+ stake must fill one out.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I apply if I have bad credit?</h3>
                  <p className="text-slate-600 text-sm">It's difficult. Most lenders want 680+. However, if you have strong cash flow and collateral, some Community Advantage lenders may work with scores down to 640.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Do I need a business plan?</h3>
                  <p className="text-slate-600 text-sm">Yes. Especially for startups (under 2 years old). The bank needs to see how you plan to make money to repay the loan.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 bg-slate-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't Get Rejected</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              70% of SBA applications are rejected due to poor documentation. Let our experts review your packet before you submit.
            </p>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=sba-review">
                Get Application Review
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
