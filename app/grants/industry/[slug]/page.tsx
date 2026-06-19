import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight, Shield, Layers, CheckCircle2, ChevronRight, Sparkles,
  Building2, FileText, Calculator, CalendarClock, DollarSign, Target,
  HelpCircle, TrendingUp, Clock, Users, Phone, BadgeCheck, Zap, Star, Scale,
  Briefcase
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { programsDatabase } from '@/lib/data/programs';
import { comparisonsDatabase } from '@/lib/data/comparisons';
import { FundingEstimator } from '@/components/seo/FundingEstimator';
import EEATBadge from '@/components/blog/EEATBadge';

type IndustryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// ─── Industry Database ───────────────────────────────────────────────────────

import { industryDatabase } from '@/lib/data/industry-pages';

// ─── Static Params ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(industryDatabase).map((slug) => ({
    slug,
  }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const industry = industryDatabase[resolvedParams.slug];

  if (!industry) {
    return {
      title: 'Industry Funding Directory Not Found | FSI Digital',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://www.fsidigital.ca/grants/industry/${resolvedParams.slug}`;

  return {
    title: `${industry.seoTitle} | FSI Digital`,
    description: `${industry.description} Compare verified federal and provincial programs, eligibility criteria, and custom stacking playbooks for ${industry.name.toLowerCase()}.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: industry.seoTitle,
      description: industry.description,
      url: canonical,
      type: 'website',
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function IndustryPage({ params }: IndustryPageProps) {
  const resolvedParams = await params;
  const industry = industryDatabase[resolvedParams.slug];

  if (!industry) {
    notFound();
  }

  const matchingPrograms = programsDatabase.filter((p) =>
    industry.programIds.includes(p.id)
  );

  const industryProgramIds = new Set(industry.programIds);
  const relevantComparisons = comparisonsDatabase.filter(
    comp => industryProgramIds.has(comp.prog1Id) || industryProgramIds.has(comp.prog2Id)
  );

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
            <span className="text-slate-400 font-semibold shrink-0">Industry Grants</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 shrink-0 truncate">{industry.name}</span>
          </nav>

          {/* ── Hero Banner ── */}
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 mb-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-emerald-400" />
                <Badge className="bg-emerald-600/90 text-white hover:bg-emerald-600/90 border-none font-bold text-xs">
                  Sector Funding Guide · Updated June 2026
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-3">
                If you run {industry.identity}, here&apos;s every grant you qualify for
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                {industry.subtext} Compare verified federal and provincial programs, verify matching criteria, and model your funding stacking.
              </p>

              <div className="flex items-center">
                <EEATBadge authorName="Ashwani" authorImage="/author-ashwani.jpg" date="2026-06-09" />
              </div>
            </div>
          </div>

          {/* ── Quick Facts Bar ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { icon: DollarSign, label: 'Funding Range', value: industry.quickFacts.fundingRange, color: 'text-emerald-700 bg-emerald-50' },
              { icon: Target, label: 'Matched Programs', value: `${industry.quickFacts.programCount} programs`, color: 'text-blue-700 bg-blue-50' },
              { icon: Star, label: 'Top Program', value: industry.quickFacts.topProgram, color: 'text-violet-700 bg-violet-50' },
              { icon: Clock, label: 'Avg. Timeline', value: industry.quickFacts.avgTimeline, color: 'text-amber-700 bg-amber-50' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                  <p className="text-sm font-bold text-slate-900 leading-snug mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Estimator (Mobile: above programs) ── */}
          <div className="block lg:hidden mb-8">
            <FundingEstimator defaultIndustry={resolvedParams.slug} defaultRegion="on" />
          </div>

          {/* ── Main Layout Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">

              {/* Stacking Playbook */}
              <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden">
                <div className="bg-emerald-800 p-6 text-white flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Layers className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{industry.stackingPlaybook.title}</h2>
                    <p className="text-xs text-emerald-100">{industry.stackingPlaybook.overview}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {industry.stackingPlaybook.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start text-sm text-slate-700">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed font-medium">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ── Consulting Bridge CTA Strip ── */}
              <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-slate-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg shrink-0">
                    <Phone className="h-5 w-5 text-indigo-700" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Not ready to complete the estimator?</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Book a paid 30-minute Funding Audit. Our advisors identify your top 3 programs and build your application roadmap.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
                  <Button asChild size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg">
                    <Link href="/calculator" className="flex items-center gap-1.5">
                      <Calculator className="h-3.5 w-3.5" /> Check Eligibility
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-bold rounded-lg">
                    <Link href="/audit" className="flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5" /> Talk To A Funding Strategist
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Recommended Programs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                    Recommended Programs ({matchingPrograms.length})
                  </h2>
                  <span className="text-xs text-slate-400 font-semibold uppercase">Latest Update: June 2026</span>
                </div>

                <div className="grid gap-4">
                  {matchingPrograms.map((prog) => (
                    <Card key={prog.id} className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                      <CardContent className="p-5 sm:p-6">
                        <div className="sm:flex sm:justify-between sm:items-start gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none font-bold text-xs shrink-0">
                                {prog.fundingType}
                              </Badge>
                              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold text-xs shrink-0">
                                {prog.fundingDifficulty} Match
                              </Badge>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors leading-snug">
                              <Link href={`/programs/${prog.slug}`}>{prog.name}</Link>
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">Agency: {prog.agency}</p>
                          </div>
                          <div className="mt-2 sm:mt-0 shrink-0 text-right">
                            <span className="text-sm font-black text-emerald-700 block">{prog.fundingAmount}</span>
                            <span className="text-xs text-slate-400 font-medium">{prog.deadlineType}</span>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                          {prog.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <CalendarClock className="h-3.5 w-3.5" />
                            <span className="font-semibold">Deadline: {prog.deadlineType}</span>
                          </div>
                          <Button asChild size="sm" variant="ghost" className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 font-bold h-8 px-3">
                            <Link href={`/programs/${prog.slug}`} className="flex items-center gap-1">
                              View Guide <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-emerald-600" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {industry.faqs.map((faq, idx) => (
                    <Card key={idx} className="border border-slate-200 bg-white rounded-xl overflow-hidden">
                      <CardContent className="p-5">
                        <p className="font-bold text-slate-900 text-sm mb-2 flex items-start gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-700 shrink-0 mt-0.5">
                            Q
                          </span>
                          {faq.q}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed pl-7">{faq.a}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Related Resources */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-600" />
                  Related Guides
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(resolvedParams.slug === 'saas-companies' || resolvedParams.slug === 'ai-startups') && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h3 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/sred-application-guide">SR&ED Application & Documentation Guide</Link>
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Playbook for tracking software development hours and claiming CRA R&D credits.</p>
                          </div>
                          <Link href="/guides/sred-application-guide" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h3 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/irap-innovation-application-guide">How to Apply for IRAP Funding Guide</Link>
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Best practices for contacting ITAs and building project milestones.</p>
                          </div>
                          <Link href="/guides/irap-innovation-application-guide" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {(resolvedParams.slug === 'manufacturers' || resolvedParams.slug === 'construction') && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h3 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-ontario-business-grants">Ontario Business Grants Complete Guide</Link>
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Explore Skills Development Fund (SDF) and regional equipment credits.</p>
                          </div>
                          <Link href="/guides/apply-ontario-business-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h3 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-federal-grants">How to Apply for Federal Grants</Link>
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Core guidelines for registering and submitting proposals to government portals.</p>
                          </div>
                          <Link href="/guides/apply-federal-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {resolvedParams.slug === 'agriculture' && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h3 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/canada-agri-food-funding-guide">Canada Agri-Food Funding & Export Guide</Link>
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Detailed breakdown of cost-shared support for growers and processors.</p>
                          </div>
                          <Link href="/guides/canada-agri-food-funding-guide" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h3 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-federal-grants">How to Apply for Federal Grants</Link>
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Core guidelines for registering and submitting proposals to government portals.</p>
                          </div>
                          <Link href="/guides/apply-federal-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {resolvedParams.slug === 'healthcare-medtech' && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h3 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/sbir-research-grants-guide">SBIR Biotech Research Grants Guide</Link>
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">How life sciences startups secure Phase I and Phase II seed awards.</p>
                          </div>
                          <Link href="/guides/sbir-research-grants-guide" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h3 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-federal-grants">USA Federal Grants Application Steps</Link>
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">How to set up SAM.gov entity details and submit clean applications.</p>
                          </div>
                          <Link href="/guides/apply-federal-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {resolvedParams.slug !== 'saas-companies' && resolvedParams.slug !== 'ai-startups' && resolvedParams.slug !== 'manufacturers' && resolvedParams.slug !== 'construction' && resolvedParams.slug !== 'agriculture' && resolvedParams.slug !== 'healthcare-medtech' && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h3 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-federal-grants">Federal Grant Application Strategies</Link>
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">Core guidelines for submitting technical proposals to government agencies.</p>
                          </div>
                          <Link href="/guides/apply-federal-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h3 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-small-business-grants">Small Business Grants Complete Guide</Link>
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Compare loan guarantee options (CSBFP) with direct non-repayable grants.</p>
                          </div>
                          <Link href="/guides/apply-small-business-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>

              {/* Related Comparisons Section */}
              {relevantComparisons.length > 0 && (
                <div className="space-y-4 mt-8">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Scale className="h-5.5 w-5.5 text-emerald-600" />
                    Funding Comparison Guides
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {relevantComparisons.slice(0, 4).map((comp) => (
                      <Card key={comp.slug} className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors line-clamp-2">
                              <Link href={`/compare/${comp.slug}`}>{comp.title}</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{comp.description}</p>
                          </div>
                          <Link href={`/compare/${comp.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Compare Programs <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Programs Loop (Industry -> Program) */}
              <Card className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-emerald-600" />
                  Related Programs
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Direct application guides for the core funding programs available to {industry.name.toLowerCase()}:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {matchingPrograms.map((prog) => (
                    <Link key={prog.id} href={`/programs/${prog.slug}`} className="group flex items-center justify-between p-3 rounded-xl border border-slate-150 bg-slate-50 hover:bg-slate-50 hover:border-emerald-300 hover:shadow-xs transition-all">
                      <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors truncate pr-2">
                        {prog.id === 'sred-tax-credit' ? 'SR&ED Tax Credit' : prog.id === 'irap-grant' ? 'IRAP Grant' : prog.id === 'cdap' ? 'CDAP Advisor Grant' : prog.id === 'canexport' ? 'CanExport SME' : prog.name.split(' (')[0]}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 group-hover:text-emerald-700 shrink-0 flex items-center gap-0.5">
                        Guide <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </Card>


            </div>{/* /left col */}

            {/* Right Column: Sticky Estimator (Desktop only) */}
            <div className="hidden lg:block space-y-6">
              <div className="sticky top-28 space-y-4">
                <FundingEstimator defaultIndustry={resolvedParams.slug} defaultRegion="on" />

                <div className="p-4 border border-slate-200 rounded-xl bg-white flex items-start gap-3 shadow-sm">
                  <Shield className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700">Non-Dilutive Funding Advisory</p>
                    <p>FSI Digital provides pre-qualification reviews to help {industry.name.toLowerCase()} match the right programs. We do not charge upfront application fees.</p>
                  </div>
                </div>

                {/* Consulting Bridge (Sidebar) */}
                <div className="rounded-xl border border-indigo-100 bg-gradient-to-b from-indigo-50 to-white p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <BadgeCheck className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm font-bold text-slate-900">Want expert guidance?</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Book a 30-minute paid Funding Audit. An FSI advisor reviews your eligibility, identifies your top 3 programs, and builds your action plan.
                  </p>
                  <Button asChild size="sm" variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-bold rounded-lg">
                    <Link href="/audit" className="flex items-center justify-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5" /> Talk To A Funding Strategist
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
