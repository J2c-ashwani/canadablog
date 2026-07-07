import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Alberta Innovates Grant Guide 2026 | FSI Digital",
  description: "Learn how to qualify for Alberta Innovates funding. Explore the 2026 guide to micro-vouchers, voucher programs, eligibility, and application steps.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/alberta-innovates-grant",
  },
  robots: { index: true, follow: true },
}

export default function AlbertaInnovatesGrantPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/alberta-innovates-grant#webpage",
        "url": "https://www.fsidigital.ca/topics/alberta-innovates-grant",
        "name": "Alberta Innovates Grant Guide 2026",
        "description": "Learn how to qualify for Alberta Innovates funding. Micro-vouchers, voucher programs, eligibility, and application steps.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Alberta Innovates", "item": "https://www.fsidigital.ca/topics/alberta-innovates-grant" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/alberta-innovates-grant#howto",
        "name": "How to Apply for Alberta Innovates Funding",
        "description": "Step-by-step process to apply for the Alberta Innovates Voucher and Micro-Voucher programs.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Identify the Funding Stream",
            "text": "Review active programs such as Micro-Vouchers (up to $10,000) or Vouchers (up to $100,000) based on your development stage."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Retain a Service Provider",
            "text": "Identify and contract a qualified, third-party service provider to execute the technical tasks (e.g. prototyping or testing)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Submit Project Portal Intake",
            "text": "Create an account in the Alberta Innovates portal, draft your technical project proposal, and submit it for review."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Manage Milestones & Reimbursement",
            "text": "Once approved, complete milestones and submit invoices to Alberta Innovates for direct provider reimbursement."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/alberta-innovates-grant#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Alberta Innovates?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Alberta Innovates is a provincial crown corporation that provides funding, advisory networks, and technical resources to accelerate research, innovation, and entrepreneurship in Alberta."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between an Alberta Innovates Voucher and Micro-Voucher?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Micro-Vouchers provide up to $10,000 to fund early-stage projects (e.g. feasibility or market studies). Voucher programs provide up to $100,000 to cover 75% of eligible project costs for advanced product development."
            }
          },
          {
            "@type": "Question",
            "name": "Do Alberta Innovates grants require matching funds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Most programs require co-funding. For the Voucher program, Alberta Innovates covers up to 75% of costs, and the applicant must contribute the remaining 25% balance as cash."
            }
          },
          {
            "@type": "Question",
            "name": "Who is eligible for Alberta Innovates funding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Alberta-incorporated small and medium-sized enterprises (SMEs) with under 500 employees, operating for-profit, and having under $50 million in annual gross revenue."
            }
          },
          {
            "@type": "Question",
            "name": "Does the funding go directly to my business?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Under the Voucher and Micro-Voucher programs, the grant is paid directly to your contracted third-party service provider to cover their technical service fees."
            }
          },
          {
            "@type": "Question",
            "name": "Can I stack Alberta Innovates with federal programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can stack provincial funding with federal programs like IRAP or SR&ED, provided you do not claim the same expenditures twice and comply with federal stacking limits."
            }
          },
          {
            "@type": "Question",
            "name": "How long does the voucher approval process take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Intake is open year-round. Decisions typically take between 4 to 8 weeks after a completed proposal is submitted in the portal."
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
      <section className="bg-gradient-to-b from-indigo-955 via-indigo-900 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 mb-6 uppercase tracking-wider">
              Alberta Provincial Innovation Funding
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Alberta Innovates Grants: Scale Your Technology
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Accelerate your growth in Alberta. Access provincial vouchers up to $100,000, industry partner networks, and major federal programs. Read the definitive 2026 eligibility guide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#alberta-grants"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Compare Voucher Streams <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-indigo-400" /> Estimate Your Claim
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
              <span className="block text-3xl font-extrabold text-slate-900">Up to $100K</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Voucher Grant Limit</span>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $10K</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Micro-Voucher Limit</span>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">75% Funding</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Provincial Co-funding</span>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Direct Pay</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Paid to Service Providers</span>
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
                  Alberta's technology ecosystem is growing rapidly, supported by the provincial government's economic diversification initiatives. **Alberta Innovates** is the primary driver of this innovation, providing non-dilutive capital, expert business networks, and research facilities to help entrepreneurs turn ideas into commercial products.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  For tech startups located in Calgary, Edmonton, or Lethbridge, Alberta Innovates' Voucher and Micro-Voucher programs provide critical seed capital. This guide outlines these voucher streams, defines the eligibility criteria, and details the application workflow.
                </p>
              </section>

              {/* Programs */}
              <section id="alberta-grants" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Alberta Innovates Voucher Streams</h2>
                
                <div className="space-y-6">
                  {/* Micro-Voucher */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Micro-Voucher Program</h3>
                      <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold shrink-0">Up to $10,000</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Designed to support early-stage business validation and market research. Funding is used to contract registered service providers to perform market opportunity studies, regulatory path analyses, or basic feasibility testing.
                    </p>
                  </div>

                  {/* Voucher */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Voucher Program</h3>
                      <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold shrink-0">Up to $100,000</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Supports advanced technology development, prototype fabrication, custom engineering, and validation testing. The program covers 75% of eligible project costs up to $100,000, with the applicant contributing the remaining 25% balance as cash.
                    </p>
                  </div>
                </div>
              </section>

              {/* How it works */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">The Voucher Payment Model: Direct to Provider</h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  It is critical to note that Alberta Innovates does not deposit grant cash directly into your company's bank account. Instead, they use a **Service Provider model**:
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    You identify and contract a qualified, third-party service provider (e.g. an engineering lab, software agency, or testing facility) to perform the project tasks. When you apply, the service provider is registered in the application. Once approved, the provider completes milestones and bills Alberta Innovates directly for reimbursement.
                  </p>
                </div>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is Alberta Innovates?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Alberta Innovates is a provincial crown corporation that provides funding, advisory networks, and technical resources to accelerate research, innovation, and entrepreneurship in Alberta.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the difference between an Alberta Innovates Voucher and Micro-Voucher?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Micro-Vouchers provide up to $10,000 to fund early-stage projects (e.g. feasibility or market studies). Voucher programs provide up to $100,000 to cover 75% of eligible project costs for advanced product development.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Do Alberta Innovates grants require matching funds?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. Most programs require co-funding. For the Voucher program, Alberta Innovates covers up to 75% of costs, and the applicant must contribute the remaining 25% balance as cash.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Who is eligible for Alberta Innovates funding?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Alberta-incorporated small and medium-sized enterprises (SMEs) with under 500 employees, operating for-profit, and having under $50 million in annual gross revenue.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Does the funding go directly to my business?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      No. Under the Voucher and Micro-Voucher programs, the grant is paid directly to your contracted third-party service provider to cover their technical service fees.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I stack Alberta Innovates with federal programs?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. You can stack provincial funding with federal programs like IRAP or SR&ED, provided you do not claim the same expenditures twice and comply with federal stacking limits.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long does the voucher approval process take?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Intake is open year-round. Decisions typically take between 4 to 8 weeks after a completed proposal is submitted in the portal.
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
                    <Link href="/topics/irap-funding-eligibility" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-350 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 text-sm inline-flex items-center gap-1">IRAP Eligibility <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Learn how to secure non-repayable wage subsidies for tech development.</p>
                    </Link>
                  </div>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-indigo-950 to-slate-950 text-white rounded-3xl p-6 border border-indigo-900 shadow-md">
                  <Calculator className="w-8 h-8 text-indigo-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your R&D Return</h3>
                  <p className="text-indigo-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of federal wage subsidies and provincial Alberta tax credits in minutes.
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
                  <Download className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Alberta Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including application worksheets, proposal checklists, and regional directory guidelines.
                  </p>
                  <Link
                    href="/download/alberta-business-grants-kit"
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
