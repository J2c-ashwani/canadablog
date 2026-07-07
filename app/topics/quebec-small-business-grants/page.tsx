import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Quebec Small Business Grants Guide 2026 | FSI Digital",
  description: "Navigate provincial business grants and tax refunds in Quebec. Read our expert 2026 guide to Investissement Québec, ESSOR, and R&D credits.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/quebec-small-business-grants",
  },
  robots: { index: true, follow: true },
}

export default function QuebecGrantsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/quebec-small-business-grants#webpage",
        "url": "https://www.fsidigital.ca/topics/quebec-small-business-grants",
        "name": "Quebec Small Business Grants Guide 2026",
        "description": "Navigate provincial business grants and tax refunds in Quebec. Investissement Québec, ESSOR, and R&D credits.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Quebec Grants", "item": "https://www.fsidigital.ca/topics/quebec-small-business-grants" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/quebec-small-business-grants#howto",
        "name": "How to Apply for Quebec Business Grants",
        "description": "Step-by-step process to prepare, align, and submit applications for business funding in Quebec.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Review Investissement Québec Portfolios",
            "text": "Locate matching provincial programs (such as the ESSOR program for innovation or digital transformation initiatives)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Confirm French Documentation Compliance",
            "text": "Ensure all project descriptions, financial statements, and business plans conform to Charter of the French Language requirements."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Establish Matching Balance",
            "text": "Confirm that your company possesses the required matching capital (typically 50% to 75% of eligible expenditures)."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Submit via the IQ Client Portal",
            "text": "Register in the Investissement Québec portal, submit your complete proposal file, and await audit review."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/quebec-small-business-grants#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What grants are available for Quebec businesses?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Quebec businesses can access several provincial programs, including the ESSOR program for growth and digital transformation, Investissement Québec (IQ) loans and guarantees, and generous provincial R&D tax credits."
            }
          },
          {
            "@type": "Question",
            "name": "What is the ESSOR program?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ESSOR is a major provincial program administered by Investissement Québec. It provides financial support (both repayable and non-repayable) to help businesses accelerate digital adoption, automate production facilities, and expand capacity."
            }
          },
          {
            "@type": "Question",
            "name": "Do Quebec business grants require matching funds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, almost all Quebec provincial grants require matching capital (co-funding). The government will typically cover 25% to 50% of eligible costs, and you must cover the remaining balance."
            }
          },
          {
            "@type": "Question",
            "name": "What are Quebec's R&D tax incentives?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Quebec offers some of the most generous R&D tax credits in Canada. The provincial R&D tax credit is up to 14% refundable for eligible SMEs, which stacks on top of the federal 35% SR&ED credit."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to submit grant applications in French?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Provincial ministries and crown corporations like Investissement Québec require all official applications, business plans, and financial reports to be submitted in French."
            }
          },
          {
            "@type": "Question",
            "name": "Can I combine Quebec provincial grants with federal programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, grant stacking is permitted. You can combine Quebec provincial funds with federal programs like IRAP or SR&ED, provided you properly account for them on tax filings and do not exceed 100% of project costs."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Quebec grant approval take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Approval timelines range from 6 to 10 weeks for digital adoption grants, to 3 to 6 months for major capital expansion funds like ESSOR."
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
      <section className="bg-gradient-to-b from-blue-955 via-blue-900 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 border border-blue-400/20 text-blue-300 mb-6 uppercase tracking-wider">
              Quebec Provincial Funding & R&D Credits
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Quebec Small Business Grants Directory
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Accelerate your business in Quebec. Access Investissement Québec loans, ESSOR digital adoption grants, and industry-leading R&D tax refunds. Read our complete 2026 guide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#quebec-grants"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Compare Quebec Programs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-blue-400" /> Estimate Your Claim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">ESSOR Fund</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Capital & Tech Grants</span>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to 14%</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Provincial R&D Refund</span>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">French Required</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Compliance Standard</span>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Invest QC</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Direct Loan Support</span>
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
                  Quebec offers one of the most proactive business-funding landscapes in Canada. Led by **Investissement Québec (IQ)** and the Ministère de l'Économie, de l'Innovation et de l'Énergie, the province regularly distributes loans, guarantees, and grants to encourage capital investments, digital transformation, and industrial research.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  For entrepreneurs in Montreal, Quebec City, or Sherbrooke, these programs represent a key source of growth capital. Combining Quebec's provincial tax offsets with federal programs (such as SR&ED and IRAP) can recover more than 45% of eligible technical expenditures.
                </p>
              </section>

              {/* Core Programs */}
              <section id="quebec-grants" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Active Quebec Provincial Grants</h2>
                
                <div className="space-y-6">
                  {/* ESSOR */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">ESSOR Program</h3>
                      <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold shrink-0">Scale & Digitalization</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Administered by Investissement Québec, ESSOR supports business scale-up, automation, and digital adoption. It provides non-repayable contributions and interest-free loans to fund software integration, feasibility studies, and facility expansions.
                    </p>
                  </div>

                  {/* Provincial R&D */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Quebec R&D Tax Credit</h3>
                      <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold shrink-0">Up to 14% Refund</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Quebec offers an additional refundable tax credit of up to 14% on salaries paid to employees engaged in eligible R&D work within the province, stacking directly on top of the federal SR&ED program.
                    </p>
                  </div>
                </div>
              </section>

              {/* Language compliance */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Important French Language Compliance Rules</h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Applying for provincial funding in Quebec requires adhering to strict language regulations. Under provincial law:
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    All official application materials, project descriptions, financial forecast files, and business plans submitted to Investissement Québec or provincial ministries must be drafted in French. Working with a bilingual grant writer or translator is highly recommended to ensure compliance.
                  </p>
                </div>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What grants are available for Quebec businesses?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Quebec businesses can access several provincial programs, including the ESSOR program for growth and digital transformation, Investissement Québec (IQ) loans and guarantees, and generous provincial R&D tax credits.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the ESSOR program?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      ESSOR is a major provincial program administered by Investissement Québec. It provides financial support (both repayable and non-repayable) to help businesses accelerate digital adoption, automate production facilities, and expand capacity.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Do Quebec business grants require matching funds?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, almost all Quebec provincial grants require matching capital (co-funding). The government will typically cover 25% to 50% of eligible costs, and you must cover the remaining balance.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What are Quebec's R&D tax incentives?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Quebec offers some of the most generous R&D tax credits in Canada. The provincial R&D tax credit is up to 14% refundable for eligible SMEs, which stacks on top of the federal 35% SR&ED credit.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Do I need to submit grant applications in French?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. Provincial ministries and crown corporations like Investissement Québec require all official applications, business plans, and financial reports to be submitted in French.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I combine Quebec provincial grants with federal programs?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, grant stacking is permitted. You can combine Quebec provincial funds with federal programs like IRAP or SR&ED, provided you properly account for them on tax filings and do not exceed 100% of project costs.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long does Quebec grant approval take?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Approval timelines range from 6 to 10 weeks for digital adoption grants, to 3 to 6 months for major capital expansion funds like ESSOR.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Programs & Topics (Mesh) */}
              <div className="border-t border-slate-200 pt-8 mt-12 space-y-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Programs</span>
                  <div className="flex flex-wrap gap-2.5">
                    <Link href="/programs/sred-tax-credit" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">SR&ED Tax Credit</Link>
                    <Link href="/programs/irap-grant" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">IRAP Wage Subsidy</Link>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Topics</span>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link href="/topics/startup-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-350 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-violet-700 text-sm inline-flex items-center gap-1">Startup Grants Canada <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review active, matching federal grant programs for early-stage companies.</p>
                    </Link>
                    <Link href="/topics/hiring-wage-subsidies-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-350 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-amber-700 text-sm inline-flex items-center gap-1">Hiring Subsidies Guide <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Learn how to offset technical developer and research assistant salaries.</p>
                    </Link>
                  </div>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-blue-950 to-slate-950 text-white rounded-3xl p-6 border border-blue-900 shadow-md">
                  <Calculator className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Quebec Return</h3>
                  <p className="text-blue-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of federal wage subsidies and provincial Quebec tax credits.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Match 1,200+ grants</h3>
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
                  <Download className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Quebec Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including application worksheets, proposal checklists, and regional directory guidelines.
                  </p>
                  <Link
                    href="/download/quebec-business-grants-kit"
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
