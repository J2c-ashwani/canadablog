"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, BookOpen, Award, CheckCircle, Linkedin, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

const REVIEWED_GUIDES = [
  { title: "IRAP Application & Stacking Guide", href: "/guides/irap-innovation-application-guide", type: "Pillar Guide" },
  { title: "SR&ED Scientific Research & Development Guide", href: "/guides/sred-application-guide", type: "Tax Credit Guide" },
  { title: "Canada Small Business Financing Program Guide", href: "/guides/apply-csbfp-loans", type: "Loan Guide" },
  { title: "Toronto Business Grants & Stacking Playbooks", href: "/grants/on/toronto/restaurants-hospitality", type: "pSEO Guide" },
  { title: "New York Technology Grants & Subsidies", href: "/usa/new-york", type: "Regional Hub" },
  { title: "California Cleantech & Energy Incentives", href: "/usa/california", type: "Regional Hub" },
]

export default function AuthorClient() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      {/* JSON-LD Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ashwani Kumar",
            "jobTitle": "Founder & Managing Director",
            "worksFor": {
              "@type": "Organization",
              "name": "FSI Digital",
              "url": "https://www.fsidigital.ca"
            },
            "url": "https://www.fsidigital.ca/authors/ashwani-kumar",
            "description": "Founder & Managing Director of FSI Digital, leading funding database research and program eligibility analysis across North America.",
            "sameAs": [
              "https://www.linkedin.com/in/ashwanikumar"
            ]
          })
        }}
      />

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Profile Card */}
          <Card className="border border-slate-200 bg-white shadow-xl rounded-3xl overflow-hidden mb-10">
            <div className="bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative z-10">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-600 border-4 border-white/20 flex items-center justify-center text-4xl font-black text-white shadow-md select-none shrink-0">
                  AK
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <Badge className="bg-emerald-600 hover:bg-emerald-600 border-none font-bold text-xs uppercase px-2.5 py-1">
                    Editorial Reviewer
                  </Badge>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ashwani Kumar</h1>
                  <p className="text-slate-300 font-semibold text-sm sm:text-base">
                    Founder & Managing Director <span className="text-emerald-400 font-black">·</span> Funding Research Lead
                  </p>
                  
                  <div className="flex justify-center sm:justify-start gap-4 pt-2 text-slate-300">
                    <a href="https://www.linkedin.com/in/ashwanikumar" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:support@fsidigital.ca" className="hover:text-emerald-400 transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-8 sm:p-12 space-y-8">
              {/* Bio */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" /> Professional Background
                </h2>
                <div className="prose text-slate-600 leading-relaxed max-w-none text-base">
                  <p>
                    Ashwani Kumar is the Founder and Managing Director of FSI Digital. He directs the strategic development, database indexing, 
                    and programmatic research of public funding opportunities across Canada and the United States. 
                  </p>
                  <p>
                    With a focus on transparent funding intelligence, Ashwani oversees the tracking of over $2.5 billion in active grants, 
                    tax credits (such as SR&ED and cleantech programs), and loan incentives. His team catalogs program lifecycles, eligibility rules, 
                    and application compliance to help growing businesses navigate complex public funding landscapes.
                  </p>
                </div>
              </div>

              {/* Research Methodology */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" /> Research & Review Standards
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-slate-800 text-sm">Arm's Length Analysis</p>
                      <p className="text-xs text-slate-500">Every program is reviewed objectively using primary legislative and departmental documentation.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-slate-800 text-sm">CRA & SBA Compliance</p>
                      <p className="text-xs text-slate-500">Audit pitfalls and common filing errors are indexed to protect businesses from rejections.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviewed Guides */}
              <div className="space-y-4 pt-2">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" /> Reviewed Content & Pillar Guides
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Ashwani oversees and reviews the program parameters, limits, and application playbooks for these core funding channels:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {REVIEWED_GUIDES.map((guide, idx) => (
                    <Card key={idx} className="border border-slate-100 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden flex flex-col justify-between">
                      <CardHeader className="p-5 pb-2">
                        <Badge variant="outline" className="text-emerald-700 bg-emerald-50/50 border-emerald-100 max-w-fit font-semibold text-[10px] uppercase">
                          {guide.type}
                        </Badge>
                        <CardTitle className="text-sm font-bold text-slate-900 mt-2 hover:text-emerald-700 transition-colors">
                          <Link href={guide.href}>{guide.title}</Link>
                        </CardTitle>
                      </CardHeader>
                      <div className="p-5 pt-0 mt-auto">
                        <Link href={guide.href} className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800">
                          View details <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </Card>
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
