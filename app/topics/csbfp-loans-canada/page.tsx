import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "CSBFP Loans Canada Guide 2026 | Government Business Financing",
  description: "Learn how the Canada Small Business Financing Program works. Review limits up to $1.15M, interest rate caps, and bank approval steps.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/csbfp-loans-canada",
  },
  robots: { index: true, follow: true },
}

export default function CsbfpLoansPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/csbfp-loans-canada#webpage",
        "url": "https://www.fsidigital.ca/topics/csbfp-loans-canada",
        "name": "CSBFP Loans Canada Guide 2026 | Government Business Financing",
        "description": "Learn how the Canada Small Business Financing Program works. Review limits up to $1.15M, interest rate caps, and bank approval steps.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "CSBFP Loans", "item": "https://www.fsidigital.ca/topics/csbfp-loans-canada" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/csbfp-loans-canada#howto",
        "name": "How to Apply for a CSBFP Loan",
        "description": "Step-by-step application checklist to apply for a Canada Small Business Financing Program loan through a commercial bank.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Establish Business Plan and Assets List",
            "text": "Draft a comprehensive business plan detailing how the loan funds will be used. Compile a detailed inventory list of equipment to purchase or real property to acquire, along with third-party quotes."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select and Approach a Participating Lender",
            "text": "Select a participating Canadian commercial bank or credit union. Contact their commercial lending desk and request an appointment specifically for a CSBFP-backed loan."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Submit Application and Pay Registration Fee",
            "text": "Submit your business plan, asset quotes, and personal financial information. Upon bank approval, pay the mandatory 2% government registration fee (which can be financed as part of the loan)."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Register Loan with ISED",
            "text": "The bank will register your approved loan directly with Innovation, Science and Economic Development Canada (ISED) to activate the 85% government guarantee."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/csbfp-loans-canada#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the Canada Small Business Financing Program (CSBFP)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CSBFP is a federal loan program designed to help Canadian small businesses and startups access financing. The government guarantees 85% of the loan value to the lender, reducing risk for commercial financial institutions and encouraging them to approve financing on more favorable terms."
            }
          },
          {
            "@type": "Question",
            "name": "What is the maximum loan limit under CSBFP?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The maximum total financing limit is $1.15 million. This includes up to $1 million for purchasing or improving real property and equipment (capped at $500,000 for equipment purchases), and up to $150,000 for working capital and startup costs."
            }
          },
          {
            "@type": "Question",
            "name": "Which businesses are eligible to apply for a CSBFP loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Small businesses and startups operating for-profit in Canada with annual gross revenues of $10 million or less are eligible. Non-profit organizations, farming businesses (which have a separate program), and charitable organizations are not eligible."
            }
          },
          {
            "@type": "Question",
            "name": "What are the interest rates for CSBFP loans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Interest rates are capped by the government to protect small businesses. Lenders can charge a maximum floating rate of Prime + 3%, or a fixed rate equivalent to the bank's commercial mortgage/term loan rate plus 3%. A 2% government registration fee also applies."
            }
          },
          {
            "@type": "Question",
            "name": "Where do I apply for a CSBFP loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You apply directly at a participating financial institution (including all major Canadian charter banks like RBC, TD, Scotiabank, BMO, CIBC, and regional credit unions). The government does not provide the loans directly; individual banks assess eligibility and approve applications."
            }
          },
          {
            "@type": "Question",
            "name": "Does the CSBFP loan require a personal guarantee?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, but it is capped. For equipment and real property loans, lenders can request a personal guarantee of up to 25% of the total loan amount. For working capital loans, the personal guarantee can be up to 100% of the loan value."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use CSBFP funds to refinance existing debt?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, CSBFP loans cannot be used to refinance existing conventional commercial debt, nor can they be used to purchase shares or acquire assets that do not directly contribute to the operating business."
            }
          }
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-955 via-slate-950 to-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-400/20 text-amber-300 mb-6 uppercase tracking-wider">
              Government-Backed Financing
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Canada Small Business Financing Program (CSBFP)
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Secure low-interest, government-backed commercial capital. Learn how the CSBFP provides up to $1.15 million in financing to acquire equipment, leaseholds, and working capital.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#csbfp-financing"
                className="bg-amber-700 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Explore CSBFP Loans <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-900/80 hover:bg-slate-900 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-amber-400" /> Estimate Your Payments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $1.15M</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Total Loan Limit</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">85% Guarantee</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Federal Risk Support</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Prime + 3% Max</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Regulated Interest Cap</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">All Major Banks</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Available Nationwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Detailed Content */}
            <article className="lg:col-span-8 space-y-12">
              
              <section className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-slate-700">
                  Accessing credit is vital for business expansion, but startups and small enterprises often struggle to meet the strict collateral and history benchmarks set by traditional banks. To address this friction and stimulate economic activity, the Government of Canada administers a robust credit enhancement initiative.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  The **Canada Small Business Financing Program (CSBFP)** is one of the country's most effective financing tools. Under the program, the federal government acts as a co-signer, providing a **85% guarantee** on qualifying loans to private commercial lenders. This insurance significantly lowers the risk for banks, allowing them to approve applications that would otherwise be rejected, while capping interest rates at a regulated maximum.
                </p>
              </section>

              {/* Core Programs */}
              <section id="csbfp-financing" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">How CSBFP Loans Are Allocated</h2>
                
                <div className="space-y-6">
                  {/* Real Property */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Real Property & Building Loans</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0">Up to $1M</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      CSBFP funds can be used to acquire commercial real estate, construct factories, or renovate existing business premises. Loans under this category can reach up to $1 million, featuring amortization schedules of up to 15 years.
                    </p>
                  </div>

                  {/* Equipment */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Equipment & Leasehold Improvements</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0">Up to $500,000</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      Small businesses can secure up to $500,000 to purchase new or used machinery, vehicles, computing hardware, office furniture, or to implement retail leasehold renovations.
                    </p>
                  </div>

                  {/* Working Capital */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Working Capital & Startup Cost Lines</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0">Up to $150,000</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      A newly expanded feature of the CSBFP. Businesses can access up to $150,000 as a line of credit or term loan to cover inventory acquisition, marketing budgets, payroll, utility deposits, and other immediate setup expenses.
                    </p>
                  </div>
                </div>
              </section>

              {/* Step-by-Step Guide */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">How to Apply for a CSBFP Loan</h2>
                <div className="relative border-l-2 border-amber-200 pl-6 ml-3 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-amber-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">1. Develop a Detailed Business Plan</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Draft a comprehensive business plan that includes cash flow projections, marketing plans, and a breakdown of the assets to purchase. Gather formal third-party vendor quotes for all machinery, software, or renovations.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-amber-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">2. Book an Appointment with a Charter Bank</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      CSBFP applications are reviewed and approved directly by financial institutions, not by government offices. Present your package to the commercial banking department of a participating lender (such as RBC, TD, or BMO).
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-amber-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">3. Loan Approval and Registration</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Once approved, the bank registers the loan with Innovation, Science and Economic Development Canada (ISED) and collects a 2% government registration fee. The bank then disburses the funds directly to your business account.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the Canada Small Business Financing Program (CSBFP)?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      CSBFP is a federal loan program designed to help Canadian small businesses and startups access financing. The government guarantees 85% of the loan value to the lender, reducing risk for commercial financial institutions and encouraging them to approve financing on more favorable terms.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the maximum loan limit under CSBFP?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      The maximum total financing limit is $1.15 million. This includes up to $1 million for purchasing or improving real property and equipment (capped at $500,000 for equipment purchases), and up to $150,000 for working capital and startup costs.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Which businesses are eligible to apply for a CSBFP loan?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Small businesses and startups operating for-profit in Canada with annual gross revenues of $10 million or less are eligible. Non-profit organizations, farming businesses (which have a separate program), and charitable organizations are not eligible.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What are the interest rates for CSBFP loans?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Interest rates are capped by the government to protect small businesses. Lenders can charge a maximum floating rate of Prime + 3%, or a fixed rate equivalent to the bank's commercial mortgage/term loan rate plus 3%. A 2% government registration fee also applies.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Where do I apply for a CSBFP loan?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      You apply directly at a participating financial institution (including all major Canadian charter banks like RBC, TD, Scotiabank, BMO, CIBC, and regional credit unions). The government does not provide the loans directly; individual banks assess eligibility and approve applications.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Does the CSBFP loan require a personal guarantee?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Yes, but it is capped. For equipment and real property loans, lenders can request a personal guarantee of up to 25% of the total loan amount. For working capital loans, the personal guarantee can be up to 100% of the loan value.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I use CSBFP funds to refinance existing debt?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      No, CSBFP loans cannot be used to refinance existing conventional commercial debt, nor can they be used to purchase shares or acquire assets that do not directly contribute to the operating business.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Programs & Topics (Mesh) */}
              <div className="border-t border-slate-200 pt-8 mt-12 space-y-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Programs</span>
                  <div className="flex flex-wrap gap-2.5">
                    <Link href="/programs/csbfp-loan" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">CSBFP Loan Details</Link>
                    <Link href="/programs/bdc-financing" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">BDC Small Business Loan</Link>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Topics</span>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link href="/topics/bdc-small-business-loans" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-amber-700 text-sm inline-flex items-center gap-1">BDC Financing Guide <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Learn about direct lending options from Canada's development bank up to $10M.</p>
                    </Link>
                    <Link href="/topics/startup-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-amber-700 text-sm inline-flex items-center gap-1">Startup Grants Canada <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review non-repayable grant options to stack with your bank loan coordinates.</p>
                    </Link>
                  </div>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-md">
                  <Calculator className="w-8 h-8 text-slate-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Interest Costs</h3>
                  <p className="text-slate-200 text-xs leading-relaxed mb-6">
                    Our free CSBFP calculator helps you estimate monthly payments and calculate the mandatory 2% government registration fee.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-amber-700 hover:bg-amber-605 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Estimate Payments
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-slate-650 mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Match 1,200+ grants</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Connect with our proprietary AI Funding Finder to locate non-repayable grants that can fund your matching CSBFP project portions.
                  </p>
                  <Link
                    href="/grant-finder"
                    className="w-full bg-slate-950 hover:bg-slate-900 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Find Matching Grants
                  </Link>
                </div>

                {/* CTA 3: PDF Download */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/60 text-center">
                  <Download className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download CSBFP Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Download our comprehensive CSBFP application preparation kit, containing checklist spreadsheets and business plan frameworks.
                  </p>
                  <Link
                    href="/download/csbfp-application-kit"
                    className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Download Loan Kit (PDF)
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
