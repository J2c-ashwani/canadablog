import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Shield, Award, HelpCircle, MapPin, ChevronRight, Sparkles, Navigation, FileText } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { programsDatabase } from '@/lib/data/programs';
import { FundingEstimator } from '@/components/seo/FundingEstimator';
import { getPseoCitySummaries } from '@/lib/pseo-data';
import EEATBadge from '@/components/blog/EEATBadge';

type LocationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Define location mapping and context details
const locationDatabase: Record<string, {
  name: string;
  pseoSlug: string; // matches 'on', 'bc', 'tx', 'ca', etc. in pseo system
  country: 'Canada' | 'USA';
  seoTitle: string;
  description: string;
  subtext: string;
  stackingPlaybook: {
    title: string;
    overview: string;
    steps: string[];
  };
}> = {
  'ontario': {
    name: 'Ontario',
    pseoSlug: 'on',
    country: 'Canada',
    seoTitle: 'Government Grants & Business Funding in Ontario (ON)',
    description: 'Complete guide to Ontario provincial business grants, hiring subsidies, CME equipment rebates, and federal SR&ED tax incentives.',
    subtext: 'Offset expansion costs, equipment modernization, and tech training for Ontario small and medium enterprises.',
    stackingPlaybook: {
      title: 'Ontario Region Funding Stack',
      overview: 'Combine federal research funding with provincial skills development and local machinery grants.',
      steps: [
        'Secure federal NRC-IRAP funding to cover core research and development developers.',
        'Apply for the Ontario Skills Development Fund (SDF) to cover up to 100% of machine operation and IT software training cost.',
        'Claim Ontario Innovation Tax Credits (OITC) stacked with federal SR&ED tax credits on corporate tax filings.',
        'Use CDAP to fund internal CRM/ERP updates and cybersecurity audits.'
      ]
    }
  },
  'british-columbia': {
    name: 'British Columbia',
    pseoSlug: 'bc',
    country: 'Canada',
    seoTitle: 'Business Grants & Technology Funding in British Columbia (BC)',
    description: 'Browse government grants, academic research co-funding, export subsidies, and tax credits for businesses in BC.',
    subtext: 'Offset salary, clean tech, and global marketing expenditures for companies based in Vancouver, Victoria, and regional BC.',
    stackingPlaybook: {
      title: 'British Columbia Venture Stack',
      overview: 'Leverage BC tech grants and Vancouver-focused university research support.',
      steps: [
        'Partner with UBC, SFU, or UVic to hire PhD R&D interns co-funded 50% by Mitacs Accelerate.',
        'Secure BC provincial tax credits to offset digital media and software developer salaries.',
        'Utilize the CanExport grant to subsidize 50% of your international marketing expansions.',
        'Access local microloans and green adaptation cost-shares.'
      ]
    }
  },
  'alberta': {
    name: 'Alberta',
    pseoSlug: 'ab',
    country: 'Canada',
    seoTitle: 'Government Grants & Innovation Vouchers in Alberta (AB)',
    description: 'Discover Alberta Innovates vouchers, agriculture clean-tech matching, provincial hiring credits, and federal tax incentives.',
    subtext: 'Fund prototyping, agriculture transition, and technical hiring for businesses in Calgary, Edmonton, and regional Alberta.',
    stackingPlaybook: {
      title: 'Alberta Innovation Stack',
      overview: 'Combine Alberta Innovates technology vouchers with agricultural clean-tech programs.',
      steps: [
        'Secure an Alberta Innovates Innovation Voucher (up to $100k) to fund prototype design by an external laboratory.',
        'Apply for federal Sustainable CAP and ACT programs to fund sustainable farming equipment at a 50% cost-share.',
        'Claim provincial R&D tax credits stacked with federal SR&ED on remaining engineering salaries.',
        'Apply for Alberta Jobs Now wage grants when hiring local staff.'
      ]
    }
  },
  'quebec': {
    name: 'Quebec',
    pseoSlug: 'qc',
    country: 'Canada',
    seoTitle: 'Subventions aux Entreprises et Crédits d\'Impôt au Québec (QC)',
    description: 'Guide complet des subventions gouvernementales du Québec, crédits d\'impôt à la R&D de Revenu Québec et programmes fédéraux.',
    subtext: 'Financez l\'innovation, la R&D et l\'exportation pour les entreprises situées à Montréal, Québec et dans les régions.',
    stackingPlaybook: {
      title: 'Quebec R&D & Innovation Stack',
      overview: 'Maxmize tax credit recoveries under Revenu Québec and federal CRA allocations.',
      steps: [
        'Claim the Quebec R&D Tax Credit for CCPCs to refund up to 30% of local engineering salaries.',
        'Stack with federal SR&ED tax incentives to recover up to 64% of total R&D wages.',
        'Use Investissement Québec loans and grants for physical factory modernization.',
        'Subsidize international commercialization using export grants.'
      ]
    }
  },
  'california': {
    name: 'California',
    pseoSlug: 'ca',
    country: 'USA',
    seoTitle: 'California Business Grants & Tax Credits (CCTC)',
    description: 'Find California Competes Tax Credits, federal SBIR deep-tech grants, USDA rural development loans, and state hiring incentives.',
    subtext: 'Finance hardware laboratories, tech hiring, and commercial expansions in Los Angeles, Silicon Valley, and regional California.',
    stackingPlaybook: {
      title: 'California Growth Funding Stack',
      overview: 'Stack federal seed awards with California Competes Tax Credits.',
      steps: [
        'Secure federal SBIR Phase I awards ($150k - $275k) from the NSF or NIH to fund scientific research.',
        'Apply for the California Competes Tax Credit (CCTC) during active application periods to offset state income tax liabilities.',
        'Leverage local utility rebates for server room and laboratory energy upgrades.',
        'Claim federal R&D tax credits to offset payroll tax requirements.'
      ]
    }
  },
  'texas': {
    name: 'Texas',
    pseoSlug: 'tx',
    country: 'USA',
    seoTitle: 'Texas Enterprise Fund & Business Grants (TEF)',
    description: 'Complete guide to the Texas Enterprise Fund (TEF), deal-closing grants, federal SBIR matches, and local franchise tax credits.',
    subtext: 'Offset corporate relocation and lab expansion costs in Austin, Dallas, Houston, and regional Texas.',
    stackingPlaybook: {
      title: 'Texas Relocation & R&D Stack',
      overview: 'Leverage state deal-closing capital with federal deep-tech research grants.',
      steps: [
        'Consult the Governor\'s Office regarding the Texas Enterprise Fund (TEF) BEFORE committing to a site lease.',
        'Apply for federal SBIR Phase I/II allocations to fund prototype development.',
        'Utilize Texas local city property tax abatements and sales tax exemptions on manufacturing equipment.',
        'Claim federal R&D tax credits on technical developer salaries.'
      ]
    }
  },
  'new-york': {
    name: 'New York',
    pseoSlug: 'ny',
    country: 'USA',
    seoTitle: 'New York State Business Grants & Global NY STEP',
    description: 'Browse Global NY STEP trade grants, Excelsior Jobs Program tax credits, and federal research grants for NY businesses.',
    subtext: 'Finance trade expansion, developer payroll, and hiring within New York City and Upstate NY.',
    stackingPlaybook: {
      title: 'New York Job & Export Stack',
      overview: 'Stack Excelsior hiring tax credits with Global NY export rebates.',
      steps: [
        'Apply for Global NY STEP to cover 70% of international trade show registration and travel.',
        'Utilize the Excelsior Jobs Program to secure fully refundable tax credits for net-new jobs created.',
        'Stack with federal SBIR awards to fund laboratory operations.',
        'Apply for local NYSERDA grants for green building energy retrofits.'
      ]
    }
  },
  'florida': {
    name: 'Florida',
    pseoSlug: 'fl',
    country: 'USA',
    seoTitle: 'Florida Government Grants & Business Incentives',
    description: 'Guide to Florida qualified target industry incentives, space commerce grants, and federal small business funding.',
    subtext: 'Offset capital investment and R&D budgets for businesses in Miami, Orlando, Tampa, and regional Florida.',
    stackingPlaybook: {
      title: 'Florida Target Industry Stack',
      overview: 'Leverage target industry tax refunds with federal funding.',
      steps: [
        'Confirm if your business matches Florida target sectors (aviation, infotech, life sciences).',
        'Secure Space Florida or state-specific research capital for aerospace/biotech.',
        'Utilize county-level capital matching to fund warehouse or office purchases.',
        'File federal R&D tax credits to offset payroll tax requirements.'
      ]
    }
  },
  'illinois': {
    name: 'Illinois',
    pseoSlug: 'il',
    country: 'USA',
    seoTitle: 'Illinois EDGE Tax Credit & Small Business Grants',
    description: 'Review the Illinois EDGE program, state manufacturing incentives, and federal SBIR/USDA agriculture programs.',
    subtext: 'Offset hiring, lab modernization, and agricultural updates for companies in Chicago and regional Illinois.',
    stackingPlaybook: {
      title: 'Illinois Industrial Expansion Stack',
      overview: 'Combine Illinois EDGE payroll tax credits with federal technology grants.',
      steps: [
        'Apply for the Illinois EDGE program to secure tax credits matching a percentage of new employee state income tax.',
        'Secure federal SBIR Phase I/II grants to fund deep-tech research.',
        'Stack local city/county enterprise zone property tax exemptions.',
        'Adopt energy-saving machinery funded by utility cost-shares.'
      ]
    }
  },
  'ohio': {
    name: 'Ohio',
    pseoSlug: 'oh',
    country: 'USA',
    seoTitle: 'Ohio TechCred Program & State Business Grants',
    description: 'Explore the Ohio TechCred training program, JobOhio growth funds, and federal SBIR/USDA energy grants.',
    subtext: 'Offset staff upskilling, factory expansions, and clean energy retrofits in Columbus, Cleveland, and regional Ohio.',
    stackingPlaybook: {
      title: 'Ohio Workforce & Innovation Stack',
      overview: 'Stack TechCred training credits with federal technology and energy grants.',
      steps: [
        'Apply for Ohio TechCred to secure $2,000 per employee for tech training (up to $30k per round).',
        'Utilize JobOhio growth grants to finance new corporate building construction.',
        'Secure USDA REAP grants to cover 50% of solar array installations on rural facilities.',
        'Claim federal SBIR funding for technical engineering wages.'
      ]
    }
  }
};

