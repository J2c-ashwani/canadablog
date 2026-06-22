import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ArrowRight, BookOpen, Calculator, Sparkles, Download, FileText, Globe, Users, Zap, Leaf, Cpu } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grant Application Guides | Step-by-Step Funding Guides for Canada & USA",
  description:
    "Browse 39 expert grant application guides for Canadian and US government funding programs. IRAP, SR&ED, CSBFP, SBA, SBIR, women entrepreneur grants, and more.",
  keywords:
    "grant application guide, how to apply for grants, IRAP application guide, SR&ED guide, CSBFP guide, SBA grant guide, SBIR application, women entrepreneur grants, government grant application Canada USA",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides",
  },
  openGraph: {
    title: "Grant Application Guides | Step-by-Step Funding Guides for Canada & USA",
    description: "39 expert step-by-step guides for Canadian and US government funding programs.",
    url: "https://www.fsidigital.ca/guides",
  },
}

const GUIDE_CATEGORIES = [
  {
    label: "🇨🇦 Canada — Federal Programs",
    icon: Globe,
    color: "red",
    guides: [
      { slug: "apply-irap-grants", title: "How to Apply for IRAP Grants" },
      { slug: "apply-irap-government-grants", title: "IRAP Government Grant Application" },
      { slug: "irap-innovation-application-guide", title: "IRAP Innovation Application Guide" },
      { slug: "apply-strategic-innovation-fund", title: "Strategic Innovation Fund Application" },
      { slug: "apply-csbfp-government-financing", title: "CSBFP Government Financing Guide" },
      { slug: "apply-csbfp-loans", title: "CSBFP Loan Application Process" },
      { slug: "nserc-research-grants-guide", title: "NSERC Research Grants Guide" },
      { slug: "sred-application-guide", title: "SR&ED Tax Credit Application Guide" },
      { slug: "apply-regional-development-agencies", title: "Regional Development Agencies Guide" },
      { slug: "apply-agriculture-agri-food-canada", title: "Agriculture & Agri-Food Canada Guide" },
      { slug: "apply-indigenous-rural-business-funding", title: "Indigenous & Rural Business Funding" },
    ],
  },
  {
    label: "🇨🇦 Canada — Sector & Industry",
    icon: Cpu,
    color: "blue",
    guides: [
      { slug: "canada-digital-ai-funding-guide", title: "Canada Digital & AI Funding Guide" },
      { slug: "canada-cleantech-funding-guide", title: "Canada Cleantech Funding Guide" },
      { slug: "canada-manufacturing-funding-guide", title: "Canada Manufacturing Funding Guide" },
      { slug: "canada-life-sciences-funding-guide", title: "Canada Life Sciences Funding Guide" },
      { slug: "canada-aerospace-defence-funding-guide", title: "Canada Aerospace & Defence Funding" },
      { slug: "canada-agri-food-funding-guide", title: "Canada Agri-Food Funding Guide" },
    ],
  },
  {
    label: "🇨🇦 Canada — Province-Specific",
    icon: Leaf,
    color: "green",
    guides: [
      { slug: "apply-ontario-business-grants", title: "How to Apply for Ontario Business Grants" },
      { slug: "apply-alberta-business-grants", title: "How to Apply for Alberta Business Grants" },
      { slug: "apply-british-columbia-grants", title: "How to Apply for BC Business Grants" },
      { slug: "apply-quebec-business-grants", title: "How to Apply for Quebec Business Grants" },
    ],
  },
  {
    label: "👩‍💼 Women Entrepreneurs",
    icon: Users,
    color: "purple",
    guides: [
      { slug: "apply-women-entrepreneurship-strategy", title: "Women Entrepreneurship Strategy (WES)" },
      { slug: "women-entrepreneurship-fund-guide", title: "Women Entrepreneurship Fund Guide" },
      { slug: "women-entrepreneurship-loan-fund-guide", title: "Women Entrepreneurship Loan Fund" },
      { slug: "edc-women-trade-export-financing-guide", title: "EDC Women Trade & Export Financing" },
      { slug: "bdc-women-entrepreneurs-financing-guide", title: "BDC Women Entrepreneurs Financing" },
    ],
  },
  {
    label: "🇺🇸 USA — Federal Programs",
    icon: Zap,
    color: "orange",
    guides: [
      { slug: "apply-federal-grants", title: "How to Apply for USA Federal Grants" },
      { slug: "apply-sba-loans", title: "SBA Loan Application Guide" },
      { slug: "sba-application-process", title: "SBA Grant Application Process" },
      { slug: "sba-growth-accelerator-fund-guide", title: "SBA Growth Accelerator Fund Guide" },
      { slug: "apply-sbir-grants", title: "How to Apply for SBIR Grants" },
      { slug: "sbir-research-grants-guide", title: "SBIR Research Grants Guide" },
      { slug: "apply-doe-clean-energy-grants", title: "DOE Clean Energy Grants Guide" },
      { slug: "california-loan-guarantee-guide", title: "California Loan Guarantee Guide" },
    ],
  },
  {
    label: "🇺🇸 USA — Minority & Other",
    icon: FileText,
    color: "teal",
    guides: [
      { slug: "apply-minority-grants", title: "How to Apply for Minority Business Grants" },
      { slug: "apply-small-business-grants", title: "How to Apply for Small Business Grants" },
      { slug: "apply-youth-entrepreneurship-funding", title: "Youth Entrepreneurship Funding Guide" },
      { slug: "federal-grants-application-tips", title: "Federal Grant Application Tips & Tricks" },
    ],
  },
]

