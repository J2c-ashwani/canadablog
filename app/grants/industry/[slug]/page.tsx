import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Shield, Award, HelpCircle, Layers, CheckCircle2, ChevronRight, Sparkles, Building2, FileText } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { programsDatabase } from '@/lib/data/programs';
import { FundingEstimator } from '@/components/seo/FundingEstimator';
import EEATBadge from '@/components/blog/EEATBadge';

type IndustryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Define the 10 cohort industries
const industryDatabase: Record<string, {
  name: string;
  seoTitle: string;
  description: string;
  subtext: string;
  programIds: string[];
  stackingPlaybook: {
    title: string;
    overview: string;
    steps: string[];
  };
}> = {
  'saas-companies': {
    name: 'SaaS Companies & Software Startups',
    seoTitle: 'Government Grants & Funding for SaaS Companies (2026)',
    description: 'Discover available government grants, R&D tax credits, and software hiring subsidies designed for SaaS and subscription-based tech businesses.',
    subtext: 'Offset software engineering salaries and server costs by stacking federal wage subsidies and retroactive tax incentives.',
    programIds: ['sred-tax-credit', 'irap-grant', 'cdap', 'mitacs-accelerate', 'nsf-sbir', 'california-competes-tax-credit', 'new-york-step', 'ohio-tech-cred', 'illinois-edge'],
    stackingPlaybook: {
      title: 'The SaaS R&D + Wage Stack',
      overview: 'How software startups recover up to 75% of development payroll without giving up company equity.',
      steps: [
        'Hire university computer science students using Mitacs co-funding (covers 50% of the stipend).',
        'Secure an IRAP grant to offset salaries of your full-time local core developers.',
        'At tax time, file for SR&ED (Canada) or IRS Form 6765 (USA) to reclaim tax credits on the remaining out-of-pocket payroll expenses.',
        'Apply for digital export grants (like CanExport or STEP) to fund overseas marketing, localized localization, and travel.'
      ]
    }
  },
  'ai-startups': {
    name: 'AI & Machine Learning Startups',
    seoTitle: 'Non-Dilutive Capital & Grants for AI Startups (2026)',
    description: 'Federal and state-level grants available to fund advanced artificial intelligence, machine learning model training, and deep-tech prototype development.',
    subtext: 'Secure deep-tech research funding to offset GPU compute budgets, datasets acquisition, and machine learning PhD salaries.',
    programIds: ['sred-tax-credit', 'irap-grant', 'nsf-sbir', 'nih-sbir', 'doe-clean-energy', 'mitacs-accelerate', 'alberta-innovation-grant', 'quebec-innovation-tax-credit'],
    stackingPlaybook: {
      title: 'Deep-Tech AI Funding Stack',
      overview: 'Stacking federal scientific research grants to fund high-risk artificial intelligence algorithm training.',
      steps: [
        'Submit a required Project Pitch to the NSF SBIR (USA) or consult an NRC ITA (Canada) to highlight the high technical risk of your models.',
        'Partner with a university laboratory under STTR or Mitacs Accelerate to access PhD researchers and university-grade GPU clusters.',
        'Isolate data engineering and modeling hours in git logs to claim maximum R&D tax credits.',
        'Utilize regional state/province vouchers to offset third-party model audit and security compliance costs.'
      ]
    }
  },
  'manufacturers': {
    name: 'Advanced Manufacturing & Industrial',
    seoTitle: 'Government Grants for Manufacturers & Industrial Facilities (2026)',
    description: 'Explore equipment purchasing grants, industrial automation incentives, and floor-worker training subsidies for manufacturers.',
    subtext: 'Modernize plant operations and install automated sorting lines by stacking machinery capital cost allowances and workplace training grants.',
    programIds: ['ontario-hiring-grant', 'alberta-innovation-grant', 'sred-tax-credit', 'cdap', 'sif', 'texas-enterprise-fund', 'california-competes-tax-credit', 'ohio-tech-cred', 'illinois-edge'],
    stackingPlaybook: {
      title: 'Equipment Modernization Stack',
      overview: 'Combine capital expenditure rebates with employee upskilling wage support.',
      steps: [
        'Secure regional capital grants (e.g., CME SMART or State Enterprise Funds) prior to signing vendor agreements for new machinery.',
        'Isolate the onboarding/training line-items on your equipment invoice.',
        'Submit the training budget to provincial/state skills development programs (e.g. Ontario SDF or Ohio TechCred) to cover 80-100% of operator retraining.',
        'Claim depreciation write-offs and energy efficiency rebates for clean machinery.'
      ]
    }
  },
  'agriculture': {
    name: 'Agriculture & Agri-Food Technology',
    seoTitle: 'Agricultural Grants & Green Farming Incentives (2026)',
    description: 'Review active cost-shared grants, solar farm incentives, precision agriculture subsidies, and food safety compliance funding.',
    subtext: 'Decarbonize farming operations and adopt smart sensors by stacking provincial CAP streams and federal clean-tech funding.',
    programIds: ['sustainable-cap', 'usda-reap', 'mitacs-accelerate', 'nsf-sbir', 'alberta-innovation-grant'],
    stackingPlaybook: {
      title: 'Sustainable Farm Modernization Stack',
      overview: 'How agri-businesses secure up to 50% cost-share matching on energy upgrades and automated systems.',
      steps: [
        'Commission an environmental farm plan or energy efficiency audit to establish project baselines.',
        'Apply for USDA REAP (USA) or Agricultural Clean Technology (Canada) to cover solar installations and high-efficiency crop dryers.',
        'Apply for Sustainable CAP streams to cover precision field sensor grids and automated weeding systems.',
        'Ensure all contractor quotes are arm\'s-length and submitted before active project launch.'
      ]
    }
  },
  'healthcare-medtech': {
    name: 'Healthcare, Biotech & MedTech',
    seoTitle: 'Biotech & Medical Device Research Grants (2026)',
    description: 'Access federal life sciences funding, medical device prototyping grants, and clinical trial research subsidies.',
    subtext: 'Accelerate therapeutic breakthroughs and FDA/Health Canada validation using non-dilutive research capital.',
    programIds: ['nih-sbir', 'nsf-sbir', 'sred-tax-credit', 'mitacs-accelerate', 'quebec-innovation-tax-credit', 'alberta-innovation-grant'],
    stackingPlaybook: {
      title: 'Biotech Clinical Trial Stack',
      overview: 'Leverage university collaborations and federal seed awards to complete clinical validations.',
      steps: [
        'Secure NIH or NSF SBIR Phase I awards to fund initial benchtop validations ($150k-$275k).',
        'Partner with a research hospital to run early safety checks, matching academic wages under STTR or Mitacs streams.',
        'Claim retroactive R&D tax credits on clinical materials, lab rentals, and research personnel wages.',
        'Apply for Phase II allocations ($1M+) once Phase I milestones are achieved and verified.'
      ]
    }
  },
  'clean-tech': {
    name: 'Clean Tech & Green Energy',
    seoTitle: 'Clean Energy & Green Technology Grants (2026)',
    description: 'Federal carbon-reduction grants, grid storage development incentives, and renewable energy installation subsidies.',
    subtext: 'Fund technical development of carbon-capture solutions or install building solar arrays using green cash allocations.',
    programIds: ['doe-clean-energy', 'usda-reap', 'nsf-sbir', 'sustainable-cap', 'sred-tax-credit', 'mitacs-accelerate', 'sif'],
    stackingPlaybook: {
      title: 'Green Capital & R&D Stack',
      overview: 'Offset carbon-reduction capital upgrades and proprietary hardware manufacturing costs.',
      steps: [
        'Apply for federal department energy solicitations matching your exact hardware project scope.',
        'Stack local utility and green bank low-interest bridge financing to cover initial equipment acquisition.',
        'Register for federal/state green energy credits to offset operational tax liabilities.',
        'Claim R&D tax credits on engineering payroll hours spent optimizing physical power efficiency.'
      ]
    }
  },
  'restaurants-hospitality': {
    name: 'Restaurants & Hospitality',
    seoTitle: 'Small Business Grants for Restaurants & Hospitality (2026)',
    description: 'Explore regional small business incentives, point-of-sale digitization grants, and kitchen worker retraining subsidies.',
    subtext: 'Deploy advanced digital inventory systems and train chefs with local regional support.',
    programIds: ['cdap', 'ontario-hiring-grant', 'new-york-step', 'ohio-tech-cred'],
    stackingPlaybook: {
      title: 'Hospitality Digitization Stack',
      overview: 'Modernize booking systems and floor staff schedules using small business vouchers.',
      steps: [
        'Apply for digital adoption programs (like CDAP) to offset CRM setup and reservation engine subscription setup.',
        'Utilize provincial/state worker training credits to train kitchen and service staff on advanced inventory systems.',
        'Check municipal storefront improvement grants to offset outdoor signage or patio dining build-outs.'
      ]
    }
  },
  'retail': {
    name: 'Retail & Ecommerce Businesses',
    seoTitle: 'Government Grants for Retail & Ecommerce (2026)',
    description: 'Promote international web expansion, localized advertising, and ecommerce logistics integration using government grants.',
    subtext: 'Expand sales globally by claiming international translation fees and online ad spend matching.',
    programIds: ['cdap', 'canexport', 'new-york-step', 'ontario-hiring-grant', 'ohio-tech-cred'],
    stackingPlaybook: {
      title: 'Global Ecommerce Expansion Stack',
      overview: 'Offset international localized advertising spend and backend system integrations.',
      steps: [
        'Build localized international web portals utilizing digital adoption vouchers.',
        'Apply for trade expansion grants (CanExport or Global NY STEP) targeting new regional markets.',
        'Run localized ad campaigns on Google/Meta and claim a 50-70% cash reimbursement from export funds.',
        'Retrain warehouse staff to operate advanced ERP software using local skills credits.'
      ]
    }
  },
  'non-profits': {
    name: 'Non-Profits & Social Enterprises',
    seoTitle: 'Grants & Funding Programs for Non-Profit Organizations (2026)',
    description: 'Access community development funding, research hub subsidies, and inclusive entrepreneurship accelerators.',
    subtext: 'Fund community impact and research hubs by stacking structural grants and foundation programs.',
    programIds: ['sba-growth-accelerator', 'mitacs-accelerate', 'sustainable-cap'],
    stackingPlaybook: {
      title: 'Social Impact Funding Stack',
      overview: 'Combine public community program funding with academic research support.',
      steps: [
        'Apply for SBA Growth Accelerator prizes (USA) or Community Development Funds (Canada) to secure program operational base costs.',
        'Partner with a university humanities/data-science department to co-hire research interns funded under Mitacs or STTR.',
        'Form structural partnerships with municipal local councils to secure matching funding for facility leases.'
      ]
    }
  },
  'construction': {
    name: 'Infrastructure & Construction',
    seoTitle: 'Construction & Infrastructure Government Grants (2026)',
    description: 'Find technology adoption funding, green building material incentives, and apprentice hiring subsidies for builders.',
    subtext: 'Adopt advanced building information modeling (BIM) software and subsidize apprentice training costs.',
    programIds: ['ontario-hiring-grant', 'ohio-tech-cred', 'cdap', 'sif', 'california-competes-tax-credit', 'illinois-edge'],
    stackingPlaybook: {
      title: 'Construction Apprentice & BIM Stack',
      overview: 'Stack digital modeling software vouchers with direct safety and apprenticeship credits.',
      steps: [
        'Apply for digital adoption programs to offset BIM software licensing and server configuration fees.',
        'Run core site supervisors through training programs, reclaiming 80%+ of tuition using SDF or TechCred.',
        'File for apprenticeship tax credits on payroll filings for registered tradespeople on staff.',
        'Apply for green infrastructure grants when installing district energy or low-carbon building systems.'
      ]
    }
  }
};

