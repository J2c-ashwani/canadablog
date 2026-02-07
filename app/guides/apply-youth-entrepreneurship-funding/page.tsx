import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Zap, Star, TrendingUp, HelpCircle, ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Youth Entrepreneurship Funding Guide 2025 | Futurpreneur & Grants",
  description: "Complete guide to Futurpreneur Canada loans, youth business grants, and startup funding for ages 18-39. Get application templates and mentor matching tips.",
  keywords: "Futurpreneur Canada, youth business grants, young entrepreneur loans, CYBF application, under 40 business funding, student business grants Ontario",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-youth-entrepreneurship-funding",
  },
  openGraph: {
    title: "Youth Entrepreneurship Funding Guide 2025",
    description: "Launch your business with Futurpreneur and youth grants. Step-by-step guide for Canadian founders aged 18-39.",
    url: "https://www.fsidigital.ca/guides/apply-youth-entrepreneurship-funding",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the age limit for Futurpreneur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Futurpreneur is open to Canadian citizens or permanent residents aged 18 to 39."
      }
    },
    {
      "@type": "Question",
      "name": "Is Futurpreneur a grant or a loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is primarily a low-interest loan (up to $60,000) combined with mandatory mentorship. It is not a non-repayable grant, though some partnered programs may offer small grant components."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a business plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A complete business plan and cash flow projection are required. Futurpreneur provides a 'Business Plan Writer' tool to help."
      }
    },
    {
      "@type": "Question",
      "name": "Can I apply if I have bad credit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Futurpreneur is more flexible than banks, but you generally need a clean credit history (no recent bankruptcies or R9s). Your character and business viability matter more than a perfect score."
      }
    }
  ]
}

export default function YouthEntrepreneurshipFundingGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-500/20 text-blue-100 border-blue-400/30 backdrop-blur-sm">
                🚀 Youth Founder Series
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Youth Entrepreneurship <br className="hidden md:block" /> Funding Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
                Turn your side hustle into a startup. <br className="hidden md:block" /> Guide to <strong>Futurpreneur</strong>, <strong>Summer Company</strong>, and <strong>Youth Grants</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold shadow-lg" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-800/50 border-blue-400/30 text-blue-100 hover:bg-blue-800/80 backdrop-blur-sm" asChild>
                  <Link href="/blog/youth-business-plan-template">
                    Download Template
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
                <Zap className="w-4 h-4 mr-2 text-blue-600" />
                Topic:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-blue-700 transition-colors flex items-center gap-1"><DollarSign className="w-3 h-3" /> Funding Programs</Link>
                <Link href="#process" className="hover:text-blue-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Process</Link>
                <Link href="#mistakes" className="hover:text-blue-700 transition-colors flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Killer Mistakes</Link>
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">$60K</div>
                  <div className="text-blue-900 text-sm font-medium uppercase tracking-wide">Max Startup Loan</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">18-39</div>
                  <div className="text-blue-900 text-sm font-medium uppercase tracking-wide">Age Eligibility</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">2 Yrs</div>
                  <div className="text-blue-900 text-sm font-medium uppercase tracking-wide">Free Mentorship</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">Local</div>
                  <div className="text-blue-900 text-sm font-medium uppercase tracking-wide">Community Partners</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section id="programs" className="py-16 bg-blue-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Top Youth Funding Programs</h2>

              <div className="space-y-8">
                {/* Futurpreneur */}
                <Card className="border-l-4 border-l-blue-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">Futurpreneur Canada</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">Must Have</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      The gold standard for Canadian youth startups. Offers up to $60,000 in financing (collateral-free) + a hand-picked mentor for 2 years.
                    </p>
                    <div className="bg-white border border-blue-100 p-4 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                        <div className="font-semibold text-center bg-blue-50 p-2 rounded">Includes: $20K from Futurpreneur</div>
                        <div className="font-semibold text-center bg-blue-50 p-2 rounded">Includes: $40K from BDC</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Summer Company */}
                <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Star className="w-8 h-8 text-red-500" />
                        <CardTitle className="text-xl">Summer Company (Ontario)</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      For students aged 15-29 returning to school in the fall. Provides up to $3,000 in grants (non-repayable) to run a summer business. Includes hands-on coaching.
                    </p>
                  </CardContent>
                </Card>

                {/* Starter Company Plus */}
                <Card className="border-l-4 border-l-green-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building className="w-8 h-8 text-green-600" />
                        <CardTitle className="text-xl">Starter Company Plus</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Not strictly "youth" but very youth-friendly. Administered by local Small Business Enterprise Centres (SBECs). Offers training and a potential grant of up to $5,000.
                    </p>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">The Futurpreneur Path</h2>

              <div className="relative border-l-2 border-blue-200 pl-8 space-y-12 ml-4 md:ml-0">

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Register & Eligibility</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Sign up on the Futurpreneur portal. Confirm you are 18-39 and a Canadian citizen/PR.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Draft Your Plan</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Use their "Business Plan Writer" tool. You *must* demonstrate how you will generate cash flow to repay the loan.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Mentor Matching</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    This is unique. You must agree to work with a mentor for 2 years. They will match you, or you can bring your own.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Funding Disbursement</h3>
                  <p className="text-slate-600 text-sm">
                    Once approved, BDC and Futurpreneur disburse the funds. It usually takes 4-8 weeks total.
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
              <h3 className="text-xl font-bold text-slate-900 mb-6">Explore Related Opportunities</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-small-business-grants" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Grants</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">Small Business Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">General grant programs for all ages.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-women-entrepreneurship-strategy" className="group block h-full">
                  <div className="bg-white border hover:border-pink-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-pink-600 font-semibold mb-2">Women</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-pink-700 mb-2">Female Founders</h4>
                    <p className="text-sm text-slate-500 flex-grow">WELF and other women-led funding.</p>
                    <div className="mt-3 text-xs text-pink-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-regional-development-agencies" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Regional</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">Local Agencies</h4>
                    <p className="text-sm text-slate-500 flex-grow">Funding specific to your province.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
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
                Youth Funding FAQs
              </h2>
              <div className="divide-y divide-blue-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I apply if I'm a student?</h3>
                  <p className="text-slate-600 text-sm">For Futurpreneur, generally no, unless you are in your final year or operating a full-time business. For Summer Company, yes, you must be a student.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Is the money taxable?</h3>
                  <p className="text-slate-600 text-sm">Loans are not taxable income. Grants (like Summer Company) are taxable income for your business.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I use the money for anything?</h3>
                  <p className="text-slate-600 text-sm">Mostly yes, for operating costs, marketing, equipment, etc. You cannot use it to refinance existing debt or pay yourself a salary as the very first expense.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Launch Your Future</h2>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              We help young entrepreneurs build credible business plans that get approved by Futurpreneur and BDC.
            </p>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=youth-funding">
                Get Application Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
