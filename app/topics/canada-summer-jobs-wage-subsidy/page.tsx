import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Canada Summer Jobs Wage Subsidy Guide 2026 | FSI Digital",
  description: "Learn how the Canada Summer Jobs program works for employers. Review wage subsidy rates, youth eligibility, and application timelines.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/canada-summer-jobs-wage-subsidy",
  },
  robots: { index: true, follow: true },
}

export default function CanadaSummerJobsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/canada-summer-jobs-wage-subsidy#webpage",
        "url": "https://www.fsidigital.ca/topics/canada-summer-jobs-wage-subsidy",
        "name": "Canada Summer Jobs Wage Subsidy Guide 2026 | FSI Digital",
        "description": "Learn how the Canada Summer Jobs program works for employers. Review wage subsidy rates, youth eligibility, and application timelines.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Canada Summer Jobs", "item": "https://www.fsidigital.ca/topics/canada-summer-jobs-wage-subsidy" }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.fsidigital.ca/topics/canada-summer-jobs-wage-subsidy#howto",
        "name": "How to Apply for Canada Summer Jobs Funding (Employers)",
        "description": "Step-by-step instructions for Canadian businesses and non-profits to apply for the CSJ wage subsidy.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Create GCOs Account",
            "text": "Register your business on the Grants and Contributions Online Services (GCOs) portal. This process requires verifying your CRA business coordinates and can take up to 2 weeks."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Draft Detailed Job Descriptions & Mentorship Plan",
            "text": "Write a clear job summary, outline the skills the youth will acquire, and detail a robust supervision and mentorship plan for the prospective hire."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Submit Application in Winter Window",
            "text": "Submit your job listings via GCOs during the annual application window, which typically runs from mid-December through January."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Hire Youth and Submit Claims",
            "text": "Upon receiving approval in the spring, recruit youth aged 15-30, run payroll, and submit your pay logs to Service Canada for reimbursement."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/canada-summer-jobs-wage-subsidy#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the Canada Summer Jobs (CSJ) program?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CSJ is a federal initiative under the Youth Employment and Skills Strategy. It provides wage subsidies to employers to help them hire youth aged 15 to 30. The program aims to help young people gain valuable work experience while supporting small businesses and non-profits."
            }
          },
          {
            "@type": "Question",
            "name": "How much wage subsidy does the CSJ cover?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For small businesses (under 50 employees) and public sector employers, CSJ covers up to 50% of the provincial or territorial minimum wage. For non-profit organizations, the subsidy covers up to 100% of the minimum wage, plus mandatory employment related costs (MERCs)."
            }
          },
          {
            "@type": "Question",
            "name": "What are the eligibility requirements for employers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eligible employers include Canadian small businesses with 50 or fewer full-time employees, non-profit organizations, and public sector employers. Large corporations and federal government departments are not eligible."
            }
          },
          {
            "@type": "Question",
            "name": "What are the age and status rules for the hired youth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The hired youth must be between 15 and 30 years of age at the start of employment, be a Canadian citizen, permanent resident, or have refugee status, and have a valid Social Insurance Number (SIN). Unlike in previous years, they do not need to be returning students."
            }
          },
          {
            "@type": "Question",
            "name": "When does the CSJ application period open?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The employer application period opens once a year, typically in mid-December, and runs through January. Placements occur during the summer months, starting as early as May and ending by late August or early September."
            }
          },
          {
            "@type": "Question",
            "name": "What is the required duration of the summer job?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jobs must be full-time (between 30 and 40 hours per week) and last for a duration of 6 to 16 consecutive weeks. The absolute minimum contract length is 6 weeks."
            }
          },
          {
            "@type": "Question",
            "name": "Can I pay a higher wage than the minimum wage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You are encouraged to pay competitive market wages. However, the government subsidy will only cover up to 50% (or 100% for non-profits) of the official provincial or territorial minimum wage. You must fund the remaining balance yourself."
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
      <section className="bg-gradient-to-b from-amber-950 via-slate-950 to-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-400/20 text-amber-300 mb-6 uppercase tracking-wider">
              Federal Wage Subsidies
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Canada Summer Jobs (CSJ) Wage Subsidy
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Offset your seasonal hiring costs. Discover how small businesses can secure up to a 50% wage subsidy (and non-profits up to 100%) to hire youth aged 15 to 30.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#csj-funding"
                className="bg-amber-700 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Explore Wage Subsidies <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-900/80 hover:bg-slate-900 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-amber-400" /> Estimate Wage Subsidy
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
              <span className="block text-3xl font-extrabold text-slate-900">50% to 100%</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Minimum Wage Offset</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">15–30 Years</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Youth Employee Age</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">6–16 Weeks</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Placement Duration</span>
            </div>
            <div className="border-l-4 border-amber-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Under 50 FTEs</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Eligible Business Size</span>
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
                  Hiring temporary seasonal staff is a critical way for small businesses to handle summer demand surges or execute project rollouts. However, onboarding new workers carries substantial training overhead and salary risks, particularly for early-stage companies and lean non-profit organizations.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  The federal **Canada Summer Jobs (CSJ)** program is structured to absorb these costs. By offering small businesses a **50% wage subsidy** on provincial/territorial minimum wage rates, and offering registered non-profits up to **100% coverage**, CSJ dramatically lowers the barrier to hiring youth aged 15 to 30. This program injects billions of dollars into seasonal employment annually.
                </p>
              </section>

              {/* Core Programs */}
              <section id="csj-funding" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-955 tracking-tight">Canada Summer Jobs Program Parameters</h2>
                
                <div className="space-y-6">
                  {/* Private Sector */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Small Business Subsidy Stream</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0">50% Minimum Wage</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      For-profit small businesses with 50 or fewer full-time employees are eligible for a 50% reimbursement of the local minimum wage. For example, if the provincial minimum wage is $17.00, the subsidy reimburses $8.50 per hour. Businesses must pay any wage amount above minimum wage, along with mandatory employment related costs (MERCs like CPP/EI).
                    </p>
                  </div>

                  {/* Non-Profit Sector */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-955 text-lg">Non-Profit & Charity Stream</h3>
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-xs font-bold shrink-0">100% Minimum Wage + MERCs</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      Registered charities and non-profit organizations receive up to 100% coverage of the local minimum wage. In addition, the government reimburses mandatory employment related costs (MERCs), making the placement practically cost-free for the organization.
                    </p>
                  </div>
                </div>
              </section>

              {/* Step-by-Step Guide */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">How to Apply for Canada Summer Jobs Funding</h2>
                <div className="relative border-l-2 border-amber-200 pl-6 ml-3 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-amber-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-955 text-base sm:text-lg">1. Set Up GCOs Credentials</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Register your company on the Grants and Contributions Online Services (GCOs) portal. You must upload your CRA business registry details. Because authentication takes up to two weeks, do this well before the application window closes.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-amber-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-955 text-base sm:text-lg">2. Submit Job Details in Winter</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Submit detailed job summaries, working hour logs, and training milestones during the annual application window (typically December to January). Focus your job descriptions on digital, scientific, or critical community services, which score higher in evaluations.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-amber-600 border-4 border-white shadow-sm"></div>
                    <h3 className="font-bold text-slate-955 text-base sm:text-lg">3. Recruit Youth and File Reimbursements</h3>
                    <p className="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                      Receive approvals in the spring. Recruit youth aged 15-30 who are Canadian citizens, permanent residents, or hold refugee status. Onboard them, process their pay via payroll, and file your monthly wage logs on GCOs for direct deposit reimbursement.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What is the Canada Summer Jobs (CSJ) program?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      CSJ is a federal initiative under the Youth Employment and Skills Strategy. It provides wage subsidies to employers to help them hire youth aged 15 to 30. The program aims to help young people gain valuable work experience while supporting small businesses and non-profits.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-955 mb-2">How much wage subsidy does the CSJ cover?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      For small businesses (under 50 employees) and public sector employers, CSJ covers up to 50% of the provincial or territorial minimum wage. For non-profit organizations, the subsidy covers up to 100% of the minimum wage, plus mandatory employment related costs (MERCs).
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What are the eligibility requirements for employers?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Eligible employers include Canadian small businesses with 50 or fewer full-time employees, non-profit organizations, and public sector employers. Large corporations and federal government departments are not eligible.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-955 mb-2">What are the age and status rules for the hired youth?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      The hired youth must be between 15 and 30 years of age at the start of employment, be a Canadian citizen, permanent resident, or have refugee status, and have a valid Social Insurance Number (SIN). Unlike in previous years, they do not need to be returning students.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">When does the CSJ application period open?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      The employer application period opens once a year, typically in mid-December, and runs through January. Placements occur during the summer months, starting as early as May and ending by late August or early September.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-955 mb-2">What is the required duration of the summer job?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Jobs must be full-time (between 30 and 40 hours per week) and last for a duration of 6 to 16 consecutive weeks. The absolute minimum contract length is 6 weeks.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Can I pay a higher wage than the minimum wage?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Yes. You are encouraged to pay competitive market wages. However, the government subsidy will only cover up to 50% (or 100% for non-profits) of the official provincial or territorial minimum wage. You must fund the remaining balance yourself.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Programs & Topics (Mesh) */}
              <div className="border-t border-slate-200 pt-8 mt-12 space-y-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Programs</span>
                  <div className="flex flex-wrap gap-2.5">
                    <Link href="/topics/hiring-wage-subsidies-canada" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">Hiring Subsidies Guide</Link>
                    <Link href="/programs/mitacs-accelerate" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">Mitacs Co-Funding</Link>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Topics</span>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link href="/topics/hiring-wage-subsidies-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-amber-700 text-sm inline-flex items-center gap-1">Hiring Wage Subsidies <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review student, graduate, and software developer salary offsets up to $15K.</p>
                    </Link>
                    <Link href="/topics/startup-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-amber-700 text-sm inline-flex items-center gap-1">Startup Grants Canada <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review non-dilutive federal and regional grants for early-stage companies.</p>
                    </Link>
                  </div>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-md">
                  <Calculator className="w-8 h-8 text-slate-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Hiring Refund</h3>
                  <p className="text-slate-200 text-xs leading-relaxed mb-6">
                    Our funding calculator helps you estimate the total wage subsidies and tax refunds available for hiring youth and developers.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-amber-700 hover:bg-amber-605 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Launch Funding Calculator
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-slate-650 mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Match 1,200+ grants</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Run our AI Funding Finder to connect your company coordinates with active provincial training grants and national wage subsidies.
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
                  <Download className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-1">Download Summer Jobs Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Download our comprehensive youth hiring and training grant prep package. Includes application worksheets and sample templates.
                  </p>
                  <Link
                    href="/download/youth-entrepreneurship-kit"
                    className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Download Summer Jobs Kit (PDF)
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
