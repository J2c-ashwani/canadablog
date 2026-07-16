import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Futurpreneur Canada Startup Funding Guide 2026 | FSI Digital",
  description: "Navigate startup financing through Futurpreneur Canada. Review unsecured loans up to $60k, mentor matching, and eligibility details.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/futurpreneur-startup-funding",
  },
  robots: { index: true, follow: true },
}

export default function FuturpreneurFundingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/futurpreneur-startup-funding#webpage",
        "url": "https://www.fsidigital.ca/topics/futurpreneur-startup-funding",
        "name": "Futurpreneur Canada Startup Funding Guide 2026 | FSI Digital",
        "description": "Navigate startup financing through Futurpreneur Canada. Review unsecured loans up to $60k, mentor matching, and eligibility details.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Futurpreneur Funding", "item": "https://www.fsidigital.ca/topics/futurpreneur-startup-funding" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/futurpreneur-startup-funding#howto",
        "name": "How to Apply for Futurpreneur Canada Funding",
        "description": "Step-by-step guide to prepare your business plan, cash flow statements, and submit your Futurpreneur application.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Confirm Age and Citizenship Eligibility",
            "text": "Verify that all founders seeking financing are between 18 and 39 years old, and are Canadian citizens or permanent residents."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Draft Business Plan and Cash Flow Statements",
            "text": "Write a detailed business plan using the Futurpreneur online planner. Create a 2-year month-by-month cash flow forecast demonstrating project viability."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Connect with a Regional Coordinator",
            "text": "Submit your initial profile to be assigned a local Futurpreneur Business Development representative who will review your draft documents."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Match with a Mentor and Receive Funds",
            "text": "Upon approval, interview and match with a volunteer business mentor for the mandatory 2-year mentorship phase, then receive loan disbursement."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/futurpreneur-startup-funding#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Futurpreneur Canada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Futurpreneur Canada is a national non-profit organization that provides financing, mentoring, and support tools to aspiring business owners aged 18 to 39. It is the only national organization of its kind in Canada."
            }
          },
          {
            "@type": "Question",
            "name": "How much funding can I receive through Futurpreneur?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can receive up to $60,000 in unsecured startup financing. This comprises up to $20,000 directly from Futurpreneur and an additional co-investment of up to $40,000 from the Business Development Bank of Canada (BDC)."
            }
          },
          {
            "@type": "Question",
            "name": "Do Futurpreneur loans require collateral?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Unlike traditional bank loans, Futurpreneur loans are completely unsecured, meaning you do not need to pledge personal assets (such as real estate or vehicles) as collateral. However, personal guarantees are required from the borrowing founders."
            }
          },
          {
            "@type": "Question",
            "name": "What is the age limit for Futurpreneur eligibility?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Founders applying for financing must be between 18 and 39 years old at the time of application. If there are multiple partners, the partners holding the majority stake (over 50%) must meet the age requirement."
            }
          },
          {
            "@type": "Question",
            "name": "Is the mentorship program mandatory?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. A core pillar of the Futurpreneur program is the mandatory 2-year mentorship. Approved founders are matched with an experienced business mentor who provides guidance, advice, and support to increase the business's chance of long-term survival."
            }
          },
          {
            "@type": "Question",
            "name": "What can the loan proceeds be used for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Proceeds can be used for startup capital, inventory purchases, marketing campaigns, legal fees, leasehold improvements, and general working capital required to launch or scale the business in its first year."
            }
          },
          {
            "@type": "Question",
            "name": "How long must the business have been open to qualify?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The business must be in the startup phase—meaning it is either a pre-launch concept, or has been actively trading and generating revenue for less than 12 months."
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
      <section className="bg-gradient-to-b from-violet-950 via-slate-950 to-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-violet-500/10 border border-violet-400/20 text-violet-300 mb-6 uppercase tracking-wider">
              Youth Entrepreneurship capital
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Futurpreneur Canada Startup Financing
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Launch your business with confidence. Review unsecured financing up to $60,000 for Canadian founders aged 18 to 39, backed by a mandatory 2-year expert mentorship program.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#futurpreneur-financing"
                className="bg-violet-750 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Explore Startup Financing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-900/80 hover:bg-slate-900 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-violet-400" /> Estimate Your Repayments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-violet-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $60,000</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Unsecured Loan Limit</span>
            </div>
            <div className="border-l-4 border-violet-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">18–39 Years</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Target Age Cohort</span>
            </div>
            <div className="border-l-4 border-violet-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">2 Years Mentor</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Mandatory Support Mesh</span>
            </div>
            <div className="border-l-4 border-violet-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">&lt; 12 Months</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Maximum Business Age</span>
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
                  Launching a new business is an exciting venture, but accessing early-stage capital can be incredibly difficult for young entrepreneurs. Lacking a long credit history or commercial real estate collateral, many founders under 40 find themselves locked out of conventional business bank lending.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  **Futurpreneur Canada** exists to bridge this specific gap. Supported by the federal government, Futurpreneur offers **unsecured loans up to $60,000** (co-funded in partnership with the Business Development Bank of Canada - BDC) to aspiring business owners aged 18 to 39. Crucially, the financing is paired with a mandatory, structured **2-year mentorship** program that pairs founders with seasoned industry professionals.
                </p>
              </section>

              {/* Core Programs */}
              <section id="futurpreneur-financing" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">The Futurpreneur Capital Blueprint</h2>
                
                <div className="space-y-6">
                  {/* Core Loan */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Futurpreneur & BDC Collaborative Loan</h3>
                      <span className="px-2.5 py-1 rounded bg-violet-50 text-violet-750 text-xs font-bold shrink-0">Up to $60,000</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      Applicants can secure up to $20,000 directly from Futurpreneur. If additional capital is required, BDC will automatically provide an additional co-investment loan of up to $40,000, bringing the total unsecured financing package to $60,000. Interest rates are floating, and the first year features interest-only payments to protect launch cash flow.
                    </p>
                  </div>

                  {/* Mentorship Program */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Two-Year Business Mentorship</h3>
                      <span className="px-2.5 py-1 rounded bg-violet-50 text-violet-750 text-xs font-bold shrink-0">Mandatory Support</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      Every approved borrower is matched with a volunteer mentor for 2 years. These mentors are established business executives and successful entrepreneurs who meet with the founder monthly to review milestones, troubleshoot operational hurdles, and provide strategic advice.
                    </p>
                  </div>
                </div>
              </section>

              {/* Step-by-Step Guide */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">How to Apply for Futurpreneur Funding</h2>
                <div className="relative border-l-2 border-violet-200 pl-6 ml-3 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-violet-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">1. Develop a Detailed Business Plan</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Draft a comprehensive business plan and a 2-year month-by-month cash flow forecast. You must use Futurpreneur's online planning tool, which provides structured prompts and template sections.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-violet-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">2. Submit Draft to a Representative</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Register on the portal to be paired with a local Futurpreneur Business Development representative. They will review your plan, suggest edits, and verify that your credit score and history meet the eligibility metrics.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-violet-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">3. Final Interview and Mentor Match</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Upon passing the credit and business plan review, you will perform a final interview. Once approved, you will interview and select an active mentor to finalize your loan activation.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is Futurpreneur Canada?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Futurpreneur Canada is a national non-profit organization that provides financing, mentoring, and support tools to aspiring business owners aged 18 to 39. It is the only national organization of its kind in Canada.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How much funding can I receive through Futurpreneur?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      You can receive up to $60,000 in unsecured startup financing. This comprises up to $20,000 directly from Futurpreneur and an additional co-investment of up to $40,000 from the Business Development Bank of Canada (BDC).
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Do Futurpreneur loans require collateral?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      No. Unlike traditional bank loans, Futurpreneur loans are completely unsecured, meaning you do not need to pledge personal assets (such as real estate or vehicles) as collateral. However, personal guarantees are required from the borrowing founders.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the age limit for Futurpreneur eligibility?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Founders applying for financing must be between 18 and 39 years old at the time of application. If there are multiple partners, the partners holding the majority stake (over 50%) must meet the age requirement.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Is the mentorship program mandatory?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Yes. A core pillar of the Futurpreneur program is the mandatory 2-year mentorship. Approved founders are matched with an experienced business mentor who provides guidance, advice, and support to increase the business's chance of long-term survival.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What can the loan proceeds be used for?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Proceeds can be used for startup capital, inventory purchases, marketing campaigns, legal fees, leasehold improvements, and general working capital required to launch or scale the business in its first year.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long must the business have been open to qualify?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      The business must be in the startup phase—meaning it is either a pre-launch concept, or has been actively trading and generating revenue for less than 12 months.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Programs & Topics (Mesh) */}
              <div className="border-t border-slate-200 pt-8 mt-12 space-y-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Programs</span>
                  <div className="flex flex-wrap gap-2.5">
                    <Link href="/topics/startup-grants-canada" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">Canada Startup Grants</Link>
                    <Link href="/topics/bdc-small-business-loans" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">BDC Startup Loan</Link>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Topics</span>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link href="/topics/startup-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-purple-700 text-sm inline-flex items-center gap-1">Startup Grants Canada <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Explore non-repayable startup grants and wage subsidies to stack with your loan.</p>
                    </Link>
                    <Link href="/topics/government-loans-small-business-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-purple-700 text-sm inline-flex items-center gap-1">Government Loans Guide <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review the overall matrix of repayable credit programs and federal guarantees.</p>
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
                    Our free calculator estimates monthly repayments for Futurpreneur loans, accounting for floating BDC prime rates and interest-only first-year terms.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-violet-750 hover:bg-violet-700 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-slate-650 mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Match 1,200+ grants</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Use our proprietary AI Funding Finder to locate regional startup grants, wage subsidies, and tax credits to combine with your Futurpreneur loan.
                  </p>
                  <Link
                    href="/grant-finder"
                    className="w-full bg-slate-950 hover:bg-slate-900 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Find Additional Funding
                  </Link>
                </div>

                {/* CTA 3: PDF Download */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/60 text-center">
                  <Download className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Startup Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Download our comprehensive youth entrepreneurship and startup funding prep kit. Complete with business plan templates and spreadsheets.
                  </p>
                  <Link
                    href="/download/youth-entrepreneurship-kit"
                    className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Download Startup Kit (PDF)
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
