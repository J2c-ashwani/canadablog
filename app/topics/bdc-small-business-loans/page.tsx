import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "BDC Small Business Loans Guide 2026 | FSI Digital",
  description: "Navigate business financing through the Business Development Bank of Canada. Review online loans up to $100k, capital terms, and eligibility rules.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/bdc-small-business-loans",
  },
  robots: { index: true, follow: true },
}

export default function BdcLoansPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/bdc-small-business-loans#webpage",
        "url": "https://www.fsidigital.ca/topics/bdc-small-business-loans",
        "name": "BDC Small Business Loans Guide 2026 | FSI Digital",
        "description": "Navigate business financing through the Business Development Bank of Canada. Review online loans up to $100k, capital terms, and eligibility rules.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "BDC Loans", "item": "https://www.fsidigital.ca/topics/bdc-small-business-loans" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/bdc-small-business-loans#howto",
        "name": "How to Apply for a BDC Small Business Loan",
        "description": "A step-by-step application walkthrough to prepare and apply for an online BDC business loan up to $100,000.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Prepare Required Financial Documents",
            "text": "Gather your company's latest year-end financial statements (or past 2 years if available), recent corporate tax returns, and interim financial logs."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Verify Credit and Incorporation Status",
            "text": "Confirm that your company is federally or provincially incorporated in Canada, has been actively operating for at least 24 months, and that the majority owner has a strong personal credit score (generally 650+)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Submit Online Application Form",
            "text": "Navigate to the BDC portal, select the 'Small Business Loan' stream, fill out your business profile, and upload your financial documentation."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "E-Sign and Verify Identity",
            "text": "Complete the digital identity verification checks, review the loan terms and interest rates, and e-sign the final loan agreement."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/bdc-small-business-loans#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the BDC and how does it differ from a regular bank?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Business Development Bank of Canada (BDC) is a federal Crown corporation dedicated exclusively to entrepreneurs. Unlike traditional commercial banks, BDC focuses on development capital, offering more flexible terms, patient repayment structures, and advisory services, often taking on slightly higher risk profiles."
            }
          },
          {
            "@type": "Question",
            "name": "What is the maximum limit for BDC online small business loans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BDC offers a streamlined, fully online small business loan program for financing amounts up to $100,000. For larger projects, including equipment purchases, commercial real estate, or business transitions, BDC offers custom commercial financing up to $10 million or more."
            }
          },
          {
            "@type": "Question",
            "name": "What are BDC's interest rates compared to traditional lenders?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BDC interest rates are typically slightly higher than traditional bank loans because BDC does not require personal assets (like your primary residence) as collateral. Their rates are set as a base floating rate plus a variance determined by your business risk profile."
            }
          },
          {
            "@type": "Question",
            "name": "What are the eligibility criteria for a BDC small business loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To qualify, your business must be incorporated in Canada, have been operating for at least 24 months, generate consistent revenues, and be owned by Canadian citizens or permanent residents. Owners must also pass a personal credit check."
            }
          },
          {
            "@type": "Question",
            "name": "How long does BDC loan approval take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For the online small business loan (up to $100,000), approval decisions are typically rendered within 48 hours of submitting a completed application, with funds deposited in your account within 5 business days."
            }
          },
          {
            "@type": "Question",
            "name": "Does BDC fund pre-revenue or seed-stage startups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While BDC's standard online loans require 24 months of revenue history, they offer specialized startup financing streams (often in partnership with organizations like Futurpreneur) for younger companies. These programs usually cap at $20,000 to $60,000 and require a detailed business plan."
            }
          },
          {
            "@type": "Question",
            "name": "Can BDC loans be stacked with government grants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Stacking a BDC loan with federal grants (like IRAP) or tax credits (like SR&ED) is a highly effective way to fund projects. The BDC loan can serve as the matching capital balance required by many grant programs."
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
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(148,163,184,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-500/10 border border-slate-400/20 text-slate-300 mb-6 uppercase tracking-wider">
              Federal Development Financing
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              BDC Small Business Loans & Financing Guide
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Grow your Canadian business. Explore loan programs from the Business Development Bank of Canada (BDC)—from $100k fast online approvals to multi-million dollar capital project loans.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#bdc-financing"
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Explore BDC Lending <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-900/85 hover:bg-slate-900 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-slate-400" /> Estimate Loan Cost
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-slate-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $100,000</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Online Fast Loan Limit</span>
            </div>
            <div className="border-l-4 border-slate-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">48 Hours</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Typical Approval Decision</span>
            </div>
            <div className="border-l-4 border-slate-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">No Asset Collateral</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Unsecured Online Loans</span>
            </div>
            <div className="border-l-4 border-slate-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">24+ Months</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Minimum Active Trading</span>
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
                  Securing capital is a recurring challenge for growing businesses. While traditional commercial banks offer low interest rates, their approval processes are notoriously slow and their collateral requirements are high, often requiring business owners to pledge personal assets like real estate.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  The **Business Development Bank of Canada (BDC)** offers a powerful alternative. As a federal Crown corporation, BDC's mandate is to support Canadian entrepreneurs by providing access to credit that traditional lenders might deem too risky. BDC offers highly customized financing terms, including interest-only repayment grace periods, and does not require primary residence pledges for its online financing options.
                </p>
              </section>

              {/* Core Programs */}
              <section id="bdc-financing" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Active BDC Financing Streams</h2>
                
                <div className="space-y-6">
                  {/* BDC Online Small Business Loan */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">BDC Fast Online Business Loan</h3>
                      <span className="px-2.5 py-1 rounded bg-slate-50 text-slate-700 text-xs font-bold shrink-0">Up to $100,000</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      BDC's most popular loan for established small businesses. It features a fully digital application process, requiring no collateral and offering flexible 5-year repayment terms. Approval is granted in under 48 hours for up to $100,000, making it ideal for bridging working capital, hiring staff, or launching marketing initiatives.
                    </p>
                  </div>

                  {/* BDC Tech & Working Capital Financing */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Technology & Equipment Loans</h3>
                      <span className="px-2.5 py-1 rounded bg-slate-50 text-slate-700 text-xs font-bold shrink-0">Custom Limits</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      Designed to fund hardware acquisition, software licenses, database upgrades, and advanced IT services. BDC co-funds these projects with flexible terms. Notably, BDC acts as the direct financial partner for the Canada Digital Adoption Program (CDAP), providing interest-free loans up to $100,000 to implement digital transformations.
                    </p>
                  </div>

                  {/* BDC Commercial Real Estate Loans */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Commercial Real Estate & Expansion Loans</h3>
                      <span className="px-2.5 py-1 rounded bg-slate-50 text-slate-700 text-xs font-bold shrink-0">Up to $10M+</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      For manufacturers, distributors, and retailers seeking to buy land, construct plants, or acquire offices. BDC offers up to 100% financing for commercial real estate, protecting your working capital. These loans feature long amortization schedules (up to 25 years) and customized principal holiday options.
                    </p>
                  </div>
                </div>
              </section>

              {/* Step-by-Step Guide */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">How to Apply for a BDC Online Loan</h2>
                <div className="relative border-l-2 border-slate-200 pl-6 ml-3 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-slate-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">1. Gather Business Financials</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Download your latest two years of corporate accountant-prepared financial statements, including balance sheets and income logs, along with your corporate tax documents.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-slate-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">2. Check Owner Credit Coordinates</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Verify that your personal credit score is above 650. BDC performs automated credit checks on all owners holding more than a 25% equity stake in the company.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-slate-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">3. Submit Digital Application</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Complete the online form on BDC's portal, upload your documents, and complete the digital bank verification link. Once approved, e-sign the loan contract to release the funds.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the BDC and how does it differ from a regular bank?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      The Business Development Bank of Canada (BDC) is a federal Crown corporation dedicated exclusively to entrepreneurs. Unlike traditional commercial banks, BDC focuses on development capital, offering more flexible terms, patient repayment structures, and advisory services, often taking on slightly higher risk profiles.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the maximum limit for BDC online small business loans?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      BDC offers a streamlined, fully online small business loan program for financing amounts up to $100,000. For larger projects, including equipment purchases, commercial real estate, or business transitions, BDC offers custom commercial financing up to $10 million or more.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What are BDC's interest rates compared to traditional lenders?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      BDC interest rates are typically slightly higher than traditional bank loans because BDC does not require personal assets (like your primary residence) as collateral. Their rates are set as a base floating rate plus a variance determined by your business risk profile.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What are the eligibility criteria for a BDC small business loan?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      To qualify, your business must be incorporated in Canada, have been operating for at least 24 months, generate consistent revenues, and be owned by Canadian citizens or permanent residents. Owners must also pass a personal credit check.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long does BDC loan approval take?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      For the online small business loan (up to $100,000), approval decisions are typically rendered within 48 hours of submitting a completed application, with funds deposited in your account within 5 business days.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Does BDC fund pre-revenue or seed-stage startups?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      While BDC's standard online loans require 24 months of revenue history, they offer specialized startup financing streams (often in partnership with organizations like Futurpreneur) for younger companies. These programs usually cap at $20,000 to $60,000 and require a detailed business plan.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can BDC loans be stacked with government grants?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Yes. Stacking a BDC loan with federal grants (like IRAP) or tax credits (like SR&ED) is a highly effective way to fund projects. The BDC loan can serve as the matching capital balance required by many grant programs.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Programs & Topics (Mesh) */}
              <div className="border-t border-slate-200 pt-8 mt-12 space-y-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Programs</span>
                  <div className="flex flex-wrap gap-2.5">
                    <Link href="/topics/bdc-small-business-loans" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">BDC Capital Solutions</Link>
                    <Link href="/topics/csbfp-loans-canada" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">CSBFP Bank Program</Link>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Topics</span>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link href="/topics/government-loans-small-business-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-slate-700 text-sm inline-flex items-center gap-1">Government Loans Guide <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review the overall matrix of repayable government credit programs and guarantees.</p>
                    </Link>
                    <Link href="/topics/startup-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-slate-700 text-sm inline-flex items-center gap-1">Startup Grants Canada <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review non-dilutive grant options to pair with your BDC startup credit facility.</p>
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
                    Our free loan calculator outputs interest and principal payment schedules based on current BDC floating rates.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-slate-700 hover:bg-slate-605 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Estimate Payments
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-slate-650 mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Match 1,200+ grants</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Run our AI Finder to identify government grants that can be combined with your BDC financing package.
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
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Loan Prep Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Get our comprehensive CSBFP and BDC financing preparation guide, complete with checklists and template worksheets.
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
