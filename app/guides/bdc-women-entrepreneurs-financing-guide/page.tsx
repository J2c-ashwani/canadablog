import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Shield, Building, TrendingUp, Zap, Award, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BDC Woman Entrepreneur Financing 2025 | $100K Online Loan",
  description: "Complete guide to BDC's Women Entrepreneur financing. Apply for the $100K online loan, Thrive Venture Fund, and advisory services.",
  keywords: "BDC women entrepreneur loan, BDC Thrive Lab, women business loans Canada, BDC advisory services, female founder funding",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/bdc-women-entrepreneurs-financing-guide",
  },
  openGraph: {
    title: "BDC Women Financing 2025 | Loans & Venture Capital",
    description: "Step-by-step guide to securing up to $100k online or millions in venture capital from BDC.",
    url: "https://www.fsidigital.ca/guides/bdc-women-entrepreneurs-financing-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the BDC Women Entrepreneur Online Loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is a loan of up to $100,000 intended for smaller projects. It features a simplified online application, approval within 48 hours, and a repayment period of up to 5 years."
      }
    },
    {
      "@type": "Question",
      "name": "Does BDC offer grants for women?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, BDC is a bank, so they primarily offer loans and equity investments, not non-repayable grants. However, their loans often have flexible terms like principal postponement."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Thrive Venture Fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Thrive Venture Fund is a $500 million investment platform dedicated to women-led technology companies. It provides equity capital for seed, Series A, and Series B rounds."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a business plan for BDC financing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For larger loans, yes. For the smaller $100k online loan, a formal business plan is less critical than having strong personal credit and 24 months of revenue history."
      }
    }
  ]
}

export default function BDCWomenEntrepreneursApplicationGuide() {
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
                🏦 BDC Financing Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                BDC Women Entrepreneur <br className="hidden md:block" /> Financing
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
                The complete handbook to BDC's $100k online loan, <br className="hidden md:block" /> Thrive Venture Fund, and advisory services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold shadow-lg shadow-blue-900/50" asChild>
                  <Link href="#programs">
                    View Loan Options
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-800/50 border-blue-400/30 text-blue-100 hover:bg-blue-800/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/bdc-women-entrepreneurs-financing-guide">
                    Read Requirements
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
                <Building className="w-4 h-4 mr-2 text-blue-600" />
                BDC Focus:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-blue-700 transition-colors flex items-center gap-1"><DollarSign className="w-3 h-3" /> Loan Types</Link>
                <Link href="#venture" className="hover:text-blue-700 transition-colors flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Venture Fund</Link>
                <Link href="#process" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#advisory" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Users className="w-3 h-3" /> Advisory</Link>
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">$100K</div>
                  <div className="text-blue-800 text-sm font-medium uppercase tracking-wide">Online Loan Limit</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$500M</div>
                  <div className="text-blue-800 text-sm font-medium uppercase tracking-wide">Thrive Fund Size</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">24h</div>
                  <div className="text-blue-800 text-sm font-medium uppercase tracking-wide">Approval Time</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">51%</div>
                  <div className="text-blue-800 text-sm font-medium uppercase tracking-wide">Ownership Reqd</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section id="programs" className="py-16 bg-blue-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">BDC Financing Programs</h2>

              {/* Programs */}
              <div className="space-y-8">
                {/* Online Loan */}
                <Card className="border-l-4 border-l-blue-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">Online Loan for Women</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">Most Popular</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      A fast, unsecured loan for working capital, marketing, or small equipment.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm bg-white border border-blue-100 p-4 rounded-lg">
                      <ul className="space-y-2">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Up to $100,000</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 100% online application</li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 24 months in business required</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> No collateral needed</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Thrive Venture Fund */}
                <Card id="venture" className="border-l-4 border-l-purple-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                        <CardTitle className="text-xl">Thrive Venture Fund</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-purple-300 text-purple-700">Equity Capital</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The world's largest investment platform destined for women-led tech firms.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-100 text-purple-800">Seed to Series B</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Clean Tech</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Health Tech</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Agri-Food</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Advisory */}
                <Card id="advisory" className="border-l-4 border-l-green-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-green-600" />
                        <CardTitle className="text-xl">Advisory Services</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Hire BDC experts to help optimize your operations.
                    </p>
                    <div className="bg-green-50 p-3 rounded text-sm text-green-800">
                      <strong>Pro Tip:</strong> You can often get a BDC loan to pay for these consulting fees, so you don't pay out of pocket immediately.
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
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How to Apply</h2>

              <div className="relative border-l-2 border-slate-200 pl-8 space-y-12 ml-4 md:ml-0">

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Check Eligibility</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Ensure you have been generating revenue for at least <strong>24 months</strong>. This is the #1 rejection reason for the online loan.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Prepare Financials</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    For loans &gt;$100k, you need Accountant-prepared financial statements. For the online loan, simply linking your bank account often suffices.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Submit Online</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    The process takes about 15 minutes. You will need your SIN and business incorporation number.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Get Funded</h3>
                  <p className="text-slate-600 text-sm">
                    Approvals can happen in as little as 48 hours for small loans. Disbursement is directly to your business bank account.
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
                <Link href="/guides/apply-sba-loans" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Gov Loans</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">CSBFP Loan Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">Government-backed loans through private banks.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/women-entrepreneurship-fund-guide" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Grants</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">Women Grant Fund</h4>
                    <p className="text-sm text-slate-500 flex-grow">Non-repayable funding options.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-small-business-grants" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Early Stage</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Startup Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">Funding for businesses under 2 years old.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About BDC Financing</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Is my credit score impacted?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes. BDC will perform a hard credit check on all major shareholders. A score above <strong>650</strong> is generally required for the online loan. If your score is lower, they may ask for a co-signer or additional collateral.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Do I need to sign a Personal Guarantee?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    For the $100k Online Loan, yes. All beneficial owners must sign a personal guarantee. This means if the business defaults, you are personally liable for the debt.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. Can I use the loan to buy real estate?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The Online Loan is for working capital. If you want to buy commercial real estate, you should apply for a <a href="https://www.bdc.ca/en/commercial-real-estate-loan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Commercial Real Estate Loan</a> which has longer terms (up to 25 years) and different rates.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. What is "Principal Postponement"?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    This is a key feature of BDC loans. You can often delay paying the principal for the first 6-12 months, paying only interest. This helps cash flow significantly during the startup or expansion phase.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. Is BDC cheaper than a bank?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Usually, no. BDC takes on higher risk than traditional banks (TD, RBC, etc.), so their rates are slightly higher. However, they offer more flexible terms and are more willing to lend based on cash flow rather than just assets.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. How helps me on the Advisory side?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    BDC has a network of 500+ consultants. They can help with operational efficiency, sales strategies, and digital transformation. You can verify their programs on the <a href="https://www.bdc.ca/en/consulting" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BDC Advisory</a> page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
                BDC FAQs
              </h2>
              <div className="divide-y divide-blue-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What is the interest rate?</h3>
                  <p className="text-slate-600 text-sm">BDC rates are typically higher than prime but lower than credit cards. They reflect the higher risk BDC takes on. Expect Base Rate + Variance (often 6-10% total).</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I pay it off early?</h3>
                  <p className="text-slate-600 text-sm">Yes, BDC loans are generally open for prepayment without penalty, which is a huge advantage over some commercial leases.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Does BDC do personal credit checks?</h3>
                  <p className="text-slate-600 text-sm">Yes. Even for business loans, BDC will check the personal credit of major shareholders.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Scale Your Vision</h2>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              BDC has the capital you need. We help you package your application for approval.
            </p>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=bdc-expert-help">
                Get BDC Application Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
