import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Hiring & Wage Subsidies Canada Guide 2026 | FSI Digital",
  description: "Navigate Canadian wage subsidies and hiring grants. Explore the definitive 2026 directory to Mitacs, student co-ops, and youth hiring offsets.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/hiring-wage-subsidies-canada",
  },
  robots: { index: true, follow: true },
}

export default function HiringSubsidiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/hiring-wage-subsidies-canada#webpage",
        "url": "https://www.fsidigital.ca/topics/hiring-wage-subsidies-canada",
        "name": "Hiring & Wage Subsidies Canada Guide 2026",
        "description": "Navigate Canadian wage subsidies and hiring grants. Mitacs, student co-ops, and youth hiring offsets.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Hiring Subsidies", "item": "https://www.fsidigital.ca/topics/hiring-wage-subsidies-canada" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/hiring-wage-subsidies-canada#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a wage subsidy grant?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A wage subsidy is a government grant that covers a percentage of an employee's salary (typically between 50% and 75%) to encourage businesses to hire specific demographics, such as students, recent graduates, or unemployed individuals."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Youth Employment and Skills Strategy (YESS)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "YESS is a federal initiative that funds programs helping youth aged 15 to 30 gain work experience. It provides employers with funding to cover wage costs for hiring youth into full-time positions."
            }
          },
          {
            "@type": "Question",
            "name": "How does the Mitacs program work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mitacs partners academic institutions with businesses to fund research interns. Under Mitacs Accelerate, the program co-funds 50% of an intern's salary (typically providing a $7,500 grant matching a $7,500 business contribution for a $15,000 internship)."
            }
          },
          {
            "@type": "Question",
            "name": "Can I claim wage subsidies and SR&ED for the same employee?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, but you must deduct the amount of the wage subsidy from your eligible expenditures before calculating your SR&ED credit, as you cannot claim tax credits on salary portions already funded by a government grant."
            }
          },
          {
            "@type": "Question",
            "name": "What are student co-op tax credits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Provincial tax credits (like the Ontario Co-operative Education Tax Credit) provide businesses with a refundable tax offset of up to $3,000 per student internship to help cover hiring costs."
            }
          },
          {
            "@type": "Question",
            "name": "How do I apply for youth hiring grants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Applications are submitted through regional delivery partners (such as ICTC, ECO Canada, or BioTalent Canada) that administer federal funding pools for specific sectors like technology, environmental sciences, or biotechnology."
            }
          },
          {
            "@type": "Question",
            "name": "Are there wage subsidies for hiring experienced workers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Provincial training programs and Employment Insurance (EI) work integration benefits provide employers with wage subsidies to hire and retrain older or displaced workers."
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
              Employment Subsidies & Labor Grants
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Hiring & Wage Subsidies in Canada
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Grow your team affordably. Secure government wage subsidies, student co-op grants, and youth employment offsets covering up to 75% of employee salaries. Read the complete 2026 directory to fund your hiring.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#subsidies-directory"
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-amber-900/30 inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Explore Active Subsidies <ArrowRight className="w-4 h-4" />
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
              <span className="block text-3xl font-extrabold text-slate-900">50%–75%</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Salary Cost Coverage</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $7,500</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Student Co-op Grants</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Mitacs Accelerate</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Co-funded Internships</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Youth Hiring</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Federal YESS Offsets</span>
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
                  Payroll represents the single largest operating expense for most small businesses and technology startups. To encourage employment growth, the Canadian government offers robust **wage subsidies, co-op matching grants, and hiring incentives** that cover a substantial portion of a new hire's salary.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  By co-funding salaries (often covering 50% to 75% of direct wage costs), these programs allow companies to scale their engineering, sales, and administrative teams while maintaining a stable cash runway. This guide outlines the major national hiring subsidies, explains the stacking constraints, and details the application workflow.
                </p>
              </section>

              {/* Programs Directory */}
              <section id="subsidies-directory" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Top Hiring & Wage Subsidies</h2>
                
                <div className="space-y-6">
                  {/* Mitacs */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Mitacs Accelerate</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0">Up to $7,500 Match</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      A national program pairing academic research interns (grad students or postdocs) with local businesses. Under Mitacs Accelerate, the government matches your $7,500 contribution with an additional $7,500 to fund a 4-month, $15,000 internship.
                    </p>
                  </div>

                  {/* YESS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Youth Employment & Skills Strategy (YESS)</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0">Wage Funding</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Federal programs managed by Service Canada and delivery partners to fund wages for hiring youth aged 15 to 30. It co-funds salaries up to 75% to help recent graduates secure full-time, professional employment.
                    </p>
                  </div>

                  {/* Student Work Placement */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Student Work Placement Program (SWPP)</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0">Up to $7,500</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      SWPP matches post-secondary co-op students with employers. The program provides wage subsidies of up to 50% (up to $5,000) or up to 70% (up to $7,000) for hiring students from underrepresented groups (e.g. women in STEM, visible minorities, or first-year students).
                    </p>
                  </div>
                </div>
              </section>

              {/* Stacking Wage Subsidies with SR&ED */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">The Stacking Rules: Wage Subsidies vs. SR&ED</h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  A common question for technology startups is whether they can claim wage subsidies and the SR&ED tax credit for the same developer or engineer. The answer is **yes**, but you cannot double-claim the same dollar.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    Under CRA rules, wage subsidies (such as SWPP or IRAP salary funding) are classified as government assistance. You must subtract the exact amount of the subsidy from your eligible salary expenditure before calculating your SR&ED tax credit pool.
                  </p>
                  <div className="bg-white p-4 rounded-xl border border-slate-250 text-xs text-slate-600 leading-relaxed">
                    <strong>Example:</strong> If a developer's salary is $80,000, and you received a $30,000 wage subsidy, the remaining $50,000 is still eligible for the full SR&ED tax credit calculation.
                  </div>
                </div>
              </section>

              {/* Warning/Pitfalls */}
              <section className="bg-red-50/60 rounded-3xl p-8 border border-red-200/80 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-slate-950">Crucial Mistakes: Applying Post-Hire</h2>
                </div>
                <p className="text-red-900/90 text-sm leading-relaxed">
                  Almost all Canadian wage subsidies **require pre-approval before the candidate starts their first day of work**. If you sign an employment contract and onboard a new employee before submitting the grant application, they are permanently ineligible for funding. You must complete the application and clear initial screening steps prior to the candidate's employment start date.
                </p>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is a wage subsidy grant?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      A wage subsidy is a government grant that covers a percentage of an employee's salary (typically between 50% and 75%) to encourage businesses to hire specific demographics, such as students, recent graduates, or unemployed individuals.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the Youth Employment and Skills Strategy (YESS)?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      YESS is a federal initiative that funds programs helping youth gain work experience. It provides employers with funding to cover wage costs for hiring youth into full-time positions.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How does the Mitacs program work?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Mitacs partners academic institutions with businesses to fund research interns. Under Mitacs Accelerate, the program co-funds 50% of an intern's salary (typically providing a $7,500 grant matching a $7,500 business contribution for a $15,000 internship).
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I claim wage subsidies and SR&ED for the same employee?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes, but you must deduct the amount of the wage subsidy from your eligible expenditures before calculating your SR&ED credit, as you cannot claim tax credits on salary portions already funded by a government grant.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What are student co-op tax credits?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Provincial tax credits (like the Ontario Co-operative Education Tax Credit) provide businesses with a refundable tax offset of up to $3,000 per student internship to help cover hiring costs.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How do I apply for youth hiring grants?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Applications are submitted through regional delivery partners (such as ICTC, ECO Canada, or BioTalent Canada) that administer federal funding pools for specific sectors like technology, environmental sciences, or biotechnology.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Are there wage subsidies for hiring experienced workers?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. Provincial training programs and Employment Insurance (EI) work integration benefits provide employers with wage subsidies to hire and retrain older or displaced workers.
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
                <div className="bg-gradient-to-br from-amber-950 to-slate-950 text-white rounded-3xl p-6 border border-amber-900 shadow-md">
                  <Calculator className="w-8 h-8 text-amber-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Subsidies</h3>
                  <p className="text-amber-200 text-xs leading-relaxed mb-6">
                    Our free, interactive Canadian R&D calculator outputs real-time estimates of wage grants and matching tax returns based on hiring coordinates.
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
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Match 800+ Grants</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Connect with our proprietary AI Funding Finder. Match your business coordinates to active regional, provincial, and national hiring incentives.
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
                  <Download className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Hiring Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Complete package including application worksheets, student hiring templates, and wage matching spreadsheets.
                  </p>
                  <Link
                    href="/download/youth-entrepreneurship-kit"
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
