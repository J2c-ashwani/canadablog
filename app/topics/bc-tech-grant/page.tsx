import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "BC Tech Grant Guide 2026 | FSI Digital",
  description: "Navigate technology grants and provincial funding in British Columbia. Read the 2026 guide to Innovate BC, BC Tech Co-op, and tax offsets.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/bc-tech-grant",
  },
  robots: { index: true, follow: true },
}

export default function BcTechGrantPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/bc-tech-grant#webpage",
        "url": "https://www.fsidigital.ca/topics/bc-tech-grant",
        "name": "BC Tech Grant Guide 2026",
        "description": "Navigate technology grants and provincial funding in British Columbia. Innovate BC, BC Tech Co-op, and tax offsets.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "BC Tech Grant", "item": "https://www.fsidigital.ca/topics/bc-tech-grant" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/bc-tech-grant#howto",
        "name": "How to Apply for BC Tech Grants",
        "description": "Step-by-step process to qualify and apply for tech grants in British Columbia.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select the Right Innovate BC Program",
            "text": "Identify active provincial programs (e.g. Ignite Program or BC Tech Co-op Grants) that match your technical project scope."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Confirm Partner/Academic Alignment",
            "text": "For matching programs like BC Ignite, secure a partnership with a BC-based academic institution or industry partner."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Secure Co-Funding Matching Balance",
            "text": "Confirm that your company possesses the matching capital (often 50% of the project budget) through cash or verified financing."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Submit Application to Innovate BC",
            "text": "Submit your completed forms, budgets, and project plans to the Innovate BC portal for evaluation."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/bc-tech-grant#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What grants are available for BC tech companies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BC tech companies can access several programs, including Innovate BC's Ignite Program (up to $300,000), BC Tech Co-op Grants (up to $10,000 for student hires), and federal programs like IRAP and SR&ED."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Innovate BC Ignite Program?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Ignite Program provides up to $300,000 in matching funding to support research and development of innovative technologies in natural resources, engineering, and applied sciences."
            }
          },
          {
            "@type": "Question",
            "name": "Do BC tech grants require matching funds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, almost all BC innovation grants require co-funding. Typically, the government will fund up to 50% of eligible costs, and your business must provide the remaining balance."
            }
          },
          {
            "@type": "Question",
            "name": "What is the BC Tech Co-op Grant?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The BC Tech Co-op Grant provides up to $10,000 (matching 50% of salary) to help small tech businesses hire post-secondary co-op students into technical roles."
            }
          },
          {
            "@type": "Question",
            "name": "Are there tax credits for BC tech startups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. BC offers the Scientific Research and Experimental Development (SR&ED) tax credit (10% provincial rate) and the Venture Capital Corporation (VCC) program, which provides a 30% tax credit to investors backing BC startups."
            }
          },
          {
            "@type": "Question",
            "name": "Can I combine BC provincial grants with federal programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, stacking is permitted. You can combine provincial programs (like Innovate BC Ignite) with federal programs (like IRAP or SR&ED) as long as you do not exceed 100% of actual expenditures."
            }
          },
          {
            "@type": "Question",
            "name": "How long does BC grant approval take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Processing times range from 4 to 6 weeks for co-op wage grants, to 3 to 5 months for larger R&D programs like Ignite."
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
      <section className="bg-gradient-to-b from-teal-950 via-teal-900 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-500/10 border border-teal-400/20 text-teal-300 mb-6 uppercase tracking-wider">
              British Columbia Tech & Innovation Funding
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              BC Tech Grants: Fuel Your Startup Runway
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Accelerate your innovation in British Columbia. Access provincial research grants, student wage subsidies, angel investor tax offsets, and major federal programs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#bc-grants"
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Compare BC Tech Programs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-teal-400" /> Estimate Your Claim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-teal-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $300K</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Innovate BC Ignite</span>
            </div>
            <div className="border-l-4 border-teal-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $10,000</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Tech Co-op Grants</span>
            </div>
            <div className="border-l-4 border-teal-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">30% Tax Credit</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">VCC Investor Incentives</span>
            </div>
            <div className="border-l-4 border-teal-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">10% BC rate</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Provincial SR&ED Top-Up</span>
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
                  British Columbia is home to one of the fastest-growing technology startup ecosystems in North America. To encourage local innovation, the provincial government, in partnership with crown agencies like **Innovate BC**, offers a variety of grants, wage matching, and investor tax incentives.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  For tech founders in Vancouver, Victoria, or Kelowna, these programs represent a vital source of non-dilutive capital. By stacking BC-specific funding with federal research credits like SR&ED and wage subsidies like IRAP, startup founders can expand their development teams and accelerate commercialization.
                </p>
              </section>

              {/* Core Programs */}
              <section id="bc-grants" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Top BC Provincial Tech Grants</h2>
                
                <div className="space-y-6">
                  {/* Ignite */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Innovate BC Ignite Program</h3>
                      <span className="px-2.5 py-1 rounded bg-teal-50 text-teal-700 text-xs font-bold shrink-0">Up to $300K</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Ignite provides funding to help commercialize innovative technologies in natural resources, applied sciences, and engineering. The project must feature a partnership between a BC academic researcher and an industry partner.
                    </p>
                  </div>

                  {/* Co-op */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">BC Tech Co-op Grant</h3>
                      <span className="px-2.5 py-1 rounded bg-teal-50 text-teal-700 text-xs font-bold shrink-0">Up to $10,000</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Administered by Innovate BC, this grant covers 50% of co-op student wages up to a maximum of $10,000 per term. It is designed to help small businesses with under 100 employees onboard technical talent.
                    </p>
                  </div>
                </div>
              </section>

              {/* VCC Program */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">The BC Venture Capital Corporation (VCC) Program</h2>
                <p className="text-slate-600 leading-relaxed">
                  While not a direct grant to the business, the **VCC program** is a powerful tool for tech startups looking to raise equity funding:
                </p>
                <div className="bg-teal-50/50 border border-teal-100 rounded-3xl p-6 md:p-8 space-y-4">
                  <p className="text-slate-700 leading-relaxed text-sm">
                    BC-incorporated startups can apply to become an Eligible Business Corporation (EBC) or raise capital through a VCC. Under this program, BC investors receive a **30% refundable tax credit** from the provincial government on their equity investment, significantly reducing investor risk and helping you secure angel backing.
                  </p>
                </div>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What grants are available for BC tech companies?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      BC tech companies can access several programs, including Innovate BC's Ignite Program (up to $300,000), BC Tech Co-op Grants (up to $10,000 for student hires), and federal programs like IRAP and SR&ED.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the Innovate BC Ignite Program?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The Ignite Program provides up to $300,000 in matching funding to support research and development of innovative technologies in natural resources, engineering, and applied sciences.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Do BC tech grants require matching funds?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, almost all BC innovation grants require co-funding. Typically, the government will fund up to 50% of eligible costs, and your business must provide the remaining balance.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the BC Tech Co-op Grant?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The BC Tech Co-op Grant provides up to $10,000 (matching 50% of salary) to help small tech businesses hire post-secondary co-op students into technical roles.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Are there tax credits for BC tech startups?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. BC offers the Scientific Research and Experimental Development (SR&ED) tax credit (10% provincial rate) and the Venture Capital Corporation (VCC) program, which provides a 30% tax credit to investors backing BC startups.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I combine BC provincial grants with federal programs?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, stacking is permitted. You can combine provincial programs (like Innovate BC Ignite) with federal programs (like IRAP or SR&ED) as long as you do not exceed 100% of actual expenditures.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long does BC grant approval take?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Processing times range from 4 to 6 weeks for co-op wage grants, to 3 to 5 months for larger R&D programs like Ignite.
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
                    <Link href="/topics/irap-funding-eligibility" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-350 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 text-sm inline-flex items-center gap-1">IRAP Funding Guide <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review active, matching federal wage subsidies for tech developers.</p>
                    </Link>
                    <Link href="/topics/startup-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-350 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-violet-700 text-sm inline-flex items-center gap-1">Startup Grants Canada <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review active non-dilutive programs for Canadian tech startups.</p>
                    </Link>
                  </div>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-teal-950 to-slate-950 text-white rounded-3xl p-6 border border-teal-900 shadow-md">
                  <Calculator className="w-8 h-8 text-teal-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate BC Tax Return</h3>
                  <p className="text-teal-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of federal wage subsidies and provincial BC tax credits in minutes.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-teal-600 mb-4" />
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
                  <Download className="w-8 h-8 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download BC Claims Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including application worksheets, proposal guidelines, and BC SBEC regional directories.
                  </p>
                  <Link
                    href="/download/british-columbia-grants-kit"
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