export function generateStaticParams() {
  return Object.keys(locationDatabase).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const location = locationDatabase[resolvedParams.slug];

  if (!location) {
    return {
      title: 'Location Funding Directory Not Found | FSI Digital',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://www.fsidigital.ca/grants/location/${resolvedParams.slug}`;

  return {
    title: `${location.seoTitle} | FSI Digital`,
    description: `${location.description} Learn about local and federal funding matching, stacking strategies, and local city hubs.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: location.seoTitle,
      description: location.description,
      url: canonical,
      type: 'website',
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const resolvedParams = await params;
  const location = locationDatabase[resolvedParams.slug];

  if (!location) {
    notFound();
  }

  // Filter matching programs (either federal program for that country or specific provincial/state programs)
  const matchingPrograms = programsDatabase.filter((p) => {
    if (p.country !== location.country) return false;
    return p.region === 'Federal' || p.region.toLowerCase() === location.name.toLowerCase();
  });

  // Fetch city-specific pSEO pages in this province/state to build local crawl architecture
  const cities = getPseoCitySummaries(location.pseoSlug).slice(0, 24);

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
            <span className="text-slate-400 font-semibold shrink-0">Location Grants</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 shrink-0 truncate">{location.name}</span>
          </nav>

          {/* Hero Banner Grid */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <Badge className="bg-emerald-600/90 text-white hover:bg-emerald-600/90 border-none font-bold">
                  Regional Resources
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
                {location.seoTitle.split(' | ')[0]}
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6">
                {location.subtext} Explore funding options matching {location.name} companies. Stack federal and regional incentives to maximize your non-dilutive capital.
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
              
              {/* Regional Stacking Playbook */}
              <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden">
                <div className="bg-emerald-800 p-6 text-white flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Navigation className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{location.stackingPlaybook.title}</h3>
                    <p className="text-xs text-emerald-100">{location.stackingPlaybook.overview}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {location.stackingPlaybook.steps.map((step, idx) => (
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
                    Available Programs in {location.name} ({matchingPrograms.length})
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold uppercase">Updated: June 2026</span>
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
                  {location.country === 'USA' ? (
                    <>
                      {resolvedParams.slug === 'california' && (
                        <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                          <CardContent className="p-5 flex flex-col justify-between h-full">
                            <div className="space-y-1.5">
                              <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                                <Link href="/guides/california-loan-guarantee-guide">California Business Funding & Loan Guide</Link>
                              </h4>
                              <p className="text-xs text-slate-500 leading-relaxed">State-level loan guarantee programs, tech credits, and rural efficiency support.</p>
                            </div>
                            <Link href="/guides/california-loan-guarantee-guide" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                              Read Guide <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </CardContent>
                        </Card>
                      )}
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/sba-application-process">SBA Grant Application Process Guide</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Required document checklist, credit limits, and lender mapping walkthrough.</p>
                          </div>
                          <Link href="/guides/sba-application-process" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-federal-grants">How to Apply for USA Federal Grants</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Navigating SAM.gov, eRA Commons, and proposal formats to avoid rejections.</p>
                          </div>
                          <Link href="/guides/apply-federal-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <>
                      {resolvedParams.slug === 'ontario' && (
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
                      )}
                      {resolvedParams.slug === 'british-columbia' && (
                        <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                          <CardContent className="p-5 flex flex-col justify-between h-full">
                            <div className="space-y-1.5">
                              <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                                <Link href="/guides/apply-british-columbia-grants">BC Grants & Venture Capital guide</Link>
                              </h4>
                              <p className="text-xs text-slate-500 leading-relaxed">Access local provincial programs, training matching, and tech credits.</p>
                            </div>
                            <Link href="/guides/apply-british-columbia-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                              Read Guide <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </CardContent>
                        </Card>
                      )}
                      {resolvedParams.slug === 'alberta' && (
                        <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                          <CardContent className="p-5 flex flex-col justify-between h-full">
                            <div className="space-y-1.5">
                              <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                                <Link href="/guides/apply-alberta-business-grants">Alberta Business Funding Playbook</Link>
                              </h4>
                              <p className="text-xs text-slate-500 leading-relaxed">Complete guide to Alberta Innovates vouchers and agri-food streams.</p>
                            </div>
                            <Link href="/guides/apply-alberta-business-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                              Read Guide <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </CardContent>
                        </Card>
                      )}
                      {resolvedParams.slug === 'quebec' && (
                        <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                          <CardContent className="p-5 flex flex-col justify-between h-full">
                            <div className="space-y-1.5">
                              <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                                <Link href="/guides/apply-quebec-business-grants">Guide des Subventions du Québec</Link>
                              </h4>
                              <p className="text-xs text-slate-500 leading-relaxed">Détails sur les programmes de Revenu Québec et crédits de R&D provinciaux.</p>
                            </div>
                            <Link href="/guides/apply-quebec-business-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                              Read Guide <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </CardContent>
                        </Card>
                      )}
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-federal-grants">How to Apply for Canada Federal Grants</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Step-by-step setup guides for CRA portals and writing technical milestones.</p>
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

              {/* pSEO City Hubs (Crawl Equity Architecture) */}
              {cities.length > 0 && (
                <div className="border border-slate-200 bg-white rounded-2xl p-6 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Local City & Community Funding Hubs</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Browse localized city business grant reports for {location.name} companies.</p>
                  </div>
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                    {cities.map((city) => (
                      <Link
                        key={city.citySlug}
                        href={`/grants/${location.pseoSlug}/${city.citySlug}`}
                        className="p-3 border border-slate-100 rounded-lg hover:border-emerald-200 hover:bg-emerald-50/30 transition-all text-xs font-bold text-slate-700 dark:border-neutral-900 dark:bg-neutral-950/20 text-center truncate"
                      >
                        📍 {city.cityName}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column (Estimator Widget) */}
            <div className="space-y-6">
              <div className="sticky top-28">
                <FundingEstimator defaultIndustry="technology" defaultRegion={location.pseoSlug} />

                <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-white flex items-start gap-3 shadow-xs">
                  <Shield className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700">Pre-Qualification Review</p>
                    <p>FSI Digital coordinates with regional consultants to evaluate business profiles for state, provincial, and national grant initiatives. No fee unless pre-qualification is confirmed.</p>
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
