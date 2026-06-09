import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, ArrowRight, ShieldCheck, Info } from "lucide-react"
import Link from "next/link"
import EEATBadge from "@/components/blog/EEATBadge"

export const metadata: Metadata = {
  title: "Interactive Canada Funding Map | FSI Digital",
  description: "Navigate municipal, provincial, and federal funding programs using our interactive SVG map of Canada. Click provinces to view local grant lists.",
  alternates: {
    canonical: "https://www.fsidigital.ca/funding-map",
  },
  robots: { index: true, follow: true },
}

const PROVINCE_STATS = [
  { slug: "on", name: "Ontario", grants: "150+ Programs", amount: "$350M+ Pool", path: "M 230,120 L 260,110 L 290,140 L 270,180 L 220,160 Z" },
  { slug: "qc", name: "Quebec", grants: "120+ Programs", amount: "$280M+ Pool", path: "M 290,140 L 330,100 L 360,130 L 310,180 Z" },
  { slug: "bc", name: "British Columbia", grants: "95+ Programs", amount: "$180M+ Pool", path: "M 80,80 L 120,70 L 115,130 L 70,120 Z" },
  { slug: "ab", name: "Alberta", grants: "80+ Programs", amount: "$150M+ Pool", path: "M 120,70 L 155,65 L 150,135 L 115,130 Z" },
  { slug: "sk", name: "Saskatchewan", grants: "45+ Programs", amount: "$75M+ Pool", path: "M 155,65 L 190,60 L 185,140 L 150,135 Z" },
  { slug: "mb", name: "Manitoba", grants: "40+ Programs", amount: "$65M+ Pool", path: "M 190,60 L 230,120 L 220,160 L 185,140 Z" },
  { slug: "ns", name: "Nova Scotia", grants: "30+ Programs", amount: "$40M+ Pool", path: "M 360,160 L 380,150 L 375,170 Z" },
  { slug: "nb", name: "New Brunswick", grants: "25+ Programs", amount: "$35M+ Pool", path: "M 340,150 L 360,145 L 355,160 Z" },
  { slug: "pe", name: "Prince Edward Island", grants: "15+ Programs", amount: "$15M+ Pool", path: "M 365,145 Q 370,140 375,145 Z" },
  { slug: "nl", name: "Newfoundland & Labrador", grants: "20+ Programs", amount: "$25M+ Pool", path: "M 330,80 L 370,60 L 360,100 Z" }
]

export default function FundingMapPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex p-3 bg-emerald-50 rounded-2xl text-emerald-700 mb-2">
              <Map className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Canada Funding Map
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select your operating province on the interactive map below to access matching regional sitemaps, municipal vouchers, and local development credits.
            </p>
          </div>

          {/* E-E-A-T Review Badge */}
          <div className="flex justify-center mb-10">
            <EEATBadge authorName="Ashwani Kumar" authorImage="/author-ashwani.jpg" date="2026-06-09" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Interactive SVG Map Card */}
            <Card className="lg:col-span-2 border border-slate-200 bg-white p-6 sm:p-8 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between min-h-[500px]">
              <div className="space-y-1 mb-6">
                <Badge className="bg-emerald-50 text-emerald-800 border-emerald-100 font-bold uppercase tracking-wider text-[10px]">
                  Interactive Interface
                </Badge>
                <h2 className="text-xl font-bold text-slate-900">Regional Funding Navigator</h2>
                <p className="text-xs text-slate-500">Hover and click on any province to view localized B2B grant details.</p>
              </div>

              {/* Stylized Vector Canada Map */}
              <div className="w-full max-w-lg mx-auto aspect-video relative bg-slate-50/50 rounded-2xl border border-slate-100 p-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 400 200"
                  className="w-full h-full text-slate-300 drop-shadow-sm select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="cursor-pointer">
                    {PROVINCE_STATS.map((prov) => (
                      <Link key={prov.slug} href={`/grants/${prov.slug}`} passHref>
                        <path
                          d={prov.path}
                          fill="currentColor"
                          className="text-slate-200 hover:text-emerald-500 hover:stroke-emerald-600 transition-all duration-300 stroke-white stroke-2 outline-none"
                        >
                          <title>{prov.name}</title>
                        </path>
                      </Link>
                    ))}
                  </g>
                  {/* Legend Labels */}
                  <text x="50" y="100" className="text-[9px] font-bold fill-slate-500 pointer-events-none">BC</text>
                  <text x="130" y="100" className="text-[9px] font-bold fill-slate-500 pointer-events-none">AB</text>
                  <text x="165" y="100" className="text-[9px] font-bold fill-slate-500 pointer-events-none">SK</text>
                  <text x="200" y="100" className="text-[9px] font-bold fill-slate-500 pointer-events-none">MB</text>
                  <text x="245" y="150" className="text-[9px] font-bold fill-slate-500 pointer-events-none">ON</text>
                  <text x="325" y="140" className="text-[9px] font-bold fill-slate-500 pointer-events-none">QC</text>
                  <text x="362" y="165" className="text-[7px] font-bold fill-slate-400 pointer-events-none">NS</text>
                </svg>
              </div>

              <div className="mt-6 p-4 border border-slate-100 rounded-xl bg-slate-50 flex items-start gap-2">
                <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Territorial funding programs (Yukon, NWT, Nunavut) are managed directly under federal development cost-shares. Click on national guides to evaluate territories allocations.
                </p>
              </div>
            </Card>

            {/* Province Stats Sidebar */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider text-slate-400">Province Summaries</h3>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {PROVINCE_STATS.map((prov) => (
                  <Card 
                    key={prov.slug} 
                    className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm transition-all duration-200 rounded-2xl overflow-hidden p-4 flex justify-between items-center"
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">{prov.name}</h4>
                      <div className="flex gap-2 text-xs text-slate-500">
                        <span>{prov.grants}</span>
                        <span>•</span>
                        <span className="font-mono text-emerald-700 font-semibold">{prov.amount}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/grants/${prov.slug}`}
                      className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 border border-slate-100 hover:border-emerald-200 transition-all"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
