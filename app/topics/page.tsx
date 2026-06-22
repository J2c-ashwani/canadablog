import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, DollarSign, Percent, PiggyBank, Briefcase, Globe, Leaf, Compass } from "lucide-react"
import Link from "next/link"
import { getAllPrograms } from "@/lib/data/programs"

export const metadata: Metadata = {
  title: "Government Funding Topics Directory | FSI Digital",
  description: "Browse government funding programs by topic: small business grants, R&D tax credits, business loans, hiring subsidies, export grants, and clean tech incentives.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics",
  },
  robots: { index: true, follow: true },
}

export default function TopicsPage() {
  const programs = getAllPrograms()

  // Dynamic categorizations
  const categories = [
    {
      title: "Grants & Non-Repayable Funding",
      slug: "grants",
      description: "Direct cash contributions from federal, provincial, and state agencies that do not require equity dilution or repayment.",
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50",
      programs: programs.filter(p => p.fundingType === "Grant" || p.fundingType === "Hybrid").slice(0, 4)
    },
    {
      title: "Tax Credits & Refunds",
      slug: "tax-credits",
      description: "Direct tax refunds and offsets for qualified expenditures, including SR&ED, digital media, and research expenditures.",
      icon: Percent,
      color: "text-blue-600 bg-blue-50",
      programs: programs.filter(p => p.fundingType === "Tax Credit").slice(0, 4)
    },
    {
      title: "Loans & Credit Support",
      slug: "loans",
      description: "Government-backed low-interest loans, interest-free credit lines, and loan guarantees to leverage private financing.",
      icon: PiggyBank,
      color: "text-indigo-600 bg-indigo-50",
      programs: programs.filter(p => p.fundingType === "Loan" || p.fundingType === "Hybrid" || p.fundingType === "Loan Support").slice(0, 4)
    },
    {
      title: "Hiring & Wage Subsidies",
      slug: "hiring",
      description: "Off-setting payroll costs for onboarding new graduates, training current staff, and matching co-op internships.",
      icon: Briefcase,
      color: "text-amber-600 bg-amber-50",
      programs: programs.filter(p => 
        p.id.includes("hiring") || 
        p.id.includes("skills") || 
        p.id.includes("mitacs") || 
        p.id.includes("cred") ||
        p.description.toLowerCase().includes("wage") ||
        p.description.toLowerCase().includes("intern")
      ).slice(0, 4)
    },
    {
      title: "Export & International Expansion",
      slug: "export",
      description: "Financial matching for international travel, trade show placement, translation services, and foreign marketing campaigns.",
      icon: Globe,
      color: "text-purple-600 bg-purple-50",
      programs: programs.filter(p => 
        p.id.includes("canexport") || 
        p.id.includes("step") || 
        p.description.toLowerCase().includes("export") ||
        p.description.toLowerCase().includes("international")
      ).slice(0, 4)
    },
    {
      title: "Clean Tech & Sustainability",
      slug: "clean-tech",
      description: "Incentives, rebates, and grants for green energy installations, agricultural sustainability, and carbon reduction projects.",
      icon: Leaf,
      color: "text-teal-600 bg-teal-50",
      programs: programs.filter(p => 
        p.id.includes("clean") || 
        p.id.includes("reap") || 
        p.id.includes("sustainable") || 
        p.description.toLowerCase().includes("energy") || 
        p.description.toLowerCase().includes("sustainability")
      ).slice(0, 4)
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Hero Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex p-3 bg-emerald-50 rounded-2xl text-emerald-700 mb-2">
              <Compass className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Funding Topics Directory
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore specialized financing paths, tax credits, and grants organized by business purpose and structure.
            </p>
          </div>

          {/* Featured Commercial Topics */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">Most-Searched Topics</h2>
              <span className="text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">High Intent</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { slug: "sred-tax-credit-eligibility", label: "SR&ED Tax Credit Eligibility", desc: "Up to 35% refundable credit on R&D", color: "hover:border-blue-300", dot: "bg-blue-500" },
                { slug: "irap-funding-eligibility", label: "IRAP Funding Eligibility", desc: "$50K–$500K+ for Canadian SMEs", color: "hover:border-emerald-300", dot: "bg-emerald-500" },
                { slug: "ontario-small-business-grants", label: "Ontario Small Business Grants", desc: "Provincial & federal grants for Ontario", color: "hover:border-red-300", dot: "bg-red-500" },
                { slug: "startup-grants-canada", label: "Startup Grants Canada", desc: "Non-dilutive funding for early-stage companies", color: "hover:border-violet-300", dot: "bg-violet-500" },
                { slug: "government-loans-small-business-canada", label: "Government Loans for Small Business", desc: "CSBFP, BDC, EDC & more", color: "hover:border-amber-300", dot: "bg-amber-500" },
                { slug: "how-to-apply-government-grants-canada", label: "How to Apply for Government Grants", desc: "Step-by-step proposal and application guides", color: "hover:border-slate-300", dot: "bg-slate-500" },
                { slug: "federal-grants-small-business-canada", label: "Federal Small Business Grants", desc: "National non-dilutive programs for SMEs", color: "hover:border-rose-300", dot: "bg-rose-500" },
                { slug: "canada-digital-adoption-program-grant", label: "Canada Digital Adoption Program", desc: "Up to $15K grants + 0% interest BDC loans", color: "hover:border-indigo-300", dot: "bg-indigo-500" },
                { slug: "women-entrepreneur-grants-canada", label: "Women Entrepreneur Grants", desc: "WES matching funding and dedicated supports", color: "hover:border-pink-300", dot: "bg-pink-500" },
                { slug: "hiring-wage-subsidies-canada", label: "Hiring & Wage Subsidies", desc: "Offset student, intern, and tech developer wages", color: "hover:border-amber-300", dot: "bg-amber-600" },
                { slug: "government-grants-for-manufacturing-canada", label: "Manufacturing Grants Canada", desc: "SIF, SWOF, and plant automation offsets", color: "hover:border-slate-300", dot: "bg-slate-600" },
                { slug: "bc-tech-grant", label: "BC Tech Grants", desc: "Innovate BC, Ignite, and provincial tech funding", color: "hover:border-teal-300", dot: "bg-teal-500" },
                { slug: "alberta-innovates-grant", label: "Alberta Innovates Grants", desc: "Provincial vouchers, R&D credits, and startup capital", color: "hover:border-indigo-300", dot: "bg-indigo-650" },
                { slug: "quebec-small-business-grants", label: "Quebec Small Business Grants", desc: "Provincial capital offsets and hiring incentives", color: "hover:border-blue-400", dot: "bg-blue-600" },
                { slug: "export-grants-canada", label: "Export Grants Canada", desc: "CanExport SMEs & EDC trade financing", color: "hover:border-purple-300", dot: "bg-purple-500" },
                { slug: "clean-tech-grants-canada", label: "Clean Tech Grants Canada", desc: "ACT program, decarbonization, and green funds", color: "hover:border-emerald-400", dot: "bg-emerald-600" },
                { slug: "bdc-small-business-loans", label: "BDC Small Business Loans", desc: "Direct development capital and loans up to $100K", color: "hover:border-slate-400", dot: "bg-slate-700" },
                { slug: "csbfp-loans-canada", label: "CSBFP Loans Canada", desc: "Government-backed bank financing up to $1.15M", color: "hover:border-amber-400", dot: "bg-amber-500" },
                { slug: "futurpreneur-startup-funding", label: "Futurpreneur Startup Loans", desc: "Unsecured financing up to $60K for founders under 40", color: "hover:border-violet-400", dot: "bg-violet-600" },
                { slug: "minority-business-grants-canada", label: "Minority & Diverse Grants", desc: "Black, Indigenous, newcomer, and inclusive funding", color: "hover:border-slate-400", dot: "bg-slate-500" },
                { slug: "canada-summer-jobs-wage-subsidy", label: "Canada Summer Jobs Subsidy", desc: "Federal minimum wage offsets for hiring students & youth", color: "hover:border-amber-450", dot: "bg-amber-600" },
              ].map((t) => (
                <Link
                  key={t.slug}
                  href={`/topics/${t.slug}`}
                  className={`group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl transition-all ${t.color} hover:shadow-sm`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${t.dot} group-hover:scale-110 transition-transform`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-950 leading-snug">{t.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{t.desc}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, idx) => {
              const IconComponent = category.icon
              return (
                <Card key={idx} className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="p-6 pb-2 space-y-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${category.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 leading-snug">
                        {category.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    <hr className="border-slate-100 my-2" />

                    {/* Top Programs */}
                    <div className="px-6 py-2 space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Featured Guides</p>
                      {category.programs.length > 0 ? (
                        <ul className="space-y-2">
                          {category.programs.map((prog) => (
                            <li key={prog.id} className="text-xs sm:text-sm">
                              <Link 
                                href={`/programs/${prog.slug}`} 
                                className="text-slate-700 hover:text-emerald-700 font-medium inline-flex items-center gap-1 group"
                              >
                                <span className="underline decoration-slate-200 group-hover:decoration-emerald-500 transition-colors truncate max-w-[200px] sm:max-w-xs">{prog.name}</span>
                                <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No guides listed currently.</p>
                      )}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 pt-4">
                    <ButtonLink href={`/grants?type=${category.slug}`} className="w-full text-center py-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 text-xs font-bold text-slate-700 transition-all duration-200 block">
                      Explore All {category.title.split(" & ")[0]} Matches
                    </ButtonLink>
                  </div>
                </Card>
              )
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

// Custom internal utility since standard button might have minor hydration details in static routing
function ButtonLink({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}
