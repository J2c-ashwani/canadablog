import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Database, ExternalLink, ShieldCheck, Map } from "lucide-react"

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
  },
  {
    agency: "Canada Revenue Agency (CRA) - SR&ED Portal",
    description: "Official bulletins, eligibility parameters, and administrative policies for Scientific Research and Experimental Development.",
    url: "https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html",
  },
  {
    agency: "National Research Council (NRC) - IRAP Program",
    description: "Official funding frameworks and application contact details for the Industrial Research Assistance Program.",
    url: "https://nrc.canada.ca/en/support-technology-innovation/industrial-research-assistance-program",
  },
  {
    agency: "Department of Finance Canada - CSBFP Guidelines",
    description: "Official rules, banking parameters, and eligibility for the Canada Small Business Financing Program.",
    url: "https://ised-isde.canada.ca/site/canada-small-business-financing-program/en",
  },
  {
    agency: "Agriculture and Agri-Food Canada (AAFC)",
    description: "Agricultural partnership funding, AgriInnovate, and food processing business grants.",
    url: "https://agriculture.canada.ca/en",
  },
]

const US_SOURCES = [
  {
    agency: "U.S. Small Business Administration (SBA)",
    description: "Programs for SBIR/STTR innovation funding, SBA loans (7a, 504), and WOSB/EDWOSB credentials.",
    url: "https://www.sba.gov",
  },
  {
    agency: "Grants.gov Database",
    description: "Centralized US federal government database for tracking active agency grants.",
    url: "https://www.grants.gov",
  },
  {
    agency: "National Institutes of Health (NIH) - SEED Office",
    description: "Funding updates for biomedical research, health tech development, and SBIR grants.",
    url: "https://seed.nih.gov",
  },
  {
    agency: "National Science Foundation (NSF) - America's Seed Fund",
    description: "Tech development and scientific commercialization funding schedules.",
    url: "https://seedfund.nsf.gov",
  },
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
            <CardContent className="p-8 sm:p-12 space-y-10">
              
              {/* Intent */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" /> Integrity of Data Sourcing
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base">
                  <p>
                    FSI Digital does not generate or host funding parameters independently. Every guide, comparison, and checklist is cross-referenced with public documents provided by government agencies. 
                  </p>
                  <p>
                    Below is the index of primary agency portals where users can submit official applications, verify active guidelines, and consult legislative updates.
                  </p>
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
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">{source.agency}</h3>
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
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">{source.agency}</h3>
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