const COLOR_MAP: Record<string, { badge: string; dot: string; hover: string }> = {
  red:    { badge: "bg-red-50 text-red-700 border-red-200",    dot: "bg-red-500",    hover: "hover:border-red-300" },
  blue:   { badge: "bg-blue-50 text-blue-700 border-blue-200",   dot: "bg-blue-500",   hover: "hover:border-blue-300" },
  green:  { badge: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-500",  hover: "hover:border-green-300" },
  purple: { badge: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-500", hover: "hover:border-purple-300" },
  orange: { badge: "bg-orange-50 text-orange-700 border-orange-200", dot: "bg-orange-500", hover: "hover:border-orange-300" },
  teal:   { badge: "bg-teal-50 text-teal-700 border-teal-200",   dot: "bg-teal-500",   hover: "hover:border-teal-300" },
}

export default function GuidesPage() {
  const totalGuides = GUIDE_CATEGORIES.reduce((sum, c) => sum + c.guides.length, 0)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Grant Application Guides",
    "description": "Expert step-by-step guides for Canadian and US government grant applications.",
    "url": "https://www.fsidigital.ca/guides",
    "numberOfItems": totalGuides,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
        { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://www.fsidigital.ca/guides" },
      ],
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              {totalGuides} Expert Guides — Canada & USA
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-5 tracking-tight leading-tight">
              Grant Application Guides
            </h1>
            <p className="text-lg md:text-xl mb-8 text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Step-by-step guides for every major government funding program in Canada and the USA. Written by grant specialists with 800+ program coverage.
            </p>

            {/* CTA Strip */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <Calculator className="w-4 h-4" />
                Check My Eligibility
              </Link>
              <Link
                href="/grant-finder"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <Sparkles className="w-4 h-4" />
                AI Grant Finder
              </Link>
              <Link
                href="/download"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Free Kits & Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Directory */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-14">
            {GUIDE_CATEGORIES.map((cat) => {
              const colors = COLOR_MAP[cat.color]
              return (
                <div key={cat.label}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                    <h2 className="text-xl font-extrabold text-slate-900">{cat.label}</h2>
                    <span className={`text-[11px] font-bold border px-2 py-0.5 rounded-full ${colors.badge}`}>
                      {cat.guides.length} guides
                    </span>
                  </div>

                  {/* Guide Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.guides.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        className={`group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl transition-all ${colors.hover} hover:shadow-sm`}
                      >
                        <span className={`w-2 h-2 rounded-full shrink-0 ${colors.dot} group-hover:scale-110 transition-transform`} />
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-950 leading-snug flex-1">
                          {guide.title}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 shrink-0 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-16 bg-slate-50 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">What To Do After Reading a Guide</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Check Eligibility</h3>
                <p className="text-sm text-slate-500 mb-4">Use our 6-step calculator to find out which programs match your business profile.</p>
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-1.5 text-indigo-600 font-bold text-sm hover:text-indigo-800"
                >
                  Use Calculator <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Find More Grants</h3>
                <p className="text-sm text-slate-500 mb-4">Our AI Grant Finder scans 800+ programs to surface your best-matched funding opportunities.</p>
                <Link
                  href="/grant-finder"
                  className="inline-flex items-center gap-1.5 text-purple-600 font-bold text-sm hover:text-purple-800"
                >
                  Try AI Finder <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Download Templates</h3>
                <p className="text-sm text-slate-500 mb-4">Get free application kits, checklists, and templates for IRAP, SR&ED, CSBFP, and 50+ more programs.</p>
                <Link
                  href="/download"
                  className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-sm hover:text-emerald-800"
                >
                  Download Free Kits <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
