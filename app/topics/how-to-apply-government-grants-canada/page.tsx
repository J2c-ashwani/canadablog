import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "How to Apply for Government Grants Canada Guide 2026 | FSI Digital",
  description: "Learn how to apply for government grants in Canada. Read the definitive 2026 guide to grant writing, matching funds, and stacking rules.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/how-to-apply-government-grants-canada",
  },
  robots: { index: true, follow: true },
}

export default function HowToApplyGrantsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/how-to-apply-government-grants-canada#webpage",
        "url": "https://www.fsidigital.ca/topics/how-to-apply-government-grants-canada",
        "name": "How to Apply for Government Grants in Canada Guide 2026",
        "description": "Learn how to apply for government grants in Canada. Step-by-step proposal, evaluation, and application tips.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "How to Apply", "item": "https://www.fsidigital.ca/topics/how-to-apply-government-grants-canada" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/how-to-apply-government-grants-canada#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I find government grants in Canada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can find government grants in Canada through the official federal Innovation Canada portal, provincial ministry websites, municipal business offices, and proprietary databases like FSI Digital's AI Funding Finder."
            }
          },
          {
            "@type": "Question",
            "name": "What are the eligibility requirements for Canadian grants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eligibility varies by program but generally requires your business to be incorporated in Canada, operate for-profit, have under 500 employees, and prove technical innovation or job creation potential."
            }
          },
          {
            "@type": "Question",
            "name": "What is the success rate for government grant applications?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Success rates vary significantly. Small municipal or training grants can exceed 70% approval, while competitive federal programs like IRAP or Strategic Innovation Fund are highly selective, with approval rates often under 25%."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need matching funds to receive a grant?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, most Canadian government grants operate on a matching basis (co-funding). The government will typically cover 35% to 75% of eligible project costs, and your business must prove it has the capital to cover the remaining balance."
            }
          },
          {
            "@type": "Question",
            "name": "How do I write a successful grant proposal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A successful proposal clearly aligns with the program's economic objectives (e.g., job creation, export growth, technology innovation), features a detailed project plan, outlines measurable milestones, and provides auditable financial projections."
            }
          },
          {
            "@type": "Question",
            "name": "Can I hire a consultant to write my grant application?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Many businesses hire specialized grant writers or funding consultants. Compensation is typically structured as a flat writing fee, a contingency percentage (success fee) of 10% to 20%, or a hybrid of both."
            }
          },
          {
            "@type": "Question",
            "name": "How long does the grant approval process take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Timelines range from 4 to 8 weeks for local or digital adoption grants, to 3 to 6 months for large-scale provincial and federal innovation programs."
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
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.05),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 mb-6 uppercase tracking-wider">
              Acquisition & Funding Strategy Guide
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              How to Apply for Government Grants in Canada
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Accelerate your business with non-dilutive capital. Navigate the complex Canadian funding ecosystem with our step-by-step application walkthrough. Learn how to align proposals, secure matching funds, and stack programs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#application-steps"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-900/30 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Start Application Blueprint <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-indigo-400" /> Estimate Your Match
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-indigo-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">800+ Active</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Grants & Tax Programs</span>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">35%–75%</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Direct Cost Matching</span>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">4–8 Weeks</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Average Processing Time</span>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Non-Dilutive</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Keep 100% Equity</span>
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
                  Securing government funding in Canada is a powerful strategy for extending your runway and funding R&D, international market expansion, and workforce development. Every year, Canadian municipal, provincial, and federal governments allocate billions of dollars to encourage innovation and domestic growth. 
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  However, the application process can be opaque. Unlike private investments, government funding operates under strict public mandates. Successful applications require a deep understanding of how to align your business goals with the government's economic objectives, such as domestic employment creation, cleantech development, and global trade growth.
                </p>
              </section>

              {/* Step by Step Walkthrough */}
              <section id="application-steps" className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                  Step-by-Step Grant Application Blueprint
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Apply a systematic approach to research, draft, and submit your government funding applications:
                </p>

                <div className="relative border-l-2 border-slate-200 pl-6 ml-3 space-y-8 mt-6">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-indigo-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">1. Map Your Projects to Government Targets</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Before applying, identify your upcoming business costs—salaries, equipment purchases, marketing, export travel, or R&D. Locate programs matching those categories. Ensure your application emphasizes the government's desired outcome (e.g. CanExport focuses on international export revenues, while IRAP focus on technical innovation).
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-indigo-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">2. Confirm Matching Funds (Co-Funding)</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Canadian grants do not cover 100% of project costs. You must prove you possess the capital to cover the co-funding balance. For example, if a program matches 50% of a $100,000 project, you must provide bank statements, loan letters, or cash flow sheets proving you have the matching $50,000 ready.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-indigo-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">3. Write a Focused, Technical Proposal</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Your proposal must present concrete details. Avoid generic marketing copy. Clearly outline project milestones, detailed resource lists, technical risk parameters, and key milestones. Use metrics and data points to substantiate every claim.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-indigo-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">4. Submit and Prepare for Compliance</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Submit all required forms, tax documentation, and financial reports. Once approved, you will sign a contribution agreement. Set up separate ledger accounts to track your R&D expenses and labor hours, ensuring your books are fully prepared for government audits.
                    </p>
                  </div>
                </div>
              </section>

              {/* Stacking Rules */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">The Art of Stacking Canadian Grants</h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Grant stacking refers to the practice of using multiple funding sources to finance different components of the same business project. In Canada, stacking is a fully legal and encouraged method to maximize your funding runway—provided you adhere to strict compliance limits:
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <div className="flex gap-3 items-start text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>The 100% Cost Rule:</strong> The total combined federal, provincial, and municipal government assistance cannot exceed 100% of the actual project expenditures. You cannot profit from government funding.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Government Assistance Deductions:</strong> If you claim tax credits like SR&ED, you must deduct any direct grants received (like IRAP) from your eligible SR&ED expenditure pool.
                    </p>
                  </div>
                </div>
              </section>

              {/* Critical Warnings */}
              <section className="bg-red-50/60 rounded-3xl p-8 border border-red-200/80 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-950">Crucial Mistakes: Non-Retroactive Funding</h2>
                </div>
                <p className="text-red-900/90 text-sm leading-relaxed">
                  The most common reason for grant rejection is beginning project milestones before the grant contribution agreement is signed. The overwhelming majority of Canadian government grants **do not allow retroactive funding**. Any money spent, contracts signed, or employees hired prior to your formal approval date is ineligible for coverage. Plan ahead and do not initiate projects until you have a signed agreement.
                </p>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How do I find government grants in Canada?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      You can find government grants in Canada through the official federal Innovation Canada portal, provincial ministry websites, municipal business offices, and proprietary databases like FSI Digital's AI Funding Finder.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What are the eligibility requirements for Canadian grants?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Eligibility varies by program but generally requires your business to be incorporated in Canada, operate for-profit, have under 500 employees, and prove technical innovation or job creation potential.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the success rate for government grant applications?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Success rates vary significantly. Small municipal or training grants can exceed 70% approval, while competitive federal programs like IRAP or Strategic Innovation Fund are highly selective, with approval rates often under 25%.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Do I need matching funds to receive a grant?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, most Canadian government grants operate on a matching basis (co-funding). The government will typically cover 35% to 75% of eligible project costs, and your business must prove it has the capital to cover the remaining balance.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How do I write a successful grant proposal?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      A successful proposal clearly aligns with the program's economic objectives (e.g., job creation, export growth, technology innovation), features a detailed project plan, outlines measurable milestones, and provides auditable financial projections.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I hire a consultant to write my grant application?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. Many businesses hire specialized grant writers or funding consultants. Compensation is typically structured as a flat writing fee, a contingency percentage (success fee) of 10% to 20%, or a hybrid of both.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long does the grant approval process take?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Timelines range from 4 to 8 weeks for local or digital adoption grants, to 3 to 6 months for large-scale provincial and federal innovation programs.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cross Links */}
              <div className="border-t border-slate-200 pt-8 mt-12">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">Related Funding Resources</span>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/topics/federal-grants-small-business-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-red-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-red-700 text-sm inline-flex items-center gap-1">
                      Federal Small Business Grants <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Review active, matching federal grant programs managed by Innovation Canada.</p>
                  </Link>
                  <Link href="/topics/startup-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-violet-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-violet-700 text-sm inline-flex items-center gap-1">
                      Startup Grants Canada Guide <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Browse active seed capital and non-dilutive programs for Canadian startups.</p>
                  </Link>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 border border-slate-800 shadow-md">
                  <Calculator className="w-8 h-8 text-indigo-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Grant Match</h3>
                  <p className="text-indigo-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of federal and provincial matching funding ranges in minutes.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Match 800+ Grants</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Connect with our proprietary AI Funding Finder. Match your business coordinates to active regional, provincial, and national grant programs in seconds.
                  </p>
                  <Link
                    href="/grant-finder"
                    className="w-full bg-slate-950 hover:bg-slate-900 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Find Additional Grants
                  </Link>
                </div>

                {/* CTA 3: PDF Download */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/60 text-center">
                  <Download className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Checklist Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including application worksheets, checklist logs, and proposal outline templates.
                  </p>
                  <Link
                    href="/download/sba-application-checklist"
                    className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Download Claims Kit (PDF)
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
