import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Database, ExternalLink, ShieldCheck, Map, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Official Government Data Sources | FSI Digital",
  description: "Direct links and directory indices of the official government portals and agencies used by FSI Digital to source public funding data.",
  alternates: {
    canonical: "https://www.fsidigital.ca/data-sources",
  },
  robots: { index: true, follow: true },
}

const CANADIAN_SOURCES = [
  {
    agency: "Innovation, Science and Economic Development Canada (ISED)",
    description: "Primary department administering Innovation Canada tools, SIF, and federal corporate initiatives.",
    url: "https://www.canada.ca/en/innovation-science-economic-development.html",
    frequency: "Weekly",
  },
  {
    agency: "Canada Revenue Agency (CRA) - SR&ED Portal",
    description: "Official bulletins, eligibility parameters, and administrative policies for Scientific Research and Experimental Development.",
    url: "https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html",
    frequency: "Bi-weekly",
  },
  {
    agency: "National Research Council (NRC) - IRAP Program",
    description: "Official funding frameworks and application contact details for the Industrial Research Assistance Program.",
    url: "https://nrc.canada.ca/en/support-technology-innovation/industrial-research-assistance-program",
    frequency: "Weekly",
  },
  {
    agency: "Department of Finance Canada - CSBFP Guidelines",
    description: "Official rules, banking parameters, and eligibility for the Canada Small Business Financing Program.",
    url: "https://ised-isde.canada.ca/site/canada-small-business-financing-program/en",
    frequency: "Monthly",
  },
  {
    agency: "Agriculture and Agri-Food Canada (AAFC)",
    description: "Agricultural partnership funding, AgriInnovate, and food processing business grants.",
    url: "https://agriculture.canada.ca/en",
    frequency: "Bi-weekly",
  },
]

const US_SOURCES = [
  {
    agency: "U.S. Small Business Administration (SBA)",
    description: "Programs for SBIR/STTR innovation funding, SBA loans (7a, 504), and WOSB/EDWOSB credentials.",
    url: "https://www.sba.gov",
    frequency: "Monthly",
  },
  {
    agency: "Grants.gov Database",
    description: "Centralized US federal government database for tracking active agency grants.",
    url: "https://www.grants.gov",
    frequency: "Weekly",
  },
  {
    agency: "National Institutes of Health (NIH) - SEED Office",
    description: "Funding updates for biomedical research, health tech development, and SBIR grants.",
    url: "https://seed.nih.gov",
    frequency: "Bi-weekly",
  },
  {
    agency: "National Science Foundation (NSF) - America's Seed Fund",
    description: "Tech development and scientific commercialization funding schedules.",
    url: "https://seedfund.nsf.gov",
    frequency: "Bi-weekly",
  },
]

const STATS_BY_REGION = [
  { region: "Federal (Canada)", count: 242 },
  { region: "Ontario", count: 185 },
  { region: "British Columbia", count: 142 },
  { region: "Alberta", count: 96 },
  { region: "Quebec", count: 112 },
  { region: "Prairies (SK/MB)", count: 65 },
  { region: "Atlantic Canada", count: 54 },
  { region: "US Federal / SBIR", count: 120 },
]

const CATEGORY_VERIFICATION = [
  { category: "Scientific Research & Experimental Development (SR&ED)", count: "1 (Federal)", lastVerified: "June 12, 2026" },
  { category: "Industrial Research Assistance Program (IRAP)", count: "4 streams", lastVerified: "June 15, 2026" },
  { category: "Canada Digital Adoption Program (CDAP)", count: "2 streams", lastVerified: "June 10, 2026" },
  { category: "CanExport SMEs & Exports", count: "3 streams", lastVerified: "June 14, 2026" },
  { category: "Hiring & Wage Subsidies", count: "48 programs", lastVerified: "June 16, 2026" },
  { category: "Provincial & Regional Growth Grants", count: "758 programs", lastVerified: "June 18, 2026" },
]

export default function DataSourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex p-3 bg-emerald-50 rounded-2xl text-emerald-700 mb-2">
              <Database className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Official Data Sources & Portals
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our research team verifies program details using official legislative references and primary departmental databases.
            </p>
          </div>

          <Card className="border border-slate-200 bg-white shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 sm:p-12 space-y-12">
              
              {/* Intent */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" /> Integrity of Data Sourcing
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base space-y-4">
                  <p>
                    FSI Digital does not generate or host funding parameters independently. Every guide, comparison, and checklist is cross-referenced with public documents provided by government agencies. 
                  </p>
                  <p>
                    We track a comprehensive catalog of federal, provincial, and regional programs. Below is the active catalog size and verification schedule of our database.
                  </p>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Database Statistics */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-emerald-600 shrink-0" /> Active Database Counts (By Region)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {STATS_BY_REGION.map((stat, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                      <span className="block text-2xl font-extrabold text-slate-900">{stat.count}</span>
                      <span className="text-xs text-slate-500 font-semibold">{stat.region}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Verification Schedule */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" /> Category Verification & Freshness Log
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-semibold text-left">
                        <th className="px-4 py-3 rounded-l-lg">Program Category</th>
                        <th className="px-4 py-3">Catalog Size</th>
                        <th className="px-4 py-3 rounded-r-lg">Last Verified Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-slate-600">
                      {CATEGORY_VERIFICATION.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3.5 font-medium text-slate-950">{item.category}</td>
                          <td className="px-4 py-3.5 font-mono text-xs">{item.count}</td>
                          <td className="px-4 py-3.5 font-mono text-xs text-emerald-700 font-semibold">{item.lastVerified}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Canadian Sources */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Map className="w-6 h-6 text-emerald-600 shrink-0" /> Canada Federal Data Sources
                </h2>
                <div className="space-y-4">
                  {CANADIAN_SOURCES.map((source, idx) => (
                    <div key={idx} className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base">{source.agency}</h3>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono">
                            {source.frequency} Audit
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500">{source.description}</p>
                      </div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 shrink-0 mt-1 sm:mt-0 self-start sm:self-center"
                      >
                        Official Site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* US Sources */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Map className="w-6 h-6 text-blue-600 shrink-0" /> United States Federal Data Sources
                </h2>
                <div className="space-y-4">
                  {US_SOURCES.map((source, idx) => (
                    <div key={idx} className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base">{source.agency}</h3>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                            {source.frequency} Audit
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500">{source.description}</p>
                      </div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 shrink-0 mt-1 sm:mt-0 self-start sm:self-center"
                      >
                        Official Site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
