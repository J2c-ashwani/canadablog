import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Shield, Award, HelpCircle, Layers, CheckCircle2, ChevronRight, BarChart3, Clock, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/data/case-studies';
import { FundingEstimator } from '@/components/seo/FundingEstimator';
import EEATBadge from '@/components/blog/EEATBadge';

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const study = getCaseStudyBySlug(resolvedParams.slug);

  if (!study) {
    return {
      title: 'Funding Analysis Case Study Not Found | FSI Digital',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://www.fsidigital.ca/case-studies/${study.slug}`;
  const titleText = `${study.title} | FSI Digital`;

  return {
    title: titleText,
    description: `${study.subtitle}. Read our representative funding analysis showing how ${study.industry} companies in ${study.region} stack programs like ${study.programsStacked.join(' & ')}.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: titleText,
      description: study.subtitle,
      url: canonical,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  const study = getCaseStudyBySlug(resolvedParams.slug);

  if (!study) {
    notFound();
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
            <Link href="/case-studies" className="hover:text-emerald-700 transition-colors">Case Studies</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 shrink-0 truncate max-w-[200px] sm:max-w-xs">{study.title}</span>
          </nav>

          {/* Hero Banner Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-4xl relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-emerald-600/90 text-white hover:bg-emerald-600/90 border-none font-bold">
                  {study.label}
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20">
                  {study.region}, {study.country}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white mb-3">
                {study.title}
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                {study.subtitle}
              </p>

              <div className="flex items-center">
                <EEATBadge authorName="Ashwani" authorImage="/author-ashwani.jpg" date="2026-06-09" />
              </div>
            </div>
          </div>

          {/* Compliance Disclaimer Banner */}
          <div className="p-4 border border-amber-200 bg-amber-50/40 rounded-2xl flex items-start gap-3 shadow-xs mb-8">
            <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              <strong>Modeling Disclaimer:</strong> {study.disclaimer} Outcomes depend on program availability, timing of applications, and compliance documentation.
            </p>
          </div>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Details) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4">
                {study.metrics.map((metric, i) => (
                  <Card key={i} className="border border-slate-200 bg-white p-4 text-center rounded-xl shadow-xs">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">{metric.value}</span>
                    <span className="text-xs font-bold text-slate-800 block mt-1">{metric.label}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{metric.description}</span>
                  </Card>
                ))}
              </div>

              {/* Stacking Breakdown */}
              <Card className="border border-slate-200 bg-white rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-emerald-600" />
                  Stacked Programs In This Model
                </h3>
                <div className="flex flex-wrap gap-2">
                  {study.programsStacked.map((prog, idx) => (
                    <Badge key={idx} variant="secondary" className="px-3.5 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-800 border-none">
                      ✓ {prog}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Detailed Narrative */}
              <div className="space-y-6">
                <div className="p-6 border border-slate-200 bg-white rounded-2xl shadow-xs">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3">1. Business Profile & Challenge</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{study.challenge}</p>
                </div>

                <div className="p-6 border border-slate-200 bg-white rounded-2xl shadow-xs">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3">2. The Strategic Roadmap</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{study.strategy}</p>
                </div>

                <div className="p-6 border border-slate-200 bg-white rounded-2xl shadow-xs">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3">3. Implementation & Outcomes</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{study.solution}</p>
                  
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    <span>TIMELINE TO FUNDING MATCH: {study.timeline.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Call to Action Card */}
              <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="md:flex md:items-center md:justify-between gap-6">
                  <div className="space-y-2 mb-4 md:mb-0">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Model Your Stacking Potential
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Work with a specialist to review which provincial, federal, and state programs can be stacked for your business model.
                    </p>
                  </div>
                  <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md whitespace-nowrap">
                    <Link href={`/get-started?ref=case-study-${study.slug}`} className="flex items-center gap-2">
                      Get Stacking Review <ArrowRight className="h-4.5 w-4.5" />
                    </Link>
                  </Button>
                </div>
              </Card>

            </div>

            {/* Right Column (Estimator Widget) */}
            <div className="space-y-6">
              <div className="sticky top-28">
                <FundingEstimator defaultIndustry={study.industry.toLowerCase().includes('tech') ? 'technology' : study.industry.toLowerCase()} defaultRegion={study.region === 'Ontario' ? 'on' : study.region === 'British Columbia' ? 'bc' : study.region === 'Alberta' ? 'ab' : 'tx'} />

                <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-white flex items-start gap-3 shadow-xs">
                  <Shield className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700">Advisory Disclaimer</p>
                    <p>Calculations provided by the estimator tool are automated estimates. FSI Digital does not represent government agencies. Stacking combinations must comply with anti-double-dipping regulations.</p>
                  </div>
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
