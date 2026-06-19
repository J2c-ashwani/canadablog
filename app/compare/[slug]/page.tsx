import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Scale, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Briefcase, Layers, MapPin } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getComparisonBySlug, getAllComparisons } from "@/lib/data/comparisons"
import { getProgramBySlug, programsDatabase } from "@/lib/data/programs"
import { industryDatabase } from "@/lib/data/industry-pages"
import { FundingEstimator } from "@/components/seo/FundingEstimator"
import EEATBadge from "@/components/blog/EEATBadge"
import { CITIES, INDUSTRIES } from "@/lib/pseo-data"


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

  const relatedIndustries = Object.entries(industryDatabase)
    .filter(([slug, ind]) => ind.programIds.includes(program1.id) || ind.programIds.includes(program2.id))
    .map(([slug, ind]) => ({ slug, name: ind.name }));

  const otherPrograms = programsDatabase
    .filter(p => p.id !== program1.id && p.id !== program2.id && (p.region === program1.region || p.region === program2.region))
    .slice(0, 3);

  const DB_KEY_TO_INDUSTRY_SLUG: Record<string, string> = {
    'saas-companies': 'technology', 'ai-startups': 'technology', 'manufacturers': 'manufacturing',
    'agriculture': 'agriculture', 'healthcare-medtech': 'healthcare', 'clean-tech': 'clean-energy',
    'restaurants-hospitality': 'restaurants-hospitality', 'retail': 'retail',
    'non-profits': 'non-profits', 'media-entertainment': 'arts-entertainment',
    'education-training': 'education', 'transportation-logistics': 'logistics', 'construction': 'construction',
  };

  const isCanadian = program1.country === 'Canada' || program2.country === 'Canada';
  
  // Deterministic shuffle helper based on comparison slug
  const shuffleList = <T,>(arr: T[], seed: string): T[] => {
    const res = [...arr];
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    for (let i = res.length - 1; i > 0; i--) {
      const j = Math.abs((hash + i) * 9301 + 49297) % (i + 1);
      const temp = res[i];
      res[i] = res[j];
      res[j] = temp;
    }
    return res;
  };

  const CANADIAN_PROVINCE_SLUGS = new Set(['on', 'bc', 'ab', 'qc', 'mb', 'sk', 'ns', 'nl', 'nb', 'pe']);
  const countryCities = CITIES.filter(c => {
    const isCityCanada = CANADIAN_PROVINCE_SLUGS.has(c.provSlug.toLowerCase());
    return isCanadian ? isCityCanada : !isCityCanada;
  });

  // Prioritize region if either program is regional (e.g. Ontario, Texas)
  let prioritizedCities = [...countryCities];
  const region1 = program1.region && program1.region !== 'Federal' ? program1.region : null;
  const region2 = program2.region && program2.region !== 'Federal' ? program2.region : null;
  const targetRegion = region1 || region2;

  if (targetRegion) {
    const regionMatch = targetRegion.toLowerCase();
    const inRegion = countryCities.filter(c => c.prov.toLowerCase() === regionMatch);
    const outRegion = countryCities.filter(c => c.prov.toLowerCase() !== regionMatch);
    prioritizedCities = [...shuffleList(inRegion, comparison.slug), ...shuffleList(outRegion, comparison.slug)];
  } else {
    prioritizedCities = shuffleList(countryCities, comparison.slug);
  }

  const industryDbKeys = relatedIndustries.map(ind => ind.slug);
  const industrySlugs = Array.from(new Set(industryDbKeys.map(k => DB_KEY_TO_INDUSTRY_SLUG[k]).filter(Boolean)));
  const targetSlugs = industrySlugs.length > 0 ? industrySlugs.slice(0, 2) : ['technology'];

  // Helper to get anchor text
  const getAnchorText = (p1Name: string, p2Name: string, cityName: string, industrySlug: string) => {
    const getShort = (name: string) => {
      if (name.includes('(')) {
        const matches = name.match(/\(([^)]+)\)/);
        if (matches && matches[1]) return matches[1];
      }
      return name.split(' ')[0];
    };
    const s1 = getShort(p1Name);
    const s2 = getShort(p2Name);

    const indObj = INDUSTRIES.find(i => i.slug === industrySlug);
    const industryName = indObj ? indObj.name : 'Business';

    let indRef = industryName;
    if (industryName === 'Technology Startups') indRef = 'Tech Companies';
    else if (industryName === 'Agriculture and Farming') indRef = 'Agribusinesses';
    else if (industryName === 'Clean Tech and Energy') indRef = 'Clean Energy';
    else if (industryName === 'Women-Owned Businesses') indRef = 'Women-Owned Firms';
    else if (industryName === 'Restaurants and Hospitality') indRef = 'Hospitality';
    else if (industryName === 'Retail and Main Street') indRef = 'Retailers';
    else if (industryName === 'Non-profits and Social Enterprises') indRef = 'Non-profits';
    else if (industryName === 'Minority and BIPOC Founders') indRef = 'BIPOC Founders';
    else if (industryName === 'Supply Chain and Logistics') indRef = 'Logistics';
    else if (industryName === 'Local Trades and Construction') indRef = 'Builders';

    return `${s1} vs. ${s2} for ${cityName} ${indRef}`;
  };

  const localHubs: { href: string; label: string }[] = [];
  for (const city of prioritizedCities) {
    for (const indSlug of targetSlugs) {
      localHubs.push({
        href: `/grants/${city.provSlug}/${city.citySlug}/${indSlug}`,
        label: getAnchorText(program1.name, program2.name, city.city, indSlug),
      });
    }
    if (localHubs.length >= 4) break;
  }

  const topLocalHubs = localHubs.slice(0, 4);

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

              {/* Related Industries */}
              {relatedIndustries.length > 0 && (
                <Card className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                  <h3 className="text-lg font-extrabold text-slate-905 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-emerald-600" />
                    Explore Stacking Options By Industry
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Public funding eligibility varies significantly by sector. Select your industry to view custom program matches and stacking playbooks:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {relatedIndustries.slice(0, 8).map(ind => (
                      <Link key={ind.slug} href={`/grants/industry/${ind.slug}`}>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer">
                          {ind.name} &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </Card>
              )}

              {/* Related Programs (Comparison -> Program) */}
              <Card className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-emerald-600" />
                  Related Programs
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Detailed guides on programs related to this comparison:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {[program1, program2, ...otherPrograms.slice(0, 2)].map(prog => (
                    <Link key={prog.id} href={`/programs/${prog.slug}`} className="group block">
                      <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-slate-50 hover:border-emerald-300 hover:shadow-xs transition-all h-full flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                            {prog.id === 'sred-tax-credit' ? 'SR&ED Tax Credit' : prog.id === 'irap-grant' ? 'IRAP Grant' : prog.id === 'cdap' ? 'CDAP Grant' : prog.id === 'canexport' ? 'CanExport SME' : prog.name}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                            {prog.description}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 inline-flex items-center gap-1 mt-3">
                          Read Guide <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
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

                {/* Related Programs Card */}
                <Card className="mt-4 border border-slate-200 bg-white rounded-2xl p-5 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-emerald-600" />
                    Related Programs
                  </h4>
                  <ul className="space-y-2.5 text-xs">
                    <li>
                      <Link href={`/programs/${program1.slug}`} className="font-bold text-slate-900 hover:text-emerald-700 block">
                        {program1.name} &rarr;
                      </Link>
                    </li>
                    <li>
                      <Link href={`/programs/${program2.slug}`} className="font-bold text-slate-900 hover:text-emerald-700 block">
                        {program2.name} &rarr;
                      </Link>
                    </li>
                    {otherPrograms.map(p => (
                      <li key={p.id} className="border-t border-slate-100 pt-2">
                        <Link href={`/programs/${p.slug}`} className="text-slate-650 hover:text-emerald-700 block font-medium">
                          {p.name} &rarr;
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Local Hub Links */}
                {topLocalHubs.length > 0 && (
                  <Card className="mt-4 border border-slate-200 bg-white rounded-2xl p-5 space-y-3">
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      Local Funding Hubs
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Browse city-level funding guides in this sector:</p>
                    <ul className="space-y-2.5 text-xs">
                      {topLocalHubs.map((hub, idx) => (
                        <li key={idx}>
                          <Link href={hub.href} className="font-bold text-slate-900 hover:text-emerald-700 block">
                            {hub.label} &rarr;
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

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
