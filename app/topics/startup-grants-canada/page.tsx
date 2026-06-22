import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Startup Grants Canada Guide 2026 | FSI Digital",
  description: "Discover active government grants, tax credits, and non-dilutive funding for Canadian startups. Read our expert 2026 stacking guide and program checklist.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/startup-grants-canada",
  },
  robots: { index: true, follow: true },
}

export default function StartupGrantsEligibilityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/startup-grants-canada#webpage",
        "url": "https://www.fsidigital.ca/topics/startup-grants-canada",
        "name": "Startup Grants Canada Guide 2026",
        "description": "Discover active government grants, tax credits, and non-dilutive funding for Canadian startups.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Startup Grants Canada", "item": "https://www.fsidigital.ca/topics/startup-grants-canada" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/startup-grants-canada#howto",
        "name": "How to Secure Startup Grants in Canada",
        "description": "Step-by-step roadmap to establish corporate eligibility, prepare project budgets, and secure non-dilutive startup grants.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Incorporate Your Business in Canada",
            "text": "Incorporate your company provincialy or federally. Having a Canadian Controlled Private Corporation (CCPC) status is required for the highest cash refund rates under programs like SR&ED."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Isolate Innovative R&D Projects",
            "text": "Define the technical scope of your software or hardware product, focusing on unresolved technical risks rather than routine development."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Build Relationships with Advisors",
            "text": "Contact local Industrial Technology Advisors (ITAs) to discuss IRAP eligibility and contact regional enterprise centres for startup vouchers."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Submit Proposals and Document Work",
            "text": "Submit project proposals before starting development (as grants are not retroactive) and maintain contemporaneous timesheets for tax credit filings."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/startup-grants-canada#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What government grants are available for Canadian startups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Canadian startups can access several non-dilutive programs, including NRC IRAP (up to $500,000+ for R&D wage subsidies), the SR&ED tax credit (up to 35% refundable), Futurpreneur (up to $60,000 in co-investment loans), the Canada Digital Adoption Program (CDAP, up to $15,000), and CanExport Innovation (up to $75,000 for IP export)."
            }
          },
          {
            "@type": "Question",
            "name": "Do I have to repay startup grants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "True government grants (like IRAP or CanExport) and tax credits (like SR&ED) are non-repayable. However, some startup programs like Futurpreneur or BDC financing are structured as low-interest loans or repayable contributions that must be repaid over time."
            }
          },
          {
            "@type": "Question",
            "name": "Can I get both IRAP and SR&ED?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can stack IRAP and SR&ED. You must deduct the amount of IRAP funding received from your eligible expenditures on your T661 tax schedule, as you cannot claim tax credits on project costs that have already been paid for by a federal grant."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best grant for a tech startup in Canada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For tech startups performing R&D, the combination of NRC IRAP (wage subsidies for developer salaries) and the SR&ED tax credit (cash refunds for remaining costs) is the gold standard of non-dilutive startup funding."
            }
          },
          {
            "@type": "Question",
            "name": "Are there grants for pre-revenue startups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Programs like SR&ED and IRAP focus on technological innovation and technical risk rather than revenue. Pre-revenue startups with strong technical teams can qualify for significant cash refunds and subsidies."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to receive startup funding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Timelines vary. IRAP grants typically take 4 to 8 weeks after proposal submission. SR&ED tax credits are processed 60 to 120 days after you file your corporate tax return. Futurpreneur loans generally take 4 to 6 weeks."
            }
          },
          {
            "@type": "Question",
            "name": "What is grant stacking and is it allowed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Grant stacking is the practice of combining multiple federal, provincial, or municipal funding programs for the same project. It is fully allowed in Canada, but the total government funding cannot exceed 100% of the project's actual cost, and assistance must be declared on tax returns."
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
              Non-Dilutive Capital & Startup Growth
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Startup Grants Canada: The 2026 Founder's Guide
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Build your startup without giving up equity. Canada offers some of the most generous government grants, wage subsidies, and tax credits for early-stage and tech companies. Learn how to stack programs, qualify pre-revenue, and fund your product.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#startup-funding-stack"
                className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-violet-900/30 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                View Startup Funding Stack <ArrowRight className="w-4 h-4" />
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
              <span className="block text-3xl font-extrabold text-slate-900">Non-Dilutive</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Keep 100% of Your Equity</span>
            </div>
            <div className="border-l-4 border-violet-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $500K+</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">NRC IRAP Wage Subsidies</span>
            </div>
            <div className="border-l-4 border-violet-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to 35%</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Refundable R&D Tax Credit</span>
            </div>
            <div className="border-l-4 border-violet-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Pre-Revenue</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Eligibility for Tech Projects</span>
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
                  For technology startups and early-stage growth companies in Canada, securing non-dilutive capital is a vital mechanism for extending runway. By leveraging government grants, wage subsidies, and tax credits, founders can hire developers, invest in equipment, and commercialize their intellectual property without giving up equity to venture capitalists or angel investors too early.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  Canada is recognized globally as an innovation funding hub, primarily due to programs like the Industrial Research Assistance Program (IRAP) and the Scientific Research and Experimental Development (SR&ED) tax incentive. When structured correctly, these programs form an integrated funding pipeline that offsets up to 75% of your product development payroll costs.
                </p>
              </section>

              {/* Startup Funding Stack */}
              <section id="startup-funding-stack" className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                  The Canadian Startup Funding Stack
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Successful founders do not rely on a single grant. They stack multiple programs across the business lifecycle:
                </p>

                <div className="space-y-6 mt-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-violet-50 text-violet-700 font-extrabold flex items-center justify-center shrink-0 border border-violet-200">1</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Pre-Seed / Early Stage: Futurpreneur</h3>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        For entrepreneurs aged 18 to 39, Futurpreneur Canada provides up to $20,000 in startup financing, with the option to leverage up to an additional $40,000 from the Business Development Bank of Canada (BDC) without requiring collateral. The program also matches founders with an experienced business mentor for two years.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-violet-50 text-violet-700 font-extrabold flex items-center justify-center shrink-0 border border-violet-200">2</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">R&D and Growth Phase: NRC IRAP</h3>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        As you hire your core technical team to build your product, NRC IRAP provides non-repayable grants to fund the salaries of developers, engineers, and researchers. Typical startup allocations range from $50,000 to $150,000, co-funding 50% to 80% of technical payroll.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-violet-50 text-violet-700 font-extrabold flex items-center justify-center shrink-0 border border-violet-200">3</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Tax Season: SR&ED Tax Credits</h3>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        At the end of your fiscal year, you claim the SR&ED tax credit. For Canadian Controlled Private Corporations (CCPCs), this returns **35% of eligible R&D expenditures** (salaries, contractor fees, and materials) as a cash refund. This cash injection is critical for extending startup runway.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Other Key Programs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Additional Non-Dilutive Programs</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <span className="font-extrabold text-violet-600 text-xs sm:text-sm uppercase block mb-1">International Expansion</span>
                    <h4 className="font-bold text-slate-950 text-base mb-2">CanExport Innovation</h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Offers up to **$75,000 in matching grants** (covering up to 75% of cost) to help Canadian startups register patents, establish partnership agreements, and commercialize technology in foreign markets.
                    </p>
                  </div>
                  
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <span className="font-extrabold text-violet-600 text-xs sm:text-sm uppercase block mb-1">Digital Transformation</span>
                    <h4 className="font-bold text-slate-950 text-base mb-2">Canada Digital Adoption Program</h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Provides grants of up to **$15,000** to fund digital transformation consulting and business tools. Also grants access to interest-free BDC loans of up to $100,000 to execute your technology adoption strategy.
                    </p>
                  </div>
                </div>
              </section>

              {/* Regional Development Agencies */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Regional Development Agencies (RDAs)</h2>
                <p className="text-slate-600 leading-relaxed">
                  Startups can also access repayable, interest-free contributions from regional federal agencies based on their physical location. These agencies focus on job creation, clean technology, scale-up, and economic diversification:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <CheckCircle className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span><strong>FedDev Ontario:</strong> Serves startups located in Southern Ontario.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <CheckCircle className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span><strong>PrairiesCan / PacifiCan:</strong> Focuses on startup ecosystems in Alberta, Saskatchewan, Manitoba, and British Columbia.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <CheckCircle className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span><strong>ACOA:</strong> Supports innovation and startup development in the Atlantic provinces (NS, NB, PEI, NL).</span>
                  </li>
                </ul>
              </section>

              {/* Common Mistakes */}
              <section className="bg-red-50/60 rounded-3xl p-8 border border-red-200/80 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-950">Common Startup Funding Mistakes</h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-white p-4 rounded-xl border border-red-100">
                    <span className="font-extrabold text-red-800 block mb-1">Ignoring Tax Credits for Grants:</span>
                    <p className="text-slate-600 leading-relaxed">
                      Many early-stage founders focus entirely on competitive grants and ignore tax credits like SR&ED. Because SR&ED is an entitlement program, it has a much higher approval rate and is often worth significantly more capital than typical wage grants.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-red-100">
                    <span className="font-extrabold text-red-800 block mb-1">Underestimating Application Timelines:</span>
                    <p className="text-slate-600 leading-relaxed">
                      Government funding takes time. Do not apply when you have only 2 weeks of cash runway. Start your application processes at least 3 to 6 months before you need the capital to clear screening, review, and signing steps.
                    </p>
                  </div>
                </div>
              </section>

              {/* Stacking Rules */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">The Mechanics of Grant Stacking</h2>
                <p className="text-slate-600 leading-relaxed">
                  While you can leverage multiple programs, you must obey the stacking limits. The total government funding (federal, provincial, and municipal combined) cannot exceed **100% of the actual project costs**. 
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Additionally, you must deduct any government assistance (like IRAP grants or provincial hiring subsidies) from your SR&ED pool. Correctly tracking this in your accounting platform ensures you stay eligible for future cash refunds and prevents audit failures.
                </p>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What government grants are available for Canadian startups?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Canadian startups can access several non-dilutive programs, including NRC IRAP (up to $500,000+ for R&D wage subsidies), the SR&ED tax credit (up to 35% refundable), Futurpreneur (up to $60,000 in co-investment loans), the Canada Digital Adoption Program (CDAP, up to $15,000), and CanExport Innovation (up to $75,000 for IP export).
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Do I have to repay startup grants?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      True government grants (like IRAP or CanExport) and tax credits (like SR&ED) are non-repayable. However, some startup programs like Futurpreneur or BDC financing are structured as low-interest loans or repayable contributions that must be repaid over time.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I get both IRAP and SR&ED?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, you can stack IRAP and SR&ED. You must deduct the amount of IRAP funding received from your eligible expenditures on your T661 tax schedule, as you cannot claim tax credits on project costs that have already been paid for by a federal grant.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the best grant for a tech startup in Canada?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      For tech startups performing R&D, the combination of NRC IRAP (wage subsidies for developer salaries) and the SR&ED tax credit (cash refunds for remaining costs) is the gold standard of non-dilutive startup funding.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Are there grants for pre-revenue startups?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. Programs like SR&ED and IRAP focus on technological innovation and technical risk rather than revenue. Pre-revenue startups with strong technical teams can qualify for significant cash refunds and subsidies.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How long does it take to receive startup funding?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Timelines vary. IRAP grants typically take 4 to 8 weeks after proposal submission. SR&ED tax credits are processed 60 to 120 days after you file your corporate tax return. Futurpreneur loans generally take 4 to 6 weeks.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is grant stacking and is it allowed?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Grant stacking is the practice of combining multiple federal, provincial, or municipal funding programs for the same project. It is fully allowed in Canada, but the total government funding cannot exceed 100% of the project's actual cost, and assistance must be declared on tax returns.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cross Links */}
              <div className="border-t border-slate-200 pt-8 mt-12">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">Related Funding Resources</span>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/topics/sred-tax-credit-eligibility" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 text-sm inline-flex items-center gap-1">
                      SR&ED Eligibility Guide <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Review the criteria for claiming Canada's largest scientific R&D tax refund program.</p>
                  </Link>
                  <Link href="/topics/irap-funding-eligibility" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 text-sm inline-flex items-center gap-1">
                      IRAP Eligibility Guide <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Learn how to secure non-repayable wage subsidies for tech development in Canada.</p>
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
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of IRAP wage subsidies and matching corporate tax returns in minutes.
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
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Startup Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including documentation templates, proposal templates, and ITA interview worksheets.
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
