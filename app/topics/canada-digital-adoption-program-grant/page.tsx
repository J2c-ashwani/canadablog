import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Canada Digital Adoption Program (CDAP) Grant Guide 2026 | FSI Digital",
  description: "Learn how to qualify for the Canada Digital Adoption Program (CDAP). Read our expert guide to CDAP Grow Your Business Online and Boost Your Tech grants.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/canada-digital-adoption-program-grant",
  },
  robots: { index: true, follow: true },
}

export default function CdapGrantsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/canada-digital-adoption-program-grant#webpage",
        "url": "https://www.fsidigital.ca/topics/canada-digital-adoption-program-grant",
        "name": "Canada Digital Adoption Program (CDAP) Grant Guide 2026",
        "description": "Learn how to qualify for the Canada Digital Adoption Program (CDAP). Grow Your Business Online and Boost Your Business Tech.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "CDAP Grant", "item": "https://www.fsidigital.ca/topics/canada-digital-adoption-program-grant" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/canada-digital-adoption-program-grant#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the Canada Digital Adoption Program (CDAP)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Canada Digital Adoption Program (CDAP) is a federal government initiative designed to help Canadian small and medium-sized enterprises (SMEs) adopt digital technologies, increase their online presence, and optimize business processes."
            }
          },
          {
            "@type": "Question",
            "name": "What are the two funding streams under CDAP?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CDAP features two streams: 1) Grow Your Business Online (up to $2,400 micro-grants for small main-street businesses), and 2) Boost Your Business Technology (up to $15,000 grants for larger SMEs to hire a digital advisor, plus access to interest-free BDC loans)."
            }
          },
          {
            "@type": "Question",
            "name": "Who is eligible for the CDAP Boost Your Business Tech stream?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To qualify, your business must be incorporated in Canada (or a sole proprietor), have at least $500,000 in annual revenue (in one of the past three tax years), and have between 1 and 499 employees."
            }
          },
          {
            "@type": "Question",
            "name": "How do I apply for the $15,000 CDAP grant?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You apply online through the Innovation Canada portal. Once qualified, you match with a registered digital advisor to build a Digital Adoption Plan. Upon plan completion, you receive the grant to offset the advisor's costs."
            }
          },
          {
            "@type": "Question",
            "name": "How does the BDC interest-free loan under CDAP work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "After completing your Digital Adoption Plan, you qualify to apply for a 0% interest loan of up to $100,000 from the Business Development Bank of Canada (BDC), with a 5-year repayment term to help implement your plan."
            }
          },
          {
            "@type": "Question",
            "name": "What is the CDAP youth wage subsidy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CDAP offers a $7,300 wage subsidy to hire a Canadian student or recent graduate as a digital intern to help execute the milestones outlined in your digital adoption plan."
            }
          },
          {
            "@type": "Question",
            "name": "Is CDAP still open for applications in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, while funding allocations have evolved, CDAP program structures, BDC loan pipelines, and regional delivery matching remain active for qualified Canadian SMEs looking to digitize their operations."
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
      <section className="bg-gradient-to-b from-violet-950 via-violet-900 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-violet-500/10 border border-violet-400/20 text-violet-300 mb-6 uppercase tracking-wider">
              Federal Digital Transformation Funding
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Canada Digital Adoption Program (CDAP) Grant
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Accelerate your digital growth. Access up to $15,000 in advisor grants, 0% interest BDC loans up to $100,000, and youth wage subsidies to modernize your business technology infrastructure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#cdap-streams"
                className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-violet-900/30 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Compare CDAP Streams <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-violet-400" /> Estimate Your Claim
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
              <span className="block text-3xl font-extrabold text-slate-900">Up to $15,000</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Digital Advisor Grant</span>
            </div>
            <div className="border-l-4 border-violet-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">0% Interest</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">BDC Loan Up to $100K</span>
            </div>
            <div className="border-l-4 border-violet-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $7,300</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Youth Wage Subsidy</span>
            </div>
            <div className="border-l-4 border-violet-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Grow Online</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">$2,400 Main Street Grant</span>
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
                  The <strong>Canada Digital Adoption Program (CDAP)</strong> is a multi-billion dollar federal program designed to help Canadian small and medium-sized businesses close the digital gap. In a global marketplace, adopting modern digital tools—such as advanced ERP platforms, automated CRM databases, cloud infrastructure, and cybersecurity frameworks—is essential to increase productivity and remain competitive.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  CDAP is structured to support businesses at different stages of digital maturity. Whether you are a local retail storefront looking to launch your first e-commerce store, or an established manufacturing firm looking to deploy custom inventory planning tools, CDAP provides direct financial contributions, wage subsidies, and interest-free credit support to fund your goals.
                </p>
              </section>

              {/* CDAP Streams */}
              <section id="cdap-streams" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">The Two CDAP Program Streams</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Stream 1 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="font-extrabold text-violet-600 text-xs uppercase tracking-wider block">Stream 1</span>
                      <h3 className="font-bold text-slate-950 text-lg">Grow Your Business Online</h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        For smaller, local businesses looking to establish an online presence. It provides a non-repayable micro-grant of up to **$2,400** to fund website design, SEO setup, e-commerce integrations, or social media advertising. It also includes support from digital youth advisors.
                      </p>
                    </div>
                    <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                      <strong>Eligibility:</strong> For-profit, registered business, at least 1 employee OR $30K annual revenue.
                    </div>
                  </div>

                  {/* Stream 2 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="font-extrabold text-violet-600 text-xs uppercase tracking-wider block">Stream 2</span>
                      <h3 className="font-bold text-slate-950 text-lg">Boost Your Business Technology</h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        For larger SMEs looking to adopt complex enterprise software and digitize operations. It provides up to a **$15,000 grant** to fund 90% of the cost of hiring a certified digital advisor to build a Digital Adoption Plan. It also unlocks interest-free BDC loan applications.
                      </p>
                    </div>
                    <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                      <strong>Eligibility:</strong> $500K–$100M annual revenue in one of past 3 years, 1 to 499 employees.
                    </div>
                  </div>
                </div>
              </section>

              {/* BDC Loan pipeline */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">The CDAP BDC Interest-Free Loan Program</h2>
                <p className="text-slate-600 leading-relaxed">
                  The Boost Your Business Technology stream unlocks access to one of the most attractive credit programs in Canada: the **BDC 0% interest digital adoption loan**.
                </p>
                <div className="bg-violet-50/50 border border-violet-100 rounded-3xl p-6 md:p-8 space-y-4">
                  <p className="text-slate-700 leading-relaxed text-sm">
                    Once your digital advisor finishes and submits your formal Digital Adoption Plan, you receive a code to apply for an interest-free loan from BDC. 
                  </p>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-violet-600 shrink-0" />
                      <span><strong>Loan Amount:</strong> Up to $100,000 (determined by annual revenue: $25K-$50K for revenue under $5M; up to $100K for revenue above $5M).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-violet-600 shrink-0" />
                      <span><strong>Interest Rate:</strong> 0% fixed rate.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-violet-600 shrink-0" />
                      <span><strong>Repayment:</strong> 5-year term (60 months) with no prepayment penalties.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Warning/Common Mistakes */}
              <section className="bg-red-50/60 rounded-3xl p-8 border border-red-200/80 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-950">Common CDAP Application Pitfalls</h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-white p-4 rounded-xl border border-red-100">
                    <span className="font-extrabold text-red-800 block mb-1">Hiring Unregistered Digital Advisors:</span>
                    <p className="text-slate-600 leading-relaxed">
                      You cannot claim the $15,000 grant to pay any general IT consultant. The government will only reimburse costs for plans built by pre-approved, certified Digital Advisors registered in the official CDAP marketplace.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-red-100">
                    <span className="font-extrabold text-red-800 block mb-1">Assuming Automatic BDC Loan Approval:</span>
                    <p className="text-slate-600 leading-relaxed">
                      Qualifying for CDAP and writing your digital adoption plan does not guarantee the BDC loan. BDC still performs standard credit underwriting checks. Your business must prove adequate cash flows to service the loan principal.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the Canada Digital Adoption Program (CDAP)?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The Canada Digital Adoption Program (CDAP) is a federal government initiative designed to help Canadian small and medium-sized enterprises (SMEs) adopt digital technologies, increase their online presence, and optimize business processes.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What are the two funding streams under CDAP?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      CDAP features two streams: 1) Grow Your Business Online (up to $2,400 micro-grants for small main-street businesses), and 2) Boost Your Business Technology (up to $15,000 grants for larger SMEs to hire a digital advisor, plus access to interest-free BDC loans).
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Who is eligible for the CDAP Boost Your Business Tech stream?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      To qualify, your business must be incorporated in Canada (or a sole proprietor), have at least $500,000 in annual revenue (in one of the past three tax years), and have between 1 and 499 employees.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How do I apply for the $15,000 CDAP grant?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      You apply online through the Innovation Canada portal. Once qualified, you match with a registered digital advisor to build a Digital Adoption Plan. Upon plan completion, you receive the grant to offset the advisor's costs.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How does the BDC interest-free loan under CDAP work?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      After completing your Digital Adoption Plan, you qualify to apply for a 0% interest loan of up to $100,000 from the Business Development Bank of Canada (BDC), with a 5-year repayment term to help implement your plan.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the CDAP youth wage subsidy?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      CDAP offers a $7,300 wage subsidy to hire a Canadian student or recent graduate as a digital intern to help execute the milestones outlined in your digital adoption plan.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Is CDAP still open for applications in 2026?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, while funding allocations have evolved, CDAP program structures, BDC loan pipelines, and regional delivery matching remain active for qualified Canadian SMEs looking to digitize their operations.
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
                  <Link href="/topics/government-loans-small-business-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-amber-700 text-sm inline-flex items-center gap-1">
                      Government Loans Guide <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Learn how to stack CSBFP and BDC credit lines to fund your business adoption roadmap.</p>
                  </Link>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-violet-950 to-slate-950 text-white rounded-3xl p-6 border border-violet-900 shadow-md">
                  <Calculator className="w-8 h-8 text-violet-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Grant Size</h3>
                  <p className="text-violet-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of federal wage subsidies and matching tax returns in minutes.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-violet-600 mb-4" />
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
                  <Download className="w-8 h-8 text-violet-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Claims Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including documentation templates, advisor interview worksheets, and BDC loan templates.
                  </p>
                  <Link
                    href="/download/irap-application-kit"
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
