import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Export Grants Canada Guide 2026 | CanExport & EDC Funding",
  description: "Learn how to secure government grants for international expansion. Complete guide to CanExport SMEs, EDC export financing, and trade funding.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/export-grants-canada",
  },
  robots: { index: true, follow: true },
}

export default function ExportGrantsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/export-grants-canada#webpage",
        "url": "https://www.fsidigital.ca/topics/export-grants-canada",
        "name": "Export Grants Canada Guide 2026 | CanExport & EDC Funding",
        "description": "Learn how to secure government grants for international expansion. Complete guide to CanExport SMEs, EDC export financing, and trade funding.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Export Grants", "item": "https://www.fsidigital.ca/topics/export-grants-canada" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/export-grants-canada#howto",
        "name": "How to Apply for CanExport SMEs Grant",
        "description": "A step-by-step application walkthrough for securing federal CanExport funding for international business expansion.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Target Export Markets",
            "text": "Identify up to five target international markets where your business has had zero or minimal sales (under $100,000 or 10% of total sales) in the last 24 months."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Develop International Marketing Plan",
            "text": "Draft a detailed expansion budget, specifying costs for digital marketing campaigns, trade show participation, translation, and IP protection."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Verify Financial and Registration Eligibility",
            "text": "Ensure your corporation is federally or provincially incorporated, has a valid CRA business number, and has declared at least $100,000 in annual revenue in Canada."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Submit Application via Portal",
            "text": "Complete the online application via the Trade Commissioner Service portal at least 8 to 10 weeks before your planned export activities begin."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/export-grants-canada#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the CanExport SMEs program?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CanExport SMEs is a federal grant program that provides up to $50,000 in non-repayable matching funds (covering up to 50% of project costs) to help Canadian small and medium-sized enterprises expand into new international markets."
            }
          },
          {
            "@type": "Question",
            "name": "What expenses are eligible under CanExport?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eligible expenses include digital marketing targeting foreign markets, search engine optimization (SEO), translation of marketing materials, registration and travel for international trade shows, legal fees for foreign product certification, and IP protection abroad."
            }
          },
          {
            "@type": "Question",
            "name": "Can pre-revenue startups apply for export grants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Generally, CanExport requires at least $100,000 in declared annual revenue in Canada. Pre-revenue startups may explore alternative programs like CanExport Innovation for IP commercialization, which has more flexible revenue guidelines, or regional development loans."
            }
          },
          {
            "@type": "Question",
            "name": "Does EDC provide grants for exporters?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Export Development Canada (EDC) does not typically provide direct non-repayable grants. Instead, EDC offers financial services, including export credit insurance, working capital guarantees, and commercial loans designed to protect and fund international trade activities."
            }
          },
          {
            "@type": "Question",
            "name": "Can I stack provincial export programs with CanExport?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can stack provincial export grants (such as the Ontario Exporter Support program or Saskatchewan STEP) with federal CanExport grants, but the total government funding across all levels cannot exceed 75% of the total eligible project budget."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take for CanExport approvals?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CanExport application reviews typically take between 6 to 8 weeks. Because funding is not retroactive, your application must be submitted and approved before you incur any eligible project expenses."
            }
          },
          {
            "@type": "Question",
            "name": "What constitutes a 'new' market for CanExport?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A new market is a country where your company has generated less than 10% of its total sales or under $100,000 in revenue during the past 24 months. For larger countries like the United States, China, or India, sub-regions or states may qualify as distinct markets."
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
      <section className="bg-gradient-to-b from-purple-950 via-slate-950 to-purple-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-400/20 text-purple-300 mb-6 uppercase tracking-wider">
              International Expansion & Trade Subsidies
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Export Grants & Trade Funding in Canada
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Expand your business globally. Leverage CanExport grants and Export Development Canada (EDC) financing to offset foreign marketing, trade show travel, and international IP registration costs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#export-grants"
                className="bg-purple-700 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Explore Trade Grants <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-900/80 hover:bg-slate-900 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-purple-400" /> Estimate Your Claim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-purple-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $50,000</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">CanExport SME Grant</span>
            </div>
            <div className="border-l-4 border-purple-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">50% Co-Funding</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Expense Reimbursement</span>
            </div>
            <div className="border-l-4 border-purple-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">$100,000+</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Minimum Revenue Rule</span>
            </div>
            <div className="border-l-4 border-purple-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">EDC Backing</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Accounts Receivable Cover</span>
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
                  Global market diversification is one of the most reliable strategies for Canadian businesses looking to accelerate growth. However, international expansion involves substantial upfront costs and risks, from setting up foreign digital marketing campaigns to translating materials and acquiring local certifications.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  To mitigate these barriers, the Government of Canada offers robust financial programs designed to fund international business development. Chief among these is the **CanExport** program, alongside specialized risk management and working capital options from **Export Development Canada (EDC)**. By utilizing these incentives, Canadian businesses can offset up to half of their international business development budgets.
                </p>
              </section>

              {/* Core Programs */}
              <section id="export-grants" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Major Canadian Export Funding Programs</h2>
                
                <div className="space-y-6">
                  {/* CanExport SMEs */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">CanExport SMEs</h3>
                      <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-700 text-xs font-bold shrink-0">Up to $50,000 Grant</span>
                    </div>
                    <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                      This flagship federal program covers up to 50% of international business development costs, ranging from $10,000 to $50,000 per project. It is aimed at Canadian incorporated companies with under 500 employees and at least $100,000 in declared annual revenue. Funds can support online marketing, travel, translation, and trademark filings in countries where you have no significant sales footprint.
                    </p>
                  </div>

                  {/* CanExport Innovation */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">CanExport Innovation</h3>
                      <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-700 text-xs font-bold shrink-0">Up to $75,000 Grant</span>
                    </div>
                    <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                      Designed for technology startups and researchers seeking to establish international R&D collaborations or commercialize intellectual property. It provides up to $75,005 in funding to cover up to 75% of travel, legal, and partnership negotiation costs. Crucially, it does not require a minimum revenue threshold, making it highly suitable for early-stage innovators.
                    </p>
                  </div>

                  {/* Export Development Canada (EDC) */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">EDC Export Financing & Insurance</h3>
                      <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-700 text-xs font-bold shrink-0Financing & Insurance">Credit Support</span>
                    </div>
                    <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                      EDC offers export credit insurance that guarantees up to 90% of receivables, protecting you against non-payment by foreign clients. They also offer working capital guarantees that make it easier for your bank to lend you funds for international project execution, and direct financing for capital expenditures related to export growth.
                    </p>
                  </div>
                </div>
              </section>

              {/* Step-by-Step Guide */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">How to Apply for CanExport SMEs Funding</h2>
                <div className="relative border-l-2 border-purple-200 pl-6 ml-3 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-purple-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">1. Identify Target Markets and Verify Revenue</h3>
                    <p className="text-slate-650 text-xs sm:text-sm mt-1 leading-relaxed">
                      Verify that your company has earned at least $100,000 in domestic revenue in the last fiscal year. Select up to five target countries where you have generated under $100,000 or 10% of total revenue over the last 24 months.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-purple-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">2. Develop an Action Plan and Budget</h3>
                    <p className="text-slate-650 text-xs sm:text-sm mt-1 leading-relaxed">
                      Map out your proposed activities (e.g., search engine marketing, foreign trademark filings, international trade show travel) and obtain quotes from vendors. Your budget must demonstrate that you have the matching 50% funding available.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-purple-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">3. Submit Application via Portal</h3>
                    <p className="text-slate-650 text-xs sm:text-sm mt-1 leading-relaxed">
                      Submit your application through the Trade Commissioner Service portal. The review process takes 6 to 8 weeks. Crucially, do not commit to or pay for any export expenditures prior to receiving your formal approval letter, as retroactivity is not permitted.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the CanExport SMEs program?</h3>
                    <p className="text-slate-650 text-sm leading-relaxed">
                      CanExport SMEs is a federal grant program that provides up to $50,000 in non-repayable matching funds (covering up to 50% of project costs) to help Canadian small and medium-sized enterprises expand into new international markets.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What expenses are eligible under CanExport?</h3>
                    <p className="text-slate-650 text-sm leading-relaxed">
                      Eligible expenses include digital marketing targeting foreign markets, search engine optimization (SEO), translation of marketing materials, registration and travel for international trade shows, legal fees for foreign product certification, and IP protection abroad.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can pre-revenue startups apply for export grants?</h3>
                    <p className="text-slate-650 text-sm leading-relaxed">
                      Generally, CanExport requires at least $100,000 in declared annual revenue in Canada. Pre-revenue startups may explore alternative programs like CanExport Innovation for IP commercialization, which has more flexible revenue guidelines, or regional development loans.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Does EDC provide grants for exporters?</h3>
                    <p className="text-slate-650 text-sm leading-relaxed">
                      Export Development Canada (EDC) does not typically provide direct non-repayable grants. Instead, EDC offers financial services, including export credit insurance, working capital guarantees, and commercial loans designed to protect and fund international trade activities.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I stack provincial export programs with CanExport?</h3>
                    <p className="text-slate-650 text-sm leading-relaxed">
                      Yes, you can stack provincial export grants (such as the Ontario Exporter Support program or Saskatchewan STEP) with federal CanExport grants, but the total government funding across all levels cannot exceed 75% of the total eligible project budget.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long does it take for CanExport approvals?</h3>
                    <p className="text-slate-650 text-sm leading-relaxed">
                      CanExport application reviews typically take between 6 to 8 weeks. Because funding is not retroactive, your application must be submitted and approved before you incur any eligible project expenses.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What constitutes a 'new' market for CanExport?</h3>
                    <p className="text-slate-650 text-sm leading-relaxed">
                      A new market is a country where your company has generated less than 10% of its total sales or under $100,000 in revenue during the past 24 months. For larger countries like the United States, China, or India, sub-regions or states may qualify as distinct markets.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Programs & Topics (Mesh) */}
              <div className="border-t border-slate-200 pt-8 mt-12 space-y-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Programs</span>
                  <div className="flex flex-wrap gap-2.5">
                    <Link href="/programs/canexport" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">CanExport Program</Link>
                    <Link href="/programs/canexport" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">EDC Receivables Insurance</Link>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Topics</span>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link href="/topics/startup-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-purple-700 text-sm inline-flex items-center gap-1">Startup Grants Canada <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review non-dilutive programs for early-stage companies and pre-revenue startups.</p>
                    </Link>
                    <Link href="/topics/how-to-apply-government-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-purple-700 text-sm inline-flex items-center gap-1">Grant Application Process <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Learn how to write successful grant proposals and organize co-funding balances.</p>
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
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Travel & Ad Return</h3>
                  <p className="text-slate-200 text-xs leading-relaxed mb-6">
                    Calculate your eligible CanExport refund. See how much matching cash you need and estimate the total return on foreign expansion budgets.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-purple-750 hover:bg-purple-700 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-slate-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Find 800+ Trade Grants</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Connect with our proprietary AI Funding Finder. Find additional provincial market development grants and regional export tax offsets.
                  </p>
                  <Link
                    href="/grant-finder"
                    className="w-full bg-slate-950 hover:bg-slate-900 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Find Export Grants
                  </Link>
                </div>

                {/* CTA 3: PDF Download */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/60 text-center">
                  <Download className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Export Trade Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Download our comprehensive EDC Women in Trade & export financing application guide. Detailed checklists for global success.
                  </p>
                  <Link
                    href="/download/edc-women-trade-export-financing-guide"
                    className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Download Export Guide (PDF)
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
