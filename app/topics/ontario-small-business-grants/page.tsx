import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"
import { InlineGrantChecker } from "@/components/blog/InlineGrantChecker"

export const metadata: Metadata = {
  title: "Ontario Small Business Grants Directory 2026 | FSI Digital",
  description: "Explore provincial and federal government grants for Ontario small businesses. Read our expert guide to Starter Company Plus, EODF, OITC, and application deadlines.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/ontario-small-business-grants",
  },
  robots: { index: true, follow: true },
}

export default function OntarioGrantsEligibilityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/ontario-small-business-grants#webpage",
        "url": "https://www.fsidigital.ca/topics/ontario-small-business-grants",
        "name": "Ontario Small Business Grants Directory 2026",
        "description": "Explore provincial and federal government grants for Ontario small businesses.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Ontario Grants", "item": "https://www.fsidigital.ca/topics/ontario-small-business-grants" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/ontario-small-business-grants#howto",
        "name": "How to Apply for Ontario Small Business Grants",
        "description": "Step-by-step application walkthrough to locate regional enterprise centres and submit proposals for Ontario provincial grants.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Locate Your Local Small Business Enterprise Centre",
            "text": "Locate the nearest Small Business Enterprise Centre (SBEC) in Ontario. SBECs act as the local gateway and administrators for many provincial grants."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Identify the Best Program Fit",
            "text": "Consult with an SBEC advisor to select the program matching your business stage (e.g. Starter Company Plus for startups, Digital Main Street for digital tools, or SWODF for larger expansions)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Draft Business Plan and Pitch Deck",
            "text": "Participate in mandatory SBEC training sessions, draft a complete business plan, prepare 12-month financial projections, and build a pitch presentation."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Submit Proposal and Receive Funding",
            "text": "Submit your final package to the grant review panel. Upon approval, receive the initial grant tranche, verify milestone compliance, and receive the final balance."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/ontario-small-business-grants#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What grants are available for Ontario small businesses in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In 2026, Ontario businesses can access several provincial programs, including Starter Company Plus (up to $5,000), Summer Company (up to $3,000), the Eastern/Southwestern Ontario Development Funds, Digital Main Street, and tax incentives like the Ontario Innovation Tax Credit (OITC). They can also access federal grants like IRAP and SR&ED."
            }
          },
          {
            "@type": "Question",
            "name": "How do I apply for Ontario business grants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Application processes vary by program. Local programs like Starter Company Plus are administered through regional Small Business Enterprise Centres (SBECs). Larger provincial funds require submitting detailed project applications and financial projections directly to the Ontario Ministry of Economic Development."
            }
          },
          {
            "@type": "Question",
            "name": "Can I combine Ontario and federal grants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, grant stacking is permitted. You can combine Ontario provincial grants with federal programs like IRAP or SR&ED, provided you do not receive funding exceeding 100% of the project's actual cost, and you properly account for provincial funds on federal tax forms."
            }
          },
          {
            "@type": "Question",
            "name": "Are there grants for Toronto businesses specifically?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Toronto-based businesses can access municipal programs, local Digital Main Street grants, and local Enterprise Centre support in addition to all provincial and federal funding options."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Ontario Innovation Tax Credit (OITC)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The OITC is an 8% refundable corporate tax credit for small to medium-sized corporations performing qualifying scientific research and experimental development (SR&ED) in Ontario. It stacks directly on top of the federal 35% SR&ED credit."
            }
          },
          {
            "@type": "Question",
            "name": "Are there grants for women-owned businesses in Ontario?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Ontario women entrepreneurs can access specialized funding programs via the Federal Women Entrepreneurship Strategy (WES), Futurpreneur, and specialized loan/grant programs from BDC and local credit unions."
            }
          },
          {
            "@type": "Question",
            "name": "How long does Ontario grant approval take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Approval timelines depend on the program. Small grants like Starter Company Plus take 4 to 8 weeks. Larger capital funds like the Eastern/Southwestern Ontario Development Funds can take 3 to 6 months for a complete review."
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
      <section className="bg-gradient-to-b from-red-950 via-red-900 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-500/10 border border-red-400/20 text-red-300 mb-6 uppercase tracking-wider">
              Ontario Provincial & Federal Funding
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Ontario Small Business Grants Directory
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Accelerate your Ontario business. Access provincial starter grants, innovation tax credits, manufacturing expansion funds, and major federal programs. Read the complete 2026 directory to find and secure your capital.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#provincial-programs"
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-red-900/30 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Explore Active Programs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-red-400" /> Estimate Your Claim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $5,000</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Starter Company Plus</span>
            </div>
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">$25K–$1M</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">EODF / SWOF Matching</span>
            </div>
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">+8% Refund</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Ontario R&D Tax Credit</span>
            </div>
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">100+ Programs</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Available in Ontario</span>
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
                  Ontario boasts the largest provincial economy in Canada, and with that comes a wide array of government grants, tax credits, and non-dilutive financing options for business owners. Whether you are launching a main-street retail startup in Toronto, scaling an automotive manufacturing facility in Windsor, or coding software in Waterloo, there are active funding programs designed to offset your capital requirements.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  However, navigating the Ontario funding landscape can be challenging. Because programs are split across municipal Enterprise Centres, provincial ministries, and federal development agencies, many business owners apply to the wrong programs or miss crucial application windows. This guide outlines the major provincial programs, local starter grants, tax incentives, and federal programs available to Ontario businesses.
                </p>
              </section>

              <InlineGrantChecker />

              {/* Provincial Programs Section */}
              <section id="provincial-programs" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Top Provincial Grants in Ontario</h2>
                
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Starter Company Plus</h3>
                      <span className="px-2.5 py-1 rounded bg-red-50 text-red-700 text-xs font-bold shrink-0">Up to $5,000</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Administered through local Small Business Enterprise Centres (SBECs) across Ontario, this program provides training, mentorship, and a micro-grant of up to $5,000 for entrepreneurs starting, growing, or buying a small business. Applicants must complete a training program and submit a viable business plan.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Summer Company</h3>
                      <span className="px-2.5 py-1 rounded bg-red-50 text-red-700 text-xs font-bold shrink-0">Up to $3,000</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      A specialized provincial program for students aged 15 to 29 who want to start a business over the summer. It provides a grant of up to $3,000 along with business training and mentorship from local enterprise experts.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Eastern & Southwestern Ontario Development Funds</h3>
                      <span className="px-2.5 py-1 rounded bg-red-50 text-red-700 text-xs font-bold shrink-0">$25K–$1M</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      EODF and SWOF support business expansion, investment in new equipment, and job creation in Eastern and Southwestern Ontario. The programs cover up to 15% of eligible project costs. Projects must involve capital investment of at least $100,000 (for rural areas) or $500,000 (for urban areas) and create a minimum number of full-time jobs.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Ontario Digital Main Street</h3>
                      <span className="px-2.5 py-1 rounded bg-red-50 text-red-700 text-xs font-bold shrink-0">$2,500</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Designed to help traditional brick-and-mortar small businesses adopt digital technologies. The Digital Transformation Grant (DTG) provides a $2,500 micro-grant to fund website development, social media campaigns, SEO optimization, or digital inventory management.
                    </p>
                  </div>
                </div>
              </section>

              {/* R&D Tax Credits */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Ontario Innovation Tax Credits (OITC & ORDTC)</h2>
                <p className="text-slate-600 leading-relaxed">
                  In addition to direct cash grants, Ontario offers robust tax incentives that stack on top of the federal SR&ED program:
                </p>

                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-red-700 font-extrabold flex items-center justify-center shrink-0 border border-red-200">%</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Ontario Innovation Tax Credit (OITC)</h4>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        An **8% refundable corporate tax credit** for small to medium-sized corporations performing qualifying R&D in Ontario. The credit is calculated on the same expenditure base as the federal SR&ED program, allowing you to recover extra cash.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-red-700 font-extrabold flex items-center justify-center shrink-0 border border-red-200">%</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Ontario Research & Development Tax Credit (ORDTC)</h4>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        A **3.5% non-refundable credit** for corporations of any size performing eligible R&D work in Ontario. Unlike the OITC, it cannot be refunded as cash, but it can be carried forward to reduce provincial corporate tax in future fiscal years.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Federal Programs Section */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Federal Support Programs for Ontario Businesses</h2>
                <p className="text-slate-600 leading-relaxed">
                  Most Ontario businesses stack provincial support with major federal programs. These include:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>NRC IRAP:</strong> Provides wage subsidies of $50,000 to $500,000+ for commercializing innovative technologies.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>SR&ED:</strong> Up to a 35% refundable tax credit on R&D expenses. Stacks directly with the Ontario OITC for an effective rate of over 43%.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>CSBFP:</strong> Government-backed business loans of up to $1.15 million with an 85% government guarantee, available at all major Canadian banks.</span>
                  </li>
                </ul>
              </section>

              {/* Warnings / Common Mistakes */}
              <section className="bg-red-50/60 rounded-3xl p-8 border border-red-200/80 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-950">Filing Pitfalls: Sunsetted Ontario Programs</h2>
                </div>
                <p className="text-red-900/90 text-sm leading-relaxed">
                  Ontario regularly updates its funding portfolio. A common mistake is attempting to apply for programs that have expired. The Ontario Small Business Support Grant and many other COVID-era relief funds have officially sunset. Ensure you only dedicate resource hours to active, funded provincial programs listed in current registries.
                </p>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What grants are available for Ontario small businesses in 2026?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      In 2026, Ontario businesses can access several provincial programs, including Starter Company Plus (up to $5,000), Summer Company (up to $3,000), the Eastern/Southwestern Ontario Development Funds, Digital Main Street, and tax incentives like the Ontario Innovation Tax Credit (OITC). They can also access federal grants like IRAP and SR&ED.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How do I apply for Ontario business grants?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Application processes vary by program. Local programs like Starter Company Plus are administered through regional Small Business Enterprise Centres (SBECs). Larger provincial funds require submitting detailed project applications and financial projections directly to the Ontario Ministry of Economic Development.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I combine Ontario and federal grants?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, grant stacking is permitted. You can combine Ontario provincial grants with federal programs like IRAP or SR&ED, provided you do not receive funding exceeding 100% of the project's actual cost, and you properly account for provincial funds on federal tax forms.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Are there grants for Toronto businesses specifically?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. Toronto-based businesses can access municipal programs, local Digital Main Street grants, and local Enterprise Centre support in addition to all provincial and federal funding options.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the Ontario Innovation Tax Credit (OITC)?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The OITC is an 8% refundable corporate tax credit for small to medium-sized corporations performing qualifying scientific research and experimental development (SR&ED) in Ontario. It stacks directly on top of the federal 35% SR&ED credit.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Are there grants for women-owned businesses in Ontario?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. Ontario women entrepreneurs can access specialized funding programs via the Federal Women Entrepreneurship Strategy (WES), Futurpreneur, and specialized loan/grant programs from BDC and local credit unions.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long does Ontario grant approval take?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Approval timelines depend on the program. Small grants like Starter Company Plus take 4 to 8 weeks. Larger capital funds like the Eastern/Southwestern Ontario Development Funds can take 3 to 6 months for a complete review.
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
                  <Link href="/guides/apply-ontario-business-grants" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-red-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-red-700 text-sm inline-flex items-center gap-1">
                      Ontario Application Walkthrough <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Detailed, step-by-step guidance on drafting your business plan for regional Ontario SBEC programs.</p>
                  </Link>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-red-950 to-slate-950 text-white rounded-3xl p-6 border border-red-900 shadow-md">
                  <Calculator className="w-8 h-8 text-red-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Ontario Support</h3>
                  <p className="text-red-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of Ontario provincial tax credits and federal wage subsidies in minutes.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-red-600 hover:bg-red-500 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-red-600 mb-4" />
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
                  <Download className="w-8 h-8 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Ontario Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including documentation templates, application worksheets, and regional SBEC directories.
                  </p>
                  <Link
                    href="/download/ontario-business-grants-kit"
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
