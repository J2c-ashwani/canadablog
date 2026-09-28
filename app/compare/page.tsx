import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllComparisons } from "@/lib/data/comparisons";
import { getProgramBySlug } from "@/lib/data/programs";
import Link from "next/link";
import { Scale, ArrowRight, ShieldCheck, ChevronRight, Calculator, CheckCircle2, Sparkles, Layers } from "lucide-react";
import EEATBadge from "@/components/blog/EEATBadge";

export const metadata: Metadata = {
  title: "Government Grants & Loans Comparison Guide (2026 Directory) | FSI Digital",
  description:
    "Side-by-side comparisons of 30+ Canadian and U.S. government grants, SBA loans, R&D tax credits, and commercial financing. Compare funding caps, eligibility, and stacking rules.",
  alternates: {
    canonical: "https://www.fsidigital.ca/compare",
  },
  openGraph: {
    title: "Government Grants & Loans Comparison Guide (2026 Directory) | FSI Digital",
    description:
      "Side-by-side comparisons of 30+ Canadian and U.S. government grants, SBA loans, R&D tax credits, and commercial financing.",
    url: "https://www.fsidigital.ca/compare",
  },
};

export default function CompareDirectoryPage() {
  const comparisons = getAllComparisons();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.fsidigital.ca/compare",
        "url": "https://www.fsidigital.ca/compare",
        "name": "Government Grants & Loans Side-by-Side Comparison Directory (2026)",
        "description": "Comprehensive comparative decision directory for Canadian and U.S. commercial funding instruments.",
        "publisher": {
          "@type": "Organization",
          "name": "FSI Digital",
          "url": "https://www.fsidigital.ca",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.fsidigital.ca/compare#breadcrumbs",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
          { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://www.fsidigital.ca/compare" },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-slate-600" />
              <span className="font-semibold text-slate-200">Comparison Directory</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Scale className="w-3.5 h-3.5" /> 33 Head-to-Head Decision Guides (2026)
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Compare Government Grants, Loans & Tax Credits
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
              Choosing the wrong funding program wastes 3–6 months in review cycles. Our side-by-side comparison matrix evaluates funding amounts, approval timelines, audit risks, and legal stacking playbooks.
            </p>

            <div className="flex items-center justify-center pt-2">
              <EEATBadge authorName="Ashwani" authorImage="/author-ashwani.jpg" date="2026-06-09" />
            </div>

            {/* Quick Interactive RDE CTA */}
            <div className="pt-4 max-w-xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Uncertain Which Program Fits?</p>
                  <p className="text-xs text-slate-300">Run our free 2-minute diagnostic tool to match active programs.</p>
                </div>
                <Link
                  href="/calculator"
                  className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-emerald-500/20"
                >
                  <Calculator className="w-4 h-4" /> Check Eligibility Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Directory Grid Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                All Published Head-to-Head Comparisons
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore in-depth program breakdowns, eligibility rubrics, and capital stacking playbooks.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
              {comparisons.length} Guides Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisons.map((comp) => {
              const program1 = getProgramBySlug(comp.prog1Id);
              const program2 = getProgramBySlug(comp.prog2Id);

              const p1Amount = program1?.fundingAmount?.match(/\$[\d,.]+[KMB]?/i)?.[0];
              const p2Amount = program2?.fundingAmount?.match(/\$[\d,.]+[KMB]?/i)?.[0];

              return (
                <Card
                  key={comp.slug}
                  className="border border-slate-200/80 hover:border-emerald-500/60 transition-all duration-200 hover:shadow-md bg-white flex flex-col justify-between group"
                >
                  <CardContent className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="outline" className="text-[10px] font-bold text-slate-600 border-slate-200">
                          {comp.slug.replace(/-/g, ' ').toUpperCase()}
                        </Badge>
                        {p1Amount && p2Amount && (
                          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                            {p1Amount} vs {p2Amount}
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                        <Link href={`/compare/${comp.slug}`}>
                          {comp.title.includes(':') ? comp.title.split(':')[0] : comp.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {comp.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-slate-400" /> Stacking Playbook
                      </span>
                      <Link
                        href={`/compare/${comp.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors"
                      >
                        Compare Now <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Bottom Decision Support Banner */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12 px-4 sm:px-6 lg:px-8 my-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Need a Tailored Funding Assessment for Your Company?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto">
              Our automated Grant Intelligence Engine evaluates your sector, incorporation date, revenue, and payroll to compute your exact non-dilutive funding capacity.
            </p>
            <div className="pt-2">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Launch Grant Eligibility Calculator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
