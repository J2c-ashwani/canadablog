import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Government Loans Small Business Canada Guide 2026 | FSI Digital",
  description: "Navigate government-backed business loans in Canada. Read our complete guide to CSBFP, BDC, EDC working capital, and interest-free startup funding.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/government-loans-small-business-canada",
  },
  robots: { index: true, follow: true },
}

export default function GovernmentLoansEligibilityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/government-loans-small-business-canada#webpage",
        "url": "https://www.fsidigital.ca/topics/government-loans-small-business-canada",
        "name": "Government Loans Small Business Canada Guide 2026",
        "description": "Navigate government-backed business loans in Canada.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Government Loans Canada", "item": "https://www.fsidigital.ca/topics/government-loans-small-business-canada" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/government-loans-small-business-canada#howto",
        "name": "How to Secure Government Business Loans",
        "description": "Step-by-step application walkthrough to identify programs, prepare financial files, and secure government-backed loans in Canada.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Determine the Best Loan Program",
            "text": "Review government lending programs to match your needs (e.g., CSBFP for capital assets, BDC for direct commercial credit, or Regional Development Agencies for interest-free loans)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Compile Financial and Corporate Records",
            "text": "Gather two years of accountant-prepared financial statements, corporate tax returns (T2), and a detailed business plan outlining loan repayment."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Submit Application to Participating Lender",
            "text": "Present your application and asset quotes to the commercial desk of a participating bank (for CSBFP) or directly to BDC via their online portal."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Finalize Terms and Close",
            "text": "Review the loan contract, register any required personal guarantees or asset liens, and pay government registration fees to release the loan capital."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/government-loans-small-business-canada#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between a government grant and a government loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Government grants are non-repayable contributions that you do not have to pay back, provided you meet project milestones. Government loans are repayable financial products that must be paid back over time, though they often feature lower interest rates, flexible terms, or government-backed guarantees."
            }
          },
          {
            "@type": "Question",
            "name": "How does the Canada Small Business Financing Program (CSBFP) work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under the CSBFP, the federal government guarantees 85% of a business loan provided by a participating commercial bank or credit union. This lowers the bank's lending risk, making it easier for small businesses to secure financing for equipment, leasehold improvements, and real estate."
            }
          },
          {
            "@type": "Question",
            "name": "How do I apply for a CSBFP loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You do not apply directly to the government for the CSBFP. Instead, you apply through a participating financial institution (like RBC, TD, Scotiabank, BMO, or CIBC). The bank makes the lending decision and registers the loan with Innovation, Science and Economic Development Canada."
            }
          },
          {
            "@type": "Question",
            "name": "Can I combine government loans with grants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Stacking government loans (like BDC or CSBFP financing) with grants (like IRAP) or tax credits (like SR&ED) is fully allowed. Stacking allows you to leverage debt to cover the co-funding portion of a government grant."
            }
          },
          {
            "@type": "Question",
            "name": "What is the BDC and how is it different from a regular bank?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Business Development Bank of Canada (BDC) is a federal Crown corporation dedicated to serving entrepreneurs. Unlike traditional banks that require strict collateral, BDC acts as a developmental lender, offering patient debt capital, mezzanine financing, and venture capital for growth-oriented companies."
            }
          },
          {
            "@type": "Question",
            "name": "Are there interest-free government loans for small businesses in Canada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Regional Development Agencies (like FedDev Ontario or PacifiCan) regularly offer interest-free, repayable contributions for business scaling and expansion. Additionally, programs like CDAP have offered interest-free loans of up to $100,000 through BDC."
            }
          },
          {
            "@type": "Question",
            "name": "How long does CSBFP approval take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Because the lending decision is made by the commercial bank, the timeline is controlled by your bank's underwriting speed. Typically, it takes between 2 to 6 weeks to clear screening, underwriting, and registration."
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
      <section className="bg-gradient-to-b from-amber-950 via-amber-900 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-400/20 text-amber-300 mb-6 uppercase tracking-wider">
              Government-Backed Financing & Credit
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Government Loans for Small Business in Canada
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Secure low-interest, government-backed debt capital. Read the complete 2026 guide to the Canada Small Business Financing Program (CSBFP), BDC loans, EDC working capital, and regional interest-free loans.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#loan-programs"
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-amber-900/30 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Compare Loan Programs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-amber-400" /> Estimate Your Claim
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
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">CSBFP Loan Cap</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">85% Guarantee</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Government Backed</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">0% Interest</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Regional RDA Loans</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">BDC Lending</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Direct Developer Financing</span>
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
                  While non-repayable grants and tax credits represent the ideal form of funding, they often require matching capital or are paid out retroactively. To bridge these cash flow gaps, the Government of Canada offers robust **government-backed loans, lines of credit, and repayable financing programs** for small and medium-sized enterprises (SMEs). 
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  By partnering with commercial banks and Crown corporations like the Business Development Bank of Canada (BDC), the federal government provides credit support that reduces lender risk. This allows Canadian business owners to access capital with lower collateral requirements, flexible repayment terms, and competitive interest rates.
                </p>
              </section>

              {/* Loan Programs Table / List */}
              <section id="loan-programs" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Major Government-Backed Loan Programs</h2>
                
                <div className="space-y-6">
                  {/* CSBFP */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Canada Small Business Financing Program (CSBFP)</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0">Up to $1.15M</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Administered through major commercial banks, the government guarantees 85% of this loan to lower borrowing hurdles. You can borrow up to $1,000,000 for real property and equipment purchase, and up to $150,000 for working capital or intangible costs. To qualify, your annual corporate revenue must be under $10 million.
                    </p>
                  </div>

                  {/* BDC */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Business Development Bank of Canada (BDC)</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0">$10K to $10M+</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      BDC acts as a direct developmental lender owned by the government. It offers flexible, non-collateralized loans for technology deployment, working capital, market expansion, and business acquisition. BDC is known for offering "patient capital" with flexible repayment terms designed to protect cash flow.
                    </p>
                  </div>

                  {/* EDC */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Export Development Canada (EDC)</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0Up to $5M">Up to $5M</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      EDC provides credit guarantees and working capital financing specifically for Canadian companies that export goods or services internationally. They also offer receivables insurance to protect your business against foreign customer default.
                    </p>
                  </div>

                  {/* Futurpreneur */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Futurpreneur Canada</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0">Up to $60,000</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      A specialized startup financing program for founders aged 18 to 39. It provides up to $20,000 in seed capital, which can be matched with an additional BDC loan of up to $40,000. It requires no collateral and includes 2 years of mandatory business mentorship.
                    </p>
                  </div>
                </div>
              </section>

              {/* RDA Repayable Contributions */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">RDA Interest-Free Repayable Loans</h2>
                <p className="text-slate-600 leading-relaxed">
                  Canada's Regional Development Agencies (RDAs) provide funding through interest-free repayable contributions. These are essentially **interest-free loans** designed to support economic scale-up, automation, and clean tech adoption:
                </p>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900">Interest-Free Terms</h4>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        Because these loans are interest-free, the cost of capital is zero, providing a massive advantage over commercial bank financing. Repayment typically starts after a grace period.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                    <DollarSign className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900">Funding Ranges</h4>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        Typically covering 35% to 50% of project budgets, these interest-free loans range from $50,000 to $500,000+ for growing businesses.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Common Pitfalls */}
              <section className="bg-red-50/60 rounded-3xl p-8 border border-red-200/80 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-950">Common Financing Mistakes</h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-white p-4 rounded-xl border border-red-100">
                    <span className="font-extrabold text-red-800 block mb-1">Applying Directly to the Ministry for CSBFP:</span>
                    <p className="text-slate-600 leading-relaxed">
                      The federal government does not issue CSBFP funds directly. Many business owners waste hours searching for a government portal. You must apply for a CSBFP loan directly through your commercial bank manager.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-red-100">
                    <span className="font-extrabold text-red-800 block mb-1">Failing to Prepare a Detailed Business Plan:</span>
                    <p className="text-slate-600 leading-relaxed">
                      Even with an 85% government guarantee, banks will reject CSBFP applications if you cannot show cash flow forecasts proving you can service the debt. A professional business plan and forecast models are required.
                    </p>
                  </div>
                </div>
              </section>

              {/* Loans vs Grants Stacking */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">How to Stack Loans with Grants</h2>
                <p className="text-slate-600 leading-relaxed">
                  Leveraging government-backed loans is a powerful strategy to bridge the co-funding requirements of non-repayable grants. 
                </p>
                <p className="text-slate-600 leading-relaxed">
                  For example, if you receive a federal grant that covers 50% of your $200,000 project cost, you must fund the remaining $100,000. Instead of diluting equity, you can secure a BDC growth loan or a CSBFP line of credit to fund the matching portion, preserving your ownership stakes.
                </p>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the difference between a government grant and a government loan?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Government grants are non-repayable contributions that you do not have to pay back, provided you meet project milestones. Government loans are repayable financial products that must be paid back over time, though they often feature lower interest rates, flexible terms, or government-backed guarantees.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How does the Canada Small Business Financing Program (CSBFP) work?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Under the CSBFP, the federal government guarantees 85% of a business loan provided by a participating commercial bank or credit union. This lowers the bank's lending risk, making it easier for small businesses to secure financing for equipment, leasehold improvements, and real estate.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How do I apply for a CSBFP loan?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      You do not apply directly to the government for the CSBFP. Instead, you apply through a participating financial institution (like RBC, TD, Scotiabank, BMO, or CIBC). The bank makes the lending decision and registers the loan with Innovation, Science and Economic Development Canada.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I combine government loans with grants?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. Stacking government loans (like BDC or CSBFP financing) with grants (like IRAP) or tax credits (like SR&ED) is fully allowed. Stacking allows you to leverage debt to cover the co-funding portion of a government grant.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the BDC and how is it different from a regular bank?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The Business Development Bank of Canada (BDC) is a federal Crown corporation dedicated to serving entrepreneurs. Unlike traditional banks that require strict collateral, BDC acts as a developmental lender, offering patient debt capital, mezzanine financing, and venture capital for growth-oriented companies.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Are there interest-free government loans for small businesses in Canada?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. Regional Development Agencies (like FedDev Ontario or PacifiCan) regularly offer interest-free, repayable contributions for business scaling and expansion. Additionally, programs like CDAP have offered interest-free loans of up to $100,000 through BDC.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long does CSBFP approval take?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Because the lending decision is made by the commercial bank, the timeline is controlled by your bank's underwriting speed. Typically, it takes between 2 to 6 weeks to clear screening, underwriting, and registration.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cross Links */}
              <div className="border-t border-slate-200 pt-8 mt-12">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">Related Funding Resources</span>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/topics/startup-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-violet-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-violet-700 text-sm inline-flex items-center gap-1">
                      Startup Grants Canada Guide <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Browse the definitive master guide to securing non-dilutive financing for early-stage Canadian startups.</p>
                  </Link>
                  <Link href="/topics/ontario-small-business-grants" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-red-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-red-700 text-sm inline-flex items-center gap-1">
                      Ontario Small Business Grants Guide <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Explore provincial and federal government grants and tax offsets available specifically in Ontario.</p>
                  </Link>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-amber-950 to-slate-950 text-white rounded-3xl p-6 border border-amber-900 shadow-md">
                  <Calculator className="w-8 h-8 text-amber-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Financing</h3>
                  <p className="text-amber-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of government loan repayment paths and matching grant options in minutes.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-amber-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Match 1,200+ loans</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Connect with our proprietary AI Funding Finder. Match your business coordinates to active regional, provincial, and national debt and credit programs.
                  </p>
                  <Link
                    href="/grant-finder"
                    className="w-full bg-slate-950 hover:bg-slate-900 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Find Additional Loans
                  </Link>
                </div>

                {/* CTA 3: PDF Download */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/60 text-center">
                  <Download className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download CSBFP Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including bank checklist, cash flow planning templates, and CSBFP loan guides.
                  </p>
                  <Link
                    href="/download/csbfp-application-kit"
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
