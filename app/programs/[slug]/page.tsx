import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Shield, Award, HelpCircle, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProgramBySlug, getAllPrograms } from '@/lib/data/programs';
import { ProgramTabs } from '@/components/seo/ProgramTabs';
import { FundingEstimator } from '@/components/seo/FundingEstimator';
import EEATBadge from '@/components/blog/EEATBadge';

type ProgramPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPrograms().map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const program = getProgramBySlug(resolvedParams.slug);

  if (!program) {
    return {
      title: 'Program Funding Guide Not Found | FSI Digital',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://www.fsidigital.ca/programs/${program.slug}`;
  const displayTitle = `${program.name} | Eligibility & Application Guide (2026)`;
  const displayDesc = `Learn how to qualify for the ${program.name}. Review funding limits (${program.fundingAmount}), difficulty, deadlines, application steps, and stacking strategies.`;

  return {
    title: displayTitle,
    description: displayDesc,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: displayTitle,
      description: displayDesc,
      url: canonical,
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${program.name} Funding Guide`,
        },
      ],
    },
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const resolvedParams = await params;
  const program = getProgramBySlug(resolvedParams.slug);

  if (!program) {
    notFound();
  }

  // Define dynamic E-E-A-T Short Answer content
  const getEEATAnswer = (p: typeof program) => {
    const isCanada = p.country === 'Canada';
    return `To qualify for the ${p.name}, a business must be incorporated in ${isCanada ? 'Canada' : 'the United States'} and demonstrate active operations. The program offers up to ${p.fundingAmount} in non-dilutive capital, which is categorized under a ${p.fundingDifficulty} funding difficulty level. Applicants must ensure they meet all technical benchmarks and file using official channels before ${p.deadlineType === 'Rolling Intake' ? 'funds are fully allocated for the fiscal period' : 'specific application windows close'}.`;
  };

  const eeatAnswer = getEEATAnswer(program);

  // Contextual CTAs
  const getContextualCTA = (p: typeof program) => {
    switch (p.id) {
      case 'irap-grant':
        return { text: 'Book an IRAP Eligibility Review', subtext: 'Assess wage subsidy potential' };
      case 'sred-tax-credit':
        return { text: 'Review Your SR&ED Claim Potential', subtext: 'Calculate R&D tax credit yields' };
      case 'canexport':
        return { text: 'Prepare CanExport Intake Plan', subtext: 'Plan international marketing match' };
      case 'nih-sbir':
      case 'nsf-sbir':
        return { text: 'Request SBIR Proposal Screening', subtext: 'Evaluate technical research risk score' };
      default:
        return { text: `Check ${p.region} Funding Eligibility`, subtext: 'Get custom pre-qualification analysis' };
    }
  };

  const cta = getContextualCTA(program);

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
            <span className="font-semibold text-slate-800 shrink-0 truncate max-w-[200px] sm:max-w-xs">{program.name}</span>
          </nav>

          {/* Hero Banner Grid */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-emerald-600/90 text-white hover:bg-emerald-600/90 border-none font-bold">
                  {program.fundingType} Program
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20">
                  {program.region === 'Federal' ? `${program.country} Federal` : `${program.region} Region`}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
                {program.name}
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6">
                Official funding support offered by the <span className="text-white font-bold">{program.agency}</span>. Offset costs with up to <span className="text-emerald-400 font-extrabold">{program.fundingAmount}</span>.
              </p>

              <div className="flex items-center">
                <EEATBadge authorName="Ashwani" authorImage="/author-ashwani.jpg" date="2026-06-09" />
              </div>
            </div>
          </div>

          {/* Main Content Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Main Program Details) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* E-E-A-T Short Answer Box */}
              <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-2xl">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50/30 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-700" />
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800">
                    How does a business qualify for the {program.id.split('-').join(' ').toUpperCase()}?
                  </h2>
                </div>
                <CardContent className="p-6">
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    {eeatAnswer}
                  </p>
                </CardContent>
              </Card>

              {/* Interactive Tabs Cluster */}
              <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden p-6">
                <ProgramTabs program={program} />
              </Card>

              {/* Related Resources & Guides (Content Clusters) */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="h-5.5 w-5.5 text-emerald-600" />
                  Related Resources & Guides
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(program.slug === 'sred-tax-credit' || program.slug === 'quebec-innovation-tax-credit') && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/sred-application-guide">SR&ED Application & Documentation Guide</Link>
                            </h4>
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
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/programs/irap-grant">Industrial Research Assistance Program (IRAP)</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Stack direct wage grants alongside your year-end SR&ED R&D tax tax credits.</p>
                          </div>
                          <Link href="/programs/irap-grant" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            View Program <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {program.slug === 'irap-grant' && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/irap-innovation-application-guide">How to Apply for IRAP Funding Guide</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Best practices for contacting ITAs and building project milestones.</p>
                          </div>
                          <Link href="/guides/irap-innovation-application-guide" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/programs/sred-tax-credit">SR&ED Tax Credit Program Guide</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Stack retroactive tax refunds on remaining developer payroll unfunded by IRAP.</p>
                          </div>
                          <Link href="/programs/sred-tax-credit" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            View Program <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {program.slug === 'canexport' && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/programs/cdap">Canada Digital Adoption Program (CDAP)</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Secure interest-free loans and hiring incentives to scale ecommerce globally.</p>
                          </div>
                          <Link href="/programs/cdap" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            View Program <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/grants/location/ontario">Ontario Regional Grant Guide</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Explore Ontario provincial and municipal growth initiatives.</p>
                          </div>
                          <Link href="/grants/location/ontario" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            View Location <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {(program.slug === 'nih-sbir' || program.slug === 'nsf-sbir') && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/sbir-research-grants-guide">SBIR Deep-Tech Grant Application Guide</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Navigate Phase I and Phase II technical risk writing models.</p>
                          </div>
                          <Link href="/guides/sbir-research-grants-guide" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-federal-grants">USA Federal Grants Application Steps</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">How to set up SAM.gov entity details and submit clean applications.</p>
                          </div>
                          <Link href="/guides/apply-federal-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {program.slug !== 'sred-tax-credit' && program.slug !== 'quebec-innovation-tax-credit' && program.slug !== 'irap-grant' && program.slug !== 'canexport' && program.slug !== 'nih-sbir' && program.slug !== 'nsf-sbir' && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-federal-grants">Federal Grant Application Strategies</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Core guidelines for submitting technical proposals to government agencies.</p>
                          </div>
                          <Link href="/guides/apply-federal-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/case-studies">Illustrative Stacking Models & Case Studies</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Examine how typical companies combine wage support, research funds, and local credits.</p>
                          </div>
                          <Link href="/case-studies" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            View Case Studies <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>

              {/* Call to Action Grid */}
              <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="md:flex md:items-center md:justify-between gap-6">
                  <div className="space-y-2 mb-4 md:mb-0">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Determine Your Funding Match Probability
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Our pre-qualification review analyzes program requirements, stacking possibilities, and alignment to minimize filing rejections.
                    </p>
                  </div>
                  <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md whitespace-nowrap">
                    <Link href={`/get-started?service=${program.slug}`} className="flex items-center gap-2">
                      {cta.text} <ArrowRight className="h-4.5 w-4.5" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Column (Estimator & Lead Magnets) */}
            <div className="space-y-6">
              
              {/* Sticky Estimator Form */}
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
