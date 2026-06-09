import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Scale, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getComparisonBySlug, getAllComparisons } from "@/lib/data/comparisons"
import { getProgramBySlug } from "@/lib/data/programs"
import { FundingEstimator } from "@/components/seo/FundingEstimator"
import EEATBadge from "@/components/blog/EEATBadge"

type ComparePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllComparisons().map((comp) => ({
    slug: comp.slug,
  }))
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const comparison = getComparisonBySlug(resolvedParams.slug)

  if (!comparison) {
    return {
      title: "Comparison Guide Not Found | FSI Digital",
      robots: { index: false, follow: false },
    }
  }

  const canonical = `https://www.fsidigital.ca/compare/${comparison.slug}`

  return {
    title: `${comparison.title} (2026 Guide)`,
    description: comparison.description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${comparison.title} (2026 Guide)`,
      description: comparison.description,
      url: canonical,
      type: "article",
    },
  }
}

export default async function ComparisonPage({ params }: ComparePageProps) {
  const resolvedParams = await params;
  const comparison = getComparisonBySlug(resolvedParams.slug)

  if (!comparison) {
    notFound()
  }

  const program1 = getProgramBySlug(comparison.prog1Id)
  const program2 = getProgramBySlug(comparison.prog2Id)

  if (!program1 || !program2) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50/30">
      <Header />

      <main className="py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link href="/grants" className="hover:text-emerald-700 transition-colors">Grant Database</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 shrink-0 truncate max-w-[200px] sm:max-w-xs">{comparison.slug.toUpperCase().replace("-VS-", " vs. ")} Comparison</span>
          </nav>

          {/* Hero Banner Section */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-emerald-600/90 text-white hover:bg-emerald-600/90 border-none font-bold">
                  Side-by-Side Comparison
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20">
                  {program1.fundingType} vs {program2.fundingType}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
                {comparison.title}
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6">
                Understand the eligibility guidelines, funding caps, application timelines, and stacking playbooks for both options.
              </p>

              <div className="flex items-center">
                <EEATBadge authorName="Ashwani" authorImage="/author-ashwani.jpg" date="2026-06-09" />
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Comparison Details) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Introduction Overview Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden p-5 space-y-3">
                  <Badge variant="outline" className="text-emerald-700 bg-emerald-50/50 border-emerald-100 max-w-fit font-semibold text-[10px] uppercase">
                    Option A
                  </Badge>
                  <h3 className="font-extrabold text-slate-950 text-base">{program1.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed truncate-3-lines">{program1.description}</p>
                  <Link 
                    href={`/programs/${program1.slug}`} 
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2"
                  >
                    View Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>

                <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden p-5 space-y-3">
                  <Badge variant="outline" className="text-blue-700 bg-blue-50/50 border-blue-100 max-w-fit font-semibold text-[10px] uppercase">
                    Option B
                  </Badge>
                  <h3 className="font-extrabold text-slate-950 text-base">{program2.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed truncate-3-lines">{program2.description}</p>
                  <Link 
                    href={`/programs/${program2.slug}`} 
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800 pt-2"
                  >
                    View Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>
              </div>

              {/* Side-by-Side Comparison Matrix */}
              <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-50 to-emerald-50/20 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-emerald-700" />
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                    Head-to-Head Criteria Comparison
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 max-w-[150px]">Dimension</th>
                        <th className="px-6 py-4">{program1.id.split('-')[0].toUpperCase()} Parameters</th>
                        <th className="px-6 py-4">{program2.id.split('-')[0].toUpperCase()} Parameters</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {comparison.points.map((pt, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900 max-w-[150px]">{pt.dimension}</td>
                          <td className="px-6 py-4 text-slate-600 leading-relaxed text-xs sm:text-sm">{pt.prog1Value}</td>
                          <td className="px-6 py-4 text-slate-600 leading-relaxed text-xs sm:text-sm">{pt.prog2Value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Stacking Playbook Box */}
              <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50/20 via-white to-teal-50/20 rounded-2xl overflow-hidden">
                <div className="bg-emerald-800 text-white p-6 shadow-xs flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg">Stacking Recommendation & Action Plan</h3>
                    <p className="text-xs text-emerald-100">How to optimize your filings by leveraging both programs in parallel.</p>
                  </div>
                </div>
                <CardContent className="p-6 sm:p-8 space-y-4">
                  <div 
                    className="prose text-slate-600 leading-relaxed text-sm sm:text-base space-y-4
                      prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-3 prose-ol:text-slate-600
                      prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:text-slate-600"
                    dangerouslySetInnerHTML={{ __html: comparison.stackingRecommendation }}
                  />
                </CardContent>
              </Card>

              {/* CTA Panel */}
              <Card className="border border-emerald-200 bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="md:flex md:items-center md:justify-between gap-6">
                  <div className="space-y-2 mb-4 md:mb-0">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Unsure Which Path Yields the Most Funding?
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Our analysts review business registration records, technical R&D payroll, and market goals to draft custom stacking models.
                    </p>
                  </div>
                  <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md whitespace-nowrap">
                    <Link href={`/get-started?compare=${comparison.slug}`} className="flex items-center gap-2">
                      Get Pre-Screening Call <ArrowRight className="h-4.5 w-4.5" />
                    </Link>
                  </Button>
                </div>
              </Card>

            </div>

            {/* Right Column (Estimator Widget) */}
            <div className="space-y-6">
              
              {/* Sticky Estimator Form */}
              <div className="sticky top-28">
                <FundingEstimator defaultIndustry="technology" defaultRegion={program1.region === 'Federal' ? 'on' : program1.region.toLowerCase()} />

                {/* Secure Trust Indicators */}
                <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-white flex items-start gap-3 shadow-xs">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700">Official Program Alignment</p>
                    <p>FSI Digital reviews eligibility standards in accordance with official guidelines. We never guarantee funding; all approvals are subject to official government program review.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