export function generateStaticParams() {
  return Object.keys(industryDatabase).map((slug) => ({
    slug,
  }));
}

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
    description: `${industry.description} Review top matching programs, eligibility requirements, and custom stacking playbooks.`,
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

export default async function IndustryPage({ params }: IndustryPageProps) {
  const resolvedParams = await params;
  const industry = industryDatabase[resolvedParams.slug];

  if (!industry) {
    notFound();
  }

  // Get matching programs from database
  const matchingPrograms = programsDatabase.filter((p) =>
    industry.programIds.includes(p.id)
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

          {/* Hero Banner Grid */}
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-emerald-400" />
                <Badge className="bg-emerald-600/90 text-white hover:bg-emerald-600/90 border-none font-bold">
                  Sector Resource Guide
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
                {industry.seoTitle.split(' | ')[0]}
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6">
                {industry.subtext} Compare verified federal and local programs, verify matching criteria, and model your funding stacking.
              </p>

              <div className="flex items-center">
                <EEATBadge authorName="Ashwani" authorImage="/author-ashwani.jpg" date="2026-06-09" />
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Playbooks & Programs) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Custom Stacking Playbook */}
              <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden">
                <div className="bg-emerald-800 p-6 text-white flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Layers className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{industry.stackingPlaybook.title}</h3>
                    <p className="text-xs text-emerald-100">{industry.stackingPlaybook.overview}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {industry.stackingPlaybook.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start text-sm text-slate-700 dark:text-neutral-300">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed font-medium">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Programs List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="h-5.5 w-5.5 text-emerald-600" />
                    Recommended Programs ({matchingPrograms.length})
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold uppercase">Latest Update: June 2026</span>
                </div>

                <div className="grid gap-4">
                  {matchingPrograms.map((prog) => (
                    <Card key={prog.id} className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                      <CardContent className="p-5 sm:p-6">
                        <div className="sm:flex sm:justify-between sm:items-start gap-4 mb-3">
                          <div>
                            <Badge className="mb-2 bg-slate-100 text-slate-700 hover:bg-slate-100 border-none font-bold">
                              {prog.fundingType}
                            </Badge>
                            <h4 className="text-lg font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                              <Link href={`/programs/${prog.slug}`}>{prog.name}</Link>
                            </h4>
                            <p className="text-xs text-slate-400 mt-0.5">Agency: {prog.agency}</p>
                          </div>
                          <div className="mt-2 sm:mt-0 text-right shrink-0">
                            <span className="text-sm font-bold text-emerald-600 block sm:inline">{prog.fundingAmount}</span>
                            <Badge variant="outline" className="ml-2 font-semibold border-slate-200 text-slate-600">
                              {prog.fundingDifficulty} Match
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                          {prog.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-2">
                          <span className="text-xs font-bold text-slate-400 uppercase">Deadline: {prog.deadlineType}</span>
                          <Button asChild size="sm" variant="ghost" className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 font-bold">
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

              {/* Related Resources & Guides */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="h-5.5 w-5.5 text-emerald-600" />
                  Related Resources & Guides
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(resolvedParams.slug === 'saas-companies' || resolvedParams.slug === 'ai-startups') && (
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
                              <Link href="/guides/irap-innovation-application-guide">How to Apply for IRAP Funding Guide</Link>
                            </h4>
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
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-ontario-business-grants">Ontario Business Grants Complete Guide</Link>
                            </h4>
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
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-federal-grants">How to Apply for Federal Grants</Link>
                            </h4>
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
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/canada-agri-food-funding-guide">Canada Agri-Food Funding & Export Guide</Link>
                            </h4>
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
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-federal-grants">How to Apply for Federal Grants</Link>
                            </h4>
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
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/sbir-research-grants-guide">SBIR Biotech Research Grants Guide</Link>
                            </h4>
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
                  {resolvedParams.slug !== 'saas-companies' && resolvedParams.slug !== 'ai-startups' && resolvedParams.slug !== 'manufacturers' && resolvedParams.slug !== 'construction' && resolvedParams.slug !== 'agriculture' && resolvedParams.slug !== 'healthcare-medtech' && (
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
                              <Link href="/guides/apply-small-business-grants">Small Business Grants Complete Guide</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">Compare loan guarantee options (CSBFP) with direct non-repayable grants.</p>
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

            </div>

            {/* Right Column (Estimator Widget) */}
            <div className="space-y-6">
              <div className="sticky top-28">
                <FundingEstimator defaultIndustry={resolvedParams.slug} defaultRegion="on" />

                <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-white flex items-start gap-3 shadow-xs">
                  <Shield className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700">Non-Dilutive Funding Advisory</p>
                    <p>FSI Digital provides pre-qualification reviews to help SaaS, ML, and industrial ventures match programs. We do not charge upfront application fees; all work is handled by experienced specialists.</p>
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
