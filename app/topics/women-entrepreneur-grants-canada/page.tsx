import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"
import { InlineGrantChecker } from "@/components/blog/InlineGrantChecker"

export const metadata: Metadata = {
  title: "Women Entrepreneur Grants Canada Guide 2026 | FSI Digital",
  description: "Explore government grants, loans, and support networks for women entrepreneurs in Canada. Read the 2026 Women Entrepreneurship Strategy (WES) guide.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/women-entrepreneur-grants-canada",
  },
  robots: { index: true, follow: true },
}

export default function WomenGrantsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/women-entrepreneur-grants-canada#webpage",
        "url": "https://www.fsidigital.ca/topics/women-entrepreneur-grants-canada",
        "name": "Women Entrepreneur Grants Canada Guide 2026",
        "description": "Explore government grants, loans, and support networks for women entrepreneurs in Canada. Women Entrepreneurship Strategy (WES).",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Women Grants", "item": "https://www.fsidigital.ca/topics/women-entrepreneur-grants-canada" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/women-entrepreneur-grants-canada#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the Women Entrepreneurship Strategy (WES)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Women Entrepreneurship Strategy (WES) is a $6 billion federal initiative designed to help women-owned businesses access capital, mentorship, business networks, and training to grow their operations."
            }
          },
          {
            "@type": "Question",
            "name": "Are there specific grants for women entrepreneurs in Canada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, through WES and delivery organizations like the Women Enterprise Organizations of Canada (WEOC), female founders can access non-dilutive funding, wage subsidies, and specialized lending products."
            }
          },
          {
            "@type": "Question",
            "name": "What is the definition of a women-owned business?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For most federal and provincial programs, a business is qualified as women-owned if it is at least 51% owned, controlled, and actively managed by one or more women."
            }
          },
          {
            "@type": "Question",
            "name": "What is the WES Ecosystem Fund?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The WES Ecosystem Fund is a federal program that supports nonprofit organizations offering specialized business resources, training, incubation, and mentorship to women entrepreneurs across Canada."
            }
          },
          {
            "@type": "Question",
            "name": "Does the BDC offer specialized financing for women?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The Business Development Bank of Canada (BDC) administers the Women in Technology Venture Fund and the Women Entrepreneurship Loan Fund, which offer flexible capital and credit lines."
            }
          },
          {
            "@type": "Question",
            "name": "Can I stack women-focused grants with other programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can stack women-focused grants with standard federal programs like IRAP or SR&ED, provided you do not exceed 100% of the project's actual expenditures."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I find regional networks for female founders?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Regional networks include organizations like Women Enterprise Centre (BC), Alberta Women Entrepreneurs (AWE), and Women's Enterprise Organizations of Canada (WEOC) which administer local loans and advisory boards."
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
      <section className="bg-gradient-to-b from-rose-950 via-rose-900 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(244,63,94,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 border border-rose-400/20 text-rose-300 mb-6 uppercase tracking-wider">
              Women Entrepreneurship Strategy (WES)
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Women Entrepreneur Grants in Canada
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Empowering female founders. Navigate specialized government grants, micro-loans, venture capital funds, and business networks designed to accelerate women-led businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#women-directory"
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-rose-900/30 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Compare Women Funding Paths <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-rose-400" /> Estimate Your Claim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-rose-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">$6 Billion</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Federal WES Strategy</span>
            </div>
            <div className="border-l-4 border-rose-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $50,000</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">WEOC Microloans</span>
            </div>
            <div className="border-l-4 border-rose-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">51% Ownership</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Qualification Baseline</span>
            </div>
            <div className="border-l-4 border-rose-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Regional Support</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">National Mentor Network</span>
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
                  Despite representing a growing percentage of business owners, female founders have historically faced systemic barriers when raising startup capital. To bridge this funding gap, the Government of Canada launched the **Women Entrepreneurship Strategy (WES)**, a $6 billion multi-agency initiative designed to provide women-led businesses with financing, advisory support, and access to domestic and international markets.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  WES works in tandem with specialized lending partners and nonprofit business networks across the country. Whether you need a micro-loan to buy inventory, a growth grant to export, or venture capital to scale a software platform, there are dedicated funding programs designed specifically to support female entrepreneurs.
                </p>
              </section>

              <InlineGrantChecker />

              {/* Core Programs */}
              <section id="women-directory" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Specialized Women Entrepreneur Programs</h2>
                
                <div className="space-y-6">
                  {/* WES Loan Fund */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Women Entrepreneurship Loan Fund</h3>
                      <span className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 text-xs font-bold shrink-0">Up to $50,000</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Administered through delivery organizations like the Women's Enterprise Organizations of Canada (WEOC), this program provides micro-loans of up to $50,000 for women entrepreneurs starting, buying, or growing a small business. It features flexible credit checks and does not require security.
                    </p>
                  </div>

                  {/* BDC Women in Tech */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">BDC Women in Technology Venture Fund</h3>
                      <span className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 text-xs font-bold shrink-0">Scale Funding</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      A specialized venture fund managed by BDC Capital. With over $500 million under management, it is one of the largest venture funds in the world dedicated to backing female-led technology companies at the seed, Series A, and Series B stages.
                    </p>
                  </div>

                  {/* WEOC Mentorship */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">WES Ecosystem Fund Programs</h3>
                      <span className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 text-xs font-bold shrink-0">Support & Networks</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Provides funding to regional business support groups (like WEC in BC or PARO in Ontario) to offer training, export preparation workshops, and peer-mentorship circles to help women entrepreneurs build operational capacity.
                    </p>
                  </div>
                </div>
              </section>

              {/* The 51% Rule */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Understanding the "51% Ownership" Rule</h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  To qualify for specialized women entrepreneur funding, your business must meet the strict legal definition of a women-owned enterprise:
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <div className="flex gap-3 items-start text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Majority Equity:</strong> One or more women must hold at least 51% of the company's common voting shares.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Day-to-Day Management:</strong> Women must occupy top leadership roles (e.g. CEO, President, or Managing Director) and be actively involved in day-to-day strategic decision-making.
                    </p>
                  </div>
                </div>
              </section>

              {/* Warning/Pitfalls */}
              <section className="bg-red-50/60 rounded-3xl p-8 border border-red-200/80 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-950">Watch Out for "Token" Co-Founders</h2>
                </div>
                <p className="text-red-900/90 text-sm leading-relaxed">
                  Government auditors scrutinize business structures to prevent "fronting"—the practice of listing a female co-founder on corporate registration documents to qualify for grants while male directors retain actual financial control and operational authority. If a corporate structure audit reveals that the female director does not have signing authority or control over bank accounts, the grant will be revoked and funds must be repaid.
                </p>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the Women Entrepreneurship Strategy (WES)?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The Women Entrepreneurship Strategy (WES) is a $6 billion federal initiative designed to help women-owned businesses access capital, mentorship, business networks, and training to grow their operations.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Are there specific grants for women entrepreneurs in Canada?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, through WES and delivery organizations like the Women Enterprise Organizations of Canada (WEOC), female founders can access non-dilutive funding, wage subsidies, and specialized lending products.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the definition of a women-owned business?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      For most federal and provincial programs, a business is qualified as women-owned if it is at least 51% owned, controlled, and actively managed by one or more women.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the WES Ecosystem Fund?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The WES Ecosystem Fund is a federal program that supports nonprofit organizations offering specialized business resources, training, incubation, and mentorship to women entrepreneurs across Canada.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Does the BDC offer specialized financing for women?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. The Business Development Bank of Canada (BDC) administers the Women in Technology Venture Fund and the Women Entrepreneurship Loan Fund, which offer flexible capital and credit lines.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I stack women-focused grants with other programs?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, you can stack women-focused grants with standard federal programs like IRAP or SR&ED, provided you do not exceed 100% of the project's actual expenditures.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Where can I find regional networks for female founders?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Regional networks include organizations like Women Enterprise Centre (BC), Alberta Women Entrepreneurs (AWE), and Women's Enterprise Organizations of Canada (WEOC) which administer local loans and advisory boards.
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
                      Startup Grants Canada <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Browse specific seed and early-stage capital opportunities for tech startups in Canada.</p>
                  </Link>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-rose-950 to-slate-950 text-white rounded-3xl p-6 border border-rose-900 shadow-md">
                  <Calculator className="w-8 h-8 text-rose-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Grant Size</h3>
                  <p className="text-rose-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of federal wage subsidies and matching tax returns in minutes.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-rose-600 mb-4" />
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
                  <Download className="w-8 h-8 text-rose-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download WES Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including application worksheets, proposal checklists, and regional directory guidelines.
                  </p>
                  <Link
                    href="/download/wes-application-kit"
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
