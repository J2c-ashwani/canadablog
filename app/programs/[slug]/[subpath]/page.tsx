import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowLeft, Shield, Award, HelpCircle, FileText, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProgramBySlug, getAllPrograms } from '@/lib/data/programs';
import { FundingEstimator } from '@/components/seo/FundingEstimator';
import EEATBadge from '@/components/blog/EEATBadge';

type SubpathPageProps = {
  params: Promise<{
    slug: string;
    subpath: string;
  }>;
};

const SUBPATHS = ['eligibility', 'application', 'mistakes', 'faq'];

export function generateStaticParams() {
  const params: { slug: string; subpath: string }[] = [];
  const programs = getAllPrograms();
  for (const program of programs) {
    for (const subpath of SUBPATHS) {
      params.push({
        slug: program.slug,
        subpath: subpath
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: SubpathPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const program = getProgramBySlug(resolvedParams.slug);
  const subpath = resolvedParams.subpath;

  if (!program || !SUBPATHS.includes(subpath)) {
    return {
      title: 'Program Sub-Guide Not Found | FSI Digital',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://www.fsidigital.ca/programs/${program.slug}/${subpath}`;
  let title = '';
  let description = '';

  if (subpath === 'eligibility') {
    title = `${program.name} Eligibility Requirements & Criteria (2026)`;
    description = `Review exact eligibility criteria for ${program.name}. Learn which corporate structures, regions, and employee size thresholds qualify.`;
  } else if (subpath === 'application') {
    title = `How to Apply for ${program.name}: Step-by-Step Filing Guide`;
    description = `Comprehensive application guide for ${program.name}. Step-by-step instructions on registration portals, technical briefs, and budget submissions.`;
  } else if (subpath === 'mistakes') {
    title = `${program.name} Audits: Common Rejection & Filing Mistakes`;
    description = `Avoid common mistakes and compliance audit pitfalls when filing for ${program.name}. Understand contemporaneous log rules and rejection reasons.`;
  } else if (subpath === 'faq') {
    title = `${program.name} Frequently Asked Questions (FAQ) & Tips`;
    description = `Answers to key questions regarding the ${program.name} funding limits, matching ratios, application cycles, and portal registrations.`;
  }

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function ProgramSubpathPage({ params }: SubpathPageProps) {
  const resolvedParams = await params;
  const { slug, subpath } = resolvedParams;
  const program = getProgramBySlug(slug);

  if (!program || !SUBPATHS.includes(subpath)) {
    notFound();
  }

  const getSubpathTitle = () => {
    if (subpath === 'eligibility') return 'Eligibility Requirements';
    if (subpath === 'application') return 'Application Process';
    if (subpath === 'mistakes') return 'Common Mistakes & Compliance';
    return 'Frequently Asked Questions (FAQ)';
  };

  const ctaText = subpath === 'application' 
    ? `Request Application Support for ${program.name}`
    : `Check Your ${program.name} Eligibility`;

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
            <Link href={`/programs/${program.slug}`} className="hover:text-emerald-700 transition-colors underline decoration-dotted">{program.name}</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 shrink-0 truncate max-w-[200px] sm:max-w-xs">{getSubpathTitle()}</span>
          </nav>

          {/* Hero Banner Grid */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-emerald-600/90 text-white hover:bg-emerald-600/90 border-none font-bold">
                  {program.fundingType} Section
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20">
                  {getSubpathTitle()}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
                {program.name}: {getSubpathTitle()}
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6">
                Deep-dive checklist and reference instructions reviewed for accuracy by our funding research lead.
              </p>

              <div className="flex items-center">
                <EEATBadge authorName="Ashwani" authorImage="/author-ashwani.jpg" date="2026-06-09" />
              </div>
            </div>
          </div>

          {/* Content Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Section Content) */}
            <div className="lg:col-span-2 space-y-8">
              
              <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
                
                {/* 1. ELIGIBILITY SUBPATH */}
                {subpath === 'eligibility' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" /> Required Qualifications
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {program.eligibility.map((crit, idx) => (
                          <div key={idx} className="flex gap-3 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                            <span className="text-sm text-slate-700 font-semibold leading-relaxed">{crit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3">
                      <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-600" /> Compliance Disclaimer
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Eligibility criteria are subject to change by government agencies. Meeting these criteria provides pre-qualification indicators but does not guarantee funding approval.
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. APPLICATION SUBPATH */}
                {subpath === 'application' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-emerald-600 shrink-0" /> Filing Instructions & Steps
                    </h2>
                    <ol className="space-y-4">
                      {program.applicationProcess.map((step, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-700 shrink-0">{idx + 1}</span>
                          <span className="leading-relaxed font-semibold">{step}</span>
                        </li>
                      ))}
                    </ol>

                    <div className="p-5 border border-emerald-100 rounded-2xl bg-emerald-50/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm">Need Help Preparing Your Proposal?</h4>
                        <p className="text-xs text-slate-500">Book a pre-screening call to review your proposal templates and draft budgets.</p>
                      </div>
                      <Link 
                        href={`/get-started?service=${program.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                      >
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* 3. MISTAKES SUBPATH */}
                {subpath === 'mistakes' && (
                  <div className="space-y-6">
                    <div className="p-5 border border-red-100 rounded-2xl bg-red-50/20 flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-900 text-sm">Critical Audit & Rejection Triggers</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Failure to provide required audit trails will trigger matching grants clawbacks or application rejection. Ensure you avoid these common pitfalls.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {(program.fundingType === 'Tax Credit' 
                        ? [
                            "Failing to maintain contemporaneous documentation. Timesheets, project specs, and git logs must prove the technical uncertainty was tracked in real-time, not retroactively guessed.",
                            "Claiming standard software integration or UI formatting. R&D tax incentives require resolving a systemic technological uncertainty, not basic configuration of existing frameworks.",
                            "Over-claiming third-party contractor costs without formal Canadian or U.S. intellectual property rights and explicit contracts proving who controls the R&D risk."
                          ]
                        : [
                            "Starting the application too late. High-competition programs require 40 to 80 hours of writing, system registrations, and proposal modeling.",
                            "Failing to engage the program officer or ITA early. These programs are relationship-driven; applying blind without a dedicated internal champion usually results in rejection.",
                            "Spending money before receiving formal written approval. 95% of government grant programs will not reimburse costs incurred or contracts signed prior to the official award start date."
                          ]
                      ).map((mistake, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl bg-slate-50/30">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700 shrink-0 mt-0.5">!</span>
                          <span className="text-sm text-slate-700 leading-relaxed font-semibold">{mistake}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. FAQ SUBPATH */}
                {subpath === 'faq' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-emerald-600 shrink-0" /> Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      <div className="border border-slate-100 rounded-xl p-5 bg-slate-50/50 space-y-2">
                        <h3 className="font-bold text-slate-900 text-sm">What is the maximum funding amount available?</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Under current guidelines, the program provides up to <strong>{program.fundingAmount}</strong> depending on eligible project expenses.
                        </p>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-5 bg-slate-50/50 space-y-2">
                        <h3 className="font-bold text-slate-900 text-sm">Which agency administers the program?</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          The program is managed and administered by the <strong>{program.agency}</strong>.
                        </p>
                      </div>
                      {program.insiderTips && program.insiderTips.length > 0 && (
                        <div className="border border-emerald-100 rounded-xl p-5 bg-emerald-50/20 space-y-2">
                          <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">💡 Expert Tip: What are the success keys?</h3>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {program.insiderTips[0]}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Link to Parent Program Page */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <Link 
                    href={`/programs/${program.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to full program overview
                  </Link>
                  <a
                    href={program.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700"
                  >
                    Official website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </Card>

              {/* Stacking Playbook (Shared Promotion) */}
              <Card className="border border-slate-200 bg-white p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-950">Stacking Opportunities</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Most businesses fail to unlock the full potential of funding because they apply for programs in isolation. Stacking multiple federal and regional resources enables companies to maximize non-dilutive support. 
                </p>
                <Link 
                  href={`/programs/${program.slug}`} 
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 hover:underline"
                >
                  View stacking strategies on main guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Card>

            </div>

            {/* Right Column (Estimator & Info) */}
            <div className="space-y-6">
              
              {/* Sticky Estimator Widget */}
              <div className="sticky top-28">
                <FundingEstimator defaultIndustry="technology" defaultRegion={program.region === 'Federal' ? 'on' : program.region.toLowerCase()} />

                {/* Secure Trust Indicators */}
                <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-white flex items-start gap-3 shadow-xs">
                  <Shield className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
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
  );
}

function ExternalLink({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}
