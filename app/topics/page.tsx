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
