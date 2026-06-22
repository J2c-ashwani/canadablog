import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Federal Small Business Grants Canada Guide 2026 | FSI Digital",
  description: "Navigate federal small business grants in Canada. Explore the definitive 2026 checklist of non-dilutive programs, eligibility rules, and stacking tips.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/federal-grants-small-business-canada",
  },
  robots: { index: true, follow: true },
}

export default function FederalGrantsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/federal-grants-small-business-canada#webpage",
        "url": "https://www.fsidigital.ca/topics/federal-grants-small-business-canada",
        "name": "Federal Small Business Grants Canada Guide 2026",
        "description": "Navigate federal small business grants in Canada. Non-dilutive programs, eligibility rules, and stacking tips.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Federal Grants", "item": "https://www.fsidigital.ca/topics/federal-grants-small-business-canada" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/federal-grants-small-business-canada#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a federal small business grant?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A federal small business grant is non-repayable financial support provided directly by the Canadian federal government to help qualified businesses fund projects that align with national objectives, such as technological innovation, clean energy development, and job creation."
            }
          },
          {
            "@type": "Question",
            "name": "What are the top federal grant programs in Canada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The top federal programs include NRC IRAP (R&D wage subsidies), CanExport (international expansion matching), the Canada Digital Adoption Program (CDAP, digital transformation), and tax credits like the SR&ED program."
            }
          },
          {
            "@type": "Question",
            "name": "Are federal grants taxable in Canada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, government grants are generally considered taxable income. They must be reported as government assistance on your corporate income tax return, which may also reduce the amount of tax credits you can claim on the same project."
            }
          },
          {
            "@type": "Question",
            "name": "Who is eligible for federal business funding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eligibility varies but typically requires your business to be incorporated in Canada, operate for-profit, have under 500 employees, and have the financial capability to fund the matching portion of the project."
            }
          },
          {
            "@type": "Question",
            "name": "Do I have to pay back federal grants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. True federal grants (non-repayable contributions) do not have to be paid back, provided you spend the funds on eligible expenses and meet project milestones. However, some federal programs are structured as interest-free repayable loans."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Innovation Canada portal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Innovation Canada portal is an official federal digital service that helps business owners locate matching government programs, services, and permits by entering basic business coordinates."
            }
          },
          {
            "@type": "Question",
            "name": "Can I stack multiple federal grants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can combine (stack) multiple federal and provincial programs. However, total government funding cannot exceed 100% of actual project expenditures, and grants must be declared on tax filings."
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
              National Non-Dilutive Capital
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Federal Small Business Grants in Canada
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Navigate the federal funding ecosystem. Learn about non-repayable grants, R&D tax incentives, and wage subsidies. Read our comprehensive 2026 directory to find and secure your capital.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#federal-directory"
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-red-900/30 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Compare Federal Programs <ArrowRight className="w-4 h-4" />
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
              <span className="block text-3xl font-extrabold text-slate-900">Up to $500K+</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">NRC IRAP Funding</span>
            </div>
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to 35%</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Refundable R&D Credit</span>
            </div>
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Non-dilutive</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Equity Retention</span>
            </div>
            <div className="border-l-4 border-red-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">150+ Programs</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Active Federal Channels</span>
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
                  The Canadian federal government is the primary source of non-dilutive business capital in the country. Through departments like Innovation, Science and Economic Development Canada (ISED), the National Research Council (NRC), and Global Affairs Canada, the government distributes billions in funding annually to strengthen the national economy, increase employment, and accelerate technology adoption.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  Unlike provincial programs that focus on local economic priorities, federal business grants are designed to support projects with national and global significance. This guide profiles the key federal programs, outlines the qualification boundaries, and explains how to secure these resources.
                </p>
              </section>

              {/* Core Federal Programs */}
              <section id="federal-directory" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Core Federal Funding Programs</h2>
                
                <div className="space-y-6">
                  {/* IRAP */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Industrial Research Assistance Program (IRAP)</h3>
                      <span className="px-2.5 py-1 rounded bg-red-50 text-red-700 text-xs font-bold shrink-0">Up to $500K+</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Administered by the National Research Council (NRC), IRAP is the gold standard for R&D wage subsidies. It covers 50% to 80% of internal developer and engineer salaries for projects involving technical uncertainty. It requires matching with an Industrial Technology Advisor (ITA).
                    </p>
                  </div>

                  {/* SR&ED */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Scientific Research & Experimental Development (SR&ED)</h3>
                      <span className="px-2.5 py-1 rounded bg-red-50 text-red-700 text-xs font-bold shrink-0">35% Refund</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Canada's largest R&D tax incentive. Canadian Controlled Private Corporations (CCPCs) can claim a 35% refundable tax credit on salaries, materials, and contracts related to R&D. It is an entitlement program, not a competitive grant.
                    </p>
                  </div>

                  {/* CanExport */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">CanExport SMEs</h3>
                      <span className="px-2.5 py-1 rounded bg-red-50 text-red-700 text-xs font-bold shrink-0">Up to $50K</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      CanExport provides up to $50,000 in matching funding (covering 50% of cost) to help Canadian companies export into new international markets. Eligible expenses include trade show fees, marketing translations, IP protection, and travel.
                    </p>
                  </div>

                  {/* CDAP */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Canada Digital Adoption Program (CDAP)</h3>
                      <span className="px-2.5 py-1 rounded bg-red-50 text-red-700 text-xs font-bold shrink-0">Up to $15K</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      CDAP helps traditional businesses adopt digital technologies. It provides micro-grants of up to $2,400 for basic digital enhancements (e.g. e-commerce sites) or up to $15,000 to cover digital transformation planning.
                    </p>
                  </div>
                </div>
              </section>

              {/* Eligibility Check */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Who Qualifies for Federal Grants?</h2>
                <p className="text-slate-600 leading-relaxed">
                  While every program has specific criteria, the following baseline corporate metrics are required for most federal support:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-5 border border-slate-200 rounded-xl">
                    <span className="font-extrabold text-red-700 text-xs block mb-1">Corporate Registration</span>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Must be a registered, incorporated for-profit business operating in Canada. Sole proprietorships and nonprofits are ineligible for most commercial grants.
                    </p>
                  </div>
                  <div className="bg-white p-5 border border-slate-200 rounded-xl">
                    <span className="font-extrabold text-red-700 text-xs block mb-1">Employee Size</span>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Must meet the SME threshold, typically defined as having fewer than 500 full-time equivalent employees on payroll.
                    </p>
                  </div>
                </div>
              </section>

              {/* Compliance & Audits */}
              <section className="bg-red-50/60 rounded-3xl p-8 border border-red-200/80 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-950">Federal Audit & Compliance Protection</h2>
                </div>
                <p className="text-red-900/90 text-sm leading-relaxed">
                  Receiving federal funds is a legal commitment. All federal contributions are subject to audits. To protect your funding, you must maintain transparent financial books, record detailed timesheets, and log project milestones. Do not mix grant funding with general operational budgets.
                </p>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is a federal small business grant?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      A federal small business grant is non-repayable financial support provided directly by the Canadian federal government to help qualified businesses fund projects that align with national objectives, such as technological innovation, clean energy development, and job creation.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What are the top federal grant programs in Canada?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The top federal programs include NRC IRAP (R&D wage subsidies), CanExport (international expansion matching), the Canada Digital Adoption Program (CDAP, digital transformation), and tax credits like the SR&ED program.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Are federal grants taxable in Canada?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, government grants are generally considered taxable income. They must be reported as government assistance on your corporate income tax return, which may also reduce the amount of tax credits you can claim on the same project.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Who is eligible for federal business funding?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Eligibility varies but typically requires your business to be incorporated in Canada, operate for-profit, have under 500 employees, and have the financial capability to fund the matching portion of the project.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Do I have to pay back federal grants?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      No. True federal grants (non-repayable contributions) do not have to be paid back, provided you spend the funds on eligible expenses and meet project milestones. However, some federal programs are structured as interest-free repayable loans.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the Innovation Canada portal?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The Innovation Canada portal is an official federal digital service that helps business owners locate matching government programs, services, and permits by entering basic business coordinates.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I stack multiple federal grants?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, you can combine (stack) multiple federal and provincial programs. However, total government funding cannot exceed 100% of actual project expenditures, and grants must be declared on tax filings.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cross Links */}
              <div className="border-t border-slate-200 pt-8 mt-12">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">Related Funding Resources</span>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/topics/how-to-apply-government-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                    <h4 className="font-bold text-slate-900 group-hover:text-slate-700 text-sm inline-flex items-center gap-1">
                      How to Apply Guide <ArrowRight className="w-3.5 h-3.5" />
                    </h4>
                    <p className="text-slate-500 text-xs mt-1">Review the step-by-step process of drafting a government-backed proposal from scratch.</p>
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
                <div className="bg-gradient-to-br from-red-950 to-slate-950 text-white rounded-3xl p-6 border border-red-900 shadow-md">
                  <Calculator className="w-8 h-8 text-red-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Federal Match</h3>
                  <p className="text-red-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of federal wage subsidies and matching tax returns in minutes.
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
                  <Download className="w-8 h-8 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Federal Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including application worksheets, program guidelines, and ITA consultation preparation checklists.
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
